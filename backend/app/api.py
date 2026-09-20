from fastapi import FastAPI, HTTPException, UploadFile, File, Form,Request

from fastapi.responses import JSONResponse

from .exceptions import (
    CSVValidationError,
    FileTooLargeError,
)

from .api_models import (
    EstimateRequest,
    EstimateResponse,
    AnalyzeResponse,
)

from .models import MerchantClassification
from .monthly_analyzer import analyze_months
from .estimate import estimate_monthly_cost
from .parser import parse_csv
from .rules import MAX_CSV_FILE_SIZE



app = FastAPI(
    title="UPI Merchant Cost Engine",
    description=(
        "Deterministic engine for analyzing "
        "merchant UPI costs."
    ),
    version="0.1.0",
)



@app.exception_handler(CSVValidationError)
async def csv_validation_exception_handler(
    request: Request,
    exc: CSVValidationError,
):
    return JSONResponse(
        status_code=400,
        content={
            "error": "VALIDATION_ERROR",
            "message": str(exc),
        },
    )

@app.exception_handler(FileTooLargeError)
async def file_too_large_exception_handler(
    request: Request,
    exc: FileTooLargeError,
):
    return JSONResponse(
        status_code=413,
        content={
            "error": "FILE_TOO_LARGE",
            "message": str(exc),
        },
    )
@app.exception_handler(Exception)
async def unexpected_exception_handler(
    request: Request,
    exc: Exception,
):
    return JSONResponse(
        status_code=500,
        content={
            "error": "INTERNAL_SERVER_ERROR",
            "message": "An unexpected error occurred.",
        },
    )

@app.get("/health")
def health_check():

    return {
        "status": "ok"
    }


@app.post(
    "/analyze",
    response_model=AnalyzeResponse,
)
async def analyze(
    file: UploadFile = File(...),
    classification: MerchantClassification = Form(...),
):
    if not file.filename:
        raise CSVValidationError(
            "No file was provided."
        )

    if not file.filename.lower().endswith(".csv"):
        raise CSVValidationError(
            "Only CSV files are supported."
        )

    contents = await file.read(
        MAX_CSV_FILE_SIZE + 1
    )

    if len(contents) > MAX_CSV_FILE_SIZE:
        raise FileTooLargeError(
            "CSV file is too large. "
            "Maximum allowed size is 10 MB."
        )

    if not contents:
        raise CSVValidationError(
            "Uploaded CSV is empty."
        )

    try:
        csv_text = contents.decode("utf-8-sig")
    except UnicodeDecodeError as error:
        raise CSVValidationError(
            "CSV must be encoded as UTF-8."
        ) from error

    import io

    csv_file = io.StringIO(csv_text)

    try:
        transactions = parse_csv(csv_file)
        results = analyze_months(
            transactions,
            classification,
        )
    except ValueError as error:
        raise CSVValidationError(
            str(error)
        ) from error

    return {
        "analysis_type": "EXACT",
        "filename": file.filename,
        "classification": classification,
        "transaction_count": len(transactions),
        "months": results,
    }

@app.post("/estimate",response_model=EstimateResponse)
def estimate(
    request: EstimateRequest,
):

    result = estimate_monthly_cost(
        classification=request.classification,
        monthly_volume=request.monthly_upi_volume,
        transaction_count=request.transaction_count,
        average_transaction_amount=(
            request.average_transaction_amount
        ),
    )

    return result