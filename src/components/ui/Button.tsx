"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { trackCtaClick, CtaPosition } from "@/lib/tracking";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  ctaPosition?: CtaPosition;
  magnetic?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  ctaPosition,
  magnetic = false,
  className,
  onClick,
  children,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    buttonRef.current.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  };

  const handleMouseLeave = () => {
    if (!magnetic || !buttonRef.current) return;
    buttonRef.current.style.transform = "translate(0px, 0px)";
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ctaPosition) {
      trackCtaClick(ctaPosition, typeof children === "string" ? children : "CTA");
    }
    if (onClick) onClick(e);
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm font-semibold tracking-wide",
    lg: "px-8 py-4 text-base font-bold tracking-wide",
  };

  const variantClasses = {
    primary:
      "relative bg-brand-gradient text-white rounded-full transition-all duration-300 shadow-[0_0_24px_-4px_rgba(255,61,139,0.5)] hover:shadow-[0_0_36px_0_rgba(162,75,255,0.65)] hover:scale-[1.02] active:scale-[0.98] border border-white/20",
    secondary:
      "bg-[#14141C] text-white hover:bg-[#1D1D28] rounded-full border border-white/10 hover:border-purple-500/40 transition-all",
    outline:
      "bg-transparent text-white border border-white/20 hover:border-white/50 rounded-full transition-all",
    ghost: "bg-transparent text-[#A0A0B0] hover:text-white transition-colors",
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center cursor-pointer select-none transition-transform duration-200 ease-out",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
