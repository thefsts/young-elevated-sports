import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, ArrowLink } from "@/components/ui";
import { DISCIPLINE_ICONS, OBJECTIVE_ICONS } from "@/components/icons";
import { media, coachPortrait, dfwSkyline } from "@/lib/content/media";
import { JsonLd, organizationSchema } from "@/lib/seo";
import { getTranslator } from "@/lib/i18n/server";
import { localizedPath } from "@/lib/i18n/config";
import type { TranslationKey } from "@/lib/i18n/dictionaries";

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
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink">
        <Image
          src={media.sprinting.src}
          alt={t("home.hero.imageAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] brightness-[1.2]"
        />
        {/* Scrim is weighted to the left where the headline sits so the athlete
            stays fully exposed on the right. The bottom fade only exists so the
            discipline row can sit on the photograph without a hard edge. */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.84)_0%,rgba(8,8,8,0.54)_30%,rgba(8,8,8,0.10)_55%,rgba(8,8,8,0)_86%)]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink via-ink/55 to-transparent" />

        <div className="shell relative flex w-full flex-1 flex-col pb-8 pt-[18vh] sm:pt-[19vh]">
          <div className="max-w-[47rem]">
            <Eyebrow>{t("home.hero.eyebrow")}</Eyebrow>
            <h1 className="mt-6 fade-in">
              <span className="display-hero block text-white">{t("home.hero.headline1")}</span>
              <span className="display-hero block text-[#e9bb59]">{t("home.hero.headline2")}</span>
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
                    <Icon width={30} height={30} />
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

      {/* ------------------------------------------ coach + technology split */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#161412]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_35%,rgba(214,167,59,0.26),transparent_62%)]"
        />
        <div className="shell relative grid gap-14 py-16 lg:grid-cols-2 lg:gap-0 lg:py-24">
          {/* left: the coach */}
          <Reveal className="lg:pr-12">
            <div className="flex items-start gap-6">
              <div className="relative aspect-[4/5] w-40 shrink-0 overflow-hidden rounded-sm border border-white/10 sm:w-52 lg:w-60">
                <Image
                  src={coachPortrait.src}
                  alt={t("home.coach.portraitAlt")}
                  fill
                  sizes="(max-width: 640px) 160px, (max-width: 1024px) 208px, 240px"
                  className="object-cover object-top brightness-[1.08]"
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

          {/* right: performance technology, five gold-bordered cards */}
          <Reveal delay={80} className="lg:border-l lg:border-white/10 lg:pl-12">
            <Eyebrow>{t("home.tech.eyebrow")}</Eyebrow>
            <h2 className="display-md mt-3 max-w-md text-white">{t("home.pillars.title")}</h2>
            <p className="mt-4 max-w-xl font-sans text-sm leading-7 text-silver/90">
              {t("home.tech.intro")}
            </p>
            <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
              {techPillars.map((pillar, i) => (
                <li
                  key={pillar.title}
                  className="border border-gold/40 bg-white/[0.02] p-3.5 transition-colors duration-300 hover:border-gold/70"
                >
                  <span className="font-sans text-[0.58rem] font-semibold tracking-[0.26em] text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-[0.86rem] uppercase leading-[1.15] text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 font-sans text-[0.68rem] leading-[1.45] text-silver/75">
                    {pillar.body}
                  </p>
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
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,2.7fr)] lg:items-start lg:gap-12">
            <div>
              <p className="eyebrow text-[#6f5416]">{t("home.objectives.eyebrow")}</p>
              <h2 className="display-md mt-3 text-ink">{t("home.objectives.title")}</h2>
              <div className="mt-5 h-[2px] w-14 bg-[linear-gradient(90deg,#a8862f,#e0bb63)]" />
              <div className="mt-6">
                <ArrowLink
                  href={lp("/training")}
                  className="text-[#6f5416] hover:text-[#3d2e0b]"
                >
                  {t("home.programs.link")}
                </ArrowLink>
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 xl:grid-cols-8 xl:gap-x-5">
              {objectives.map((key, i) => {
                const Icon = OBJECTIVE_ICONS[i];
                return (
                  <li key={key} className="border-t border-ink/15 pt-4">
                    <span className="block text-[#8a6a1e]">
                      <Icon width={26} height={26} />
                    </span>
                    <p className="mt-3 font-display text-[0.92rem] uppercase leading-[1.15] tracking-[0.01em] text-ink">
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
      <section id="dfw" className="relative isolate overflow-hidden bg-[#6b4a10] text-white">
        {/* Recognisable downtown Dallas at dusk, including Reunion Tower, across
            the left of the band. The photograph shows the city, not a YESP site. */}
        <div className="absolute inset-x-0 top-0 h-[240px] sm:h-[280px] lg:inset-0 lg:h-auto">
          <Image
            src={dfwSkyline.src}
            alt={dfwSkyline.alt}
            fill
            sizes="100vw"
            className="object-cover object-[38%_center] brightness-[1.06]"
          />
          {/* warm gold duotone rather than a black overlay */}
          <div className="absolute inset-0 bg-[#c89a4a] opacity-30 mix-blend-screen" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(107,74,16,0.10)_0%,rgba(107,74,16,0.18)_40%,rgba(107,74,16,0.62)_58%,rgba(107,74,16,0.94)_70%,rgba(107,74,16,1)_100%)]" />
        </div>

        {/* Angled gold panel on the right. The edge leans left as it descends,
            matching the approved composition (60.5% at the top, 57.2% at the
            bottom). */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
          style={{
            clipPath: "polygon(60.5% 0%, 100% 0%, 100% 100%, 57.2% 100%)",
            background: "linear-gradient(180deg, #d0a248 0%, #a5761f 34%, #7d5612 68%, #6b4a10 100%)",
          }}
        />

        <div className="relative">
          <div className="h-[240px] sm:h-[280px] lg:hidden" aria-hidden="true" />

          <div className="dfw-panel bg-[linear-gradient(180deg,#d0a248_0%,#a5761f_34%,#7d5612_68%,#6b4a10_100%)] px-5 pb-12 pt-9 sm:px-8 lg:bg-none lg:px-0 lg:py-0">
            <div className="shell lg:py-16">
              <div className="lg:ml-auto lg:w-[38.5%]">
                <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-[#fbe6b4]">
                  {t("home.dfw.eyebrow")}
                </p>
                <h2 className="display-lg mt-2 text-white">{t("home.dfw.title")}</h2>
                <div className="mt-5 h-px w-full max-w-[19rem] bg-white/35" />

                {/* the three pillars sit on one row, pipe-separated, as approved */}
                <ul className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                  {dfw.map((item, i) => (
                    <li key={item.label} className="flex items-center gap-3">
                      {i > 0 ? (
                        <span aria-hidden="true" className="h-3 w-px bg-white/40" />
                      ) : null}
                      <span className="font-display text-[0.95rem] uppercase leading-none tracking-[0.06em] text-white">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 max-w-md font-sans text-[0.82rem] leading-6 text-[#fdf3dd]/90">
                  {t("home.dfw.intro")}
                </p>

                <p className="mt-7 font-sans text-[0.58rem] uppercase tracking-[0.14em] text-[#fdf3dd]/55">
                  {dfwSkyline.credit}
                </p>
              </div>
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
