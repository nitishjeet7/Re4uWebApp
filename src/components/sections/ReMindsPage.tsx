"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import type { Post } from "@/lib/types";

type Mode = "stages" | "problems" | "downloads" | "latest";

type PostItem = {
  id: string;
  title: string;
  desc: string;
  format: "Series" | "Guide";
  readMin: number;
  stage: string;
  problem: string;
  type: string;
  author: string;
  downloads: number;
  href: string;
  publishedAt?: string | null;
  tags: string[];
};

type DownloadItem = {
  id: string;
  title: string;
  desc: string;
  category: string;
  downloads: number;
  filetype: string;
};

const STAGES = [
  "All Stages",
  "Idea",
  "Draft",
  "Journal Selection",
  "Submission",
  "Peer Review",
  "Acceptance",
];

const PROBLEMS = [
  "All Problems",
  "Desk Rejection",
  "Journal Choice Confusion",
  "Similarity / Plagiarism",
  "AI Policy & Disclosure",
  "Rebuttal / Reviewer Comments",
  "Formatting / Technical Checks",
  "Ethics / Authorship",
  "Clarity & Structure",
];

const DOWNLOADS_FILTERS = [
  "All Downloads",
  "Templates",
  "Checklists",
  "Webinars",
  "Toolkits",
];

const DOWNLOADS: DownloadItem[] = [
  {
    id: "d1",
    title: "Journal Selection Checklist (PDF)",
    desc: "Scope-fit, indexing, ethics and speed checks in one page.",
    category: "Checklists",
    downloads: 1820,
    filetype: "PDF",
  },
  {
    id: "d2",
    title: "Rebuttal Letter Template (DOCX)",
    desc: "Point-by-point structure with polite, editor-friendly wording.",
    category: "Templates",
    downloads: 2640,
    filetype: "DOCX",
  },
  {
    id: "d3",
    title: "Similarity Reduction Checklist (PDF)",
    desc: "Safe rewriting and citation hygiene steps.",
    category: "Checklists",
    downloads: 1490,
    filetype: "PDF",
  },
  {
    id: "d4",
    title: "Webinar: Surviving Peer Review (Replay)",
    desc: "How to respond to reviewers and reduce rework.",
    category: "Webinars",
    downloads: 980,
    filetype: "Replay",
  },
  {
    id: "d5",
    title: "Cover Letter Starter Pack (DOCX)",
    desc: "3 cover letter styles for different journals.",
    category: "Templates",
    downloads: 1210,
    filetype: "DOCX",
  },
  {
    id: "d6",
    title: "Ethics & Authorship Mini-Guide (PDF)",
    desc: "Authorship roles, acknowledgements, and approvals.",
    category: "Toolkits",
    downloads: 870,
    filetype: "PDF",
  },
];

