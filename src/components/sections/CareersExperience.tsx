"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Cog,
  Globe2,
  PenLine,
  Scale,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { API_BASE } from "@/lib/api";

const STREAMS = [
  "Editorial & Research Quality",
  "Integrity & Compliance",
  "Data & Statistics",
  "Revision Support",
  "Operations",
  "Business & Platform",
] as const;

const HIRING_FILTERS = ["All", "Immediate", "Talent Pool"] as const;

type CareerStream = (typeof STREAMS)[number];
type HiringFilter = (typeof HIRING_FILTERS)[number];
type HiringType = Exclude<HiringFilter, "All">;

type CareerRole = {
  id: string;
  title: string;
  stream: CareerStream;
  summary: string;
  hiringType: HiringType;
  tags: string[];
  responsibilities: string[];
  requirements: string[];
  bestFor: string;
};

type ValueCard = {
  title: string;
  text: string;
  icon: ReactNode;
};

const VALUE_CARDS: ValueCard[] = [
  {
    title: "Remote Talent Network",
    text: "Flexible project assignments for specialists with strong academic communication skills.",
    icon: <Globe2 className="h-5 w-5 text-[#1F3A5F]" aria-hidden />,
  },
  {
    title: "Ethics-First Work",
    text: "We support clarity and publication readiness while protecting research integrity.",
    icon: <ShieldCheck className="h-5 w-5 text-[#1F3A5F]" aria-hidden />,
  },
  {
    title: "Structured Delivery",
    text: "Clear briefs, realistic timelines, and consistent QA standards across assignments.",
    icon: <Cog className="h-5 w-5 text-[#1F3A5F]" aria-hidden />,
  },
  {
    title: "Long-Term Growth",
    text: "Top-performing associates can move into lead and reviewer roles over time.",
    icon: <Users className="h-5 w-5 text-[#1F3A5F]" aria-hidden />,
  },
];

