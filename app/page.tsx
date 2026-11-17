import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, ArrowLink } from "@/components/ui";
import { DISCIPLINE_ICONS, OBJECTIVE_ICONS, TECH_ICONS } from "@/components/icons";
import { coachPortrait, dfwSkyline, dfwSkylinePhoto, heroAthlete } from "@/lib/content/media";
import {
  DevelopmentSection,
  FaqSection,
  FinalCtaSection,
  GallerySection,
  PricingSection,
  ProgramsSection,
  ReviewsSection,
  WhySection,
} from "@/components/home/HomeSections";
import { JsonLd, organizationSchema } from "@/lib/seo";
import { getTranslator } from "@/lib/i18n/server";
import { localizedPath } from "@/lib/i18n/config";
import type { TranslationKey } from "@/lib/i18n/dictionaries";

/* ------------------------------------------------------------------- page */

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ skyline?: string }>;
}) {
  const { t, locale } = await getTranslator();

  /**
   * Skyline candidate switch.
   *
   * The PM directive asks for two Dallas skyline candidates presented inside
   * the same angled gold panel so the client can choose between them. Rather
   * than maintaining two divergent builds, the band reads `?skyline=photo` to
   * render the licensed photograph and falls back to the in-house generated
   * illustration for every other request. Layout, crop, grade and panel are
   * identical either way, so the only variable is the source image.
   */
  const params = (await searchParams) ?? {};
  const skyline = params.skyline === "photo" ? dfwSkylinePhoto : dfwSkyline;
  const lp = (p: string) => localizedPath(locale, p);

  const disciplines = [
    t("home.disciplines.one"),
    t("home.disciplines.two"),
    t("home.disciplines.three"),
    t("home.disciplines.four"),
    t("home.disciplines.five"),
  ];

  const objectives: TranslationKey[] = [
    "home.objectives.one",
    "home.objectives.two",
    "home.objectives.three",
    "home.objectives.four",
    "home.objectives.five",
    "home.objectives.six",
    "home.objectives.seven",
    "home.objectives.eight",
  ];

  const techPillars = [
    { title: t("home.pillars.one.title"), body: t("home.pillars.one.body") },
    { title: t("home.pillars.two.title"), body: t("home.pillars.two.body") },
    { title: t("home.pillars.three.title"), body: t("home.pillars.three.body") },
    { title: t("home.pillars.four.title"), body: t("home.pillars.four.body") },
    { title: t("home.pillars.five.title"), body: t("home.pillars.five.body") },
  ];

  const dfw = [
    { label: t("home.dfw.one.label"), body: t("home.dfw.one.body") },
    { label: t("home.dfw.two.label"), body: t("home.dfw.two.body") },
    { label: t("home.dfw.three.label"), body: t("home.dfw.three.body") },
  ];

  return (
    <>
      <JsonLd data={organizationSchema} />

      {/* ------------------------------------------------------------ hero */}
      {/* The header is fixed, so the section reserves its height and the
          photograph begins exactly where the black bar ends — the same
          relationship as the approved reference. */}
      <section className="relative isolate overflow-hidden bg-ink">
        <div className="relative flex min-h-[36rem] flex-col sm:min-h-[38rem] lg:h-[34rem] lg:min-h-0">
          {/*
            The photograph starts at the very top of the viewport and runs behind
            the fixed header, so the athlete reads as a layered, cinematic
            foreground rather than a picture in a box. `object-top` is critical:
            the source frame is 1536x1024 and the athlete's head begins at source
            y=25 (face detected at y=59-196). Any downward object-position crops
            the head off, which is exactly what the previous 34% offset did.
          */}
          {/*
            The image box starts 2.5rem below the top of the section so the
            athlete's hairline clears the 4rem navigation bar. The face was
            detected at source y=59-196; with the box at y=0 that face sat
            underneath the header. Offsetting the box (not cropping the photo)
            keeps the entire head, face and shoulders in frame.
          */}
          <div className="absolute inset-x-0 bottom-0 top-10">
            <Image
              src={heroAthlete.src}
              alt={t("home.hero.imageAlt")}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[70%_top] lg:object-[center_top]"
            />
          </div>
          {/* Top scrim keeps the navigation legible where it crosses the
              photograph, then releases so the face and shoulders stay clear. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(8,8,8,0.94)_0%,rgba(8,8,8,0.72)_38%,rgba(8,8,8,0.28)_72%,rgba(8,8,8,0)_100%)]" />
          {/* Scrim is weighted to the left where the headline sits and lifts to
              nothing by 58%, so neither the athlete nor the illuminated wall
              sign is covered by a dark overlay. */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.82)_0%,rgba(8,8,8,0.56)_20%,rgba(8,8,8,0.24)_38%,rgba(8,8,8,0.05)_50%,rgba(8,8,8,0)_58%)]" />
          {/* Bottom fade only so the discipline row sits on the photograph. */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink via-ink/30 to-transparent lg:h-24" />

          <div className="shell-wide relative flex w-full flex-1 flex-col pb-5 pt-[5.4rem] sm:pt-[5.8rem] lg:pb-4 lg:pt-[6.2rem]">
            <div className="max-w-[56rem]">
              <Eyebrow>{t("home.hero.eyebrow")}</Eyebrow>
              <h1 className="mt-4 fade-in lg:mt-5">
                <span className="display-hero block text-white">{t("home.hero.headline1")}</span>
                <span className="display-hero block text-[#e9bb59]">{t("home.hero.headline2")}</span>
              </h1>
              <p className="mt-4 max-w-[26rem] font-sans text-[0.86rem] leading-6 text-silver/90 lg:mt-5">
                {t("home.hero.intro")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 lg:mt-7">
                <Link
                  href={lp("/start-training")}
                  className="btn-primary !min-h-[2.9rem] !px-6 !text-[0.875rem] lg:!min-h-[2.6rem] lg:!text-[0.68rem]"
                >
                  {t("home.hero.cta")}
                </Link>
                <Link
                  href={lp("/registration/athlete")}
                  className="btn-ghost !min-h-[2.9rem] !px-6 !text-[0.875rem] lg:!min-h-[2.6rem] lg:!text-[0.68rem]"
                >
                  {t("home.hero.ctaIntake")}
                </Link>
              </div>
            </div>

            {/* five training disciplines, beneath the hero copy */}
            <ul
              aria-label={t("home.disciplines.label")}
              className="mt-auto grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8"
            >
              {disciplines.map((label, i) => {
                const Icon = DISCIPLINE_ICONS[i];
                return (
                  <li key={label} className="flex items-center gap-3">
                    <span className="text-gold">
                      <Icon width={22} height={22} />
                    </span>
                    <span className="font-display text-[0.74rem] uppercase leading-none tracking-[0.14em] text-white/90">
                      {label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------ coach + technology split */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#121110]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_6%_45%,rgba(214,167,59,0.22),transparent_58%)]"
        />
        <div className="shell-wide relative grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-10 lg:py-20">
          {/* left: the coach */}
          <Reveal className="lg:pr-6">
            <div className="flex items-start gap-6 lg:gap-8">
              {/* diagonal gold accent behind the portrait */}
              <div className="relative shrink-0">
                <div
                  aria-hidden="true"
                  className="absolute -left-3 -top-2 h-[104%] w-[11rem] -skew-x-[9deg] bg-[linear-gradient(165deg,#f0cd7c_0%,#c79a34_46%,#8a6a1e_100%)] sm:w-[13rem] lg:w-[16.2rem]"
                />
                <div className="relative aspect-[4/5] w-[9.5rem] overflow-hidden border border-white/15 sm:w-[11.5rem] lg:w-[14.6rem]">
                  <Image
                    src={coachPortrait.src}
                    alt={t("home.coach.portraitAlt")}
                    fill
                    sizes="(max-width: 640px) 152px, (max-width: 1024px) 184px, 234px"
                    className="object-cover object-[50%_18%]"
                  />
                </div>
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <Eyebrow>{t("home.coach.eyebrow")}</Eyebrow>
                <h2 className="mt-1.5 font-display text-[2.1rem] uppercase leading-[0.92] text-white lg:text-[clamp(2.125rem,2.6vw,2.5rem)]">
                  {t("home.coach.title")}
                </h2>
                <p className="mt-2 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-gold lg:text-[0.62rem]">
                  {t("home.coach.role")}
                </p>
                <p className="mt-3 max-w-xl font-sans text-[0.98rem] leading-[1.65] text-silver/85 lg:text-[clamp(1rem,1.05vw,1.125rem)]">
                  {t("home.coach.p1")}
                </p>
                <p className="mt-2 hidden max-w-xl font-sans text-[0.98rem] leading-[1.65] text-silver/85 sm:block lg:text-[clamp(1rem,1.05vw,1.125rem)]">
                  {t("home.coach.p2")}
                </p>
                <div className="mt-3">
                  <ArrowLink href={lp("/about")}>{t("home.coach.link")}</ArrowLink>
                </div>
              </div>
            </div>
          </Reveal>

          {/* right: performance technology, five gold-bordered cards in one row */}
          <Reveal delay={80} className="lg:border-l lg:border-white/10 lg:pl-9">
            <Eyebrow>{t("home.tech.eyebrow")}</Eyebrow>
            <h2 className="mt-1.5 font-display text-[1.9rem] uppercase leading-[0.92] text-white lg:text-[clamp(1.875rem,2.3vw,2.25rem)]">
              {t("home.pillars.title")}
            </h2>
            <p className="mt-1.5 max-w-xl font-sans text-[0.9rem] leading-[1.55] text-silver/85 lg:text-[clamp(0.875rem,1vw,1rem)]">
              {t("home.tech.intro")}
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
              {techPillars.map((pillar, i) => {
                const Icon = TECH_ICONS[i];
                return (
                  <li
                    key={pillar.title}
                    className="group border border-gold/55 bg-white/[0.03] px-3 pb-4 pt-3 transition-colors duration-300 hover:border-gold hover:bg-white/[0.06]"
                  >
                    <span className="block text-gold-bright transition-transform duration-300 group-hover:scale-105">
                      <Icon width={30} height={30} />
                    </span>
                    <h3 className="mt-2.5 font-display text-[0.95rem] uppercase leading-[1.15] text-white lg:text-[clamp(0.9375rem,1.05vw,1.0625rem)]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-[0.8rem] uppercase tracking-[0.16em] text-gold/80 lg:text-[clamp(0.875rem,0.95vw,1rem)]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3">
              <ArrowLink href={lp("/performance-technology")}>{t("home.tech.link")}</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------- training objectives */}
      <section id="objectives" className="bg-[#ece9e4] text-ink">
        <div className="shell-wide py-12 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[21rem_minmax(0,1fr)] lg:items-center lg:gap-8">
            <div>
              <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-[#6f5416] lg:text-[0.56rem]">
                {t("home.objectives.eyebrow")}
              </p>
              <h2 className="mt-1.5 font-display text-[1.9rem] uppercase leading-[0.9] text-ink lg:text-[clamp(1.9rem,2.2vw,2.125rem)]">
                {t("home.objectives.title")}
              </h2>
              <div className="mt-2.5 h-[2px] w-12 bg-[linear-gradient(90deg,#a8862f,#e0bb63)]" />
            </div>

            <ul className="grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4 lg:grid-cols-8 lg:gap-x-4 lg:gap-y-0">
              {objectives.map((key, i) => {
                const Icon = OBJECTIVE_ICONS[i];
                return (
                  <li key={key}>
                    <span className="block text-[#8a6a1e]">
                      <Icon width={21} height={21} />
                    </span>
                    <p className="mt-2 font-display text-[0.875rem] uppercase leading-[1.2] tracking-[0.01em] text-ink lg:text-[clamp(0.875rem,0.95vw,1rem)]">
                      {t(key)}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- DFW */}
      {/*
        The skyline band is sized to the source's own aspect ratio (1920x802,
        2.39:1) instead of being squeezed into a short strip. At 1536px wide the
        full panorama needs ~640px of height, so the band is 40rem tall on
        desktop and the image is displayed with `object-center` and no
        meaningful crop: Reunion Tower and the whole downtown cluster stay in
        frame. Gold is carried by the angled panel, not by a wash over the
        photograph.
      */}
      <section id="dfw" className="relative isolate overflow-hidden bg-[#14100a] text-white">
        <div className="absolute inset-x-0 top-0 h-[15rem] sm:h-[17rem] lg:inset-0 lg:h-auto">
          <Image
            src={skyline.src}
            alt={skyline.alt}
            fill
            sizes="100vw"
            className="object-cover object-[46%_center] brightness-[0.86] saturate-[1.02] lg:object-center lg:brightness-[0.9]"
          />
          {/* Mobile: only a soft bottom fade so the band melts into the panel. */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,16,10,0.34)_0%,rgba(20,16,10,0.04)_38%,rgba(20,16,10,0.92)_100%)] lg:hidden" />
          {/* Desktop: a single left-to-right ramp that hands the image over to
              the gold panel, with no flat gold layer over the buildings. */}
          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(20,16,10,0.02)_0%,rgba(20,16,10,0.10)_42%,rgba(20,16,10,0.42)_56%,rgba(20,16,10,0.86)_64%,rgba(20,16,10,1)_70%)] lg:block" />
        </div>

        {/* Angled gold panel on the right; the edge leans left as it descends. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
          style={{
            clipPath: "polygon(60% 0%, 100% 0%, 100% 100%, 56.5% 100%)",
            background: "linear-gradient(180deg, #c99a45 0%, #a5761f 38%, #74500f 72%, #63440e 100%)",
            boxShadow: "-24px 0 48px rgba(8,8,8,0.45)",
          }}
        />

        <div className="relative">
          <div className="h-[15rem] sm:h-[17rem] lg:hidden" aria-hidden="true" />

          <div className="dfw-panel bg-[linear-gradient(180deg,#c99a45_0%,#a5761f_38%,#74500f_72%,#63440e_100%)] px-5 pb-10 pt-7 sm:px-8 lg:flex lg:min-h-[40rem] lg:items-center lg:bg-none lg:px-0 lg:py-0">
            <div className="shell-wide lg:py-2">
              <div className="lg:ml-auto lg:w-[40%]">
                <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[#fbe6b4] lg:text-[0.62rem]">
                  {t("home.dfw.eyebrow")}
                </p>
                <h2 className="mt-1 font-display text-[2.1rem] uppercase leading-[0.9] text-white lg:text-[clamp(2.125rem,2.9vw,2.625rem)]">
                  {t("home.dfw.title")}
                </h2>
                <div className="mt-2.5 h-px w-full max-w-[19rem] bg-white/35" />

                {/* the three pillars sit on one row, pipe-separated, as approved */}
                <ul className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                  {dfw.map((item, i) => (
                    <li key={item.label} className="flex items-center gap-2.5">
                      {i > 0 ? <span aria-hidden="true" className="h-3 w-px bg-white/40" /> : null}
                      <span className="font-display text-[0.82rem] uppercase leading-none tracking-[0.06em] text-white lg:text-[clamp(0.875rem,0.95vw,1rem)]">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-3 max-w-md font-sans text-[0.95rem] leading-[1.55] text-[#fdf3dd]/92 lg:text-[clamp(1rem,1.1vw,1.125rem)]">
                  {t("home.dfw.intro")}
                </p>

                <p className="mt-3 font-sans text-[0.62rem] uppercase leading-[1.4] tracking-[0.12em] text-[#fdf3dd]/60 lg:text-[0.56rem] lg:text-[#fdf3dd]/55">
                  {skyline.credit}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- 06 · programs */}
      <ProgramsSection locale={locale} path={lp} />

      {/* ---------------------------------------- 07 · classes & packages */}
      <PricingSection locale={locale} path={lp} />

      {/* ------------------------------------------------------ 08 · why */}
      <WhySection locale={locale} path={lp} />

      {/* -------------------------------------------------- 09 · reviews */}
      <ReviewsSection locale={locale} path={lp} />

      {/* ---------------------------------------------- 10 · development */}
      <DevelopmentSection locale={locale} path={lp} />

      {/* -------------------------------------------------- 11 · gallery */}
      <GallerySection locale={locale} path={lp} />

      {/* ------------------------------------------------------ 12 · FAQ */}
      <FaqSection locale={locale} path={lp} />

      {/* ------------------------------------------------- 13 · final CTA */}
      <FinalCtaSection locale={locale} path={lp} />
    </>
  );
}
