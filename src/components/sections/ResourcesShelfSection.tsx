"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

type ResourcePost = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featured_image?: string | null;
  tags?: string[];
};

type ResourceType = "Series" | "Standalone" | "Guide";

type FilterKey = "all" | "series" | "standalone" | "journal" | "ai" | "peer";

type ResourceItem = {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  coverImage: string | null;
  kind: ResourceType;
  readMeta: string;
  tags: string[];
  categories: FilterKey[];
};

const ALL_FILTERS: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "series", label: "Series" },
  { key: "standalone", label: "Standalone" },
  { key: "journal", label: "Journal choice" },
  { key: "ai", label: "AI & similarity" },
  { key: "peer", label: "Peer review" },
];

const FALLBACK_RESOURCES: ResourceItem[] = [
  {
    id: "r-01",
    title: "Abstracts that survive the editor skim.",
    excerpt:
      "A structure that makes purpose, method, and contribution obvious - fast.",
    href: "/blog",
    coverImage: null,
    kind: "Series",
    readMeta: "6 min | Checklist",
    tags: ["series", "abstract"],
    categories: ["series"],
  },
  {
    id: "r-02",
    title: "How to choose the right journal.",
    excerpt: "A simple way to shortlist safe, realistic targets for your paper.",
    href: "/blog",
    coverImage: null,
    kind: "Guide",
    readMeta: "7 min | Framework",
    tags: ["standalone"],
    categories: ["standalone"],
  },
  {
    id: "r-03",
    title: "Understanding plagiarism and AI flags.",
    excerpt:
      "What similarity scores mean and how policies are being interpreted.",
    href: "/blog",
    coverImage: null,
    kind: "Guide",
    readMeta: "8 min | Clarity",
    tags: ["standalone"],
    categories: ["standalone"],
  },
  {
    id: "r-04",
    title: "Reviewer responses without defensiveness.",
    excerpt:
      "A point-by-point style that keeps the editor on your side.",
    href: "/blog",
    coverImage: null,
    kind: "Series",
    readMeta: "7 min | Templates",
    tags: ["series"],
    categories: ["series"],
  },
];

function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

function inferKind(tags: string[], index: number): ResourceType {
  if (tags.some((tag) => tag.includes("series"))) return "Series";
  if (tags.some((tag) => tag.includes("guide"))) return "Guide";
  return index % 2 === 0 ? "Series" : "Standalone";
}

function inferCategories(
  tags: string[],
  title: string,
  excerpt: string,
  kind: ResourceType,
): FilterKey[] {
  const categories: FilterKey[] = [kind === "Series" ? "series" : "standalone"];

  void title;
  void excerpt;

  // Only trust explicit tags for topical filters.
  // (Do not infer from title/excerpt; that causes false positives when no such post exists.)
  const normalizedTags = tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean);
  const hasTagLike = (needle: string) =>
    normalizedTags.some((tag) => tag === needle || tag.includes(needle));

  if (hasTagLike("journal")) categories.push("journal");
  if (hasTagLike("ai") || hasTagLike("similarity") || hasTagLike("plagiarism")) {
    categories.push("ai");
  }
  if (hasTagLike("peer") || hasTagLike("reviewer") || hasTagLike("rebuttal")) {
    categories.push("peer");
  }
  return Array.from(new Set(categories));
}

function toResourceItems(posts: ResourcePost[]): ResourceItem[] {
  if (posts.length === 0) return FALLBACK_RESOURCES;

  return posts.slice(0, 8).map((post, index) => {
    const normalizedTags = (post.tags ?? []).map(normalizeText);
    const kind = inferKind(normalizedTags, index);
    const categories = inferCategories(normalizedTags, post.title, post.excerpt, kind);
    return {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      href: `/blog/${post.slug}`,
      coverImage: post.featured_image ?? null,
      kind,
      readMeta: `${6 + (index % 4)} min | ${kind === "Series" ? "Series" : "Guide"}`,
      tags: normalizedTags,
      categories,
    };
  });
}

function toCoverSrc(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path;
  }
  return `/${path}`;
}

