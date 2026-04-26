"use client";

import { useRef } from "react";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FilePenLine,
  FileSearch,
  FileText,
  MessageSquareReply,
  PenSquare,
} from "lucide-react";

import { WHATSAPP_URL } from "@/lib/contact";

const POPULAR_SERVICES = [
  {
    id: "research-planning",
    title: "Research Planning",
    subtitle: "Start right, move faster",
    bullets: [
      "Validate topic and objectives",
      "Outline methodology clearly",
      "Provide supervisor-ready brief",
    ],
    price: "Rs 2,999",
    icon: PenSquare,
  },
  {
    id: "data-services",
    title: "Data Services",
    subtitle: "Stats & ML that hold up",
    bullets: [
      "Analyze in SPSS / R / Python",
      "Clean data with visuals",
      "Explain results clearly",
    ],
    price: "Rs 4,999",
    icon: BarChart3,
  },
  {
    id: "editorial-support",
    title: "Editorial Support",
    subtitle: "Polished, compliant, clear",
    bullets: [
      "Edit language and structure",
      "Format to journal style",
      "Suggest reviewer-style fixes",
    ],
    price: "Rs 4,999",
    icon: FilePenLine,
  },
  {
    id: "publication-support",
    title: "Publication Support",
    subtitle: "Submit with confidence",
    bullets: [
      "Target suitable journals",
      "Check ethics and policies",
      "Prepare letters and responses",
    ],
    price: "Rs 8,999",
    icon: FileSearch,
  },
  {
    id: "academic-presentations",
    title: "Academic Presentations",
    subtitle: "Impactful visuals that land",
    bullets: [
      "Design slides and posters",
      "Build charts and infographics",
      "Provide speaker notes",
    ],
    price: "Rs 3,999",
    icon: FileText,
  },
  {
    id: "consultation-support",
    title: "Consultation Support",
    subtitle: "Expert guidance at every step",
    bullets: [
      "One-on-one project discussions",
      "Clarify methodology doubts",
      "Personalized research advice",
    ],
    price: "Rs 2,499",
    icon: MessageSquareReply,
  },
];

const SAMPLE_PDF_BY_SERVICE_ID: Record<string, string> = {
  "research-planning": "/sample-doc/RESEARCH PLANNING SAMPLE_RE4U SOLUTIONS.pdf",
  "data-services": "/sample-doc/DATA ANALYSIS SAMPLE_RE4U SOLUTIONS.pdf",
  "editorial-support": "/sample-doc/EDITING SUPPORT SAMPLE_RE4U SOLUTIONS.pdf",
  "publication-support": "/sample-doc/PUBLICATION SUPPORT SAMPLE_RE4U SOLUTIONS.pdf",
  "academic-presentations": "/sample-doc/RE4U_Academic_Presentations_Sample_Deck.pptx",
  "consultation-support": "/sample-doc/CONSULTATION SUPPORT SAMPLE_RE4U SOLUTIONS.pdf",
};

function downloadSamplePdf(serviceId: string) {
  const filePath =
    SAMPLE_PDF_BY_SERVICE_ID[serviceId] ??
    "/sample-doc/CONSULTATION SUPPORT SAMPLE_RE4U SOLUTIONS.pdf";

  const anchor = document.createElement("a");
  anchor.href = encodeURI(filePath);
  anchor.download = filePath.split("/").pop() ?? "sample.pdf";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

function getExploreWhatsAppHref(serviceTitle: string) {
  const message = [
    "Hi RE4U,",
    `I want to know more about: ${serviceTitle}.`,
    "Please share pricing, timeline, and next steps.",
  ].join("\n");

  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export function PopularServicesSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  function scrollByCards(direction: -1 | 1) {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({ left: direction * 340, behavior: "smooth" });
  }

  return (
    <section id="sec-popular-services" className="section-pad">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2A2E35]/70">
            Our Popular Services
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-[-0.02em] text-[#1F3A5F] md:text-[34px]">
            Everything you need from planning to publication.
          </h2>
          <p className="mt-2 text-sm text-[#2A2E35]/80 md:text-base">
            Fast, ethical, and compliant support tailored to your submission stage.
          </p>
        </div>

        <div className="relative mt-6">
          <div
            ref={scrollRef}
            className="flex items-stretch gap-4 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory scroll-px-6 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:pb-0 xl:grid-cols-3"
            aria-label="Popular services carousel"
          >
            {POPULAR_SERVICES.map((service) => {
              const Icon = service.icon;
              const exploreHref = getExploreWhatsAppHref(service.title);
              return (
                <article
                  key={service.id}
                  className="relative flex min-h-[320px] min-w-[280px] snap-start flex-col rounded-2xl border border-[#A8C7E6]/60 bg-white/90 p-5 shadow-md transition duration-300 hover:shadow-xl md:min-h-0 md:min-w-0"
                >
                  <span className="absolute left-4 top-4 rounded-full bg-[#3F7F72] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                    Popular
                  </span>
                  <div className="flex items-start justify-between gap-3">
                    <div className="mt-6 min-w-0">
                      <h3 className="text-lg font-bold text-[#1F3A5F]">{service.title}</h3>
                      <p className="mt-1 text-sm text-[#2A2E35]/75">{service.subtitle}</p>
                    </div>
                    <span className="mt-5 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/20 text-[#1F3A5F]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                  </div>

                  <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[#2A2E35]/85">
                    {service.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <p className="mt-4 text-lg font-bold text-[#1F3A5F] md:text-xl">
                    Starts at {service.price}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-4 text-sm">
                    <button
                      type="button"
                      onClick={() => downloadSamplePdf(service.id)}
                      className="rounded-2xl border border-[#A8C7E6]/60 bg-white px-3 py-2 text-xs font-semibold text-[#1F3A5F] transition hover:bg-[#E9E3D5]"
                    >
                      Download Sample
                    </button>
                    <a
                      href={exploreHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#1F3A5F] hover:text-[#3F7F72]"
                    >
                      Explore -&gt;
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-center md:hidden">
            <div className="inline-flex items-center gap-1 rounded-full border border-[#A8C7E6]/60 bg-white/95 p-1 shadow-md backdrop-blur">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                aria-label="Scroll left"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-[#1F3A5F] transition hover:border-[#A8C7E6]/60 hover:bg-[#E9E3D5] active:scale-[0.98]"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <span className="h-6 w-px bg-[#A8C7E6]/60" aria-hidden />
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                aria-label="Scroll right"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-[#1F3A5F] transition hover:border-[#A8C7E6]/60 hover:bg-[#E9E3D5] active:scale-[0.98]"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
