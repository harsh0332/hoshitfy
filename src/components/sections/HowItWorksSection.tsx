"use client";

import React from "react";
import { PhoneCall, FolderUp, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const steps = [
  {
    number: "01",
    timecode: "00:00:00",
    title: "Book your free content audit",
    desc: "We study your profile before the call, then show you what's working, what isn't, and what to post next.",
    icon: PhoneCall,
    badge: "Day 0 · 30-Min Meet",
  },
  {
    number: "02",
    timecode: "00:00:01",
    title: "Drop your footage in Google Drive",
    desc: "Your shared Drive folder is ready on day one. Drop raw clips whenever you film. Add notes or references if you want.",
    icon: FolderUp,
    badge: "Shared Drive Folder",
  },
  {
    number: "03",
    timecode: "00:21:00",
    title: "Get publish-ready videos in 21 hours",
    desc: "Review them, request up to 2 revisions, and post. WhatsApp updates + weekly project call on Google Meet.",
    icon: Zap,
    badge: "21h Delivery Guarantee",
  },
];

export function HowItWorksSection() {
  const scrollToBooking = () => {
    const el = document.getElementById("booking-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="process-section" className="relative py-20 md:py-32 bg-[#14141C] border-y border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/30">
              The 21-Hour Pipeline
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            From raw footage to posted in <br className="hidden sm:inline" />
            <span className="text-brand-gradient">3 simple steps.</span>
          </h2>
          <p className="text-base text-[#A0A0B0]">
            No complex project management software, no endless Slack channels. A frictionless pipeline engineered for speed.
          </p>
        </div>

        {/* Timeline Sequence Layout */}
        <div className="relative mb-16">
          {/* Desktop Connecting Timeline Neon Track */}
          <div className="hidden md:block absolute top-1/2 left-[12%] right-[12%] -translate-y-1/2 h-0.5 bg-gradient-to-r from-[#1EC8FF] via-[#A24BFF] to-[#FF8A1E] z-0 opacity-60" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="relative p-6 sm:p-8 rounded-3xl bg-[#0A0A0F] border border-white/10 hover:border-purple-500/50 shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Top Bar with Number & Timecode */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white/30 group-hover:text-brand-gradient transition-colors">
                      {step.number}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#14141C] text-[11px] font-mono text-[#1EC8FF] border border-white/10">
                      {step.timecode}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center text-white mb-4 shadow-[0_0_20px_rgba(162,75,255,0.4)] group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2.5 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#A0A0B0] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom Badge */}
                  <div className="pt-4 border-t border-white/10">
                    <span className="text-xs font-mono font-medium text-white/70">
                      {step.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button
            variant="primary"
            size="lg"
            ctaPosition="how-it-works"
            onClick={scrollToBooking}
            className="flex items-center gap-2 text-base font-bold px-8 py-4"
          >
            <span>Book My Free Content Audit</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
