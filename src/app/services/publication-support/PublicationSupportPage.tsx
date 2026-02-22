"use client";
import React from "react";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

const WHATSAPP_NUMBER = "918093778526";
const EMAIL_TO = "";

const sceneSvg = String.raw`<svg viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs>
    <linearGradient id="desk" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#1F3A5F"/>
      <stop offset="1" stop-color="#2A2E35"/>
    </linearGradient>
    <linearGradient id="screen" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#1F3A5F"/>
      <stop offset="1" stop-color="#2A2E35"/>
    </linearGradient>
    <linearGradient id="paper" x1="0" x2="1">
      <stop offset="0" stop-color="#E9E3D5"/>
      <stop offset="1" stop-color="#A8C7E6"/>
    </linearGradient>
    <linearGradient id="shadow" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#000" stop-opacity="0.0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.35"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10"/>
    </filter>
    <filter id="soft2" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>

  <rect width="1200" height="760" fill="url(#desk)"/>

  <circle cx="220" cy="120" r="140" fill="#E9E3D5" opacity="0.18" filter="url(#soft2)"/>
  <circle cx="220" cy="120" r="80" fill="#E9E3D5" opacity="0.12" filter="url(#soft)"/>

  <path d="M250 520h700c22 0 40 18 40 40v40H210v-40c0-22 18-40 40-40Z" fill="#2A2E35" opacity="0.95"/>
  <path d="M235 600h730c18 0 35 13 40 30l10 40H185l10-40c5-17 22-30 40-30Z" fill="#2A2E35" opacity="0.95"/>
  <rect x="520" y="615" width="160" height="18" rx="9" fill="#1F3A5F" opacity="0.8"/>

  <rect x="300" y="150" width="600" height="380" rx="28" fill="#2A2E35" opacity="0.9"/>
  <rect x="320" y="170" width="560" height="340" rx="22" fill="url(#screen)" opacity="0.95"/>

  <rect x="350" y="205" width="260" height="18" rx="9" fill="#ffffff" opacity="0.10"/>
  <rect x="350" y="240" width="420" height="10" rx="5" fill="#ffffff" opacity="0.08"/>
  <rect x="350" y="262" width="380" height="10" rx="5" fill="#ffffff" opacity="0.08"/>
  <rect x="350" y="284" width="440" height="10" rx="5" fill="#ffffff" opacity="0.08"/>
  <rect x="350" y="330" width="500" height="120" rx="16" fill="#ffffff" opacity="0.06"/>
  <rect x="370" y="354" width="220" height="10" rx="5" fill="#ffffff" opacity="0.08"/>
  <rect x="370" y="376" width="420" height="10" rx="5" fill="#ffffff" opacity="0.08"/>
  <rect x="370" y="398" width="380" height="10" rx="5" fill="#ffffff" opacity="0.08"/>

  <g transform="translate(120,520) rotate(-10)">
    <rect x="0" y="0" width="320" height="210" rx="18" fill="url(#paper)" opacity="0.92"/>
    <rect x="26" y="30" width="210" height="10" rx="5" fill="#2A2E35" opacity="0.18"/>
    <rect x="26" y="55" width="260" height="8" rx="4" fill="#2A2E35" opacity="0.12"/>
    <rect x="26" y="74" width="230" height="8" rx="4" fill="#2A2E35" opacity="0.12"/>
    <rect x="26" y="93" width="250" height="8" rx="4" fill="#2A2E35" opacity="0.12"/>
    <rect x="26" y="130" width="160" height="26" rx="13" fill="#A8C7E6" opacity="0.20"/>
  </g>
  <g transform="translate(820,520) rotate(8)">
    <rect x="0" y="0" width="300" height="200" rx="18" fill="url(#paper)" opacity="0.86"/>
    <rect x="24" y="28" width="200" height="10" rx="5" fill="#2A2E35" opacity="0.16"/>
    <rect x="24" y="52" width="240" height="8" rx="4" fill="#2A2E35" opacity="0.11"/>
    <rect x="24" y="71" width="210" height="8" rx="4" fill="#2A2E35" opacity="0.11"/>
    <rect x="24" y="90" width="250" height="8" rx="4" fill="#2A2E35" opacity="0.11"/>
    <rect x="24" y="126" width="170" height="26" rx="13" fill="#3F7F72" opacity="0.16"/>
  </g>

  <g transform="translate(520,560) rotate(-18)">
    <rect x="0" y="0" width="260" height="16" rx="8" fill="#2A2E35" opacity="0.9"/>
    <rect x="190" y="0" width="70" height="16" rx="8" fill="#1F3A5F" opacity="0.9"/>
    <circle cx="16" cy="8" r="6" fill="#E9E3D5" opacity="0.55"/>
  </g>

  <rect width="1200" height="760" fill="url(#shadow)" opacity="0.9"/>
</svg>`;

type PlanForm = {
  name: string;
  discipline: string;
  email: string;
  whatsapp: string;
  manuscriptType: string;
  priority: string;
  indexing: string;
  timeline: string;
  notes: string;
};

const INITIAL_FORM: PlanForm = {
  name: "",
  discipline: "",
  email: "",
  whatsapp: "",
  manuscriptType: "Not sure",
  priority: "Best fit / credibility",
  indexing: "Not sure",
  timeline: "No strict deadline",
  notes: "",
};

const chipIcons = {
  shortlist: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" />
      <path d="M14.8 9.2 13 13l-3.8 1.8L11 11l3.8-1.8Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  fixPlan: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6h12M9 12h12M9 18h12" stroke="currentColor" />
      <path
        d="M3.8 12.2 5 13.4l2.1-2.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  integrity: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2 20 6v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4Z" stroke="currentColor" />
      <path
        d="M9 12l2 2 4-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  checklist: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3h10v18H7z" stroke="currentColor" />
      <path d="M9 8h6M9 12h6" stroke="currentColor" opacity=".7" />
    </svg>
  ),
} as const;

type AudienceChip = {
  label: string;
  icon?: keyof typeof chipIcons;
};

type AudienceTab = {
  id: "early" | "mid" | "senior";
  label: string;
  leftTitle: string;
  leftTone: "amber" | "lilac" | "rose";
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
  chips: AudienceChip[];
};

const AUDIENCE_TABS: AudienceTab[] = [
  {
    id: "early",
    label: "Early-career",
    leftTitle: "What goes wrong",
    leftTone: "amber",
    leftItems: [
      "Journal choice feels like guesswork and desk rejection.",
      "Submission-ready is unclear until it is too late.",
      "Pressure to publish fast creates traps.",
    ],
    rightTitle: "What you get",
    rightItems: [
      "Journal shortlist + avoid list (so you do not waste time).",
      "Fix-first plan (what to improve before submission).",
      "Safe checklist to avoid predatory journals and paper mills.",
    ],
    chips: [
      { label: "Shortlist", icon: "shortlist" },
      { label: "Fix-first plan", icon: "fixPlan" },
      { label: "Integrity flags", icon: "integrity" },
      { label: "Submission checklist", icon: "checklist" },
    ],
  },
  {
    id: "mid",
    label: "Mid-career",
    leftTitle: "Common friction",
    leftTone: "lilac",
    leftItems: [
      "Multi-author coordination and time scarcity.",
      "Reviewer responses take longer than they should.",
      "Missing COI/ethics/data statements cause delays.",
    ],
    rightTitle: "What you get",
    rightItems: [
      "Prioritized issue list (fix first vs later).",
      "Submission checklist + response-to-reviewers kit.",
      "Integrity and compliance checklist (screening-friendly).",
    ],
    chips: [
      { label: "Priorities" },
      { label: "Submission pack" },
      { label: "Response kit" },
      { label: "Compliance" },
    ],
  },
  {
    id: "senior",
    label: "Senior / PI",
    leftTitle: "Common risks",
    leftTone: "rose",
    leftItems: [
      "Reputation risk in a high-fraud environment.",
      "Delegation risk: integrity gaps can slip in late.",
      "Concern about questionable venues and claims.",
    ],
    rightTitle: "What you get",
    rightItems: [
      "Integrity safeguards and paper-mill avoidance education.",
      "Clear documentation and risk flags.",
      "Defensible submission pathway (transparent practices).",
    ],
    chips: [
      { label: "Safeguards" },
      { label: "Risk flags" },
      { label: "Documentation" },
      { label: "Defensible route" },
    ],
  },
];

type DeliverTone = "mint" | "amber" | "lilac" | "rose";

type DeliverableId = "shortlist" | "readiness" | "integrity" | "submission";

type Deliverable = {
  id: DeliverableId;
  step: number;
  title: string;
  stepSummary: string;
  problem: string;
  whatYouGet: string[];
  why: string;
  chips: string[];
  previewTitle: string;
  previewRows: { label: string; value: string }[];
  tone: DeliverTone;
};

const DELIVERABLES: Deliverable[] = [
  {
    id: "shortlist",
    step: 1,
    title: "Journal Selection + Journal Fit Shortlist",
    stepSummary:
      "You are stuck on \"where to submit\" - and you do not want to lose weeks to the wrong journal.",
    problem:
      "You are stuck on \"where to submit\" - and you do not want to lose weeks to the wrong journal.",
    whatYouGet: [
      "Shortlist of 5-10 journals based on scope-fit + article-type fit.",
      "Fit reasoning for each journal (not generic lists).",
      "Avoid list with risk flags + a prep snapshot (format + common screening items).",
    ],
    why:
      "Wrong-journal submission often costs weeks. This gives you a structured, checklist-based way to choose wisely.",
    chips: [
      "journal selection",
      "where to publish",
      "indexed journals (as applicable)",
      "journal shortlist",
    ],
    previewTitle: "Journal Shortlist (sample layout)",
    previewRows: [
      { label: "Journal A", value: "Fit: High" },
      { label: "Journal B", value: "Fit: Medium" },
      { label: "Journal C", value: "Fit: High" },
      { label: "Avoid list", value: "2 flags" },
    ],
    tone: "mint",
  },
  {
    id: "readiness",
    step: 2,
    title: "Pre-Submission Manuscript Readiness Review",
    stepSummary:
      "You want to reduce desk-rejection risk and know what to fix first - before you submit.",
    problem:
      "You want to reduce desk-rejection risk and know what to fix first - before you submit.",
    whatYouGet: [
      "Peer-review style readiness report (contribution, methods/reporting, structure/flow).",
      "Figures/tables + references consistency checks (avoid preventable delays).",
      "Fix-first plan: a prioritized action list (do this first).",
    ],
    why:
      "This is not \"perfect English.\" It is clarity, defensibility, and evaluation-readiness - the things editors screen for fast.",
    chips: [
      "pre-submission review",
      "desk rejection",
      "manuscript readiness",
      "publication support services",
    ],
    previewTitle: "Readiness Review (sample headings)",
    previewRows: [
      { label: "Contribution clarity", value: "Key edits" },
      { label: "Methods/reporting", value: "Must-fix" },
      { label: "Structure/flow", value: "Improve" },
      { label: "Fix-first plan", value: "Top 5" },
    ],
    tone: "amber",
  },
  {
    id: "integrity",
    step: 3,
    title: "Integrity & Risk Safeguards",
    stepSummary:
      "You are worried about predatory traps, paper-mill scams, and risky shortcuts that can harm your record.",
    problem:
      "You are worried about predatory traps, paper-mill scams, and risky shortcuts that can harm your record.",
    whatYouGet: [
      "Checklist-based predatory-journal avoidance guidance (skills, not watchlists).",
      "Paper-mill red flags + safe-path education (what to avoid, how scams look).",
      "Compliance checklist (COI, ethics approvals, data statements, authorship hygiene - as applicable).",
    ],
    why:
      "We do not sensationalize. We help you choose a clean, reputable pathway and document decisions clearly.",
    chips: ["publication ethics", "predatory journals", "paper mills", "compliance checklist"],
    previewTitle: "Integrity Checklist (sample)",
    previewRows: [
      { label: "Predatory signals", value: "Checklist" },
      { label: "Paper-mill red flags", value: "Guide" },
      { label: "COI / ethics / data", value: "Checklist" },
      { label: "Documentation", value: "Included" },
    ],
    tone: "lilac",
  },
  {
    id: "submission",
    step: 4,
    title: "Submission Package + Revision Kit",
    stepSummary:
      "You do not want your submission bounced for missing files, wrong format, or unclear cover letter.",
    problem:
      "You do not want your submission bounced for missing files, wrong format, or unclear cover letter.",
    whatYouGet: [
      "Submission checklist (files, formats, statements) - submission-ready.",
      "Cover letter guidance (journal-appropriate positioning).",
      "Response-to-reviewers template + revision plan (for smoother cycles).",
    ],
    why:
      "So you are not figuring it out on the submission portal at 1 a.m. You submit with a complete package and a plan.",
    chips: ["publication process", "publish online", "research paper format", "submission checklist"],
    previewTitle: "Submission Pack (sample)",
    previewRows: [
      { label: "Files checklist", value: "Complete" },
      { label: "Cover letter guidance", value: "Included" },
      { label: "Response template", value: "Included" },
      { label: "Revision plan", value: "Included" },
    ],
    tone: "rose",
  },
];

