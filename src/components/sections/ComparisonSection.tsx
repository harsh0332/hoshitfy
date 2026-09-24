"use client";

import React, { useState } from "react";
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuditModal } from "@/context/AuditModalContext";

type AlternativeKey = "self" | "freelancers" | "inHouse";

interface ComparisonRow {
  feature: string;
  self: string;
  freelancers: string;
  inHouse: string;
  hostEditify: string;
  isBoolean?: boolean;
}

const comparisonRows: ComparisonRow[] = [
  {
    feature: "Your Time Commitment",
    self: "8–15 hrs/week lost",
    freelancers: "Hours chasing briefs & revisions",
    inHouse: "Daily directing & management",
    hostEditify: "1 weekly sync or 100% async",
  },
  {
    feature: "Delivery Turnaround",
    self: "Whenever you find spare time",
    freelancers: "Unpredictable (3–7 days)",
    inHouse: "Depends on internal queue",
    hostEditify: "Guaranteed in 24 hours",
  },
  {
    feature: "Publishing Consistency",
    self: "Breaks when you're busy",
    freelancers: "High risk of ghosting & delay",
    inHouse: "Stops during leave & sick days",
    hostEditify: "Dedicated editor + backup bench",
  },
  {
    feature: "Hiring & Overhead",
    self: "None (heavy opportunity cost)",
    freelancers: "Constant rehiring roulette",
    inHouse: "Fixed salary + taxes & gear",
    hostEditify: "Zero hiring, contracts, or overhead",
  },
  {
    feature: "Try before you commit (first video free)",
    self: "✕",
    freelancers: "✕",
    inHouse: "✕",
    hostEditify: "✓ Yes (first video edited free)",
    isBoolean: true,
  },
];

const alternatives: { key: AlternativeKey; label: string }[] = [
  { key: "self", label: "Editing Yourself" },
  { key: "freelancers", label: "Freelancers" },
  { key: "inHouse", label: "In-House Editor" },
];

