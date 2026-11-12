import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";
import { Eyebrow, Notice, PageHero, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/content/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Young & Elevated Sports Performance in Dallas–Fort Worth. Ask about training programs, athlete assessments, team training, or school partnerships.",
  path: "/contact",
});

const channels = [
  {
    t: "Training inquiry",
    b: "Ask about individual, small-group, or team training and what the next step looks like.",
    href: "/start-training",
    cta: "Start a training inquiry",
  },
  {
    t: "School or team",
    b: "Discuss a school partnership, team block, or on-site performance session.",
    href: "/registration/school",
    cta: "School / team inquiry",
  },
  {
    t: "Coach partnership",
    b: "Explore a coaching or trainer collaboration with Young & Elevated.",
    href: "/registration/partner",
    cta: "Partner inquiry",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&rsquo;s start
            <br />
            the conversation.
          </>
        }
        intro="Tell us about the athlete, the goal, and the timeline. We will follow up with next steps — no pressure, no automated sales sequence."
        image="/media/facility.jpg"
        imageAlt="Illustrative image: a dimly lit performance training facility with racks and turf."
      />

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <SectionHeading
              index="01"
              eyebrow="Send a message"
              title="Tell us what you need"
              intro="This form is for general questions only. Please do not include medical, injury, or health details — those are collected only through the secure registration process."
            />
            <div className="mt-10">
              <InquiryForm type="contact" submitLabel="Send message" messageLabel="Your message" />
            </div>
          </div>

          <aside className="space-y-10">
            <div>
              <Eyebrow>Direct channels</Eyebrow>
              <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
                {channels.map((channel) => (
                  <li key={channel.t} className="py-5">
                    <p className="font-display text-lg uppercase tracking-wide text-white">{channel.t}</p>
                    <p className="mt-1 font-sans text-sm leading-6 text-silver">{channel.b}</p>
                    <Link
                      href={channel.href}
                      className="mt-2 inline-block font-sans text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold hover:text-gold-bright"
                    >
                      {channel.cta} &rarr;
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-white/10 bg-graphite/60 p-6">
              <Eyebrow>Service area</Eyebrow>
              <p className="mt-3 font-display text-xl uppercase tracking-wide text-white">
                {site.contact.serviceArea}
              </p>
              <p className="mt-2 font-sans text-sm leading-6 text-silver">
                Training location, hours, and a direct phone line will be published once verified.
                Until then, the inquiry form is the confirmed contact channel.
              </p>
            </div>

            <Notice tone="info" title="Privacy note">
              Messages sent through this form are used only to respond to your inquiry. Do not send
              medical records, injury histories, or other sensitive health information here.
            </Notice>
          </aside>
        </div>
      </section>
    </>
  );
}
