// Tracking & Analytics Utilities (Meta Pixel + CAPI + UTM Capture)

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export type CtaPosition =
  | "top-bar"
  | "nav"
  | "hero"
  | "how-it-works"
  | "proof"
  | "final"
  | "sticky-mobile"
  | "sample-edit";

export interface UtmData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  fbp?: string;
  fbc?: string;
  landing_url?: string;
  referrer?: string;
}

// Generate unique event ID for deduplicating browser Pixel and server CAPI events
export function generateEventId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Safely execute fbq in browser
export function trackPixelEvent(
  eventName: string,
  params: Record<string, unknown> = {},
  eventId?: string
) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (eventId) {
      window.fbq("track", eventName, params, { eventID: eventId });
    } else {
      window.fbq("track", eventName, params);
    }
  }
}

// Safely execute custom fbq in browser
export function trackCustomPixelEvent(
  eventName: string,
  params: Record<string, unknown> = {}
) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params);
  }
}

// Custom CTA click tracking with position metadata (Phase 5: CTA_Click)
export function trackCtaClick(position: string, label: string = "Book My Free Content Audit") {
  trackCustomPixelEvent("CTA_Click", {
    position,
    label,
    timestamp: new Date().toISOString(),
  });
}

// Form popup open tracking (Phase 5: FormOpen)
export function trackFormOpen(position: string = "unknown") {
  trackCustomPixelEvent("FormOpen", {
    position,
    timestamp: new Date().toISOString(),
  });
}

// WhatsApp click tracking
export function trackWhatsAppClick(source: string) {
  trackPixelEvent("Contact", {
    channel: "whatsapp",
    source,
    timestamp: new Date().toISOString(),
  });
}

// Video content engagement tracking
export function trackVideoEngagement(videoName: string, progressPercent: number) {
  trackPixelEvent("ViewContent", {
    content_name: videoName,
    content_category: "Video",
    engagement: `${progressPercent}%`,
  });
}

// Capture and persist UTM query params in sessionStorage
export function captureAndStoreUtm(): UtmData {
  if (typeof window === "undefined") return {};

  try {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    const utm: UtmData = {
      utm_source: searchParams.get("utm_source") || undefined,
      utm_medium: searchParams.get("utm_medium") || undefined,
      utm_campaign: searchParams.get("utm_campaign") || undefined,
      utm_content: searchParams.get("utm_content") || undefined,
      utm_term: searchParams.get("utm_term") || undefined,
      fbclid: searchParams.get("fbclid") || undefined,
      landing_url: window.location.href,
      referrer: document.referrer || undefined,
    };

    // Extract _fbp and _fbc cookies if available
    const cookies = document.cookie.split(";").reduce((acc, c) => {
      const [k, v] = c.trim().split("=");
      if (k && v) acc[k] = decodeURIComponent(v);
      return acc;
    }, {} as Record<string, string>);

    if (cookies["_fbp"]) utm.fbp = cookies["_fbp"];
    if (cookies["_fbc"]) utm.fbc = cookies["_fbc"];

    // Check existing stored UTMs and merge
    const storedStr = sessionStorage.getItem("host_editify_utm");
    const stored = storedStr ? JSON.parse(storedStr) : {};
    const merged = { ...stored, ...Object.fromEntries(Object.entries(utm).filter(([, v]) => v !== undefined)) };

    sessionStorage.setItem("host_editify_utm", JSON.stringify(merged));
    return merged;
  } catch {
    return {};
  }
}

export function getStoredUtm(): UtmData {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem("host_editify_utm");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
