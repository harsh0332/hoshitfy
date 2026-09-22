"use client";

import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { site } from "@/lib/site.config";

export function TopBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Monthly client capacity announcement"
      className="relative z-50 w-full bg-gradient-to-r from-[#14141C] via-[#2A1230] to-[#14141C] border-b border-pink-500/30 px-4 py-2 text-center text-xs font-medium text-white shadow-md flex items-center justify-center gap-2"
    >
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-pink-500/20 text-[#FF3D8B] font-bold text-[10px] tracking-wider uppercase border border-pink-500/40">
          <Sparkles className="w-3 h-3" />
          <span>Strict Limit</span>
        </span>
        <p className="inline text-white/90">
          Only <strong className="text-white font-bold">{site.maxClientsPerMonth} new clients</strong> onboarded per month.
          {site.spotsLeftThisMonth !== null && (
            <span className="text-[#FF8A1E] font-semibold ml-1.5">
              · Only {site.spotsLeftThisMonth} spot{site.spotsLeftThisMonth === 1 ? "" : "s"} remaining for this month
            </span>
          )}
        </p>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
}
