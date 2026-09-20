# MDR Sathi --- Requirements, API Documentation & Step-by-Step Run Guide

## 1. Purpose

This document explains how to install, run, test, build, deploy, and use
the current MDR Sathi backend.

The current implementation uses:

``` text
Python
FastAPI
pytest
Docker
AWS CLI
AWS SAM CLI
AWS Lambda
API Gateway
DynamoDB
S3
CloudWatch
```

The current AWS deployment uses:

``` text
Region: ap-south-1
CloudFormation Stack: mdr
```

The original build plan maps Lambda to the deterministic rules engine
and CSV parsing, DynamoDB to merchant/calculation history, and S3 to raw
CSV storage. The AI explanation agent, Cognito, frontend, alerts, and
CDN are later stages. fileciteturn0file0L38-L60

------------------------------------------------------------------------

# 2. Prerequisites

Install the following before running the project.

## 2.1 Python

Recommended:

``` text
Python 3.12
```

Verify:

``` powershell
python --version
```

------------------------------------------------------------------------

## 2.2 Git

Verify:

``` powershell
git --version
```

------------------------------------------------------------------------

## 2.3 AWS CLI

The AWS CLI is required for checking AWS credentials/identity and
interacting with AWS.

Verify:

``` powershell
aws --version
```

Verify the configured AWS identity:

``` powershell
aws sts get-caller-identity
```

------------------------------------------------------------------------

## 2.4 AWS SAM CLI

SAM is required for:

-   building the Lambda application
-   running Lambda locally
-   running the API locally through SAM
-   deploying the CloudFormation stack

Verify:

``` powershell
sam --version
```

------------------------------------------------------------------------

## 2.5 Docker

Docker is optional for the current AWS deployment, but is useful for
local container execution.

Verify:

``` powershell
docker --version
docker compose version
```

------------------------------------------------------------------------

# 3. AWS Configuration

Check the configured region:

``` powershell
aws configure get region
```

The current project uses:

``` text
ap-south-1
```

If necessary:

``` powershell
aws configure set region ap-south-1
```

Then verify:

``` powershell
aws sts get-caller-identity
```

Do not commit AWS credentials, secret keys, or temporary credentials
into the repository.

------------------------------------------------------------------------

# 4. Project Structure

From the project root, the important structure is:

``` text
upi-cost-engine/
│
├── app/
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
│
├── aws/
│   └── handler.py
│
├── tests/
│
├── data/
│   ├── sample_transactions.csv
│   └── multi_month_transactions.csv
│
├── main.py
├── template.yaml
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
└── .dockerignore
```

The financial logic is kept inside `app/` and reused by the local API
and AWS Lambda.

------------------------------------------------------------------------

# 5. Python Environment Setup

From the project root:

``` powershell
python -m venv .venv
```

Activate the environment in PowerShell:

``` powershell
.\.venv\Scripts\Activate.ps1
```

For CMD:

``` cmd
.venv\Scripts\activate
```

For Git Bash:

``` bash
source .venv/Scripts/activate
```

------------------------------------------------------------------------

# 6. Install Dependencies

Run:

``` powershell
pip install -r requirements.txt
```

The project currently requires packages including:

``` text
fastapi
uvicorn
pytest
python-multipart
boto3
```

------------------------------------------------------------------------

# 7. Run the Automated Test Suite

Run:

``` powershell
pytest -v
```

The tests cover the main calculation, validation, parsing, monthly
analysis, API, and Lambda behavior.

This document intentionally does not list every individual test case;
the test suite itself is the source of truth for detailed test coverage.

------------------------------------------------------------------------

# 8. Local FastAPI Server

Start the local application:

``` powershell
uvicorn app.api:app --reload
```

The API will normally be available at:

``` text
http://127.0.0.1:8000
```

Swagger/OpenAPI documentation:

``` text
http://127.0.0.1:8000/docs
```

------------------------------------------------------------------------

# 9. Local API Endpoints

The local FastAPI application implements the following endpoints.

  Method   Endpoint      Purpose
  -------- ------------- --------------------------------
  GET      `/health`     Health check
  POST     `/estimate`   Rough monthly cost estimation
  POST     `/analyze`    Exact transaction/CSV analysis

------------------------------------------------------------------------

## 9.1 GET `/health`

### Purpose

Checks whether the FastAPI application is running.

### Request

``` http
GET /health
```

### Response

``` json
{
  "status": "ok"
}
```

### Example

``` powershell
curl.exe http://127.0.0.1:8000/health
```

------------------------------------------------------------------------

# 10. POST `/estimate`

### Purpose

Performs a rough cost estimation when the merchant does not provide
transaction-level history.

This endpoint is intended for the manual-estimate workflow.

