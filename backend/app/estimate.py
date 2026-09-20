from .models import MerchantClassification
from .rules import (
    P2PM_MONTHLY_THRESHOLD,
    FREE_TRANSACTION_THRESHOLD,
    STANDARD_MDR_RATE,
    MAXIMUM_MDR_PER_TRANSACTION,
)


def estimate_monthly_cost(
    classification: MerchantClassification,
    monthly_volume: float,
    transaction_count: int,
    average_transaction_amount: float | None = None,
) -> dict:

    if average_transaction_amount is None:

        average_transaction_amount = (
            monthly_volume / transaction_count
        )

    # ---------------------------------------------
    # P2PM
    # ---------------------------------------------

    if classification == MerchantClassification.P2PM:

        if monthly_volume <= P2PM_MONTHLY_THRESHOLD:

            return {
                "estimate_type": "ROUGH",
                "monthly_upi_volume": monthly_volume,
                "transaction_count": transaction_count,
                "average_transaction_amount":
                    round(
                        average_transaction_amount,
                        2,
                    ),
                "p2pm_eligible": True,
                "projected_mdr": 0.0,
                "current_cost": 0.0,
                "additional_cost": 0.0,
                "explanation_code":
                    "P2PM_ZERO_MDR",
            }

        # P2PM threshold exceeded.
        #
        # We don't know the exact distribution
        # of transaction amounts, so don't pretend
        # we can calculate exact MDR.

        return {
            "estimate_type": "ROUGH",
            "monthly_upi_volume": monthly_volume,
            "transaction_count": transaction_count,
            "average_transaction_amount":
                round(
                    average_transaction_amount,
                    2,
                ),
            "p2pm_eligible": False,
            "projected_mdr": None,
            "current_cost": 0.0,
            "additional_cost": None,
            "explanation_code":
                "P2PM_THRESHOLD_EXCEEDED",
            "message": (
                "Exact MDR requires transaction-level "
                "amounts because only transactions "
                "above ₹2,000 are subject to MDR."
            ),
        }

    # ---------------------------------------------
    # Unknown classification
    # ---------------------------------------------

    if classification == MerchantClassification.UNKNOWN:

        return {
            "estimate_type": "ROUGH",
            "monthly_upi_volume": monthly_volume,
            "transaction_count": transaction_count,
            "average_transaction_amount":
                round(
                    average_transaction_amount,
                    2,
                ),
            "p2pm_eligible": None,
            "projected_mdr": None,
            "current_cost": 0.0,
            "additional_cost": None,
            "explanation_code":
                "CLASSIFICATION_REQUIRED",
        }

    # ---------------------------------------------
    # P2M rough estimate
    # ---------------------------------------------

    if average_transaction_amount <= FREE_TRANSACTION_THRESHOLD:

        return {
            "estimate_type": "ROUGH",
            "monthly_upi_volume": monthly_volume,
            "transaction_count": transaction_count,
            "average_transaction_amount":
                round(
                    average_transaction_amount,
                    2,
                ),
            "p2pm_eligible": False,
            "projected_mdr": 0.0,
            "current_cost": 0.0,
            "additional_cost": 0.0,
            "explanation_code":
                "AVERAGE_TRANSACTION_BELOW_THRESHOLD",
            "message": (
                "Based on the supplied average, "
                "transactions are expected to be "
                "at or below ₹2,000."
            ),
        }

    # ---------------------------------------------
    # Approximate P2M estimate
    # ---------------------------------------------

    estimated_mdr_per_transaction = min(
        average_transaction_amount
        * STANDARD_MDR_RATE,
        MAXIMUM_MDR_PER_TRANSACTION,
    )

    projected_mdr = (
        estimated_mdr_per_transaction
        * transaction_count
    )

    projected_mdr = round(
        projected_mdr,
        2,
    )

    return {
        "estimate_type": "ROUGH",
        "monthly_upi_volume": monthly_volume,
        "transaction_count": transaction_count,
        "average_transaction_amount":
            round(
                average_transaction_amount,
                2,
            ),
        "p2pm_eligible": False,
        "projected_mdr": projected_mdr,
        "current_cost": 0.0,
        "additional_cost": projected_mdr,
        "explanation_code":
            "ROUGH_P2M_ESTIMATE",
        "message": (
            "This is an estimate based on the "
            "average transaction amount. "
            "Upload transaction history for "
            "an exact calculation."
        ),
    }