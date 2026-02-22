"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";

type StoryCategory =
  | "Editing"
  | "Journal Selection"
  | "AI/Plagiarism"
  | "Data/Stats"
  | "Response to Reviewers";

type Story = {
  id: string;
  category: StoryCategory;
  problem: string;
  fix: string;
  result: string;
  headline: string;
  quote: string;
  profile: {
    role: string;
    field: string;
    region: string;
    stage: string;
    turnaround: string;
  };
  proof: {
    manuscript: string;
    improved: string;
    delivered: string;
  };
};

type FilterKey = "All" | StoryCategory;

const FILTERS: FilterKey[] = [
  "All",
  "Editing",
  "Journal Selection",
  "AI/Plagiarism",
  "Data/Stats",
  "Response to Reviewers",
];

const STORIES: Story[] = [
  {
    id: "ed-01",
    category: "Editing",
    problem: "Dense structure",
    fix: "Clarity edit",
    result: "Reviewer-ready",
    headline: "Clearer structure and tighter language for journal-ready readability",
    quote:
      "The edits improved flow and clarity without changing the meaning. Reviewers focused on the science, not the sentences.",
    profile: {
      role: "Senior Lecturer",
      field: "Engineering",
      region: "India",
      stage: "Pre-submission",
      turnaround: "72 hours",
    },
    proof: {
      manuscript: "Original research article",
      improved: "Structure, academic tone, consistency",
      delivered: "Tracked edits, formatting alignment, submission-ready checks",
    },
  },
  {
    id: "js-01",
    category: "Journal Selection",
    problem: "Scope uncertainty",
    fix: "Safer shortlist",
    result: "Faster targeting",
    headline: "Safer shortlist with scope-fit and realistic decision timelines",
    quote:
      "The shortlist was practical and matched our topic. We avoided risky outlets and saved weeks of trial and error.",
    profile: {
      role: "Head of Department",
      field: "Management",
      region: "Middle East",
      stage: "Pre-submission",
      turnaround: "3-5 days",
    },
    proof: {
      manuscript: "Empirical study",
      improved: "Scope fit, indexing checks, timeline realism",
      delivered: "3-5 journal shortlist, submission notes, timeline guidance",
    },
  },
  {
    id: "ai-01",
    category: "AI/Plagiarism",
    problem: "Similarity concerns",
    fix: "Rewrite for clarity",
    result: "Cleaner narrative",
    headline: "Reduced similarity concerns while preserving the author's scientific voice",
    quote:
      "We were worried about similarity flags. The rewrite improved originality and kept our technical meaning intact.",
    profile: {
      role: "PhD Scholar",
      field: "Life Sciences",
      region: "UK/EU",
      stage: "Revision",
      turnaround: "24-48 hours",
    },
    proof: {
      manuscript: "Methods and discussion sections",
      improved: "Originality signals, cohesion, clarity",
      delivered: "Revised sections, consistency checks, editor notes",
    },
  },
  {
    id: "ds-01",
    category: "Data/Stats",
    problem: "Reporting gaps",
    fix: "Stats review",
    result: "Reviewer-friendly",
    headline: "Methods and statistics aligned to reporting expectations",
    quote:
      "The analysis checks helped us present results more clearly and avoid reviewer confusion about methods and reporting.",
    profile: {
      role: "Clinician-Researcher",
      field: "Medical",
      region: "Australia",
      stage: "Pre-submission",
      turnaround: "5-7 days",
    },
    proof: {
      manuscript: "Clinical/biomedical paper",
      improved: "Model justification, tables/figures, reporting",
      delivered: "Stats review notes, revised tables/figures, checklist",
    },
  },
  {
    id: "rr-01",
    category: "Response to Reviewers",
    problem: "Scattered replies",
    fix: "Point-by-point",
    result: "Clear resubmission",
    headline: "Point-by-point response made clearer and more professional",
    quote:
      "The response became structured and easier for editors to evaluate. We addressed comments without sounding defensive.",
    profile: {
      role: "Postdoc",
      field: "Chemistry",
      region: "USA",
      stage: "Resubmission",
      turnaround: "48-72 hours",
    },
    proof: {
      manuscript: "Revision package",
      improved: "Tone, structure, change locations",
      delivered: "Response table, tracked changes alignment, resubmission checks",
    },
  },
  {
    id: "ed-02",
    category: "Editing",
    problem: "Style mismatch",
    fix: "Final checks",
    result: "Submission-ready",
    headline: "Formatting and consistency checks reduced desk-rejection risk",
    quote:
      "The final checks caught issues we missed - style, references, and consistency. The paper looked submission-ready.",
    profile: {
      role: "Assistant Professor",
      field: "Social Sciences",
      region: "India",
      stage: "Pre-submission",
      turnaround: "48 hours",
    },
    proof: {
      manuscript: "Review article",
      improved: "References, headings, figure captions",
      delivered: "Formatted manuscript, QC checklist, submission-pack readiness",
    },
  },
  {
    id: "js-02",
    category: "Journal Selection",
    problem: "Out-of-scope decision",
    fix: "Repositioning",
    result: "Better-fit target",
    headline: "Better-fit target identified after an out-of-scope decision",
    quote:
      "After an out-of-scope decision, we pivoted to a better-fit journal with a clearer submission plan.",
    profile: {
      role: "Research Associate",
      field: "Computer Science",
      region: "India",
      stage: "Revision",
      turnaround: "3-5 days",
    },
    proof: {
      manuscript: "Conference-to-journal extension",
      improved: "Target mapping, cover letter angle, scope alignment",
      delivered: "Shortlist, cover letter pointers, resubmission plan",
    },
  },
  {
    id: "ai-02",
    category: "AI/Plagiarism",
    problem: "Robotic phrasing",
    fix: "Language polish",
    result: "Natural flow",
    headline: "Cleaner narrative and reduced AI-flag risk in key sections",
    quote:
      "We improved clarity and originality signals. The revised sections read naturally while staying technically accurate.",
    profile: {
      role: "Masters Student",
      field: "Biotech",
      region: "India",
      stage: "Pre-submission",
      turnaround: "24 hours",
    },
    proof: {
      manuscript: "Introduction and results",
      improved: "Sentence variety, transitions, clarity",
      delivered: "Edited sections, rewrite notes, consistency checks",
    },
  },
  {
    id: "ds-02",
    category: "Data/Stats",
    problem: "Overcrowded tables",
    fix: "Reporting alignment",
    result: "Clear visuals",
    headline: "Tables and figures made reviewer-friendly with clearer reporting",
    quote:
      "The figures and tables became easier to interpret, and the reporting felt consistent with journal expectations.",
    profile: {
      role: "PhD Candidate",
      field: "Environmental Science",
      region: "UK/EU",
      stage: "Revision",
      turnaround: "5 days",
    },
    proof: {
      manuscript: "Results package",
      improved: "Units, legends, table clarity",
      delivered: "Revised tables/figures, reporting notes, QA pass",
    },
  },
];

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function TestimonialsSection() {
  const [filter, setFilter] = useState<FilterKey>("All");
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy share link");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sendState, setSendState] = useState<"idle" | "sent" | "invalid">("idle");
  const touchStartX = useRef<number | null>(null);

  const filteredStories = useMemo(() => {
    const needle = normalize(query);
    return STORIES.filter((story) => {
      if (filter !== "All" && story.category !== filter) return false;
      if (!needle) return true;
      const hay = normalize(
        [
          story.headline,
          story.quote,
          story.category,
          story.problem,
          story.fix,
          story.result,
          story.profile.role,
          story.profile.field,
          story.profile.region,
          story.profile.stage,
          story.profile.turnaround,
          story.proof.manuscript,
          story.proof.improved,
          story.proof.delivered,
        ].join(" "),
      );
      return hay.includes(needle);
    });
  }, [filter, query]);

  const shownStories = useMemo(() => filteredStories.slice(0, 6), [filteredStories]);
  const safeActiveIndex =
    shownStories.length === 0 ? 0 : Math.min(activeIndex, shownStories.length - 1);

  useEffect(() => {
    if (!isModalOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const activeStory = shownStories[safeActiveIndex] ?? null;

  function step(delta: number) {
    if (shownStories.length === 0) return;
    setActiveIndex((prev) => {
      const normalizedPrev = ((prev % shownStories.length) + shownStories.length) % shownStories.length;
      const nextIndex = (normalizedPrev + delta + shownStories.length) % shownStories.length;
      return nextIndex;
    });
  }

  async function copyLink() {
    if (!activeStory) return;
    const hash = `#story=${encodeURIComponent(activeStory.id)}`;
    const base = window.location.href.split("#")[0];
    const url = `${base}${hash}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopyLabel("Copied!");
    } catch {
      setCopyLabel("Copy failed");
    }

    window.setTimeout(() => setCopyLabel("Copy share link"), 1200);
  }

  function openModal() {
    if (!activeStory) return;
    setEmail("");
    setSendState("idle");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function sendSample() {
    if (!email.trim() || !email.includes("@")) {
      setSendState("invalid");
      return;
    }
    setSendState("sent");
  }

  function onTouchStart(event: React.TouchEvent<HTMLElement>) {
    if (event.touches.length !== 1) return;
    touchStartX.current = event.touches[0].clientX;
  }

  function onTouchEnd(event: React.TouchEvent<HTMLElement>) {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 50) return;
    step(delta < 0 ? 1 : -1);
  }

  return (
    <section
      id="sec-testimonials"
      className="py-8 md:py-10"
      style={{
        background:
          "radial-gradient(900px 500px at 10% -10%, rgba(168,199,230,.24), transparent 55%), radial-gradient(900px 500px at 90% 0%, rgba(63,127,114,.14), transparent 55%), linear-gradient(180deg, rgba(255,255,255,.98), rgba(233,227,213,.42))",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-2xl border border-[#A8C7E6]/60 bg-white shadow-[0_18px_60px_rgba(11,27,44,.10)]">
          <header className="flex flex-wrap items-start justify-between gap-4 px-6 pb-3 pt-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#2A2E35]/70">
                Testimonials
              </p>
              <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.02em] text-[#1F3A5F]">
                Filtered story gallery (mini case snapshots)
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#2A2E35]/80">
                Choose what you need help with. Pick a story. Review the snapshot. Request an anonymised
                sample if helpful. (Names anonymised; NDAs respected.)
              </p>
            </div>
          </header>

          <div className="border-t border-[#A8C7E6]/60 bg-[#A8C7E6]/12 px-4 pb-2 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-3 px-2">
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setFilter(item);
                      setActiveIndex(0);
                    }}
                    aria-pressed={filter === item}
                    className={`rounded-full border px-3 py-2 text-xs transition ${
                      filter === item
                        ? "border-[#3F7F72]/45 bg-[#3F7F72]/10 text-[#1F3A5F]"
                        : "border-[#A8C7E6]/60 bg-white text-[#2A2E35]/90"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-[#A8C7E6]/60 bg-white px-3 py-1 text-xs text-[#2A2E35]/70">
                  {filteredStories.length} {filteredStories.length === 1 ? "story" : "stories"}
                </span>
                <button
                  type="button"
                  onClick={() => setShowSearch((prev) => !prev)}
                  aria-expanded={showSearch}
                  className="inline-flex items-center gap-2 rounded-full border border-[#A8C7E6]/60 bg-white px-3 py-2 text-xs text-[#1F3A5F]"
                >
                  <Search className="h-4 w-4" aria-hidden />
                  Search
                </button>
              </div>
            </div>

            {showSearch ? (
              <div className="mt-3 flex flex-wrap items-center gap-2 px-2">
                <input
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setActiveIndex(0);
                  }}
                  placeholder="Search (e.g., similarity, methods, cover letter)"
                  className="h-10 flex-1 rounded-full border border-[#A8C7E6]/60 px-4 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="h-10 rounded-full border border-[#A8C7E6]/60 px-4 text-sm"
                >
                  Clear
                </button>
              </div>
            ) : null}
          </div>

          <div className="grid gap-4 px-5 pb-6 pt-4 lg:grid-cols-[1.35fr_.65fr]">
            <article
              className="rounded-2xl border border-[#A8C7E6]/60 bg-white shadow-lg"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="px-5 pb-4 pt-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {activeStory ? (
                      [
                        { label: `Problem: ${activeStory.problem}`, style: "teal" },
                        { label: `Fix: ${activeStory.fix}` },
                        { label: `Result: ${activeStory.result}` },
                      ].map((item) => (
                        <span
                          key={item.label}
                          className={`rounded-full border px-3 py-1 text-[11px] font-mono ${
                            item.style === "teal"
                              ? "border-[#3F7F72]/45 bg-[#3F7F72]/10 text-[#1F3A5F]"
                              : "border-[#A8C7E6]/60 bg-[#A8C7E6]/20 text-[#1F3A5F]"
                          }`}
                        >
                          {item.label}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#2A2E35]/80">No stories match.</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      className="grid h-10 w-10 place-items-center rounded-full border border-[#A8C7E6]/60 bg-white text-lg"
                      aria-label="Previous story"
                    >
                      {"<"}
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      className="grid h-10 w-10 place-items-center rounded-full border border-[#A8C7E6]/60 bg-white text-lg"
                      aria-label="Next story"
                    >
                      {">"}
                    </button>
                  </div>
                </div>

                <h3 className="mt-4 text-[18px] font-semibold text-[#1F3A5F]">
                  {activeStory ? activeStory.headline : "-"}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2A2E35]/80">
                  {activeStory ? `"${activeStory.quote}"` : "-"}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#2A2E35]/75">
                  {activeStory ? (
                    [
                      activeStory.profile.role,
                      activeStory.profile.field,
                      activeStory.profile.region,
                      activeStory.profile.stage,
                      `Turnaround: ${activeStory.profile.turnaround}`,
                    ].map((item, index) => (
                      <span key={item} className="flex items-center gap-2">
                        {index > 0 ? (
                          <span className="h-1 w-1 rounded-full bg-[#A8C7E6]/80" />
                        ) : null}
                        <span>{item}</span>
                      </span>
                    ))
                  ) : (
                    <span>-</span>
                  )}
                </div>

                <div className="mt-4 grid gap-2">
                  {activeStory ? (
                    [
                      { label: "Manuscript type", value: activeStory.proof.manuscript },
                      { label: "What improved", value: activeStory.proof.improved },
                      { label: "Support delivered", value: activeStory.proof.delivered },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex flex-wrap items-start justify-between gap-2 rounded-[16px] border border-dashed border-[#A8C7E6]/60 bg-[#A8C7E6]/12 px-4 py-3"
                      >
                        <b className="text-xs text-[#2A2E35]/90">{row.label}</b>
                        <span className="text-xs text-[#2A2E35]/75">{row.value}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-[#2A2E35]/80">No stories match your filter or search.</div>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#A8C7E6]/50 pt-3">
                  <button
                    type="button"
                    onClick={openModal}
                    className="inline-flex items-center gap-2 rounded-full bg-[#1F3A5F] px-4 py-2 text-xs font-semibold text-white shadow-[0_14px_28px_rgba(11,58,103,.22)]"
                  >
                    See anonymised sample
                    <span aria-hidden>{"->"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={copyLink}
                    className="inline-flex items-center gap-2 rounded-full border border-[#A8C7E6]/60 bg-[#A8C7E6]/20 px-4 py-2 text-xs font-semibold text-[#1F3A5F] hover:border-[#3F7F72]/45 hover:text-[#3F7F72]"
                  >
                    {copyLabel}
                  </button>
                  <div className="text-xs text-[#2A2E35]/70">Names anonymised. NDAs respected.</div>
                </div>
              </div>

              {shownStories.length > 1 ? (
                <div className="flex items-center justify-center gap-2 border-t border-[#A8C7E6]/50 bg-[#A8C7E6]/10 px-4 py-3">
                  {shownStories.map((story, index) => (
                    <button
                      key={story.id}
                      type="button"
                      aria-current={index === safeActiveIndex}
                      onClick={() => setActiveIndex(index)}
                      className={`h-2 w-2 rounded-full border ${
                        index === safeActiveIndex
                          ? "border-[#3F7F72]/45 bg-[#3F7F72]"
                          : "border-[#A8C7E6]/60 bg-[#A8C7E6]/35"
                      }`}
                    />
                  ))}
                </div>
              ) : null}
            </article>

            <aside className="overflow-hidden rounded-2xl border border-[#A8C7E6]/60 bg-white shadow-md">
              <div className="flex items-center justify-between gap-2 border-b border-[#A8C7E6]/50 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.12em] text-[#2A2E35]/70">Pick a story</p>
                <span className="rounded-full border border-[#A8C7E6]/60 bg-white px-3 py-1 text-xs text-[#2A2E35]/70">
                  {Math.min(filteredStories.length, 6)} shown
                </span>
              </div>
              <div className="max-h-[520px] overflow-auto">
                {shownStories.length > 0 ? (
                  shownStories.map((story, index) => (
                    <button
                      key={story.id}
                      type="button"
                      aria-current={index === safeActiveIndex}
                      onClick={() => setActiveIndex(index)}
                      className={`w-full border-b border-[rgba(11,27,44,.08)] px-4 py-3 text-left transition ${
                        index === safeActiveIndex
                          ? "bg-[#3F7F72]/10"
                          : "bg-white"
                      }`}
                    >
                      <p className="text-[13.5px] font-semibold text-[#2A2E35]">
                        {story.headline}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#2A2E35]/75">
                        <span className="rounded-full border border-[#3F7F72]/45 bg-[#3F7F72]/10 px-2 py-1 font-mono text-[11px] text-[#1F3A5F]">
                          {story.category}
                        </span>
                        <span>{story.profile.field}</span>
                        <span aria-hidden>•</span>
                        <span>{story.profile.region}</span>
                        <span aria-hidden>•</span>
                        <span className="rounded-full border border-[rgba(11,27,44,.12)] bg-[#A8C7E6]/20 px-2 py-1 font-mono text-[11px] text-[#2A2E35]/75">
                          {story.profile.stage}
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-4 text-sm text-[#2A2E35]/80">
                    No stories match your filter or search.
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>

      {isModalOpen && activeStory ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(42,46,53,.52)] p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Anonymised sample request"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="w-full max-w-[860px] overflow-hidden rounded-2xl border border-white/20 bg-white shadow-[0_26px_90px_rgba(0,0,0,.25)]">
            <div className="flex items-start justify-between gap-3 border-b border-[#A8C7E6]/60 bg-[linear-gradient(180deg,#ffffff,#A8C7E6)] px-5 py-4">
              <div>
                <p className="text-sm font-bold text-[#2A2E35]">
                  Anonymised sample - {activeStory.category}
                </p>
                <p className="mt-1 text-xs text-[#2A2E35]/70">{activeStory.headline}</p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-[#A8C7E6]/60 bg-white px-3 py-2 text-sm"
                aria-label="Close modal"
              >
                x
              </button>
            </div>
            <div className="grid gap-4 px-5 py-4 md:grid-cols-[1.05fr_.95fr]">
              <div className="rounded-xl border border-[#A8C7E6]/60 bg-[radial-gradient(900px_340px_at_10%_0%,rgba(168,199,230,.22),transparent_60%),linear-gradient(180deg,#fff,#ffffff)] p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-[#2A2E35]/70">
                  Snapshot preview
                </p>
                <div className="mt-3 grid gap-2">
                  {[
                    {
                      label: "Context",
                      value: `${activeStory.profile.role} - ${activeStory.profile.field} - ${activeStory.profile.region} - ${activeStory.profile.stage}`,
                    },
                    { label: "What improved", value: activeStory.proof.improved },
                    {
                      label: "What you receive",
                      value: "Tracked-change style example and formatting cues (anonymised).",
                    },
                    {
                      label: "Ethics note",
                      value: "Author-owned work. No ghostwriting. NDAs respected.",
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="rounded-[14px] border border-dashed border-[#A8C7E6]/60 bg-[#A8C7E6]/12 px-3 py-2"
                    >
                      <b className="block text-xs text-[#2A2E35]/90">{row.label}</b>
                      <span className="block text-xs text-[#2A2E35]/75">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[#A8C7E6]/60 bg-white p-4">
                <h4 className="text-sm font-bold">Request the sample</h4>
                <p className="mt-2 text-xs text-[#2A2E35]/70">
                  Receive a subject-appropriate anonymised sample showing formatting and tracked-change style.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email address"
                    className="h-10 flex-1 rounded-full border border-[#A8C7E6]/60 px-3 text-sm"
                  />
                  <button
                    type="button"
                    onClick={sendSample}
                    className="h-10 rounded-full bg-[#1F3A5F] px-4 text-xs font-semibold text-white"
                  >
                    {sendState === "sent" ? "Requested" : "Send sample"}
                  </button>
                </div>
                <p className="mt-3 text-[11.5px] text-[#2A2E35]/65">
                  {sendState === "invalid"
                    ? "Please enter a valid email address."
                    : sendState === "sent"
                      ? "Prototype: request captured. Connect this action to your lead workflow."
                      : "Prototype only: no emails are sent. Connect this action to your lead workflow."}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
