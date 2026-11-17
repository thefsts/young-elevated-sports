# Photo replacement inventory

**Purpose:** every placeholder photograph currently on the site, where it appears,
and exactly what is needed to replace it with approved YESP photography.

**Status:** all thirteen images below are AI-generated, brand-directed
placeholders. None depicts a real YESP athlete, coach, client, or facility. The
registry in `lib/content/media.ts` is the single source of truth; components
never hard-code an image path.

---

## 1. Replacement table

| # | Registry key | Files | Appears on | Subject to replace with | Priority |
| --- | --- | --- | --- | --- | --- |
| 1 | `sprinting` | `sprinting.jpg` / `-md` / `-sm` | Home hero, home final CTA background, home programs card 01, classes index, class detail (speed & agility) | Sprint mechanics from a block or first step, indoor or track | **P0** — hero |
| 2 | `strength` | `strength.jpg` / `-md` / `-sm` | Home programs card 04, training page hero, class detail (strength & conditioning) | Loaded barbell or trap-bar lift with a coach present | **P0** |
| 3 | `agility-footwork` | `agility-footwork.jpg` / `-md` / `-sm` | Home programs card 03, class detail (multi-directional) | Cone / ladder / change-of-direction drill | P1 |
| 4 | `vertical-jump` | `vertical-jump.jpg` / `-md` / `-sm` | Home programs card 02, class detail (explosive force) | Jump test or jump landing with measurement visible | P1 |
| 5 | `coach-instruction` | `coach-instruction.jpg` / `-md` / `-sm` | Home gallery tile 05 | Coach cueing an athlete one-to-one | **P0** — trust |
| 6 | `facility` | `facility.jpg` / `-md` / `-sm` | Home gallery tile 06 | Wide interior of the actual training space | **P0** — trust |
| 7 | `group-sessions` | `group-sessions.jpg` / `-md` / `-sm` | Home reviews panel, classes index hero | A real YESP small-group session | **P0** — reviews |
| 8 | `football` | `football.jpg` / `-md` / `-sm` | *Registered, not currently placed* | Football-specific movement | P2 |
| 9 | `basketball` | `basketball.jpg` / `-md` / `-sm` | *Registered, not currently placed* | Basketball first-step / court movement | P2 |
| 10 | `female-athletes` | `female-athletes.jpg` / `-md` / `-sm` | *Registered, not currently placed* | Female athlete sled or strength work | P1 |
| 11 | `youth-development` | `youth-development.jpg` / `-md` / `-sm` | *Registered, not currently placed* | Age-appropriate youth session | P1 |
| 12 | `assessment-equipment` | `assessment-equipment.jpg` / `-md` / `-sm` | *Registered, not currently placed* | Force plates / timing gates / testing tablet | P1 |
| 13 | `dfw-skyline` | `public/media/dfw/dallas-skyline*.jpg` | Home Dallas–Fort Worth band | Already approved as an illustration; a licensed photograph is the fallback (`dfwSkylinePhoto`) | — |

Items 8–12 are in the registry and fully wired, but no current surface renders
them. They are ready for the Training, Classes, or Youth Development pages once
approved photographs exist.

The coach portrait (`coachPortrait`, `coachPortraitCutout`,
`coachPortraitBrand`) is **real client photography** already cleared for use and
is not a placeholder.

---

## 2. How to replace one image

```bash
node scripts/import-photo.mjs path/to/IMG_1234.jpg sprinting --focus=0.45,0.35
```

The script:

1. copies the original into `assets/photos/originals/<slug>.<ext>` — the source
   file is never modified or overwritten;
2. crops to 3:2 around the focal point you pass, so faces and equipment stay in
   frame instead of being centre-cropped blindly;
3. writes 1600 / 1200 / 800 px derivatives to `public/media/`;
4. applies **no colour tint** — only a mild exposure lift if the source mean
   luma is below 70, so skin tones stay natural and the image is not too dark;
5. strips metadata and encodes progressive mozjpeg at quality 84.

Then edit `lib/content/media.ts`:

```ts
sprinting: {
  category: "sprinting",
  src: "/media/sprinting.jpg",
  srcMedium: "/media/sprinting-md.jpg",
  srcSmall: "/media/sprinting-sm.jpg",
  alt: "Athlete driving out of a three-point start under the facility lights",
  caption: "Acceleration mechanics from the first step",
  width: 1600,
  height: 1067,
  placeholder: false,                       // <- was true
  credit: "Photograph supplied by YESP",    // <- real credit
},
```

No component needs to change. `alt` must describe the actual scene, not the
brand. `caption` is used in gallery tiles and class cards.

---

## 3. Authorization record

Every replacement must have a row here before it ships. Do not publish an
identifiable person's photograph next to a testimonial without written
permission covering both the image and the quote.

| Slug | Source file | Photographer / owner | Date received | Release on file | Minors? Guardian release | Approved by | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| _none yet_ | | | | | | | |

Rules applied to this build:

- No generated athlete is labelled as a YESP client, and no fake YE logo is
  composited onto a person or a facility.
- No stock or generated image is used as evidence of a training result.
- The placeholder credit string ("AI-generated placeholder — not a YESP athlete
  or client") renders in the gallery and the reviews panel, so the disclosure
  travels with the image rather than living only in this document.

---

## 4. Alt text and crop notes per slot

| Slot | Recommended crop | Focal point | Alt text guidance |
| --- | --- | --- | --- |
| Home hero | 3:2, subject right of centre | athlete's torso, ~0.55,0.45 | Name the action and setting, not the brand |
| Final CTA background | 3:2, low contrast area behind text | ~0.5,0.5 | Decorative; alt may be empty because copy carries meaning |
| Programs cards | 4:3 | athlete's centre of mass | One sentence: who is doing what, where |
| Gallery tiles | 4:3, first tile 16:9 | face or equipment | Describe the drill and the room |
| Reviews panel | 16:10 | group, ~0.5,0.45 | "Athletes training in a small group at the YESP facility" |
| Facility tile | 4:3 wide interior | ~0.5,0.5 | Describe turf, racks, lighting — no brand claims |
