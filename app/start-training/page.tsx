import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";
import { Eyebrow, Notice, PageHero, SectionHeading, StatStrip } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { programs } from "@/lib/content/programs";

export const metadata: Metadata = pageMetadata({
  title: "Start Training",
  description:
    "Start training with Young & Elevated Sports Performance in Dallas–Fort Worth. Tell us about the athlete and goals to begin a training inquiry.",
  path: "/start-training",
});

const steps = [
  {
    n: "01",
    t: "Send the inquiry",
    b: "Share the athlete's age, sport, and training goals. No medical details are needed at this stage.",
  },
  {
    n: "02",
    t: "Talk through fit",
    b: "We discuss the athlete's starting point, the right program, and realistic expectations — no guarantees.",
  },
  {
    n: "03",
    t: "Complete registration",
    b: "Guardian-led registration, required waivers, and consent are completed before any training begins.",
  },
  {
    n: "04",
    t: "Begin the work",
    b: "Training starts with a baseline assessment so progress is measured against a real starting point.",
  },
];

export default function StartTrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Start Training"
        title={
          <>
            Build winning habits.
            <br />
            Reach your next level.
          </>
        }
        intro="Elite athletic development built on speed, strength, discipline, and measurable performance. Train with purpose. Compete with confidence."
        image="/media/hero-track.jpg"
        imageAlt="Illustrative image: an athlete sprinting on a floodlit track at night."
        meta={
          <StatStrip
            items={[
              { value: "D1", label: "Founder playing background" },
              { value: "CSCS", label: "Strength & conditioning" },
              { value: "8", label: "Training disciplines" },
              { value: "DFW", label: "Dallas–Fort Worth" },
            ]}
          />
        }
      />

      <section className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="01"
            eyebrow="The process"
            title="Four steps, no pressure"
            intro="Every athlete begins with a conversation. Registration and consent come before training — especially for athletes under 18."
          />
          <ol className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.n} className="bg-ink p-7">
                <span className="font-display text-3xl leading-none text-gold-bright">{step.n}</span>
                <p className="mt-4 font-display text-lg uppercase tracking-wide text-white">{step.t}</p>
                <p className="mt-2 font-sans text-sm leading-6 text-silver">{step.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-white/10 bg-graphite/40 py-20 lg:py-28">
        <div className="shell grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading
              index="02"
              eyebrow="Training inquiry"
              title="Tell us about the athlete"
              intro="This is a training inquiry, not a confirmed booking. We will respond to discuss fit, availability, and next steps."
            />
            <div className="mt-10">
              <InquiryForm
                type="training"
                submitLabel="Send training inquiry"
                messageLabel="Training goals"
                messagePlaceholder="What is the athlete working toward? Include sport, position, and timeline — but please no medical or injury details."
              />
            </div>
          </div>

          <aside className="space-y-8">
            <div>
              <Eyebrow>Programs</Eyebrow>
              <ul className="mt-4 grid gap-2">
                {programs.map((program) => (
                  <li key={program.slug}>
                    <Link
                      href={`/training#${program.slug}`}
                      className="flex items-center justify-between border border-white/10 px-4 py-3 font-sans text-sm text-silver transition-colors hover:border-gold/40 hover:text-white"
                    >
                      <span>{program.title}</span>
                      <span className="text-gold">&rarr;</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Notice tone="locked" title="Before training begins">
              Athletes under 18 register with a parent or legal guardian. Required waivers, medical
              disclosure, and emergency authorization must be completed and approved before the first
              session. Pricing and schedules are confirmed directly on inquiry.
            </Notice>

            <Notice tone="info" title="No medical advice">
              Young &amp; Elevated provides athletic performance training. We do not provide medical
              diagnosis, treatment, or physical therapy, and we do not guarantee any specific result.
            </Notice>
          </aside>
        </div>
      </section>
    </>
  );
}
