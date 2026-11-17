/**
 * Photography registry.
 *
 * Every image in this file is an AI-generated, brand-directed placeholder
 * commissioned for this build. None of the people depicted are YESP athletes,
 * coaches, employees, or clients, and no image should be presented as a
 * testimonial or as evidence of a real training result.
 *
 * Licensing and provenance are recorded in docs/media-inventory.md. When the
 * client supplies real photography, replace the `src` and `alt` values here and
 * retire the placeholder — nothing else in the codebase needs to change.
 */

export type MediaCategory =
  | "sprinting"
  | "strength"
  | "agility-footwork"
  | "football"
  | "basketball"
  | "female-athletes"
  | "youth-development"
  | "coach-instruction"
  | "vertical-jump"
  | "assessment-equipment"
  | "group-sessions"
  | "facility"
  | "dfw-skyline";

export type MediaAsset = {
  category: MediaCategory;
  src: string;
  srcMedium: string;
  srcSmall: string;
  alt: string;
  /** Short caption used in the gallery and class cards. */
  caption: string;
  width: number;
  height: number;
  /** True while the image is a brand-directed placeholder. */
  placeholder: boolean;
  credit: string;
};

const CREDIT = "AI-generated placeholder — not a YESP athlete or client";

function asset(category: MediaCategory, alt: string, caption: string): MediaAsset {
  return {
    category,
    src: `/media/${category}.jpg`,
    srcMedium: `/media/${category}-md.jpg`,
    srcSmall: `/media/${category}-sm.jpg`,
    alt,
    caption,
    width: 1536,
    height: 1024,
    placeholder: true,
    credit: CREDIT,
  };
}

export const media: Record<MediaCategory, MediaAsset> = {
  sprinting: asset(
    "sprinting",
    "Athlete exploding out of a starting block on an indoor track under warm gold light",
    "Acceleration mechanics from the first step",
  ),
  strength: asset(
    "strength",
    "Athlete mid-lift with a loaded trap bar in a dark performance gym",
    "Loaded strength work with technical intent",
  ),
  "agility-footwork": asset(
    "agility-footwork",
    "Athlete moving low through a cone and ladder footwork drill on dark turf",
    "Change-of-direction and footwork",
  ),
  football: asset(
    "football",
    "Football athlete cutting sharply on indoor turf with turf particles kicked up",
    "Football-specific movement quality",
  ),
  basketball: asset(
    "basketball",
    "Basketball athlete driving toward the rim in a dim gym with gold reflections",
    "First-step quickness and control",
  ),
  "female-athletes": asset(
    "female-athletes",
    "Female athlete driving a weighted sled across dark turf under gold rim light",
    "Sled work and posterior-chain power",
  ),
  "youth-development": asset(
    "youth-development",
    "Two young athletes performing a hurdle drill on dark turf with a coach in the background",
    "Age-appropriate athletic development",
  ),
  "coach-instruction": asset(
    "coach-instruction",
    "Coach kneeling beside an athlete giving hands-on technical instruction",
    "Direct coach-to-athlete instruction",
  ),
  "vertical-jump": asset(
    "vertical-jump",
    "Athlete at the peak of a vertical jump test with measuring vanes below",
    "Vertical jump testing and measurement",
  ),
  "assessment-equipment": asset(
    "assessment-equipment",
    "Force plates, timing gates, and a tablet with a gold data graph in a dark lab",
    "Assessment equipment and performance data",
  ),
  "group-sessions": asset(
    "group-sessions",
    "Small group of athletes performing a synchronized sprint-start drill on dark turf",
    "Small-group training sessions",
  ),
  facility: asset(
    "facility",
    "Indoor athletic training facility with turf lanes, strength racks and warm directional lighting",
    "Indoor training facility",
  ),
  "dfw-skyline": asset(
    "dfw-skyline",
    "Dallas–Fort Worth skyline at blue hour with warm gold city lights",
    "Dallas–Fort Worth, Texas",
  ),
};

export const mediaList: MediaAsset[] = Object.values(media);

/* ------------------------------------------------------------------------- *
 * Licensed location photography
 * ------------------------------------------------------------------------- */

export type LicensedAsset = {
  src: string;
  srcMedium: string;
  srcSmall: string;
  alt: string;
  width: number;
  height: number;
  /** False for real, licensed photography. */
  placeholder: boolean;
  credit: string;
  licence: string;
  source: string;
};

