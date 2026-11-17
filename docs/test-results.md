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

---

## PM Checkpoint 002 — expanded frontend run

Run locally against branch `feature/batch-001-foundation` on the sandbox.

| Check | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | ✔ No ESLint warnings or errors |
| Typecheck | `npm run typecheck` | ✔ exit 0 |
| Unit tests | `npm run test` | ✔ 53/53 passing (3 files) |
| Brand verification | `npm run check:brand` | ✔ all 18 variants + favicon verified |
| Asset references | `npm run check:assets` | ✔ 14 literal references + 36 media derivatives exist |
| Route verification | `npm run check:routes` | ✔ 21 routes + 2 dynamic routes + 4 special files |
| Production build | `npm run build` | ✔ 52 pages generated, 3 API routes, middleware 34.3 kB |
| Production server | `next start` | ✔ `/`, `/classes`, `/classes/register`, `/es/classes`, `/es/waivers/parent-guardian-consent` all 200 |
| Spanish rendering | `curl /es/classes` | ✔ Spanish class headings and CTAs present |
| Spanish legal notice | `curl /es/waivers/parent-guardian-consent` | ✔ English-authoritative + signature-disabled notices present |
| Responsive screenshots | Chromium headless | ✔ 12 surfaces × desktop 1440 / tablet 834 / mobile 390 = 36 images in `screenshots/checkpoint-002/` |

### New automated coverage in this checkpoint

- Class template integrity: exactly 10 templates, unique slugs, `price === null`,
  `schedule === null`, `proposed === true`, no `enrollment-open` class.
- Every schedule preview entry asserts `preview === true` and `bookable === false`.
- Class-interest validation for adult, guardian-led minor, and school audiences,
  including the audience-scoped requirement for athlete fields and the guardian
  relationship boundary.
- Spanish validation message pack returns Spanish errors.
- Calendar dates: `2025-02-31`, `2025-04-31`, `2025-13-01` rejected; leap years
  2024/2000 accepted, 2025/1900 rejected.
- Age boundaries: exact birthday, minimum and maximum age, minor at 17 / adult at 18.
- Dictionary parity: every English key exists in Spanish, no empty strings.
- Consent defaults: all optional categories false, essential true.
- Abuse controls: oversized body, non-JSON content type, spam + disposable domain,
  and a normal submission accepted.

### Not run / unavailable (reported honestly)

- **Lighthouse**: not available in this sandbox; no score is claimed.
- **axe-core / automated accessibility audit**: not installed; no conformance
  claim is made beyond manual keyboard/focus implementation.
- **Vercel Preview deploy**: blocked — no Vercel CLI or token in the environment,
  and the sandbox port proxy returns 403/404. No preview URL is claimed.
- **Live Resend delivery**: no verified sending domain or API key in this
  environment, so no end-to-end email was sent. The failure path is implemented so
  a delivery failure can never render a success screen.
- **Device-matrix testing**: replaced with headless Chromium viewport captures at
  three widths; no physical-device testing was performed.

---

## Checkpoint 003 — coach photography integration

Run on Node **v26.13.1** (npm 11.20.0) against commit built from `feature/batch-001-foundation`.

| Gate | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | ✔ No ESLint warnings or errors |
| Types | `npm run typecheck` | ✔ exit 0 |
| Unit tests | `npm run test` | ✔ 60 passed (4 files) |
| Brand assets | `npm run check:brand` | ✔ All brand assets verified |
| Asset references | `npm run check:assets` | ✔ 20 references, all exist |
| Routes | `npm run check:routes` | ✔ 21 routes + 4 special files |
| Production build | `npm run build` | ✔ 52 pages, middleware 34.3 kB, shared JS 103 kB |

New tests in `tests/checkpoint-003.test.ts` (7) lock the publication gate: only one
cleared photograph is public, every placeholder stays flagged, every referenced
file exists, no uncleared photograph exposes a `src`, and the untouched originals
are absent from `public/`.

### axe (WCAG 2.0/2.1 A + AA + best practice)

Eight routes audited at 1440 × 1000 with axe-core injected after a full scroll.

| Route | Passes | Violations |
| --- | --- | --- |
| `/` | 43 | 0 |
| `/about` | 41 | 0 |
| `/training` | 41 | 0 |
| `/media` | 41 | 0 |
| `/classes` | 46 | 0 (static state) |
| `/contact` | 46 | 0 |
| `/es/about` | 41 | 0 |
| `/es/media` | 41 | 0 |

Two violation classes were found on the first run and fixed:

1. **`label-content-name-mismatch` ×2** — the header and footer logo links carried
   an `aria-label` that did not contain the visible wordmark. The mark is now
   `aria-hidden` and the redundant `aria-label` was removed, so the visible text
   is the accessible name.
2. **`color-contrast`** — 14 nodes on `/`, 27 on `/training`, 40 on `/classes` and
   smaller counts elsewhere were below 4.5:1 because muted labels sat at
   `text-white/30`–`/45` and `text-gold/70`. Those were raised to
   `text-white/60`–`/65` and `text-gold` (full), and input placeholders to
   `text-white/55`. The palette and hierarchy are unchanged; only the muted
   steps moved up.

Residual `/classes` hits vary between runs (8 → 6 → 0) and are caused by the
scroll-reveal animation sampling a partially transparent card. Forcing
`.reveal { opacity: 1 }` before the audit yields **0 violations**.

### Lighthouse

