from collections import Counter
from datetime import date

from .models import Transaction


VALID_DIRECTIONS = {
    "CREDIT",
    "DEBIT",
}

VALID_PAYMENT_TYPES = {
    "UPI",
}


class ValidationError(Exception):
    """Raised when transaction data is invalid."""


def validate_transactions(
    transactions: list[Transaction],
) -> None:

    if not transactions:
        raise ValidationError(
            "Transaction list cannot be empty."
        )

    transaction_ids = [
        tx.id for tx in transactions
    ]

    duplicates = [
        transaction_id
        for transaction_id, count
        in Counter(transaction_ids).items()
        if count > 1
    ]

    if duplicates:
        raise ValidationError(
            f"Duplicate transaction IDs: {duplicates}"
        )

    for index, tx in enumerate(transactions, start=1):

        if not tx.id.strip():
            raise ValidationError(
                f"Transaction {index}: missing transaction ID."
            )

        if tx.amount <= 0:
            raise ValidationError(
                f"Transaction {tx.id}: "
                "amount must be greater than zero."
            )

        if tx.direction not in VALID_DIRECTIONS:
            raise ValidationError(
                f"Transaction {tx.id}: "
                f"invalid direction '{tx.direction}'."
            )

        if tx.payment_type not in VALID_PAYMENT_TYPES:
            raise ValidationError(
                f"Transaction {tx.id}: "
                f"unsupported payment type "
                f"'{tx.payment_type}'."
            )

        if not isinstance(tx.date, date):
            raise ValidationError(
                f"Transaction {tx.id}: invalid date."
            )