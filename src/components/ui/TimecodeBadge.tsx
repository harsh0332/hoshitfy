"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TimecodeBadgeProps {
  timecode: string;
  label?: string;
  className?: string;
  pulse?: boolean;
}

export function TimecodeBadge({
  timecode,
  label,
  className,
  pulse = false,
}: TimecodeBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#14141C]/90 border border-white/10 backdrop-blur-md font-mono text-[11px] tracking-wider text-[#A0A0B0]",
        className
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          pulse ? "bg-[#FF3D8B] animate-ping" : "bg-[#1EC8FF]"
        )}
      />
      {label && <span className="text-[#666678] uppercase">{label}</span>}
      <span className="text-white font-medium">{timecode}</span>
    </div>
  );
}
