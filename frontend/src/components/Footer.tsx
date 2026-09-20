"use client";

import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <>
      <section className="bg-[#123d37] px-5 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="max-w-4xl text-sm leading-6 text-[#d3e4df]">
            <strong className="font-semibold text-white">{t("home.pleaseNote")} </strong>
            {t("common.disclaimer")}
          </p>
        </div>
      </section>

      <footer className="bg-[#0d302b] px-5 py-8 text-[#b9d0ca] sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="font-bold text-white">{t("common.brandName")}</p>
          <p className="text-xs leading-5">{t("common.footerDesc")}</p>
        </div>
      </footer>
    </>
  );
}
