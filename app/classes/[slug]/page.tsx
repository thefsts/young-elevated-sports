import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, Notice, PageHero, SectionHeading } from "@/components/ui";
import { classes, classStatusLabels, getClass } from "@/lib/content/classes";
import { media } from "@/lib/content/media";
import { pageMetadata } from "@/lib/seo";
import { getTranslator } from "@/lib/i18n/server";
import { LOCALE_LABELS, LOCALES, absoluteLocalized, localizedPath } from "@/lib/i18n/config";
import { site } from "@/lib/content/site";

export function generateStaticParams() {
  return classes.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cls = getClass(slug);
  if (!cls) return { title: "Class not found" };
  const base = pageMetadata({
    title: `${cls.title} — Training Class`,
    description: cls.summary,
    path: `/classes/${cls.slug}`,
    image: media[cls.image].srcMedium,
  });
  return {
    ...base,
    alternates: {
      canonical: `/classes/${cls.slug}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [
          LOCALE_LABELS[l].htmlLang,
          absoluteLocalized(site.url, l, `/classes/${cls.slug}`),
        ]),
      ),
    },
  };
}

const statusTone: Record<string, string> = {
  "coming-soon": "border-white/25 text-white/70",
  "interest-open": "border-gold/60 text-gold",
  "schedule-pending": "border-silver/40 text-silver",
  "enrollment-open": "border-emerald-400/60 text-emerald-300",
};

export default async function ClassDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cls = getClass(slug);
  if (!cls) notFound();

  const { t, locale } = await getTranslator();
  const lp = (p: string) => localizedPath(locale, p);
  const asset = media[cls.image];
  const related = classes.filter((c) => c.slug !== cls.slug && c.image === cls.image).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`${t("classes.eyebrow")} · ${cls.index}`}
        title={cls.title}
        intro={cls.summary}
        image={asset.srcMedium}
        imageAlt={asset.alt}
        actions={
          <>
            <Link href={`${lp("/classes/register")}?class=${cls.slug}`} className="btn-primary">
              {t("classes.cta")}
            </Link>
            <Link href={lp("/classes")} className="btn-ghost">
              {t("common.backTo")} {t("nav.classes")}
            </Link>
          </>
        }
        meta={
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full border bg-ink/85 px-4 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] ${statusTone[cls.status]}`}
            >
              {classStatusLabels[cls.status]}
            </span>
            <span className="rounded-full border border-white/20 px-4 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white/60">
              {t("classes.previewBadge")}
            </span>
          </div>
        }
      />

      <section className="py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <SectionHeading index="01" eyebrow={t("classes.focus")} title={cls.title} />
            <p className="mt-6 font-sans text-base leading-7 text-silver">{cls.description}</p>

            <h2 className="mt-10 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-gold">
              {t("classes.focus")}
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {cls.focus.map((f) => (
                <li key={f} className="flex items-start gap-2 font-sans text-sm text-silver/85">
                  <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-gold" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Notice tone="draft" title={t("legal.draft")}>
                {t("classes.intro")} {t("classes.notBooking")}
              </Notice>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-graphite/40 p-6">
              <Eyebrow>{t("classes.availability")}</Eyebrow>
              <dl className="mt-5 space-y-4 text-sm">
                <Row label={t("classes.level")} value={cls.level} />
                <Row label={t("classes.ageGroup")} value={cls.proposedAgeGroup} />
                <Row label={t("classes.format")} value={cls.proposedFormat} />
                <Row label={t("classes.duration")} value={cls.proposedDuration} />
                <Row label={t("classes.schedule")} value={t("classes.schedulePending")} muted />
                <Row label={t("classes.price")} value={t("classes.schedulePending")} muted />
              </dl>
              <Link href={`${lp("/classes/register")}?class=${cls.slug}`} className="btn-primary mt-6 w-full justify-center">
                {t("classes.cta")}
              </Link>
              <p className="mt-3 text-center text-[0.62rem] leading-relaxed text-white/40">
                {t("classes.notBooking")}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-white/10 py-16 lg:py-20">
          <div className="shell">
            <SectionHeading index="02" eyebrow={t("nav.classes")} title={t("classes.title")} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={lp(`/classes/${r.slug}`)}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-graphite/40 transition hover:border-gold/40"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={media[r.image].srcSmall}
                      alt={media[r.image].alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl uppercase text-white">{r.title}</h3>
                    <p className="mt-2 line-clamp-2 font-sans text-sm text-silver/80">{r.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
      <dt className="text-white/45">{label}</dt>
      <dd className={`text-right ${muted ? "text-white/50" : "text-silver"}`}>{value}</dd>
    </div>
  );
}
