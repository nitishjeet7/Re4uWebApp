"use client";

import { useState } from "react";

type TimelineValue = "" | "1-10" | "10-20" | "20-30" | "30-plus";

const REQUIREMENTS = [
  "Language Editing / Substantive Editing",
  "Research Design & Problem / GAP Framing",
  "Data Analysis & Statistics",
  "Academic Presentation",
  "Publication Support (Journal Selection, Submission, Response to Reviewers)",
  "Plagiarism / Similarity Reduction (within academic integrity)",
  "Manuscript Formatting & References",
  "Visuals & Graphical Abstract / Figures",
  "Thesis / Dissertation End-to-End Support",
  "Other (please specify in message)",
] as const;

export function UploadBriefModal({
  triggerClassName,
  triggerLabel = "Upload Your Brief",
  enquiryLabel,
  emailSubject,
}: {
  triggerClassName?: string;
  triggerLabel?: string;
  enquiryLabel?: string;
  emailSubject?: string;
}) {
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [timeline, setTimeline] = useState<TimelineValue>("");
  const [requirements, setRequirements] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const toggleRequirement = (value: string) => {
    setRequirements((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  return (
    <>
      <button type="button" className={triggerClassName} onClick={() => setOpen(true)}>
        {triggerLabel}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-3 sm:p-5"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div
            className="max-h-[96dvh] w-full max-w-[860px] overflow-auto rounded-2xl border border-[#A8C7E6]/60 bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,.20)] sm:max-h-[92vh] sm:rounded-3xl sm:p-6 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Upload your brief"
          >
            <div className="mb-4 sm:mb-6">
              <div className="mb-2 inline-flex flex-wrap items-center gap-2 rounded-full bg-[#A8C7E6]/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1F3A5F]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3F7F72]" />
                RESEARCHEDIT4U ENQUIRY
                {enquiryLabel ? (
                  <>
                    <span className="opacity-60" aria-hidden="true">
                      &ndash;
                    </span>
                    <span className="text-[#3F7F72]">{enquiryLabel}</span>
                  </>
                ) : null}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="m-0 text-xl font-semibold text-[#0f172a] sm:text-2xl">
                    Share your manuscript with our team
                  </h3>
                  <p className="mt-2 text-sm text-[#64748b]">
                    Tell us what you are working on. We will reply with a tailored plan, timeline,
                    and quote.
                  </p>
                </div>
                <button
                  type="button"
                  className="w-full rounded-xl border border-[#A8C7E6]/60 bg-white px-3 py-2 text-sm font-semibold text-[#1F3A5F] sm:w-auto"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>

            <form
              onSubmit={async (event) => {
                event.preventDefault();
                setStatus(null);

                const trimmedName = fullName.trim();
                const trimmedEmail = email.trim();
                if (!trimmedName) {
                  window.alert("Please enter your full name.");
                  return;
                }
                if (!trimmedEmail) {
                  window.alert("Please enter your email address.");
                  return;
                }
                if (!timeline) {
                  window.alert("Please select your timeline.");
                  return;
                }
                if (requirements.length === 0) {
                  window.alert("Please select at least one service requirement.");
                  return;
                }
                setSubmitting(true);
                try {
                  const payload = new FormData();
                  payload.append("enquiryType", "upload-brief");
                  payload.append("source", "research-planning-upload-brief");
                  payload.append("triggerLabel", triggerLabel);
                  payload.append("enquiryLabel", enquiryLabel ?? "");
                  payload.append("emailSubject", emailSubject ?? "");
                  payload.append("name", trimmedName);
                  payload.append("email", trimmedEmail);
                  payload.append("countryCode", countryCode);
                  payload.append("phone", phone.trim());
                  payload.append("timeline", timeline);
                  payload.append("message", message.trim());
                  requirements.forEach((item) => payload.append("requirements", item));
                  files.forEach((file) => payload.append("files", file));

                  const response = await fetch("/api/research-planning-enquiry", {
                    method: "POST",
                    body: payload,
                  });
                  const data = (await response.json().catch(() => null)) as { error?: string } | null;
                  if (!response.ok) {
                    throw new Error(data?.error || "Unable to submit enquiry.");
                  }

                  setStatus("Submitted successfully. Our team will contact you shortly.");
                  window.setTimeout(() => setOpen(false), 700);
                } catch (submitErr) {
                  const messageText =
                    submitErr instanceof Error && submitErr.message
                      ? submitErr.message
                      : "Unable to submit enquiry.";
                  setStatus(messageText);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#0f172a]">
                    Full Name *
                  </span>
                  <input
                    className="rounded-xl border border-[#e2e8f0] bg-[#f9fafb] px-3 py-2 text-sm"
                    placeholder="Dr. A. Sharma"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#0f172a]">
                    Email Address *
                  </span>
                  <input
                    className="rounded-xl border border-[#e2e8f0] bg-[#f9fafb] px-3 py-2 text-sm"
                    placeholder="name@university.edu"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>

                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#0f172a]">
                    Phone (with country code)
                  </span>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1.5fr]">
                    <select
                      className="rounded-xl border border-[#e2e8f0] bg-[#f9fafb] px-2 py-2 text-sm"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
                      <option value="+91">+91 (India)</option>
                      <option value="+1">+1 (USA/Canada)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+61">+61 (Australia)</option>
                      <option value="+971">+971 (UAE)</option>
                      <option value="other">Other</option>
                    </select>
                    <input
                      className="rounded-xl border border-[#e2e8f0] bg-[#f9fafb] px-3 py-2 text-sm"
                      placeholder="9876543210"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#0f172a]">
                    Timeline *
                  </span>
                  <select
                    className="rounded-xl border border-[#e2e8f0] bg-[#f9fafb] px-3 py-2 text-sm"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value as TimelineValue)}
                    required
                  >
                    <option value="">Select your timeline</option>
                    <option value="1-10">1-10 days (urgent)</option>
                    <option value="10-20">10-20 days (standard)</option>
                    <option value="20-30">20-30 days</option>
                    <option value="30-plus">30 days or more</option>
                  </select>
                </label>

                <fieldset className="col-span-1 rounded-xl border border-[#e2e8f0] bg-[#f9fafb] p-3 md:col-span-2">
                  <legend className="px-1 text-xs font-semibold uppercase tracking-[0.06em] text-[#475569]">
                    Service Requirements * (select one or more)
                  </legend>
                  <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {REQUIREMENTS.map((label) => (
                      <label key={label} className="flex items-start gap-2 text-sm text-[#0f172a]">
                        <input
                          type="checkbox"
                          checked={requirements.includes(label)}
                          onChange={() => toggleRequirement(label)}
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="col-span-1 flex flex-col gap-1.5 md:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#0f172a]">
                    Upload File(s)
                  </span>
                  <input
                    multiple
                    accept=".pdf,.doc,.docx"
                    className="rounded-xl border border-[#e2e8f0] bg-[#f9fafb] px-3 py-2 text-sm"
                    type="file"
                    onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
                  />
                  <span className="text-xs text-[#94a3b8]">
                    Files are submitted directly with this enquiry.
                  </span>
                </label>

                <label className="col-span-1 flex flex-col gap-1.5 md:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.06em] text-[#0f172a]">
                    Additional Message
                  </span>
                  <textarea
                    rows={4}
                    className="rounded-xl border border-[#e2e8f0] bg-[#f9fafb] px-3 py-2 text-sm"
                    placeholder="Share your manuscript context and goals."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </label>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
                <span className="text-xs text-[#94a3b8]">
                  By submitting, you agree we may contact you regarding this project.
                </span>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-[#1F3A5F] px-5 py-2.5 text-sm font-semibold text-[#f9fafb] shadow-[0_10px_25px_rgba(15,23,42,.22)] hover:bg-[#3F7F72] sm:w-auto"
                >
                  {submitting ? "Submitting..." : "Submit enquiry"}
                </button>
              </div>
              {status ? (
                <div className="mt-3 text-sm text-[#1F3A5F]">{status}</div>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
