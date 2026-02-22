"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { API_BASE } from "@/lib/api";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function FreeResourcesSection() {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Researcher");
  const [loading, setLoading] = useState(false);

  async function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const safeEmail = email.trim();
    if (!EMAIL_REGEX.test(safeEmail)) {
      addToast({
        title: "Invalid email",
        description: "Enter a valid email to receive the checklist.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: role,
          email: safeEmail,
          message:
            "Free resource request:\n- Resource: Rejection-proof submission checklist\n- Source: Homepage offers section",
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      addToast({
        title: "Checklist request received",
        description: "We will send the resource to your email shortly.",
      });
      setEmail("");
    } catch {
      addToast({
        title: "Request failed",
        description: "Please try again in a moment.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="sec-offers" className="py-8 md:py-12">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid gap-4 rounded-[22px] border border-[#d7e0ee] bg-white p-5 shadow-[0_12px_30px_rgba(11,18,32,.08)] md:grid-cols-[1.2fr_0.8fr] md:p-6">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#5a6980]">
              Free Resources
            </p>
            <h2 className="m-0 text-3xl font-bold leading-[1.12] tracking-[-0.02em] md:text-[34px]">
              Get the rejection-proof submission checklist.
            </h2>
            <p className="mt-2.5 max-w-[62ch] text-[15px] leading-relaxed text-[#5a6980]">
              A practical one-page guide to catch high-risk issues before submission: abstract clarity,
              similarity risk, methods reporting gaps, and file-readiness checks.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-[#d7e0ee] bg-[#eef3ff] px-2.5 py-1 text-[#0b2d5c]">
                5-minute pre-submit scan
              </span>
              <span className="rounded-full border border-[#d7e0ee] bg-[#eef3ff] px-2.5 py-1 text-[#0b2d5c]">
                COPE-aligned reminders
              </span>
              <span className="rounded-full border border-[#d7e0ee] bg-[#eef3ff] px-2.5 py-1 text-[#0b2d5c]">
                Author-friendly format
              </span>
            </div>
          </div>

          <form onSubmit={submitRequest} className="rounded-[16px] border border-[#d7e0ee] bg-[#f8fbff] p-4">
            <div className="grid gap-3">
              <div className="grid gap-2">
                <Label htmlFor="offers-email">Email</Label>
                <Input
                  id="offers-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@university.edu"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="offers-role">Current role</Label>
                <select
                  id="offers-role"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <option value="Researcher">Researcher</option>
                  <option value="PhD Scholar">PhD Scholar</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Clinician">Clinician</option>
                  <option value="Industry Scientist">Industry Scientist</option>
                </select>
              </div>
              <Button type="submit" disabled={loading} className="rounded-full bg-[#1d4ed8] text-white hover:bg-[#0b3c71]">
                {loading ? "Sending..." : "Send checklist"}
              </Button>
              <p className="m-0 text-xs text-[#5a6980]">
                Need a custom checklist?{" "}
                <Link href="/contact" className="font-bold text-[#0b2d5c] hover:underline">
                  Request a 1:1 review
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
