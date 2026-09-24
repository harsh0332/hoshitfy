// Builds the social share image: public/generated/og-image.png (1200x630).
// Usage: node scripts/generate-og.js
const sharp = require("sharp");

const WIDTH = 1200;
const HEIGHT = 630;
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

async function createOgImage() {
  const overlay = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brand" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#3B6BFF"/>
          <stop offset="38%" stop-color="#A24BFF"/>
          <stop offset="72%" stop-color="#FF3D8B"/>
          <stop offset="100%" stop-color="#FF8A1E"/>
        </linearGradient>
      </defs>
      <text x="100" y="250" fill="#FFFFFF" font-family="${FONT}" font-weight="800" font-size="64" letter-spacing="-1.5">You film it. We edit it.</text>
      <text x="100" y="330" fill="#FFFFFF" font-family="${FONT}" font-weight="800" font-size="64" letter-spacing="-1.5">It's ready in <tspan fill="url(#brand)">24 hours</tspan>.</text>
      <text x="100" y="395" fill="#A0A0B0" font-family="${FONT}" font-weight="500" font-size="26">Short-form video editing for founders, coaches and brands in India and Dubai.</text>
      <rect x="100" y="460" width="1000" height="70" rx="20" fill="#14141C" stroke="rgba(255,255,255,0.10)"/>
      <text x="600" y="503" text-anchor="middle" fill="#FFFFFF" font-family="${FONT}" font-weight="600" font-size="20">24-hour delivery  ·  2 revisions per video  ·  NDA + encrypted files  ·  First video free</text>
    </svg>
  `);

  const logo = await sharp("public/brand/logo-horizontal.png").resize({ height: 72 }).toBuffer();

  await sharp("public/generated/hero-light-field.jpg")
    .resize(WIDTH, HEIGHT, { fit: "cover" })
    .modulate({ brightness: 0.3 })
    .composite([
      { input: overlay, top: 0, left: 0 },
      { input: logo, top: 80, left: 100 },
    ])
    .png()
    .toFile("public/generated/og-image.png");

  console.log("Wrote public/generated/og-image.png");
}

createOgImage().catch((err) => {
  console.error(err);
  process.exit(1);
});
