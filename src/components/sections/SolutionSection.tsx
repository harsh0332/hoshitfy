"use client";

import React, { useState } from "react";
import { Clock, Calendar, Sparkles, Award, TrendingUp, Building2, UserCheck, ShoppingBag } from "lucide-react";
import { VideoCard, VideoItem } from "@/components/ui/VideoCard";
import { VideoLightbox } from "@/components/ui/VideoLightbox";
import { cn } from "@/lib/utils";

const outcomes = [
  {
    icon: Clock,
    title: "Get your hours back",
    desc: "8–15 hours a week returned to sales, client meetings, and revenue-driving tasks.",
  },
  {
    icon: Calendar,
    title: "Post consistently",
    desc: "A reliable pipeline of ready-to-publish reels delivered every week without fail.",
  },
  {
    icon: Sparkles,
    title: "Look truly premium",
    desc: "Clean cuts, dynamic subtitles, motion graphics, and sound design tailored to your brand.",
  },
  {
    icon: Award,
    title: "Build niche authority",
    desc: "Become the recognizable, trusted market voice prospects see in their daily feed.",
  },
  {
    icon: TrendingUp,
    title: "Scale without hiring",
    desc: "15–30 videos every month without the salary, visa, or management friction of in-house staff.",
  },
];

const nicheTabs = [
  {
    id: "real-estate",
    label: "Real Estate Agents",
    icon: Building2,
    tagline: "Turn property walkthroughs and market updates into qualified buyer & investor inquiries in Dubai.",
    reels: [
      {
        id: "re-1",
        title: "Downtown Luxury Penthouse Tour (Hook Stacked)",
        category: "Real Estate",
        duration: "00:42",
        posterUrl: "/generated/hero-light-field.jpg",
        metric: "18 High-Intent DMs",
      },
      {
        id: "re-2",
        title: "Why Dubai Marina Rental Yields Beat London",
        category: "Real Estate",
        duration: "00:36",
        posterUrl: "/generated/glass-film-strip.jpg",
        metric: "142K Organic Views",
      },
      {
        id: "re-3",
        title: "Palm Jumeirah Villa Handover Checklist",
        category: "Real Estate",
        duration: "00:48",
        posterUrl: "/generated/dubai-night-mood.jpg",
        metric: "2.8% Link CTR",
      },
    ],
  },
  {
    id: "personal-brand",
    label: "Coaches & Personal Brands",
    icon: UserCheck,
    tagline: "Establish unshakeable market authority and fill your calendar with high-ticket consulting calls.",
    reels: [
      {
        id: "pb-1",
        title: "How I Scaled from Freelancer to 7-Figure Agency",
        category: "Personal Brand",
        duration: "00:54",
        posterUrl: "/generated/glass-film-strip.jpg",
        metric: "34 Consultation Bookings",
      },
      {
        id: "pb-2",
        title: "The 3 Habits That Saved Me 20 Hours a Week",
        category: "Personal Brand",
        duration: "00:38",
        posterUrl: "/generated/hero-light-field.jpg",
        metric: "89K Reach",
      },
      {
        id: "pb-3",
        title: "What Expat Founders Miss About Dubai Tax Laws",
        category: "Personal Brand",
        duration: "00:45",
        posterUrl: "/generated/dubai-night-mood.jpg",
        metric: "4.1% Save Rate",
      },
    ],
  },
  {
    id: "e-commerce",
    label: "E-Commerce & D2C",
    icon: ShoppingBag,
    tagline: "High-energy UGC, unboxing cutdowns, and Meta ad creatives built for lower CPAs and direct checkout.",
    reels: [
      {
        id: "ec-1",
        title: "Direct-to-Consumer Unboxing & Feature Cut",
        category: "E-Commerce",
        duration: "00:29",
        posterUrl: "/generated/dubai-night-mood.jpg",
        metric: "3.2x ROAS Meta Ad",
      },
      {
        id: "ec-2",
        title: "Customer Reaction & Problem-Solution UGC",
        category: "E-Commerce",
        duration: "00:34",
        posterUrl: "/generated/hero-light-field.jpg",
        metric: "2.5% Ad CTR",
      },
      {
        id: "ec-3",
        title: "30-Day Product Transformation Reel",
        category: "E-Commerce",
        duration: "00:31",
        posterUrl: "/generated/glass-film-strip.jpg",
        metric: "520+ Direct Orders",
      },
    ],
  },
];

export function SolutionSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const currentTab = nicheTabs[activeTab];

  return (
    <section className="relative py-20 md:py-28 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-cyan-500/10 text-[#1EC8FF] border border-cyan-500/30">
              The Host Editify System
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Meet your in-house editing team — <br className="hidden sm:inline" />
            without the in-house headache.
          </h2>
          <p className="text-base sm:text-lg text-[#A0A0B0] leading-relaxed">
            Host Editify is a dedicated short-form video editing team for busy founders. You focus on filming and running your business. We turn your raw footage into polished, on-brand videos that people actually watch to the end.
          </p>
        </div>

        {/* 5 Outcome Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
          {outcomes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#14141C] border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-lg"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[#A24BFF] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-[#A0A0B0] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Niche Audience Segment Tabs */}
        <div className="pt-8 border-t border-white/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Who it&apos;s built for
            </h3>
            <p className="text-sm text-[#A0A0B0]">
              Select your business niche to see matching output and turnaround format:
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 flex-wrap">
            {nicheTabs.map((tab, idx) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer border select-none",
                    activeTab === idx
                      ? "bg-brand-gradient text-white border-transparent shadow-[0_0_20px_rgba(162,75,255,0.4)]"
                      : "bg-[#14141C] text-[#A0A0B0] border-white/10 hover:border-white/30 hover:text-white"
                  )}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Niche Summary Tagline */}
          <div className="p-4 rounded-xl bg-[#14141C]/80 border border-white/10 text-center max-w-xl mx-auto mb-10">
            <p className="text-sm sm:text-base text-white font-medium">
              💡 {currentTab.tagline}
            </p>
          </div>

          {/* 3 Matching Portfolio Video Cards for Selected Niche */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {currentTab.reels.map((reel) => (
              <VideoCard
                key={reel.id}
                video={reel}
                onSelect={(v) => setSelectedVideo(v)}
              />
            ))}
          </div>
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
