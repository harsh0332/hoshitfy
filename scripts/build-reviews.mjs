import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const reviewsDir = path.join(rootDir, 'public', 'reviews');
const dataDir = path.join(rootDir, 'src', 'data');
const outputFile = path.join(dataDir, 'reviews.json');

fs.mkdirSync(reviewsDir, { recursive: true });
fs.mkdirSync(dataDir, { recursive: true });

function formatCaption(basename) {
  // If basename contains an underscore (e.g. "Rudra-Sahu_Bluhawk-Marketing" or "rudra_sahu")
  const parts = basename.split('_');
  if (parts.length >= 2) {
    const name = parts[0].replace(/[-_]+/g, ' ').trim();
    const business = parts.slice(1).join(' ').replace(/[-_]+/g, ' ').trim();
    return { name, business, caption: `${name} · ${business}` };
  }
  const clean = basename.replace(/[-_]+/g, ' ').trim();
  return { name: clean, business: '', caption: clean };
}

const validExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg']);

let reviews = [];

if (fs.existsSync(reviewsDir)) {
  const files = fs.readdirSync(reviewsDir).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return validExtensions.has(ext);
  });

  reviews = files.map((file, index) => {
    const ext = path.extname(file);
    const basename = path.basename(file, ext);
    const metadata = formatCaption(basename);

    // Check if sidecar json exists (e.g. filename.json)
    const sidecarPath = path.join(reviewsDir, `${basename}.json`);
    if (fs.existsSync(sidecarPath)) {
      try {
        const sidecarData = JSON.parse(fs.readFileSync(sidecarPath, 'utf8'));
        return {
          id: `review-${index + 1}`,
          src: `/reviews/${file}`,
          name: sidecarData.name || metadata.name,
          business: sidecarData.business || metadata.business,
          caption: sidecarData.caption || metadata.caption,
        };
      } catch {}
    }

    return {
      id: `review-${index + 1}`,
      src: `/reviews/${file}`,
      name: metadata.name,
      business: metadata.business,
      caption: metadata.caption,
    };
  });
}

fs.writeFileSync(outputFile, JSON.stringify(reviews, null, 2));
console.log(`Wrote ${reviews.length} reviews to ${outputFile}`);
