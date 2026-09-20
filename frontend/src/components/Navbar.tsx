"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface NavbarProps {
  backLink?: {
    href: string;
    label: string;
  };
  showAnchorLinks?: boolean;
}

export function Navbar({ backLink, showAnchorLinks = false }: NavbarProps) {
  const { t } = useLanguage();

  return (
    <header className="border-b border-[#dce6e3] bg-white sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4 lg:px-10">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label="MDR Sathi home">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0e6658] text-base font-bold text-white shadow-sm sm:h-10 sm:w-10 sm:text-lg">
            M
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-bold tracking-tight text-[#123d37]">
              {t("common.brandName")}
            </span>
            <span className="hidden text-[11px] font-medium tracking-wide text-[#59736e] sm:block">
              {t("common.brandSubtitle")}
            </span>
          </span>
        </Link>

        {showAnchorLinks && (
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#45625d] lg:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-[#0e6658]" href="#policy">
              {t("navbar.policyBasics")}
            </a>
            <a className="transition-colors hover:text-[#0e6658]" href="#how-it-works">
              {t("navbar.howItWorks")}
            </a>
            <Link className="transition-colors hover:text-[#0e6658]" href="/check">
              {t("common.checkMdr")}
            </Link>
            <Link className="transition-colors hover:text-[#0e6658]" href="/certificate">
              {t("common.certificate")}
            </Link>
            <Link className="transition-colors hover:text-[#0e6658]" href="/csv">
              {t("common.uploadStatement")}
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Language Switcher */}
          <LanguageSwitcher />

          {backLink ? (
            <Link
              href={backLink.href}
              className="text-xs font-semibold text-[#0e6658] transition-colors hover:text-[#08483f] sm:text-sm focus-visible:outline-2 focus-visible:outline-[#0e6658]"
            >
              {backLink.label}
            </Link>
          ) : (
            <Link
              href="/check"
              className="inline-flex min-h-9 items-center justify-center rounded-lg bg-[#0e6658] px-3 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#0a5146] sm:min-h-10 sm:px-4 sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e6658]"
            >
              {t("common.checkMdr")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
