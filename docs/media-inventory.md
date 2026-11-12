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
