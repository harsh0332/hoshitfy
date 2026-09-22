import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { leadSchema } from "@/lib/lead.schema";

// Hash helper for Meta CAPI
function sha256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = leadSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const leadData = result.data;
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "";
    const eventId = leadData.eventId || `lead_${Date.now()}`;

    // Asynchronously dispatch webhook to n8n and Meta CAPI in parallel
    const backgroundTasks: Promise<unknown>[] = [];

    // 1. Forward JSON to N8N_LEAD_WEBHOOK_URL
    const n8nWebhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      backgroundTasks.push(
        fetch(n8nWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...leadData,
            clientIp,
            userAgent,
            timestamp: new Date().toISOString(),
          }),
          signal: AbortSignal.timeout(5000),
        }).catch((err) => console.error("n8n webhook error:", err))
      );
    }

    // 2. Send Meta Conversions API (CAPI) Lead Event
    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    const capiToken = process.env.META_CAPI_TOKEN;

    if (pixelId && capiToken) {
      const capiPayload = {
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId,
            event_source_url: leadData.utm?.landing_url || req.headers.get("referer") || "",
            action_source: "website",
            user_data: {
              em: [sha256(leadData.email)],
              ph: [sha256(leadData.whatsapp.replace(/\D/g, ""))],
              client_ip_address: clientIp,
              client_user_agent: userAgent,
              fbp: leadData.utm?.fbp || undefined,
              fbc: leadData.utm?.fbc || undefined,
            },
            custom_data: {
              currency: "USD",
              lead_type: leadData.qualified ? "qualified" : "unqualified",
              budget: leadData.budgetRange,
              industry: leadData.industry,
              plan: leadData.preferredPlan,
            },
            opt_out: false,
          },
        ],
        test_event_code: process.env.META_TEST_EVENT_CODE || undefined,
      };

      backgroundTasks.push(
        fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${capiToken}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(capiPayload),
          signal: AbortSignal.timeout(5000),
        }).catch((err) => console.error("Meta CAPI error:", err))
      );
    }

    // Wait with a small timeout or execute without blocking
    Promise.allSettled(backgroundTasks);

    return NextResponse.json({
      success: true,
      qualified: leadData.qualified,
      eventId,
    });
  } catch (error) {
    console.error("API Lead route error:", error);
    return NextResponse.json(
      { error: "Internal server error processing lead" },
      { status: 500 }
    );
  }
}
