"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { AssessmentRequest, AssessmentResult, AssessmentStatus } from "@/lib/types";
import { downloadCertificateImage, type CertificateImageData } from "@/lib/certificate";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";

const assessmentStorageKey = "mdr-sathi-assessment";
const maxBusinessNameLength = 80;

type CertificateState =
  | { status: "loading" }
  | { status: "ready"; result: AssessmentResult }
  | { status: "missing" };

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(value);

const formatCurrency = (value: number) => `₹${formatNumber(value)}`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isAssessmentRequest(value: unknown): value is AssessmentRequest {
  return (
    isRecord(value) &&
    typeof value.monthlyUpiReceipts === "number" &&
    Number.isFinite(value.monthlyUpiReceipts) &&
    value.monthlyUpiReceipts >= 0
  );
}

function isAssessmentStatus(value: unknown): value is AssessmentStatus {
  return value === "EXEMPT" || value === "MDR_APPLIES" || value === "MOCK_PENDING";
}

function isAssessmentResult(value: unknown): value is AssessmentResult {
  if (
    !isRecord(value) ||
    typeof value.assessmentId !== "string" ||
    !isAssessmentStatus(value.status) ||
    typeof value.title !== "string" ||
    !isAssessmentRequest(value.request) ||
    typeof value.assessedAt !== "string"
  ) {
    return false;
  }

  return true;
}

function getStoredResult(): AssessmentResult | null {
  try {
    const storedValue = sessionStorage.getItem(assessmentStorageKey);
    if (!storedValue) return null;

    const parsedValue: unknown = JSON.parse(storedValue);
    if (!isRecord(parsedValue) || !isAssessmentResult(parsedValue.result)) return null;
    return parsedValue.result;
  } catch {
    return null;
  }
}

