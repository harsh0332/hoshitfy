import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { PainSection } from "@/components/sections/PainSection";
import { CostSection } from "@/components/sections/CostSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection";
import { WhatYouGetSection } from "@/components/sections/WhatYouGetSection";
import { PromisesSection } from "@/components/sections/PromisesSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { BookingSection } from "@/components/sections/BookingSection";

export default function LandingPage() {
  return (
    <main className="relative flex flex-col w-full">
      <HeroSection />
      <LogoMarquee />
      <PainSection />
      <CostSection />
      <SolutionSection />
      <HowItWorksSection />
      <PortfolioSection />
      <BeforeAfterSection />
      <WhatYouGetSection />
      <PromisesSection />
      <ProofSection />
      <ComparisonSection />
      <FounderSection />
      <FaqSection />
      <BookingSection />
    </main>
  );
}
