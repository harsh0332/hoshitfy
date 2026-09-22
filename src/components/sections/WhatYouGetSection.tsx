"use client";

import React from "react";
import { Check, Gift, Star, ArrowRight, X, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";

const deliverables = [
  "15–30 short-form videos a month (Reels, Shorts, TikTok)",
  "Long-form YouTube edits (Authority plan)",
  "Dynamic captions & subtitles (English or Arabic subtitles)",
  "Custom motion graphics & professional sound design",
  "Curated AI & stock B-roll integration where footage needs it",
  "Custom reel covers & high-CTR thumbnails",
  "Dedicated primary editor who learns your visual identity",
  "2 revision rounds included per video (4 on Authority)",
  "Weekly project call on Google Meet + instant WhatsApp updates",
  "Strict NDA protection & encrypted file handling",
];

const bonuses = [
  { title: "Hook Bank", desc: "Proven, high-retention opening lines tailored for your niche." },
  { title: "Content Calendar", desc: "A ready-to-shoot roadmap of what to film and when." },
  { title: "Content Style Ideas", desc: "Video formats currently driving algorithmic reach in the UAE." },
  { title: "Competitor Analysis", desc: "Breakdown of what top creators in your space are posting." },
  { title: "Monthly Performance Report", desc: "Clear analytics review of top-performing hooks & retention." },
  { title: "Monthly Strategy Call", desc: "1-on-1 strategy alignment to refine upcoming content topics." },
];

const whatWeDontDo = [
  "No weddings or social events",
  "No corporate documentary films",
  "No videography or camera crew hire (we edit what you shoot)",
  "No heavy 3D CGI or character VFX",
];

export function WhatYouGetSection() {
  const scrollToBooking = () => {
    const el = document.getElementById("booking-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 md:py-32 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-cyan-500/10 text-[#1EC8FF] border border-cyan-500/30">
              Complete Production Stack
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Everything you need to post like a <br className="hidden sm:inline" />
            <span className="text-brand-gradient">full-time creator.</span>
          </h2>
          <p className="text-base text-[#A0A0B0]">
            Every inclusion is designed to free your schedule and turn unedited footage into high-converting assets.
          </p>
        </div>

        {/* 2-Column Bento: What You Get vs Free Bonuses */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Deliverables Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#14141C] border border-white/10 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span>Core Monthly Deliverables</span>
              </h3>
              <div className="space-y-3.5">
                {deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm sm:text-base text-[#FFFFFF] font-medium leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Icons Row */}
            <div className="pt-6 mt-8 border-t border-white/10">
              <span className="text-xs uppercase font-mono tracking-wider text-[#A0A0B0] block mb-3">
                Optimized Formats for:
              </span>
              <div className="flex items-center gap-4 text-xs font-semibold text-white/80 flex-wrap">
                <span className="px-3 py-1 rounded-md bg-[#0A0A0F] border border-white/10">Instagram Reels</span>
                <span className="px-3 py-1 rounded-md bg-[#0A0A0F] border border-white/10">YouTube Shorts &amp; Long-Form</span>
                <span className="px-3 py-1 rounded-md bg-[#0A0A0F] border border-white/10">TikTok</span>
                <span className="px-3 py-1 rounded-md bg-[#0A0A0F] border border-white/10">LinkedIn</span>
                <span className="px-3 py-1 rounded-md bg-[#0A0A0F] border border-white/10">Meta Ads</span>
              </div>
            </div>
          </div>

          {/* Free Bonuses Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1E1428] via-[#14141C] to-[#14141C] border border-purple-500/40 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-[#FF3D8B] text-xs font-bold tracking-wider uppercase mb-4 border border-pink-500/30">
                <Gift className="w-3.5 h-3.5" />
                <span>Included Free With Every Plan</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Strategic Growth Assets
              </h3>

              <div className="space-y-4">
                {bonuses.map((b, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#0A0A0F]/60 border border-white/5">
                    <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                      <span className="text-[#FF8A1E]">★</span>
                      <span>{b.title}</span>
                    </h4>
                    <p className="text-xs text-[#A0A0B0] leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Plan Cards (Growth vs Authority) */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Choose Your Production Capacity
            </h3>
            <p className="text-sm text-[#A0A0B0]">
              Pricing is customized and shared on your 30-min audit call based on your exact footage volume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Growth Plan Card */}
            <div className="p-8 rounded-3xl bg-[#14141C] border border-white/10 flex flex-col justify-between shadow-lg">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#1EC8FF] font-semibold">
                  Plan 01
                </span>
                <h4 className="text-2xl font-extrabold text-white mt-1 mb-2">Growth</h4>
                <p className="text-sm text-[#A0A0B0] mb-6">
                  Perfect for founders &amp; solo agents aiming to establish consistent daily posting.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <Check className="w-4 h-4 text-green-400" />
                    <strong className="text-white">15 Short-Form Videos / month</strong>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#A0A0B0]">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>2 Revisions per video</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#A0A0B0]">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>21-Hour delivery guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#A0A0B0]">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Dedicated editor + 1 weekly project call</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#A0A0B0]">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>All 6 Strategic Bonuses included</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <span className="text-xs font-mono text-[#A0A0B0] block mb-3">
                  Pricing tailored on your free audit call
                </span>
                <Button
                  variant="outline"
                  size="md"
                  onClick={scrollToBooking}
                  className="w-full text-sm font-semibold"
                >
                  Book Growth Audit →
                </Button>
              </div>
            </div>

            {/* Authority Plan Card (Featured) */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-b from-[#1C162E] to-[#14141C] border-2 border-purple-500 shadow-[0_0_40px_-10px_rgba(162,75,255,0.4)] flex flex-col justify-between">
              {/* Featured Badge */}
              <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full bg-brand-gradient text-white text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                <Star className="w-3.5 h-3.5 fill-white" />
                <span>Most Popular in Dubai</span>
              </div>

              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#FF3D8B] font-semibold">
                  Plan 02 · Full Scale
                </span>
                <h4 className="text-2xl font-extrabold text-white mt-1 mb-2">Authority</h4>
                <p className="text-sm text-[#A0A0B0] mb-6">
                  For businesses and leaders seeking complete omnipresence across short and long-form channels.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <Check className="w-4 h-4 text-green-400" />
                    <strong className="text-white">25 Short-Form Videos / month</strong>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white font-medium">
                    <Check className="w-4 h-4 text-[#FF8A1E]" />
                    <span className="text-[#FF8A1E] font-semibold">+ 4 Long-Form YouTube Edits</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>4 Revisions per video (Priority queue)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>Advanced motion graphics &amp; thumbnail packs</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white">
                    <Check className="w-4 h-4 text-green-400" />
                    <span>All 6 Strategic Bonuses included</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <span className="text-xs font-mono text-[#A0A0B0] block mb-3">
                  Pricing tailored on your free audit call
                </span>
                <Button
                  variant="primary"
                  size="md"
                  onClick={scrollToBooking}
                  className="w-full text-sm font-bold"
                >
                  Book Authority Audit →
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Honest "What We Deliberately Don't Do" Section */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#14141C]/50 border border-white/5 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4 text-[#A0A0B0] text-xs uppercase font-mono tracking-wider">
            <ShieldAlert className="w-4 h-4 text-[#FF8A1E]" />
            <span>Honesty &amp; Specialization: What We Deliberately DO NOT Do</span>
          </div>
          <p className="text-xs sm:text-sm text-[#A0A0B0] mb-4">
            Saying no to everything outside short-form editing is why our 21-hour turnaround never slips:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {whatWeDontDo.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#A0A0B0]">
                <X className="w-4 h-4 text-red-400/80 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
