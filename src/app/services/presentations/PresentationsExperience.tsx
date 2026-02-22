"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import {
  ethicalSupportItems,
  ethicalSupportSignals,
  faqs,
  faqFilters,
  finalNeedOptions,
  milestoneServices,
  needToPlan,
  outputChoices,
  outputRecommendations,
  personaOptions,
  plans,
  relatedServices,
  sampleCategories,
  sampleLibrary,
  trustCards,
  workflowSteps,
  type DeadlineKey,
  type FaqFilter,
  type HaveKey,
  type OutputRecommendation,
  type Persona,
  type PresentationNeed,
  type SampleCategory,
  type SampleItem,
  type UseKey,
} from "./content";

type OutputState = {
  deadline: DeadlineKey;
  use: UseKey;
  have: HaveKey;
};

type PresentationsExperienceProps = {
  fontClassName: string;
};

function buildContactHref(params: {
  need?: PresentationNeed;
  deadline?: string;
  plan?: string;
  notes?: string;
}) {
  const query = new URLSearchParams({
    service: "academic-presentation",
    source: "presentations-page",
  });

  if (params.need) query.set("need", params.need);
  if (params.deadline) query.set("deadline", params.deadline);
  if (params.plan) query.set("plan", params.plan);
  if (params.notes) query.set("notes", params.notes);

  return `/contact?${query.toString()}`;
}

function getRecommendationScore(item: OutputRecommendation, state: OutputState) {
  return (
    item.scoreByDeadline[state.deadline] +
    item.scoreByUse[state.use] +
    item.scoreByHave[state.have]
  );
}

