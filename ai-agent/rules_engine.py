def calculate_mdr(monthly_upi_receipts, transactions):
    """
    Deterministic MDR Sathi rules engine.

    monthly_upi_receipts: total monthly UPI receipts in INR
    transactions: list of transaction amounts in INR
    """

    threshold = 100000

    # Exemption rule
    if monthly_upi_receipts <= threshold:
        return {
            "status": "EXEMPT",
            "monthly_upi_receipts": monthly_upi_receipts,
            "threshold": threshold,
            "affected_transactions": 0,
            "total_mdr": 0.0
        }

    # Calculate MDR only for transactions above ₹2,000
    affected_transactions = []
    total_mdr = 0.0

    for amount in transactions:
        if amount > 2000:
            fee = min(0.004 * amount, 300)
            total_mdr += fee

            affected_transactions.append({
                "amount": amount,
                "mdr": round(fee, 2)
            })

    return {
        "status": "MDR_APPLIES",
        "monthly_upi_receipts": monthly_upi_receipts,
        "threshold": threshold,
        "affected_transactions": len(affected_transactions),
        "total_mdr": round(total_mdr, 2),
        "transactions": affected_transactions
    }


if __name__ == "__main__":

    # Test data
    monthly_receipts = 150000

    transactions = [
        500,
        2500,
        3000,
        1000,
        5000
    ]

    result = calculate_mdr(
        monthly_receipts,
        transactions
    )

    print("\n--- MDR SATHI RULES ENGINE ---\n")
    print(result)