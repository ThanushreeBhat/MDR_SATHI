# MDR Sathi

**UPI Merchant Impact & Trust Assistant** — built for the [First Commit](https://www.wemakedevs.org/aws/first-commit) hackathon.

A tool that tells any small Indian merchant, in plain language and their own tongue, whether the new UPI Merchant Discount Rate affects them — and gives them something trustworthy to share with other vendors.

---

## The Problem

NPCI's new 0.4% Merchant Discount Rate (MDR) on UPI payments takes effect **October 15, 2026**:

- Applies only to P2M (person-to-merchant) transactions **above ₹2,000**
- Capped at **₹300 per transaction**
- Merchants receiving **under ₹1,00,000/month** via UPI are **fully exempt**

None of that nuance is what's spreading on WhatsApp. There's real, reported confusion and misinformation — some merchants think it's a direct government tax on all their UPI income. Most small merchants have no way to find out, in thirty seconds, whether it applies to them at all.

## The Solution

```
[Manual slider input] → [Rules engine (Lambda)] → [AI explanation agent (SageMaker)] → [Certificate + WhatsApp share]
                              ↓
                    [CSV upload — stretch, same Lambda]
```

A merchant enters (or uploads) their rough monthly UPI numbers, gets an instant exemption/cost verdict from a deterministic rules engine, receives a plain-language explanation in their own language from a guardrailed AI agent, and can share a status certificate directly to WhatsApp.

## Features

| Priority | Feature | Status |
|---|---|---|
| 1 | Rules engine — exemption check + fee calculation | Core |
| 2 | Manual slider input UI | Core |
| 3 | Guardrailed AI explanation agent (English/Hindi/Kannada) | Core |
| 4 | Exemption certificate + WhatsApp share | Core |
| 5 | CSV statement upload | Stretch |

**Explicitly out of scope:** PDF parsing (too fragile to demo live), voice input, persistent multi-merchant accounts. These are roadmap items, not build targets.

## Architecture / AWS Services

| Layer | Service |
|---|---|
| Frontend | Amplify Hosting (Next.js) |
| API | API Gateway |
| Rules engine + CSV parsing | Lambda |
| Merchant data / calc history | DynamoDB |
| Raw CSV storage | S3 |
| AI explanation agent | Strands Agents SDK (local) → SageMaker AI (deployed) |
| Auth | Cognito |
| Alerts / reminders | SNS / EventBridge |
| Monitoring | CloudWatch |
| CDN | CloudFront |

## Rules Engine Logic

```python
if monthly_UPI_receipts <= 100000:
    status = "EXEMPT (small merchant / P2PM)"
    monthly_cost = 0
else:
    for each transaction > 2000:
        fee = min(0.004 * amount, 300)
    monthly_cost = sum(fees)
```

**Guardrail:** the AI agent only ever receives this calculated output as input — never raw user text — and is restricted to explaining the given numbers plus factual policy questions. It must never give financial, tax, or legal advice, and must never invent a number it wasn't given.

## Team

| Role | Owner | Owns |
|---|---|---|
| Rules + Backend | Person A | Calculation logic, API wrapper, CSV parsing stretch |
| AI Agent | Person B (Thanu) | Guardrailed explanation prompt, Strands SDK → SageMaker deployment |
| Frontend | Person C | Slider UI, results screen, certificate image, WhatsApp share |
| Infra + Demo | Person D | Cognito, deployment, SNS, demo video, Builder Center blog post |

## Getting Started

### AI Agent (Strands SDK)
```bash
pip install strands-agents
```
Build and test locally against mock rules-engine output before wiring to the real Lambda endpoint. See the input contract below.

### Input contract (Rules engine → AI agent)
```json
{
  "status": "EXEMPT",
  "monthly_receipts": 80000,
  "monthly_cost": 0,
  "threshold": 100000
}
```

### Frontend
```bash
npx create-next-app@latest
```
Deploy via Amplify Hosting once the core flow works end-to-end locally.

## Build Order

1. Rules engine, hand-tested against the three thresholds
2. Manual input UI wired to a mocked API response
3. AI agent tested locally against mock JSON (exempt / liable / boundary / "is this a tax?" cases)
4. Wire agent to real Lambda output
5. Certificate + WhatsApp share
6. CSV upload (only if core is solid)
7. Deploy to SageMaker AI / Amplify (Ship It)
8. Record 3-minute demo video + Builder Center blog post

## Disclaimer

This tool provides informational estimates based on the publicly announced NPCI MDR framework. It is not financial, tax, or legal advice.