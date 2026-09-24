"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site.config";
import { useAuditModal } from "@/context/AuditModalContext";

export function HeroSection() {
  const { openAuditModal } = useAuditModal();

  return (
    <section className="relative min-h-[82vh] md:min-h-[88vh] flex items-center justify-center pt-8 pb-14 md:pt-16 md:pb-24 overflow-hidden">
      {/* Background Volumetric Hero Light Field & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] max-w-[1200px] aspect-[16/9] opacity-25 mix-blend-screen filter blur-2xl">
          <Image
            src="/generated/hero-light-field.jpg"
            alt="Cinematic Light Field"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Soft radial brand glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#A24BFF]/15 rounded-full blur-3xl pointer-events-none" />
        {/* Subtle dark gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/50 via-transparent to-[#0A0A0F]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 w-full flex flex-col items-center text-center">
        {/* Centered Main Hero Block */}
        <div className="max-w-[840px] flex flex-col items-center">
          {/* Main Headline (Gradient text ONLY on '24 hours') */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-4 sm:mb-6">
            We turn your raw footage into high-converting short-form videos in{" "}
            <span className="text-brand-gradient whitespace-nowrap">24 hours.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-sm sm:text-base md:text-lg text-[#A0A0B0] font-normal leading-relaxed max-w-[680px] mb-7 sm:mb-9">
            For founders, real estate leaders, and personal brands in India &amp; Dubai. No hiring, no chasing editors, no missed post dates.
          </p>

          {/* Primary CTA Button (ONE CTA ONLY) */}
          <div className="w-full sm:w-auto flex flex-col items-center mb-3">
            <Button
              variant="primary"
              size="lg"
              ctaPosition="hero"
              magnetic={true}
              onClick={() => openAuditModal("hero")}
              className="w-full sm:w-auto text-sm sm:text-base px-8 flex items-center justify-center gap-2 font-bold shadow-lg shadow-purple-500/15"
            >
              <span>Book My Free Content Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Clean Micro-copy under CTA */}
          <p className="text-xs sm:text-sm text-[#A0A0B0] font-medium">
            100% free · No credit card required · 20-min call
          </p>
        </div>
      </div>
    </section>
  );
}
