"use client";

import React, { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function StickyMobileCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const bookingSection = document.getElementById("booking-section");

    const handleScroll = () => {
      // Show only after scrolling down 250px on mobile
      const passedHero = window.scrollY > 250;

      if (!bookingSection) {
        setIsVisible(passedHero);
        return;
      }

      // Check if booking section is in view
      const rect = bookingSection.getBoundingClientRect();
      const bookingInView = rect.top < window.innerHeight && rect.bottom > 0;

      setIsVisible(passedHero && !bookingInView);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const scrollToBooking = () => {
    const el = document.getElementById("booking-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-30 p-3 bg-[#0A0A0F]/90 backdrop-blur-lg border-t border-white/10 shadow-[0_-10px_25px_rgba(0,0,0,0.6)] animate-in slide-in-from-bottom duration-300">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] font-mono text-[#1EC8FF]">21-HR DELIVERY</span>
          <span className="text-xs font-bold text-white">Free First Video (40s)</span>
        </div>
        <Button
          variant="primary"
          size="sm"
          ctaPosition="sticky-mobile"
          onClick={scrollToBooking}
          className="flex-1 max-w-[200px] flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold"
        >
          <Zap className="w-3.5 h-3.5 fill-white" />
          <span>Book Free Audit</span>
        </Button>
      </div>
    </div>
  );
}
