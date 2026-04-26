"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Service } from "@/lib/types";
import { BookNowModal } from "@/components/sections/BookNowModal";

const QUICK_OFFERS = [
  {
    id: "ai-plagiarism-rewrite",
    tag: "Offer 01",
    mini: "Flat packages",
    title: "AI + plagiarism safe rewrite",
    lead: "Packages by word-count.",
    bullets: [
      "Refine flagged sections without changing meaning.",
      "Balance AI-assisted drafting with human editing.",
      "Similarity and AI-risk notes for each section.",
    ],
    primary: { label: "Get quote", href: "/contact?source=quick-offer-ai" },
    secondary: {
      label: "See sample",
      href: "/sample-doc/AI_PLAGIARISM REWRITE SAFE_RE4U SOLUTIONS.pdf",
    },
  },
  {
    id: "rejection-risk-check",
    tag: "Offer 02",
    mini: "Report in 3-5 days",
    title: "Rejection risk check",
    lead: "Editor-style pre-submission report.",
    bullets: [
      "Desk-rejection flags (scope, structure, ethics).",
      "Reviewer-style comments on clarity and methods.",
      "Action-ready improvement checklist.",
    ],
    primary: { label: "Book now", href: "/contact?source=quick-offer-risk", opensBookModal: true },
    secondary: {
      label: "See sample",
      href: "/sample-doc/REJECTION RISK CHECK_RE4U SOLUTIONS.pdf",
    },
  },
  {
    id: "journal-match-pro",
    tag: "Offer 03",
    mini: "3-5 target journals",
    title: "Journal Match Pro",
    lead: "Shortlisted safe target journals.",
    bullets: [
      "3-5 journals mapped to your paper.",
      "Indexing and scope verification to avoid predatory traps.",
      "Timelines and decision-speed insights.",
    ],
    primary: { label: "Get started", href: "/contact?source=quick-offer-journals" },
    secondary: {
      label: "View sample",
      href: "/sample-doc/JOURNAL MATCH PRO_RE4U SOLUTIONS.pdf",
    },
  },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ServicesPreview({ services: _services }: { services: Service[] }) {
  void _services;
  const [inlineEmail, setInlineEmail] = useState("");
  const [inlineStatus, setInlineStatus] = useState<string | null>(null);
  const [inlineLoading, setInlineLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", org: "" });
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isModalOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) return;
    const timer = window.setTimeout(() => nameRef.current?.focus(), 0);
    return () => window.clearTimeout(timer);
  }, [isModalOpen]);

  function openGuidePdf() {
    window.open(
      encodeURI("/sample-doc/SEVEN STEP REJECTION PROOF CHECKLIST_RE4U SOLUTIONS.pdf"),
      "_blank",
      "noopener,noreferrer",
    );
  }

  async function submitInlineGuide(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const safeEmail = inlineEmail.trim();
    if (!EMAIL_REGEX.test(safeEmail)) {
      setInlineStatus("Please enter a valid email address.");
      return;
    }

    setInlineLoading(true);
    setInlineStatus(null);
    try {
      const res = await fetch("/api/free-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: safeEmail,
          source: "homepage-free-guide",
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Request failed");
      }

      setInlineStatus(`Download started. We also sent your request from ${safeEmail}.`);
      setInlineEmail("");
      openGuidePdf();
    } catch (error) {
      const fallback = "Request failed. Please try again in a moment.";
      const message = error instanceof Error && error.message ? error.message : fallback;
      setInlineStatus(message);
    } finally {
      setInlineLoading(false);
    }
  }

  function closeModal() {
    setIsModalOpen(false);
    if (lastFocusRef.current) {
      lastFocusRef.current.focus();
    }
  }

  async function sendGuide() {
    const safeEmail = form.email.trim();
    if (!EMAIL_REGEX.test(safeEmail)) {
      setModalStatus("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setModalStatus(null);
    try {
      const message = [
        "Quick offers guide request",
        form.org.trim() ? `Org: ${form.org.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch("/api/free-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: safeEmail,
          source: "homepage-free-guide-modal",
          name: form.name.trim() || undefined,
          org: form.org.trim() || undefined,
          message: message || undefined,
        }),
      });
      if (!res.ok) throw new Error("Request failed");

      setModalStatus(`Success: request sent from ${safeEmail}.`);
      setForm({ name: "", email: "", org: "" });
      setInlineEmail("");
    } catch {
      setModalStatus("Request failed. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="sec-offers" className="py-8 md:py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-2xl border border-[#A8C7E6]/60 bg-white/90 shadow-md">
          <header className="px-6 pb-2 pt-0">
            <div>
              <p className="m-0 mt-4 text-xs uppercase tracking-[0.18em] text-[#2A2E35]/70">
                Quick offers that save time & rejections
              </p>
              <h2 className="m-0 mt-4 text-[30px] font-bold leading-[1.12] tracking-[-0.02em] text-[#1F3A5F] md:text-[36px]">
                Plug-and-play services for your next submission.
              </h2>
              <p className="m-0 mt-4 text-[16px] leading-relaxed text-[#2A2E35]/80">
                Choose a focused offer when you are close to submission or responding to queries so you do
                not lose more months in the rejection loop.
              </p>
            </div>
          </header>

          <div className="grid gap-4 px-6 pb-4 sm:grid-cols-2 xl:grid-cols-4">
            {QUICK_OFFERS.map((offer) => (
              <article
                key={offer.id}
                className="relative flex min-h-[320px] flex-col overflow-hidden rounded-2xl border border-[#A8C7E6]/60 bg-white p-4 shadow-md"
              >
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(600px_220px_at_15%_0%,rgba(168,199,230,.20),transparent_60%)] opacity-70" />
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-[12px] uppercase tracking-[0.16em] text-[#2A2E35]/70">
                    {offer.tag}
                  </span>
                  <span className="rounded-full border border-[#A8C7E6]/55 bg-[#A8C7E6]/20 px-2.5 py-1 text-[12px] text-[#1F3A5F]">
                    {offer.mini}
                  </span>
                </div>
                <h3 className="text-[18px] font-semibold text-[#2A2E35]">{offer.title}</h3>
                <p className="mt-2 text-[14px] font-semibold text-[#1F3A5F]/85">
                  {offer.lead}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-[14px] text-[#2A2E35]/80">
                  {offer.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-dashed border-[#A8C7E6]/55 pt-4 sm:flex-nowrap">
                  {offer.primary.opensBookModal ? (
                    <BookNowModal
                      source={`quick-offer-${offer.id}`}
                      triggerLabel={offer.primary.label}
                      triggerClassName="inline-flex items-center justify-center gap-2 rounded-full border border-[#A8C7E6]/60 bg-[#1F3A5F] px-3 py-2 text-[13px] font-bold text-white shadow-md sm:whitespace-nowrap"
                    />
                  ) : (
                    <Link
                      href={offer.primary.href}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#A8C7E6]/60 bg-[#1F3A5F] px-3 py-2 text-[13px] font-bold text-white shadow-md sm:whitespace-nowrap"
                    >
                      {offer.primary.label}
                    </Link>
                  )}
                  <Link
                    href={offer.secondary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-[#A8C7E6]/60 bg-white px-3 py-2 text-center text-[13px] font-bold text-[#1F3A5F] sm:whitespace-nowrap"
                  >
                    {offer.secondary.label}
                  </Link>
                </div>
              </article>
            ))}

            <article className="relative flex flex-col overflow-hidden rounded-2xl border border-[#3F7F72]/45 bg-white p-4 shadow-lg">
              <span className="absolute right-[-38px] top-[16px] rotate-45 rounded-full border border-[rgba(255,255,255,.35)] bg-[#3F7F72] px-10 py-1 text-[11px] font-black tracking-[0.18em] text-white shadow-md">
                NEW
              </span>
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="text-[12px] uppercase tracking-[0.16em] text-[#2A2E35]/70">
                  Free guide
                </span>
                <span className="rounded-full border border-[#A8C7E6]/55 bg-[#A8C7E6]/20 px-2.5 py-1 text-[12px] text-[#1F3A5F]">
                  Instant download
                </span>
              </div>
              <h3 className="text-[18px] font-semibold text-[#2A2E35]">
                Seven-step rejection-proof checklist
              </h3>
              <p className="mt-3 text-[15px] font-extrabold text-[#1F3A5F]">Rs 0 - email required</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-[14px] text-[#2A2E35]/80">
                <li>Seven common traps that lead to rejection.</li>
                <li>Editor-style checklist to use before submission.</li>
                <li>Written by PhD editors across disciplines.</li>
              </ul>

              <form className="mt-3" onSubmit={submitInlineGuide}>
                <input
                  value={inlineEmail}
                  onChange={(event) => setInlineEmail(event.target.value)}
                  type="email"
                  placeholder="Enter your email to download"
                  className="w-full rounded-full border border-[#A8C7E6]/60 bg-white/90 px-4 py-2 text-sm"
                  autoComplete="email"
                  required
                />
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-dashed border-[#A8C7E6]/55 pt-4 sm:flex-nowrap">
                <button
                  type="submit"
                  disabled={inlineLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#A8C7E6]/60 bg-[#1F3A5F] px-3 py-2 text-[13px] font-bold text-white shadow-md sm:whitespace-nowrap"
                >
                  {inlineLoading ? "Please wait..." : "Get the free guide"}
                </button>
                </div>
                {inlineStatus ? (
                  <p className="mt-2 text-xs text-[#2A2E35]/80">{inlineStatus}</p>
                ) : null}
              </form>
            </article>
          </div>
        </div>
      </div>

      {isModalOpen ? (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(42,46,53,.55)] p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-offer-modal-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-[#A8C7E6]/60 bg-white/95 shadow-xl">
            <div className="flex items-start justify-between gap-3 border-b border-[#A8C7E6]/50 bg-[#A8C7E6]/20 px-5 py-4">
              <div>
                <h3 id="quick-offer-modal-title" className="text-[18px] font-semibold text-[#2A2E35]">
                  Get the free rejection-proof checklist
                </h3>
                <p className="mt-1 text-xs text-[#2A2E35]/80">
                  Enter your details to receive the download link (connect to your email tool / CRM).
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="grid h-10 w-10 place-items-center rounded-xl border border-[#A8C7E6]/60 bg-white"
                aria-label="Close dialog"
              >
                x
              </button>
            </div>
            <div className="px-5 py-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  ref={nameRef}
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  className="rounded-xl border border-[#A8C7E6]/60 bg-white/95 px-3 py-2 text-sm"
                  type="text"
                  placeholder="Full name"
                  autoComplete="name"
                />
                <input
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  className="rounded-xl border border-[#A8C7E6]/60 bg-white/95 px-3 py-2 text-sm"
                  type="email"
                  placeholder="Email address"
                  autoComplete="email"
                />
              </div>
              <div className="mt-3">
                <input
                  value={form.org}
                  onChange={(event) => setForm((current) => ({ ...current, org: event.target.value }))}
                  className="w-full rounded-xl border border-[#A8C7E6]/60 bg-white/95 px-3 py-2 text-sm"
                  type="text"
                  placeholder="University / Hospital / Company (optional)"
                  autoComplete="organization"
                />
              </div>
              <p className="mt-3 text-xs text-[#2A2E35]/80">
                By requesting the guide, you agree to receive the download link and occasional
                research-support updates. You can unsubscribe anytime.
              </p>
              <div className="mt-4 flex flex-wrap justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full border border-[#A8C7E6]/60 bg-white px-4 py-2 text-sm font-bold text-[#1F3A5F]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={sendGuide}
                  disabled={loading}
                  className="rounded-full border border-[#A8C7E6]/60 bg-[#1F3A5F] px-4 py-2 text-sm font-bold text-white"
                >
                  {loading ? "Sending..." : "Email me the link"}
                </button>
              </div>
              {modalStatus ? (
                <div className="mt-3 rounded-xl border border-[#3F7F72]/45 bg-[#3F7F72]/10 px-3 py-2 text-sm text-[#2A2E35]">
                  {modalStatus}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
