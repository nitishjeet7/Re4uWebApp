export type PathId = "a" | "b" | "c";
export type OutcomeKey =
  | "cleanup"
  | "analysis"
  | "reporting"
  | "spss"
  | "rstudio"
  | "excel";
export type LensKey =
  | "stem"
  | "bioclin"
  | "engopt"
  | "socedu"
  | "biz"
  | "human"
  | "unsure";
export type QuestionKey =
  | "compare"
  | "beforeafter"
  | "relationship"
  | "predict"
  | "survey"
  | "text"
  | "mixed";

export type PathPanel = {
  id: PathId;
  tabLabel: string;
  title: string;
  summary: string;
  whatWeDo: string[];
  whatYouReceive: string[];
  primaryCta: string;
};

export type OutcomePanel = {
  key: OutcomeKey;
  label: string;
  group: "deliverable" | "tool";
  badge: string;
  title: string;
  summary: string;
  bullets: string[];
};

export type LensProfile = {
  key: LensKey;
  label: string;
  meta: string;
  fieldExample: string;
};

export type QuestionProfile = {
  key: QuestionKey;
  label: string;
  title: string;
  description: string;
  bestFit: string;
  whenToUse: string;
  report: string;
  watchout: string;
};

export type WorkflowStep = {
  id: number;
  label: string;
  icon: "upload" | "doc" | "pay" | "chart" | "shield" | "revise";
  title: string;
  summary: string;
  checklist: string[];
};

export type ServicePackage = {
  id: string;
  tier: string;
  tierMeta: string;
  title: string;
  summary: string;
  points: string[];
  featured?: boolean;
  ctaPrimary: string;
  ctaSecondary: string;
};

export type SamplePage = {
  id: string;
  heading: string;
  bullets: string[];
};

export type SamplePack = {
  id: string;
  label: string;
  subtitle: string;
  title: string;
  summary: string;
  pages: SamplePage[];
};

export type ResourceCard = {
  id: string;
  title: string;
  summary: string;
};

export type FaqItem = {
  id: string;
  q: string;
  a: string;
};

export const heroTrustChips = ["Confidential", "QC-backed", "Research-first"];

export const pathPanels: PathPanel[] = [
  {
    id: "a",
    tabLabel: "Thesis / Dissertation / PhD data support",
    title: "Thesis, dissertation, and PhD data analysis support",
    summary:
      "Ideal when your analysis must be defendable in supervisor and committee reviews.",
    whatWeDo: [
      "Map objectives and research questions to variables and test pathways",
      "Improve dataset readiness with clear logs for coding, missing values, and outliers",
      "Structure outputs for easy interpretation in review meetings",
    ],
    whatYouReceive: [
      "Interpretation notes and what-to-report guidance",
      "Editable tables and figures with QC comments",
      "Revision checklist for supervisor feedback loops",
    ],
    primaryCta: "Check my thesis analysis plan",
  },
  {
    id: "b",
    tabLabel: "Survey / Questionnaire analysis (Likert + reliability)",
    title: "Survey and questionnaire analysis support",
    summary:
      "Built for survey projects where scale quality, reliability, and reporting clarity matter.",
    whatWeDo: [
      "Clean and validate scale structures and coding logic",
      "Run reliability checks with clear interpretation notes",
      "Align findings with your research questions without overclaiming",
    ],
    whatYouReceive: [
      "Editable outputs and concise reporting guidance",
      "Scale and reliability summary that is supervisor-readable",
      "Action plan for improvements before submission",
    ],
    primaryCta: "Validate and interpret my survey",
  },
  {
    id: "c",
    tabLabel: "Clinical / Public Health / Biostatistics",
    title: "Clinical, public health, and biostatistics workflows",
    summary:
      "For regulated or high-scrutiny projects where consistency and defensibility are non-negotiable.",
    whatWeDo: [
      "Confirm feasibility and analysis pathway against study design",
      "Apply interpretation discipline and flag risky claims",
      "Check consistency across tables, figures, and narratives",
    ],
    whatYouReceive: [
      "Analysis plan and editable outputs",
      "QC summary documenting checks and changes",
      "Short response notes for sponsor or committee questions",
    ],
    primaryCta: "Request a biostat review",
  },
];

