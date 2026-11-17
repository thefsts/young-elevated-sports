# PM Correction Task 005 — Visual Fidelity Rebuild

**Branch:** `feature/correction-005-visual-fidelity`
**Base:** `feature/batch-001-foundation` @ `0601ac8`
**Scope:** Homepage rebuilt to the approved reference. No new redesign. No merge. No production/DNS change.

---

## 1. What was wrong

The Checkpoint 005 homepage did not reproduce the approved reference. It was a different
composition built from the same section names:

| Reference | Checkpoint 005 build |
| --- | --- |
| Two-line headline | Four-line headline (`line1`–`line4`) |
| Second CTA = Athlete Intake Form | Second CTA = "Explore Programs" → `/about` |
| Five discipline icons under the hero copy | Scrolling marquee ticker |
| Coach profile and performance technology in one side-by-side band | Two separate stacked sections |
| Eight training objectives in one horizontal band on a **light** background | Five-up "pillars" grid on black |
| Dallas–Fort Worth skyline with a gold treatment | Flat black section, no skyline |
| No stats strip, manifesto block, or method grid | All three present |

The darkness complaint had a second cause beyond photo exposure: the reference is **not** a
uniformly dark page. Its training-objectives band is light (`#ECECE8`, measured mean luma 233)
and its DFW band is a bright gold skyline (mean luma 135). The Checkpoint 005 build rendered
every band on `#080808`, which is why the site read as heavy and dark even after the photos
were brightened.

---

## 2. Reference measurements used

The reference (`approved_homepage_reference.png`, 1536×1024) was measured directly rather than
eyeballed. Horizontal geometry is reliable; the board is vertically compressed, so vertical
proportions were used only for ordering and relative placement.

| Region | Reference measurement |
| --- | --- |
| Header | `y 0–60`, logo at `x 149`, nav `x 647–1250`, gold button right-aligned |
| Hero | `y 60–490`, full-bleed photo, athlete brightest around `x 1088` (71%) |
| Headline line 1 | `x 58–703` (645 px wide), cap height ≈ 49 px → **≈ 68 px type at 1536** |
| Headline line 2 | gold, sampled `rgb(233,187,89)` |
| Sub-copy | `y 254–295`, two lines |
| CTAs | `y 315–365` — solid gold + outlined |
| Five disciplines | `y 390–470`, labels SPEED / STRENGTH / AGILITY / EXPLOSIVE POWER / INJURY PREVENTION |
| Coach portrait | `x 100–264` (164 px wide), name at `x 293` |
| Technology column | starts `x 784` (51% of width) |
| Objectives band | `y 746–866`, background `#ECECE8`, black text, 8 items in one row from `x 456` |
| DFW band | `y 866–1024`, warm gold duotone, mean luma 135 |

---

## 3. What was rebuilt

`app/page.tsx` was replaced. The new page order is exactly the reference order:

1. **Hero** — full-bleed athlete photograph, left-weighted scrim only where the copy sits,
   gold eyebrow, **two-line** headline (`BUILD WINNING HABITS.` white / `REACH YOUR NEXT LEVEL.`
   gold sheen), two-line sub-copy, two CTAs (**Start Training** → `/start-training`,
   **Athlete Intake Form** → `/registration/athlete`), then the **five discipline icons**
   pinned to the bottom of the hero behind a hairline rule.
2. **Coach + Performance Technology** — one band, two columns, split at 50%. Left: portrait,
   eyebrow, name, role, two-paragraph bio, "Read the full story". Right: technology eyebrow,
   "Data-driven training for measurable results.", intro, four numbered technology pillars,
   "Explore the technology".
3. **Training Objectives** — **light** band (`#ECE9E4`), heading and rule on the left, **eight
   objectives in a single horizontal row** at ≥1280 px, each with a numeral and a hairline.
4. **Dallas–Fort Worth** — full-bleed skyline photograph with a warm gold duotone treatment,
   content on the right over a gold scrim: eyebrow, `Dallas–Fort Worth`, intro, three items.
5. **Closing CTA** — retained from the previous build (the reference is cropped before the
   footer, so no reference exists for this band).

Removed from the homepage: the marquee ticker, the stats strip, the manifesto block, the
four-up programs grid, the separate method grid, the separate technology section, and the
five-up pillars grid. Their content was not discarded — the eight objectives carry the
discipline list, and the four technology pillars carry the data-driven training copy.

### Typography correction

The headline was the single largest fidelity failure. `.display-xl` resolves to `123.84 px` at
1440 px, which forced "Build Winning Habits." onto two lines and produced a **four-line**
headline. A new `.display-hero` token was added:

```css
.display-hero {
  font-size: clamp(2.15rem, 4.7vw, 4.5rem);
  line-height: 0.92;
  letter-spacing: -0.012em;
}
```

