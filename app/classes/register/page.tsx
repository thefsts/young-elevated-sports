import type { Metadata } from "next";
import Link from "next/link";
import { ClassInterestForm } from "@/components/ClassInterestForm";
import { Eyebrow, Notice } from "@/components/ui";
import { classes } from "@/lib/content/classes";
import { pageMetadata } from "@/lib/seo";
import { getTranslator } from "@/lib/i18n/server";
import { LOCALE_LABELS, LOCALES, absoluteLocalized, localizedPath } from "@/lib/i18n/config";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Class Interest Request",
    description:
      "Request information about a proposed Young & Elevated Sports Performance training class in Dallas–Fort Worth. An interest request is not a confirmed booking or enrollment.",
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
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:px-10">
          <Eyebrow>{t("classes.eyebrow")}</Eyebrow>
          <h1 className="mt-4 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t("classes.register.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            {t("classes.register.intro")}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            {t("classes.notBooking")}
          </p>
        </div>
      </section>

      <section className="bg-graphite py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.6fr_1fr] lg:gap-14 lg:px-10">
          <div>
            <Notice title={t("legal.draft")}>
              <p>{t("classes.register.intro")}</p>
              <p className="mt-3">{t("registration.disabledBody")}</p>
            </Notice>
            <div className="mt-8">
              <ClassInterestForm initialClass={initialClass} />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <h2 className="font-display text-xl uppercase tracking-wide text-white">
                {t("classes.audience.label")}
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/65">
                <li>{t("classes.audience.adult")}</li>
                <li>{t("classes.audience.minor")}</li>
                <li>{t("classes.audience.school")}</li>
              </ul>
            </div>
            <div className="card p-6">
              <h2 className="font-display text-xl uppercase tracking-wide text-white">
                {t("classes.title")}
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-white/65">
                {classes.slice(0, 5).map((cls) => (
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
            <div className="card p-6">
              <h2 className="font-display text-xl uppercase tracking-wide text-white">
                {t("form.privacy")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {t("cookies.notInstalled")}
              </p>
              <Link
                href={lp("/privacy")}
                className="mt-4 inline-block text-sm text-gold underline decoration-gold/40 underline-offset-4"
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
