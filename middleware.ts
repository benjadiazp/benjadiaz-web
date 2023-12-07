import createMiddleware from "next-intl/middleware";
import { defaultLocale, localePrefix, locales } from "@/i18n-constants";

export default createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
  localePrefix: localePrefix,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