At 1440 px this resolves to **67.68 px**, matching the reference's ≈68 px. Measured result:

| Breakpoint | Font size | `<h1>` height | Rendered lines |
| --- | --- | --- | --- |
| Desktop 1440 | 67.68 px | 125 px | **2** |
| Tablet 834 | 39.20 px | 72 px | **2** |
| Mobile 390 | 34.40 px | 63 px | **2** |

### Hero vertical placement

The first rebuild bottom-aligned the hero copy, leaving the headline at 45% of hero height.
The reference places it in the upper third. The copy block is now anchored with `pt-[18vh]`
and the discipline row is pinned with `mt-auto`:

| Element | Reference (within hero) | Corrected |
| --- | --- | --- |
| Eyebrow / headline top | 0.172 | 0.190 |
| Headline | 0.172 | 0.235 |
| Sub-copy | 0.451 | 0.404 |
| CTAs | 0.593 | 0.506 |
| Discipline row | 0.849 | 0.867 |

---

## 4. Brightness correction

Every band was measured after the rebuild and compared against the same band in the reference.

| Band | Reference mean luma | Corrected mean luma | Delta |
| --- | --- | --- | --- |
| Hero | 55.1 | 51.5 | −3.6 |
| Hero — left (copy) | 52.9 | 44.7 | −8.2 |
| Hero — right (athlete) | 64.9 | 58.7 | −6.2 |
| Coach + technology | 42.7 | 38.1 | −4.6 |
| Training objectives | 233.0 | 229.1 | −3.9 |
| Dallas–Fort Worth | 135.0 | 134.7 | −0.3 |

How each was achieved:

- **Hero** — the previous build stacked a 95%→5% vertical scrim plus a 88%→0% horizontal scrim
  plus a grain layer over a 100%-opacity photo. The vertical scrim and the grain were removed.
  A single left-weighted horizontal scrim remains (`0.89 → 0.62 → 0.15 → 0`), and the
  photograph is rendered at `brightness(1.14)`. The right 46% of the frame is now essentially
  unscrimmed, so the athlete reads at full exposure.
- **Coach + technology** — background raised from `#080808` to `#161412` with a soft gold
  radial (`rgba(214,167,59,0.28)`) behind the portrait. The portrait keeps its brightened
  derivative and only a light `from-ink/25` gradient.
- **Training objectives** — the band is now light (`#ECE9E4`) with near-black type, matching the
  reference. This is the change that stops the site reading as uniformly dark.
- **Dallas–Fort Worth** — previously a flat black section with a radial gold glow. Now a
  full-bleed skyline photograph with `brightness(1.18) sepia(0.22)`, a 58% screen-blended gold
  wash (`#C89A4A`), and a horizontal gold scrim that only firms up behind the text. No black
  overlay anywhere in the band.

All shipped photography was already brightened in Checkpoint 005 by
`scripts/brighten-photos.mjs` (shadow-lift LUT, mean luma 42.1 → 78.2, originals preserved in
`assets/media/pre-brighten/`). That work is unchanged and still idempotent.

---

## 5. Logo and brand — unchanged and locked

No brand asset was touched. `components/Logo.tsx` still renders the approved runner mark
(`/brand/ye-runner-mark.svg` / `-on-light.svg`) with the `YOUNG & ELEVATED` wordmark and the
gold `SPORTS PERFORMANCE` descriptor. The retired plain YE monogram was not reintroduced.

```
npm run check:brand
  ok  full logo (vector): matches approved master (IoU 93.5%)
  ok  full logo (raster): matches approved master (IoU 94.1%)
  ok  icon mark (vector): matches approved master (IoU 87.5%)
  ok  icon mark (raster): matches approved master (IoU 87.7%)
  ok  favicon composition: matches approved master (IoU 93.4%)
Approved-artwork lock passed (5 checks).
```

---

## 6. Coach photography

`Young2.jpg` → `coach-young-portrait.jpg` remains the primary profile image and is the only
photo used on the homepage. It is registered `status: "cleared"`, `placeholder: false`. The
transparent cut-out (`coach-young-cutout.png`) is untouched. No new photographs of any
identifiable person or minor were published; `coachPhotoQueue` remains metadata-only with no
public path.

---

## 7. Classes and pricing — preserved

Nothing in `lib/content/classes.ts`, `components/ClassPricing.tsx`, `app/classes/page.tsx`, or
`app/classes/[slug]/page.tsx` was changed in this task. Still in place:

- exactly **four** approved class offerings, all `approved: true`, `durationMinutes: 75`,
  `ageGroup: null`
- the **seven approved price points**: $35 single, $130 flex-4, $230 flex-8, $120 monthly-4,
  $200 monthly-8, $250 monthly-12, $300 monthly-16
