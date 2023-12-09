import type { Metadata } from "next";
import "../globals.css";
import { Red_Hat_Mono as FontSans } from "next/font/google";
import { notFound } from "next/navigation";
import { locales } from "@/i18n-constants";
import ClientProviders from "@/app/ClientProviders";
import { unstable_setRequestLocale } from "next-intl/server";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

//const LatoFont = Lato({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Benjamín Díaz",
  description: "Software engineer",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) notFound();
  unstable_setRequestLocale(locale);
  return (
    <html lang={locale} suppressHydrationWarning className={"scroll-smooth"}>
      <body
        className={`${fontSans.className} ${cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
        )}  bg-neutral-50 text-black duration-150 dark:bg-neutral-900 dark:text-white`}
      >
        <ClientProviders>
          {children}
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}
