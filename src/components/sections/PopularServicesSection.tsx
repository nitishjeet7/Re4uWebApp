"use client";

import Link from "next/link";
import {
  BarChart3,
  FilePenLine,
  FileSearch,
  FileText,
  MessageSquareReply,
  PenSquare,
} from "lucide-react";

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

function downloadSample(title: string) {
  const content = `RE4U - Popular Service Sample

Service: ${title}

Sample includes:
- Scope overview
- Delivery checklist
- Sample outputs (demo)

Note: This is a front-end demo file. Replace with a real PDF in production.`;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `RE4U_${title.replace(/[^a-z0-9]+/gi, "_")}_Sample.txt`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function PopularServicesSection() {
  return (
    <section
      id="sec-popular-services"
      className="section-pad"
      style={{
        background:
          "radial-gradient(900px 420px at 20% -10%, rgba(168,199,230,.26), transparent 60%), radial-gradient(900px 420px at 85% -10%, rgba(63,127,114,.14), transparent 65%), linear-gradient(180deg, rgba(255,255,255,.98), rgba(233,227,213,.48))",
      }}
    >
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

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {POPULAR_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.id}
                className="relative flex h-full flex-col rounded-2xl border border-[#A8C7E6]/60 bg-white/90 p-5 shadow-md transition duration-300 hover:shadow-xl"
              >
                <span className="absolute left-4 top-4 rounded-full bg-[#3F7F72] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
                  Popular
                </span>
                <div className="flex items-start justify-between gap-3">
                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-[#1F3A5F]">{service.title}</h3>
                    <p className="mt-1 text-sm text-[#2A2E35]/75">{service.subtitle}</p>
                  </div>
                  <span className="mt-5 grid h-11 w-11 place-items-center rounded-xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/20 text-[#1F3A5F]">
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
                    onClick={() => downloadSample(service.title)}
                    className="rounded-2xl border border-[#A8C7E6]/60 bg-white px-3 py-2 text-xs font-semibold text-[#1F3A5F] transition hover:bg-[#E9E3D5]"
                  >
                    Download Sample
                  </button>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-xs font-bold text-[#1F3A5F] hover:text-[#3F7F72]"
                  >
                    Explore -&gt;
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
