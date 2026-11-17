import type { Metadata } from "next";
import Link from "next/link";
import { ClassRegistrationForm } from "@/components/ClassRegistrationForm";
import { Eyebrow } from "@/components/ui";
import { classes, pricingPolicy } from "@/lib/content/classes";
import { pageMetadata } from "@/lib/seo";
import { getTranslator } from "@/lib/i18n/server";
import { LOCALE_LABELS, LOCALES, absoluteLocalized, localizedPath } from "@/lib/i18n/config";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Athlete Registration, Intake & Waiver",
    description:
      "Seven-step athlete intake, class and package selection, training objectives, medical disclosures and combined waiver for Young & Elevated Sports Performance in Dallas–Fort Worth. Submission, payment and signature capture are disabled pending approval.",
    path: "/classes/register",
  }),
  alternates: {
    canonical: "/classes/register",
    languages: Object.fromEntries(
      LOCALES.map((l) => [
        LOCALE_LABELS[l].htmlLang,
        absoluteLocalized(site.url, l, "/classes/register"),
      ]),
    ),
  },
  robots: { index: false, follow: true },
};

export default async function ClassRegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ class?: string }>;
}) {
  const { t, locale } = await getTranslator();
  const lp = (p: string) => localizedPath(locale, p);
  const params = await searchParams;
  const requested = typeof params.class === "string" ? params.class : "";
  const initialClass = classes.some((c) => c.slug === requested) ? requested : "";

  return (
    <>
      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-32 lg:px-10">
          <Eyebrow>{t("classes.eyebrow")}</Eyebrow>
          <h1 className="mt-4 max-w-4xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Athlete Registration
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            Seven steps: athlete details, guardian and emergency contact, class and package selection,
            training objectives, medical disclosures, combined waivers, then review and signature.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {t("classes.notBooking")}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              {pricingPolicy.sessionLength}-minute sessions
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Submission disabled
            </span>
          </div>
        </div>
      </section>

      <section className="bg-graphite py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 lg:px-10">
          <div className="min-w-0">
            <ClassRegistrationForm initialClass={initialClass} />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-5">
              <h2 className="font-display text-lg uppercase tracking-wide text-white">Before you start</h2>
              <ul className="mt-3 space-y-2.5 font-sans text-[0.8rem] leading-6 text-white/60">
                <li>— All seven steps are required before a registration can be signed.</li>
                <li>— A parent or legal guardian must sign for any athlete under 18.</li>
                <li>— Athletes 13 or older also sign the intake.</li>
                <li>— Medical questions are asked once, on step 5, and are never sent to a general inquiry inbox.</li>
              </ul>
            </div>

            <div className="card p-5">
              <h2 className="font-display text-lg uppercase tracking-wide text-white">What is disabled</h2>
              <ul className="mt-3 space-y-2.5 font-sans text-[0.8rem] leading-6 text-white/60">
                <li>— Submission: no approved secure intake endpoint yet.</li>
                <li>— Payment: online payment is not enabled on this site.</li>
                <li>— Signature capture: waiver texts are still in legal review.</li>
              </ul>
              <p className="mt-3 border-t border-white/10 pt-3 font-sans text-[0.75rem] leading-5 text-gold/80">
                Nothing entered in this form is transmitted, stored or logged.
              </p>
            </div>

            <div className="card p-5">
              <h2 className="font-display text-lg uppercase tracking-wide text-white">{t("classes.title")}</h2>
              <ul className="mt-3 space-y-2 font-sans text-[0.8rem] text-white/65">
                {classes.map((cls) => (
                  <li key={cls.slug}>
                    <Link
                      href={`${lp("/classes")}/${cls.slug}`}
                      className="text-white/75 underline decoration-white/25 underline-offset-4 transition hover:text-gold"
                    >
                      {cls.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={lp("/classes")}
                    className="text-gold underline decoration-gold/40 underline-offset-4"
                  >
                    {t("common.viewAll")}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="card p-5">
              <h2 className="font-display text-lg uppercase tracking-wide text-white">{t("form.privacy")}</h2>
              <p className="mt-2 font-sans text-[0.78rem] leading-6 text-white/60">
                {t("cookies.notInstalled")}
              </p>
              <Link
                href={lp("/privacy")}
                className="mt-3 inline-block font-sans text-sm text-gold underline decoration-gold/40 underline-offset-4"
              >
                {t("footer.privacy")}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
