"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import portfolioData from "@/data/portfolio.json";
import { VideoLightbox, PortfolioVideoItem } from "@/components/ui/VideoLightbox";
import { Button } from "@/components/ui/Button";
import { useAuditModal } from "@/context/AuditModalContext";

const rotatingWords = [
  "Real estate",
  "Personal brands",
  "E-commerce",
  "AI content",
];

type TabKey = "all" | "shortForm" | "ads" | "beforeAfter";

interface TabConfig {
  key: TabKey;
  label: string;
}

const allTabs: TabConfig[] = [
  { key: "all", label: "All" },
  { key: "shortForm", label: "Short-form edits" },
  { key: "ads", label: "Ad videos" },
  { key: "beforeAfter", label: "Before / After" },
];

export function PortfolioSection() {
  const { openAuditModal } = useAuditModal();
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideoItem | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Rotate bold word every ~2 seconds (static if reduced-motion)
  useEffect(() => {
    if (isReducedMotion) return;
    const timer = setInterval(() => {
      setActiveWordIdx((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isReducedMotion]);

  // Determine which tabs to display (hide if folder/items empty)
  const visibleTabs = allTabs.filter((tab) => {
    if (tab.key === "all") {
      return (portfolioData.all?.length || 0) > 0;
    }
    const items = portfolioData[tab.key] as PortfolioVideoItem[] | undefined;
    return items && items.length > 0;
  });

  // Current active list
  const currentItems: PortfolioVideoItem[] =
    activeTab === "all"
      ? (portfolioData.all as PortfolioVideoItem[]) || []
      : (portfolioData[activeTab] as PortfolioVideoItem[]) || [];

  // Hide section completely if 0 videos in total
  if (!portfolioData.all || portfolioData.all.length === 0) {
    return null;
  }

  // Carousel navigation arrows
  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.75;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="work-section" className="relative py-20 md:py-28 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header: Pure white heading, no pill, subline with rotating niche in purple #A24BFF */}
        <div className="text-center max-w-[720px] mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Watch our work
          </h2>
          <p className="text-sm sm:text-base text-[#A0A0B0] max-w-[680px] mx-auto">
            High-converting edits crafted for{" "}
            <span id="rotating-niche-word" className="text-[#A24BFF] font-semibold transition-all duration-300">
              {rotatingWords[activeWordIdx]}
            </span>
            . Every reel below was delivered within 24 hours.
          </p>
        </div>

        {/* Video Type Tabs Filter (Hide tab if its folder is empty) */}
        {visibleTabs.length > 1 && (
          <div className="flex items-center justify-center gap-2 mb-8 sm:mb-10 flex-wrap">
            {visibleTabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  data-portfolio-tab={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-brand-gradient text-white shadow-md shadow-purple-500/20 scale-105"
                      : "bg-[#14141C] text-[#A0A0B0] hover:text-white border border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Carousel Container */}
        <div className="relative group/carousel">
          {/* Desktop Navigation Arrows */}
          <button
            type="button"
            data-scroll-arrow="left"
            onClick={() => scrollCarousel("left")}
            aria-label="Scroll left"
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#14141C]/90 hover:bg-[#A24BFF] text-white hover:text-white border border-white/15 items-center justify-center shadow-xl transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            data-scroll-arrow="right"
            onClick={() => scrollCarousel("right")}
            aria-label="Scroll right"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#14141C]/90 hover:bg-[#A24BFF] text-white hover:text-white border border-white/15 items-center justify-center shadow-xl transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Swipe Carousel (Plain 9:16 cards on phone & desktop) */}
          <div
            ref={carouselRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 px-1 sm:px-2 scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {currentItems.map((item) => (
              <div
                key={item.id}
                data-portfolio-card={item.id}
                data-video-url={item.videoUrl}
                data-video-title={item.title}
                data-video-type={item.type}
                onClick={() => setSelectedVideo(item)}
                className="portfolio-card snap-start shrink-0 relative rounded-2xl overflow-hidden bg-[#14141C] border border-white/[0.08] hover:border-[#A24BFF]/60 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-2xl hover:scale-[1.02]"
                style={{
                  width: "240px",
                  minWidth: "220px",
                  height: "426px",
                  aspectRatio: "9 / 16",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                {/* Poster Image */}
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    position: "absolute",
                    inset: 0,
                  }}
                  className="group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

                {/* Center Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-brand-gradient text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Bottom Title & Type Pill */}
                <div className="absolute bottom-3 inset-x-3 pointer-events-none">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A24BFF] bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 inline-block mb-1">
                    {item.type === "ads" ? "Ad Video" : "Short-Form"}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white line-clamp-2 drop-shadow-md">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Single CTA Below */}
        <div className="mt-12 sm:mt-16 text-center">
          <Button
            variant="primary"
            size="lg"
            ctaPosition="portfolio"
            magnetic={true}
            onClick={() => openAuditModal("portfolio")}
            className="w-full sm:w-auto text-sm sm:text-base px-8 font-bold shadow-lg shadow-purple-500/15"
          >
            <span>Book My Free Content Audit</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Video Lightbox Modal with Audio */}
      <VideoLightbox
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        onBookClick={() => openAuditModal("lightbox")}
      />
    </section>
  );
}
