import React from "react";
import { Clock, TrendingDown, UserMinus, Moon } from "lucide-react";
import { IconTile } from "@/components/ui/IconTile";
import { Section } from "@/components/ui/Section";

const consequences = [
  { icon: TrendingDown, text: "Your posting stays inconsistent, so the algorithm forgets you." },
  { icon: UserMinus, text: "A competitor who posts daily becomes “the name” in your niche." },
  { icon: Clock, text: "Enquiries that should have come from content go to someone else." },
  { icon: Moon, text: "You're still editing at 11pm, still not getting the results." },
];

export function CostSection() {
  return (
    <Section>
      <div className="section-header">
        {/* Two fixed lines, each balanced on its own */}
        <h2 className="type-h2 text-white">
          <span className="block">Editing isn&apos;t costing you time.</span>
          <span className="block">It&apos;s costing you deals.</span>
        </h2>
      </div>

      <div className="grid-gap mx-auto grid max-w-5xl grid-cols-1 items-stretch lg:grid-cols-12">
        <div className="card flex flex-col items-center justify-center text-center lg:col-span-5">
          <IconTile icon={Clock} />
          {/* The final value is in the HTML, so it shows without JS and with reduced motion */}
          <p className="font-heading mt-5 text-6xl font-extrabold text-white md:text-7xl">8–15</p>
          <p className="type-body mt-2 font-semibold text-white">hours lost every week</p>
          <p className="type-small text-muted mt-3 max-w-xs">
            That&apos;s up to 60 hours a month of your most valuable time, spent editing instead of
            selling.
          </p>
        </div>

        <div className="card lg:col-span-7">
          <h3 className="type-h3 text-white">Keep going like this for 6 months and here&apos;s what happens:</h3>
          <ul className="mt-6 flex flex-col gap-4">
            {consequences.map((c) => (
              <li key={c.text} className="flex items-center gap-4">
                <IconTile icon={c.icon} size={20} />
                <span className="type-body text-white/85">{c.text}</span>
              </li>
            ))}
          </ul>
          <p className="type-small text-muted mt-6 border-t border-white/[0.08] pt-6">
            In India and Dubai, the founder, agent or coach who shows up in the feed every day wins
            the client&apos;s trust. Right now, that isn&apos;t you. It can be.
          </p>
        </div>
      </div>
    </Section>
  );
}
