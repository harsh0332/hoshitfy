import React from "react";
import { CheckCheck } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";

// Word-for-word complaints from the copy questionnaire (Q12), shown as chat bubbles
const quotes = [
  { text: "I filmed it three weeks ago and it's still not posted.", time: "11:14 PM" },
  { text: "I don't have time to sit and edit for hours.", time: "11:25 PM" },
  { text: "By the time I finish editing, the trend is already dead.", time: "11:42 PM" },
  { text: "I paid a freelancer and it came back looking nothing like what I wanted.", time: "12:05 AM" },
  { text: "I know I should post more. I just don't have the bandwidth.", time: "12:18 AM" },
];

export function PainSection() {
  return (
    <Section alt>
      <SectionHeader
        title="Are you facing the same issues?"
        sub="Your best content is sitting in your camera roll."
      />

      <div className="mx-auto flex max-w-[520px] flex-col gap-3">
        {quotes.map((q) => (
          <div
            key={q.time}
            className="w-full rounded-[20px] rounded-tl-md border border-white/[0.08] bg-[var(--card-bg)] px-5 py-4"
          >
            <p className="type-body font-medium text-white">&ldquo;{q.text}&rdquo;</p>
            <div className="mt-2 flex items-center justify-end gap-1 text-xs text-[#A0A0B0]">
              <span>{q.time}</span>
              <CheckCheck className="h-4 w-4 text-[#A24BFF]" strokeWidth={1.75} aria-hidden />
            </div>
          </div>
        ))}

        <div className="card mt-5 w-full text-center">
          <p className="type-body font-medium text-white italic">
            You&apos;re not lazy. You&apos;re running a business. Every hour in CapCut is an hour
            not spent closing a deal.
          </p>
        </div>
      </div>
    </Section>
  );
}
