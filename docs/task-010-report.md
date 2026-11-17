# Task 010 — Production Baseline Protection, Homepage Spacing, Footer & Reviews

**Branch:** `feature/task-010-spacing-footer-reviews`
**Base:** `e8568f7` (tree `412c9e0`) — the verified production-equivalent source
**Status:** ready for PM visual approval. **PR #2 untouched. Production not merged or redeployed.**

---

## 1. Production baseline (Phase 1)

The owner promoted the site in Vercel manually, so `main` is **not** production.
`main` is still at `b6395ec` ("chore: initialize repository") and does not contain
any of the homepage, branding, classes or registration work.

| Question | Finding |
| --- | --- |
| Production URL | https://young-elevated-sports.vercel.app/ |
| Does production contain Task 009? | Yes — all nine `id` sections render (`objectives`, `dfw`, `programs`, `pricing`, `why`, `reviews`, `development`, `gallery`, `faq`) |
| Does production contain the 009A footer fix? | Yes — `w-[190px] sm:w-[220px] lg:w-[240px]` is in the served markup |
| Which commit does production match? | **`52982f8`** |
| How verified | Rendered text extracted from production and from a local build of `52982f8` is **byte-identical (10,031 characters)**; the JS chunk hashes differ only because of build-environment differences |
| Git state of PR #2 | **Merged** by the owner into `feature/task-007-athlete-skyline-header` as merge commit `e8568f7` |
| Tree of `e8568f7` | `412c9e06ae80ae106b2e3a495cb73e36143c2641` — **identical** to the tree of `52982f8` |

**Baseline preserved:** the new branch was cut from `e8568f7`, so it starts from
exactly the code that production serves. Nothing was reset, overwritten, merged
or redeployed. `main` was not touched.

---

## 2. Spacing audit and corrections

### What was wrong

The page had three different vertical rhythms, which is why it read as
inconsistent:

| Surface | Before (mobile / desktop) | Problem |
| --- | --- | --- |
| Coach + technology split | 48 / 48 px | Too tight for its content weight |
| Training objectives | 40 / 56 px | Tightest block on the page |
| Sections 06–13 | 64 / 80 px | Mobile padding above the 40–56 px target |
| Final CTA | 80 / 112 px | Nearly 2× the neighbouring sections |

### What it is now

A single system: **48 px mobile and tablet, 80 px desktop**, with the final CTA
allowed one step more (64 / 96) because it is the closing statement.

Measured after the change, from computed styles:

| Width | Every content section | Final CTA |
| --- | --- | --- |
| 390 px | 48 / 48 | 64 / 64 |
| 834 px | 48 / 48 | 64 / 64 |
| 1536 px | 80 / 80 | 96 / 96 |

Files changed: `app/page.tsx` (coach/technology `lg:py-12` → `lg:py-20`;
objectives `py-10 lg:py-14` → `py-12 lg:py-20`) and
`components/home/HomeSections.tsx` (seven wrappers `py-16 lg:py-20` →
`py-12 lg:py-20`; CTA `py-20 lg:py-28` → `py-16 lg:py-24`).

No section was redesigned. Only vertical padding changed; the header-to-hero
composition, the skyline band, card internals and type scale are untouched.

---

## 3. Footer logo — artwork bounds, not container size

The previous fix changed the CSS width but left the SVG canvas at
`viewBox="0 0 1536 1024"`, which contains large transparent margins. The visible
artwork occupied only **89.4 % of the width and 92.6 % of the height**, so a
240 px container rendered a ~214 px logo with phantom space around it, and the
footer band stayed tall.

Measured ink bounds of the artwork (alpha bounding box at 1:1):

```
ink:  x 82..1455   y 19..967      → 1373 × 948 px, aspect 1.448
transparent margins: left 82, right 81, top 19, bottom 57
```

### Change

1. **Cropped the canvas to the ink** — `viewBox` changed from
   `0 0 1536 1024` to `72 9 1393 968` (ink bounds plus a uniform 10 px pad) in
   both `ye-runner-lockup.svg` and `ye-runner-lockup-black.svg`. No path, glyph,
   wordmark, descriptor or colour was altered; only empty canvas was removed.
2. **Updated the intrinsic size** in `components/Logo.tsx` from `1536×1024` to
   `1393×968` so the aspect ratio stays correct.
3. **Resized the footer logo** to `150px` mobile / `170px` sm / `200px` lg with
   `h-auto w-full object-contain`. Because the canvas is now cropped, CSS width
   equals visible width.
4. **Removed excess vertical space**: top padding `pt-14 lg:pt-16` → `pt-10
   lg:pt-12`; band gap `gap-8` → `gap-6`; bottom padding `pb-12` → `pb-10`.

