import next from 'next';

console.log('PID:', process.pid);
const app = next({
  dev: false,
  dir: process.cwd(),
  conf: {
    distDir: '.next',
  }
});

console.log('App created');
const t0 = Date.now();
try {
  await app.prepare();
  console.log('App prepared in', Date.now() - t0, 'ms');
  process.exit(0);
} catch (err) {
  console.error('App prepare failed:', err);
  process.exit(1);
}