export const outcomePanels: OutcomePanel[] = [
  {
    key: "cleanup",
    label: "Data readiness + cleanup",
    group: "deliverable",
    badge: "Deliverables",
    title: "Data readiness and cleanup",
    summary:
      "Make the dataset transparent and analysis-ready before statistical work starts.",
    bullets: [
      "Missing values, duplicates, and coding checks with clear logs",
      "Outlier handling notes and variable naming consistency",
      "Readiness report with risks and next steps",
    ],
  },
  {
    key: "analysis",
    label: "Statistical analysis + interpretation",
    group: "deliverable",
    badge: "Deliverables",
    title: "Statistical analysis and interpretation",
    summary:
      "Run the right analysis family and explain the results in practical language.",
    bullets: [
      "Method selection aligned with research questions",
      "Assumption checks and defensible analysis flow",
      "Interpretation notes focused on what your data supports",
    ],
  },
  {
    key: "reporting",
    label: "Reporting support (tables, figures)",
    group: "deliverable",
    badge: "Deliverables",
    title: "Reporting support with editable outputs",
    summary:
      "Convert raw statistical output into clean, review-ready tables and figures.",
    bullets: [
      "Journal and thesis-friendly table structure",
      "Figure cleanup with consistency checks",
      "What-to-report prompts to speed writing",
    ],
  },
  {
    key: "spss",
    label: "SPSS",
    group: "tool",
    badge: "Tools",
    title: "SPSS support",
    summary:
      "SPSS workflows for survey, thesis, and applied research projects.",
    bullets: [
      "Dataset setup and coding support in SPSS format",
      "Assumption checks and analysis outputs with explanations",
      "Template-ready reporting exports",
    ],
  },
  {
    key: "rstudio",
    label: "R Studio",
    group: "tool",
    badge: "Tools",
    title: "R Studio support",
    summary:
      "R Studio workflows for reproducible analysis and flexible reporting.",
    bullets: [
      "Method-consistent analysis steps and code organization",
      "Output formatting for committee or publication flow",
      "Interpretation notes tied to your scripts and results",
    ],
  },
  {
    key: "excel",
    label: "Excel (when it fits)",
    group: "tool",
    badge: "Tools",
    title: "Excel workflows when scope fits",
    summary:
      "Use Excel for structured cleaning, summary reporting, and simple analysis support.",
    bullets: [
      "Validation sheets for cleaning and coding consistency",
      "Readable summary tables and charts",
      "Escalation guidance when advanced methods are required",
    ],
  },
];

export const lensProfiles: LensProfile[] = [
  {
    key: "stem",
    label: "STEM / Lab and experiments",
    meta: "Tailored for STEM and lab workflows",
    fieldExample:
      "Example: compare treatment groups on response outcomes across controlled conditions.",
  },
  {
    key: "bioclin",
    label: "Biotech / Clinical / Public health",
    meta: "Tailored for biostatistics and health studies",
    fieldExample:
      "Example: evaluate intervention effects with defensible significance and confidence reporting.",
  },
  {
    key: "engopt",
    label: "Engineering / Optimization",
    meta: "Tailored for engineering decision models",
    fieldExample:
      "Example: compare process performance across design alternatives and operating ranges.",
  },
  {
    key: "socedu",
    label: "Social sciences / Education",
    meta: "Tailored for social science and education projects",
    fieldExample:
      "Example: compare outcomes across cohorts or intervention exposure levels.",
  },
  {
    key: "biz",
    label: "Business / Management",
    meta: "Tailored for management analytics",
    fieldExample:
      "Example: identify drivers of customer behavior or performance across business units.",
  },
  {
    key: "human",
    label: "Humanities / Qualitative",
    meta: "Tailored for qualitative and mixed inquiry",
    fieldExample:
      "Example: pair coded themes with structured summaries for defensible interpretation.",
  },
  {
    key: "unsure",
    label: "Not sure",
    meta: "Pathway recommendation with minimal assumptions",
    fieldExample:
      "Example: start with question type and available data, then narrow to the safest method family.",
  },
];