### Request

``` http
POST /estimate
Content-Type: application/json
```

### Request fields

``` json
{
  "classification": "P2M",
  "monthly_upi_volume": 150000,
  "transaction_count": 30,
  "average_transaction_amount": 5000
}
```

Fields:

  Field                          Description
  ------------------------------ -------------------------------------------------
  `classification`               Merchant classification such as `P2M` or `P2PM`
  `monthly_upi_volume`           Approximate monthly UPI receipts
  `transaction_count`            Approximate monthly transaction count
  `average_transaction_amount`   Optional average transaction amount

If `average_transaction_amount` is not provided, the estimator can
derive it from:

``` text
monthly_upi_volume / transaction_count
```

### Response

The response contains the estimated result, including fields such as:

``` text
estimate_type
monthly_upi_volume
transaction_count
average_transaction_amount
p2pm_eligible
projected_mdr
current_cost
additional_cost
explanation_code
message
```

Example:

``` json
{
  "estimate_type": "ROUGH",
  "monthly_upi_volume": 150000,
  "transaction_count": 30,
  "average_transaction_amount": 5000,
  "p2pm_eligible": false,
  "projected_mdr": 480,
  "current_cost": 0,
  "additional_cost": 480
}
```

The exact response fields should be treated according to the project's
current response model.

------------------------------------------------------------------------

# 11. POST `/analyze`

### Purpose

Performs transaction-level analysis using an uploaded CSV.

This is the exact-data path.

The original build plan identifies CSV upload as the stretch input and
specifies that the same Lambda/rules engine should parse it. PDF parsing
is intentionally excluded. fileciteturn0file0L35-L37

### Request

``` http
POST /analyze
Content-Type: multipart/form-data
```

Form fields:

``` text
file
classification
```

Example:

``` powershell
curl.exe -X POST "http://127.0.0.1:8000/analyze" `
  -F "file=@data/sample_transactions.csv" `
  -F "classification=P2M"
```

### CSV columns

The CSV must contain:

``` text
transaction_id
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
TX003,2026-09-02,1500,CREDIT,UPI
TX004,2026-09-02,5000,CREDIT,UPI
```

### Response

The response contains the monthly calculation result.

The analysis includes information such as:

``` text
monthly volume
transaction count
P2PM eligibility
transactions above ₹2,000
projected MDR
current cost
additional cost
effective date
explanation code
```

For multi-month files, results are grouped by:

``` text
YYYY-MM
```

------------------------------------------------------------------------

# 12. AWS API

The AWS deployment exposes the Lambda through API Gateway.

Current endpoint:

``` text
https://gwgyzmb6.execute-api.ap-south-1.amazonaws.com/Prod/calculate
```

Current method:

``` http
POST /Prod/calculate
```

The current AWS API uses an `operation` field rather than separate API
Gateway routes.

Implemented operations are:

``` text
estimate
analyze
get_calculation
generate_upload_url
analyze_s3
```

Therefore the current AWS API contract is:

``` text
POST /calculate
    operation = estimate

POST /calculate
    operation = analyze

POST /calculate
    operation = get_calculation

POST /calculate
    operation = generate_upload_url

POST /calculate
    operation = analyze_s3
```

------------------------------------------------------------------------

# 13. AWS `estimate` Operation

### Request

``` http
POST /Prod/calculate
Content-Type: application/json
```

``` json
{
  "operation": "estimate",
  "classification": "P2M",
  "monthly_upi_volume": 150000,
  "transaction_count": 30,
  "average_transaction_amount": 5000
}
```

### Purpose

Runs the rough estimation engine inside Lambda.

Flow:

``` text
API Gateway
    ↓
Lambda
    ↓
Estimator
    ↓
Rules
    ↓
Structured result
```

------------------------------------------------------------------------

# 14. AWS `analyze` Operation

### Request

``` json
{
  "operation": "analyze",
  "classification": "P2M",
  "csv_content": "transaction_id,date,amount,direction,payment_type\nTX001,2026-09-01,850,CREDIT,UPI"
}
```

### Purpose

Analyzes CSV content supplied to Lambda.

The current implementation can store the raw CSV in S3 and then process
the transaction data.

Flow:

``` text
API Gateway
    ↓
Lambda
    ├── S3
    ├── CSV parser
    ├── monthly analyzer
    └── calculator
          ↓
       DynamoDB
```

The `analyze` operation is useful for direct API testing. The preferred
browser upload path is the presigned-S3 workflow documented below.

------------------------------------------------------------------------

# 15. AWS `get_calculation` Operation

### Purpose

Retrieves a previously stored calculation from DynamoDB.

### Request

``` json
{
  "operation": "get_calculation",
  "calculation_id": "YOUR_CALCULATION_ID"
}
```

