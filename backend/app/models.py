from dataclasses import dataclass
from enum import Enum
from datetime import date


class MerchantClassification(str, Enum):
    P2PM = "P2PM"
    P2M = "P2M"
    UNKNOWN = "UNKNOWN"


@dataclass
class Transaction:
    id: str
    date: date
    amount: float
    direction: str
    payment_type: str


@dataclass
class MerchantInput:
    classification: MerchantClassification
    transactions: list[Transaction]


@dataclass
class CalculationResult:
    monthly_volume: float
    transaction_count: int
    p2pm_eligible: bool | None
    classification: MerchantClassification
    transactions_above_2000: int
    subject_to_mdr: int
    projected_mdr: float | None
    current_cost: float
    additional_cost: float | None
    effective_date: str
    explanation_code: str