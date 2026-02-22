import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import { PublicPageFrame } from "@/components/layout/PublicPageFrame";

const heroBullets = [
  "Research proposal outline aligned to your university or funder format",
  "Problem statement plus research gap that is defendable",
  "Objectives <-> research questions <-> methodology alignment you can justify",
  "Research timeline with milestones (Gantt-ready work plan)",
];

const bottlenecks = [
  "Broad topic and weak research gap",
  "Objectives do not match research questions or hypothesis",
  "Generic methodology (sampling, tools, analysis unclear)",
  "Weak research design justification",
  "Unrealistic timeline and unclear feasibility",
  "Template mismatch with university or funder format",
];

const deliverables = [
  {
    title: "Proposal structure",
    points: [
      "Research proposal outline with format-aware headings",
      "Problem statement plus defendable gap positioning",
      "Objectives and research questions (plus hypothesis where needed)",
      "Conceptual or theoretical framing when relevant",
    ],
  },
  {
    title: "Methodology and analysis",
    points: [
      "Research methodology plan (design, sampling, instruments)",
      "Data collection plan with variables and feasibility checks",
      "Data analysis direction (qualitative, quantitative, or mixed)",
      "Basic ethics and risk-readiness checklist",
    ],
  },
  {
    title: "Execution readiness",
    points: [
      "Research timeline with milestones (Gantt-ready)",
      "Week-by-week work plan",
      "Citation and reference setup guidance",
      "Revision rounds based on package",
    ],
  },
];

const packages = [
  {
    name: "STARTER - Proposal Clarity Check",
    price: "Starting at INR 2,499",
    bestFor:
      "You already have a draft but need clarity, gap, and methodology fixes.",
    points: [
      "Problem statement plus gap critique (what is missing and what to fix)",
      "Objectives to research questions alignment corrections",
      "Methodology red-flag check (design, sampling, feasibility)",
      "Action list with exact changes",
    ],
    ctaPrimary: "Send My Draft - Get Quote",
    ctaSecondary: "Book a 10-min Call",
    highlighted: false,
  },
  {
    name: "CORE - Proposal Blueprint",
    price: "Starting at INR 6,999",
    bestFor:
      "You want a complete planning backbone before writing the final proposal.",
    points: [
      "Format-aligned proposal outline for your institute or funder",
      "Gap, objectives, and research questions connected clearly",
      "Research methodology and research design plan",
      "Data collection plus analysis direction",
      "Timeline and milestones (Gantt-ready)",
      "1 revision round",
    ],
    ctaPrimary: "Get My Blueprint Plan",
    ctaSecondary: "Talk to an Expert",
    highlighted: true,
  },
  {
    name: "PREMIUM - Supervisor-Ready Proposal Pack",
    price: "Starting at INR 11,999",
    bestFor:
      "You have strict format requirements, a tight deadline, or need expert-level polish.",
    points: [
      "Everything in Core plus format compliance checks",
      "Stronger academic tone and section coherence",
      "Basic ethics and risk-readiness layer",
      "Submission-ready final review",
      "2 revision rounds and priority handling",
    ],
    ctaPrimary: "Get Final Quote",
    ctaSecondary: "Upload Format and Topic",
    highlighted: false,
  },
];

