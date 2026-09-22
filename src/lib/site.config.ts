export const site = {
  brand: "Host Editify",
  tagline: "You shoot, We deliver",
  deliveryHours: 21, // short-form, counted from footage + brief received
  deliveryFinePrint:
    "For short-form videos, counted from when your footage and brief land in your Drive folder, Mon–Fri (Dubai time).",
  maxClientsPerMonth: 5,
  spotsLeftThisMonth: null as number | null, // set manually; bar hides when null
  freeFirstVideoMaxSeconds: 40,
  revisions: { growth: 2, authority: 4 },
  plans: [
    { name: "Growth", summary: "15 short-form videos / month" },
    {
      name: "Authority",
      summary: "25 short-form + 4 long-form videos / month",
      featured: true,
    },
  ],
  priceLockPromise: true, // FAQ "Will the price go up?" shows only if true
  founder: { name: "Dhanraj Singh", years: 4, clients: "100+" },
  stats: {
    // only verified numbers; null hides
    adCtr: "2.5%",
    costPerLeadUsd: null,
    videosDelivered: null,
  },
  clients: [
    "Bluhawk Marketing",
    "AI Buddies",
    "DPM Entertainment",
    "Heart to Mind",
    "Host Dhanraj",
  ],
  links: {
    calcom: process.env.NEXT_PUBLIC_CALCOM_LINK || "hosteditify/content-audit",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "971500000000",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@hosteditify.com",
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
      "https://instagram.com/hosteditify",
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN_URL ||
      "https://linkedin.com/company/hosteditify",
    portfolio:
      process.env.NEXT_PUBLIC_PORTFOLIO_URL || "https://canva.com",
  },
};
