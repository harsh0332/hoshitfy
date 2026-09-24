import React from "react";
import reviews from "@/data/reviews.json";
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
  // Backgrounds alternate #0A0A0F / #14141C. Proof is hidden until reviews exist,
  // so the sections after it flip to keep the alternation unbroken.
  const hasProof = reviews.length > 0;

  return (
    <main className="relative flex w-full flex-col">
      <HeroSection />
      <LogoMarquee />
      <PortfolioSection />
      <PainSection />
      <CostSection />
      <ComparisonSection />
      <SolutionSection />
      <HowItWorksSection />
      <WhatYouGetSection />
      <PromisesSection />
      <ProofSection />
      <FounderSection alt={hasProof} />
      <FaqSection alt={!hasProof} />
      <BookingSection alt={hasProof} />
    </main>
  );
}
