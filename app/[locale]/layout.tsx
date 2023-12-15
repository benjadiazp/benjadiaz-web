import type { Metadata } from "next";
import "../globals.css";
import { Red_Hat_Mono as FontSans } from "next/font/google";
import { notFound } from "next/navigation";
import { locales } from "@/i18n-constants";
import ClientProviders from "@/app/ClientProviders";
import { unstable_setRequestLocale } from "next-intl/server";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        className={`${fontSans.className} bg-gradient-to-b ${cn(
          "b min-h-screen from-white via-white to-orange-100 font-sans antialiased",
          fontSans.variable,
        )}  bg-neutral-50 text-black duration-150 dark:from-slate-800 dark:to-gray-900 dark:text-white`}
      >
        <ClientProviders>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </ClientProviders>
      </body>
      <Script id={"ms_clarity"}>
        {`(function (c, l, a, r, i, t, y){
          c[a] = c[a] || function () {
            (c[a].q = c[a].q || []).push(arguments)
          };
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })
        (window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}"
        );`}
      </Script>
    </html>
  );
}
