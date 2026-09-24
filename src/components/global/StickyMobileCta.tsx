"use client";

import React, { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuditModal } from "@/context/AuditModalContext";
import { cn } from "@/lib/utils";

export function StickyMobileCta() {
  const [isVisible, setIsVisible] = useState(false);
  const { isOpen, openAuditModal } = useAuditModal();

  useEffect(() => {
    const bookingSection = document.getElementById("booking-section");

    const handleScroll = () => {
      // Show only after scrolling down 250px on mobile
      const passedHero = window.scrollY > 250;

      if (!bookingSection) {
        setIsVisible(passedHero);
        return;
      }

      const rect = bookingSection.getBoundingClientRect();
      const bookingInView = rect.top < window.innerHeight && rect.bottom > 0;

      setIsVisible(passedHero && !bookingInView);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      data-sticky-mobile-cta
      className={cn(
        "md:hidden fixed bottom-0 inset-x-0 z-30 p-3 bg-[#0A0A0F]/95 backdrop-blur-lg border-t border-white/[0.08] shadow-[0_-10px_25px_rgba(0,0,0,0.6)] transition-all duration-300 pointer-events-none opacity-0 translate-y-full",
        isVisible && !isOpen && "opacity-100 translate-y-0 pointer-events-auto"
      )}
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold text-[#A24BFF] tracking-wider uppercase">24-HR DELIVERY</span>
          <span className="text-xs font-semibold text-white">Free First Video (40s)</span>
        </div>
        <Button
          variant="primary"
          size="sm"
          ctaPosition="sticky-mobile"
          onClick={() => openAuditModal("sticky-mobile")}
          className="flex-1 max-w-[200px] flex items-center justify-center gap-1.5 h-10 text-xs font-bold"
        >
          <Zap className="w-3.5 h-3.5 fill-white" />
          <span>Book Free Audit</span>
        </Button>
      </div>
    </div>
  );
}