const deliverIcons: Record<DeliverableId, React.ReactNode> = {
  shortlist: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" />
      <path d="M14.8 9.2 13 13l-3.8 1.8L11 11l3.8-1.8Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  readiness: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 4h6v3H9V4Z" stroke="currentColor" />
      <path d="M7 6h10v16H7V6Z" stroke="currentColor" opacity=".95" />
      <path d="M9 11h6M9 15h6M9 19h4" stroke="currentColor" opacity=".75" />
    </svg>
  ),
  integrity: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2 20 6v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4Z" stroke="currentColor" />
      <path
        d="M9 12l2 2 4-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  submission: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 2 11 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" stroke="currentColor" opacity=".95" />
    </svg>
  ),
};

const deliverStar = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2l1.2 5.2L18 8.4l-4.8 1.2L12 15l-1.2-5.4L6 8.4l4.8-1.2L12 2Z" stroke="currentColor" />
  </svg>
);

type PackageId = "starter" | "essential" | "standard" | "premium";

type PricingPackage = {
  id: PackageId;
  title: string;
  badges: { label: string; tone?: "top" | "hot" }[];
  turnaround: string;
  rating: string;
  ratingNote: string;
  description: string;
  features: string[];
  price: string;
  detail: {
    problem: string;
    who: string;
    benefits: string[];
    youGet: string[];
  };
};

const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "starter",
    title: "Quick Journal Shortlist",
    badges: [
      { label: "New" },
      { label: "Quick help" },
    ],
    turnaround: "24-48 hours",
    rating: "4.8",
    ratingNote: "recommended for first-time users",
    description:
      "If you are stuck on \"Where should I publish this paper?\" and you want a safe direction fast.",
    features: [
      "3-5 journal options with fit notes",
      "Avoid list + credibility checks",
      "Submission basics checklist",
    ],
    price: "INR 3,999",
    detail: {
      problem: "You are ready to move, but journal selection feels like guesswork.",
      who: "If you are stuck on \"Where should I publish this paper?\" and you want a safe direction fast.",
      benefits: [
        "You stop wasting weeks on wrong-journal tries.",
        "You get a short list you can actually act on.",
        "You avoid obvious credibility traps early.",
      ],
      youGet: [
        "3-5 journal options with fit notes",
        "Avoid list + credibility checks",
        "Submission basics checklist",
      ],
    },
  },
  {
    id: "essential",
    title: "Journal Selection + Submission Checklist",
    badges: [{ label: "Best value", tone: "top" }],
    turnaround: "48-72 hours",
    rating: "4.9",
    ratingNote: "fast + structured",
    description:
      "If your draft is clean, but you do not want to gamble on the journal or miss submission requirements.",
    features: [
      "5-10 journal shortlist + reasons",
      "Avoid list + risk flags",
      "Submission-ready checklist (files/format/essentials)",
    ],
    price: "INR 6,999",
    detail: {
      problem:
        "You do not just need a list - you need the right journal and a clean submission path.",
      who: "If your draft is clean, but you do not want to gamble on the journal or miss submission requirements.",
      benefits: [
        "You submit with fewer preventable errors.",
        "You avoid scope mismatch surprises.",
        "You get a checklist that keeps the portal process smooth.",
      ],
      youGet: [
        "5-10 journal shortlist + reasons",
        "Avoid list + risk flags",
        "Submission-ready checklist (files/format/essentials)",
      ],
    },
  },
  {
    id: "standard",
    title: "Pre-Submission Review + Journal Shortlist",
    badges: [{ label: "Most popular", tone: "top" }],
    turnaround: "5 business days",
    rating: "4.9",
    ratingNote: "best for serious submissions",
    description:
      "If you want to reduce desk rejection risk and submit with confidence (not just 'hope and submit').",
    features: [
      "Everything in Essential",
      "Peer-review style readiness review",
      "Fix-first plan (priority actions)",
    ],
    price: "INR 12,999",
    detail: {
      problem:
        "You suspect reviewers/editors will catch issues - but you cannot see them clearly yet.",
      who: "If you want to reduce desk rejection risk and submit with confidence (not just 'hope and submit').",
      benefits: [
        "You get a fix-first plan (what matters most).",
        "You reduce desk-rejection triggers.",
        "You save time in revisions by working in the right order.",
      ],
      youGet: [
        "Everything in Essential",
        "Peer-review style readiness review",
        "Fix-first plan (priority actions)",
      ],
    },
  },
  {
    id: "premium",
    title: "Full Publication Support + Integrity Safeguards",
    badges: [
      { label: "Premium" },
      { label: "High-stakes", tone: "hot" },
    ],
    turnaround: "7-10 business days",
    rating: "4.8",
    ratingNote: "deep review + integrity",
    description:
      "If the reputational stakes are high (PI-led teams / funding / integrity-sensitive fields).",
    features: [
      "Everything in Standard",
      "Integrity safeguards + compliance checklist",
      "Cover letter support + submission pack plan",
    ],
    price: "INR 19,999",
    detail: {
      problem:
        "You want a defensible, ethical pathway - not shortcuts - and a complete submission-ready plan.",
      who: "If the reputational stakes are high (PI-led teams / funding / integrity-sensitive fields).",
      benefits: [
        "You avoid predatory/paper-mill traps.",
        "You submit with compliance items covered.",
        "You get a clear pack plan and cover letter direction.",
      ],
      youGet: [
        "Everything in Standard",
        "Integrity safeguards + compliance checklist",
        "Cover letter support + submission pack plan",
      ],
    },
  },
];

const infoIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="16" height="16">
    <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" />
    <path d="M12 10v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M12 7h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const starIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2l2.6 6.3 6.8.6-5.2 4.4 1.6 6.7L12 16.9 6.2 20l1.6-6.7L2.6 8.9l6.8-.6L12 2Z" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const checkIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M20 6 9 17l-5-5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const whatsappIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" width="18" height="18">
    <path
      d="M12 22a9.5 9.5 0 0 1-4.53-1.15L3 22l1.18-4.24A9.5 9.5 0 1 1 12 22Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M8.8 9.4c.15-.35.3-.36.55-.36h.45c.15 0 .36.02.55.4.2.4.67 1.62.73 1.74.06.12.1.26.02.43-.08.17-.12.26-.24.4-.12.15-.24.33-.35.44-.11.12-.22.25-.1.49.13.25.6 1.05 1.3 1.7.9.83 1.66 1.08 1.9 1.2.24.11.38.09.52-.06.14-.15.6-.73.75-.98.16-.25.31-.21.52-.12.21.08 1.34.63 1.57.75.23.11.38.17.44.27.05.1.05.57-.13 1.12-.18.55-1.06 1.06-1.46 1.13-.37.07-.85.1-1.38-.08-.32-.1-.74-.24-1.27-.46-2.22-.94-3.67-3.22-3.78-3.38-.11-.16-.9-1.2-.9-2.29 0-1.09.57-1.62.77-1.84Z"
      fill="currentColor"
      opacity=".9"
    />
  </svg>
);

type AddOnId = "sim" | "ai" | "portal" | "cl" | "verify" | "apc";

type AddOn = {
  id: AddOnId;
  name: string;
  intent: string;
  eta: string;
  price: string;
  summary: string;
  ifYou: string;
  gain: string[];
  get: string[];
  cta: string;
};

const ADD_ONS: AddOn[] = [
  {
    id: "sim",
    name: "Similarity report interpretation + citation hygiene",
    intent: "plagiarism check before research publication",
    eta: "+24-48 hours",
    price: "INR 2,999",
    summary:
      "You ran a similarity report and the number scared you - but you do not know what overlap is normal vs risky.",
    ifYou:
      "You ran a similarity report and the number scared you - but you do not know what overlap is normal vs risky.",
    gain: [
      "You stop chasing a meaningless \"safe %\" and focus on what editors actually care about.",
      "You fix overlap ethically (no spin rewriting, no meaning changes).",
      "You know exactly what to cite, rewrite, or leave as standard phrasing.",
    ],
    get: [
      "Overlap explained in plain language (methods/common phrases vs problematic copying).",
      "Citation fixes + ethical rewrite guidance (meaning preserved).",
      "Transparent flags for possible text recycling risks.",
    ],
    cta: "Explain my similarity report",
  },
  {
    id: "ai",
    name: "AI-use disclosure guidance (journal-ready wording)",
    intent: "AI disclosure in academic writing",
    eta: "+24-48 hours",
    price: "INR 1,999",
    summary:
      "You used AI for language/structure support and you are unsure whether to disclose it (and where).",
    ifYou:
      "You used AI for language/structure support and you are unsure whether to disclose it (and where).",
    gain: [
      "You avoid policy surprises at submission or after acceptance.",
      "You disclose responsibly (when needed) without overexplaining.",
      "You keep trust intact: transparent and journal-appropriate.",
    ],
    get: [
      "Disclosure wording for cover letter and/or acknowledgements section.",
      "Journal-appropriate tone + simple options (short/medium).",
      "A checklist: what you should NOT claim (e.g., AI as author).",
    ],
    cta: "Get AI disclosure wording",
  },
  {
    id: "portal",
    name: "Online submission assist (portal-wise guidance)",
    intent: "how to submit a research paper for publication online",
    eta: "same/next day",
    price: "INR 1,499",
    summary:
      "The submission portal is confusing - file types, declarations, checklists - and you do not want a technical rejection.",
    ifYou:
      "The submission portal is confusing - file types, declarations, checklists - and you do not want a technical rejection.",
    gain: [
      "You submit correctly the first time (fewer preventable bounces).",
      "You stop losing hours on portal guesswork.",
      "You stay in control: you submit, we guide.",
    ],
    get: [
      "File checklist + naming/order guidance.",
      "Metadata + declaration checklist (common missing items).",
      "Final \"ready to click submit\" check.",
    ],
    cta: "Help me submit online",
  },
  {
    id: "cl",
    name: "Cover letter (journal-style) + positioning notes",
    intent: "cover letter for journal submission",
    eta: "+24-48 hours",
    price: "INR 1,999",
    summary:
      "You do not want to send a generic cover letter - you want it to sound clear, confident, and journal-fit (without overclaiming).",
    ifYou:
      "You do not want to send a generic cover letter - you want it to sound clear, confident, and journal-fit (without overclaiming).",
    gain: [
      "You present your work crisply (fit + novelty + why it matters).",
      "You avoid common cover-letter mistakes that annoy editors.",
      "You save time - and stop second-guessing the tone.",
    ],
    get: [
      "Cover letter structure aligned to the journal target.",
      "Positioning notes (what to emphasize / what not to say).",
      "Optional short and long variants.",
    ],
    cta: "Draft my cover letter",
  },
  {
    id: "verify",
    name: "Journal credibility & impact factor verification",
    intent: "check journal impact factor and credibility before submitting",
    eta: "same/next day",
    price: "INR 999",
    summary:
      "You saw indexing/impact factor claims and you want to verify them before paying or submitting.",
    ifYou:
      "You saw indexing/impact factor claims and you want to verify them before paying or submitting.",
    gain: [
      "You avoid shady journal traps early.",
      "You get clarity on what can be independently verified.",
      "You protect your time and reputation.",
    ],
    get: [
      "Credibility checklist + what to verify.",
      "Clear red flags list (scope mismatch / misleading claims).",
      "What to ask the journal before proceeding.",
    ],
    cta: "Verify this journal",
  },
  {
    id: "apc",
    name: "Publication fees / APC reality check (legitimate options)",
    intent: "research paper publication fees / APC",
    eta: "same/next day",
    price: "INR 999",
    summary:
      "Budget is tight and you want legitimate options without scams or false promises.",
    ifYou:
      "Budget is tight and you want legitimate options without scams or false promises.",
    gain: [
      "You understand the real cost landscape (OA/APC vs non-OA).",
      "You avoid fee surprises late in the process.",
      "You choose a journal pathway that matches budget + credibility.",
    ],
    get: [
      "APC/fee expectation breakdown (what to look for).",
      "Budget-safe pathway suggestions (legitimate).",
      "Questions to ask before paying any fee.",
    ],
    cta: "Check fees safely",
  },
];

