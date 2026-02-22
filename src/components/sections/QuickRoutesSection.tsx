"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart3, FilePenLine, FileSearch } from "lucide-react";

const ROUTES = [
  {
    id: "editing",
    title: "I need editing and language polish.",
    summary:
      "English editing, formatting, and final checks so reviewers focus on your science.",
    detail:
      "Comprehensive English editing, formatting to journal style, and final checks so reviewers focus on your science - not your sentences.",
    cta: "Go to Editorial Support",
    href: "/services/editing-support",
    meta: "Fastest route",
    icon: FilePenLine,
  },
  {
    id: "data",
    title: "I need help with data and statistics.",
    summary:
      "Data cleaning, analysis, and reporting across SPSS, R, Python and more.",
    detail:
      "End-to-end data cleaning, analysis, and visualization support across SPSS, R, Python and more - with clear reporting for reviewers.",
    cta: "Go to Data Services",
    href: "/services/data-services",
    meta: "Analysis route",
    icon: BarChart3,
  },
  {
    id: "publication",
    title: "I need publication support and journal selection.",
    summary:
      "Match with suitable Scopus/SCI journals and prepare a complete submission pack.",
    detail:
      "Match with suitable Scopus/SCI journals, avoid predatory outlets, and manage submission packaging without losing months.",
    cta: "Go to Publication Support and JSR",
    href: "/services/service-overview",
    meta: "Strategy route",
    icon: FileSearch,
  },
];

export function QuickRoutesSection() {
  const [activeId, setActiveId] = useState<string | null>(ROUTES[0]?.id ?? null);

  function toggleRoute(id: string) {
    setActiveId((current) => (current === id ? null : id));
  }

  return (
    <section
      id="sec-router"
      className="section-pad"
      style={{
        background:
          "radial-gradient(1200px 600px at 20% -10%, rgba(168,199,230,.26), transparent 60%), radial-gradient(1200px 700px at 90% 0%, rgba(63,127,114,.14), transparent 55%), linear-gradient(180deg, rgba(255,255,255,.98), rgba(233,227,213,.44))",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <section
          className="relative overflow-hidden rounded-2xl border border-[#A8C7E6]/60 bg-white/80 p-6 shadow-md"
          aria-label="Quick routes"
        >
          <div className="pointer-events-none absolute inset-[-2px] opacity-90">
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(700px 240px at 15% 10%, rgba(168,199,230,.22), transparent 55%), radial-gradient(700px 240px at 90% 20%, rgba(63,127,114,.14), transparent 60%)",
              }}
            />
          </div>

          <div className="relative grid gap-4 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[#2A2E35]/70">
                WHAT DO YOU NEED HELP WITH?
              </p>
              <h2 className="mt-2 text-[26px] font-bold leading-[1.12] text-[#1F3A5F] md:text-[32px]">
                Choose your path in one click.
              </h2>
            </div>
            <div className="text-sm text-[#2A2E35]/80" />
          </div>

          <div className="relative mt-4 grid gap-3 lg:grid-cols-3">
            {ROUTES.map((route) => {
              const Icon = route.icon;
              const isOpen = activeId === route.id;
              return (
                <article
                  key={route.id}
                  className={`flex min-h-[168px] flex-col overflow-hidden rounded-2xl border bg-white/90 shadow-md transition duration-300 ${
                    isOpen
                      ? "border-[#3F7F72]/45"
                      : "border-[#A8C7E6]/60"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleRoute(route.id)}
                    className="flex w-full items-start gap-3 px-4 pb-3 pt-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`route-detail-${route.id}`}
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/20">
                      <Icon className="h-5 w-5 text-[#1F3A5F]" aria-hidden />
                    </span>
                    <span className="flex-1">
                      <p className="m-0 text-[16px] font-bold text-[#2A2E35]">
                        {route.title}
                      </p>
                      <p className="mt-2 text-sm text-[#2A2E35]/75 max-[860px]:hidden">
                        {route.summary}
                      </p>
                    </span>
                    <span
                      className={`mt-1 text-[#1F3A5F] transition ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    >
                      <ChevronDownIcon />
                    </span>
                  </button>

                  <div
                    id={`route-detail-${route.id}`}
                    className={`px-4 pb-3 text-sm text-[#2A2E35]/80 ${
                      isOpen ? "block" : "hidden"
                    } max-[860px]:block`}
                  >
                    {route.detail}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-[#A8C7E6]/55 bg-[#A8C7E6]/10 px-4 py-3">
                    <Link
                      href={route.href}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#1F3A5F] hover:text-[#3F7F72]"
                    >
                      {route.cta}
                      <ArrowRightIcon />
                    </Link>
                    <span className="text-xs text-[#2A2E35]/65 max-[860px]:hidden">
                      {route.meta}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <path d="M5 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
