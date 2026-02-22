export type StageKey = "planning" | "mid-stage" | "submitting";

export type HeroSlide = {
  id: number;
  stage: StageKey;
  stageLabel: string;
  title: string;
  subtitle: string;
  summary: string;
  tags: string[];
  trust: string[];
  queryContext: string;
  toolkit: string;
};

export type StressReliefCard = {
  id: string;
  title: string;
  body: string;
  tone: "sage" | "gold" | "ink" | "mist";
};

export type StageModule = {
  key: string;
  desc: string;
  outputs: string[];
  depth: "Fast scope" | "Deep support";
};

export type WorkflowStep = {
  id: number;
  title: string;
  desc: string;
  you: string[];
  we: string[];
};

export type CategoryKey =
  | "planning"
  | "data"
  | "editorial"
  | "publication"
  | "presentations";

export type CategoryModule = {
  icon: string;
  title: string;
  bestFor: string;
  need: string[];
  get: string[];
  price: string;
  sampleName: string;
  sampleText: string;
};

export type PricingPlan = {
  id: string;
  title: string;
  priceLine: string;
  subtitle: string;
  points: string[];
  featured?: boolean;
};

export type SampleAsset = {
  id: string;
  badgeA: string;
  badgeB: string;
  title: string;
  desc: string;
  beforeText: string;
  afterText: string;
  inside: string[];
  downloadHint: string;
  fileName: string;
  fileText: string;
};

export type Testimonial = {
  id: string;
  initials: string;
  author: string;
  stage: string;
  country: string;
  category: string;
  service: string;
  quote: string;
  outcome: string;
  before: string;
  after: string;
  details: string[];
};

export type FaqItem = {
  id: string;
  category: "timeline" | "confidentiality" | "revisions" | "whatweneed" | "ethics";
  q: string;
  a: string;
  bullets: string[];
  tip: string;
};

export const heroTrustStrip = [
  "Trusted by 4,051+ researchers",
  "200+ accepted papers supported",
  "95% satisfaction",
];


export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    stage: "planning",
    stageLabel: "Planning",
    title: "Struggling to turn your research idea into an approved proposal?",
    subtitle:
      "Build a supervisor-ready structure with clear objectives and a defendable research gap.",
    summary:
      "Get research proposal support with research gap analysis, question framing, feasibility planning, and integrity-first guidance.",
    tags: ["research proposal support", "research gap analysis"],
    trust: ["Confidential", "Typical reply 24-72h", "Scope-based pricing"],
    queryContext: "Proposal approval",
    toolkit: "Proposal toolkit",
  },
  {
    id: 2,
    stage: "planning",
    stageLabel: "Planning",
    title: "Methodology not matching objectives is the top approval blocker.",
    subtitle:
      "Align design, sampling, tools, and analysis so supervisors see feasibility and rigor.",
    summary:
      "Get research design and methodology support for sampling logic, instruments, and an analysis path that fits your objectives.",
    tags: ["methodology support", "design alignment"],
    trust: ["Confidential", "Clear scope reply", "Timeline estimate"],
    queryContext: "Methodology alignment",
    toolkit: "Method fit toolkit",
  },
  {
    id: 3,
    stage: "mid-stage",
    stageLabel: "Mid-stage",
    title: "Results messy or hard to explain? Make reporting publication-ready.",
    subtitle:
      "Turn raw outputs into clear tables, figures, and an analysis narrative reviewers understand.",
    summary:
      "Use data analysis support plus tables and figures formatting so findings are communicated with clarity.",
    tags: ["data analysis", "statistical reporting"],
    trust: ["Confidential", "Scope-based pricing", "Actionable next steps"],
    queryContext: "Data and reporting",
    toolkit: "Data reporting toolkit",
  },
  {
    id: 4,
    stage: "submitting",
    stageLabel: "Submitting",
    title: "Unclear writing comments even when the science is solid?",
    subtitle:
      "Improve clarity, flow, and academic tone without changing your meaning.",
    summary:
      "Use academic editing support to improve readability, logical flow, and consistency while preserving author intent.",
    tags: ["academic editing", "manuscript clarity"],
    trust: ["Integrity-first", "No meaning change", "Revision-ready plan"],
    queryContext: "Editing and clarity",
    toolkit: "Editing toolkit",
  },
  {
    id: 5,
    stage: "submitting",
    stageLabel: "Submitting",
    title: "Not sure which journal fits or tired of desk rejections?",
    subtitle:
      "Choose journals with scope fit and prepare a submission-ready package and revision plan.",
    summary:
      "Get journal selection support, publication guidance, and response-to-reviewer planning to improve fit and confidence.",
    tags: ["journal selection", "reviewer response"],
    trust: ["Scope-fit first", "Submission checklist", "Revision-ready reply"],
    queryContext: "Journal fit and revisions",
    toolkit: "Journal fit toolkit",
  },
];