export const questionProfiles: QuestionProfile[] = [
  {
    key: "compare",
    label: "Compare groups",
    title: "Group comparison (2 groups vs 3+ groups)",
    description:
      "Use this when outcomes are compared across groups, conditions, or cohorts.",
    bestFit: "Comparison tests and model extensions suitable for grouped designs",
    whenToUse: "Categorical group labels with numeric or scale-based outcomes",
    report: "Group means or medians, effect size, significance, and assumptions",
    watchout: "Do not overclaim causality if design is observational",
  },
  {
    key: "beforeafter",
    label: "Before-after change",
    title: "Before and after change analysis",
    description:
      "Use this for repeated measures where the same unit is observed across time.",
    bestFit: "Paired or repeated-measure methods with assumption checks",
    whenToUse: "Pre and post values for the same participant, unit, or case",
    report: "Change direction, magnitude, confidence intervals, and practical meaning",
    watchout: "Document missing follow-up and attrition impacts",
  },
  {
    key: "relationship",
    label: "Relationship (X with Y)",
    title: "Relationship and association analysis",
    description:
      "Use this when the goal is to understand how variables move together.",
    bestFit: "Correlation and relationship models matched to variable types",
    whenToUse: "Two or more variables with relationship-focused research questions",
    report: "Association strength, direction, significance, and interpretation limits",
    watchout: "Association does not prove cause and effect",
  },
  {
    key: "predict",
    label: "Prediction / drivers",
    title: "Prediction and driver analysis",
    description:
      "Use this to identify key predictors of an outcome and estimate relative influence.",
    bestFit: "Regression families aligned to outcome structure and assumptions",
    whenToUse: "Multiple candidate predictors and a target outcome",
    report: "Model fit, coefficient interpretation, diagnostics, and key drivers",
    watchout: "Check multicollinearity and overfitting before claims",
  },
  {
    key: "survey",
    label: "Survey scales (Likert)",
    title: "Survey scale and reliability pathway",
    description:
      "Use this for survey constructs, Likert scales, and reliability-focused workflows.",
    bestFit: "Scale quality checks and analysis methods consistent with construct design",
    whenToUse: "Multi-item measures and questionnaire-based outcomes",
    report: "Reliability summary, scale scoring logic, and defensible findings",
    watchout: "Avoid scale aggregation without reliability evidence",
  },
  {
    key: "text",
    label: "Text / interviews",
    title: "Text and interview analysis support",
    description:
      "Use this for coded qualitative material and structured thematic reporting.",
    bestFit: "Codebook-driven theme analysis with transparent traceability",
    whenToUse: "Interviews, open responses, and text-heavy data",
    report: "Theme definitions, exemplar evidence, and synthesis notes",
    watchout: "Maintain clear audit trail from quotes to themes",
  },
  {
    key: "mixed",
    label: "Mixed methods",
    title: "Mixed methods integration pathway",
    description:
      "Use this when quantitative and qualitative evidence must be integrated coherently.",
    bestFit: "Parallel or sequential mixed-method structures with integration logic",
    whenToUse: "Both numeric outcomes and coded narrative evidence",
    report: "Integration matrix and convergent or divergent findings",
    watchout: "Do not force agreement between conflicting evidence streams",
  },
];

