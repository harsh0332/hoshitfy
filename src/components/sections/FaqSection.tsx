"use client";

import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { site } from "@/lib/site.config";
import { cn } from "@/lib/utils";

// Source: copy doc §11 and questionnaire §4
const faqs = [
  {
    q: "Won't AI editing look cheap and robotic?",
    a: "No. Around 80% of every video is edited by our human editors. AI only helps with B-roll and visual consistency. Your audience sees a polished video, not “AI content”.",
  },
  {
    q: "My nephew or an intern can use CapCut.",
    a: "Most people can use CapCut. You're not paying for the software. You're paying for reliable delivery every week, a professional look, and the authority that consistency builds.",
  },
  {
    q: "How do we work together across India and Dubai?",
    a: "Our production team is in India and works on Indian and Dubai business hours. You share footage in a Google Drive folder, get updates on WhatsApp, and meet us weekly on Google Meet. Working remotely is exactly why we can deliver in 24 hours.",
  },
  {
    q: `What does ${site.deliveryHours} hours mean exactly?`,
    a: site.deliveryFinePrint,
  },
  {
    q: "What don't you do?",
    a: "We only edit. We don't film or send camera crews, and we don't do weddings, events, corporate films, or heavy VFX and 3D animation.",
  },
  {
    q: "Do you do subtitles in other languages?",
    a: "Yes. We edit in English and can add English or Arabic subtitles.",
  },
  {
    q: "I already have an editor.",
    a: "Keep them. Many clients use us for overflow, so their content never stops when their editor is overloaded or away.",
  },
  {
    q: "What if I don't like the edits?",
    a: `You see your first video (up to ${site.freeFirstVideoMaxSeconds} seconds) edited free before paying anything. After that, every video gets ${site.revisions.growth} revision rounds (${site.revisions.authority} on Authority).`,
  },
  {
    q: "It looks expensive.",
    a: "Compare it to 8–15 hours of your time every week, or to the salary and management of a full-time editor. On the call, we'll show you the numbers for your business.",
  },
  ...(site.priceLockPromise
    ? [
        {
          q: "Will the price go up after a month or two?",
          a: "No. Your plan price stays locked for as long as you stay with us.",
        },
      ]
    : []),
  {
    q: "Is my footage safe?",
    a: "Yes. We sign an NDA, store files encrypted, and you own everything.",
  },
  {
    q: "I need to think about it.",
    a: "That's fine. Start with the free edit. There's nothing to decide until you've seen the result.",
  },
];

export function FaqSection({ alt = false }: { alt?: boolean }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Section id="faq-section" alt={alt}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <SectionHeader title="Frequently asked questions" />

      <div className="mx-auto flex max-w-[760px] flex-col gap-3">
        {faqs.map((item, idx) => {
          const open = openIdx === idx;
          const panelId = `faq-panel-${idx}`;
          return (
            <div
              key={item.q}
              className={cn(
                "rounded-[20px] border bg-[var(--card-bg)] transition-colors",
                open ? "border-[#A24BFF]/40" : "border-white/[0.08]"
              )}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(open ? null : idx)}
                aria-expanded={open}
                aria-controls={panelId}
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left md:p-6"
              >
                <span className="type-body font-semibold text-white">{item.q}</span>
                <span className="icon-tile !h-9 !w-9 !rounded-full">
                  {open ? (
                    <Minus className="h-5 w-5 text-[#A24BFF]" strokeWidth={1.75} aria-hidden />
                  ) : (
                    <Plus className="h-5 w-5 text-white/70" strokeWidth={1.75} aria-hidden />
                  )}
                </span>
              </button>
              <div id={panelId} hidden={!open} className="type-body text-muted px-5 pb-6 md:px-6">
                {item.a}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
