# MDR Sathi --- Architecture & Rules Engine

## 1. Overview

MDR Sathi is a merchant-facing UPI impact assistant. The project was
built around a deterministic rules engine first, with an AI explanation
layer planned afterward.

The build plan maps the main system to:

-   Next.js + Amplify Hosting --- frontend
-   API Gateway --- API
-   AWS Lambda --- rules engine and CSV parsing
-   DynamoDB --- merchant data and calculation history
-   S3 --- raw CSV storage
-   Strands Agents SDK → SageMaker AI --- AI explanation agent
-   Cognito --- authentication
-   SNS / EventBridge --- alerts and reminders
-   CloudWatch --- logs and monitoring
-   CloudFront --- CDN

The build plan defines the core loop as manual input → rules engine → AI
explanation → certificate/WhatsApp sharing, with CSV upload as the
stretch input and PDF parsing outside the demo scope.

## 2. Current Architecture

``` text
                    API Gateway
                         |
                         v
                      Lambda
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
     Calculator         S3          DynamoDB
     / Estimator      raw CSV       calculation
     / CSV Parser     storage         history
          |              |              |
          +--------------+--------------+
                         |
                         v
                    CloudWatch
                       logs
```

The currently implemented AWS backend is API Gateway → Lambda →
DynamoDB/S3, with CloudWatch logging.

The AI, Cognito, frontend, SNS/EventBridge, and CloudFront layers are
planned but not yet implemented.

## 3. Repository Structure

``` text
upi-cost-engine/
├── app/
│   ├── __init__.py
│   ├── models.py
│   ├── rules.py
│   ├── parser.py
│   ├── validator.py
│   ├── monthly_analyzer.py
│   ├── calculator.py
│   ├── estimator.py
│   ├── api_models.py
│   ├── api.py
│   ├── serialization.py
│   ├── dynamodb_repository.py
│   └── s3_repository.py
├── aws/
│   ├── __init__.py
│   └── handler.py
├── tests/
├── data/
├── main.py
├── template.yaml
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
└── .dockerignore
```

`monthly.py` was removed during refactoring; monthly grouping is now in
`monthly_analyzer.py`.

## 4. Core Design Principle

The financial calculation is performed by deterministic Python code.

``` text
Input
  |
  v
Validation
  |
  v
Deterministic Rules Engine
  |
  v
Structured Result
  |
  v
AI explanation later
```

The AI layer must not become the source of truth for the financial
calculation.

The same `app/` engine is reused by local FastAPI and AWS Lambda.

## 5. Data Model

### Merchant classification

``` text
P2PM
P2M
UNKNOWN
```

### Transaction

``` text
id
date
amount
direction
payment_type
```

Example:

``` csv
transaction_id,date,amount,direction,payment_type
TX001,2026-09-01,850,CREDIT,UPI
TX002,2026-09-01,3200,CREDIT,UPI
```

The validator accepts:

``` text
direction: CREDIT / DEBIT
payment_type: UPI
```

The cost calculation uses `CREDIT + UPI` transactions as UPI receipts.

## 6. Rule Constants

The current implementation contains:

``` python
P2PM_MONTHLY_THRESHOLD = 100_000.0
FREE_TRANSACTION_THRESHOLD = 2_000.0
STANDARD_MDR_RATE = 0.004
MAXIMUM_MDR_PER_TRANSACTION = 300.0
EFFECTIVE_DATE = date(2026, 10, 15)
```

These values are isolated in `app/rules.py` so they can be changed in
one place if the official policy changes.

## 7. P2PM Logic

For an explicitly classified `P2PM` merchant:

``` text
monthly UPI volume <= ₹100,000
        |
        v
P2PM eligible
        |
        v
projected MDR = ₹0
```

The result uses:

``` text
p2pm_eligible = true
projected_mdr = 0
current_cost = 0
additional_cost = 0
explanation_code = P2PM_ZERO_MDR
```

If a P2PM merchant exceeds the threshold, the estimator does not pretend
it can calculate an exact MDR amount without transaction-level data.

## 8. P2M MDR Logic

For standard P2M calculations:

``` python
if amount <= 2000:
    MDR = 0
else:
    MDR = min(amount * 0.004, 300)
```

Monthly MDR is the sum of applicable transaction fees.

Example:

``` text
₹3,000 × 0.004 = ₹12
```

Example of the cap:

``` text
₹100,000 × 0.004 = ₹400
cap = ₹300
MDR = ₹300
```

## 9. ₹2,000 Threshold

Transactions at or below ₹2,000 are treated as free:

``` text
amount <= ₹2,000
        |
        v
MDR = ₹0
```

The calculator also counts transactions above ₹2,000 using:

``` text
transactions_above_2000
```

## 10. UNKNOWN Classification

The implementation does not infer P2PM eligibility solely from volume.

If classification is `UNKNOWN`, the result is:

``` text
p2pm_eligible = None
projected_mdr = None
additional_cost = None
explanation_code = CLASSIFICATION_REQUIRED
```

