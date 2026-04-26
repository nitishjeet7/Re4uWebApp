import { getLatestPosts } from "@/lib/blog";

export type PublishedPost = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featured_image: string | null;
  tags?: string[];
};

export async function getPublishedPosts(limit = 10): Promise<PublishedPost[]> {
  const posts = await getLatestPosts(limit);
  return posts.map((post) => ({
    id: String(post.id),
    title: post.title,
    excerpt: post.excerpt ?? "",
    slug: post.slug,
    featured_image: post.cover_image ?? null,
    tags: post.tags?.map((t) => t.name),
  }));
}
