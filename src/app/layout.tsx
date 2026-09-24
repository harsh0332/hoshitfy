import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";
import { site } from "@/lib/site.config";
import { SmoothScrollProvider } from "@/components/global/SmoothScrollProvider";
import { TopBar } from "@/components/global/TopBar";
import { Navbar } from "@/components/global/Navbar";
import { FooterSection } from "@/components/sections/FooterSection";
import { FloatingWhatsApp } from "@/components/global/FloatingWhatsApp";
import { StickyMobileCta } from "@/components/global/StickyMobileCta";
import { AuditModalProvider } from "@/context/AuditModalContext";
import { AuditModalContainer } from "@/components/modals/AuditModalContainer";

export const metadata: Metadata = {
  title: "Host Editify — Short-Form Video Editing for Founders in India & Dubai",
  description:
    "You film it. We edit it. Ready in 24 hours. Dedicated short-form video editing for founders, coaches and brands in India and Dubai.",
  metadataBase: new URL("https://hosteditify.com"),
  keywords: [
    "video editing India",
    "video editing Dubai",
    "short-form video agency",
    "Reels editing India Dubai",
    "short-form video editor",
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
    title: "Host Editify — Ready in 24 Hours",
    description:
      "You film it. We edit it. Ready in 24 hours. No CapCut, no chasing freelancers, no hiring an editor.",
    images: [
      {
        url: "/generated/og-image.png",
        width: 1200,
        height: 630,
        alt: "Host Editify — You film it. We edit it. Ready in 24 hours.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Host Editify — Ready in 24 Hours",
    description:
      "Dedicated short-form video editing team for founders, coaches and brands in India and Dubai. First video edited free.",
    images: ["/generated/og-image.png"],
  },
  icons: {
    icon: "/brand/logo-transparent.png",
    apple: "/brand/logo-transparent.png",
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
    logo: "https://hosteditify.com/brand/logo-transparent.png",
    founder: {
      "@type": "Person",
      name: site.founder.name,
    },
    description:
      "Specialized short-form video editing agency delivering publish-ready Reels, Shorts and videos in 24 hours.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: site.links.email,
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@700;800&display=swap"
          rel="stylesheet"
        />
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
      <body className="bg-[#0A0A0F] text-white min-h-screen selection:bg-[#FF3D8B]/30 selection:text-white relative font-sans">
        {/* Subtle Filmic Grain Texture Overlay */}
        <div className="film-grain" />

        <SmoothScrollProvider>
          <AuditModalProvider>
            {/* Top Bar Announcement */}
            <TopBar />

            {/* Sticky Header */}
            <Navbar />

            {/* Main Content */}
            <div className="relative z-10">{children}</div>

            {/* Footer */}
            <FooterSection />

            {/* Floating Actions */}
            <FloatingWhatsApp />
            <StickyMobileCta />

            {/* Global Audit Modal Popup */}
            <AuditModalContainer />
          </AuditModalProvider>
        </SmoothScrollProvider>

        {/* Vercel Web Analytics & Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
