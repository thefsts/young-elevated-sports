import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Notice, PageHero, SectionHeading } from "@/components/ui";
import {
  localizedFormats,
  localizedPrograms,
  localizedTrainingPrinciples,
} from "@/lib/content/programs";
import { media } from "@/lib/content/media";
import { pageMetadata } from "@/lib/seo";
import { getTranslator } from "@/lib/i18n/server";
import { LOCALE_LABELS, LOCALES, absoluteLocalized, localizedPath } from "@/lib/i18n/config";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Training Programs",
    description:
      "Speed and acceleration, explosive power, agility, strength, injury risk reduction, conditioning, vertical jump, and mobility — structured athletic development in Dallas–Fort Worth.",
    path: "/training",
  }),
  alternates: {
    canonical: "/training",
    languages: Object.fromEntries(
      LOCALES.map((l) => [LOCALE_LABELS[l].htmlLang, absoluteLocalized(site.url, l, "/training")]),
    ),
  },
};

export default async function TrainingPage() {
  const { t, locale } = await getTranslator();
  const lp = (p: string) => localizedPath(locale, p);
  const programs = localizedPrograms(locale);
  const formats = localizedFormats(locale);
  const trainingPrinciples = localizedTrainingPrinciples(locale);

  return (
    <>
      <PageHero
        eyebrow={t("training.hero.eyebrow")}
        title={t("training.hero.title")}
        intro={t("training.hero.intro")}
        image={media.strength.src}
        imageAlt={media.strength.alt}
        actions={
          <>
            <Link href={lp("/start-training")} className="btn-primary">
              {t("home.hero.cta")}
            </Link>
            <Link href={lp("/registration")} className="btn-ghost">
              {t("nav.registration")}
            </Link>
          </>
        }
      />

      <section className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="01"
            eyebrow={t("training.disciplines.eyebrow")}
            title={t("training.disciplines.title")}
            intro={t("training.disciplines.intro")}
          />

          <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {programs.map((program, i) => (
              <Reveal key={program.slug} delay={i * 30}>
                <article id={program.slug} className="scroll-mt-28 py-10 lg:py-12">
                  <div className="grid gap-8 lg:grid-cols-[0.16fr_0.84fr_1fr] lg:gap-12">
                    <div className="font-sans text-[0.68rem] font-semibold tracking-[0.28em] text-gold/70">
                      {program.index}
                    </div>

                    <div>
                      <h2 className="font-display text-3xl uppercase leading-none text-white sm:text-4xl">
                        {program.title}
                      </h2>
                      <p className="mt-5 font-sans text-base leading-7 text-silver">{program.summary}</p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <h3 className="font-sans text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-white/40">
                          {t("training.focus")}
                        </h3>
                        <ul className="mt-3 space-y-2">
                          {program.focus.map((f) => (
                            <li key={f} className="flex items-start gap-2 font-sans text-sm text-silver/85">
                              <span aria-hidden="true" className="mt-2 h-px w-2.5 shrink-0 bg-gold" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-sans text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-white/40">
                          {t("training.why")}
                        </h3>
                        <p className="mt-3 font-sans text-sm leading-6 text-silver/85">
                          {program.athleteBenefit}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-graphite/30 py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="02"
            eyebrow={t("training.formats.eyebrow")}
            title={t("training.formats.title")}
            intro={t("training.formats.intro")}
          />

          <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {formats.map((format, i) => (
              <Reveal key={format.slug} delay={i * 40}>
                <div className="flex h-full flex-col bg-ink p-7">
                  <h3 className="font-display text-2xl uppercase leading-none text-white">
                    {format.title}
                  </h3>
                  <p className="mt-4 flex-1 font-sans text-sm leading-6 text-silver/80">
                    {format.summary}
                  </p>
                  <p className="mt-6 border-t border-white/10 pt-4 font-sans text-[0.66rem] uppercase leading-5 tracking-[0.16em] text-gold/70">
                    {format.availability}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>{t("training.principles.eyebrow")}</Eyebrow>
            <div className="mt-8 space-y-8">
              {trainingPrinciples.map((p) => (
                <div key={p.title} className="border-l border-gold/40 pl-6">
                  <h2 className="font-display text-xl uppercase text-white">{p.title}</h2>
                  <p className="mt-2 font-sans text-sm leading-6 text-silver/85">{p.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Notice tone="draft" title={t("training.limits.title")}>
              <p>{t("training.limits.p1")}</p>
              <p className="mt-3">{t("training.limits.p2")}</p>
            </Notice>
            <Notice tone="info" title={t("training.pricing.title")}>
              <p>{t("training.pricing.body")}</p>
            </Notice>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href={lp("/start-training")} className="btn-primary">
                {t("home.hero.cta")}
              </Link>
              <Link href={lp("/performance-technology")} className="btn-ghost">
                {t("nav.technology")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
