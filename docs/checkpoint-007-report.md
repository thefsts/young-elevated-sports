# PM Task 007 — Exact Athlete, Skyline & Header Restoration

**Branch:** `feature/task-007-athlete-skyline-header`
**Base:** `3cc26f5` (Task 006 homepage reconciliation)
**Status:** Partially complete — one hard blocker (approved athlete source not received)

---

## 1. Supplied vs. received

The directive named three approved image sources. Only one file arrived in the workspace.

| Directive reference | Described as | Received? | What actually arrived |
|---|---|---|---|
| `image(1).png` | Training objectives + Dallas skyline band | **Partially** | `/workspace/image.png` — 874 × 149 px RGBA. This is a **crop of the bottom of the objectives strip plus the top of the Dallas–Fort Worth band only.** It is not a full-page reference. |
| `image(2).png` | Approved Black athlete sprinting in the YE-branded facility | **No** | File never appeared in `/workspace`. |
| `image(3).png` | Approved hero, Coach Young and performance-technology layout | **No** | File never appeared in `/workspace`. |

The upload line was emitted twice as `[Uploaded File: /workspace/image.png] [Uploaded File: /workspace/image.png]` — the same path twice, not three distinct files. A full workspace listing confirms only one new image exists.

**Consequence:** the directive states *"Do not replace the athlete with a different person. Do not substitute a generic skyline. Do not invent a different facility background."* Because `image(2).png` and `image(3).png` were never delivered, the hero photograph was **left as-is** rather than swapped for a lookalike. Substituting a stock athlete would have violated the explicit instruction. **This is the outstanding blocker.**

### What was recovered from `image.png`

OCR at 3× scale on the 874 × 149 crop recovered:

```
TRAINING IN
DALLAS-FORT WORTH
ELITE TRAINING | ELITE FACILITY | DFW ATHLETES
```

Measured geometry from that crop:

| Feature | Measurement |
|---|---|
| Gold panel left edge | **62.4 %** of width at y = 72, sliding to **58.5 %** at y = 128 (edge leans left as it descends) |
| Panel gradient (top) | `rgb(201, 156, 65)` |
| Panel gradient (bottom) | `rgb(104, 71, 14)` |
| `ELITE TRAINING \| ELITE FACILITY \| DFW ATHLETES` | One inline row with pipe separators at y ≈ 128, x 543–854 — **not** stacked cards |
| `DALLAS–FORT WORTH` heading | y 96–117 |
| `TRAINING IN` eyebrow | y 83–89 |

This is the only section of the reference that could be measured with confidence, and it drove the DFW rebuild below.

---

## 2. Dallas–Fort Worth section — rebuilt to the approved arrangement

Rebuilt from the measured geometry rather than approximated.

- **Skyline across the left**, angled **gold panel on the right**.
- Panel angle implemented as `clip-path: polygon(60.5% 0%, 100% 0%, 100% 100%, 57.2% 100%)` on a 478 px-tall band — the 60.5 % → 57.2 % lean reproduces the measured 62.4 % → 58.5 % edge over the band height.
- Panel gradient `linear-gradient(180deg, #d0a248 0%, #a5761f 34%, #7d5612 68%, #6b4a10 100%)` matches the sampled `rgb(201,156,65)` → `rgb(104,71,14)` range.
- Heading stack: `TRAINING IN` eyebrow → `DALLAS–FORT WORTH` → hairline rule → three pillars.
- `ELITE TRAINING | ELITE FACILITY | DFW ATHLETES` rendered as **one inline flex row with `h-3 w-px` pipe separators**, matching the reference — not three bordered cards.
- Below 1024 px the panel becomes a stacked block with a `polygon(0 2.25rem, 100% 0, 100% 100%, 0 100%)` angled top edge, so the angled treatment survives on mobile.

### Skyline image

No clean original of the reference skyline was supplied. Rather than stretch the 149 px crop or use a generic city, a high-resolution, correctly-licensed photograph of **the same subject** was sourced:

| Field | Value |
|---|---|
| File | `public/media/dfw/dallas-skyline.jpg` |
| Subject | Downtown Dallas at dusk, including Reunion Tower |
| Source | Wikimedia Commons — *Dallas Skyline at Dusk* |
| Author | Matthew T Rader |
| Licence | CC BY-SA 4.0 |
| Derivatives | 1920 × 802 (152 KB), 960 × 401 (38 KB), 480 × 200 (11 KB) |
| Processing | Cropped to 2.39:1 banner, gentle warm grade (`r*1.06+6`, `g*1.02+4`, `b*0.94+2`) to sit in the gold family |
| Attribution | Rendered on-page beneath the copy |

Registered as `dfwSkyline: LicensedAsset` in `lib/content/media.ts` with full provenance, and the on-page credit is visible rather than buried.

---

## 3. Header

Matches the previously approved appearance:

