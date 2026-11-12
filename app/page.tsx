import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, ArrowLink } from "@/components/ui";
import { media, coachPortrait } from "@/lib/content/media";
import { JsonLd, organizationSchema } from "@/lib/seo";
import { getTranslator } from "@/lib/i18n/server";
import { localizedPath } from "@/lib/i18n/config";
import type { TranslationKey } from "@/lib/i18n/dictionaries";

/* ------------------------------------------------------------------ icons */

const ICON_PROPS = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.35,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Speed — motion chevrons. */
function IconSpeed() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M3 8h9M3 12h12M3 16h7" />
      <path d="M15.5 7.5 20 12l-4.5 4.5" />
    </svg>
  );
}

/** Strength — loaded bar. */
function IconStrength() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" />
    </svg>
  );
}

/** Agility — change of direction. */
function IconAgility() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M3 18 8 9l5 6 3-5 5 8" />
      <circle cx="8" cy="9" r="1.1" />
      <circle cx="16" cy="10" r="1.1" />
    </svg>
  );
}

/** Explosive power — upward burst. */
function IconPower() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 21V8" />
      <path d="m7.5 12.5 4.5-4.5 4.5 4.5" />
      <path d="M5 5.5 7.5 3M19 5.5 16.5 3M12 3V1" />
    </svg>
  );
}

/** Injury prevention — shield. */
function IconShield() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 3 5 5.5v5.9c0 4.2 2.9 7.4 7 8.6 4.1-1.2 7-4.4 7-8.6V5.5L12 3Z" />
      <path d="m9 11.8 2.1 2.1 4-4" />
    </svg>
  );
}

const DISCIPLINE_ICONS = [IconSpeed, IconStrength, IconAgility, IconPower, IconShield];

/* ------------------------------------------------------------------- page */

