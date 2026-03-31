"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { badgeOrange, cardBase, cardHover, expandButton } from "@/lib/styles";

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
    <section className="w-full" aria-labelledby="certificates-heading">
      <h2 id="certificates-heading" className="text-center text-xl font-bold tracking-tight md:text-3xl">
        {t("title")}
      </h2>

      <div id="cert-list" className="mt-10 space-y-3">
        {visible.map((cert, idx) => (
          <div
            key={idx}
            className={cn(cardBase, cardHover, "px-4 py-3")}
          >
            <h3 className="font-mono text-sm font-bold">
              <span className="text-gradient-accent">
                {cert.issuer}
              </span>
            </h3>
            <div className="mt-1.5 flex items-center gap-2">
              <span className={badgeOrange}>
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
          aria-expanded={expanded}
          aria-controls="cert-list"
          className={expandButton}
        >
          {expanded ? (
            <>
              {t("seeLess")} <ChevronUp aria-hidden="true" className="h-4 w-4" />
            </>
          ) : (
            <>
              {t("seeMore", { count: remaining })} <ChevronDown aria-hidden="true" className="h-4 w-4" />
            </>
          )}
        </button>
      )}
    </section>
  );
}
