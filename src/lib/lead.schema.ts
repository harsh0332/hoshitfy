import { z } from "zod";

// Every choice starts empty in the form and must be picked by the visitor.
export const INDUSTRIES = ["Real estate", "Coach or consultant", "Course creator", "E-commerce", "Other"] as const;
export const MONTHLY_VIDEOS = ["0–5", "5–10", "10–20", "20+"] as const;
export const CURRENT_EDITOR = ["Myself", "Freelancer", "In-house editor", "Agency"] as const;
export const BUDGETS = ["Under $500", "$500–$1,000", "$1,000–$2,000", "$2,000+"] as const;
export const PLANS = ["Growth", "Authority", "Not sure"] as const;

const choose = (label: string) => ({
  errorMap: () => ({ message: `Please choose ${label}` }),
});

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  whatsapp: z.string().trim().min(8, "Please enter a valid WhatsApp number"),
  email: z.string().trim().email("Please enter a valid email"),
  businessName: z.string().trim().min(1, "Please enter your business name"),
  industry: z.enum(INDUSTRIES, choose("your industry")),
  socialLink: z.string().trim().optional(),
  monthlyVideos: z.enum(MONTHLY_VIDEOS, choose("how many videos you post")),
  currentEditor: z.enum(CURRENT_EDITOR, choose("how you edit now")),
  contentChallenge: z.string().trim().optional(),
  budgetRange: z.enum(BUDGETS, choose("a budget range")),
  preferredPlan: z.enum(PLANS, choose("a plan")),
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

/** Budget of $500 or more goes to Cal.com; under $500 gets the free sample-edit prompt. */
export const isQualifiedBudget = (budget: LeadFormData["budgetRange"]) => budget !== "Under $500";