const FALLBACK_POSTS: PostItem[] = [
  {
    id: "p1",
    title: "Abstracts that survive editor skim.",
    desc: "A fast structure to make purpose, method, and contribution clear.",
    format: "Series",
    readMin: 6,
    stage: "Draft",
    problem: "Clarity & Structure",
    type: "Checklist",
    author: "RE4U Editorial",
    downloads: 120,
    href: "/blog",
    tags: ["series", "abstract", "peer"],
  },
  {
    id: "p2",
    title: "How to choose the right journal (without wasting weeks).",
    desc: "A practical shortlist method: scope-fit, indexing, speed, and ethics checks.",
    format: "Guide",
    readMin: 7,
    stage: "Journal Selection",
    problem: "Journal Choice Confusion",
    type: "Framework",
    author: "RE4U Editorial",
    downloads: 210,
    href: "/blog",
    tags: ["guide", "journal"],
  },
  {
    id: "p3",
    title: "Similarity score explained (and what editors actually notice).",
    desc: "What similarity hint means, what is risky, and how to reduce it safely.",
    format: "Guide",
    readMin: 8,
    stage: "Submission",
    problem: "Similarity / Plagiarism",
    type: "Clarity",
    author: "RE4U Integrity Team",
    downloads: 180,
    href: "/blog",
    tags: ["guide", "ai"],
  },
  {
    id: "p4",
    title: "Rebuttal letters that do not sound defensive.",
    desc: "A point-by-point template that keeps the editor on your side.",
    format: "Series",
    readMin: 7,
    stage: "Peer Review",
    problem: "Rebuttal / Reviewer Comments",
    type: "Template",
    author: "RE4U Editorial",
    downloads: 340,
    href: "/blog",
    tags: ["series", "peer"],
  },
  {
    id: "p5",
    title: "Desk rejection: 6 common reasons and how to fix them.",
    desc: "Scope, novelty, structure, methods, and journal fit - simple checks.",
    format: "Guide",
    readMin: 6,
    stage: "Journal Selection",
    problem: "Desk Rejection",
    type: "Guide",
    author: "RE4U Editorial",
    downloads: 410,
    href: "/blog",
    tags: ["guide", "desk"],
  },
  {
    id: "p6",
    title: "AI disclosure: what to write and where (simple wording).",
    desc: "Disclosure patterns that match common publisher policies.",
    format: "Guide",
    readMin: 5,
    stage: "Submission",
    problem: "AI Policy & Disclosure",
    type: "Guide",
    author: "RE4U Integrity Team",
    downloads: 260,
    href: "/blog",
    tags: ["guide", "ai"],
  },
  {
    id: "p7",
    title: "Formatting and technical checks before submission.",
    desc: "Figures, references, files, and compliance checks to avoid delays.",
    format: "Guide",
    readMin: 5,
    stage: "Submission",
    problem: "Formatting / Technical Checks",
    type: "Checklist",
    author: "RE4U Editorial",
    downloads: 150,
    href: "/blog",
    tags: ["guide", "format"],
  },
  {
    id: "p8",
    title: "Authorship and acknowledgements: quick decision guide.",
    desc: "Prevent disputes by documenting contributions and approvals early.",
    format: "Guide",
    readMin: 6,
    stage: "Idea",
    problem: "Ethics / Authorship",
    type: "Checklist",
    author: "RE4U Integrity Team",
    downloads: 95,
    href: "/blog",
    tags: ["guide", "ethics"],
  },
];

const FORMAT_OPTIONS = ["All", "Series", "Guide"] as const;

type FormatFilter = (typeof FORMAT_OPTIONS)[number];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function inferFormat(tags: string[], index: number): "Series" | "Guide" {
  if (tags.some((tag) => tag.includes("series"))) return "Series";
  if (tags.some((tag) => tag.includes("guide"))) return "Guide";
  return index % 2 === 0 ? "Series" : "Guide";
}

function inferStage(title: string, excerpt: string, tags: string[]): string {
  const corpus = normalize(`${tags.join(" ")} ${title} ${excerpt}`);
  if (corpus.includes("acceptance")) return "Acceptance";
  if (corpus.includes("peer") || corpus.includes("review")) return "Peer Review";
  if (corpus.includes("submission") || corpus.includes("submit")) return "Submission";
  if (corpus.includes("journal")) return "Journal Selection";
  if (corpus.includes("draft")) return "Draft";
  if (corpus.includes("idea")) return "Idea";
  return "Draft";
}

function inferProblem(title: string, excerpt: string, tags: string[]): string {
  const corpus = normalize(`${tags.join(" ")} ${title} ${excerpt}`);
  if (corpus.includes("desk")) return "Desk Rejection";
  if (corpus.includes("journal")) return "Journal Choice Confusion";
  if (corpus.includes("similarity") || corpus.includes("plagiarism")) {
    return "Similarity / Plagiarism";
  }
  if (corpus.includes("ai") || corpus.includes("disclosure")) {
    return "AI Policy & Disclosure";
  }
  if (corpus.includes("rebuttal") || corpus.includes("reviewer")) {
    return "Rebuttal / Reviewer Comments";
  }
  if (corpus.includes("format") || corpus.includes("technical")) {
    return "Formatting / Technical Checks";
  }
  if (corpus.includes("ethics") || corpus.includes("authorship")) {
    return "Ethics / Authorship";
  }
  return "Clarity & Structure";
}

