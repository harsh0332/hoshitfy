"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { site } from "@/lib/site.config";
import { Button } from "@/components/ui/Button";
import { useAuditModal } from "@/context/AuditModalContext";

export function BookingSection() {
  const { openAuditModal } = useAuditModal();

  return (
    <section
      id="booking-section"
      className="relative py-20 md:py-28 bg-[#0A0A0F] border-t border-white/[0.06] overflow-hidden text-center"
    >
      {/* Background Dubai Night Skyline Mood Texture */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-15 overflow-hidden">
        <Image
          src="/generated/dubai-night-mood.jpg"
          alt="Dubai Skyline Night"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-[#0A0A0F]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 relative z-10 flex flex-col items-center">
        {/* Headline: Pure white, no pill */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3 max-w-[760px]">
          Your next 30 videos are already in your camera roll.
        </h2>

        {/* Sub-headline: Brand gradient */}
        <p className="text-lg sm:text-xl font-semibold text-brand-gradient mb-5">
          Your first video is edited free.
        </p>

        {/* 5-Clients/Month Capacity Note: Clean text, not boxed */}
        <p className="text-xs sm:text-sm text-[#A0A0B0] flex items-center justify-center gap-1.5 mb-8">
          <Clock className="w-3.5 h-3.5 text-[#A24BFF]" />
          <span>Strictly limited to 5 new clients per month to maintain 24-hour delivery speed.</span>
        </p>

        {/* One Button (opens popup) */}
        <div className="mb-4 w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            onClick={() => openAuditModal("final")}
            className="w-full sm:w-auto text-sm sm:text-base font-bold tracking-wide shadow-xl shadow-purple-500/15 px-8"
          >
            <span>Book My Free Content Audit</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Secondary Link: Request a free sample edit */}
        <div>
          <a
            href={`https://wa.me/${site.links.whatsapp}?text=${encodeURIComponent("Hi Host Editify, I'd like to request a free sample edit.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-[#A24BFF] hover:underline inline-flex items-center gap-1 transition-colors font-medium"
          >
            <span>Request a free sample edit →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
