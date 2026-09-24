// Full-page screenshots at 390px and 1440px into docs/final/.
// Usage: npm run build && node scripts/screenshots.mjs [outDir]
import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { chromium } from "playwright";

const PORT = 3100;
const BASE = `http://127.0.0.1:${PORT}`;
const outDir = process.argv[2] || "docs/final";
fs.mkdirSync(outDir, { recursive: true });

const server = spawn("npx", ["next", "start", "-p", String(PORT)], { stdio: "ignore" });

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(BASE);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("server did not start");
}

async function shoot(browser, name, viewport, isMobile) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1, isMobile, hasTouch: isMobile });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Scroll through once so lazy images load
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, `${name}-full.png`), fullPage: true });
  await page.screenshot({ path: path.join(outDir, `${name}-first-screen.png`) });

  if (isMobile) {
    // Mid-page view with the sticky bar showing, to check bar / WhatsApp / content overlap
    await page.evaluate(() => window.scrollTo(0, document.getElementById("plans-section").offsetTop + 400));
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, `${name}-sticky-bar.png`) });

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole("button", { name: "Book Free Audit" }).first().click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(outDir, `${name}-form-step1.png`) });
  }
  await page.close();
}

try {
  await waitForServer();
  const browser = await chromium.launch();
  await shoot(browser, "mobile-390", { width: 390, height: 844 }, true);
  await shoot(browser, "desktop-1440", { width: 1440, height: 900 }, false);
  await browser.close();
  console.log(`screenshots written to ${outDir}`);
} finally {
  server.kill();
}
