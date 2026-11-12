import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Notice, PageHero, SectionHeading } from "@/components/ui";
import { ClassScheduleExplorer } from "@/components/ClassScheduleExplorer";
import { classes, classStatusLabels } from "@/lib/content/classes";
import { media } from "@/lib/content/media";
import { pageMetadata } from "@/lib/seo";
import { getTranslator } from "@/lib/i18n/server";
import { LOCALE_LABELS, LOCALES, absoluteLocalized, localizedPath } from "@/lib/i18n/config";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Training Classes",
    description:
      "Proposed training class categories for Young & Elevated Sports Performance in Dallas–Fort Worth — speed, strength, agility, power, vertical jump, sport-specific, youth, small-group, and team training.",
    path: "/classes",
  }),
  alternates: {
    canonical: "/classes",
    languages: Object.fromEntries(
      LOCALES.map((l) => [LOCALE_LABELS[l].htmlLang, absoluteLocalized(site.url, l, "/classes")]),
    ),
  },
};

const statusTone: Record<string, string> = {
  "coming-soon": "border-white/25 text-white/70",
  "interest-open": "border-gold/60 text-gold",
  "schedule-pending": "border-silver/40 text-silver",
  "enrollment-open": "border-emerald-400/60 text-emerald-300",
};

export default async function ClassesPage() {
  const { t, locale } = await getTranslator();
  const lp = (p: string) => localizedPath(locale, p);

  return (
    <>
      <PageHero
        eyebrow={t("classes.eyebrow")}
        title={t("classes.title")}
        intro={t("classes.intro")}
        image="/media/group-sessions.jpg"
        imageAlt={media["group-sessions"].alt}
        actions={
          <>
            <Link href={lp("/classes/register")} className="btn-primary">
              {t("classes.cta")}
            </Link>
            <Link href={lp("/training")} className="btn-ghost">
              {t("nav.training")}
            </Link>
          </>
        }
      />

      <section className="py-16 lg:py-24">
        <div className="shell">
          <Notice tone="draft" title={t("legal.draft")}>
            {t("classes.intro")}
          </Notice>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {classes.map((cls, i) => {
              const asset = media[cls.image];
              return (
                <Reveal key={cls.slug} delay={i * 30}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-graphite/40 transition hover:border-gold/40">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={asset.srcMedium}
                        alt={asset.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        loading={i < 3 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                      <span
                        className={`absolute left-3 top-3 rounded-full border bg-ink/85 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] ${statusTone[cls.status]}`}
                      >
                        {classStatusLabels[cls.status]}
                      </span>
                      <span className="absolute right-3 top-3 font-sans text-[0.65rem] font-semibold tracking-[0.24em] text-white/60">
                        {cls.index}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="font-display text-2xl uppercase leading-none text-white">{cls.title}</h2>
                      <p className="mt-3 flex-1 font-sans text-sm leading-6 text-silver/85">{cls.summary}</p>

                      <dl className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs">
                        <div className="flex justify-between gap-3">
                          <dt className="text-white/40">{t("classes.level")}</dt>
                          <dd className="text-right text-silver">{cls.level}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-white/40">{t("classes.ageGroup")}</dt>
                          <dd className="text-right text-silver">{cls.proposedAgeGroup}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-white/40">{t("classes.price")}</dt>
                          <dd className="text-right text-white/50">{t("classes.schedulePending")}</dd>
                        </div>
                      </dl>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <Link
                          href={lp(`/classes/${cls.slug}`)}
                          className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold hover:text-gold-bright"
                        >
                          {t("common.learnMore")} →
                        </Link>
                        <Link
                          href={`${lp("/classes/register")}?class=${cls.slug}`}
                          className="rounded-full border border-white/20 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white hover:border-gold hover:text-gold"
                        >
                          {t("classes.cta")}
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-16 lg:py-24">
        <div className="shell">
          <SectionHeading
            index="02"
            eyebrow={t("classes.scheduleTitle")}
            title={t("classes.scheduleTitle")}
            intro={t("classes.scheduleIntro")}
          />
          <div className="mt-10">
            <ClassScheduleExplorer />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-16 lg:py-20">
        <div className="shell flex flex-col items-start justify-between gap-6 rounded-2xl border border-gold/30 bg-gold/[0.05] p-8 sm:flex-row sm:items-center">
          <div>
            <Eyebrow>{t("classes.register.title")}</Eyebrow>
            <p className="mt-3 max-w-xl font-sans text-sm leading-6 text-silver">
              {t("classes.register.intro")} {t("classes.notBooking")}
            </p>
          </div>
          <Link href={lp("/classes/register")} className="btn-primary shrink-0">
            {t("classes.cta")}
          </Link>
        </div>
      </section>
    </>
  );
}
