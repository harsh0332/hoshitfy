import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const publicDir = path.join(rootDir, 'public');
const workVideosDir = path.join(publicDir, 'videos', 'work');
const postersDir = path.join(publicDir, 'posters', 'work');
const dataDir = path.join(rootDir, 'src', 'data');

fs.mkdirSync(postersDir, { recursive: true });
fs.mkdirSync(dataDir, { recursive: true });

function formatTitle(filename) {
  const base = path.basename(filename, path.extname(filename));
  return base
    .split(/[-_]+/)
    .map(word => {
      if (word.toLowerCase() === 'ai') return 'AI';
      if (word.toLowerCase() === 'ugc') return 'UGC';
      if (word.toLowerCase() === 'vfx') return 'VFX';
      if (word.toLowerCase() === 'saas') return 'SaaS';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function generatePoster(videoPath, posterPath) {
  if (fs.existsSync(posterPath) && fs.statSync(posterPath).size > 0) {
    return true;
  }
  try {
    execSync(`ffmpeg -y -ss 00:00:01 -i "${videoPath}" -vframes 1 -q:v 2 "${posterPath}"`, {
      stdio: 'ignore',
    });
    return true;
  } catch (err) {
    // If ffmpeg failed at 1s, try at 0s
    try {
      execSync(`ffmpeg -y -ss 00:00:00.1 -i "${videoPath}" -vframes 1 -q:v 2 "${posterPath}"`, {
        stdio: 'ignore',
      });
      return true;
    } catch {
      return false;
    }
  }
}

// 1. Scan short-form videos
const shortFormDir = path.join(workVideosDir, 'short-form');
const shortFormItems = [];
if (fs.existsSync(shortFormDir)) {
  const files = fs.readdirSync(shortFormDir).filter(f => f.endsWith('.mp4'));
  for (const file of files) {
    const videoFile = path.join(shortFormDir, file);
    const posterFilename = `${path.basename(file, '.mp4')}.jpg`;
    const posterFile = path.join(postersDir, posterFilename);
    
    // Check if existing poster in public/posters
    const legacyPoster = path.join(publicDir, 'posters', posterFilename);
    if (!fs.existsSync(posterFile) && fs.existsSync(legacyPoster)) {
      fs.copyFileSync(legacyPoster, posterFile);
    } else {
      generatePoster(videoFile, posterFile);
    }

    shortFormItems.push({
      id: `sf-${path.basename(file, '.mp4')}`,
      title: formatTitle(file),
      type: 'short-form',
      videoUrl: `/videos/work/short-form/${file}`,
      posterUrl: fs.existsSync(posterFile) ? `/posters/work/${posterFilename}` : (fs.existsSync(legacyPoster) ? `/posters/${posterFilename}` : '/brand/logo-full.png'),
    });
  }
}

// 2. Scan ads videos
const adsDir = path.join(workVideosDir, 'ads');
const adsItems = [];
if (fs.existsSync(adsDir)) {
  const files = fs.readdirSync(adsDir).filter(f => f.endsWith('.mp4'));
  for (const file of files) {
    const videoFile = path.join(adsDir, file);
    const posterFilename = `${path.basename(file, '.mp4')}.jpg`;
    const posterFile = path.join(postersDir, posterFilename);

    const legacyPoster = path.join(publicDir, 'posters', posterFilename);
    if (!fs.existsSync(posterFile) && fs.existsSync(legacyPoster)) {
      fs.copyFileSync(legacyPoster, posterFile);
    } else {
      generatePoster(videoFile, posterFile);
    }

    adsItems.push({
      id: `ad-${path.basename(file, '.mp4')}`,
      title: formatTitle(file),
      type: 'ads',
      videoUrl: `/videos/work/ads/${file}`,
      posterUrl: fs.existsSync(posterFile) ? `/posters/work/${posterFilename}` : (fs.existsSync(legacyPoster) ? `/posters/${posterFilename}` : '/brand/logo-full.png'),
    });
  }
}

// 3. Scan before-after videos (pair-n subdirectories)
const beforeAfterDir = path.join(workVideosDir, 'before-after');
const beforeAfterItems = [];
if (fs.existsSync(beforeAfterDir)) {
  const entries = fs.readdirSync(beforeAfterDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const pairDir = path.join(beforeAfterDir, entry.name);
      const rawFile = path.join(pairDir, 'raw.mp4');
      const editFile = path.join(pairDir, 'edit.mp4');
      if (fs.existsSync(rawFile) && fs.existsSync(editFile)) {
        const posterFile = path.join(postersDir, `${entry.name}.jpg`);
        generatePoster(editFile, posterFile);
        beforeAfterItems.push({
          id: `ba-${entry.name}`,
          title: `Transformation ${entry.name.replace('pair-', '#')}`,
          type: 'before-after',
          rawVideoUrl: `/videos/work/before-after/${entry.name}/raw.mp4`,
          editVideoUrl: `/videos/work/before-after/${entry.name}/edit.mp4`,
          videoUrl: `/videos/work/before-after/${entry.name}/edit.mp4`,
          posterUrl: fs.existsSync(posterFile) ? `/posters/work/${entry.name}.jpg` : '/brand/logo-full.png',
        });
      }
    }
  }
}

// All items (short-form + ads + before-after)
const allItems = [...shortFormItems, ...adsItems, ...beforeAfterItems];

const portfolioData = {
  all: allItems,
  shortForm: shortFormItems,
  ads: adsItems,
  beforeAfter: beforeAfterItems,
  counts: {
    all: allItems.length,
    shortForm: shortFormItems.length,
    ads: adsItems.length,
    beforeAfter: beforeAfterItems.length,
  },
};

const outPath = path.join(dataDir, 'portfolio.json');
fs.writeFileSync(outPath, JSON.stringify(portfolioData, null, 2), 'utf8');

console.log('Portfolio scanned successfully:');
console.log(`- Short-form edits: ${shortFormItems.length}`);
console.log(`- Ad videos: ${adsItems.length}`);
console.log(`- Before/After pairs: ${beforeAfterItems.length}`);
console.log(`- Total in "All": ${allItems.length}`);
console.log(`Written to: ${outPath}`);