const workflowSteps = [
  {
    id: "1",
    tab: "Share brief",
    title: "1) Share brief",
    text: "Send your topic, format, deadline, and constraints. Even partial inputs are enough to start.",
    points: [
      "Topic or area plus optional keywords",
      "Required format or template (if available)",
      "Deadline plus expected length (if known)",
    ],
    primaryCta: "Upload Your Brief",
    secondaryCta: "Get a Free Planning Call",
  },
  {
    id: "2",
    tab: "Review + quotation",
    title: "2) Review + quotation",
    text: "We assess scope and complexity, then share a transparent quote and timeline.",
    points: [
      "Recommended package (Starter, Core, or Premium)",
      "Fixed deliverables plus expected turnaround",
      "Clarifying questions only when needed",
    ],
    note: "No surprises: you approve the quote before any work begins.",
  },
  {
    id: "3",
    tab: "Approve + pay",
    title: "3) Approve + pay",
    text: "Work starts only after quote approval and payment confirmation.",
    points: [
      "Payment confirmation starts project kickoff",
      "Confidential handling of all files",
      "NDA option available on request",
    ],
    note: "This keeps delivery timelines reliable for both sides.",
  },
  {
    id: "4",
    tab: "Blueprint build",
    title: "4) Blueprint build",
    text: "We build your chain: gap -> objectives and RQs -> methodology and design -> feasibility -> timeline.",
    points: [
      "Proposal outline aligned to your format",
      "Methodology and data analysis direction",
      "Timeline and milestones (Gantt-ready)",
    ],
  },
  {
    id: "5",
    tab: "QC pass",
    title: "5) QC pass",
    text: "A senior reviewer validates alignment, feasibility, and format compliance before delivery.",
    points: [
      "Logic QC: gap <-> objectives <-> RQs <-> methodology alignment",
      "Feasibility QC: timeline realism with constraints considered",
      "Format QC: headings and structure match your template",
    ],
    note: "QC is done as a full review, not a quick skim.",
  },
  {
    id: "6",
    tab: "Delivery + revisions",
    title: "6) Delivery + revisions",
    text: "You receive clean deliverables and revision rounds based on your package.",
    points: [
      "Delivery with checklist summary",
      "Revisions as per package scope",
      "Support for supervisor feedback incorporation",
    ],
    linkCta: "See packages",
    primaryCta: "Get Your Quote",
  },
];

const templates = [
  {
    tag: "Template",
    title: "Research Proposal Outline (Word)",
    text: "A clean structure aligned to common university expectations and ready to edit.",
    cta: "Download Free Template",
  },
  {
    tag: "Checklist",
    title: "Research Methodology Checklist (1-page)",
    text: "Design, sampling, instrument, and analysis checkpoints supervisors expect.",
    cta: "Download Checklist",
  },
  {
    tag: "Planner",
    title: "Timeline + Milestones Sheet (Gantt-ready)",
    text: "Turn your scope into a practical milestone schedule with realistic sequencing.",
    cta: "Download Planner",
  },
];

const sampleExcerpts = [
  {
    label: "Starter sample",
    meta: "2 pages | Clarity Check",
    title: "Proposal Clarity Check - Before to After",
    text: "Shows how we fix problem statement and gap, objectives and RQ alignment, and methodology red flags.",
  },
  {
    label: "Core sample",
    meta: "2-3 pages | Blueprint",
    title: "Proposal Blueprint - Outline + Methods Map + Timeline",
    text: "Shows a format-aware outline, logic chain mapping, methods mapping, and a milestone timeline.",
  },
  {
    label: "Premium sample",
    meta: "2-3 pages | Supervisor-ready",
    title: "Supervisor-Ready Pack - Format + QC Summary",
    text: "Shows format compliance polish, tone refinement, and QC summary notes before submission.",
  },
];

const faqItems = [
  {
    question: "What is research proposal writing?",
    answer:
      "It is the plan that defines what you will study, why it matters, how the study will run, and what outcomes you intend to deliver within a required format and timeline.",
  },
  {
    question: "What is the format of a research proposal?",
    answer:
      "A common structure is title, background, problem statement, research gap, objectives, research questions, methodology, timeline, ethics, and references. The exact order depends on your institution or funder.",
  },
  {
    question: "What are the five steps of writing a research proposal?",
    answer:
      "Define the problem, map literature and gap, set objectives and research questions, design methodology and analysis, then finalize timeline and compliance.",
  },
  {
    question: "Can ChatGPT write a research proposal?",
    answer:
      "AI can help brainstorming, but strong proposals still need domain-accurate logic, defendable methodology, and format compliance reviewed by humans.",
  },
  {
    question: "Do you offer online research proposal editing support?",
    answer:
      "Yes. Starter focuses on editing and clarity. Core and Premium include deeper planning, structure, and readiness support.",
  },
];

