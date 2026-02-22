"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import {
  faqItems,
  heroTrustChips,
  lensProfiles,
  outcomePanels,
  pathPanels,
  questionProfiles,
  resourceCards,
  samplePacks,
  servicePackages,
  workflowSteps,
  type LensKey,
  type OutcomeKey,
  type PathId,
  type QuestionKey,
  type WorkflowStep,
} from "./content";

type DataServicesExperienceProps = {
  fontClassName: string;
};

function WorkflowGlyph({ icon }: { icon: WorkflowStep["icon"] }) {
  if (icon === "upload") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l4 4h-3v7h-2V7H8l4-4z" />
        <path d="M5 14v4h14v-4h2v6H3v-6h2z" />
      </svg>
    );
  }

  if (icon === "doc") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        <path d="M14 3v6h6" />
        <path
          d="M8 12h8M8 16h8"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (icon === "pay") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
        <path d="M3 10h18" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M7 15h3"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (icon === "chart") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 19V5M4 19h17M7 15l4-4 3 3 6-7"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <circle cx="7" cy="15" r="1.4" />
        <circle cx="11" cy="11" r="1.4" />
        <circle cx="14" cy="14" r="1.4" />
        <circle cx="20" cy="7" r="1.4" />
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2l8 4v6c0 5.2-3.3 9.9-8 10-4.7-.1-8-4.8-8-10V6l8-4z" />
        <path
          d="M8.5 12.3l2.2 2.2 4.9-5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 4h10a2 2 0 0 1 2 2v3M20 20H10a2 2 0 0 1-2-2v-3M7 14l-3 1 1-3 8-8 2 2-8 8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M14 6l2 2" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function buildContactHref(params: {
  source?: string;
  plan?: string;
  notes?: string;
  name?: string;
  email?: string;
}) {
  const query = new URLSearchParams({
    service: "data-services",
    source: params.source ?? "data-services-page",
  });

  if (params.plan) query.set("plan", params.plan);
  if (params.notes) query.set("notes", params.notes);
  if (params.name) query.set("name", params.name);
  if (params.email) query.set("email", params.email);

  return `/contact?${query.toString()}`;
}