const ROLES: CareerRole[] = [
  {
    id: "manuscript-editor-stem",
    title: "Manuscript Editor (STEM)",
    stream: "Editorial & Research Quality",
    summary: "Improve clarity, structure, and publication readiness while preserving author voice.",
    hiringType: "Immediate",
    tags: ["Remote", "Associate", "Project-based", "STEM"],
    responsibilities: [
      "Line editing for grammar, tone, and coherence.",
      "Flow checks across abstract, methods, results, and discussion.",
      "Journal-style alignment and revision notes.",
    ],
    requirements: [
      "Academic editing experience in STEM disciplines.",
      "Strong scientific English command.",
      "Comfort with tracked changes workflows.",
    ],
    bestFor: "Editors who combine language quality with publication-focused logic.",
  },
  {
    id: "journal-targeting-analyst",
    title: "Journal Targeting Analyst",
    stream: "Editorial & Research Quality",
    summary: "Create shortlist recommendations with fit, indexing, and risk rationale.",
    hiringType: "Talent Pool",
    tags: ["Remote", "Specialist", "Analysis", "Publishing"],
    responsibilities: [
      "Build shortlist options with fit vs. risk notes.",
      "Review scope, timelines, and indexing quality.",
      "Flag policy and predatory risk issues.",
    ],
    requirements: [
      "Strong journal ecosystem knowledge.",
      "Ability to produce concise recommendations.",
      "High detail orientation.",
    ],
    bestFor: "Candidates who can guide authors with evidence-based recommendations.",
  },
  {
    id: "integrity-screening-specialist",
    title: "Integrity Screening Specialist",
    stream: "Integrity & Compliance",
    summary: "Run similarity, citation, and source checks to reduce avoidable rejection risk.",
    hiringType: "Immediate",
    tags: ["Remote", "Compliance", "Quality", "Research ethics"],
    responsibilities: [
      "Perform structured similarity and source checks.",
      "Flag unsupported claims and citation gaps.",
      "Create risk notes with clear action steps.",
    ],
    requirements: [
      "Familiarity with publication ethics.",
      "Strong compliance reporting clarity.",
      "Comfort handling confidential drafts.",
    ],
    bestFor: "Profiles focused on defensible quality and ethical publishing.",
  },
  {
    id: "statistical-reviewer",
    title: "Statistical Reviewer",
    stream: "Data & Statistics",
    summary: "Validate analysis choices and reporting quality for interpretable, defensible results.",
    hiringType: "Immediate",
    tags: ["Remote", "Specialist", "R/SPSS", "Methods"],
    responsibilities: [
      "Review method-fit against research questions.",
      "Check model assumptions and inference logic.",
      "Improve result interpretation language.",
    ],
    requirements: [
      "Hands-on statistical analysis expertise.",
      "Ability to explain methods clearly.",
      "Experience reviewing result sections.",
    ],
    bestFor: "Analysts who care about rigor and communication clarity.",
  },
];
const MORE_ROLES: CareerRole[] = [
  {
    id: "response-to-reviewers-specialist",
    title: "Response-to-Reviewers Specialist",
    stream: "Revision Support",
    summary: "Draft clear point-by-point rebuttals mapped to manuscript edits.",
    hiringType: "Immediate",
    tags: ["Remote", "Associate", "Revision", "Peer review"],
    responsibilities: [
      "Draft respectful, evidence-led rebuttal responses.",
      "Map each comment to exact manuscript updates.",
      "Align rebuttal, tracked, and clean versions.",
    ],
    requirements: [
      "Strong academic writing and revision planning.",
      "Excellent document discipline.",
      "Ability to preserve author intent.",
    ],
    bestFor: "Writers who understand reviewer workflows and revision strategy.",
  },
  {
    id: "editorial-operations-coordinator",
    title: "Editorial Operations Coordinator",
    stream: "Operations",
    summary: "Coordinate assignments, deadlines, and QA checkpoints across active manuscripts.",
    hiringType: "Immediate",
    tags: ["Remote", "Operations", "Process", "Coordinator"],
    responsibilities: [
      "Match projects to specialist availability.",
      "Track milestones, versions, and quality checks.",
      "Coordinate cross-team delivery handoffs.",
    ],
    requirements: [
      "Strong project coordination habits.",
      "Comfort managing multiple priorities.",
      "Professional written communication.",
    ],
    bestFor: "Operations-first profiles who thrive on structure and reliability.",
  },
  {
    id: "content-community-lead",
    title: "Content & Community Lead (Academic)",
    stream: "Business & Platform",
    summary: "Lead educational content and researcher communication with a credibility-first tone.",
    hiringType: "Talent Pool",
    tags: ["Remote", "Content", "Community", "Academic"],
    responsibilities: [
      "Own newsletter and resource content planning.",
      "Coordinate webinars with editorial teams.",
      "Maintain consistent voice across channels.",
    ],
    requirements: [
      "Strong science communication background.",
      "Experience with content strategy and execution.",
      "Ability to balance accuracy and clarity.",
    ],
    bestFor: "Academic communicators who prefer depth over hype.",
  },
  {
    id: "crm-automation-specialist",
    title: "CRM & Automation Specialist",
    stream: "Business & Platform",
    summary: "Build clean pipelines for lead routing, follow-ups, and reporting.",
    hiringType: "Talent Pool",
    tags: ["Remote", "Systems", "Automation", "CRM"],
    responsibilities: [
      "Design lead routing and intake automations.",
      "Maintain lifecycle email workflows.",
      "Improve pipeline hygiene and visibility.",
    ],
    requirements: [
      "Experience with CRM and automation tools.",
      "Structured process documentation habits.",
      "Cross-functional communication skills.",
    ],
    bestFor: "Builders who enjoy practical, maintainable operations systems.",
  },
];

ROLES.push(...MORE_ROLES);

const PROCESS_STEPS = [
  "Submit your profile with stream and role preference.",
  "Initial review by the talent and quality team.",
  "Short skill or sample-based screening.",
  "Structured conversation on fit and expectations.",
  "Trial assignment with feedback loop.",
  "Onboarding into the associate network.",
];

