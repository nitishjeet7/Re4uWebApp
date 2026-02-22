"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Shield,
  Ban,
  Lock,
  Receipt,
  Layers,
  Clock,
  BookOpen,
  Cpu,
  DollarSign,
} from "lucide-react";

const faqs = [
  {
    category: "ethics",
    question: "Do you guarantee publication in a specific journal?",
    answer:
      "No ethical editing or publication partner can guarantee acceptance. What we do provide is rigorous editorial work, transparent journal-matching, and clear readiness feedback for your target list.",
    icon: Shield,
  },
  {
    category: "process",
    question: "How long does the process usually take?",
    answer:
      "Typical editing timelines range from 24-72 hours depending on word count and complexity. We confirm the scope and timeline in the quote before starting, so you know exactly what happens next.",
    icon: Clock,
  },
  {
    category: "journal",
    question: "Can you help with journal selection and submission?",
    answer:
      "Yes. We can shortlist realistic journals based on scope fit, indexing, and timelines, and support submission packaging (cover letter, formatting checks, and submission-ready files).",
    icon: BookOpen,
  },
  {
    category: "ai",
    question: "What if my similarity score or AI flags are high?",
    answer:
      "We focus on reducing avoidable similarity risks and improving clarity while preserving your scientific meaning. We also flag sections that commonly trigger editor concern (methods clarity, citation patterns, paraphrase quality).",
    icon: Cpu,
  },
  {
    category: "pricing",
    question: "How do you price the work?",
    answer:
      "Pricing typically depends on word count, complexity, turnaround time, and service scope (editing, journal matching, data support). We confirm a transparent breakdown before work begins.",
    icon: DollarSign,
  },
  {
    category: "confidentiality",
    question: "Do you keep manuscripts confidential?",
    answer:
      "Yes. We operate with confidentiality-first handling. If required, we can support NDAs and institution-friendly documentation for your review process.",
    icon: Lock,
  },
];

const categories = [
  { id: "all", label: "All", icon: Layers },
  { id: "ethics", label: "Ethics", icon: Shield },
  { id: "process", label: "Process & timelines", icon: Clock },
  { id: "journal", label: "Journal selection", icon: BookOpen },
  { id: "ai", label: "AI & similarity", icon: Cpu },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "confidentiality", label: "Confidentiality", icon: Lock },
];

export function FaqSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs =
    activeFilter === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === activeFilter);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="section-pad"
      style={{
        background:
          "radial-gradient(1100px 520px at 20% -10%, rgba(168,199,230,.26), transparent 60%), radial-gradient(900px 520px at 90% -10%, rgba(63,127,114,.14), transparent 55%), linear-gradient(180deg, rgba(255,255,255,.98), rgba(233,227,213,.45))",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <div className="mb-2.5 text-xs uppercase tracking-[0.22em] text-[#2A2E35]/70">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="m-0 mb-2.5 text-3xl font-bold leading-[1.1] tracking-[-0.02em] md:text-[34px]">
            Common questions before you book with us.
          </h2>
          <p className="mt-2.5 max-w-[80ch] text-[15px] leading-relaxed text-[#2A2E35]/80">Clear answers on ethics, process, AI/similarity, and journal selection - so you can decide with confidence.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit lg:sticky lg:top-6">
            <div className="rounded-[18px] border border-[#A8C7E6]/60 bg-white p-5 shadow-[0_10px_22px_rgba(11,27,51,.08)]">
              <p className="mb-2 text-sm font-semibold text-[#2A2E35]">
                Still unsure?
              </p>
              <p className="mb-4 text-sm text-[#2A2E35]/80">
                Use the quick routes below. No confusing hand-offs - clear next
                steps.
              </p>
              <div className="flex flex-col gap-2.5">
                <Button
                  asChild
                  className="rounded-full bg-[#1F3A5F] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg"
                >
                  <Link href="/contact">Book 1:1 Expert Call</Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-[#A8C7E6]/60 bg-white px-4 py-2.5 text-sm font-semibold text-[#1F3A5F] hover:bg-[#E9E3D5]"
                  asChild
                >
                  <Link href="/services">See Editing Sample</Link>
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-1.5 rounded-full border border-[#A8C7E6]/60 bg-[#A8C7E6]/20 px-2.5 py-1.5 text-[#1F3A5F]">
                  <Shield className="h-3.5 w-3.5" />
                  <span>COPE-aligned</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-[#A8C7E6]/60 bg-[#A8C7E6]/20 px-2.5 py-1.5 text-[#1F3A5F]">
                  <Ban className="h-3.5 w-3.5" />
                  <span>No ghostwriting</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-[#A8C7E6]/60 bg-[#A8C7E6]/20 px-2.5 py-1.5 text-[#1F3A5F]">
                  <Lock className="h-3.5 w-3.5" />
                  <span>NDA-friendly</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-[#A8C7E6]/60 bg-[#A8C7E6]/20 px-2.5 py-1.5 text-[#1F3A5F]">
                  <Receipt className="h-3.5 w-3.5" />
                  <span>Transparent quotes</span>
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="rounded-t-[16px] border-b border-[#A8C7E6]/60 bg-gradient-to-b from-white/95 to-[#A8C7E6]/10 p-3">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setActiveFilter(cat.id);
                        setOpenIndex(0);
                      }}
                      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-2 text-xs font-bold transition-all ${
                        activeFilter === cat.id
                          ? "border-[#3F7F72]/45 bg-[#3F7F72]/10 text-[#1F3A5F]"
                          : "border-[#A8C7E6]/60 bg-white/88 text-[#2A2E35]/80 hover:-translate-y-0.5 hover:border-[#3F7F72]/45 hover:text-[#1F3A5F]"
                      }`}
                      aria-pressed={activeFilter === cat.id}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2.5 rounded-b-[16px] bg-white p-3">
              {filteredFaqs.map((faq, index) => {
                const Icon = faq.icon;
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-[16px] border transition-all ${
                      isOpen
                        ? "border-[#3F7F72]/45 shadow-md"
                        : "border-[#A8C7E6]/60 bg-white/92 hover:-translate-y-0.5 hover:shadow-xl"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleQuestion(index)}
                      className="flex w-full cursor-pointer items-start justify-between gap-3 border-0 bg-transparent p-3.5 text-left text-[15px] font-extrabold"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-[10px] border border-[#A8C7E6]/60 bg-[#A8C7E6]/20">
                          <Icon className="h-4 w-4 text-[#1F3A5F]" />
                        </div>
                        <div>
                          <span>{faq.question}</span>
                          <div className="mt-1.5 flex flex-wrap gap-2 text-xs font-bold text-[#2A2E35]/80">
                            <span className="rounded-full border border-[#A8C7E6]/60 bg-[#A8C7E6]/20 px-2 py-1">
                              {categories.find((c) => c.id === faq.category)
                                ?.label}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border border-[#A8C7E6]/60 bg-white/90 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          fill="none"
                          height="18"
                          viewBox="0 0 24 24"
                          width="18"
                          className="text-[#1F3A5F]"
                        >
                          <path
                            d="M7 10l5 5 5-5"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </button>
                    {isOpen && (
                      <div className="pl-[52px] px-3.5 pb-3.5 text-sm leading-relaxed text-[#2A2E35]/80">
                        {faq.answer}
                        <div className="mt-2">
                          <Link
                            href={`#learn-${faq.category}`}
                            className="font-extrabold text-[#1F3A5F] hover:text-[#3F7F72] hover:underline"
                          >
                            Learn more -&gt;
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
