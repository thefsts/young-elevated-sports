import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, ArrowLink } from "@/components/ui";
import { DISCIPLINE_ICONS, OBJECTIVE_ICONS } from "@/components/icons";
import { coachPortrait, dfwSkyline, heroAthlete } from "@/lib/content/media";
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
      {/* The header is fixed, so the section reserves its height and the
          photograph begins exactly where the black bar ends — the same
          relationship as the approved reference. */}
      <section className="relative isolate overflow-hidden bg-ink pt-14">
        <div className="relative flex min-h-[36rem] flex-col sm:min-h-[38rem] lg:h-[27rem] lg:min-h-0">
          <Image
            src={heroAthlete.src}
            alt={t("home.hero.imageAlt")}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[64%_36%] lg:object-[62%_34%]"
          />
          {/* Scrim is weighted to the left where the headline sits, and lifts to
              nothing by 60% so the athlete is never covered by a dark overlay. */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.86)_0%,rgba(8,8,8,0.66)_22%,rgba(8,8,8,0.34)_42%,rgba(8,8,8,0.06)_58%,rgba(8,8,8,0)_72%)]" />
          {/* Bottom fade only so the discipline row sits on the photograph. */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink via-ink/30 to-transparent lg:h-24" />

          <div className="shell-wide relative flex w-full flex-1 flex-col pb-5 pt-[2.6rem] sm:pt-12 lg:pb-4 lg:pt-[2.9rem]">
            <div className="max-w-[44rem]">
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
                  className="btn-primary !min-h-[2.6rem] !px-6 !text-[0.66rem]"
                >
                  {t("home.hero.cta")}
                </Link>
                <Link
                  href={lp("/registration/athlete")}
                  className="btn-ghost !min-h-[2.6rem] !px-6 !text-[0.66rem]"
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
        <div className="shell-wide relative grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-10 lg:py-[0.55rem]">
          {/* left: the coach */}
          <Reveal className="lg:pr-6">
            <div className="flex items-start gap-6 lg:gap-7">
              {/* diagonal gold accent behind the portrait */}
              <div className="relative shrink-0">
                <div
                  aria-hidden="true"
                  className="absolute -left-3 -top-2 h-[104%] w-[9.5rem] -skew-x-[9deg] bg-[linear-gradient(165deg,#f0cd7c_0%,#c79a34_46%,#8a6a1e_100%)] sm:w-[11rem] lg:w-[13.4rem]"
                />
                <div className="relative aspect-[4/5] w-[8.5rem] overflow-hidden border border-white/15 sm:w-[10rem] lg:w-[12rem]">
                  <Image
                    src={coachPortrait.src}
                    alt={t("home.coach.portraitAlt")}
                    fill
                    sizes="(max-width: 640px) 136px, (max-width: 1024px) 160px, 192px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <Eyebrow>{t("home.coach.eyebrow")}</Eyebrow>
                <h2 className="mt-1.5 font-display text-[2rem] uppercase leading-[0.92] text-white lg:text-[2.35rem]">
                  {t("home.coach.title")}
                </h2>
                <p className="mt-2 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-gold">
                  {t("home.coach.role")}
                </p>
                <p className="mt-3 max-w-xl font-sans text-[0.76rem] leading-[1.6] text-silver/85">
                  {t("home.coach.p1")}
                </p>
                <p className="mt-2 hidden max-w-xl font-sans text-[0.76rem] leading-[1.6] text-silver/85 sm:block">
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
            <h2 className="mt-1.5 font-display text-[1.9rem] uppercase leading-[0.92] text-white lg:text-[1.95rem]">
              {t("home.pillars.title")}
            </h2>
            <p className="mt-1.5 max-w-xl font-sans text-[0.7rem] leading-[1.5] text-silver/85">
              {t("home.tech.intro")}
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {techPillars.map((pillar, i) => (
                <li
                  key={pillar.title}
                  className="border border-gold/45 bg-white/[0.02] p-2 transition-colors duration-300 hover:border-gold/80"
                >
                  <span className="font-sans text-[0.5rem] font-semibold tracking-[0.24em] text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-display text-[0.74rem] uppercase leading-[1.12] text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 font-sans text-[0.6rem] leading-[1.4] text-silver/70">
                    {pillar.body}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <ArrowLink href={lp("/performance-technology")}>{t("home.tech.link")}</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------- training objectives */}
      <section id="objectives" className="bg-[#ece9e4] text-ink">
        <div className="shell-wide py-9 lg:py-6">
          <div className="grid gap-8 lg:grid-cols-[21rem_minmax(0,1fr)] lg:items-center lg:gap-8">
            <div>
              <p className="font-sans text-[0.56rem] font-semibold uppercase tracking-[0.3em] text-[#6f5416]">
                {t("home.objectives.eyebrow")}
              </p>
              <h2 className="mt-1.5 font-display text-[1.9rem] uppercase leading-[0.9] text-ink lg:text-[2.15rem]">
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
                    <p className="mt-2 font-display text-[0.72rem] uppercase leading-[1.15] tracking-[0.01em] text-ink">
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
        {/* Downtown Dallas including Reunion Tower across the left of the band. */}
        <div className="absolute inset-x-0 top-0 h-[220px] sm:h-[260px] lg:inset-0 lg:h-auto">
          <Image
            src={dfwSkyline.src}
            alt={dfwSkyline.alt}
            fill
            sizes="100vw"
            className="object-cover object-[34%_center] brightness-[0.57] saturate-[1.04]"
          />
          {/* warm gold duotone rather than a black overlay */}
          <div className="absolute inset-0 bg-[#c89a4a] opacity-22 mix-blend-screen" />
          <div className="absolute inset-0 bg-[#2b1c05] opacity-[0.22]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(107,74,16,0.06)_0%,rgba(107,74,16,0.14)_38%,rgba(107,74,16,0.62)_56%,rgba(107,74,16,0.95)_68%,rgba(107,74,16,1)_100%)]" />
        </div>

        {/* Angled gold panel on the right; the edge leans left as it descends. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
          style={{
            clipPath: "polygon(62% 0%, 100% 0%, 100% 100%, 58.5% 100%)",
            background: "linear-gradient(180deg, #c99a45 0%, #a5761f 38%, #74500f 72%, #63440e 100%)",
          }}
        />

        <div className="relative">
          <div className="h-[220px] sm:h-[260px] lg:hidden" aria-hidden="true" />

          <div className="dfw-panel bg-[linear-gradient(180deg,#c99a45_0%,#a5761f_38%,#74500f_72%,#63440e_100%)] px-5 pb-9 pt-7 sm:px-8 lg:bg-none lg:px-0 lg:py-0">
            <div className="shell-wide lg:py-2">
              <div className="lg:ml-auto lg:w-[40%]">
                <p className="font-sans text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-[#fbe6b4]">
                  {t("home.dfw.eyebrow")}
                </p>
                <h2 className="mt-1 font-display text-[2.1rem] uppercase leading-[0.88] text-white lg:text-[2.45rem]">
                  {t("home.dfw.title")}
                </h2>
                <div className="mt-2.5 h-px w-full max-w-[19rem] bg-white/35" />

                {/* the three pillars sit on one row, pipe-separated, as approved */}
                <ul className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                  {dfw.map((item, i) => (
                    <li key={item.label} className="flex items-center gap-2.5">
                      {i > 0 ? <span aria-hidden="true" className="h-3 w-px bg-white/40" /> : null}
                      <span className="font-display text-[0.72rem] uppercase leading-none tracking-[0.06em] text-white">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-3 max-w-md font-sans text-[0.7rem] leading-[1.5] text-[#fdf3dd]/90">
                  {t("home.dfw.intro")}
                </p>

                <p className="mt-3 font-sans text-[0.5rem] uppercase leading-[1.4] tracking-[0.12em] text-[#fdf3dd]/55">
                  {dfwSkyline.credit}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- CTA */}
      <section className="relative overflow-hidden border-t border-white/10 bg-ink py-24 lg:py-28">
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
