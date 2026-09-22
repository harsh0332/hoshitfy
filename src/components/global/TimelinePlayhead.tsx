"use client";

import React, { useEffect, useState } from "react";

export function TimelinePlayhead() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timecodeStr, setTimecodeStr] = useState("00:00:00");

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
      setScrollProgress(progress);

      // Map progress (0 -> 1) to timecode up to 21 hours (21:00:00)
      const totalSeconds = progress * 21 * 3600;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);

      const pad = (n: number) => n.toString().padStart(2, "0");
      setTimecodeStr(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="hidden lg:flex fixed left-5 xl:left-8 top-0 bottom-0 z-40 pointer-events-none flex-col items-center justify-between py-12 select-none">
      {/* Top timeline label */}
      <div className="flex flex-col items-center gap-1.5 opacity-80">
        <span className="text-[10px] font-mono tracking-widest text-[#666678] uppercase">
          TIMELINE
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#1EC8FF]" />
      </div>

      {/* Vertical Scrubber Track */}
      <div className="relative flex-1 w-px my-4 bg-white/10 overflow-visible">
        {/* Active Colored Fill Line */}
        <div
          className="absolute top-0 w-px bg-gradient-to-b from-[#1EC8FF] via-[#A24BFF] to-[#FF8A1E] transition-all duration-75"
          style={{ height: `${scrollProgress * 100}%` }}
        />

        {/* Moving Playhead Scrubber Node */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-75 flex items-center"
          style={{ top: `${scrollProgress * 100}%` }}
        >
          {/* Glowing Playhead Head */}
          <div className="relative flex items-center justify-center">
            <div className="w-3.5 h-3.5 rounded-full bg-brand-gradient shadow-[0_0_15px_#FF3D8B] border border-white" />
            <div className="absolute w-6 h-6 rounded-full bg-[#FF3D8B]/20 animate-ping" />
          </div>

          {/* Floating Timecode readout */}
          <div className="ml-3 px-2 py-0.5 rounded bg-[#14141C]/90 border border-white/15 backdrop-blur-md font-mono text-[10px] tracking-wider text-white shadow-lg whitespace-nowrap">
            <span className="text-[#1EC8FF]">TC: </span>
            <span>{timecodeStr}</span>
          </div>
        </div>

        {/* Clip Notches along the track */}
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-1.5 h-px bg-white/20" />
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-1.5 h-px bg-white/20" />
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-1.5 h-px bg-white/20" />
        <div className="absolute top-[75%] left-1/2 -translate-x-1/2 w-1.5 h-px bg-white/20" />
      </div>

      {/* Bottom Timeline Target Limit */}
      <div className="flex flex-col items-center gap-1 opacity-80">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FF8A1E]" />
        <span className="text-[10px] font-mono tracking-widest text-[#FF8A1E] font-semibold">
          21:00:00
        </span>
      </div>
    </div>
  );
}
