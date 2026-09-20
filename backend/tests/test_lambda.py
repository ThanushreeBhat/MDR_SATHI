import json
from unittest.mock import patch

from aws.handler import lambda_handler


@patch("aws.handler.save_calculation")
def test_lambda_estimate(mock_save):
    event = {
        "body": """
        {
            "operation": "estimate",
            "classification": "P2M",
            "monthly_upi_volume": 100000,
            "transaction_count": 100
        }
        """
    }

    result = lambda_handler(event, None)

    assert result["statusCode"] == 200

    body = json.loads(result["body"])

    assert "calculation_id" in body

    mock_save.assert_called_once()