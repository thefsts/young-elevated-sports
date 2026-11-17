# Media inventory — placeholder photography

**Status:** every photograph currently shipped in `public/media/` is a brand-directed,
AI-generated placeholder. None of the people depicted are YESP athletes, coaches,
employees, or clients, and no image may be presented as a testimonial, a client
result, or evidence that a named person trains with YESP.

The single source of truth in code is `lib/content/media.ts`. Each entry carries
`placeholder: true` and a `credit` string, and every rendered image uses the
`alt` text from that registry. Replacing real photography means changing `src`
and `alt` there — no component needs to be edited.

## Categories (13)

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
| Group sessions | `group-sessions` | Home reviews panel, classes hero, training | Small-group session |
| Indoor facility | `facility` | Home gallery (Task 009) | Turf lanes, racks, directional light |
| DFW skyline | `dfw-skyline` | Contact, footer band | Dallas–Fort Worth skyline |

Each category ships three derivatives: full (`*.jpg`, 1536×1024), medium
(`*-md.jpg`, 960 px wide), and small (`*-sm.jpg`, 480 px wide). The `facility`
category was added for the Task 009 homepage gallery and follows the same
three-derivative pattern (`facility.jpg`, `facility-md.jpg`, `facility-sm.jpg`). `hero-track`
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
| `coach-young-about.jpg` | 994 × 1242 | **Task 010B** About-page profile portrait (owner-supplied) |
| `coach-young-about-md.jpg` | 800 × 1000 | About portrait — tablet |
| `coach-young-about-sm.jpg` | 400 × 500 | About portrait — mobile |
| `coach-young-football.jpg` | 819 × 1024 | **Task 010D** homepage coach profile — Liberty Flames uniform, number 70 (owner-supplied) |
| `coach-young-football-md.jpg` | 600 × 750 | Tablet derivative |
| `coach-young-football-sm.jpg` | 300 × 375 | Mobile derivative |
| `coach-young-standard.png` | 266 × 758 | **Task 010D** arms-crossed cutout, RGBA master (owner-supplied, background removed) |
| `coach-young-standard.webp` | 266 × 758 | Arms-crossed cutout, alpha WebP served to the browser |

The crop is derived from the measured face box, not a guess: the face occupies
approximately 26% of frame height with a small headroom margin, which reads as a
standard head-and-shoulders portrait at every breakpoint.

## Where the cleared portrait appears

| Surface | Component | Asset |
| --- | --- | --- |
| Homepage coach introduction | `app/page.tsx` | `coach-young-football.jpg` **(Task 010D)** |
| Homepage "Coaching That Holds a Standard" cutout | `components/home/HomeSections.tsx` | `coach-young-standard.webp` **(Task 010D)** |
| About Coach Young profile | `app/about/page.tsx` | `coach-young-about.jpg` **(Task 010B)** |
| Training programme introduction | `app/training/page.tsx` | `coach-young-cutout.png` |
| Media gallery | `app/media/page.tsx` | `coach-young-portrait.jpg` |

### Task 010B — About-page portrait replacement

The About page no longer uses the shared `coachPortrait`. It uses the dedicated
`coachPortraitAbout` export, sourced from the owner-supplied
`Coach Young about us page.png` (994 × 1024 RGBA, 664,731 bytes).

| Property | Value |
| --- | --- |
| Original preserved | `assets/photos/originals/coach-young-about.png` (unmodified) |
| Preparation | 2px white artifact line at the top of the PNG removed; frame padded vertically to the site's 4/5 ratio with the photograph's own background colour `rgb(13,13,9)` |
| Cropping | **None** — nothing was cut from the frame |
| Retouching | **None** — no recolour, no sharpening, no skin/facial alteration |
| Preserved | Black background, white polo, facial features, glasses, existing YE watermark (bottom-right, x 880–959 / y 921–986 in the source) |
| Head visibility | Full head including hair; 228 px of headroom in the 1242 px frame |
| Derivatives | 994 × 1242 (45 KB), 800 × 1000 (33 KB), 400 × 500 (12 KB) — metadata stripped |
| Homepage | **Unchanged** — `coachPortrait` and `coach-young-portrait.jpg` still serve the homepage, coach card and program intro |

The previous About asset (`coach-young-portrait.jpg`) has **not** been deleted: it
remains the homepage portrait and stays in place until the new usage is verified
in production.

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

## Photo addendum — second batch (Checkpoint 003)

Four further client photographs arrived with the photo addendum. They were
analysed with the same gate used for the first batch: OpenCV YuNet face
detection at a 0.6 score threshold on the full-resolution original, plus an
EXIF inspection.

| Source | Dimensions | Faces detected | GPS in original | Status | Public path |
| --- | --- | --- | --- | --- | --- |
| `IMG_5608.jpeg` | 3024 × 4032 | 20 | Yes | `pending-release` | none |
| `IMG_1468.jpeg` | 4284 × 5712 | 5 | Yes | `pending-release` | none |
| `IMG_7389.jpeg` | 4284 × 5712 | 2 | No | `pending-release` | none |
| `IMG_0244.jpeg` | 4284 × 5712 | 30 | Yes | `pending-release` | none |

