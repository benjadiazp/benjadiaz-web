# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio website ([benjadiaz.com](https://benjadiaz.com)) — a static bilingual site built with **Next.js 16 App Router**, **React 19**, **TypeScript (strict)**, **Tailwind CSS 3**, and **next-intl 4** for i18n. Uses **Bun** as package manager.

## Commands

```bash
bun dev              # Start dev server (port 3000)
bun run build        # Production build (static export)
bun run lint         # ESLint (next/core-web-vitals + a11y rules)
bun run format       # Prettier format all files
bun run format:check # Prettier check (CI-friendly)
```

### E2E Tests (Playwright)

```bash
bunx playwright test          # Run all e2e tests (expects dev server on port 3111)
bunx playwright test --ui     # Interactive UI mode
```

Tests live in `e2e/` and run against `http://localhost:3111`. Start the dev server on that port before running: `bun dev --port 3111`.

## Architecture

### Routing

App Router with `[locale]` dynamic segment. Middleware (`proxy.ts`) uses `next-intl/middleware` for locale detection and routing. Locale prefix is `"as-needed"` — omitted for default `en-US`, shown for `es-CL`.

**Routes:**
| Path | File | Description |
|------|------|-------------|
| `/` | `app/[locale]/page.tsx` | Home — Hero, Links, Projects, Contact sections |
| `/about` | `app/[locale]/about/page.tsx` | About — bio, interests, skills, work history, certificates |
| `/privacy` | `app/[locale]/privacy/page.tsx` | Privacy policy (not localized) |
| `/[...rest]` | `app/[locale]/[...rest]/page.tsx` | Catch-all → `notFound()` |

**Error/loading states:** `error.tsx` (error boundary), `not-found.tsx` (404), `loading.tsx` (suspense fallback) — all in `app/[locale]/`.

### Layout Chain

`RootLayout` (passthrough) → `LocaleLayout` (font, theme, i18n provider, analytics) → page content.

`LocaleLayout` wraps pages with: `NextIntlClientProvider` → `ClientProviders` (next-themes `ThemeProvider`) → `Header` + page + `Footer` + `Toaster`.

### Key Directories

```
app/                   # Next.js App Router pages and layouts
  [locale]/            # Locale-segmented routes
  globals.css          # Tailwind base + CSS custom properties + animations
components/            # Feature components (Header, Footer, Projects, Contact, etc.)
  inputs/              # Interactive controls (LanguageSwitch, ThemeSwitch)
  ui/                  # shadcn/ui primitives (toast, toaster)
i18n/                  # Internationalization config
  routing.ts           # Locale definitions (locales, defaultLocale, prefix strategy)
  request.ts           # Server-side locale resolution + message deep-merge
messages/              # Translation JSON files (en-US.json, es-CL.json)
lib/                   # Shared utilities
  utils.ts             # cn() — clsx + tailwind-merge
  styles.ts            # Shared Tailwind class constants (cardBase, cardHover, badgeOrange, etc.)
e2e/                   # Playwright accessibility & DOM tests
navigation.ts          # Re-exports localized Link, redirect, useRouter, usePathname
proxy.ts               # next-intl middleware (locale detection/routing)
```

### Styling

- **Tailwind CSS 3** with CSS variable-based theming defined in `globals.css`
- **Dark mode:** class-based via `next-themes` (`attribute="class"`, `defaultTheme="system"`)
- **Font:** Geist Mono (loaded via `geist/font/mono`)
- **Design system colors:** HSL CSS variables (`--background`, `--foreground`, `--primary`, etc.) following shadcn/ui conventions
- **Shared style constants:** `lib/styles.ts` exports reusable class strings (`cardBase`, `cardHover`, `badgeOrange`, `expandButton`) — use these for visual consistency
- **Utility:** `cn()` from `lib/utils.ts` for conditional class merging
- **Custom animations:** `fade-in-up` with stagger classes, `text-gradient-accent`, `text-glow`, `hero-dot-pattern` defined in `globals.css`
- **Prettier** auto-sorts Tailwind classes via `prettier-plugin-tailwindcss`

### Navigation Helpers

`navigation.ts` re-exports localized `Link`, `redirect`, `useRouter`, `usePathname` from `next-intl/navigation`. However, many components currently use `next/link` directly with manual locale-prefixed paths (e.g., `` `${base}/about` ``).

### UI Components

Toast system follows shadcn/ui pattern (Radix UI `@radix-ui/react-toast`). Component aliases configured in `components.json`: `@/components` and `@/lib/utils`.

## i18n Workflow

When adding user-visible text:
1. Add keys to **both** `/messages/en-US.json` and `/messages/es-CL.json`
2. Messages are nested JSON keyed by section name (e.g., `"Home"`, `"Projects"`, `"About"`, `"Navigation"`)
3. Access in components via `useTranslations("SectionName")` and `t("key")` or `t("nested.key")`
4. Rich text supported via `t.rich("key", { tagName: (chunks) => <Component>{chunks}</Component> })`
5. `i18n/request.ts` deep-merges locale messages with the default locale (`en-US`) as fallback, so missing translations fall back gracefully

**Locales:** `en-US` (default), `es-CL`

## SEO & Metadata

- `LocaleLayout` sets site-wide metadata: Open Graph, Twitter cards, canonical URLs, alternate language links
- `app/sitemap.ts` generates sitemap for all routes × locales
- `app/robots.ts` allows all crawlers
- `metadataBase` is `https://benjadiaz.com`

## Security Headers

Configured in `next.config.ts` via custom headers:
- **CSP:** restrictive default-src with allowances for Clarity analytics (`unsafe-inline`, `unsafe-eval`)
- **X-Frame-Options:** DENY
- **X-Content-Type-Options:** nosniff
- **Referrer-Policy:** strict-origin-when-cross-origin
- **Permissions-Policy:** camera, microphone, geolocation all disabled

## Analytics

Microsoft Clarity, conditionally loaded when `NEXT_PUBLIC_CLARITY_ID` env var is set and passes alphanumeric validation. Component: `ClarityAnalytics.tsx`.

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity project ID (optional) |

## Linting & Formatting

- **ESLint:** Flat config (`eslint.config.mjs`) extending `eslint-config-next` with additional rules: `no-console: warn`, `jsx-a11y/alt-text: error`, `jsx-a11y/aria-props: error`, `jsx-a11y/aria-role: error`, `jsx-a11y/anchor-is-valid: warn`
- **Prettier:** Uses `prettier-plugin-tailwindcss` for class sorting
- **TypeScript:** Strict mode enabled

## E2E Testing

Playwright tests in `e2e/` focus on **accessibility auditing**:
- `a11y-audit.spec.ts` — axe-core WCAG 2.1 AA scans (light/dark mode, both locales, 404 page), keyboard navigation, focus indicators, screen reader content (lang attributes, heading hierarchy, landmarks, alt text)
- `a11y-raw.spec.ts` — raw DOM capture and violation logging for debugging

Tests run on Chromium only, single worker, against `http://localhost:3111`.

## Conventions

- **Path aliases:** `@/*` maps to project root (e.g., `@/components/Header`, `@/lib/utils`)
- **Client components:** Marked with `"use client"` directive — pages and interactive components are client-side
- **Static generation:** `generateStaticParams()` in layout pre-generates locale variants
- **Component pattern:** Feature components are self-contained in `components/` — they call `useTranslations()` internally
- **Icons:** Lucide React (`lucide-react`)
- **No test framework** beyond Playwright e2e; no unit tests configured
