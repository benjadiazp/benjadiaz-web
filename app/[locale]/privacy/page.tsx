import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardBase } from "@/lib/styles";
import { locales } from "@/i18n/routing";
import type { Locale } from "@/lib/content-types";
import { buildAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: loc === "es-CL" ? "Política de Privacidad" : "Privacy Policy",
    description:
      loc === "es-CL"
        ? "Información sobre cómo recopilamos y usamos datos en benjadiaz.com."
        : "Information about how we collect and use data on benjadiaz.com.",
    alternates: buildAlternates("/privacy", loc),
  };
}

export default function PrivacyPage() {
  return (
    <main id="main-content" className="relative w-full">
      <div className="mx-auto w-full max-w-screen-lg px-4 pt-12 sm:px-8 sm:pt-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-sm text-gray-500 transition-colors hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

        <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
          Privacy
        </h1>

        <div className={cn(cardBase, "mt-10 px-6 py-6")}>
          <h2 className="text-xl font-bold tracking-tight md:text-3xl">
            Analytics
          </h2>
          <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
            We partner with Microsoft Clarity and Microsoft Advertising to
            capture how you use and interact with our website through behavioral
            metrics, heatmaps, and session replay to improve and market our
            products/services. Website usage data is captured using first and
            third-party cookies and other tracking technologies to determine the
            popularity of products/services and online activity. Additionally, we
            use this information for site optimization, fraud/security purposes,
            and advertising. For more information about how Microsoft collects
            and uses your data, visit the Microsoft{" "}
            <Link
              href="https://privacy.microsoft.com/privacystatement"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Microsoft Privacy Statement (opens in new tab)"
              className="text-orange-600 underline decoration-orange-500/50 underline-offset-2 transition-colors hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300"
            >
              Privacy Statement
            </Link>
            .
          </p>
        </div>

        <div className="pb-16" />
      </div>
    </main>
  );
}
