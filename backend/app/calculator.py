from .models import (
    Transaction,
    MerchantClassification,
)

from .rules import (
    P2PM_MONTHLY_THRESHOLD,
    FREE_TRANSACTION_THRESHOLD,
    STANDARD_MDR_RATE,
    MAXIMUM_MDR_PER_TRANSACTION,
)


def calculate_month(
    transactions: list[Transaction],
    classification: MerchantClassification,
) -> dict:

    upi_transactions = [
        tx
        for tx in transactions
        if tx.direction == "CREDIT"
        and tx.payment_type == "UPI"
    ]

    monthly_volume = sum(
        tx.amount
        for tx in upi_transactions
    )

    transaction_count = len(
        upi_transactions
    )

    # ---------------------------------------------
    # P2PM eligibility
    # ---------------------------------------------

    if classification == MerchantClassification.P2PM:

        p2pm_eligible = (
            monthly_volume <= P2PM_MONTHLY_THRESHOLD
        )

        if p2pm_eligible:

            return {
                "upi_volume": monthly_volume,
                "transaction_count": transaction_count,
                "p2pm_eligible": True,
                "transactions_above_2000": 0,
                "projected_mdr": 0.0,
                "current_cost": 0.0,
                "additional_cost": 0.0,
                "explanation_code": "P2PM_ZERO_MDR",
            }

    # ---------------------------------------------
    # Unknown classification
    # ---------------------------------------------

    if classification == MerchantClassification.UNKNOWN:

        return {
            "upi_volume": monthly_volume,
            "transaction_count": transaction_count,
            "p2pm_eligible": None,
            "transactions_above_2000": 0,
            "projected_mdr": None,
            "current_cost": 0.0,
            "additional_cost": None,
            "explanation_code": "CLASSIFICATION_REQUIRED",
        }

    # ---------------------------------------------
    # Standard P2M MDR
    # ---------------------------------------------

    transactions_above_2000 = 0
    projected_mdr = 0.0

    for tx in upi_transactions:

        if tx.amount <= FREE_TRANSACTION_THRESHOLD:
            continue

        transactions_above_2000 += 1

        mdr = (
            tx.amount * STANDARD_MDR_RATE
        )

        mdr = min(
            mdr,
            MAXIMUM_MDR_PER_TRANSACTION,
        )

        projected_mdr += mdr

    projected_mdr = round(
        projected_mdr,
        2,
    )

    return {
        "upi_volume": monthly_volume,
        "transaction_count": transaction_count,
        "p2pm_eligible": False,
        "transactions_above_2000": transactions_above_2000,
        "projected_mdr": projected_mdr,
        "current_cost": 0.0,
        "additional_cost": projected_mdr,
        "explanation_code": "STANDARD_P2M_MDR",
    }