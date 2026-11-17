# PM Visual Gate — Changes Required: Correction Report

**Branch:** `feature/task-007-athlete-skyline-header`
**Scope:** the seven P0 visual corrections listed in the PM directive.
**Status:** corrections implemented, built, tested and captured. **Not merged.** Awaiting PM visual decision.

---

## 1. Header branding

The approved YE lockup was rebuilt rather than merely scaled. The wordmark now
uses a new self-hosted wide display face (Archivo Black, SIL OFL 1.1) added at
`app/fonts/ArchivoBlack-Regular.ttf` and wired in through `next/font/local` as
`--font-display-wide`, exposed in Tailwind as `font-display-wide`. The previous
wordmark was set in Barlow Condensed at `0.95rem`, which is why it read as a
caption next to the mark rather than as the brand.

Measured against the approved reference at 1536 px:

| Element | Reference | Rendered now |
|---|---|---|
| Runner mark | 84 × 56 px | 98 × 56 px |
| Wordmark width | 338 px | 336 px |
| Full lockup width | 437 px (x 49→486) | 447 px (x 144→591) |
| Header bar height | 67 px | 64 px |

The lockup is now within 2 px of the reference wordmark width and matches its
cap height. Navigation order, the language toggle and the gold Start Training
button are unchanged; the button was raised to 44 px tall so it carries the same
weight as the reference's larger control.

At 390 px the mark and wordmark scale down through a `clamp()` so the whole
lockup is 273 px wide and fully inside the viewport. It was previously 433 px
wide and ran off the right edge of a 390 px screen.

## 2. Hero photograph and YE wall sign

The composited sign was moved and resized. Two placement faults were found and
fixed:

1. The sign sat across the athlete's torso (previous centre 962, 372).
2. After the first correction it was placed at source y 300 — **above the
   visible crop**. The hero renders as a 1536 × 432 cover crop of a 1536 × 1024
   master, so only source y 296–728 is ever on screen. The sign was being cut
   off by the top edge of the band.

A mean/std scan of the visible band for the flattest 200 × 110 patch clear of
both the headline column (x 48–752) and the athlete's silhouette (x 690–1080)
returned x 1020–1220, y 340–450 at std 17.6 / luma 20 — genuinely flat wall in
shadow. The sign is now centred at (1120, 395) at 190 px wide, high on the wall
behind the athlete's right shoulder, fully inside the visible band.

The scrim was also re-weighted: it is now 0.82 alpha at the left edge and falls
to zero by 58 % of the width, so neither the athlete nor the sign is dimmed. The
sign renders emissive (peak luma 243) against a 47 luma wall, which is the
behaviour of an illuminated facility sign rather than a pasted graphic.

## 3. Hero typography

The narrow upright condensed headline is gone. `.display-hero` now uses Archivo
Black at `clamp(2.3rem, 4.55vw, 4.25rem)`, `line-height: 0.9`, uppercase, with a
`skewX(-11deg)` to supply the italic slant the reference uses. Archivo Black was
chosen by measurement, not preference: rendering "TRAIN LIKE" in four candidate
faces gave width/height ratios of Archivo Black 9.25 against the reference's
10.56, while Barlow Black Italic managed only 7.04.

The headline is four lines, matching the reference's breaks and colour
treatment — white / white / gold / white:

```
TRAIN LIKE      #FFFFFF
A PRO           #FFFFFF
ELEVATE         #E9BB59
YOUR GAME       #FFFFFF
```

Both CTAs and the five training objectives are unchanged in position and
content.

## 4. Coach Young section

The real Young2-derived portrait is retained. It was enlarged from 12 rem to
14.6 rem (232 × 290 px at desktop) and the diagonal gold accent behind it from
13.4 rem to 16.2 rem, so the portrait now leads the column rather than sitting
inside it. The crop moved from `object-top` to `object-[50%_18%]` so the face is
not pressed against the top edge, and the name was raised to `2.5rem`. The
two-column balance with the adjacent technology cards is unchanged.

## 5. Performance Technology

The five cards were rebuilt: 30 px gold icons restored (previously absent), card
borders lifted from `gold/30` to `gold/55`, padding increased, and the dense
descriptive paragraph inside each card replaced with a two-digit index. Cards
now measure 126 × 121 px and remain in a single row at desktop (verified: five
cards, one row). At mobile they fall to two columns and three rows, which is
correct for a 390 px viewport.

## 6. Dallas skyline — two candidates for PM selection

