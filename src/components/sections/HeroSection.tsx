"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Zap, ShieldCheck, RefreshCw, FileCheck2, ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { TimecodeBadge } from "@/components/ui/TimecodeBadge";
import { VideoLightbox } from "@/components/ui/VideoLightbox";
import { VideoItem } from "@/components/ui/VideoCard";

export function HeroSection() {
  const [isEditingSimulated, setIsEditingSimulated] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const heroVideoItem: VideoItem = {
    id: "hero-reel",
    title: "Host Editify 21-Hour Showreel",
    category: "Showreel",
    duration: "00:35",
    fullVideoUrl: "/videos/hero-showreel-full.mp4",
    posterUrl: "/posters/hero-showreel.jpg",
  };

  // Toggle raw vs edited state inside the hero PhoneFrame every 4 seconds to demonstrate transformation
  useEffect(() => {
    const timer = setInterval(() => {
      setIsEditingSimulated((prev) => !prev);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const scrollToBooking = () => {
    const el = document.getElementById("booking-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-16 md:py-20 overflow-hidden">
      {/* Background Volumetric Hero Light Field */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] max-w-[1400px] aspect-[16/9] opacity-30 mix-blend-screen filter blur-xl">
          <Image
            src="/generated/hero-light-field.jpg"
            alt="Cinematic Light Field"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Subtle dark gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/60 via-transparent to-[#0A0A0F]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Pre-headline Badge */}
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide bg-[#14141C] text-[#A0A0B0] border border-white/10 shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1EC8FF]" />
                <span>For real estate agents, coaches &amp; founders in Dubai</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              You film it. We edit it. <br className="hidden sm:inline" />
              It&apos;s ready in <span className="text-brand-gradient">21 hours.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#A0A0B0] font-normal leading-relaxed max-w-xl mb-8">
              Host Editify is your dedicated short-form editing team. Send raw footage to a Google Drive folder and get scroll-stopping Reels, Shorts and TikToks back in 21 hours. No CapCut, no chasing freelancers, no hiring an editor.
            </p>

            {/* Primary CTA Button & Microcopy */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <Button
                variant="primary"
                size="lg"
                ctaPosition="hero"
                magnetic={true}
                onClick={scrollToBooking}
                className="w-full sm:w-auto text-base sm:text-lg px-8 py-4 flex items-center justify-center gap-2.5 font-bold"
              >
                <span>Book My Free Content Audit</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm sm:text-base border border-white/15 flex items-center justify-center gap-3 transition-all cursor-pointer group hover:border-[#FF3D8B]/50"
              >
                <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                </div>
                <span>Watch Reel (35s)</span>
              </button>
            </div>

            {/* Micro-copy under CTA */}
            <p className="text-xs sm:text-sm text-[#A0A0B0] mb-8 flex items-center gap-2">
              <span className="text-[#FF8A1E] font-semibold">⚡ Free First Edit:</span>
              <span>30-min Google Meet · Profile audited in advance · First video (up to 40 sec) edited free</span>
            </p>

            {/* Trust Strip */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 text-xs text-white/80">
                <Zap className="w-4 h-4 text-[#FF8A1E] shrink-0" />
                <span>21-hr delivery or free</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/80">
                <RefreshCw className="w-4 h-4 text-[#1EC8FF] shrink-0" />
                <span>2 revisions/video</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/80">
                <ShieldCheck className="w-4 h-4 text-[#A24BFF] shrink-0" />
                <span>NDA &amp; encrypted files</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/80">
                <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>You own every file</span>
              </div>
            </div>
          </div>

          {/* Right Column: 9:16 Phone Transformation Showreel Mockup */}
          <div className="lg:col-span-5 flex justify-center order-first lg:order-last">
            <div className="relative w-full max-w-[320px] sm:max-w-[340px]">
              <PhoneFrame glow={true}>
                {/* Simulated Screen with Live Transformation */}
                <div className="relative w-full h-full flex flex-col justify-between p-4 bg-[#0A0A0F]">
                  {/* Top Status Bar inside phone */}
                  <div className="flex items-center justify-between z-20 mt-6">
                    <span className="text-[10px] font-mono text-white/60">Dubai (GST)</span>
                    <TimecodeBadge
                      timecode={isEditingSimulated ? "00:20:45" : "00:00:12"}
                      pulse={isEditingSimulated}
                    />
                  </div>

                  {/* Visual Transformation Simulator */}
                  <div 
                    onClick={() => setIsLightboxOpen(true)}
                    className="relative flex-1 my-3 rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/10 cursor-pointer group"
                  >
                    {/* Real Looping Video */}
                    <video
                      src="/videos/hero-showreel-full.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/posters/hero-showreel.jpg"
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                        isEditingSimulated ? "grayscale-0 contrast-105" : "grayscale contrast-75 brightness-75"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                    {/* Mode Overlay Indicator */}
                    <div className="relative z-10 text-center px-4 pointer-events-none">
                      {isEditingSimulated ? (
                        <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
                          <div className="px-3 py-1 rounded-full bg-brand-gradient text-white text-[11px] font-bold tracking-wider uppercase mb-2 flex items-center gap-1.5 shadow-lg">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>HOST EDITIFY GRADE</span>
                          </div>
                          <span className="text-[10px] text-white/90 font-mono bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                            ⚡ 21h Turnaround Delivery
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center opacity-85">
                          <div className="px-3 py-1 rounded-full bg-[#14141C] text-[#A0A0B0] text-[11px] font-mono uppercase mb-2 border border-white/10">
                            RAW CAMERA FOOTAGE
                          </div>
                          <span className="text-[10px] text-white/70 font-mono bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                            Uncut iPhone Clip
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Click to play full video hint */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs z-20">
                      <div className="w-12 h-12 rounded-full bg-brand-gradient text-white flex items-center justify-center shadow-xl">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>

                    {/* State switch toggle button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditingSimulated(!isEditingSimulated);
                      }}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md text-[10px] text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>{isEditingSimulated ? "View Raw State" : "Snap to Finished Edit"}</span>
                    </button>
                  </div>

                  {/* Phone Bottom Meta */}
                  <div className="flex items-center justify-between text-[11px] text-[#A0A0B0] z-20 pb-2">
                    <span className="font-semibold text-white">Reel #04 / Dubai</span>
                    <span className="text-[#FF8A1E] font-mono">21h Turnaround</span>
                  </div>
                </div>
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Showreel Lightbox */}
      <VideoLightbox
        video={isLightboxOpen ? heroVideoItem : null}
        onClose={() => setIsLightboxOpen(false)}
        onBookClick={scrollToBooking}
      />
    </section>
  );
}
