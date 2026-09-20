import type {
  AssessmentRequest,
  AssessmentResult,
  MdrApi,
} from "@/lib/types";

export const mockApi: MdrApi = {
  async submitAssessment(request: AssessmentRequest): Promise<AssessmentResult> {
    return {
      assessmentId: `mock-${Date.now()}`,
      status: "MOCK_PENDING",
      title: "Your assessment is ready for the rules engine",
      explanations: {
        en: "This is a placeholder result while the MDR Sathi backend is being connected. The production rules engine will provide the official policy assessment.",
        hi: "यह अभी एक प्रारंभिक परिणाम है। MDR Sathi का नियम इंजन जुड़ने के बाद आधिकारिक नीति आकलन उपलब्ध होगा।",
        kn: "MDR Sathi ನಿಯಮ ಎಂಜಿನ್ ಸಂಪರ್ಕಗೊಳ್ಳುವವರೆಗೆ ಇದು ಒಂದು ಮಾದರಿ ಫಲಿತಾಂಶವಾಗಿದೆ. ಅಧಿಕೃತ ನೀತಿ ಮೌಲ್ಯಮಾಪನವನ್ನು ನಿಯಮ ಎಂಜಿನ್ ಒದಗಿಸುತ್ತದೆ.",
      },
      request,
      assessedAt: new Date().toISOString(),
      effectiveDate: "15 October 2026",
      isMock: true,
    };
  },

  async submitCsvAssessment(): Promise<AssessmentResult> {
    return {
      assessmentId: `mock-csv-${Date.now()}`,
      status: "MOCK_PENDING",
      title: "Your CSV is ready for the rules engine",
      explanations: {
        en: "This is a placeholder result while CSV processing is being connected to the MDR Sathi backend.",
        hi: "CSV प्रोसेसिंग को MDR Sathi बैकएंड से जोड़ने तक यह एक प्रारंभिक परिणाम है।",
        kn: "CSV ಪ್ರಕ್ರಿಯೆಯನ್ನು MDR Sathi ಬ್ಯಾಕೆಂಡ್‌ಗೆ ಸಂಪರ್ಕಿಸುವವರೆಗೆ ಇದು ಒಂದು ಮಾದರಿ ಫಲಿತಾಂಶವಾಗಿದೆ.",
      },
      request: {
        monthlyUpiReceipts: 0,
        averageTransactionSize: 0,
        transactionsAbove2000: 0,
      },
      assessedAt: new Date().toISOString(),
      effectiveDate: "15 October 2026",
      isMock: true,
    };
  },
};
