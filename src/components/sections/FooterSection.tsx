"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site.config";

export function FooterSection() {
  return (
    <footer className="relative py-16 bg-[#07070B] border-t border-white/5 text-xs text-[#A0A0B0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Brand Col */}
          <div className="md:col-span-6 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-3">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                <Image
                  src="/brand/logo.png"
                  alt="Host Editify"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-extrabold text-base text-white">
                HOST<span className="text-brand-gradient">EDITIFY</span>
              </span>
            </Link>

            <p className="text-white/80 font-medium text-sm mb-2">
              {site.tagline}
            </p>
            <p className="text-[#A0A0B0] max-w-md leading-relaxed mb-4">
              Host Editify is a specialized short-form video editing agency for founders, real estate leaders, and creators across Dubai and select Indian metros.
            </p>
            <div className="px-3 py-1.5 rounded-lg bg-[#14141C] border border-white/10 text-[11px] font-mono text-white/70">
              📍 Production team based in India, working on Dubai hours (GST, UTC+4)
            </div>
          </div>

          {/* Direct Communication */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold uppercase tracking-wider mb-4 font-mono text-xs">
              Direct Contact
            </h4>
            <div className="space-y-2.5">
              <p>
                <a
                  href={`mailto:${site.links.email}`}
                  className="hover:text-white transition-colors"
                >
                  {site.links.email}
                </a>
              </p>
              <p>
                <a
                  href={`https://wa.me/${site.links.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Support
                </a>
              </p>
              <p className="text-[#666678] text-[11px]">
                Mon–Fri, 9:00 AM – 6:00 PM GST
              </p>
            </div>
          </div>

          {/* Links & Socials */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold uppercase tracking-wider mb-4 font-mono text-xs">
              Connect &amp; Legal
            </h4>
            <div className="space-y-2.5">
              <p>
                <a
                  href={site.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </p>
              <p>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </p>
              <p>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </p>
              <p>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#666678]">
          <p>© {new Date().getFullYear()} Host Editify. All rights reserved.</p>
          <p>
            Not endorsed by or affiliated with Meta Platforms, Instagram, or TikTok.
          </p>
        </div>
      </div>
    </footer>
  );
}
