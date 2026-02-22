export type Persona = "phd" | "conference" | "lab" | "industry";
export type DeadlineKey = "48h" | "week" | "flex";
export type UseKey = "viva" | "conf" | "lab" | "industry";
export type HaveKey = "manuscript" | "draftppt" | "figures";
export type PresentationNeed = "defence" | "proposal" | "poster" | "conference";
export type SampleCategory =
  | "Thesis Defence"
  | "Viva/Proposal"
  | "Conference Decks"
  | "Research Posters";
export type FaqFilter =
  | "all"
  | "structure"
  | "slides"
  | "posters"
  | "files"
  | "process"
  | "urgent";

export type MilestoneService = {
  id: string;
  label: string;
  title: string;
  text: string;
  scores: Record<Persona, number>;
};

export type OutputRecommendation = {
  id: string;
  name: string;
  outcome: string;
  format: string;
  tags: string[];
  sampleAnchor: string;
  scoreByUse: Record<UseKey, number>;
  scoreByDeadline: Record<DeadlineKey, number>;
  scoreByHave: Record<HaveKey, number>;
};

export type TrustCard = {
  id: string;
  icon: string;
  title: string;
  chips: string[];
  backPoints: string[];
  rating: number;
  reviews: string;
};

export type WorkflowStep = {
  id: string;
  short: string;
  title: string;
  happens: string[];
  need: string[];
};

export type Plan = {
  id: string;
  icon: string;
  badge?: string;
  name: string;
  whoFor: string;
  price: string;
  priceMeta: string;
  etaLabel: string;
  eta: string;
  points: string[];
  featured?: boolean;
};

export type EthicalSupportItem = {
  id: string;
  icon: string;
  title: string;
  detail: string;
};

export type SampleItem = {
  id: string;
  title: string;
  deliverable: string;
  field: string;
  style: string;
  format: string;
  turnaround: string;
  changes: string[];
};

export type FaqItem = {
  id: string;
  q: string;
  a: string;
  tags: FaqFilter[];
};

export const personaOptions: { id: Persona; label: string }[] = [
  { id: "phd", label: "PhD / Viva" },
  { id: "conference", label: "Conference Presenter" },
  { id: "lab", label: "Lab / Team Update" },
  { id: "industry", label: "Industry R&D" },
];

export const milestoneServices: MilestoneService[] = [
  {
    id: "thesis",
    label: "Best for Defence narrative",
    title: "Thesis Defence Presentation",
    text: "Turn chapters into a clean story: problem, method, results, implications, and limitations.",
    scores: { phd: 100, conference: 55, lab: 70, industry: 40 },
  },
  {
    id: "poster",
    label: "Best for Conference visibility",
    title: "Research Poster Design",
    text: "Build high-readability posters for crowded sessions with strong visual hierarchy.",
    scores: { phd: 85, conference: 100, lab: 50, industry: 60 },
  },
  {
    id: "conference",
    label: "Best for Talk impact",
    title: "Conference Deck",
    text: "Structure your talk for timing discipline, clear transitions, and memorable findings.",
    scores: { phd: 70, conference: 95, lab: 60, industry: 65 },
  },
  {
    id: "labupdate",
    label: "Best for Internal reporting",
    title: "Lab / Team Update Deck",
    text: "Translate technical progress into decision-ready updates for supervisors and teams.",
    scores: { phd: 60, conference: 50, lab: 100, industry: 70 },
  },
  {
    id: "pitch",
    label: "Best for Funding and partners",
    title: "Grant / Proposal Deck",
    text: "Frame value, feasibility, and impact for reviewers, funders, and stakeholders.",
    scores: { phd: 45, conference: 40, lab: 65, industry: 100 },
  },
  {
    id: "dataviz",
    label: "Best for Figure-heavy work",
    title: "Data Visualization Cleanup",
    text: "Improve chart logic, labels, and figure consistency for both decks and posters.",
    scores: { phd: 75, conference: 80, lab: 85, industry: 90 },
  },
];

export const outputChoices = {
  deadline: [
    { value: "48h" as const, label: "48 hours" },
    { value: "week" as const, label: "This week" },
    { value: "flex" as const, label: "Flexible" },
  ],
  use: [
    { value: "viva" as const, label: "Viva / Defence" },
    { value: "conf" as const, label: "Conference" },
    { value: "lab" as const, label: "Lab update" },
    { value: "industry" as const, label: "Industry R&D" },
  ],
  have: [
    { value: "manuscript" as const, label: "Manuscript" },
    { value: "draftppt" as const, label: "Draft PPT" },
    { value: "figures" as const, label: "Raw figures" },
  ],
};

