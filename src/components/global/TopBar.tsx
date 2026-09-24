import React from "react";
import { site } from "@/lib/site.config";

export function TopBar() {
  const spots = site.spotsLeftThisMonth;

  return (
    <aside
      aria-label="Monthly client capacity"
      className="relative z-50 w-full border-b border-white/[0.08] bg-[#14141C] px-5 py-2.5 text-center"
    >
      <p className="type-small font-medium text-white/90">
        Only {site.maxClientsPerMonth} new clients onboarded per month
        {typeof spots === "number" && (
          <>
            {" · "}
            <span className="font-semibold text-white">
              {spots} {spots === 1 ? "spot" : "spots"} left this month
            </span>
          </>
        )}
      </p>
    </aside>
  );
}
