import { mockApi } from "@/lib/mock-api";
import type { AssessmentRequest, AssessmentResult, MdrApi } from "@/lib/types";

const useMockApi = process.env.NEXT_PUBLIC_USE_MOCK_API !== "false";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const gatewayApi: MdrApi = {
  async submitAssessment(request: AssessmentRequest): Promise<AssessmentResult> {
    if (!apiBaseUrl) {
      throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured.");
    }

    const response = await fetch(`${apiBaseUrl}/assessments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("The assessment could not be submitted.");
    }

    return response.json() as Promise<AssessmentResult>;
  },

  async submitCsvAssessment(file: File): Promise<AssessmentResult> {
    if (!apiBaseUrl) {
      throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured.");
    }

    const body = new FormData();
    body.append("file", file);
    const response = await fetch(`${apiBaseUrl}/assessments/csv`, {
      method: "POST",
      body,
    });

    if (!response.ok) {
      throw new Error("The CSV could not be submitted.");
    }

    return response.json() as Promise<AssessmentResult>;
  },
};

export const assessmentApi: MdrApi = useMockApi ? mockApi : gatewayApi;

export function submitAssessment(
  request: AssessmentRequest,
): Promise<AssessmentResult> {
  return assessmentApi.submitAssessment(request);
}

export function submitCsvAssessment(file: File): Promise<AssessmentResult> {
  return assessmentApi.submitCsvAssessment(file);
}
