"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site.config";
import { trackWhatsAppClick } from "@/lib/tracking";

export function FloatingWhatsApp() {
  const prefilledMessage = encodeURIComponent(
    "Hi Host Editify, I'd like a free content audit."
  );
  const whatsappUrl = `https://wa.me/${site.links.whatsapp}?text=${prefilledMessage}`;

  const handleClick = () => {
    trackWhatsAppClick("floating-bubble");
  };

  return (
    <aside
      aria-label="Direct contact via WhatsApp"
      className="fixed bottom-20 md:bottom-6 right-5 z-40 flex items-center group"
    >
      {/* Tooltip on desktop hover */}
      <span className="hidden md:inline-block mr-3 px-3 py-1.5 rounded-xl bg-[#14141C] border border-white/10 text-white text-xs font-medium shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with us on WhatsApp
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_28px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Direct WhatsApp Chat"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-none" />
        {/* Active online pulse dot */}
        <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#25D366]" />
      </a>
    </aside>
  );
}
