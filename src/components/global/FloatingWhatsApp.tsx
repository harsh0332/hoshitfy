"use client";

import React from "react";
import { whatsappLink } from "@/lib/site.config";
import { trackWhatsAppClick } from "@/lib/tracking";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function FloatingWhatsApp() {
  const href = whatsappLink("Hi Host Editify, I'd like a free content audit.");
  if (!href) return null;

  return (
    // Desktop only: on phones WhatsApp lives inside the sticky CTA bar, so nothing floats over content
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("floating-button")}
      aria-label="Chat with us on WhatsApp"
      className="fixed right-6 bottom-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:scale-105 md:flex"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
