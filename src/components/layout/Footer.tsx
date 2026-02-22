"use client";

import { useState, type SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LOGO_MAIN_SRC } from "@/lib/branding";
import { WHATSAPP_URL } from "@/lib/contact";
import { Mail, ArrowUp, MessageCircle, Instagram, Linkedin, Twitter } from "lucide-react";

function QuoraIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8.2c-1.95 0-3.2 1.35-3.2 3.8 0 2.35 1.22 3.8 3.2 3.8s3.2-1.45 3.2-3.8c0-2.45-1.25-3.8-3.2-3.8Z" />
      <path d="M14.2 14.1 17.2 17.1" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "WhatsApp", href: WHATSAPP_URL, Icon: MessageCircle },
  { label: "Instagram", href: "https://www.instagram.com/re4u_research?igsh=dWVxNmU1ZTU4ZHM5", Icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/research-edit4u-61711a3a7/", Icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com/researchedit4u", Icon: Twitter },
  { label: "Quora", href: "https://www.quora.com/profile/Research-Edit4u", Icon: QuoraIcon },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setShowToast(true);
      setEmail("");
      setTimeout(() => setShowToast(false), 2200);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-auto w-full">
      <footer
        className="relative overflow-hidden border-t border-[#cfdaeb] bg-white text-[#2A2E35]"
        aria-label="Footer"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(900px_220px_at_15%_-40%,rgba(47,85,143,0.18),transparent_60%),radial-gradient(900px_220px_at_85%_-40%,rgba(47,85,143,0.12),transparent_60%)]" />
        <div
          id="newsletter"
          className="relative border-b border-[#d7e0ee] bg-[linear-gradient(180deg,rgba(47,85,143,0.08),rgba(255,255,255,0.86))]"
        >
          <div className="mx-auto grid w-full max-w-[98rem] grid-cols-1 items-center gap-5 px-4 py-6 sm:px-6 sm:py-7 md:grid-cols-[1.35fr_.95fr] lg:px-8">
            <div>
              <h3 className="m-0 text-lg font-semibold text-[#1d2f4d] lg:whitespace-nowrap">Share what you&apos;re working on - get next-step options in 1 working day.</h3>
              <p className="mb-0 mt-2 text-sm leading-[1.7] text-[#3b4c67]">
                Get practical resources on rejection, journal choice, and peer review. No spam.
              </p>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 sm:gap-2.5 md:justify-end">
                <label htmlFor="footer-email" className="sr-only">Email for updates and resources</label>
                <div className="flex w-full min-w-0 items-center gap-2 rounded-2xl border border-[#c6d3e8] bg-white px-3 py-2.5 sm:gap-2.5 sm:px-3.5 sm:py-3 md:w-auto md:flex-[0_1_360px]">
                  <Mail className="h-4 w-4 flex-shrink-0 text-[#2f558f] sm:h-[18px] sm:w-[18px]" aria-hidden />
                  <Input
                    id="footer-email"
                    name="email"
                    type="email"
                    placeholder="Email for updates & resources"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-auto w-full border-0 bg-transparent p-0 text-sm text-[#1d2f4d] placeholder:text-[#647792]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-2xl border border-[#2f558f] bg-[#2f558f] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(46,83,142,0.24)] hover:border-[#1d2f4d] hover:bg-[#1d2f4d] sm:w-auto whitespace-nowrap"
                >
                  Notify me
                </Button>
                <div className="w-full text-xs text-[#5f7190] md:pr-1.5 md:text-right">
                  Unsubscribe anytime - Privacy-respectful
                </div>
                {showToast && (
                  <div className="mt-2 w-full text-sm font-bold text-[#2f558f]">
                    Thanks - you&apos;re subscribed.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-[98rem] grid-cols-1 gap-7 px-4 pb-6 pt-7 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8 lg:py-8">
          <div>
            <Link href="/" className="mb-4 inline-flex items-center">
              <Image
                src={LOGO_MAIN_SRC}
                alt="Researchedit4u logo"
                width={156}
                height={46}
                className="h-10 w-auto"
              />
            </Link>
            <h4 className="m-0 mb-3 text-sm uppercase tracking-[0.12em] text-[#2f558f]">About / Trust</h4>
            <p className="m-0 text-sm leading-[1.7] text-[#3b4c67]">
              Specialised academic support for researchers, universities, and R&D teams - with ethics-first editorial and publication strategy.
            </p>
            <div className="mt-3 flex flex-col gap-2.5">
              <Link href="#ethical-policy" className="text-sm font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">
                Ethical support policy
              </Link>
              <Link href="#confidentiality-policy" className="text-sm font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">
                Confidentiality
              </Link>
              <Link href="#no-ghostwriting" className="text-sm font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">
                No-ghostwriting policy
              </Link>
              <Link href="/careers" className="text-sm font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">
                Careers
              </Link>
            </div>
          </div>
          <div>
            <h4 className="m-0 mb-3 text-sm uppercase tracking-[0.12em] text-[#2f558f]">Services</h4>
            <div className="mt-3 flex flex-col gap-2.5">
              <Link href="/services" className="text-sm font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">
                Editorial Support
              </Link>
              <Link href="/services" className="text-sm font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">
                Data & Statistics
              </Link>
              <Link href="/services" className="text-sm font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">
                Journal Selection & Submission
              </Link>
              <Link href="/services" className="text-sm font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">
                Quick Offers
              </Link>
            </div>
          </div>
          <div>
            <h4 className="m-0 mb-3 text-sm uppercase tracking-[0.12em] text-[#2f558f]">Resources (RE Minds)</h4>
            <div className="mt-3 flex flex-col gap-2.5">
              <Link href="/blog" className="text-sm font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">
                Desk rejection series
              </Link>
              <Link href="/blog" className="text-sm font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">
                Journal selection guide
              </Link>
              <Link href="/blog" className="text-sm font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">
                AI & similarity explained
              </Link>
            </div>
          </div>
          <div>
            <h4 className="m-0 mb-3 text-sm uppercase tracking-[0.12em] text-[#2f558f]">Contact</h4>
            <div className="mt-3 flex flex-col gap-2.5">
              <Link href="mailto:support@researchedit4u.in" className="text-sm font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">
                support@researchedit4u.in
              </Link>
              <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">
                WhatsApp (quick response)
              </Link>
              <Link href="https://www.instagram.com/re4u_research?igsh=dWVxNmU1ZTU4ZHM5" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">
                Instagram (@re4u_research)
              </Link>
              <Link href="#hours" className="text-sm font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">
                Hours: Mon-Sat
              </Link>
              <Link href="/contact" className="text-sm font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">
                Book 1:1 Expert Call
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[#d7e0ee] bg-white">
          <div className="mx-auto flex w-full max-w-[98rem] flex-col gap-3 px-4 py-5 text-sm text-[#3b4c67] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <div>(c) {currentYear} ResearchEdit4U</div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="#terms" className="font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">Terms</Link>
              <Link href="#privacy" className="font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">Privacy</Link>
              <Link href="#cookies" className="font-semibold text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline">Cookies</Link>
              <Link
                href="/admin/login"
                className="text-[#2f558f] no-underline hover:text-[#1d2f4d] hover:underline"
                aria-label="Admin login"
              >
                Admin
              </Link>
            </div>
            <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#2f558f]/70 bg-[#2f558f] text-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1d2f4d] hover:bg-[#1d2f4d] hover:text-white"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </Link>
              ))}
              <Link
                href="#top"
                aria-label="Back to top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 rounded-2xl border border-[#2f558f] bg-[#2f558f] px-4 py-2.5 font-semibold text-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1d2f4d] hover:bg-[#1d2f4d] hover:shadow-[0_10px_22px_rgba(46,83,142,0.24)]"
              >
                Back to top
                <ArrowUp className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

