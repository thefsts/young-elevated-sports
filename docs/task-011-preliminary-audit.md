# Task 011 — Preliminary Audit (read-only, no code changed)

**Status: NOT STARTED — BLOCKED.** Task 011 Phase 1 requires *"confirm Task 010A consolidation complete"*. Task 010A is stopped at the Vercel-access gate (PR #4 is a draft, not merged). Per the directive's own sequencing, no refactoring branch has been created and **no code has been modified**.

This document records a read-only baseline so the work can start immediately once 010A is approved.

---

## Baseline

| Item | Value |
|---|---|
| Canonical candidate branch | `integration/yesp-production-sync` @ `7a5ffc4` |
| Newest feature tip | `feature/task-010-spacing-footer-reviews` @ `b756a2d` |
| Live production | `52982f8` (tree `412c9e0`) |
| Routes | 30 (0 non-200) |
| Tests | 69/69 passing, 4 files |
| Build | succeeds, 46 static pages |
| Source lines | 13,898 across `app/`, `components/`, `lib/` |

## Architecture — findings

| Finding | Detail | Severity |
|---|---|---|
| Oversized component | `components/ClassRegistrationForm.tsx` — **1,198 lines** (the 7-step wizard: steps, validation, summary, signature UI, all in one file) | High — primary modularization target |
| Oversized content module | `lib/i18n/dictionaries.ts` — 648 lines | Medium |
| Oversized content module | `lib/content/homepage.ts` — 644 lines | Medium |
| Oversized content module | `lib/content/waivers.ts` — 618 lines | Medium |
| Oversized section module | `components/home/HomeSections.tsx` — 552 lines (9 sections in one file) | Medium |
| Oversized component | `components/AthleteRegistrationForm.tsx` — 446 lines | Medium |
| Oversized component | `components/AccessibilityToolbar.tsx` — 438 lines | Low |
| Dependency surface | **Only 5 runtime deps**: `next`, `react`, `react-dom`, `resend`, `zod`. Very lean — no dead dependency weight. | ✅ Good |

**Recommended split for `ClassRegistrationForm.tsx`:** `steps/AthleteStep`, `steps/GuardianStep`, `steps/ClassesStep`, `steps/ObjectivesStep`, `steps/MedicalStep`, `steps/WaiversStep`, `steps/ReviewStep`, plus `RegistrationSummary`, `SignatureField`, and a `useRegistrationWizard` hook. Business logic (validation, pricing, step gating) separated from presentation. **No change to layout, copy, step order, colours or typography.**

## Security — findings

| Area | Status |
|---|---|
| Security headers | ✅ Comprehensive, framework-level in `next.config.ts`: `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `X-DNS-Prefetch-Control`, `Permissions-Policy` (camera/mic/geo/payment/usb all `()`), `Strict-Transport-Security` (2 yr, preload), strict `Content-Security-Policy` |
| CSP approach | ✅ `'self'`-only, no nonce needed — site ships no third-party scripts. Documented rationale in the config. |
| Input validation | ✅ `zod` `safeParse` on **all 3** API routes (`inquiry`, `school-inquiry`, `class-interest`) |
| Rate limiting | ✅ Present on all 3 routes — 5/10 min (class-interest), 4/10 min (school), inquiry |
| Abuse controls | ✅ Content-type check, body-size cap, honeypot field |
| Secrets | ✅ `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, `INQUIRY_TO_EMAIL` are **server-only** — no `NEXT_PUBLIC_` prefix, so they cannot leak into client bundles |
| Env template | ✅ `.env.example` present and accurate; future integrations commented out |
| Sensitive registration | ✅ Submission, signature capture and payment all disabled (verified) |
| **Dependency vulnerabilities** | ⚠️ **9 vulnerabilities (7 moderate, 2 high).** High: `zod < 4.6.6` — GHSA-mrhx-c7xc-m3w5, memory exhaustion when validating oversized constrained collections. Fix requires **zod 4.x, a breaking change** — must be done deliberately with full test re-run, not `npm audit fix --force`. |
| **Rate-limit durability** | ⚠️ `lib/rate-limit.ts` is in-memory. On Vercel serverless this is **per-instance**, so limits are approximate across cold starts and concurrent instances. Acceptable for a contact form; should be documented, and revisited if a durable store is approved. |

## Performance — findings

| Item | Value |
|---|---|
| Shared First Load JS | **103 kB** |
| Largest route | `/classes/register` — 129 kB first load (12 kB route) |
| Middleware | 34.3 kB |
| Images | `next/image` with responsive `sizes` throughout; optimizer serving 390/767/506 px variants |
| Fonts | Self-hosted Barlow / Barlow Condensed in `app/fonts/` — no external font requests, no FOUT from a third-party origin |
| Client components | Registration wizard and forms are the only heavy client islands; content pages are server components |

No performance regression identified. The 129 kB registration route is the main optimisation target if needed.

## Blockers

1. **Task 010A not merged** — Vercel API access unavailable, so the consolidation cannot be completed. Task 011 cannot legitimately branch from "verified canonical `main`" until this resolves.
2. No refactoring has been performed. No branch created. No files deleted.

## Proposed first steps once unblocked

1. Create `feature/task-011-codebase-hardening` from the approved canonical branch.
2. Split `ClassRegistrationForm.tsx` into step components + a wizard hook (biggest single win, ~1,200 → ~7 focused files).
3. Upgrade `zod` to 4.x in an isolated commit, re-run the full 69-test suite and the 26-assertion registration harness.
4. Document the in-memory rate-limit limitation in the README.
5. Add GitHub Actions: typecheck, lint, test, build, `npm audit` on PRs.
