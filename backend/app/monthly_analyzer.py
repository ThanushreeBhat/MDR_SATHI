from collections import defaultdict

from .models import (
    Transaction,
    MerchantClassification,
)

from .calculator import calculate_month


def analyze_months(
    transactions: list[Transaction],
    classification: MerchantClassification,
) -> dict:

    monthly_transactions = defaultdict(list)

    # -----------------------------------------------
    # Group transactions by YYYY-MM
    # -----------------------------------------------

    for transaction in transactions:

        month = transaction.date.strftime("%Y-%m")

        monthly_transactions[month].append(
            transaction
        )

    # -----------------------------------------------
    # Calculate each month independently
    # -----------------------------------------------

    results = {}

    for month, month_transactions in sorted(
        monthly_transactions.items()
    ):

        results[month] = calculate_month(
            month_transactions,
            classification,
        )

    return results