import React from "react";
import { cn } from "@/lib/utils";

/** Page section: one container, one vertical rhythm, backgrounds alternate #0A0A0F / #14141C. */
export function Section({
  id,
  alt = false,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  /** true = #14141C background (cards inside switch to #0A0A0F) */
  alt?: boolean;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("section relative overflow-hidden", alt && "section-alt", className)}>
      <div className={cn("container-page relative", containerClassName)}>{children}</div>
    </section>
  );
}

/** Centred H2 + optional sub-line, max-width 720px. */
export function SectionHeader({
  title,
  sub,
  className,
}: {
  title: React.ReactNode;
  sub?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("section-header", className)}>
      <h2 className="type-h2 text-white">{title}</h2>
      {sub && <p className="type-body text-muted mt-3">{sub}</p>}
    </div>
  );
}
