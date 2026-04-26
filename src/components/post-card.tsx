import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Post } from "@/lib/types";
import { PostMeta } from "@/components/post-meta";
import { TagPill } from "@/components/tag-pill";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const coverUrl = post.cover_image ?? null;

  return (
    <Card className="group h-full overflow-hidden border-border/70 bg-card/80 transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        {coverUrl ? (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={coverUrl}
              alt={post.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : null}
        <CardContent className="space-y-3 p-5">
          <PostMeta publishedAt={post.published_at} author={post.author} />
          <h3 className="text-xl font-semibold leading-snug">{post.title}</h3>
          {post.excerpt ? (
            <p className="text-sm text-muted-foreground">{post.excerpt}</p>
          ) : null}
          {post.tags?.length ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.slice(0, 3).map((tag) => (
                <TagPill key={tag.id} tag={tag} />
              ))}
            </div>
          ) : null}
        </CardContent>
      </Link>
    </Card>
  );
}
