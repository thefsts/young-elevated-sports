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
        className={compact ? "h-8 w-auto" : "h-10 w-auto"}
      />
      <span className="flex flex-col leading-none">
        <span
          className="font-display font-bold uppercase leading-none"
          style={{
            color: wordColor,
            fontSize: compact ? "1.05rem" : "1.2rem",
            letterSpacing: "0.02em",
          }}
        >
          Young <span style={{ color: subColor }}>&amp;</span> Elevated
        </span>
        {showDescriptor ? (
          <span
            className="mt-1 font-sans uppercase"
            style={{ color: subColor, fontSize: "0.5rem", letterSpacing: "0.34em" }}
          >
            Sports Performance
          </span>
        ) : null}
      </span>
    </span>
  );
}
