import type { Metadata } from "next";
import { AthleteRegistrationForm } from "@/components/AthleteRegistrationForm";
import { Notice, PageHero, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Athlete Registration",
  description:
    "Athlete registration preview for Young & Elevated Sports Performance. The complete intake form is shown; submission is disabled pending secure-storage and legal approval.",
  path: "/registration/athlete",
});

export default function AthleteRegistrationPage() {
  return (
    <>
      <PageHero
        eyebrow="Registration · A"
        title={
          <>
            Individual
            <br />
            athlete.
          </>
        }
        intro="The complete athlete intake, preserved from the original registration form. This preview does not store or transmit any data, and final submission is disabled."
      />

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div>
            <SectionHeading
              index="01"
              eyebrow="Athlete intake"
              title="Registration preview"
              intro="Three steps: athlete details, guardian and medical information, then review and signature. Nothing you type here is saved."
            />
            <div className="mt-10">
              <AthleteRegistrationForm />
            </div>
          </div>

          <aside className="space-y-6">
            <Notice tone="locked" title="Submission disabled">
              This form is a complete front-end preview. It is intentionally not connected to any
              storage or email system. Do not enter real medical information.
            </Notice>
            <Notice tone="info" title="Guardian-led">
              For athletes under 18, a parent or legal guardian completes and signs registration.
              Athlete signature is collected where appropriate.
            </Notice>
            <Notice tone="draft" title="Waivers required">
              Registration is not complete until the required waiver documents (W01&ndash;W13) are
              reviewed, signed, and versioned. All waivers are currently marked DRAFT — LEGAL REVIEW
              REQUIRED.
            </Notice>
          </aside>
        </div>
      </section>
    </>
  );
}