/**
 * Downtown Dallas skyline including Reunion Tower — PRIMARY banner asset.
 *
 * IMPORTANT PROVENANCE: this is an AI-GENERATED illustration, not a photograph.
 * It was selected as the PM-approved "Variant A — golden hour duotone" candidate
 * because it places the skyline inside the left 60% of the banner, which the
 * angled gold panel requires, and because it holds the warm amber/bronze grade
 * the client approved.
 *
 * It must never be captioned or credited as a photograph of Dallas. Reunion
 * Tower is rendered as a stylised sphere-on-tripod rather than a faithful
 * reproduction of the real geodesic lattice. `dfwSkylinePhoto` below is the
 * verifiably accurate licensed alternative.
 */
export const dfwSkyline: LicensedAsset = {
  src: "/media/dfw/dallas-skyline.jpg",
  srcMedium: "/media/dfw/dallas-skyline-md.jpg",
  srcSmall: "/media/dfw/dallas-skyline-sm.jpg",
  alt: "Golden-hour illustration of the downtown Dallas skyline with Reunion Tower.",
  width: 1920,
  height: 802,
  placeholder: false,
  credit: "AI-generated illustration produced in-house for YESP — not a photograph",
  licence: "AI-generated — no third-party licence required",
  source: "Generated in-house (Variant A, golden-hour duotone)",
};

/**
 * Verifiably accurate licensed photograph of the Dallas CBD at dusk.
 *
 * Kept on disk as the fallback required by the directive's accuracy clause: if
 * the generated banner is rejected on landmark fidelity, swap `dfwSkyline` to
 * this entry. Attribution must travel with the image (CC BY-SA 4.0).
 */
export const dfwSkylinePhoto: LicensedAsset = {
  src: "/media/dfw/dallas-skyline-photo.jpg",
  srcMedium: "/media/dfw/dallas-skyline-photo-md.jpg",
  srcSmall: "/media/dfw/dallas-skyline-photo-sm.jpg",
  alt: "Photograph of the downtown Dallas skyline at dusk, including Reunion Tower.",
  width: 1920,
  height: 802,
  placeholder: false,
  credit: "Photo: Matthew T Rader, CC BY-SA 4.0, via Wikimedia Commons",
  licence: "CC BY-SA 4.0",
  source: "https://commons.wikimedia.org/wiki/File:Dallas_Skyline_at_Dusk.jpg",
};

/* ------------------------------------------------------------------------- *
 * Homepage hero
 * ------------------------------------------------------------------------- */

/**
 * Homepage hero: a sprinter driving toward the camera inside a training
 * facility, with the approved YE runner mark composited onto the facility wall
 * as an illuminated sign.
 *
 * PROVENANCE: the underlying photograph is an AI-generated, brand-directed
 * placeholder \u2014 the person shown is not a YESP athlete. The wall sign is the
 * real client-approved vector master (`/brand/ye-runner-mark-gold.svg`),
 * rasterised and screened onto the wall, not a generated approximation of the
 * logo. Replace `src`/`srcMedium`/`srcSmall` with real photography when the
 * client supplies it.
 */
export const heroAthlete: LicensedAsset = {
  src: "/media/hero-athlete.jpg",
  srcMedium: "/media/hero-athlete-md.jpg",
  srcSmall: "/media/hero-athlete-sm.jpg",
  alt: "Athlete sprinting toward the camera inside a training facility, with the illuminated Young & Elevated runner mark on the wall behind him.",
  width: 1536,
  height: 1024,
  placeholder: true,
  credit: "AI-generated placeholder \u2014 not a YESP athlete. Wall mark: client-approved YE runner logo.",
  licence: "AI-generated \u2014 no third-party licence required",
  source: "Generated in-house for YESP; approved logo composited onto the facility wall",
};

/** Placeholder disclosure used wherever imagery is shown to the client. */
export const MEDIA_DISCLOSURE =
  "Photography on this preview is brand-directed placeholder imagery. The people shown are not YESP athletes, coaches, employees, or clients.";

/* ------------------------------------------------------------------------- *
 * Real client photography (Checkpoint 003)
 *
 * These entries are genuine photographs supplied by the client. They are the
 * only assets in this file with `placeholder: false`. Every export is
 * EXIF-stripped, so no capture device, timestamp, or GPS location is published.
 *
 * Clearance status is tracked per photograph. A photograph may only be listed
 * in `coachPhotos` once the client has confirmed the right to publish it,
 * including releases from every identifiable person pictured.
 * ------------------------------------------------------------------------- */