export const stressTags = ["Gap unclear", "Methods not working", "Rejection fear"];

export const stressReliefCards: StressReliefCard[] = [
  {
    id: "direction",
    title: "Clear direction",
    body: "Know the next step.",
    tone: "sage",
  },
  {
    id: "structure",
    title: "Clear structure",
    body: "A strong outline that flows.",
    tone: "gold",
  },
  {
    id: "reporting",
    title: "Clear reporting",
    body: "Explain results simply.",
    tone: "ink",
  },
  {
    id: "submission",
    title: "Clear submission",
    body: "A checklist plus revision plan.",
    tone: "mist",
  },
];

export const stageHints: Record<StageKey, string> = {
  planning:
    "Planning modules: choose direction, structure, and ethics readiness.",
  "mid-stage":
    "Mid-stage modules: fix methodology, feasibility, and coherence.",
  submitting: "Submitting modules: polish, final checks, and response strategy.",
};

export const modulesByStage: Record<StageKey, StageModule[]> = {
  planning: [
    {
      key: "Topic and Research Gap Clarity",
      desc: "Turn a broad idea into a defendable gap, objectives, and scope.",
      outputs: [
        "Gap and objectives map",
        "Scope boundaries and exclusions",
        "One-page direction brief for supervisor",
      ],
      depth: "Fast scope",
    },
    {
      key: "Proposal Structure and Storyline",
      desc: "Build a supervisor-friendly structure from problem to plan.",
      outputs: [
        "Section-by-section outline",
        "Logical flow from problem to value",
        "Coherence checklist for first draft",
      ],
      depth: "Fast scope",
    },
    {
      key: "Literature Mapping and Justification",
      desc: "Organize literature themes to justify your gap and approach.",
      outputs: [
        "Theme map with missing spaces",
        "Justification paragraph blocks",
        "Keyword consistency guide",
      ],
      depth: "Deep support",
    },
    {
      key: "Ethics and Approval Support",
      desc: "Prepare ethics-ready wording and feasibility risk framing.",
      outputs: [
        "Approval-aligned language",
        "Risk and mitigation summary",
        "IRB/HREC/REC terminology fit",
      ],
      depth: "Fast scope",
    },
  ],
  "mid-stage": [
    {
      key: "Methodology Design and Feasibility",
      desc: "Align design, sampling, tools, and feasibility to your question.",
      outputs: [
        "Question to method alignment",
        "Feasibility and limitations note",
        "Defendable design narrative",
      ],
      depth: "Deep support",
    },
    {
      key: "Instrument Protocol and Data Plan",
      desc: "Clarify what you measure, how you collect it, and how you analyze it.",
      outputs: [
        "Variables and collection plan",
        "Analysis sequence template",
        "Protocol risk checklist",
      ],
      depth: "Deep support",
    },
    {
      key: "Proposal Structure Repair",
      desc: "Fix flow so chapters connect and read convincingly.",
      outputs: [
        "Re-ordered chapter logic",
        "Bridge lines for coherence",
        "Revision priority map",
      ],
      depth: "Fast scope",
    },
    {
      key: "Ethics Readiness Review",
      desc: "Make ethics sections complete, consistent, and approval-friendly.",
      outputs: [
        "Consent and risk language suggestions",
        "Safeguard summary",
        "Feasibility clarity note",
      ],
      depth: "Fast scope",
    },
  ],
  submitting: [
    {
      key: "Proposal Editing and Academic Language",
      desc: "Improve clarity and flow while preserving your meaning.",
      outputs: [
        "Line-level clarity edits",
        "Tone and readability polish",
        "Consistency checks",
      ],
      depth: "Fast scope",
    },
    {
      key: "Submission Readiness Pack",
      desc: "Final checks for coherence, formatting, references, and readiness.",
      outputs: [
        "Final quality checklist",
        "Formatting and references cleanup",
        "Submission-ready file set",
      ],
      depth: "Fast scope",
    },
    {
      key: "Supervisor Reviewer Response Support",
      desc: "Convert comments into a precise revision and response strategy.",
      outputs: [
        "Comment-to-action map",
        "Response wording suggestions",
        "Priority sequence for fixes",
      ],
      depth: "Deep support",
    },
    {
      key: "Method and Analysis Clarity Tune-up",
      desc: "Make methods and analysis sections defendable and easy to follow.",
      outputs: [
        "Method and analysis rewrite guidance",
        "Limitations phrasing support",
        "What-to-justify checklist",
      ],
      depth: "Deep support",
    },
  ],
};

