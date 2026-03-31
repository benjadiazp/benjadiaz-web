---
name: A11y Audit March 2026 – Initial findings
description: Comprehensive accessibility audit findings for benjadiaz.com, March 2026. Covers all components, pages, both locales, light/dark modes.
type: project
---

Full audit completed 2026-03-30. Key findings below.

**Why:** First-pass accessibility audit of the portfolio site to establish a baseline and prioritize fixes.
**How to apply:** Use this as the baseline when any component is touched — verify the issue for that component is not regressed.

## Critical (runtime-breaking)

1. **App crashes on load** — `LanguageSwitch` calls `useLocale()` (next-intl client hook) during SSR without being inside a proper next-intl provider context. The server throws `No intl context found` (500 error). Root cause: `Toggles` is a server component that renders `LanguageSwitch` ("use client"), but the next-intl provider wrapping (`ClientProviders`) only wraps themes — next-intl context is provided by the layout, but there is a mismatch that causes SSR failure on Next.js 16 + next-intl 4.x. This makes the entire site inaccessible.

2. **No `<title>` on error page** — when the app crashes, Next.js renders an error HTML with no title and no `lang` on `<html>`. This is a consequence of #1.

## Major

3. **Missing `lang` attribute on root not-found page** — `app/not-found.tsx` hardcodes `lang="en"` instead of using the locale-aware layout. The locale-specific `app/[locale]/not-found.tsx` is correct, but the root-level fallback breaks for Spanish users.

4. **`aria-current` misuse in LanguageSwitch** — uses `aria-current="true"` (string) on language buttons; should be `aria-current="true"` is valid but the semantic is wrong — `aria-current` with value `"true"` is not standard for this pattern; should use `aria-pressed` for toggle buttons or remove.

5. **No `aria-live` region for loading state** — `ThemeSwitch` renders `<span>loading...</span>` during mount. This text is not announced to screen readers. No `role="status"` or `aria-live` attribute.

6. **Skip link points to `#home` but `<main>` starts at section `id="home"`** — technically functional but the skip link should bypass the header and land at `<main>`. The `href="#home"` skips to the section inside `<main>`, not the `<main>` landmark itself.

7. **"Scroll down" link has no accessible label beyond visible text** — `<Link href="#projects">` in page.tsx contains only the emoji-laden translation key `moreInfo` ("More info 👇") plus a `ChevronDoubleDownIcon` with no `aria-hidden`. The icon has no `aria-label`, so screen readers will announce the SVG markup.

8. **Project external links missing `rel="noreferrer"` partner** — `Projects.tsx` `<Link href target="_blank">` has no `rel="noopener noreferrer"`. The link label is the URL text alone (e.g., "drizip.com") with no indication it opens externally. There is an `ArrowTopRightOnSquareIcon` inline but no `aria-hidden` on it and no `aria-label` describing the external destination.

9. **`ToastClose` button has no accessible label** — `components/ui/toast.tsx` renders `<ToastPrimitives.Close>` with only `<X className="h-4 w-4" />` (icon), no `aria-label`. Screen readers cannot identify this button's purpose.

10. **`loading.tsx` spinner has no accessible label** — The animated `<div>` spinner has no `role="status"`, no `aria-label`, and no `aria-live`. Screen readers are not informed that content is loading.

11. **Privacy page has no `<main>` landmark** — `app/[locale]/privacy/page.tsx` wraps content in `<div>` elements only, with no `<main>` landmark.

12. **Error page (`error.tsx`) uses hardcoded English text** — Not using i18n translations. English-only content shown to Spanish locale users.

## Minor

13. **Heading hierarchy on privacy page** — `h1` "Privacy" followed immediately by `h2` "Analytics" is fine, but it renders without the locale layout `<main>` so landmark is missing (see #11).

14. **Footer emojis are announced by screen readers** — `🐻🐧` in Footer.tsx are raw emoji with no `aria-hidden="true"` and no `aria-label`. Screen readers will announce them as "bear panda".

15. **Emoji in translation strings** — `Home.description`, `Home.moreInfo`, `Toggles.dark`, `Toggles.light`, `Toggles.english`, `Toggles.spanish` all contain emoji that will be verbosely announced by screen readers (e.g., "flag: United States", "crescent moon").

16. **`background-animate` gradient animation lacks `prefers-reduced-motion`** — `globals.css` defines a `gradient` keyframe animation on `.background-animate` with no `@media (prefers-reduced-motion: reduce)` guard. The subtitle gradient animates for all users.

17. **`ChevronDoubleDownIcon` bounce animation** — `motion-safe:animate-bounce` is correctly used in page.tsx — this one IS guarded. Good.

18. **Duplicate logo images for dark/light** — `Links.tsx` renders two `<Image>` tags for logos that swap via CSS `dark:hidden` / `dark:block`. Both carry `alt={title + " logo"}`. Screen readers that see both (if CSS isn't interpreted for ARIA tree) would announce the alt text twice.

19. **`aria-label` on LanguageButton uses English regardless of locale** — `aria-label={\`Switch language to ${label}\`}` — the phrase "Switch language to" is always in English even on the Spanish locale. It should be translated.

20. **`<nav>` has no `aria-label`** — `Navigation.tsx` renders `<nav>` without an `aria-label` or `aria-labelledby`. On pages with multiple nav regions this causes confusion for screen reader users. Recommended: `aria-label={t("navLabel")}`.

21. **Contact section heading level** — The contact and projects sections use `<h2>` which is correct after the `<h1>` in the hero. Good. But the `<h2>` in `projects` is inside a `<section>` with no `aria-labelledby` linking them.

22. **Footer privacy link text is the same in both locales** — `messages/en-US.json` has `"privacy": "Privacidad"` (Spanish word used in English locale). This is likely a copy/paste bug.
