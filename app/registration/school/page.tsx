import type { Metadata } from "next";
import { SchoolInquiryForm } from "@/components/SchoolInquiryForm";
import { Notice, PageHero, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { formats } from "@/lib/content/programs";

export const metadata: Metadata = pageMetadata({
  title: "School & Team Inquiry",
  description:
    "Inquire about school partnerships, team training blocks, and on-site performance sessions with Young & Elevated Sports Performance in Dallas–Fort Worth.",
  path: "/registration/school",
});

export default function SchoolInquiryPage() {
  return (
    <>
      <PageHero
        eyebrow="Registration · C"
        title={
          <>
            School, team
            <br />
            &amp; organization.
          </>
        }
        intro="A scoped inquiry for schools, athletic programs, and organizations exploring a performance partnership. This is an inquiry, not a services agreement."
      />

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div>
            <SectionHeading
              index="01"
              eyebrow="Partnership inquiry"
              title="Tell us about your program"
              intro="Share the sport, group size, facility, and timing. We will follow up to discuss scope and any required school or district agreements."
            />
            <div className="mt-10">
              <SchoolInquiryForm />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="border border-white/10 bg-graphite/60 p-6">
              <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
                Engagement formats
              </p>
              <ul className="mt-4 space-y-3">
                {formats.map((format) => (
                  <li key={format.title} className="font-sans text-sm leading-6 text-silver">
                    <span className="text-white">{format.title}</span>
                    <span className="block text-xs text-white/40">{format.availability}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Notice tone="info" title="No student health data">
              This inquiry form must not include student medical, injury, or health information.
              Individual medical disclosure happens only through the approved secure registration
              process, with guardian consent.
            </Notice>
            <Notice tone="locked" title="Agreements required">
              A school services agreement and applicable data terms are required before any on-site or
              team programming begins. Those documents are drafted and pending legal review.
            </Notice>
          </aside>
        </div>
      </section>
    </>
  );
}