export const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    label: "Share brief",
    icon: "upload",
    title: "Send what you have, even if incomplete",
    summary:
      "Dataset, research questions, deadline, and format constraints are enough to start.",
    checklist: [
      "Dataset file (Excel, CSV, SPSS, or R output)",
      "Research questions or objectives",
      "Timeline and mandatory format constraints",
    ],
  },
  {
    id: 2,
    label: "Review + quote",
    icon: "doc",
    title: "Feasibility check and clear quote",
    summary:
      "We identify risks, choose the most defensible pathway, and share a scoped quote.",
    checklist: [
      "Feasibility and risk notes",
      "Deliverables list with turnaround",
      "Clear quote with revision scope",
    ],
  },
  {
    id: 3,
    label: "Approve + pay",
    icon: "pay",
    title: "Scope confirmation before execution",
    summary:
      "Work starts only after your scope and payment confirmation.",
    checklist: [
      "Scope confirmation",
      "Secure file handling",
      "Kickoff with timeline milestones",
    ],
  },
  {
    id: 4,
    label: "Build + report",
    icon: "chart",
    title: "Analysis build and reporting structure",
    summary:
      "We produce usable outputs with interpretation guidance, not just raw exports.",
    checklist: [
      "Cleaning log and variable mapping",
      "Analysis outputs with explanation notes",
      "What-to-report guidance",
    ],
  },
  {
    id: 5,
    label: "QC pass",
    icon: "shield",
    title: "QC is the differentiator",
    summary:
      "A second review pass checks method alignment, consistency, and reporting clarity.",
    checklist: [
      "Objective, variable, and method alignment",
      "Sanity checks for missing values and outliers",
      "Table and figure consistency checks",
    ],
  },
  {
    id: 6,
    label: "Deliver + revise",
    icon: "revise",
    title: "Delivery with revision loop",
    summary:
      "You receive editable outputs and we refine based on feedback.",
    checklist: [
      "Editable deliverables and notes",
      "Revision rounds by package",
      "Final completion checklist",
    ],
  },
];

export const servicePackages: ServicePackage[] = [
  {
    id: "data-clarity-check",
    tier: "Starter",
    tierMeta: "Best for quick direction",
    title: "Data Clarity Check",
    summary:
      "Best when you have data but need a defendable analysis route before deep execution.",
    points: [
      "Dataset readiness check with documented notes",
      "Objective to variable mapping",
      "Recommended test pathway with rationale",
      "Action list for next steps",
    ],
    ctaPrimary: "Start Starter Review",
    ctaSecondary: "See sample excerpts",
  },
  {
    id: "analysis-reporting-pack",
    tier: "Core",
    tierMeta: "Most popular",
    title: "Analysis and Reporting Pack",
    summary:
      "Best when you need execution plus clean outputs you can explain confidently.",
    points: [
      "Cleaning support and structured analysis workflow",
      "Editable tables and figures with interpretation notes",
      "What-to-report guidance",
      "1 revision round",
    ],
    featured: true,
    ctaPrimary: "Get Core Support",
    ctaSecondary: "How we work",
  },
  {
    id: "committee-ready-review-pack",
    tier: "Premium",
    tierMeta: "Deadline-safe",
    title: "Supervisor and Committee-Ready Review Pack",
    summary:
      "Best for strict format expectations and timeline pressure.",
    points: [
      "Everything in Core",
      "Advanced reporting structure and clarity polish",
      "QC verification summary with changes log",
      "2 revision rounds",
    ],
    ctaPrimary: "Build My Review Pack",
    ctaSecondary: "Talk to an Analyst",
  },
];

