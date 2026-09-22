"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { MoveHorizontal, Sparkles, Video } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BeforeAfterPair {
  id: string;
  title: string;
  niche: string;
  rawPoster: string;
  editPoster: string;
  rawVideo?: string;
  editVideo?: string;
  details: string;
}

interface BeforeAfterSliderProps {
  pairs: BeforeAfterPair[];
  className?: string;
}

export function BeforeAfterSlider({ pairs, className }: BeforeAfterSliderProps) {
  const [activePairIndex, setActivePairIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activePair = pairs[activePairIndex] || pairs[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percent = (clampedX / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseMove, handleEnd, handleTouchMove]);

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Pair Switcher Tabs */}
      <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
        {pairs.map((pair, idx) => (
          <button
            key={pair.id}
            onClick={() => {
              setActivePairIndex(idx);
              setSliderPosition(50);
            }}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer border",
              activePairIndex === idx
                ? "bg-brand-gradient text-white border-transparent shadow-[0_0_15px_rgba(162,75,255,0.4)]"
                : "bg-[#14141C] text-[#A0A0B0] border-white/10 hover:border-white/30 hover:text-white"
            )}
          >
            {pair.title} ({pair.niche})
          </button>
        ))}
      </div>

      {/* Main Interactive Split Frame */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        className="relative mx-auto w-full max-w-[340px] md:max-w-[380px] aspect-[9/16] rounded-[32px] overflow-hidden bg-black border border-white/15 shadow-2xl select-none cursor-ew-resize"
      >
        {/* RIGHT LAYER: Edited Version (Full Background) */}
        <div className="absolute inset-0">
          <Image
            src={activePair.editPoster}
            alt="Host Editify Edited Version"
            fill
            sizes="380px"
            className="object-cover"
          />
          {/* Graded badge */}
          <div className="absolute bottom-5 right-4 z-10 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#A24BFF]/50 text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8A1E]" />
            <span>Host Editify Edit</span>
          </div>
        </div>

        {/* LEFT LAYER: Raw Version (Clipped by slider position) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full" style={{ width: containerRef.current?.clientWidth || "100%" }}>
            <Image
              src={activePair.rawPoster}
              alt="Raw Unedited Footage"
              fill
              sizes="380px"
              className="object-cover filter grayscale contrast-75 brightness-75"
            />
            {/* Raw badge */}
            <div className="absolute bottom-5 left-4 z-10 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[#A0A0B0] text-[11px] font-semibold flex items-center gap-1.5 shadow-md">
              <Video className="w-3.5 h-3.5" />
              <span>Raw Footage</span>
            </div>
          </div>
        </div>

        {/* Draggable Divider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 z-20 w-0.5 bg-gradient-to-b from-[#1EC8FF] via-[#FF3D8B] to-[#FF8A1E] shadow-[0_0_12px_rgba(255,255,255,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle Knob */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#14141C] border-2 border-white flex items-center justify-center shadow-[0_0_20px_rgba(162,75,255,0.8)] text-white">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Description caption */}
      <p className="text-center text-xs text-[#A0A0B0] mt-4 font-mono">
        Drag slider left &amp; right to compare raw camera roll footage vs. 21-hour finished edit.
      </p>
    </div>
  );
}