Lighthouse could not complete a run against the Next server in this sandbox. It
exits with `net::ERR_ABORTED` on every application route, including after
stripping CSP and `X-Frame-Options` through a local proxy, while the same Chrome
instance loads the same URLs successfully over CDP and Lighthouse completes
normally against a plain static file server. This is an environment limitation,
not a site failure, and is reported as a blocker rather than a score.

Core Web Vitals were measured directly instead, via `PerformanceObserver` in
Chrome at a 412 × 823 mobile viewport with cache disabled:

| Route | LCP | CLS | TBT | TTFB | Transfer |
| --- | --- | --- | --- | --- | --- |
| `/` | 208 ms | 0 | 0 ms | 19 ms | 425 kB |
| `/about` | 212 ms | 0 | 0 ms | 17 ms | 732 kB |
| `/training` | 172 ms | 0 | 0 ms | 15 ms | 583 kB |
| `/media` | 188 ms | 0 | 0 ms | 13 ms | 513 kB |
| `/classes` | 280 ms | 0 | 20 ms | 16 ms | 617 kB |
| `/contact` | 208 ms | 0 | 6 ms | 16 ms | 746 kB |

These are same-host measurements with no network latency, so they are a floor,
not a field estimate. CLS of 0 on every route is the meaningful result.

### Responsive rendering

Screenshots captured at 1440 × 1000, 834 × 1112 and 390 × 844 for `/`, `/about`,
`/training`, `/media` and `/es/about`. The coach portrait and cutout were
confirmed to load (`naturalWidth > 0`) at every breakpoint after lazy loading was
triggered by scrolling; below-the-fold images correctly defer until scrolled into
view.

## Checkpoint 003 — design lock & photo addendum

Run on Node.js 26.13.1 (npm 11.20.0), production build `oXQQJWxY2Q1SRprpOuYv0`.

| Gate | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | ✔ No ESLint warnings or errors |
| Types | `npm run typecheck` | ✔ exit 0 |
| Unit tests | `npm run test` | ✔ 64 passed (4 files) |
| Brand assets | `npm run check:brand` | ✔ 18 SVGs + 9 PNG exports + ICO 16/32/48 |
| Approved-artwork lock | `node scripts/verify-approved-brand.mjs` | ✔ 5/5 (IoU 87.5–94.1%) |
| Asset references | `npm run check:assets` | ✔ 20 references resolve |
| Routes | `npm run check:routes` | ✔ 21 routes + 4 special files |
| Build | `npm run build` | ✔ compiled, 52 pages, middleware 34.3 kB |

### Approved-artwork lock

The client's two authoritative files were installed under
`assets/brand/approved/` and a new build gate compares them against everything
shipped in `public/brand/` using an ink-mask intersection-over-union:

| Comparison | IoU |
| --- | --- |
| Full logo — shipped vector vs approved master | 93.5% |
| Full logo — shipped 2400 px raster vs approved master | 94.1% |
| Icon mark — shipped vector vs approved master | 87.5% |
| Icon mark — shipped 1200 px raster vs approved master | 87.7% |
| Favicon composition vs approved icon | 93.4% |

The threshold is 80%. A redrawn or substituted mark falls far below it, so the
build now fails if the brand drifts. The scores also confirm the artwork already
deployed *is* the approved artwork — no redesign was required or performed.

### Accessibility

axe-core 4.x, WCAG 2.0/2.1 A + AA + best-practice, desktop 1440×1000, after a
full-page scroll and a 2.5 s settle so scroll-reveal transitions are complete:

| Route | Passes | Violations |
| --- | --- | --- |
| `/` | 43 | 0 |
| `/about` | 41 | 0 |
| `/training` | 41 | 0 |
| `/media` | 41 | 0 |
| `/classes` | 46 | 0 |
| `/contact` | 46 | 0 |
| `/es/about` | 41 | 0 |
| `/es/media` | 41 | 0 |

An earlier pass reported five `color-contrast` hits on `/classes`. They were
sampled while the reveal transition was still running — axe measured text
against a partially transparent card. Re-running with the transition settled
reports zero, and a direct check confirmed every `.reveal` element was at
`opacity: 1`. The harness wait was raised from 600 ms to 2500 ms so the audit no
longer samples mid-animation.

### Photo addendum gate

Four new client photographs were analysed with OpenCV YuNet at a 0.6 score
threshold. Face counts: `IMG_5608` 20, `IMG_1468` 5, `IMG_7389` 2, `IMG_0244`
30. All four are multi-person frames, so all four are held at
`pending-release`. Masters are EXIF-stripped and live outside `public/`; review
derivatives live in `review/coach-photos/`. Nothing from this batch is
reachable by the site. `tests/checkpoint-003.test.ts` asserts the queue holds
eight frames and 82 identifiable faces, none with a public path.

### Responsive rendering

25 screenshots captured at 1440×1000, 834×1112 and 390×844 across `/`,
`/about`, `/training`, `/media` and `/es/about`. The coach portrait resolves
through `next/image` at every breakpoint (390×487 at mobile), confirming the
responsive `sizes` contract. No horizontal overflow, no layout shift from the
new assets.

### Lighthouse

Still blocked in this environment: Lighthouse aborts with `net::ERR_ABORTED`
against every Next.js route, including behind a proxy that strips CSP, HSTS and
`X-Frame-Options`. It succeeds against a plain static server, which isolates the
failure to the harness rather than the site. Core Web Vitals were measured
directly with `PerformanceObserver` instead. No score is claimed.
