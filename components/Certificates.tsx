"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronUp } from "lucide-react";

type Certificate = {
  name: string;
  issuer: string;
  year: string;
};

const INITIAL_COUNT = 5;

const certificates: Certificate[] = [
  { name: "Microsoft Certified: Azure AI Engineer Associate", issuer: "Microsoft", year: "2026" },
  { name: "Claude Code in Action", issuer: "Anthropic", year: "2026" },
  { name: "Certificate of completion: Claude 101", issuer: "Anthropic", year: "2026" },
  { name: "GitHub Copilot", issuer: "GitHub", year: "2025" },
  { name: "Microsoft Global Hackathon 2025", issuer: "Microsoft", year: "2025" },
  { name: "Microsoft Certified: Security, Compliance, and Identity Fundamentals", issuer: "Microsoft", year: "2025" },
  { name: "Introduction to FinOps", issuer: "FinOps Foundation", year: "2025" },
  { name: "GitHub Foundations", issuer: "GitHub", year: "2024" },
  { name: "Microsoft Global Hackathon 2024", issuer: "Microsoft", year: "2024" },
  { name: "Microsoft Certified: Azure AI Fundamentals", issuer: "Microsoft", year: "2024" },
  { name: "Microsoft Certified: Azure Fundamentals", issuer: "Microsoft", year: "2024" },
  { name: "Microsoft Certified: Azure Data Fundamentals", issuer: "Microsoft", year: "2024" },
  { name: "EF SET Certificate (C2 Proficient)", issuer: "EF SET", year: "2023" },
];

export default function Certificates() {
  const t = useTranslations("Certificates");
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? certificates : certificates.slice(0, INITIAL_COUNT);
  const remaining = certificates.length - INITIAL_COUNT;

  return (
    <div className="w-full">
      <h2 id="certificates-heading" className="text-center text-xl font-bold tracking-tight md:text-3xl">
        {t("title")}
      </h2>

      <div className="mt-10 space-y-3">
        {visible.map((cert, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-gray-200/70 bg-white/60 px-4 py-3 shadow-sm backdrop-blur-sm transition-all hover:border-orange-200 hover:shadow-md dark:border-gray-800/70 dark:bg-gray-900/50 dark:hover:border-orange-500/20"
          >
            <h3 className="font-mono text-sm font-bold">
              <span className="text-gradient-accent">
                {cert.issuer}
              </span>
            </h3>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="inline-flex items-center rounded-md border border-orange-200/80 bg-orange-50/80 px-2 py-0.5 font-mono text-[11px] font-semibold text-orange-600 dark:border-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400">
                {cert.year}
              </span>
              <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
                {cert.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {remaining > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex w-full items-center justify-center gap-1.5 py-2 font-mono text-sm text-gray-500 transition-colors hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400"
        >
          {expanded ? (
            <>
              {t("seeLess")} <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              {t("seeMore", { count: remaining })} <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
