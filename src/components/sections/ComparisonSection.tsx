"use client";

import React, { useState } from "react";
import { Check, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const comparisonRows = [
  {
    feature: "Your Time Commitment",
    self: "8–15 hrs / week",
    freelancers: "Hours chasing & brief writing",
    inHouse: "Hours directing & managing",
    studios: "Lengthy concept & approval calls",
    hostEditify: "1 weekly sync (30 min)",
  },
  {
    feature: "Delivery Turnaround",
    self: "Whenever you find time",
    freelancers: "Unpredictable (3–7 days)",
    inHouse: "Depends on queue backlog",
    studios: "2–3 weeks per batch",
    hostEditify: "Guaranteed in 21 hours",
  },
  {
    feature: "Publishing Consistency",
    self: "Breaks when you're busy",
    freelancers: "Ghosting & drop-off risks",
    inHouse: "Sick days & annual leave breaks",
    studios: "Rigid production cycles",
    hostEditify: "Dedicated editor + backup bench",
  },
  {
    feature: "Hiring & Overhead",
    self: "None",
    freelancers: "Constant rehiring cycle",
    inHouse: "AED 10,000+/mo (visa + insurance)",
    studios: "High monthly minimum retainer",
    hostEditify: "Zero hiring or overhead",
  },
  {
    feature: "Risk Reversal (Try First)",
    self: "—",
    freelancers: "Rarely / Milestone holds",
    inHouse: "No (Full contract signed)",
    studios: "No (Upfront deposits required)",
    hostEditify: "First video free (up to 40s)",
  },
];

const alternatives = [
  { key: "inHouse", label: "In-House Dubai Editor" },
  { key: "freelancers", label: "Freelancers" },
  { key: "self", label: "Editing Yourself" },
  { key: "studios", label: "Production Studios" },
];

export function ComparisonSection() {
  const [mobileAlt, setMobileAlt] = useState<"inHouse" | "freelancers" | "self" | "studios">("inHouse");

  return (
    <section className="relative py-20 md:py-32 bg-[#14141C] border-y border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/30">
              Clear Differentiation
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Why Host Editify vs. the alternatives.
          </h2>
          <p className="text-base text-[#A0A0B0]">
            Compare the true cost in hours, management stress, and guaranteed delivery speed.
          </p>
        </div>

        {/* Desktop 5-Column Table */}
        <div className="hidden lg:block overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#0A0A0F]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#14141C]">
                <th className="py-5 px-6 text-sm font-mono text-[#A0A0B0] uppercase tracking-wider w-[22%]">
                  Comparison Vector
                </th>
                <th className="py-5 px-5 text-sm font-semibold text-[#A0A0B0] w-[18%]">
                  Editing Yourself
                </th>
                <th className="py-5 px-5 text-sm font-semibold text-[#A0A0B0] w-[18%]">
                  Freelancers
                </th>
                <th className="py-5 px-5 text-sm font-semibold text-[#A0A0B0] w-[20%]">
                  In-House Dubai Editor
                </th>
                <th className="py-5 px-6 text-sm font-bold text-white bg-gradient-to-r from-purple-900/40 to-pink-900/30 border-l border-purple-500/40 w-[22%]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FF8A1E]" />
                    <span>Host Editify</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">
                    {row.feature}
                  </td>
                  <td className="py-4 px-5 text-[#A0A0B0]">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-red-400/60 shrink-0" />
                      <span>{row.self}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-[#A0A0B0]">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-red-400/60 shrink-0" />
                      <span>{row.freelancers}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-[#A0A0B0]">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-red-400/60 shrink-0" />
                      <span>{row.inHouse}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-white font-semibold bg-gradient-to-r from-purple-900/20 to-pink-900/10 border-l border-purple-500/30">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400 shrink-0" />
                      <span>{row.hostEditify}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Adaptive Comparison (Host Editify vs 1 Selectable Alternative) */}
        <div className="lg:hidden">
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            <span className="text-xs text-[#A0A0B0] mr-1">Compare against:</span>
            {alternatives.map((alt) => (
              <button
                key={alt.key}
                onClick={() => setMobileAlt(alt.key as typeof mobileAlt)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all border",
                  mobileAlt === alt.key
                    ? "bg-[#14141C] text-white border-purple-500 shadow-sm"
                    : "bg-transparent text-[#A0A0B0] border-white/10"
                )}
              >
                {alt.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0A0A0F] border border-white/10 shadow-lg"
              >
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#A0A0B0] mb-3">
                  {row.feature}
                </h4>
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                  {/* Selected Alternative */}
                  <div className="p-3 rounded-xl bg-[#14141C] border border-white/5">
                    <span className="text-[11px] text-red-400 font-semibold block mb-1">
                      {alternatives.find((a) => a.key === mobileAlt)?.label}
                    </span>
                    <p className="text-xs text-[#A0A0B0]">{row[mobileAlt]}</p>
                  </div>

                  {/* Host Editify */}
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40">
                    <span className="text-[11px] text-[#1EC8FF] font-bold block mb-1">
                      ★ Host Editify
                    </span>
                    <p className="text-xs text-white font-medium">{row.hostEditify}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