export type PublicationStatus =
  /** Client supplied it and cleared it for public use. */
  | "cleared"
  /** Client supplied it; releases from people pictured still outstanding. */
  | "pending-release"
  /** Held privately for review only. */
  | "private-review";

export type CoachPhoto = {
  id: string;
  /** Public path. Only present for `cleared` assets. */
  src: string;
  srcMedium: string;
  srcSmall: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  placeholder: false;
  credit: string;
  status: PublicationStatus;
  /** Surfaces this photograph is approved to appear on. */
  usage: string[];
};

const COACH_CREDIT = "Photograph supplied by Young & Elevated Sports Performance";

/**
 * Primary coach portrait. `Young2.jpg` is a single-subject frame — an
 * automated face scan (OpenCV YuNet) found exactly one face, so no third-party
 * release is required. Client designated this frame as the primary profile.
 */
export const coachPortrait: CoachPhoto = {
  id: "coach-young-portrait",
  src: "/media/coach/coach-young-portrait.jpg",
  srcMedium: "/media/coach/coach-young-portrait-md.jpg",
  srcSmall: "/media/coach/coach-young-portrait-sm.jpg",
  alt: "Coach Young of Young & Elevated Sports Performance, portrait against a dark background",
  caption: "Coach Young",
  width: 1200,
  height: 1500,
  placeholder: false,
  credit: COACH_CREDIT,
  status: "cleared",
  usage: ["about", "home", "coach-card", "program-intro"],
};

/**
 * About-page profile portrait (Task 010B).
 *
 * Owner-supplied frame `Coach Young about us page.png`, approved for the About
 * page only. The original is preserved at
 * `assets/photos/originals/coach-young-about.png` and is never modified.
 *
 * Preparation: the 2px white artifact line at the top of the supplied PNG was
 * removed and the frame was padded vertically to the site's 4/5 portrait ratio
 * using the photograph's own background colour. Nothing was cropped, retouched,
 * recoloured or sharpened: the black background, white polo, facial features,
 * glasses and the existing YE watermark (bottom-right) are all intact, and the
 * full head including hair remains visible.
 *
 * Deliberately separate from `coachPortrait`, which the homepage and coach card
 * still use, so replacing the About photograph cannot change the homepage.
 */
export const coachPortraitAbout: CoachPhoto = {
  id: "coach-young-about",
  src: "/media/coach/coach-young-about.jpg",
  srcMedium: "/media/coach/coach-young-about-md.jpg",
  srcSmall: "/media/coach/coach-young-about-sm.jpg",
  alt: "Coach Reggie Young of Young & Elevated Sports Performance, wearing a white polo and glasses against a black background",
  caption: "Coach Young",
  width: 994,
  height: 1242,
  placeholder: false,
  credit: COACH_CREDIT,
  status: "cleared",
  usage: ["about"],
};

/** Transparent-background cutout of the primary portrait, for layered layouts. */
export const coachPortraitCutout = {
  src: "/media/coach/coach-young-cutout.png",
  srcSmall: "/media/coach/coach-young-cutout-sm.png",
  alt: "Coach Young, cut out against a transparent background",
  width: 1200,
  height: 1500,
  placeholder: false as const,
  credit: COACH_CREDIT,
  status: "cleared" as PublicationStatus,
};

/** Restrained black-and-gold branded treatment of the primary portrait. */
export const coachPortraitBrand = {
  src: "/media/coach/coach-young-portrait-brand.jpg",
  alt: "Coach Young in a black-and-gold branded portrait treatment",
  width: 1200,
  height: 1500,
  placeholder: false as const,
  credit: COACH_CREDIT,
  status: "cleared" as PublicationStatus,
};

/**
 * Homepage coach profile portrait (Task 010D, section 1).
 *
 * Owner-supplied frame `Young in football pads.png` — Coach Young in the
 * Liberty Flames football uniform, number 70. The unmodified original is kept at
 * `assets/photos/originals/coach-young-football.png`.
 *
 * Preparation: the source is 994 x 1024 with a pure black (#000000)
 * background, which matches the site's ink palette, so the background was left
 * untouched. The frame was cropped horizontally — centred on the figure — to
 * the site's 4/5 portrait ratio (819 x 1024) so that `object-cover` crops
 * nothing at render time. Nothing was retouched, recoloured or sharpened, and
 * no part of the head, shoulders or jersey number was cropped.
 *
 * Deliberately separate from `coachPortrait`, which the About page, coach card
 * and program intro still use, so the About Us photograph cannot change.
 */
