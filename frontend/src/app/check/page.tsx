"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { submitAssessment, parseTransactionAmounts } from "@/lib/api";
import type { AssessmentRequest } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";

const assessmentStorageKey = "mdr-sathi-assessment";

type AssessmentField = "monthlyUpiReceipts" | "averageTransactionSize" | "transactionsAbove2000";
type FieldErrors = Partial<Record<AssessmentField | "customTransactions", string>>;

const initialAssessment: AssessmentRequest = {
  monthlyUpiReceipts: 150000,
  averageTransactionSize: 2500,
  transactionsAbove2000: 3,
  customTransactions: "500, 2500, 3000, 1000, 5000",
};

const formatIndianNumber = (value: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.max(0, value),
  );

export default function CheckPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [assessment, setAssessment] = useState<AssessmentRequest>(initialAssessment);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fields: Array<{
    name: AssessmentField;
    label: string;
    description: string;
    min: number;
    max: number;
    step: number;
    prefix?: string;
  }> = [
    {
      name: "monthlyUpiReceipts",
      label: t("check.monthlyReceipts"),
      description: t("check.monthlyReceiptsDesc"),
      min: 0,
      max: 1000000,
      step: 500,
      prefix: "₹",
    },
    {
      name: "averageTransactionSize",
      label: t("check.avgTx"),
      description: t("check.avgTxDesc"),
      min: 0,
      max: 100000,
      step: 50,
      prefix: "₹",
    },
    {
      name: "transactionsAbove2000",
      label: t("check.largeTx"),
      description: t("check.largeTxDesc"),
      min: 0,
      max: 10000,
      step: 1,
    },
  ];

  function validateField(value: number): string | undefined {
    if (!Number.isFinite(value) || value < 0) {
      return t("check.validationMin");
    }
    return undefined;
  }

  function updateField(field: AssessmentField, value: number) {
    setAssessment((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: validateField(value) }));
    setSubmitError("");
  }

  function handleNumberChange(field: AssessmentField, rawValue: string) {
    if (rawValue === "") {
      updateField(field, 0);
      return;
    }

    const value = Number(rawValue);
    const fieldConfig = fields.find((item) => item.name === field);
    if (!Number.isFinite(value) || !fieldConfig) return;

    const boundedValue = Math.min(fieldConfig.max, Math.max(fieldConfig.min, value));
    updateField(field, boundedValue);

    if (value < fieldConfig.min || value > fieldConfig.max) {
      setErrors((current) => ({
        ...current,
        [field]: t("check.validationRange", {
          min: formatIndianNumber(fieldConfig.min),
          max: formatIndianNumber(fieldConfig.max),
        }),
      }));
    }
  }

  function handleCustomTransactionsChange(rawValue: string) {
    setAssessment((current) => ({
      ...current,
      customTransactions: rawValue,
    }));
    setSubmitError("");
  }

  function loadTestCase(monthlyReceipts: number, txAmounts: string) {
    const parsed = parseTransactionAmounts(txAmounts);
    const countAbove2000 = parsed.filter((amount) => amount > 2000).length;
    const avg = parsed.length > 0 ? Math.round(parsed.reduce((a, b) => a + b, 0) / parsed.length) : 0;

    setAssessment({
      monthlyUpiReceipts: monthlyReceipts,
      averageTransactionSize: avg,
      transactionsAbove2000: countAbove2000,
      customTransactions: txAmounts,
    });
    setErrors({});
    setSubmitError("");
  }

  function validateAssessment(): FieldErrors {
    const nextErrors: FieldErrors = {};
    fields.forEach((field) => {
      const error = validateField(assessment[field.name]);
      if (error) nextErrors[field.name] = error;
    });
    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateAssessment();
    setErrors(nextErrors);
    setSubmitError("");

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const parsedTransactions = parseTransactionAmounts(assessment.customTransactions);
      const payload: AssessmentRequest = {
        ...assessment,
        transactions: parsedTransactions.length > 0 ? parsedTransactions : undefined,
      };

      const result = await submitAssessment(payload);
      sessionStorage.setItem(
        assessmentStorageKey,
        JSON.stringify({ request: payload, result }),
      );
      router.push("/result");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : t("common.error");
      setSubmitError(message);
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7faf8]">
      <Navbar backLink={{ href: "/", label: t("common.backToHome") }} />

      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#0e6658]">
          <span className="h-2 w-2 rounded-full bg-[#2f9b72]" aria-hidden="true" />
          {t("check.stepIndicator")}
          <span className="text-[#8aa49e]">{t("check.stepCount")}</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[#123d37] sm:text-5xl">
            {t("check.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#5e746f] sm:text-lg">
            {t("check.subtitle")}
          </p>
        </div>

        {/* Quick Test Presets */}
        <div className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-[#d6e5e0] bg-white p-4 shadow-sm">
          <span className="text-xs font-bold text-[#123d37]">{t("check.presetsTitle")}</span>
          <button
            type="button"
            onClick={() => loadTestCase(150000, "500, 2500, 3000, 1000, 5000")}
            className="rounded-lg border border-[#b8d9d0] bg-[#f0f8f4] px-3 py-1.5 text-xs font-semibold text-[#0e6658] transition-colors hover:bg-[#d9f0e3]"
          >
            {t("check.preset1")}
          </button>
          <button
            type="button"
            onClick={() => loadTestCase(90000, "2500, 3000")}
            className="rounded-lg border border-[#dce6e3] bg-[#f7faf8] px-3 py-1.5 text-xs font-semibold text-[#416b58] transition-colors hover:bg-[#eaf4ef]"
          >
            {t("check.preset2")}
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-[#d6e5e0] bg-white p-5 shadow-[0_12px_35px_rgba(24,77,67,0.08)] sm:p-8">
          <div className="space-y-9">
            {fields.map((field) => {
              const value = assessment[field.name];
              const error = errors[field.name];
              const sliderValue = Math.min(field.max, Math.max(field.min, value));
              const inputId = `assessment-${field.name}`;

              return (
                <fieldset key={field.name} className="min-w-0 border-0 p-0">
                  <legend className="text-base font-bold text-[#123d37]">{field.label}</legend>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#607671]">{field.description}</p>
                  <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <input
                      id={inputId}
                      type="range"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={sliderValue}
                      onChange={(event) => updateField(field.name, event.currentTarget.valueAsNumber)}
                      aria-label={`${field.label} slider`}
                      aria-describedby={`${inputId}-value ${inputId}-help${error ? ` ${inputId}-error` : ""}`}
                      className="h-2 w-full cursor-pointer accent-[#0e6658]"
                    />
                    <div id={`${inputId}-value`} className="flex min-h-12 min-w-[140px] items-center justify-end rounded-lg border border-[#cbded8] bg-[#f7faf8] px-4 text-right text-lg font-bold text-[#123d37] sm:min-w-[170px]">
                      {field.prefix && <span className="mr-1 text-[#607671]">{field.prefix}</span>}
                      {formatIndianNumber(value)}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <label htmlFor={`${inputId}-number`} className="text-xs font-semibold text-[#607671]">
                      {field.prefix ? t("check.exactAmount") : t("check.exactCount")}
                    </label>
                    <div className="relative sm:w-48">
                      {field.prefix && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#607671]">{field.prefix}</span>}
                      <input
                        id={`${inputId}-number`}
                        type="number"
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        value={value}
                        onChange={(event) => handleNumberChange(field.name, event.currentTarget.value)}
                        onBlur={() => setErrors((current) => ({ ...current, [field.name]: validateField(assessment[field.name]) }))}
                        aria-describedby={`${inputId}-help${error ? ` ${inputId}-error` : ""}`}
                        className={`min-h-11 w-full rounded-lg border bg-white px-3 text-right text-sm font-semibold text-[#123d37] outline-none transition-colors focus:border-[#0e6658] focus:ring-2 focus:ring-[#b8d9d0] ${field.prefix ? "pl-8" : ""} ${error ? "border-[#bb594d]" : "border-[#cbded8]"}`}
                      />
                    </div>
                  </div>
                  <p id={`${inputId}-help`} className="mt-2 text-xs text-[#8a9b97]">
                    {t("check.range")} {field.prefix ? `${field.prefix} ` : ""}{formatIndianNumber(field.min)} to {field.prefix ? `${field.prefix} ` : ""}{formatIndianNumber(field.max)}{!field.prefix && ` ${t("check.transactionsUnit")}`}.
                  </p>
                  {error && <p id={`${inputId}-error`} className="mt-2 text-sm font-medium text-[#a23e35]" role="alert">{error}</p>}
                </fieldset>
              );
            })}

            {/* Custom transaction amounts field */}
            <fieldset className="min-w-0 border-t border-[#e8efed] pt-6">
              <legend className="text-base font-bold text-[#123d37]">{t("check.customTx")}</legend>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#607671]">
                {t("check.customTxDesc")}
              </p>
              <div className="mt-4">
                <input
                  id="assessment-customTransactions"
                  type="text"
                  value={assessment.customTransactions || ""}
                  onChange={(event) => handleCustomTransactionsChange(event.currentTarget.value)}
                  placeholder={t("check.customTxPlaceholder")}
                  className="min-h-12 w-full rounded-lg border border-[#cbded8] bg-white px-4 font-mono text-sm font-semibold text-[#123d37] outline-none transition-colors focus:border-[#0e6658] focus:ring-2 focus:ring-[#b8d9d0]"
                />
              </div>
            </fieldset>
          </div>

          <div className="mt-9 border-t border-[#e4eeeb] pt-6">
            <div className="flex gap-3 rounded-lg bg-[#f0f8f4] p-4 text-sm leading-6 text-[#28634c]">
              <span className="mt-0.5 shrink-0 font-bold" aria-hidden="true">i</span>
              <p>{t("check.infoBox")}</p>
            </div>
            {submitError && (
              <div className="mt-4 rounded-lg border border-[#f2b8b3] bg-[#fdf2f1] p-4 text-sm font-medium text-[#a23e35]" role="alert">
                {submitError}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#0e6658] px-6 text-base font-semibold text-white shadow-[0_5px_0_#08483f] transition-all hover:-translate-y-0.5 hover:bg-[#0a5146] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6658]"
            >
              {isSubmitting ? t("check.calculatingBtn") : t("check.calculateBtn")}
              {!isSubmitting && <span className="ml-2" aria-hidden="true">-&gt;</span>}
            </button>
            <p className="mt-4 text-center text-xs leading-5 text-[#8a9b97]">{t("check.privacyNote")}</p>
            <Link href="/csv" className="mt-4 block text-center text-sm font-semibold text-[#0e6658] transition-colors hover:text-[#08483f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6658]">
              {t("check.uploadCsvInstead")}
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
