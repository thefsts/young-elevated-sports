import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, GoldRule, Notice, PageHero, SectionHeading } from "@/components/ui";
import { bio } from "@/lib/content/bio";
import { pageCopy } from "@/lib/content/page-copy-es";
import { coachPortrait } from "@/lib/content/media";
import { getTranslator } from "@/lib/i18n/server";
import { localizedPath } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Meet Reggie Young",
  description:
    "Reggie Young is the founder of Young & Elevated Sports Performance in Dallas–Fort Worth — a former Division I football player and Certified Strength and Conditioning Specialist.",
  path: "/about",
});

export default async function AboutPage() {
  const { locale } = await getTranslator();
  const c = pageCopy(locale);
  const lp = (p: string) => localizedPath(locale, p);

  const copy = c?.about;
  const b = c?.bio;

  const intro = b?.intro ?? bio.intro;
  const mission = b?.mission ?? bio.mission;
  const paragraphs = b?.paragraphs ?? bio.paragraphs;
  const emphasis = b?.emphasis ?? bio.emphasis;
  const education = b?.education ?? bio.education;
  const certifications = b?.certifications ?? bio.certifications.map((x) => x.name);
  const accomplishments = b?.accomplishments ?? bio.accomplishments;
  const pending = b?.pendingVerification ?? bio.pendingVerification;

  return (
    <>
      <PageHero
        eyebrow={copy?.eyebrow ?? "About · Founder"}
        title={
          <>
            {copy?.titleLines[0] ?? "Meet"}
            <br />
            {copy?.titleLines[1] ?? "Reggie Young"}
          </>
        }
        intro={intro}
        image="/media/facility.jpg"
        imageAlt={
          copy?.imageAlt ??
          "Illustrative image: an empty indoor athletic training facility with turf and overhead lighting."
        }
        meta={
          <div className="flex flex-wrap gap-x-8 gap-y-3 font-sans text-[0.68rem] uppercase tracking-[0.2em] text-white/60">
            <span>{copy?.meta[0] ?? "Founder"}</span>
            <span className="text-gold">{copy?.meta[1] ?? "CSCS"}</span>
            <span>{copy?.meta[2] ?? "CPR & AED"}</span>
            <span>{bio.location}</span>
          </div>
        }
      />

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>{copy?.missionEyebrow ?? "The mission"}</Eyebrow>
              <p className="mt-6 font-display text-2xl uppercase leading-tight text-white sm:text-3xl">
                {mission}
              </p>
              <div className="mt-8 space-y-5 font-sans text-base leading-7 text-silver">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-16">
                <Eyebrow>{copy?.emphasisEyebrow ?? "Coaching emphasis"}</Eyebrow>
                <div className="mt-7 grid gap-px bg-white/10 sm:grid-cols-2">
                  {emphasis.map((item) => (
                    <div key={item.title} className="bg-ink p-6">
                      <h2 className="font-display text-lg uppercase text-white">{item.title}</h2>
                      <p className="mt-2 font-sans text-sm leading-6 text-silver/80">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <aside className="space-y-10">
            <div className="relative aspect-[4/5] overflow-hidden border border-white/10">
              <Image
                src={coachPortrait.src}
                alt={coachPortrait.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 font-sans text-[0.58rem] uppercase leading-4 tracking-[0.16em] text-gold/80">
                {coachPortrait.caption}
              </p>
            </div>

            <div className="border border-white/10 bg-graphite/50 p-6">
              <h2 className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-gold">
                {copy?.education ?? "Education"}
              </h2>
              <ul className="mt-5 space-y-4">
                {education.map((item) => (
                  <li key={item.credential}>
                    <p className="font-display text-lg uppercase text-white">{item.credential}</p>
                    <p className="font-sans text-sm text-silver/80">
                      {item.institution} · {item.year}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-white/10 bg-graphite/50 p-6">
              <h2 className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-gold">
                {copy?.certifications ?? "Certifications"}
              </h2>
              <ul className="mt-5 space-y-3">
                {certifications.map((name) => (
                  <li key={name} className="flex items-start gap-3 font-sans text-sm text-silver">
                    <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-gold" />
                    {name}
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-sans text-[0.7rem] leading-5 text-white/60">
                {copy?.certNote ??
                  "Certification badges and issuing-body logos are not displayed pending written permission and verification of current status."}
              </p>
            </div>

            <div className="border border-white/10 bg-graphite/50 p-6">
              <h2 className="font-sans text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-gold">
                {copy?.accomplishments ?? "Accomplishments"}
              </h2>
              <ul className="mt-5 space-y-3">
                {accomplishments.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-sm text-silver">
                    <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-white/10 bg-graphite/30 py-20">
        <div className="shell">
          <SectionHeading
            eyebrow={copy?.verificationEyebrow ?? "Verification status"}
            title={copy?.verificationTitle ?? "What we have not published"}
            intro={
              copy?.verificationIntro ??
              "The following details were not supplied or verified, so they are intentionally absent from this page rather than invented."
            }
          />
          <div className="mt-10 max-w-3xl">
            <Notice tone="info" title={copy?.pendingTitle ?? "Pending client verification"}>
              <ul className="mt-1 space-y-2">
                {pending.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </Notice>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <GoldRule />
            <h2 className="display-md mt-5 text-white">
              {copy?.ctaTitle ?? "Train with Coach Young."}
            </h2>
            <p className="mt-3 max-w-lg font-sans text-sm leading-6 text-silver">
              {copy?.ctaBody ??
                "Start with an inquiry. We will discuss the athlete, the sport, and the next step."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={lp("/start-training")} className="btn-primary">
              {copy?.ctaPrimary ?? "Start Training"}
            </Link>
            <Link href={lp("/training")} className="btn-ghost">
              {copy?.ctaSecondary ?? "Training Programs"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
