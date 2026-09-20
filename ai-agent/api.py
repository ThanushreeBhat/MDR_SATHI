import sys
from http.server import BaseHTTPRequestHandler, HTTPServer
import json

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

from rules_engine import calculate_mdr
from agent import explain_mdr_result, generate_explanations


class MDRHandler(BaseHTTPRequestHandler):

    def send_json(self, status_code, data):

        response = json.dumps(data, ensure_ascii=False).encode("utf-8")

        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()

        self.wfile.write(response)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()

    def do_GET(self):
        if self.path in ("/", "/health"):
            self.send_json(200, {"status": "ok", "service": "mdr-sathi-api"})
        else:
            self.send_json(404, {"error": "Route not found"})

    def do_POST(self):

        if self.path != "/calculate":
            self.send_json(404, {"error": "Route not found"})
            return

        try:

            content_length = int(
                self.headers.get("Content-Length", 0)
            )

            body = self.rfile.read(content_length)

            data = json.loads(body.decode("utf-8") if isinstance(body, bytes) else body)

            monthly_receipts = float(data["monthly_upi_receipts"])
            raw_txns = data.get("transactions", [])
            transactions = [float(amount) for amount in raw_txns]

            # 1. Deterministic rules calculation
            result = calculate_mdr(
                monthly_receipts,
                transactions
            )

            # 2. Guardrailed AI explanation layer
            result["explanation"] = explain_mdr_result(result, language="English")
            result["explanations"] = generate_explanations(result)

            self.send_json(200, result)

        except Exception as error:

            self.send_json(
                400,
                {
                    "error": str(error)
                }
            )


if __name__ == "__main__":

    server = HTTPServer(
        ("0.0.0.0", 8000),
        MDRHandler
    )

    print("MDR Sathi API running on http://localhost:8000")

    server.serve_forever()