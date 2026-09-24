"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Award, X } from "lucide-react";
import rawReviews from "@/data/reviews.json";

export interface ReviewItem {
  id: string;
  src: string;
  name?: string;
  business?: string;
  caption?: string;
}

export function ProofSection() {
  const [activeReview, setActiveReview] = useState<ReviewItem | null>(null);
  const reviews = rawReviews as ReviewItem[];

  // Hide the section completely if the folder is empty
  if (!reviews || reviews.length === 0) {
    return null;
  }

  // Handle Escape key to close review lightbox
  useEffect(() => {
    if (!activeReview) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveReview(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeReview]);

  return (
    <section className="relative py-16 sm:py-24 md:py-28 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="px-3.5 py-1 rounded-full text-xs uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>Real Client Feedback</span>
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            What our clients say.
          </h2>
          <p className="text-sm sm:text-base text-[#A0A0B0]">
            Screenshots and messages directly from founders and creators working with Host Editify.
          </p>
        </div>

        {/* Mobile: Swipe Carousel */}
        <div className="flex sm:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-none">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              onClick={() => setActiveReview(rev)}
              className="min-w-[280px] max-w-[300px] snap-center shrink-0 rounded-2xl bg-[#14141C] border border-white/10 overflow-hidden cursor-pointer active:scale-[0.98] transition-all shadow-lg flex flex-col"
            >
              <div className="relative w-full aspect-[4/5] bg-black/40">
                <Image
                  src={rev.src}
                  alt={rev.caption || rev.name || "Client review"}
                  fill
                  className="object-contain"
                />
              </div>
              {rev.caption && (
                <div className="p-3 bg-[#14141C] border-t border-white/10 text-xs text-white/80 font-medium">
                  {rev.caption}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop: Masonry Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              onClick={() => setActiveReview(rev)}
              className="rounded-2xl bg-[#14141C] border border-white/10 hover:border-purple-500/40 overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 shadow-xl flex flex-col group"
            >
              <div className="relative w-full aspect-[4/5] bg-black/40">
                <Image
                  src={rev.src}
                  alt={rev.caption || rev.name || "Client review"}
                  fill
                  className="object-contain group-hover:opacity-95 transition-opacity"
                />
              </div>
              {rev.caption && (
                <div className="p-3.5 bg-[#14141C] border-t border-white/10 text-xs text-white/80 font-medium">
                  {rev.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tap to View Full Size Modal / Lightbox */}
      {activeReview && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveReview(null)}
        >
          <button
            type="button"
            onClick={() => setActiveReview(null)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
            aria-label="Close review"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="relative max-w-2xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[75vh] max-w-lg">
              <Image
                src={activeReview.src}
                alt={activeReview.caption || "Client review full size"}
                fill
                className="object-contain"
              />
            </div>
            {activeReview.caption && (
              <p className="mt-3 text-xs sm:text-sm text-white/90 font-medium text-center bg-black/60 px-4 py-1.5 rounded-full border border-white/10">
                {activeReview.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
