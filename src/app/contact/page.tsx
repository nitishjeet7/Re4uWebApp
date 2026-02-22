import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MessageSquare, ShieldCheck } from "lucide-react";
import {
  PublicPageContainer,
  PublicPageFrame,
  PublicPageHero,
} from "@/components/layout/PublicPageFrame";
import { ContactForm } from "@/components/sections/ContactForm";
import { WHATSAPP_NUMBER_DISPLAY, WHATSAPP_URL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact - Researchedit4u",
  description: "Start an editing engagement or ask a question.",
};

type ContactPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const SERVICE_LABELS: Record<string, string> = {
  "service-overview": "Service Overview",
  "academic-presentation": "Academic Presentation",
  "editing-support": "Editing Support",
  "research-planning": "Research Planning",
  "data-services": "Data Services",
};

const NEED_LABELS: Record<string, string> = {
  defence: "Defence deck",
  proposal: "Thesis proposal / viva",
  poster: "Research poster",
  conference: "Conference deck",
};

const PLAN_LABELS: Record<string, string> = {
  "thesis-essentials": "Thesis PPT Essentials",
  "defence-deck-pro": "Defence Deck Pro",
  "poster-impact": "Poster Impact",
  "presentation-poster-bundle": "Presentation + Poster Bundle",
  "conference-pro": "Conference Deck Pro",
  "poster-suite": "Poster and Proposal Suite",
  "data-clarity-check": "Data Clarity Check",
  "analysis-reporting-pack": "Analysis and Reporting Pack",
  "committee-ready-review-pack": "Supervisor and Committee-Ready Review Pack",
};

function getParam(value?: string | string[]) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function humanizeSlug(value: string) {
  if (!value) return "";
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildMessage(params: Record<string, string | string[] | undefined>) {
  const needRaw = getParam(params.need).trim();
  const deadline = getParam(params.deadline).trim();
  const planRaw = getParam(params.plan).trim();
  const notes = getParam(params.notes).trim();
  const source = getParam(params.source).trim();

  const need = NEED_LABELS[needRaw] ?? humanizeSlug(needRaw);
  const plan = PLAN_LABELS[planRaw] ?? humanizeSlug(planRaw);

  const lines: string[] = [];
  if (need) lines.push(`Need: ${need}`);
  if (deadline) lines.push(`Deadline: ${deadline}`);
  if (plan) lines.push(`Plan: ${plan}`);
  if (source) lines.push(`Source: ${source}`);
  if (notes) lines.push(`Notes: ${notes}`);

  if (lines.length === 0) return "";
  return lines.join("\n");
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const initialName = getParam(resolvedParams.name).trim();
  const initialEmail = getParam(resolvedParams.email).trim();
  const serviceRaw = getParam(resolvedParams.service).trim();
  const initialService = SERVICE_LABELS[serviceRaw] ?? humanizeSlug(serviceRaw);
  const initialMessage = buildMessage(resolvedParams);
  const formKey = `${initialName}|${initialEmail}|${initialService}|${initialMessage}`;

  return (
    <PublicPageFrame>
      <PublicPageHero
        kicker="Contact"
        title="Share your manuscript details and get the right support plan."
        description="Tell us your stage, deadline, and publication goals. We respond with clear next steps, scope recommendations, and an ethical submission path."
      />

      <PublicPageContainer>
        <div className="grid gap-6 md:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4">
            <aside className="rounded-2xl border border-[#A8C7E6]/60 bg-white p-6 shadow-md transition duration-300 hover:shadow-xl">
              <h2 className="m-0 text-xl font-bold text-[#1F3A5F]">Contact channels</h2>
              <div className="mt-4 grid gap-3">
                <div className="flex items-start gap-3 rounded-2xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#A8C7E6]/60 bg-white">
                    <Mail className="h-5 w-5 text-[#1F3A5F]" />
                  </span>
                  <div>
                    <p className="m-0 text-sm font-semibold text-[#1F3A5F]">Email</p>
                    <Link
                      href="mailto:support@researchedit4u.in"
                      className="text-sm font-semibold text-[#1F3A5F] hover:underline"
                    >
                      support@researchedit4u.in
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#A8C7E6]/60 bg-white">
                    <MessageSquare className="h-5 w-5 text-[#3F7F72]" />
                  </span>
                  <div>
                    <p className="m-0 text-sm font-semibold text-[#1F3A5F]">WhatsApp support</p>
                    <Link
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#3F7F72] hover:underline"
                    >
                      Chat on {WHATSAPP_NUMBER_DISPLAY}
                    </Link>
                  </div>
                </div>
                <div
                  id="hours"
                  className="flex items-start gap-3 rounded-2xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-4"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#A8C7E6]/60 bg-white">
                    <Clock className="h-5 w-5 text-[#1F3A5F]" />
                  </span>
                  <div>
                    <p className="m-0 text-sm font-semibold text-[#1F3A5F]">Response time</p>
                    <p className="m-0 text-sm text-[#2A2E35]/75">
                      Mon-Sat - Replies within 1-2 business days
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <aside className="rounded-2xl border border-[#A8C7E6]/60 bg-white p-6 shadow-md transition duration-300 hover:shadow-xl">
              <h2 className="m-0 text-xl font-bold text-[#1F3A5F]">What to include</h2>
              <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-[#2A2E35]/75">
                <li>Current manuscript stage (draft, revision, rebuttal)</li>
                <li>Target journal or discipline (if known)</li>
                <li>Deadline and preferred turnaround</li>
                <li>Any reviewer comments or constraints</li>
              </ul>
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#A8C7E6]/60 bg-[#A8C7E6]/12 p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#A8C7E6]/60 bg-white">
                  <ShieldCheck className="h-5 w-5 text-[#1F3A5F]" />
                </span>
                <p className="m-0 text-sm text-[#2A2E35]/75">
                  We review all requests ethically. We do not guarantee acceptance or support
                  shortcuts.
                </p>
              </div>
            </aside>
          </div>

          <div className="rounded-2xl border border-[#A8C7E6]/60 bg-white p-6 shadow-md transition duration-300 hover:shadow-xl">
            <ContactForm
              key={formKey}
              initialName={initialName}
              initialEmail={initialEmail}
              initialService={initialService}
              initialMessage={initialMessage}
            />
          </div>
        </div>
      </PublicPageContainer>
    </PublicPageFrame>
  );
}
