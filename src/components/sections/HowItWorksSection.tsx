"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NumberTile } from "@/components/ui/IconTile";
import { useAuditModal } from "@/context/AuditModalContext";

const steps = [
  {
    number: "01",
    title: "Drop raw footage in Google Drive",
    desc: "Record on your phone. No fancy cameras. Drop unedited clips directly into your dedicated Drive folder.",
  },
  {
    number: "02",
    title: "Get publish-ready videos in 24 hours",
    desc: "Our editors cut dead air, craft hooks, add B-roll, animate subtitles, and color-grade to your brand in 24 hours.",
  },
  {
    number: "03",
    title: "Review, approve, and post",
    desc: "Preview on your phone. Request instant tweaks with 2 included revisions, or download and publish immediately.",
  },
];

export function HowItWorksSection() {
  const { openAuditModal } = useAuditModal();

  return (
    <section id="process-section" className="relative py-20 md:py-28 bg-[#101018] border-y border-white/[0.06] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header: Pure white heading, no pill, subline */}
        <div className="text-center max-w-[720px] mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            How it works
          </h2>
          <p className="text-sm sm:text-base text-[#A0A0B0] max-w-[680px] mx-auto">
            Three simple steps. No calls every day, no chasing.
          </p>
        </div>

        {/* 3 Equal Columns on Desktop, Vertical Stack on Phone */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {steps.map((item) => (
            <div
              key={item.number}
              className="p-6 sm:p-7 rounded-2xl bg-[#14141C] border border-white/[0.08] shadow-md flex flex-col justify-between group hover:border-[#A24BFF]/40 transition-all duration-300"
            >
              <div>
                <div className="mb-5">
                  <NumberTile number={item.number} />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A0A0B0] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-12 sm:mt-16 text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => openAuditModal("how-it-works")}
            className="w-full sm:w-auto text-sm sm:text-base px-8 font-bold shadow-lg shadow-purple-500/15"
          >
            <span>Try it free with 1 video</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
