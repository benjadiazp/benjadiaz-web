import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  cacheComponents: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          // unsafe-inline: required by next-themes (inline script for theme hydration)
          // unsafe-eval: required by Microsoft Clarity analytics
          key: "Content-Security-Policy",
          value:
            "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.clarity.ms; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://www.clarity.ms; frame-ancestors 'none'",
        },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
