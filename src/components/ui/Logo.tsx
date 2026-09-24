import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// public/brand/logo-horizontal.png is 458x96 (@2x of 48px); rebuild with scripts/build-logo.py
const RATIO = 458 / 96;

/** Horizontal lockup: 40px tall on phone, 48px on desktop. Used only in the navbar and footer. */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label="Host Editify home" className={cn("inline-flex shrink-0", className)}>
      <Image
        src="/brand/logo-horizontal.png"
        alt="Host Editify"
        width={Math.round(48 * RATIO)}
        height={48}
        priority={priority}
        className="h-10 w-auto md:h-12"
      />
    </Link>
  );
}
