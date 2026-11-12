/**
 * Brand asset generator.
 *
 * Produces every approved logo variant as true vector SVG (geometry + outlined
 * type paths — no raster data is embedded anywhere) and rasterises the PNG
 * exports with sharp.
 *
 * Run: node scripts/build-brand.mjs
 */
import fs from "node:fs";
import path from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "brand");
fs.mkdirSync(OUT, { recursive: true });

const COLORS = {
  ink: "#080808",
  graphite: "#191919",
  gold: "#D6A73B",
  goldBright: "#F4CC64",
  white: "#FFFFFF",
  silver: "#C5C8CE",
};

const bold = opentype.loadSync(path.join(ROOT, ".fonts", "BarlowCondensed-Bold.ttf"));
const medium = opentype.loadSync(path.join(ROOT, ".fonts", "BarlowCondensed-Medium.ttf"));

/** Convert a string to a single outlined path, with manual letter tracking. */
function outline(font, text, { size, tracking = 0 }) {
  const scale = size / font.unitsPerEm;
  let x = 0;
  let d = "";
  for (const ch of text) {
    const glyph = font.charToGlyph(ch);
    const p = glyph.getPath(x, 0, size);
    d += p.toPathData(3) + " ";
    x += glyph.advanceWidth * scale + tracking;
  }
  return { d: d.trim(), width: x - tracking };
}

