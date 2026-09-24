import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// MIME types
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

// 1. Static file server
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') {
    reqPath = '/index.html';
  }

  let filePath = '';
  if (reqPath === '/index.html') {
    filePath = path.join(rootDir, '.next/server/app/index.html');
  } else if (reqPath.startsWith('/_next/static/')) {
    filePath = path.join(rootDir, '.next/static', reqPath.replace('/_next/static/', ''));
  } else {
    filePath = path.join(rootDir, 'public', reqPath);
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found: ' + reqPath);
  }
});

const PORT = 3000;
server.listen(PORT, async () => {
  console.log(`Static server running at http://localhost:${PORT}`);

  const targetDir = process.argv[2] || 'docs/revision-1/before';
  fs.mkdirSync(path.join(rootDir, targetDir), { recursive: true });

  const viewports = [
    { name: 'mobile-390', width: 390, height: 844 },
    { name: 'desktop-1440', width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    console.log(`Capturing ${vp.name} (${vp.width}x${vp.height})...`);
    await captureFullPage(vp, targetDir);
  }

  console.log('All screenshots captured successfully!');
  server.close();
  process.exit(0);
});

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

  // Wait for Chrome remote debugging to be ready
  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
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

  // Enable Page
  await send('Page.enable');

  // Set device metrics
  await send('Emulation.setDeviceMetricsOverride', {
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 1,
    mobile: vp.width < 600,
  });

  // Navigate to site
  await send('Page.navigate', { url: `http://localhost:${PORT}` });

  // Wait for page to render and assets/fonts to load
  await new Promise((r) => setTimeout(r, 4000));

  await send('Runtime.enable');
  const domInfo = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const sections = Array.from(document.querySelectorAll('section, footer')).map((s, idx) => ({
          idx,
          id: s.id || s.className.slice(0, 30),
          h: s.offsetHeight,
          t: s.offsetTop
        }));
        return {
          bodyH: document.body.scrollHeight,
          docH: document.documentElement.scrollHeight,
          sections
        };
      })()
    `,
    returnByValue: true,
  });
  console.log('DOM Info:', JSON.stringify(domInfo?.result?.value, null, 2));

  // Get accurate layout metrics
  const layout = await send('Page.getLayoutMetrics');
  const contentWidth = layout && layout.contentSize ? Math.ceil(layout.contentSize.width) : vp.width;
  const contentHeight = layout && layout.contentSize ? Math.ceil(layout.contentSize.height) : vp.height;

  console.log(`Content dimensions for ${vp.name}: ${contentWidth}x${contentHeight}`);

  // Capture full page screenshot
  const screenshotRes = await send('Page.captureScreenshot', {
    format: 'png',
    clip: {
      x: 0,
      y: 0,
      width: contentWidth,
      height: contentHeight,
      scale: 1,
    },
    captureBeyondViewport: true,
  });

  if (screenshotRes && screenshotRes.data) {
    const outPath = path.join(rootDir, targetDir, `${vp.name}.png`);
    fs.writeFileSync(outPath, Buffer.from(screenshotRes.data, 'base64'));
    console.log(`Saved screenshot to: ${outPath}`);
  } else {
    console.error('Failed to capture screenshot data');
  }

  ws.close();
  chromeProc.kill();
}
