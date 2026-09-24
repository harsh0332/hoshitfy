"use client";

import React, { useEffect, useRef } from "react";
import { X, ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { trackVideoEngagement } from "@/lib/tracking";

export interface PortfolioVideoItem {
  id: string;
  title: string;
  type?: string;
  videoUrl: string;
  posterUrl: string;
}

interface VideoLightboxProps {
  video: PortfolioVideoItem | null;
  onClose: () => void;
  onBookClick?: () => void;
}

export function VideoLightbox({ video, onClose, onBookClick }: VideoLightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Ensure video unmuted and plays with sound when opened
  useEffect(() => {
    if (video && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: if browser blocks unmuted autoplay, mute and try again
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, [video]);

  if (!video) return null;

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    if (progress > 50 && progress < 55) {
      trackVideoEngagement(video.title, 50);
    }
  };

  const handleBook = () => {
    onClose();
    if (onBookClick) onBookClick();
    const el = document.getElementById("booking-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Backdrop click area */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Lightbox Container */}
      <div className="relative z-10 w-full max-w-sm md:max-w-3xl max-h-[92vh] flex flex-col md:flex-row bg-[#14141C] border border-white/15 rounded-2xl md:rounded-[28px] overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/70 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/15"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Column (9:16 Aspect that fits phone screen) */}
        <div className="relative w-full md:w-[360px] aspect-[9/16] max-h-[75vh] md:max-h-[85vh] bg-black flex items-center justify-center shrink-0 mx-auto">
          <video
            ref={videoRef}
            src={video.videoUrl}
            controls
            autoPlay
            playsInline
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Desktop Sidebar Info / Mobile Compact Footer */}
        <div className="p-4 md:p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="hidden md:flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase bg-pink-500/20 text-[#FF3D8B] border border-pink-500/30">
                24h Deliverable
              </span>
            </div>

            <h3 className="text-base md:text-xl font-bold text-white mb-2 line-clamp-2">
              {video.title}
            </h3>

            <div className="hidden md:block space-y-2 text-xs text-[#A0A0B0] border-t border-white/10 pt-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Edited &amp; delivered in 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Custom captions + sound design</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>2 revision rounds included</span>
              </div>
            </div>
          </div>

          <div className="pt-2 md:pt-4 border-t border-white/10">
            <Button
              variant="primary"
              size="sm"
              onClick={handleBook}
              className="w-full text-xs sm:text-sm py-2.5 sm:py-3 flex items-center justify-center gap-1.5 font-bold"
            >
              <span>Book My Free Content Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
