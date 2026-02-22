"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookCheck,
  FilePenLine,
  MessageSquareReply,
  ShieldCheck,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { API_BASE } from "@/lib/api";

const CATEGORY_FILTERS = [
  "All",
  "Editing",
  "Journal Selection",
  "AI/Plagiarism",
  "Data/Stats",
  "Response to Reviewers",
] as const;

const STAGE_FILTERS = ["All", "Pre-submission", "Revision"] as const;

type CategoryFilter = (typeof CATEGORY_FILTERS)[number];
type StoryCategory = Exclude<CategoryFilter, "All">;
type StoryStage = Exclude<(typeof STAGE_FILTERS)[number], "All">;

type CaseStory = {
  id: string;
  slug: string;
  category: StoryCategory;
  title: string;
  chips: {
    problem: string;
    fix: string;
    result: string;
  };
  quote: string;
  profile: string;
  discipline: string;
  region: string;
  stage: StoryStage;
  turnaround?: string;
  manuscriptType: string;
  improved: string;
  delivered: string;
  problem: string;
  fixBullets: string[];
  resultBullets: string[];
  receiveBullets: string[];
  ethics: string;
};

const CASE_STORIES: CaseStory[] = [
  {
    id: "editing-journal-ready-readability",
    slug: "clarity-editing-reviewer-readability",
    category: "Editing",
    title:
      "When the science is sound but readability blocks momentum: clarity edits that reduce avoidable reviewer resistance",
    chips: {
      problem: "Dense structure",
      fix: "Meaning-preserving clarity edit",
      result: "Reviewer-ready readability",
    },
    quote:
      "The manuscript became easier to assess; reviewers focused on the work, not the wording.",
    profile: "Senior Lecturer",
    discipline: "Engineering",
    region: "India",
    stage: "Pre-submission",
    turnaround: "72 hours",
    manuscriptType: "Original research article",
    improved:
      "Contribution clarity, structure, terminology discipline, and readability",
    delivered:
      "Tracked edits, clean copy, figure and caption cleanup, and submission-readiness cues",
    problem:
      "The technical content was correct, but dense paragraphs and weak signposting made the contribution harder to see at first read.",
    fixBullets: [
      "Front-loaded novelty and contribution in abstract and early sections.",
      "Restructured paragraphs to one claim + evidence + implication.",
      "Harmonized abbreviations and terminology across sections.",
      "Aligned claims with reported evidence and reduced overstatement.",
      "Made figure and table captions self-contained for quick verification.",
    ],
    resultBullets: [
      "Lower triage friction in the first editorial pass.",
      "Less ambiguity in methods and interpretation.",
      "Stronger overall submission readability and reviewer flow.",
    ],
    receiveBullets: [
      "Tracked-changes file and clean copy",
      "Editorial map showing major changes",
      "Format-aware readiness checklist",
      "Optional abstract tightening for target journal style",
    ],
    ethics: "Author-owned work only. No ghostwriting. Confidential handling.",
  },
  {
    id: "journal-selection-scope-fit-shortlist",
    slug: "journal-shortlist-scope-fit",
    category: "Journal Selection",
    title:
      "A shortlist built for triage survival: scope fit, article-type fit, and realistic decision-path planning",
    chips: {
      problem: "Target uncertainty",
      fix: "Scope and indexing checks",
      result: "Safer shortlist with realistic timelines",
    },
    quote:
      "Shortlisting focused on fit and decision realism, not impact-factor chasing.",
    profile: "Research Team",
    discipline: "Management",
    region: "Middle East",
    stage: "Pre-submission",
    manuscriptType: "Review article",
    improved:
      "Scope alignment, article-type fit, and editorial expectation management",
    delivered:
      "Ranked shortlist, rationale notes, sequencing plan, and framing recommendations",
    problem:
      "The draft's audience and claim positioning did not clearly map to a specific journal tier or readership profile.",
    fixBullets: [
      "Mapped claim type to scope and accepted article patterns.",
      "Screened indexing legitimacy and publishing quality signals.",
      "Created ranked options with fit rationale and risk notes.",
      "Added Plan A and Plan B submission sequencing.",
      "Suggested framing changes in title and abstract for faster classification.",
    ],
    resultBullets: [
      "Reduced avoidable scope mismatch rejections.",
      "Clear submission sequence instead of guesswork.",
      "Better alignment between manuscript claim and journal audience.",
    ],
    receiveBullets: [
      "Ranked shortlist with fit notes",
      "Avoid list with reasons",
      "Submission sequence checklist",
      "Optional cover-letter framing pointers",
    ],
    ethics: "Transparency-first recommendation workflow. No manipulation claims.",
  },
  {
    id: "ai-plagiarism-similarity-triage",
    slug: "similarity-integrity-triage",
    category: "AI/Plagiarism",
    title:
      "Similarity reports are evidence, not verdicts: overlap risk reduction with stronger attribution",
    chips: {
      problem: "High similarity",
      fix: "Integrity triage and rewrite",
      result: "Cleaner report with lower risk signals",
    },
    quote:
      "Attribution and synthesis were repaired without trying to hide the text.",
    profile: "PhD Scholar",
    discipline: "Life Sciences",
    region: "UK/EU",
    stage: "Revision",
    manuscriptType: "Original research article",
    improved:
      "Attribution clarity, synthesis quality, and overlap risk reduction",
    delivered:
      "Flag triage, targeted rewrites, citation-chain repair, and integrity checklist",
    problem:
      "A high similarity report exposed unattributed close paraphrase and weak citation chaining in critical sections.",
    fixBullets: [
      "Separated harmless matches from high-risk overlap zones.",
      "Rebuilt citation chains where attribution was weak or missing.",
      "Rewrote flagged sections for synthesis, not synonym swapping.",
      "Documented legitimate overlap areas with defensible reasoning.",
      "Added a pre-submission integrity checklist for future revisions.",
    ],
    resultBullets: [
      "Reduced high-risk overlap clusters.",
      "Improved academic synthesis quality.",
      "Lowered ethics escalation risk in editorial review.",
    ],
    receiveBullets: [
      "Rewritten flagged passages with tracked changes",
      "Integrity note: what changed and why",
      "Checklist to reduce re-flagging risk",
      "Optional citation-clarity pass for key claims",
    ],
    ethics: "No concealment workflow. Emphasis on transparent attribution.",
  },
  {
    id: "data-stats-reporting-alignment",
    slug: "methods-reporting-alignment",
    category: "Data/Stats",
    title:
      "When results may be correct but reporting blocks trust: methods and statistics aligned to review expectations",
    chips: {
      problem: "Reporting gaps",
      fix: "Analysis and reporting alignment",
      result: "Clearer methods and interpretable results",
    },
    quote:
      "The goal was auditability: reviewers should evaluate rigor without guessing.",
    profile: "Clinician",
    discipline: "Medical",
    region: "Australia",
    stage: "Pre-submission",
    manuscriptType: "Clinical study",
    improved:
      "Methods clarity, result structure, and reporting completeness",
    delivered:
      "Reporting audit, methods rewrite, results narrative polish, and table cleanup",
    problem:
      "Reviewers could not reliably evaluate rigor because methods and analysis decisions were under-specified.",
    fixBullets: [
      "Audited reporting against study-design expectations.",
      "Clarified outcomes, assumptions, and analysis pathways.",
      "Re-expressed results with better denominators and uncertainty cues.",
      "Refined tables and captions for independent readability.",
      "Aligned conclusions with the evidence actually reported.",
    ],
    resultBullets: [
      "Fewer reviewer clarification loops.",
      "Better interpretability of results and methods.",
      "More defensible reporting for editor confidence.",
    ],
    receiveBullets: [
      "Methods and reporting rewrite with tracked changes",
      "Table and caption cleanup",
      "Reporting checklist summary",
      "Optional statistical narrative refinement",
    ],
    ethics: "No data fabrication. Reporting and communication clarity only.",
  },
  {
    id: "response-to-reviewers-rebuttal-structure",
    slug: "rebuttal-response-mapping",
    category: "Response to Reviewers",
    title:
      "A rebuttal that makes re-review easy: point-by-point responses with traceable manuscript edits",
    chips: {
      problem: "Unclear rebuttal",
      fix: "Structured response mapping",
      result: "Reduced back-and-forth cycles",
    },
    quote:
      "Each reviewer comment was mapped to a precise response and edit location.",
    profile: "Assistant Professor",
    discipline: "Chemistry",
    region: "India",
    stage: "Revision",
    manuscriptType: "Original research article",
    improved: "Rebuttal clarity, traceability, and response tone",
    delivered:
      "Point-by-point response document, revision map, and tracked/clean alignment",
    problem:
      "Manuscript revisions were made, but rebuttal responses lacked traceability and complete comment coverage.",
    fixBullets: [
      "Built comment -> response -> location mapping for each reviewer point.",
      "Added page, section, and line-level references.",
      "Strengthened tone for respectful and defensible disagreement cases.",
      "Ensured no reviewer point was silently skipped.",
      "Validated consistency between rebuttal and manuscript files.",
    ],
    resultBullets: [
      "Faster verification in re-review.",
      "Lower risk of additional rounds for missing responses.",
      "Higher confidence in revision quality and diligence.",
    ],
    receiveBullets: [
      "Submission-ready rebuttal letter",
      "Revision mapping table",
      "Tracked and clean copy alignment notes",
      "Optional editor-facing change summary paragraph",
    ],
    ethics: "Transparent revision reporting only. No misrepresentation of changes.",
  },
];

