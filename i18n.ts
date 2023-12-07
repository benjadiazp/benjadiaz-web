import { getRequestConfig } from "next-intl/server";
import { defaultLocale } from "@/i18n-constants";
import merge from "ts-deepmerge";

export default getRequestConfig(async ({ locale }) => {
  const userMessages = (await import(`./messages/${locale}.json`)).default;
  const defaultMessages = (await import(`./messages/${defaultLocale}.json`))
    .default;
  const messages = merge(defaultMessages, userMessages);
  return {
    messages: messages,
  };
});
