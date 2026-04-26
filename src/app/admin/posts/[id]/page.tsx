import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PostForm } from "@/components/admin/PostForm";
import { prisma } from "@/lib/db";


interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id: postId } = await params;

  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  if (!postId) {
    notFound();
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: { name: true, email: true }
      }
    }
  });

  const authors = await prisma.user.findMany({
    where: { isActive: true },
    select: { id: true, name: true, email: true },
    orderBy: { createdAt: "desc" },
  });

  if (!post) {
    notFound();
  }

  return (
    <AdminLayout user={session.user}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
          <p className="text-gray-600 mt-1">
            Update your blog post content and settings
          </p>
        </div>

        <PostForm post={post} isEditing={true} authors={authors} />
      </div>
    </AdminLayout>
  );
}