export const outputRecommendations: OutputRecommendation[] = [
  {
    id: "defence",
    name: "Thesis Defence Presentation (PPT)",
    outcome: "A committee-ready story where your contribution is obvious without slide clutter.",
    format: "PPTX",
    tags: ["PhD viva", "Q&A-ready", "Template consistency"],
    sampleAnchor: "#samples",
    scoreByUse: { viva: 50, conf: 12, lab: 15, industry: 10 },
    scoreByDeadline: { "48h": 18, week: 24, flex: 20 },
    scoreByHave: { manuscript: 20, draftppt: 14, figures: 10 },
  },
  {
    id: "poster",
    name: "Research Poster (A0/A1/36x48)",
    outcome: "A fast-reading poster layout that communicates findings within minutes.",
    format: "Print-ready PDF",
    tags: ["A0/A1", "300 DPI safe", "Poster examples"],
    sampleAnchor: "#samples",
    scoreByUse: { viva: 12, conf: 48, lab: 16, industry: 14 },
    scoreByDeadline: { "48h": 15, week: 21, flex: 24 },
    scoreByHave: { manuscript: 16, draftppt: 8, figures: 18 },
  },
  {
    id: "talk",
    name: "Conference Talk Deck",
    outcome: "Story-first slides built for strict speaking windows and strong transitions.",
    format: "PPTX",
    tags: ["Talk timing", "Visual hierarchy", "Slide rhythm"],
    sampleAnchor: "#samples",
    scoreByUse: { viva: 18, conf: 52, lab: 20, industry: 26 },
    scoreByDeadline: { "48h": 12, week: 22, flex: 24 },
    scoreByHave: { manuscript: 16, draftppt: 18, figures: 12 },
  },
  {
    id: "convert",
    name: "PPT to Poster Conversion",
    outcome: "Convert existing slides into print-safe poster format with corrected scaling.",
    format: "Poster PDF + source",
    tags: ["PPT to poster", "Format rescue", "Fast turnaround"],
    sampleAnchor: "#samples",
    scoreByUse: { viva: 8, conf: 35, lab: 22, industry: 16 },
    scoreByDeadline: { "48h": 20, week: 17, flex: 12 },
    scoreByHave: { manuscript: 8, draftppt: 28, figures: 16 },
  },
  {
    id: "pitch",
    name: "Grant / Proposal Deck",
    outcome: "Narrative built for funding logic: problem, value, method, and execution readiness.",
    format: "PPTX + PDF",
    tags: ["Funding pitch", "Roadmap visual", "Impact framing"],
    sampleAnchor: "#plans",
    scoreByUse: { viva: 10, conf: 12, lab: 30, industry: 55 },
    scoreByDeadline: { "48h": 10, week: 20, flex: 30 },
    scoreByHave: { manuscript: 18, draftppt: 10, figures: 12 },
  },
];