export default async function HomePage() {
  const { t, locale } = await getTranslator();
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
  ];

  const dfw = [
    { label: t("home.dfw.one.label"), body: t("home.dfw.one.body") },
    { label: t("home.dfw.two.label"), body: t("home.dfw.two.body") },
    { label: t("home.dfw.three.label"), body: t("home.dfw.three.body") },
  ];

  const skyline = media["dfw-skyline"];

  return (
    <>
      <JsonLd data={organizationSchema} />

      {/* ------------------------------------------------------------ hero */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink">
        <Image
          src={media.sprinting.src}
          alt={t("home.hero.imageAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] brightness-[1.14]"
        />
        {/* Scrim is weighted to the left where the headline sits. The athlete
            stays fully exposed on the right, and the bottom fade only exists so
            the discipline row can sit on the photograph without a hard edge. */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.89)_0%,rgba(8,8,8,0.62)_30%,rgba(8,8,8,0.15)_54%,rgba(8,8,8,0)_84%)]" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-ink via-ink/60 to-transparent" />

        <div className="shell relative flex w-full flex-1 flex-col pb-8 pt-[18vh] sm:pt-[19vh]">
          <div className="max-w-[47rem]">
            <Eyebrow>{t("home.hero.eyebrow")}</Eyebrow>

            <h1 className="mt-6 fade-in">
              <span className="display-hero block text-white">{t("home.hero.headline1")}</span>
              <span className="display-hero block text-sheen">{t("home.hero.headline2")}</span>
            </h1>

            <p className="lede mt-7 max-w-xl">{t("home.hero.intro")}</p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link href={lp("/start-training")} className="btn-primary">
                {t("home.hero.cta")}
              </Link>
              <Link href={lp("/registration/athlete")} className="btn-ghost">
                {t("home.hero.ctaIntake")}
              </Link>
            </div>
          </div>

          {/* five training disciplines, beneath the hero copy */}
          <ul
            aria-label={t("home.disciplines.label")}
            className="mt-auto grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8"
          >
            {disciplines.map((label, i) => {
              const Icon = DISCIPLINE_ICONS[i];
              return (
                <li key={label} className="flex flex-col gap-3">
                  <span className="text-gold">
                    <Icon />
                  </span>
                  <span className="font-display text-[0.82rem] uppercase leading-none tracking-[0.16em] text-white/90">
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------- coach + technology */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#161412]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_35%,rgba(214,167,59,0.28),transparent_62%)]"
        />
        <div className="shell relative grid gap-14 py-16 lg:grid-cols-2 lg:gap-0 lg:py-24">
          {/* coach */}
          <Reveal className="lg:pr-14">
            <div className="flex items-start gap-6">
              <div className="relative aspect-[4/5] w-32 shrink-0 overflow-hidden rounded-sm border border-white/10 sm:w-40">
                <Image
                  src={coachPortrait.src}
                  alt={t("home.coach.portraitAlt")}
                  fill
                  sizes="(max-width: 640px) 128px, 160px"
                  className="object-cover object-top"
                />
              </div>
              <div className="pt-1">
                <Eyebrow>{t("home.coach.eyebrow")}</Eyebrow>
                <h2 className="display-md mt-3 text-white">{t("home.coach.title")}</h2>
                <p className="mt-2 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-gold">
                  {t("home.coach.role")}
                </p>
              </div>
            </div>

            <p className="mt-7 max-w-xl font-sans text-sm leading-7 text-silver/90">
              {t("home.coach.p1")}
            </p>
            <p className="mt-3 max-w-xl font-sans text-sm leading-7 text-silver/90">
              {t("home.coach.p2")}
            </p>
            <div className="mt-6">
              <ArrowLink href={lp("/about")}>{t("home.coach.link")}</ArrowLink>
            </div>
          </Reveal>

          {/* performance technology */}
          <Reveal delay={80} className="lg:border-l lg:border-white/10 lg:pl-14">
            <Eyebrow>{t("home.tech.eyebrow")}</Eyebrow>
            <h2 className="display-md mt-3 max-w-md text-white">{t("home.pillars.title")}</h2>
            <p className="mt-4 max-w-xl font-sans text-sm leading-7 text-silver/90">
              {t("home.tech.intro")}
            </p>

            <ul className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {techPillars.map((pillar, i) => (
                <li key={pillar.title} className="border-t border-white/10 pt-4">
                  <span className="font-sans text-[0.6rem] font-semibold tracking-[0.28em] text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-base uppercase leading-tight text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 font-sans text-[0.8rem] leading-6 text-silver/75">{pillar.body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <ArrowLink href={lp("/performance-technology")}>{t("home.tech.link")}</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------- training objectives */}
      <section id="objectives" className="bg-[#ece9e4] text-ink">
        <div className="shell py-14 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2.6fr)] lg:items-start lg:gap-12">
            <div>
              <p className="eyebrow text-[#6f5416]">{t("home.objectives.eyebrow")}</p>
              <h2 className="display-md mt-3 text-ink">{t("home.objectives.title")}</h2>
              <div className="mt-5 h-[2px] w-14 bg-[linear-gradient(90deg,#a8862f,#e0bb63)]" />
              <div className="mt-6">
                <ArrowLink href={lp("/training")} className="text-[#6f5416] hover:text-[#3d2e0b]">
                  {t("home.programs.link")}
                </ArrowLink>
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 xl:grid-cols-8 xl:gap-x-5">
              {objectives.map((key, i) => (
                <li key={key} className="border-t border-ink/15 pt-4">
                  <span className="font-sans text-[0.6rem] font-semibold tracking-[0.26em] text-[#6f5416]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 font-display text-[0.92rem] uppercase leading-[1.15] tracking-[0.01em] text-ink">
                    {t(key)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- DFW */}
      <section id="dfw" className="relative overflow-hidden bg-[#6f4f10]">
        <Image
          src={skyline.src}
          alt={skyline.alt}
          fill
          sizes="100vw"
          className="object-cover brightness-[1.18] sepia-[0.22] saturate-[1.05]"
        />
        {/* gold treatment — a warm duotone wash, not a black overlay */}
        <div className="absolute inset-0 bg-[#c89a4a] opacity-58 mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(111,79,16,0.05)_0%,rgba(111,79,16,0.25)_42%,rgba(111,79,16,0.82)_78%,rgba(111,79,16,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(111,79,16,0.3)_0%,rgba(111,79,16,0)_35%,rgba(111,79,16,0.45)_100%)]" />

        <div className="shell relative py-16 lg:py-24">
          <div className="lg:ml-auto lg:w-[52%]">
            <p className="eyebrow text-[#f7dda2]">{t("home.dfw.eyebrow")}</p>
            <h2 className="display-lg mt-3 text-white">{t("home.dfw.title")}</h2>
            <p className="mt-5 max-w-lg font-sans text-sm leading-7 text-[#fdf3dd]/95">
              {t("home.dfw.intro")}
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {dfw.map((item, i) => (
                <Reveal key={item.label} delay={i * 60}>
                  <div className="border-t border-white/40 pt-4">
                    <h3 className="font-display text-lg uppercase leading-none text-white">
                      {item.label}
                    </h3>
                    <p className="mt-2 font-sans text-[0.78rem] leading-6 text-[#fdf3dd]/90">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- CTA */}
      <section className="relative overflow-hidden border-t border-white/10 bg-ink py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,167,59,0.14),transparent_65%)]"
        />
        <div className="shell relative text-center">
          <Eyebrow className="justify-center">{t("home.cta.eyebrow")}</Eyebrow>
          <h2 className="display-xl mx-auto mt-6 max-w-4xl text-white">{t("home.cta.title")}</h2>
          <p className="lede mx-auto mt-6 max-w-xl">{t("home.cta.intro")}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href={lp("/start-training")} className="btn-primary">
              {t("home.hero.cta")}
            </Link>
            <Link href={lp("/contact")} className="btn-ghost">
              {t("common.contact")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
