import React from "react";
import Image from "next/image";
import brandsData from "@/data/brands.json";

interface Brand {
  name: string;
  /** Path under public/, e.g. "/logos/bluhawk.png". Without it the tile shows the brand name. */
  logo?: string;
}

const brands: Brand[] = brandsData;

function BrandTile({ brand }: { brand: Brand }) {
  return (
    <div className="flex h-[60px] w-[110px] shrink-0 items-center justify-center rounded-[14px] bg-white px-3 md:h-[72px] md:w-[140px]">
      {brand.logo ? (
        <Image
          src={brand.logo}
          alt={brand.name}
          width={112}
          height={44}
          className="max-h-9 w-auto object-contain md:max-h-11"
        />
      ) : (
        <span className="text-center text-[13px] leading-tight font-semibold text-[#14141C] md:text-sm">
          {brand.name}
        </span>
      )}
    </div>
  );
}

export function LogoMarquee() {
  if (brands.length === 0) return null;

  return (
    <section aria-labelledby="brands-heading" className="section-alt overflow-hidden border-y border-white/[0.06] py-12 md:py-16">
      <div className="container-page">
        <h2 id="brands-heading" className="type-h3 mb-8 text-center text-white">
          Trusted by brands we edit for
        </h2>

        {/* Desktop: one centred row */}
        <div className="hidden flex-wrap items-center justify-center gap-6 md:flex">
          {brands.map((b) => (
            <BrandTile key={b.name} brand={b} />
          ))}
        </div>
      </div>

      {/* Phone: slow auto-scroll (static, swipeable row when reduced motion is on) */}
      <div className="relative md:hidden">
        <div className="no-scrollbar overflow-hidden motion-reduce:overflow-x-auto">
          <div className="animate-marquee flex w-max motion-reduce:pl-5">
            {[...brands, ...brands].map((b, i) => (
              <div
                key={`${b.name}-${i}`}
                aria-hidden={i >= brands.length}
                className={i >= brands.length ? "pr-4 motion-reduce:hidden" : "pr-4"}
              >
                <BrandTile brand={b} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
