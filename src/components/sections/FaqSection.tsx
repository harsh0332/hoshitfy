"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
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
    q: "How does remote coordination work across India and Dubai?",
    a: "Our core production team is based in India and operates directly across Indian (IST) and Dubai (GST) business hours. You drop raw files in a shared Google Drive folder, get immediate updates on WhatsApp, and meet us weekly on Google Meet. Being remote is exactly why we deliver within 24 hours at exceptional efficiency.",
  },
  {
    q: "What does 24 hours mean exactly?",
    a: site.deliveryFinePrint,
  },
  {
    q: "What don't you do?",
    a: "We specialize strictly in high-retention short-form video editing for founders, coaches, and brands. We do NOT film on-site or provide camera crews (we edit the raw footage you shoot on your phone), we do NOT do weddings or social event videos, we do NOT shoot corporate documentaries, and we do NOT create heavy 3D CGI or character VFX. Staying 100% focused on short-form editing is why our 24-hour delivery turnaround never slips.",
  },
  {
    q: "Do you do multi-language subtitles?",
    a: "Yes. While our primary team communicates and edits in English, we provide accurate subtitles and captions in English, Hindi, and Arabic upon request.",
  },
  {
    q: "Which time zone do you work in?",
    a: "We operate across Indian IST (UTC+5:30) and Dubai GST (UTC+4), Monday through Friday. Your dedicated editor is online and responsive during your active business day.",
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
    a: "Compare it to losing 8–15 hours of your highest-value sales time every week, or the heavy monthly expense of recruiting, training, and managing a full-time in-house editor. On your free audit call, we will break down the exact ROI numbers for your business.",
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
    a: "That is completely fine. Start with the free audit and free sample edit. There is zero financial commitment or risk until you have experienced the 24-hour turnaround firsthand.",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

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
    <section id="faq-section" className="relative py-20 md:py-28 bg-[#14141C] border-y border-white/[0.06] overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header: Pure white heading, no pill, subline */}
        <div className="text-center max-w-[720px] mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Frequently asked questions
          </h2>
          <p className="text-sm sm:text-base text-[#A0A0B0] max-w-[680px] mx-auto">
            Everything you need to know about turnaround times, remote coordination, and file ownership.
          </p>
        </div>

        {/* Accordion Stack: max-w-[760px] */}
        <div className="max-w-[760px] mx-auto space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={cn(
                  "rounded-2xl border transition-all duration-200 overflow-hidden",
                  isOpen
                    ? "bg-[#0A0A0F] border-[#A24BFF]/40 shadow-lg"
                    : "bg-[#0A0A0F]/60 border-white/[0.08] hover:border-white/20"
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
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0 border border-white/[0.08]">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#A24BFF]" strokeWidth={2} />
                    ) : (
                      <Plus className="w-4 h-4 text-white/70" strokeWidth={2} />
                    )}
                  </div>
                </button>

                <div
                  className={cn(
                    "faq-answer px-5 pb-6 sm:px-6 sm:pb-6 pt-0 text-sm sm:text-base text-[#A0A0B0] leading-relaxed border-t border-white/[0.06] mt-1 font-normal",
                    !isOpen && "hidden"
                  )}
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
