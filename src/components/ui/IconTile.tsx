import React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** The one icon tile style: 44x44, radius 12, rgba(255,255,255,0.06). */
export function IconTile({
  icon: Icon,
  size = 24,
  className,
}: {
  icon: LucideIcon;
  /** 24 for cards, 20 for list rows */
  size?: 20 | 24;
  className?: string;
}) {
  return (
    <div className={cn("icon-tile", className)}>
      <Icon size={size} strokeWidth={1.75} className="text-[#A24BFF]" aria-hidden />
    </div>
  );
}

/** Same tile, showing a step number instead of an icon. */
export function NumberTile({ number, className }: { number: string; className?: string }) {
  return (
    <div className={cn("icon-tile font-heading text-base font-bold text-[#A24BFF]", className)}>
      {number}
    </div>
  );
}
