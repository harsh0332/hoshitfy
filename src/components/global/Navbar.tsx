"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useAuditModal } from "@/context/AuditModalContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { openAuditModal } = useAuditModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "py-2.5 bg-[#0A0A0F]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
          : "py-3.5 bg-[#0A0A0F]/80 backdrop-blur-md border-b border-white/[0.05]"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand Logo: Clean transparent logo (42px height, auto width) */}
        <Link href="/" className="flex items-center group">
          <img
            src="/brand/logo-transparent.png"
            alt="Host Editify"
            style={{ height: "42px", width: "auto", objectFit: "contain", display: "block" }}
            className="transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        {/* Navigation Anchors */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#A0A0B0]">
          <button
            onClick={() => scrollToSection("work-section")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Watch our work
          </button>
          <button
            onClick={() => scrollToSection("why-us-section")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Why us
          </button>
          <button
            onClick={() => scrollToSection("process-section")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            How it works
          </button>
          <button
            onClick={() => scrollToSection("plans-section")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Plans
          </button>
          <button
            onClick={() => scrollToSection("faq-section")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Primary Booking CTA */}
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            ctaPosition="nav"
            onClick={() => openAuditModal("nav")}
            className="text-xs sm:text-sm font-semibold h-10 px-4 sm:px-5"
          >
            Book My Free Content Audit
          </Button>
        </div>
      </div>
    </header>
  );
}
