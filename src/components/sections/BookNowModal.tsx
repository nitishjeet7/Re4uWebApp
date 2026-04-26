"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { API_BASE } from "@/lib/api";

const COUNTRY_CODES = [
  { value: "+91", label: "+91 (India)" },
  { value: "+1", label: "+1 (USA/Canada)" },
  { value: "+44", label: "+44 (UK)" },
  { value: "+61", label: "+61 (Australia)" },
  { value: "+971", label: "+971 (UAE)" },
  { value: "other", label: "Other" },
];

const TIMELINES = [
  { value: "1-10", label: "1-10 days (urgent)" },
  { value: "10-20", label: "10-20 days (standard)" },
  { value: "20-30", label: "20-30 days" },
  { value: "30-plus", label: "30 days or more" },
];

const SERVICE_REQUIREMENTS = [
  { value: "language_editing", label: "Language Editing / Substantive Editing" },
  { value: "research_design", label: "Research Design & Problem / GAP Framing" },
  { value: "data_analysis", label: "Data Analysis & Statistics" },
  { value: "academic_presentation", label: "Academic Presentation" },
  {
    value: "publication_support",
    label: "Publication Support (Journal Selection, Submission, Response to Reviewers)",
  },
  {
    value: "plagiarism_reduction",
    label: "Plagiarism / Similarity Reduction (within academic integrity)",
  },
  { value: "formatting_references", label: "Manuscript Formatting & References" },
  { value: "visuals_graphical_abstract", label: "Visuals & Graphical Abstract / Figures" },
  { value: "thesis_support", label: "Thesis / Dissertation End-to-End Support" },
  { value: "other", label: "Other (please specify in message)" },
];

const MAX_UPLOAD_BYTES = 20 * 1024 * 1024; // 20MB
const MAX_TOTAL_UPLOAD_BYTES = 18 * 1024 * 1024; // 18MB total for email-safe delivery

type BookNowModalProps = {
  triggerLabel?: string;
  triggerClassName?: string;
  source?: string;
  onBeforeOpen?: () => void;
};

