"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  BookOpen,
  Briefcase,
  Cpu,
  Download,
  FlaskConical,
  Globe2,
  HeartPulse,
  Leaf,
  Users,
  Wrench,
} from "lucide-react";

type SubjectScorecard = {
  key: string;
  title: string;
  tag: string;
  desc: string;
  stats: {
    edited: string;
    matches: string;
    accepts: string;
  };
  subfields: string[];
  icon: ReactNode;
};

const SUBJECTS: SubjectScorecard[] = [
  {
    key: "eng-tech",
    title: "Engineering & Technology",
    tag: "Applied and technical manuscripts",
    desc:
      "Clear technical writing, methods transparency, reproducibility, and journal-aligned formatting for applied research.",
    stats: { edited: "980+", matches: "260+", accepts: "48+" },
    subfields: [
      "Mechanical",
      "Civil",
      "Electrical",
      "Electronics",
      "Materials",
      "Energy",
      "Robotics",
      "Chemical Eng",
    ],
    icon: <Wrench className="h-4 w-4" aria-hidden />,
  },
  {
    key: "med-health",
    title: "Medical & Health Sciences",
    tag: "Clinical and health reporting",
    desc:
      "IMRaD structure, reporting guideline alignment (CONSORT/STROBE), ethical language precision, and reviewer-ready clinical clarity.",
    stats: { edited: "760+", matches: "210+", accepts: "44+" },
    subfields: [
      "Clinical Medicine",
      "Public Health",
      "Nursing",
      "Dentistry",
      "Allied Health",
      "Epidemiology",
    ],
    icon: <HeartPulse className="h-4 w-4" aria-hidden />,
  },
  {
    key: "life-bio",
    title: "Life Sciences & Biosciences",
    tag: "Experimental and lab studies",
    desc:
      "Experimental narration, results logic, figure-story alignment, and response-to-reviewer clarity across lab and bioscience studies.",
    stats: { edited: "620+", matches: "170+", accepts: "35+" },
    subfields: [
      "Molecular Biology",
      "Biotechnology",
      "Microbiology",
      "Genetics",
      "Neuroscience",
      "Agriculture",
    ],
    icon: <Leaf className="h-4 w-4" aria-hidden />,
  },
  {
    key: "cs-ai",
    title: "Computer Science, Data & AI",
    tag: "Models, experiments, evaluation",
    desc:
      "Algorithm description, reproducibility, evaluation metrics, and reviewer-friendly positioning for computational work.",
    stats: { edited: "410+", matches: "120+", accepts: "18+" },
    subfields: [
      "Machine Learning",
      "Data Science",
      "Software Eng",
      "Information Systems",
      "HCI",
      "Cybersecurity",
    ],
    icon: <Cpu className="h-4 w-4" aria-hidden />,
  },
  {
    key: "chem",
    title: "Chemistry & Chemical Sciences",
    tag: "Synthesis, analysis, spectroscopy",
    desc:
      "Precision in methods and characterisation, strong results discussion, and formatting aligned with chemistry journal norms.",
    stats: { edited: "330+", matches: "95+", accepts: "16+" },
    subfields: [
      "Analytical",
      "Organic",
      "Inorganic",
      "Physical",
      "Polymer",
      "Materials Chemistry",
      "Spectroscopy",
    ],
    icon: <FlaskConical className="h-4 w-4" aria-hidden />,
  },
  {
    key: "env-earth",
    title: "Environmental & Earth Sciences",
    tag: "Field, lab, and modelling studies",
    desc:
      "Clear methods and site descriptions, robust reporting of uncertainty, and clean structure for interdisciplinary environmental work.",
    stats: { edited: "290+", matches: "85+", accepts: "14+" },
    subfields: [
      "Environmental Science",
      "Earth Systems",
      "Hydrology",
      "Climate",
      "Geochemistry",
      "GIS/Remote Sensing",
    ],
    icon: <Globe2 className="h-4 w-4" aria-hidden />,
  },
  {
    key: "biz-econ",
    title: "Business, Management & Economics",
    tag: "Theory, models, reporting",
    desc:
      "Sharper theoretical framing, stronger results reporting, and journal fit for business and economics manuscripts.",
    stats: { edited: "210+", matches: "70+", accepts: "10+" },
    subfields: [
      "Management",
      "Finance",
      "Marketing",
      "Strategy",
      "Operations",
      "Econometrics",
      "Policy",
    ],
    icon: <Briefcase className="h-4 w-4" aria-hidden />,
  },
  {
    key: "soc-edu",
    title: "Social Sciences & Education",
    tag: "Methods clarity and argument flow",
    desc:
      "Methods clarity, argument structure, and improved coherence for qualitative and mixed-methods social science research.",
    stats: { edited: "190+", matches: "60+", accepts: "9+" },
    subfields: [
      "Education",
      "Psychology",
      "Sociology",
      "Public Policy",
      "Communication",
      "Methods/Statistics",
    ],
    icon: <Users className="h-4 w-4" aria-hidden />,
  },
  {
    key: "arts-hum",
    title: "Arts & Humanities",
    tag: "Qualitative writing and critical framing",
    desc:
      "Clean argumentation, critical framing, and language refinement aligned with humanities expectations and reviewer preferences.",
    stats: { edited: "120+", matches: "40+", accepts: "6+" },
    subfields: [
      "Linguistics",
      "Literature",
      "Philosophy",
      "History",
      "Cultural Studies",
      "Ethics",
    ],
    icon: <BookOpen className="h-4 w-4" aria-hidden />,
  },
];

