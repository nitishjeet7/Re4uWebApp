import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { UserForm } from "@/components/admin/UserForm";

export default async function NewUserPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminLayout user={session.user}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create New User</h1>
          <p className="text-gray-600 mt-1">
            Add a new user to the system
          </p>
        </div>

        <UserForm />
      </div>
    </AdminLayout>
  );
}