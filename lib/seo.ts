import { defaultLocale } from "@/i18n/routing";
import type { Locale } from "@/lib/content-types";

const BASE_URL = "https://benjadiaz.com";

/** Build the full URL for a given path and locale */
export function buildUrl(path: string, locale: Locale): string {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}

/** Build alternates object (canonical + hreflang) for a given path */
export function buildAlternates(path: string, locale: Locale) {
  return {
    canonical: buildUrl(path, locale),
    languages: {
      "en-US": buildUrl(path, "en-US" as Locale),
      "es-CL": buildUrl(path, "es-CL" as Locale),
    },
  };
}

/** OG locale string from app locale */
export function ogLocale(locale: Locale): string {
  return locale === "es-CL" ? "es_CL" : "en_US";
}

/** The alternate OG locale */
export function ogAlternateLocale(locale: Locale): string {
  return locale === "es-CL" ? "en_US" : "es_CL";
}
