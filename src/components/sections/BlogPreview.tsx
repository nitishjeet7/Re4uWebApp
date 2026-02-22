import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type PostPreview = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  tags?: string[];
};

export function BlogPreview({ posts }: { posts: PostPreview[] }) {
  return (
    <section
      className="section-pad"
      style={{
        background:
          "radial-gradient(1100px 520px at 20% -10%, rgba(168,199,230,.25), transparent 60%), radial-gradient(900px 520px at 90% -10%, rgba(63,127,114,.14), transparent 55%), linear-gradient(180deg, rgba(255,255,255,.98), rgba(233,227,213,.45))",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2.5 text-xs uppercase tracking-[0.18em] text-[#2A2E35]/70">
              Resources
            </div>
            <h2 className="m-0 text-3xl font-bold leading-[1.12] tracking-[-0.02em] text-[#1F3A5F] md:text-[34px]">
              Insights & Guides
            </h2>
            <p className="mt-2.5 max-w-[560px] text-[15.5px] leading-relaxed text-[#2A2E35]/80">
              Practical resources on rejection, journal choice, and peer review.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-[#1F3A5F] hover:text-[#3F7F72] hover:underline"
          >
            View all
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden rounded-2xl border border-[#A8C7E6]/60 bg-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3F7F72]/40 hover:shadow-xl"
            >
              <CardContent className="p-5 sm:p-6">
                <h3 className="mb-2 line-clamp-2 text-lg font-bold text-[#1F3A5F] md:text-[18.5px]">
                  {post.title}
                </h3>
                <p className="mb-4 line-clamp-4 text-sm leading-relaxed text-[#2A2E35]/80">
                  {post.excerpt}
                </p>
                {(post.tags ?? []).length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {(post.tags ?? []).map((tag) => (
                      <Badge
                        key={tag}
                        className="rounded-full border border-[#A8C7E6]/60 bg-[#A8C7E6]/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1F3A5F]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-[#1F3A5F] transition-colors group-hover:text-[#3F7F72] group-hover:underline"
                >
                  Read more
                  <span>&rarr;</span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
