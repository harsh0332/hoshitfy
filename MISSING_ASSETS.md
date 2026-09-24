# Missing assets and settings

What the site still needs from Host Editify before launch. Nothing below is faked on the page: each slot hides itself, or shows a plain fallback, until the real thing is added.

## 1. Brand logos (the "Trusted by brands we edit for" strip)

Brand list (from the copy doc, `src/data/brands.json`):

1. Bluhawk Marketing
2. AI Buddies
3. DPM Entertainment
4. Heart to Mind
5. Host Dhanraj

Status: **no real logo files yet.** Each tile shows the brand name as dark text on a white tile.

To add: put the official logo (SVG, or PNG with a transparent background) in `public/logos/`, e.g. `public/logos/bluhawk.svg`, then add `"logo": "/logos/bluhawk.svg"` to that brand in `src/data/brands.json`. Confirm each brand is OK with being shown.

## 2. Founder photo

Status: **missing.** The Founder section shows a "DS" monogram tile.

To add: drop one portrait of Dhanraj Singh (JPG/PNG/WebP, at least 416×520, 4:5) in `public/founder/`. It is picked up automatically on the next build.

## 3. Client review screenshots

Status: **missing.** The "What our clients say" section is hidden while `public/reviews/` is empty.

Named in the copy doc: Rudra Sahu (Bluhawk Marketing), Dr. Kokila (Heart to Mind), Shivanshu Mishra (DPM Entertainment).

To add: put screenshots in `public/reviews/` named `Name_Business.png` (e.g. `Rudra-Sahu_Bluhawk-Marketing.png`), then run `npm run reviews`. Get each client's OK first.

## 4. Before / after pairs

Status: **missing.** The Before/After tab stays hidden.

To add: for each pair, put `raw.mp4` (unedited) and `edit.mp4` (finished) in `public/videos/work/before-after/pair-1/`, `pair-2/`, …, then run `npm run portfolio`. (The tab also needs a side-by-side player, which is not built yet.)

## 5. WhatsApp number

Status: **not set.** All WhatsApp buttons and links are hidden (the old placeholder `971…000000` was removed).

To add: set `NEXT_PUBLIC_WHATSAPP_NUMBER` in Vercel (digits only, international format, e.g. `9198XXXXXXXX`).

## 6. n8n lead webhook URL

Status: **not set.** Form submissions are only written to the server log (Vercel → Logs), so leads are easy to miss.

To add: set `N8N_LEAD_WEBHOOK_URL` in Vercel. Every lead is POSTed there as JSON.

## 7. Meta Pixel ID + Conversions API token

Status: **not set.** No Meta tracking runs.

To add: set `NEXT_PUBLIC_META_PIXEL_ID` and `META_CAPI_TOKEN` in Vercel (optionally `META_TEST_EVENT_CODE` while testing in Events Manager).

## 8. Also worth confirming

- `NEXT_PUBLIC_CALCOM_LINK` points at the real Cal.com event (default `hosteditify/content-audit`), set to IST/GST, Mon–Fri.
- `spotsLeftThisMonth` in `src/lib/site.config.ts`: set a number to show "X spots left this month" in the top bar.
- The price-lock FAQ ("Will the price go up?") shows because `priceLockPromise: true`. Set it to `false` if that promise can't be kept.
