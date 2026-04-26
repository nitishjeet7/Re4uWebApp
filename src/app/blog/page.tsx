import { ReMindsPage } from "@/components/sections/ReMindsPage";
import { getLatestPosts } from "@/lib/blog";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getLatestPosts(24);
  return <ReMindsPage posts={posts} />;
}
