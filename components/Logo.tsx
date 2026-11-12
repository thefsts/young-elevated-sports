type MonogramProps = {
  className?: string;
  mark?: string;
  accent?: string;
  title?: string;
};

/**
 * The YE monogram, drawn as live vector geometry so it inherits colour and
 * stays crisp at any size. Geometry is identical to public/brand/ye-monogram.svg.
 */
export function Monogram({
  className,
  mark = "#D6A73B",
  accent = "#F4CC64",
  title = "Young & Elevated monogram",
}: MonogramProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      className={className}
      role="img"
      aria-label={title}
      focusable="false"
    >
      <g fill={mark}>
        <polygon points="11.4,30 22.6,20 57.6,59 46.4,69" />
        <polygon points="92.6,30 81.4,20 46.4,59 57.6,69" />
        <rect x="44.5" y="56" width="15" height="48" />
        <rect x="94" y="25" width="13" height="79" />
        <rect x="94" y="25" width="26" height="13" />
        <rect x="94" y="58" width="20" height="13" />
        <rect x="94" y="91" width="26" height="13" />
      </g>
      <polygon points="40,101 52,89 64,101 64,108 52,96 40,108" fill={accent} />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** Colour of the wordmark. */
  tone?: "light" | "dark";
  showDescriptor?: boolean;
  compact?: boolean;
};

export function Logo({ className = "", tone = "light", showDescriptor = true, compact = false }: LogoProps) {
  const wordColor = tone === "light" ? "#FFFFFF" : "#080808";
  const subColor = tone === "light" ? "#D6A73B" : "#8A6A1E";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Monogram className={compact ? "h-9 w-9" : "h-11 w-11"} />
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
