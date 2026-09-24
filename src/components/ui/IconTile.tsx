import React from "react";
import { LucideIcon } from "lucide-react";

interface IconTileProps {
  icon: LucideIcon;
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: "purple" | "white";
}

export function IconTile({
  icon: Icon,
  size = 22,
  strokeWidth = 1.75,
  className = "",
  color = "purple",
}: IconTileProps) {
  return (
    <div
      className={`w-11 h-11 shrink-0 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center transition-all ${className}`}
    >
      <Icon
        size={size}
        strokeWidth={strokeWidth}
        className={color === "purple" ? "text-[#A24BFF]" : "text-white/80"}
      />
    </div>
  );
}

export function NumberTile({
  number,
  className = "",
}: {
  number: string;
  className?: string;
}) {
  return (
    <div
      className={`w-11 h-11 shrink-0 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center font-heading font-bold text-sm text-[#A24BFF] transition-all ${className}`}
    >
      {number}
    </div>
  );
}
