export interface AssessmentRequest {
  monthlyUpiReceipts: number;
  averageTransactionSize: number;
  transactionsAbove2000: number;
  transactions?: number[];
  customTransactions?: string;
}

export type AssessmentStatus = "EXEMPT" | "MDR_APPLIES" | "MOCK_PENDING";

export type ExplanationLanguage = "en" | "hi" | "kn";

export type ExplanationContent = Partial<
  Record<ExplanationLanguage, string>
>;

export interface AffectedTransaction {
  amount: number;
  mdr: number;
}

export interface MdrBackendResponse {
  status: "EXEMPT" | "MDR_APPLIES";
  monthly_upi_receipts: number;
  threshold: number;
  affected_transactions: number;
  total_mdr: number;
  transactions?: AffectedTransaction[];
  explanation?: string;
  explanations?: ExplanationContent;
}

export interface MdrCalculateRequest {
  monthly_upi_receipts: number;
  transactions: number[];
}

export interface AssessmentResult {
  assessmentId: string;
  status: AssessmentStatus;
  title: string;
  explanation?: string;
  explanations?: ExplanationContent;
  request: AssessmentRequest;
  assessedAt: string;
  effectiveDate?: string;
  exemptionReason?: string;
  applicableTransactionCount?: number;
  monthlyEstimatedImpact?: number;
  applicableRate?: number;
  perTransactionCap?: number;
  isMock?: boolean;
  // Direct rules-engine values from backend response
  monthly_upi_receipts: number;
  threshold: number;
  affected_transactions: number;
  total_mdr: number;
  transactions?: AffectedTransaction[];
}

export interface MdrApi {
  submitAssessment(request: AssessmentRequest): Promise<AssessmentResult>;
  submitCsvAssessment(file: File): Promise<AssessmentResult>;
  calculateMDR?(
    request: MdrCalculateRequest,
    originalRequest?: AssessmentRequest
  ): Promise<AssessmentResult>;
}
