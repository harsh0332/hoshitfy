"use client";

import React from "react";
import { BeforeAfterSlider, BeforeAfterPair } from "@/components/ui/BeforeAfterSlider";
import { Sparkles } from "lucide-react";

const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "pair-1",
    title: "Pair #01",
    niche: "Real Estate Walkthrough",
    rawPoster: "/generated/dubai-night-mood.jpg",
    editPoster: "/generated/hero-light-field.jpg",
    details: "Shaky iPhone camera roll clip vs. stabilized, color-graded, captioned reel with sound design.",
  },
  {
    id: "pair-2",
    title: "Pair #02",
    niche: "Founder Talking-Head",
    rawPoster: "/generated/glass-film-strip.jpg",
    editPoster: "/generated/dubai-night-mood.jpg",
    details: "Uncut 3-minute ramble vs. high-retention 42s cut with visual B-roll pattern interrupts.",
  },
  {
    id: "pair-3",
    title: "Pair #03",
    niche: "E-Commerce Product Ad",
    rawPoster: "/generated/hero-light-field.jpg",
    editPoster: "/generated/glass-film-strip.jpg",
    details: "Flat product footage vs. dynamic kinetic typography, zoom punch-ins, and sound effects.",
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
