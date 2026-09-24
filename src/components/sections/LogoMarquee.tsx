"use client";

import React from "react";
import Image from "next/image";
import brandsData from "@/data/brands.json";

interface BrandItem {
  name: string;
  logo?: string;
}

const brands: BrandItem[] = brandsData;

export function LogoMarquee() {
  return (
    <section className="relative py-10 sm:py-12 bg-[#0E0E14] border-y border-white/[0.06] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 mb-6 text-center">
        <p className="text-xs uppercase tracking-widest text-[#A0A0B0] font-semibold">
          Brands we edit for
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0E0E14] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0E0E14] to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="animate-marquee flex items-center gap-12 sm:gap-20 opacity-75 hover:opacity-100 transition-opacity">
          {[...brands, ...brands, ...brands, ...brands].map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="relative shrink-0 flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-200"
            >
              {brand.logo ? (
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={140}
                  height={32}
                  className="h-6 sm:h-7 w-auto object-contain brightness-150 contrast-125 select-none"
                />
              ) : (
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-white/80 whitespace-nowrap uppercase">
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
