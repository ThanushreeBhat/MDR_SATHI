"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type {
  AssessmentRequest,
  AssessmentResult,
  AssessmentStatus,
  ExplanationLanguage,
} from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";

const assessmentStorageKey = "mdr-sathi-assessment";
const languages: Array<{ value: ExplanationLanguage; label: string }> = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी" },
  { value: "kn", label: "ಕನ್ನಡ" },
];

type ResultState =
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
    if (!isRecord(parsedValue) || !isAssessmentResult(parsedValue.result)) {
      return null;
    }

    return parsedValue.result;
  } catch {
    return null;
  }
}

function StatusIcon({ status }: { status: AssessmentStatus }) {
  if (status === "EXEMPT") {
    return <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d9f0e3] text-2xl font-bold text-[#19734e]" aria-hidden="true">✓</span>;
  }

  if (status === "MDR_APPLIES") {
    return <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f6e5c8] text-2xl font-bold text-[#946324]" aria-hidden="true">!</span>;
  }

  return <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dcefe8] text-xl font-bold text-[#0e6658]" aria-hidden="true">i</span>;
}

function StatusCard({ result }: { result: AssessmentResult }) {
  const { t } = useLanguage();
  const monthlyReceipts = result.monthly_upi_receipts ?? result.request.monthlyUpiReceipts;
  const threshold = result.threshold ?? 100000;
  const affectedCount = result.affected_transactions ?? result.applicableTransactionCount ?? 0;
  const totalMdr = result.total_mdr ?? result.monthlyEstimatedImpact ?? 0;

  if (result.status === "EXEMPT") {
    return (
      <section className="rounded-2xl border border-[#bcded0] bg-[#f1f9f4] p-6 sm:p-8" aria-labelledby="status-heading">
        <div className="flex items-start gap-4">
          <StatusIcon status={result.status} />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#19734e]">{t("result.statusTitle")}</p>
            <h2 id="status-heading" className="mt-2 text-3xl font-bold tracking-tight text-[#145c42]">
              {t("result.exemptBadge")}
            </h2>
          </div>
        </div>
        <p className="mt-6 text-lg font-semibold leading-7 text-[#145c42]">
          {t("result.exemptHeading")}
        </p>
        <p className="mt-2 text-sm leading-6 text-[#416b58]">
          {t("result.exemptBreakdownNote", {
            receipts: formatCurrency(monthlyReceipts),
            threshold: formatCurrency(threshold),
          })}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-[#bcded0] bg-white/70 p-4">
            <p className="text-xs font-semibold text-[#416b58]">{t("result.monthlyReceiptsLabel")}</p>
            <p className="mt-2 text-2xl font-bold text-[#145c42]">{formatCurrency(monthlyReceipts)}</p>
          </div>
          <div className="rounded-lg border border-[#bcded0] bg-white/70 p-4">
            <p className="text-xs font-semibold text-[#416b58]">{t("result.thresholdLabel")}</p>
            <p className="mt-2 text-2xl font-bold text-[#145c42]">{formatCurrency(threshold)}</p>
          </div>
          <div className="rounded-lg border border-[#bcded0] bg-white/70 p-4">
            <p className="text-xs font-semibold text-[#416b58]">{t("result.totalMdrLabel")}</p>
            <p className="mt-2 text-2xl font-bold text-[#19734e]">₹0.00</p>
          </div>
        </div>
      </section>
    );
  }

  if (result.status === "MDR_APPLIES") {
    return (
      <section className="rounded-2xl border border-[#ead9bd] bg-[#fffaf2] p-6 sm:p-8" aria-labelledby="status-heading">
        <div className="flex items-start gap-4">
          <StatusIcon status={result.status} />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#946324]">{t("result.statusTitle")}</p>
            <h2 id="status-heading" className="mt-2 text-3xl font-bold tracking-tight text-[#805c2a]">
              {t("result.mdrAppliesBadge")}
            </h2>
          </div>
        </div>
        <p className="mt-6 text-lg font-semibold leading-7 text-[#805c2a]">
          {t("result.mdrAppliesHeading")}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-[#ead9bd] bg-white/70 p-4">
            <p className="text-xs font-semibold text-[#8b7558]">{t("result.monthlyReceiptsLabel")}</p>
            <p className="mt-2 text-2xl font-bold text-[#805c2a]">{formatCurrency(monthlyReceipts)}</p>
          </div>
          <div className="rounded-lg border border-[#ead9bd] bg-white/70 p-4">
            <p className="text-xs font-semibold text-[#8b7558]">{t("result.thresholdLabel")}</p>
            <p className="mt-2 text-2xl font-bold text-[#805c2a]">{formatCurrency(threshold)}</p>
          </div>
          <div className="rounded-lg border border-[#ead9bd] bg-white/70 p-4">
            <p className="text-xs font-semibold text-[#8b7558]">{t("result.affectedTxLabel")}</p>
            <p className="mt-2 text-2xl font-bold text-[#805c2a]">{formatNumber(affectedCount)}</p>
          </div>
          <div className="rounded-lg border border-[#ead9bd] bg-white/70 p-4">
            <p className="text-xs font-semibold text-[#8b7558]">{t("result.totalMdrLabel")}</p>
            <p className="mt-2 text-2xl font-bold text-[#946324]">{formatCurrency(totalMdr)}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-[#cbded8] bg-[#f0f8f4] p-6 sm:p-8" aria-labelledby="status-heading">
      <div className="flex items-start gap-4">
        <StatusIcon status={result.status} />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0e6658]">{t("result.statusTitle")}</p>
          <h2 id="status-heading" className="mt-2 text-2xl font-bold tracking-tight text-[#123d37]">{result.title}</h2>
        </div>
      </div>
    </section>
  );
}

function TransactionBreakdown({ result }: { result: AssessmentResult }) {
  const { t } = useLanguage();
  const transactions = result.transactions || [];
  const affectedCount = result.affected_transactions ?? result.applicableTransactionCount ?? 0;
  const totalMdr = result.total_mdr ?? result.monthlyEstimatedImpact ?? 0;
  const monthlyReceipts = result.monthly_upi_receipts ?? result.request.monthlyUpiReceipts;
  const threshold = result.threshold ?? 100000;

  return (
    <section className="rounded-xl border border-[#dce6e3] bg-white p-5 sm:p-6" aria-labelledby="tx-breakdown-heading">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0e6658]">{t("result.breakdownHeading")}</p>
          <h2 id="tx-breakdown-heading" className="mt-1 text-lg font-bold text-[#123d37]">
            {t("result.breakdownSub")}
          </h2>
        </div>
        <span className="rounded-full bg-[#f0f8f4] px-3 py-1 text-xs font-bold text-[#0e6658]">
          {t("result.affectedBadge", { count: affectedCount })}
        </span>
      </div>

      {transactions.length > 0 ? (
        <div className="mt-5 overflow-hidden rounded-lg border border-[#e4eeeb]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#e4eeeb] bg-[#f7faf8] text-xs font-bold text-[#607671]">
              <tr>
                <th className="px-4 py-3">{t("result.colNumber")}</th>
                <th className="px-4 py-3">{t("result.colAmount")}</th>
                <th className="px-4 py-3">{t("result.colRate")}</th>
                <th className="px-4 py-3 text-right">{t("result.colFee")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4eeeb]">
              {transactions.map((tx, idx) => (
                <tr key={idx} className="hover:bg-[#fcfdfd]">
                  <td className="px-4 py-3 text-xs font-semibold text-[#8a9b97]">{idx + 1}</td>
                  <td className="px-4 py-3 font-semibold text-[#123d37]">{formatCurrency(tx.amount)}</td>
                  <td className="px-4 py-3 text-[#607671]">{t("result.rateDesc")}</td>
                  <td className="px-4 py-3 text-right font-bold text-[#946324]">{formatCurrency(tx.mdr)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-[#d6e5e0] bg-[#fffaf2]">
              <tr>
                <td colSpan={3} className="px-4 py-3 font-bold text-[#805c2a]">{t("result.totalMdrFooter")}</td>
                <td className="px-4 py-3 text-right text-lg font-extrabold text-[#805c2a]">
                  {formatCurrency(totalMdr)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="mt-4 rounded-lg bg-[#f0f8f4] p-4 text-sm text-[#28634c]">
          {result.status === "EXEMPT"
            ? t("result.exemptBreakdownNote", {
                receipts: formatCurrency(monthlyReceipts),
                threshold: formatCurrency(threshold),
              })
            : t("result.noAbove2000Note")}
        </div>
      )}
    </section>
  );
}

function AssessmentDetails({ result }: { result: AssessmentResult }) {
  const { t } = useLanguage();
  const monthlyReceipts = result.monthly_upi_receipts ?? result.request.monthlyUpiReceipts;
  const threshold = result.threshold ?? 100000;
  const affectedCount = result.affected_transactions ?? result.applicableTransactionCount ?? 0;
  const totalMdr = result.total_mdr ?? result.monthlyEstimatedImpact ?? 0;

  const details = [
    [t("result.monthlyReceiptsLabel"), formatCurrency(monthlyReceipts)],
    [t("result.thresholdLabel"), formatCurrency(threshold)],
    [t("result.affectedTxDetail"), formatNumber(affectedCount)],
    [t("result.totalMdrLabel"), formatCurrency(totalMdr)],
    [t("result.applicableMdrRate"), "0.4%"],
    [t("result.perTxCap"), "₹300.00"],
  ];

  return (
    <section className="rounded-xl border border-[#dce6e3] bg-white p-5 sm:p-6" aria-labelledby="details-heading">
      <div className="flex items-center justify-between gap-4">
        <h2 id="details-heading" className="text-lg font-bold text-[#123d37]">{t("result.assessmentDetailsHeading")}</h2>
        {result.effectiveDate && (
          <p className="text-right text-xs leading-5 text-[#718580]">
            {t("result.effective")}<br />
            <strong className="font-semibold text-[#45625d]">{result.effectiveDate}</strong>
          </p>
        )}
      </div>
      <dl className="mt-5 divide-y divide-[#e8efed]">
        {details.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-5 py-3 first:pt-0 last:pb-0">
            <dt className="text-sm text-[#607671]">{label}</dt>
            <dd className="text-right text-sm font-bold text-[#123d37]">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function ExplanationSection({ result }: { result: AssessmentResult }) {
  const { t, language, setLanguage } = useLanguage();
  const explanation =
    result.explanations?.[language] ??
    (language === "en" ? result.explanation : undefined);

  return (
    <section className="rounded-xl border border-[#dce6e3] bg-white p-5 sm:p-6" aria-labelledby="explanation-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0e6658]">{t("result.explanationHeading")}</p>
          <h2 id="explanation-heading" className="mt-2 text-xl font-bold text-[#123d37]">{t("result.understandResult")}</h2>
        </div>
        <div className="flex rounded-lg border border-[#cbded8] bg-[#f7faf8] p-1" role="group" aria-label={t("result.explanationLang")}>
          {languages.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={language === item.value}
              onClick={() => setLanguage(item.value)}
              className={`rounded-md px-2.5 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0e6658] ${
                language === item.value
                  ? "bg-[#0e6658] text-white"
                  : "text-[#45625d] hover:bg-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-[#4d6863]">
        {explanation ?? "Your calculation is ready from the rules engine."}
      </p>
    </section>
  );
}

function MissingResult() {
  const { t } = useLanguage();
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7faf8] px-5 py-12">
      <section className="w-full max-w-md rounded-2xl border border-[#d6e5e0] bg-white p-6 text-center shadow-[0_12px_35px_rgba(24,77,67,0.08)] sm:p-8">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#e6f1ed] text-xl font-bold text-[#0e6658]" aria-hidden="true">?</span>
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-[#123d37]">{t("result.missingTitle")}</h1>
        <p className="mt-3 text-sm leading-6 text-[#607671]">{t("result.missingDesc")}</p>
        <Link href="/check" className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#0e6658] px-5 text-sm font-semibold text-white shadow-[0_5px_0_#08483f] transition-all hover:-translate-y-0.5 hover:bg-[#0a5146] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6658]">
          {t("check.calculateBtn")} <span className="ml-2" aria-hidden="true">-&gt;</span>
        </Link>
      </section>
    </main>
  );
}

export default function ResultPage() {
  const { t } = useLanguage();
  const [resultState, setResultState] = useState<ResultState>({ status: "loading" });

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const result = getStoredResult();
      setResultState(result ? { status: "ready", result } : { status: "missing" });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (resultState.status === "loading") {
    return <main className="flex min-h-screen items-center justify-center bg-[#f7faf8] text-sm text-[#607671]">{t("result.loadingAssessment")}</main>;
  }

  if (resultState.status === "missing") {
    return <MissingResult />;
  }

  const { result } = resultState;

  return (
    <main className="min-h-screen bg-[#f7faf8]">
      <Navbar backLink={{ href: "/check", label: t("common.checkAgain") }} />

      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16 lg:px-10">
        <Link href="/check" className="inline-flex items-center text-sm font-semibold text-[#0e6658] transition-colors hover:text-[#08483f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e6658]">
          <span className="mr-2" aria-hidden="true">&lt;-</span> {t("common.backToDetails")}
        </Link>
        <div className="mt-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0e6658]">{t("result.assessmentTitle")}</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-[-0.03em] text-[#123d37] sm:text-5xl">{t("result.statusTitle")}</h1>
          <p className="mt-4 text-base leading-7 text-[#607671]">{t("result.statusDesc")}</p>
        </div>

        <div className="mt-9 space-y-5">
          <StatusCard result={result} />
          <TransactionBreakdown result={result} />
          <AssessmentDetails result={result} />
          <ExplanationSection result={result} />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/certificate" className="inline-flex min-h-12 flex-1 items-center justify-center rounded-lg bg-[#0e6658] px-6 text-base font-semibold text-white shadow-[0_5px_0_#08483f] transition-all hover:-translate-y-0.5 hover:bg-[#0a5146] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6658]">
            {t("result.getCertificateBtn")} <span className="ml-2" aria-hidden="true">-&gt;</span>
          </Link>
          <Link href="/check" className="inline-flex min-h-12 flex-1 items-center justify-center rounded-lg border border-[#b8d9d0] bg-white px-6 text-base font-semibold text-[#0e6658] transition-colors hover:bg-[#e6f1ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6658]">
            {t("result.checkAgainBtn")}
          </Link>
        </div>

        <p className="mt-8 text-center text-xs leading-5 text-[#8a9b97]">
          {t("result.resultDisclaimer")}
        </p>
      </div>
    </main>
  );
}
