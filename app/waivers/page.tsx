import type { Metadata } from "next";
import Link from "next/link";
import { Notice, PageHero, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { waiverDocuments } from "@/lib/content/waivers";

export const metadata: Metadata = pageMetadata({
  title: "Waivers & Participant Documents",
  description:
    "The thirteen participant waiver and consent documents prepared for Young & Elevated Sports Performance. All are drafts pending legal review.",
  path: "/waivers",
});

export default function WaiversPage() {
  return (
    <>
      <PageHero
        eyebrow="Waivers · W01–W13"
        title={
          <>
            Participant
            <br />
            documents.
          </>
        }
        intro="Thirteen waiver and consent documents are prepared as drafts. Every document is labeled DRAFT — LEGAL REVIEW REQUIRED and is not binding until approved by counsel."
      />

      <section className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="01"
            eyebrow="Document set"
            title="What is drafted"
            intro="Each document carries a unique ID, version, signer, requirement level, and legal-review status. Effective dates are intentionally blank until approval."
          />

          <div className="mt-8">
            <Notice tone="draft" title="DRAFT — LEGAL REVIEW REQUIRED">
              These documents are templates prepared for review. They are not legal advice, are not
              enforceable as published, and must be reviewed by qualified Texas counsel before use.
              No enforceability is claimed.
            </Notice>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[52rem] border-collapse text-left">
              <caption className="sr-only">Waiver document inventory</caption>
              <thead>
                <tr className="border-b border-white/15">
                  {["ID", "Document", "Signer", "Requirement", "Status", ""].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-4 py-3 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/50"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {waiverDocuments.map((waiver) => (
                  <tr key={waiver.id} className="border-b border-white/10 align-top">
                    <td className="px-4 py-4 font-display text-lg text-gold">{waiver.id}</td>
                    <td className="px-4 py-4">
                      <span className="block font-sans text-sm text-white">{waiver.title}</span>
                      <span className="mt-1 block font-sans text-xs text-white/40">v{waiver.version}</span>
                    </td>
                    <td className="px-4 py-4 font-sans text-xs leading-5 text-silver">{waiver.signer}</td>
                    <td className="px-4 py-4 font-sans text-xs text-silver">{waiver.requirement}</td>
                    <td className="px-4 py-4">
                      <span className="inline-block border border-gold/40 px-2 py-1 font-sans text-[0.58rem] uppercase tracking-[0.14em] text-gold">
                        Draft
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        href={`/waivers/${waiver.slug}`}
                        className="font-sans text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-gold hover:text-gold-bright"
                      >
                        View &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Notice tone="info" title="How signatures will work">
              Signatures will be captured with document version, effective date, signer identity,
              timestamp, and an audit record. Electronic signature consent is itself a separate
              document (W13).
            </Notice>
            <Notice tone="locked" title="Not yet in use">
              No waiver can be signed or accepted through this site yet. Signature capture remains
              disabled until the legal review and secure records process are approved.
            </Notice>
          </div>
        </div>
      </section>
    </>
  );
}