export const coachPortraitFootball: CoachPhoto = {
  id: "coach-young-football",
  src: "/media/coach/coach-young-football.jpg",
  srcMedium: "/media/coach/coach-young-football-md.jpg",
  srcSmall: "/media/coach/coach-young-football-sm.jpg",
  alt: "Coach Reggie Young in a Liberty Flames football uniform, number 70, photographed against a black background",
  caption: "Coach Young",
  width: 819,
  height: 1024,
  placeholder: false,
  credit: COACH_CREDIT,
  status: "cleared",
  usage: ["home"],
};

/**
 * Arms-crossed standing cutout (Task 010D, section 2).
 *
 * Owner-supplied frame `Coach Young with transparent background.png`. Despite
 * the filename the supplied file had a fully opaque pure-black background, so
 * the background was removed here. The unmodified original is kept at
 * `assets/photos/originals/coach-young-standard.png`.
 *
 * Matte method: deterministic flood fill from the frame border over pixels at
 * or below 12/255 luminance (the background is exactly #000000 with zero
 * noise), keeping the figure and filling interior holes. The 2 px antialias
 * band gets a soft alpha ramp derived from the local foreground luminance, and
 * those edge pixels are un-premultiplied so they keep their true colour. Hair,
 * facial features, clothing folds and tattoos are all preserved — no AI
 * cutout, no retouching, no added shadow or outline. The result is trimmed to
 * the visible artwork with a 2 px margin so no empty black space ships.
 */
export const coachCutoutStandard = {
  id: "coach-young-standard",
  src: "/media/coach/coach-young-standard.webp",
  alt: "Coach Reggie Young standing with arms crossed, cut out against a transparent background",
  caption: "Coach Young",
  width: 266,
  height: 758,
  placeholder: false as const,
  credit: COACH_CREDIT,
  status: "cleared" as PublicationStatus,
  usage: ["home"],
};

/** Cleared photographs that may be rendered on the public site. */
export const coachPhotos: CoachPhoto[] = [coachPortrait];

/**
 * Photographs received but NOT yet publishable. Metadata only — no public path
 * is exposed, so these cannot be rendered by accident. They live in
 * `review/coach-photos/` for private review.
 */
export const coachPhotoQueue: Array<{
  source: string;
  identifiableFaces: number;
  status: PublicationStatus;
  note: string;
}> = [
  {
    source: "IMG_3643.jpeg",
    identifiableFaces: 9,
    status: "pending-release",
    note: "Group frame. Nine faces detected; releases required before publication.",
  },
  {
    source: "IMG_1652.jpg",
    identifiableFaces: 3,
    status: "pending-release",
    note: "Three faces detected; releases required before publication.",
  },
  {
    source: "IMG_0232.jpeg",
    identifiableFaces: 5,
    status: "pending-release",
    note: "Five faces detected; byte-identical duplicate of IMG_0232 (1).jpeg.",
  },
  {
    source: "IMG_8097.jpeg",
    identifiableFaces: 8,
    status: "pending-release",
    note: "Eight faces detected; releases required before publication.",
  },
  // --- Photo addendum (Checkpoint 003, second batch) ---------------------
  // Four additional frames arrived with the addendum. Every one of them is a
  // multi-person frame, so none can be published until the people in them —
  // several of them children — have signed media releases. They are preserved
  // as EXIF-stripped masters and private review copies only.
  {
    source: "IMG_5608.jpeg",
    identifiableFaces: 20,
    status: "pending-release",
    note: "Large group session. Twenty faces detected; releases required before publication.",
  },
  {
    source: "IMG_1468.jpeg",
    identifiableFaces: 5,
    status: "pending-release",
    note: "Small group. Five faces detected; releases required before publication.",
  },
  {
    source: "IMG_7389.jpeg",
    identifiableFaces: 2,
    status: "pending-release",
    note: "Two people. Second face detected at 0.91 confidence; both releases required.",
  },
  {
    source: "IMG_0244.jpeg",
    identifiableFaces: 30,
    status: "pending-release",
    note: "Camp-scale group. Thirty faces detected; releases required before publication.",
  },
];

/** True when a media asset is authentic client photography. */
export function isAuthentic(asset: { placeholder: boolean }): boolean {
  return asset.placeholder === false;
}
