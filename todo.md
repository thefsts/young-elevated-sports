# PM CHECKPOINT 002 — Expanded Frontend Development

## 0. Live GitHub state (mandated first action)
- [x] git fetch --prune; record actual main SHA, feature SHA, PR #1 state, changed files

## 1. Brand + asset verification
- [x] Re-verify all 18 SVG variants render (ink coverage + colour)
- [x] Verify favicon + app icons (ICO/PNG sizes, apple-touch)
- [x] Confirm no retired plain-YE asset remains referenced

## 2. CI
- [x] Add .github/workflows/ci.yml (lint, typecheck, test, assets, routes, build)

## 3. Validation hardening
- [x] Fix invalid calendar dates (2025-02-31, leap years, future DOB)
- [x] Add age-boundary tests (min/max age, exact birthday)
- [x] Strengthen inquiry abuse protection + document Vercel WAF requirements

## 4. Photography
- [x] 12 categories sourced/generated into public/media/
- [x] Licensing + placeholder inventory doc
- [x] Wire intentional imagery into every major page

## 5. Accessibility toolbar
- [x] Floating launcher, draggable, keyboard repositioning, minimize/close
- [x] 7 controls + reset, persisted, reduced-motion aware
- [x] Accessible panel, focus management, mobile safe areas

## 6. Localization EN/ES
- [x] Dictionaries + locale routing + hreflang/canonicals
- [x] Header language selector (desktop + mobile)
- [x] Translate nav/home/programs/classes/forms/errors/footer/a11y/cookies
- [x] Spanish legal = informational only; signature collection blocked
- [ ] Long-form About/Technology/Athletes/Contact body copy (documented gap)

## 7. Classes module
- [x] 10 class templates in config-driven data
- [x] /classes, /classes/[slug], /classes/register
- [x] Status labels; no fabricated availability
- [x] Class-interest forms (adult / guardian-led minor / school-team)
- [x] Weekly schedule + mobile list + filters
- [x] OPERON integration contract draft

## 8. Cookie consent
- [x] Banner, accept/reject/customize, footer reopen
- [x] 3 optional categories, no prechecked, scripts blocked until consent
- [x] Documented storage inventory

## 9. Navigation
- [x] Add Classes; keep header uncluttered; cookie prefs in footer

## 10. Tests
- [x] Class data integrity, class-interest validation, guardian boundaries
- [x] Language switching, missing translations
- [x] A11y controls, cookie persistence, optional-script blocking
- [x] Responsive nav, form success/failure

## 11. Verification + delivery
- [x] lint / typecheck / test / check:assets / check:routes / build all pass
- [x] Desktop/tablet/mobile screenshots of key surfaces
- [x] Vercel Preview attempt (no DNS change, no merge)
- [x] Final 14-item report; stop for PM review