- flex bundles, monthly packages, 75-minute sessions, 60-day flex expiry
- sibling / family discount **by inquiry only** — no dollar figure published
- no schedule, capacity, or availability claims (`schedulePreview` entries remain
  `preview: true, bookable: false`)
- online payment still stated as not enabled

---

## 8. Functionality preserved

| Requirement | Status |
| --- | --- |
| English / Spanish interface | Working. `/` → `en-US`, `/es/` → `es-US`, verified at desktop and mobile. |
| Cookie consent | Unchanged (`yesp_consent_v1`, bottom banner). |
| Movable accessibility controls | Unchanged. |
| Inquiry forms | Unchanged (`/start-training`, `/contact`). |
| Security headers | Unchanged (`next.config`). |
| Responsive behaviour | No horizontal overflow at 390 / 834 / 1440. |
| Registration / payments / waivers | Still gated. `/registration/*` remains preview-only; no checkout added. |

New i18n keys were added for the rebuilt sections in both dictionaries (headline lines, intake
CTA, five disciplines, eight objectives) plus corrected `home.hero.imageAlt` in both languages
to describe the photograph actually used.

---

## 9. Verification

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | pass |
| `npx next lint` | 0 warnings, 0 errors |
| `npx vitest run` | **69 passed / 69** (4 files) |
| `npm run check:brand` | 5/5 approved-artwork checks pass |
| `npm run check:assets` | 20 references, all exist |
| `npm run check:routes` | 21 routes + 4 special files, all present |
| `npm run build` | compiled successfully, 46 static pages |
| axe-core (wcag2a/2aa/21a/21aa/best-practice) | **0 violations** across 10 routes × 2 viewports (20 runs) |
| Horizontal overflow | none at 390 / 834 / 1440 |
| Headline line count | 2 at all three breakpoints |

The axe run covers `/`, `/es/`, `/classes`, `/es/classes`, `/about`, `/es/about`,
`/start-training`, `/es/start-training`, `/performance-technology`, `/contact` at 1440×900 and
390×844.

Two contrast failures introduced by the new light band were found and fixed before this report:
gold `#D6A73B` on `#ECE9E4` (1.83:1) and `#A8862F` on `#ECE9E4` (2.83:1). The light band now
uses `#6F5416` (5.86:1) for eyebrows, numerals, and the objectives link. `ArrowLink` gained an
optional `className` so the light-band instance can override the default gold without changing
any other call site.

---

## 10. Screenshots

In `docs/correction-005/`:

| File | Contents |
| --- | --- |
| `cmp-desktop-reference-vs-corrected.jpg` | Approved reference beside corrected homepage, desktop |
| `cmp-desktop-live-vs-corrected.jpg` | Current live (Checkpoint 005) beside corrected, desktop |
| `cmp-tablet-live-vs-corrected.jpg` | Live vs corrected, tablet 834 |
| `cmp-mobile-live-vs-corrected.jpg` | Live vs corrected, mobile 390 |
| `cmp-desktop-fullpage.jpg` | Full-page live vs corrected |
| `fix-home-desktop.png` | Corrected homepage, full page, 1440 |
| `fix-home-tablet.png` | Corrected homepage, full page, 834 |
| `fix-home-mobile.png` | Corrected homepage, full page, 390 |
| `fix-home-es-desktop.png` | Corrected homepage, Spanish, 1440 |
| `fix-home-es-mobile.png` | Corrected homepage, Spanish, 390 |

---

## 11. Changed files

```
app/globals.css                    + .display-hero token
app/page.tsx                       rebuilt to the reference composition
components/ui.tsx                  ArrowLink accepts an optional className
lib/i18n/dictionaries.ts           + 20 keys (EN/ES), corrected hero image alt
docs/checkpoint-005-correction-report.md
docs/correction-005/*              comparison screenshots
```

---

## 12. Remaining owner actions

1. **Preview URL** — see the delivery message. The Vercel alias
   `young-elevated-sports.vercel.app` is protected by Deployment Protection; the PM must be
   signed in to the Vercel team to open a deployment-specific preview URL.
2. **Photography** — every athlete image on the homepage is still a brand-directed AI
   placeholder. Replacing them with cleared client photography is the largest remaining
   fidelity gap against the reference, which uses real athletes.
3. **Reference footer** — the supplied reference is cropped at the DFW band, so the footer and
   closing CTA could not be compared. The existing footer was left as-is.
4. **Nav item "DFW"** — the reference header shows a DFW nav item. No `/dfw` route exists, so
   the seven-item navigation was left unchanged rather than shipping a dead link. Confirm
   whether DFW should be an anchor to the homepage section or a new page.
5. **Merge** — PR #1 is untouched and unmerged. Production domain unchanged.
