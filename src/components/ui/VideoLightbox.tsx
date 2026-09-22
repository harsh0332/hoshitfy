"use client";

import React, { useEffect, useRef } from "react";
import { X, Volume2, ArrowRight } from "lucide-react";
import { VideoItem } from "./VideoCard";
import { Button } from "./Button";
import { trackVideoEngagement } from "@/lib/tracking";

interface VideoLightboxProps {
  video: VideoItem | null;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Backdrop click area */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Lightbox Container */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col md:flex-row bg-[#14141C] border border-white/15 rounded-[28px] overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/70 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Column (9:16 Aspect) */}
        <div className="relative w-full md:w-[420px] aspect-[9/16] bg-black flex items-center justify-center shrink-0">
          {video.fullVideoUrl ? (
            <video
              ref={videoRef}
              src={video.fullVideoUrl}
              controls
              autoPlay
              playsInline
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-brand-gradient flex items-center justify-center mb-4 text-white shadow-lg">
                <Volume2 className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#1EC8FF] mb-2">
                {video.category} Reel Slot
              </span>
              <h3 className="text-white text-lg font-bold mb-2">{video.title}</h3>
              <p className="text-xs text-[#A0A0B0] max-w-xs mb-4">
                Full 4K client video slot. Delivered to client in 21 hours with color grading, captions &amp; motion graphics.
              </p>
              <div className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/10 text-[11px] font-mono text-white/60">
                Duration: {video.duration}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info & Action Column */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {video.category}
              </span>
              <span className="text-xs font-mono text-[#A0A0B0]">{video.duration}</span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
              {video.title}
            </h2>

            {video.metric && (
              <div className="inline-block px-3 py-1.5 rounded-xl bg-[#1EC8FF]/10 border border-[#1EC8FF]/30 text-[#1EC8FF] text-sm font-semibold mb-4">
                Result: {video.metric}
              </div>
            )}

            <div className="space-y-3 text-sm text-[#A0A0B0] border-t border-white/10 pt-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Edited and delivered in under 21 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Custom subtitle animations + sound design</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Curated AI &amp; stock B-roll integration</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>2 revision rounds included</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-[#A0A0B0] mb-3">
              Want your raw footage transformed into high-retention content like this?
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={handleBook}
              className="w-full flex items-center justify-center gap-2"
            >
              <span>Book My Free Content Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
