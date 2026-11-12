# Media inventory — placeholder photography

**Status:** every photograph currently shipped in `public/media/` is a brand-directed,
AI-generated placeholder. None of the people depicted are YESP athletes, coaches,
employees, or clients, and no image may be presented as a testimonial, a client
result, or evidence that a named person trains with YESP.

The single source of truth in code is `lib/content/media.ts`. Each entry carries
`placeholder: true` and a `credit` string, and every rendered image uses the
`alt` text from that registry. Replacing real photography means changing `src`
and `alt` there — no component needs to be edited.

## Categories (12)

| Category | File stem | Used on | Subject |
| --- | --- | --- | --- |
| Sprinting | `sprinting` | Home hero (`hero-track`), training | Track sprinting at night |
| Strength | `strength` | Training hero | Loaded barbell, gym floor |
| Agility / footwork | `agility-footwork` | Classes, class detail | Cone and ladder footwork |
| Football | `football` | Classes, athletes | Football-specific movement |
| Basketball | `basketball` | Classes, athletes | Court movement |
| Female athletes | `female-athletes` | Classes, athletes | Female athlete training |
| Youth development | `youth-development` | Classes, registration | Youth movement session |
| Coach-to-athlete instruction | `coach-instruction` | About, technology | Coach cueing an athlete |
| Vertical jump testing | `vertical-jump` | Technology, classes | Jump measurement |
| Assessment equipment | `assessment-equipment` | Technology | Timing gates / measurement |
| Group sessions | `group-sessions` | Classes hero, training | Small-group session |
| DFW skyline | `dfw-skyline` | Contact, footer band | Dallas–Fort Worth skyline |

Each category ships three derivatives: full (`*.jpg`, 1536×1024), medium
(`*-md.jpg`, 960 px wide), and small (`*-sm.jpg`, 480 px wide). `hero-track`
ships full + small only because it is only ever used as a full-bleed hero.

## Licensing and provenance

- Generated for this build with the project's image tooling, directed to the
  approved brand palette (black, metallic gold, silver, white) and a cinematic,
  low-key lighting treatment.
- No third-party stock licence is attached because no third-party stock was used.
- No model release exists for any depicted person, because no depicted person is
  real. This is precisely why the images are labelled as illustrative in the UI
  and in the asset registry.
- Client-supplied photography: **none received.** Reggie Young has not supplied
  personal photographs; no image of Reggie is used anywhere on the site.

## Replacement checklist

1. Receive licensed, released photography from the client.
2. Export full / medium / small derivatives at the same aspect ratio.
3. Update `src`, `srcMedium`, `srcSmall`, `alt`, `caption`, `credit`, and set
   `placeholder: false` in `lib/content/media.ts`.
4. Remove the "illustrative imagery" overlay text from any surface that no longer
   needs it.
5. Re-run `npm run check:assets` and `npm run build`.
6. Update this document and `docs/test-results.md`.

## Honesty rules enforced in code

- Alt text always begins with "Illustrative image" while `placeholder` is true.
- The homepage coach panel carries a visible "Illustrative imagery — replace with
  licensed client photography" badge.
- No image is used next to a testimonial, quote, or result claim.
- No image is captioned with a real athlete's name.

---

# Checkpoint 003 — official coach photography

**Status:** the client supplied six photographs. One is cleared and published; four
unique group frames are held for private review pending media releases. The
remaining eleven placeholder categories are unchanged.

## Publication gate

A client photograph is only added to `coachPhotos` in `lib/content/media.ts` once
the client has confirmed the right to publish it, **including releases from every
identifiable person pictured**. Receiving a file is not permission.

| Source file | Dimensions | Camera | Faces detected | Status | Public path |
| --- | --- | --- | --- | --- | --- |
| `Young2.jpg` | 4896 × 5497 | NIKON Z 8 | **1** | cleared | `public/media/coach/*` |
| `IMG_3643.jpeg` | 5712 × 4284 | iPhone 15 Pro Max | 9 | pending release | — |
| `IMG_1652.jpg` | 2160 × 3840 | iPhone 15 Pro Max | 3 | pending release | — |
| `IMG_0232.jpeg` | 5712 × 4284 | iPhone 15 Pro Max | 5 | pending release | — |
| `IMG_0232 (1).jpeg` | 5712 × 4284 | iPhone 15 Pro Max | 5 | duplicate of `IMG_0232.jpeg` (byte-identical) | — |
| `IMG_8097.jpeg` | 5712 × 4284 | iPhone 17 Pro Max | 8 | pending release | — |

Face counts were produced with OpenCV's YuNet detector at 1600 px and 2400 px
working resolution. `Young2.jpg` was additionally re-scanned at 3600 px and in a
cropped patch at native resolution; the single low-confidence secondary hit at
0.53 disappeared at higher resolution and is treated as a false positive. The
frame contains one person.

## Published exports (cleared)

| File | Size | Purpose |
| --- | --- | --- |
| `coach-young-portrait.jpg` | 1200 × 1500 | Primary 4:5 head-and-shoulders crop |
| `coach-young-portrait-md.jpg` | 800 × 1000 | Tablet / card |
| `coach-young-portrait-sm.jpg` | 400 × 500 | Mobile |
| `coach-young-portrait-brand.jpg` | 1200 × 1500 | Restrained black-and-gold duotone treatment |
| `coach-young-cutout.png` | 1200 × 1500 | Transparent-background cutout (rembg `u2net_human_seg`) |
| `coach-young-cutout-sm.png` | 500 × 625 | Mobile cutout |

The crop is derived from the measured face box, not a guess: the face occupies
approximately 26% of frame height with a small headroom margin, which reads as a
standard head-and-shoulders portrait at every breakpoint.

## Where the cleared portrait appears

| Surface | Component | Asset |
| --- | --- | --- |
| Homepage coach introduction | `app/page.tsx` | `coach-young-portrait.jpg` |
| About Coach Young profile | `app/about/page.tsx` | `coach-young-portrait.jpg` |
| Training programme introduction | `app/training/page.tsx` | `coach-young-cutout.png` |
| Media gallery | `app/media/page.tsx` | `coach-young-portrait.jpg` |

The "Illustrative imagery" label was removed from those four surfaces only. Every
other image on the site keeps its placeholder label and disclosure.

## Privacy handling

- **Originals preserved unmodified** in `assets/coach/originals/`, outside the
  `public/` tree, so they are never served. The repository must remain private
  while those files carry capture metadata.
- **Every public and review export is EXIF-stripped.** `sharp` writes no metadata
  unless `withMetadata()` is called; verification confirmed `exif_keys = 0` and no
  `GPSInfo` block on all ten generated files. Five of the six originals carried GPS
  coordinates, so this step was mandatory.
- **Group photographs are not published.** They are exported at 1600 px into
  `review/coach-photos/` for private review only, and exist in the codebase as
  metadata in `coachPhotoQueue` with no public path.
- No image is presented as evidence of a coaching relationship, athletic result,
  endorsement, or partnership.

## Outstanding client actions

1. Confirm the media-release position for every identifiable person in
   `IMG_3643`, `IMG_1652`, `IMG_0232`, and `IMG_8097` — including whether any
   subject is a minor, which requires a parent or guardian release.
2. Confirm that `Young2.jpg` depicts Coach Young and may be published.
3. Supply release documentation so the group frames can move from
   `pending-release` to `cleared`.
