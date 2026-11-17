import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, Notice, PageHero, SectionHeading } from "@/components/ui";
import { pageCopy } from "@/lib/content/page-copy-es";
import { getTranslator } from "@/lib/i18n/server";
import { localizedPath } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Athlete Development",
  description:
    "Long-term athletic development for youth, middle school, high school, and college-preparatory athletes in Dallas–Fort Worth — built on habits, resilience, and measured progress.",
  path: "/athletes",
});

const stagesEn = [
  {
    label: "Foundation",
    ages: "Youth athletes",
    title: "Movement first",
    body: "Coordination, body control, and confidence. Sessions introduce sprinting, jumping, and basic strength positions with an emphasis on play, safety, and technique.",
    focus: ["Movement literacy", "Body control", "Speed fundamentals", "Confidence"],
  },
  {
    label: "Development",
    ages: "Middle school",
    title: "Building capacity",
    body: "Structured speed and strength work with a growing emphasis on consistency. Athletes learn how to warm up, train, and recover with intent.",
    focus: ["Sprint mechanics", "Strength positions", "Work capacity", "Training habits"],
  },
  {
    label: "Performance",
    ages: "High school",
    title: "Competing at speed",
    body: "Programming aligned to the competitive season, with measurable speed, power, and strength targets. Emphasis on resilience and repeatable performance.",
    focus: ["Acceleration", "Power development", "Strength", "Season management"],
  },
  {
    label: "Next level",
    ages: "College preparation",
    title: "Preparing for the jump",
    body: "Physical preparation for the demands of collegiate sport, including training density, recovery, and the standards athletes will meet at the next level.",
    focus: ["Training density", "Physical standards", "Recovery", "Competitive readiness"],
  },
];

const learnEn = [
  {
    t: "How to prepare",
    b: "A warm-up is not a formality. Athletes learn a repeatable preparation routine they can use in any setting.",
  },
  {
    t: "How to train",
    b: "Intent, tempo, rest, and technique are coached explicitly. Athletes understand what quality work looks like.",
  },
  {
    t: "How to recover",
    b: "Sleep, nutrition basics, and load management are discussed as part of performance — not as an afterthought.",
  },
  {
    t: "How to compete",
    b: "Training includes moments of pressure and measurement so athletes practise performing, not just exercising.",
  },
];

export default async function AthletesPage() {
  const { locale } = await getTranslator();
  const c = pageCopy(locale);
  const lp = (p: string) => localizedPath(locale, p);
  const copy = c?.athletes;
  const stages = c?.stages ?? stagesEn;
  const learn = c?.learn ?? learnEn;

  return (
    <>
      <PageHero
        eyebrow={copy?.eyebrow ?? "Athletes · Development"}
        title={
          <>
            {copy?.titleLines[0] ?? "The long game"}
            <br />
            {copy?.titleLines[1] ?? "of development."}
          </>
        }
        intro={
          copy?.intro ??
          "Athletes are not finished products. Development is a progression — built stage by stage, with the athlete's age, training history, and sport shaping the work."
        }
        image="/media/facility.jpg"
        imageAlt={
          copy?.imageAlt ??
          "Illustrative image: an empty indoor training facility with turf and overhead lighting."
        }
        actions={
          <>
            <Link href={lp("/start-training")} className="btn-primary">
              {copy?.ctaPrimary ?? "Start Training"}
            </Link>
            <Link href={lp("/results")} className="btn-ghost">
              {copy?.ctaSecondary ?? "Athlete Results"}
            </Link>
          </>
        }
      />

      <section className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="01"
            eyebrow={copy?.s1Eyebrow ?? "Pathway"}
            title={copy?.s1Title ?? "Stages, not shortcuts"}
            intro={
              copy?.s1Intro ??
              "Each stage has a different priority. The goal is not to rush an athlete into advanced work — it is to build the qualities that make advanced work productive later."
            }
          />

          <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2">
            {stages.map((stage, i) => (
              <Reveal key={stage.label} delay={i * 50}>
                <article className="h-full bg-ink p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-gold">
                      {stage.label}
                    </span>
                    <span className="font-sans text-[0.62rem] uppercase tracking-[0.18em] text-white/60">
                      {stage.ages}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-3xl uppercase leading-none text-white">
                    {stage.title}
                  </h2>
                  <p className="mt-4 font-sans text-sm leading-6 text-silver/85">{stage.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {stage.focus.map((f) => (
                      <li
                        key={f}
                        className="border border-white/10 px-3 py-1.5 font-sans text-[0.62rem] uppercase tracking-[0.14em] text-silver/70"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-graphite/30 py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow>{copy?.learnEyebrow ?? "What athletes learn"}</Eyebrow>
            <h2 className="display-md mt-5 text-white">
              {copy?.learnTitleLines[0] ?? "Habits travel"}
              <br />
              {copy?.learnTitleLines[1] ?? "further than talent."}
            </h2>
          </div>
          <div className="space-y-8">
            {learn.map((item) => (
              <div key={item.t} className="border-l border-gold/40 pl-6">
                <h3 className="font-display text-xl uppercase text-white">{item.t}</h3>
                <p className="mt-2 font-sans text-sm leading-6 text-silver/85">{item.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="shell max-w-4xl">
          <Notice tone="draft" title={copy?.guardianTitle ?? "Guardian-led for minors"}>
            <p>
              {copy?.guardianBody ??
                "Registration for athletes under 18 is designed to be completed with a parent or legal guardian. Guardian consent, medical disclosure, and waiver acknowledgment are part of the registration process. Sensitive submissions are not enabled until a secure, approved record-keeping workflow is in place."}
            </p>
          </Notice>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={lp("/registration")} className="btn-primary">
              {copy?.regCta ?? "Registration Options"}
            </Link>
            <Link href={lp("/waivers")} className="btn-ghost">
              {copy?.waiverCta ?? "Waiver Information"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
