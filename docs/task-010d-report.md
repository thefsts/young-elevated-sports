# Task 010D — Homepage Coach Young Photography Integration

Status: **complete to the approval gate.** Nothing merged, nothing deployed to
production, no branches deleted, no DNS changed.

## 1. GitHub branch and commit

| Item | Value |
| --- | --- |
| Branch | `feature/task-010d-homepage-coach-photos` |
| Base | `integration/yesp-production-sync` @ `ce914d3` |
| Feature commit | `a5db3fd` — feat(home): integrate owner-approved Coach Young photography |
| Docs commit | `f0a2b68` — docs(task-010d): PR body, asset table and QA evidence |
| Remote head | `f0a2b68` |

The branch was cut from the latest approved source, not from `main`. `main`
(`b6395ec`) still contains none of the approved work. The branch does not
include `feature/task-010b-about-photo` (`00a312e`), which is a separate draft
PR; both branches edit `lib/content/media.ts` but at different anchors, so they
should merge without conflict.

## 2. Draft pull request

PR **#7** — "YESP — Task 010D: Homepage Coach Young Photography Integration"
https://github.com/thefsts/young-elevated-sports/pull/7

Draft, base `integration/yesp-production-sync`.

## 3. Vercel preview

Deployment `8vpz5zvz9LjrnNDzDwSe4hiFaHB1` — status **Ready**.
Preview: https://young-elevated-sports-git-feature-tas-8bf04a-fullstacksolutions.vercel.app

The URL returns **302 to `vercel.com/sso-api`** — Vercel Deployment Protection
is enabled on the team, so the preview requires a Vercel team login. The build
itself succeeded; it is only the anonymous access that is gated. QA was
therefore executed against a local `next start` production server on the same
build output.

## 4. Screenshots

| Width | Full page | Coach section |
| --- | --- | --- |
| 1536 | `home-1536.png` | `why-1536.png` |
| 834 | `home-834.png` | `why-834.png` |
| 390 | `home-390.png` | `why-390.png` |

## 5. Asset paths

Originals (byte-for-byte, never modified):
- `assets/photos/originals/coach-young-football.png` — 994 × 1024, 382,497 B
- `assets/photos/originals/coach-young-standard.png` — 994 × 1024, 291,356 B

Optimised:
- `public/media/coach/coach-young-football.jpg` — 819 × 1024, 44,880 B
- `public/media/coach/coach-young-football-md.jpg` — 600 × 750, 28,525 B
- `public/media/coach/coach-young-football-sm.jpg` — 300 × 375, 10,173 B
- `public/media/coach/coach-young-standard.png` — 266 × 758, 198,463 B (RGBA master)
- `public/media/coach/coach-young-standard.webp` — 266 × 758, 28,248 B (served)

## 6. Test results

| Check | Result |
| --- | --- |
| `tsc --noEmit` | clean |
| `next lint` | No ESLint warnings or errors |
| `vitest run` | 69 / 69 (4 files) |
| `next build` | success, 46 static pages |
| Link crawl | 30 pages, 0 non-200 |
| axe WCAG 2.1 AA | 0 violations, `/` and `/about` × 3 widths |
| Horizontal overflow | 0 px at 1536 / 834 / 390 |
| Registration harness | 26 / 26 |
| Alpha preserved in browser | 36.92 % transparent at all widths |
| Black-box regression | 0.00 % pure-black pixels inside the image box |

## 7. About Us page confirmation

`app/about/page.tsx` is **not modified** by this branch — `git diff HEAD --
app/about/page.tsx` is empty. The About page still renders `coachPortrait` →
`/media/coach/coach-young-portrait.jpg`. The new `coachPortraitFootball` export
is separate and used only by `app/page.tsx`.

## 8. Resend

Key validated (`GET /domains` → 200). Written to `.env.local` only — gitignored,
mode 600, not committed. `lib/email.ts` needed no change; it already gates on
`emailConfigured()`.

Blocked on DNS: `youngelevatedsports.com` is `not_started` in Resend. Required
records — TXT `resend._domainkey`, CNAME `rsend` → `rsend.forge.rmta.net`,
CNAME `send` → `send.forge.rmta.net`.

`INQUIRY_TO_EMAIL` is blank pending an owner-supplied inbox.
