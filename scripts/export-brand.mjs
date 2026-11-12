import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const BRAND = "public/brand";

async function render(svg, width, out, height = null) {
  const buf = fs.readFileSync(path.join(BRAND, svg));
  let img = sharp(buf, { density: 384 });
  img = height ? img.resize(width, height, { fit: "contain" }) : img.resize({ width });
  await img.png({ compressionLevel: 9 }).toFile(path.join(BRAND, out));
  console.log("png", out);
}

async function main() {
  // Mark exports
  await render("ye-runner-mark.svg", 2400, "ye-runner-mark-2400.png");
  await render("ye-runner-mark.svg", 1200, "ye-runner-mark-1200.png");
  await render("ye-runner-mark-black.svg", 1200, "ye-runner-mark-black-1200.png");
  await render("ye-runner-mark-white.svg", 1200, "ye-runner-mark-white-1200.png");
  await render("ye-runner-mark-dark-bg.svg", 1024, "ye-runner-mark-dark-bg-1024.png");
  await render("ye-runner-mark-light-bg.svg", 1024, "ye-runner-mark-light-bg-1024.png");

  // Lockup exports
  await render("ye-runner-lockup.svg", 2400, "ye-runner-lockup-2400.png");
  await render("ye-runner-lockup-dark-bg.svg", 1600, "ye-runner-lockup-dark-bg-1600.png");

  // Social avatar
  await render("ye-runner-social.svg", 1024, "ye-runner-social-1024.png");

  // Icons
  for (const size of [32, 48, 64, 180, 192, 256, 512]) {
    await render("favicon.svg", size, `favicon-${size}.png`);
  }
  // Apple touch icon (opaque, no transparency)
  await sharp(fs.readFileSync(path.join(BRAND, "favicon.svg")), { density: 384 })
    .resize(180, 180, { fit: "contain", background: "#080808" })
    .flatten({ background: "#080808" })
    .png()
    .toFile(path.join(BRAND, "apple-touch-icon.png"));
  console.log("png apple-touch-icon.png");

  // Open Graph 1200x630 from the traced full lockup
  const lockup = await sharp(fs.readFileSync(path.join(BRAND, "ye-runner-lockup.svg")), {
    density: 600,
  })
    .resize({ height: 470 })
    .png()
    .toBuffer();

  const bg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
      <defs>
        <radialGradient id="g" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stop-color="#1c1710"/>
          <stop offset="100%" stop-color="#080808"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#g)"/>
      <rect x="0" y="0" width="1200" height="6" fill="#D6A73B"/>
      <rect x="0" y="624" width="1200" height="6" fill="#D6A73B"/>
    </svg>`
  );

  await sharp(bg)
    .composite([{ input: lockup, gravity: "center" }])
    .png()
    .toFile(path.join(BRAND, "og-image.png"));
  console.log("png og-image.png");

  // favicon.ico (PNG-embedded ICO container, 16/32/48)
  const icoSizes = [16, 32, 48];
  const pngs = [];
  for (const s of icoSizes) {
    pngs.push(
      await sharp(fs.readFileSync(path.join(BRAND, "favicon.svg")), { density: 384 })
        .resize(s, s, { fit: "contain", background: "#080808" })
        .flatten({ background: "#080808" })
        .png()
        .toBuffer()
    );
  }
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  const entries = [];
  let offset = 6 + count * 16;
  for (let i = 0; i < count; i++) {
    const e = Buffer.alloc(16);
    const s = icoSizes[i];
    e.writeUInt8(s === 256 ? 0 : s, 0);
    e.writeUInt8(s === 256 ? 0 : s, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(pngs[i].length, 8);
    e.writeUInt32LE(offset, 12);
    offset += pngs[i].length;
    entries.push(e);
  }
  fs.writeFileSync(
    path.join(BRAND, "favicon.ico"),
    Buffer.concat([header, ...entries, ...pngs])
  );
  console.log("ico favicon.ico");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
