"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { submitCsvAssessment } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";

const assessmentStorageKey = "mdr-sathi-assessment";
const maxFileSize = 10 * 1024 * 1024;

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function CsvPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function getFileError(file: File): string | undefined {
    if (!file.name.toLowerCase().endsWith(".csv")) {
      return t("csv.errNotCsv");
    }

    if (file.size === 0) {
      return t("csv.errEmpty");
    }

    if (file.size > maxFileSize) {
      return t("csv.errTooLarge");
    }

    return undefined;
  }

  function chooseFile(file: File | undefined) {
    if (!file) return;

    const fileError = getFileError(file);
    if (fileError) {
      setSelectedFile(null);
      setError(fileError);
      return;
    }

    setSelectedFile(file);
    setError("");
  }

  function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    chooseFile(event.currentTarget.files?.[0]);
    event.currentTarget.value = "";
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    chooseFile(event.dataTransfer.files[0]);
  }

  function removeFile() {
    setSelectedFile(null);
    setError("");
  }

  async function handleSubmit() {
    if (!selectedFile) {
      setError(t("csv.errNoFile"));
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await submitCsvAssessment(selectedFile);
      sessionStorage.setItem(
        assessmentStorageKey,
        JSON.stringify({ request: result.request, result }),
      );
      router.push("/result");
    } catch {
      setError(t("csv.errGeneric"));
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7faf8]">
      <Navbar backLink={{ href: "/check", label: t("common.backToManual") }} />

      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
        <Link href="/check" className="inline-flex items-center text-sm font-semibold text-[#0e6658] transition-colors hover:text-[#08483f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0e6658]">
          <span className="mr-2" aria-hidden="true">&lt;-</span> {t("common.backToManual")}
        </Link>
        <div className="mt-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0e6658]">{t("csv.historyTitle")}</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.03em] text-[#123d37] sm:text-5xl">
            {t("csv.title")}
          </h1>
          <p className="mt-4 text-base leading-7 text-[#607671] sm:text-lg">
            {t("csv.subtitle")}
          </p>
        </div>

        <section className="mt-8 rounded-2xl border border-[#d6e5e0] bg-white p-5 shadow-[0_12px_35px_rgba(24,77,67,0.08)] sm:p-8" aria-labelledby="upload-heading">
          <h2 id="upload-heading" className="text-lg font-bold text-[#123d37]">
            {t("csv.uploadBoxTitle")}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#607671]">
            {t("csv.uploadBoxDesc")}
          </p>

          <div
            onDragEnter={(event) => { event.preventDefault(); setIsDragging(true); }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={(event) => { event.preventDefault(); setIsDragging(false); }}
            onDrop={handleDrop}
            className={`mt-6 rounded-xl border-2 border-dashed p-6 text-center transition-colors sm:p-10 ${isDragging ? "border-[#0e6658] bg-[#f0f8f4]" : "border-[#b8d9d0] bg-[#f7faf8]"}`}
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#dcefe8] text-xl font-bold text-[#0e6658]" aria-hidden="true">↑</span>
            <p className="mt-4 text-base font-bold text-[#123d37]">{t("csv.dropHere")}</p>
            <p className="mt-2 text-sm text-[#718580]">{t("csv.orChoose")}</p>
            <input ref={inputRef} id="csv-file" type="file" accept=".csv,text/csv" onChange={handleFileInput} className="hidden" />
            <button type="button" onClick={() => inputRef.current?.click()} className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg border border-[#b8d9d0] bg-white px-5 text-sm font-semibold text-[#0e6658] transition-colors hover:bg-[#e6f1ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6658]">
              {t("csv.browseBtn")}
            </button>
            <p className="mt-4 text-xs text-[#8a9b97]">{t("csv.fileTypesHint")}</p>
          </div>

          {selectedFile && (
            <div className="mt-5 flex items-center justify-between gap-4 rounded-lg border border-[#bcded0] bg-[#f1f9f4] px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#145c42]">{selectedFile.name}</p>
                <p className="mt-1 text-xs text-[#527865]">{formatFileSize(selectedFile.size)}</p>
              </div>
              <button type="button" onClick={removeFile} className="shrink-0 rounded-md px-2 py-2 text-xs font-semibold text-[#19734e] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6658]">
                {t("csv.removeBtn")}
              </button>
            </div>
          )}

          {error && <p className="mt-4 text-sm font-medium leading-6 text-[#a23e35]" role="alert">{error}</p>}

          <div className="mt-7 border-t border-[#e4eeeb] pt-6">
            <div className="flex gap-3 rounded-lg bg-[#f0f8f4] p-4 text-sm leading-6 text-[#28634c]">
              <span className="mt-0.5 shrink-0 font-bold" aria-hidden="true">i</span>
              <p>{t("csv.infoBox")}</p>
            </div>
            <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#0e6658] px-6 text-base font-semibold text-white shadow-[0_5px_0_#08483f] transition-all hover:-translate-y-0.5 hover:bg-[#0a5146] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6658]">
              {isSubmitting ? t("csv.checkingBtn") : t("csv.checkBtn")}
              {!isSubmitting && <span className="ml-2" aria-hidden="true">-&gt;</span>}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
