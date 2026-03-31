import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en-US", "es-CL"],
  defaultLocale: "en-US",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/projects": "/projects",
    "/projects/[slug]": "/projects/[slug]",
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
  },
});

// Re-export for backward compatibility with components that import these directly
export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