/** The YE monogram geometry — shared by every variant. */
function monogram({ mark, accent, id = "m" }) {
  return `<g id="${id}">
    <g fill="${mark}">
      <polygon points="11.4,30 22.6,20 57.6,59 46.4,69"/>
      <polygon points="92.6,30 81.4,20 46.4,59 57.6,69"/>
      <rect x="44.5" y="56" width="15" height="48"/>
      <rect x="94" y="25" width="13" height="79"/>
      <rect x="94" y="25" width="26" height="13"/>
      <rect x="94" y="58" width="20" height="13"/>
      <rect x="94" y="91" width="26" height="13"/>
    </g>
    <polygon points="40,101 52,89 64,101 64,108 52,96 40,108" fill="${accent}"/>
  </g>`;
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function svg({ w, h, body, title, desc }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(title)}">
  <title>${esc(title)}</title>
  <desc>${esc(desc)}</desc>
  ${body}
</svg>
`;
}

/* ---------------------------------------------------------------- monogram */
const monoOnly = (mark, accent) =>
  svg({
    w: 128,
    h: 128,
    title: "Young & Elevated YE monogram",
    desc: "Angular YE monogram with an upward elevation chevron.",
    body: monogram({ mark, accent }),
  });

/* --------------------------------------------------------------- lockups */
function horizontal({ mark, accent, text, sub, bg }) {
  const word = outline(bold, "YOUNG & ELEVATED", { size: 52, tracking: 1.1 });
  const desc = outline(medium, "SPORTS PERFORMANCE", { size: 17, tracking: 7.2 });
  const W = 150 + word.width + 24;
  const H = 132;
  const body = `
  ${bg ? `<rect width="${W}" height="${H}" fill="${bg}"/>` : ""}
  <g transform="translate(6,18) scale(0.75)">${monogram({ mark, accent })}</g>
  <g transform="translate(118,0)">
    <path d="${word.d}" transform="translate(0,74)" fill="${text}"/>
    <path d="${desc.d}" transform="translate(1,104)" fill="${sub}"/>
  </g>`;
  return svg({
    w: W,
    h: H,
    title: "Young & Elevated Sports Performance horizontal lockup",
    desc: "YE monogram with the Young & Elevated wordmark and Sports Performance descriptor.",
    body,
  });
}

function stacked({ mark, accent, text, sub, bg }) {
  const word = outline(bold, "YOUNG & ELEVATED", { size: 40, tracking: 0.9 });
  const desc = outline(medium, "SPORTS PERFORMANCE", { size: 14, tracking: 6.4 });
  const W = Math.max(word.width, desc.width) + 64;
  const H = 268;
  const body = `
  ${bg ? `<rect width="${W}" height="${H}" fill="${bg}"/>` : ""}
  <g transform="translate(${(W - 112) / 2},20) scale(0.875)">${monogram({ mark, accent })}</g>
  <path d="${word.d}" transform="translate(${(W - word.width) / 2},206)" fill="${text}"/>
  <path d="${desc.d}" transform="translate(${(W - desc.width) / 2},236)" fill="${sub}"/>`;
  return svg({
    w: W,
    h: H,
    title: "Young & Elevated Sports Performance stacked lockup",
    desc: "Centred YE monogram above the stacked Young & Elevated wordmark.",
    body,
  });
}

const files = {
  "ye-monogram.svg": monoOnly(COLORS.gold, COLORS.goldBright),
  "ye-monogram-white.svg": monoOnly(COLORS.white, COLORS.white),
  "ye-monogram-black.svg": monoOnly(COLORS.ink, COLORS.ink),
  "ye-logo-primary.svg": horizontal({
    mark: COLORS.gold,
    accent: COLORS.goldBright,
    text: COLORS.white,
    sub: COLORS.gold,
  }),
  "ye-logo-horizontal.svg": horizontal({
    mark: COLORS.gold,
    accent: COLORS.goldBright,
    text: COLORS.white,
    sub: COLORS.gold,
  }),
  "ye-logo-stacked.svg": stacked({
    mark: COLORS.gold,
    accent: COLORS.goldBright,
    text: COLORS.white,
    sub: COLORS.gold,
  }),
  "ye-logo-gold.svg": horizontal({
    mark: COLORS.gold,
    accent: COLORS.goldBright,
    text: COLORS.gold,
    sub: COLORS.gold,
  }),
  "ye-logo-white.svg": horizontal({
    mark: COLORS.white,
    accent: COLORS.white,
    text: COLORS.white,
    sub: COLORS.silver,
  }),
  "ye-logo-black.svg": horizontal({
    mark: COLORS.ink,
    accent: COLORS.ink,
    text: COLORS.ink,
    sub: COLORS.ink,
  }),
  "ye-logo-dark-bg.svg": horizontal({
    mark: COLORS.gold,
    accent: COLORS.goldBright,
    text: COLORS.white,
    sub: COLORS.gold,
    bg: COLORS.ink,
  }),
  "ye-logo-light-bg.svg": horizontal({
    mark: COLORS.gold,
    accent: COLORS.gold,
    text: COLORS.ink,
    sub: COLORS.gold,
    bg: COLORS.white,
  }),
  "ye-nav-logo.svg": horizontal({
    mark: COLORS.gold,
    accent: COLORS.goldBright,
    text: COLORS.white,
    sub: COLORS.silver,
  }),
  "ye-watermark.svg": monoOnly(COLORS.white, COLORS.white).replace(
    /fill="#FFFFFF"/g,
    'fill="#FFFFFF" fill-opacity="0.08"',
  ),
  "ye-apparel.svg": monoOnly(COLORS.ink, COLORS.ink),
  "ye-social-icon.svg": svg({
    w: 512,
    h: 512,
    title: "Young & Elevated social profile icon",
    desc: "Gold YE monogram on a performance black rounded square.",
    body: `<rect width="512" height="512" rx="96" fill="${COLORS.ink}"/>
      <g transform="translate(64,64) scale(3)">${monogram({ mark: COLORS.gold, accent: COLORS.goldBright })}</g>`,
  }),
  "favicon.svg": svg({
    w: 64,
    h: 64,
    title: "Young & Elevated favicon",
    desc: "Simplified YE monogram for browser favicons.",
    body: `<rect width="64" height="64" rx="8" fill="${COLORS.ink}"/>
      <g transform="translate(2,2) scale(0.46875)">${monogram({ mark: COLORS.gold, accent: COLORS.goldBright })}</g>`,
  }),
};

for (const [name, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(OUT, name), content, "utf8");
}

/* ------------------------------------------------------------------- PNGs */
const pngJobs = [
  ["ye-monogram.svg", "ye-monogram-1024.png", 1024],
  ["ye-logo-horizontal.svg", "ye-logo-horizontal-2400.png", 2400],
  ["ye-logo-stacked.svg", "ye-logo-stacked-1600.png", 1600],
  ["ye-logo-white.svg", "ye-logo-white-2400.png", 2400],
  ["ye-logo-black.svg", "ye-logo-black-2400.png", 2400],
  ["ye-social-icon.svg", "ye-social-icon-1024.png", 1024],
  ["ye-apparel.svg", "ye-apparel-1200.png", 1200],
  ["favicon.svg", "favicon-512.png", 512],
  ["favicon.svg", "favicon-192.png", 192],
  ["favicon.svg", "favicon-32.png", 32],
];

for (const [src, dest, width] of pngJobs) {
  await sharp(path.join(OUT, src), { density: 384 })
    .resize({ width })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, dest));
}

/* ------------------------------------------------------- brand preview sheet */
const preview = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" width="1200" height="700">
  <rect width="1200" height="700" fill="#080808"/>
  <g transform="translate(60,60) scale(2.2)">${monogram({ mark: COLORS.gold, accent: COLORS.goldBright })}</g>
  <text x="400" y="120" fill="#FFFFFF" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-size="64" font-weight="700" letter-spacing="2">YOUNG &amp; ELEVATED</text>
  <text x="402" y="160" fill="#D6A73B" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-size="22" letter-spacing="10">SPORTS PERFORMANCE</text>
  <rect x="60" y="360" width="1080" height="1" fill="#2A2A2A"/>
  <g transform="translate(60,400)">
    ${["#080808", "#191919", "#D6A73B", "#F4CC64", "#FFFFFF", "#C5C8CE"]
      .map(
        (c, i) =>
          `<rect x="${i * 176}" y="0" width="160" height="90" fill="${c}" stroke="#2A2A2A"/><text x="${i * 176}" y="120" fill="#C5C8CE" font-family="monospace" font-size="13">${c}</text>`,
      )
      .join("")}
  </g>
  <text x="60" y="600" fill="#C5C8CE" font-family="Barlow, Arial, sans-serif" font-size="18">Performance Black · Graphite · Championship Gold · Bright Gold · Athletic White · Cool Silver</text>
  <text x="60" y="650" fill="#6A6A6A" font-family="Barlow, Arial, sans-serif" font-size="14">DRAFT BRAND SHEET — Young &amp; Elevated Sports Performance · Batch 001</text>
</svg>`;
fs.writeFileSync(path.join(OUT, "brand-sheet.svg"), preview, "utf8");
await sharp(path.join(OUT, "brand-sheet.svg"), { density: 192 })
  .resize({ width: 1600 })
  .png()
  .toFile(path.join(OUT, "brand-sheet.png"));

console.log(`Wrote ${Object.keys(files).length} SVG variants + ${pngJobs.length} PNG exports.`);
