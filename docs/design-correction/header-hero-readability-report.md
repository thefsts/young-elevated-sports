# YESP — Header, Hero, Readability & Skyline Correction

Branch: `feature/task-007-athlete-skyline-header`
Base commit: `2112600`

This report covers the three P0 visual directives issued together: the icon-only
header, the hero head restoration and headline reduction, the desktop
readability pass, and the full-panorama Dallas skyline. It does **not** claim
visual approval — the rendered design still has to be judged by the PM against
the approved client reference. Nothing was merged.

---

## 1. Header — approved mark only

The header previously rendered the runner mark plus the "YOUNG & ELEVATED"
wordmark and the "SPORTS PERFORMANCE" descriptor. All business-name text is now
gone at every width.

| Property | Before | After |
| --- | --- | --- |
| Header contents | mark + wordmark + descriptor | approved runner-and-arrow mark only |
| Mark rendered size @1536 | 84 × 56 | **91 × 52** |
| Mark rendered size @834 | — | **77 × 44** |
| Mark rendered size @390 | — | **70 × 40** |
| Header height | 64 px | **64 px (unchanged)** |
| Home-link accessible name | wordmark text | `Young & Elevated Sports Performance — Home` |
| Business-name text nodes in header | 2 | **0** |

Implementation: `components/Logo.tsx` gained an `iconOnly` variant that returns
`Monogram` alone; `components/SiteHeader.tsx` uses `<Logo iconOnly />` and sets
the explicit `aria-label` on the home `<a>`. The full approved lockup is still
rendered by `FullLogo` in the footer, and the favicon is untouched. Navigation,
the language switcher and the Start Training button are unchanged.

Because the mark is now the only content on the left, the header is transparent
over the homepage hero until the user scrolls, then returns to the solid black
bar. Every other route keeps the solid bar.

## 2. Hero — the head was cropped, not missing

The previous hero used `object-cover object-[62%_34%]` inside a 432 px band. A
1536 × 1024 source rendered into a 1536 × 432 box with a 34 % vertical offset
shows only source y ≈ 201–633. The athlete's head sits far above that window.

The source was checked before changing anything, using a YuNet face detector:

```
face bbox  x = 1092  y = 59  w = 101  h = 137   (score 1118.3)
hairline   approx. y = 25
```

So the complete head **does** exist in the approved source. This was a
coordinate bug, not a missing asset, and no anatomy was synthesised in CSS.

Fixes applied:

- `object-position` is now `center top` on desktop and `70% top` on mobile, so
  the crop window starts at source y = 0 instead of y = 201.
- The image box starts 2.5 rem (40 px) below the top of the section. With the
  box at y = 0 the face (source y 59–196) sat underneath the 64 px header; the
  40 px offset puts the hairline at viewport y ≈ 65 and the face at y ≈ 99–236,
  entirely clear of the bar.
- The hero grew from 432 px to **544 px** on desktop so the shoulders and
  posture are in frame, not just the head.
- The header is transparent on the homepage, so nothing is painted over the
  head; a 160 px top scrim keeps the nav legible and releases before the face.
- The image is never stretched: `object-fit: cover` with a single-axis crop.

Navigation was hit-tested over the transparent header. All seven nav links
resolve to their own anchor (`elementFromPoint` returns the `A` element), and a
real click on **Training** navigated to `/training`.

## 3. Headline — reverted wording, two lines, 16.5 % smaller

| Property | Before | After |
| --- | --- | --- |
| Copy | Train Like / A Pro / Elevate / Your Game | **Build Winning Habits. / Reach Your Next Level.** |
| Lines | 4 | **2** |
| Line 1 colour | white | white |
| Line 2 colour | white | **gold `#e9bb59`** |
| Size @1536 | 68.0 px | **56.8 px (−16.5 %)** |
| Size @834 | 37.9 px | **30.9 px** |
| Size @390 | 36.8 px | **22.7 px** |
| Wrapping | 4 lines | **exactly 1 line per phrase at all three widths** |