function getUrgencyHint(deadline: string) {
  if (!deadline) {
    return {
      tone: "neutral" as const,
      text: "Select a deadline to see urgency guidance.",
    };
  }

  const now = new Date();
  const target = new Date(`${deadline}T00:00:00`);
  const days = Math.ceil((target.getTime() - now.getTime()) / 86400000);

  if (Number.isNaN(days)) {
    return {
      tone: "neutral" as const,
      text: "Enter a valid date to estimate urgency.",
    };
  }
  if (days <= 2) {
    return {
      tone: "critical" as const,
      text: "Tight timeline detected. Share current draft for realistic fast-track scope.",
    };
  }
  if (days <= 7) {
    return {
      tone: "medium" as const,
      text: "This is a rush window. We can prioritize structure and readability first.",
    };
  }
  return {
    tone: "safe" as const,
    text: "Healthy timeline. Full narrative and design polish is feasible.",
  };
}

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function PresentationsExperience({
  fontClassName,
}: PresentationsExperienceProps) {
  const [persona, setPersona] = useState<Persona>("phd");
  const [outputState, setOutputState] = useState<OutputState>({
    deadline: "week",
    use: "viva",
    have: "manuscript",
  });
  const [flippedTrust, setFlippedTrust] = useState<Record<string, boolean>>({});
  const [activeStep, setActiveStep] = useState(0);
  const [sampleCategory, setSampleCategory] = useState<
    SampleCategory | "All Samples"
  >("All Samples");
  const [activeSample, setActiveSample] = useState<SampleItem | null>(null);
  const [need, setNeed] = useState<PresentationNeed>("defence");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");
  const [fileName, setFileName] = useState("");
  const [faqFilter, setFaqFilter] = useState<FaqFilter>("all");
  const [faqSearch, setFaqSearch] = useState("");
  const [copiedFaqId, setCopiedFaqId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const sortedMilestones = useMemo(() => {
    return [...milestoneServices].sort(
      (a, b) => b.scores[persona] - a.scores[persona],
    );
  }, [persona]);
  const activePersonaLabel =
    personaOptions.find((option) => option.id === persona)?.label ??
    "PhD / Viva";

  const rankedRecommendations = useMemo(() => {
    return [...outputRecommendations]
      .map((item) => ({
        ...item,
        totalScore: getRecommendationScore(item, outputState),
      }))
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 3);
  }, [outputState]);
  const topRecommendations = rankedRecommendations.slice(0, 2);
  const selectedDeadlineLabel =
    outputChoices.deadline.find((item) => item.value === outputState.deadline)
      ?.label ?? "Flexible";
  const selectedUseLabel =
    outputChoices.use.find((item) => item.value === outputState.use)?.label ??
    "Conference";
  const selectedHaveLabel =
    outputChoices.have.find((item) => item.value === outputState.have)?.label ??
    "Draft PPT";

  const activeWorkflow = workflowSteps[activeStep] ?? workflowSteps[0];
  const workflowProgress = ((activeStep + 1) / workflowSteps.length) * 100;

  const allSamples = sampleCategories.flatMap(
    (category) => sampleLibrary[category] ?? [],
  );
  const activeSamples =
    sampleCategory === "All Samples"
      ? allSamples
      : sampleLibrary[sampleCategory];

  const urgencyHint = useMemo(() => getUrgencyHint(deadline), [deadline]);

  const quoteHref = useMemo(() => {
    return buildContactHref({
      need,
      deadline,
      plan: needToPlan[need],
      notes,
    });
  }, [deadline, need, notes]);

  const visibleFaqs = useMemo(() => {
    const query = normalizeSearchText(faqSearch);
    const isFilterAll = faqFilter === "all";

    if (query.length === 0) {
      return isFilterAll ? faqs : faqs.filter((faq) => faq.tags.includes(faqFilter));
    }

    const queryTerms = query.split(" ");
    const queryMatches = (faq: (typeof faqs)[number]) => {
      const haystack = normalizeSearchText(
        `${faq.q} ${faq.a} ${faq.tags.join(" ")}`,
      );
      return queryTerms.every((term) => haystack.includes(term));
    };

    const searchMatches = faqs.filter(queryMatches);

    if (isFilterAll) {
      return searchMatches;
    }

    const filteredMatches = searchMatches.filter((faq) =>
      faq.tags.includes(faqFilter),
    );

    return filteredMatches.length > 0 ? filteredMatches : searchMatches;
  }, [faqFilter, faqSearch]);

  const toggleTrustCard = (id: string) => {
    setFlippedTrust((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSampleKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
    sample: SampleItem,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveSample(sample);
    }
  };

  const openFaqFromHash = useCallback(() => {
    if (typeof window === "undefined") return;
    const faqId = window.location.hash.replace("#", "");
    if (!faqId) return;

    setFaqFilter("all");
    setFaqSearch("");

    window.setTimeout(() => {
      const element = document.getElementById(faqId);
      if (element && element instanceof HTMLDetailsElement) {
        element.open = true;
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 40);
  }, []);

  const copyFaqLink = async (faqId: string) => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}${window.location.pathname}#${faqId}`;

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // fallback silently if clipboard API is unavailable
    }

    setCopiedFaqId(faqId);
    window.history.replaceState(null, "", `#${faqId}`);
    window.setTimeout(() => setCopiedFaqId(null), 1400);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashChange = () => {
      openFaqFromHash();
    };

    const initialHashTimer = window.setTimeout(handleHashChange, 0);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.clearTimeout(initialHashTimer);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [openFaqFromHash]);

  useEffect(() => {
    if (!activeSample) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveSample(null);
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

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroCard}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.kicker}>Academic Presentation Support</p>
                <h1 className={`${styles.heroTitle} ${fontClassName}`}>
                  Academic presentations and research posters - plus grant and
                  proposal decks
                </h1>
                <p className={styles.heroSub}>
                  Designed for clarity, credibility, and confidence: thesis
                  defence slides, conference posters, and proposal presentations
                  that persuade.
                </p>

                <div className={styles.heroActions}>
                  <Link
                    href={buildContactHref({})}
                    className={`${styles.btn} ${styles.btnPrimary}`}
                  >
                    Get a Quote
                  </Link>
                  <a href="#samples" className={styles.btn}>
                    View samples
                  </a>
                </div>

                <div className={styles.microRow}>
                  <span className={styles.microTag}>Thesis defence PPT</span>
                  <span className={styles.microTag}>Research posters</span>
                  <span className={styles.microTag}>Grant / proposal decks</span>
                  <span className={styles.microTag}>No ghostwriting</span>
                </div>

                <div className={styles.proofRail}>
                  <article className={styles.proofItem}>
                    <strong>Secure file handling</strong>
                    <span>NDA available</span>
                  </article>
                  <article className={styles.proofItem}>
                    <strong>Print-safe outputs</strong>
                    <span>A0 / A1 / 36x48</span>
                  </article>
                </div>
              </div>

              <aside className={styles.heroVisual} aria-label="Presentation preview">
                <div className={styles.heroImageWrap}>
                  <Image
                    src="/presentation-hero.svg"
                    alt="Preview of academic presentation and poster design outputs"
                    width={560}
                    height={420}
                    className={styles.heroImage}
                    priority
                  />
                </div>
                <div className={styles.heroVisualMeta}>
                  <span className={styles.heroMetric}>
                    <strong>2</strong> revision rounds
                  </span>
                  <span className={styles.heroMetric}>
                    <strong>24h</strong> quote response
                  </span>
                  <span className={styles.heroMetric}>
                    <strong>PDF + PPTX</strong> final delivery
                  </span>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.madeForSection}`} id="made-for">
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
            Made for your next milestone
          </h2>
          <p className={`${styles.sectionSub} ${styles.madeForSub}`}>
            Select what describes you now. We reorder services for that
            context.
          </p>

          <div className={styles.personaBar} role="toolbar" aria-label="Persona selector">
            {personaOptions.map((option) => {
              const isActive = option.id === persona;
              return (
                <button
                  key={option.id}
                  type="button"
                  className={`${styles.personaChip} ${isActive ? styles.personaChipActive : ""}`}
                  aria-pressed={isActive}
                  onClick={() => setPersona(option.id)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <p className={styles.activePersona}>
            Active: {activePersonaLabel}
          </p>
          <p className={styles.recommendationLead}>
            Recommended services for {activePersonaLabel}
          </p>

          <div className={styles.cardGrid}>
            {sortedMilestones.map((service) => (
              <article
                key={`${service.id}-${persona}`}
                className={`${styles.card} ${styles.reorderFade} ${styles.madeForCard}`}
              >
                <p className={styles.cardLabel}>{service.label}</p>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardText}>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="output-picker">
        <div className={styles.container}>
          <div className={styles.outputShell}>
            <div className={styles.outputHeader}>
              <div>
                <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
                  Choose the right output in 10 seconds
                </h2>
                <p className={`${styles.sectionSub} ${styles.outputSubSingleLine}`}>Answer 3 quick questions. We&apos;ll recommend the best deliverable for your deadline, your use-case, and the file format you need (PPT, template, print-ready <br />PDF, examples).</p>
              </div>
              <span className={styles.outputHeaderBadge}>
                Smart recommendations
              </span>
            </div>

            <div className={styles.outputQuestionGrid}>
              <section className={styles.outputQuestionCard}>
                <h3>1) What&apos;s your deadline?</h3>
                <p>
                  Helps us decide how much narrative and design polish we can
                  include.
                </p>
                <div className={styles.outputOptionRow}>
                  {outputChoices.deadline.map((item) => {
                    const isActive = outputState.deadline === item.value;
                    return (
                      <button
                        key={item.value}
                        type="button"
                        className={`${styles.outputOptionChip} ${isActive ? styles.outputOptionChipActive : ""}`}
                        aria-pressed={isActive}
                        onClick={() =>
                          setOutputState((prev) => ({
                            ...prev,
                            deadline: item.value,
                          }))
                        }
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className={styles.outputQuestionCard}>
                <h3>2) Where will it be used?</h3>
                <p>Different audiences need different story density.</p>
                <div className={styles.outputOptionRow}>
                  {outputChoices.use.map((item) => {
                    const isActive = outputState.use === item.value;
                    return (
                      <button
                        key={item.value}
                        type="button"
                        className={`${styles.outputOptionChip} ${isActive ? styles.outputOptionChipActive : ""}`}
                        aria-pressed={isActive}
                        onClick={() =>
                          setOutputState((prev) => ({
                            ...prev,
                            use: item.value,
                          }))
                        }
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className={styles.outputQuestionCard}>
                <h3>3) What do you have right now?</h3>
                <p>We&apos;ll adapt the workflow based on your starting point.</p>
                <div className={styles.outputOptionRow}>
                  {outputChoices.have.map((item) => {
                    const isActive = outputState.have === item.value;
                    return (
                      <button
                        key={item.value}
                        type="button"
                        className={`${styles.outputOptionChip} ${isActive ? styles.outputOptionChipActive : ""}`}
                        aria-pressed={isActive}
                        onClick={() =>
                          setOutputState((prev) => ({
                            ...prev,
                            have: item.value,
                          }))
                        }
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            <div className={styles.outputResultShell}>
              <div className={styles.outputResultHead}>
                <div>
                  <h3 className={styles.outputResultTitle}>
                    Your best match (recommended)
                  </h3>
                  <p className={styles.outputResultSub}>
                    Based on: {selectedDeadlineLabel.toLowerCase()} ·{" "}
                    {selectedUseLabel.toLowerCase()} · {selectedHaveLabel}
                  </p>
                </div>
                <div className={styles.outputActions}>
                  <Link
                    href={buildContactHref({})}
                    className={`${styles.btn} ${styles.btnPrimary} ${styles.outputActionBtn}`}
                  >
                    Get a quote
                  </Link>
                  <a
                    href="#samples"
                    className={`${styles.btn} ${styles.outputActionBtn}`}
                  >
                    See examples
                  </a>
                </div>
              </div>

              <div className={styles.outputRecommendationGrid}>
                {topRecommendations.map((item) => (
                  <article key={item.id} className={styles.outputRecommendationCard}>
                    <div className={styles.outputRecommendationTop}>
                      <h4>{item.name}</h4>
                      <span className={styles.outputFormatPill}>{item.format}</span>
                    </div>
                    <p className={styles.outputRecommendationText}>{item.outcome}</p>
                    <div className={styles.outputTagRow}>
                      {item.tags.map((tag) => (
                        <span key={`${item.id}-${tag}`} className={styles.outputTag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className={styles.outputRecommendationFoot}>
                      <a href={item.sampleAnchor} className={styles.outputSeeSample}>
                        See sample
                      </a>
                      <span>Format: {item.format} · editable</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="trust">
        <div className={styles.container}>
          <div className={styles.trustShell}>
            <div className={styles.trustHeader}>
              <div>
                <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
                  Why researchers trust RE4U
                </h2>
                <p className={styles.sectionSub}>
                  Front: title + 3 highlights + golden reviews + CTA. Flip: what
                  you get.
                </p>
              </div>
              <span className={styles.trustHeaderBadge}>6-grid flip cards</span>
            </div>

            <div className={styles.trustGrid}>
              {trustCards.map((card) => {
                const isFlipped = Boolean(flippedTrust[card.id]);
                return (
                  <div key={card.id} className={styles.trustCardWrap}>
                    <button
                    type="button"
                    className={`${styles.trustCard} ${isFlipped ? styles.trustCardFlipped : ""}`}
                    onClick={() => toggleTrustCard(card.id)}
                    aria-pressed={isFlipped}
                    aria-label={`${card.title} details`}
                  >
                      <span className={styles.trustFace}>
                        <span className={styles.trustTopRow}>
                          <span className={styles.trustIcon} aria-hidden="true">
                            {card.icon}
                          </span>
                          <span className={styles.trustTitle}>{card.title}</span>
                          <span className={styles.trustFlipPill}>Flip</span>
                        </span>

                        <span className={styles.trustPills}>
                          {card.chips.map((item) => (
                            <span key={`${card.id}-chip-${item}`} className={styles.trustPill}>
                              {item}
                            </span>
                          ))}
                        </span>

                        <span className={styles.trustScoreRow}>
                          <span className={styles.trustStars} aria-hidden="true">
                            {"\u2605\u2605\u2605\u2605\u2605"}
                          </span>
                          <span className={styles.trustScore}>{card.rating.toFixed(1)}</span>
                          <span className={styles.trustReviews}>{card.reviews} reviews</span>
                          <span className={styles.trustCta}>See details</span>
                        </span>

                        <span className={styles.trustHint}>
                          Tap to flip and see exactly what you get.
                        </span>
                      </span>

                      <span className={styles.trustBack}>
                        <span className={styles.trustTopRow}>
                          <span className={styles.trustTitle}>What you get</span>
                          <span className={styles.trustFlipPill}>Back</span>
                        </span>
                        <span className={styles.trustBackList}>
                          {card.backPoints.map((item) => (
                            <span key={`${card.id}-back-${item}`} className={styles.trustBackItem}>
                              {item}
                            </span>
                          ))}
                        </span>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            <p className={styles.trustUpdate}>
              Update <span>REVIEW DATA</span> with real review counts before
              publishing.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section} id="how-it-works">
        <div className={styles.container}>
          <div className={`${styles.glass} ${styles.workflowGlass}`}>
            <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
              How It Works (and What We Need From You)
            </h2>
            <p className={`${styles.sectionSub} ${styles.workflowSub}`}>
              Click a step to view delivery flow and required inputs.
            </p>

            <div className={styles.workflowShell}>
              <div className={styles.workflowNodes} role="tablist" aria-label="Workflow steps">
                {workflowSteps.map((step, index) => {
                  const isActive = index === activeStep;
                  return (
                    <button
                      key={step.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`${styles.workflowNode} ${isActive ? styles.workflowNodeActive : ""}`}
                      onClick={() => setActiveStep(index)}
                    >
                      <span className={styles.workflowNodeIndex}>{step.id}</span>
                      <strong className={styles.workflowNodeLabel}>{step.short}</strong>
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
              <h3 className={`${styles.cardTitle} ${styles.workflowActiveTitle}`}>{activeWorkflow.title}</h3>
              <div className={styles.workflowDetailGrid}>
                <article className={`${styles.workflowListCard} ${styles.workflowDetailCard}`}>
                  <h4 className={styles.listTitle}>What happens</h4>
                  <ul className={styles.list}>
                    {activeWorkflow.happens.map((item) => (
                      <li key={`${activeWorkflow.id}-h-${item}`}>{item}</li>
                    ))}
                  </ul>
                </article>
                <article className={`${styles.workflowListCard} ${styles.workflowDetailCard}`}>
                  <h4 className={styles.listTitle}>What we need</h4>
                  <ul className={styles.list}>
                    {activeWorkflow.need.map((item) => (
                      <li key={`${activeWorkflow.id}-n-${item}`}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.planSection}`} id="plans">
        <div className={styles.container}>
          <div className={styles.planShell}>
            <div className={styles.planHeader}>
              <div>
                <h2 className={`${styles.sectionTitle} ${fontClassName}`}>Choose your plan</h2>
                <p className={`${styles.sectionSub} ${styles.planSub}`}>
                  Pick a plan based on what you need right now - submission,
                  defence, or conference.
                </p>
              </div>
              <span className={styles.planPricingBadge}>
                US-ready pricing - 2 revision rounds
              </span>
            </div>

            <div className={styles.planGrid}>
              {plans.map((plan) => (
                <article
                  key={plan.id}
                  className={`${styles.planCard} ${styles.planCardEnhanced} ${plan.featured ? styles.featured : ""}`}
                >
                  <div className={styles.planCardTop}>
                    <span className={styles.planIcon} aria-hidden="true">
                      {plan.icon}
                    </span>
                    {plan.badge ? <span className={styles.planBadge}>{plan.badge}</span> : null}
                  </div>

                  <h3 className={styles.planTitle}>{plan.name}</h3>
                  <p className={styles.planPrice}>
                    {plan.price} <span>{plan.priceMeta}</span>
                  </p>
                  <p className={styles.planWho}>
                    <strong>Who this is for:</strong> {plan.whoFor}
                  </p>

                  <ul className={styles.planList}>
                    {plan.points.map((point) => (
                      <li key={`${plan.id}-${point}`}>{point}</li>
                    ))}
                  </ul>

                  <p className={styles.planEta}>
                    <strong>{plan.etaLabel}:</strong> {plan.eta}
                  </p>

                  <Link
                    href={buildContactHref({
                      need,
                      plan: plan.id,
                      deadline,
                    })}
                    className={`${styles.btn} ${styles.btnPrimary} ${styles.planCta}`}
                  >
                    Get started
                  </Link>
                </article>
              ))}
            </div>

            <div className={styles.planBottomRow}>
              <p className={styles.planRating}>
                <span aria-hidden="true">{"\u2605\u2605\u2605\u2605\u2605"}</span> 4.4/5 average rating - based
                on client feedback
              </p>
              <Link href="/contact" className={styles.planExpertLink}>
                Not sure? Talk to an expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="ethical-support">
        <div className={styles.container}>
          <div className={styles.ethicalShell}>
            <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
              Ethical and confidential support
            </h2>
            <p className={styles.sectionSub}>
              Simple, visible trust signals - so clients know exactly how we
              work.
            </p>

            <div className={styles.ethicalGrid}>
              {ethicalSupportItems.map((item) => (
                <article key={item.id} className={styles.ethicalCard}>
                  <span className={styles.ethicalIcon} aria-hidden="true">
                    {item.icon}
                  </span>
                  <div className={styles.ethicalCopy}>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.ethicalSignals}>
              {ethicalSupportSignals.map((signal) => (
                <span key={signal} className={styles.ethicalSignal}>
                  {signal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="samples">
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} ${fontClassName}`}>Samples</h2>
          <p className={styles.sectionSub}>
            Browse examples by outcome. Open any sample to preview what changed.
          </p>

          <div className={styles.samplesToolbar}>
            <div className={styles.sampleTabs} role="tablist" aria-label="Sample categories">
              {(["All Samples", ...sampleCategories] as const).map((category) => {
                const isActive = category === sampleCategory;
                const count =
                  category === "All Samples"
                    ? allSamples.length
                    : sampleLibrary[category].length;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`${styles.sampleTab} ${isActive ? styles.sampleTabActive : ""}`}
                    onClick={() => {
                      setSampleCategory(category);
                    }}
                  >
                    {category}
                    <span>{count}</span>
                  </button>
                );
              })}
            </div>

            <p className={styles.sampleCountMeta}>
              Showing {activeSamples.length} sample
              {activeSamples.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className={styles.sampleGrid}>
            {activeSamples.map((sample) => (
              <article
                key={sample.id}
                className={styles.sampleCard}
                tabIndex={0}
                role="button"
                aria-label={`Open ${sample.title}`}
                onClick={() => setActiveSample(sample)}
                onKeyDown={(event) => handleSampleKeyDown(event, sample)}
              >
                <h3>{sample.title}</h3>
                <p className={styles.sampleMeta}>
                  {sample.field} | {sample.style}
                </p>
                <p className={styles.sampleMeta}>
                  {sample.deliverable} | {sample.format}
                </p>
                <p className={styles.recommendationMeta}>
                  Turnaround: {sample.turnaround}
                </p>
                <div className={styles.sampleChanges}>
                  {sample.changes.map((change) => (
                    <span key={`${sample.id}-${change}`}>{change}</span>
                  ))}
                </div>
                <button type="button" className={styles.sampleOpenBtn}>
                  Preview sample
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.finalCta} ${styles.finalCtaSection}`} id="final-cta">
        <div className={styles.container}>
          <div className={styles.finalCard}>
            <h2 className={`${styles.finalTitle} ${fontClassName}`}>
              Ready for your defence or conference?
            </h2>
            <p className={`${styles.finalSub} ${styles.finalSubTuned}`}>
              Share your draft and deadline. We recommend the right plan and next steps before work starts.
            </p>

            <div className={styles.needChips}>
              {finalNeedOptions.map((option) => {
                const isActive = option.id === need;
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`${styles.needChip} ${isActive ? styles.needChipActive : ""}`}
                    aria-pressed={isActive}
                    onClick={() => setNeed(option.id)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className={styles.finalFormGrid}>
              <label className={styles.formField}>
                <span>Deadline</span>
                <input
                  type="date"
                  className={styles.input}
                  value={deadline}
                  onChange={(event) => setDeadline(event.target.value)}
                />
              </label>

              <label className={styles.formField}>
                <span>Notes</span>
                <textarea
                  className={styles.textarea}
                  rows={3}
                  placeholder="Tell us your audience, duration, and what is already ready."
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </label>
            </div>

            <div className={styles.fileRow}>
              <input
                ref={fileInputRef}
                type="file"
                className={styles.fileInputHidden}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setFileName(file ? file.name : "");
                }}
              />
              <button
                type="button"
                className={styles.fileBtn}
                onClick={() => fileInputRef.current?.click()}
              >
                Choose file
              </button>
              <button
                type="button"
                className={styles.subtleBtn}
                onClick={() => setFileName("Will attach later")}
              >
                Attach later
              </button>
              <span className={styles.recommendationMeta}>
                {fileName || "PPTX / PDF / DOCX (optional for initial quote)"}
              </span>
            </div>

            <p
              className={`${styles.urgencyHint} ${
                urgencyHint.tone === "critical"
                  ? styles.urgencyCritical
                  : urgencyHint.tone === "medium"
                    ? styles.urgencyMedium
                    : styles.urgencySafe
              }`}
            >
              {urgencyHint.text}
            </p>

            <div className={`${styles.heroActions} ${styles.finalActions}`}>
              <Link href={quoteHref} className={`${styles.btn} ${styles.btnPrimary}`}>
                Get a quote
              </Link>
              <Link
                href={buildContactHref({
                  need,
                  deadline,
                  plan: needToPlan[need],
                })}
                className={styles.btn}
              >
                Start with this plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="related-services">
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} ${fontClassName}`}>
            Related services
          </h2>
          <p className={styles.sectionSub}>
            Quick links to adjacent support services for end-to-end delivery.
          </p>
          <div className={styles.relatedGrid}>
            {relatedServices.map((service) => (
              <article key={service.name} className={styles.relatedCard}>
                <h3>{service.name}</h3>
                <p>{service.text}</p>
                <Link href={service.href} className={styles.relatedLink}>
                  Explore service
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="faqs">
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} ${fontClassName}`}>FAQs</h2>
          <p className={styles.sectionSub}>
            Fast answers for thesis defence presentations, conference decks, and
            research posters.
          </p>

          <div className={styles.faqTop}>
            <div className={styles.faqFilters}>
              {faqFilters.map((filter) => {
                const isActive = filter.id === faqFilter;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    className={`${styles.faqFilterChip} ${isActive ? styles.faqFilterChipActive : ""}`}
                    aria-pressed={isActive}
                    onClick={() => setFaqFilter(filter.id)}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
            <label className={styles.faqSearchWrap}>
              <span className={styles.srOnly}>Search FAQs</span>
              <input
                className={styles.faqSearch}
                value={faqSearch}
                onChange={(event) => setFaqSearch(event.target.value)}
                placeholder="Search FAQs"
              />
            </label>
            <p className={styles.faqMeta}>
              Showing {visibleFaqs.length} of {faqs.length} FAQs
            </p>
          </div>

          {visibleFaqs.length === 0 ? (
            <div className={styles.noFaq}>No FAQs match this filter/search.</div>
          ) : (
            <div className={styles.faqGrid}>
              {visibleFaqs.map((faq) => (
                <details key={faq.id} id={faq.id} className={styles.faqItem}>
                  <summary className={styles.faqSummary}>{faq.q}</summary>
                  <div className={styles.faqBody}>
                    <p>{faq.a}</p>
                    <button
                      type="button"
                      className={styles.faqCopyBtn}
                      onClick={() => copyFaqLink(faq.id)}
                    >
                      {copiedFaqId === faq.id ? "Link copied" : "Copy link"}
                    </button>
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      </section>

      {activeSample ? (
        <div
          className={styles.modalBackdrop}
          onClick={() => setActiveSample(null)}
          role="presentation"
        >
          <div
            className={styles.modalCard}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sample-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHead}>
              <h3 id="sample-modal-title" className={styles.modalTitle}>
                {activeSample.title}
              </h3>
              <button
                type="button"
                className={styles.modalClose}
                onClick={() => setActiveSample(null)}
                aria-label="Close sample preview"
              >
                Close
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>
                <strong>Deliverable:</strong> {activeSample.deliverable}
              </p>
              <p>
                <strong>Field:</strong> {activeSample.field}
              </p>
              <p>
                <strong>Style:</strong> {activeSample.style}
              </p>
              <p>
                <strong>Format:</strong> {activeSample.format}
              </p>
              <p>
                <strong>Turnaround:</strong> {activeSample.turnaround}
              </p>
              <div className={styles.modalPills}>
                {activeSample.changes.map((item) => (
                  <span key={`${activeSample.id}-${item}`}>{item}</span>
                ))}
              </div>
            </div>
            <div className={styles.modalActions}>
              <Link href={buildContactHref({})} className={`${styles.btn} ${styles.btnPrimary}`}>
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
