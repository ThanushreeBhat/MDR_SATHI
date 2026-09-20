from datetime import date

from app.calculator import calculate_month
from app.models import (
    Transaction,
    MerchantClassification,
)


def make_transaction(amount):

    return Transaction(
        id="TX001",
        date=date(2026, 9, 1),
        amount=amount,
        direction="CREDIT",
        payment_type="UPI",
    )


def test_p2pm_under_threshold():

    transactions = [
        make_transaction(99_999)
    ]

    result = calculate_month(
        transactions,
        MerchantClassification.P2PM,
    )

    assert result["p2pm_eligible"] is True
    assert result["projected_mdr"] == 0


def test_p2pm_at_threshold():

    transactions = [
        make_transaction(100_000)
    ]

    result = calculate_month(
        transactions,
        MerchantClassification.P2PM,
    )

    assert result["p2pm_eligible"] is True
    assert result["projected_mdr"] == 0


def test_p2pm_over_threshold():

    transactions = [
        make_transaction(100_001)
    ]

    result = calculate_month(
        transactions,
        MerchantClassification.P2PM,
    )

    assert result["p2pm_eligible"] is False


def test_transaction_below_2000():

    transactions = [
        make_transaction(2_000)
    ]

    result = calculate_month(
        transactions,
        MerchantClassification.P2M,
    )

    assert result["projected_mdr"] == 0


def test_standard_mdr():

    transactions = [
        make_transaction(3_000)
    ]

    result = calculate_month(
        transactions,
        MerchantClassification.P2M,
    )

    assert result["projected_mdr"] == 12


def test_mdr_cap():

    transactions = [
        make_transaction(100_000)
    ]

    result = calculate_month(
        transactions,
        MerchantClassification.P2M,
    )

    assert result["projected_mdr"] == 300