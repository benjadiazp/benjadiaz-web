import { Pathnames } from "next-intl/navigation";

export const defaultLocale = "en-US";

export const localePrefix = "as-needed";

export const pathnames = {
  "/": "/",
} satisfies Pathnames<typeof locales>;

export const locales = ["en-US", "es-CL"];

export type AppPathnames = keyof typeof pathnames;
