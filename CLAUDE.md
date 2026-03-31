# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio website (benjadiaz.com) — a static bilingual site built with Next.js 16 App Router, TypeScript (strict), Tailwind CSS, and next-intl for i18n. Uses Bun as package manager.

## Commands

```bash
bun dev            # Start dev server
bun run build      # Production build
bun run lint       # ESLint (next/core-web-vitals)
bun run format     # Prettier format all files
```

No test framework is configured.

## Architecture

**Routing:** App Router with `[locale]` dynamic segment. Proxy middleware (`proxy.ts`) handles locale detection/routing via next-intl. Locale prefix is "as-needed" (omitted for default `en-US`).

**Locales:** `en-US` (default), `es-CL`. Translations live in `/messages/{locale}.json` as nested JSON. Components access them via `useTranslations("SectionName")`.

**Layout chain:** `RootLayout` → `LocaleLayout` (wraps pages with `ClientProviders`, `Header`, `Footer`, `Toaster`). The home page (`/app/[locale]/page.tsx`) composes Hero, Projects, and Contact sections. Navigation uses anchor links with smooth scrolling.

**Styling:** Tailwind utility classes with CSS variable-based theming in `globals.css`. Dark mode is class-based via next-themes. Font: Geist Mono.

**Navigation helpers:** `navigation.ts` re-exports localized `Link`, `redirect`, `useRouter`, `usePathname` from next-intl.

**UI components:** Toast system follows shadcn/ui pattern (Radix UI primitives). Utility `cn()` in `lib/utils.ts` combines clsx + tailwind-merge.

## i18n Workflow

When adding user-visible text, add keys to both `/messages/en-US.json` and `/messages/es-CL.json`. The `i18n/request.ts` config deep-merges locale messages with the default locale as fallback.
