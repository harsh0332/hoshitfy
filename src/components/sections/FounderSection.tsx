"use client";

import React from "react";

export function FounderSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="max-w-4xl mx-auto p-6 sm:p-10 md:p-12 rounded-2xl bg-[#14141C] border border-white/[0.08] shadow-2xl relative overflow-hidden">
          {/* Subtle background ambient blur */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#A24BFF]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center">
            {/* Founder Monogram Tile (DS) */}
            <div className="flex flex-col items-center shrink-0">
              <div
                className="relative rounded-2xl overflow-hidden bg-[#0A0A0F] border border-white/[0.08] shadow-[0_0_30px_rgba(162,75,255,0.15)] select-none shrink-0 flex flex-col items-center justify-center"
                style={{ width: "208px", height: "260px" }}
              >
                <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-3">
                  <span className="font-heading text-3xl font-extrabold text-[#A24BFF] tracking-wider">
                    DS
                  </span>
                </div>
                <span className="text-xs uppercase tracking-widest text-[#A0A0B0] font-semibold">
                  Founder
                </span>
              </div>
            </div>

            {/* Founder Details & Short Story (Max ~60 words) */}
            <div className="flex flex-col text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1.5">
                Dhanraj Singh
              </h3>

              {/* Chips: 4 yrs · 100+ businesses on one line */}
              <p className="text-xs sm:text-sm font-semibold text-[#A24BFF] mb-4">
                4 years · 100+ businesses
              </p>

              {/* Short Story (Under 60 words: exactly 43 words) */}
              <p className="text-sm sm:text-base text-[#A0A0B0] leading-relaxed">
                &ldquo;I built Host Editify after watching ambitious founders lose revenue to delayed, unreliable video editors. We replaced slow turnarounds with an agile 24-hour delivery system so you can focus entirely on recording and closing clients, while we transform raw clips into high-converting assets.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
