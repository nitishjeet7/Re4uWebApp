import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { PostForm } from "@/components/admin/PostForm";
import { prisma } from "@/lib/db";


export default async function NewPostPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const authors = await prisma.user.findMany({
    where: { isActive: true },
    select: { id: true, name: true, email: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminLayout user={session.user}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
          <p className="text-gray-600 mt-1">
            Write and publish a new blog post
          </p>
        </div>

        <PostForm authors={authors} />
      </div>
    </AdminLayout>
  );
}
