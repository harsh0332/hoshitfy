"use client";

import React from "react";
import { MessageSquareQuote, CheckCheck } from "lucide-react";

const quotes = [
  { text: "I filmed it three weeks ago and it's still not posted.", time: "11:14 PM" },
  { text: "I don't have time to sit and edit for hours.", time: "11:21 PM" },
  { text: "By the time I finish editing, the trend is already dead.", time: "11:42 PM" },
  { text: "I paid a freelancer and it came back looking nothing like what I wanted.", time: "12:05 AM" },
  { text: "I know I should post more. I just don't have the bandwidth.", time: "12:18 AM" },
];

export function PainSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Sound Familiar?</span>
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Your best content is sitting in your camera roll.
        </h2>
        <p className="text-sm sm:text-base text-[#A0A0B0] max-w-xl mx-auto mb-12">
          Dubai founders live on WhatsApp. Here is what they text us before they start working with Host Editify:
        </p>

        {/* WhatsApp-style Chat Bubbles Stack */}
        <div className="flex flex-col gap-4 max-w-lg mx-auto text-left mb-14">
          {quotes.map((q, idx) => (
            <div
              key={idx}
              className="relative p-4 rounded-2xl rounded-tl-sm bg-[#14141C] border border-white/10 shadow-lg hover:border-purple-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                &ldquo;{q.text}&rdquo;
              </p>
              <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-[#A0A0B0] font-mono">
                <span>{q.time}</span>
                <CheckCheck className="w-3.5 h-3.5 text-[#1EC8FF]" />
              </div>
            </div>
          ))}
        </div>

        {/* Closing Truth Callout */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#14141C] via-[#1A1626] to-[#14141C] border border-white/10 max-w-2xl mx-auto">
          <p className="text-base sm:text-lg text-white font-medium italic leading-relaxed">
            &ldquo;You&apos;re not lazy. You&apos;re running a business. Every hour in CapCut is an hour not spent closing a deal, taking a client call or growing your brand.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