export const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: "Share your context",
    desc: "Your topic, goal, deadline, and supervisor comments.",
    you: [
      "Upload draft or outline (optional)",
      "Add university or journal guidelines",
      "Share what is confusing in one or two lines",
    ],
    we: [
      "Clarify the decision point",
      "Identify missing inputs",
      "Confirm ethical support boundaries",
    ],
  },
  {
    id: 2,
    title: "Pick stage and module",
    desc: "Planning, Mid-stage, or Submitting with one module at a time.",
    you: ["Select stage", "Choose one module", "Confirm urgency and scope"],
    we: [
      "Map deliverables to your stage",
      "Flag desk-rejection triggers early",
      "Share module-fit checklist",
    ],
  },
  {
    id: 3,
    title: "Receive deliverables",
    desc: "Supervisor-ready structure, edits, checklists, or response map.",
    you: ["Review comments", "Ask clarifications", "Keep your author voice"],
    we: [
      "Deliver structured outputs",
      "Provide safe phrasing examples",
      "Align format and readiness checks",
    ],
  },
  {
    id: 4,
    title: "Revisions and handoff",
    desc: "Scope-based revisions to submit with confidence.",
    you: [
      "Apply changes or request guidance",
      "Share new supervisor feedback",
      "Confirm final checklist",
    ],
    we: [
      "Revise agreed scope only",
      "Check coherence and compliance",
      "Handoff final files",
    ],
  },
];

export const categoryLabels: Record<CategoryKey, string> = {
  planning: "Research Planning",
  data: "Data Services",
  editorial: "Editorial Support",
  publication: "Publication Support",
  presentations: "Academic Presentations",
};