export function ResourcesShelfSection({ posts }: { posts: ResourcePost[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");

  const resources = useMemo(() => toResourceItems(posts), [posts]);
  const filterOptions = ALL_FILTERS;

  const filtered = useMemo(() => {
    const safeQuery = normalizeText(query);
    return resources.filter((item) => {
      const passesFilter = filter === "all" || item.categories.includes(filter);
      if (!passesFilter) return false;
      if (!safeQuery) return true;
      const haystack = `${item.title} ${item.excerpt} ${item.tags.join(" ")}`.toLowerCase();
      return haystack.includes(safeQuery);
    });
  }, [resources, filter, query]);

  const seriesItems = filtered.filter((item) => item.kind === "Series").slice(0, 2);
  const standaloneItems = filtered
    .filter((item) => item.kind !== "Series")
    .slice(0, 2);

  return (
    <section id="sec-reminds" className="section-pad">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#2A2E35]/75">
              RE MINDS - GOOD READS
            </p>
            <h2 className="mt-2 text-[30px] font-bold leading-[1.12] tracking-[-0.02em] text-[#1F3A5F] md:text-[34px] lg:whitespace-nowrap">
              Resources to make every submission smarter.
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild className="rounded-full bg-[#1F3A5F] text-white hover:bg-[#3F7F72]">
                <Link href="/blog">Explore RE Minds</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-2xl border-[#A8C7E6]/60">
                <Link href="/blog">View all posts</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-[#A8C7E6]/60 bg-white/65 p-4 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setFilter(item.key)}
                  data-active={filter === item.key}
                    className={`rounded-full border px-3 py-1.5 text-xs font-extrabold transition ${
                    filter === item.key
                      ? "border-[#3F7F72]/40 bg-[#3F7F72]/10 text-[#1F3A5F] shadow-md"
                      : "border-[#A8C7E6]/60 text-[#2A2E35]/75"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <label className="flex flex-1 items-center gap-2 rounded-full border border-[#A8C7E6]/60 bg-white px-4 py-2 text-sm text-[#2A2E35] lg:max-w-[420px]">
              <Search className="h-4 w-4 text-[#2A2E35]/75" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search RE Minds (e.g., methods, abstract, reviewer response)"
                className="w-full border-0 bg-transparent text-sm text-[#2A2E35] outline-none"
              />
            </label>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 pb-1 sm:grid-cols-2 xl:grid-cols-4">
              {filtered.slice(0, 4).map((item) => {
                const coverSrc = toCoverSrc(item.coverImage);

                return (
                  <article
                    key={item.id}
                    className="flex h-full min-h-[240px] flex-col overflow-hidden rounded-2xl border border-[#A8C7E6]/60 bg-white shadow-md"
                  >
                    <div className="relative h-[120px] bg-[#1F3A5F]">
                      {coverSrc ? (
                        <img
                          src={coverSrc}
                          alt={item.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : null}
                      <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,.18)] bg-white/10 px-3 py-1 text-[11px] font-extrabold text-white/90">
                        <span className="h-2 w-2 rounded-full bg-[#3F7F72] shadow-[0_0_0_4px_rgba(63,127,114,.18)]" />
                        {item.kind}
                      </span>
                    </div>
                  <div className="px-4 pb-3 pt-3">
                    <h3
                      className="text-[17px] font-semibold text-[#2A2E35]"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="mt-2 text-sm text-[#2A2E35]/75"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-[#A8C7E6]/45 bg-[#A8C7E6]/15 px-4 py-3 text-xs text-[#2A2E35]/75">
                    <div className="flex flex-wrap gap-2">
                      <span>{item.readMeta}</span>
                      <span>{item.kind === "Series" ? "Checklist" : "Guide"}</span>
                    </div>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-2 text-xs font-extrabold text-[#1F3A5F]"
                    >
                      <span className="grid h-6 w-6 place-items-center rounded-full border border-[#A8C7E6]/60 bg-[#A8C7E6]/20">
                        {"->"}
                      </span>
                      Open
                    </Link>
                  </div>
                </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-3 rounded-xl border border-dashed border-[#A8C7E6]/60 bg-white/60 p-4 text-sm text-[#2A2E35]/75">
              No shelf cards match your filters. Try &quot;All&quot; or a shorter keyword.
            </div>
          )}

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-dashed border-[#A8C7E6]/60 bg-white/55 p-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#1F3A5F]">
                Series highlights
              </h4>
              <div className="mt-3 grid gap-2">
                {seriesItems.length > 0 ? (
                  seriesItems.map((item) => (
                    <div
                      key={`series-${item.id}`}
                      className="flex items-start justify-between gap-3 rounded-[16px] border border-[#A8C7E6]/60 bg-white px-3 py-2"
                    >
                      <div>
                        <strong className="block text-[14.5px] text-[#2A2E35]">{item.title}</strong>
                        <small className="text-xs text-[#2A2E35]/75">{item.excerpt}</small>
                      </div>
                      <Link href={item.href} className="text-xs font-extrabold text-[#1F3A5F]">
                        Open
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[16px] border border-[#A8C7E6]/60 bg-white px-3 py-2 text-xs text-[#2A2E35]/75">
                    No series posts match this filter yet.
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-[#A8C7E6]/60 bg-white/55 p-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#1F3A5F]">
                Standalone guides
              </h4>
              <div className="mt-3 grid gap-2">
                {standaloneItems.length > 0 ? (
                  standaloneItems.map((item) => (
                    <div
                      key={`standalone-${item.id}`}
                      className="flex items-start justify-between gap-3 rounded-[16px] border border-[#A8C7E6]/60 bg-white px-3 py-2"
                    >
                      <div>
                        <strong className="block text-[14.5px] text-[#2A2E35]">{item.title}</strong>
                        <small className="text-xs text-[#2A2E35]/75">{item.excerpt}</small>
                      </div>
                      <Link href={item.href} className="text-xs font-extrabold text-[#1F3A5F]">
                        Open
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[16px] border border-[#A8C7E6]/60 bg-white px-3 py-2 text-xs text-[#2A2E35]/75">
                    No standalone guides match this filter yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
