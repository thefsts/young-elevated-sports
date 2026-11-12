# Checkpoint 004 — Client Preview, Final Design Verification & Deployment

**Date:** 12 November 2025
**Branch:** `feature/batch-001-foundation`
**Commit verified:** `9fb33e9822043fa93e08172744d6d41b4f1dfda0`
**PR:** #1 — *Batch 001 — Foundation, Approved Runner Brand, Public Site, Registration Front End* — **OPEN, MERGEABLE, not merged**
**Verdict:** **Client-preview readiness is NOT achieved.** The site itself is verified and green; the blocker is that no publicly reachable Vercel URL serves the current commit.

---

## 1. GitHub state

| Item | Value |
| --- | --- |
| Local HEAD | `9fb33e9822043fa93e08172744d6d41b4f1dfda0` |
| Remote `feature/batch-001-foundation` | `9fb33e9822043fa93e08172744d6d41b4f1dfda0` (identical) |
| `origin/main` | `b6395ec01ec81e7192850086e2b3a12df6ffdec4` |
| PR #1 | OPEN, `mergeable: MERGEABLE`, head `9fb33e9` |
| Working tree | clean except untracked `.github/` (see blocker B-4) |

The remote branch was re-fetched before any work. Local and remote are the same commit, so every result below describes exactly what is on GitHub.

## 2. Vercel deployment — verified public Preview URL

**No verified public Preview URL exists.** This is reported as a blocker, not as a deliverable, per the instruction not to confuse a dashboard URL with a public website URL.

What is verifiable:

- GitHub commit status for `9fb33e9` reports **Vercel: success**, deployment `FHxmurMbKzeBnhQ4i95HPk1WQA7w`, dashboard link `https://vercel.com/fullstacksolutions/young-elevated-sports/FHxmurMbKzeBnhQ4i95HPk1WQA7w`. A build of the current commit exists and succeeded.
- `https://young-elevated-sports-fullstacksolutions.vercel.app/` → **HTTP 302** to `https://vercel.com/sso-api?...`. Vercel Deployment Protection (SSO) is enabled on deployment-specific URLs, so this is not publicly reachable.
- `https://young-elevated-sports-git-feature-batch-001-foundation-fullstacksolutions.vercel.app/` → **no DNS record**. The branch alias does not resolve.
- `https://young-elevated-sports.vercel.app/` → **HTTP 200 but a stale build**. This is the trap the directive warns about. Evidence, re-checked today:

  | Route | Status | Marker |
  | --- | --- | --- |
  | `/` | 200 | `facility.jpg` present (retired illustrative image), `Young2`/`coach-young-portrait` absent |
  | `/classes` | 404 | class catalog did not exist in that build |
  | `/es/about` | 404 | Spanish routes did not exist in that build |

  The response also carried `age: 50360`, i.e. roughly 14 hours stale, and predates Checkpoint 002. Serving this URL to the client would show the wrong site.

- The Vercel REST API cannot be queried from this environment: `forbidden: missing authentication token`. There is no `VERCEL_TOKEN`, no Vercel CLI, and no `~/.vercel`.
- `expose_port` is broken platform-wide in this sandbox. Both a Next.js server on port 3100 and a trivial `python3 -m http.server` on port 8080 return a public URL that 302s to `https://super.myninja.ai/404`, while local requests to the same ports return 200. A tunnel therefore cannot substitute for a real preview link.

**What the PM must do to unblock:** either disable Deployment Protection for the branch (Vercel → Project → Settings → Deployment Protection → Vercel Authentication: *Standard Protection* off, or scope it to production only), or issue a shareable preview link / `VERCEL_TOKEN` so the deployment can be addressed directly. Once either is done, the current deployment can be verified in minutes — the build already exists and already succeeded.

## 3. Vercel Node.js setting

