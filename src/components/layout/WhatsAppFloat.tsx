"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";

export function WhatsAppFloat() {
  return (
    <Link
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#1cae55] bg-[#25D366] text-white shadow-[0_14px_28px_rgba(26,141,72,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#20bf5f] md:bottom-6 md:right-6 md:h-14 md:w-14"
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom))",
        right: "max(1rem, env(safe-area-inset-right))",
      }}
      title="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 md:h-7 md:w-7" aria-hidden />
    </Link>
  );
}
