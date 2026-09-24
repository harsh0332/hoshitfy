import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Privacy Policy — Host Editify",
  description: "Privacy policy for Host Editify clients, form submissions, and data handling.",
};

export default function PrivacyPage() {
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

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#A0A0B0] mb-8 font-medium">
          Last Updated: September 2026
        </p>

        <div className="space-y-6 text-sm sm:text-base text-[#A0A0B0] leading-relaxed border-t border-white/10 pt-6">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Overview</h2>
            <p>
              Host Editify (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to safeguarding the privacy of our visitors, clients, and leads. This Privacy Policy details how we collect, process, and protect your information when you interact with our website, booking funnels, and communication channels.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Data We Collect</h2>
            <p className="mb-2">When you submit our qualification form or schedule an audit call, we collect:</p>
            <ul className="list-disc pl-5 space-y-1 text-white/80">
              <li>Full Name and Email Address</li>
              <li>WhatsApp Phone Number (used solely for booking confirmation and delivery updates)</li>
              <li>Business Name, Industry, and Social Media/Website links</li>
              <li>Monthly video volume and creative preferences</li>
              <li>Marketing parameters including UTM tags, referrer URL, and Meta advertising identifiers (_fbp, _fbc, fbclid)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Video Footage &amp; Confidentiality (NDA)</h2>
            <p>
              We treat all raw client footage, audio recordings, project files, and strategy notes as strictly confidential. Before client files are shared, we execute a mutual Non-Disclosure Agreement (NDA). Raw files are stored on secure cloud drives with restricted editor access and are never published, shared with third parties, or used for external promotional purposes without your express written consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Third-Party Services &amp; Tracking</h2>
            <p className="mb-2">We utilize industry-standard third-party services to deliver our service:</p>
            <ul className="list-disc pl-5 space-y-1 text-white/80">
              <li><strong>Cal.com:</strong> For scheduling Google Meet audit calls.</li>
              <li><strong>Meta Pixel &amp; Conversions API (CAPI):</strong> For measuring ad campaign effectiveness and conversion tracking with SHA-256 hashed identifiers.</li>
              <li><strong>n8n Webhook:</strong> For internal lead notification and automated confirmation sequences.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">5. Data Retention &amp; Your Rights</h2>
            <p>
              You retain the right to request access to, correction of, or deletion of your personal data at any time. To exercise these rights, email us directly at <strong className="text-white">{site.links.email}</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
