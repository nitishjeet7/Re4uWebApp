/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PublicPageContainer,
  PublicPageFrame,
} from "@/components/layout/PublicPageFrame";
import { PostMeta } from "@/components/post-meta";
import { TagPill } from "@/components/tag-pill";
import { getPostBySlug } from "@/lib/blog";
import { sanitizeContent } from "@/lib/sanitize";

export const revalidate = 60;

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const coverUrl = post.cover_image ?? null;
  const safeHtml = sanitizeContent(post.content ?? "");

  return (
    <PublicPageFrame>
      <PublicPageContainer>
        <section className="rounded-[24px] border border-[#d7e0ee] bg-white p-5 shadow-[0_14px_32px_rgba(11,18,32,.08)] sm:p-6">
          <Link
            href="/blog"
            className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#0b2d5c] hover:underline"
          >
            <span aria-hidden>&larr;</span>
            Back to RE Minds
          </Link>

          {coverUrl ? (
            <div className="mb-5 aspect-[21/9] w-full overflow-hidden rounded-[16px]">
              <img src={coverUrl} alt={post.title} className="h-full w-full object-cover" />
            </div>
          ) : null}

          <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-[#5a6980]">
            <PostMeta publishedAt={post.published_at} author={post.author} />
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[#0b1220] md:text-[40px]">
            {post.title}
          </h1>

          {post.excerpt ? (
            <p className="mt-3 text-[15px] leading-relaxed text-[#5a6980]">{post.excerpt}</p>
          ) : null}

          {post.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TagPill key={tag.id} tag={tag} />
              ))}
            </div>
          ) : null}

          <article
            className="rich-content mt-8 max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        </section>
      </PublicPageContainer>
    </PublicPageFrame>
  );
}


