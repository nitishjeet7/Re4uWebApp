import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus } from "lucide-react";
import { UsersTable } from "@/components/admin/UsersTable";


export default async function UsersPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: { posts: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <AdminLayout user={session.user}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users</h1>
            <p className="text-gray-600 mt-1">
              Manage user accounts and permissions
            </p>
          </div>
          <Link href="/admin/users/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New User
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              A list of all users in your system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UsersTable users={users} />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}