export function ComparisonSection() {
  const [selectedAlt, setSelectedAlt] = useState<AlternativeKey>("self");
  const { openAuditModal } = useAuditModal();

  const getAlternativeLabel = (key: AlternativeKey) => {
    return alternatives.find((a) => a.key === key)?.label || "";
  };

  return (
    <section id="why-us-section" className="relative py-20 md:py-28 bg-[#14141C] border-y border-white/[0.06] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header: Pure white heading, no pill, subline */}
        <div className="text-center max-w-[720px] mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Why Host Editify?
          </h2>
          <p className="text-sm sm:text-base text-[#A0A0B0] max-w-[680px] mx-auto">
            See how we compare to traditional options.
          </p>
        </div>

        {/* Mobile View: Host Editify vs ONE Selectable Alternative (No Sideways Scroll) */}
        <div className="block lg:hidden">
          {/* Alternative Selector Tabs */}
          <div className="flex items-center justify-center p-1 rounded-2xl bg-[#0A0A0F] border border-white/[0.08] mb-6">
            {alternatives.map((alt) => (
              <button
                key={alt.key}
                type="button"
                onClick={() => setSelectedAlt(alt.key)}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  selectedAlt === alt.key
                    ? "bg-[#A24BFF] text-white shadow-md"
                    : "text-[#A0A0B0] hover:text-white"
                }`}
              >
                {alt.label}
              </button>
            ))}
          </div>

          {/* Side-by-Side 2-Column Cards Stack */}
          <div className="space-y-4">
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#0A0A0F] border border-white/[0.08] shadow-md"
              >
                <span className="text-xs uppercase tracking-wider text-[#A0A0B0] font-semibold block mb-3">
                  {row.feature}
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {/* Left: Selected Alternative */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] flex flex-col justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#A0A0B0] mb-1">
                      {getAlternativeLabel(selectedAlt)}
                    </span>
                    {row.isBoolean ? (
                      <span className="text-sm font-semibold text-white/50 flex items-center gap-1">
                        <X className="w-3.5 h-3.5 text-white/40" /> ✕
                      </span>
                    ) : (
                      <span className="text-xs text-white/80 leading-relaxed">
                        {row[selectedAlt]}
                      </span>
                    )}
                  </div>

                  {/* Right: Host Editify (Highlighted with purple) */}
                  <div className="p-3 rounded-xl bg-[#A24BFF]/[0.08] border border-[#A24BFF]/30 flex flex-col justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#A24BFF] mb-1">
                      Host Editify
                    </span>
                    {row.isBoolean ? (
                      <span className="text-sm font-bold text-white flex items-center gap-1">
                        <Check className="w-4 h-4 text-[#A24BFF]" /> ✓ Free First Video
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-white leading-relaxed">
                        {row.hostEditify}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop View: Full 4-Column Table */}
        <div className="hidden lg:block overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl bg-[#0A0A0F]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#0E0E14]">
                <th className="py-4 px-6 text-sm text-[#A0A0B0] uppercase tracking-wider w-[28%] font-semibold">
                  What matters
                </th>
                <th className="py-4 px-5 text-sm font-semibold text-[#A0A0B0] w-[22%]">
                  Editing yourself
                </th>
                <th className="py-4 px-5 text-sm font-semibold text-[#A0A0B0] w-[22%]">
                  Freelancers
                </th>
                <th className="py-4 px-5 text-sm font-semibold text-[#A0A0B0] w-[22%]">
                  In-house editor
                </th>
                <th className="py-4 px-6 text-sm font-bold text-white bg-[#A24BFF]/[0.10] border-l border-[#A24BFF]/30 w-[26%]">
                  Host Editify
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 text-sm font-semibold text-white">
                    {row.feature}
                  </td>
                  <td className="py-4 px-5 text-sm text-[#A0A0B0]">
                    {row.isBoolean ? (
                      <span className="inline-flex items-center gap-1 text-white/50 font-semibold">
                        ✕
                      </span>
                    ) : (
                      row.self
                    )}
                  </td>
                  <td className="py-4 px-5 text-sm text-[#A0A0B0]">
                    {row.isBoolean ? (
                      <span className="inline-flex items-center gap-1 text-white/50 font-semibold">
                        ✕
                      </span>
                    ) : (
                      row.freelancers
                    )}
                  </td>
                  <td className="py-4 px-5 text-sm text-[#A0A0B0]">
                    {row.isBoolean ? (
                      <span className="inline-flex items-center gap-1 text-white/50 font-semibold">
                        ✕
                      </span>
                    ) : (
                      row.inHouse
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-white bg-[#A24BFF]/[0.08] border-l border-[#A24BFF]/30">
                    {row.isBoolean ? (
                      <span className="inline-flex items-center gap-1.5 text-white font-bold">
                        <Check className="w-4 h-4 text-[#A24BFF]" /> ✓ Free First Video
                      </span>
                    ) : (
                      row.hostEditify
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Big Callout Under Table: Free First Edit (NO white border, subtle purple glow, no pill) */}
        <div className="mt-12 sm:mt-16 p-8 sm:p-12 rounded-2xl bg-[#0E0E14] border border-[#A24BFF]/30 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#A24BFF]/10 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 max-w-3xl mx-auto">
            Your first video is edited <span className="text-brand-gradient">FREE</span>. See the quality before you pay anything.
          </h3>
          <p className="text-sm sm:text-base text-[#A0A0B0] max-w-xl mx-auto mb-8 leading-relaxed">
            Send us raw footage from your camera roll. If you don&apos;t love the speed, pacing, and polish, you walk away paying nothing.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => openAuditModal("comparison")}
            className="w-full sm:w-auto text-sm sm:text-base px-8 font-bold shadow-xl shadow-purple-500/20"
          >
            <span>Book My Free Content Audit</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
