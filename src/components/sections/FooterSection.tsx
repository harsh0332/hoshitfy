import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { site, whatsappLink } from "@/lib/site.config";

export function FooterSection() {
  const whatsapp = whatsappLink();

  return (
    <footer className="border-t border-white/[0.08] bg-[#0A0A0F] py-14 md:py-16">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          <div>
            <Logo />
            <p className="type-small mt-4 font-semibold text-white">{site.tagline}</p>
            <p className="type-small text-muted mt-2 max-w-xs">
              Short-form video editing for founders, coaches and brands in India and Dubai.
              Production team based in India.
            </p>
          </div>

          <div>
            <h3 className="type-small font-semibold text-white">Contact</h3>
            <ul className="type-small text-muted mt-4 flex flex-col gap-3">
              <li>
                <a href={`mailto:${site.links.email}`} className="transition-colors hover:text-white">
                  {site.links.email}
                </a>
              </li>
              {whatsapp && (
                <li>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                    WhatsApp
                  </a>
                </li>
              )}
              <li>Mon–Fri, IST and GST business hours</li>
            </ul>
          </div>

          <div>
            <h3 className="type-small font-semibold text-white">Links</h3>
            <ul className="type-small text-muted mt-4 flex flex-col gap-3">
              <li>
                <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                  LinkedIn
                </a>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/[0.08] pt-8 text-xs text-[#A0A0B0] md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Host Editify. All rights reserved.</p>
          <p>Not endorsed by or affiliated with Meta, Instagram or YouTube.</p>
        </div>
      </div>
    </footer>
  );
}
