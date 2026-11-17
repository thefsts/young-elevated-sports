type MonogramProps = {
  className?: string;
  /** Visual context: dark surfaces use the silver/gold mark, light uses graphite/gold. */
  tone?: "light" | "dark";
  title?: string;
  /** Mark is purely decorative because adjacent text already names the brand. */
  decorative?: boolean;
};

/**
 * The client-approved YE runner mark: the runner silhouette inside the YE with
 * the upward elevation arrow. Rendered from the traced vector master in
 * public/brand so the same artwork is used everywhere.
 *
 * The retired plain YE monogram must not be used.
 */
export function Monogram({
  className,
  tone = "light",
  title = "Young & Elevated runner mark",
  decorative = false,
}: MonogramProps) {
  const src =
    tone === "light"
      ? "/brand/ye-runner-mark.svg"
      : "/brand/ye-runner-mark-on-light.svg";

  return (
    // eslint-disable-next-line @next/next/no-img-element -- fixed-aspect brand SVG, no optimisation needed
    <img
      src={src}
      alt={decorative ? "" : title}
      aria-hidden={decorative ? true : undefined}
      className={className}
      width={495}
      height={282}
      decoding="async"
    />
  );
}

/**
 * The complete client-approved logo: runner symbol, wordmark, SPORTS
 * PERFORMANCE, the Athletic Training / Speed / Strength / Performance rule, the
 * Dallas skyline, and the Dallas–Fort Worth location line.
 *
 * Rendered from the traced vector master of the approved artwork, recoloured
 * for dark surfaces. Nothing is redrawn, re-lettered, or re-cropped.
 */
export function FullLogo({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const src =
    tone === "light"
      ? "/brand/ye-runner-lockup.svg"
      : "/brand/ye-runner-lockup-black.svg";

  return (
    // eslint-disable-next-line @next/next/no-img-element -- fixed-aspect brand SVG, no optimisation needed
    <img
      src={src}
      alt="Young & Elevated Sports Performance — Dallas–Fort Worth"
      className={className}
      width={1536}
      height={1024}
      decoding="async"
    />
  );
}

type LogoProps = {
  className?: string;
  /** Colour of the wordmark. */
  tone?: "light" | "dark";
  showDescriptor?: boolean;
  compact?: boolean;
};

export function Logo({
  className = "",
  tone = "light",
  showDescriptor = true,
  compact = false,
}: LogoProps) {
  const wordColor = tone === "light" ? "#FFFFFF" : "#080808";
  const subColor = tone === "light" ? "#D6A73B" : "#8A6A1E";

  return (
    <span className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/*
        Mark and wordmark scale together. At 1536px the mark renders 84x56 and
        the wordmark 336px wide, which reproduces the approved reference lockup
        almost exactly. The clamps keep the whole lockup inside a 390px viewport
        instead of letting the wordmark run off the right edge.
      */}
      <Monogram tone={tone} decorative className="h-9 w-auto shrink-0 sm:h-11 lg:h-14" />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className="font-display-wide whitespace-nowrap uppercase leading-none"
          style={{
            color: wordColor,
            fontSize: compact ? "clamp(1.02rem, 4.5vw, 1.85rem)" : "clamp(1.02rem, 4.5vw, 2.1rem)",
            letterSpacing: "0em",
          }}
        >
          Young <span style={{ color: subColor }}>&</span> Elevated
        </span>
        {showDescriptor ? (
          <span
            className="font-sans whitespace-nowrap uppercase"
            style={{
              color: subColor,
              fontSize: "clamp(0.42rem, 1.45vw, 0.6rem)",
              letterSpacing: "0.36em",
              marginTop: "clamp(0.2rem, 0.5vw, 0.34rem)",
            }}
          >
            Sports Performance
          </span>
        ) : null}
      </span>
    </span>
  );
}
