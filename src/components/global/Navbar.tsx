"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { useAuditModal } from "@/context/AuditModalContext";

const links = [
  { id: "work-section", label: "Our work" },
  { id: "why-us-section", label: "Why us" },
  { id: "process-section", label: "How it works" },
  { id: "plans-section", label: "Plans" },
  { id: "faq-section", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { openAuditModal } = useAuditModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-white/[0.08] bg-[#0A0A0F]/95 backdrop-blur-xl"
          : "border-transparent bg-[#0A0A0F]/80 backdrop-blur-md"
      )}
    >
      <div className="container-page flex items-center justify-between gap-3 py-3">
        <Logo priority />

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="type-small font-medium text-[#A0A0B0] transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Button onClick={() => openAuditModal("nav")} className="px-5 md:px-7">
          <span className="md:hidden">Book Free Audit</span>
          <span className="hidden md:inline">Book My Free Content Audit</span>
        </Button>
      </div>
    </header>
  );
}
