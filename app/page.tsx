import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, GoldRule, SectionHeading, StatStrip, ArrowLink } from "@/components/ui";
import { localizedPrograms, localizedTrainingPrinciples } from "@/lib/content/programs";
import { technology } from "@/lib/content/technology";
import { stats } from "@/lib/content/site";
import { JsonLd, organizationSchema } from "@/lib/seo";
import { getTranslator } from "@/lib/i18n/server";
import { localizedPath } from "@/lib/i18n/config";

export default async function HomePage() {
  const { t, locale } = await getTranslator();
  const lp = (p: string) => localizedPath(locale, p);
  const programs = localizedPrograms(locale);
  const trainingPrinciples = localizedTrainingPrinciples(locale);

  const ticker = [
    t("home.ticker.speed"),
    t("home.ticker.strength"),
    t("home.ticker.agility"),
    t("home.ticker.power"),
    t("home.ticker.injury"),
    t("home.ticker.vertical"),
    t("home.ticker.mobility"),
    t("home.ticker.conditioning"),
  ];

  const pillars = [
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

      {/* ---------------------------------------------------------------- hero */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-ink">
        <Image
          src="/media/hero-track.jpg"
          alt={t("home.hero.imageAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_center] opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/40" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.92)_0%,rgba(8,8,8,0.55)_45%,rgba(8,8,8,0.1)_100%)]" />
        <div className="grain absolute inset-0" aria-hidden="true" />

        <div className="shell relative w-full pb-14 pt-32 lg:pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 fade-in">
              <GoldRule />
              <Eyebrow>{t("home.hero.eyebrow")}</Eyebrow>
            </div>

            <h1 className="mt-7 fade-in" style={{ animationDelay: "80ms" }}>
              <span className="display-xl block text-white">{t("home.hero.line1")}</span>
              <span className="display-xl block text-white">{t("home.hero.line2")}</span>
              <span className="display-xl mt-2 block text-sheen">{t("home.hero.line3")}</span>
              <span className="display-xl block text-sheen">{t("home.hero.line4")}</span>
            </h1>

            <p
              className="mt-8 max-w-xl font-sans text-base leading-7 text-silver sm:text-lg fade-in"
              style={{ animationDelay: "160ms" }}
            >
              {t("home.hero.intro")}
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-3 fade-in"
              style={{ animationDelay: "240ms" }}
            >
              <Link href={lp("/start-training")} className="btn-primary">
                {t("home.hero.cta")}
              </Link>
              <Link href={lp("/about")} className="btn-ghost">
                {t("home.hero.secondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- ticker */}
      <section
        aria-label={t("home.ticker.label")}
        className="overflow-hidden border-y border-white/10 bg-graphite/60"
      >
        <div className="flex whitespace-nowrap py-4">
          <ul className="ticker flex shrink-0 items-center gap-10 pr-10 font-display text-sm uppercase tracking-[0.28em] text-silver/70">
            {ticker.map((item) => (
              <li key={item} className="flex items-center gap-10">
                <span>{item}</span>
                <span aria-hidden="true" className="text-gold">
                  /
                </span>
              </li>
            ))}
          </ul>
          <ul
            aria-hidden="true"
            className="ticker flex shrink-0 items-center gap-10 pr-10 font-display text-sm uppercase tracking-[0.28em] text-silver/70"
          >
            {ticker.map((item) => (
              <li key={item} className="flex items-center gap-10">
                <span>{item}</span>
                <span className="text-gold">/</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------------- stats */}
      <section aria-label={t("home.stats.label")} className="border-b border-white/10 bg-graphite/40">
        <div className="shell py-2">
          <StatStrip items={stats} />
        </div>
      </section>

      {/* ---------------------------------------------------------- manifesto */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <Reveal>
              <Eyebrow>{t("home.manifesto.eyebrow")}</Eyebrow>
              <h2 className="display-lg mt-6 text-white">{t("home.manifesto.title")}</h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-6 font-sans text-base leading-7 text-silver sm:text-lg">
                <p>{t("home.manifesto.p1")}</p>
                <p>{t("home.manifesto.p2")}</p>
                <p className="border-l-2 border-gold/60 pl-6 font-display text-xl uppercase leading-tight text-white">
                  {t("home.manifesto.quote")}
                  <span className="mt-3 block font-sans text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
                    {t("home.manifesto.attribution")}
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- programs */}
      <section className="border-t border-white/10 bg-graphite/30 py-24 lg:py-32">
        <div className="shell">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              index="01"
              eyebrow={t("home.programs.eyebrow")}
              title={t("home.programs.title")}
              intro={t("home.programs.intro")}
            />
            <div className="shrink-0">
              <ArrowLink href={lp("/training")}>{t("home.programs.link")}</ArrowLink>
            </div>
          </div>

          <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((program, i) => (
              <Reveal key={program.slug} delay={i * 40}>
                <Link
                  href={`${lp("/training")}#${program.slug}`}
                  className="group flex h-full flex-col justify-between bg-ink p-7 transition-colors hover:bg-graphite"
                >
                  <div>
                    <span className="font-sans text-[0.66rem] font-semibold tracking-[0.28em] text-gold/70">
                      {program.index}
                    </span>
                    <h3 className="mt-5 font-display text-2xl uppercase leading-none text-white">
                      {program.title}
                    </h3>
                    <p className="mt-4 font-sans text-sm leading-6 text-silver/80">{program.summary}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-8 block h-px w-8 bg-white/20 transition-all duration-300 group-hover:w-16 group-hover:bg-gold"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- coach */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[380px] lg:min-h-[620px]">
            <Image
              src="/media/facility.jpg"
              alt={t("home.coach.imageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/40 to-ink/10" />
            <div className="absolute bottom-6 left-6 border border-white/15 bg-ink/70 px-4 py-2 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-white/50 backdrop-blur">
              {t("home.illustrative")}
            </div>
          </div>

          <div className="flex items-center bg-ink px-6 py-20 sm:px-12 lg:px-16">
            <Reveal>
              <Eyebrow>{t("home.coach.eyebrow")}</Eyebrow>
              <h2 className="display-lg mt-6 text-white">{t("home.coach.title")}</h2>
              <p className="mt-6 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold">
                {t("home.coach.role")}
              </p>
              <div className="mt-7 space-y-4 font-sans text-base leading-7 text-silver">
                <p>{t("home.coach.p1")}</p>
                <p>{t("home.coach.p2")}</p>
              </div>
              <div className="mt-9">
                <ArrowLink href={lp("/about")}>{t("home.coach.link")}</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- method */}
      <section className="border-t border-white/10 py-24 lg:py-32">
        <div className="shell">
          <SectionHeading index="02" eyebrow={t("home.method.eyebrow")} title={t("home.method.title")} />
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {trainingPrinciples.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="border-t border-white/15 pt-6">
                  <span className="font-sans text-[0.66rem] font-semibold tracking-[0.28em] text-gold/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-xl uppercase leading-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-6 text-silver/80">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- technology */}
      <section className="relative overflow-hidden border-t border-white/10 bg-graphite/40 py-24 lg:py-32">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
            <Reveal>
              <SectionHeading
                index="03"
                eyebrow={t("home.tech.eyebrow")}
                title={t("home.tech.title")}
                intro={t("home.tech.intro")}
              />
              <div className="mt-9">
                <ArrowLink href={lp("/performance-technology")}>{t("home.tech.link")}</ArrowLink>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {technology.map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between gap-6 py-5">
                    <div>
                      <p className="font-display text-xl uppercase text-white">{item.name}</p>
                      <p className="mt-1 font-sans text-sm text-silver/70">{item.role}</p>
                    </div>
                    <span className="shrink-0 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-gold/70">
                      {item.category}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- tech pillars */}
      <section className="border-t border-white/10 py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <Eyebrow>{t("home.pillars.eyebrow")}</Eyebrow>
            <h2 className="display-lg mt-6 max-w-3xl text-white">{t("home.pillars.title")}</h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 50}>
                <div className="h-full bg-ink p-6">
                  <span className="font-sans text-[0.62rem] font-semibold tracking-[0.28em] text-gold/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-lg uppercase leading-tight text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-6 text-silver/75">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- DFW */}
      <section className="relative overflow-hidden border-t border-white/10 bg-graphite/40 py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(214,167,59,0.10),transparent_60%)]"
        />
        <div className="shell relative">
          <Reveal>
            <Eyebrow>{t("home.dfw.eyebrow")}</Eyebrow>
            <h2 className="display-xl mt-5 text-white">{t("home.dfw.title")}</h2>
            <p className="lede mt-6 max-w-2xl">{t("home.dfw.intro")}</p>
          </Reveal>
          <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-3">
            {dfw.map((item, i) => (
              <Reveal key={item.label} delay={i * 60}>
                <h3 className="font-display text-2xl uppercase leading-none text-gold">{item.label}</h3>
                <p className="mt-3 font-sans text-sm leading-6 text-silver/80">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- CTA */}
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