function inferType(tags: string[], title: string): string {
  const corpus = normalize(`${tags.join(" ")} ${title}`);
  if (corpus.includes("checklist")) return "Checklist";
  if (corpus.includes("template")) return "Template";
  if (corpus.includes("framework")) return "Framework";
  return "Guide";
}

function toPostItems(posts: Post[]): PostItem[] {
  if (!posts.length) return FALLBACK_POSTS;
  return posts.map((post, index) => {
    const tags = (post.tags ?? []).map((tag) => normalize(tag.name));
    const format = inferFormat(tags, index);
    const stage = inferStage(post.title, post.excerpt || "", tags);
    const problem = inferProblem(post.title, post.excerpt || "", tags);
    const type = inferType(tags, post.title);
    return {
      id: String(post.id),
      title: post.title,
      desc: post.excerpt || "Read more.",
      format,
      readMin: 5 + (index % 4),
      stage,
      problem,
      type,
      author: post.author?.name || "RE4U Editorial",
      downloads: 50 + index * 12,
      href: `/blog/${post.slug}`,
      publishedAt: post.published_at ?? null,
      tags,
    };
  });
}

export function ReMindsPage({ posts }: { posts: Post[] }) {
  const [mode, setMode] = useState<Mode>("stages");
  const [activeChip, setActiveChip] = useState("All Stages");
  const [query, setQuery] = useState("");
  const [formatFilter, setFormatFilter] = useState<FormatFilter>("All");
  const [checkForm, setCheckForm] = useState({ name: "", email: "", link: "" });
  const [checkMsg, setCheckMsg] = useState("");
  const [newsEmail, setNewsEmail] = useState("");
  const [newsMsg, setNewsMsg] = useState("");
  const [requestForm, setRequestForm] = useState({ type: "", email: "" });
  const [requestMsg, setRequestMsg] = useState("");

  const postItems = useMemo(() => toPostItems(posts), [posts]);

  const chips = useMemo(() => {
    if (mode === "stages") return STAGES;
    if (mode === "problems") return PROBLEMS;
    if (mode === "downloads") return DOWNLOADS_FILTERS;
    return ["All"];
  }, [mode]);

  const filteredPosts = useMemo(() => {
    const needle = normalize(query);
    let list = [...postItems];

    if (mode === "latest") {
      list.sort((a, b) => {
        const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return db - da;
      });
    }

    if (mode === "stages" && activeChip !== "All Stages") {
      list = list.filter((item) => item.stage === activeChip);
    }
    if (mode === "problems" && activeChip !== "All Problems") {
      list = list.filter((item) => item.problem === activeChip);
    }

    if (formatFilter !== "All") {
      list = list.filter((item) => item.format === formatFilter);
    }

    if (needle) {
      list = list.filter((item) => {
        const hay = normalize(
          `${item.title} ${item.desc} ${item.stage} ${item.problem} ${item.tags.join(" ")}`,
        );
        return hay.includes(needle);
      });
    }

    return list;
  }, [postItems, mode, activeChip, formatFilter, query]);

  const filteredDownloads = useMemo(() => {
    const needle = normalize(query);
    let list = [...DOWNLOADS];
    if (mode === "downloads" && activeChip !== "All Downloads") {
      list = list.filter((item) => item.category === activeChip);
    }
    if (needle) {
      list = list.filter((item) => normalize(JSON.stringify(item)).includes(needle));
    }
    return list.sort((a, b) => b.downloads - a.downloads);
  }, [mode, activeChip, query]);

  function setModeState(nextMode: Mode) {
    setMode(nextMode);
    if (nextMode === "stages") setActiveChip("All Stages");
    if (nextMode === "problems") setActiveChip("All Problems");
    if (nextMode === "downloads") setActiveChip("All Downloads");
    if (nextMode === "latest") setActiveChip("All");
  }

  function handleCheckSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const emailOk = checkForm.email.trim().includes("@");
    const linkOk = checkForm.link.trim().length > 5;
    if (!emailOk) {
      setCheckMsg("Please enter a valid email.");
      return;
    }
    if (!linkOk) {
      setCheckMsg("Please paste an upload link (Google Drive/Dropbox).");
      return;
    }
    setCheckMsg("Submitted. We will reply within 24-48 hrs.");
    setCheckForm({ name: "", email: "", link: "" });
  }

  function handleNewsSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newsEmail.trim().includes("@")) {
      setNewsMsg("Please enter a valid email.");
      return;
    }
    setNewsMsg("Subscribed successfully.");
    setNewsEmail("");
  }

  function handleRequestSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!requestForm.type) {
      setRequestMsg("Please select a request type.");
      return;
    }
    if (!requestForm.email.trim().includes("@")) {
      setRequestMsg("Please enter a valid email.");
      return;
    }
    setRequestMsg("Request sent. We will respond within 24-48 hrs.");
    setRequestForm({ type: "", email: "" });
  }

  const metaText = useMemo(() => {
    if (mode === "downloads") {
      const label = activeChip !== "All Downloads" ? ` - Category: ${activeChip}` : "";
      return `Showing ${filteredDownloads.length} downloads${label}`;
    }
    const label =
      mode === "stages" && activeChip !== "All Stages"
        ? ` - Stage: ${activeChip}`
        : mode === "problems" && activeChip !== "All Problems"
          ? ` - Problem: ${activeChip}`
          : "";
    const formatLabel = formatFilter !== "All" ? ` - ${formatFilter}` : "";
    return `Showing ${filteredPosts.length} posts${label}${formatLabel}`;
  }, [mode, activeChip, filteredDownloads.length, filteredPosts.length, formatFilter]);

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(1100px 560px at 10% 0%, rgba(168,199,230,.24), transparent 60%), radial-gradient(900px 520px at 90% 20%, rgba(31,58,95,.14), transparent 60%), radial-gradient(900px 520px at 40% 95%, rgba(31,58,95,.08), transparent 62%), linear-gradient(180deg, rgba(255,255,255,.98), rgba(233,227,213,.58))",
      }}
    >
      <section className="px-6 py-6 md:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-[rgba(42,46,53,.12)] bg-white/75 shadow-[0_14px_38px_rgba(42,46,53,.10)]">
            <div className="grid gap-4 p-4 lg:grid-cols-[1.35fr_.85fr]">
              <div className="rounded-2xl border border-[rgba(42,46,53,.10)] bg-white/80 p-4 shadow-[0_10px_20px_rgba(42,46,53,.06)]">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(42,46,53,.12)] bg-white/70 px-3 py-1 text-xs font-extrabold text-[rgba(42,46,53,.82)]">
                  <span className="h-2 w-2 rounded-full bg-[#1F3A5F]" />
                  PUBLICATION ROADMAP
                </div>
                <h1 className="mt-4 text-[30px] font-extrabold leading-[1.06] text-[#2A2E35] md:text-[34px]">
                  Your publication roadmap - from idea to acceptance.
                </h1>
                <p className="mt-2 text-sm font-semibold text-[rgba(42,46,53,.72)]">
                  Clear guides, templates, and problem-solvers for each step. Choose Stages, Problems,
                  or Downloads - then use chips to filter.
                </p>
                <div className="mt-3 rounded-xl border border-[rgba(42,46,53,.10)] bg-[rgba(233,227,213,.32)] p-3">
                  <Image
                    src="/presentation-hero.svg"
                    alt="Publication roadmap"
                    width={1200}
                    height={640}
                    className="h-auto w-full"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-[rgba(42,46,53,.10)] bg-white/80 p-4 shadow-[0_10px_20px_rgba(42,46,53,.06)]">
                <h3 className="text-lg font-semibold text-[#2A2E35]">Free Manuscript Check</h3>
                <ul className="mt-2 list-disc pl-5 text-sm font-semibold text-[rgba(42,46,53,.74)]">
                  <li>Clarity and structure feedback</li>
                  <li>Next-step suggestions</li>
                </ul>
                <form className="mt-3" onSubmit={handleCheckSubmit} noValidate>
                  <div className="mt-2">
                    <label className="text-xs font-extrabold text-[rgba(42,46,53,.72)]">
                      Name (optional)
                    </label>
                    <input
                      className="mt-1 w-full rounded-full border border-[rgba(42,46,53,.14)] bg-white px-4 py-2 text-sm"
                      value={checkForm.name}
                      onChange={(event) => setCheckForm({ ...checkForm, name: event.target.value })}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="mt-3">
                    <label className="text-xs font-extrabold text-[rgba(42,46,53,.72)]">
                      Email (required)
                    </label>
                    <input
                      className="mt-1 w-full rounded-full border border-[rgba(42,46,53,.14)] bg-white px-4 py-2 text-sm"
                      type="email"
                      value={checkForm.email}
                      onChange={(event) => setCheckForm({ ...checkForm, email: event.target.value })}
                      placeholder="name@email.com"
                      required
                    />
                  </div>
                  <div className="mt-3">
                    <label className="text-xs font-extrabold text-[rgba(42,46,53,.72)]">
                      Upload manuscript / paste link (required)
                    </label>
                    <input
                      className="mt-1 w-full rounded-full border border-[rgba(42,46,53,.14)] bg-white px-4 py-2 text-sm"
                      value={checkForm.link}
                      onChange={(event) => setCheckForm({ ...checkForm, link: event.target.value })}
                      placeholder="Paste Google Drive / Dropbox link"
                      required
                    />
                  </div>
                  <div className="mt-3 text-xs font-semibold text-[rgba(42,46,53,.62)]">
                    Confidential - No spam - You will get a reply within 24-48 hrs
                  </div>
                  <button
                    type="submit"
                    className="mt-3 rounded-full bg-[#1F3A5F] px-4 py-2 text-sm font-extrabold text-white shadow-[0_14px_22px_rgba(31,58,95,.20)] transition hover:bg-[#3F7F72]"
                  >
                    Get Free Check
                  </button>
                  {checkMsg ? (
                    <div className="mt-2 text-xs font-extrabold text-[rgba(42,46,53,.78)]">
                      {checkMsg}
                    </div>
                  ) : null}
                </form>
              </div>
            </div>

            <div className="px-4 pb-4">
              <div className="grid gap-3 md:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setModeState("stages")}
                  className={`rounded-xl border px-3 py-3 text-sm font-extrabold transition ${
                    mode === "stages"
                      ? "border-[rgba(31,58,95,.34)] bg-[rgba(31,58,95,.10)] text-[#1F3A5F]"
                      : "border-[rgba(42,46,53,.12)] bg-white/85 text-[#2A2E35]"
                  }`}
                >
                  Read by Stages
                </button>
                <button
                  type="button"
                  onClick={() => setModeState("problems")}
                  className={`rounded-xl border px-3 py-3 text-sm font-extrabold transition ${
                    mode === "problems"
                      ? "border-[rgba(31,58,95,.34)] bg-[rgba(31,58,95,.10)] text-[#1F3A5F]"
                      : "border-[rgba(42,46,53,.12)] bg-white/85 text-[#2A2E35]"
                  }`}
                >
                  Solve a Problem
                </button>
                <button
                  type="button"
                  onClick={() => setModeState("downloads")}
                  className={`rounded-xl border px-3 py-3 text-sm font-extrabold transition ${
                    mode === "downloads"
                      ? "border-[rgba(31,58,95,.34)] bg-[rgba(31,58,95,.10)] text-[#1F3A5F]"
                      : "border-[rgba(42,46,53,.12)] bg-white/85 text-[#2A2E35]"
                  }`}
                >
                  Download Templates
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-[rgba(42,46,53,.10)] px-4 py-4">
              <div className="flex flex-1 gap-2 overflow-auto">
                {chips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setActiveChip(chip)}
                    className={`rounded-full border px-3 py-2 text-xs font-extrabold transition ${
                      chip === activeChip
                        ? "border-[rgba(31,58,95,.36)] text-[#1F3A5F] shadow-[0_0_0_5px_rgba(31,58,95,.10)]"
                        : "border-[rgba(42,46,53,.14)] text-[#2A2E35]"
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 rounded-full border border-[rgba(42,46,53,.14)] bg-white/85 px-3 py-2 text-sm">
                  <Search className="h-4 w-4 text-[rgba(42,46,53,.70)]" aria-hidden />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search (e.g., desk reject, rebuttal, journal)"
                    className="w-[240px] max-w-[55vw] border-0 bg-transparent text-sm text-[rgba(42,46,53,.86)] outline-none"
                  />
                </div>
                {mode !== "downloads" ? (
                  <select
                    value={formatFilter}
                    onChange={(event) => setFormatFilter(event.target.value as FormatFilter)}
                    className="rounded-full border border-[rgba(42,46,53,.14)] bg-white/85 px-3 py-2 text-xs font-extrabold text-[rgba(42,46,53,.78)]"
                  >
                    {FORMAT_OPTIONS.map((item) => (
                      <option key={item} value={item}>
                        Format: {item}
                      </option>
                    ))}
                  </select>
                ) : null}
                <button
                  type="button"
                  onClick={() => setModeState("latest")}
                  className={`rounded-full border px-3 py-2 text-xs font-extrabold transition ${
                    mode === "latest"
                      ? "border-[rgba(31,58,95,.36)] bg-[rgba(31,58,95,.10)] text-[#1F3A5F]"
                      : "border-[rgba(42,46,53,.14)] bg-white/85 text-[#2A2E35]"
                  }`}
                >
                  Latest
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 text-xs font-semibold text-[rgba(42,46,53,.68)]">{metaText}</div>
            {mode === "downloads" ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredDownloads.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-[rgba(42,46,53,.12)] bg-white shadow-[0_12px_22px_rgba(42,46,53,.07)]"
                  >
                    <div className="h-[104px] rounded-t-[20px] bg-[rgba(42,46,53,.04)]" />
                    <div className="p-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(42,46,53,.12)] bg-white/70 px-2.5 py-1 text-xs font-extrabold text-[rgba(42,46,53,.80)]">
                        <span className="h-2 w-2 rounded-full bg-[#1F3A5F]" />
                        {item.category}
                      </span>
                      <h3 className="mt-2 text-sm font-extrabold text-[#2A2E35]">{item.title}</h3>
                      <p className="mt-1 text-xs text-[rgba(42,46,53,.70)]">{item.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full border border-[rgba(42,46,53,.12)] bg-white/70 px-2 py-1 text-[11px] font-extrabold text-[rgba(42,46,53,.70)]">
                          {item.filetype}
                        </span>
                        <span className="rounded-full border border-[rgba(42,46,53,.12)] bg-white/70 px-2 py-1 text-[11px] font-extrabold text-[rgba(42,46,53,.70)]">
                          {item.downloads.toLocaleString()} downloads
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs font-extrabold text-[rgba(42,46,53,.70)]">
                        <span>Popular</span>
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 text-[#1F3A5F]"
                        >
                          <span className="grid h-7 w-7 place-items-center rounded-xl border border-[rgba(42,46,53,.12)] bg-white/80">
                            {"->"}
                          </span>
                          Download
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPosts.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-[rgba(42,46,53,.12)] bg-white shadow-[0_12px_22px_rgba(42,46,53,.07)]"
                  >
                    <div className="h-[104px] rounded-t-[20px] bg-[rgba(42,46,53,.04)]" />
                    <div className="p-3">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border border-[rgba(42,46,53,.12)] bg-white/70 px-2.5 py-1 text-xs font-extrabold text-[rgba(42,46,53,.80)] ${
                          item.format === "Series" ? "" : ""
                        }`}
                      >
                        <span className="h-2 w-2 rounded-full bg-[#1F3A5F]" />
                        {item.format}
                      </span>
                      <h3 className="mt-2 text-sm font-extrabold text-[#2A2E35]">{item.title}</h3>
                      <p className="mt-1 text-xs text-[rgba(42,46,53,.70)]">{item.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full border border-[rgba(42,46,53,.12)] bg-white/70 px-2 py-1 text-[11px] font-extrabold text-[rgba(42,46,53,.70)]">
                          {item.stage}
                        </span>
                        <span className="rounded-full border border-[rgba(42,46,53,.12)] bg-white/70 px-2 py-1 text-[11px] font-extrabold text-[rgba(42,46,53,.70)]">
                          {item.problem}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs font-extrabold text-[rgba(42,46,53,.70)]">
                        <span>
                          {item.readMin} min - {item.type}
                        </span>
                        <Link href={item.href} className="inline-flex items-center gap-2 text-[#1F3A5F]">
                          <span className="grid h-7 w-7 place-items-center rounded-xl border border-[rgba(42,46,53,.12)] bg-white/80">
                            {"->"}
                          </span>
                          Open
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
          <form
            className="rounded-2xl border border-[rgba(42,46,53,.12)] bg-white/85 p-5 shadow-[0_14px_38px_rgba(42,46,53,.10)]"
            onSubmit={handleNewsSubmit}
            noValidate
          >
            <h3 className="text-lg font-extrabold text-[#2A2E35]">Stay updated</h3>
            <p className="mt-2 text-sm font-semibold text-[rgba(42,46,53,.70)]">
              Publishing rules, reviews and templates - no spam.
            </p>
            <input
              type="email"
              value={newsEmail}
              onChange={(event) => setNewsEmail(event.target.value)}
              placeholder="Your email"
              className="mt-3 w-full rounded-full border border-[rgba(42,46,53,.12)] bg-white px-4 py-2 text-sm"
            />
            <button
              type="submit"
              className="mt-3 rounded-full bg-[#1F3A5F] px-4 py-2 text-sm font-extrabold text-white transition hover:bg-[#3F7F72]"
            >
              Subscribe
            </button>
            {newsMsg ? (
              <small className="mt-3 block text-xs font-extrabold text-[rgba(42,46,53,.72)]">
                {newsMsg}
              </small>
            ) : null}
          </form>

          <form
            className="rounded-2xl border border-[rgba(42,46,53,.12)] bg-white/85 p-5 shadow-[0_14px_38px_rgba(42,46,53,.10)]"
            onSubmit={handleRequestSubmit}
            noValidate
          >
            <h3 className="text-lg font-extrabold text-[#2A2E35]">Cannot find what you need?</h3>
            <p className="mt-2 text-sm font-semibold text-[rgba(42,46,53,.70)]">
              Request a webinar, template, or guide.
            </p>
            <select
              value={requestForm.type}
              onChange={(event) => setRequestForm({ ...requestForm, type: event.target.value })}
              className="mt-3 w-full rounded-full border border-[rgba(42,46,53,.12)] bg-white px-4 py-2 text-sm"
            >
              <option value="">Select request type</option>
              <option>Request a Webinar</option>
              <option>Request a Template</option>
              <option>Request a Guide</option>
            </select>
            <input
              type="email"
              value={requestForm.email}
              onChange={(event) => setRequestForm({ ...requestForm, email: event.target.value })}
              placeholder="Your email"
              className="mt-3 w-full rounded-full border border-[rgba(42,46,53,.12)] bg-white px-4 py-2 text-sm"
            />
            <button
              type="submit"
              className="mt-3 rounded-full bg-[#1F3A5F] px-4 py-2 text-sm font-extrabold text-white transition hover:bg-[#3F7F72]"
            >
              Send request
            </button>
            {requestMsg ? (
              <small className="mt-3 block text-xs font-extrabold text-[rgba(42,46,53,.72)]">
                {requestMsg}
              </small>
            ) : null}
          </form>
        </div>
      </section>
    </div>
  );
}