export const trustCards: TrustCard[] = [
  {
    id: "acc",
    icon: "AC",
    title: "Accuracy checked by experts",
    chips: ["SME-reviewed", "Claims validated", "Labels consistent"],
    backPoints: [
      "SME review for scientific accuracy",
      "Label and unit consistency check",
      "Mechanism and claim validation",
    ],
    rating: 4.5,
    reviews: "TBD",
  },
  {
    id: "print",
    icon: "PR",
    title: "Journal-ready and print-ready",
    chips: ["300 DPI ready", "Journal specs", "Color-safe"],
    backPoints: [
      "Print-safe layout and spacing",
      "Resolution checks (e.g., 300 DPI)",
      "Color and grayscale readiness",
    ],
    rating: 4.5,
    reviews: "TBD",
  },
  {
    id: "editable",
    icon: "ED",
    title: "Editable files included",
    chips: ["Layered source", "Reusable parts", "Easy updates"],
    backPoints: [
      "Layered source file included",
      "Reusable styles and components",
      "Easy future edits (no rework)",
    ],
    rating: 4.5,
    reviews: "TBD",
  },
  {
    id: "samples",
    icon: "SM",
    title: "Real samples you can review",
    chips: ["Before/after", "By discipline", "Style preview"],
    backPoints: [
      "Real sample gallery access",
      "Before and after examples",
      "Discipline-wise sample sets",
    ],
    rating: 4.5,
    reviews: "TBD",
  },
  {
    id: "revisions",
    icon: "RV",
    title: "Clear revisions until it is right",
    chips: ["Clear rounds", "Fast changes", "Final QC"],
    backPoints: [
      "Simple revision policy",
      "Fast change request workflow",
      "Quality check after revisions",
    ],
    rating: 4.5,
    reviews: "TBD",
  },
  {
    id: "privacy",
    icon: "PV",
    title: "Your unpublished work stays private",
    chips: ["Secure upload", "NDA option", "Delete on request"],
    backPoints: [
      "Secure upload handling",
      "NDA option on request",
      "Delete-on-request available",
    ],
    rating: 4.5,
    reviews: "TBD",
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    id: "1",
    short: "Upload",
    title: "Step 1 - Share your draft and guidelines",
    happens: [
      "Send draft PPT, manuscript, or notes with your deadline.",
      "Share conference or university constraints (template, size, branding).",
    ],
    need: ["Draft file or source text", "Guidelines or template", "Deadline and event date"],
  },
  {
    id: "2",
    short: "Plan",
    title: "Step 2 - We build your structure plan",
    happens: [
      "We design a clean narrative sequence for your audience type.",
      "You approve flow and depth before heavy design starts.",
    ],
    need: ["Audience type", "Core message", "Expected slide count or poster size"],
  },
  {
    id: "3",
    short: "Design",
    title: "Step 3 - Design pass and revision rounds",
    happens: [
      "We refine visuals, hierarchy, and pacing for clarity and confidence.",
      "You review and request changes within selected plan limits.",
    ],
    need: ["Feedback on first draft", "Figures and tables", "Optional branding preferences"],
  },
  {
    id: "4",
    short: "Deliver",
    title: "Step 4 - Final delivery package",
    happens: [
      "Presentation: PPTX and PDF versions ready for speaking and sharing.",
      "Poster: print-ready PDF with size-safe exports and final checks.",
    ],
    need: ["Final confirmation", "Print specs if poster", "Preferred delivery channel"],
  },
];

export const plans: Plan[] = [
  {
    id: "thesis-essentials",
    icon: "TH",
    name: "Thesis PPT Essentials",
    whoFor:
      "Quick polish for a thesis proposal, viva, or internal review.",
    price: "$179",
    priceMeta: "USD \u00b7 one-time",
    etaLabel: "First draft",
    eta: "4 business days",
    points: [
      "Slide redesign for clarity and consistency",
      "Clean typography, spacing, and layout",
      "Up to 20 slides",
      "Up to 2 revision rounds",
    ],
  },
  {
    id: "defence-deck-pro",
    icon: "DF",
    badge: "Best for defence",
    name: "Defence Deck Pro",
    whoFor:
      "Final PhD thesis defence presentation with strong flow and visuals.",
    price: "$349",
    priceMeta: "USD \u00b7 one-time",
    etaLabel: "First draft",
    eta: "5 business days",
    points: [
      "Storyline + structure upgrade",
      "Data visualization cleanup (charts/tables)",
      "Figure enhancement (as needed)",
      "Up to 35 slides",
      "Up to 2 revision rounds",
    ],
    featured: true,
  },
  {
    id: "poster-impact",
    icon: "PO",
    name: "Poster Impact",
    whoFor:
      "Conferences and exhibitions needing a print-ready poster.",
    price: "$229",
    priceMeta: "USD \u00b7 one-time",
    etaLabel: "First draft",
    eta: "5 business days",
    points: [
      "1 research poster presentation (A0/A1/36x48)",
      "Visual hierarchy + readability optimization",
      "Branding match (university/lab)",
      "Up to 2 revision rounds",
    ],
  },
  {
    id: "presentation-poster-bundle",
    icon: "BD",
    badge: "Best value",
    name: "Presentation + Poster Bundle",
    whoFor:
      "Defence + conference-ready package (best value).",
    price: "$499",
    priceMeta: "USD \u00b7 one-time",
    etaLabel: "Delivery",
    eta: "8-10 business days",
    points: [
      "1 poster + 1 presentation deck",
      "Consistent theme and figures across both",
      "Priority coordination + delivery planning",
      "Up to 2 revision rounds",
    ],
  },
];

export const sampleCategories: SampleCategory[] = [
  "Thesis Defence",
  "Viva/Proposal",
  "Conference Decks",
  "Research Posters",
];

