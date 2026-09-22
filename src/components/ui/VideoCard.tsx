"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Play, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimecodeBadge } from "./TimecodeBadge";

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  previewUrl?: string;
  fullVideoUrl?: string;
  posterUrl: string;
  rawUrl?: string;
  metric?: string;
}

interface VideoCardProps {
  video: VideoItem;
  onSelect: (video: VideoItem) => void;
  className?: string;
}

export function VideoCard({ video, onSelect, className }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Desktop hover play
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (video.previewUrl && videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Mobile viewport centering auto-preview
  useEffect(() => {
    const card = cardRef.current;
    if (!card || !video.previewUrl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
            if (window.innerWidth < 768 && videoRef.current) {
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          } else {
            if (window.innerWidth < 768 && videoRef.current) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: [0.75] }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [video.previewUrl]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(video)}
      className={cn(
        "group relative w-full aspect-[9/16] rounded-[24px] overflow-hidden bg-[#14141C] border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_12px_36px_-8px_rgba(162,75,255,0.3)] select-none",
        className
      )}
    >
      {/* Background Poster Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={video.posterUrl}
          alt={video.title}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />
      </div>

      {/* Video Preview Element */}
      {video.previewUrl && (
        <video
          ref={videoRef}
          src={video.previewUrl}
          muted
          loop
          playsInline
          preload="none"
          className={cn(
            "absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-300",
            isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        />
      )}

      {/* Top Meta: Category & Duration */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-md text-white border border-white/10">
          {video.category}
        </span>
        <TimecodeBadge timecode={video.duration} />
      </div>

      {/* Center "PLAY" hover badge for Desktop */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-all duration-200",
          isHovered ? "scale-100 opacity-100" : "scale-90 opacity-0 md:opacity-0"
        )}
      >
        <div className="w-14 h-14 rounded-full bg-brand-gradient flex items-center justify-center shadow-[0_0_24px_rgba(255,61,139,0.7)] text-white">
          <Play className="w-6 h-6 fill-white ml-0.5" />
        </div>
      </div>

      {/* Bottom Info: Title, Metric, Audio indicator */}
      <div className="absolute bottom-4 inset-x-4 z-20 flex flex-col gap-1.5 pointer-events-none">
        {video.metric && (
          <span className="text-[12px] font-bold text-[#1EC8FF] tracking-wide">
            {video.metric}
          </span>
        )}
        <h4 className="text-white font-semibold text-sm line-clamp-2 drop-shadow-md">
          {video.title}
        </h4>
        <div className="flex items-center gap-1.5 text-white/60 text-[11px]">
          <Volume2 className="w-3.5 h-3.5" />
          <span>Click to watch with sound</span>
        </div>
      </div>
    </div>
  );
}