- Repository declares Node 26: `package.json` → `"engines": { "node": "26.x" }`, and `.nvmrc` contains `26`. There is no `vercel.json` and no `functions` runtime override, so Vercel resolves the runtime from `engines`/`.nvmrc`.
- Local runtime used for every check below: **Node v26.13.1 "Lithium" LTS** at `/opt/node26`, npm 11.20.0.
- **The actual Vercel project setting could not be read** without an authenticated API token or dashboard access. It must be confirmed by the PM in Project → Settings → General → Node.js Version. Do not treat the repository declaration as proof of the project setting.

## 4. Design verification

The approved cinematic homepage is preserved. Nothing was redesigned, no alternate logo was substituted, and no section, type ramp, navigation item, or spacing value was changed in this checkpoint.

- Approved artwork lock: `npm run check:brand` compares the shipped `public/brand/` assets against the client masters in `assets/brand/approved/` using an ink-mask IoU, and fails the build below 80%.

  | Comparison | IoU | Result |
  | --- | --- | --- |
  | Full logo (vector) | 93.5% | pass |
  | Full logo (raster) | 94.1% | pass |
  | Icon mark (vector) | 87.5% | pass |
  | Icon mark (raster) | 87.7% | pass |
  | Favicon composition | 93.4% | pass |

  The residual 6–12% is antialiasing and resampling noise, not geometry: OCR of the wordmark returns identical text and the arrow geometry overlays cleanly in `shots/brand-compare.png`.
- Palette is unchanged: black, gold, silver, white.
- Coach Young's primary portrait is `Young2.jpg` throughout. Placements verified in server-rendered HTML:

  | Page | Asset | Treatment |
  | --- | --- | --- |
  | Home | `/media/coach/coach-young-portrait.jpg` | portrait, 4:5 |
  | About | `/media/coach/coach-young-portrait.jpg` | portrait, 4:5 |
  | Training | `/media/coach/coach-young-cutout.png` | cut-out over brand field |
  | Media | `/media/coach/coach-young-portrait.jpg` | portrait, 4:5 |

  All are derived from the single-subject `Young2.jpg` frame, EXIF-stripped, and served through `next/image` at 400/800/1200 widths.
- Placeholder photography elsewhere is unchanged and still labelled as brand-directed placeholder imagery.

## 5. Photo permission inventory

Eight client frames are held, **none published**. Total 82 identifiable faces. Every entry is `pending-release` and has no `src` property, so it cannot render.

| Frame | Faces detected | Status | Intended placement (once cleared) |
| --- | --- | --- | --- |
| `IMG_3643.jpeg` | 9 | pending-release | not assigned |
| `IMG_1652.jpg` | 3 | pending-release | not assigned |
| `IMG_0232.jpeg` | 5 | pending-release | not assigned |
| `IMG_8097.jpeg` | 8 | pending-release | not assigned |
| `IMG_5608.jpeg` | 20 | pending-release | Classes — session in progress |
| `IMG_1468.jpeg` | 5 | pending-release | Youth Development — small group |
| `IMG_7389.jpeg` | 2 | pending-release | Training — small-group coaching |
| `IMG_0244.jpeg` | 30 | pending-release | Media gallery — camp scale |

`IMG_0232 (1).jpeg` is a byte-identical duplicate of `IMG_0232.jpeg` and is counted once.

Face counts come from OpenCV YuNet at a 0.6 confidence threshold on the full-resolution originals. Three of the four addendum frames carried GPS EXIF; all masters are stored EXIF- and GPS-stripped outside `public/`, with private review derivatives in `review/coach-photos/`.

Publication requires, per frame: a signed release for every identifiable adult, and parent/guardian authorization for every identifiable minor. No photograph is used to imply an endorsement, a training outcome, a scholarship, or a client relationship. `tests/checkpoint-003.test.ts` enforces the gate — a queued frame that gains a `src`, or a status other than `pending-release`, fails the suite.

## 6. Automated test results