### Measured result

| Width | Before (box) | After (box) | Before (visible ink) | After (visible ink) |
| --- | --- | --- | --- | --- |
| 390 px | 190 × 127 | **150 × 104** | 170 × 118 | **148 × 102** |
| 834 px | 220 × 147 | **170 × 118** | 197 × 136 | **168 × 116** |
| 1536 px | 240 × 160 | **200 × 139** | 214 × 148 | **197 × 137** |

The full lockup — runner symbol, "YOUNG & ELEVATED", "SPORTS PERFORMANCE",
descriptor and DFW line — is intact. Header logo, hero and all other brand
assets are unchanged.

---

## 4. Reviews section

### What was wrong

The section existed but its `<h2>` read **"Athlete stories coming soon."** — so
the page never actually said "reviews", and the section was easy to scroll past.

### What changed

- `<h2>` is now **"Athlete Reviews & Testimonials"**, set at
  `clamp(2.6rem, 3.4vw, 3.4rem)` with a gold rule beneath it.
- Eyebrow changed to "What athletes and parents say".
- The empty state became a two-column feature panel: a small-group training
  photograph on one side (credited as a placeholder in-image), and on the other
  the "Athlete stories coming soon." message plus three labelled rows stating
  exactly what a real review will contain — athlete or parent name, sport or
  program, verified date — each with a one-line explanation.
- `ReviewCard` is unchanged and still supports name, role, context, quote,
  optional verified date and optional authorised photo. When `testimonials`
  stops being empty the grid renders automatically.

Position is unchanged and correct: after **Why Train With YESP**, before
**Athlete Development**.

**Nothing was invented.** `testimonials` remains `export const testimonials:
Testimonial[] = [];`. No names, quotes, star ratings or results were added. No
real person's photo is paired with a testimonial.

---

## 5. Photo replacement inventory

See **`docs/photo-replacement-inventory.md`**. It lists all thirteen registry
images, the exact surfaces each one appears on, replacement priority, the
recommended crop and focal point per slot, the authorization record table, and
the alt-text guidance.

Five registered categories (`football`, `basketball`, `female-athletes`,
`youth-development`, `assessment-equipment`) are wired but not currently placed
on any page; the inventory records them as ready.

A working import pipeline was added at **`scripts/import-photo.mjs`**:

```bash
node scripts/import-photo.mjs path/to/IMG_1234.jpg sprinting --focus=0.45,0.35
```

It preserves the original in `assets/photos/originals/`, crops 3:2 around the
supplied focal point, emits 1600/1200/800 px derivatives, applies **no colour
tint** (only a mild exposure lift when mean luma is below 70, so skin tones stay
natural), and strips metadata. Verified end to end: 2000×1333 source →
1600×1066, 1200×800, 800×533, all at exactly 1.5 aspect.

---

## 6. Registration preservation

The seven-step intake and combined-waiver preview were re-tested against this
build: **26 / 26 assertions passed.**

- `?class=` preselection still works (tested with
  `?class=athletic-strength-conditioning`).
- All seven approved prices still render.
- Submit button present and **disabled**; both signature inputs **disabled**.
- No POST / PUT / PATCH requests emitted; URL carries no personal data.
- Back navigation preserves prior selections.

---

## 7. QA results

| Gate | Result |
| --- | --- |
| `tsc --noEmit` | exit 0 |
| `next lint` | no warnings or errors |
| `npm run build` | succeeded |
| `npm test` | **69 / 69** |
| axe-core @ 390 / 834 / 1536 | **0 violations** |
| Horizontal overflow | 0 at all three widths |
| Console / page errors | 0 |
| Broken-link crawl | **30 internal routes, 0 non-200** |
| Registration functional suite | **26 / 26** |
| Photo import pipeline | verified, 3 derivatives at 1.5 aspect |

Screenshots in `shots-t010/`: `after-home-{1536,834,390}.png`,
`after-reviews-{1536,834,390}.png`, `after-footer-{1536,834,390}.png`, plus the
matching `before-*` captures taken from production for comparison.

---

## 8. Remaining blockers

1. **Vercel Deployment Protection** still returns `302 → vercel.com/sso-api` for
   anonymous requests to any preview alias. A Protection Bypass for Automation
   token, a team invite, or disabling Vercel Authentication for previews is
   needed to hand over a public preview URL. Until then the exact production
   build is served from the sandbox preview URL.
2. **PR #2 is already merged** by the owner (into
   `feature/task-007-athlete-skyline-header`, not `main`). This task therefore
   opens a new PR against that branch. `main` remains untouched and still lacks
   all approved work — worth resolving before any production merge.

**Not merged. Production unchanged.**
