from datetime import date

from app.models import Transaction
from app.calculator import calculate_month


def test_monthly_volume():

    transactions = [
        Transaction(
            id="TX001",
            date=date(2026, 9, 1),
            amount=30000,
            direction="CREDIT",
            payment_type="UPI",
        ),

        Transaction(
            id="TX002",
            date=date(2026, 9, 15),
            amount=20000,
            direction="CREDIT",
            payment_type="UPI",
        ),

        Transaction(
            id="TX003",
            date=date(2026, 10, 1),
            amount=40000,
            direction="CREDIT",
            payment_type="UPI",
        ),
    ]

    result = calculate_month(
        input_data.transactions,
        input_data.classification
    )

    assert result["2026-09"] == 50000
    assert result["2026-10"] == 40000