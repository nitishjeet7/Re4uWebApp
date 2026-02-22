import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Admin login",
  description: "Sign in to the admin area.",
  robots: "noindex, nofollow",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[rgba(215,223,236,0.95)] bg-white p-8 shadow-[0_16px_44px_rgba(20,35,45,0.08)]">
        <h1 className="text-xl font-semibold text-[#111827]">Admin Login</h1>
        <p className="mt-2 text-sm text-[#6b7280]">
          Sign in to access the admin dashboard and manage content.
        </p>
        <div className="mt-6">
          <LoginForm />
          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-[#0b3c71] hover:underline"
            >
              ← Back to site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
