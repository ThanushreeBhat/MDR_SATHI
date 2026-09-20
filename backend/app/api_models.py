from datetime import date

from pydantic import BaseModel, Field

from .models import MerchantClassification


class TransactionRequest(BaseModel):
    id: str = Field(min_length=1)
    date: date
    amount: float = Field(gt=0)
    direction: str
    payment_type: str


class EstimateRequest(BaseModel):
    classification: MerchantClassification
    monthly_upi_volume: float = Field(gt=0)
    transaction_count: int = Field(gt=0)
    average_transaction_amount: float | None = Field(
        default=None,
        gt=0,
    )


class MonthlyAnalysisResponse(BaseModel):
    upi_volume: float
    transaction_count: int
    p2pm_eligible: bool | None
    transactions_above_2000: int
    projected_mdr: float | None
    current_cost: float
    additional_cost: float | None
    explanation_code: str


class AnalyzeResponse(BaseModel):
    analysis_type: str
    filename: str
    classification: MerchantClassification
    transaction_count: int
    months: dict[str, MonthlyAnalysisResponse]


class EstimateResponse(BaseModel):
    monthly_upi_volume: float
    transaction_count: int
    average_transaction_amount: float
    p2pm_eligible: bool | None
    projected_mdr: float | None
    current_cost: float
    additional_cost: float | None
    explanation_code: str
    message: str | None = None


class ErrorResponse(BaseModel):
    error: str
    message: str