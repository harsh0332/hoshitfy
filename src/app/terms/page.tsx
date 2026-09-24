import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Terms of Service — Host Editify",
  description: "Terms of service, delivery policies, and revision guarantees for Host Editify.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-[#A0A0B0] hover:text-white transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="inline-block px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF8A1E] text-xs mb-3 font-semibold">
          Service Agreement &amp; Guarantees
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-xs text-[#A0A0B0] mb-8 font-medium">
          Last Updated: September 2026 · Marked for Founder Review
        </p>

        <div className="space-y-6 text-sm sm:text-base text-[#A0A0B0] leading-relaxed border-t border-white/10 pt-6">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Scope of Service</h2>
            <p>
              Host Editify provides post-production video editing services for short-form (Reels and Shorts) and select long-form content. Host Editify operates as an edit-only service and does not provide physical videography, on-location camera crew, or equipment hire.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. The 24-Hour Delivery Guarantee</h2>
            <p>
              Our signature 24-hour turnaround guarantee applies to individual short-form videos (under 60 seconds). The 24-hour clock commences when both raw footage and clear creative guidance/brief are successfully deposited into your designated shared Google Drive folder during standard business hours (Monday through Friday, active GST and IST hours). If a qualifying video is not delivered within 24 hours, that individual video is edited free of charge.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Free First Edit Policy</h2>
            <p>
              New qualified prospective clients are eligible for one complimentary sample edit of up to 40 seconds. Because this initial edit requires no upfront fee or deposit, no financial refunds are necessary. Clients evaluate the completed sample edit prior to committing to a monthly engagement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Revisions Policy</h2>
            <p>
              The Growth Plan includes up to 2 revision rounds per video. The Authority Plan includes up to 4 revision rounds per video. Revisions encompass pacing adjustments, color grading shifts, font/caption adjustments, and alternate B-roll selections. Revisions that require entirely new raw footage or a complete conceptual pivot from the initial brief are treated as new video submissions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">5. Intellectual Property &amp; File Ownership</h2>
            <p>
              Upon delivery, the client retains 100% full intellectual property ownership and commercial usage rights to all exported video files. Host Editify retains no proprietary claims to client footage.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
