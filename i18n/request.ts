import { getRequestConfig } from "next-intl/server";
import { routing } from "@/i18n/routing";
import merge from "ts-deepmerge";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }

  const userMessages = (await import(`../messages/${locale}.json`)).default;
  const defaultMessages = (
    await import(`../messages/${routing.defaultLocale}.json`)
  ).default;
  const messages = merge(defaultMessages, userMessages);

  return {
    locale,
    messages,
  };
});
