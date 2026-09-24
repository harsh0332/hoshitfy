"use client";

import React from "react";
import { 
  Building2, 
  UserCheck, 
  GraduationCap, 
  ShoppingBag, 
  Bot,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { useAuditModal } from "@/context/AuditModalContext";

interface IndustryItem {
  name: string;
  icon: React.ElementType;
  description: string;
}

const industries: IndustryItem[] = [
  {
    name: "Real estate",
    icon: Building2,
    description: "Turn property walkthroughs and market updates into qualified buyer and investor inquiries.",
  },
  {
    name: "Personal brands & coaches",
    icon: UserCheck,
    description: "Establish unshakeable market authority and fill your calendar with high-ticket consulting calls.",
  },
  {
    name: "Course creators",
    icon: GraduationCap,
    description: "Repurpose curriculum highlights into viral educational hooks that sell memberships on autopilot.",
  },
  {
    name: "E-commerce",
    icon: ShoppingBag,
    description: "High-energy UGC, unboxing cutdowns, and Meta ad creatives built for direct checkout and lower CPAs.",
  },
  {
    name: "AI content",
    icon: Bot,
    description: "Hyper-realistic avatars and AI-assisted scripts that maintain 24-hour publishing without camera fatigue.",
  },
];

export function SolutionSection() {
  const { openAuditModal } = useAuditModal();

  return (
    <section id="industries-section" className="relative py-20 md:py-28 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header: Pure white heading, no pill, subline */}
        <div className="text-center max-w-[720px] mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Industries we work with
          </h2>
          <p className="text-sm sm:text-base text-[#A0A0B0] max-w-[680px] mx-auto">
            We understand the exact pacing, hook psychology, and audience nuances required in your market.
          </p>
        </div>

        {/* 5-Card Layout: 3 top row, 2 centered bottom row on desktop */}
        <div className="max-w-5xl mx-auto">
          {/* Top Row: 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {industries.slice(0, 3).map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="p-6 sm:p-7 rounded-2xl bg-[#14141C] border border-white/[0.08] hover:border-[#A24BFF]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="mb-5">
                      <IconTile icon={Icon} size={22} color="purple" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A0A0B0] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Row: 2 cards centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {industries.slice(3, 5).map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="p-6 sm:p-7 rounded-2xl bg-[#14141C] border border-white/[0.08] hover:border-[#A24BFF]/40 transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="mb-5">
                      <IconTile icon={Icon} size={22} color="purple" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A0A0B0] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-12 text-center">
          <Button
            variant="secondary"
            size="md"
            onClick={() => openAuditModal("industries")}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold"
          >
            <span>See What We Would Do With Your Content</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