type EduTopicId = "pred" | "mills" | "ai" | "time";

type EduTopic = {
  id: EduTopicId;
  label: string;
  chipLabel: string;
icon: React.ReactNode;
  accordionTitle: string;
  accordionSub: string;
  intro: string;
  bullets: string[];
  tip: string;
  rightTitle: string;
  rightHint: string;
  checks: string[];
  thresholds: { ok: number; warn: number };
  askMsg: string;
};

const warningIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2 22 20H2L12 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M12 9v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M12 17h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

const aiFaceIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <rect x="6" y="6" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.4" />
    <path d="M9 11h.01M15 11h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path
      d="M9 15c1.6 1.3 4.4 1.3 6 0"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path d="M4 12H2M22 12h-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const timeIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" />
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EDUCATION_TOPICS: EduTopic[] = [
  {
    id: "pred",
    label: "Predatory journals",
    chipLabel: "Predatory journals",
    icon: warningIcon,
    accordionTitle: "Predatory journals - spot them in 90 seconds",
    accordionSub: "A quick scan before you waste weeks (or money).",
    intro:
      "Predatory journals can look polished, but the publishing practice behind them is missing or misleading. Do not rely on random lists - build a simple habit using a Think.Check.Submit style checklist.",
    bullets: [
      "Peer review process is clearly explained (not \"48 hours guaranteed\").",
      "Fees/APCs are visible upfront and described transparently.",
      "Editorial board looks real and relevant to your topic.",
      "Indexing claims can be verified independently (not just a logo).",
      "Publisher provides clear policies (ethics, retractions, licensing, archiving).",
    ],
    tip:
      "If 2+ checks look suspicious, pause. Verify independently - or message us and we will help you evaluate safely.",
    rightTitle: "Predatory journal quick scan",
    rightHint: "Tick what you see. The more you tick, the more you should pause + verify.",
    checks: [
      "Fast acceptance / guaranteed acceptance promises",
      "Fees hidden until after acceptance",
      "Indexing/metrics claims look unverifiable",
      "Editorial board looks irrelevant or questionable",
      "Peer review description is vague or missing",
      "Policies unclear (ethics / retractions / licensing)",
      "Website feels like it's copying another journal (templates, fake addresses)",
    ],
    thresholds: { ok: 1, warn: 3 },
    askMsg: "Hi RE4U team, can you help me verify a journal for predatory risk? I flagged {n} red signals.",
  },
  {
    id: "mills",
    label: "Paper mills",
    chipLabel: "Paper mills",
    icon: warningIcon,
    accordionTitle: "Paper mills - protect your career",
    accordionSub: "This is the one mistake that can follow you for years.",
    intro:
      "Paper mills can sell fabricated papers or even \"authorship for sale.\" If someone promises guaranteed acceptance, that is not speed - that is a risk signal.",
    bullets: [
      "Avoid anyone offering \"guaranteed acceptance\" or \"authorship slots for sale\".",
      "Do not submit via unknown third parties (they can control submission + communication).",
      "Keep raw data/provenance and ethics approvals organised (you may be asked later).",
      "Use legitimate journal channels + institutional email where possible.",
      "If anything feels rushed/secretive: pause and verify.",
    ],
    tip:
      "If anyone asks you to pay via a \"broker\" or submit through their account: stop. Keep control of your submission.",
    rightTitle: "Paper-mill risk scan",
    rightHint:
      "These are career-risk signals. If you see them, stop and verify before doing anything.",
    checks: [
      "Guaranteed acceptance / \"we handle reviewers\"",
      "Authorship slots for sale",
      "Broker insists on submitting via their account",
      "Pressure to pay fast or keep things secret",
      "No access to raw data/provenance / unclear authorship",
      "Journal invitation feels unrelated to your field",
      "Promises of \"Scopus/WoS guaranteed\" without verification",
    ],
    thresholds: { ok: 0, warn: 2 },
    askMsg: "Hi RE4U team, I am worried about paper-mill risk. I flagged {n} red signals. Please guide me.",
  },
  {
    id: "ai",
    label: "AI disclosure",
    chipLabel: "AI disclosure",
    icon: aiFaceIcon,
    accordionTitle: "AI tools & scholarly writing - simple ethical rules",
    accordionSub: "Use tools smartly without creating policy risk.",
    intro:
      "AI can help with language and structure, but journals increasingly expect transparency. The key rule: humans stay responsible for everything you submit.",
    bullets: [
      "AI tools should not be listed as authors.",
      "If AI is used, authors remain responsible and may need to disclose use depending on journal policy.",
      "Use AI for support (language/structure) only if you can verify every claim and citation.",
      "Never let AI invent citations, data, or methods.",
    ],
    tip:
      "If you used AI, we can draft journal-appropriate disclosure wording by request (policy-safe).",
    rightTitle: "AI-use policy check (simple)",
    rightHint: "This helps you stay policy-safe. When in doubt, disclose responsibly.",
    checks: [
      "AI helped draft/rewrite text beyond minor grammar",
      "AI generated or modified figures/images",
      "AI was used for analysis/code output you did not fully verify",
      "You are unsure whether the target journal requires AI disclosure",
      "You used AI to suggest citations (needs verification)",
      "You used AI translation/paraphrase tools heavily",
      "Co-authors used AI and did not record how",
    ],
    thresholds: { ok: 1, warn: 3 },
    askMsg: "Hi RE4U team, I need AI-use disclosure guidance. I flagged {n} items. Please advise what to disclose.",
  },
  {
    id: "time",
    label: "Publication timeline",
    chipLabel: "Publication timeline",
    icon: timeIcon,
    accordionTitle: "Timelines - why publication speed is unpredictable",
    accordionSub: "The truth editors never promise in one line.",
    intro:
      "Publication timelines depend on screening, reviewer availability, revision rounds, and production queues. We focus on what you can control so you do not lose weeks to preventable errors.",
    bullets: [
      "Desk screening can reject in days; peer review can take weeks/months.",
      "Reviewer availability and revision rounds drive most delays.",
      "Fast acceptance promises are a red flag, not a benefit.",
      "You can control: journal fit, submission completeness, and revision quality.",
    ],
    tip:
      "If someone promises \"acceptance in 1-2 days\", treat it as a red flag. Legitimate peer review rarely works like that.",
    rightTitle: "Timeline reality check",
    rightHint:
      "These are not problems - just factors that control speed. Tick what applies to set expectations.",
    checks: [
      "High-impact / high-volume journal (more screening)",
      "Complex methods or heavy stats (slower review)",
      "Multiple co-authors (revision coordination takes time)",
      "Major revisions likely (methods/structure/figures)",
      "Special issue / production queue delay possible",
      "Data availability / ethics statements need prep",
      "You are targeting a journal outside your manuscript's tight scope",
    ],
    thresholds: { ok: 1, warn: 3 },
    askMsg:
      "Hi RE4U team, can you estimate a realistic submission-to-decision timeline? I ticked {n} timeline factors.",
  },
];

const getEduRisk = (topic: EduTopic, count: number) => {
  if (count <= topic.thresholds.ok) {
    return {
      badge: "ok",
      label: "Low risk signals",
      message: "Looks reasonable - still verify independently before paying any fee.",
    };
  }
  if (count <= topic.thresholds.warn) {
    return {
      badge: "warn",
      label: "Needs verification",
      message: "Some signals to verify. Pause and cross-check before you submit.",
    };
  }
  return {
    badge: "stop",
    label: "High risk signals",
    message: "Too many red signals. Stop and verify before you submit or pay.",
  };
};

const integrityNever = [
  "Guarantee acceptance or promise \"1-2 day publication\".",
  "Sell authorship or recommend paper-mill pathways.",
  "Advise gaming similarity scores.",
  "Hide AI use when a journal requires disclosure.",
];

const integrityPromise = [
  "Clear journal-fit reasoning (you will understand the \"why\").",
  "A submission plan with integrity safeguards.",
  "Practical, prioritized improvements you can act on immediately.",
];

const integrityFaq = [
  {
    id: "acc1",
    title: "Why we do not guarantee acceptance",
    body:
      "Any service that guarantees acceptance is selling an illusion. Peer review is independent and depends on fit, rigor, and editorial judgement. We reduce avoidable errors - we do not promise outcomes.",
  },
  {
    id: "acc2",
    title: "Why we avoid \"similarity reduction\" tricks",
    body:
      "Similarity reports need context - methods language and standard phrases are normal. Gaming the number can create meaning drift and integrity risk. We fix overlap ethically (citations + clear rewriting, meaning preserved).",
  },
  {
    id: "acc3",
    title: "Why we take AI disclosure seriously",
    body:
      "Policies vary by journal. The safest approach is simple: humans remain responsible, AI is not an author, and disclosure is used when policy requires it. We help you stay transparent and safe.",
  },
  {
    id: "acc4",
    title: "Why paper mills are non-negotiable",
    body:
      "Paper mills can lead to retractions, sanctions, and long-term reputational damage. We will never route you through brokers, authorship sales, or fabricated research pathways - even if it sounds \"easy\".",
  },
];

const shieldIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2 20 6v6c0 5-3.2 9.4-8 10-4.8-.6-8-5-8-10V6l8-4Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M9 12l2 2 4-5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const crossIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" />
    <path d="M7 7l10 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const pledgeText = [
  "We are a publication support service - not a shortcut service.",
  "",
  "We will never:",
  "• Guarantee acceptance or promise \"1-2 day publication\"",
  "• Sell authorship or recommend paper-mill pathways",
  "• Advise gaming similarity scores",
  "• Hide AI use when a journal requires disclosure",
  "",
  "What we do promise:",
  "• Clear journal-fit reasoning (you will understand the \"why\")",
  "• A submission plan with integrity safeguards",
  "• Practical, prioritized improvements you can act on immediately",
].join("\n");

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  excerpt: string;
};

