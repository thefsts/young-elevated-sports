import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { waiverDocuments, getWaiver } from "@/lib/content/waivers";
import { getTranslator } from "@/lib/i18n/server";
import { localizedPath } from "@/lib/i18n/config";

export function generateStaticParams() {
  return waiverDocuments.map((waiver) => ({ slug: waiver.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const waiver = getWaiver(slug);
  if (!waiver) return pageMetadata({ title: "Waiver not found", description: "Document not found.", path: "/waivers" });
  return pageMetadata({
    title: `${waiver.id} · ${waiver.shortTitle}`,
    description: `${waiver.purpose} Status: ${waiver.status}.`,
    path: `/waivers/${waiver.slug}`,
  });
}

export default async function WaiverDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const waiver = getWaiver(slug);
  if (!waiver) notFound();
  const { t, locale } = await getTranslator();
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <article className="bg-ink">
      <div className="shell max-w-4xl py-16 lg:py-24">
        <Link
          href={lp("/waivers")}
          className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-gold hover:text-gold-bright"
        >
          &larr; All waiver documents
        </Link>

        <div className="mt-8 border border-gold/40 bg-gold/[0.06] px-5 py-4">
          <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-gold">
            {waiver.status}
          </p>
          <p className="mt-2 font-sans text-sm leading-6 text-silver">
            This is a draft template prepared for legal review. It is not binding, not legal advice,
            and must not be signed or relied upon until approved by qualified Texas counsel.
          </p>
        </div>

        {locale !== "en" ? (
          <div
            lang="es"
            className="mt-4 border border-white/20 bg-white/[0.04] px-5 py-4"
            role="note"
            aria-label={t("legal.englishAuthoritative")}
          >
            <p className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-white/70">
              {t("legal.englishAuthoritative")}
            </p>
            <p className="mt-2 font-sans text-sm leading-6 text-silver">
              {t("legal.spanishNotice")}
            </p>
            <p className="mt-2 font-sans text-sm font-semibold leading-6 text-gold">
              {t("legal.signatureDisabled")}
            </p>
          </div>
        ) : null}

        <header className="mt-10 border-b border-white/10 pb-8">
          <p className="font-display text-lg text-gold">{waiver.id}</p>
          <h1 className="mt-2 font-display text-3xl uppercase leading-tight tracking-wide text-white sm:text-4xl">
            {waiver.title}
          </h1>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              ["Document ID", waiver.id],
              ["Version", waiver.version],
              ["Effective date", waiver.effectiveDate ?? "Not set — pending approval"],
              ["Intended signer", waiver.signer],
              ["Requirement", waiver.requirement],
              ["Status", waiver.status],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-sans text-[0.6rem] uppercase tracking-[0.18em] text-white/60">{label}</dt>
                <dd className="mt-1 font-sans text-sm text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="mt-8">
          <p className="font-sans text-sm leading-7 text-silver">{waiver.purpose}</p>
        </div>

        <div className="prose-brand mt-10">
          {waiver.sections.map((section) => (
            <section key={section.heading} className="mt-8">
              <h2 className="font-display text-xl uppercase tracking-wide text-white">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-3 font-sans text-sm leading-7 text-silver">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 font-sans text-sm leading-6 text-silver">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <section className="mt-12 border-t border-white/10 pt-8">
          <h2 className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-gold">
            Legal review notes
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-sm leading-6 text-silver">
            {waiver.reviewNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href={lp("/waivers")} className="btn-ghost">
            Back to inventory
          </Link>
          <Link href={lp("/policies")} className="btn-ghost">
            Policy index
          </Link>
        </div>
      </div>
    </article>
  );
}