export const samplePacks: SamplePack[] = [
  {
    id: "starter",
    label: "Starter excerpt",
    subtitle: "Clarity check",
    title: "Data Clarity Check sample",
    summary:
      "Preview readiness snapshot, variable mapping, and recommended pathway notes.",
    pages: [
      {
        id: "starter-1",
        heading: "Readiness snapshot",
        bullets: [
          "Dataset shape and quality summary",
          "Missing-value profile and coding flags",
          "Initial feasibility risks",
        ],
      },
      {
        id: "starter-2",
        heading: "Objective to variable map",
        bullets: [
          "Research question alignment matrix",
          "Variable definitions and role mapping",
          "Pre-analysis decision notes",
        ],
      },
      {
        id: "starter-3",
        heading: "Recommended pathway",
        bullets: [
          "Suggested analysis family and rationale",
          "Assumption checks to run first",
          "Actionable next-step checklist",
        ],
      },
    ],
  },
  {
    id: "core",
    label: "Core excerpt",
    subtitle: "Outputs and notes",
    title: "Analysis and Reporting Pack sample",
    summary:
      "Preview editable tables, interpretation notes, and reporting guidance.",
    pages: [
      {
        id: "core-1",
        heading: "Table structure example",
        bullets: [
          "Publication-ready table formatting",
          "Clear labels and units consistency",
          "Footnote logic for assumptions",
        ],
      },
      {
        id: "core-2",
        heading: "Interpretation notes",
        bullets: [
          "Result summary in plain language",
          "Effect-size and significance framing",
          "Claim boundaries and caveats",
        ],
      },
      {
        id: "core-3",
        heading: "What-to-report prompts",
        bullets: [
          "Section-wise writeup prompts",
          "Link results to research questions",
          "Checklist for supervisor review",
        ],
      },
    ],
  },
  {
    id: "premium",
    label: "Premium excerpt",
    subtitle: "QC summary",
    title: "Committee-Ready Review Pack sample",
    summary:
      "Preview QC verification summary and consistency checks before submission.",
    pages: [
      {
        id: "premium-1",
        heading: "QC verification sheet",
        bullets: [
          "Method alignment checks",
          "Outlier and missing-value handling trace",
          "Cross-table consistency validation",
        ],
      },
      {
        id: "premium-2",
        heading: "Narrative consistency notes",
        bullets: [
          "Result-to-interpretation consistency",
          "Risk flags for overstatement",
          "Supervisor-facing response notes",
        ],
      },
      {
        id: "premium-3",
        heading: "Final review checklist",
        bullets: [
          "Submission-readiness criteria",
          "Revision history and closure notes",
          "Deliverable pack confirmation",
        ],
      },
    ],
  },
];

export const resourceCards: ResourceCard[] = [
  {
    id: "cleaning-checklist",
    title: "Data Cleaning Checklist (1-page)",
    summary:
      "Catch missing values, coding issues, and outlier handling problems before analysis.",
  },
  {
    id: "survey-planner",
    title: "Survey Analysis Planner",
    summary:
      "Plan Likert-scale analysis, reliability checks, and reporting flow.",
  },
  {
    id: "reporting-template",
    title: "Results Reporting Template",
    summary:
      "Structured prompts for tables, figures, and what-to-report consistency.",
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-what",
    q: "What do your research data analysis services include?",
    a: "We cover data readiness, method selection, analysis execution, editable outputs, and interpretation notes that are easy to defend in reviews.",
  },
  {
    id: "faq-thesis",
    q: "Do you support thesis, dissertation, and PhD projects?",
    a: "Yes. We support thesis and dissertation workflows where method defensibility and reporting clarity are critical.",
  },
  {
    id: "faq-tools",
    q: "Do you provide SPSS and R Studio support?",
    a: "Yes. We support SPSS and R Studio workflows and explain outputs in plain language for review discussions.",
  },
  {
    id: "faq-likert",
    q: "Can you help with questionnaire and Likert-scale analysis?",
    a: "Yes. We support scale checks, reliability interpretation, and reporting structure for survey-based research.",
  },
  {
    id: "faq-regression",
    q: "Do you help with regression and predictive models?",
    a: "Yes. We support regression pathways where assumptions and interpretation boundaries are clearly documented.",
  },
  {
    id: "faq-messy",
    q: "Can you handle messy data with missing values and outliers?",
    a: "Yes. We provide transparent cleaning logs and explain every major data-handling decision.",
  },
  {
    id: "faq-integrity",
    q: "Do you fabricate results or claims?",
    a: "No. We are integrity-first. We do not fabricate data, results, or claims. We help present your research responsibly.",
  },
];
