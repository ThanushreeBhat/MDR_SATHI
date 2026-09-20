from http.server import BaseHTTPRequestHandler, HTTPServer
import json

from rules_engine import calculate_mdr


class MDRHandler(BaseHTTPRequestHandler):

    def send_json(self, status_code, data):

        response = json.dumps(data).encode("utf-8")

        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.end_headers()

        self.wfile.write(response)

    def do_OPTIONS(self):
        self.send_json(200, {"message": "OK"})

    def do_POST(self):

        if self.path != "/calculate":
            self.send_json(404, {"error": "Route not found"})
            return

        try:

            content_length = int(
                self.headers.get("Content-Length", 0)
            )

            body = self.rfile.read(content_length)

            data = json.loads(body)

            monthly_receipts = data["monthly_upi_receipts"]
            transactions = data["transactions"]

            result = calculate_mdr(
                monthly_receipts,
                transactions
            )

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
        ("localhost", 8000),
        MDRHandler
    )

    print("MDR Sathi API running on http://localhost:8000")

    server.serve_forever()