export const categoryModules: Record<CategoryKey, CategoryModule[]> = {
  planning: [
    {
      icon: "TS",
      title: "Topic Selection",
      bestFor: "broad idea",
      need: ["Research topic or area", "University guidelines"],
      get: ["2-3 topic options with rationale", "Gap and objectives starter map"],
      price: "INR 2,999",
      sampleName: "Topic_Selection_Sample.txt",
      sampleText: [
        "RE4U - Topic Selection (Sample)",
        "",
        "1) Scope check questions",
        "2) Novelty and feasibility quick filter",
        "3) Example gap statement and objectives",
      ].join("\n"),
    },
    {
      icon: "PS",
      title: "Proposal Support",
      bestFor: "proposal draft",
      need: ["Draft or outline (optional)", "Supervisor feedback (if any)"],
      get: ["Structure map and flow fixes", "Supervisor-ready clarity edits"],
      price: "INR 4,999",
      sampleName: "Proposal_Support_Sample.txt",
      sampleText: [
        "RE4U - Proposal Support (Sample)",
        "",
        "- Section-by-section structure map",
        "- Example rewrite: problem -> gap -> aim",
        "- Tight objectives example",
      ].join("\n"),
    },
    {
      icon: "RD",
      title: "Research Design",
      bestFor: "methods clarity",
      need: ["Research questions", "Constraints (time, data, tools)"],
      get: ["Method aligned to objective", "Sampling and variables checklist"],
      price: "INR 4,999",
      sampleName: "Research_Design_Sample.txt",
      sampleText: [
        "RE4U - Research Design (Sample)",
        "",
        "- Objective to design match table",
        "- Sampling plan template",
        "- Variables and measures example",
      ].join("\n"),
    },
    {
      icon: "EF",
      title: "Ethics and Feasibility",
      bestFor: "IRB or HREC",
      need: ["Ethics form requirements", "Timeline and resource details"],
      get: ["Feasibility and risk notes", "Ethics-ready documentation guidance"],
      price: "INR 3,999",
      sampleName: "Ethics_Feasibility_Sample.txt",
      sampleText: [
        "RE4U - Ethics and Feasibility (Sample)",
        "",
        "- Common IRB/HREC sections",
        "- Risk and consent note template",
        "- Feasibility checklist",
      ].join("\n"),
    },
  ],
  data: [
    {
      icon: "SA",
      title: "Statistical Analysis",
      bestFor: "results",
      need: ["Dataset", "Research objectives"],
      get: ["Analysis outputs", "Interpretation notes"],
      price: "INR 6,999",
      sampleName: "Stat_Analysis_Sample.txt",
      sampleText: [
        "RE4U - Statistical Analysis (Sample)",
        "",
        "- Example output table",
        "- Interpretation notes template",
        "- Statistical checks list",
      ].join("\n"),
    },
    {
      icon: "DC",
      title: "Data Cleaning",
      bestFor: "messy data",
      need: ["Dataset and codebook", "Missing or outlier rules (if any)"],
      get: ["Clean dataset", "Cleaning log"],
      price: "INR 4,999",
      sampleName: "Data_Cleaning_Sample.txt",
      sampleText: [
        "RE4U - Data Cleaning (Sample)",
        "",
        "- Cleaning log template",
        "- Missing data handling notes",
      ].join("\n"),
    },
    {
      icon: "ML",
      title: "ML Modelling",
      bestFor: "prediction",
      need: ["Dataset and target variable", "Tool and timeline constraints"],
      get: ["Model plan with evaluation", "Outputs explanation"],
      price: "INR 7,999",
      sampleName: "ML_Modelling_Sample.txt",
      sampleText: [
        "RE4U - ML Modelling (Sample)",
        "",
        "- Train/test setup template",
        "- Metrics checklist",
        "- Reporting template",
      ].join("\n"),
    },
    {
      icon: "IH",
      title: "Interpretation Help",
      bestFor: "results writeup",
      need: ["Outputs and tables", "Research question"],
      get: ["Result narrative", "Insight map"],
      price: "INR 5,999",
      sampleName: "Interpretation_Help_Sample.txt",
      sampleText: [
        "RE4U - Interpretation Help (Sample)",
        "",
        "- Result paragraph template",
        "- What to report versus skip",
      ].join("\n"),
    },
  ],
  editorial: [
    {
      icon: "SE",
      title: "Substantive Editing",
      bestFor: "structure",
      need: ["Draft", "Target rubric"],
      get: ["Flow and logic improvements", "Tracked change notes"],
      price: "INR 4,999",
      sampleName: "Substantive_Editing_Sample.txt",
      sampleText: [
        "RE4U - Substantive Editing (Sample)",
        "",
        "- Before and after paragraph",
        "- Structure comments example",
      ].join("\n"),
    },
    {
      icon: "LP",
      title: "Language Polishing",
      bestFor: "clarity",
      need: ["Draft", "US/UK preference"],
      get: ["Tone polish", "Grammar consistency"],
      price: "INR 4,000",
      sampleName: "Language_Polishing_Sample.txt",
      sampleText: [
        "RE4U - Language Polishing (Sample)",
        "",
        "- Tone and grammar fixes example",
      ].join("\n"),
    },
    {
      icon: "FH",
      title: "Formatting Help",
      bestFor: "APA/IEEE",
      need: ["Draft and style guide", "Journal template"],
      get: ["Style-aligned formatting", "Table and figure consistency"],
      price: "INR 3,999",
      sampleName: "Formatting_Help_Sample.txt",
      sampleText: [
        "RE4U - Formatting Help (Sample)",
        "",
        "- APA style checklist",
        "- Table template examples",
      ].join("\n"),
    },
    {
      icon: "AP",
      title: "AI and Plagiarism Fix",
      bestFor: "originality",
      need: ["Draft", "Similarity report (optional)"],
      get: ["Humanized rephrasing", "Clarity-preserving rewrite plan"],
      price: "INR 2,500",
      sampleName: "Originality_Fix_Sample.txt",
      sampleText: [
        "RE4U - Originality Fix (Sample)",
        "",
        "- Rewrite examples",
        "- Do and do-not checklist",
      ].join("\n"),
    },
  ],
  publication: [
    {
      icon: "PR",
      title: "Pre-Submission Review",
      bestFor: "desk-reject risk",
      need: ["Near-final draft", "Target journal"],
      get: ["Reviewer-style feedback", "Priority fixes"],
      price: "INR 5,999",
      sampleName: "PreSubmission_Review_Sample.txt",
      sampleText: [
        "RE4U - Pre-Submission Review (Sample)",
        "",
        "- Critique sections",
        "- Priority fixes list",
      ].join("\n"),
    },
    {
      icon: "ME",
      title: "Manuscript Editing",
      bestFor: "submission-ready",
      need: ["Draft", "Journal requirements"],
      get: ["Polished language and structure", "Final QC checklist"],
      price: "INR 6,999",
      sampleName: "Manuscript_Editing_Sample.txt",
      sampleText: [
        "RE4U - Manuscript Editing (Sample)",
        "",
        "- Tracked changes example",
        "- Final QC checklist",
      ].join("\n"),
    },
    {
      icon: "JS",
      title: "Journal Selection",
      bestFor: "scope match",
      need: ["Title and abstract", "Indexing preference"],
      get: ["3-5 journal shortlist", "Predatory-avoid checklist"],
      price: "INR 4,999",
      sampleName: "Journal_Selection_Sample.txt",
      sampleText: [
        "RE4U - Journal Selection (Sample)",
        "",
        "- Shortlist format",
        "- Fit criteria checklist",
      ].join("\n"),
    },
    {
      icon: "SG",
      title: "Submission Guidance",
      bestFor: "process",
      need: ["Manuscript and figures", "Portal details"],
      get: ["Submission checklist", "Cover letter pointers"],
      price: "INR 5,999",
      sampleName: "Submission_Guidance_Sample.txt",
      sampleText: [
        "RE4U - Submission Guidance (Sample)",
        "",
        "- Portal checklist",
        "- Cover letter template",
      ].join("\n"),
    },
  ],
  presentations: [
    {
      icon: "PP",
      title: "PhD Presentations",
      bestFor: "viva and synopsis",
      need: ["Thesis summary", "University template"],
      get: ["Storyline structure", "Speaker notes outline"],
      price: "INR 3,999",
      sampleName: "PhD_Presentation_Sample.txt",
      sampleText: [
        "RE4U - PhD Presentation (Sample)",
        "",
        "- Slide outline",
        "- Speaker notes example",
      ].join("\n"),
    },
    {
      icon: "CP",
      title: "Conference Posters",
      bestFor: "poster readiness",
      need: ["Abstract and results", "Conference guidelines"],
      get: ["Poster layout", "Print-ready checklist"],
      price: "INR 3,999",
      sampleName: "Poster_Sample.txt",
      sampleText: [
        "RE4U - Poster (Sample)",
        "",
        "- Layout grid",
        "- Content-to-space rules",
      ].join("\n"),
    },
    {
      icon: "OS",
      title: "Oral Slides",
      bestFor: "talk",
      need: ["Story points", "Figures and charts"],
      get: ["Content-to-slide structure", "Timing guide"],
      price: "INR 4,999",
      sampleName: "Oral_Slides_Sample.txt",
      sampleText: [
        "RE4U - Oral Slides (Sample)",
        "",
        "- Ten-slide structure",
        "- Timing guide",
      ].join("\n"),
    },
    {
      icon: "VE",
      title: "Visual Enhancements",
      bestFor: "graphics",
      need: ["Figures/raw data", "Target style"],
      get: ["Infographic updates", "Chart readability fixes"],
      price: "INR 2,999",
      sampleName: "Visuals_Sample.txt",
      sampleText: [
        "RE4U - Visual Enhancements (Sample)",
        "",
        "- Figure redesign checklist",
        "- Common chart fixes",
      ].join("\n"),
    },
  ],
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    title: "Starter - Fast Scope Scan",
    priceLine: "Starts at INR 2,999",
    subtitle: "Best for early clarity and next-step direction",
    points: [
      "Stage identification and best-fit module recommendation",
      "Key blocker list (gap, methods, ethics, format)",
      "Action checklist for first fixes",
    ],
    featured: true,
  },
  {
    id: "core",
    title: "Core - Module Delivery",
    priceLine: "Typical range INR 4,999-10,999",
    subtitle: "Best for one complete module output",
    points: [
      "One selected module output",
      "Supervisor-ready structure and comments",
      "Revision plan with submission checklist",
    ],
  },
  {
    id: "advanced",
    title: "Advanced - Multi-Module Support",
    priceLine: "Typical range INR 10,999-24,999",
    subtitle: "Best for complex projects and tighter timelines",
    points: [
      "Two or three connected modules",
      "Cross-section consistency checks",
      "Scope-based revisions",
    ],
  },
];

