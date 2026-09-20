"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/translations";

const languages: { code: Language; label: string; nativeName: string }[] = [
  { code: "en", label: "English", nativeName: "English" },
  { code: "hi", label: "Hindi", nativeName: "हिन्दी" },
  { code: "kn", label: "Kannada", nativeName: "ಕನ್ನಡ" },
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select Language"
        className="flex items-center gap-1.5 rounded-lg border border-[#cbded8] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#123d37] shadow-sm transition-colors hover:border-[#0e6658] hover:bg-[#f7faf8] focus-visible:outline-2 focus-visible:outline-[#0e6658]"
      >
        <span className="text-sm leading-none" aria-hidden="true">🌐</span>
        <span className="font-medium">{currentLang.nativeName}</span>
        <span className="text-[10px] text-[#607671]" aria-hidden="true">▾</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-1.5 w-32 origin-top-right rounded-xl border border-[#d6e5e0] bg-white py-1 shadow-lg ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-100"
        >
          {languages.map((item) => (
            <button
              key={item.code}
              role="menuitem"
              onClick={() => {
                setLanguage(item.code);
                setIsOpen(false);
              }}
              className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs font-medium transition-colors ${
                language === item.code
                  ? "bg-[#f0f8f4] font-bold text-[#0e6658]"
                  : "text-[#334e48] hover:bg-[#f7faf8]"
              }`}
            >
              <span>{item.nativeName}</span>
              {language === item.code && (
                <span className="text-[#0e6658] text-xs font-bold" aria-hidden="true">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
