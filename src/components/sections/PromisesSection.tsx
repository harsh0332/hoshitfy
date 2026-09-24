"use client";

import React from "react";
import { Gift, Clock, ShieldCheck, Users } from "lucide-react";
import { IconTile } from "@/components/ui/IconTile";
import { site } from "@/lib/site.config";

const promises = [
  {
    icon: Gift,
    title: "Your first video is free (up to 40 sec)",
    subtitle: "Up to 40 seconds",
    desc: "Send us one raw clip. We edit it completely free. Try it first, then trust us — see our speed and style before you pay a single dollar.",
  },
  {
    icon: Clock,
    title: `${site.deliveryHours} Hours, or It's Free`,
    subtitle: "Hard turnaround guarantee",
    desc: `If your short-form video isn't delivered within ${site.deliveryHours} hours, that video costs you nothing. ${site.deliveryFinePrint}`,
  },
  {
    icon: ShieldCheck,
    title: "Your Files, Your Ownership",
    subtitle: "NDA & Encrypted Storage",
    desc: "Mutual NDA signed on day one. Raw footage and exported masters are encrypted and 100% owned by you forever.",
  },
  {
    icon: Users,
    title: `Strict ${site.maxClientsPerMonth} Clients / Month`,
    subtitle: "Capped onboarding",
    desc: `We strictly cap onboarding to ${site.maxClientsPerMonth} new clients per month so our speed, creative attention, and render queues never suffer.`,
  },
];

export function PromisesSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#14141C] border-y border-white/[0.06] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Header: Pure white heading, no pill, subline */}
        <div className="text-center max-w-[720px] mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Zero-risk promises
          </h2>
          <p className="text-sm sm:text-base text-[#A0A0B0] max-w-[680px] mx-auto">
            Four unconditional guarantees that protect your calendar, your budget, and your brand security.
          </p>
        </div>

        {/* 4 Cards Grid: 2x2 with standard IconTiles, no big 01-04 numbers, no color squares */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {promises.map((p, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-[#0A0A0F] border border-white/[0.08] hover:border-[#A24BFF]/40 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="mb-5">
                  <IconTile icon={p.icon} size={22} color="purple" />
                </div>

                <span className="text-xs uppercase tracking-wider text-[#A0A0B0] block mb-1 font-semibold">
                  {p.subtitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A0A0B0] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
