import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { UserForm } from "@/components/admin/UserForm";
import { prisma } from "@/lib/db";


interface EditUserPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id } = await params;

  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      avatar: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  if (!user) {
    notFound();
  }

  return (
    <AdminLayout user={session.user}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit User</h1>
          <p className="text-gray-600 mt-1">
            Update user information and permissions
          </p>
        </div>

        <UserForm user={user} isEditing={true} />
      </div>
    </AdminLayout>
  );
}