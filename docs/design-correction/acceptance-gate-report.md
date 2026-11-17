# PM Final Visual Acceptance Gate — Evidence Report

**Repository:** `thefsts/young-elevated-sports`
**Branch:** `feature/task-007-athlete-skyline-header`
**HEAD at capture:** `6344c0f` (supersedes checkpoint `0911ea0`)
**Build:** Next.js 15.5.29 · Node v26.13.1 · production build exit 0
**Disk:** 1.41 GB free (83.4% used) — above the 750 MB heavy-build gate

No redesign was performed. No unrelated feature was changed. Nothing was merged to `main`.

---

## 1. Screenshots delivered

| File | Dimensions | Purpose |
|---|---|---|
| `side-by-side-1536.png` | 3096 × 1070 | Reference (left) beside build (right), both at native 1536×1024 |
| `home-desktop-fold.png` | 1536 × 1024 | Desktop above-the-fold |
| `home-desktop-full.png` | 1536 × 2578 | Desktop full page |
| `home-tablet-full.png` | 834 × 3740 | Tablet full page |
| `home-mobile-full.png` | 780 × 8886 | Mobile full page (DSF 2) |
| `home-tablet-fold.png`, `home-mobile-fold.png` | — | Fold captures |
| `geometry.json`, `responsive.json` | — | Measured section boxes, overflow audit |

The previous side-by-side was only 1572×556 — a downscale that made inspection meaningless. It has been **rebuilt at true resolution** (two native 1536×1024 panels, labelled).

---

## 2. Desktop band map — build vs. approved reference

Measured from the DOM, not estimated.

| Band | Reference y | Build y | Δ |
|---|---|---|---|
| Header | 0 | 0 | 0 |
| Hero | 56 | 56 | 0 |
| Coach + Technology | 488 | 488 | 0 |
| Objectives strip | 753 | 753 | 0 |
| Dallas–Fort Worth | 866 | 863 | −3 px |
| Document height | 2578 | 2578 | 0 |

Content gutter runs 48 px → 1508 px, matching the reference's edge-to-edge grid.

---

## 3. Required confirmations

### 3.1 Approved YE logo — header and footer ✅

- **Header:** `SiteHeader.tsx` renders `<Logo compact />` → `/brand/ye-runner-mark.svg` + `/brand/ye-runner-lockup.svg`.
- **Footer:** `SiteFooter.tsx` renders `<FullLogo />` → same approved artwork, full lockup at `w-[26rem]` on desktop.

Verified visually at 4× zoom: gold circular runner mark, "YOUNG & ELEVATED" wordmark with gold ampersand, "SPORTS PERFORMANCE" descriptor. No legacy plain-YE icon remains.

### 3.2 Coach Young's real portrait ✅

`lib/content/media.ts` → `coachPortrait`, `src: /media/coach/coach-young-portrait.jpg`, derived from the client-supplied `Young2.jpg`. An OpenCV YuNet face scan confirmed a single subject, so no third-party release is needed. `placeholder: false`, `status: "cleared"`, credit "Photograph supplied by Young & Elevated Sports Performance". Measured 88.2 mean luma — well-lit and legible against the diagonal gold accent.

### 3.3 Athlete and skyline — bright, visible, correctly cropped ✅

| Region | Mean luma | % pixels < 40 |
|---|---|---|
| Hero athlete (right 60%) | 76.5 | 32.9% |
| Skyline left portion | 136.9 | **0.0%** |
| DFW band, full width | 129.0 | 0.9% |
| Objectives strip | 225.9 | 1.8% |

The skyline carries **no crushed-shadow pixels at all**. The hero scrim reaches zero opacity by 72% width, so the athlete is never overlaid. Cropping: hero `object-[62%_34%]`, skyline `object-[34%_center]`.

### 3.4 Dallas skyline provenance ⚠️ — needs your decision

**Current asset is NOT a photograph.** `dfwSkyline` is an **AI-generated golden-hour duotone illustration**, produced in-house as "Variant A" during the skyline finalisation task you approved. It is registered honestly:

- `placeholder: false`
- `credit: "AI-generated illustration produced in-house for YESP — not a photograph"`
- `licence: "AI-generated — no third-party licence required"`
- `source: "Generated in-house (Variant A, golden-hour duotone)"`

A verifiably accurate licensed alternative already exists and is wired but **not in use**: `dfwSkylinePhoto` — a real dusk photograph of the Dallas CBD including Reunion Tower, by Matthew T Rader, **CC BY-SA 4.0**, via Wikimedia Commons. Switching is a one-line change in `app/page.tsx`.

