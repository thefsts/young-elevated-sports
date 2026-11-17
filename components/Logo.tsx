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
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Monogram
        tone={tone}
        decorative
        className={compact ? "h-7 w-auto" : "h-10 w-auto"}
      />
      <span className="flex flex-col leading-none">
        <span
          className="font-display font-bold uppercase leading-none"
          style={{
            color: wordColor,
            fontSize: compact ? "0.95rem" : "1.2rem",
            letterSpacing: "0.02em",
          }}
        >
          Young <span style={{ color: subColor }}>&amp;</span> Elevated
        </span>
        {showDescriptor ? (
          <span
            className="mt-1 font-sans uppercase"
            style={{ color: subColor, fontSize: compact ? "0.44rem" : "0.5rem", letterSpacing: "0.34em" }}
          >
            Sports Performance
          </span>
        ) : null}
      </span>
    </span>
  );
}
