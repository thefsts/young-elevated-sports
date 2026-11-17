## YESP — Consolidate Approved Production Website into Main

This PR brings the **entire approved YESP website lineage** into `main`. It does not redesign anything, does not change the live production deployment, and does not merge itself.

> **Status: DRAFT — awaiting PM/owner approval.** Task 010A is gated: Vercel API access is unavailable in the build environment, so the production deployment settings could not be read (see *Deployment impact* below). No merge, branch deletion, DNS change or production redeploy has been performed.

---

### Before / after

| | Commit | Tree | Files |
|---|---|---|---|
| **`main` before** | `b6395ec` chore: initialize repository | `7349801` | 120 |
| **`integration/yesp-production-sync`** | `b0851db` | `c62a945` | 431 |
| **Live production today** | `52982f8` | `412c9e0` | — |

`413 files changed, 26,445 insertions(+), 1,220 deletions(-)` relative to `main`.

> **Updated:** PR #5 (`fix/about-remove-verification-panel` @ `4f15d94`) was opened after the initial audit and carries one unique commit — removal of the public "Verification status / What we have not published" section from `/about`. It is now **merged into this branch** (`954e7c1`), so no approved work is left behind.

The Task 007/009/010 lineage tree is preserved exactly: merging `b756a2d` produced tree `c33fa5a`, byte-identical to the tip. The only later change is the owner-authored PR #5 About-page fix.

### Why this is a safe, lossless merge

Every prior branch is a **strict ancestor** of this merge. There are **zero** commits on any branch that are not already contained here:

| Branch | HEAD | Commits ahead of `main` | Contained? |
|---|---|---|---|
| `main` | `b6395ec` | 0 | ✅ |
| `feature/batch-001-foundation` | `0601ac8` | 15 | ✅ |
| `feature/correction-005-visual-fidelity` | `3cc26f5` | 16 | ✅ |
| `feature/task-007-athlete-skyline-header` | `e8568f7` | 27 | ✅ |
| `feature/task-009-homepage-complete` | `52982f8` | — | ✅ (via PR #2) |
| `feature/task-010-spacing-footer-reviews` | `b756a2d` | 28 | ✅ |
| `fix/about-remove-verification-panel` | `4f15d94` | 1 (on `e8568f7`) | ✅ merged in `954e7c1` |

`git log main..<any branch>` returns **empty** for all of them.

### Source branch mapping

| Work | Source branch | Landed here as |
|---|---|---|
| Foundation, brand, public site, registration front end | `feature/batch-001-foundation` | 15 commits |
| Visual-fidelity correction | `feature/correction-005-visual-fidelity` | 1 commit |
| Athlete/skyline header, registration, waivers | `feature/task-007-athlete-skyline-header` | 11 commits |
| Complete 14-section homepage, reviews scaffold, gallery, FAQ, 009A footer | `feature/task-009-homepage-complete` → PR #2 | merge `e8568f7` |
| Spacing system, footer logo canvas crop, visible reviews | `feature/task-010-spacing-footer-reviews` | `b756a2d` |

### Feature inventory preserved

- **Homepage** — all 14 sections in approved order: hero, programs, pricing, why, **reviews**, development, gallery, FAQ, final CTA, plus objectives/technology/facility blocks. Section ids: `programs pricing why reviews development gallery faq objectives dfw`.
- **Branding** — runner lockup (viewBox cropped to ink bounds `72 9 1393 968`), monogram, favicon, gold `#D6A73B` system, Barlow/Barlow Condensed.
- **Classes & registration** — 7-step intake (`athlete → guardian → classes → objectives → medical → waivers → review`), `?class=` preselection, four training tracks, seven pricing packages, 75-minute sessions, Flex expiration.
- **Compliance** — waivers, privacy, terms, accessibility, policies.
- **Infrastructure** — App Router, i18n (`en`/`es`), sitemap, robots, error/not-found boundaries.

### Sensitive features remain DISABLED

Verified present in the merged tree, unchanged:

- `app/classes/register/page.tsx` — “Submission disabled”
- `components/ClassRegistrationForm.tsx` — “Signature capture disabled”, “Payment is disabled”
- `components/AthleteRegistrationForm.tsx` — “Submission disabled — pending approval”
- `app/registration/page.tsx` — “Preview only — submission disabled”
- `lib/validation.ts` — “no signatures, no payment data. Enrollment remains disabled.”

No outdated registration form was restored over a newer one — the newest implementation is the tip of this merge.

### Conflict resolutions

**None.** The merge is a clean fast-forward-able ancestry merge forced with `--no-ff` to create an explicit consolidation record. Zero conflicts.

### PR #1 disposition

`feature/batch-001-foundation` (15 commits) is **fully contained** in this merge. PR #1 is therefore **superseded (option B)** — merging it separately would move `main` *backwards* to a 15-commit state. It should be **closed, not merged**, once this PR lands. It has **not** been closed.

### Deployment impact — READ THIS

- `main` (`b6395ec`) has **zero Vercel commit statuses** — it has **never been deployed**. Production is not currently deploying from `main`.
- Live production serves `52982f8` (Task 009/009A), which is **fully contained** in this merge.
- **If** Vercel production is later pointed at `main`, merging this PR would deploy `c33fa5a` — i.e. production **plus** Task 010 spacing/footer/reviews changes.
- Because Vercel API access is unavailable, we **cannot** confirm the project's production branch setting or whether auto-deploy on `main` is enabled. **Do not merge until that is confirmed.**

### QA

See `docs/task-010a-report.md` for the full results table (typecheck, lint, tests, build, routes, assets, accessibility, registration).

---

**Do not merge, delete branches, change DNS, or redeploy production without PM/owner approval.**
