# Logo Asset Inventory — Approved Runner Mark

**Status:** The client-approved **YE runner mark** (runner silhouette inside the YE with the upward elevation arrow) replaces the retired plain YE monogram everywhere. The plain YE must not be used.

**Source of truth:** `YESP_Approved_Brand_Kit/references/approved_runner_YE_icon_original.png` and `approved_full_logo_concept.png`.

---

## How the vector masters were produced

The approved artwork is raster. The masters in `public/brand/` were produced by a
**colour-separated auto-trace** (`scripts/trace-brand.py`), not by hand-drawing:

1. The approved PNG is split into a silver layer and a gold layer by pixel classification.
2. Each layer is traced with potrace into editable Bézier paths.
3. Layers are recombined into one SVG with brand fills.

**Measured fidelity against the approved artwork** (pixel IoU, 1.0 = identical):

| Master | Gold layer | Silver layer | Overall |
| --- | --- | --- | --- |
| `ye-runner-mark.svg` | 0.957 | 0.938 | **0.978** |
| `ye-runner-lockup.svg` | 0.959 | 0.948 | **0.980** |

These are genuine editable vector paths (no raster embedded in the SVG). They are a
faithful trace of the approved concept and remain subject to final client vector
sign-off for print/embroidery production.

---

## Vector masters (SVG)

| File | Purpose | Colour |
| --- | --- | --- |
| `ye-runner-mark.svg` | Primary mark | Silver + gold on transparent |
| `ye-runner-mark-on-light.svg` | Mark for light surfaces | Graphite + gold on transparent |
| `ye-runner-mark-black.svg` | Black-only | `#080808` |
| `ye-runner-mark-white.svg` | White-only | `#FFFFFF` |
| `ye-runner-mark-gold.svg` | Gold-only | `#D6A73B` |
| `ye-runner-mark-silver.svg` | Silver-only | `#C5C8CE` |
| `ye-runner-mark-dark-bg.svg` | Pre-composed on dark | Silver + gold on `#080808` |
| `ye-runner-mark-light-bg.svg` | Pre-composed on light | Graphite + gold on `#FFFFFF` |
| `ye-runner-lockup.svg` | Full stacked logo | Silver + gold |
| `ye-runner-lockup-black.svg` | Full logo, black | `#080808` |
| `ye-runner-lockup-white.svg` | Full logo, white | `#FFFFFF` |
| `ye-runner-lockup-gold.svg` | Full logo, gold | `#D6A73B` |
| `ye-runner-lockup-dark-bg.svg` | Full logo on dark | Silver + gold on `#080808` |
| `ye-runner-lockup-light-bg.svg` | Full logo on light | Graphite + gold on `#FFFFFF` |
| `ye-runner-social.svg` | Social avatar (square) | Silver + gold on `#080808` |
| `favicon.svg` | Favicon master | Silver + gold on rounded black |
| `ye-runner-watermark.svg` | Watermark | White, single colour |
| `ye-runner-apparel.svg` | Apparel / embroidery | Gold, single colour |

## Raster exports (PNG)

| File | Size | Use |
| --- | --- | --- |
| `ye-runner-mark-2400.png` | 2400w | Print, large format |
| `ye-runner-mark-1200.png` | 1200w | Web, documents |
| `ye-runner-mark-black-1200.png` | 1200w | Light backgrounds |
| `ye-runner-mark-white-1200.png` | 1200w | Dark backgrounds |
| `ye-runner-mark-on-light-1200.png` | 1200w | Light surfaces |
| `ye-runner-mark-dark-bg-1024.png` | 1024² | Dark tile |
| `ye-runner-mark-light-bg-1024.png` | 1024² | Light tile |
| `ye-runner-lockup-2400.png` | 2400w | Documents, email, print |
| `ye-runner-lockup-dark-bg-1600.png` | 1600w | Dark backgrounds |
| `ye-runner-social-1024.png` | 1024² | Social profiles |

## Favicon and app icons

| File | Size | Use |
| --- | --- | --- |
| `favicon.svg` | vector | Modern browsers |
| `favicon.ico` | 16 / 32 / 48 | Legacy browsers, Windows |
| `favicon-32.png` | 32² | Browser tab |
| `favicon-48.png` | 48² | Windows taskbar |
| `favicon-64.png` | 64² | Browser tab (HiDPI) |
| `favicon-180.png` | 180² | Apple touch (legacy) |
| `apple-touch-icon.png` | 180² | iOS home screen |
| `favicon-192.png` | 192² | Android home screen |
| `favicon-256.png` | 256² | PWA |
| `favicon-512.png` | 512² | PWA splash / maskable |

## Social and Open Graph

| File | Size | Use |
| --- | --- | --- |
| `og-image.png` | 1200×630 | Open Graph / Twitter card |
| `ye-runner-social-1024.png` | 1024² | Profile avatar |

The client kit also supplies ready-made social banners under
`YESP_Approved_Brand_Kit/social/` (YouTube banner, Facebook cover, story background).
Those are client-supplied raster exports and are **not** copied into `public/` until
the client confirms ownership and licensing.

---

## Where the mark is used in the site

| Surface | Implementation |
| --- | --- |
| Navigation and footer | `components/Logo.tsx` → `<Monogram>` renders `/brand/ye-runner-mark.svg` |
| Browser favicon | `app/layout.tsx` icons → `/brand/favicon.svg`, `/brand/favicon-32.png` |
| Apple / app icon | `/brand/apple-touch-icon.png`, `/brand/favicon-192.png` |
| Open Graph | `/brand/og-image.png` (built from the traced full lockup) |
| Registration and waivers | Same `Logo` component in the header; mark appears on every route |
| Social profiles | `/brand/ye-runner-social-1024.png` |

## Retired assets

The previous plain-YE files (`ye-logo-*.svg`, `ye-monogram*.svg`, `ye-social-icon.svg`,
`ye-nav-logo.svg`, `ye-watermark.svg`, `ye-apparel.svg`, `brand-sheet.*`) have been
**deleted** so they cannot be used by mistake.

## Regenerating

```bash
python3 scripts/trace-brand.py        # trace approved raster → vector masters
python3 scripts/build-runner-brand.py # derive all colour/background variants
node scripts/export-brand.mjs         # PNG, favicon.ico, apple-touch-icon, OG image
```
