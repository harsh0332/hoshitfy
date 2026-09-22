"use client";

import React from "react";
import Image from "next/image";
import { site } from "@/lib/site.config";

export function FounderSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#14141C] border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle background ambient blur */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Left: Founder Portrait Frame with Gradient Ring */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1.5 bg-brand-gradient shadow-[0_0_35px_rgba(162,75,255,0.4)] mb-4">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0A0A0F] border-2 border-black">
                  <Image
                    src="/brand/logo.png"
                    alt={site.founder.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-0.5">
                {site.founder.name}
              </h3>
              <span className="text-xs uppercase font-mono tracking-wider text-[#FF8A1E] font-medium mb-4">
                Founder · Host Editify
              </span>

              {/* Verified Stat Chips */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span className="px-3 py-1 rounded-full bg-[#0A0A0F] border border-white/10 text-xs font-mono text-white">
                  ⚡ {site.founder.years} Years in Growth Marketing
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0A0A0F] border border-white/10 text-xs font-mono text-white">
                  👑 {site.founder.clients} Businesses Helped
                </span>
              </div>
            </div>

            {/* Right: Story */}
            <div className="md:col-span-7 flex flex-col text-left">
              <span className="text-xs uppercase font-mono tracking-widest text-[#1EC8FF] font-semibold mb-2">
                Origin Story
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
                Built by a marketer who got tired of late videos.
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[#A0A0B0] leading-relaxed">
                <p>
                  I&apos;m <strong className="text-white font-semibold">{site.founder.name}</strong>. For the last {site.founder.years} years, I&apos;ve helped {site.founder.clients} businesses and creators grow through marketing systems, automation and AI.
                </p>
                <p>
                  At my own marketing agency, one problem kept costing us: editors delivering ads and videos late. Campaigns slipped. Clients waited. Money was lost.
                </p>
                <p>
                  Then I saw the exact same bottleneck everywhere. Founders and agents were filming great ideas on their phones, but the footage sat in camera rolls because editing it was an endless headache.
                </p>
                <p className="text-white font-medium">
                  So I built <strong className="text-brand-gradient">Host Editify</strong>: a dedicated editing team, backed by streamlined AI workflows, with one obsession — your video, ready in 21 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
