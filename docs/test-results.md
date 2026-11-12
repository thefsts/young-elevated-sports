# Test Results — Batch 001

Executed on the feature branch build. Only tests actually run are marked passed.

## Summary

| Check | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | ✅ Passed — 0 warnings, 0 errors |
| Typecheck | `npm run typecheck` | ✅ Passed — 0 errors |
| Build | `npm run build` | ✅ Passed — 39 static pages + 2 dynamic API routes |
| Unit tests | `npm run test` | ✅ Passed — 25/25 |
| Route coverage | `npm run check:routes` | ✅ Passed — 19 routes + 4 special files present |
| Asset integrity | `npm run check:assets` | ✅ Passed — 8 referenced local assets exist |

## Unit test detail (25 tests)

`tests/validation.test.ts` (16)
- inquiry: valid accepted; missing consent rejected; short message rejected; filled honeypot rejected; invalid email rejected; field error flattening.
- school inquiry: valid accepted; authority required; numeric group size required.
- athlete registration: complete accepted; participation acknowledgment required; guardian signature required; malformed DOB rejected.
- ageFromDate: before birthday, on birthday, invalid input.

`tests/content.test.ts` (9)
- 13 waivers W01–W13 present and ordered.
- Every waiver status is `DRAFT — LEGAL REVIEW REQUIRED`.
- Every effective date is null.
- Unique waiver slugs; slug lookup works; unknown slug returns undefined.
- Every waiver has sections and review notes.
- 8 programs with unique slugs.
- No invented contact details (email/phone/address/hours all null).

## Route coverage

All 19 required routes plus not-found, error, sitemap, robots, and the waiver `[slug]` route are present. Build generated 13 waiver documents via `generateStaticParams`.

## Not executed (must not be reported as passed)

| Check | Status | Reason |
| --- | --- | --- |
| Lighthouse (Perf/A11y/BP/SEO) | ⏳ Not run | Requires a deployed preview URL; targets are 90/95/95/95 |
| Manual responsive smoke (device matrix) | ⏳ Not run | Requires browser device emulation pass |
| Live form submission end-to-end | ⏳ Blocked | Resend credentials not configured |
| Accessibility audit (axe/manual) | ⏳ Not run | Planned before launch |
| Broken external link crawl | ⏳ Not run | No external links published yet |
| Penetration / security review | ⏳ Not run | Scheduled before launch |

## Security checks performed

- Security headers configured in `next.config.ts` (CSP, HSTS, X-Frame-Options, Permissions-Policy, Referrer-Policy, nosniff).
- `poweredByHeader: false`.
- API routes validate server-side, cap request size, apply honeypot and rate limiting.
- Resend key is server-only; no secret in client bundle.
- No analytics/ad pixels installed; no localStorage for sensitive data.
- Registration/waiver submission disabled; no sensitive persistence.
- Waiver pages render draft status and never present binding terms.

## Repository & pull request status (verified)

| Item | Value |
| --- | --- |
| Repository | https://github.com/thefsts/young-elevated-sports |
| Canonical branch | `main` |
| Feature branch | `feature/batch-001-foundation` |
| Feature branch HEAD | `c22cbe370b4654762fe91a166e8831d3b3411543` |
| Bootstrap `main` HEAD | `b6395ec01ec81e7192850086e2b3a12df6ffdec4` |
| Pull request | https://github.com/thefsts/young-elevated-sports/pull/1 |
| PR state | OPEN, MERGEABLE |

Push verification: `git rev-parse HEAD` and `git ls-remote origin feature/batch-001-foundation` both returned `c22cbe3…`, confirming the remote received the commit.

Note: the repository bootstrap commit (`b6395ec`) was created on top of the Batch 001 commit to give `main` an initial commit, which temporarily replaced `README.md` and `.gitignore` with minimal versions. Commit `c22cbe3` restores the full Batch 001 versions. The PR diff therefore shows the complete Batch 001 tree.

## Local production server verification

`next start` was run against the production build and returned HTTP 200 for `/`, `/contact`, and `/waivers/parent-guardian-consent`. Public port exposure through the sandbox proxy returned HTTP 403 and is recorded as a blocker (B6); no public preview URL is claimed.

---

## Brand correction run (approved runner mark)

| Check | Result |
| --- | --- |
| `python3 scripts/trace-brand.py` | ✔ 2 masters written |
| Trace fidelity, mark | ✔ overall pixel IoU **0.978** (gold 0.957 / silver 0.938) |
| Trace fidelity, full lockup | ✔ overall pixel IoU **0.980** (gold 0.959 / silver 0.948) |
| Variant build | ✔ 18 SVG variants generated |
| Raster export | ✔ 19 PNG/ICO outputs generated |
| Variant render coverage | ✔ every variant renders expected ink; single-colour variants verified |
| `tsc --noEmit` | ✔ exit 0 |
| `next lint` | ✔ no warnings or errors |
| `vitest run` | ✔ 25/25 passing |
| `next build` | ✔ 39 static pages + 2 API routes |
| Route check | ✔ 19 routes + 4 special files |
| Asset check | ✔ all referenced assets exist |
| Production server | ✔ `/`, `/about`, `/training`, `/registration/athlete` return 200 |
| Logo asset served | ✔ `/brand/ye-runner-mark.svg` 200, `/brand/favicon.ico` 200 |
| Homepage sections present | ✔ ticker, five pillars, DFW section render |

Not run (unchanged): Lighthouse, axe, device-matrix responsive smoke, live Resend send.
