import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { Notice, PageHero, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Coach & Trainer Partnership",
  description:
    "Explore a coaching or trainer partnership with Young & Elevated Sports Performance in Dallas–Fort Worth.",
  path: "/registration/partner",
});

export default function PartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="Registration · D"
        title={
          <>
            Coach &amp;
            <br />
            trainer partnership.
          </>
        }
        intro="For coaches and trainers exploring a collaboration with Young & Elevated. This is a partnership inquiry, not an employment application or a confirmed agreement."
      />

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div>
            <SectionHeading
              index="01"
              eyebrow="Partnership inquiry"
              title="Start a conversation"
              intro="Tell us about your background, the athletes or teams you work with, and what a collaboration might look like."
            />
            <div className="mt-10">
              <InquiryForm
                type="partner"
                submitLabel="Send partnership inquiry"
                messageLabel="About the partnership"
                messagePlaceholder="Describe your coaching background, the athletes or teams you work with, and the collaboration you have in mind."
              />
            </div>
          </div>

          <aside className="space-y-6">
            <Notice tone="info" title="Not an offer">
              Submitting this inquiry does not create a partnership, employment relationship, or
              contract. Any collaboration would require separate written agreement and review.
            </Notice>
            <Notice tone="locked" title="Safeguarding">
              Anyone working with minor athletes would be subject to background screening, safeguarding
              requirements, and applicable Texas and federal obligations before any involvement.
            </Notice>
          </aside>
        </div>
      </section>
    </>
  );
}
