const sharp = require('sharp');
const fs = require('fs');

async function createOgImage() {
  const width = 1200;
  const height = 630;

  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#3B6BFF"/>
          <stop offset="35%" stop-color="#A24BFF"/>
          <stop offset="70%" stop-color="#FF3D8B"/>
          <stop offset="100%" stop-color="#FF8A1E"/>
        </linearGradient>
      </defs>
      <!-- Gradient Pill Badge -->
      <rect x="100" y="80" width="340" height="40" rx="20" fill="#14141C" stroke="#A24BFF" stroke-width="1.5"/>
      <circle cx="120" cy="100" r="5" fill="#FF3D8B"/>
      <text x="135" y="105" fill="#FFFFFF" font-family="sans-serif" font-weight="600" font-size="14" letter-spacing="1">DUBAI &amp; GCC VIDEO AGENCY</text>

      <!-- Headline -->
      <text x="100" y="210" fill="#FFFFFF" font-family="sans-serif" font-weight="800" font-size="64" letter-spacing="-1.5">You film it. We edit it.</text>
      <text x="100" y="290" fill="#FFFFFF" font-family="sans-serif" font-weight="800" font-size="64" letter-spacing="-1.5">Ready in <tspan fill="url(#brandGrad)">21 hours.</tspan></text>

      <!-- Subheadline -->
      <text x="100" y="360" fill="#A0A0B0" font-family="sans-serif" font-weight="500" font-size="24">Your dedicated short-form editing team for Dubai founders &amp; real estate.</text>

      <!-- Trust Strip -->
      <rect x="100" y="450" width="1000" height="74" rx="16" fill="#14141C" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <text x="130" y="495" fill="#1EC8FF" font-family="monospace" font-weight="700" font-size="18">⚡ 21-HR DELIVERY</text>
      <text x="380" y="495" fill="#FFFFFF" font-family="sans-serif" font-weight="600" font-size="17">✓ 2 Revisions</text>
      <text x="590" y="495" fill="#FFFFFF" font-family="sans-serif" font-weight="600" font-size="17">🔒 NDA Encrypted</text>
      <text x="820" y="495" fill="#FF8A1E" font-family="sans-serif" font-weight="700" font-size="17">★ First Video Free</text>
    </svg>
  `);

  await sharp('public/generated/hero-light-field.jpg')
    .resize(width, height, { fit: 'cover' })
    .modulate({ brightness: 0.35 })
    .composite([
      { input: svgOverlay, top: 0, left: 0 }
    ])
    .png()
    .toFile('public/generated/og-image.png');

  console.log('Successfully generated public/generated/og-image.png');
}

createOgImage().catch(console.error);
