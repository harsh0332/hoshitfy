import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const targetDir = 'docs/revision-1/after-phase-1';
fs.mkdirSync(path.join(rootDir, targetDir), { recursive: true });

// Single 390px mobile screenshot requested by user
const viewports = [
  { name: 'mobile-390', width: 390, height: 844 },
];

async function run() {
  for (const vp of viewports) {
    console.log(`Capturing ${vp.name} (${vp.width}x${vp.height})...`);
    await captureFullPage(vp, targetDir);
  }
  console.log('All after-phase-1 screenshots captured successfully!');
  process.exit(0);
}

async function captureFullPage(vp, targetDir) {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const debugPort = 9222 + Math.floor(Math.random() * 500);

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${debugPort}`,
    `--window-size=${vp.width},${vp.height}`,
    'about:blank',
  ]);

  let wsUrl = null;
  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 200));
    try {
      const res = await fetch(`http://127.0.0.1:${debugPort}/json/list`);
      const targets = await res.json();
      const pageTarget = targets.find((t) => t.type === 'page');
      if (pageTarget && pageTarget.webSocketDebuggerUrl) {
        wsUrl = pageTarget.webSocketDebuggerUrl;
        break;
      }
    } catch {}
  }

  if (!wsUrl) {
    chromeProc.kill();
    throw new Error('Failed to connect to Chrome debugging port');
  }

  const ws = new WebSocket(wsUrl);

  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  let msgId = 1;
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      const handler = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id === id) {
          ws.removeEventListener('message', handler);
          if (msg.error) {
            console.error(`CDP Error (${method}):`, msg.error);
            resolve(null);
          } else {
            resolve(msg.result);
          }
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');
  await send('DOM.enable');

  await send('Emulation.setDeviceMetricsOverride', {
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 2,
    mobile: vp.width < 600,
  });

  await send('Page.navigate', { url: 'http://127.0.0.1:3000' });

  // Wait for React hydration, CSS animations, and fonts to render
  console.log(`Waiting for page to render at ${vp.width}px...`);
  await new Promise((r) => setTimeout(r, 6000));

  const layout = await send('Page.getLayoutMetrics');
  const contentWidth = layout && layout.contentSize ? Math.ceil(layout.contentSize.width) : vp.width;
  const contentHeight = layout && layout.contentSize ? Math.ceil(layout.contentSize.height) : vp.height;

  console.log(`Content dimensions for ${vp.name}: ${contentWidth}x${contentHeight}`);

  const screenshotRes = await send('Page.captureScreenshot', {
    format: 'png',
    clip: {
      x: 0,
      y: 0,
      width: Math.max(contentWidth, vp.width),
      height: contentHeight,
      scale: 1,
    },
    fromSurface: true,
  });

  if (screenshotRes && screenshotRes.data) {
    const outPath = path.join(rootDir, targetDir, `${vp.name}.png`);
    fs.writeFileSync(outPath, Buffer.from(screenshotRes.data, 'base64'));
    console.log(`Saved screenshot to: ${outPath} (${fs.statSync(outPath).size} bytes)`);
  } else {
    console.error(`Failed to capture screenshot data for ${vp.name}`);
  }

  ws.close();
  chromeProc.kill();
}

run().catch((err) => {
  console.error('Capture script error:', err);
  process.exit(1);
});
