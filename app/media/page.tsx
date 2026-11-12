import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Notice, PageHero, SectionHeading } from "@/components/ui";
import { pageCopy } from "@/lib/content/page-copy-es";
import { coachPortrait } from "@/lib/content/media";
import { getTranslator } from "@/lib/i18n/server";
import { localizedPath } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Training Gallery",
  description:
    "A visual look at the training environment for Young & Elevated Sports Performance in Dallas–Fort Worth.",
  path: "/media",
});

const galleryEn = [
  {
    src: coachPortrait.src,
    alt: coachPortrait.alt,
    caption: "Coach Young",
    meta: "Client photograph",
    span: "lg:col-span-2 lg:row-span-2",
    authentic: true,
  },
  {
    src: "/media/hero-track.jpg",
    alt: "Illustrative image: a lone athlete silhouette sprinting on a floodlit track at night.",
    caption: "Speed work",
    meta: "Track · Night session",
    span: "",
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

export default async function MediaPage() {
  const { locale } = await getTranslator();
  const c = pageCopy(locale);
  const lp = (p: string) => localizedPath(locale, p);
  const copy = c?.media;

  // Authentic client photography carries its own caption and is never
  // overwritten by the Spanish overlay (which is indexed against the
  // placeholder set).
  const placeholders = galleryEn.filter((item) => !("authentic" in item && item.authentic));
  const gallery = galleryEn.map((item) => {
    if ("authentic" in item && item.authentic) return item;
    const i = placeholders.indexOf(item);
    return {
      ...item,
      caption: c?.gallery[i]?.caption ?? item.caption,
      meta: c?.gallery[i]?.meta ?? item.meta,
    };
  });

  return (
    <>
      <PageHero
        eyebrow={copy?.eyebrow ?? "Media · Gallery"}
        title={
          <>
            {copy?.titleLines[0] ?? "Inside the"}
            <br />
            {copy?.titleLines[1] ?? "environment."}
          </>
        }
        intro={
          copy?.intro ??
          "Training is built on repetition, detail, and intensity. This gallery shows the environment and the work — and will be replaced with licensed client photography as it becomes available."
        }
      />

      <section className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            index="01"
            eyebrow={copy?.s1Eyebrow ?? "Gallery"}
            title={copy?.s1Title ?? "The work"}
            intro={
              copy?.s1Intro ??
              "The images below are art-directed placeholders created for this build. They do not depict the client, actual athletes, or an actual facility."
            }
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
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-80" />
                {"authentic" in item && item.authentic ? (
                  <span className="absolute left-4 top-4 border border-gold/40 bg-ink/80 px-3 py-1 font-sans text-[0.55rem] uppercase tracking-[0.2em] text-gold backdrop-blur">
                    Client photograph
                  </span>
                ) : null}
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
            <Notice tone="info" title={copy?.statusTitle ?? "Imagery status"}>
              <p>
                {copy?.statusBody ??
                  "Client photography is now being introduced. The portrait of Coach Young is an authentic client photograph. Every other image on this page remains a brand-directed placeholder and is labelled as such. Additional client photographs showing athletes are held for private review until media releases are confirmed for each identifiable person, and no image is presented as evidence of a coaching relationship, athletic result, endorsement, or partnership."}
              </p>
            </Notice>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-graphite/30 py-20">
        <div className="shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="display-md text-white">{copy?.ctaTitle ?? "Want to train here?"}</h2>
            <p className="mt-3 max-w-lg font-sans text-sm leading-6 text-silver">
              {copy?.ctaBody ??
                "Start with an inquiry and we will share current availability and next steps."}
            </p>
          </div>
          <Link href={lp("/start-training")} className="btn-primary">
            {copy?.ctaPrimary ?? "Start Training"}
          </Link>
        </div>
      </section>
    </>
  );
}
