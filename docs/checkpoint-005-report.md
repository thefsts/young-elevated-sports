# Checkpoint 005 — Preview Recovery, Approved Pricing & Photography Brightness

**Date:** 2026-11-12
**Branch:** `feature/batch-001-foundation`
**Commit delivered:** `fe1d6e9c9ff91263590c942b93b2ef5333ae5de4`
**Base commit:** `79655ca9afbd05494ea14658df9e6d10b5c1e1e3`
**Pull request:** [#1](https://github.com/thefsts/young-elevated-sports/pull/1) — **OPEN**, not draft, not merged.

---

## 1. GitHub state (verified first)

| Item | Value |
| --- | --- |
| Remote | `https://github.com/thefsts/young-elevated-sports.git` |
| `origin/main` | `b6395ec` — `chore: initialize repository` |
| `origin/feature/batch-001-foundation` before work | `79655ca` |
| Local branch before work | `79655ca` (identical to remote) |
| New commit pushed | `fe1d6e9` |
| PR #1 head after push | `fe1d6e9` |
| PR #1 state | `OPEN`, `isDraft: false` |
| Merge | **not performed** — awaiting PM authorization |

No newer remote work was overwritten. The push was a fast-forward (`79655ca..fe1d6e9`); no force-push was used.

---

## 2. Client preview — current state and exact blocker

### What is publicly reachable

`https://young-elevated-sports.vercel.app` returns **HTTP 200** with no authentication prompt. It is a real, shareable URL.

However, it is **not serving this checkpoint**. It is serving a build from the Checkpoint 003 era:

| Probe | Live alias | This commit |
| --- | --- | --- |
| `/classes` | 200 | 200 |
| `/es/about` | 200 (`lang="es-US"`) | 200 (`lang="es-US"`) |
| Coach portrait | present | present |
| `id="pricing"` | **absent** | present |
| "Flex bundles" | **absent** | present |
| "Proposed" class copy | **present (2)** | absent |
| Brightened photography | **no** (pre-lift assets) | yes |

So the client's "photographs are too dark" complaint matches exactly what the live alias shows: the pre-lift assets. The new brightness work and the approved price sheet exist only in commit `fe1d6e9`, which is not deployed.

### Why the branch is not at a shareable URL

- `young-elevated-sports-git-feature-batch-001-foundation.vercel.app` → **404**
- `young-elevated-sports-git-feature-batch-001-foundation-thefsts.vercel.app` → **404**
- No deployment-specific URL is discoverable, and the public alias did **not** update after the push (polled for ~3 minutes).

There is **no Vercel credential in this environment**: no `VERCEL_TOKEN`, no `vercel` CLI, no `.vercel/` project link. I therefore cannot create, promote, or inspect a deployment, and I will not attempt to disable Deployment Protection or expose a protected environment.

The most likely cause is one of:

1. The Vercel project's Git integration is not connected to `thefsts/young-elevated-sports`, so pushes do not trigger builds; or
2. It is connected but its **Production Branch** is `main` (which is still at `b6395ec`), so the feature branch produces only preview deployments that are protected by Vercel Authentication and therefore have no public alias; or
3. Deployments are created manually from a local machine.

### Exact owner actions to produce a shareable preview (no auth disabled)

1. **Vercel → Project → Settings → Git**: confirm the repository is `thefsts/young-elevated-sports` and that the **Production Branch** is `feature/batch-001-foundation` for this review cycle (or merge PR #1 to `main` first, which is not authorized here).
2. Trigger a deployment for `fe1d6e9` (push again, or **Deployments → Create Deployment → branch `feature/batch-001-foundation`**).
3. **Share without disabling protection** — either:
   - **Deployment → Share**: create a *Shareable Link* ("Anyone with the link", optional password and expiry). This is the recommended path: it exposes one deployment, not the project, and leaves SSO intact; or
   - **Settings → Deployment Protection → Vercel Authentication → Standard Protection** (previews only, production untouched) **plus** invite the client as a Viewer in **Team → Members**.
4. **Do not** set Deployment Protection to *Disabled* for Production. That is explicitly out of scope without owner approval.

Once a deployment exists, verify `/classes` and `/es/classes` both return 200 and show the seven price points. I re-tested both routes locally against this commit and they pass; the same check should be run against the new Vercel URL before it is sent to the client.

---

## 3. Photography brightness correction

The "too dark" problem had two independent causes, fixed separately so each is reviewable:

**A. Low-luminance shipped derivatives.** The published JPEGs themselves were underexposed. `scripts/brighten-photos.mjs` applies a reversible 256-entry shadow-lift curve (`out = n + 0.20·(1−n)²`) per channel, preserving alpha. Originals are backed up once to `assets/media/pre-brighten/` and every run reads from the backup, so the operation is idempotent and cannot double-brighten.

Result across **50 files**: mean luminance **42.1 → 78.2**.

| Asset | Before | After |
| --- | --- | --- |
| Hero athlete (`hero-track.jpg`) | 32.6 | 72.5 |
| Coach Young portrait | 90.8 | 115.2 |
| Strength training | 32.2 | 72.2 |
| Group sessions | 37.7 | 75.6 |
| Sprinting | 39.0 | 76.5 |
| Agility footwork | 37.8 | 75.5 |
| Vertical jump | 45.1 | 80.8 |

The transparent coach cut-out was verified to keep its alpha channel (722,976 fully transparent pixels preserved) after an earlier attempt flattened it.

**B. Stacked layout overlays.** Photographs were being darkened a second time in CSS. Changes:

- `components/ui.tsx` `PageHero`: photo `opacity-40 → opacity-90`; scrim changed from a full-bleed `from-ink via-ink/85 to-ink/40` to a **left-weighted** `from-ink/92 via-ink/50 to-ink/10` plus a lighter top/bottom gradient.
- `app/page.tsx` hero: `opacity` raised to 100; overlays reduced to `from-ink/95 via-ink/35 to-ink/5` and a 90° left scrim; coach panel overlay `from-ink/40 to-ink/10 → from-ink/25 to-transparent`.
- `app/about`, `app/classes`, `app/classes/[slug]`, `app/media`: full-opacity `from-ink` gradients reduced to `from-ink/80–85` with transparent mid-stops.

Layout, logo, favicon, section order, and the black-and-gold system are unchanged.

**Before/after evidence** (in `/workspace/shots`):

- `photo-assets-before-after.jpg` — seven asset-level pairs with luminance labels
- `compare-home-hero.jpg`, `compare-home-coach.jpg`, `compare-about-portrait.jpg`, `compare-training-photo.jpg`, `compare-classes-grid.jpg`, `compare-media-gallery.jpg`, `compare-home-hero-mobile.jpg`

Screen-level mean luminance also rose: hero 28.6 → 42.7, training 21.6 → 45.9, classes grid 17.9 → 25.5, media gallery 25.8 → 40.9, mobile hero 32.4 → 45.8.

---

## 4. Official class offerings and pricing

`lib/content/classes.ts` was rewritten to the confirmed catalog.

**Four approved tracks**, all 75 minutes, all `approved: true`, `ageGroup: null` (confirmed on inquiry — no age band is invented):

1. Speed & Agility — `/classes/speed-agility`
2. Explosive Force & Vertical Jump Mechanics — `/classes/explosive-force-vertical-jump`
3. Multi-Directional Agility & Deceleration — `/classes/multi-directional-agility-deceleration`
4. Athletic Strength & Conditioning — `/classes/athletic-strength-conditioning`

**Seven approved price points**, rendered from a single `pricing` constant:

| Option | Price |
| --- | --- |
| Single session | $35 |
| Four-session flex | $130 |
| Eight-session flex | $230 |
| Monthly — 4 sessions | $120 |
| Monthly — 8 sessions | $200 |
| Monthly — 12 sessions | $250 |
| Monthly — 16 sessions | $300 |

Policy, from `pricingPolicy`: 75-minute sessions; flex bundles expire **60 days** after purchase; **class tracks may be mixed** within any purchased package; **family and sibling discounts are inquiry-only** — the copy says to ask when submitting a class interest request and states **no dollar amount**; **online payment is not enabled** and payment is arranged with the coach.

The ten previously *proposed* class categories were removed from the catalog. Established training services in `programs.ts` (private training, small-group, team training, camps, school partnerships, assessments) were **not** touched.

A new shared `components/ClassPricing.tsx` renders the sheet on both `/classes` and `/classes/[slug]`, so the two pages cannot drift. The schedule explorer's age filter was removed (no age band is published); category and level filters remain.

**Screenshots:** `classes-catalog-desktop.png`, `classes-pricing-desktop.png`, `classes-pricing-tablet.png`, `classes-pricing-mobile.png`, `es-classes-pricing-desktop.png`, `class-detail-pricing-desktop.png`, `classes-schedule-desktop.png`.

---

## 5. Safety restrictions (held)

- Class interest remains an **inquiry**, not enrollment. The form banner still reads "This is an interest request, not an enrollment" / "Esto es una consulta, no una inscripción."
- No medical intake, no payment processing, no confirmed reservations, no electronic waiver signing were added. The price sheet explicitly states online payment is not enabled.
- Schedule data remains `preview: true`, `bookable: false` on every entry.
- No unreleased athlete photography was published. The four addendum photos remain `pending-release` and out of `public/media`.

---

## 6. Verification results

| Gate | Result |
| --- | --- |
| `npm run lint` | ✅ No ESLint warnings or errors |
| `npx tsc --noEmit` | ✅ Clean |
| `npx vitest run` | ✅ **69/69** across 4 files |
| `npm run check:brand` | ✅ 5/5, IoU 87.5–94.1% |
| `npm run check:assets` | ✅ 20 references, all present |
| `npm run check:routes` | ✅ 21 routes + 4 special files |
| `npm run build` | ✅ Success; 4 SSG class routes generated |
| axe-core (12 routes) | ✅ **0 violations** |
| EN/ES price parity | ✅ Identical `$35 $120 $130 $200 $230 $250 $300` |
| Layout overflow 390 / 834 / 1440 | ✅ No horizontal overflow |

Routes checked for accessibility: `/`, `/about`, `/training`, `/media`, `/classes`, `/contact`, `/es/about`, `/es/media`, `/classes/speed-agility`, `/es/classes`, `/es/classes/speed-agility`, `/classes/register`.

**Locale defect found and fixed:** `/es/*` routes were rendering in English (`lang="en-US"`) because the middleware rewrite re-entered middleware and the second pass reset the locale header to the default. The middleware now respects an already-resolved locale. All `/es/*` routes verified as `lang="es-US"` with Spanish pricing copy.

New tests added: exactly seven approved price points; EN/ES price figures identical; 75-minute length and 60-day expiry; family/sibling language present with no dollar amount; online payment confirmed disabled.

---

## 7. Remaining owner actions

1. **Connect/confirm Vercel Git integration** and deploy `fe1d6e9` (see §2).
2. **Create a Shareable Link** for that deployment, or invite the client as a Viewer under Standard Protection. Do not disable protection for Production.
3. **Review and approve** the brightness lift and the price sheet before PR #1 is merged.
4. **Confirm the production branch / merge path.** `main` is still at `b6395ec`; merging PR #1 is not authorized in this checkpoint.

## 8. What was not done

- PR #1 was **not merged**.
- Production DNS was **not** changed.
- Vercel Deployment Protection was **not** disabled or weakened.
- No payment, medical intake, reservation, or waiver-signing capability was enabled.
- No unreleased athlete photography was published.
- `.github/workflows/ci.yml` remains untracked: the GitHub App token lacks the `workflows` scope, so pushing it returns 403. CI must be added by an owner with that scope.
