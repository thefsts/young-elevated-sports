import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Notice, PageHero, SectionHeading } from "@/components/ui";
import { measurementPrinciples, technology } from "@/lib/content/technology";
import { pageCopy } from "@/lib/content/page-copy-es";
import { getTranslator } from "@/lib/i18n/server";
import { localizedPath } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Performance Technology",
  description:
    "Objective measurement in athletic development: velocity-based training, resisted movement, and vertical jump testing used to guide programming at Young & Elevated Sports Performance.",
  path: "/performance-technology",
});

export default async function TechnologyPage() {
  const { locale } = await getTranslator();
  const c = pageCopy(locale);
  const lp = (p: string) => localizedPath(locale, p);
  const copy = c?.technology;

  const principles = c
    ? c.principles.map((p, i) => ({ ...p, name: technology[i]?.name ?? "" }))
    : measurementPrinciples.map((p, i) => ({ ...p, name: technology[i]?.name ?? "" }));

  const items = technology.map((item, i) => {
    const es = c?.techItems[i];
    return {
      name: item.name,
      category: es?.category ?? item.category,
      role: es?.role ?? item.role,
      detail: es?.detail ?? item.detail,
      verification: es?.verification ?? item.verification,
    };
  });

  return (
    <>
      <PageHero
        eyebrow={copy?.eyebrow ?? "Technology · Measurement"}
        title={
          <>
            {copy?.titleLines[0] ?? "Measured."}
            <br />
            {copy?.titleLines[1] ?? "Not guessed."}
          </>
        }
        intro={
          copy?.intro ??
          "Objective data makes training visible. Velocity, jump output, and movement quality are recorded so programming is adjusted against evidence rather than assumption."
        }
        image="/media/technology.jpg"
        imageAlt={
          copy?.imageAlt ??
          "Illustrative image: training measurement equipment on a dark turf floor under gold lighting."
        }
      />

      <section className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="01"
            eyebrow={copy?.s1Eyebrow ?? "The role of measurement"}
            title={copy?.s1Title ?? "Why we test"}
            intro={
              copy?.s1Intro ??
              "Measurement is not a gimmick. It answers a simple question: is the training producing the change the athlete needs? Testing establishes a baseline, guides load, and shows trend over time."
            }
          />

          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((item, i) => (
              <Reveal key={item.title} delay={i * 50}>
                <div className="border-t border-white/15 pt-6">
                  <span className="font-sans text-[0.66rem] font-semibold tracking-[0.28em] text-gold">
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

      <section className="border-t border-white/10 bg-graphite/30 py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="02"
            eyebrow={copy?.s2Eyebrow ?? "Equipment"}
            title={copy?.s2Title ?? "Tools in the program"}
            intro={
              copy?.s2Intro ??
              "The following equipment is used in training. Descriptions are intentionally conservative; specific technical claims are withheld until verified with the manufacturer and client."
            }
          />

          <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2">
            {items.map((item, i) => (
              <Reveal key={item.name} delay={i * 50}>
                <article className="flex h-full flex-col bg-ink p-8">
                  <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-gold">
                    {item.category}
                  </p>
                  <h3 className="mt-4 font-display text-3xl uppercase leading-none text-white">
                    {item.name}
                  </h3>
                  <p className="mt-2 font-sans text-sm uppercase tracking-[0.14em] text-silver/60">
                    {item.role}
                  </p>
                  <p className="mt-5 flex-1 font-sans text-sm leading-6 text-silver/85">{item.detail}</p>
                  <p className="mt-6 border-t border-white/10 pt-4 font-sans text-[0.68rem] leading-5 text-white/60">
                    <span className="font-semibold uppercase tracking-[0.14em] text-white/65">
                      {copy?.verificationLabel ?? "Verification pending:"}
                    </span>{" "}
                    {item.verification}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 max-w-3xl">
            <Notice tone="info" title={copy?.noticeTitle ?? "No manufacturer endorsement implied"}>
              <p>
                {copy?.noticeBody ??
                  "Equipment names are used descriptively to identify the tools in the training program. Their inclusion does not imply a sponsorship, partnership, endorsement, or certification by the manufacturer. No manufacturer logos are displayed."}
              </p>
            </Notice>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[320px] lg:min-h-[520px]">
            <Image
              src="/media/technology.jpg"
              alt="Illustrative image: training measurement equipment on a dark turf floor."
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/50 to-transparent" />
          </div>
          <div className="flex items-center px-6 py-16 sm:px-12 lg:px-16">
            <div>
              <Eyebrow>{copy?.dataEyebrow ?? "Data with context"}</Eyebrow>
              <h2 className="display-md mt-5 text-white">
                {copy?.dataTitleLines[0] ?? "Numbers support coaching."}
                <br />
                {copy?.dataTitleLines[1] ?? "They do not replace it."}
              </h2>
              <p className="mt-5 max-w-lg font-sans text-base leading-7 text-silver">
                {copy?.dataBody ??
                  "A velocity reading or a jump measurement is one input. Technique, readiness, training history, and the athlete’s own feedback all shape the next session. Data is used to ask better questions — not to automate coaching."}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={lp("/start-training")} className="btn-primary">
                  {copy?.ctaPrimary ?? "Start Training"}
                </Link>
                <Link href={lp("/athletes")} className="btn-ghost">
                  {copy?.ctaSecondary ?? "Athlete Development"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
