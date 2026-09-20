from dataclasses import asdict
import json

from .models import CalculationResult


def result_to_json(
    result: CalculationResult,
) -> str:

    return json.dumps(
        asdict(result),
        indent=2,
    )