const FAQS = [
  {
    question: "Is this fully remote?",
    answer:
      "Yes. Roles are remote-first. We coordinate through structured briefs, timelines, and async updates.",
  },
  {
    question: "Do you hire full-time employees?",
    answer:
      "Most roles are associate or project-based. Some operations roles may transition to long-term contracts.",
  },
  {
    question: "Can I apply to multiple streams?",
    answer:
      "Yes. Select one primary stream and mention secondary strengths in your application note.",
  },
  {
    question: "How long does screening take?",
    answer:
      "Most applicants hear from us within 7-10 business days, depending on role volume.",
  },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STREAM_ICONS: Record<CareerStream, ReactNode> = {
  "Editorial & Research Quality": <PenLine className="h-5 w-5 text-[#1F3A5F]" aria-hidden />,
  "Integrity & Compliance": <Scale className="h-5 w-5 text-[#1F3A5F]" aria-hidden />,
  "Data & Statistics": <BarChart3 className="h-5 w-5 text-[#1F3A5F]" aria-hidden />,
  "Revision Support": <CheckCircle2 className="h-5 w-5 text-[#1F3A5F]" aria-hidden />,
  Operations: <Cog className="h-5 w-5 text-[#1F3A5F]" aria-hidden />,
  "Business & Platform": <BriefcaseBusiness className="h-5 w-5 text-[#1F3A5F]" aria-hidden />,
};

type ApplicationForm = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  stream: CareerStream;
  linkedin: string;
  note: string;
  consent: boolean;
};

