# Host Editify — Landing Page

Single-page landing page and audit-booking funnel for **Host Editify**, a short-form video editing team for founders, coaches and brands in **India and Dubai**. Visitors book a free 30-minute content audit through a 3-step popup form; qualified leads (budget $500+) pick a slot on Cal.com, everyone else gets the free sample-edit offer.

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · next/font (Montserrat + Inter) · React Hook Form + Zod · Cal.com embed · Meta Pixel + Conversions API.

> Keep this project **outside iCloud Drive** (e.g. `~/Developer/host-editify`). iCloud's "Optimise Mac Storage" offloads `node_modules` and media, which makes builds hang.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Environment variables

Set these in Vercel → Project → Settings → Environment Variables (and in `.env.local` for local dev).

| Variable | Required | What it does |
| --- | --- | --- |
| `N8N_LEAD_WEBHOOK_URL` | **Yes** | Every form submission is POSTed here as JSON. If empty, leads are only written to the server log (Vercel logs) and, locally, to `.leads/leads.ndjson`. If the webhook fails, the visitor sees an error and the lead is still logged. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | **Yes** | WhatsApp number, digits only in international format (e.g. `9198XXXXXXXX`). If empty, every WhatsApp button and link is hidden. |
| `NEXT_PUBLIC_CALCOM_LINK` | **Yes** | Cal.com `username/event` where qualified leads (budget $500+) book the call. |
| `NEXT_PUBLIC_META_PIXEL_ID` | For ads | Meta Pixel in the browser (skipped when empty). |
| `META_CAPI_TOKEN` | For ads | Meta Conversions API token, server side (skipped when empty). |
| `META_TEST_EVENT_CODE` | Optional | Only while testing events in Meta Events Manager. |
| `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_LINKEDIN_URL` | Optional | Contact and social links (defaults in `src/lib/site.config.ts`). |

`NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing them.

## Editing content

- **Business facts** (delivery hours, client cap, free-video length, revisions, plans, founder details, "spots left"): `src/lib/site.config.ts`. Only put client-confirmed numbers here.
- **Copy source of truth:** `.inbox/docs/01-landing-page-copy.md` and `.inbox/docs/02-copy-questionnaire.md` (not committed).
- **Sections** live in `src/components/sections/`, in page order in `src/app/(site)/page.tsx`.

### Portfolio videos ("Watch our work")

1. Compress each raw clip (H.264, faststart, under 8 MB):
   ```bash
   scripts/encode-video.sh "path/to/raw clip.mp4" short-form my-slug   # or: ads
   ```
   This writes `public/videos/work/<short-form|ads>/<slug>.mp4`. Each video goes in one folder only.
2. Rebuild the portfolio data (makes posters of 80 KB or less, writes `src/data/portfolio.json`):
   ```bash
   npm run portfolio
   ```
   A tab shows only when it has 2+ videos. Cards show the poster and a play icon only.
   Before/after pairs go in `public/videos/work/before-after/pair-N/{raw,edit}.mp4` (hidden until a side-by-side player is built).

Excluded clips (celebrity faces, meme clips) are kept in `.inbox/excluded/`, not on the site.

### Client reviews ("What our clients say")

Drop screenshots in `public/reviews/` named `Name_Business.png` (or add a `Name_Business.json` sidecar with `name`, `business`, `caption`), then:

```bash
npm run reviews
```

The section stays hidden while the folder is empty. Never add quotes or stats in code.

### Brand logos ("Trusted by brands we edit for")

Brands are listed in `src/data/brands.json`. Tiles show the brand name until a logo is added: put the file (SVG or transparent PNG) in `public/logos/` and add `"logo": "/logos/<file>"` to that brand.

### Founder photo

Put one portrait (JPG/PNG/WebP, 4:5) in `public/founder/`. It replaces the "DS" monogram on the next build.

### Logo, favicon and share image

- `npm run logo` rebuilds `public/brand/logo-horizontal.png` (navbar/footer) and `public/brand/icon.png` (favicon) from `assets/brand/logo-source.png`.
- `npm run og` rebuilds the social share image `public/generated/og-image.png`.

## Checking the page

```bash
npm run build
npm run screenshots   # full-page screenshots at 390px and 1440px into docs/final/
```

See `MISSING_ASSETS.md` for what still needs to be supplied before launch.
