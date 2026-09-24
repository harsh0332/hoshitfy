import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { site, whatsappLink } from "@/lib/site.config";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export const metadata: Metadata = {
  title: "You're booked — Host Editify",
  robots: { index: false, follow: false },
};

// Copy from the copy doc §14 (thank-you page)
export default function ThankYouPage() {
  const href = whatsappLink(
    `Hi Host Editify, I just booked my free content audit and would like to send my ${site.freeFirstVideoMaxSeconds}-second clip for the free edit.`
  );

  return (
    <main className="section flex min-h-[70svh] items-center">
      <div className="container-page flex flex-col items-center text-center">
        <div className="icon-tile">
          <CheckCircle2 className="h-6 w-6 text-[#A24BFF]" strokeWidth={1.75} aria-hidden />
        </div>
        <h1 className="type-h2 mt-6 max-w-[720px] text-white">You&apos;re booked. Check WhatsApp.</h1>
        <p className="type-body text-muted mt-4 max-w-[600px]">
          We&apos;ve sent your call details for your {site.callMinutes}-minute content audit. Before the
          call, upload one clip (up to {site.freeFirstVideoMaxSeconds} seconds) to get your free edit
          started.
        </p>

        <div className="card mt-10 w-full max-w-[520px] text-left">
          <h2 className="type-h3 text-white">Claim your free edit before the call</h2>
          <p className="type-small text-muted mt-2">
            Upload one raw clip to Google Drive or WeTransfer and send us the link
            {href ? " on WhatsApp" : ` at ${site.links.email}`}. You&apos;ll get the edited video
            back within {site.deliveryHours} hours.
          </p>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 text-[15px] font-semibold whitespace-nowrap text-white"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Send clip on WhatsApp
            </a>
          ) : (
            <a
              href={`mailto:${site.links.email}?subject=${encodeURIComponent("Free edit clip")}`}
              className="bg-brand-gradient mt-6 flex h-[52px] w-full items-center justify-center rounded-full px-7 text-[15px] font-semibold whitespace-nowrap text-white"
            >
              Email your clip link
            </a>
          )}
        </div>

        <Link href="/" className="type-small text-muted mt-10 inline-flex items-center gap-2 hover:text-white">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
