import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState, Eyebrow, Notice, PageHero, SectionHeading } from "@/components/ui";
import { pageCopy } from "@/lib/content/page-copy-es";
import { getTranslator } from "@/lib/i18n/server";
import { localizedPath } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Athlete Results",
  description:
    "How Young & Elevated Sports Performance records and reports athlete results — with consent, consistent testing protocols, and honest reporting.",
  path: "/results",
});

const standardsEn = [
  {
    t: "Consent before publication",
    b: "No athlete name, photograph, or result is published without documented permission from the athlete or, for a minor, a parent or legal guardian.",
  },
  {
    t: "Consistent protocol",
    b: "Results are only comparable when the test protocol is the same. Published results will state the measurement method and testing conditions.",
  },
  {
    t: "Recorded, not rounded up",
    b: "Results are reported as measured. No result is adjusted for marketing effect, and no improvement is implied where none was recorded.",
  },
  {
    t: "Context included",
    b: "A number without context is misleading. Published results will note the training period, starting point, and any relevant limitation.",
  },
];

export default async function ResultsPage() {
  const { locale } = await getTranslator();
  const c = pageCopy(locale);
  const lp = (p: string) => localizedPath(locale, p);
  const copy = c?.results;
  const standards = c?.reportingStandards ?? standardsEn;

  return (
    <>
      <PageHero
        eyebrow={copy?.eyebrow ?? "Results · Reporting"}
        title={
          <>
            {copy?.titleLines[0] ?? "Real results."}
            <br />
            {copy?.titleLines[1] ?? "Real context."}
          </>
        }
        intro={
          copy?.intro ??
          "Athlete results will be published here as they are verified and consented to. This page explains the standard we hold before any number appears."
        }
        image="/media/hero-track.jpg"
        imageAlt={
          copy?.imageAlt ??
          "Illustrative image: a lone athlete silhouette sprinting on a floodlit track at night."
        }
      />

      <section className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="01"
            eyebrow={copy?.s1Eyebrow ?? "Current status"}
            title={copy?.s1Title ?? "No verified results published yet"}
            intro={
              copy?.s1Intro ??
              "Batch 001 establishes the reporting standard and the page structure. Athlete results require documented consent and verified measurement data before publication."
            }
          />

          <div className="mt-12">
            <EmptyState
              title={copy?.emptyTitle ?? "Results pending verification"}
              action={
                <Link href={lp("/start-training")} className="btn-primary">
                  {copy?.emptyCta ?? "Start Training"}
                </Link>
              }
            >
              <p>
                {copy?.emptyBody1 ??
                  "We have not published athlete results because no result set has been supplied with documented consent and a verified testing protocol. When that information is approved, results will appear here — with the athlete’s permission and the measurement method stated."}
              </p>
              <p className="mt-4">
                {copy?.emptyBody2 ??
                  "No testimonial, statistic, or improvement claim on this site is invented. That is a deliberate standard, not an omission."}
              </p>
            </EmptyState>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-graphite/30 py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="02"
            eyebrow={copy?.s2Eyebrow ?? "Reporting standard"}
            title={copy?.s2Title ?? "What must be true before a result is published"}
          />

          <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2">
            {standards.map((item, i) => (
              <div key={item.t} className="bg-ink p-8">
                <span className="font-sans text-[0.66rem] font-semibold tracking-[0.28em] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl uppercase text-white">{item.t}</h3>
                <p className="mt-3 font-sans text-sm leading-6 text-silver/85">{item.b}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-3xl space-y-6">
            <Notice tone="info" title={copy?.includeTitle ?? "What results will include"}>
              <p>
                {copy?.includeBody ??
                  "A published result will identify the test (for example, vertical jump or a sprint distance), the measurement method, the testing date or period, and the athlete’s starting point. Where a result is specific to one athlete, it will be presented as that athlete’s recorded outcome — not as a typical or guaranteed outcome for others."}
              </p>
            </Notice>
            <Notice tone="draft" title={copy?.guaranteeTitle ?? "No performance guarantees"}>
              <p>
                {copy?.guaranteeBody ??
                  "Training outcomes vary with training history, consistency, sport demands, growth, and other factors outside a coach’s control. Nothing on this page should be read as a promise of improvement, injury prevention, scholarship, recruiting outcome, or professional contract."}
              </p>
            </Notice>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Eyebrow>{copy?.nextEyebrow ?? "Next step"}</Eyebrow>
            <h2 className="display-md mt-4 text-white">
              {copy?.nextTitle ?? "Start with a baseline."}
            </h2>
            <p className="mt-3 max-w-lg font-sans text-sm leading-6 text-silver">
              {copy?.nextBody ??
                "Measurement begins with an assessment. Inquire to discuss the athlete and the appropriate starting point."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={lp("/start-training")} className="btn-primary">
              {copy?.ctaPrimary ?? "Start Training"}
            </Link>
            <Link href={lp("/performance-technology")} className="btn-ghost">
              {copy?.ctaSecondary ?? "Technology"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
