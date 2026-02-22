import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { PostsTable } from "@/components/admin/PostsTable";


export default async function PostsPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: { name: true, email: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <AdminLayout user={session.user}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
            <p className="text-gray-600 mt-1">
              Manage your blog posts and content
            </p>
          </div>
          <Link href="/admin/posts/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Posts</CardTitle>
            <CardDescription>
              A list of all blog posts in your system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PostsTable posts={posts} />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}