All run against commit `9fb33e9` on Node 26.13.1, production build `dqFbQICeMzVrvKvssvU1B`.

| Gate | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | pass, 0 errors |
| Typecheck | `npm run typecheck` | pass, 0 errors |
| Unit tests | `npx vitest run` | **64 passed / 64**, 4 files |
| Brand | `npm run check:brand` | pass — 5/5 approved-artwork comparisons + asset inventory |
| Assets | `npm run check:assets` | pass — 20 image references resolve |
| Routes | `npm run check:routes` | pass — 21 routes + 4 special paths |
| Production build | `npm run build` | pass — BUILD_ID `dqFbQICeMzVrvKvssvU1B` |
| Accessibility (axe) | 8 routes, WCAG 2.0/2.1 A+AA + best-practice | **0 violations**, 41–46 passes per route |
| Functional (browser) | 17 checks, Chromium | **17/17 pass** |
| Lighthouse | local `/about` | accessibility **100**, SEO **92** |

Functional checks, all passing: EN headline renders; `lang="en-US"` on EN and `lang="es-US"` on ES; ES copy translated; class catalog lists 11 classes; class detail exposes the interest form; the form is explicitly an inquiry, not an enrollment; `POST /api/class-interest` refuses to transmit (422 validation); cookie banner appears and consent persists to `localStorage` under `yesp_consent_v1`; accessibility toolbar present as a fixed control; mobile menu opens and sets `aria-expanded="true"`; **57 internal links resolve**; registration and waiver signing remain gated; no uncaught JS errors.

Lighthouse caveat, stated plainly: the performance category could not be captured. Repeated runs aborted with `FAILED_DOCUMENT_REQUEST` / `net::ERR_ABORTED` under the sandbox's 3.9 GB memory and 92%-full disk, and no run could be pointed at a deployed preview because there is no reachable preview URL. The single successful run (`/about`, mobile emulation) returned accessibility 100 and SEO 92. No performance score is reported rather than inventing one.

## 7. Functional scope discipline

Still disabled, as required: athlete registration, medical intake, payments, and electronic waiver signing. `/classes/register` is a **Class Interest Request** — an inquiry carrying the on-page notice "This is an inquiry, not an enrollment" and "Athlete registration and waiver signing are disabled until secure processing and legal review are approved." Nothing is stored or transmitted; the endpoint rejects the submission.

## 8. Remaining launch blockers

| ID | Blocker | Owner | Severity |
| --- | --- | --- | --- |
| B-1 | No publicly reachable preview of `9fb33e9`. Deployment-specific URLs are SSO-gated; the only open alias serves a stale pre-Checkpoint-002 build. | PM / Vercel admin | **Launch-blocking** |
| B-2 | Vercel project Node.js version unverified (repository declares 26; project setting unreadable without token). | PM / Vercel admin | High |
| B-3 | Eight client photographs (82 faces) unpublished pending releases, including guardian authorization for minors. | Client | High |
| B-4 | GitHub App token lacks `workflows` scope, so `.github/workflows/` cannot be pushed (403). CI therefore runs locally, not on GitHub Actions. Needs a token with `workflows` permission or a maintainer push. | PM / repo admin | Medium |
| B-5 | Lighthouse performance unmeasured (sandbox resource limits). Should be re-run against the real preview once B-1 clears. | Engineering | Medium |
| B-6 | Legal review outstanding on the class-interest copy, privacy notice, and waiver language (pages are marked DRAFT — LEGAL REVIEW REQUIRED). | Client counsel | High |
| B-7 | Business facts still unconfirmed: training location, schedule, direct phone line, pricing. Site states these are confirmed on inquiry. | Client | Medium |

## 9. What was not done

PR #1 was not merged. Production DNS was not changed. No registration, medical intake, payment, or waiver-signing path was enabled. No photograph was published. No result above is estimated or inferred; every number comes from a command run against `9fb33e9`.
