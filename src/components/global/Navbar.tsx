"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
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
          ? "py-3 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform">
            <Image
              src="/brand/logo.png"
              alt="Host Editify"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-white leading-none">
              HOST<span className="text-brand-gradient">EDITIFY</span>
            </span>
            <span className="text-[10px] text-[#A0A0B0] font-medium tracking-wider uppercase mt-0.5">
              You shoot, We deliver
            </span>
          </div>
        </Link>

        {/* Minimal Navigation Anchors (No outbound links on ad page) */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 text-sm font-medium text-[#A0A0B0]">
          <button
            onClick={() => scrollToSection("work-section")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection("process-section")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Process
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
            onClick={() => scrollToSection("booking-section")}
            className="text-xs sm:text-sm font-semibold"
          >
            Book Free Content Audit →
          </Button>
        </div>
      </div>
    </header>
  );
}
