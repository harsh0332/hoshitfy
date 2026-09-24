import React from "react";
import fs from "fs";
import path from "path";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/Section";
import { site } from "@/lib/site.config";

/** First image in public/founder/, or null (then the "DS" monogram tile shows). Read at build time. */
function findFounderPhoto(): string | null {
  try {
    const dir = path.join(process.cwd(), "public", "founder");
    const file = fs
      .readdirSync(dir)
      .sort()
      .find((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
    return file ? `/founder/${file}` : null;
  } catch {
    return null;
  }
}

export function FounderSection({ alt = false }: { alt?: boolean }) {
  const photo = findFounderPhoto();
  const { founder } = site;
  const initials = founder.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <Section alt={alt}>
      <SectionHeader title="Built by a marketer who got tired of late videos" />

      <div className="card mx-auto flex max-w-4xl flex-col items-center gap-8 md:flex-row md:gap-10">
        <div className="relative h-[260px] w-[208px] shrink-0 overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0A0A0F]">
          {photo ? (
            <Image src={photo} alt={founder.name} fill sizes="208px" className="object-cover" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center">
              <span className="font-heading text-5xl font-extrabold text-[#A24BFF]">{initials}</span>
            </div>
          )}
        </div>

        <div className="text-center md:text-left">
          <h3 className="type-h3 text-white">{founder.name}</h3>
          <p className="type-small text-muted mt-1">{founder.role}</p>

          <ul className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
            {[`${founder.years} years`, `${founder.clients} businesses`].map((chip) => (
              <li key={chip} className="type-small rounded-full bg-white/[0.06] px-3 py-1 font-semibold text-white">
                {chip}
              </li>
            ))}
          </ul>

          {/* Under 60 words, from the copy doc §12 */}
          <p className="type-body text-muted mt-5">
            For the last {founder.years} years, I&apos;ve helped {founder.clients} businesses and
            creators grow through marketing, automation and AI. At my own agency, editors kept
            delivering videos late, and campaigns slipped. So I built Host Editify: a dedicated
            editing team with one goal, your video ready in {site.deliveryHours} hours.
          </p>
        </div>
      </div>
    </Section>
  );
}