function CertificatePreview({
  data,
  labels,
}: {
  data: CertificateImageData;
  labels: {
    officialSummary: string;
    certTitle: string;
    preparedFor: string;
    statusReturned: string;
    effective: string;
    generated: string;
    certNotice: string;
  };
}) {
  const statusIsExempt = data.status === "EXEMPT";
  const accentText = statusIsExempt ? "text-[#19734e]" : "text-[#946324]";
  const accentBackground = statusIsExempt ? "bg-[#e8f5ed]" : "bg-[#fff5e4]";

  return (
    <article className="relative aspect-[1.38/1] w-full overflow-hidden rounded-xl border-2 border-[#b8d9d0] bg-white p-4 shadow-[0_14px_40px_rgba(24,77,67,0.12)] sm:p-7" aria-label="Certificate preview">
      <div className="pointer-events-none absolute inset-2 rounded-lg border border-[#e3eeea] sm:inset-3" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0e6658] text-sm font-bold text-white sm:h-10 sm:w-10 sm:text-lg">M</span>
          <div>
            <p className="text-sm font-bold tracking-tight text-[#123d37] sm:text-base">MDR Sathi</p>
            <p className="hidden text-[9px] text-[#59736e] sm:block">UPI Impact &amp; Trust Assistant</p>
          </div>
        </div>
        <div className="mt-5 sm:mt-8">
          <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[#0e6658] sm:text-[10px]">
            {labels.officialSummary}
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-[#123d37] sm:text-3xl">
            {labels.certTitle}
          </h2>
          <p className="mt-3 text-[10px] text-[#607671] sm:mt-5 sm:text-xs">{labels.preparedFor}</p>
          <p className="mt-1 truncate text-base font-bold text-[#123d37] sm:text-xl">{data.businessName}</p>
        </div>
        <div className={`mt-4 rounded-lg px-3 py-2.5 sm:mt-6 sm:px-4 sm:py-3 ${accentBackground}`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className={`text-[8px] font-bold uppercase tracking-[0.12em] sm:text-[10px] ${accentText}`}>
                {labels.statusReturned}
              </p>
              <p className={`mt-1 text-base font-bold sm:text-xl ${accentText}`}>{data.status}</p>
            </div>
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold sm:h-9 sm:w-9 sm:text-base ${accentText}`} aria-hidden="true">
              {statusIsExempt ? "✓" : "!"}
            </span>
          </div>
          <p className="mt-2 line-clamp-2 text-[9px] leading-4 text-[#45625d] sm:text-xs sm:leading-5">{data.statusExplanation}</p>
        </div>
        <div className="mt-auto border-t border-[#e3eeea] pt-2 sm:pt-3">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {data.details.map((detail) => (
              <div key={detail.label} className="flex min-w-0 justify-between gap-1 text-[7px] leading-3 sm:text-[9px] sm:leading-4">
                <span className="truncate text-[#718580]">{detail.label}</span>
                <span className="shrink-0 font-bold text-[#123d37]">{detail.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between gap-3 text-[8px] text-[#718580] sm:mt-3 sm:text-[10px]">
            <span>{labels.effective} {data.effectiveDate}</span>
            <span>{labels.generated} {data.generatedDate}</span>
          </div>
          <p className="mt-1 text-center text-[7px] text-[#8a9b97] sm:text-[9px]">
            {labels.certNotice}
          </p>
        </div>
      </div>
    </article>
  );
}

function MissingAssessment() {
  const { t } = useLanguage();
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7faf8] px-5 py-12">
      <section className="w-full max-w-md rounded-2xl border border-[#d6e5e0] bg-white p-6 text-center shadow-[0_12px_35px_rgba(24,77,67,0.08)] sm:p-8">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e6f1ed] text-xl font-bold text-[#0e6658]" aria-hidden="true">?</span>
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-[#123d37]">{t("certificate.missingCertTitle")}</h1>
        <p className="mt-3 text-sm leading-6 text-[#607671]">{t("certificate.missingCertDesc")}</p>
        <Link href="/check" className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#0e6658] px-5 text-sm font-semibold text-white shadow-[0_5px_0_#08483f] transition-all hover:-translate-y-0.5 hover:bg-[#0a5146] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6658]">
          {t("check.calculateBtn")} <span className="ml-2" aria-hidden="true">-&gt;</span>
        </Link>
      </section>
    </main>
  );
}

export default function CertificatePage() {
  const { t } = useLanguage();
  const [certificateState, setCertificateState] = useState<CertificateState>({ status: "loading" });
  const [businessNameInput, setBusinessNameInput] = useState("");
  const [generatedDate, setGeneratedDate] = useState("");
  const [downloadError, setDownloadError] = useState("");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const result = getStoredResult();
      setCertificateState(result ? { status: "ready", result } : { status: "missing" });
      setGeneratedDate(
        new Intl.DateTimeFormat("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date()),
      );
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const result = certificateState.status === "ready" ? certificateState.result : null;
  const businessName = businessNameInput.trim() || t("certificate.defaultMerchant");

  function getStatusLabel(status: AssessmentStatus): string {
    if (status === "EXEMPT") return "EXEMPT";
    if (status === "MDR_APPLIES") return "MDR APPLIES";
    return "ASSESSMENT RECEIVED";
  }

  function getStatusExplanation(item: AssessmentResult): string {
    if (item.status === "EXEMPT") return item.exemptionReason ?? item.title;
    return item.title;
  }

  const certificateData = useMemo<CertificateImageData | null>(() => {
    if (!result || !generatedDate) return null;

    const details = [
      { label: t("check.monthlyReceipts"), value: formatCurrency(result.monthly_upi_receipts ?? result.request.monthlyUpiReceipts) },
      { label: t("result.thresholdLabel"), value: formatCurrency(result.threshold ?? 100000) },
      { label: t("result.affectedTxLabel"), value: formatNumber(result.affected_transactions ?? result.applicableTransactionCount ?? 0) },
    ];

    if (result.status === "MDR_APPLIES") {
      details.push(
        { label: t("result.totalMdrLabel"), value: formatCurrency(result.total_mdr ?? result.monthlyEstimatedImpact ?? 0) },
        { label: t("result.applicableMdrRate"), value: "0.4%" },
        { label: t("result.perTxCap"), value: "₹300.00" },
      );
    }

    return {
      businessName,
      status: getStatusLabel(result.status),
      statusExplanation: getStatusExplanation(result),
      effectiveDate: result.effectiveDate ?? "15 October 2026",
      generatedDate,
      details,
    };
  }, [businessName, generatedDate, result, t]);

  if (certificateState.status === "loading") {
    return <main className="flex min-h-screen items-center justify-center bg-[#f7faf8] text-sm text-[#607671]">{t("certificate.preparing")}</main>;
  }

  if (certificateState.status === "missing" || !result) {
    return <MissingAssessment />;
  }

  const whatsappLink = certificateData
    ? createWhatsAppLink({
        shopName: businessName,
        status: certificateData.status,
        effectiveDate: certificateData.effectiveDate,
      })
    : "#";

  async function handleDownload() {
    if (!certificateData) return;
    setDownloadError("");
    try {
      await downloadCertificateImage(certificateData, "mdr-sathi-certificate.png");
    } catch {
      setDownloadError("We could not create the image. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#f7faf8]">
      <Navbar backLink={{ href: "/result", label: t("common.backToResult") }} />

      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/result" className="inline-flex items-center text-sm font-semibold text-[#0e6658] transition-colors hover:text-[#08483f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e6658]">
            <span className="mr-2" aria-hidden="true">&lt;-</span> {t("common.backToResult")}
          </Link>
          <Link href="/check" className="text-sm font-semibold text-[#0e6658] transition-colors hover:text-[#08483f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e6658]">
            {t("common.checkAgain")}
          </Link>
        </div>

        <div className="mt-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0e6658]">{t("certificate.shareableSummary")}</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.03em] text-[#123d37] sm:text-5xl">
            {t("certificate.title")}
          </h1>
          <p className="mt-4 text-base leading-7 text-[#607671]">{t("certificate.subtitle")}</p>
        </div>

        <div className="mt-8 max-w-xl">
          <label htmlFor="business-name" className="text-sm font-bold text-[#123d37]">
            {t("certificate.shopNameLabel")} <span className="font-normal text-[#8a9b97]">{t("certificate.optional")}</span>
          </label>
          <input
            id="business-name"
            type="text"
            value={businessNameInput}
            maxLength={maxBusinessNameLength}
            onChange={(event) => setBusinessNameInput(event.currentTarget.value.replace(/[\u0000-\u001F\u007F]/g, ""))}
            placeholder={t("certificate.shopNamePlaceholder")}
            aria-describedby="business-name-help"
            className="mt-2 min-h-12 w-full rounded-lg border border-[#cbded8] bg-white px-4 text-sm text-[#123d37] outline-none transition-colors placeholder:text-[#9aaba7] focus:border-[#0e6658] focus:ring-2 focus:ring-[#b8d9d0]"
          />
          <p id="business-name-help" className="mt-2 text-xs text-[#8a9b97]">
            {t("certificate.shopNameHelp")}
          </p>
        </div>

        {certificateData && (
          <div className="mt-10">
            <CertificatePreview
              data={certificateData}
              labels={{
                officialSummary: t("certificate.officialSummary"),
                certTitle: t("certificate.certTitle"),
                preparedFor: t("certificate.preparedFor"),
                statusReturned: t("certificate.statusReturned"),
                effective: t("certificate.effective"),
                generated: t("certificate.generated"),
                certNotice: t("certificate.certNotice"),
              }}
            />
          </div>
        )}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={handleDownload} className="inline-flex min-h-12 flex-1 items-center justify-center rounded-lg bg-[#0e6658] px-6 text-base font-semibold text-white shadow-[0_5px_0_#08483f] transition-all hover:-translate-y-0.5 hover:bg-[#0a5146] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6658]">
            {t("certificate.downloadBtn")}
          </button>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 flex-1 items-center justify-center rounded-lg border border-[#b8d9d0] bg-white px-6 text-base font-semibold text-[#0e6658] transition-colors hover:bg-[#e6f1ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6658]">
            {t("certificate.shareWhatsappBtn")}
          </a>
        </div>
        {downloadError && <p className="mt-3 text-sm font-medium text-[#a23e35]" role="alert">{downloadError}</p>}
        <p className="mt-4 text-center text-xs leading-5 text-[#8a9b97]">
          {t("certificate.whatsappNotice")}
        </p>
      </div>
    </main>
  );
}
