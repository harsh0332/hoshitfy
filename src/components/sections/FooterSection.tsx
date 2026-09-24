"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site.config";

export function FooterSection() {
  return (
    <footer className="relative py-16 bg-[#07070B] border-t border-white/[0.06] text-xs text-[#A0A0B0]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Brand Col */}
          <div className="md:col-span-6 flex flex-col items-start">
            <Link href="/" className="flex items-center mb-3 group">
              <img
                src="/brand/logo-transparent.png"
                alt="Host Editify"
                style={{ height: "44px", width: "auto", objectFit: "contain", display: "block" }}
              />
            </Link>

            <p className="text-white font-semibold text-sm mb-2">
              {site.tagline}
            </p>
            <p className="text-[#A0A0B0] max-w-md leading-relaxed mb-4">
              Host Editify is a specialized short-form video editing agency for founders, creators, and brands across India and Dubai.
            </p>
            <div className="px-3 py-1.5 rounded-lg bg-[#14141C] border border-white/[0.08] text-xs text-white/80">
              📍 Production team based in India. Serving clients across India and Dubai.
            </div>
          </div>

          {/* Direct Communication */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold uppercase tracking-wider mb-4 text-xs">
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
                Mon–Fri, Active IST &amp; GST Business Hours
              </p>
            </div>
          </div>

          {/* Links & Socials */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold uppercase tracking-wider mb-4 text-xs">
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

        {/* Copyright & Disclaimer (No TikTok) */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#666678]">
          <p>© {new Date().getFullYear()} Host Editify. All rights reserved.</p>
          <p>
            Not endorsed by or affiliated with Meta Platforms, Instagram, or YouTube.
          </p>
        </div>
      </div>
    </footer>
  );
}