export function SubjectExplorerSection() {
  const [activeKey, setActiveKey] = useState(SUBJECTS[0]?.key ?? "");
  const activeSubject = useMemo(
    () => SUBJECTS.find((item) => item.key === activeKey) ?? SUBJECTS[0],
    [activeKey],
  );

  function downloadSample(subject: SubjectScorecard) {
    const safeTitle = subject.title.replace(/[^a-z0-9]+/gi, "_");
    const content = `RE4U - Sample Preview (Anonymised)
Subject: ${subject.title}
Scope tag: ${subject.tag}

Typical improvements:
- Language refinement for clarity and concision
- Methods transparency and logical flow
- Journal-aligned structure and formatting checks
- Figure/table callout consistency and referencing hygiene

Scorecard snapshot:
- Edited: ${subject.stats.edited}
- Journal matches: ${subject.stats.matches}
- Acceptances supported: ${subject.stats.accepts}

Subfields:
${subject.subfields.map((item) => `- ${item}`).join("\n")}

Note: This is a front-end demo sample file. Replace with your real PDF sample link for production.`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `RE4U_${safeTitle}_Sample.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  return (
    <section
      id="sec-subjects"
      className="section-pad"
      style={{
        background:
          "radial-gradient(900px 420px at 18% 10%, rgba(168,199,230,.26), transparent 60%), radial-gradient(820px 420px at 85% 25%, rgba(63,127,114,.14), transparent 65%), linear-gradient(180deg, rgba(255,255,255,.98), rgba(233,227,213,.5))",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#3F7F72]">
          Subjects We Handle
        </p>
        <h2 className="m-0 text-3xl font-bold tracking-[-0.02em] text-[#1F3A5F] md:text-[34px]">
          Subject Scorecards
        </h2>
        <p className="mt-2.5 max-w-[90ch] text-[15px] leading-relaxed text-[#2A2E35]/80">
          Select a discipline cluster to see subject-specific outcomes, typical improvements, and a downloadable sample preview.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "Trusted by 4,051+ researchers",
            "200+ accepted papers supported",
            "95% satisfaction",
          ].map((item, index) => (
            <div
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-[#A8C7E6]/60 bg-white/90 px-3 py-2 text-xs font-semibold text-[#2A2E35]/85 shadow-[0_10px_24px_rgba(10,20,30,.10)] backdrop-blur"
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  index === 1 ? "bg-[#3F7F72]" : "bg-[#1F3A5F]"
                } shadow-[0_0_0_3px_rgba(63,127,114,.15)]`}
                aria-hidden
              />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <section
          className="mt-5 rounded-2xl border border-[#A8C7E6]/60 p-4 shadow-xl backdrop-blur-[10px] md:p-5"
          style={{
            background:
              "radial-gradient(900px 420px at 20% 10%, rgba(168,199,230,.24), transparent 55%), radial-gradient(780px 420px at 80% 30%, rgba(63,127,114,.14), transparent 60%), linear-gradient(180deg, rgba(255,255,255,.92), rgba(255,255,255,.78))",
          }}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#2A2E35]/75">
              Select a subject
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SUBJECTS.map((subject) => {
              const isActive = subject.key === activeSubject.key;
              return (
                <button
                  key={subject.key}
                  type="button"
                  onClick={() => setActiveKey(subject.key)}
                  aria-pressed={isActive}
                  className={`flex w-full items-start justify-between gap-3 rounded-xl border p-3 text-left shadow-md transition ${
                    isActive
                      ? "border-[#3F7F72]/45 bg-[#3F7F72]/10 shadow-md"
                      : "border-[#A8C7E6]/60 bg-white/90 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-[10px] border border-[#A8C7E6]/60 bg-[#A8C7E6]/20 text-[#3F7F72]">
                      {subject.icon}
                    </span>
                    <span className="text-sm font-extrabold leading-tight text-[#1F3A5F]">
                      {subject.title}
                    </span>
                  </div>
                  <span className="max-w-[160px] text-right text-[11.5px] font-semibold text-[#2A2E35]/75">
                    {subject.tag}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-2xl border border-[#A8C7E6]/60 bg-white/92 p-4 shadow-[0_12px_26px_rgba(10,20,30,.08)]">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/20 text-[#3F7F72]">
                  {activeSubject.icon}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#A8C7E6]/60 bg-[#A8C7E6]/20 px-3 py-1 text-xs font-extrabold text-[#3F7F72]">
                      {activeSubject.title}
                    </span>
                    <span className="text-xs font-semibold text-[#2A2E35]/70">
                      {activeSubject.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#2A2E35]/80">
                    {activeSubject.desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-[#A8C7E6]/60 bg-white/90 p-3">
                <small className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#2A2E35]/70">
                  Edited
                </small>
                <strong className="block text-xl font-semibold text-[#1F3A5F]">
                  {activeSubject.stats.edited}
                </strong>
                <span className="text-xs font-semibold text-[#2A2E35]/75">
                  Manuscripts refined
                </span>
              </div>
              <div className="rounded-xl border border-[#A8C7E6]/60 bg-white/90 p-3">
                <small className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#2A2E35]/70">
                  Journal matches
                </small>
                <strong className="block text-xl font-semibold text-[#1F3A5F]">
                  {activeSubject.stats.matches}
                </strong>
                <span className="text-xs font-semibold text-[#2A2E35]/75">
                  Shortlists delivered
                </span>
              </div>
              <div className="rounded-xl border border-[#A8C7E6]/60 bg-white/90 p-3">
                <small className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#2A2E35]/70">
                  Acceptances supported
                </small>
                <strong className="block text-xl font-semibold text-[#1F3A5F]">
                  {activeSubject.stats.accepts}
                </strong>
                <span className="text-xs font-semibold text-[#2A2E35]/75">
                  Submission outcomes
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[#A8C7E6]/60 bg-white/90 p-3">
              <small className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#2A2E35]/70">
                Subfields
              </small>
              <div className="mt-2 flex flex-wrap gap-2">
                {activeSubject.subfields.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#A8C7E6]/60 bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#2A2E35]/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-xs text-[#2A2E35]/65">
                Download an anonymised sample preview for this subject (demo).
              </p>
              <button
                type="button"
                onClick={() => downloadSample(activeSubject)}
                className="inline-flex items-center gap-2 rounded-full bg-[#1F3A5F] px-4 py-2.5 text-sm font-extrabold text-white shadow-md"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download sample
              </button>
            </div>
          </div>

          <p className="mt-4 text-xs text-[#2A2E35]/65">
            <strong className="text-[#2A2E35]/80">Note:</strong> Subject clusters follow
            Scopus-style discipline groupings. The download button provides an anonymised preview
            file (front-end demo).
          </p>
        </section>
      </div>
    </section>
  );
}
