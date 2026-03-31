---
name: Security audit baseline (March 2026)
description: Key security findings and patterns from comprehensive audit of benjadiaz.com portfolio site
type: project
---

Comprehensive security audit completed 2026-03-31 (updated). Site has minimal attack surface (no API routes, no server actions, no form submissions -- contact is mailto: link). Content is statically generated via generateStaticParams. New blog and projects sections added with MDX rendering.

**Open findings (Medium):**
- CSP includes `unsafe-eval` due to Microsoft Clarity dependency -- trade-off documented
- Missing HSTS (Strict-Transport-Security) header in next.config.ts (may be provided by Vercel automatically)

**Open findings (Low):**
- `readMdx` in lib/content.ts does not validate locale/slug params at function level (not exploitable due to layout validation + generateStaticParams)
- LinkCard MDX component does not validate URL protocol (href from MDX content, single-author risk only)
- ProjectLink component does not validate URL protocol (url from meta.ts, single-author risk only)

**Positive security patterns:**
- Locale validated at 3 layers (middleware, layout, i18n/request.ts) against strict allowlist
- All dynamic routes use generateStaticParams (fully static)
- Error boundary does not leak internal details
- No dangerouslySetInnerHTML, eval, or document.write in application code
- poweredByHeader: false set in next.config.ts
- frame-ancestors 'none' + X-Frame-Options: DENY for clickjacking protection
- Links.tsx uses isSafeUrl() validation for external links
- YouTube embeds use privacy-enhanced youtube-nocookie.com
- Only NEXT_PUBLIC_CLARITY_ID and NEXT_PUBLIC_SITE_URL exposed to client (both non-sensitive)
- Clarity ID validated with /^[a-zA-Z0-9]+$/ regex in layout.tsx
- All target="_blank" links include rel="noopener noreferrer"
- Focus traps properly implemented for modals (SearchDialog, MobileMenu)
- Catch-all route immediately calls notFound()
- .gitignore covers .env and .env*.local

**Why:** Establishes baseline for tracking security posture over time.
**How to apply:** Reference when reviewing future changes to see if new code introduces regressions or addresses existing findings.
