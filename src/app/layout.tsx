import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";
import { site } from "@/lib/site.config";
import { SmoothScrollProvider } from "@/components/global/SmoothScrollProvider";
import { TimelinePlayhead } from "@/components/global/TimelinePlayhead";
import { TopBar } from "@/components/global/TopBar";
import { Navbar } from "@/components/global/Navbar";
import { FooterSection } from "@/components/sections/FooterSection";
import { FloatingWhatsApp } from "@/components/global/FloatingWhatsApp";
import { StickyMobileCta } from "@/components/global/StickyMobileCta";

export const metadata: Metadata = {
  title: "Host Editify — Short-Form Video Editing Agency for Dubai Founders",
  description:
    "You film it. We edit it. Ready in 21 hours. Dedicated short-form video editing for real estate leaders, coaches, and founders in Dubai.",
  metadataBase: new URL("https://hosteditify.com"),
  keywords: [
    "video editing Dubai",
    "real estate video editing Dubai",
    "short-form video agency",
    "Reels editing UAE",
    "TikTok video editor Dubai",
    "YouTube Shorts editor",
    "Host Editify",
  ],
  authors: [{ name: "Dhanraj Singh" }],
  creator: "Host Editify",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hosteditify.com",
    siteName: "Host Editify",
    title: "Host Editify — Ready in 21 Hours",
    description:
      "You film it. We edit it. Ready in 21 hours. No CapCut, no chasing freelancers, no hiring an editor.",
    images: [
      {
        url: "/generated/og-image.png",
        width: 1200,
        height: 630,
        alt: "Host Editify — You film it. We edit it. Ready in 21 hours.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Host Editify — Ready in 21 Hours",
    description:
      "Dedicated short-form video editing team for busy Dubai founders. First video edited free.",
    images: ["/generated/og-image.png"],
  },
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Host Editify",
    url: "https://hosteditify.com",
    logo: "https://hosteditify.com/brand/logo.png",
    founder: {
      "@type": "Person",
      name: site.founder.name,
    },
    description:
      "Specialized short-form video editing agency delivering publish-ready Reels, Shorts and TikToks in 21 hours.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: site.links.email,
    },
  };

  return (
    <html lang="en">
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* Meta Pixel Code (Conditional on env) */}
        {pixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </head>
      <body className="bg-[#0A0A0F] text-white min-h-screen selection:bg-[#FF3D8B]/30 selection:text-white relative">
        {/* Subtle Filmic Grain Texture Overlay */}
        <div className="film-grain" />

        <SmoothScrollProvider>
          {/* Top Bar Announcement */}
          <TopBar />

          {/* Sticky Header */}
          <Navbar />

          {/* Signature Left-Edge Timeline Playhead */}
          <TimelinePlayhead />

          {/* Main Content */}
          <div className="relative z-10">{children}</div>

          {/* Footer */}
          <FooterSection />

          {/* Floating Actions */}
          <FloatingWhatsApp />
          <StickyMobileCta />
        </SmoothScrollProvider>

        {/* Vercel Web Analytics & Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