export const sampleAssets: SampleAsset[] = [
  {
    id: "structure-map",
    badgeA: "Sample structure",
    badgeB: "2-page",
    title: "Proposal Structure Map (Supervisor-friendly)",
    desc: "Turn a broad idea into a clean flow: gap -> objective -> method -> feasibility.",
    beforeText:
      "I will study heavy metals in water and use biochar to remove them. Issue: topic-only statement with no clear gap, novelty, or measurable plan.",
    afterText:
      "Gap: existing low-cost adsorbents show inconsistent performance at field pH. Objective: quantify removal at pH 5-9 and model kinetics. Method: batch design with a validation plan in 12 weeks.",
    inside: [
      "One-page flow supervisors can scan in 60 seconds",
      "Gap and novelty sentence patterns (safe and defensible)",
      "Objective templates (measurable and aligned to methods)",
      "Mini feasibility checklist",
    ],
    downloadHint:
      "Instant .txt download now. You can swap this to a PDF link later.",
    fileName: "RE4U_Proposal_Structure_Map.txt",
    fileText: [
      "RE4U - Proposal Structure Map (Supervisor-friendly)",
      "",
      "1) Gap (1-2 sentences)",
      "- What is known?",
      "- What is missing?",
      "- Why it matters (practical or scientific value)",
      "",
      "2) Objectives (maximum 3)",
      "- Use measurable verbs: quantify, compare, evaluate, model, test, explore",
      "",
      "3) Method fit",
      "- Design: qualitative, quantitative, or mixed",
      "- Sampling and data source",
      "- Primary outcome and key variables",
      "",
      "4) Feasibility (12-week example)",
      "- Week 1-2: finalize scope and tools",
      "- Week 3-6: data collection",
      "- Week 7-9: analysis sequence",
      "- Week 10-12: draft and revisions",
      "",
      "5) Deliverables for supervisor review",
      "- One-page map + objective list + method fit + feasibility note",
    ].join("\n"),
  },
  {
    id: "method-fit",
    badgeA: "Methodology",
    badgeB: "Checklist",
    title: "Method-Fit Checklist (Defensible methods)",
    desc: "Stop methods do not match the question feedback with fast alignment.",
    beforeText:
      "We will collect data and analyze it. Issue: no design fit, variables, or validation plan.",
    afterText:
      "Design: cross-sectional survey with stratified sampling. Variables: primary outcome plus covariates defined. Validation: pilot and reliability checks with analysis sequence.",
    inside: [
      "Question -> design mapping (qualitative, quantitative, mixed)",
      "Variables and measures checklist",
      "Analysis sequence template for clean reporting",
      "Validation plan prompts",
    ],
    downloadHint:
      "Best for mid-stage work: methods, sampling, variables, and analysis plan clarity.",
    fileName: "RE4U_Method_Fit_Checklist.txt",
    fileText: [
      "RE4U - Method-Fit Checklist",
      "",
      "A) Question to design",
      "- Is the question descriptive, comparative, or causal?",
      "- Choose: qualitative, quantitative, or mixed",
      "",
      "B) Variables and measures",
      "- Primary outcome defined?",
      "- Key predictors and covariates listed?",
      "- Measurement method stated?",
      "",
      "C) Sampling and controls",
      "- Inclusion/exclusion criteria clear?",
      "- Sampling plan and feasibility justified?",
      "- Controls and validation plan included?",
      "",
      "D) Analysis sequence",
      "- Step 1: data cleaning",
      "- Step 2: descriptive summary",
      "- Step 3: main test or model",
      "- Step 4: robustness checks",
      "",
      "E) Defensibility prompts",
      "- This design is appropriate because ...",
      "- We mitigate bias by ...",
    ].join("\n"),
  },
  {
    id: "revision-sheet",
    badgeA: "Revision",
    badgeB: "Response plan",
    title: "Supervisor Feedback -> Revision Sheet",
    desc: "Convert vague comments into a calm, trackable next-draft plan.",
    beforeText:
      "Your objectives are unclear. Result: confusion, rewriting everything, and more anxiety.",
    afterText:
      "Comment: objectives unclear -> action: rewrite 3 objectives using measurable verbs. Evidence: add 1-2 citations for feasibility. Owner: student with timeline.",
    inside: [
      "Comment -> action translation columns",
      "Priority tags: fix first, optional, ignore",
      "Revision timeline and what changed summary",
      "Ready-to-send supervisor response phrasing",
    ],
    downloadHint:
      "Best for submitting stage: revisions, resubmissions, and response planning.",
    fileName: "RE4U_Feedback_Revision_Sheet.txt",
    fileText: [
      "RE4U - Supervisor Feedback -> Revision Sheet",
      "",
      "Columns:",
      "1) Comment (verbatim)",
      "2) What it means (plain language)",
      "3) Action (specific change)",
      "4) Evidence needed (citation, data, justification)",
      "5) Priority (fix first, next, optional)",
      "6) Owner (you or RE4U)",
      "7) Done?",
      "",
      "Tip:",
      "- Convert vague comments into one concrete change and one proof line.",
      "- End with a five-line 'What changed' summary for your supervisor.",
    ].join("\n"),
  },
  {
    id: "ethics-pack",
    badgeA: "Ethics",
    badgeB: "IRB / HREC / REC",
    title: "Ethics + Feasibility Readiness Pack",
    desc: "Reduce back-and-forth on feasibility and ethics language using simple prompts.",
    beforeText:
      "Ethics approval will be taken. Issue: incomplete risk, consent, and confidentiality language.",
    afterText:
      "We will obtain approval where applicable and follow confidentiality and consent processes. Data handling is documented and access-limited.",
    inside: [
      "Feasibility checklist: timeline, resources, and access",
      "Ethics wording prompts (non-legal and safe)",
      "Country terminology map: IRB, HREC, REC",
      "Risk notes: data handling, consent, confidentiality",
    ],
    downloadHint:
      "Designed to prevent missing ethics detail delays without heavy legal jargon.",
    fileName: "RE4U_Ethics_Feasibility_Readiness_Pack.txt",
    fileText: [
      "RE4U - Ethics + Feasibility Readiness Pack",
      "",
      "1) Feasibility checklist",
      "- Data access confirmed",
      "- Timeline realistic",
      "- Tools and resources available",
      "- Backup plan for delays",
      "",
      "2) Region-aware approvals",
      "- US: IRB",
      "- Australia: HREC",
      "- UK: REC",
      "",
      "3) Safe wording prompts",
      "- Consent process (if applicable)",
      "- Confidentiality and access controls",
      "- Data storage and retention note",
      "",
      "4) Risk notes",
      "- Participant risk minimization",
      "- Data anonymization or pseudonymization where relevant",
    ].join("\n"),
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    initials: "RK",
    author: "Doctoral Candidate (Engineering)",
    stage: "Planning",
    country: "India",
    category: "topic selection",
    service: "Topic and gap mapping",
    quote:
      "I had too many ideas and kept rewriting. RE4U helped me pick one defendable direction and measurable objectives.",
    outcome: "clear direction and feasibility",
    before: "Multiple questions, no primary outcome, unclear scope boundaries.",
    after: "One primary question, method-fit check, realistic timeline.",
    details: [
      "Common blocker: too many ideas, no direction",
      "Typical fix missed: selecting one primary outcome variable",
      "Modules used: scope narrowing and objective alignment",
    ],
  },
  {
    id: "t2",
    initials: "PS",
    author: "PhD Scholar (Life Sciences)",
    stage: "Mid-stage",
    country: "Australia",
    category: "method misalignment",
    service: "Methodology alignment",
    quote:
      "Supervisor feedback stayed vague until methods became defendable. Alignment notes helped justify sampling and controls.",
    outcome: "fewer revisions and clearer defense",
    before: "Method choices looked random and revision loops continued.",
    after: "Question-method mapping, justified sampling, and cleaner reporting sequence.",
    details: [
      "Common blocker: mismatch between question and design",
      "Typical fix missed: define evaluation metrics early",
      "Modules used: method-fit check and analysis plan",
    ],
  },
  {
    id: "t3",
    initials: "JM",
    author: "Postdoc (Health Sciences)",
    stage: "Submitting",
    country: "USA",
    category: "journal mismatch",
    service: "Journal selection and submission",
    quote:
      "I was worried about desk rejection and predatory journals. The shortlist and checklist helped me submit with confidence.",
    outcome: "safer targets and cleaner submission pack",
    before: "Unclear journal fit, formatting gaps, risky targets.",
    after: "Scope-fit shortlist, compliance checklist, submission-ready pack.",
    details: [
      "Common blocker: journal mismatch",
      "Typical fix missed: align aims/scope language to journal pages",
      "Modules used: journal selection and readiness checks",
    ],
  },
];