export const sampleLibrary: Record<SampleCategory, SampleItem[]> = {
  "Thesis Defence": [
    {
      id: "sd-1",
      title: "Defence Deck - Clean Storyline",
      deliverable: "PPTX",
      field: "Life Sciences",
      style: "Minimal",
      format: "16:9",
      turnaround: "5 business days",
      changes: ["Structure cleanup", "Typography consistency", "Visual hierarchy"],
    },
    {
      id: "sd-2",
      title: "Defence Deck - Data Heavy",
      deliverable: "PPTX",
      field: "Engineering",
      style: "Data-led",
      format: "16:9",
      turnaround: "6 business days",
      changes: ["Chart simplification", "Table redesign", "Layout spacing"],
    },
    {
      id: "sd-3",
      title: "Defence Deck - Committee Ready",
      deliverable: "PPTX",
      field: "Social Sciences",
      style: "Narrative",
      format: "16:9",
      turnaround: "5 business days",
      changes: ["Argument flow", "Section transition cues", "Readability fixes"],
    },
    {
      id: "sd-4",
      title: "Defence Deck - Visual First",
      deliverable: "PPTX",
      field: "Chemistry",
      style: "Visual",
      format: "16:9",
      turnaround: "5 business days",
      changes: ["Figure refinement", "Icon language", "Consistency checks"],
    },
  ],
  "Viva/Proposal": [
    {
      id: "vp-1",
      title: "Viva PPT - Quick Polish",
      deliverable: "PPTX",
      field: "Medicine",
      style: "Minimal",
      format: "16:9",
      turnaround: "4 business days",
      changes: ["Alignment", "Typography", "Spacing"],
    },
    {
      id: "vp-2",
      title: "Proposal PPT - Clear Structure",
      deliverable: "PPTX",
      field: "Life Sciences",
      style: "Minimal",
      format: "16:9",
      turnaround: "4 business days",
      changes: ["Narrative structure", "Section cues", "Flow correction"],
    },
    {
      id: "vp-3",
      title: "Internal Review - Lab Update",
      deliverable: "PPTX",
      field: "Engineering",
      style: "Data-led",
      format: "16:9",
      turnaround: "4 business days",
      changes: ["Chart readability", "Hierarchy", "Spacing discipline"],
    },
    {
      id: "vp-4",
      title: "Proposal PPT - Figure Cleanup",
      deliverable: "PPTX",
      field: "Chemistry",
      style: "Visual",
      format: "16:9",
      turnaround: "5 business days",
      changes: ["Figure labels", "Contrast fixes", "Legend normalization"],
    },
  ],
  "Conference Decks": [
    {
      id: "cd-1",
      title: "Conference Deck - Talk Ready",
      deliverable: "PPTX",
      field: "Life Sciences",
      style: "Visual",
      format: "16:9",
      turnaround: "5 business days",
      changes: ["Storyline pacing", "Figure cleanup", "Slide rhythm"],
    },
    {
      id: "cd-2",
      title: "Conference Deck - Poster to Talk",
      deliverable: "PPTX",
      field: "Engineering",
      style: "Data-led",
      format: "16:9",
      turnaround: "5 business days",
      changes: ["Hierarchy rewrite", "Chart simplification", "Flow tightening"],
    },
    {
      id: "cd-3",
      title: "Conference Deck - Industry R&D",
      deliverable: "PPTX",
      field: "Industry",
      style: "Minimal",
      format: "16:9",
      turnaround: "6 business days",
      changes: ["Brand alignment", "Message hierarchy", "Clarity polish"],
    },
    {
      id: "cd-4",
      title: "Conference Deck - Thesis Summary",
      deliverable: "PPTX",
      field: "Chemistry",
      style: "Visual",
      format: "16:9",
      turnaround: "5 business days",
      changes: ["Figure pacing", "Icon consistency", "Terminology cleanup"],
    },
  ],
  "Research Posters": [
    {
      id: "rp-1",
      title: "Research Poster - A0 Print",
      deliverable: "Poster PDF",
      field: "Life Sciences",
      style: "Minimal",
      format: "A0",
      turnaround: "5 business days",
      changes: ["Reading order", "Spacing", "Text compression"],
    },
    {
      id: "rp-2",
      title: "Research Poster - 36x48",
      deliverable: "Poster PDF",
      field: "Medicine",
      style: "Visual",
      format: "36x48",
      turnaround: "5 business days",
      changes: ["Figure clarity", "Legend contrast", "Section hierarchy"],
    },
    {
      id: "rp-3",
      title: "Research Poster - Data Layout",
      deliverable: "Poster PDF",
      field: "Engineering",
      style: "Data-led",
      format: "A1",
      turnaround: "6 business days",
      changes: ["Chart layout", "Table cleanup", "Grid realignment"],
    },
    {
      id: "rp-4",
      title: "Research Poster - University Brand",
      deliverable: "Poster PDF",
      field: "Social Sciences",
      style: "Minimal",
      format: "A0",
      turnaround: "5 business days",
      changes: ["Brand-safe styling", "Typography scaling", "Flow cleanup"],
    },
  ],
};

