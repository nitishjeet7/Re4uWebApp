import type { Service, CaseStudy } from "@/lib/types";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

const services: Service[] = [
  {
    id: "service-overview",
    title: "Service Overview",
    shortDescription:
      "Stage-based overview page with modules, pricing scope, proof assets, and FAQ.",
    features: [
      "Stage selector",
      "Module mapping",
      "Proof assets",
      "Scope pricing clarity",
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "editing-support",
    title: "Editing Support",
    shortDescription: "Full manuscript editing and submission support.",
    features: ["Line editing", "Structure feedback", "Journal matching", "Response handling"],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "publication-support",
    title: "Publication Support",
    shortDescription: "Journal shortlist and submission-ready publication support.",
    features: [
      "Journal selection shortlist",
      "Submission readiness pack",
      "Cover letter guidance",
      "Response-to-reviewer planning",
    ],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "data-services",
    title: "Data Services",
    shortDescription: "Data analysis and statistics support.",
    features: ["Sampling logic", "Instruments", "Analysis pathways", "Methodology support"],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "research-planning",
    title: "Research Planning",
    shortDescription: "Research design and planning support.",
    features: ["Study design", "Protocol development", "Ethics alignment", "Timeline planning"],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "presentations",
    title: "Academic Presentation",
    shortDescription: "Academic presentation, poster, and proposal deck support.",
    features: ["Graphical abstracts", "Figure design", "Slide decks", "Poster design"],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

const caseStudies: CaseStudy[] = [
  {
    id: "cs-01",
    title: "Clarity Editing for Reviewer-Ready Readability",
    slug: "clarity-editing-reviewer-readability",
    summary:
      "An engineering manuscript moved from dense, hard-to-scan prose to clear reviewer-facing structure.",
    problem:
      "Technically correct content was difficult to evaluate because of weak signposting and dense sections.",
    approach:
      "We applied meaning-preserving line edits, section-level restructuring, terminology harmonization, and self-contained caption cleanup.",
    outcome:
      "The submission became easier to triage and review, reducing avoidable friction in editorial assessment.",
    metricsJson: {
      discipline: "Engineering",
      stage: "Pre-submission",
      region: "India",
      turnaround: "72 hours",
      focus: [
        "Contribution clarity",
        "Structure and flow",
        "Terminology discipline",
      ],
    },
    status: "published",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "cs-02",
    title: "Journal Shortlist Built on Scope-Fit and Decision Realism",
    slug: "journal-shortlist-scope-fit",
    summary:
      "A management team replaced guesswork with a ranked submission sequence based on fit and risk.",
    problem:
      "Target journals were selected by reputation alone, creating high risk of fast scope mismatch rejection.",
    approach:
      "We mapped manuscript claims against journal scope and article-type expectations, then built Plan A and Plan B submission paths.",
    outcome:
      "The team gained a safer shortlist with clearer rationale, realistic timelines, and stronger first-submission positioning.",
    metricsJson: {
      discipline: "Management",
      stage: "Pre-submission",
      region: "Middle East",
      deliverables: [
        "Ranked shortlist",
        "Avoid list with reasons",
        "Submission sequencing plan",
      ],
    },
    status: "published",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "cs-03",
    title: "Integrity Triage for Similarity and Attribution Risk",
    slug: "similarity-integrity-triage",
    summary:
      "A life-sciences revision addressed high-risk overlap and citation-chain gaps through transparent rewrite logic.",
    problem:
      "Similarity output revealed unattributed close paraphrase and patchy citation chains in key argument sections.",
    approach:
      "We triaged low-risk vs high-risk overlap, rebuilt citation support, and rewrote flagged passages for synthesis quality.",
    outcome:
      "The manuscript showed stronger attribution clarity and lower integrity risk without concealment tactics.",
    metricsJson: {
      discipline: "Life Sciences",
      stage: "Revision",
      region: "UK/EU",
      focus: [
        "Attribution repair",
        "Synthesis rewrite",
        "Re-flagging prevention checklist",
      ],
    },
    status: "published",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "cs-04",
    title: "Methods and Results Reporting Alignment",
    slug: "methods-reporting-alignment",
    summary:
      "A clinical manuscript improved reviewer auditability by tightening methods reporting and results communication.",
    problem:
      "Review burden increased because analysis assumptions, outcomes, and reporting logic were under-specified.",
    approach:
      "We ran a reporting-completeness audit, clarified methods and assumptions, and restructured tables and captions.",
    outcome:
      "The final draft became easier to interpret and verify, with fewer likely reviewer clarification loops.",
    metricsJson: {
      discipline: "Medical",
      stage: "Pre-submission",
      region: "Australia",
      deliverables: [
        "Methods rewrite",
        "Results narrative polish",
        "Reporting checklist summary",
      ],
    },
    status: "published",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "cs-05",
    title: "Response-to-Reviewers Mapping for Faster Re-Review",
    slug: "rebuttal-response-mapping",
    summary:
      "A chemistry revision package was rebuilt into verifiable point-by-point responses with exact edit traceability.",
    problem:
      "Revisions were made, but the rebuttal lacked complete comment coverage and explicit change mapping.",
    approach:
      "We created structured comment-response-location mapping, aligned tracked and clean files, and refined response tone.",
    outcome:
      "The revised package became faster for reviewers to validate, reducing risk of extra cycles for missing responses.",
    metricsJson: {
      discipline: "Chemistry",
      stage: "Revision",
      region: "India",
      focus: [
        "Rebuttal structure",
        "Traceability",
        "Tone and completeness",
      ],
    },
    status: "published",
    publishedAt: new Date().toISOString(),
  },
];

export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return caseStudies;
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const study = caseStudies.find((s) => s.slug === slug);
  return study ?? null;
}