**Every one of the four is a multi-person frame.** The smallest contains two
people; the largest contains thirty. Directive E §10 requires publication
permission for other identifiable people, "particularly children", and requires
that uncleared images stay out of the public deployment. A camp-scale frame of
thirty athletes is overwhelmingly likely to include minors. Publishing any of
these four on the strength of "the client sent them" would be exactly the
failure mode the directive forbids, so **nothing from this batch was published**.

What was done instead:

- **Masters preserved.** Each original was re-encoded at quality 95 with 4:4:4
  chroma into `assets/coach/originals/`, which is outside `public/` and
  git-ignored by the `IMG_*.jpeg` pattern. The EXIF block — including GPS on
  three of the four — is gone; verification reports `exif: false`, `gps: false`
  and no orientation tag on all four masters.
- **Review copies produced.** `scripts/photo-addendum.mjs` writes a 1600 px
  derivative with a restrained exposure lift (`brightness 1.04`, `linear 1.03,
  −4`) into `review/coach-photos/review-IMG_*.jpg`. These are for the PM and the
  client to judge framing and quality, not for the website.
- **Queue extended.** All four appear in `coachPhotoQueue` with their measured
  face counts and no `src` property, so there is no code path that can render
  them.
- **Tests enforce the gate.** `tests/checkpoint-003.test.ts` asserts the queue
  holds eight frames and 82 identifiable faces in total, that every entry is
  `pending-release` with no public path, that each review copy exists outside
  `public/`, and that each master is present.

### Placement plan once releases arrive

The addendum asks for these photographs to be woven into Training, Classes,
Youth Development, Football Performance, About, and Media. The placement is
blocked on releases, not on design. When a release is recorded, the intended
surface for each frame is:

| Frame | Intended surface | Why |
| --- | --- | --- |
| `IMG_7389.jpeg` | Training — small-group coaching | Two people; reads as one-to-one coaching |
| `IMG_1468.jpeg` | Youth Development — small group | Five athletes; reads as a development cohort |
| `IMG_5608.jpeg` | Classes — session in progress | Twenty athletes; reads as a full class |
| `IMG_0244.jpeg` | Media gallery — camp scale | Thirty athletes; reads as programme reach |

Each would be exported at desktop (1600 px), tablet (1024 px) and mobile
(640 px) widths with a 3:2 landscape crop, a slight black-and-gold grade, and
alt text naming the setting rather than the individuals. No athlete result,
testimonial, scholarship, partnership or endorsement will be inferred from any
of them.

### Outstanding client actions (addendum)

1. Confirm whether any subject in `IMG_5608`, `IMG_1468`, `IMG_7389` or
   `IMG_0244` is a minor, and supply parent/guardian releases for those subjects.
2. Supply releases for every other identifiable adult in the four frames.
3. Confirm which of the four the client actually wants on the site; the review
   copies in `review/coach-photos/` are the shortlist.

### Task 010D — homepage Coach Young photography

Two owner-supplied frames were integrated into the existing homepage. Neither
was regenerated, substituted or retouched; the originals are preserved byte for
byte under `assets/photos/originals/`.

| Property | Football uniform portrait | Arms-crossed cutout |
| --- | --- | --- |
| Source file | `Young in football pads.png` | `Coach Young with transparent background.png` |
| Original preserved | `assets/photos/originals/coach-young-football.png` (382,497 B) | `assets/photos/originals/coach-young-standard.png` (291,356 B) |
| Supplied size | 994 × 1024, RGBA (alpha all 255) | 994 × 1024, RGBA (alpha all 255) |
| Supplied background | pure `#000000`, zero noise | pure `#000000`, zero noise — **not** transparent despite the filename |
| Preparation | horizontal crop to 4/5 (819 × 1024), centred on the figure | deterministic background removal, trimmed to artwork + 2 px |
| Cropping of subject | none — head top y=277, jersey bottom y=895 both inside | none — head top y=142, feet y=895 both inside |
| Retouching | none | none |
| Background method | retained (matches ink palette) | flood fill from border at ≤ 12/255 luminance, interior holes filled, 2 px antialias band given a soft alpha ramp from local foreground luminance, band un-premultiplied |
| Alpha result | n/a | 36.92 % transparent, 2.35 % partial, 60.73 % opaque |
| Halo check | n/a | 0 clipped band pixels; ring outside silhouette composites to exact background colour |
| Derivatives | 819×1024 (44,880 B), 600×750 (28,525 B), 300×375 (10,173 B) | PNG master (198,463 B), WebP (28,248 B) |
| Rendered aspect vs source | 0.799 vs 0.800 — no stretching | 0.3509 vs 0.3509 — no stretching |
| Placement | `app/page.tsx` coach profile frame (replaces `coachPortrait`) | `components/home/HomeSections.tsx` `WhySection` |
| About page | unchanged | unchanged |

Note: the cutout is rendered with `unoptimized` because the Next.js image
optimizer re-encodes it to JPEG and flattens the alpha channel into an opaque
black rectangle. The WebP is already 28 KB, so it is served directly.