const FAQS: FaqItem[] = [
  {
    id: "faq-acceptance",
    question: "Do you guarantee publication or acceptance?",
    excerpt:
      "No. Any ethical publication support service focuses on reducing avoidable rejection risks...",
    answer:
      "No. Any ethical publication support service focuses on reducing avoidable rejection risks (fit, readiness, compliance) - not selling guarantees.",
  },
  {
    id: "faq-journal-choice",
    question: "How do you choose journals for my manuscript?",
    excerpt:
      "We match scope + article type + submission realities (policies, requirements, fees visibility)...",
    answer:
      "We match scope + article type + submission realities (policies, requirements, fees visibility) using a structured checklist approach (Think.Check.Submit style) - not random lists.",
  },
  {
    id: "faq-predatory",
    question: "Can you help me avoid predatory journals?",
    excerpt:
      "Yes. We teach quick verification checks and flag risk signals using transparent criteria...",
    answer:
      "Yes. We teach quick verification checks and flag risk signals using transparent criteria (peer review clarity, fee transparency, verifiable indexing, policies).",
  },
  {
    id: "faq-paper-mills",
    question: "What are paper mills - and can you help me avoid them?",
    excerpt:
      "Paper mills sell fabricated research or authorship for a fee. We help you avoid broker-led submission traps...",
    answer:
      "Paper mills sell fabricated research or authorship for a fee. We help you avoid broker-led submission traps and choose legitimate submission pathways.",
  },
  {
    id: "faq-similarity",
    question: "Do you provide plagiarism/similarity checks?",
    excerpt:
      "Only if requested. We interpret similarity reports contextually and ethically; we do not treat one % number as a universal benchmark.",
    answer:
      "Only if requested. We interpret similarity reports contextually and ethically; we do not treat one % number as a universal benchmark.",
  },
  {
    id: "faq-ai-tools",
    question: "Do you use AI tools?",
    excerpt:
      "We may use AI-assisted tools for fast triage or drafting support, but human experts validate everything.",
    answer:
      "We may use AI-assisted tools for fast triage or drafting support, but human experts validate everything. AI tools are not authors; disclosure requirements vary by journal.",
  },
  {
    id: "faq-ghostwriting",
    question: "Will you write the paper for me?",
    excerpt:
      "No. We do not fabricate content. We support ethical improvement, clarity, journal fit, compliance, and submission readiness.",
    answer:
      "No. We do not fabricate content. We support ethical improvement, clarity, journal fit, compliance, and submission readiness.",
  },
  {
    id: "faq-files",
    question: "What files do you accept?",
    excerpt:
      "Word and LaTeX are accepted. Figures/tables and supplementary files can be included depending on your package and journal requirements.",
    answer:
      "Word and LaTeX are accepted. Figures/tables and supplementary files can be included depending on your package and journal requirements.",
  },
  {
    id: "faq-timeline",
    question: "How long does publication support take?",
    excerpt:
      "Typical timelines: Essential 48-72 hours, Standard ~5 business days, Premium 7-10 business days.",
    answer:
      "Typical timelines: Essential 48-72 hours, Standard ~5 business days, Premium 7-10 business days. Urgency options may be available depending on workload.",
  },
  {
    id: "faq-submission",
    question: "Will you submit the paper to the journal on my behalf?",
    excerpt:
      "By default, we guide you and give a clean submission checklist. If you want assisted portal guidance, we can support it as an add-on (you stay in control).",
    answer:
      "By default, we guide you and give a clean submission checklist. If you want assisted portal guidance, we can support it as an add-on (you stay in control).",
  },
  {
    id: "faq-starting-price",
    question: "What does \"starting at\" pricing mean?",
    excerpt:
      "It is a base price. Final pricing depends on manuscript length, technical complexity, urgency, and the scope you approve after a quick diagnostic.",
    answer:
      "It is a base price. Final pricing depends on manuscript length, technical complexity, urgency, and the scope you approve after a quick diagnostic.",
  },
  {
    id: "faq-confidential",
    question: "Is my manuscript confidential?",
    excerpt:
      "Yes. Confidentiality is standard. Your files are used only for the service you request.",
    answer:
      "Yes. Confidentiality is standard. Your files are used only for the service you request.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

type CtaMode = "upload" | "plan";

type CtaForm = {
  discipline: string;
  manuscriptType: string;
  timeline: string;
  budget: string;
  notes: string;
};

const CTA_INITIAL: CtaForm = {
  discipline: "",
  manuscriptType: "Not sure",
  timeline: "No strict deadline",
  budget: "Not sure",
  notes: "",
};

export function PublicationSupportPage() {
  const [planOpen, setPlanOpen] = useState(false);
  const [channelOpen, setChannelOpen] = useState(false);
  const [formData, setFormData] = useState<PlanForm>(INITIAL_FORM);
  const [lastMessage, setLastMessage] = useState("");
  const [activeAudience, setActiveAudience] =
    useState<AudienceTab["id"]>("early");
  const [activeDeliverable, setActiveDeliverable] =
    useState<DeliverableId>("shortlist");
  const [pricingNoteOpen, setPricingNoteOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activePackageId, setActivePackageId] = useState<PackageId>("starter");
  const [addOnDrawerOpen, setAddOnDrawerOpen] = useState(false);
  const [activeAddOnId, setActiveAddOnId] = useState<AddOnId>("sim");
  const [activeEduTopic, setActiveEduTopic] = useState<EduTopicId>("pred");
  const [openEduTopic, setOpenEduTopic] = useState<EduTopicId | null>("pred");
  const [eduScanState, setEduScanState] = useState<Record<EduTopicId, boolean[]>>(() => {
    const state = {} as Record<EduTopicId, boolean[]>;
    EDUCATION_TOPICS.forEach((topic) => {
      state[topic.id] = topic.checks.map(() => false);
    });
    return state;
  });
  const [integrityOpen, setIntegrityOpen] = useState<string>("acc1");
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [faqQuery, setFaqQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<string>(FAQS[0]?.id ?? "");
  const [ctaOpen, setCtaOpen] = useState(false);
  const [ctaMode, setCtaMode] = useState<CtaMode>("upload");
  const [ctaForm, setCtaForm] = useState<CtaForm>(CTA_INITIAL);

  const canSubmit = useMemo(() => {
    const nameOk = formData.name.trim().length > 0;
    const contactOk =
      formData.email.trim().length > 0 || formData.whatsapp.trim().length > 0;
    return nameOk && contactOk;
  }, [formData]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPlanOpen(false);
        setChannelOpen(false);
        setPricingNoteOpen(false);
        setDrawerOpen(false);
        setAddOnDrawerOpen(false);
        setCtaOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const overlayOpen =
      planOpen ||
      channelOpen ||
      pricingNoteOpen ||
      drawerOpen ||
      addOnDrawerOpen ||
      ctaOpen;
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [planOpen, channelOpen, pricingNoteOpen, drawerOpen, addOnDrawerOpen, ctaOpen]);

  const updateField = useCallback(
    (field: keyof PlanForm) =>
      (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [field]: event.target.value }));
      },
    [],
  );

  const buildMessage = useCallback((data: PlanForm) => {
    const lines: string[] = [];
    lines.push("Hi ManuscriptEdit team,");
    lines.push("I want a Journal Shortlist + Publication Plan.");
    lines.push("");
    lines.push(`Name: ${data.name}`);
    if (data.email) lines.push(`Email: ${data.email}`);
    if (data.whatsapp) lines.push(`WhatsApp: ${data.whatsapp}`);
    if (data.discipline) lines.push(`Discipline: ${data.discipline}`);
    lines.push(`Manuscript type: ${data.manuscriptType}`);
    lines.push(`Top priority: ${data.priority}`);
    lines.push(`Indexing need: ${data.indexing}`);
    lines.push(`Timeline: ${data.timeline}`);
    if (data.notes) lines.push(`Notes: ${data.notes}`);
    lines.push("");
    lines.push("Thanks!");
    return lines.join("\n");
  }, []);

  const handleSubmitPlan = () => {
    if (!formData.name.trim()) {
      window.alert("Please enter your name.");
      return;
    }
    if (!formData.email.trim() && !formData.whatsapp.trim()) {
      window.alert("Please add at least one contact: Email or WhatsApp number.");
      return;
    }
    const message = buildMessage(formData);
    setLastMessage(message);
    setPlanOpen(false);
    setChannelOpen(true);
  };

  const handleWhatsApp = () => {
    if (!lastMessage) return;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lastMessage,
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setChannelOpen(false);
  };

  const handleEmail = () => {
    if (!lastMessage) return;
    const subject = encodeURIComponent("Journal Shortlist + Publication Plan");
    const url = `mailto:${EMAIL_TO}?subject=${subject}&body=${encodeURIComponent(
      lastMessage,
    )}`;
    window.location.href = url;
    setChannelOpen(false);
  };

  const openWhatsAppMessage = useCallback((message: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const activePackage = useMemo(
    () => PRICING_PACKAGES.find((pkg) => pkg.id === activePackageId) ?? PRICING_PACKAGES[0],
    [activePackageId],
  );
  const activeAddOn = useMemo(
    () => ADD_ONS.find((addOn) => addOn.id === activeAddOnId) ?? ADD_ONS[0],
    [activeAddOnId],
  );
  const activeEducation = useMemo(
    () => EDUCATION_TOPICS.find((topic) => topic.id === activeEduTopic) ?? EDUCATION_TOPICS[0],
    [activeEduTopic],
  );
  const activeChecks = eduScanState[activeEduTopic] ?? [];
  const checkedCount = activeChecks.filter(Boolean).length;
  const eduRisk = getEduRisk(activeEducation, checkedCount);

  const toggleEduCheck = (index: number) => {
    setEduScanState((prev) => {
      const next = { ...prev };
      const updated = [...(next[activeEduTopic] ?? [])];
      updated[index] = !updated[index];
      next[activeEduTopic] = updated;
      return next;
    });
  };

  const resetEduChecks = () => {
    setEduScanState((prev) => {
      const next = { ...prev };
      next[activeEduTopic] = (next[activeEduTopic] ?? []).map(() => false);
      return next;
    });
  };

  const filteredFaqs = useMemo(() => {
    const query = faqQuery.trim().toLowerCase();
    if (!query) return FAQS;
    return FAQS.filter((faq) =>
      `${faq.question} ${faq.answer}`.toLowerCase().includes(query),
    );
  }, [faqQuery]);

  useEffect(() => {
    if (!filteredFaqs.find((faq) => faq.id === openFaq)) {
      setOpenFaq(filteredFaqs[0]?.id ?? "");
    }
  }, [filteredFaqs, openFaq]);

  const updateCtaField = useCallback(
    (field: keyof CtaForm) =>
      (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setCtaForm((prev) => ({ ...prev, [field]: event.target.value }));
      },
    [],
  );

  const handleCopyPledge = async () => {
    try {
      await navigator.clipboard.writeText(pledgeText);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1200);
    } catch {
      window.alert("Copy failed. Please copy manually.");
    }
  };

  const handleCtaSubmit = () => {
    const message = [
      `Hi RE4U team, I want ${
        ctaMode === "upload"
          ? "publication support (upload manuscript)"
          : "a journal shortlist + publication plan"
      }.`,
      "",
      `Discipline: ${ctaForm.discipline || "Not sure"}`,
      `Manuscript type: ${ctaForm.manuscriptType || "Not sure"}`,
      `Timeline: ${ctaForm.timeline || "No strict deadline"}`,
      `Budget/APC: ${ctaForm.budget || "Not sure"}`,
      ctaForm.notes ? `Notes: ${ctaForm.notes}` : "",
      "",
      "Please share the final quote and next steps.",
    ]
      .filter(Boolean)
      .join("\n");
    openWhatsAppMessage(message);
    setCtaOpen(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <section className={styles.hero} aria-label="Publication Support Services hero">
          <div className={styles.grid}>
            <div>
              <div className={styles.eyebrow}>
                <span className={styles.dot} aria-hidden="true" />
                <span>Publication Support Services - Premium and integrity-first</span>
              </div>

              <h1>Publication Support Services</h1>

              <p className={styles.subhead}>
                You have done the hard part - the research. Now comes the part that can feel
                confusing, slow, and risky. We help you move from draft to safe journal selection
                to a submission-ready package, without shortcuts, false promises, or questionable
                journals.
              </p>

              <div className={styles.chips} role="list" aria-label="Key outcomes">
                <span className={styles.chip} role="listitem">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
                      stroke="currentColor"
                      opacity=".9"
                    />
                    <path
                      d="M14.8 9.2 13 13l-3.8 1.8L11 11l3.8-1.8Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <b>Where to submit</b> <small>shortlist + rationale</small>
                </span>
                <span className={styles.chip} role="listitem">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 4h10v16H7z" stroke="currentColor" opacity=".92" />
                    <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" opacity=".75" />
                  </svg>
                  <b>Fix-first plan</b> <small>priority actions</small>
                </span>
                <span className={styles.chip} role="listitem">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M22 2 11 13"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M22 2 15 22l-4-9-9-4 20-7Z"
                      stroke="currentColor"
                      opacity=".95"
                    />
                  </svg>
                  <b>Submission-ready</b> <small>checklist + cover letter</small>
                </span>
              </div>

              <div className={styles.ctaRow}>
                <a
                  className={`${styles.btn} ${styles.uploadButton}`}
                  href="#upload"
                  aria-label="Upload manuscript to get a quote"
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 16V4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    <path
                      d="M7 8l5-5 5 5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M4 20h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                  Upload Manuscript / Get Quote
                </a>

                <button
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  type="button"
                  aria-label="Get a journal shortlist and publication plan"
                  onClick={() => setPlanOpen(true)}
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 2l1.2 5.2L18 8.4l-4.8 1.2L12 15l-1.2-5.4L6 8.4l4.8-1.2L12 2Z"
                      stroke="currentColor"
                      opacity=".95"
                    />
                    <path
                      d="M20 14l.7 3 3 .7-3 .7-.7 3-.7-3-3-.7 3-.7.7-3Z"
                      stroke="currentColor"
                      opacity=".75"
                    />
                  </svg>
                  Get Journal Shortlist + Publication Plan
                </button>
              </div>

              <div className={styles.trust} aria-label="Trust badges">
                <span className={styles.trustItem}>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2 20 6v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4Z" stroke="currentColor" />
                    <path
                      d="M9 12l2 2 4-5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Confidential
                </span>
                <span className={styles.trustItem}>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 21s-7-4.6-7-11a4 4 0 0 1 7-2.3A4 4 0 0 1 19 10c0 6.4-7 11-7 11Z"
                      stroke="currentColor"
                    />
                  </svg>
                  Ethics-first
                </span>
                <span className={styles.trustItem}>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M16 11a4 4 0 1 0-8 0v3H6v7h12v-7h-2v-3Z" stroke="currentColor" />
                  </svg>
                  Human expert review
                </span>
                <span className={styles.trustItem}>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 12a8 8 0 0 1 15.5-2" stroke="currentColor" />
                    <path d="M20 12a8 8 0 0 1-15.5 2" stroke="currentColor" />
                    <path
                      d="M20 4v6h-6"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 20v-6h6"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Transparent process
                </span>
              </div>

              <div className={styles.foot}>
                Tip: Replace <span className={styles.mono}>#upload</span> and{" "}
                <span className={styles.mono}>#shortlist</span> with real URLs or modal triggers.
              </div>
            </div>

            <div className={styles.scene} aria-label="Research desk scene with integrity overlays">
              <div className={styles.sceneSvg} dangerouslySetInnerHTML={{ __html: sceneSvg }} />
              <div className={styles.sceneOverlay} aria-hidden="true" />

              <div className={styles.tags} aria-label="Trust tags">
                <span className={styles.tag}>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 21s-7-4.6-7-11a4 4 0 0 1 7-2.3A4 4 0 0 1 19 10c0 6.4-7 11-7 11Z"
                      stroke="currentColor"
                      opacity=".95"
                    />
                    <path
                      d="M9.2 11.8 11 13.6l3.8-4.1"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity=".85"
                    />
                  </svg>
                  Ethics-first
                </span>
              </div>

              <div className={styles.shieldWrap} tabIndex={0} aria-label="Integrity shield tooltip">
                <div className={styles.shield} role="note" aria-label="Integrity Shield badge">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2 20 6v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4Z" stroke="currentColor" />
                    <path
                      d="M9 12l2 2 4-5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <b>Integrity Shield</b>
                </div>
                <div className={styles.tooltip} role="tooltip">
                  Publication support, not shortcuts.
                </div>
              </div>

              <div className={styles.twoPane} aria-label="Before and After panels">
                <div className={styles.miniPanel} aria-label="Messy submission panel">
                  <div className={styles.miniPanelHeader}>
                    <strong>Messy submission</strong>
                    <span className={styles.badgeState}>before</span>
                  </div>

                  <div className={`${styles.bullet} ${styles.miss}`}>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" opacity=".9" />
                      <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    Missing files: <span className={styles.blur}>figures + ethics statement</span>
                  </div>

                  <div className={`${styles.bullet} ${styles.miss}`}>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" opacity=".9" />
                      <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    Cover letter: <span className={styles.blur}>unclear contribution</span>
                  </div>

                  <div className={`${styles.bullet} ${styles.miss}`} style={{ marginBottom: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" opacity=".9" />
                      <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    Journal fit: <span className={styles.blur}>guesswork</span>
                  </div>
                </div>

                <div className={styles.miniPanel} aria-label="Submission-ready pack panel">
                  <div className={styles.miniPanelHeader}>
                    <strong>Submission-ready pack</strong>
                    <span className={styles.badgeState}>after</span>
                  </div>

                  <div className={styles.bullet}>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 2 20 6v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4Z" stroke="currentColor" />
                      <path
                        d="M9 12l2 2 4-5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Files complete (manuscript, figures, statements)
                  </div>

                  <div className={styles.bullet}>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 2 20 6v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4Z" stroke="currentColor" />
                      <path
                        d="M9 12l2 2 4-5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Cover letter positioned (why this journal, why now)
                  </div>

                  <div className={styles.bullet} style={{ marginBottom: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 2 20 6v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4Z" stroke="currentColor" />
                      <path
                        d="M9 12l2 2 4-5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Journal fit shortlist + risk flags
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="upload" className={styles.anchor} />
          <div id="shortlist" className={styles.anchor} />
        </section>

        <section className={styles.audienceSection} aria-label="Who this is for">
          <div className={styles.audienceHeader}>
            <div>
              <div className={styles.audKicker}>
                <span className={styles.audDot} aria-hidden="true" />
                Who this is for
              </div>
              <h2 className={styles.audienceTitle}>Different stage. Same goal.</h2>
              <p className={styles.audienceSub}>Choose your stage to see what typically goes wrong - and what you will receive from us (in plain English).</p>
              <div className={styles.aiLine}>
                <span className={styles.aiBadge} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2 20 6v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4Z" stroke="currentColor" />
                    <path
                      d="M9 12l2 2 4-5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>
                  <b>Quick takeaway:</b> Journal fit + fix-first priorities + integrity safeguards +
                  submission checklist (no shortcuts).
                </span>
              </div>
            </div>
          </div>

          <div className={styles.audienceContent}>
            <div className={styles.tabRow} role="tablist" aria-label="Career stage tabs">
              {AUDIENCE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  className={`${styles.tab} ${
                    activeAudience === tab.id ? styles.tabActive : ""
                  }`}
                  type="button"
                  role="tab"
                  aria-selected={activeAudience === tab.id}
                  onClick={() => setActiveAudience(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className={styles.panelBox}>
              {AUDIENCE_TABS.map((tab) => (
                <div
                  key={tab.id}
                  className={`${styles.panel} ${
                    activeAudience === tab.id ? styles.panelActive : ""
                  }`}
                  role="tabpanel"
                  data-panel={tab.id}
                >
                  <div className={styles.panelGrid}>
                    <div className={styles.box}>
                      <div className={styles.boxHead}>
                        <span
                          className={`${styles.icoSm} ${
                            tab.leftTone === "amber"
                              ? styles.icoAmber
                              : tab.leftTone === "lilac"
                                ? styles.icoLilac
                                : styles.icoRose
                          }`}
                          aria-hidden="true"
                        >
                          !
                        </span>
                        <b>{tab.leftTitle}</b>
                      </div>
                      <ul className={styles.ul}>
                        {tab.leftItems.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={`${styles.box} ${styles.boxGood}`}>
                      <div className={styles.boxHead}>
                        <span className={`${styles.icoSm} ${styles.icoMint}`} aria-hidden="true">
                          ✓
                        </span>
                        <b>{tab.rightTitle}</b>
                      </div>
                      <ul className={styles.ul}>
                        {tab.rightItems.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={styles.outStrip}>
                    {tab.chips.map((chip) => (
                      <span key={chip.label} className={styles.audChip}>
                        {chip.icon ? chipIcons[chip.icon] : null}
                        {chip.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.deliverSection} aria-label="What you get">
          <div className={styles.deliverHeader}>
            <div>
              <div className={styles.deliverKicker}>
                <span className={styles.deliverDot} aria-hidden="true" />
                <span className={styles.sectionLabel}>Deliverables</span>
              </div>
              <h2 className={styles.deliverTitle}>What you get</h2>
              <p className={styles.deliverSub}>A guided view of the 4 deliverables. Click each step to see the problem solved and what the output looks like.</p>
              <div className={styles.deliverAiBox}>
                <span className={styles.deliverAiBadge} aria-hidden="true">
                  {deliverStar}
                </span>
                <span>
                  <b>How to use this:</b> Scan the steps. If a step matches your pain, that is the
                  support you need. When ready, share details and we will continue on WhatsApp.
                </span>
              </div>
            </div>
            <div className={styles.deliverBtnRow}>
              <button
                className={`${styles.deliverBtn} ${styles.deliverBtnPrimary}`}
                type="button"
                onClick={() => setPlanOpen(true)}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M22 2 11 13"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path d="M22 2 15 22l-4-9-9-4 20-7Z" stroke="currentColor" opacity=".95" />
                </svg>
                Get Journal Shortlist + Plan
              </button>
            </div>
          </div>

          <div className={styles.deliverContent}>
            <div className={styles.deliverLayout}>
              <div className={styles.deliverStepper} aria-label="Deliverable stepper">
                {DELIVERABLES.map((step) => (
                  <button
                    key={step.id}
                    className={`${styles.deliverStepBtn} ${
                      activeDeliverable === step.id ? styles.deliverStepBtnActive : ""
                    }`}
                    type="button"
                    onClick={() => setActiveDeliverable(step.id)}
                  >
                    <span className={styles.deliverStepNum}>{step.step}</span>
                    <span className={styles.deliverStepText}>
                      <b>{step.title}</b>
                      <small>{step.stepSummary}</small>
                    </span>
                  </button>
                ))}

                <div className={styles.deliverNotes}>
                  <div className={styles.deliverNotesHead}>
                    <div className={styles.deliverMiniIcon}>{deliverStar}</div>
                    Important notes
                  </div>
                  <ul className={styles.deliverNotesList}>
                    <li>
                      No acceptance guarantees. Editorial decisions and timelines depend on
                      journal screening, peer review, and revision cycles.
                    </li>
                    <li>
                      Shortlists are recommendations, not endorsements. Journal/indexing status
                      can change; verify on official sources.
                    </li>
                    <li>
                      Similarity/plagiarism: if requested, we interpret reports contextually and
                      do not "game" similarity scores.
                    </li>
                  </ul>
                </div>
              </div>

              <div aria-label="Deliverable preview panels">
                {DELIVERABLES.map((step) => {
                  const toneClass =
                    step.tone === "mint"
                      ? styles.deliverToneMint
                      : step.tone === "amber"
                        ? styles.deliverToneAmber
                        : step.tone === "lilac"
                          ? styles.deliverToneLilac
                          : styles.deliverToneRose;
                  return (
                    <div
                      key={step.id}
                      className={`${styles.deliverPanel} ${
                        activeDeliverable === step.id ? styles.deliverPanelActive : ""
                      }`}
                      role="tabpanel"
                    >
                      <div className={styles.deliverPanelTop}>
                        <div className={`${styles.deliverIcon} ${toneClass}`}>
                          {deliverIcons[step.id]}
                        </div>
                        <div>
                          <div className={styles.deliverH3}>
                            {step.title}
                            {step.id === "shortlist" ? " (5-10 options)" : ""}
                            {step.id === "readiness" ? " (peer-review style)" : ""}
                            {step.id === "integrity" ? " (publication ethics-first)" : ""}
                            {step.id === "submission" ? " (format + process support)" : ""}
                          </div>
                          <div className={styles.deliverProblem}>
                            <b>Problem solved:</b> {step.problem}
                          </div>
                        </div>
                      </div>

                      <div className={styles.deliverPanelGrid}>
                        <div className={`${styles.deliverCard} ${styles.deliverCardPad}`}>
                          <div className={styles.deliverCardTitle}>What you get</div>
                          <ul className={styles.deliverUl}>
                            {step.whatYouGet.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                          <div className={styles.deliverWhy}>
                            <div className={`${styles.deliverMiniIcon} ${toneClass}`}>
                              {deliverStar}
                            </div>
                            <div>
                              <b>Why this matters:</b> {step.why}
                            </div>
                          </div>
                          <div className={styles.deliverMiniChips}>
                            {step.chips.map((chip) => (
                              <span key={chip} className={styles.deliverMiniChip}>
                                {chip}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className={`${styles.deliverCard} ${styles.deliverCardPad}`}>
                          <div className={styles.deliverCardTitle}>What it looks like</div>
                          <div className={styles.deliverArtifact}>
                            <div className={styles.deliverArtifactHead}>
                              <b>{step.previewTitle}</b>
                              <span className={styles.deliverMiniPill}>preview</span>
                            </div>
                            {step.previewRows.map((row) => (
                              <div key={row.label} className={styles.deliverRowItem}>
                                <span>{row.label}</span>
                                <b>{row.value}</b>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.pricingSection} aria-label="Packages and pricing">
          <div className={styles.pricingHeader}>
            <div>
              <div className={styles.pricingKicker}>
                <span className={styles.pricingDot} aria-hidden="true" />
                <span className={styles.sectionLabel}>Packages &amp; pricing</span>
              </div>
              <h2 className={styles.pricingTitle}>
                Packages &amp; pricing{" "}
                <span className={styles.pricingTitleMuted}>(starting at)</span>
              </h2>
              <p className={styles.pricingSub}>Pick the level of publication support services you need - journal selection, pre-submission review, integrity safeguards, and submission pack planning.</p>
              <div className={styles.pricingTags}>
                <span className={styles.pricingTag}>journal selection</span>
                <span className={styles.pricingTag}>pre-submission review</span>
                <span className={styles.pricingTag}>submission checklist</span>
                <span className={styles.pricingTag}>publish online</span>
              </div>
            </div>
            <div className={styles.pricingBtnRow}>
              <button
                className={styles.pricingBtn}
                type="button"
                onClick={() => setPricingNoteOpen(true)}
              >
                {infoIcon} Pricing note
              </button>
              <button
                className={`${styles.pricingBtn} ${styles.pricingBtnPrimary}`}
                type="button"
                onClick={() =>
                  openWhatsAppMessage(
                    "Hi RE4U team, I want publication support. Please help me pick the right package and share the final quote.",
                  )
                }
              >
                {whatsappIcon} Start on WhatsApp (RE4U)
              </button>
            </div>
          </div>

          <div className={styles.pricingContent}>
            <div className={styles.pricingNote}>
              <b>How pricing works:</b> These are starting prices. Final pricing may vary based on
              manuscript length, technical complexity, number of tables/figures, and urgency. We
              confirm the final quote after a quick diagnostic and mutual agreement. Work starts
              after payment confirmation.
            </div>

            <div className={styles.pricingGrid}>
              {PRICING_PACKAGES.map((pkg) => (
                <div key={pkg.id} className={styles.pricingItem}>
                  <div className={styles.pricingItemLeft}>
                    <div className={styles.pricingBadges}>
                      {pkg.badges.map((badge) => (
                        <span
                          key={badge.label}
                          className={`${styles.pricingBadge} ${
                            badge.tone === "top"
                              ? styles.pricingBadgeTop
                              : badge.tone === "hot"
                                ? styles.pricingBadgeHot
                                : ""
                          }`}
                        >
                          {badge.label}
                        </span>
                      ))}
                    </div>
                    <div className={styles.pricingTitleRow}>
                      <div className={styles.pricingItemTitle}>{pkg.title}</div>
                      <span className={styles.pricingPill}>{pkg.turnaround}</span>
                    </div>
                    <div className={styles.pricingStars} aria-label="Rating">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span key={idx} className={styles.pricingStar}>
                          {starIcon}
                        </span>
                      ))}
                      <span className={styles.pricingStarNote}>
                        <b>{pkg.rating}</b> ({pkg.ratingNote})
                      </span>
                    </div>
                    <div className={styles.pricingDesc}>{pkg.description}</div>
                    <ul className={styles.pricingFeatures}>
                      {pkg.features.map((feature) => (
                        <li key={feature}>
                          {checkIcon}
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={styles.pricingActions}>
                      <button
                        className={styles.pricingBtnSmall}
                        type="button"
                        onClick={() => {
                          setActivePackageId(pkg.id);
                          setDrawerOpen(true);
                        }}
                      >
                        {infoIcon} Details
                      </button>
                    </div>
                  </div>

                  <div className={styles.pricingItemRight}>
                    <div className={styles.pricingPriceBox}>
                      <div className={styles.pricingPriceMain}>
                        {pkg.price} <small>starting</small>
                      </div>
                      <div className={styles.pricingTurn}>Turnaround: {pkg.turnaround}</div>
                      <div className={styles.pricingBuyBtns}>
                        <button
                          className={`${styles.pricingBtnSmall} ${styles.pricingBtnSmallPrimary}`}
                          type="button"
                          onClick={() =>
                            openWhatsAppMessage(
                              `Hi RE4U team, I want to start: ${pkg.title}. Please share the final quote and next steps.`,
                            )
                          }
                        >
                          {whatsappIcon} Start on WhatsApp
                        </button>
                        <button
                          className={styles.pricingBtnSmall}
                          type="button"
                          onClick={() =>
                            openWhatsAppMessage(
                              `Hi RE4U team, please share the final quote for: ${pkg.title}. My manuscript details: [discipline/type/timeline].`,
                            )
                          }
                        >
                          Request final quote
                        </button>
                      </div>
                      <div className={styles.pricingMiniNote}>
                        <b>Simple flow:</b> quick diagnostic -&gt; final quote -&gt; payment -&gt;
                        work starts.
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.pricingNote} style={{ marginTop: 12 }}>
              <b>Tip:</b> Click <b>Details</b> to see the exact problem this package solves and what
              you gain (in plain language).
            </div>
          </div>
        </section>

        <section className={styles.addOnSection} aria-label="Optional add-ons">
          <div className={styles.addOnHeader}>
            <div>
              <div className={styles.addOnKicker}>
                <span className={styles.addOnDot} aria-hidden="true" />
                <span className={styles.sectionLabel}>Add-ons</span>
              </div>
              <h2 className={styles.addOnTitle}>
                Optional add-ons{" "}
                <span className={styles.addOnTitleMuted}>(by request only)</span>
              </h2>
              <p className={styles.addOnSub}>
                Pick only what you need. Tap <b>Details</b> to see the problem it solves + benefits
                (in a conversational tone).
              </p>
            </div>
            <div className={styles.addOnBtnRow}>
              <button
                className={`${styles.addOnBtn} ${styles.addOnBtnPrimary}`}
                type="button"
                onClick={() =>
                  openWhatsAppMessage(
                    "Hi RE4U team, I need help choosing the right add-on for my publication. Please guide me.",
                  )
                }
              >
                {whatsappIcon} Ask RE4U
              </button>
            </div>
          </div>

          <div className={styles.addOnContent}>
            <div className={styles.addOnChips}>
              <div className={styles.addOnRow}>
                <b>Choose an add-on</b>
                <span className={styles.addOnPill}>short, clean, mobile-first</span>
              </div>
              <div className={styles.addOnGrid}>
                {ADD_ONS.map((addOn) => (
                  <div key={addOn.id} className={styles.addOnChip}>
                    <div>
                      <b>{addOn.name}</b>
                      <div className={styles.addOnMeta}>
                        {addOn.intent} - {addOn.eta}
                      </div>
                      <div className={styles.addOnMeta} style={{ marginTop: 8 }}>
                        {addOn.summary}
                      </div>
                    </div>
                    <div className={styles.addOnPriceSide}>
                      <div className={styles.addOnPrice}>{addOn.price}</div>
                      <div className={styles.addOnMeta}>starting</div>
                      <div className={styles.addOnActions}>
                        <button
                          className={styles.addOnBtnSmall}
                          type="button"
                          onClick={() => {
                            setActiveAddOnId(addOn.id);
                            setAddOnDrawerOpen(true);
                          }}
                        >
                          {infoIcon} Details
                        </button>
                        <button
                          className={`${styles.addOnBtnSmall} ${styles.addOnBtnSmallPrimary}`}
                          type="button"
                          onClick={() =>
                            openWhatsAppMessage(
                              `Hi RE4U team, I want the add-on: ${addOn.name}. Please share the final quote and next steps.`,
                            )
                          }
                        >
                          {whatsappIcon} Ask
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.addOnNote}>
                <b>Ethics-first default:</b> we only do add-ons if you request them, because
                journal rules and integrity policies vary.
              </div>
            </div>
          </div>
        </section>

        <section className={styles.eduSection} aria-label="Education guides">
          <div className={styles.eduHeader}>
            <div>
              <div className={styles.eduKicker}>
                <span className={styles.eduDot} aria-hidden="true" />
                <span className={styles.sectionLabel}>Education guides</span>
              </div>
              <h2 className={styles.eduTitle}>
                Quick guides that save careers{" "}
                <span className={styles.eduTitleMuted}>(fast, practical)</span>
              </h2>
              <p className={styles.eduSub}>
                Click a topic chip {"->"} the left guide opens and the right scan updates to match.
              </p>
              <div className={styles.eduChipsNav} aria-label="Education topics">
                {EDUCATION_TOPICS.map((topic) => (
                  <button
                    key={topic.id}
                    className={`${styles.eduChipBtn} ${
                      activeEduTopic === topic.id ? styles.eduChipActive : ""
                    }`}
                    type="button"
                    onClick={() => {
                      setActiveEduTopic(topic.id);
                      setOpenEduTopic(topic.id);
                    }}
                  >
                    {topic.icon}
                    {topic.chipLabel}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.eduBtnRow}>
              <button
                className={`${styles.eduBtn} ${styles.eduBtnPrimary}`}
                type="button"
                onClick={() =>
                  openWhatsAppMessage(
                    "Hi RE4U team, I want help choosing a safe publication pathway. Please guide me.",
                  )
                }
              >
                {whatsappIcon} Ask RE4U
              </button>
            </div>
          </div>

          <div className={styles.eduContent}>
            <div className={styles.eduGrid}>
              <div className={styles.eduAccordions}>
                {EDUCATION_TOPICS.map((topic) => (
                  <div
                    key={topic.id}
                    className={styles.eduAcc}
                    data-open={openEduTopic === topic.id}
                    id={`acc-${topic.id}`}
                  >
                    <button
                      className={styles.eduAccBtn}
                      type="button"
                      onClick={() => {
                        if (openEduTopic === topic.id) {
                          setOpenEduTopic(null);
                        } else {
                          setOpenEduTopic(topic.id);
                          setActiveEduTopic(topic.id);
                        }
                      }}
                    >
                      <div className={styles.eduAccLeft}>
                        <div className={styles.eduAccIcon}>{topic.icon}</div>
                        <div>
                          <div className={styles.eduAccTitle}>{topic.accordionTitle}</div>
                          <div className={styles.eduAccSub}>{topic.accordionSub}</div>
                        </div>
                      </div>
                      <svg className={styles.eduChev} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M9 18l6-6-6-6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <div className={styles.eduPanel}>
                      <p>{topic.intro}</p>
                      <ul className={styles.eduList}>
                        {topic.bullets.map((item) => (
                          <li key={item}>
                            {checkIcon}
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className={styles.eduNote}>
                        <b>Practical tip:</b> {topic.tip}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <aside className={styles.eduToolBox} aria-label="Right side tools">
                <b className={styles.eduRightTitle}>{activeEducation.rightTitle}</b>
                <div className={styles.eduHint}>{activeEducation.rightHint}</div>

                <div className={styles.eduTool}>
                  <div className={styles.eduToolHeader}>
                    <div className={styles.eduToolHeaderLeft}>
                      <div className={styles.eduToolIcon}>{activeEducation.icon}</div>
                      <div>
                        <b>Checklist</b>
                        <div className={styles.eduToolMuted}>{checkedCount} checked</div>
                      </div>
                    </div>
                    <span className={styles.eduPill}>{activeEducation.label}</span>
                  </div>

                  <div className={styles.eduToolBody}>
                    <div className={styles.eduToolScanList}>
                      {activeEducation.checks.map((check, idx) => {
                        const id = `scan-${activeEducation.id}-${idx}`;
                        return (
                          <div key={id} className={styles.eduChk}>
                            <input
                              type="checkbox"
                              id={id}
                              checked={activeChecks[idx] ?? false}
                              onChange={() => toggleEduCheck(idx)}
                            />
                            <label htmlFor={id}>{check}</label>
                          </div>
                        );
                      })}
                    </div>

                    <div className={styles.eduScore}>
                      <div>
                        <b>{eduRisk.message}</b>
                      </div>
                      <span
                        className={`${styles.eduBadge} ${
                          eduRisk.badge === "ok"
                            ? styles.eduBadgeOk
                            : eduRisk.badge === "warn"
                              ? styles.eduBadgeWarn
                              : styles.eduBadgeStop
                        }`}
                      >
                        {eduRisk.label}
                      </span>
                    </div>

                    <div className={`${styles.eduBtnRow} ${styles.eduToolBtnRow}`}>
                      <button
                        className={`${styles.eduBtn} ${styles.eduBtnPrimary} ${styles.eduAskBtn}`}
                        type="button"
                        onClick={() => {
                          const message = activeEducation.askMsg.replace(
                            "{n}",
                            String(checkedCount),
                          );
                          openWhatsAppMessage(message);
                        }}
                      >
                        {whatsappIcon} Ask RE4U
                      </button>
                      <button
                        className={`${styles.eduBtn} ${styles.eduResetBtn}`}
                        type="button"
                        onClick={resetEduChecks}
                      >
                        {deliverStar} Reset
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.eduNote}>
                  <b>Friendly reminder:</b> This is educational. For final verification, cross-check
                  with trusted sources (Think.Check.Submit, COPE, ICMJE) and the journal's official
                  site.
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.integritySection} aria-label="Integrity pledge">
          <div className={styles.integrityHeader}>
            <div>
              <div className={styles.integrityKicker}>
                <span className={styles.integrityDot} aria-hidden="true" />
                <span className={styles.sectionLabel}>Integrity pledge</span>
              </div>
              <h2 className={styles.integrityTitle}>Our Integrity Pledge</h2>
              <p className={styles.integritySub}>A clear contract between you and us: we help you publish responsibly, and we do not touch anything that can backfire later.</p>
            </div>
            <div className={styles.integrityBtnRow}>
              <button
                className={`${styles.integrityBtn} ${styles.integrityBtnPrimary}`}
                type="button"
                onClick={() =>
                  openWhatsAppMessage(
                    "Hi RE4U team, I want an integrity-first publication support plan. Please guide me.",
                  )
                }
              >
                {whatsappIcon} Ask RE4U
              </button>
              <button className={styles.integrityBtn} type="button" onClick={handleCopyPledge}>
                {deliverStar} {copyState === "copied" ? "Copied ✓" : "Copy pledge"}
              </button>
            </div>
          </div>

          <div className={styles.integrityContent}>
            <div className={styles.integrityCard}>
              <div className={styles.integrityTop}>
                <b>Integrity Contract</b>
                <span className={styles.integrityStamp}>
                  {shieldIcon} Ethics-first
                </span>
              </div>

              <div className={styles.integrityCols}>
                <div className={styles.integrityCol}>
                  <div className={styles.integrityColTitle}>
                    {crossIcon} We will never
                  </div>
                  <ul className={styles.integrityList}>
                    {integrityNever.map((item) => (
                      <li key={item}>
                        {crossIcon}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.integrityCol}>
                  <div className={styles.integrityColTitle}>
                    {shieldIcon} What we do promise
                  </div>
                  <ul className={styles.integrityList}>
                    {integrityPromise.map((item) => (
                      <li key={item}>
                        {checkIcon}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.integrityAccWrap} aria-label="Why these rules exist">
                {integrityFaq.map((faq) => (
                  <div
                    key={faq.id}
                    className={styles.integrityAcc}
                    data-open={integrityOpen === faq.id}
                  >
                    <button
                      className={styles.integrityAccBtn}
                      type="button"
                      onClick={() =>
                        setIntegrityOpen((prev) => (prev === faq.id ? "" : faq.id))
                      }
                    >
                      <b>{faq.title}</b>
                      <svg className={styles.integrityChev} viewBox="0 0 24 24" fill="none">
                        <path
                          d="M9 18l6-6-6-6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <div className={styles.integrityAccPanel}>{faq.body}</div>
                  </div>
                ))}
              </div>

              <div className={styles.integrityActions}>
                <button
                  className={`${styles.integrityBtnSmall} ${styles.integrityBtnPrimarySmall}`}
                  type="button"
                  onClick={() =>
                    openWhatsAppMessage(
                      "Hi RE4U team, I want an integrity-first publication support plan. Please guide me.",
                    )
                  }
                >
                  {whatsappIcon} Start on WhatsApp
                </button>
                <button
                  className={styles.integrityBtnSmall}
                  type="button"
                  onClick={() => window.print()}
                >
                  {infoIcon} Print / Save
                </button>
              </div>

              <div className={styles.integrityNote}>
                <b>Our goal:</b> help you submit confidently - with clarity, compliance, and integrity.
              </div>
            </div>
          </div>
        </section>

        <section className={styles.faqSection} aria-label="FAQs">
          <div className={styles.faqHeader}>
            <div>
              <div className={styles.faqKicker}>
                <span className={styles.faqDot} aria-hidden="true" />
                <span className={styles.sectionLabel}>FAQs</span>
              </div>
              <h2 className={styles.faqTitle}>FAQs</h2>
              <p className={styles.faqSub}>
                Quick answers in a client tone. Search your question - or just tap to expand.
              </p>
            </div>
          </div>

          <div className={styles.faqContent}>
            <div className={styles.faqWrap}>
              <div>
                <div className={styles.faqSearchBox}>
                  <div className={styles.faqSearchRow}>
                    <div className={styles.faqSearchIcon}>
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M10.5 18a7.5 7.5 0 1 1 7.5-7.5A7.5 7.5 0 0 1 10.5 18Z"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M16.5 16.5 21 21"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <input
                      className={styles.faqSearchInput}
                      type="text"
                      placeholder="Search: guarantee, predatory, paper mill, AI disclosure, pricing..."
                      aria-label="Search FAQs"
                      value={faqQuery}
                      onChange={(event) => setFaqQuery(event.target.value)}
                    />
                  </div>
                    <div className={styles.faqSearchNote}>
                      Showing <b>{filteredFaqs.length}</b> FAQs - Schema-ready (FAQPage JSON-LD
                      included)
                    </div>
                </div>

                <div className={styles.faqAccordions} aria-label="FAQ accordion list">
                  {filteredFaqs.map((faq) => (
                    <div
                      key={faq.id}
                      className={styles.faqAcc}
                      data-open={openFaq === faq.id}
                    >
                      <button
                        className={styles.faqAccBtn}
                        type="button"
                        onClick={() =>
                          setOpenFaq((prev) => (prev === faq.id ? "" : faq.id))
                        }
                      >
                        <div className={styles.faqAccLeft}>
                          <div className={styles.faqQIcon}>{infoIcon}</div>
                          <div className={styles.faqQText}>
                            <b>{faq.question}</b>
                            <span>{faq.excerpt}</span>
                          </div>
                        </div>
                        <svg className={styles.faqChev} viewBox="0 0 24 24" fill="none">
                          <path
                            d="M9 18l6-6-6-6"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <div className={styles.faqPanel}>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className={styles.faqSide} aria-label="Need help">
                <b>Still unsure?</b>
                <div className={styles.faqSideMuted}>
                  Send your manuscript goal and we will guide you to the right package and next
                  step (no pressure).
                </div>
                <div className={styles.faqSidePills} aria-label="Common topics">
                  {[
                    "journal selection",
                    "pre-submission review",
                    "predatory journals",
                    "paper mills",
                    "AI disclosure",
                    "pricing",
                  ].map((pill) => (
                    <span key={pill} className={styles.faqSidePill}>
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M20 13 13 20 4 11V4h7l9 9Z"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.5 7.5h.01"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                      </svg>
                      {pill}
                    </span>
                  ))}
                </div>
                <button
                  className={`${styles.faqSideBtn} ${styles.faqSideBtnPrimary}`}
                  type="button"
                  onClick={() =>
                    openWhatsAppMessage(
                      "Hi RE4U team, I have a question about publication support. Please guide me.",
                    )
                  }
                >
                  {whatsappIcon} Ask RE4U on WhatsApp
                </button>
                <div className={styles.faqMiniNote}>
                  <b>Privacy:</b> confidentiality is standard.
                </div>
              </aside>
            </div>
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        </section>

        <section className={styles.finalCtaSection} aria-label="Final CTA">
          <div className={styles.finalCtaGrid}>
            <div>
              <div className={styles.finalCtaHeadline}>
                Your research deserves a safe submission pathway.
              </div>
              <div className={styles.finalCtaSub}>
                Not luck. Not shortcuts. Not "guaranteed acceptance" traps.
                <br />
                Just a clean, journal-fit plan - and a submission you can stand behind.
              </div>

              <div className={styles.finalCtaPunch} aria-label="Emotional reassurance chips">
                <span className={styles.finalCtaPill}>
                  {shieldIcon} Ethics-first
                </span>
                <span className={styles.finalCtaPill}>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 21s-7-4.5-9.2-9.1C1 7.9 3.4 5 6.6 5c1.7 0 3.2.9 4 2.1C11.4 5.9 12.9 5 14.6 5c3.2 0 5.6 2.9 3.8 6.9C19 16.5 12 21 12 21Z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Less stress
                </span>
                <span className={styles.finalCtaPill}>
                  {infoIcon} Clear steps
                </span>
              </div>

              <div className={styles.finalCtaTrust} aria-label="Trust strip">
                <span className={styles.finalCtaTrustItem}>
                  {shieldIcon} Confidential
                </span>
                <span className={styles.finalCtaTrustItem}>
                  {shieldIcon} No guarantees
                </span>
                <span className={styles.finalCtaTrustItem}>
                  {shieldIcon} Human expert review
                </span>
              </div>
            </div>

            <div className={styles.finalCtaBox} aria-label="CTA buttons">
              <b>Start in 2 minutes</b>
              <div className={styles.finalCtaNote}>
                Starting at <b>INR 6,999</b>. Pricing may vary based on scope and urgency
                (confirmed after a quick diagnostic).
              </div>

              <div className={styles.finalCtaBtnRow}>
                <button
                  className={`${styles.finalCtaBtn} ${styles.finalCtaBtnPrimary}`}
                  type="button"
                  onClick={() => {
                    setCtaMode("upload");
                    setCtaOpen(true);
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 16V4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path
                      d="M7 9l5-5 5 5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M4 20h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  Upload Manuscript
                </button>
                <button
                  className={styles.finalCtaBtn}
                  type="button"
                  onClick={() => {
                    setCtaMode("plan");
                    setCtaOpen(true);
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 3h10v18H7V3Z" stroke="currentColor" strokeWidth="1.4" />
                    <path
                      d="M9 7h6M9 11h6M9 15h4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                  Get Journal Shortlist &amp; Plan
                </button>
              </div>

              <div className={styles.finalCtaNote}>
                Prefer WhatsApp? Clicking a button will ask a few questions and open a message
                window.
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.pricingMobileBar} aria-label="Mobile CTA bar">
        <div className={styles.pricingMobileRow}>
          <div>
            <b>Need help choosing?</b>
            <br />
            <span className={styles.pricingMobileHint}>
              Message RE4U for the right package
            </span>
          </div>
          <button
            className={`${styles.pricingBtnSmall} ${styles.pricingBtnSmallPrimary}`}
            type="button"
            onClick={() =>
              openWhatsAppMessage(
                "Hi RE4U team, I want publication support. Please help me pick the right package and share the final quote.",
              )
            }
          >
            {whatsappIcon} WhatsApp
          </button>
        </div>
      </div>

      <div
        className={styles.ctaModalBackdrop}
        data-open={ctaOpen}
        aria-hidden={!ctaOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) setCtaOpen(false);
        }}
      >
        <div className={styles.ctaModal} role="dialog" aria-modal="true" aria-labelledby="ctaTitle">
          <div className={styles.ctaModalHeader}>
            <div>
              <strong id="ctaTitle">
                {ctaMode === "upload"
                  ? "Upload Manuscript (start here)"
                  : "Get Journal Shortlist & Plan"}
              </strong>
              <span>
                {ctaMode === "upload"
                  ? "For demo: we will package your answers into a WhatsApp message."
                  : "Tell us your goal + constraints. We will guide you on WhatsApp."}
              </span>
            </div>
            <button
              className={styles.ctaIconBtn}
              type="button"
              onClick={() => setCtaOpen(false)}
              aria-label="Close"
            >
              X
            </button>
          </div>

          <div className={styles.ctaModalBody}>
            <div className={styles.ctaModalNote}>
              <b>Quick note:</b> We will confirm scope + final quote first. Work begins after
              payment confirmation.
            </div>

            <div className={styles.ctaFormGrid}>
              <div className={styles.ctaField}>
                <label htmlFor="ctaDiscipline">Discipline</label>
                <input
                  id="ctaDiscipline"
                  type="text"
                  placeholder="e.g., Chemistry / Medicine / Social sciences"
                  value={ctaForm.discipline}
                  onChange={updateCtaField("discipline")}
                />
              </div>
              <div className={styles.ctaField}>
                <label htmlFor="ctaType">Manuscript type</label>
                <select
                  id="ctaType"
                  value={ctaForm.manuscriptType}
                  onChange={updateCtaField("manuscriptType")}
                >
                  <option value="Not sure">Not sure</option>
                  <option value="Research article">Research article</option>
                  <option value="Review article">Review article</option>
                  <option value="Case study">Case study</option>
                  <option value="Short communication">Short communication</option>
                  <option value="Conference paper">Conference paper</option>
                </select>
              </div>
              <div className={styles.ctaField}>
                <label htmlFor="ctaTimeline">Timeline</label>
                <select
                  id="ctaTimeline"
                  value={ctaForm.timeline}
                  onChange={updateCtaField("timeline")}
                >
                  <option value="No strict deadline">No strict deadline</option>
                  <option value="Within 1 week">Within 1 week</option>
                  <option value="2-4 weeks">2-4 weeks</option>
                  <option value="1-2 months">1-2 months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
              <div className={styles.ctaField}>
                <label htmlFor="ctaBudget">Budget / APC comfort</label>
                <select
                  id="ctaBudget"
                  value={ctaForm.budget}
                  onChange={updateCtaField("budget")}
                >
                  <option value="Not sure">Not sure</option>
                  <option value="Low (prefer minimal fees)">Low (prefer minimal fees)</option>
                  <option value="Medium">Medium</option>
                  <option value="High (APC acceptable)">High (APC acceptable)</option>
                </select>
              </div>
              <div className={styles.ctaField}>
                <label htmlFor="ctaNotes">Anything else?</label>
                <textarea
                  id="ctaNotes"
                  placeholder="e.g., need Scopus/WoS, target country, urgency, previous rejection..."
                  value={ctaForm.notes}
                  onChange={updateCtaField("notes")}
                />
              </div>
            </div>
          </div>

          <div className={styles.ctaModalFooter}>
            <div className={styles.ctaMutedNote}>
              Tip: Replace the demo WhatsApp handoff with your real upload form or URL when
              integrating.
            </div>
            <div className={styles.ctaActions}>
              <button className={styles.ctaBtnSmall} type="button" onClick={() => setCtaOpen(false)}>
                Cancel
              </button>
              <button
                className={`${styles.ctaBtnSmall} ${styles.ctaBtnSmallPrimary}`}
                type="button"
                onClick={handleCtaSubmit}
              >
                {whatsappIcon} Continue on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={styles.pricingDrawerBackdrop}
        data-open={drawerOpen}
        aria-hidden={!drawerOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) setDrawerOpen(false);
        }}
      >
        <div className={styles.pricingDrawer} role="dialog" aria-modal="true" aria-labelledby="drTitle">
          <div className={styles.pricingDrawerHeader}>
            <div>
              <strong id="drTitle">{activePackage.title}</strong>
              <span>{activePackage.detail.who}</span>
            </div>
            <button
              className={styles.pricingIconBtn}
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close"
            >
              X
            </button>
          </div>

          <div className={styles.pricingDrawerBody}>
            <div className={styles.pricingBlock}>
              <div className={styles.pricingBlockTitle}>Quick summary</div>
              <div className={styles.pricingPillRow}>
                <span className={styles.pricingPill}>{activePackage.price} (starting)</span>
                <span className={styles.pricingPill}>
                  Turnaround: <b>{activePackage.turnaround}</b>
                </span>
              </div>
            </div>

            <div className={styles.pricingBlock}>
              <div className={styles.pricingBlockTitle}>If this sounds like you...</div>
              <div className={styles.pricingProblem}>{activePackage.detail.problem}</div>
            </div>

            <div className={styles.pricingBlock}>
              <div className={styles.pricingBlockTitle}>What you gain (benefits)</div>
              <ul className={styles.pricingBulletList}>
                {activePackage.detail.benefits.map((item) => (
                  <li key={item}>
                    {checkIcon}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.pricingBlock}>
              <div className={styles.pricingBlockTitle}>What you get (deliverables)</div>
              <ul className={styles.pricingBulletList}>
                {activePackage.detail.youGet.map((item) => (
                  <li key={item}>
                    {checkIcon}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.pricingMiniNote}>
              <b>Next step:</b> We confirm scope with a quick diagnostic -&gt; share final quote -&gt;
              once you approve and pay, we start.
            </div>
          </div>

          <div className={styles.pricingDrawerFooter}>
            <div className={styles.pricingSmallNote}>
              WhatsApp is used to confirm details and send the final quote.
            </div>
            <div className={styles.pricingFooterActions}>
              <button
                className={styles.pricingBtnSmall}
                type="button"
                onClick={() =>
                  openWhatsAppMessage(
                    `Hi RE4U team, please share the final quote for: ${activePackage.title}. My manuscript details: [discipline/type/timeline].`,
                  )
                }
              >
                Request final quote
              </button>
              <button
                className={`${styles.pricingBtnSmall} ${styles.pricingBtnSmallPrimary}`}
                type="button"
                onClick={() =>
                  openWhatsAppMessage(
                    `Hi RE4U team, I want to start: ${activePackage.title}. Please share the final quote and next steps.`,
                  )
                }
              >
                {whatsappIcon} Start
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={styles.pricingNoteBackdrop}
        data-open={pricingNoteOpen}
        aria-hidden={!pricingNoteOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) setPricingNoteOpen(false);
        }}
      >
        <div className={styles.pricingNoteModal} role="dialog" aria-modal="true" aria-labelledby="pTitle">
          <div className={styles.pricingNoteHeader}>
            <div>
              <strong id="pTitle">Pricing note</strong>
              <span>Starting prices. Final quote after quick diagnostic + mutual agreement.</span>
            </div>
            <button
              className={styles.pricingIconBtn}
              type="button"
              onClick={() => setPricingNoteOpen(false)}
              aria-label="Close"
            >
              X
            </button>
          </div>
          <div className={styles.pricingNoteBody}>
            <div className={styles.pricingMiniNote}>
              These are starting prices. Final pricing may vary based on manuscript length,
              technical complexity, number of tables/figures, and urgency. We confirm the final
              quote after a quick diagnostic and mutual agreement. Work starts after payment
              confirmation.
            </div>
          </div>
          <div className={styles.pricingNoteFooter}>
            <div className={styles.pricingSmallNote}>
              We keep it transparent: no hidden add-ons, no surprise charges.
            </div>
            <div className={styles.pricingFooterActions}>
              <button
                className={styles.pricingBtnSmall}
                type="button"
                onClick={() => setPricingNoteOpen(false)}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={styles.addOnDrawerBackdrop}
        data-open={addOnDrawerOpen}
        aria-hidden={!addOnDrawerOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) setAddOnDrawerOpen(false);
        }}
      >
        <div className={styles.addOnDrawer} role="dialog" aria-modal="true" aria-labelledby="addonTitle">
          <div className={styles.addOnDrawerHeader}>
            <div>
              <strong id="addonTitle">{activeAddOn.name}</strong>
              <span>
                Starting at {activeAddOn.price} - {activeAddOn.eta}
              </span>
            </div>
            <button
              className={styles.addOnIconBtn}
              type="button"
              onClick={() => setAddOnDrawerOpen(false)}
              aria-label="Close"
            >
              X
            </button>
          </div>

          <div className={styles.addOnDrawerBody}>
            <div className={styles.addOnBlock}>
              <div className={styles.addOnBlockTitle}>If this sounds like you...</div>
              <div className={styles.addOnProblem}>{activeAddOn.ifYou}</div>
            </div>

            <div className={styles.addOnBlock}>
              <div className={styles.addOnBlockTitle}>What you gain (benefits)</div>
              <ul className={styles.addOnBullets}>
                {activeAddOn.gain.map((item) => (
                  <li key={item}>
                    {checkIcon}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.addOnBlock}>
              <div className={styles.addOnBlockTitle}>What you get (deliverables)</div>
              <ul className={styles.addOnBullets}>
                {activeAddOn.get.map((item) => (
                  <li key={item}>
                    {checkIcon}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.addOnNote}>
              <b>Note:</b> Add-ons are done by request only, because journal policies vary. We keep
              everything policy-safe and ethical.
            </div>
          </div>

          <div className={styles.addOnDrawerFooter}>
            <div className={styles.addOnSmallNote}>
              Want this add-on? Click "Start on WhatsApp" and we will confirm scope + quote.
            </div>
            <div className={styles.addOnFooterActions}>
              <button
                className={styles.addOnBtnSmall}
                type="button"
                onClick={() => setAddOnDrawerOpen(false)}
              >
                Close
              </button>
              <button
                className={`${styles.addOnBtnSmall} ${styles.addOnBtnSmallPrimary}`}
                type="button"
                onClick={() =>
                  openWhatsAppMessage(
                    `Hi RE4U team, I want the add-on: ${activeAddOn.name}. Please share the final quote and next steps.`,
                  )
                }
              >
                {whatsappIcon} Start on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.modalBackdrop}
        data-open={planOpen}
        aria-hidden={!planOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) setPlanOpen(false);
        }}
      >
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="planTitle">
          <div className={styles.modalHeader}>
            <div>
              <strong id="planTitle">Journal Shortlist + Publication Plan</strong>
              <span>
                Share a few details and we will connect you with our team via WhatsApp or Email.
              </span>
            </div>
            <button
              className={styles.iconBtn}
              type="button"
              onClick={() => setPlanOpen(false)}
              aria-label="Close"
            >
              X
            </button>
          </div>

          <div className={styles.modalBody}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmitPlan();
              }}
            >
              <div className={styles.grid2}>
                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    id="name"
                    name="name"
                    placeholder="e.g., Dr. Priya Sharma"
                    required
                    value={formData.name}
                    onChange={updateField("name")}
                  />
                </div>
                <div>
                  <label htmlFor="discipline">Discipline / area</label>
                  <input
                    id="discipline"
                    name="discipline"
                    placeholder="e.g., Environmental Science / Chemistry"
                    value={formData.discipline}
                    onChange={updateField("discipline")}
                  />
                </div>
              </div>

              <div className={styles.grid2} style={{ marginTop: 12 }}>
                <div>
                  <label htmlFor="email">Email (optional)</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@university.edu"
                    value={formData.email}
                    onChange={updateField("email")}
                  />
                </div>
                <div>
                  <label htmlFor="whatsapp">WhatsApp number (optional)</label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    placeholder="+91-XXXXXXXXXX"
                    value={formData.whatsapp}
                    onChange={updateField("whatsapp")}
                  />
                </div>
              </div>

              <div className={styles.grid2} style={{ marginTop: 12 }}>
                <div>
                  <label htmlFor="manuscriptType">Manuscript type</label>
                  <select
                    id="manuscriptType"
                    name="manuscriptType"
                    value={formData.manuscriptType}
                    onChange={updateField("manuscriptType")}
                  >
                    <option value="Not sure">Not sure</option>
                    <option value="Original research">Original research</option>
                    <option value="Review">Review</option>
                    <option value="Short communication">Short communication</option>
                    <option value="Case report">Case report</option>
                    <option value="Conference paper">Conference paper</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="priority">Your top priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={updateField("priority")}
                  >
                    <option value="Best fit / credibility">Best fit / credibility</option>
                    <option value="Faster decision">Faster decision</option>
                    <option value="Indexed venue (Scopus/WoS/PubMed)">
                      Indexed venue (Scopus/WoS/PubMed)
                    </option>
                    <option value="Lower APC / budget-sensitive">Lower APC / budget-sensitive</option>
                  </select>
                </div>
              </div>

              <div className={styles.grid2} style={{ marginTop: 12 }}>
                <div>
                  <label htmlFor="indexing">Indexing need</label>
                  <select
                    id="indexing"
                    name="indexing"
                    value={formData.indexing}
                    onChange={updateField("indexing")}
                  >
                    <option value="Not sure">Not sure</option>
                    <option value="Scopus">Scopus</option>
                    <option value="Web of Science">Web of Science</option>
                    <option value="PubMed/Medline">PubMed/Medline</option>
                    <option value="UGC CARE / institutional list">UGC CARE / institutional list</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline">Timeline goal</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={updateField("timeline")}
                  >
                    <option value="No strict deadline">No strict deadline</option>
                    <option value="Within 2-4 weeks (submission ready)">
                      Within 2-4 weeks (submission ready)
                    </option>
                    <option value="Within 1-2 months">Within 1-2 months</option>
                    <option value="Urgent (tell us why)">Urgent (tell us why)</option>
                  </select>
                </div>
              </div>

              <div className={styles.row3}>
                <div>
                  <label htmlFor="notes">Anything we should know? (optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="e.g., target journal type, prior rejections, APC limit, co-author constraints..."
                    value={formData.notes}
                    onChange={updateField("notes")}
                  />
                </div>
              </div>
            </form>
          </div>

          <div className={styles.modalFooter}>
            <div className={styles.leftNote}>
              We will never promise acceptance. We help you choose a safer path and submit correctly.
            </div>
            <div className={styles.modalActions}>
              <button className={styles.btnSmall} type="button" onClick={() => setPlanOpen(false)}>
                Cancel
              </button>
              <button
                className={`${styles.btnSmall} ${styles.primary}`}
                type="button"
                onClick={handleSubmitPlan}
                disabled={!canSubmit}
              >
                Submit and Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={styles.modalBackdrop}
        data-open={channelOpen}
        aria-hidden={!channelOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) setChannelOpen(false);
        }}
      >
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="channelTitle">
          <div className={styles.modalHeader}>
            <div>
              <strong id="channelTitle">Continue the discussion</strong>
              <span>Choose how you would like to share your details with our team.</span>
            </div>
            <button
              className={styles.iconBtn}
              type="button"
              onClick={() => setChannelOpen(false)}
              aria-label="Close"
            >
              X
            </button>
          </div>

          <div className={styles.modalBody}>
            <div className={styles.channelBox}>
              <button className={styles.channel} type="button" onClick={handleWhatsApp}>
                <div>
                  <strong>WhatsApp</strong>
                  <br />
                  <span>Opens chat with your details</span>
                </div>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M20 11.6a7.8 7.8 0 0 1-11.4 7L4 20l1.5-4.4A7.8 7.8 0 1 1 20 11.6Z"
                    stroke="currentColor"
                    opacity=".95"
                  />
                  <path
                    d="M9 9.5c.6 2.2 2.3 4 4.6 4.6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    opacity=".85"
                  />
                </svg>
              </button>

              <button className={styles.channel} type="button" onClick={handleEmail}>
                <div>
                  <strong>Email</strong>
                  <br />
                  <span>Opens your mail app</span>
                </div>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 6h16v12H4z" stroke="currentColor" opacity=".95" />
                  <path
                    d="M4 7l8 6 8-6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity=".85"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
