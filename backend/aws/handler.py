import base64
import json
import io
import logging
import uuid
from datetime import datetime, timezone



from app.models import MerchantClassification
from app.estimate import estimate_monthly_cost
from app.parser import parse_csv
from app.monthly_analyzer import analyze_months
from app.s3_repository import upload_csv
from app.dynamodb_repository import (
    save_calculation,
    get_calculation,
)

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

def generate_calculation_id() -> str:
    return str(uuid.uuid4())

def response(status_code: int, body: dict) -> dict:
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
        },
        "body": json.dumps(body),
    }

def generate_csv_object_key() -> str:
    timestamp = datetime.now(
        timezone.utc
    ).strftime("%Y/%m/%d")

    file_id = str(uuid.uuid4())

    return (
        f"transactions/{timestamp}/{file_id}.csv"
    )

def parse_json_body(event: dict) -> dict:
    body = event.get("body")

    if body is None:
        return {}

    if event.get("isBase64Encoded"):
        body = base64.b64decode(body).decode("utf-8")

    if isinstance(body, str):
        return json.loads(body)

    if isinstance(body, dict):
        return body

    raise ValueError("Invalid request body.")


def handle_estimate(payload: dict) -> dict:
    classification = MerchantClassification(
        payload["classification"]
    )

    monthly_volume = float(
        payload["monthly_upi_volume"]
    )

    transaction_count = int(
        payload["transaction_count"]
    )

    average_transaction_amount = payload.get(
        "average_transaction_amount"
    )

    if average_transaction_amount is not None:
        average_transaction_amount = float(
            average_transaction_amount
        )

    result = estimate_monthly_cost(
        classification=classification,
        monthly_volume=monthly_volume,
        transaction_count=transaction_count,
        average_transaction_amount=average_transaction_amount,
    )

    calculation_id = generate_calculation_id()

    save_calculation(
        calculation_id=calculation_id,
        operation="estimate",
        classification=classification,
        result=result,
    )

    return {
        "calculation_id": calculation_id,
        **result,
    }


def handle_analyze(payload: dict) -> dict:
    classification = MerchantClassification(
        payload["classification"]
    )

    csv_content = payload.get("csv_content")

    if not csv_content:
        raise ValueError(
            "csv_content is required for analyze."
        )

    object_key = generate_csv_object_key()

    upload_csv(
        content=csv_content,
        object_key=object_key,
    )

    csv_file = io.StringIO(csv_content)

    transactions = parse_csv(csv_file)

    results = analyze_months(
        transactions,
        classification,
    )

    calculation_id = generate_calculation_id()

    result = {
        "analysis_type": "EXACT",
        "transaction_count": len(transactions),
        "classification": classification,
        "months": results,
    }

    save_calculation(
        calculation_id=calculation_id,
        operation="analyze",
        classification=classification,
        result=result,
        s3_object_key=object_key,
    )

    return {
        "calculation_id": calculation_id,
        "s3_object_key": object_key,
        **result,
    }

def handle_get_calculation(payload: dict) -> dict:
    calculation_id = payload.get("calculation_id")

    if not calculation_id:
        raise ValueError(
            "calculation_id is required."
        )

    item = get_calculation(calculation_id)

    if item is None:
        raise LookupError(
            "Calculation not found."
        )

    return item

def lambda_handler(event, context):
    try:
        payload = parse_json_body(event)

        operation = payload.get("operation")

        if operation == "estimate":
            result = handle_estimate(payload)

            return response(
                200,
                result,
            )

        if operation == "analyze":
            result = handle_analyze(payload)

            return response(
                200,
                result,
            )
        if operation == "get_calculation":
            result = handle_get_calculation(payload)

            return response(
            200,
            result,
            )

        return response(
            400,
            {
                "error": "INVALID_OPERATION",
                "message": (
                    "operation must be "
                    "'estimate' or 'analyze'."
                ),
            },
        )

    except KeyError as error:
        return response(
            400,
            {
                "error": "MISSING_FIELD",
                "message": (
                    f"Missing required field: {error.args[0]}"
                ),
            },
        )

    except ValueError as error:
        return response(
            400,
            {
                "error": "VALIDATION_ERROR",
                "message": str(error),
            },
        )
    except LookupError as error:
        return response(
        404,
        {
            "error": "NOT_FOUND",
            "message": str(error),
        },
    )

    except Exception:
        logger.exception("Unhandled Lambda error")
        return response(
            500,
            {
                "error": "INTERNAL_SERVER_ERROR",
                "message": (
                    "An unexpected error occurred."
                ),
            },
        )

