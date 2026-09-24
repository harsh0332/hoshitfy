"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site.config";
import { useAuditModal } from "@/context/AuditModalContext";

/** Splits the headline so only "24 hours" gets the gradient. */
function Headline() {
  const highlight = `${site.deliveryHours} hours`;
  const [before, after] = site.headline.split(highlight);
  if (after === undefined) return <>{site.headline}</>;
  return (
    <>
      {before}
      <span className="text-brand-gradient whitespace-nowrap">{highlight}</span>
      {after}
    </>
  );
}

export function HeroSection() {
  const { openAuditModal } = useAuditModal();

  return (
    <section className="relative flex items-center overflow-hidden bg-[#0A0A0F] py-16 md:min-h-[calc(100svh-128px)] md:py-24">
      {/* Subtle light-field background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute top-1/2 left-1/2 aspect-[16/9] w-[160%] max-w-[1400px] -translate-x-1/2 -translate-y-1/2 opacity-25 blur-2xl mix-blend-screen">
          <Image src="/generated/hero-light-field.jpg" alt="" fill priority className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/40 via-transparent to-[#0A0A0F]" />
      </div>

      <div className="container-page relative flex flex-col items-center text-center">
        <p className="type-small max-w-[520px] font-medium text-[#A0A0B0]">
          {site.tagline} · For founders, coaches &amp; brands in India and Dubai
        </p>

        <h1 className="type-h1 mt-5 max-w-[880px] text-white">
          <Headline />
        </h1>

        <p className="type-body mt-5 max-w-[640px] text-[#A0A0B0]">
          Your dedicated short-form editing team. Drop raw footage in Google Drive and get
          publish-ready Reels and Shorts back, without CapCut or chasing freelancers.
        </p>

        <Button onClick={() => openAuditModal("hero")} className="mt-8">
          Book My Free Content Audit
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>

        <p className="type-small mt-4 text-[#A0A0B0]">
          Free {site.callMinutes}-min content audit · Your first video edited free
        </p>
      </div>
    </section>
  );
}
