# Host Editify — Premium Landing Page & Booking Funnel

A high-converting, single-page, heavily animated landing page engineered for **Host Editify**, a short-form video editing agency targeting founders, real estate leaders, and creators in **Dubai** (and select Indian metros). Built for Meta ads traffic with one conversion goal: booking a qualified **30-Minute Free Content Audit Call** on Google Meet.

---

## ⚡ Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Custom Design System Tokens
- **Motion & Interaction**: GSAP + ScrollTrigger, Lenis Smooth Scroll, Motion (`motion`)
- **Forms & Validation**: React Hook Form + Zod + Libphonenumber-js
- **Scheduling**: Cal.com Embed (`@calcom/embed-react`)
- **Analytics & Tracking**: Meta Pixel (browser) + Meta Conversions API (server-side SHA-256 deduplicated) + Vercel Web Analytics & Speed Insights
- **Media Pipeline**: FFmpeg automated optimization (`scripts/process-videos.sh`) + Sharp

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Populate the required credentials:
```ini
# Cal.com booking link
NEXT_PUBLIC_CALCOM_LINK="hosteditify/content-audit"

# Direct communication channels
NEXT_PUBLIC_WHATSAPP_NUMBER="971500000000"
NEXT_PUBLIC_CONTACT_EMAIL="contact@hosteditify.com"

# Social links
NEXT_PUBLIC_INSTAGRAM_URL="https://instagram.com/hosteditify"
NEXT_PUBLIC_LINKEDIN_URL="https://linkedin.com/company/hosteditify"
NEXT_PUBLIC_PORTFOLIO_URL="https://canva.com"

# Meta Ads tracking (Pixel + Conversions API)
NEXT_PUBLIC_META_PIXEL_ID=""
META_CAPI_TOKEN=""
META_TEST_EVENT_CODE=""

# Webhook for CRM / Lead routing (n8n)
N8N_LEAD_WEBHOOK_URL=""
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🛠️ Founder & Editor Operational Guide

### 1. Changing Business Facts & Monthly Limits (`src/lib/site.config.ts`)
All numbers, guarantees, monthly caps, and external links live in a single source of truth:
```ts
export const site = {
  brand: "Host Editify",
  tagline: "You shoot, We deliver",
  deliveryHours: 21,
  maxClientsPerMonth: 5,
  spotsLeftThisMonth: 2, // Set number to display counter; set to null to auto-hide bar
  stats: {
    adCtr: "2.5%",       // Verified stat from AI Buddies
    costPerLeadUsd: null, // Null values automatically hide from UI
    videosDelivered: null,
  },
  // ...
};
```

### 2. Adding or Swapping Portfolio Videos
1. Drop your raw 9:16 vertical MP4 video into the corresponding category folder:
   - `public/videos/portfolio/real-estate/`
   - `public/videos/portfolio/personal-brand/`
   - `public/videos/portfolio/e-commerce/`
   - `public/videos/portfolio/ai-avatar-ugc/`
   - `public/videos/portfolio/ads/`
2. Update the video entry in `src/components/sections/PortfolioSection.tsx`:
   ```ts
   {
     id: "port-new",
     title: "Your Video Title",
     category: "Real Estate",
     duration: "00:45",
     posterUrl: "/posters/your-video.webp",
     previewUrl: "/videos/portfolio/real-estate/your-video-preview.mp4",
     fullVideoUrl: "/videos/portfolio/real-estate/your-video-full.mp4",
     metric: "320K Views · 18 Inquiries",
   }
   ```

### 3. Running the Video Processing Script
To convert raw videos into web-optimized H.264 clips, hover previews (≤ 1MB), and WebP posters (≤ 60KB):
```bash
./scripts/process-videos.sh
```

### 4. Deploying to Vercel
1. Push this repository to GitHub or GitLab.
2. Import the project in [Vercel](https://vercel.com).
3. In Project Settings → Environment Variables, add all keys from `.env.example`.
4. Deploy!

---

## 📋 Asset Status (`MISSING_ASSETS.md`)
As required by truth-in-advertising guidelines for the Dubai market, all missing client media assets from the initial folder drop are tracked in [MISSING_ASSETS.md](file:///Users/harshchouksey/Desktop/host-editify/MISSING_ASSETS.md). When you receive client footage, drop files into `public/videos/` and `public/testimonials/` without touching component code.
