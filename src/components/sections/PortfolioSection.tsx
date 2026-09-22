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
    title: "Downtown Dubai Sky Walkthrough (Hook & Pacing Cut)",
    category: "Real Estate",
    duration: "00:35",
    previewUrl: "/videos/hero-showreel-preview.mp4",
    fullVideoUrl: "/videos/hero-showreel-full.mp4",
    posterUrl: "/posters/hero-showreel.jpg",
    metric: "420K Views · 26 High-Net Inquiries",
  },
  {
    id: "port-2",
    title: "Hyper-Realistic AI Avatar for GCC Real Estate",
    category: "AI Avatar & UGC",
    duration: "00:52",
    previewUrl: "/videos/ai-avatar-dubai-preview.mp4",
    fullVideoUrl: "/videos/ai-avatar-dubai-full.mp4",
    posterUrl: "/posters/ai-avatar-dubai.jpg",
    metric: "Arabic Subtitles · 0 Camera Hours",
  },
  {
    id: "port-3",
    title: "Founder Authority: Scaling Personal Brand on Video",
    category: "Personal Brand",
    duration: "00:34",
    previewUrl: "/videos/founder-story-preview.mp4",
    fullVideoUrl: "/videos/founder-story-full.mp4",
    posterUrl: "/posters/founder-story.jpg",
    metric: "45K Organic Views · 34 Call Bookings",
  },
  {
    id: "port-4",
    title: "Zero Camera Anxiety: AI Avatar Explainer",
    category: "AI Avatar & UGC",
    duration: "00:42",
    previewUrl: "/videos/ai-avatar-ugc-preview.mp4",
    fullVideoUrl: "/videos/ai-avatar-ugc-full.mp4",
    posterUrl: "/posters/ai-avatar-ugc.jpg",
    metric: "Script-to-Video in 21h",
  },
  {
    id: "port-5",
    title: "Urban 3D VFX Pattern-Interrupt Hook",
    category: "Ads",
    duration: "00:47",
    previewUrl: "/videos/vfx-hook-preview.mp4",
    fullVideoUrl: "/videos/vfx-hook-full.mp4",
    posterUrl: "/posters/vfx-hook.jpg",
    metric: "3.8x Hook Retention on Meta",
  },
  {
    id: "port-6",
    title: "Google Flow: High-Converting SaaS & Tech Walkthrough",
    category: "E-Commerce",
    duration: "00:52",
    previewUrl: "/videos/saas-product-preview.mp4",
    fullVideoUrl: "/videos/saas-product-full.mp4",
    posterUrl: "/posters/saas-product.jpg",
    metric: "91% Completion Rate",
  },
  {
    id: "port-7",
    title: "Founder Blueprint: Why Most Videos Fail to Convert",
    category: "Personal Brand",
    duration: "00:30",
    previewUrl: "/videos/founder-voice-preview.mp4",
    fullVideoUrl: "/videos/founder-voice-full.mp4",
    posterUrl: "/posters/founder-voice.jpg",
    metric: "820 Saves · High Intent Calls",
  },
  {
    id: "port-8",
    title: "Kinetic Motion Sequence & Brand Identity Reveal",
    category: "Ads",
    duration: "00:06",
    previewUrl: "/videos/motion-intro-preview.mp4",
    fullVideoUrl: "/videos/motion-intro-full.mp4",
    posterUrl: "/posters/motion-intro.jpg",
    metric: "Studio-Grade Motion Design",
  },
  {
    id: "port-9",
    title: "The 80/20 Rule for Scaling Founder Presence",
    category: "Personal Brand",
    duration: "00:18",
    previewUrl: "/videos/personal-brand-short-preview.mp4",
    fullVideoUrl: "/videos/personal-brand-short-full.mp4",
    posterUrl: "/posters/personal-brand-short.jpg",
    metric: "2.9% Engagement Rate",
  },
  {
    id: "port-10",
    title: "Direct-Response Meta Ad: High ROAS Creative",
    category: "Ads",
    duration: "00:35",
    previewUrl: "/videos/hero-showreel-preview.mp4",
    fullVideoUrl: "/videos/hero-showreel-full.mp4",
    posterUrl: "/posters/hero-showreel.jpg",
    metric: "2.5% Ad CTR (Verified)",
  },
  {
    id: "port-11",
    title: "E-Commerce Product Drop: Dynamic Visual Hook",
    category: "E-Commerce",
    duration: "00:47",
    previewUrl: "/videos/vfx-hook-preview.mp4",
    fullVideoUrl: "/videos/vfx-hook-full.mp4",
    posterUrl: "/posters/vfx-hook.jpg",
    metric: "3.4x ROAS on Meta",
  },
  {
    id: "port-12",
    title: "Palm Jumeirah Luxury Villa Walkthrough Reel",
    category: "Real Estate",
    duration: "00:52",
    previewUrl: "/videos/ai-avatar-dubai-preview.mp4",
    fullVideoUrl: "/videos/ai-avatar-dubai-full.mp4",
    posterUrl: "/posters/ai-avatar-dubai.jpg",
    metric: "14 Inquiries in 48h",
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