export default function DataServicesExperience({
  fontClassName,
}: DataServicesExperienceProps) {
  const router = useRouter();

  const [activePath, setActivePath] = useState<PathId>("a");
  const [activeOutcome, setActiveOutcome] = useState<OutcomeKey>("cleanup");
  const [activeLens, setActiveLens] = useState<LensKey>("stem");
  const [activeQuestion, setActiveQuestion] = useState<QuestionKey>("compare");
  const [activeStep, setActiveStep] = useState(1);
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);
  const [samplePageIndex, setSamplePageIndex] = useState(0);
  const [leadError, setLeadError] = useState("");
  const [leadForm, setLeadForm] = useState({
    name: "",
    email: "",
    level: "",
    subject: "",
    requirement: "",
  });

  const activePathPanel =
    pathPanels.find((panel) => panel.id === activePath) ?? pathPanels[0];
  const activeOutcomePanel =
    outcomePanels.find((panel) => panel.key === activeOutcome) ??
    outcomePanels[0];
  const activeLensProfile =
    lensProfiles.find((lens) => lens.key === activeLens) ?? lensProfiles[0];
  const activeQuestionProfile =
    questionProfiles.find((question) => question.key === activeQuestion) ??
    questionProfiles[0];
  const activeWorkflowStep =
    workflowSteps.find((step) => step.id === activeStep) ?? workflowSteps[0];
  const activeSample =
    samplePacks.find((pack) => pack.id === activeSampleId) ?? null;
  const activeSamplePage = activeSample
    ? activeSample.pages[samplePageIndex] ?? activeSample.pages[0]
    : null;

  const deliverablePills = useMemo(
    () => outcomePanels.filter((panel) => panel.group === "deliverable"),
    [],
  );
  const toolPills = useMemo(
    () => outcomePanels.filter((panel) => panel.group === "tool"),
    [],
  );

  const methodExample = `${activeLensProfile.fieldExample} Use this pathway for "${activeQuestionProfile.label}" style questions.`;
  const workflowProgress =
    ((activeWorkflowStep.id - 1) / (workflowSteps.length - 1)) * 100;

  useEffect(() => {
    if (!activeSample) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveSampleId(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        setSamplePageIndex((current) =>
          activeSample.pages.length === 0
            ? 0
            : (current - 1 + activeSample.pages.length) % activeSample.pages.length,
        );
      }

      if (event.key === "ArrowRight") {
        setSamplePageIndex((current) =>
          activeSample.pages.length === 0
            ? 0
            : (current + 1) % activeSample.pages.length,
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeSample]);

  const openSample = (sampleId: string) => {
    setActiveSampleId(sampleId);
    setSamplePageIndex(0);
  };

  const goSamplePage = (direction: -1 | 1) => {
    if (!activeSample) return;

    setSamplePageIndex((current) =>
      (current + direction + activeSample.pages.length) % activeSample.pages.length,
    );
  };

  const submitLeadForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = leadForm.name.trim();
    const email = leadForm.email.trim();
    const level = leadForm.level.trim();
    const subject = leadForm.subject.trim();
    const requirement = leadForm.requirement.trim();

    if (!name || !email || !level || !subject || !requirement) {
      setLeadError("Please complete all required fields.");
      return;
    }

    const notes = [
      "Data services brief",
      `Level: ${level}`,
      `Subject: ${subject}`,
      `Requirement: ${requirement}`,
    ].join("\n");

    setLeadError("");
    router.push(
      buildContactHref({
        source: "data-services-lead",
        notes,
        name,
        email,
      }),
    );
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <article className={styles.heroCard}>
              <p className={styles.heroKicker}>Data Services</p>
              <h1 className={`${styles.heroTitle} ${fontClassName}`}>
                Data analysis services for research so your results are clear,
                defendable, and easy to explain
              </h1>
              <p className={styles.heroSub}>
                ResearchEdit4U supports real research workflows with data
                cleaning, statistical analysis, interpretation notes, and
                reporting-ready outputs.
              </p>

              <div className={styles.heroActions}>
                <Link
                  href={buildContactHref({
                    source: "data-services-hero",
                  })}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  Get a Data Review + Quote
                </Link>
                <a href="#packages" className={`${styles.btn} ${styles.btnGhost}`}>
                  See packages
                </a>
              </div>

              <div className={styles.heroTrust}>
                {heroTrustChips.map((chip) => (
                  <span key={chip} className={styles.chip}>
                    <span className={styles.dot} />
                    {chip}
                  </span>
                ))}
              </div>

              <p className={styles.heroNote}>
                You keep authorship and decisions. We help make your pathway and
                reporting defendable without overclaiming.
              </p>
            </article>

            <aside className={styles.heroSide}>
              <h2 className={styles.sideTitle}>At a glance</h2>
              <div className={styles.kpiGrid}>
                <article className={styles.kpiCard}>
                  <strong>24h</strong>
                  <span>Initial feasibility response</span>
                </article>
                <article className={styles.kpiCard}>
                  <strong>QC</strong>
                  <span>Second-pass consistency checks</span>
                </article>
                <article className={styles.kpiCard}>
                  <strong>Editable</strong>
                  <span>Tables, figures, and notes</span>
                </article>
                <article className={styles.kpiCard}>
                  <strong>Secure</strong>
                  <span>Confidential and integrity-first</span>
                </article>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`} id="path">
        <div className={styles.container}>
          <header className={styles.sectionHead}>
            <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
              Start where you are
            </h2>
            <p className={styles.sectionSub}>
              Choose the closest match. We return the simplest route and the
              right package without making this feel complicated.
            </p>
          </header>

          <div className={styles.pathTabs} role="tablist" aria-label="Choose your path">
            {pathPanels.map((panel) => {
              const isActive = panel.id === activePath;

              return (
                <button
                  key={panel.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.pathTab} ${isActive ? styles.pathTabActive : ""}`}
                  onClick={() => setActivePath(panel.id)}
                >
                  {panel.tabLabel}
                </button>
              );
            })}
          </div>

          <article className={styles.pathPanel}>
            <div className={styles.pathPanelGrid}>
              <div>
                <span className={styles.chip}>
                  <span className={styles.dot} />
                  Best for
                </span>
                <h3 className={styles.pathTitle}>{activePathPanel.title}</h3>
                <p className={styles.pathSummary}>{activePathPanel.summary}</p>
              </div>

              <div className={styles.pathColumns}>
                <div>
                  <h4>What we do</h4>
                  <ul>
                    {activePathPanel.whatWeDo.map((point) => (
                      <li key={`${activePathPanel.id}-do-${point}`}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>What you receive</h4>
                  <ul>
                    {activePathPanel.whatYouReceive.map((point) => (
                      <li key={`${activePathPanel.id}-receive-${point}`}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.panelActions}>
              <Link
                href={buildContactHref({
                  source: "data-services-path",
                  notes: `${activePathPanel.title} brief`,
                })}
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                {activePathPanel.primaryCta}
              </Link>
              <a href="#packages" className={`${styles.btn} ${styles.btnGhost}`}>
                See packages
              </a>
            </div>
          </article>
        </div>
      </section>
      <section className={styles.section} id="outcomes">
        <div className={styles.container}>
          <header className={styles.sectionHead}>
            <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
              What you get (and how we deliver it)
            </h2>
            <p className={styles.sectionSub}>
              Pick one to preview exact deliverables and tool support in a
              single view.
            </p>
          </header>

          <div className={styles.selectorWrap}>
            <div className={styles.selectorTop}>
              <p className={styles.selectorHint}>
                Deliverables and tools in one row
              </p>
              <div className={styles.selectorCtas}>
                <Link
                  href={buildContactHref({
                    source: "data-services-outcomes",
                    notes: `${activeOutcomePanel.title} review`,
                  })}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  Get a Data Review + Quote
                </Link>
                <a href="#packages" className={`${styles.btn} ${styles.btnGhost}`}>
                  See packages
                </a>
              </div>
            </div>

            <div className={styles.selectorRow} role="tablist" aria-label="Outcome selector">
              {deliverablePills.map((panel) => {
                const isActive = panel.key === activeOutcome;

                return (
                  <button
                    key={panel.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`${styles.selectorPill} ${isActive ? styles.selectorPillActive : ""}`}
                    onClick={() => setActiveOutcome(panel.key)}
                  >
                    {panel.label}
                  </button>
                );
              })}
              <span className={styles.selectorDivider} aria-hidden="true" />
              {toolPills.map((panel) => {
                const isActive = panel.key === activeOutcome;

                return (
                  <button
                    key={panel.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`${styles.selectorPill} ${isActive ? styles.selectorPillActive : ""}`}
                    onClick={() => setActiveOutcome(panel.key)}
                  >
                    {panel.label}
                  </button>
                );
              })}
            </div>

            <article key={activeOutcomePanel.key} className={styles.selectorPanel}>
              <span className={styles.panelBadge}>{activeOutcomePanel.badge}</span>
              <h3>{activeOutcomePanel.title}</h3>
              <p>{activeOutcomePanel.summary}</p>
              <ul>
                {activeOutcomePanel.bullets.map((point) => (
                  <li key={`${activeOutcomePanel.key}-${point}`}>{point}</li>
                ))}
              </ul>
              <p className={styles.panelMicro}>
                Integrity-first: we help interpretation and reporting clarity.
                We do not fabricate data or claims.
              </p>
            </article>

            <div className={styles.selectorFoot}>
              <span className={styles.chip}>
                <span className={styles.dot} />
                QC-backed outputs
              </span>
              <span className={styles.chip}>
                <span className={styles.dot} />
                Clear what-to-report notes
              </span>
              <span className={styles.chip}>
                <span className={styles.dot} />
                Built for academic review
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="methods">
        <div className={styles.container}>
          <header className={styles.sectionHead}>
            <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
              Choose your field. Then choose your question.
            </h2>
            <p className={styles.sectionSub}>
              Same research rules across subjects, but different reviewer
              expectations. Use this to select a defendable methodology path.
            </p>
          </header>

          <div className={styles.matcherWrap}>
            <div className={styles.matcherStep}>
              <p className={styles.matcherLabel}>Step 1: Pick your field</p>
              <div className={styles.matcherRow} role="tablist" aria-label="Field selector">
                {lensProfiles.map((lens) => {
                  const isActive = lens.key === activeLens;
                  return (
                    <button
                      key={lens.key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`${styles.matchPill} ${isActive ? styles.matchPillActive : ""}`}
                      onClick={() => setActiveLens(lens.key)}
                    >
                      {lens.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.matcherStep}>
              <p className={styles.matcherLabel}>Step 2: Pick your question type</p>
              <div className={styles.matcherRow} role="tablist" aria-label="Question selector">
                {questionProfiles.map((question) => {
                  const isActive = question.key === activeQuestion;
                  return (
                    <button
                      key={question.key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`${styles.matchPill} ${styles.matchPillSoft} ${isActive ? styles.matchPillActive : ""}`}
                      onClick={() => setActiveQuestion(question.key)}
                    >
                      {question.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <article className={styles.matcherCard}>
              <div className={styles.matcherTop}>
                <span className={styles.panelBadge}>Recommended path</span>
                <span className={styles.matcherMeta}>{activeLensProfile.meta}</span>
              </div>
              <h3>{activeQuestionProfile.title}</h3>
              <p>{activeQuestionProfile.description}</p>

              <div className={styles.matcherGrid}>
                <div className={styles.matcherBox}>
                  <h4>Best-fit analysis family</h4>
                  <p>{activeQuestionProfile.bestFit}</p>
                </div>
                <div className={styles.matcherBox}>
                  <h4>When to use</h4>
                  <p>{activeQuestionProfile.whenToUse}</p>
                </div>
                <div className={styles.matcherBox}>
                  <h4>What to report</h4>
                  <p>{activeQuestionProfile.report}</p>
                </div>
                <div className={styles.matcherBox}>
                  <h4>Reviewer watch-out</h4>
                  <p>{activeQuestionProfile.watchout}</p>
                </div>
              </div>

              <div className={styles.matcherExample}>
                <h4>Example for your field</h4>
                <p>{methodExample}</p>
              </div>

              <div className={styles.panelActions}>
                <Link
                  href={buildContactHref({
                    source: "data-services-methods",
                    notes: `${activeLensProfile.label} | ${activeQuestionProfile.title}`,
                  })}
                  className={`${styles.btn} ${styles.btnPrimary}`}
                >
                  Send my dataset for review
                </Link>
                <a href="#packages" className={`${styles.btn} ${styles.btnGhost}`}>
                  See packages
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`} id="workflow">
        <div className={styles.container}>
          <header className={styles.sectionHead}>
            <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
              How we work (transparent, QC-first)
            </h2>
            <p className={styles.sectionSub}>
              You always know what is feasible, what you will receive, and how
              quality control is handled.
            </p>
          </header>

          <div className={styles.workflowWrap}>
            <div className={styles.workflowTabs} role="tablist" aria-label="Workflow steps">
              {workflowSteps.map((step) => {
                const isActive = step.id === activeStep;
                return (
                  <button
                    key={step.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`${styles.workflowTab} ${isActive ? styles.workflowTabActive : ""}`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    <span>{step.id}</span>
                    <i className={styles.workflowTabIcon} aria-hidden="true">
                      <WorkflowGlyph icon={step.icon} />
                    </i>
                    {step.label}
                  </button>
                );
              })}
            </div>

            <div className={styles.workflowProgressTrack} aria-hidden="true">
              <div
                className={styles.workflowProgressFill}
                style={{ width: `${workflowProgress}%` }}
              />
            </div>

            <article className={styles.workflowPanel}>
              <div className={styles.workflowPanelHead}>
                <i className={styles.workflowPanelIcon} aria-hidden="true">
                  <WorkflowGlyph icon={activeWorkflowStep.icon} />
                </i>
                <h3>{activeWorkflowStep.title}</h3>
              </div>
              <p>{activeWorkflowStep.summary}</p>
              <ul>
                {activeWorkflowStep.checklist.map((item) => (
                  <li key={`${activeWorkflowStep.id}-${item}`}>{item}</li>
                ))}
              </ul>
            </article>

            <div className={styles.panelActions}>
              <Link
                href={buildContactHref({
                  source: "data-services-workflow",
                  notes: "Workflow review request",
                })}
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Get a Data Review + Quote
              </Link>
              <Link
                href={buildContactHref({
                  source: "data-services-workflow",
                  notes: "Talk to an analyst request",
                })}
                className={`${styles.btn} ${styles.btnGhost}`}
              >
                Talk to an Analyst
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="packages">
        <div className={styles.container}>
          <header className={styles.sectionHead}>
            <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
              Choose how much support you need
            </h2>
            <p className={styles.sectionSub}>
              Start small if unsure, and upgrade when needed. Everything stays
              documented and QC-checked.
            </p>
          </header>

          <div className={styles.packageGrid}>
            {servicePackages.map((pack) => (
              <article
                key={pack.id}
                className={`${styles.packageCard} ${pack.featured ? styles.packageFeatured : ""}`}
              >
                <div className={styles.packageTop}>
                  <span className={styles.chip}>
                    <span className={styles.dot} />
                    {pack.tier}
                  </span>
                  <span>{pack.tierMeta}</span>
                </div>
                <h3>{pack.title}</h3>
                <p>{pack.summary}</p>
                <ul>
                  {pack.points.map((point) => (
                    <li key={`${pack.id}-${point}`}>{point}</li>
                  ))}
                </ul>

                <div className={styles.packageActions}>
                  <Link
                    href={buildContactHref({
                      source: "data-services-package",
                      plan: pack.id,
                    })}
                    className={`${styles.btn} ${styles.btnPrimary}`}
                  >
                    {pack.ctaPrimary}
                  </Link>
                  <a
                    href={pack.ctaSecondary === "See sample excerpts" ? "#samples" : "#workflow"}
                    className={`${styles.btn} ${styles.btnGhost}`}
                  >
                    {pack.ctaSecondary}
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className={styles.integrityNote}>
            Integrity-first: we help you understand and present your results. We
            do not fabricate data, results, or claims.
          </p>
        </div>
      </section>
      <section className={`${styles.section} ${styles.sectionSoft}`} id="samples">
        <div className={styles.container}>
          <header className={styles.sectionHead}>
            <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
              See sample excerpts before you decide
            </h2>
            <p className={styles.sectionSub}>
              Preview how we structure decisions, QC checks, and reporting
              outputs. Request a closer subject match when needed.
            </p>
          </header>

          <div className={styles.sampleGrid}>
            {samplePacks.map((pack) => (
              <article key={pack.id} className={styles.sampleCard}>
                <div className={styles.sampleTop}>
                  <span className={styles.chip}>
                    <span className={styles.dot} />
                    {pack.label}
                  </span>
                  <span>{pack.subtitle}</span>
                </div>
                <h3>{pack.title}</h3>
                <p>{pack.summary}</p>
                <div className={styles.sampleActions}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={() => openSample(pack.id)}
                  >
                    Preview
                  </button>
                  <Link
                    href={buildContactHref({
                      source: "data-services-sample",
                      notes: `Request full sample: ${pack.title}`,
                    })}
                    className={`${styles.btn} ${styles.btnGhost}`}
                  >
                    Request full sample
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <article className={styles.leadCard} id="lead">
            <div className={styles.leadHead}>
              <div>
                <h3>Request a subject-specific sample or get a quote</h3>
                <p>
                  Share level, subject, and requirement. We reply with the
                  closest sample and a clear quote.
                </p>
              </div>
              <div className={styles.heroTrust}>
                <span className={styles.chip}>
                  <span className={styles.dot} />
                  Confidential
                </span>
                <span className={styles.chip}>
                  <span className={styles.dot} />
                  QC-backed
                </span>
                <span className={styles.chip}>
                  <span className={styles.dot} />
                  Research-first
                </span>
              </div>
            </div>

            <form className={styles.leadForm} onSubmit={submitLeadForm}>
              <label className={styles.field}>
                <span>Full name *</span>
                <input
                  type="text"
                  value={leadForm.name}
                  onChange={(event) =>
                    setLeadForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  placeholder="Your name"
                />
              </label>
              <label className={styles.field}>
                <span>Email *</span>
                <input
                  type="email"
                  value={leadForm.email}
                  onChange={(event) =>
                    setLeadForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  placeholder="name@email.com"
                />
              </label>
              <label className={styles.field}>
                <span>Level *</span>
                <select
                  value={leadForm.level}
                  onChange={(event) =>
                    setLeadForm((prev) => ({ ...prev, level: event.target.value }))
                  }
                >
                  <option value="">Select</option>
                  <option value="PhD / Registration">PhD / Registration</option>
                  <option value="Thesis / Dissertation">Thesis / Dissertation</option>
                  <option value="Clinical / Public Health">
                    Clinical / Public Health
                  </option>
                  <option value="Survey / Questionnaire">
                    Survey / Questionnaire
                  </option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label className={styles.fieldWide}>
                <span>Subject or domain *</span>
                <input
                  type="text"
                  value={leadForm.subject}
                  onChange={(event) =>
                    setLeadForm((prev) => ({ ...prev, subject: event.target.value }))
                  }
                  placeholder="e.g., Psychology, Civil Engineering, Management"
                />
              </label>
              <label className={styles.fieldWide}>
                <span>Requirement *</span>
                <textarea
                  rows={4}
                  value={leadForm.requirement}
                  onChange={(event) =>
                    setLeadForm((prev) => ({ ...prev, requirement: event.target.value }))
                  }
                  placeholder="What support do you need? (cleaning, analysis, interpretation, reporting, QC review)"
                />
              </label>

              {leadError ? <p className={styles.leadError}>{leadError}</p> : null}

              <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                Send and get a reply
              </button>
            </form>
          </article>
        </div>
      </section>

      <section className={styles.section} id="resources">
        <div className={styles.container}>
          <header className={styles.sectionHead}>
            <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
              Free tools you can use today
            </h2>
            <p className={styles.sectionSub}>
              Practical resources to help you move forward before outreach.
            </p>
          </header>

          <div className={styles.resourceGrid}>
            {resourceCards.map((resource) => (
              <article key={resource.id} className={styles.resourceCard}>
                <h3>{resource.title}</h3>
                <p>{resource.summary}</p>
                <Link
                  href={buildContactHref({
                    source: "data-services-resource",
                    notes: `Request resource: ${resource.title}`,
                  })}
                  className={`${styles.btn} ${styles.btnGhost}`}
                >
                  Request
                </Link>
              </article>
            ))}
          </div>

          <p className={styles.integrityNote}>
            Want these aligned to your institute or sponsor format? Upload the
            template in your quote request.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`} id="faq">
        <div className={styles.container}>
          <header className={styles.sectionHead}>
            <h2 className={`${styles.sectionTitle} ${fontClassName}`}>FAQ</h2>
            <p className={styles.sectionSub}>Straight answers so you can decide quickly.</p>
          </header>

          <div className={styles.faqList}>
            {faqItems.map((item) => (
              <details key={item.id} className={styles.faqItem}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>

          <div className={styles.panelActions}>
            <Link
              href={buildContactHref({
                source: "data-services-faq",
              })}
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              Get a Data Review + Quote
            </Link>
            <a href="#samples" className={`${styles.btn} ${styles.btnGhost}`}>
              Preview sample excerpts
            </a>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <article className={styles.finalCta}>
            <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
              Ready to make your data easier to defend?
            </h2>
            <p className={styles.sectionSub}>
              Share your brief and we will respond with a realistic pathway, a
              clear quote, and defined deliverables.
            </p>
            <div className={styles.panelActions}>
              <Link
                href={buildContactHref({
                  source: "data-services-final",
                })}
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Get a Data Review + Quote
              </Link>
              <Link
                href={buildContactHref({
                  source: "data-services-final",
                  notes: "Talk to an analyst request",
                })}
                className={`${styles.btn} ${styles.btnGhost}`}
              >
                Talk to an Analyst
              </Link>
            </div>
          </article>
        </div>
      </section>

      {activeSample && activeSamplePage ? (
        <div className={styles.modal} role="presentation" onClick={() => setActiveSampleId(null)}>
          <div className={styles.modalBackdrop} />
          <div
            className={styles.modalDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sample-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHead}>
              <div>
                <span className={styles.chip}>
                  <span className={styles.dot} />
                  Sample preview
                </span>
                <h3 id="sample-modal-title">{activeSample.title}</h3>
                <p>
                  Page {samplePageIndex + 1} of {activeSample.pages.length}
                </p>
              </div>
              <button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={() => setActiveSampleId(null)}
              >
                Close
              </button>
            </div>

            <div className={styles.sampleViewer}>
              <button
                type="button"
                className={styles.navBtn}
                aria-label="Previous sample page"
                onClick={() => goSamplePage(-1)}
              >
                {"<"}
              </button>
              <article className={styles.sampleCanvas}>
                <h4>{activeSamplePage.heading}</h4>
                <ul>
                  {activeSamplePage.bullets.map((item) => (
                    <li key={`${activeSamplePage.id}-${item}`}>{item}</li>
                  ))}
                </ul>
              </article>
              <button
                type="button"
                className={styles.navBtn}
                aria-label="Next sample page"
                onClick={() => goSamplePage(1)}
              >
                {">"}
              </button>
            </div>

            <div className={styles.modalDots} aria-label="Sample pages">
              {activeSample.pages.map((page, index) => {
                const isActive = index === samplePageIndex;
                return (
                  <button
                    key={page.id}
                    type="button"
                    className={`${styles.modalDot} ${isActive ? styles.modalDotActive : ""}`}
                    aria-label={`Go to page ${index + 1}`}
                    onClick={() => setSamplePageIndex(index)}
                  />
                );
              })}
            </div>

            <div className={styles.panelActions}>
              <Link
                href={buildContactHref({
                  source: "data-services-sample-modal",
                  notes: `Request this sample: ${activeSample.title}`,
                })}
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Request this sample
              </Link>
              <a href="#packages" className={`${styles.btn} ${styles.btnGhost}`}>
                See packages
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
