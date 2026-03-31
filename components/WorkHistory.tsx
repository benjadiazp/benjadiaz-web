"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { badgeOrange, cardBase, cardHover, expandButton } from "@/lib/styles";

type Role = {
  titleKey: string;
  periodKey: string;
};

type Logo = {
  light: string;
  dark: string;
};

type Job = {
  companyKey: string;
  locationKey?: string;
  url?: string;
  roles: Role[];
  logo?: string | Logo;
  logoOnDarkBg?: boolean;
};

const INITIAL_COUNT = 3;

const jobs: Job[] = [
  {
    companyKey: "microsoft",
    locationKey: "microsoft.location",
    url: "https://microsoft.com",
    logo: {
      light: "/img/logos/ms-light.avif",
      dark: "/img/logos/ms-dark.avif",
    },
    roles: [
      { titleKey: "microsoft.role2", periodKey: "microsoft.period2" },
      { titleKey: "microsoft.role1", periodKey: "microsoft.period1" },
    ],
  },
  {
    companyKey: "insideSecurity",
    locationKey: "insideSecurity.location",
    logo: "/img/logos/grupoinside_logo_light.jpg",
    roles: [
      { titleKey: "insideSecurity.role", periodKey: "insideSecurity.period" },
    ],
  },
  {
    companyKey: "drizip",
    locationKey: "drizip.location",
    logo: "/img/logos/drizip_logo_light.jpg",
    roles: [{ titleKey: "drizip.role", periodKey: "drizip.period" }],
  },
  {
    companyKey: "ivory",
    locationKey: "ivory.location",
    roles: [{ titleKey: "ivory.role", periodKey: "ivory.period" }],
  },
  {
    companyKey: "ubb",
    url: "https://ubiobio.cl",
    logo: {
      light: "/img/logos/logo_ubb_light.png",
      dark: "/img/logos/lobo_ubb_dark.png",
    },
    roles: [
      { titleKey: "ubb.role1", periodKey: "ubb.period1" },
      { titleKey: "ubb.role2", periodKey: "ubb.period2" },
    ],
  },
];

function LogoImage({ logo, alt }: { logo: string | Logo; alt: string }) {
  if (typeof logo === "object") {
    return (
      <>
        <Image
          src={logo.light}
          alt={alt}
          fill
          sizes="96px"
          className="object-contain p-3 dark:hidden"
        />
        <Image
          src={logo.dark}
          alt={alt}
          fill
          sizes="96px"
          className="hidden object-contain p-3 dark:block"
        />
      </>
    );
  }
  return (
    <Image src={logo} alt={alt} fill sizes="96px" className="object-contain p-3" />
  );
}

export default function WorkHistory() {
  const t = useTranslations("WorkHistory");
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? jobs : jobs.slice(0, INITIAL_COUNT);
  const remaining = jobs.length - INITIAL_COUNT;

  return (
    <section className="w-full" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="text-center text-xl font-bold tracking-tight md:text-3xl">
        {t("title")}
      </h2>

      <div id="work-history-list" className="mt-10 space-y-6">
        {visible.map((job, idx) => {
          const isFirst = idx === 0;
          const isLast = expanded
            ? idx === jobs.length - 1
            : idx === visible.length - 1;
          const companyName = t(`${job.companyKey}.company`);

          return (
            <div key={idx} className="group flex gap-5 sm:gap-6">
              {/* Timeline column — decorative only */}
              <div aria-hidden="true" className="flex flex-shrink-0 flex-col items-center">
                <div
                  className={`z-10 mt-5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all group-hover:scale-110 ${
                    isFirst
                      ? "border-orange-500 bg-orange-500/15 group-hover:bg-orange-500/25"
                      : "border-orange-400/50 bg-background group-hover:border-orange-400"
                  }`}
                >
                  <div
                    className={`h-2 w-2 rounded-full transition-all ${
                      isFirst
                        ? "bg-orange-500"
                        : "bg-orange-400/40 group-hover:bg-orange-400"
                    }`}
                  />
                </div>
                {!isLast && (
                  <div className="mt-1 w-px flex-1 bg-gradient-to-b from-orange-400/50 to-orange-400/10" />
                )}
              </div>

              {/* Card */}
              <div className={cn(cardBase, cardHover, "mb-1 flex min-h-[80px] flex-1 overflow-hidden")}>
                {/* Logo panel */}
                {job.logo && (
                  <div className={`flex w-20 flex-shrink-0 items-center justify-center border-r border-gray-200/70 sm:w-24 ${typeof job.logo === "string" ? "bg-white dark:border-gray-800/70 dark:bg-white" : "bg-gray-50 dark:border-gray-800/70 dark:bg-gray-900/80"}`}>
                    <div className="relative h-20 w-20 sm:h-24 sm:w-24">
                      <LogoImage logo={job.logo} alt={companyName} />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-1 flex-col justify-center p-4 sm:p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    {job.url ? (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${companyName} (opens in new tab)`}
                        className="group/link inline-flex items-center gap-1 font-mono text-base font-bold"
                      >
                        <span className="text-gradient-accent" aria-hidden="true">
                          {companyName}
                        </span>
                        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-orange-400 opacity-60 transition-opacity group-hover/link:opacity-100" />
                      </a>
                    ) : (
                      <h3 className="font-mono text-base font-bold">
                        <span className="text-gradient-accent">
                          {companyName}
                        </span>
                      </h3>
                    )}

                    {isFirst && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-2xs font-medium text-green-700 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 dark:bg-green-400" />
                        {t("current")}
                      </span>
                    )}
                  </div>

                  {job.locationKey && (
                    <p className="mt-0.5 font-mono text-xs text-gray-500 dark:text-gray-400">
                      {t(job.locationKey)}
                    </p>
                  )}

                  <div className="mt-2.5 space-y-1.5">
                    {job.roles.map((role, rIdx) => (
                      <div key={rIdx} className="flex flex-wrap items-center gap-2">
                        <span className={badgeOrange}>
                          {t(role.periodKey)}
                        </span>
                        <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
                          {t(role.titleKey)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {remaining > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls="work-history-list"
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
