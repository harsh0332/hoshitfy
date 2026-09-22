"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Sparkles } from "lucide-react";
import { site } from "@/lib/site.config";
import { VideoLightbox } from "@/components/ui/VideoLightbox";
import { VideoItem } from "@/components/ui/VideoCard";

export function FounderSection() {
  const [isPlayingFounderVideo, setIsPlayingFounderVideo] = useState(false);

  const founderVideo: VideoItem = {
    id: "founder-video",
    title: "A Message from Dhanraj, Founder of Host Editify",
    category: "Personal Brand",
    duration: "00:34",
    fullVideoUrl: "/videos/founder-story-full.mp4",
    posterUrl: "/posters/founder-story.jpg",
  };

  return (
    <section className="relative py-20 md:py-28 bg-[#0A0A0F] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#14141C] border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle background ambient blur */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Left: Founder Video Card */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <div 
                onClick={() => setIsPlayingFounderVideo(true)}
                className="relative w-48 sm:w-56 aspect-[9/16] rounded-2xl overflow-hidden border-2 border-white/20 shadow-[0_0_35px_rgba(162,75,255,0.3)] mb-4 cursor-pointer group select-none"
              >
                {/* Looping preview */}
                <video
                  src="/videos/founder-story-preview.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/posters/founder-story.jpg"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-brand-gradient text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="px-2 py-0.5 rounded bg-black/75 border border-white/15 text-[10px] font-mono text-white/90">
                    Watch Founder Note (34s)
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-0.5">
                {site.founder.name}
              </h3>
              <span className="text-xs uppercase font-mono tracking-wider text-[#FF8A1E] font-medium mb-4">
                Founder · Host Editify
              </span>

              {/* Verified Stat Chips */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span className="px-3 py-1 rounded-full bg-[#0A0A0F] border border-white/10 text-xs font-mono text-white">
                  ⚡ {site.founder.years} Years in Growth Marketing
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0A0A0F] border border-white/10 text-xs font-mono text-white">
                  👑 {site.founder.clients} Businesses Helped
                </span>
              </div>
            </div>

            {/* Right: Story */}
            <div className="md:col-span-7 flex flex-col text-left">
              <span className="text-xs uppercase font-mono tracking-widest text-[#1EC8FF] font-semibold mb-2">
                Origin Story
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
                Built by a marketer who got tired of late videos.
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[#A0A0B0] leading-relaxed">
                <p>
                  I&apos;m <strong className="text-white font-semibold">{site.founder.name}</strong>. For the last {site.founder.years} years, I&apos;ve helped {site.founder.clients} businesses and creators grow through marketing systems, automation and AI.
                </p>
                <p>
                  At my own marketing agency, one problem kept costing us: editors delivering ads and videos late. Campaigns slipped. Clients waited. Money was lost.
                </p>
                <p>
                  Then I saw the exact same bottleneck everywhere. Founders and agents were filming great ideas on their phones, but the footage sat in camera rolls because editing it was an endless headache.
                </p>
                <p className="text-white font-medium">
                  So I built <strong className="text-brand-gradient">Host Editify</strong>: a dedicated editing team, backed by streamlined AI workflows, with one obsession — your video, ready in 21 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Video Lightbox */}
      <VideoLightbox
        video={isPlayingFounderVideo ? founderVideo : null}
        onClose={() => setIsPlayingFounderVideo(false)}
      />
    </section>
  );
}
