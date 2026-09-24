import { startServer } from 'next/dist/server/lib/start-server.js';

console.log('Starting direct Next.js server on http://127.0.0.1:3000...');
try {
  await startServer({
    dir: process.cwd(),
    isDev: true,
    hostname: '127.0.0.1',
    port: 3000,
    allowRetry: false,
  });
  console.log('startServer resolved.');
} catch (err) {
  console.error('startServer failed:', err);
}
