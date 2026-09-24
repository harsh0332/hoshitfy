import React from "react";
import { Clock, Gift, ShieldCheck, Users } from "lucide-react";
import { IconTile } from "@/components/ui/IconTile";
import { Section, SectionHeader } from "@/components/ui/Section";
import { site } from "@/lib/site.config";

// Source: copy doc §8
const promises = [
  {
    icon: Gift,
    title: "Your first video is free",
    desc: `Send us one clip (up to ${site.freeFirstVideoMaxSeconds} seconds). We edit it free. Pehle istemal karein, phir vishwas karein: try it first, then trust us.`,
  },
  {
    icon: Clock,
    title: `${site.deliveryHours} hours, or it's free`,
    desc: `If a short-form video isn't delivered within ${site.deliveryHours} hours, that video costs you nothing. ${site.deliveryFinePrint}`,
  },
  {
    icon: ShieldCheck,
    title: "Your files, your ownership",
    desc: "NDA signed. Encrypted storage. You own every raw and final file.",
  },
  {
    icon: Users,
    title: `Only ${site.maxClientsPerMonth} new clients a month`,
    desc: "We cap onboarding so quality and speed never slip.",
  },
];

export function PromisesSection() {
  return (
    <Section alt>
      <SectionHeader title="You take zero risk. We take all of it." />

      <div className="grid-gap mx-auto grid max-w-5xl grid-cols-1 items-stretch md:grid-cols-2">
        {promises.map((p) => (
          <div key={p.title} className="card h-full">
            <IconTile icon={p.icon} />
            <h3 className="type-h3 mt-5 text-white">{p.title}</h3>
            <p className="type-small text-muted mt-2">{p.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
