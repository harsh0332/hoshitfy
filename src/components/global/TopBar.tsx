"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

export function TopBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Monthly client capacity announcement"
      className="relative z-50 w-full bg-[#0D0D14] border-b border-white/[0.08] px-4 py-2.5 text-center text-xs font-medium text-white/90 shadow-sm flex items-center justify-center"
    >
      <p className="text-center font-medium">
        Only 5 client spots available this month
      </p>

      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 p-1 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
        aria-label="Dismiss announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
}