This prevents unsupported exemption decisions.

## 11. Monthly Analyzer

Transactions are grouped by:

``` text
YYYY-MM
```

Example:

``` text
2026-08
2026-09
```

`monthly_analyzer.py` handles grouping.

`calculator.py` handles financial/business rules.

## 12. Rough Estimator

Merchants without transaction history can provide:

``` text
classification
monthly UPI volume
transaction count
optional average transaction amount
```

If average transaction amount is omitted:

``` text
average = monthly volume / transaction count
```

The estimator is explicitly a rough estimate.

``` text
Transaction history -> exact calculation
Manual estimate     -> rough calculation
```

For P2M estimation, the supplied average transaction amount is used to
approximate the per-transaction MDR. Exact transaction-level data is
required for an exact calculation.

## 13. CSV Parser and Validation

Required CSV columns:

``` text
transaction_id
date
amount
direction
payment_type
```

Dates use:

``` text
YYYY-MM-DD
```

The parser converts CSV rows into `Transaction` objects.

Validation rejects:

-   empty transaction lists
-   duplicate IDs
-   missing IDs
-   zero/negative amounts
-   invalid directions
-   invalid payment types
-   malformed dates

Current upload limits:

``` text
Maximum CSV size: 10 MB
Maximum transactions: 100,000
```

## 14. Local API

FastAPI currently exposes:

``` text
GET  /health
POST /analyze
POST /estimate
```

`/analyze` accepts a CSV upload and merchant classification.

`/estimate` accepts JSON input.

## 15. AWS Lambda

Entry point:

``` text
aws.handler.lambda_handler
```

The Lambda calls the same deterministic engine used locally.

Current operations include:

``` text
estimate
analyze
get_calculation
generate_upload_url
analyze_s3
```

The Lambda does not contain a second MDR formula.

## 16. API Gateway

Current deployed endpoint:

``` text
https://gwgyzmb6.execute-api.ap-south-1.amazonaws.com/Prod/calculate
```

The initial API uses:

``` text
POST /calculate
```

with an `operation` field.

A later API cleanup can expose separate REST-style routes.

## 17. DynamoDB

Table:

``` text
MDRSathiCalculationHistory
```

Partition key:

``` text
calculation_id
```

Stored information includes:

``` text
calculation_id
created_at
operation
classification
result
s3_object_key (for CSV analysis)
```

DynamoDB stores calculation history. It does not perform the MDR
calculation.

## 18. S3

S3 stores raw CSV files.

Object keys use the structure:

``` text
transactions/YYYY/MM/DD/<uuid>.csv
```

The bucket is configured with:

``` text
server-side encryption
public access blocked
```

The current upload architecture supports presigned URLs:

``` text
Frontend
   |
   v
request upload URL
   |
   v
Lambda
   |
   v
presigned URL
   |
   v
Frontend -> S3
```

Lambda can then retrieve the CSV from S3 for analysis.

## 19. CloudWatch

Lambda logs are available in CloudWatch.

Unexpected exceptions are logged server-side while the client receives a
generic internal-server-error response.

## 20. Docker

Docker files were created for reproducible local execution:

``` text
Dockerfile
docker-compose.yml
.dockerignore
```

The container runs FastAPI on port 8000.

## 21. Testing

Tests cover:

``` text
Calculator
- P2PM threshold cases
- free transaction threshold
- MDR calculation
- MDR cap

Validator
- invalid amounts
- duplicate IDs
- invalid direction/payment type

Monthly analysis
- multi-month grouping

API
- health
- estimate
- CSV upload
- invalid files/data

Lambda
- estimate
- invalid operations
```

AWS integrations should be mocked for unit tests rather than requiring
live AWS resources.

## 22. Future Architecture

``` text
Merchant
   |
   v
Next.js + Amplify
   |
   +--------------------+
   |                    |
Manual input          CSV upload
   |                    |
   |                    v
   |                    S3
   |                    |
   +---------+----------+
             |
             v
        API Gateway
             |
             v
          Lambda
             |
       Rules Engine
             |
       +-----+-----+
       |           |
       v           v
   DynamoDB        S3
       |
       v
Structured result
       |
       v
Strands Agents SDK
       |
       v
SageMaker AI
       |
       v
English / Hindi / Kannada explanation
       |
   +---+---+
   |       |
Certificate WhatsApp
```

The build plan specifies that the AI agent should receive the rules
engine's calculated output rather than raw user text and should be
restricted to explaining the supplied numbers and factual policy
information.

## 23. Out of Scope

The build plan explicitly keeps these outside the demo scope:

-   PDF statement parsing
-   Bhashini voice integration
-   voice-first ledger/ingredient tracking
-   full multi-merchant persistent login/account workflows

## 24. Maintenance Rule

Keep policy values centralized in:

``` text
app/rules.py
```

When policy values change:

1.  Update `app/rules.py`.
2.  Update/add tests.
3.  Run the complete test suite.
4.  Rebuild Lambda with SAM.
5.  Deploy.
