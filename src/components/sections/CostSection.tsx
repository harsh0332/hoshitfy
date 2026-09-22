"use client";

import React, { useState, useEffect, useRef } from "react";
import { XCircle, TrendingDown, Clock } from "lucide-react";

const consequences = [
  "Your posting stays inconsistent, so the algorithm forgets you.",
  "A competitor who posts daily becomes 'the name' in your niche.",
  "Enquiries that should have come from content go to someone else.",
  "You're still editing at 11pm, still not getting the results.",
];

export function CostSection() {
  const [hoursMin, setHoursMin] = useState(0);
  const [hoursMax, setHoursMax] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let start = 0;
          const duration = 1200;
          const stepTime = 30;
          const steps = duration / stepTime;
          const minIncrement = 8 / steps;
          const maxIncrement = 15 / steps;

          const timer = setInterval(() => {
            start += stepTime;
            setHoursMin(Math.min(8, Math.round(start * minIncrement / 10) * 10 || Math.floor(start * minIncrement)));
            setHoursMax(Math.min(15, Math.floor(start * maxIncrement)));

            if (start >= duration) {
              setHoursMin(8);
              setHoursMax(15);
              clearInterval(timer);
            }
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-[#14141C] border-y border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>The Cost of Delay</span>
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Editing isn&apos;t costing you time. <br className="hidden sm:inline" />
            It&apos;s costing you <span className="text-[#FF3D8B]">deals.</span>
          </h2>
        </div>

        {/* 2-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Big Number Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#0A0A0F] border border-white/10 shadow-2xl text-center flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF8A1E]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="w-12 h-12 rounded-2xl bg-[#FF8A1E]/10 border border-[#FF8A1E]/30 flex items-center justify-center text-[#FF8A1E] mb-4">
              <Clock className="w-6 h-6" />
            </div>

            <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-mono tracking-tight text-white mb-2">
              <span className="text-brand-gradient">
                {hoursMin}–{hoursMax}
              </span>
            </div>
            <span className="text-base sm:text-lg font-semibold text-white uppercase tracking-wider mb-2">
              Hours Lost Every Week
            </span>
            <p className="text-xs sm:text-sm text-[#A0A0B0] max-w-xs">
              That&apos;s up to <strong className="text-white font-semibold">60 hours a month</strong> of your highest-value sales and strategic focus burned on timeline cuts.
            </p>
          </div>

          {/* 6-Month Consequences List */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
              Keep going like this for 6 months and here&apos;s what happens:
            </h3>

            <div className="space-y-4 mb-8">
              {consequences.map((c, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#0A0A0F]/60 border border-white/5">
                  <XCircle className="w-5 h-5 text-[#FF3D8B] shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-[#A0A0B0] font-medium leading-snug">
                    {c}
                  </p>
                </div>
              ))}
            </div>

            {/* Dubai Market Reality Callout */}
            <div className="p-4 rounded-xl bg-[#1A1626] border border-purple-500/30">
              <p className="text-xs sm:text-sm text-purple-200 font-medium">
                📍 <strong className="text-white font-bold">In Dubai</strong>, the agent or coach who shows up in the feed every single day wins the client&apos;s trust. Right now, that isn&apos;t you. It can be.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
