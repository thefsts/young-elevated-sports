import type { Metadata } from "next";
import Link from "next/link";
import { Notice, PageHero, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { waiverDocuments } from "@/lib/content/waivers";

export const metadata: Metadata = pageMetadata({
  title: "Policy Index",
  description:
    "Index of Young & Elevated Sports Performance policies: privacy, website terms, accessibility, waivers, cancellation, refunds, and participant conduct.",
  path: "/policies",
});

const policyGroups = [
  {
    t: "Website & data",
    items: [
      { label: "Privacy Policy", href: "/privacy", note: "How personal information is handled" },
      { label: "Website Terms", href: "/terms", note: "Conditions of using this site" },
      { label: "Accessibility Statement", href: "/accessibility", note: "Our WCAG 2.2 AA commitment" },
    ],
  },
  {
    t: "Participation",
    items: [
      { label: "Waiver & consent documents", href: "/waivers", note: "W01–W13, all drafts" },
      { label: "Code of conduct", href: "/waivers/code-of-conduct-athlete-safety", note: "W09 draft" },
      { label: "Concussion & return to training", href: "/waivers/concussion-return-to-training", note: "W10 draft" },
    ],
  },
  {
    t: "Commercial",
    items: [
      { label: "Cancellation & rescheduling", href: "/waivers/cancellation-rescheduling", note: "W04 draft" },
      { label: "Refund acknowledgment", href: "/waivers/refund-policy-acknowledgment", note: "W05 draft" },
      { label: "Insurance disclosure", href: "/waivers/insurance-disclosure-responsibility", note: "W06 draft" },
    ],
  },
];

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        eyebrow="Policies"
        title={
          <>
            The rules,
            <br />
            in one place.
          </>
        }
        intro="An index of the policies that govern this website and participation in Young & Elevated programs. Formal policy documents are drafts pending legal review."
      />

      <section className="py-20 lg:py-28">
        <div className="shell">
          <div className="mb-10">
            <Notice tone="draft" title="Draft status">
              Policy and waiver documents on this site are drafts. They are not final, not binding,
              and are published for review and transparency only. Formal adoption requires legal
              review.
            </Notice>
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            {policyGroups.map((group) => (
              <div key={group.t}>
                <SectionHeading index="" eyebrow={group.t} title={group.t} />
                <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
                  {group.items.map((item) => (
                    <li key={item.href} className="py-4">
                      <Link href={item.href} className="group block">
                        <span className="font-sans text-sm text-white group-hover:text-gold">{item.label}</span>
                        <span className="mt-1 block font-sans text-xs text-white/60">{item.note}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <SectionHeading
              index="04"
              eyebrow="Full document set"
              title="All waiver documents"
              intro="The complete W01–W13 inventory with signer, requirement level, and status."
            />
            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {waiverDocuments.map((waiver) => (
                <li key={waiver.id}>
                  <Link
                    href={`/waivers/${waiver.slug}`}
                    className="flex items-center justify-between border border-white/10 px-4 py-3 font-sans text-sm text-silver transition-colors hover:border-gold/40 hover:text-white"
                  >
                    <span>
                      <span className="mr-3 font-display text-gold">{waiver.id}</span>
                      {waiver.shortTitle}
                    </span>
                    <span className="text-gold">&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
