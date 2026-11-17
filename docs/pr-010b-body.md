## Task 010B — Replace About Us Profile Photo

Replaces the Coach Reggie Young profile photograph on **`/about`** with the owner-supplied, owner-approved image `Coach Young about us page.png`.

> **Draft — do not merge or deploy to production without approval.** Base branch is `integration/yesp-production-sync` (PR #4) so this can land into the consolidation before `main` moves.

---

### What changed

| File | Change |
|---|---|
| `lib/content/media.ts` | **New** `coachPortraitAbout` export (id `coach-young-about`, usage `["about"]`) |
| `app/about/page.tsx` | Import + `src`/`alt`/`caption` now use `coachPortraitAbout` |
| `public/media/coach/coach-young-about.jpg` | **New** 994 × 1242, 45 KB |
| `public/media/coach/coach-young-about-md.jpg` | **New** 800 × 1000, 33 KB |
| `public/media/coach/coach-young-about-sm.jpg` | **New** 400 × 500, 12 KB |
| `assets/photos/originals/coach-young-about.png` | **New** unmodified original (664,731 bytes) |
| `docs/media-inventory.md` | Documented the new asset and its preparation |

**7 files changed, 61 insertions(+), 5 deletions(-).**

### Requirement-by-requirement

| # | Requirement | Result |
|---|---|---|
| 1 | Use the supplied original; do not generate or alter appearance | ✅ Supplied PNG used directly. No generation, no retouching, no recolour, no sharpening, no facial alteration. |
| 2 | Preserve black background, white polo, facial features, glasses, YE watermark | ✅ Nothing cropped. Watermark verified present at bottom-right (3,050 px in the 0.72+ / 0.85+ region). |
| 3 | Optimise for web performance, preserve quality | ✅ **665 KB → 45 KB** (−93%) for the primary; mozjpeg q84, progressive, metadata stripped. |
| 4 | Responsive sizing with Next.js `Image` | ✅ Existing `next/image` `fill` + `sizes="(max-width: 1024px) 100vw, 33vw"` retained; optimizer serves 390 / 767 / 506 px variants. |
| 5 | Entire head visible, including hair | ✅ Head top at y = 228 of 1242 → **228 px headroom (18.4%)**. |
| 6 | Centre portrait on desktop / tablet / mobile | ✅ Aspect matches the frame exactly, so `object-cover` crops nothing at any width. |
| 7 | Preserve About layout, biography, typography, gold accents | ✅ Frame box identical before/after (**436 × 546** at 1536). No layout shift. No other file touched. |
| 8 | Update media inventory | ✅ `docs/media-inventory.md` updated with sizes, preparation and preserved-feature table. |
| 9 | Do not delete the previous original until usage verified | ✅ `coach-young-portrait.jpg` and `coachPortrait` remain in place — still the homepage portrait. |
| 10 | Do not change the homepage coach photo | ✅ `app/page.tsx` still imports and renders `coachPortrait` / `coach-young-portrait.jpg`. Untouched. |

### Preparation detail (why nothing was cropped)

The supplied PNG is **994 × 1024 (RGBA)** and had two issues for a 4/5 portrait frame:

1. A **2 px white artifact line** across the very top (row mean luminance 249 vs ~13 for the black background). Removed.
2. Aspect **0.974** vs the frame's **0.800**, which would have forced `object-cover` to cut ~88 px from each side — **destroying the YE watermark** at x 880–959.

Instead of cropping, the frame was **padded vertically** to 4/5 using the photograph's own background colour `rgb(13,13,9)`. The result is 994 × 1242 (0.8003), so the frame and the image match and `object-cover` has nothing to crop.

**No pixel of Coach Young was removed, moved or altered.**

### QA

| Check | Result |
|---|---|
| `tsc --noEmit` | ✅ clean |
| `next lint` | ✅ “No ESLint warnings or errors” |
| `vitest run` | ✅ **69/69** |
| `next build` | ✅ compiled, 46/46 static pages, `/about` emitted |
| `/about` HTTP | ✅ 200, references `coach-young-about.jpg` |
| axe-core WCAG 2.1 AA on `/about` | ✅ **0 violations** at 390 / 834 / 1536 |
| Horizontal overflow | ✅ 0 px at all three widths |
| Stretching / awkward crop | ✅ none — rendered ratio 0.799 / 0.800 / 0.800 vs frame 0.8 |
| Layout shift | ✅ none — frame box 436 × 546 before and after |
| Homepage photo | ✅ unchanged |

### Screenshots

Attached to the Task 010B delivery message: `compare-portrait-1536.png`, `compare-portrait-834.png`, `compare-portrait-390.png`, plus full-page `before-about-*` / `after-about-*`.

---

**Do not merge or deploy to production without approval.**
