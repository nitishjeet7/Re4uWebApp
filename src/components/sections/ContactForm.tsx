"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { WHATSAPP_NUMBER_DISPLAY, WHATSAPP_URL } from "@/lib/contact";

const BASE_SERVICE_OPTIONS = [
  "Service Overview",
  "Editing Support",
  "Publication Support",
  "Data Services",
  "Research Planning",
  "Academic Presentation",
  "Other",
];

type ContactFormProps = {
  initialName?: string;
  initialEmail?: string;
  initialService?: string;
  initialMessage?: string;
};

export function ContactForm({
  initialName = "",
  initialEmail = "",
  initialService = "",
  initialMessage = "",
}: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const serviceOptions = useMemo(() => {
    const safeService = initialService.trim();
    if (!safeService) return BASE_SERVICE_OPTIONS;
    const exists = BASE_SERVICE_OPTIONS.some(
      (option) => option.toLowerCase() === safeService.toLowerCase()
    );
    if (exists) return BASE_SERVICE_OPTIONS;
    return [safeService, ...BASE_SERVICE_OPTIONS];
  }, [initialService]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const contactNumber = String(formData.get("contactNumber") ?? "").trim();
    const serviceRequirement = String(formData.get("serviceRequirement") ?? "").trim();
    const notes = String(formData.get("notes") ?? "").trim();

    if (!name || !email || !contactNumber || !serviceRequirement) {
      addToast({
        title: "Check your details",
        description: "Please complete all fields correctly.",
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addToast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
      });
      return;
    }
    const phoneRegex = /^[+]?[0-9\s()-]{8,20}$/;
    if (!phoneRegex.test(contactNumber)) {
      addToast({
        title: "Invalid contact number",
        description: "Please enter a valid phone or WhatsApp number.",
      });
      return;
    }

    setLoading(true);
    try {
      const lines = [
        "New Customer Service Request",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Contact number: ${contactNumber}`,
        `Service Requirement: ${serviceRequirement}`,
      ];
      if (notes) {
        lines.push("", `Notes: ${notes}`);
      }
      if (initialMessage) {
        lines.push("", initialMessage);
      }

      const whatsappMessage = lines.join("\n");
      const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(whatsappMessage)}`;
      const popup = window.open(whatsappHref, "_blank", "noopener,noreferrer");
      if (!popup) {
        window.location.href = whatsappHref;
      }

      addToast({
        title: "Opening WhatsApp",
        description: `Request prepared for ${WHATSAPP_NUMBER_DISPLAY}.`,
      });
      event.currentTarget.reset();
    } catch {
      addToast({
        title: "Could not open WhatsApp",
        description: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="name" className="text-sm font-semibold text-[#1F3A5F]">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Dr. Jane Doe"
          defaultValue={initialName}
          className="rounded-lg border-[#A8C7E6] focus-visible:border-[#3F7F72] focus-visible:ring-[#3F7F72]/35"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email" className="text-sm font-semibold text-[#1F3A5F]">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="jane@university.edu"
          defaultValue={initialEmail}
          className="rounded-lg border-[#A8C7E6] focus-visible:border-[#3F7F72] focus-visible:ring-[#3F7F72]/35"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contactNumber" className="text-sm font-semibold text-[#1F3A5F]">
          Contact number
        </Label>
        <Input
          id="contactNumber"
          name="contactNumber"
          type="tel"
          placeholder="+91 80937 78526"
          className="rounded-lg border-[#A8C7E6] focus-visible:border-[#3F7F72] focus-visible:ring-[#3F7F72]/35"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="serviceRequirement" className="text-sm font-semibold text-[#1F3A5F]">
          Service Requirement
        </Label>
        <select
          id="serviceRequirement"
          name="serviceRequirement"
          defaultValue={initialService.trim() || ""}
          className="h-11 rounded-lg border border-[#A8C7E6] bg-white px-3 text-sm text-[#1F3A5F] focus-visible:border-[#3F7F72] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3F7F72]/35"
          required
        >
          <option value="" disabled>
            Select service requirement
          </option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="notes" className="text-sm font-semibold text-[#1F3A5F]">Additional details (optional)</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Any extra context for your request."
          defaultValue={initialMessage}
          className="rounded-lg border-[#A8C7E6] focus-visible:border-[#3F7F72] focus-visible:ring-[#3F7F72]/35"
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-[#1F3A5F] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3F7F72] md:w-auto"
      >
        <MessageCircle className="mr-2 h-4 w-4" aria-hidden />
        {loading ? "Opening WhatsApp..." : "Send on WhatsApp"}
      </Button>
      <p className="text-xs text-[#2A2E35]/70">
        The request message is sent to WhatsApp number {WHATSAPP_NUMBER_DISPLAY}.
      </p>
    </form>
  );
}