The container was widened to `56rem` so the longer approved phrases fit on one
line each without shrinking the type below the 15–20 % band. Spanish copy was
reverted in parallel: *Construye Hábitos Ganadores. / Alcanza Tu Siguiente
Nivel.*

## 4. Desktop readability targets

Measured with `getComputedStyle` at 1536 px.

| Element | Target | Measured | Status |
| --- | --- | --- | --- |
| Coach heading | 34–40 px | **39.9 px** | pass |
| Coach bio | 16–18 px | **16.1 px** | pass |
| Technology heading | 30–36 px | **35.3 px** | pass |
| Technology card titles | 15–17 px | **16.1 px** | pass |
| Technology card descriptions | 14–16 px | **14.6 px** | pass |
| Objectives heading | 30–34 px | **33.8 px** | pass |
| Objectives labels | 14–16 px | **14.6 px** | pass |
| Dallas heading | 34–42 px | **42.0 px** | pass |
| Dallas supporting text | 16–18 px | **16.9 px** | pass |

All values use `clamp()`. Section padding was increased rather than clipping
content: the coach/technology split went from `lg:py-[0.55rem]` to `lg:py-12`,
and the objectives band from `lg:py-6` to `lg:py-14`.

## 5. Dallas skyline — full panorama

The band was 220–260 px tall on a 1920 × 802 source (2.39 : 1). At 1536 px wide
the source needs ~642 px of height to be shown whole, so `object-cover` was
always going to discard the top of the towers.

| Property | Before | After |
| --- | --- | --- |
| Band height @1536 | ~300 px | **640 px** |
| Rendered image | 1536 × 640, ~47 % of source height | **1536 × 640, ~99.7 % of source** |
| Crop | aggressive vertical | **≈ 2 px (aspect-matched)** |
| Gold over the photograph | 10 % screen + 12 % multiply + ramp | **single ramp into the panel only** |
| Angled panel | 62 % → 58.5 % | **60 % → 56.5 %, with a 24 px shadow edge** |
| Mobile | 220 px band | **240–272 px band, panel stacked below** |

The image is displayed at its own aspect ratio, so nothing is stretched and
Reunion Tower plus the downtown cluster stay in frame. Gold now comes from the
angled panel, not from a wash over the architecture.

## 6. Verification

| Check | Result |
| --- | --- |
| `npm run lint` | clean |
| `npx tsc --noEmit` | exit 0 |
| `npm run build` | ✓ compiled, 46/46 static pages |
| `npm run test` | 69/69 passed |
| `npm run check:brand` | 5/5 locks (IoU 87.5–94.1 %) |
| `npm run check:assets` | 32/32 |
| `npm run check:routes` | 21 routes + 4 special files |
| axe-core wcag2a/2aa/21a/21aa @1536 | **0 violations** |
| axe-core wcag2a/2aa/21a/21aa @390 | **0 violations** |
| Horizontal overflow @1536 / 834 / 390 | **none** (`scrollWidth == innerWidth`) |
| Nav clickable over transparent header | **yes** (real click → `/training`) |

## 7. Evidence files

- `header-before-after.png`
- `header-logo-detail.png`
- `hero-before-after.png`
- `responsive-hero.png`
- `skyline-before-after.png`
- `skyline-mobile.png`

## 8. Open items for the PM

1. The homepage header is transparent over the hero and solid after scrolling.
   If the PM wants the solid bar at all scroll positions, that is a one-line
   change, but it would put a black band across the top of the photograph.
2. The mobile headline is 22.7 px because that is the largest size at which
   "Reach Your Next Level." stays on one line inside a 390 px viewport. A larger
   mobile size means a deliberate third line.
3. The skyline band is now 640 px tall on desktop. That is the height the source
   needs to be shown complete; a shorter band necessarily crops the towers.
4. The Vercel preview remains behind Deployment Protection (SSO), so the URL
   cannot be opened without a Vercel login.
