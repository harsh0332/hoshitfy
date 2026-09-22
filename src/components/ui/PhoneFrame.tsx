"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function PhoneFrame({ children, className, glow = true }: PhoneFrameProps) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[320px] aspect-[9/16]", className)}>
      {/* Ambient Brand Glow behind phone */}
      {glow && (
        <div className="absolute -inset-4 bg-gradient-to-tr from-[#3B6BFF]/20 via-[#A24BFF]/30 to-[#FF8A1E]/20 rounded-[48px] blur-2xl -z-10 opacity-75 animate-pulse" />
      )}

      {/* Titanium Frame Exterior */}
      <div className="relative w-full h-full rounded-[38px] p-2.5 bg-gradient-to-b from-[#2A2A38] via-[#14141C] to-[#0A0A0F] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/10 overflow-hidden">
        {/* Inner Bezel */}
        <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-[#0A0A0F] flex flex-col">
          {/* Dynamic Island / Top Camera Pill */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-end px-2">
            <div className="w-2 h-2 rounded-full bg-[#14141C] border border-white/10" />
          </div>

          {/* Screen Content */}
          <div className="relative w-full h-full overflow-hidden">
            {children}
          </div>

          {/* Home indicator bar at bottom */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full z-30" />
        </div>
      </div>
    </div>
  );
}