Both candidates render inside the identical angled gold panel. The band markup,
clip path, crop and grade are shared; only the source image changes. A
`?skyline=photo` query parameter selects candidate B; every other request
renders candidate A. This is a documented, default-safe switch, not a layout
change.

The band's own gold treatment was also dialled back, because it was compounding
the problem: the 22 % screen pass and 0.57 brightness crush were flattening the
towers regardless of source. Now 10 % screen and 0.74 brightness.

| | Candidate A — generated illustration | Candidate B — licensed photograph |
|---|---|---|
| Source | in-house AI illustration | Matthew T Rader, CC BY-SA 4.0, Wikimedia Commons |
| Master luma / std | 127.7 / 64.9 | 112.4 / 88.1 |
| Red-minus-blue | 92 | 82 |
| Edge density | 10.76 | 4.50 |
| In-band luma / std | 101.2 / 38.9 | 91.1 / 40.5 |
| In-band edge density | 4.70 | 3.12 |

Candidate A was regraded this round. The source illustration is inherently very
warm (mean RGB 169/109/67, red-minus-blue 102) and the previous grade multiplied
that cast while lifting brightness. The new grade neutralises most of the cast
with per-channel gains (r × 0.90, g × 1.01, b × 1.42), applies an S-curve at
1.30 and sharpens at 140 %. Red-minus-blue fell from 153 to 92, standard
deviation rose from 59.9 to 64.9 and edge density from 9.25 to 10.76.

**Provenance caveat, repeated deliberately:** candidate A is an AI-generated
illustration, not a photograph, and its landmark geometry is an approximation of
the Dallas CBD. Candidate B is a real photograph with a verifiable licence and
attribution. The PM has not yet chosen between them, and the current default
remains candidate A.

## 7. Mobile readability (390 px)

Type sizes were raised on the mobile breakpoint only, with the desktop values
restored at `sm`/`lg` so nothing on the approved desktop layout moved:

- Hero CTAs: 10.88 px → 14 px, 46 px tall.
- Eyebrows and arrow links: 10.88 px → 12.5 px.
- Class pricing and schedule detail: 9.6–10.4 px → 11.2–12.8 px.
- Cookie banner body and buttons: 12 px → 13.1 px, all controls ≥ 44 px tall.
- Navigation and header CTA: 12.5 px → 14 px.

The accessibility launcher is fixed to the bottom-right corner and was being
covered by the 176 px tall consent banner. `CookieConsent` now publishes the
banner height as `--cookie-banner-offset` through a `ResizeObserver`, and
`.a11y-launcher` adds it to its `bottom`. Measured at 390 px: banner top 668,
launcher top 596 — the launcher clears the banner by 16 px. At 1536 px: banner
top 957, launcher top 885.

No horizontal overflow at any breakpoint (scrollWidth equals innerWidth at 1536,
834 and 390).

---

## Verification

| Check | Result |
|---|---|
| `npm run lint` | No ESLint warnings or errors |
| `npx tsc --noEmit` | clean |
| `npm run build` | Compiled successfully, 46/46 static pages |
| `npm run test` | 69 passed / 69 |
| `npm run check:brand` | 5/5 approved-artwork locks passed (IoU 87.5–94.1 %) |
| `npm run check:assets` | 32 local asset references, all present |
| `npm run check:routes` | 21 routes + 4 special files |
| axe-core (wcag2a/2aa/21a/21aa) | 0 violations, desktop and mobile |

## Evidence files

- `side-by-side-1536.png` — reference vs corrected, two native 1536 × 1024 panels
- `hero-before-after.png` — reference / before / after hero detail
- `header-logo-detail.png` — reference / before / after header at 2×
- `coach-tech-compare.png` — reference / before / after coach and technology
- `skyline-alternatives.png` — reference band, candidate A, candidate B
- `tablet-mobile-fullpage.png` — 834 × 1112 and 390 × 844 full pages

## Outstanding, for PM decision

1. **Skyline choice** — A or B. Default remains A.
2. **Vercel preview access** — the branch preview is behind Deployment
   Protection (SSO), so it returns 302 to `vercel.com/sso-api` for anyone
   without a Vercel session. A Shareable Link or Protection Bypass must be
   enabled in project settings before the URL can serve as acceptance evidence.
3. **`.github/workflows/ci.yml`** — present, untracked, not committed. The GitHub
   App token lacks the `workflows` scope, so a push touching `.github/` is
   rejected with 403. Contents inspected and reported; nothing deleted.
