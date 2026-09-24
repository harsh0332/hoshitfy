"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import rawReviews from "@/data/reviews.json";
import { Section, SectionHeader } from "@/components/ui/Section";

export interface ReviewItem {
  id: string;
  src: string;
  name?: string;
  business?: string;
  caption?: string;
}

// Built from public/reviews/ by `npm run reviews`. No quotes or stats live in code.
const reviews = rawReviews as ReviewItem[];

function ReviewCard({ review, onOpen, className }: { review: ReviewItem; onOpen: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Enlarge review${review.caption ? `: ${review.caption}` : ""}`}
      className={
        "block w-full cursor-zoom-in overflow-hidden rounded-[20px] border border-white/[0.08] bg-[var(--card-bg)] text-left transition-colors hover:border-[#A24BFF]/50 " +
        (className ?? "")
      }
    >
      <Image src={review.src} alt={review.caption || "Client review"} width={600} height={750} className="h-auto w-full" />
      {review.caption && <p className="type-small border-t border-white/[0.08] p-4 text-white/80">{review.caption}</p>}
    </button>
  );
}

export function ProofSection() {
  const [active, setActive] = useState<ReviewItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  // Hidden until screenshots exist in public/reviews/
  if (reviews.length === 0) return null;

  return (
    <Section>
      <SectionHeader
        title="What our clients say"
        sub="Screenshots and messages from founders and creators we edit for."
      />

      {/* Phone: swipe carousel */}
      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:hidden">
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} onOpen={() => setActive(r)} className="w-[280px] shrink-0 snap-center" />
        ))}
      </div>

      {/* Desktop: masonry */}
      <div className="hidden gap-6 md:block md:columns-2 lg:columns-3">
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} onOpen={() => setActive(r)} className="mb-6 break-inside-avoid" />
        ))}
      </div>

      {active &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Review"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close review"
              className="absolute top-4 right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            <div className="relative h-[80svh] w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
              <Image src={active.src} alt={active.caption || "Client review"} fill className="object-contain" />
            </div>
          </div>,
          document.body
        )}
    </Section>
  );
}