const tools = [
  {
    title: "Writing platforms",
    text: "Word and Google Docs with format-aligned headings and clean structure.",
  },
  {
    title: "References",
    text: "Zotero, Mendeley, and EndNote guidance for consistent citation setup.",
  },
  {
    title: "Planning visuals",
    text: "Tables, roadmaps, milestones, and Gantt-ready timeline sheets.",
  },
];

export const metadata: Metadata = {
  title: "Research Planning - Researchedit4u",
  description:
    "Research planning and research proposal support for PhD, thesis, and grants with gap analysis, methodology clarity, and timeline readiness.",
};

export default function ResearchPlanningPage() {
  const workInputClasses = [
    styles.workInput1,
    styles.workInput2,
    styles.workInput3,
    styles.workInput4,
    styles.workInput5,
    styles.workInput6,
  ];
  const workButtonClasses = [
    styles.workBtn1,
    styles.workBtn2,
    styles.workBtn3,
    styles.workBtn4,
    styles.workBtn5,
    styles.workBtn6,
  ];
  const workPanelClasses = [
    styles.workPanel1,
    styles.workPanel2,
    styles.workPanel3,
    styles.workPanel4,
    styles.workPanel5,
    styles.workPanel6,
  ];

  return (
    <PublicPageFrame>
      <div className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <p className={styles.kicker}>
                <span className={styles.dot} aria-hidden="true" />
                Research Planning | Proposal Help | PhD/Thesis/Grants
              </p>
              <h1 className={styles.heroTitle}>
                Research Planning for PhD and Grants - Proposal, Methodology,
                and Work Plan
              </h1>
              <p className={styles.heroSubtitle}>
                Get a supervisor-ready research plan with a clear{" "}
                <strong>problem statement</strong>, defendable{" "}
                <strong>research gap</strong>, aligned{" "}
                <strong>research objectives</strong> and{" "}
                <strong>research questions</strong>, strong{" "}
                <strong>research methodology</strong>, and a feasible timeline.
              </p>

              <ul className={styles.bulletList}>
                {heroBullets.map((bullet) => (
                  <li key={bullet} className={styles.bulletItem}>
                    <span className={styles.tick} aria-hidden="true">
                      OK
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.heroActions}>
                <Link href="/contact" className={`${styles.btn} ${styles.btnPrimary}`}>
                  Get a Free Planning Call
                </Link>
                <Link href="/contact" className={styles.btn}>
                  Upload Your Brief
                </Link>
                <a href="#packages" className={`${styles.btn} ${styles.btnGhost}`}>
                  View Packages
                </a>
              </div>
            </div>

            <aside className={styles.visualCard} aria-label="Blueprint roadmap">
              <p className={styles.visualTitle}>Blueprint Roadmap</p>
              <p className={styles.visualSub}>
                From topic confusion to proposal clarity
              </p>
              <ol className={styles.roadmap}>
                <li className={styles.roadmapItem}>
                  <span className={styles.roadmapIndex}>1</span>
                  <div>
                    <strong>Topic and scope</strong>
                    <p>Narrow focus and feasibility frame</p>
                  </div>
                </li>
                <li className={styles.roadmapItem}>
                  <span className={styles.roadmapIndex}>2</span>
                  <div>
                    <strong>Research gap</strong>
                    <p>Position novelty and relevance clearly</p>
                  </div>
                </li>
                <li className={styles.roadmapItem}>
                  <span className={styles.roadmapIndex}>3</span>
                  <div>
                    <strong>Objectives and RQs</strong>
                    <p>Keep each objective measurable and traceable</p>
                  </div>
                </li>
                <li className={styles.roadmapItem}>
                  <span className={styles.roadmapIndex}>4</span>
                  <div>
                    <strong>Methodology and design</strong>
                    <p>Methods, sampling, and analysis alignment</p>
                  </div>
                </li>
                <li className={styles.roadmapItem}>
                  <span className={styles.roadmapIndex}>5</span>
                  <div>
                    <strong>Timeline and milestones</strong>
                    <p>Gantt-ready sequence with constraints mapped</p>
                  </div>
                </li>
              </ol>
              <p className={styles.visualFoot}>
                Topic -&gt; Gap -&gt; Objectives/RQs -&gt; Methodology/Design -&gt;
                Timeline/Milestones
              </p>
            </aside>

            <form
              className={`${styles.quickForm} ${styles.heroQuoteForm}`}
              action="/contact"
              method="get"
            >
              <p className={styles.formTitle}>
                Get a quote in 30 minutes (WhatsApp or Email)
              </p>
              <div className={styles.formGrid}>
                <input className={styles.input} name="name" placeholder="Full Name" required />
                <input
                  className={styles.input}
                  name="whatsapp"
                  placeholder="WhatsApp Number"
                  required
                />
                <select
                  className={styles.input}
                  name="level"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Academic Level
                  </option>
                  <option>UG</option>
                  <option>PG</option>
                  <option>PhD</option>
                  <option>Postdoc</option>
                  <option>Grant</option>
                </select>
                <input className={styles.input} type="date" name="deadline" required />
              </div>
              <div className={styles.formActions}>
                <button className={`${styles.btn} ${styles.btnPrimary}`} type="submit">
                  Get Quote and Next Steps
                </button>
                <Link href="/contact" className={styles.btn}>
                  Share More Details
                </Link>
              </div>
              <p className={styles.formNote}>
                Transparent quote before work starts | Confidential |
                Integrity-first
              </p>
            </form>

            <div className={`${styles.trustStrip} ${styles.heroTrustStrip}`}>
              <span className={styles.chip}>
                <span className={styles.dot} aria-hidden="true" />
                Confidential
              </span>
              <span className={styles.chip}>
                <span className={styles.dot} aria-hidden="true" />
                Domain-aligned experts
              </span>
              <span className={styles.chip}>
                <span className={styles.dot} aria-hidden="true" />
                Quote shared before work
              </span>
              <span className={styles.chip}>
                <span className={styles.dot} aria-hidden="true" />
                Integrity promise
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Most research proposals do not fail in writing. They fail in
            planning.
          </h2>
          <p className={`${styles.sectionSub} ${styles.sectionSubSingleLine}`}>If supervisor feedback repeatedly asks for more clarity or stronger methodology, the logic chain is usually broken: gap -&gt; objectives -&gt; research questions -&gt; methodology -&gt; timeline. Use the toggle below to view bottlenecks and deliverables.</p>

          <div className={`${styles.card} ${styles.segmentWrap}`}>
            <input
              id="scope-view-bottlenecks"
              type="radio"
              name="scope-view"
              className={`${styles.segInput} ${styles.segInputBottlenecks}`}
              defaultChecked
            />
            <input
              id="scope-view-deliverables"
              type="radio"
              name="scope-view"
              className={`${styles.segInput} ${styles.segInputDeliverables}`}
            />

            <div className={styles.segmentTop}>
              <div className={styles.segmentMeta}>
                <span className={`${styles.chip} ${styles.segmentChip}`}>
                  Planning clarity
                </span>
                <span className={styles.mutedLine}>
                  One view at a time | Cleaner on mobile
                </span>
              </div>
              <div className={styles.seg} role="tablist" aria-label="Section toggle">
                <label
                  htmlFor="scope-view-bottlenecks"
                  className={`${styles.segBtn} ${styles.segBtnBottlenecks}`}
                >
                  Common bottlenecks
                </label>
                <label
                  htmlFor="scope-view-deliverables"
                  className={`${styles.segBtn} ${styles.segBtnDeliverables}`}
                >
                  What you receive
                </label>
              </div>
            </div>

            <div className={styles.segPanels}>
              <div className={`${styles.segPanel} ${styles.segPanelBottlenecks}`}>
                <div className={styles.cardGrid}>
                  <article className={styles.card}>
                    <h3>Common proposal bottlenecks</h3>
                    <ul>
                      {bottlenecks.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                  <article className={styles.card}>
                    <h3>What we focus on</h3>
                    <p>
                      Clarity, structure, and defensibility so your proposal
                      reads coherent from start to finish.
                    </p>
                    <ul>
                      <li>Gap -&gt; objectives -&gt; RQs alignment</li>
                      <li>Methodology that can be defended</li>
                      <li>Feasibility and timeline realism</li>
                    </ul>
                  </article>
                  <article className={styles.card}>
                    <h3>Fast start</h3>
                    <p>
                      Upload your brief and we will recommend the best package
                      with a transparent quote before work begins.
                    </p>
                    <Link
                      href="/contact"
                      className={`${styles.btn} ${styles.btnPrimary} ${styles.fastStartBtn}`}
                    >
                      Upload Your Brief
                    </Link>
                    <p className={styles.mutedLine}>
                      Confidential | Integrity-first | Quote before work
                    </p>
                  </article>
                </div>
              </div>

              <div className={`${styles.segPanel} ${styles.segPanelDeliverables}`}>
                <h3 className={styles.subSectionTitle}>
                  Clear deliverables, not vague advice
                </h3>
                <p className={styles.sectionSub}>
                  This service is built for practical proposal planning where
                  structure, methodology, and feasibility stay connected.
                </p>
                <div className={styles.cardGrid}>
                  {deliverables.map((item) => (
                    <article key={item.title} className={styles.card}>
                      <h3>{item.title}</h3>
                      <ul>
                        {item.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
                <p className={styles.sectionSub}>
                  <strong>Integrity-first:</strong> We do not fabricate data,
                  claims, or citations. Your authorship stays yours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="packages">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Choose your support level
          </h2>
          <p className={`${styles.sectionSub} ${styles.sectionSubContinuous}`}>Final quote depends on discipline, format complexity, and timeline urgency. You approve everything before work starts.</p>
          <div className={styles.packageGrid}>
            {packages.map((item) => (
              <article
                key={item.name}
                className={`${styles.packageCard} ${item.highlighted ? styles.highlighted : ""}`}
              >
                <div className={styles.packageHeader}>
                  <h3>{item.name}</h3>
                  {item.highlighted ? <span className={styles.badge}>Most Popular</span> : null}
                </div>
                <p className={styles.price}>{item.price}</p>
                <p className={styles.mutedLine}>
                  Final quote after brief review
                </p>
                <p className={styles.bestFor}>
                  <strong>Best for:</strong> {item.bestFor}
                </p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className={styles.packageActions}>
                  <Link href="/contact" className={`${styles.btn} ${styles.btnPrimary}`}>
                    {item.ctaPrimary}
                  </Link>
                  <Link href="/contact" className={styles.btn}>
                    {item.ctaSecondary}
                  </Link>
                </div>
                <p className={styles.integrity}>
                  Integrity-first delivery with no fabricated results or claims.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            How we work (quote -&gt; payment -&gt; work starts, with QC)
          </h2>
          <p className={`${styles.sectionSub} ${styles.sectionSubContinuous}`}>We review your brief, share a quote and timeline, and start only after approval and payment. Every delivery passes a QC checklist.</p>

          <div className={`${styles.card} ${styles.workWrap}`}>
            {workflowSteps.map((step, index) => (
              <input
                key={step.id}
                id={`work-step-${step.id}`}
                type="radio"
                name="workflow-step"
                className={`${styles.workInput} ${workInputClasses[index]}`}
                defaultChecked={index === 0}
              />
            ))}

            <div className={styles.workNav} role="tablist" aria-label="Workflow steps">
              {workflowSteps.map((step, index) => (
                <label
                  key={step.id}
                  htmlFor={`work-step-${step.id}`}
                  className={`${styles.workBtn} ${workButtonClasses[index]}`}
                >
                  <span className={styles.workN}>{step.id}</span>
                  <span className={styles.workT}>{step.tab}</span>
                </label>
              ))}
            </div>

            <div className={styles.workPanels}>
              {workflowSteps.map((step, index) => (
                <article
                  key={step.id}
                  className={`${styles.workPanel} ${workPanelClasses[index]}`}
                >
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  <ul>
                    {step.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  {step.note ? <p className={styles.workNote}>{step.note}</p> : null}
                  {step.primaryCta || step.secondaryCta || step.linkCta ? (
                    <div className={styles.workActions}>
                      {step.linkCta ? (
                        <a
                          href="#packages"
                          className={`${styles.btn} ${styles.btnGhost} ${styles.btnSmall}`}
                        >
                          {step.linkCta}
                        </a>
                      ) : null}
                      {step.primaryCta ? (
                        <Link
                          href="/contact"
                          className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall}`}
                        >
                          {step.primaryCta}
                        </Link>
                      ) : null}
                      {step.secondaryCta ? (
                        <Link href="/contact" className={`${styles.btn} ${styles.btnSmall}`}>
                          {step.secondaryCta}
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>

            <div className={styles.workBottom}>
              <span className={styles.chip}>
                <span className={styles.dot} aria-hidden="true" />
                Work starts after quote approval and payment
              </span>
              <span className={styles.chip}>
                <span className={styles.dot} aria-hidden="true" />
                QC checklist on every delivery
              </span>
              <span className={styles.chip}>
                <span className={styles.dot} aria-hidden="true" />
                Integrity-first process
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            What to share (takes 10 minutes)
          </h2>
          <p className={styles.sectionSub}>
            The faster we understand your format and constraints, the faster
            your planning becomes clear.
          </p>
          <div className={styles.cardGrid}>
            <article className={styles.card}>
              <h3>Essentials</h3>
              <ul>
                <li>Topic or area plus 5-10 keywords</li>
                <li>Deadline and expected proposal length (if known)</li>
                <li>University or funder template (if available)</li>
              </ul>
            </article>
            <article className={styles.card}>
              <h3>Helpful extras</h3>
              <ul>
                <li>Supervisor comments (if any)</li>
                <li>5-15 key references (optional)</li>
                <li>Constraints: tools, access, setting, or time</li>
              </ul>
            </article>
            <article className={styles.card}>
              <h3>Start now</h3>
              <p>
                Upload your brief and we will recommend the best path
                (Starter/Core/Premium) with a transparent quote.
              </p>
              <Link
                href="/contact"
                className={`${styles.btn} ${styles.btnPrimary} ${styles.shareBriefBtn}`}
              >
                Upload Brief
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Free templates to start your proposal today
          </h2>
          <p className={styles.sectionSub}>
            Use these as a starting point. We can align each template to your
            institute format after a quick review.
          </p>
          <div className={styles.downloadGrid}>
            {templates.map((template) => (
              <article key={template.title} className={styles.downloadCard}>
                <span className={styles.tag}>{template.tag}</span>
                <h3>{template.title}</h3>
                <p>{template.text}</p>
                <Link
                  href="/contact"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  {template.cta}
                </Link>
              </article>
            ))}
          </div>

          <hr className={styles.divider} />

          <h3 className={styles.subSectionTitle}>
            Package samples (realistic excerpts)
          </h3>
          <p className={styles.sectionSub}>
            Preview realistic excerpts from Starter, Core, and Premium
            deliverables to verify quality and structure.
          </p>
          <div className={`${styles.cardGrid} ${styles.sampleCards}`}>
            {sampleExcerpts.map((sample) => (
              <article key={sample.title} className={styles.card}>
                <div className={styles.sampleTop}>
                  <span className={styles.tag}>{sample.label}</span>
                  <span className={styles.mutedLine}>{sample.meta}</span>
                </div>
                <h3>{sample.title}</h3>
                <p>{sample.text}</p>
                <div className={styles.sampleActions}>
                  <Link
                    href="/contact"
                    className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSmall}`}
                  >
                    Preview
                  </Link>
                  <Link
                    href="/contact"
                    className={`${styles.btn} ${styles.btnGhost} ${styles.btnSmall}`}
                  >
                    Request PDF
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.sampleBottom}>
            <Link href="/contact" className={`${styles.btn} ${styles.btnSmall}`}>
              Download all 3 samples
            </Link>
            <span className={styles.mutedLine}>
              Need a sample closer to your subject? Request it below.
            </span>
          </div>

          <div className={`${styles.card} ${styles.sampleRequest}`}>
            <div className={styles.sampleRequestHead}>
              <div>
                <h3>Request a subject-specific sample</h3>
                <p>
                  Tell us your level, subject, and requirement. We will reply
                  with the closest matching sample preview.
                </p>
              </div>
              <div className={styles.sampleRequestChips}>
                <span className={styles.chip}>
                  <span className={styles.dot} aria-hidden="true" />
                  Confidential
                </span>
                <span className={styles.chip}>
                  <span className={styles.dot} aria-hidden="true" />
                  Integrity-first
                </span>
                <span className={styles.chip}>
                  <span className={styles.dot} aria-hidden="true" />
                  QC-backed
                </span>
              </div>
            </div>

            <form className={styles.sampleForm} action="/contact" method="get">
              <div className={styles.field}>
                <label htmlFor="srName">Full name *</label>
                <input
                  id="srName"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="srEmail">Email *</label>
                <input
                  id="srEmail"
                  name="email"
                  type="email"
                  required
                  placeholder="name@email.com"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="srPhone">Phone or WhatsApp *</label>
                <input
                  id="srPhone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91..."
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="srLevel">Level *</label>
                <select id="srLevel" name="level" defaultValue="" required>
                  <option value="" disabled>
                    Select
                  </option>
                  <option>PhD / Registration</option>
                  <option>Thesis / Dissertation</option>
                  <option>Grant / Funding</option>
                  <option>Other</option>
                </select>
              </div>
              <div className={`${styles.field} ${styles.fieldFull}`}>
                <label htmlFor="srSubject">Subject or domain *</label>
                <input
                  id="srSubject"
                  name="subject"
                  type="text"
                  required
                  placeholder="e.g., Psychology, Civil Engineering, Management"
                />
              </div>
              <div className={`${styles.field} ${styles.fieldFull}`}>
                <label htmlFor="srReq">Requirement *</label>
                <textarea
                  id="srReq"
                  name="requirement"
                  rows={4}
                  required
                  placeholder="What do you want to review in the sample? (gap, RQs, methodology, timeline, format)"
                />
              </div>
              <div className={`${styles.field} ${styles.fieldFull}`}>
                <label htmlFor="srFile">
                  Upload institute or funder format (optional)
                </label>
                <input
                  id="srFile"
                  name="formatfile"
                  type="file"
                  accept=".pdf,.doc,.docx,.rtf,.txt"
                />
                <p className={styles.mutedLine}>
                  If you upload your template, we can align the sample structure
                  more closely to your format.
                </p>
              </div>
              <div className={`${styles.field} ${styles.fieldFull}`}>
                <button
                  className={`${styles.btn} ${styles.btnPrimary} ${styles.sampleSubmitBtn}`}
                  type="submit"
                >
                  Send me a sample preview
                </button>
                <p className={styles.mutedLine}>
                  By submitting, you agree we may contact you to share the
                  preview.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Works with the tools you already use
          </h2>
          <p className={`${styles.sectionSub} ${styles.sectionSubContinuous}`}>We support Word or Google Docs workflows, reference managers, and Gantt-style planning outputs. If you use AI for brainstorming, we keep outputs human-reviewed and integrity-aligned.</p>
          <div className={styles.cardGrid}>
            {tools.map((tool) => (
              <article key={tool.title} className={styles.card}>
                <h3>{tool.title}</h3>
                <p>{tool.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="faqs">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Research proposal writing FAQs
          </h2>
          <p className={styles.sectionSub}>
            These answers align with common research planning and proposal
            writing queries.
          </p>
          <div className={styles.faqList}>
            {faqItems.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.finalCta}>
            <div className={styles.finalCtaContent}>
              <h3>
                Ready to turn your topic into a clear, defendable proposal?
              </h3>
              <p className={styles.finalCtaNoWrap}>
                Get research planning support that connects{" "}
                <strong>
                  gap -&gt; objectives -&gt; research questions -&gt; methodology
                  -&gt; timeline
                </strong>{" "}
                so your proposal is structured,
                <br />
                feasible, and supervisor-ready.
              </p>
            </div>
            <div className={styles.finalButtons}>
              <Link href="/contact" className={`${styles.btn} ${styles.btnPrimary}`}>
                Get a Free Planning Call
              </Link>
              <Link href="/contact" className={styles.btn}>
                Upload Your Brief
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </PublicPageFrame>
  );
}


