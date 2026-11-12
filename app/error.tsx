"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log only the digest and message — never user-entered data.
    console.error("Route error:", error.digest ?? error.message);
  }, [error]);

  return (
    <section className="bg-ink pt-[4.5rem] lg:pt-20">
      <div className="shell flex min-h-[70vh] flex-col justify-center py-24">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="display-lg mt-6 max-w-3xl text-white">We hit an unexpected error.</h1>
        <p className="lede mt-6 max-w-xl">
          The page could not be displayed. You can try again, or return to the homepage. If the
          problem continues, please let us know through the contact form.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn-primary">
            Try again
          </button>
          <Link href="/" className="btn-ghost">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