const FAQS = [
  {
    q: "What is an anonymised sample?",
    a: "A discipline-relevant sample showing structure, edit depth, and format standards without exposing author identity or confidential data.",
  },
  {
    q: "Do you guarantee acceptance?",
    a: "No. We improve clarity, compliance, and reviewer-readiness so evaluation focuses on the science.",
  },
  {
    q: "Do you provide ghostwriting?",
    a: "No. We work only on author-owned drafts and revision materials.",
  },
  {
    q: "Can you work under NDA?",
    a: "Yes. We support NDA-friendly engagement workflows on request.",
  },
];

const CATEGORY_ICONS: Record<StoryCategory, ReactNode> = {
  Editing: <FilePenLine className="h-4 w-4" aria-hidden />,
  "Journal Selection": <BookCheck className="h-4 w-4" aria-hidden />,
  "AI/Plagiarism": <ShieldCheck className="h-4 w-4" aria-hidden />,
  "Data/Stats": <BarChart3 className="h-4 w-4" aria-hidden />,
  "Response to Reviewers": <MessageSquareReply className="h-4 w-4" aria-hidden />,
};

type RequestForm = {
  fullName: string;
  email: string;
  status: string;
  discipline: string;
  timeline: string;
  notes: string;
  consent: boolean;
  storyId: string;
  storyTitle: string;
  storyCategory: StoryCategory;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function CaseStoriesExperience() {
  const { addToast } = useToast();
  const requestRef = useRef<HTMLElement>(null);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [stageFilter, setStageFilter] = useState<(typeof STAGE_FILTERS)[number]>("All");
  const [query, setQuery] = useState("");
  const [activeStoryId, setActiveStoryId] = useState(CASE_STORIES[0]?.id ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<RequestForm>({
    fullName: "",
    email: "",
    status: "Researcher",
    discipline: "",
    timeline: "",
    notes: "",
    consent: false,
    storyId: CASE_STORIES[0]?.id ?? "",
    storyTitle: CASE_STORIES[0]?.title ?? "",
    storyCategory: CASE_STORIES[0]?.category ?? "Editing",
  });

  const filteredStories = useMemo(() => {
    const search = normalize(query);
    return CASE_STORIES.filter((story) => {
      if (categoryFilter !== "All" && story.category !== categoryFilter) return false;
      if (stageFilter !== "All" && story.stage !== stageFilter) return false;
      if (!search) return true;
      const blob = normalize(
        [
          story.title,
          story.category,
          story.discipline,
          story.stage,
          story.region,
          story.chips.problem,
          story.chips.fix,
          story.chips.result,
          story.problem,
          ...story.fixBullets,
          ...story.resultBullets,
        ].join(" "),
      );
      return blob.includes(search);
    });
  }, [categoryFilter, stageFilter, query]);

  useEffect(() => {
    if (!filteredStories.some((story) => story.id === activeStoryId)) {
      setActiveStoryId(filteredStories[0]?.id ?? "");
    }
  }, [filteredStories, activeStoryId]);

  const activeStory = filteredStories.find((story) => story.id === activeStoryId) ?? null;

  useEffect(() => {
    if (!activeStory) return;
    setForm((current) => ({
      ...current,
      storyId: activeStory.id,
      storyTitle: activeStory.title,
      storyCategory: activeStory.category,
    }));
  }, [activeStory]);

  function prefillForStory(story: CaseStory) {
    setForm((current) => ({
      ...current,
      storyId: story.id,
      storyTitle: story.title,
      storyCategory: story.category,
    }));
    requestRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function updateForm<K extends keyof RequestForm>(key: K, value: RequestForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.status.trim()) {
      addToast({
        title: "Missing required details",
        description: "Please complete name, email, and current status.",
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
        description: "Please confirm consent so we can send the sample and respond.",
      });
      return;
    }

    const message = [
      "Case story sample request:",
      `- Story: ${form.storyTitle}`,
      `- Category: ${form.storyCategory}`,
      `- Status: ${form.status}`,
      form.discipline.trim() ? `- Discipline: ${form.discipline.trim()}` : "",
      form.timeline.trim() ? `- Timeline: ${form.timeline.trim()}` : "",
      "",
      "Request note:",
      form.notes.trim() || "No additional note provided.",
    ]
      .filter(Boolean)
      .join("\n");

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName.trim(),
          email: form.email.trim(),
          message,
        }),
      });
      if (!res.ok) throw new Error("Request failed");

      addToast({
        title: "Sample request received",
        description: "We will share a matched anonymised sample to your email.",
      });

      setForm((current) => ({
        ...current,
        fullName: "",
        email: "",
        status: "Researcher",
        discipline: "",
        timeline: "",
        notes: "",
        consent: false,
      }));
    } catch {
      addToast({
        title: "Request failed",
        description: "Please try again in a moment.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="pb-16">
      <section className="relative overflow-hidden border-b border-[#A8C7E6]/60 bg-[radial-gradient(1000px_500px_at_85%_-15%,rgba(168,199,230,.24),transparent_60%),radial-gradient(1000px_500px_at_10%_-15%,rgba(31,58,95,.14),transparent_60%),linear-gradient(180deg,#fff,rgba(233,227,213,.45))] py-16 md:py-20">
        <div className="container">
          <Badge variant="outline" className="mb-4 border-[#A8C7E6]/60 bg-white/90 text-[#1F3A5F]">
            Case Stories
          </Badge>
          <h1 className="max-w-5xl text-4xl font-bold leading-tight text-[#1F3A5F] sm:text-5xl md:text-6xl">
            Anonymised outcomes that show what changed, why it mattered, and what gets delivered.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#2A2E35]/76 sm:text-lg">
            Browse story categories, open full snapshots, and request a matched anonymised sample for your
            current stage.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="outline" className="border-[#A8C7E6]/60 bg-white/85 text-[#2A2E35]/76">Anonymised</Badge>
            <Badge variant="outline" className="border-[#A8C7E6]/60 bg-white/85 text-[#2A2E35]/76">Author-owned drafts</Badge>
            <Badge variant="outline" className="border-[#A8C7E6]/60 bg-white/85 text-[#2A2E35]/76">No ghostwriting</Badge>
            <Badge variant="outline" className="border-[#A8C7E6]/60 bg-white/85 text-[#2A2E35]/76">NDA-friendly</Badge>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container space-y-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setCategoryFilter(category)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  categoryFilter === category
                    ? "border-[#1F3A5F] bg-[#A8C7E6]/25 text-[#1F3A5F]"
                    : "border-[#A8C7E6]/60 bg-white text-[#2A2E35]/76 hover:border-[#1F3A5F]/35 hover:text-[#1F3A5F]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid gap-3 rounded-2xl border border-[#A8C7E6]/60 bg-white/90 p-4 md:grid-cols-[1fr_auto]">
            <label htmlFor="story-search" className="flex items-center gap-2 rounded-xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 px-3">
              <Search className="h-4 w-4 text-[#2A2E35]/64" aria-hidden />
              <Input
                id="story-search"
                type="search"
                placeholder="Search by discipline, stage, or problem"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
              />
            </label>
            <select
              value={stageFilter}
              onChange={(event) => setStageFilter(event.target.value as (typeof STAGE_FILTERS)[number])}
              className="h-9 rounded-full border border-[#A8C7E6]/60 bg-white px-3 text-sm text-[#2A2E35]/80 outline-none focus-visible:border-[#3F7F72] focus-visible:ring-[3px] focus-visible:ring-[#3F7F72]/30"
              aria-label="Filter stories by stage"
            >
              {STAGE_FILTERS.map((stage) => (
                <option key={stage} value={stage}>
                  {stage === "All" ? "Stage: All" : stage}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-2xl border border-[#A8C7E6]/60 bg-white/95 p-5 shadow-[0_12px_30px_rgba(20,35,45,0.08)]">
              {activeStory ? (
                <>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="outline" className="border-[#A8C7E6]/60 bg-[#A8C7E6]/20 text-[#1F3A5F]">
                      {activeStory.category}
                    </Badge>
                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#2A2E35]/60">
                      Full story
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold leading-snug text-[#1F3A5F]">{activeStory.title}</h2>
                  <p className="mt-3 rounded-xl border border-dashed border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-3 text-sm italic text-[#2A2E35]/76">
                    &ldquo;{activeStory.quote}&rdquo;
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-[#A8C7E6]/60 bg-white text-[#1F3A5F]">Problem: {activeStory.chips.problem}</Badge>
                    <Badge variant="outline" className="border-[#A8C7E6]/60 bg-[#A8C7E6]/20 text-[#1F3A5F]">Fix: {activeStory.chips.fix}</Badge>
                    <Badge variant="outline" className="border-[#A8C7E6]/60 bg-[#A8C7E6]/12 text-[#1F3A5F]">Result: {activeStory.chips.result}</Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#2A2E35]/72">
                    <Badge variant="outline" className="border-[#A8C7E6]/60 bg-white text-[#2A2E35]/72">{activeStory.profile}</Badge>
                    <Badge variant="outline" className="border-[#A8C7E6]/60 bg-white text-[#2A2E35]/72">{activeStory.discipline}</Badge>
                    <Badge variant="outline" className="border-[#A8C7E6]/60 bg-white text-[#2A2E35]/72">{activeStory.region}</Badge>
                    <Badge variant="outline" className="border-[#A8C7E6]/60 bg-white text-[#2A2E35]/72">{activeStory.stage}</Badge>
                    {activeStory.turnaround ? (
                      <Badge variant="outline" className="border-[#A8C7E6]/60 bg-white text-[#2A2E35]/72">
                        Turnaround: {activeStory.turnaround}
                      </Badge>
                    ) : null}
                  </div>

                  <div className="mt-5 overflow-hidden rounded-xl border border-[#A8C7E6]/60">
                    <div className="grid border-b border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-3 md:grid-cols-[210px_1fr]">
                      <span className="text-sm font-semibold text-[#1F3A5F]/82">Manuscript type</span>
                      <span className="text-sm text-[#1F3A5F]">{activeStory.manuscriptType}</span>
                    </div>
                    <div className="grid border-b border-[#A8C7E6]/60 p-3 md:grid-cols-[210px_1fr]">
                      <span className="text-sm font-semibold text-[#1F3A5F]/82">What improved</span>
                      <span className="text-sm text-[#1F3A5F]">{activeStory.improved}</span>
                    </div>
                    <div className="grid p-3 md:grid-cols-[210px_1fr]">
                      <span className="text-sm font-semibold text-[#1F3A5F]/82">Support delivered</span>
                      <span className="text-sm text-[#1F3A5F]">{activeStory.delivered}</span>
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#1F3A5F]/82">Problem</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[#2A2E35]/84">{activeStory.problem}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#1F3A5F]/82">What we did</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#2A2E35]/84">
                        {activeStory.fixBullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#1F3A5F]/82">Result</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#2A2E35]/84">
                        {activeStory.resultBullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#1F3A5F]/82">What you receive</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#2A2E35]/84">
                        {activeStory.receiveBullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <p className="mt-2 text-xs text-[#2A2E35]/72"><strong>Ethics:</strong> {activeStory.ethics}</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-[#A8C7E6]/60 bg-[linear-gradient(180deg,rgba(168,199,230,.28),rgba(255,255,255,.96))] p-4">
                    <p className="text-sm font-semibold text-[#1F3A5F]">Need a matched anonymised sample PDF for this case type?</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button type="button" onClick={() => prefillForStory(activeStory)} className="bg-[#1F3A5F] text-white hover:bg-[#3F7F72]">
                        Request sample for this story
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Button>
                      <Button asChild variant="outline" className="border-[#A8C7E6]/60 bg-white/90">
                        <Link href={`/case-studies/${activeStory.slug}`}>Open full case page</Link>
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-xl border border-dashed border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-6 text-sm text-[#2A2E35]/76">
                  No stories match this filter. Try another category or remove keywords.
                </div>
              )}
            </article>

            <aside className="rounded-2xl border border-[#A8C7E6]/60 bg-white/95 p-5 shadow-[0_12px_30px_rgba(20,35,45,0.08)]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#1F3A5F]/82">Pick a story</h2>
                <Badge variant="outline" className="border-[#A8C7E6]/60 bg-[#A8C7E6]/12 text-[#1F3A5F]/82">
                  {filteredStories.length} shown
                </Badge>
              </div>
              <div className="space-y-2">
                {filteredStories.map((story) => (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => setActiveStoryId(story.id)}
                    className={`w-full rounded-xl border p-3 text-left transition ${
                      activeStory?.id === story.id
                        ? "border-[#A8C7E6] bg-[#A8C7E6]/20"
                        : "border-[#A8C7E6]/60 bg-white hover:border-[#A8C7E6] hover:bg-[#A8C7E6]/12"
                    }`}
                  >
                    <div className="mb-1 inline-flex items-center gap-2 text-xs font-semibold text-[#1F3A5F]">
                      {CATEGORY_ICONS[story.category]}
                      <span>{story.category}</span>
                    </div>
                    <p className="text-sm font-semibold leading-snug text-[#1F3A5F]">{story.title}</p>
                    <p className="mt-1 text-xs text-[#2A2E35]/72">
                      {story.discipline} | {story.stage}
                    </p>
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section ref={requestRef} className="py-10 md:py-12">
        <div className="container grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <article className="rounded-2xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-6">
            <h2 className="text-3xl font-semibold text-[#1F3A5F]">Request a matched anonymised sample</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#2A2E35]/76">
              We will share a discipline-relevant anonymised sample aligned to your stage and story type.
            </p>
            <div className="mt-4 rounded-xl border border-[#A8C7E6]/60 bg-white p-4 text-sm">
              <p className="font-semibold text-[#1F3A5F]">Selected story</p>
              <p className="mt-1 text-[#2A2E35]/84">{form.storyTitle}</p>
              <Badge variant="outline" className="mt-2 border-[#A8C7E6]/60 bg-[#A8C7E6]/20 text-[#1F3A5F]">
                {form.storyCategory}
              </Badge>
            </div>
          </article>

          <form onSubmit={submitRequest} className="rounded-2xl border border-[#A8C7E6]/60 bg-white/95 p-6 shadow-[0_10px_24px_rgba(20,35,45,0.08)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="sample-name">Full name *</Label>
                <Input id="sample-name" value={form.fullName} onChange={(event) => updateForm("fullName", event.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sample-email">Email *</Label>
                <Input id="sample-email" type="email" value={form.email} onChange={(event) => updateForm("email", event.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sample-status">Current status *</Label>
                <select
                  id="sample-status"
                  value={form.status}
                  onChange={(event) => updateForm("status", event.target.value)}
                  className="h-9 rounded-md border border-[#A8C7E6] bg-white px-3 text-sm text-[#2A2E35] shadow-xs outline-none focus-visible:border-[#3F7F72] focus-visible:ring-[3px] focus-visible:ring-[#3F7F72]/30"
                >
                  <option value="Researcher">Researcher</option>
                  <option value="PhD Scholar">PhD Scholar</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Clinician">Clinician</option>
                  <option value="Industry Scientist">Industry Scientist</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sample-discipline">Discipline</Label>
                <Input id="sample-discipline" value={form.discipline} onChange={(event) => updateForm("discipline", event.target.value)} placeholder="Engineering, Medical, Management" />
              </div>
            </div>
            <div className="mt-4 grid gap-2">
              <Label htmlFor="sample-timeline">Timeline</Label>
              <Input id="sample-timeline" value={form.timeline} onChange={(event) => updateForm("timeline", event.target.value)} placeholder="Need support in 2 weeks" />
            </div>
            <div className="mt-4 grid gap-2">
              <Label htmlFor="sample-notes">What do you want to evaluate in the sample?</Label>
              <Textarea id="sample-notes" value={form.notes} onChange={(event) => updateForm("notes", event.target.value)} rows={4} placeholder="For example: rebuttal structure, integrity handling, or methods reporting quality." />
            </div>
            <label className="mt-4 flex items-start gap-2 text-sm text-[#2A2E35]/76">
              <input type="checkbox" checked={form.consent} onChange={(event) => updateForm("consent", event.target.checked)} className="mt-0.5 h-4 w-4 rounded border-[#A8C7E6]/60" />
              <span>I consent to receive sample material and follow-up communication related to this request.</span>
            </label>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button type="submit" disabled={submitting} className="bg-[#1F3A5F] text-white hover:bg-[#3F7F72]">
                {submitting ? "Submitting..." : "Request anonymised sample"}
              </Button>
              <span className="text-xs text-[#2A2E35]/72">Delivery by email. Privacy-respectful handling.</span>
            </div>
          </form>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <article className="rounded-2xl border border-[#A8C7E6]/60 bg-white/95 p-6 shadow-[0_10px_24px_rgba(20,35,45,0.08)]">
            <h2 className="text-3xl font-semibold text-[#1F3A5F]">FAQ</h2>
            <div className="mt-4 space-y-3">
              {FAQS.map((item) => (
                <details key={item.q} className="rounded-xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-4">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-[#1F3A5F]">{item.q}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-[#2A2E35]/76">{item.a}</p>
                </details>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-transparent bg-[linear-gradient(135deg,#1F3A5F,#3F7F72)] p-6 text-white shadow-[0_16px_34px_rgba(31,58,95,0.2)]">
            <h2 className="text-3xl font-semibold">Need support on a live manuscript?</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85">
              Share your current stage and blockers. We will map the fastest ethical route from draft to reviewer-ready submission.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild className="bg-white text-[#1F3A5F] hover:bg-white/90">
                <Link href="/contact">Book expert review</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/35 bg-white/10 text-white hover:bg-white/20">
                <Link href="/services">Explore services</Link>
              </Button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
