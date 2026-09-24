import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { PainSection } from "@/components/sections/PainSection";
import { CostSection } from "@/components/sections/CostSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { WhatYouGetSection } from "@/components/sections/WhatYouGetSection";
import { PromisesSection } from "@/components/sections/PromisesSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { BookingSection } from "@/components/sections/BookingSection";

export default function LandingPage() {
  return (
    <main className="relative flex flex-col w-full">
      {/* Hero */}
      <HeroSection />

      {/* Trusted by brands */}
      <LogoMarquee />

      {/* Watch our work */}
      <PortfolioSection />

      {/* Are you facing the same issues? (keep WhatsApp bubbles) */}
      <PainSection />

      {/* Cost of doing nothing */}
      <CostSection />

      {/* Why Host Editify */}
      <ComparisonSection />

      {/* Industries we work with */}
      <SolutionSection />

      {/* How it works */}
      <HowItWorksSection />

      {/* What you get + bonus + plans */}
      <WhatYouGetSection />

      {/* Zero-risk promises */}
      <PromisesSection />

      {/* What our clients say */}
      <ProofSection />

      {/* Founder */}
      <FounderSection />

      {/* FAQ */}
      <FaqSection />

      {/* Final CTA */}
      <BookingSection />
    </main>
  );
}
