import { z } from "zod";

// Lead Validation Schema
export const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  whatsapp: z.string().min(8, "Valid phone number is required"),
  email: z.string().email("Valid email address is required"),
  businessName: z.string().min(1, "Business name is required"),
  industry: z.enum([
    "Real estate",
    "Coach or consultant",
    "Course creator",
    "E-commerce",
    "Other",
  ]),
  socialLink: z.string().optional(),
  monthlyVideos: z.enum(["0–5", "5–10", "10–20", "20+"]),
  currentEditor: z.enum([
    "Myself",
    "Freelancer",
    "In-house editor",
    "Agency",
  ]),
  contentChallenge: z.string().optional(),
  budgetRange: z.enum([
    "Under $500",
    "$500–$1,000",
    "$1,000–$2,000",
    "$2,000+",
  ]),
  preferredPlan: z.enum(["Growth", "Authority", "Not sure"]),
  qualified: z.boolean(),
  eventId: z.string().optional(),
  utm: z
    .object({
      utm_source: z.string().optional(),
      utm_medium: z.string().optional(),
      utm_campaign: z.string().optional(),
      utm_content: z.string().optional(),
      utm_term: z.string().optional(),
      fbclid: z.string().optional(),
      fbp: z.string().optional(),
      fbc: z.string().optional(),
      landing_url: z.string().optional(),
      referrer: z.string().optional(),
    })
    .optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;
