import json
import os
from datetime import datetime, timezone

import boto3


TABLE_NAME = os.environ.get(
    "CALCULATION_TABLE_NAME"
)

_dynamodb = None


def get_table():
    global _dynamodb

    if _dynamodb is None:
        if not TABLE_NAME:
            raise RuntimeError(
                "CALCULATION_TABLE_NAME is not configured."
            )

        dynamodb = boto3.resource("dynamodb")
        _dynamodb = dynamodb.Table(TABLE_NAME)

    return _dynamodb


def save_calculation(
    calculation_id: str,
    operation: str,
    classification: str,
    result: dict,
    s3_object_key: str | None = None,
) -> None:

    table = get_table()

    item = {
    "calculation_id": calculation_id,
    "created_at": datetime.now(
        timezone.utc
    ).isoformat(),
    "operation": operation,
    "classification": (
        classification.value
        if hasattr(classification, "value")
        else str(classification)
    ),
    "result": json.dumps(result),
    }

    if s3_object_key:
        item["s3_object_key"] = s3_object_key

    table.put_item(Item=item)

def get_calculation(calculation_id: str) -> dict | None:
    table = get_table()

    response = table.get_item(
        Key={
            "calculation_id": calculation_id,
        }
    )

    return response.get("Item")