- Solid black bar (`bg-ink/85` at rest, `bg-ink/95` when scrolled) with a **thin gold hairline** along the bottom edge, built as a four-stop gradient so it fades across the width rather than reading as a hard line.
- Approved gold **runner** mark far left (56 × 32), `YOUNG & ELEVATED` wordmark beside it, `SPORTS PERFORMANCE` subtitle beneath — the approved lockup, unaltered.
- Nav links across the centre.
- Vertical separator, language selector, then the gold **Start Training** button at the right.
- The retired plain YE monogram is **not** used anywhere. Favicon remains the runner-and-arrow YE icon.

---

## 4. Footer

- Opens with the **complete approved logo** — runner symbol, wordmark, `SPORTS PERFORMANCE`, discipline line, Dallas skyline band and `DALLAS–FORT WORTH` — at `w-[16rem] sm:w-[20rem] lg:w-[26rem]` (measured 416 × 277 on desktop), so the skyline and DFW branding are legible.
- Rendered from `ye-runner-lockup.svg`, a transparent-background master. An earlier attempt used `ye-runner-lockup-dark-bg.svg`, which embeds a `<rect fill="#080808">` and produced a visible black plate around the logo; that was corrected.
- Three link columns, serving line, draft notice, copyright, policy links and the cookie-preferences button all preserved.

---

## 5. Sections restored to the approved order

Header → athlete hero (headline, buttons, five disciplines) → Coach Young + technology side by side → white training-objectives strip with eight icons → Dallas skyline and angled gold DFW panel.

| Section | Change |
|---|---|
| Hero | Headline `BUILD WINNING HABITS.` white / `REACH YOUR NEXT LEVEL.` gold; gold Start Training + outlined Athlete Intake Form; five disciplines along the bottom with icons. Scrim softened to 0.84 / 0.54 / 0.10 with `brightness-[1.2]` so the athlete reads clearly rather than sitting under a heavy black overlay. **Photograph unchanged — see blocker.** |
| Coach Young + technology | Side-by-side split. Real `Young2.jpg` portrait at `aspect-[4/5]`, `object-top`, `brightness-[1.08]` — head never cropped. Right column carries **five** gold-bordered technology cards (restoring `home.pillars.five`). |
| Objectives | Prominent light band (`#ece9e4`) with **eight** objectives, each with an icon, black type, gold accents. Gold type on this band uses `#6f5416` (5.86:1) for contrast. |
| Disciplines / objectives icons | New shared `components/icons.tsx` — 24 × 24 grid, stroke 1.35, round caps, `aria-hidden`, `focusable="false"` — so the five hero disciplines and eight objectives read as one family. |

---

## 6. Verification

| Check | Result |
|---|---|
| `tsc --noEmit` | clean |
| `next lint` | no warnings, no errors |
| `vitest run` | 69 / 69 passed |
| `check:brand` | 5 / 5 — IoU 93.5 / 94.1 / 87.5 / 87.7 / 93.4 |
| `check:assets` | 25 / 25 exist |
| `next build` | compiled successfully in 8.6 s |
| axe-core — 10 routes × 2 viewports | **0 violations** |
| Horizontal overflow at 1440 / 834 / 390 | 0 on every route |
| `document.documentElement.lang` | `en-US` / `es-US` correct on clean sessions |

### Measured geometry after the rebuild

| Viewport | Doc height | H1 | Tech cards | Objectives | Disciplines | DFW band |
|---|---|---|---|---|---|---|
| Desktop 1440 | 3979 px | 67.68 px, 2 lines | 5 in 1 row | 8 in 1 row, icons present | 5 | 478 px at y = 1930 |
| Tablet 834 | 4972 px | 39.20 px, 2 lines | 5 in 2 rows | 8 in 2 rows, icons present | 5 | 622 px at y = 2696 |
| Mobile 390 | 5586 px | 34.40 px, 2 lines | 5 in 3 rows | 8 in 4 rows, icons present | 5 | 636 px at y = 2850 |

Screenshots: `docs/correction-006/` — `home-{desktop,tablet,mobile}-full.png`, `home-*-fold.png`, `header-*.png`, `footer-*.png`, `dfw-*.png`, `coach-*.png`, `objectives-*.png`.

---

## 7. Preserved

Classes and pricing, inquiries, EN/ES localisation, cookie preferences, accessibility toolbar, registration and waiver drafts, SEO metadata and JSON-LD, security headers, responsive behaviour. Sensitive submissions and waiver signing remain **disabled** — no checkout, online payment off, schedule `preview: true / bookable: false`, `ageGroup: null`, registration and waiver pages preview-only.

---

## 8. Blockers

1. **Approved athlete not restored — `image(2).png` and `image(3).png` were never uploaded.** The directive forbids substituting a different person, so the hero photograph was deliberately left unchanged. Re-upload both files and the hero can be swapped in a single follow-up commit.
2. **No Vercel preview URL can be produced from this environment.** No Vercel CLI, no token, and no `.vercel` project link exist here; `expose_port` is broken platform-wide (returns a 404 page). A token or a PM-triggered deployment is required.
3. **`.github/` remains untracked.** The GitHub App token lacks the `workflows` scope, so any push touching `.github/` returns 403. Deliberately excluded from the commit with `git add -A ':!.github'`.

No merge performed. Production DNS untouched.
