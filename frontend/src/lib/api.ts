import { mockApi } from "@/lib/mock-api";
import type {
  AssessmentRequest,
  AssessmentResult,
  MdrApi,
  MdrCalculateRequest,
  MdrBackendResponse,
} from "@/lib/types";

// Disable mock by default unless NEXT_PUBLIC_USE_MOCK_API is explicitly "true"
const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

// Use NEXT_PUBLIC_API_URL or NEXT_PUBLIC_API_BASE_URL, default to http://localhost:8000
const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:8000";

export function parseTransactionAmounts(input?: string): number[] {
  if (!input || !input.trim()) return [];
  return input
    .split(/[\s,]+/)
    .map((val) => Number(val.trim()))
    .filter((val) => Number.isFinite(val) && val > 0);
}

export function synthesizeTransactions(request: AssessmentRequest): number[] {
  if (request.transactions && request.transactions.length > 0) {
    return request.transactions;
  }
  if (request.customTransactions) {
    const parsed = parseTransactionAmounts(request.customTransactions);
    if (parsed.length > 0) return parsed;
  }

  // Synthesize from existing inputs (averageTransactionSize and transactionsAbove2000)
  const txList: number[] = [];
  const largeCount = Math.max(0, request.transactionsAbove2000 || 0);
  const avg = Math.max(0, request.averageTransactionSize || 0);
  const largeAmount = Math.max(2001, avg);

  for (let i = 0; i < largeCount; i++) {
    txList.push(largeAmount);
  }

  // If there are receipts remaining, add smaller transactions (<= 2000)
  const largeTotal = largeAmount * largeCount;
  const remaining = Math.max(0, request.monthlyUpiReceipts - largeTotal);
  if (remaining > 0) {
    const smallChunk = Math.min(1000, remaining);
    const count = Math.ceil(remaining / smallChunk);
    for (let i = 0; i < count; i++) {
      txList.push(smallChunk);
    }
  }

  return txList.length > 0 ? txList : [500];
}

export async function calculateMDR(
  calcRequest: MdrCalculateRequest,
  originalRequest?: AssessmentRequest
): Promise<AssessmentResult> {
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        monthly_upi_receipts: calcRequest.monthly_upi_receipts,
        transactions: calcRequest.transactions,
      }),
    });
  } catch {
    throw new Error(
      "Unable to connect to MDR Sathi. Please make sure the backend is running."
    );
  }

  if (!response.ok) {
    let errorDetail =
      "Unable to connect to MDR Sathi. Please make sure the backend is running.";
    try {
      const errJson = await response.json();
      if (errJson?.error) {
        errorDetail = errJson.error;
      }
    } catch {
      // fallback
    }
    throw new Error(errorDetail);
  }

  const data: MdrBackendResponse = await response.json();

  const isExempt = data.status === "EXEMPT";
  const title = isExempt
    ? "You are exempt from UPI MDR"
    : "MDR applies to transactions above ₹2,000";

  const exemptionReason = isExempt
    ? `Your monthly receipts of ₹${data.monthly_upi_receipts.toLocaleString(
        "en-IN"
      )} are within the ₹${data.threshold.toLocaleString(
        "en-IN"
      )} exemption threshold.`
    : undefined;

  const result: AssessmentResult = {
    assessmentId: `mdr-${Date.now()}`,
    status: data.status,
    title,
    explanation: data.explanation,
    explanations: data.explanations,
    request: originalRequest || {
      monthlyUpiReceipts: data.monthly_upi_receipts,
      averageTransactionSize:
        calcRequest.transactions.length > 0
          ? Math.round(
              calcRequest.transactions.reduce((a, b) => a + b, 0) /
                calcRequest.transactions.length
            )
          : 0,
      transactionsAbove2000: data.affected_transactions,
      transactions: calcRequest.transactions,
    },
    assessedAt: new Date().toISOString(),
    effectiveDate: "15 October 2026",
    exemptionReason,
    applicableTransactionCount: data.affected_transactions,
    monthlyEstimatedImpact: data.total_mdr,
    applicableRate: 0.4,
    perTransactionCap: 300,
    isMock: false,
    monthly_upi_receipts: data.monthly_upi_receipts,
    threshold: data.threshold,
    affected_transactions: data.affected_transactions,
    total_mdr: data.total_mdr,
    transactions: data.transactions || [],
  };

  return result;
}

export async function submitAssessment(
  request: AssessmentRequest
): Promise<AssessmentResult> {
  if (useMockApi) {
    return mockApi.submitAssessment(request);
  }

  const transactions = synthesizeTransactions(request);

  return calculateMDR(
    {
      monthly_upi_receipts: request.monthlyUpiReceipts,
      transactions,
    },
    request
  );
}

export async function submitCsvAssessment(file: File): Promise<AssessmentResult> {
  if (useMockApi) {
    return mockApi.submitCsvAssessment(file);
  }

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("classification", "P2M");

    const response = await fetch(`${apiBaseUrl}/analyze`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      const months = data.months || {};
      const firstMonthKey = Object.keys(months)[0];
      const monthData = firstMonthKey ? months[firstMonthKey] : null;

      const isExempt = monthData ? monthData.p2pm_eligible : true;
      const totalMdr = monthData ? monthData.projected_mdr || 0 : 0;
      const affectedCount = monthData ? monthData.transactions_above_2000 || 0 : 0;

      return {
        assessmentId: `csv-${Date.now()}`,
        status: isExempt ? "EXEMPT" : "MDR_APPLIES",
        title: isExempt
          ? "You are exempt from UPI MDR"
          : "MDR applies to transactions above ₹2,000",
        request: {
          monthlyUpiReceipts: monthData ? monthData.upi_volume : 0,
          averageTransactionSize: 0,
          transactionsAbove2000: affectedCount,
        },
        assessedAt: new Date().toISOString(),
        effectiveDate: "15 October 2026",
        exemptionReason: isExempt
          ? "Monthly statement is within the exemption threshold."
          : undefined,
        applicableTransactionCount: affectedCount,
        monthlyEstimatedImpact: totalMdr,
        applicableRate: 0.4,
        perTransactionCap: 300,
        monthly_upi_receipts: monthData ? monthData.upi_volume : 0,
        threshold: 100000,
        affected_transactions: affectedCount,
        total_mdr: totalMdr,
        transactions: [],
        isMock: false,
      };
    }
  } catch {
    // fallback
  }

  return mockApi.submitCsvAssessment(file);
}

export const assessmentApi: MdrApi = {
  submitAssessment,
  submitCsvAssessment,
  calculateMDR,
};