### Processing

``` text
API Gateway
    ↓
Lambda
    ↓
DynamoDB GetItem
    ↓
Stored calculation
```

### Stored information

A calculation record can contain:

``` text
calculation_id
created_at
operation
classification
result
s3_object_key
```

`s3_object_key` is present for calculations associated with an uploaded
CSV.

------------------------------------------------------------------------

# 16. AWS `generate_upload_url` Operation

### Purpose

Creates a temporary presigned S3 URL so that a client can upload a CSV
directly to S3.

### Request

``` json
{
  "operation": "generate_upload_url"
}
```

### Response

``` json
{
  "object_key": "transactions/2026/09/20/<uuid>.csv",
  "upload_url": "https://...",
  "expires_in": 900
}
```

The URL is temporary and should not be treated as a permanent
application credential.

### Flow

``` text
Client
   ↓
API Gateway
   ↓
Lambda
   ↓
Presigned URL
   ↓
Client
   ↓
S3
```

------------------------------------------------------------------------

# 17. AWS `analyze_s3` Operation

### Purpose

Analyzes a CSV that has already been uploaded to S3.

### Request

``` json
{
  "operation": "analyze_s3",
  "classification": "P2M",
  "object_key": "transactions/2026/09/20/<uuid>.csv"
}
```

### Processing

``` text
API Gateway
    ↓
Lambda
    ↓
S3 GetObject
    ↓
CSV parser
    ↓
Monthly analyzer
    ↓
Calculator
    ↓
DynamoDB
```

### Response

The result includes:

``` text
calculation_id
s3_object_key
analysis_type
transaction_count
classification
monthly results
```

The corresponding DynamoDB record also stores the S3 object key.

------------------------------------------------------------------------

# 18. Complete CSV Upload Flow

The current preferred CSV architecture is:

``` text
                Client
                  |
                  | 1. request upload URL
                  v
             API Gateway
                  |
                  v
               Lambda
                  |
                  v
          Presigned S3 URL
                  |
                  | 2. direct PUT
                  v
                 S3
                  |
                  | 3. object key
                  v
               Lambda
                  |
          +-------+-------+
          |               |
          v               v
       CSV parser     DynamoDB
          |
          v
      Calculator
```

This prevents the complete CSV file from having to pass through API
Gateway and Lambda during upload.

------------------------------------------------------------------------

# 19. Deterministic Rules Used by the API

The current rule constants include:

``` python
P2PM_MONTHLY_THRESHOLD = 100_000.0
FREE_TRANSACTION_THRESHOLD = 2_000.0
STANDARD_MDR_RATE = 0.004
MAXIMUM_MDR_PER_TRANSACTION = 300.0
EFFECTIVE_DATE = date(2026, 10, 15)
```

The build plan states the core rule as:

``` text
if monthly UPI receipts <= 100000:
    status = EXEMPT
    monthly_cost = 0
else:
    for each transaction > 2000:
        fee = min(0.004 * amount, 300)
    monthly_cost = sum(fees)
```

The same source specifies the 0.4% rate, ₹2,000 threshold, ₹300 cap, and
₹1 lakh exemption. fileciteturn0file0L83-L92

These policy values are isolated in `app/rules.py`.

------------------------------------------------------------------------

# 20. DynamoDB

Current table:

``` text
MDRSathiCalculationHistory
```

Partition key:

``` text
calculation_id
```

The table is used for calculation history.

A typical record contains:

``` text
calculation_id
created_at
operation
classification
result
s3_object_key
```

`result` contains the structured calculation output.

------------------------------------------------------------------------

# 21. S3

S3 is used for raw CSV storage.

Object keys follow the structure:

``` text
transactions/YYYY/MM/DD/<uuid>.csv
```

The bucket is configured with:

``` text
server-side encryption
public access blocked
```

Lambda has the permissions required to put/get objects used by the
application.

------------------------------------------------------------------------

# 22. CloudWatch

CloudWatch receives Lambda logs.

Use it to inspect:

``` text
Lambda invocations
application logs
exceptions
AWS integration errors
```

AWS Console path:

``` text
Lambda
  → Function
  → Monitor
  → View CloudWatch logs
```

------------------------------------------------------------------------

# 23. Local Docker Execution

Build:

``` powershell
docker build -t upi-cost-engine .
```

Run:

``` powershell
docker run --rm -p 8000:8000 upi-cost-engine
```

Open:

``` text
http://localhost:8000/docs
```

Or:

``` powershell
docker compose up --build
```

Stop:

``` powershell
docker compose down
```

------------------------------------------------------------------------

# 24. AWS SAM Build

From the project root:

``` powershell
sam build
```

SAM reads:

