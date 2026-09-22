"use client";

import React from "react";
import Image from "next/image";

const logos = [
  { name: "Bluhawk Marketing", src: "/logos/bluhawk.svg", width: 150, height: 35 },
  { name: "AI Buddies", src: "/logos/ai-buddies.svg", width: 140, height: 35 },
  { name: "DPM Entertainment", src: "/logos/dpm.svg", width: 160, height: 35 },
  { name: "Heart to Mind", src: "/logos/heart-to-mind.svg", width: 150, height: 35 },
  { name: "Host Dhanraj", src: "/logos/host-dhanraj.svg", width: 140, height: 35 },
];

export function LogoMarquee() {
  return (
    <section className="relative py-10 bg-[#14141C]/60 border-y border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-4 text-center">
        <p className="text-xs uppercase font-mono tracking-widest text-[#A0A0B0]">
          Trusted by brands we edit for
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0A0A0F] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0A0A0F] to-transparent z-10 pointer-events-none" />

        {/* Marquee Track (Repeated for seamless loop) */}
        <div className="animate-marquee flex items-center gap-12 sm:gap-20 opacity-70 hover:opacity-100 transition-opacity">
          {[...logos, ...logos, ...logos].map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="relative shrink-0 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-200"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-7 sm:h-8 w-auto object-contain brightness-125"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