export const finalNeedOptions: { id: PresentationNeed; label: string }[] = [
  { id: "defence", label: "Defence deck" },
  { id: "proposal", label: "Thesis proposal / viva" },
  { id: "poster", label: "Research poster" },
  { id: "conference", label: "Conference deck" },
];

export const needToPlan: Record<PresentationNeed, string> = {
  defence: "defence-deck-pro",
  proposal: "thesis-essentials",
  poster: "poster-impact",
  conference: "presentation-poster-bundle",
};

export const ethicalSupportItems: EthicalSupportItem[] = [
  {
    id: "author",
    icon: "AU",
    title: "You remain the author and owner",
    detail: "We design and structure - your research stays yours.",
  },
  {
    id: "no-fabrication",
    icon: "NF",
    title: "No data creation or fabrication",
    detail: "We never invent results, numbers, or experiments.",
  },
  {
    id: "privacy",
    icon: "ND",
    title: "NDA available - Secure file handling",
    detail: "Unpublished drafts stay private and protected.",
  },
];

export const ethicalSupportSignals = [
  "Confidential by default",
  "Design-only support",
  "Clear scope",
];

export const relatedServices = [
  {
    name: "Scientific Illustration and Visuals",
    text: "Figures, graphical abstracts, and publication-ready visual assets.",
    href: "/services/data-services",
  },
  {
    name: "Editing and Language Support",
    text: "Improve clarity and academic tone before converting content to slides.",
    href: "/services/editing-support",
  },
  {
    name: "Research Planning",
    text: "Strengthen argument logic and methodology framing before presentations.",
    href: "/services/research-planning",
  },
];

export const faqFilters: { id: FaqFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "structure", label: "Structure" },
  { id: "slides", label: "Slides" },
  { id: "posters", label: "Posters" },
  { id: "files", label: "Files" },
  { id: "process", label: "Process" },
  { id: "urgent", label: "Urgent" },
];

export const faqs: FaqItem[] = [
  {
    id: "q-structure",
    q: "What is the best structure for a PhD thesis defence presentation?",
    a: "A committee-safe flow is Problem -> Approach -> Results -> Interpretation -> Limitations -> Next steps. Keep one core message per section and avoid overloaded slides.",
    tags: ["structure", "slides"],
  },
  {
    id: "q-slides",
    q: "How many slides should I use for a 12-15 minute talk?",
    a: "For most research talks, 10-16 focused slides works better than dense decks. Prioritize message clarity and timing over slide count.",
    tags: ["slides", "structure"],
  },
  {
    id: "q-poster-size",
    q: "Which poster size should I choose: A0, A1, or 36x48?",
    a: "Use the conference guideline first. If multiple are allowed, choose the format that preserves readability at viewing distance and keeps charts legible.",
    tags: ["posters", "files"],
  },
  {
    id: "q-format-printing",
    q: "Can you deliver files ready for both screen and print?",
    a: "Yes. We provide editable source and export-safe versions (PPTX/PDF), including print-safe poster files when required.",
    tags: ["files", "posters", "slides"],
  },
  {
    id: "q-convert",
    q: "Can you convert my existing PPT into a poster format?",
    a: "Yes. We can convert and restructure PPT content into print-ready poster layouts while preserving your original meaning.",
    tags: ["posters", "files"],
  },
  {
    id: "q-branding",
    q: "Can you follow my university or conference template and branding?",
    a: "Yes. Share template, style guide, or reference deck. We align typography, spacing, logo placement, and visual tone.",
    tags: ["process", "slides", "posters"],
  },
  {
    id: "q-revisions",
    q: "How do revisions work?",
    a: "Each package includes defined revision rounds. Feedback is consolidated per round so updates remain fast and trackable.",
    tags: ["process"],
  },
  {
    id: "q-urgent",
    q: "Can you support urgent deadlines?",
    a: "Yes, depending on complexity and file readiness. Share your deadline and current materials to get a realistic same-day estimate.",
    tags: ["urgent", "process"],
  },
];
