"use client";

import React from "react";
import { Sparkles, Clock, ShieldCheck, Users } from "lucide-react";
import { site } from "@/lib/site.config";

const promises = [
  {
    icon: Sparkles,
    number: "01",
    title: "Your First Video is Free",
    subtitle: "Up to 40 seconds",
    desc: "Send us one raw clip. We edit it completely free. Try it first, then trust us — pehle istemal karein, phir vishwas karein.",
    color: "#FF3D8B",
    glow: "rgba(255, 61, 139, 0.2)",
  },
  {
    icon: Clock,
    number: "02",
    title: "21 Hours, or It's Free",
    subtitle: "Hard turnaround guarantee",
    desc: `If your short-form video isn't delivered within 21 hours, that video costs you nothing. ${site.deliveryFinePrint}`,
    color: "#FF8A1E",
    glow: "rgba(255, 138, 30, 0.2)",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Your Files, Your Ownership",
    subtitle: "NDA & Encrypted Storage",
    desc: "Mutual NDA signed on day one. Raw footage and exported masters are encrypted and 100% owned by you forever.",
    color: "#1EC8FF",
    glow: "rgba(30, 200, 255, 0.2)",
  },
  {
    icon: Users,
    number: "04",
    title: "Strict 5 Clients / Month",
    subtitle: "Capped onboarding",
    desc: `We strictly cap onboarding to ${site.maxClientsPerMonth} new clients per month so our speed, creative attention, and render queues never suffer.`,
    color: "#A24BFF",
    glow: "rgba(162, 75, 255, 0.2)",
  },
];

export function PromisesSection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#14141C] border-y border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-pink-500/10 text-[#FF3D8B] border border-pink-500/30">
              Ironclad Risk Reversal
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            You take zero risk. <br className="hidden sm:inline" />
            <span className="text-brand-gradient">We take all of it.</span>
          </h2>
          <p className="text-base text-[#A0A0B0]">
            Four unconditional guarantees that protect your calendar, your budget, and your brand security.
          </p>
        </div>

        {/* 4 Glowing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {promises.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#0A0A0F] border border-white/10 hover:border-white/30 transition-all duration-300 shadow-xl flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Soft colored ambient glow behind each card */}
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none group-hover:opacity-60 transition-opacity"
                  style={{ backgroundColor: p.color }}
                />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105"
                      style={{ backgroundColor: p.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-mono font-bold text-white/20">
                      {p.number}
                    </span>
                  </div>

                  <span className="text-xs uppercase font-mono tracking-wider text-[#A0A0B0] block mb-1">
                    {p.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {p.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#A0A0B0] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
