import pytest
from datetime import date

from app.models import Transaction
from app.validator import (
    ValidationError,
    validate_transactions,
)


def make_transaction(
    transaction_id="TX001",
    amount=1000,
    direction="CREDIT",
    payment_type="UPI",
):

    return Transaction(
        id=transaction_id,
        date=date(2026, 9, 1),
        amount=amount,
        direction=direction,
        payment_type=payment_type,
    )


def test_empty_transactions():

    with pytest.raises(ValidationError):
        validate_transactions([])


def test_negative_amount():

    transactions = [
        make_transaction(amount=-500)
    ]

    with pytest.raises(ValidationError):
        validate_transactions(transactions)


def test_zero_amount():

    transactions = [
        make_transaction(amount=0)
    ]

    with pytest.raises(ValidationError):
        validate_transactions(transactions)


def test_invalid_direction():

    transactions = [
        make_transaction(direction="RANDOM")
    ]

    with pytest.raises(ValidationError):
        validate_transactions(transactions)


def test_invalid_payment_type():

    transactions = [
        make_transaction(payment_type="CASH")
    ]

    with pytest.raises(ValidationError):
        validate_transactions(transactions)


def test_duplicate_transaction_id():

    transactions = [
        make_transaction("TX001"),
        make_transaction("TX001"),
    ]

    with pytest.raises(ValidationError):
        validate_transactions(transactions)