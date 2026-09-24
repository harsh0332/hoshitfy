import React from "react";
import { Bot, Building2, GraduationCap, ShoppingBag, UserCheck, type LucideIcon } from "lucide-react";
import { IconTile } from "@/components/ui/IconTile";
import { Section, SectionHeader } from "@/components/ui/Section";

const industries: { name: string; icon: LucideIcon; line: string }[] = [
  {
    name: "Real estate",
    icon: Building2,
    line: "Property walkthroughs, market updates and agent intros, ready to post every week.",
  },
  {
    name: "Personal brands & coaches",
    icon: UserCheck,
    line: "Talking-head Reels that build trust and keep your face in the feed.",
  },
  {
    name: "Course creators",
    icon: GraduationCap,
    line: "Lesson clips cut into short teaching videos that promote your course.",
  },
  {
    name: "E-commerce",
    icon: ShoppingBag,
    line: "Product, UGC and ad videos cut for Reels, Shorts and Meta Ads.",
  },
  {
    name: "AI content",
    icon: Bot,
    line: "AI avatar and UGC-style videos, finished by human editors so they don't look robotic.",
  },
];

function IndustryCard({ item }: { item: (typeof industries)[number] }) {
  return (
    <div className="card h-full">
      <IconTile icon={item.icon} />
      <h3 className="type-h3 mt-5 text-white">{item.name}</h3>
      <p className="type-small text-muted mt-2">{item.line}</p>
    </div>
  );
}

export function SolutionSection() {
  return (
    <Section id="industries-section">
      <SectionHeader
        title="Industries we work with"
        sub="Editing that fits how your audience watches."
      />

      {/* 3 + 2 centred on desktop, 2 + 2 + 1 centred on tablet, 1 column on phone */}
      <div className="grid-gap mx-auto flex max-w-5xl flex-wrap justify-center">
        {industries.map((item) => (
          <div
            key={item.name}
            className="w-full md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
          >
            <IndustryCard item={item} />
          </div>
        ))}
      </div>
    </Section>
  );
}
