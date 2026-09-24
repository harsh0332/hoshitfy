"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NumberTile } from "@/components/ui/IconTile";
import { Section, SectionHeader } from "@/components/ui/Section";
import { site } from "@/lib/site.config";
import { useAuditModal } from "@/context/AuditModalContext";

const steps = [
  {
    number: "01",
    title: "Drop raw footage in Google Drive",
    desc: "Record on your phone and drop the clips in your shared Drive folder. Add notes or references if you want.",
  },
  {
    number: "02",
    title: `Get publish-ready videos in ${site.deliveryHours} hours`,
    desc: "We cut, add captions, B-roll, motion graphics and sound, matched to your brand.",
  },
  {
    number: "03",
    title: "Review, approve and post",
    desc: `Request up to ${site.revisions.growth} revisions (${site.revisions.authority} on Authority), then post. Updates on WhatsApp, weekly call on Google Meet.`,
  },
];

export function HowItWorksSection() {
  const { openAuditModal } = useAuditModal();

  return (
    <Section id="process-section" alt>
      <SectionHeader title="How it works" sub="Three simple steps. No daily calls, no chasing." />

      <ol className="grid-gap mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-3">
        {steps.map((step) => (
          <li key={step.number} className="card h-full">
            <NumberTile number={step.number} />
            <h3 className="type-h3 mt-5 text-white">{step.title}</h3>
            <p className="type-small text-muted mt-2">{step.desc}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex justify-center">
        <Button onClick={() => openAuditModal("how-it-works")}>
          Try it free with 1 video
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </Section>
  );
}
