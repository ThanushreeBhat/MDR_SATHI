from app.models import MerchantClassification
from app.parser import parse_csv
from app.monthly_analyzer import analyze_months


def main():

    transactions = parse_csv(
        "data/multi_month_transactions.csv"
    )

    results = analyze_months(
        transactions,
        MerchantClassification.P2M,
    )

    print("\n===== UPI COST ANALYSIS =====\n")

    for month, result in results.items():

        print(f"Month: {month}")
        print(
            f"UPI Volume: "
            f"₹{result['upi_volume']:,.2f}"
        )
        print(
            f"Transactions: "
            f"{result['transaction_count']}"
        )
        print(
            f"P2PM Eligible: "
            f"{result['p2pm_eligible']}"
        )
        print(
            f"Transactions > ₹2,000: "
            f"{result['transactions_above_2000']}"
        )
        print(
            f"Projected MDR: "
            f"₹{result['projected_mdr']:,.2f}"
        )
        print(
            f"Current Cost: "
            f"₹{result['current_cost']:,.2f}"
        )
        print(
            f"Additional Cost: "
            f"₹{result['additional_cost']:,.2f}"
        )
        print(
            f"Explanation: "
            f"{result['explanation_code']}"
        )

        print("-" * 40)


if __name__ == "__main__":
    main()