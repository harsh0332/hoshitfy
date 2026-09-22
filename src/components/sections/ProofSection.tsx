"use client";

import React from "react";
import { Award, ArrowRight, Quote } from "lucide-react";
import { site } from "@/lib/site.config";
import { Button } from "@/components/ui/Button";

const testimonials = [
  {
    quote:
      "The 21-hour turnaround isn't a marketing gimmick. We dropped 6 reels in Google Drive on Monday morning and had fully graded, captioned videos ready for scheduling by Tuesday morning. Our client ad CTR consistently averages 2.5%.",
    name: "Rudra Sahu",
    role: "Owner",
    company: "Bluhawk Marketing",
    initials: "RS",
  },
  {
    quote:
      "As a health professional, looking authentic and medically authoritative on camera is everything. Host Editify understood my clinical tone instantly, removing the anxiety of editing while maintaining immaculate visual pacing.",
    name: "Dr. Kokila",
    role: "Founder",
    company: "Heart to Mind",
    initials: "DK",
  },
  {
    quote:
      "In the entertainment industry, when a cultural moment hits, you have hours—not days—to publish. Having a dedicated team deliver in under 21 hours gave us our competitive edge back without managing freelancers.",
    name: "Shivanshu Mishra",
    role: "Creative Lead",
    company: "DPM Entertainment",
    initials: "SM",
  },
];

export function ProofSection() {
  const scrollToBooking = () => {
    const el = document.getElementById("booking-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 md:py-32 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Real Verified Feedback</span>
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            What our clients say.
          </h2>
          <p className="text-base text-[#A0A0B0]">
            No fabricated reviews. Verified founders and agencies whose pipelines run on Host Editify.
          </p>
        </div>

        {/* Verified Stats Row (Only renders non-null stats from site.config.ts) */}
        {site.stats.adCtr && (
          <div className="max-w-md mx-auto mb-16 p-6 rounded-2xl bg-[#14141C] border border-white/10 text-center shadow-lg">
            <span className="text-xs uppercase font-mono tracking-widest text-[#1EC8FF]">
              Verified Client Performance (AI Buddies)
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white mt-1 mb-1">
              <span className="text-brand-gradient">{site.stats.adCtr}</span>
            </div>
            <p className="text-xs text-[#A0A0B0]">
              Average Ad Click-Through Rate on Meta video campaigns
            </p>
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-[#14141C] border border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-purple-400/40 mb-4" />
                <p className="text-sm sm:text-base text-white/90 font-normal leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
                  {t.initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">{t.name}</span>
                  <span className="text-xs text-[#A0A0B0]">
                    {t.role}, <strong className="text-white/80">{t.company}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="flex justify-center">
          <Button
            variant="primary"
            size="lg"
            ctaPosition="proof"
            onClick={scrollToBooking}
            className="flex items-center gap-2 text-base font-bold px-8 py-4"
          >
            <span>Get My Free Edit</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
