import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { isQualifiedBudget, leadSchema, type LeadFormData } from "@/lib/lead.schema";

const TIMEOUT_MS = 5000;

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

/**
 * Fallback when the webhook is missing or fails: print the lead to the server log (visible in
 * Vercel logs) and append it to a local NDJSON file (.leads/ locally, /tmp on Vercel).
 */
async function logLeadLocally(lead: Record<string, unknown>, reason: string) {
  console.warn(`[lead] ${reason}. Lead logged here:`, JSON.stringify(lead));
  const dir = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), ".leads");
  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(path.join(dir, "leads.ndjson"), JSON.stringify(lead) + "\n");
  } catch (err) {
    console.error("[lead] could not write local lead log:", err);
  }
}

async function sendToN8n(url: string, lead: Record<string, unknown>) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`n8n webhook responded ${res.status}`);
}

async function sendToMetaCapi(
  pixelId: string,
  token: string,
  lead: LeadFormData,
  eventId: string,
  req: NextRequest,
  clientIp: string,
  userAgent: string
) {
  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: lead.utm?.landing_url || req.headers.get("referer") || "",
        action_source: "website",
        user_data: {
          em: [sha256(lead.email)],
          ph: [sha256(lead.whatsapp.replace(/\D/g, ""))],
          client_ip_address: clientIp,
          client_user_agent: userAgent,
          fbp: lead.utm?.fbp || undefined,
          fbc: lead.utm?.fbc || undefined,
        },
        custom_data: {
          currency: "USD",
          lead_type: lead.qualified ? "qualified" : "unqualified",
          budget: lead.budgetRange,
          industry: lead.industry,
          plan: lead.preferredPlan,
        },
      },
    ],
    test_event_code: process.env.META_TEST_EVENT_CODE || undefined,
  };
  const res = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Meta CAPI responded ${res.status}`);
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.format() }, { status: 400 });
  }

  // Qualification is decided here from the budget, not trusted from the browser
  const lead = { ...parsed.data, qualified: isQualifiedBudget(parsed.data.budgetRange) };
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "";
  const userAgent = req.headers.get("user-agent") || "";
  const eventId = lead.eventId || `lead_${Date.now()}`;
  const record = { ...lead, eventId, clientIp, userAgent, receivedAt: new Date().toISOString() };

  const n8nUrl = process.env.N8N_LEAD_WEBHOOK_URL;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const capiToken = process.env.META_CAPI_TOKEN;

  // Wait for every delivery (each capped at 5s) before answering, so nothing is dropped mid-flight
  const [n8nResult, capiResult] = await Promise.allSettled([
    n8nUrl ? sendToN8n(n8nUrl, record) : logLeadLocally(record, "N8N_LEAD_WEBHOOK_URL is not set"),
    pixelId && capiToken
      ? sendToMetaCapi(pixelId, capiToken, lead, eventId, req, clientIp, userAgent)
      : Promise.resolve(),
  ]);

  if (capiResult.status === "rejected") {
    console.error("[lead] Meta CAPI failed:", capiResult.reason);
  }

  if (n8nResult.status === "rejected") {
    // The webhook failed: keep a copy of the lead in the logs and tell the visitor to retry
    console.error("[lead] n8n webhook failed:", n8nResult.reason);
    await logLeadLocally(record, "n8n webhook failed");
    return NextResponse.json({ error: "Could not deliver lead" }, { status: 502 });
  }

  const warning =
    !n8nUrl && process.env.NODE_ENV !== "production"
      ? "N8N_LEAD_WEBHOOK_URL is not set: this lead was only written to the server log and .leads/leads.ndjson."
      : undefined;

  return NextResponse.json({ success: true, qualified: lead.qualified, eventId, warning });
}
