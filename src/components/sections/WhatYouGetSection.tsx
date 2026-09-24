"use client";

import React from "react";
import { Check, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { site } from "@/lib/site.config";
import { useAuditModal } from "@/context/AuditModalContext";

const coreDeliverables = [
  "15–30 short-form videos a month (Reels & Shorts)",
  "Dynamic captions & subtitles (English, Hindi, or Arabic)",
  "Custom motion graphics & professional sound design",
  "Curated AI & stock B-roll integration where footage needs it",
  "Custom reel covers & high-CTR thumbnails",
  "Dedicated primary editor who learns your visual identity",
  "2 revision rounds included per video (4 on Authority)",
  "Weekly project call on Google Meet + instant WhatsApp updates",
  "Strict NDA protection & encrypted file handling",
];

const growthFeatures = [
  "15 short-form videos/month",
  "AI avatar videos",
  "UGC videos",
  "AI ad videos",
  "Motion graphics",
  "Captions & subtitles",
  "Dedicated editor",
  "2 revisions/video",
  "NDA + encrypted files",
  "Weekly project call",
  "Email support",
];

const authorityFeatures = [
  "Everything in Growth +",
  "25 short-form + 4 long-form videos/month",
  "Advanced motion graphics",
  "Premium captions",
  "Thumbnail design",
  "Priority delivery",
  "4 revisions/video",
];

export function WhatYouGetSection() {
  const { openAuditModal } = useAuditModal();

  return (
    <section id="plans-section" className="relative py-20 md:py-28 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header: Pure white heading, no pill, subline */}
        <div className="text-center max-w-[720px] mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Everything you need to post like a full-time creator
          </h2>
          <p className="text-sm sm:text-base text-[#A0A0B0] max-w-[680px] mx-auto">
            Core monthly deliverables
          </p>
        </div>

        {/* 2-Column Bento: What You Get vs Free Hook Bank Bonus (Equal height) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 sm:mb-20 items-stretch max-w-5xl mx-auto">
          {/* Deliverables Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#14141C] border border-white/[0.08] shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Monthly deliverables
              </h3>
              <div className="space-y-3.5">
                {coreDeliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#A24BFF]" />
                    </div>
                    {/* Weight 600, not heavy bold */}
                    <span className="text-sm sm:text-base text-white/90 font-semibold leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Formats Row (No TikTok) */}
            <div className="pt-6 mt-8 border-t border-white/[0.08]">
              <span className="text-xs uppercase tracking-wider text-[#A0A0B0] block mb-3 font-medium">
                Optimized Formats for:
              </span>
              <div className="flex items-center gap-2 sm:gap-2.5 text-xs font-semibold text-white/80 flex-wrap">
                <span className="px-3 py-1.5 rounded-lg bg-[#0A0A0F] border border-white/[0.08]">Instagram Reels</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#0A0A0F] border border-white/[0.08]">YouTube Shorts</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#0A0A0F] border border-white/[0.08]">LinkedIn</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#0A0A0F] border border-white/[0.08]">Meta Ads</span>
              </div>
            </div>
          </div>

          {/* Hook Bank: Strong Single Bonus Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#14141C] border border-white/[0.08] shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <IconTile icon={Gift} size={22} color="purple" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#A24BFF]">
                  Included Free Bonus
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                The Hook Bank
              </h3>
              <p className="text-xs sm:text-sm text-[#A0A0B0] leading-relaxed mb-6">
                100+ proven, high-retention opening lines tailored for your specific industry. We research and write your custom hook bank before your first batch is filmed so your videos stop the scroll in the first 2 seconds.
              </p>

              <div className="p-4 rounded-xl bg-[#0A0A0F] border border-white/[0.06] space-y-3">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90 font-medium">
                  <span className="text-[#A24BFF]">•</span>
                  <span>Category-specific pattern interrupts</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90 font-medium">
                  <span className="text-[#A24BFF]">•</span>
                  <span>Tested across top formats in India &amp; Dubai</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90 font-medium">
                  <span className="text-[#A24BFF]">•</span>
                  <span>Continuously updated every month</span>
                </div>
              </div>

              {/* Optional Config Toggles */}
              {site.bonuses.contentStyleIdeas && (
                <div className="mt-4 p-3.5 rounded-xl bg-[#0A0A0F] border border-white/[0.06]">
                  <h4 className="text-sm font-bold text-white mb-1">Content Style Ideas</h4>
                  <p className="text-xs text-[#A0A0B0]">Video formats currently driving algorithmic reach.</p>
                </div>
              )}
              {site.bonuses.monthlyStrategyCall && (
                <div className="mt-3 p-3.5 rounded-xl bg-[#0A0A0F] border border-white/[0.06]">
                  <h4 className="text-sm font-bold text-white mb-1">Monthly Strategy Call</h4>
                  <p className="text-xs text-[#A0A0B0]">1-on-1 strategy alignment to refine content topics.</p>
                </div>
              )}
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.08]">
              <span className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#A24BFF]" />
                <span>Zero extra charge · Lifetime client access</span>
              </span>
            </div>
          </div>
        </div>

        {/* Plan Cards: Growth vs Authority (Equal Size and Visual Weight, No Prices) */}
        <div>
          {/* Subline shown ONCE here */}
          <div className="text-center max-w-[720px] mx-auto mb-10 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Choose your plan
            </h3>
            <p className="text-sm text-[#A0A0B0]">
              Pricing shared on your free audit call.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">
            {/* Growth Plan Card */}
            <div className="p-7 sm:p-8 rounded-2xl bg-[#14141C] border border-white/[0.08] flex flex-col justify-between shadow-xl">
              <div>
                <div className="mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#A24BFF] font-semibold">
                    Plan 01
                  </span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold text-white mb-1">Growth</h4>
                <p className="text-xs sm:text-sm text-[#A0A0B0] font-medium mb-6">
                  Founders starting to post consistently
                </p>

                <div className="space-y-3 mb-8">
                  {growthFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90">
                      <Check className="w-4 h-4 text-[#A24BFF] shrink-0" />
                      <span className="font-semibold">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.08]">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => openAuditModal("growth-plan")}
                  className="w-full text-sm font-semibold whitespace-nowrap py-3.5"
                >
                  <span>Book My Free Content Audit</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>

            {/* Authority Plan Card (Equal visual weight, small Most popular tag only) */}
            <div className="p-7 sm:p-8 rounded-2xl bg-[#14141C] border border-white/[0.08] flex flex-col justify-between shadow-xl relative">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#A24BFF] font-semibold">
                    Plan 02
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/[0.08] text-white text-[11px] font-semibold tracking-wider border border-white/[0.12]">
                    Most popular
                  </span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold text-white mb-1">Authority</h4>
                <p className="text-xs sm:text-sm text-[#A0A0B0] font-medium mb-6">
                  Brands scaling content across platforms
                </p>

                <div className="space-y-3 mb-8">
                  {authorityFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90">
                      <Check className="w-4 h-4 text-[#A24BFF] shrink-0" />
                      <span className="font-semibold">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.08]">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => openAuditModal("authority-plan")}
                  className="w-full text-sm font-semibold whitespace-nowrap py-3.5"
                >
                  <span>Book My Free Content Audit</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
