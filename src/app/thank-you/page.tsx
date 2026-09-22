import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Upload, Play, ArrowLeft } from "lucide-react";
import { site } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "You're Booked — Host Editify",
  robots: {
    index: false,
    follow: false,
  },
};

const prepVideos = [
  {
    title: "How to Film Clean Audio & Lighting On Your iPhone",
    duration: "02:15",
    tag: "Preparation",
  },
  {
    title: "5 High-Converting Video Hooks for Dubai Real Estate",
    duration: "01:40",
    tag: "Strategy",
  },
  {
    title: "What Happens During Your 30-Minute Content Audit",
    duration: "01:10",
    tag: "Call Roadmap",
  },
];

export default function ThankYouPage() {
  const whatsappUrl = `https://wa.me/${site.links.whatsapp}?text=${encodeURIComponent(
    "Hi Host Editify, I just booked my free content audit call and would like to submit my 40-second clip for the free edit."
  )}`;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white py-16 px-4 sm:px-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full mx-auto text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase font-mono tracking-widest text-[#1EC8FF] font-bold block mb-2">
          Call Confirmed
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          You&apos;re booked. Check WhatsApp.
        </h1>
        <p className="text-base text-[#A0A0B0] leading-relaxed mb-8">
          We&apos;ve sent your call details and calendar invite. Our team has already started auditing your profile so we can deliver maximum value the second our call begins.
        </p>

        {/* Free Edit Upload Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#14141C] border-2 border-purple-500/50 shadow-2xl text-left mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Claim Your Free Edit Before the Call
              </h2>
              <span className="text-xs text-[#A0A0B0]">
                Up to 40 seconds · Delivered in 21 hours
              </span>
            </div>
          </div>

          <p className="text-sm text-[#A0A0B0] leading-relaxed mb-6">
            Upload one raw clip (up to 40 seconds) to a Google Drive or Dropbox link, and send it to our team on WhatsApp. We will deliver your fully edited, captioned video so you can review it before or during our audit call.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-xl transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white stroke-none" />
            <span>Send Clip via WhatsApp</span>
          </a>
        </div>

        {/* 3 Preparation Videos */}
        <div className="text-left mb-12">
          <h3 className="text-sm uppercase font-mono tracking-wider text-white font-semibold mb-4 text-center">
            Watch Before Your Call
          </h3>
          <div className="space-y-3">
            {prepVideos.map((video, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#14141C] border border-white/10 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/60 flex items-center justify-center text-[#1EC8FF]">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white leading-snug">
                      {video.title}
                    </h4>
                    <span className="text-xs text-[#A0A0B0] font-mono">{video.tag}</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-white/50">{video.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Return Home Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#A0A0B0] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