export const faqCategories = [
  { key: "all", label: "All" },
  { key: "timeline", label: "Timeline" },
  { key: "confidentiality", label: "Confidentiality" },
  { key: "revisions", label: "Revisions" },
  { key: "whatweneed", label: "What we need" },
  { key: "ethics", label: "Ethics" },
] as const;

export const faqItems: FaqItem[] = [
  {
    id: "faq-timeline",
    category: "timeline",
    q: "How fast do you reply and deliver?",
    a: "We usually reply within 24-72 hours with module-fit, deliverables, and a price range.",
    bullets: [
      "Starter scan is the fastest",
      "Module delivery depends on scope",
      "Advanced scopes use staged checkpoints",
    ],
    tip: "Share deadline and current stage for faster estimate.",
  },
  {
    id: "faq-confidentiality",
    category: "confidentiality",
    q: "Is my draft confidential and how do you handle data?",
    a: "Yes. Manuscripts and data are handled confidentially with access-limited workflows.",
    bullets: [
      "You remain the author",
      "No password requests",
      "Institution-specific confidentiality alignment when required",
    ],
    tip: "Privacy and integrity protections are built into the process.",
  },
  {
    id: "faq-revisions",
    category: "revisions",
    q: "Do you include revisions and what does scope-based mean?",
    a: "Revisions are included based on the package scope and agreed deliverables.",
    bullets: [
      "Starter: clarity and next-step direction",
      "Core: one module with aligned fixes",
      "Advanced: multi-module consistency with staged revisions",
    ],
    tip: "Scope-based support keeps timelines and costs predictable.",
  },
  {
    id: "faq-inputs",
    category: "whatweneed",
    q: "What do you need from me to start?",
    a: "Minimal input is enough: topic, stage, blocker, and deadline. More detail improves speed.",
    bullets: [
      "Topic and goal",
      "Draft or outline optional",
      "Supervisor feedback and constraints if available",
    ],
    tip: "Even three clear lines can start the process.",
  },
  {
    id: "faq-ethics",
    category: "ethics",
    q: "Do you write the paper for me or support unethical requests?",
    a: "No. We provide ethical academic support and do not support misconduct.",
    bullets: [
      "You remain the author",
      "We improve clarity, structure, and compliance",
      "We support reviewer response planning, not fabrication",
    ],
    tip: "Integrity-first support protects your degree and reputation.",
  },
];
