"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { submitAssessment } from "@/lib/api";
import type { AssessmentRequest } from "@/lib/types";

const assessmentStorageKey = "mdr-sathi-assessment";

type AssessmentField = keyof AssessmentRequest;
type FieldErrors = Partial<Record<AssessmentField, string>>;

const initialAssessment: AssessmentRequest = {
  monthlyUpiReceipts: 50000,
  averageTransactionSize: 750,
  transactionsAbove2000: 10,
};

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
    label: "Monthly UPI receipts",
    description: "The approximate total value your business receives through UPI in one month.",
    min: 0,
    max: 1000000,
    step: 500,
    prefix: "₹",
  },
  {
    name: "averageTransactionSize",
    label: "Average transaction size",
    description: "The usual amount a customer pays you in one UPI transaction.",
    min: 0,
    max: 100000,
    step: 50,
    prefix: "₹",
  },
  {
    name: "transactionsAbove2000",
    label: "Transactions above ₹2,000 per month",
    description: "Your best estimate of how many UPI payments above ₹2,000 you receive each month.",
    min: 0,
    max: 10000,
    step: 1,
  },
];

const formatIndianNumber = (value: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.max(0, value),
  );

function validateField(value: number): string | undefined {
  if (!Number.isFinite(value) || value < 0) {
    return "Please enter a number of 0 or more.";
  }

  return undefined;
}

export default function CheckPage() {
  const router = useRouter();
  const [assessment, setAssessment] = useState<AssessmentRequest>(initialAssessment);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        [field]: `Please enter a value between ${formatIndianNumber(fieldConfig.min)} and ${formatIndianNumber(fieldConfig.max)}.`,
      }));
    }
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
      const result = await submitAssessment(assessment);
      sessionStorage.setItem(
        assessmentStorageKey,
        JSON.stringify({ request: assessment, result }),
      );
      router.push("/result");
    } catch {
      setSubmitError("We could not submit your details. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7faf8]">
      <header className="border-b border-[#dce6e3] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label="MDR Sathi home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0e6658] text-lg font-bold text-white shadow-sm">M</span>
            <span>
              <span className="block text-base font-bold tracking-tight text-[#123d37]">MDR Sathi</span>
              <span className="hidden text-[11px] font-medium tracking-wide text-[#59736e] sm:block">UPI Impact &amp; Trust Assistant</span>
            </span>
          </Link>
          <Link href="/" className="text-sm font-semibold text-[#0e6658] transition-colors hover:text-[#08483f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e6658]">Back to home</Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#0e6658]">
          <span className="h-2 w-2 rounded-full bg-[#2f9b72]" aria-hidden="true" />
          Your business details
          <span className="text-[#8aa49e]">1 of 1</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[#123d37] sm:text-5xl">Let&apos;s check your UPI status.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#5e746f] sm:text-lg">Tell us a little about your UPI collections. It takes about 30 seconds, and you do not need an account or any documents.</p>
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
                    <label htmlFor={`${inputId}-number`} className="text-xs font-semibold text-[#607671]">{field.prefix ? "Enter an exact amount" : "Enter an exact count"}</label>
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
                  <p id={`${inputId}-help`} className="mt-2 text-xs text-[#8a9b97]">Range: {field.prefix ? `${field.prefix} ` : ""}{formatIndianNumber(field.min)} to {field.prefix ? `${field.prefix} ` : ""}{formatIndianNumber(field.max)}{!field.prefix && " transactions"}.</p>
                  {error && <p id={`${inputId}-error`} className="mt-2 text-sm font-medium text-[#a23e35]" role="alert">{error}</p>}
                </fieldset>
              );
            })}
          </div>

          <div className="mt-9 border-t border-[#e4eeeb] pt-6">
            <div className="flex gap-3 rounded-lg bg-[#f0f8f4] p-4 text-sm leading-6 text-[#28634c]">
              <span className="mt-0.5 shrink-0 font-bold" aria-hidden="true">i</span>
              <p>Exact results come from the MDR Sathi rules engine. This form only collects the details needed for the check.</p>
            </div>
            {submitError && <p className="mt-4 text-sm font-medium text-[#a23e35]" role="alert">{submitError}</p>}
            <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#0e6658] px-6 text-base font-semibold text-white shadow-[0_5px_0_#08483f] transition-all hover:-translate-y-0.5 hover:bg-[#0a5146] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6658]">
              {isSubmitting ? "Checking your details..." : "Check My Status"}
              {!isSubmitting && <span className="ml-2" aria-hidden="true">-&gt;</span>}
            </button>
            <p className="mt-4 text-center text-xs leading-5 text-[#8a9b97]">Your details are used only to prepare this assessment.</p>
            <Link href="/csv" className="mt-4 block text-center text-sm font-semibold text-[#0e6658] transition-colors hover:text-[#08483f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6658]">Upload CSV instead</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
