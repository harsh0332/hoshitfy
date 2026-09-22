"use client";

import React, { useState } from "react";
import { VideoCard, VideoItem } from "@/components/ui/VideoCard";
import { VideoLightbox } from "@/components/ui/VideoLightbox";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Real Estate",
  "Personal Brand",
  "E-Commerce",
  "AI Avatar & UGC",
  "Ads",
];

const portfolioItems: VideoItem[] = [
  {
    id: "port-1",
    title: "Downtown Dubai Sky Collection Walkthrough (Pacing Cut)",
    category: "Real Estate",
    duration: "00:46",
    posterUrl: "/generated/hero-light-field.jpg",
    metric: "420K Views · 26 High-Net Inquiries",
  },
  {
    id: "port-2",
    title: "Why Most Real Estate Investors Lose Money in Palm Jumeirah",
    category: "Real Estate",
    duration: "00:39",
    posterUrl: "/generated/dubai-night-mood.jpg",
    metric: "180K Reach · 3.4% Save Rate",
  },
  {
    id: "port-3",
    title: "Dubai Hills Mansion: Before & After Architecture Cut",
    category: "Real Estate",
    duration: "00:52",
    posterUrl: "/generated/glass-film-strip.jpg",
    metric: "14 Inquiries in 48h",
  },
  {
    id: "port-4",
    title: "The 80/20 Rule for Scaling Founder Authority on LinkedIn",
    category: "Personal Brand",
    duration: "00:41",
    posterUrl: "/generated/glass-film-strip.jpg",
    metric: "45K Organic Views",
  },
  {
    id: "port-5",
    title: "How Expat Founders Structure Corporate Tax in UAE",
    category: "Personal Brand",
    duration: "00:58",
    posterUrl: "/generated/hero-light-field.jpg",
    metric: "820 Saves · 34 Call Bookings",
  },
  {
    id: "port-6",
    title: "Why I Stopped Chasing Freelancers and Built a Dedicated System",
    category: "Personal Brand",
    duration: "00:48",
    posterUrl: "/generated/dubai-night-mood.jpg",
    metric: "2.9% Engagement Rate",
  },
  {
    id: "port-7",
    title: "D2C Luxury Watch Unboxing & Dynamic Subtitle Hook",
    category: "E-Commerce",
    duration: "00:32",
    posterUrl: "/generated/dubai-night-mood.jpg",
    metric: "3.4x ROAS on Meta",
  },
  {
    id: "port-8",
    title: "Gourmet Coffee Roasters Dubai: ASMR Sound Design Reel",
    category: "E-Commerce",
    duration: "00:27",
    posterUrl: "/generated/glass-film-strip.jpg",
    metric: "91% Completion Rate",
  },
  {
    id: "port-9",
    title: "AI Avatar Explainer for FinTech App Onboarding",
    category: "AI Avatar & UGC",
    duration: "00:44",
    posterUrl: "/generated/hero-light-field.jpg",
    metric: "Zero Camera Anxiety",
  },
  {
    id: "port-10",
    title: "Hyper-Realistic Multilingual Avatar for GCC Real Estate",
    category: "AI Avatar & UGC",
    duration: "00:36",
    posterUrl: "/generated/glass-film-strip.jpg",
    metric: "Arabic Subtitles Included",
  },
  {
    id: "port-11",
    title: "High-Converting Meta Direct Response Ad for B2B SaaS",
    category: "Ads",
    duration: "00:31",
    posterUrl: "/generated/hero-light-field.jpg",
    metric: "2.5% Ad CTR (Verified AI Buddies)",
  },
  {
    id: "port-12",
    title: "Webinar Funnel Retargeting Ad: 30-Second Hook Cut",
    category: "Ads",
    duration: "00:28",
    posterUrl: "/generated/dubai-night-mood.jpg",
    metric: "₹2.5L Revenue Generated",
  },
];

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const filteredItems =
    activeFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section id="work-section" className="relative py-20 md:py-32 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-pink-500/10 text-[#FF3D8B] border border-pink-500/30">
              Watch The Work
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Don&apos;t take our word for it. <br className="hidden sm:inline" />
            <span className="text-brand-gradient">See what 21 hours looks like.</span>
          </h2>
          <p className="text-base text-[#A0A0B0]">
            Every reel below was delivered within 21 hours from raw footage upload. Click any card to watch with full audio.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer border select-none",
                activeFilter === cat
                  ? "bg-brand-gradient text-white border-transparent shadow-[0_0_15px_rgba(255,61,139,0.4)]"
                  : "bg-[#14141C] text-[#A0A0B0] border-white/10 hover:border-white/30 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 9:16 VideoCards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onSelect={(v) => setSelectedVideo(v)}
            />
          ))}
        </div>
      </div>

      {/* Shared Lightbox */}
      <VideoLightbox
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
}
