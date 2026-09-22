"use client";

import React from "react";
import { BeforeAfterSlider, BeforeAfterPair } from "@/components/ui/BeforeAfterSlider";
import { Sparkles } from "lucide-react";

const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "pair-1",
    title: "Pair #01",
    niche: "Founder Authority Cut",
    rawPoster: "/posters/founder-story.jpg",
    editPoster: "/posters/founder-story.jpg",
    editVideo: "/videos/founder-story-full.mp4",
    details: "Raw unedited camera footage vs. color-graded, paced cut with dynamic captions and sound design.",
  },
  {
    id: "pair-2",
    title: "Pair #02",
    niche: "High-Energy Hook Cut",
    rawPoster: "/posters/hero-showreel.jpg",
    editPoster: "/posters/hero-showreel.jpg",
    editVideo: "/videos/hero-showreel-full.mp4",
    details: "Raw mobile shoot vs. high-retention 21h turnaround edit with kinetic text and sound effects.",
  },
  {
    id: "pair-3",
    title: "Pair #03",
    niche: "AI Avatar Reel",
    rawPoster: "/posters/ai-avatar-dubai.jpg",
    editPoster: "/posters/ai-avatar-dubai.jpg",
    editVideo: "/videos/ai-avatar-dubai-full.mp4",
    details: "Script draft vs. hyper-realistic AI avatar reel ready for Meta and organic distribution.",
  },
];

export function BeforeAfterSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#14141C] border-y border-white/5 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-orange-500/10 text-[#FF8A1E] border border-orange-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Side-by-Side Proof</span>
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            The Raw-to-Edit Transformation
          </h2>
          <p className="text-base text-[#A0A0B0]">
            See what happens when your unedited clips pass through our 21-hour post-production pipeline.
          </p>
        </div>

        {/* Dual Player Interactive Slider */}
        <BeforeAfterSlider pairs={beforeAfterPairs} />
      </div>
    </section>
  );
}
