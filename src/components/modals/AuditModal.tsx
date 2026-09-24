"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import Cal, { getCalApi } from "@calcom/embed-react";
import { X, ArrowRight, ArrowLeft, Send, Sparkles, MessageCircle, Calendar } from "lucide-react";
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

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuditModal({ isOpen, onClose }: AuditModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+971");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    qualified: boolean;
    data: LeadFormData;
  } | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

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

  // Body scroll locking and Focus Trap + Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Auto-focus first input
    const focusTimeout = setTimeout(() => {
      const firstInput = modalRef.current?.querySelector<HTMLElement>(
        "input, select, textarea, button"
      );
      firstInput?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimeout);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

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

  if (!isOpen) return null;

  const handleNextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(["name", "whatsapp", "email"]);
      if (isValid) {
        const fullNumber = `${selectedCountryCode}${formValues.whatsapp.replace(/\D/g, "")}`;
        const parsed = parsePhoneNumberFromString(fullNumber);
        if (!parsed || !parsed.isValid()) {
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
      trackPixelEvent(
        "Lead",
        {
          currency: "USD",
          value: isQualified ? 500 : 0,
          lead_type: isQualified ? "qualified" : "unqualified",
        },
        eventId
      );

      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSubmissionResult({ qualified: isQualified, data: payload });
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmissionResult({ qualified: isQualified, data: payload });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Dialog (Bottom sheet on phone, centered modal on desktop) */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="audit-modal-title"
        className="relative w-full max-h-[92vh] sm:max-h-[90vh] sm:max-w-2xl bg-[#14141C] border border-white/15 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile handle indicator */}
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-3 mb-1 sm:hidden shrink-0" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer z-30"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(92vh-2rem)] sm:max-h-[calc(90vh-2rem)]">
          {!submissionResult ? (
            <div>
              {/* Modal Header */}
              <div className="mb-6 pr-8">
                <span className="px-3 py-1 rounded-full text-[11px] uppercase tracking-wider bg-brand-gradient text-white font-bold inline-block mb-2">
                  Free 30-Min Content Audit
                </span>
                <h3 id="audit-modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Book Your Free Content Audit
                </h3>
                <p className="text-xs sm:text-sm text-[#A0A0B0] mt-1">
                  We review your videos before the call and edit your first video free.
                </p>
              </div>

              {/* Step Progress Indicator */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
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

              {/* Multi-step Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* STEP 1: Contact Details */}
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in-50 duration-200">
                    <div>
                      <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        {...register("name")}
                        placeholder="e.g. Tariq Al Mansoori"
                        className={cn(
                          "w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border text-white placeholder-white/30 text-sm outline-none transition-colors",
                          errors.name ? "border-red-500" : "border-white/10 focus:border-purple-500"
                        )}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                        WhatsApp Number (for call details &amp; edits) *
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={selectedCountryCode}
                          onChange={(e) => setSelectedCountryCode(e.target.value)}
                          className="px-2.5 py-3 rounded-xl bg-[#0A0A0F] border border-white/10 text-white text-xs outline-none cursor-pointer"
                        >
                          {countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.code} ({c.country})
                            </option>
                          ))}
                        </select>
                        <input
                          {...register("whatsapp")}
                          type="tel"
                          placeholder="50 123 4567"
                          className={cn(
                            "flex-1 px-4 py-3 rounded-xl bg-[#0A0A0F] border text-white placeholder-white/30 text-sm outline-none transition-colors",
                            errors.whatsapp ? "border-red-500" : "border-white/10 focus:border-purple-500"
                          )}
                        />
                      </div>
                      {errors.whatsapp && (
                        <p className="text-red-400 text-xs mt-1">{errors.whatsapp.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                        Work Email *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="tariq@company.com"
                        className={cn(
                          "w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border text-white placeholder-white/30 text-sm outline-none transition-colors",
                          errors.email ? "border-red-500" : "border-white/10 focus:border-purple-500"
                        )}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="pt-2">
                      <Button
                        type="button"
                        variant="primary"
                        size="md"
                        onClick={handleNextStep}
                        className="w-full flex items-center justify-center gap-2 text-sm font-bold py-3.5"
                      >
                        <span>Continue to Step 2</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Business & Content */}
                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in-50 duration-200">
                    <div>
                      <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                        Business / Brand Name *
                      </label>
                      <input
                        {...register("businessName")}
                        placeholder="e.g. Apex Properties or Tariq Coaching"
                        className={cn(
                          "w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border text-white placeholder-white/30 text-sm outline-none transition-colors",
                          errors.businessName ? "border-red-500" : "border-white/10 focus:border-purple-500"
                        )}
                      />
                      {errors.businessName && (
                        <p className="text-red-400 text-xs mt-1">{errors.businessName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                        Your Industry *
                      </label>
                      <select
                        {...register("industry")}
                        className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-white/10 text-white text-xs sm:text-sm outline-none cursor-pointer"
                      >
                        <option value="Real estate">Real estate &amp; High-Ticket Brokerage</option>
                        <option value="Personal brand / Coach">Personal Brand, Coach, or Founder</option>
                        <option value="Course creators">Course Creator / Education</option>
                        <option value="E-commerce">E-commerce / D2C Brand</option>
                        <option value="Agency / B2B">Marketing Agency / B2B Services</option>
                        <option value="AI / Tech">AI / Tech / SaaS Founder</option>
                        <option value="Other">Other Category</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                          Videos / Month
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
                        <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                          Current Setup
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
                        className="flex items-center justify-center gap-1.5 text-xs py-3"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        size="md"
                        onClick={handleNextStep}
                        className="flex-1 flex items-center justify-center gap-2 text-sm font-bold py-3"
                      >
                        <span>Continue to Step 3</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Goals & Budget */}
                {step === 3 && (
                  <div className="space-y-4 animate-in fade-in-50 duration-200">
                    <div>
                      <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                        Biggest Content Challenge (Optional)
                      </label>
                      <textarea
                        {...register("contentChallenge")}
                        rows={2}
                        placeholder="e.g. Inconsistent delivery, spending 10 hours a week editing, or low watch time..."
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0F] border border-white/10 focus:border-purple-500 text-white placeholder-white/30 text-xs sm:text-sm outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                        Monthly Video Production Budget *
                      </label>
                      <select
                        {...register("budgetRange")}
                        className="w-full px-4 py-3 rounded-xl bg-[#0A0A0F] border border-white/10 focus:border-purple-500 text-white text-xs sm:text-sm outline-none cursor-pointer"
                      >
                        <option value="Under $500">Under $500 / month (Sample edit only)</option>
                        <option value="$500–$1,000">$500–$1,000 / month (Growth Plan fit)</option>
                        <option value="$1,000–$2,000">$1,000–$2,000 / month (Authority Plan fit)</option>
                        <option value="$2,000+">$2,000+ / month (Custom / Multi-channel)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-1.5">
                        Preferred Starting Plan
                      </label>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        {["Growth", "Authority", "Not sure"].map((p) => (
                          <button
                            type="button"
                            key={p}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onClick={() => setValue("preferredPlan", p as any)}
                            className={cn(
                              "py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer",
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
                        className="flex items-center justify-center gap-1.5 text-xs py-3"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        disabled={isSubmitting}
                        className="flex-1 flex items-center justify-center gap-2 text-sm font-bold py-3"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSubmitting ? "Processing..." : "Submit & Schedule Call"}</span>
                      </Button>
                    </div>
                  </div>
                )}
              </form>

              {/* Secondary link for free sample edit */}
              <div className="mt-6 pt-4 border-t border-white/10 text-center">
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
            /* QUALIFIED PATH: Cal.com Calendar Embed */
            <div className="animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 pr-8">
                <div>
                  <span className="text-xs text-[#1EC8FF] uppercase tracking-wider block font-semibold">
                    Audit Call Unlocked
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Select Your 30-Minute Google Meet Slot
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>

              <div className="w-full min-h-[500px] rounded-2xl overflow-hidden bg-[#0A0A0F]">
                <Cal
                  calLink={site.links.calcom}
                  style={{ width: "100%", height: "100%", minHeight: "500px", overflow: "scroll" }}
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
            <div className="text-center animate-in zoom-in-95 duration-300 py-4">
              <div className="w-12 h-12 rounded-full bg-brand-gradient mx-auto flex items-center justify-center text-white mb-3 shadow-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Let&apos;s Start With a Free Sample Edit
              </h3>
              <p className="text-xs sm:text-sm text-[#A0A0B0] max-w-md mx-auto leading-relaxed mb-5">
                Thank you, <strong className="text-white font-semibold">{submissionResult.data.name}</strong>. Because your current content budget is under $500, we recommend trying our 24-hour editing workflow with one free video (up to 40 seconds) first.
              </p>

              <div className="p-4 rounded-2xl bg-[#0A0A0F] border border-white/10 text-left space-y-2.5 mb-6 max-w-md mx-auto">
                <span className="text-xs uppercase tracking-wider text-[#1EC8FF] block font-semibold">
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
                  <span>Receive your fully graded, captioned video back in 24 hours</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${site.links.whatsapp}?text=${encodeURIComponent(
                  `Hi Host Editify, I'm ${submissionResult.data.name} from ${submissionResult.data.businessName}. I just submitted the form and would like to claim my free 40-second sample edit.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm shadow-xl hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                <span>Send Clip on WhatsApp</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
