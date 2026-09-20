import csv
from datetime import date
from pathlib import Path
from typing import TextIO

from .models import Transaction
from .validator import validate_transactions
from .rules import MAX_TRANSACTIONS_PER_UPLOAD


REQUIRED_COLUMNS = {
    "transaction_id",
    "date",
    "amount",
    "direction",
    "payment_type",
}


def parse_csv(file: str | Path | TextIO) -> list[Transaction]:
    should_close = False

    if isinstance(file, (str, Path)):
        file = open(
            file,
            "r",
            encoding="utf-8-sig",
            newline="",
        )
        should_close = True

    try:
        reader = csv.DictReader(file)

        if reader.fieldnames is None:
            raise ValueError("CSV file is missing a header row.")

        reader.fieldnames = [
    field.strip().lower()
    for field in reader.fieldnames
]
        columns = set(reader.fieldnames)
        missing_columns = REQUIRED_COLUMNS - columns

        if missing_columns:
            missing = ", ".join(sorted(missing_columns))
            raise ValueError(
                f"CSV is missing required columns: {missing}"
            )

        transactions: list[Transaction] = []

        for row_number, row in enumerate(reader, start=2):

            if len(transactions) >= MAX_TRANSACTIONS_PER_UPLOAD:
                raise ValueError(
                    f"CSV exceeds the maximum allowed "
                    f"transaction count of "
                    f"{MAX_TRANSACTIONS_PER_UPLOAD}."
                )

            try:
                transaction_id = row["transaction_id"].strip()
                date_value = date.fromisoformat(
                    row["date"].strip()
                )
                amount = float(row["amount"])
                direction = row["direction"].strip().upper()
                payment_type = row["payment_type"].strip().upper()

            except (ValueError, AttributeError, TypeError) as error:
                raise ValueError(
                    f"Invalid data at CSV row {row_number}: {error}"
                ) from error

            transactions.append(
                Transaction(
                    id=transaction_id,
                    date=date_value,
                    amount=amount,
                    direction=direction,
                    payment_type=payment_type,
                )
            )

        validate_transactions(transactions)

        return transactions

    finally:
        if should_close:
            file.close()