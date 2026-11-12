import Link from "next/link";
import { Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-ink pt-[4.5rem] lg:pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(214,167,59,0.12),transparent_60%)]" />
      <div className="shell relative flex min-h-[70vh] flex-col justify-center py-24">
        <Eyebrow>404 · Off the track</Eyebrow>
        <h1 className="display-xl mt-6 max-w-4xl text-white">
          This page
          <br />
          doesn&rsquo;t exist.
        </h1>
        <p className="lede mt-7 max-w-xl">
          The page you were looking for may have moved or never existed. Head back to the start, or
          explore training and the athlete pathway.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/training" className="btn-ghost">
            Training programs
          </Link>
          <Link href="/contact" className="btn-ghost">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