``` text
template.yaml
```

and builds the Lambda deployment package.

Generated build files are placed under:

``` text
.aws-sam/
```

------------------------------------------------------------------------

# 25. Run the AWS API Locally

Start:

``` powershell
sam local start-api
```

The local SAM API normally runs on:

``` text
http://127.0.0.1:3000
```

The Lambda API route is:

``` text
POST /calculate
```

Example:

``` powershell
curl.exe -X POST "http://127.0.0.1:3000/calculate" `
  -H "Content-Type: application/json" `
  -d "{\"operation\":\"estimate\",\"classification\":\"P2M\",\"monthly_upi_volume\":100000,\"transaction_count\":100}"
```

------------------------------------------------------------------------

# 26. First AWS Deployment

For the first deployment:

``` powershell
sam deploy --guided
```

Use:

``` text
Stack name:
mdr

Region:
ap-south-1
```

SAM will ask for deployment configuration.

After the guided deployment has saved the configuration, normal
deployments can use:

``` powershell
sam deploy
```

------------------------------------------------------------------------

# 27. Deployment Workflow

After changing Lambda/application code:

``` powershell
pytest -v
```

Then:

``` powershell
sam build
```

Then test locally if required:

``` powershell
sam local start-api
```

Then deploy:

``` powershell
sam deploy
```

After deployment, verify:

``` text
API Gateway
CloudWatch
DynamoDB
S3
```

------------------------------------------------------------------------

# 28. AWS Resource Verification

## API Gateway

Verify the deployed API endpoint:

``` text
https://gwgwzigmb6.execute-api.ap-south-1.amazonaws.com/Prod/calculate
```

## Lambda

Verify that the Lambda function is deployed and has a successful
invocation.

## DynamoDB

Open:

``` text
AWS Console
→ DynamoDB
→ Tables
→ MDRSathiCalculationHistory
→ Explore table items
```

## S3

Open:

``` text
AWS Console
→ S3
→ project bucket
→ transactions/
```

## CloudWatch

Open the Lambda's CloudWatch log group and verify invocation logs.

------------------------------------------------------------------------

# 29. Security Requirements

Never commit:

``` text
AWS access keys
AWS secret keys
temporary credentials
.env files containing secrets
presigned URLs
```

AWS Lambda should use its IAM execution role to access DynamoDB and S3.

S3 is configured to block public access.

Presigned URLs should be treated as temporary access credentials.

------------------------------------------------------------------------

# 30. Troubleshooting

## `sam` is not recognized

Check:

``` powershell
sam --version
```

Install/configure AWS SAM CLI and restart the terminal.

## `aws` is not recognized

Check:

``` powershell
aws --version
```

Install/configure AWS CLI and restart the terminal.

## AWS credentials error

Run:

``` powershell
aws sts get-caller-identity
```

Configure the approved AWS credential mechanism.

## SAM build failure

Run:

``` powershell
pip install -r requirements.txt
sam build
```

Check:

``` text
template.yaml
aws/handler.py
app/
requirements.txt
```

## Lambda returns 500

Check the Lambda's CloudWatch logs.

## DynamoDB failure

Check:

``` text
CALCULATION_TABLE_NAME
DynamoDB table
Lambda IAM permissions
AWS region
```

## S3 failure

Check:

``` text
RAW_CSV_BUCKET_NAME
s3:PutObject
s3:GetObject
bucket region
object key
```

------------------------------------------------------------------------

# 31. Current Implementation Status

## Completed

``` text
✓ Deterministic rules engine
✓ P2PM/P2M calculation logic
✓ Rough estimator
✓ CSV parser
✓ CSV validation
✓ Monthly analyzer
✓ FastAPI API
✓ AWS SAM project
✓ AWS Lambda
✓ API Gateway
✓ CloudWatch logging
✓ DynamoDB calculation history
✓ S3 raw CSV storage
✓ Presigned S3 upload flow
✓ S3-based CSV analysis
```

## Planned

The original build plan still lists these later components:

``` text
Cognito
Next.js + Amplify Hosting
Strands Agents SDK
SageMaker AI
Certificate generation
WhatsApp sharing
SNS / EventBridge
CloudFront
```

The build plan specifically places the AI explanation agent after the
deterministic rules engine and restricts the agent to explaining
calculated output and factual policy questions rather than generating
financial/tax/legal advice. fileciteturn0file0L27-L33

------------------------------------------------------------------------

# 32. Recommended Next Build Stage

The next backend stage is authentication and merchant identity:

``` text
Cognito
   ↓
API Gateway
   ↓
Lambda
   ↓
Merchant identity
   ↓
DynamoDB
```

This will allow calculation history to become merchant-scoped before the
frontend and AI layers are connected.
