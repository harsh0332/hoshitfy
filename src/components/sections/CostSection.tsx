"use client";

import React from "react";
import { Clock, TrendingDown, Users, AlertCircle, XCircle } from "lucide-react";
import { IconTile } from "@/components/ui/IconTile";

const consequences = [
  {
    icon: TrendingDown,
    text: "Your posting stays inconsistent, so the algorithm forgets you.",
  },
  {
    icon: Users,
    text: "A competitor who posts daily becomes 'the name' in your niche.",
  },
  {
    icon: XCircle,
    text: "Enquiries that should have come from content go to someone else.",
  },
  {
    icon: Clock,
    text: "You're still editing at 11pm, still not getting the results.",
  },
];

export function CostSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#14141C] border-y border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header: Pure white 2-line balanced heading without gradient, no pill */}
        <div className="text-center max-w-[720px] mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Editing isn&apos;t costing you time. <br className="hidden sm:inline" />
            It&apos;s costing you deals.
          </h2>
        </div>

        {/* 2-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
          {/* Big Number Card: Stable 8–15 display */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-[#0A0A0F] border border-white/[0.08] shadow-xl text-center flex flex-col items-center justify-center relative overflow-hidden">
            <IconTile icon={Clock} size={24} className="mb-5" />

            <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-2">
              8–15
            </div>
            <span className="text-sm sm:text-base font-semibold text-white/90 uppercase tracking-wider mb-3">
              Hours Lost Every Week
            </span>
            <p className="text-xs sm:text-sm text-[#A0A0B0] max-w-xs leading-relaxed">
              That&apos;s up to <strong className="text-white font-semibold">60 hours a month</strong> of your highest-value sales and strategic focus burned on timeline cuts.
            </p>
          </div>

          {/* 6-Month Consequences List with Standard Icon Tiles */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#0A0A0F] border border-white/[0.08]">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
              Keep going like this for 6 months and here&apos;s what happens:
            </h3>

            <div className="space-y-4 mb-6">
              {consequences.map((c, idx) => (
                <div key={idx} className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <IconTile icon={c.icon} size={20} className="w-9 h-9 rounded-lg" color="white" />
                  <p className="text-xs sm:text-sm text-[#A0A0B0] font-medium leading-snug">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>

            {/* India & Dubai Market Reality Callout */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <p className="text-xs sm:text-sm text-white/80 font-medium">
                📍 <strong className="text-white font-bold">In India &amp; Dubai</strong>, the founder, agent, or coach who shows up in the feed every single day wins the client&apos;s trust. Right now, that isn&apos;t you. It can be.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
