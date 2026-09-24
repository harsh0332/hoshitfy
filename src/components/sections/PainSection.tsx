"use client";

import React from "react";
import { CheckCheck } from "lucide-react";

const quotes = [
  { text: "I filmed it three weeks ago and it's still not posted.", time: "11:14 PM" },
  { text: "I don't have time to sit and edit for hours.", time: "11:25 PM" },
  { text: "By the time I finish editing, the trend is already dead.", time: "11:42 PM" },
  { text: "I paid a freelancer and it came back looking nothing like what I wanted.", time: "12:05 AM" },
  { text: "I know I should post more. I just don't have the bandwidth.", time: "12:18 AM" },
];

export function PainSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 text-center">
        {/* Section Header: Pure white heading, no pill, subline */}
        <div className="max-w-[720px] mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Are you facing the same issues?
          </h2>
          <p className="text-sm sm:text-base text-[#A0A0B0] max-w-[680px] mx-auto">
            Your best content is sitting in your camera roll.
          </p>
        </div>

        {/* WhatsApp-style Chat Bubbles Stack (max-w-[520px]) */}
        <div className="flex flex-col gap-3.5 max-w-[520px] mx-auto text-left mb-10">
          {quotes.map((q, idx) => (
            <div
              key={idx}
              className="relative p-4 rounded-2xl rounded-tl-sm bg-[#14141C] border border-white/[0.08] shadow-md hover:border-[#A24BFF]/40 transition-all duration-300"
            >
              <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                &ldquo;{q.text}&rdquo;
              </p>
              <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-[#A0A0B0]">
                <span>{q.time}</span>
                <CheckCheck className="w-3.5 h-3.5 text-[#A24BFF]" />
              </div>
            </div>
          ))}
        </div>

        {/* Closing Truth Callout (max-w-[520px]) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#14141C] border border-white/[0.08] max-w-[520px] mx-auto text-center">
          <p className="text-sm sm:text-base text-white font-medium italic leading-relaxed">
            &ldquo;The real problem isn&apos;t your ideas. It&apos;s the editing bottleneck.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
