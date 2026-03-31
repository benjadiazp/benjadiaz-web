---
name: Security audit baseline (March 2026)
description: Key security findings and patterns from comprehensive audit of benjadiaz.com portfolio site
type: project
---

Comprehensive security audit completed 2026-03-30. Site has minimal attack surface (no API routes, no server actions, no form submissions -- contact is mailto: link).

**Open findings (Medium):**
- Inline Clarity script in layout.tsx interpolates NEXT_PUBLIC_CLARITY_ID without sanitization
- .gitignore only covers .env*.local, not plain .env
- No security headers configured in next.config.ts (no CSP, HSTS, X-Frame-Options, etc.)

**Open findings (Low):**
- Projects.tsx external links missing rel="noopener noreferrer" (Links.tsx does it correctly)

**Positive security patterns:**
- Locale validated at 3 layers (middleware, layout, i18n/request.ts) against strict allowlist
- Error boundary does not leak internal details
- No dangerouslySetInnerHTML, eval, or document.write in application code
- poweredByHeader: false already set in next.config.ts

**Why:** Establishes baseline for tracking security posture over time.
**How to apply:** Reference when reviewing future changes to see if new code introduces regressions or addresses existing findings.
