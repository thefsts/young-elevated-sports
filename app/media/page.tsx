import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Notice, PageHero, SectionHeading } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Training Gallery",
  description:
    "A visual look at the training environment for Young & Elevated Sports Performance in Dallas–Fort Worth.",
  path: "/media",
});

const gallery = [
  {
    src: "/media/hero-track.jpg",
    alt: "Illustrative image: a lone athlete silhouette sprinting on a floodlit track at night.",
    caption: "Speed work",
    meta: "Track · Night session",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/media/barbell.jpg",
    alt: "Illustrative image: a loaded barbell on a rubber gym floor under warm side lighting.",
    caption: "Strength work",
    meta: "Barbell · Loaded patterns",
    span: "",
  },
  {
    src: "/media/facility.jpg",
    alt: "Illustrative image: an empty indoor training facility with turf and overhead lighting.",
    caption: "The environment",
    meta: "Turf · Indoor facility",
    span: "",
  },
  {
    src: "/media/technology.jpg",
    alt: "Illustrative image: training measurement equipment on a dark turf floor.",
    caption: "Measurement",
    meta: "Testing · Objective data",
    span: "lg:col-span-2",
  },
];

export default function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="Media · Gallery"
        title={
          <>
            Inside the
            <br />
            environment.
          </>
        }
        intro="Training is built on repetition, detail, and intensity. This gallery shows the environment and the work — and will be replaced with licensed client photography as it becomes available."
      />

      <section className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="01"
            eyebrow="Gallery"
            title="The work"
            intro="The images below are art-directed placeholders created for this build. They do not depict the client, actual athletes, or an actual facility."
          />

          <div className="mt-12 grid auto-rows-[240px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((item) => (
              <figure
                key={item.src + item.caption}
                className={`group relative overflow-hidden border border-white/10 ${item.span}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-90" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-lg uppercase leading-none text-white">{item.caption}</p>
                  <p className="mt-1.5 font-sans text-[0.6rem] uppercase tracking-[0.18em] text-gold/80">
                    {item.meta}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 max-w-3xl">
            <Notice tone="info" title="Imagery status">
              <p>
                No authentic client photography or video has been supplied for Batch 001. The images on
                this page are illustrative placeholders generated for layout purposes and are labelled
                as such. They must be replaced with properly licensed client or stock photography before
                production launch, and any athlete depicted in published media requires documented
                consent.
              </p>
            </Notice>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-graphite/30 py-20">
        <div className="shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="display-md text-white">Want to train here?</h2>
            <p className="mt-3 max-w-lg font-sans text-sm leading-6 text-silver">
              Start with an inquiry and we will share current availability and next steps.
            </p>
          </div>
          <Link href="/start-training" className="btn-primary">
            Start Training
          </Link>
        </div>
      </section>
    </>
  );
}
