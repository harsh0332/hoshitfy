"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site.config";

const faqs = [
  {
    q: "Won't AI editing look cheap and robotic?",
    a: "No. Around 80% of every video is edited by human creative editors. AI only assists with B-roll sourcing, audio leveling, and visual pacing consistency. Your audience sees a polished, human-crafted video—never robotic AI slop.",
  },
  {
    q: "My nephew or an intern can use CapCut.",
    a: "Most people know how to trim clips in CapCut or VN. You are not paying for editing software; you are paying for reliable weekly delivery, immaculate visual authority, and the hours you get back to close high-ticket clients.",
  },
  {
    q: "You're not in Dubai. How do we work together?",
    a: "Our core production team is based in India and operates directly on Dubai hours (GST, UTC+4). You drop raw files in a shared Google Drive folder, get immediate updates on WhatsApp, and meet us weekly on Google Meet. Being remote is exactly why we deliver within 21 hours at exceptional efficiency.",
  },
  {
    q: "What does 21 hours mean exactly?",
    a: site.deliveryFinePrint,
  },
  {
    q: "Do you do Arabic subtitles?",
    a: "Yes. While our primary team communicates and edits in English, we provide accurate Arabic subtitles and captions for Dubai real estate walkthroughs and regional campaigns upon request.",
  },
  {
    q: "Which time zone do you work in?",
    a: "We work on Dubai GST (Gulf Standard Time, UTC+4), Monday through Friday. Your dedicated editor is online and responsive during your active business day.",
  },
  {
    q: "I already have an editor.",
    a: "Keep them! Many of our clients keep their in-house or freelance editor and use Host Editify for overflow capacity so their posting schedule never breaks when their team is overloaded, sick, or on holiday.",
  },
  {
    q: "What if I don't like the edits?",
    a: "You see your first short-form video (up to 40 seconds) edited completely free before paying anything. Once onboarded, every video includes 2 revision rounds (4 on Authority) to guarantee it matches your exact aesthetic.",
  },
  {
    q: "It looks expensive.",
    a: "Compare it to losing 8–15 hours of your highest-value sales time every week, or to the AED 10,000+/month required to hire, visa-sponsor, insure, and manage an in-house editor in Dubai. On your free audit call, we will break down the exact ROI numbers for your business.",
  },
  ...(site.priceLockPromise
    ? [
        {
          q: "Will the price go up after a month or two?",
          a: "No. Your plan price stays locked for as long as you maintain your monthly partnership with us.",
        },
      ]
    : []),
  {
    q: "Is my footage safe?",
    a: "Yes. We execute a mutual Non-Disclosure Agreement (NDA) before any files are shared. All client raw footage and project archives are stored on encrypted drives, and you retain 100% intellectual property ownership.",
  },
  {
    q: "I need to think about it.",
    a: "That is completely fine. Start with the free audit and free sample edit. There is zero financial commitment or risk until you have experienced the 21-hour turnaround firsthand.",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  // Structured Data for Google Rich Results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <section id="faq-section" className="relative py-20 md:py-32 bg-[#14141C] border-y border-white/5 overflow-hidden">
      {/* Inject FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-cyan-500/10 text-[#1EC8FF] border border-cyan-500/30 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Answers before you ask.
          </h2>
          <p className="text-base text-[#A0A0B0]">
            Everything you need to know about turnaround times, remote coordination, and file ownership.
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-3.5">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={cn(
                  "rounded-2xl border transition-all duration-200 overflow-hidden",
                  isOpen
                    ? "bg-[#0A0A0F] border-purple-500/40 shadow-lg"
                    : "bg-[#0A0A0F]/60 border-white/10 hover:border-white/20"
                )}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white leading-snug">
                    {item.q}
                  </span>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full bg-[#14141C] flex items-center justify-center text-white shrink-0 transition-transform duration-300 border border-white/10",
                      isOpen ? "rotate-180 text-[#1EC8FF] border-[#1EC8FF]/40" : ""
                    )}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 text-sm sm:text-base text-[#A0A0B0] leading-relaxed border-t border-white/5 mt-1 animate-in fade-in-50 duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