**This is the one item I cannot confirm for you.** You selected Variant A, so it is the approved choice — but it is an illustration, not a photograph of Dallas, and the landmark geometry is a stylised reproduction. If the client expects a real skyline photo, say the word and I will swap to `dfwSkylinePhoto` (attribution must then travel with the image).

---

## 4. Responsive integrity

| Viewport | scrollWidth | Overflow | Doc height |
|---|---|---|---|
| Desktop 1536 | 1536 | none | 2578 |
| Tablet 834 | 834 | none | 3740 |
| Mobile 390 | 390 | none | 8886 |

`scrollWidth === viewport` at every breakpoint — no horizontal scrollbar. The single mobile flag is the decorative gold accent at `left: -6px`, clipped by the section's `overflow-hidden`; it cannot be reached by scrolling and is benign.

---

## 5. Vercel preview deployment — ⚠️ BLOCKED by SSO

**A preview build exists and succeeded.** The Vercel Git integration ran on every commit:

| Commit | Status |
|---|---|
| `6344c0f` (HEAD) | Vercel: **success** — "Deployment has completed" |
| `0911ea0` | success |
| `59e3c24` | success |
| `9348ddf` | success |

**Preview URL (branch alias):**
`https://young-elevated-sports-git-feature-tas-2f1a51-fullstacksolutions.vercel.app`

**It returns HTTP 302 → `vercel.com/sso-api`.** The deployment is wrapped in **Vercel Deployment Protection**, so it cannot be opened without a Vercel account on the `fullstacksolutions` team. I could not verify its contents, and neither can the client without logging in.

To make it client-accessible, one of these is needed on the Vercel side (I have no Vercel token in this environment, so I cannot do it):
1. Turn off Deployment Protection for preview deployments, **or**
2. Generate a **Shareable Link** for this deployment, **or**
3. Promote the branch to a custom preview domain.

**Separately:** `young-elevated-sports.vercel.app` returns 200 but is serving a **stale** build — it still references `/media/sprinting.jpg` (the old hero) instead of `/media/hero-athlete.jpg`. It is not this branch. Do not use it for visual acceptance.

---

## 6. PR association, mergeability, checks

**Our branch has no PR.** Only one PR exists in the repository:

| | |
|---|---|
| PR | **#1** — "Batch 001 — Foundation, Approved Runner Brand, Public Site, Registration Front End" |
| Branch | `feature/batch-001-foundation` — **not** this branch |
| State | OPEN |
| Mergeable | **MERGEABLE** |
| Checks | Vercel: **SUCCESS** |
| URL | https://github.com/thefsts/young-elevated-sports/pull/1 |

`main` is at `b6395ec` ("chore: initialize repository"). Our branch is **20 commits ahead**. Nothing has been merged; production DNS is untouched.

If you want a PR for this branch — which would also give a cleaner preview surface — authorise it and I will open one as a **draft**, so it cannot be merged accidentally.

---

## 7. Check suite — all green

| Check | Result |
|---|---|
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test` | PASS |
| `npm run check:brand` | PASS |
| `npm run check:assets` | PASS |
| `npm run check:routes` | PASS |
| `npm run build` | PASS (exit 0) |

---

## 8. `.github/` inspection — as instructed, not touched

Contents: a single file, `.github/workflows/ci.yml` (4 KB, 12 KB total).

- **Ownership:** authored in this project. It is **byte-identical** (sha256 `da3658d4…`) to `docs/ci-workflow.yml`, which is already committed.
- **Tracked:** no. `git log -- .github` is empty; `.gitignore` does not mention it.
- **Why untracked:** a previous push was rejected with **403** — the GitHub App token lacks the `workflows` scope. It cannot be committed with the current credential.
- **Action taken:** none. Not deleted, not committed, not modified.

It defines the CI job (lint → typecheck → test → brand → assets → routes → build) on Node 26. It is inert until it reaches the default branch.

---

## 9. Blockers requiring PM decision

1. **Skyline provenance** — current asset is an AI illustration, not a photograph. Confirm it is the final approved choice, or authorise the swap to the CC BY-SA 4.0 photograph.
2. **Vercel preview is SSO-protected** — the build succeeded, but the URL cannot be opened publicly. Needs Deployment Protection disabled or a Shareable Link generated on the Vercel side.
3. **No PR exists for this branch** — authorise a draft PR if you want one for review and a cleaner preview.

---

## 10. Disk status

1.41 GB free, 83.4% used, after the production rebuild. No cleanup was performed; none is authorised. Well above the 750 MB pause threshold.
