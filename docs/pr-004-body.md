# YESP — Consolidate Approved Production Website into Main

**Task 013 · release candidate**

This PR carries the complete, approved Young & Elevated Sports Performance website from `integration/yesp-production-sync` into `main`.

## Completeness

Every approved feature branch is fully contained in this head — **0 commits missing** from:

- `feature/batch-001-foundation`
- `feature/task-007-athlete-skyline-header`
- `feature/task-010-spacing-footer-reviews`
- `fix/about-remove-verification-panel`
- `feature/task-010b-about-photo`
- `feature/task-010d-homepage-coach-photos`
- `feature/task-012-resend-production`

436 files changed, +27,947 / −1,358 against `main`.

## Included work

| Task | Content |
| --- | --- |
| 001 | Foundation, approved runner brand, public site, registration front end |
| 006–008 | Design reconciliation, athlete/skyline restoration, header and readability corrections |
| 009 / 009A | 14-section homepage, reviews scaffold, gallery, FAQ, footer logo correction |
| 010 | Spacing system, footer logo canvas crop, visible reviews section |
| 010A | Removal of the internal verification panel from About |
| 010B | Owner-approved About Us portrait |
| 010D | Homepage Coach Young photography — football portrait + transparent arms-crossed cutout |
| 012 | Resend production email integration |

## PR #7 resolution

PR #7 reported a merge conflict against the integration branch. The conflict was a single file, `docs/media-inventory.md`, where both sides had added rows for distinct assets. Resolved as a **union** — Task 010B's About-portrait rows and Task 010D's football/cutout rows are both retained. The usage table was corrected to the actual code state:

- homepage coach introduction → `coach-young-football.jpg` (010D)
- homepage cutout → `coach-young-standard.webp` (010D)
- About profile → `coach-young-about.jpg` (010B)

`app/about/page.tsx` is untouched by the merge, so the 010B portrait and the removal of the verification panel are both preserved. PR #7 is now merged as `e604add`.

## Verification on this exact SHA (`e604add`)

| Gate | Result |
| --- | --- |
| `tsc --noEmit` | clean |
| `next lint` | No ESLint warnings or errors |
| `vitest run` | 69 / 69 in 4 files |
| `next build` | 46 pages generated |
| Link crawl | 30 pages, 0 non-200 |
| axe WCAG 2.1 AA | 0 violations |
| Horizontal overflow | 0 px at 1536 / 834 / 390 |
| Registration harness | 26 / 26 |
| Vercel preview build | **Ready** |

### Photography

- Homepage football portrait: natural 233×292, rendered 232×290, ratio drift 0.0007 — no distortion.
- Arms-crossed cutout: natural 266×758, rendered ratio 0.3509 exactly matching natural ratio at all three widths, `unoptimized` confirmed, 36.92 % transparent pixels — no black rectangle, no halo.
- About page: Task 010B portrait intact; verification panel absent.

### Email

All five categories deliver to `youngelesports@outlook.com` with sender `Young & Elevated Sports Performance <info@youngelevatedsports.com>`: general contact, training, school/team, partnership, class interest. Acknowledgment `reply_to` routes to the Outlook inbox. Invalid input → 422. Rate limit → 429 with `Retry-After`. Unconfigured → 503 with no provider leak. HTML escaping holds against a script-injection payload.

## Known limitations (not release blockers for code)

- The class-interest **form component is not mounted on any page**. This is pre-existing on both the integration and Task 010D branches — not a regression. The `/api/class-interest` route is functional and tested. Mounting the form is a new feature and was left out of scope.
- Vercel preview is behind Deployment Protection (SSO), so external content verification of the preview URL is not possible from this environment.
