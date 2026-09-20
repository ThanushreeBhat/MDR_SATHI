export interface AssessmentRequest {
  monthlyUpiReceipts: number;
  averageTransactionSize: number;
  transactionsAbove2000: number;
}

export type AssessmentStatus = "EXEMPT" | "MDR_APPLIES" | "MOCK_PENDING";

export type ExplanationLanguage = "en" | "hi" | "kn";

export type ExplanationContent = Partial<
  Record<ExplanationLanguage, string>
>;

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
}

export interface MdrApi {
  submitAssessment(request: AssessmentRequest): Promise<AssessmentResult>;
  submitCsvAssessment(file: File): Promise<AssessmentResult>;
}
