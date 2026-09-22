"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import Cal, { getCalApi } from "@calcom/embed-react";
import Image from "next/image";
import { CheckCircle2, ArrowRight, ArrowLeft, Send, Sparkles, MessageCircle, Clock, Calendar, ShieldCheck } from "lucide-react";
import { leadSchema, LeadFormData } from "@/lib/lead.schema";
import { site } from "@/lib/site.config";
import { generateEventId, trackPixelEvent, getStoredUtm, captureAndStoreUtm } from "@/lib/tracking";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const countryCodes = [
  { code: "+971", country: "UAE" },
  { code: "+91", country: "India" },
  { code: "+966", country: "Saudi Arabia" },
  { code: "+974", country: "Qatar" },
  { code: "+968", country: "Oman" },
  { code: "+44", country: "UK" },
  { code: "+1", country: "USA/Canada" },
];

export function BookingSection() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+971");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    qualified: boolean;
    data: LeadFormData;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      monthlyVideos: "5–10",
      currentEditor: "Myself",
      budgetRange: "$500–$1,000",
      preferredPlan: "Authority",
      industry: "Real estate",
      qualified: true,
    },
  });

  const formValues = watch();

  // Load saved progress from sessionStorage & capture UTM
  useEffect(() => {
    captureAndStoreUtm();
    try {
      const saved = sessionStorage.getItem("host_editify_form");
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.keys(parsed).forEach((k) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setValue(k as any, parsed[k]);
        });
      }
    } catch {}
  }, [setValue]);

  // Persist form changes in sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem("host_editify_form", JSON.stringify(formValues));
    } catch {}
  }, [formValues]);

  // Initialize Cal.com Embed API & listen for successful booking
  useEffect(() => {
    if (submissionResult?.qualified) {
      (async function () {
        const cal = await getCalApi();
        cal("ui", {
          theme: "dark",
          styles: { branding: { brandColor: "#A24BFF" } },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
        // Listen for successful booking event -> trigger conversion and redirect to thank-you
        cal("on", {
          action: "bookingSuccessful",
          callback: () => {
            const eventId = generateEventId();
            trackPixelEvent("Schedule", { channel: "cal.com" }, eventId);
            window.location.href = "/thank-you";
          },
        });
      })();
    }
  }, [submissionResult]);

  const handleNextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(["name", "whatsapp", "email"]);
      if (isValid) {
        // Validate phone with libphonenumber-js
        const fullNumber = `${selectedCountryCode}${formValues.whatsapp.replace(/\D/g, "")}`;
        const parsed = parsePhoneNumberFromString(fullNumber);
        if (!parsed || !parsed.isValid()) {
          // If not strict valid, still accept if >= 8 digits
          if (formValues.whatsapp.length < 8) return;
        }
        setStep(2);
      }
    } else if (step === 2) {
      isValid = await trigger(["businessName", "industry", "monthlyVideos", "currentEditor"]);
      if (isValid) setStep(3);
    }
  };

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    const isQualified = data.budgetRange !== "Under $500";
    const eventId = generateEventId();
    const utmData = getStoredUtm();

    const payload: LeadFormData = {
      ...data,
      whatsapp: `${selectedCountryCode} ${data.whatsapp}`,
      qualified: isQualified,
      eventId,
      utm: utmData,
    };

    try {
      // Browser Pixel Track
      trackPixelEvent(
        "Lead",
        {
          currency: "USD",
          value: isQualified ? 500 : 0,
          lead_type: isQualified ? "qualified" : "unqualified",
        },
        eventId
      );

      // Server dispatch to /api/lead (handles CAPI + n8n)
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSubmissionResult({ qualified: isQualified, data: payload });
    } catch (err) {
      console.error("Submission failed:", err);
      // Fallback show result anyway
      setSubmissionResult({ qualified: isQualified, data: payload });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="booking-section"
      className="relative py-20 md:py-32 bg-[#0A0A0F] border-t border-white/5 overflow-hidden"
    >
      {/* Background Dubai Night Skyline Mood Texture */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-15 overflow-hidden">
        <Image
          src="/generated/dubai-night-mood.jpg"
          alt="Dubai Skyline Night"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-[#0A0A0F]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Call Expectation & Qualifier */}
          <div className="lg:col-span-5 flex flex-col text-left">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-brand-gradient text-white font-bold shadow-md">
                Claim Your Free Audit
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Your next 30 videos are already in your camera roll.
            </h2>

            <p className="text-sm sm:text-base text-[#A0A0B0] leading-relaxed mb-6">
              Let&apos;s turn them into content that builds your authority. Book a free 30-minute content audit. We review your profile before the call, show you exactly what to fix, and edit your first video free.
            </p>

            {/* Strict Capacity Qualifier */}
            <div className="p-4 rounded-xl bg-[#14141C] border border-white/10 mb-8">
              <span className="text-xs uppercase font-mono tracking-wider text-[#FF8A1E] font-bold block mb-1">
                ⏳ Monthly Onboarding Notice
              </span>
              <p className="text-xs text-white/80">
                We onboard only <strong className="text-white font-bold">5 new clients per month</strong> to protect turnaround speed and creative focus.
              </p>
            </div>

            {/* What happens on the call checklist */}
            <div className="space-y-4 mb-8">
              <h3 className="text-sm uppercase font-mono tracking-wider text-white font-bold">
                What happens on the call:
              </h3>
              <div className="flex items-start gap-3 text-sm text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#1EC8FF] shrink-0 mt-0.5" />
                <span><strong>Profile audit prepared in advance:</strong> We review your current videos and top 3 competitors before we meet.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#1EC8FF] shrink-0 mt-0.5" />
                <span><strong>Actionable review:</strong> We show you what is working, what isn&apos;t, and 5 hook ideas you can film immediately.</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/90">
                <CheckCircle2 className="w-5 h-5 text-[#1EC8FF] shrink-0 mt-0.5" />
                <span><strong>Free First Edit:</strong> Send us one clip up to 40 seconds. We edit it completely free so you can verify our speed.</span>
              </div>
            </div>

            {/* Ideal Fit Note */}
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
              📌 <strong className="text-white">Qualifier:</strong> Best fit for business owners already creating content who want to post 10+ videos a month. Not suitable for students or one-off hobby projects.
            </div>
          </div>

          {/* Right Column: Multi-Step Interactive Form OR Direct Cal Embed */}
          <div className="lg:col-span-7">
            {!submissionResult ? (
              <div className="p-6 sm:p-10 rounded-3xl bg-[#14141C] border border-white/10 shadow-2xl relative">
                {/* Step Progress Indicator */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-[#1EC8FF]">STEP {step} OF 3</span>
                    <span className="text-[#A0A0B0]">
                      {step === 1 ? "Contact Details" : step === 2 ? "Business & Content" : "Goals & Budget"}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-gradient transition-all duration-300"
                      style={{ width: `${(step / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* STEP 1: Contact Details */}
                  {step === 1 && (
                    <div className="space-y-5 animate-in fade-in-50 duration-200">
                      <div>
                        <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                          Your Full Name *
                        </label>
                        <input
                          {...register("name")}
                          placeholder="e.g. Tariq Al Mansoori"
                          className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0F] border border-white/10 focus:border-purple-500 text-white placeholder-white/30 text-sm outline-none transition-colors"
                        />
                        {errors.name && (
                          <span className="text-xs text-red-400 mt-1 block">{errors.name.message}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                          WhatsApp Number (For call details &amp; edits) *
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={selectedCountryCode}
                            onChange={(e) => setSelectedCountryCode(e.target.value)}
                            className="px-3 py-3.5 rounded-xl bg-[#0A0A0F] border border-white/10 text-white text-xs outline-none cursor-pointer shrink-0"
                          >
                            {countryCodes.map((c) => (
                              <option key={c.code} value={c.code} className="bg-[#14141C]">
                                {c.code} ({c.country})
                              </option>
                            ))}
                          </select>
                          <input
                            {...register("whatsapp")}
                            type="tel"
                            placeholder="50 123 4567"
                            className="flex-1 px-4 py-3.5 rounded-xl bg-[#0A0A0F] border border-white/10 focus:border-purple-500 text-white placeholder-white/30 text-sm outline-none transition-colors"
                          />
                        </div>
                        {errors.whatsapp && (
                          <span className="text-xs text-red-400 mt-1 block">{errors.whatsapp.message}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                          Work Email *
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="tariq@company.com"
                          className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0F] border border-white/10 focus:border-purple-500 text-white placeholder-white/30 text-sm outline-none transition-colors"
                        />
                        {errors.email && (
                          <span className="text-xs text-red-400 mt-1 block">{errors.email.message}</span>
                        )}
                      </div>

                      <Button
                        type="button"
                        variant="primary"
                        size="md"
                        onClick={handleNextStep}
                        className="w-full flex items-center justify-center gap-2 text-sm font-bold mt-4"
                      >
                        <span>Continue to Step 2</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {/* STEP 2: Business & Current Setup */}
                  {step === 2 && (
                    <div className="space-y-5 animate-in fade-in-50 duration-200">
                      <div>
                        <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                          Business Name or Brand *
                        </label>
                        <input
                          {...register("businessName")}
                          placeholder="e.g. Apex Luxury Real Estate"
                          className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0F] border border-white/10 focus:border-purple-500 text-white placeholder-white/30 text-sm outline-none transition-colors"
                        />
                        {errors.businessName && (
                          <span className="text-xs text-red-400 mt-1 block">{errors.businessName.message}</span>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                          Industry Sector *
                        </label>
                        <select
                          {...register("industry")}
                          className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0F] border border-white/10 focus:border-purple-500 text-white text-sm outline-none cursor-pointer"
                        >
                          <option value="Real estate">Real estate</option>
                          <option value="Coach or consultant">Coach or consultant</option>
                          <option value="Course creator">Course creator</option>
                          <option value="E-commerce">E-commerce</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                          Instagram Handle or Website (Optional)
                        </label>
                        <input
                          {...register("socialLink")}
                          placeholder="@instagramhandle or website.com"
                          className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0F] border border-white/10 focus:border-purple-500 text-white placeholder-white/30 text-sm outline-none transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                            Videos Posted / Month
                          </label>
                          <select
                            {...register("monthlyVideos")}
                            className="w-full px-3 py-3 rounded-xl bg-[#0A0A0F] border border-white/10 text-white text-xs outline-none cursor-pointer"
                          >
                            <option value="0–5">0–5 videos</option>
                            <option value="5–10">5–10 videos</option>
                            <option value="10–20">10–20 videos</option>
                            <option value="20+">20+ videos</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                            Current Editing Setup
                          </label>
                          <select
                            {...register("currentEditor")}
                            className="w-full px-3 py-3 rounded-xl bg-[#0A0A0F] border border-white/10 text-white text-xs outline-none cursor-pointer"
                          >
                            <option value="Myself">Myself (CapCut/VN)</option>
                            <option value="Freelancer">Freelancers</option>
                            <option value="In-house editor">In-house editor</option>
                            <option value="Agency">Agency</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button
                          type="button"
                          variant="secondary"
                          size="md"
                          onClick={() => setStep(1)}
                          className="flex items-center justify-center gap-1.5 text-xs"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Back</span>
                        </Button>
                        <Button
                          type="button"
                          variant="primary"
                          size="md"
                          onClick={handleNextStep}
                          className="flex-1 flex items-center justify-center gap-2 text-sm font-bold"
                        >
                          <span>Continue to Step 3</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Goals & Budget */}
                  {step === 3 && (
                    <div className="space-y-5 animate-in fade-in-50 duration-200">
                      <div>
                        <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                          Biggest Content Challenge (Optional)
                        </label>
                        <textarea
                          {...register("contentChallenge")}
                          rows={3}
                          placeholder="e.g. Inconsistent delivery, spending 10 hours a week editing, or low watch time..."
                          className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-white/10 focus:border-purple-500 text-white placeholder-white/30 text-sm outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                          Monthly Video Production Budget *
                        </label>
                        <select
                          {...register("budgetRange")}
                          className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0F] border border-white/10 focus:border-purple-500 text-white text-sm outline-none cursor-pointer"
                        >
                          <option value="Under $500">Under $500 / month (Sample edit only)</option>
                          <option value="$500–$1,000">$500–$1,000 / month (Growth Plan fit)</option>
                          <option value="$1,000–$2,000">$1,000–$2,000 / month (Authority Plan fit)</option>
                          <option value="$2,000+">$2,000+ / month (Custom / Multi-channel)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                          Preferred Starting Plan
                        </label>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          {["Growth", "Authority", "Not sure"].map((p) => (
                            <button
                              type="button"
                              key={p}
                              onClick={() => setValue("preferredPlan", p as any)}
                              className={cn(
                                "py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer",
                                formValues.preferredPlan === p
                                  ? "bg-purple-900/40 border-purple-500 text-white font-bold"
                                  : "bg-[#0A0A0F] border-white/10 text-[#A0A0B0] hover:text-white"
                              )}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button
                          type="button"
                          variant="secondary"
                          size="md"
                          onClick={() => setStep(2)}
                          className="flex items-center justify-center gap-1.5 text-xs"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Back</span>
                        </Button>
                        <Button
                          type="submit"
                          variant="primary"
                          size="md"
                          disabled={isSubmitting}
                          className="flex-1 flex items-center justify-center gap-2 text-sm font-bold"
                        >
                          <Send className="w-4 h-4" />
                          <span>{isSubmitting ? "Processing..." : "Submit & Schedule Call"}</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </form>

                {/* Secondary link for people not ready */}
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <a
                    href={`https://wa.me/${site.links.whatsapp}?text=${encodeURIComponent("Hi Host Editify, I'd like to request a free sample edit.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#1EC8FF] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Just want to see what we can do? Request your free sample edit →</span>
                  </a>
                </div>
              </div>
            ) : submissionResult.qualified ? (
              /* QUALIFIED PATH: Inline Cal.com Calendar Embed */
              <div className="p-6 sm:p-8 rounded-3xl bg-[#14141C] border-2 border-purple-500/50 shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-[#1EC8FF] uppercase tracking-wider block">
                      Audit Call Unlocked
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      Select Your 30-Minute Google Meet Slot
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>

                {/* Cal.com Embed */}
                <div className="w-full min-h-[580px] rounded-2xl overflow-hidden bg-[#0A0A0F]">
                  <Cal
                    calLink={site.links.calcom}
                    style={{ width: "100%", height: "100%", overflow: "scroll" }}
                    config={{
                      name: submissionResult.data.name,
                      email: submissionResult.data.email,
                      notes: `Industry: ${submissionResult.data.industry} | Current Setup: ${submissionResult.data.currentEditor} | Budget: ${submissionResult.data.budgetRange}`,
                      theme: "dark",
                    }}
                  />
                </div>
              </div>
            ) : (
              /* UNQUALIFIED PATH: Respectful Sample Edit Alternative */
              <div className="p-8 rounded-3xl bg-[#14141C] border border-white/15 shadow-2xl animate-in zoom-in-95 duration-300 text-center">
                <div className="w-14 h-14 rounded-full bg-brand-gradient mx-auto flex items-center justify-center text-white mb-4 shadow-lg">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Let&apos;s Start With a Free Sample Edit
                </h3>
                <p className="text-sm text-[#A0A0B0] max-w-md mx-auto leading-relaxed mb-6">
                  Thank you, <strong className="text-white">{submissionResult.data.name}</strong>. Because your current content budget is under $500, we recommend trying our 21-hour editing workflow with one free video (up to 40 seconds) first.
                </p>

                <div className="p-5 rounded-2xl bg-[#0A0A0F] border border-white/10 text-left space-y-3 mb-6 max-w-md mx-auto">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#1EC8FF] block">
                    How to Claim Your Sample Edit:
                  </span>
                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                    <span>Upload one raw clip (up to 40s) to Google Drive or WeTransfer</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                    <span>Send the link directly to our WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                    <span>Receive your fully graded, captioned video back in 21 hours</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${site.links.whatsapp}?text=${encodeURIComponent(
                    `Hi Host Editify, I'm ${submissionResult.data.name} from ${submissionResult.data.businessName}. I just submitted the form and would like to claim my free 40-second sample edit.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-xl hover:scale-105 transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                  <span>Send Clip on WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