export function BookNowModal({
  triggerLabel = "Book Now",
  triggerClassName,
  source = "book-now-modal",
  onBeforeOpen,
}: BookNowModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [status, setStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    timeline: "",
    message: "",
  });
  const [files, setFiles] = useState<FileList | null>(null);

  const endpoint = useMemo(
    () =>
      API_BASE.trim()
        ? `${API_BASE.replace(/\/$/, "")}/contact`
        : "/api/book-now",
    [],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  function toggleService(value: string) {
    setServices((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  }

  function resetModalState() {
    setStatus(null);
    setErrors([]);
    setSubmitProgress(0);
  }

  function openModal() {
    onBeforeOpen?.();
    resetModalState();
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: string[] = [];
    const name = form.fullName.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    if (name.length < 2) nextErrors.push("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.push("Please enter a valid email.");
    if (!form.timeline) nextErrors.push("Please select your timeline.");
    if (services.length === 0) nextErrors.push("Please select at least one service requirement.");
    if (phone && !/^[0-9]{7,15}$/.test(phone)) {
      nextErrors.push("Please enter a valid phone number (7-15 digits).");
    }
    if (files) {
      const selectedFiles = Array.from(files);
      const oversized = selectedFiles.filter((file) => file.size > MAX_UPLOAD_BYTES);
      if (oversized.length > 0) {
        const names = oversized.map((file) => file.name).join(", ");
        nextErrors.push(`Each file must be 20MB or less. Oversized: ${names}`);
      }
      const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
      if (totalSize > MAX_TOTAL_UPLOAD_BYTES) {
        nextErrors.push(
          "Total upload size is too large for email delivery. Keep combined file size under 18MB.",
        );
      }
    }
    if (nextErrors.length) {
      setErrors(nextErrors);
      setStatus(null);
      return;
    }

    setLoading(true);
    setErrors([]);
    setStatus(null);
    setSubmitProgress(12);

    const progressInterval = window.setInterval(() => {
      setSubmitProgress((current) => {
        if (current >= 92) return current;
        const step = current < 40 ? 8 : current < 70 ? 5 : 2;
        return Math.min(92, current + step);
      });
    }, 220);

    const serviceLabels = services
      .map((value) => SERVICE_REQUIREMENTS.find((item) => item.value === value)?.label ?? value)
      .join(", ");
    const uploadedNames = files ? Array.from(files).map((file) => file.name).join(", ") : "None";

    const message = [
      "Book Now enquiry",
      `Source: ${source}`,
      `Timeline: ${form.timeline}`,
      `Service requirements: ${serviceLabels}`,
      `Phone: ${form.countryCode} ${phone || "Not provided"}`,
      `Uploaded files: ${uploadedNames}`,
      form.message.trim() ? `Additional message: ${form.message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const payload = new FormData();
      payload.append("name", name);
      payload.append("email", email);
      payload.append("message", message);
      if (files) {
        for (const file of Array.from(files)) {
          payload.append("files", file);
        }
      }

      const isLocalBookNowApi = endpoint === "/api/book-now";
      const response = await fetch(endpoint, {
        method: "POST",
        ...(isLocalBookNowApi
          ? { body: payload }
          : {
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                email,
                message,
              }),
            }),
      });

      if (!response.ok) {
        let detail = "Submit failed";
        try {
          const payload = (await response.json()) as { error?: string };
          if (payload?.error) detail = payload.error;
        } catch {
          // ignore parsing errors and use generic message
        }
        throw new Error(detail);
      }

      setStatus("Thanks. Your enquiry was submitted successfully.");
      setSubmitProgress(100);
      setForm({
        fullName: "",
        email: "",
        countryCode: "+91",
        phone: "",
        timeline: "",
        message: "",
      });
      setServices([]);
      setFiles(null);
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : "Request failed. Please try again.";
      setStatus(message);
      setSubmitProgress(100);
    } finally {
      window.clearInterval(progressInterval);
      setLoading(false);
      window.setTimeout(() => setSubmitProgress(0), 700);
    }
  }

  return (
    <>
      <button type="button" onClick={openModal} className={triggerClassName}>
        {triggerLabel}
      </button>

      {isOpen && mounted
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-end justify-center bg-[rgba(15,23,42,.56)] p-2 sm:items-center sm:p-4"
              onClick={(event) => {
                if (event.target === event.currentTarget) closeModal();
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Upload draft for quote"
            >
              <div className="max-h-[96dvh] w-full max-w-[860px] overflow-auto rounded-2xl border border-[#A8C7E6]/60 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,.20)] sm:max-h-[92vh] sm:rounded-3xl sm:p-6 md:p-8">
                <div className="mb-4 sm:mb-6">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#A8C7E6]/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1F3A5F]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3F7F72]" />
                    RESEARCHEDIT4U ENQUIRY
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="m-0 text-xl font-semibold text-[#0f172a] sm:text-2xl">Share your manuscript with our team</h3>
                      <p className="mt-2 text-sm text-[#64748b]">
                        Tell us what you are working on. We will reply with a tailored plan, timeline, and quote.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full rounded-xl border border-[#A8C7E6]/60 bg-white px-3 py-2 text-sm font-semibold text-[#1F3A5F] sm:w-auto"
                    >
                      Close
                    </button>
                  </div>
                </div>

            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#0f172a]">
                    Full Name *
                  </span>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                    className="rounded-xl border border-[#e2e8f0] bg-[#f9fafb] px-3 py-2 text-sm"
                    placeholder="Dr. A. Sharma"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#0f172a]">
                    Email Address *
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="rounded-xl border border-[#e2e8f0] bg-[#f9fafb] px-3 py-2 text-sm"
                    placeholder="name@university.edu"
                  />
                </label>

                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#0f172a]">
                    Phone (with country code)
                  </span>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1.5fr]">
                    <select
                      value={form.countryCode}
                      onChange={(event) =>
                        setForm((prev) => ({ ...prev, countryCode: event.target.value }))
                      }
                      className="rounded-xl border border-[#e2e8f0] bg-[#f9fafb] px-2 py-2 text-sm"
                    >
                      {COUNTRY_CODES.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                      className="rounded-xl border border-[#e2e8f0] bg-[#f9fafb] px-3 py-2 text-sm"
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#0f172a]">
                    Timeline *
                  </span>
                  <select
                    value={form.timeline}
                    onChange={(event) => setForm((prev) => ({ ...prev, timeline: event.target.value }))}
                    className="rounded-xl border border-[#e2e8f0] bg-[#f9fafb] px-3 py-2 text-sm"
                  >
                    <option value="">Select your timeline</option>
                    {TIMELINES.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>

                <fieldset className="col-span-1 rounded-xl border border-[#e2e8f0] bg-[#f9fafb] p-3 md:col-span-2">
                  <legend className="px-1 text-xs font-semibold uppercase tracking-[0.06em] text-[#475569]">
                    Service Requirements * (select one or more)
                  </legend>
                  <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {SERVICE_REQUIREMENTS.map((item) => (
                      <label key={item.value} className="flex items-start gap-2 text-sm text-[#0f172a]">
                        <input
                          type="checkbox"
                          checked={services.includes(item.value)}
                          onChange={() => toggleService(item.value)}
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="col-span-1 flex flex-col gap-1.5 md:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#0f172a]">
                    Upload File(s)
                  </span>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={(event) => setFiles(event.target.files)}
                    className="rounded-xl border border-[#e2e8f0] bg-[#f9fafb] px-3 py-2 text-sm"
                  />
                  <span className="text-xs text-[#94a3b8]">
                    Files are attached to the enquiry email (supported on local SMTP route).
                    Max file size: 20MB each.
                  </span>
                </label>

                <label className="col-span-1 flex flex-col gap-1.5 md:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#0f172a]">
                    Additional Message
                  </span>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                    className="rounded-xl border border-[#e2e8f0] bg-[#f9fafb] px-3 py-2 text-sm"
                    placeholder="Share your manuscript context and goals."
                  />
                </label>
              </div>

              {errors.length > 0 ? (
                <div className="mt-4 rounded-xl border border-[#fee2e2] bg-[#fef2f2] px-3 py-2 text-sm text-[#b91c1c]">
                  {errors.map((error) => (
                    <div key={error}>{error}</div>
                  ))}
                </div>
              ) : null}

              {status ? (
                <div className="mt-4 rounded-xl border border-[#cffafe] bg-[#ecfeff] px-3 py-2 text-sm text-[#0f172a]">
                  {status}
                </div>
              ) : null}

              {loading || submitProgress > 0 ? (
                <div className="mt-4" aria-live="polite">
                  <div className="mb-1 flex items-center justify-between text-xs font-semibold text-[#1F3A5F]">
                    <span>Submitting enquiry...</span>
                    <span>{submitProgress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#A8C7E6]/35">
                    <div
                      className="h-full rounded-full bg-[#1F3A5F] transition-all duration-300 ease-out"
                      style={{ width: `${submitProgress}%` }}
                    />
                  </div>
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
                <span className="text-xs text-[#94a3b8]">
                  By submitting, you agree we may contact you regarding this project.
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-[#1F3A5F] px-5 py-2.5 text-sm font-semibold text-[#f9fafb] shadow-[0_10px_25px_rgba(15,23,42,.22)] hover:bg-[#3F7F72] sm:w-auto"
                >
                  {loading ? "Submitting..." : "Submit enquiry"}
                </button>
              </div>
            </form>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
