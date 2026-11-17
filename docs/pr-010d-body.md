# YESP — Task 010D: Homepage Coach Young Photography Integration

Approved visual update. Two owner-supplied photographs integrated into the
**existing** homepage. No redesign, no new sections, no AI-generated
substitutes, no retouching.

Base: `integration/yesp-production-sync` @ `ce914d3`
Head: `feature/task-010d-homepage-coach-photos` @ `a5db3fd`

---

## 1. Football uniform portrait

Replaces the homepage Coach Young profile portrait — the same frame at
`app/page.tsx`, in the coach/technology split.

| Check | Result |
| --- | --- |
| Source | `Young in football pads.png`, 994 × 1024, RGBA (alpha all 255) |
| Original preserved | `assets/photos/originals/coach-young-football.png` (382,497 B) |
| Background | pure `#000000`, zero noise — retained, matches the ink palette |
| Crop | horizontal only, centred on the figure, to the site's 4/5 ratio → 819 × 1024 |
| Head visible | yes — head top y=277, frame top y=0 |
| Jersey number visible | yes — jersey bottom y=895, frame bottom y=1024 |
| Content bbox after crop | x 241–579, y 277–895 (all inside 819 × 1024) |
| Rendered aspect | 0.799 vs frame 0.800 — no stretching |
| Frame size | 232 × 290 @1536, 182 × 228 @834, 150 × 188 @390 — unchanged box |
| About page | **not touched** — still `coachPortrait` / `coach-young-portrait.jpg` |

`coachPortrait` is deliberately left in place so the About page, coach card and
programme intro cannot change.

## 2. Arms-crossed cutout

Added to the **existing** `WhySection` — "Coaching that holds a standard." No
duplicate section was created.

| Check | Result |
| --- | --- |
| Source | `Coach Young with transparent background.png`, 994 × 1024 |
| Reality check | filename said transparent; the file was **fully opaque pure black** (alpha min/max 255/255, 0 transparent px) |
| Original preserved | `assets/photos/originals/coach-young-standard.png` (291,356 B) |
| Matte method | deterministic flood fill from the border at ≤ 12/255 luminance; interior holes filled; 2 px antialias band given a soft alpha ramp from local foreground luminance; band un-premultiplied |
| Threshold safety | T=12 chosen because T=16 starts eating the hair (bbox top 142 → 176, 2,968 stray px) |
| Alpha result | 36.92 % transparent, 2.35 % partial, 60.73 % opaque |
| Halo test | 0 clipped band pixels; ring outside the silhouette composites to the exact background colour on both #808080 and #C8C8C8 |
| Trim | to visible artwork + 2 px → 266 × 758 (no empty black space) |
| Preserved | face, hair edges, clothing folds, tattoos, body proportions — untouched |
| Added effects | none — no shadow, halo or outline |
| Desktop placement | right of the copy, bottom-aligned to the section (bottomGap = section padding) |
| Mobile placement | stacked beneath the copy |
| Rendered aspect | 0.3509 vs source 0.3509 — no distortion |
| Black-box check | corners of the image box match section bg `(18,17,16)`; **0.00 %** pure-black pixels inside the box |

### Required fix: `unoptimized`

The Next.js image optimizer re-encodes this source to **JPEG**, which flattens
the alpha channel into an opaque black rectangle (verified: optimized response
was `JPEG RGB`, alpha 0 % transparent). The cutout is therefore rendered with
`unoptimized` so the 28 KB WebP is served directly with its alpha intact.

## 3. Assets

| File | Size | Bytes |
| --- | --- | --- |
| `public/media/coach/coach-young-football.jpg` | 819 × 1024 | 44,880 |
| `public/media/coach/coach-young-football-md.jpg` | 600 × 750 | 28,525 |
| `public/media/coach/coach-young-football-sm.jpg` | 300 × 375 | 10,173 |
| `public/media/coach/coach-young-standard.png` (RGBA master) | 266 × 758 | 198,463 |
| `public/media/coach/coach-young-standard.webp` (served) | 266 × 758 | 28,248 |
| `assets/photos/originals/coach-young-football.png` (original) | 994 × 1024 | 382,497 |
| `assets/photos/originals/coach-young-standard.png` (original) | 994 × 1024 | 291,356 |

## 4. QA

| Check | Result |
| --- | --- |
| `tsc --noEmit` | clean |
| `next lint` | No ESLint warnings or errors |
| `vitest run` | 69 / 69 passed (4 files) |
| `next build` | succeeded, 46 static pages |
| Link crawl | 30 pages, 0 non-200 |
| axe WCAG 2.1 AA | 0 violations — `/` and `/about` × 1536 / 834 / 390 |
| Horizontal overflow | 0 px at 1536, 834, 390 |
| Registration harness | 26 / 26 assertions |
| Existing sections | all present, unchanged |
| About Us photograph | unchanged |

Page heights: 1536 → 9,403 px · 834 → 12,006 px · 390 → 15,929 px.
`#why` height: 737 px @1536 (unchanged from baseline) — the figure fits inside
the existing section height on desktop.

## 5. Resend / contact forms

The supplied API key was validated with a read-only call (`GET /domains` →
HTTP 200) and written to `.env.local` only (gitignored, mode 600, **not**
committed).

**Blocker:** the `youngelevatedsports.com` domain is registered in Resend but
its status is `not_started` — no DNS records published. Until these are added,
every send fails and the routes return their controlled error:

| Type | Name | Value |
| --- | --- | --- |
| TXT | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDWw+JvCMShfWLudZT6C2…` |
| CNAME | `rsend` | `rsend.forge.rmta.net` |
| CNAME | `send` | `send.forge.rmta.net` |

`INQUIRY_TO_EMAIL` is intentionally blank: no business inbox address exists
anywhere in the repository, and inventing one would silently black-hole
enquiries. The PM/owner must supply it.

## 6. Not done (awaiting approval)

- Not merged.
- Not deployed to production.
- No branches deleted.
- No DNS changes.

`lib/email.ts` already gates sending on `emailConfigured()`; no code change was
required to wire the key.
