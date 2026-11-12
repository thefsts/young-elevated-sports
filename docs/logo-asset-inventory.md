# Logo Asset Inventory

Location: `public/brand/`. All SVGs are true vector — wordmark text is converted to outlines with `opentype.js`; no raster is embedded in any SVG. PNGs are transparent exports rasterized with `sharp`.

## SVG variants (16)

| File | Variant | Notes |
| --- | --- | --- |
| `ye-monogram.svg` | Monogram only | Gold on transparent |
| `ye-monogram-white.svg` | Monogram only | White |
| `ye-monogram-black.svg` | Monogram only | Black |
| `ye-logo-primary.svg` | Primary full-color | Monogram + stacked wordmark |
| `ye-logo-horizontal.svg` | Horizontal lockup | Monogram left, wordmark right |
| `ye-logo-stacked.svg` | Vertical / stacked | Monogram above wordmark |
| `ye-logo-gold.svg` | Gold-only | Single-color gold |
| `ye-logo-white.svg` | White-only | For dark backgrounds |
| `ye-logo-black.svg` | Black-only | For light backgrounds |
| `ye-logo-dark-bg.svg` | Dark-background lockup | Pre-composed on #080808 |
| `ye-logo-light-bg.svg` | Light-background lockup | Pre-composed on #FFFFFF |
| `ye-nav-logo.svg` | Navigation logo | Compact horizontal |
| `ye-watermark.svg` | Watermark | Low-opacity mark for imagery |
| `ye-apparel.svg` | Apparel / embroidery | Simplified single-color mark |
| `ye-social-icon.svg` | Social profile icon | Square, safe-area padded |
| `favicon.svg` | Favicon | Scalable browser icon |

## PNG exports (10)

| File | Size | Purpose |
| --- | --- | --- |
| `ye-monogram-1024.png` | 1024² | App / avatar |
| `ye-logo-horizontal-2400.png` | 2400w | Documents, email |
| `ye-logo-stacked-1600.png` | 1600w | Print, signage |
| `ye-logo-white-2400.png` | 2400w | Dark backgrounds |
| `ye-logo-black-2400.png` | 2400w | Light backgrounds |
| `ye-social-icon-1024.png` | 1024² | Social profile |
| `ye-apparel-1200.png` | 1200w | Apparel proof |
| `favicon-512.png` | 512² | PWA / high-DPI |
| `favicon-192.png` | 192² | Android |
| `favicon-32.png` | 32² | Browser tab |

## Additional

| File | Purpose |
| --- | --- |
| `brand-sheet.svg` | Visual reference sheet of all variants |
| `brand-sheet.png` | Raster reference sheet |
| `og-image.png` | 1200×630 Open Graph / social share image |

## Regeneration

```bash
node scripts/build-brand.mjs
```

Requires the TTF masters in `.fonts/` and `opentype.js` + `sharp`.

## Required-variant coverage

All 14 required variants from the directive are covered: primary full-color, horizontal lockup, vertical/stacked, monogram only, black-only, white-only, gold-only, dark-bg, light-bg, social profile icon, favicon, apparel/embroidery, watermark, and nav logo.