const INITIAL_FORM: ApplicationForm = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  role: "",
  stream: STREAMS[0],
  linkedin: "",
  note: "",
  consent: false,
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function CareersExperience() {
  const { addToast } = useToast();
  const applyRef = useRef<HTMLElement>(null);
  const [activeStream, setActiveStream] = useState<CareerStream>(STREAMS[0]);
  const [hiringFilter, setHiringFilter] = useState<HiringFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState<string>(ROLES[0]?.id ?? "");
  const [form, setForm] = useState<ApplicationForm>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const filteredRoles = useMemo(() => {
    const query = normalize(searchQuery);
    return ROLES.filter((role) => {
      if (role.stream !== activeStream) return false;
      if (hiringFilter !== "All" && role.hiringType !== hiringFilter) return false;
      if (!query) return true;
      const searchable = normalize(`${role.title} ${role.summary} ${role.tags.join(" ")} ${role.hiringType}`);
      return searchable.includes(query);
    });
  }, [activeStream, hiringFilter, searchQuery]);

  const selectedRole =
    filteredRoles.find((role) => role.id === selectedRoleId) ?? filteredRoles[0] ?? null;

  function prefillAndScroll(role: CareerRole) {
    setSelectedRoleId(role.id);
    setForm((current) => ({
      ...current,
      role: role.title,
      stream: role.stream,
    }));
    applyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function updateField<K extends keyof ApplicationForm>(key: K, value: ApplicationForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submitApplication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.role.trim()) {
      addToast({
        title: "Missing required details",
        description: "Please complete name, email, and role preference.",
      });
      return;
    }
    if (!EMAIL_REGEX.test(form.email.trim())) {
      addToast({
        title: "Invalid email address",
        description: "Please enter a valid email before submitting.",
      });
      return;
    }
    if (!form.consent) {
      addToast({
        title: "Consent required",
        description: "Please confirm that your details can be used for hiring communication.",
      });
      return;
    }

    const lines = [
      "Career application details:",
      `- Role preference: ${form.role}`,
      `- Primary stream: ${form.stream}`,
      form.phone.trim() ? `- Phone: ${form.phone.trim()}` : "",
      form.location.trim() ? `- Location: ${form.location.trim()}` : "",
      form.linkedin.trim() ? `- LinkedIn/Portfolio: ${form.linkedin.trim()}` : "",
      "",
      "Candidate note:",
      form.note.trim() || "No additional note provided.",
    ]
      .filter(Boolean)
      .join("\n");

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName.trim(),
          email: form.email.trim(),
          message: lines,
        }),
      });

      if (!res.ok) {
        throw new Error("Career submission failed");
      }

      addToast({
        title: "Application received",
        description: "Our careers team will review your profile and contact you by email.",
      });

      setForm({
        ...INITIAL_FORM,
        role: form.role,
        stream: form.stream,
      });
    } catch {
      addToast({
        title: "Submission failed",
        description: "Please try again in a moment.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden border-b border-[#A8C7E6]/60 bg-gradient-to-b from-[#A8C7E6]/45 via-[#A8C7E6]/25 to-[#E9E3D5]/35 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <Badge
              variant="outline"
              className="mb-4 border-[#A8C7E6]/60 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1F3A5F]"
            >
              Careers at Researchedit4u
            </Badge>
            <h1 className="text-4xl font-bold leading-tight text-[#1F3A5F] sm:text-5xl md:text-6xl">
              Build high-impact academic support with a remote, ethics-first team.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#2A2E35]/82 sm:text-lg">
              We are building a specialist network across editorial quality, integrity screening, data
              review, revision support, and research operations. Explore active roles and submit your
              profile in minutes.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                className="rounded-lg bg-[#1F3A5F] text-white hover:bg-[#3F7F72]"
                onClick={() => applyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                type="button"
              >
                Apply now
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button asChild variant="outline" className="rounded-lg border-[#A8C7E6]/60 bg-white/90">
                <Link href="/contact">Talk to our team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {VALUE_CARDS.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-[#A8C7E6]/60 bg-white/90 p-5 shadow-[0_12px_30px_rgba(20,35,45,0.08)]"
            >
              <div className="mb-3 inline-flex rounded-xl border border-[#A8C7E6]/55 bg-[#A8C7E6]/20 p-2">
                {card.icon}
              </div>
              <h2 className="text-lg font-semibold text-[#1F3A5F]">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#2A2E35]/76">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="open-roles" className="py-4 md:py-6">
        <div className="container">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-semibold text-[#1F3A5F]">Open Roles by Stream</h2>
              <p className="mt-2 text-sm text-[#2A2E35]/76">
                Filter by stream, hiring type, and keyword to find relevant opportunities.
              </p>
            </div>
            <Badge variant="outline" className="border-[#A8C7E6]/60 bg-[#A8C7E6]/20 text-[#1F3A5F]">
              {filteredRoles.length} role{filteredRoles.length === 1 ? "" : "s"} found
            </Badge>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {STREAMS.map((stream) => (
              <button
                key={stream}
                type="button"
                onClick={() => setActiveStream(stream)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  activeStream === stream
                    ? "border-[#1F3A5F] bg-[#A8C7E6]/35 text-[#1F3A5F]"
                    : "border-[#A8C7E6]/60 bg-white text-[#2A2E35]/78 hover:border-[#1F3A5F]/35 hover:text-[#1F3A5F]"
                }`}
              >
                {stream}
              </button>
            ))}
          </div>

          <div className="mb-6 grid gap-3 rounded-2xl border border-[#A8C7E6]/60 bg-white/90 p-4 md:grid-cols-[1fr_auto]">
            <label
              htmlFor="career-search"
              className="flex items-center gap-2 rounded-xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 px-3"
            >
              <Search className="h-4 w-4 text-[#2A2E35]/60" aria-hidden />
              <Input
                id="career-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by role, skill, or keyword"
                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
              />
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {HIRING_FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setHiringFilter(filter)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    hiringFilter === filter
                      ? "border-[#1F3A5F] bg-[#A8C7E6]/35 text-[#1F3A5F]"
                      : "border-[#A8C7E6]/60 bg-white text-[#2A2E35]/78 hover:border-[#1F3A5F]/35 hover:text-[#1F3A5F]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {filteredRoles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-5 text-sm text-[#2A2E35]/76">
              No roles match this filter. Try changing stream or search terms.
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="grid gap-4 md:grid-cols-2">
                {filteredRoles.map((role) => (
                  <article
                    key={role.id}
                    className={`flex h-full flex-col rounded-2xl border bg-white/95 p-5 shadow-[0_10px_24px_rgba(20,35,45,0.08)] transition ${
                      selectedRole?.id === role.id
                        ? "border-[#1F3A5F]/45 ring-2 ring-[#A8C7E6]/55"
                        : "border-[#A8C7E6]/60"
                    }`}
                  >
                    <div className="mb-3 inline-flex items-center gap-2">
                      <span className="rounded-lg border border-[#A8C7E6]/55 bg-[#A8C7E6]/20 p-2">
                        {STREAM_ICONS[role.stream]}
                      </span>
                      <Badge
                        variant="outline"
                        className={`border-none ${
                          role.hiringType === "Immediate"
                            ? "bg-[#A8C7E6]/24 text-[#1F3A5F]"
                            : "bg-[#E9E3D5]/75 text-[#1F3A5F]"
                        }`}
                      >
                        {role.hiringType}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-[#1F3A5F]">{role.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#2A2E35]/76">{role.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {role.tags.map((tag) => (
                        <Badge
                          key={`${role.id}-${tag}`}
                          variant="outline"
                          className="border-[#A8C7E6]/60 bg-[#A8C7E6]/12 text-[#2A2E35]/76"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 border-[#A8C7E6] bg-white/90"
                        onClick={() => setSelectedRoleId(role.id)}
                      >
                        View details
                      </Button>
                      <Button
                        type="button"
                        className="flex-1 bg-[#1F3A5F] text-white hover:bg-[#3F7F72]"
                        onClick={() => prefillAndScroll(role)}
                      >
                        Apply
                      </Button>
                    </div>
                  </article>
                ))}
              </div>

              {selectedRole ? (
                <aside className="rounded-2xl border border-[#A8C7E6]/60 bg-white/95 p-5 shadow-[0_12px_26px_rgba(20,35,45,0.08)]">
                  <Badge
                    variant="outline"
                    className="mb-3 border-[#A8C7E6]/60 bg-[#A8C7E6]/35 text-[#1F3A5F]"
                  >
                    {selectedRole.stream}
                  </Badge>
                  <h3 className="text-xl font-semibold text-[#1F3A5F]">{selectedRole.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#2A2E35]/76">{selectedRole.bestFor}</p>

                  <div className="mt-5">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#1F3A5F]/86">
                      Typical responsibilities
                    </h4>
                    <ul className="mt-2 space-y-2 text-sm text-[#2A2E35]/76">
                      {selectedRole.responsibilities.map((item) => (
                        <li key={item} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1F3A5F]" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#1F3A5F]/86">
                      Core requirements
                    </h4>
                    <ul className="mt-2 space-y-2 text-sm text-[#2A2E35]/76">
                      {selectedRole.requirements.map((item) => (
                        <li key={item} className="flex gap-2">
                          <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1F3A5F]" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    type="button"
                    className="mt-6 w-full bg-[#1F3A5F] text-white hover:bg-[#3F7F72]"
                    onClick={() => prefillAndScroll(selectedRole)}
                  >
                    Apply for this role
                  </Button>
                </aside>
              ) : null}
            </div>
          )}
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="text-3xl font-semibold text-[#1F3A5F]">How Hiring Works</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {PROCESS_STEPS.map((step, index) => (
              <article
                key={step}
                className="rounded-2xl border border-[#A8C7E6]/60 bg-white/90 p-4 shadow-[0_8px_20px_rgba(20,35,45,0.06)]"
              >
                <div className="mb-2 inline-flex items-center rounded-full border border-[#A8C7E6]/60 bg-[#A8C7E6]/20 px-2.5 py-1 text-xs font-semibold text-[#1F3A5F]">
                  Step {index + 1}
                </div>
                <p className="text-sm leading-relaxed text-[#2A2E35]/82">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section ref={applyRef} id="career-apply" className="py-6 md:py-8">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-2xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-6">
              <h2 className="text-3xl font-semibold text-[#1F3A5F]">Apply to the Talent Network</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#2A2E35]/76">
                Submit your profile once. We match candidates to current openings and future stream
                needs based on expertise, writing quality, and delivery reliability.
              </p>
              <div className="mt-4 space-y-2 text-sm text-[#2A2E35]/76">
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#1F3A5F]" aria-hidden />
                  <span>Include one primary role preference and relevant domain strengths.</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#1F3A5F]" aria-hidden />
                  <span>Share portfolio or LinkedIn if available for faster screening.</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#1F3A5F]" aria-hidden />
                  <span>Most applicants receive a response in 7-10 business days.</span>
                </p>
              </div>
            </div>

            <form
              onSubmit={submitApplication}
              className="rounded-2xl border border-[#A8C7E6]/60 bg-white/95 p-6 shadow-[0_10px_24px_rgba(20,35,45,0.08)]"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="full-name">Full name *</Label>
                  <Input
                    id="full-name"
                    value={form.fullName}
                    onChange={(event) => updateField("fullName", event.target.value)}
                    placeholder="Dr. Jane Doe"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="career-email">Email *</Label>
                  <Input
                    id="career-email"
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="jane@university.edu"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    placeholder="+91 00000 00000"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={form.location}
                    onChange={(event) => updateField("location", event.target.value)}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="role">Role preference *</Label>
                  <Input
                    id="role"
                    value={form.role}
                    onChange={(event) => updateField("role", event.target.value)}
                    placeholder="Statistical Reviewer"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stream">Primary stream</Label>
                  <select
                    id="stream"
                    value={form.stream}
                    onChange={(event) => updateField("stream", event.target.value as CareerStream)}
                    className="h-9 rounded-md border border-[#A8C7E6] bg-white px-3 text-sm text-[#2A2E35] shadow-xs outline-none focus-visible:border-[#3F7F72] focus-visible:ring-[3px] focus-visible:ring-[#3F7F72]/30"
                  >
                    {STREAMS.map((stream) => (
                      <option key={stream} value={stream}>
                        {stream}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                <Label htmlFor="linkedin">LinkedIn / Portfolio URL</Label>
                <Input
                  id="linkedin"
                  type="url"
                  value={form.linkedin}
                  onChange={(event) => updateField("linkedin", event.target.value)}
                  placeholder="https://linkedin.com/in/your-profile"
                />
              </div>

              <div className="mt-4 grid gap-2">
                <Label htmlFor="note">Short note</Label>
                <Textarea
                  id="note"
                  value={form.note}
                  onChange={(event) => updateField("note", event.target.value)}
                  placeholder="Share your domain strengths, sample experience, and preferred role type."
                  rows={5}
                />
              </div>

              <label className="mt-4 flex items-start gap-2 text-sm text-[#2A2E35]/76">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) => updateField("consent", event.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-[#A8C7E6]/60"
                />
                <span>
                  I agree to be contacted for career opportunities and talent network updates.
                </span>
              </label>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button type="submit" disabled={loading} className="bg-[#1F3A5F] text-white hover:bg-[#3F7F72]">
                  {loading ? "Submitting..." : "Submit application"}
                </Button>
                <p className="flex items-center gap-1 text-xs text-[#2A2E35]/62">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#1F3A5F]" aria-hidden />
                  Privacy-respectful. No spam.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container">
          <h2 className="text-3xl font-semibold text-[#1F3A5F]">Careers FAQ</h2>
          <div className="mt-5 space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.question}
                className="rounded-2xl border border-[#A8C7E6]/60 bg-white/95 p-4"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-[#1F3A5F]">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#2A2E35]/76">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
