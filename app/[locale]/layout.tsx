import type { Metadata } from "next";
import "../globals.css";
import { Suspense } from "react";
import { GeistMono } from "geist/font/mono";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/routing";
import ClientProviders from "@/app/ClientProviders";
import { setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClarityAnalytics from "@/components/ClarityAnalytics";
import AlgorithmicBackground from "@/components/AlgorithmicBackgroundLoader";
import type { Locale } from "@/lib/content-types";
import { buildAlternates, ogLocale, ogAlternateLocale } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const descriptions: Record<Locale, string> = {
  "en-US":
    "Software Engineer based in Chile. Passionate about building software and using technology creatively.",
  "es-CL":
    "Ingeniero de Software en Chile. Apasionado por construir software y usar la tecnología de forma creativa.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const description = descriptions[loc] ?? descriptions["en-US"];
  const alternates = buildAlternates("/", loc);

  return {
    metadataBase: new URL("https://benjadiaz.com"),
    title: {
      default: "Benjamín Díaz",
      template: "%s | Benjamín Díaz",
    },
    description,
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      title: "Benjamín Díaz",
      description,
      url: alternates.canonical,
      siteName: "Benjamín Díaz",
      type: "website",
      locale: ogLocale(loc),
      alternateLocale: ogAlternateLocale(loc),
      images: [
        {
          url: "https://benjadiaz.com/img/og-default.png",
          width: 1200,
          height: 630,
          alt: "Benjamín Díaz",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Benjamín Díaz",
      description,
      creator: "@benjadiazp",
      images: ["https://benjadiaz.com/img/og-default.png"],
    },
    alternates,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(locales as readonly string[]).includes(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={cn(
          GeistMono.className,
          GeistMono.variable,
          "min-h-screen scroll-smooth bg-gradient-to-b from-white via-orange-50/30 to-orange-100/50 font-sans text-black antialiased duration-150 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 dark:text-white",
        )}
      >
        <AlgorithmicBackground />
        <div className="relative z-[1]">
          <NextIntlClientProvider messages={messages}>
            <ClientProviders>
              <Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center">
                    <div role="status" aria-label="Loading">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                <Header />
                {children}
                <Footer />
              </Suspense>
              <Toaster />
            </ClientProviders>
          </NextIntlClientProvider>
          {/^[a-zA-Z0-9]+$/.test(process.env.NEXT_PUBLIC_CLARITY_ID ?? "") && (
            <ClarityAnalytics
              projectId={process.env.NEXT_PUBLIC_CLARITY_ID!}
            />
          )}
        </div>
      </body>
    </html>
  );
}
