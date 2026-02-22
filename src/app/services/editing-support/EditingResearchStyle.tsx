"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type ResearchStyle = {
  title: string;
  focus: string;
  bestFor: string;
  chips: string[];
  issues: { h: string; t: string }[];
  suggestedPlan: string;
};

const RESEARCH_STYLES: Record<string, ResearchStyle> = {
  original: {
    title: "Original research editing (empirical/data-based)",
    focus: "Evidence → claim alignment + clear structure + readable language.",
    bestFor: "Best for: submissions + revisions",
    chips: ["Evidence → claim alignment", "Clear structure", "Readable language", "Track Changes"],
    issues: [
      {
        h: "Typical issue:",
        t: "Findings are strong, but the writing makes the reader work too hard.",
      },
      {
        h: "We focus on:",
        t: "Clarifying what you did, what you found, and what you can legitimately claim―without changing meaning.",
      },
    ],
    suggestedPlan: "Advanced (Clarity + Flow)",
  },
  qual: {
    title: "Qualitative / case study editing",
    focus: "Narrative flow + theme clarity + quotes/claims consistency.",
    bestFor: "Best for: interviews + case studies",
    chips: ["Narrative flow", "Theme clarity", "Quote handling", "One-voice tone"],
    issues: [
      {
        h: "Typical issue:",
        t: "Insights are valuable, but the narrative loses the reader between themes.",
      },
      {
        h: "We focus on:",
        t: "Tightening transitions, sharpening theme statements, and keeping claims consistent with evidence.",
      },
    ],
    suggestedPlan: "Advanced (Clarity + Flow)",
  },
  review: {
    title: "Review / synthesis editing",
    focus: "Synthesis logic + transitions + theme linking (not a list).",
    bestFor: "Best for: literature reviews",
    chips: ["Synthesis logic", "Transitions", "Theme linking", "Redundancy removal"],
    issues: [
      {
        h: "Typical issue:",
        t: "Reads like a list of studies rather than an integrated story.",
      },
      {
        h: "We focus on:",
        t: "Building a clear synthesis arc and strengthening the linking between themes.",
      },
    ],
    suggestedPlan: "Substantive (Structure + Argument)",
  },
  thesis: {
    title: "Thesis / dissertation editing",
    focus: "One-voice consistency across chapters + formatting support.",
    bestFor: "Best for: multi-chapter writing",
    chips: ["Chapter consistency", "Terminology control", "Formatting support", "Reference style check"],
    issues: [
      {
        h: "Typical issue:",
        t: "Different chapters feel like different papers (tone and terms drift).",
      },
      {
        h: "We focus on:",
        t: "Standardizing voice and terminology across chapters, and aligning formatting for submission.",
      },
    ],
    suggestedPlan: "Substantive (Structure + Argument)",
  },
  grant: {
    title: "Grant / proposal / SOP editing",
    focus: "Persuasive clarity + alignment to objectives + crisp writing.",
    bestFor: "Best for: high-stakes deadlines",
    chips: ["Persuasive clarity", "Impact framing", "Logical structure", "Tight language"],
    issues: [
      {
        h: "Typical issue:",
        t: "The idea is strong, but the story doesn’t land fast enough for evaluators.",
      },
      {
        h: "We focus on:",
        t: "Sharpening logic and impact language while keeping claims precise and credible.",
      },
    ],
    suggestedPlan: "Advanced (Clarity + Flow)",
  },
};

const PLANS = [
  {
    key: "Standard English Editing",
    tag: "Final polish",
    line: "Make it clean, correct, and professional.",
    bullets: ["Grammar + academic tone", "Light consistency (terms/tense)", "Proofreading pass"],
    defaults: ["Grammar", "Language", "Consistency of terms"],
  },
  {
    key: "Advanced (Clarity + Flow)",
    tag: "Recommended",
    line: "Improve clarity and flow without changing meaning.",
    bullets: [
      "Clarity rewrites (meaning preserved)",
      "Flow + transitions across paragraphs",
      "Wordiness reduction + second-pass QA",
    ],
    defaults: ["Clarity", "Flow", "Language", "Grammar", "Consistency of terms"],
  },
  {
    key: "Substantive (Structure + Argument)",
    tag: "Highest confidence",
    line: "Strengthen structure, argument, and coherence for high-stakes work.",
    bullets: [
      "Structure/argument suggestions",
      "Deeper clarity + logic polishing",
      "Consistency + second-pass QA",
    ],
    defaults: [
      "Clarity",
      "Flow",
      "Language",
      "Grammar",
      "Consistency of terms",
      "Argument / reasoning clarity",
      "Evidence → claim alignment",
    ],
  },
];

const IMPROVEMENT_OPTIONS = [
  "Clarity",
  "Flow",
  "Language",
  "Grammar",
  "Consistency of terms",
  "Argument / reasoning clarity",
  "Evidence → claim alignment",
  "Formatting (optional)",
];

export function EditingResearchStyle() {
  const [styleKey, setStyleKey] = useState<keyof typeof RESEARCH_STYLES>("original");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(PLANS[1].key);
  const [improvements, setImprovements] = useState<string[]>(PLANS[1].defaults);
  const [formInputs, setFormInputs] = useState({
    name: "",
    mobile: "",
    email: "",
    deadline: "Standard",
    wordCount: "",
    field: "",
  });
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const currentStyle = RESEARCH_STYLES[styleKey];
  const selectPlan = useCallback((planKey: string) => {
    const plan = PLANS.find((item) => item.key === planKey) ?? PLANS[1];
    setSelectedPlan(plan.key);
    setImprovements(plan.defaults);
  }, []);

  useEffect(() => {
    selectPlan(currentStyle.suggestedPlan);
  }, [styleKey, selectPlan, currentStyle.suggestedPlan]);

  const toggleImprovement = (value: string) => {
    setImprovements((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return Array.from(next);
    });
  };

  const resetForm = () => {
    setFormInputs({
      name: "",
      mobile: "",
      email: "",
      deadline: "Standard",
      wordCount: "",
      field: "",
    });
    setConsent(false);
    setError(false);
    setSubmitted(false);
  };

  const openModal = () => {
    selectPlan(currentStyle.suggestedPlan);
    resetForm();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {
    const { name, mobile, email } = formInputs;
    const valid =
      selectedPlan.length > 2 &&
      name.trim().length > 1 &&
      mobile.trim().length > 6 &&
      email.includes("@") &&
      consent &&
      improvements.length >= 1;
    setError(!valid);
    if (!valid) return;
    setSubmitted(true);
  };

  const improvementList = useMemo(
    () =>
      IMPROVEMENT_OPTIONS.map((option) => (
        <label key={option} className={styles.researchStyleCheck}>
          <input
            type="checkbox"
            checked={improvements.includes(option)}
            onChange={() => toggleImprovement(option)}
          />
          {option}
        </label>
      )),
    [improvements],
  );

  const submissionSummary = useMemo(
    () => ({
      plan: selectedPlan,
      improvements: improvements.join(", ") || "None selected",
      deadline: formInputs.deadline,
      field: formInputs.field || "Not specified",
      wordCount: formInputs.wordCount.trim(),
    }),
    [selectedPlan, improvements, formInputs],
  );

  return (
    <section className={styles.section} id="research-style">
      <div className={styles.container}>
        <div className={styles.researchStyleCard}>
          <span className={styles.researchStylePill}>
            <span className={styles.researchStyleDot} aria-hidden="true" />
            All disciplines
          </span>
          <h2 className={`${styles.sectionTitle} ${styles.researchStyleTitle}`}>
            Editing for your research style (any discipline)
          </h2>
          <p className={styles.sectionSub}>
            Whether you write experiments, interviews, policies or theory—we strengthen clarity,
            structure, and argument without changing your meaning.
          </p>

          <div className={styles.researchStyleSelector} aria-label="Research style selector">
            {Object.keys(RESEARCH_STYLES).map((key) => (
              <button
                key={key}
                type="button"
                className={`${styles.researchStyleButton} ${
                  styleKey === key ? styles.researchStyleButtonActive : ""
                }`}
                onClick={() => setStyleKey(key as keyof typeof RESEARCH_STYLES)}
              >
                {RESEARCH_STYLES[key].title.split(" ")[0]}
              </button>
            ))}
          </div>

          <div className={styles.researchStylePanel} aria-label="Dynamic research style details">
            <div className={styles.researchStyleTopRow}>
              <div>
                <div className={styles.researchStylePanelTitle}>{currentStyle.title}</div>
                <p className={styles.researchStyleFocus}>{currentStyle.focus}</p>
              </div>
              <span className={styles.researchStyleBest}>
                <span className={styles.researchStyleDot} aria-hidden="true" />
                {currentStyle.bestFor}
              </span>
            </div>

            <div className={styles.researchStyleChips}>
              {currentStyle.chips.map((chip) => (
                <span key={chip} className={styles.researchStyleChip}>
                  <span className={styles.researchStyleDot} aria-hidden="true" />
                  {chip}
                </span>
              ))}
            </div>

            <div className={styles.researchStyleIssues}>
              {currentStyle.issues.map((issue) => (
                <div key={issue.t} className={styles.researchStyleIssue}>
                  <b>{issue.h}</b> {issue.t}
                </div>
              ))}
            </div>

            <div className={styles.researchStyleCtaRow}>
              <div className={styles.researchStyleSmall}>
                Choose a plan, then submit for a quote. We confirm the best depth after a quick scan—
                so you never overpay or under-edit.
              </div>
              <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={openModal}>
                Get quote
              </button>
            </div>
          </div>

          <div className={styles.researchStyleStrip}>
            <div>
              <div className={styles.researchStyleSmall}>
                <strong>Original research:</strong> clarity of evidence and claims.{" "}
                <strong>Review/synthesis:</strong> clarity of synthesis and transitions.
              </div>
              <div className={styles.researchStyleSmall} style={{ marginTop: 6 }}>
                Covers “research paper vs review paper” without repeating the same block.
              </div>
            </div>
            <span className={styles.researchStyleTag}>
              <span className={styles.researchStyleDot} aria-hidden="true" />
              Designed for all fields
            </span>
          </div>

          <div className={styles.researchStyleTrust}>
            <strong>Works across STEM, social sciences, and humanities.</strong> We improve writing and
            structure—not your facts, data, or viewpoint.
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className={styles.researchStyleOverlay} role="presentation" onClick={closeModal}>
          <div
            className={styles.researchStyleModal}
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.researchStyleModalHeader}>
              <div>
                <span className={styles.researchStylePill}>
                  <span className={styles.researchStyleDot} aria-hidden="true" />
                  Get an exact quote
                </span>
                <p className={styles.researchStyleSmall}>
                  Choose depth, then submit—our editors confirm after a quick scan.
                </p>
              </div>
              <button type="button" className={styles.researchStyleClose} onClick={closeModal}>
                Close
              </button>
            </div>

            {!submitted ? (
              <div className={styles.researchStyleModalBody}>
                <div className={styles.researchStyleModalGrid}>
                  <div className={styles.researchStyleBox}>
                    <div className={styles.researchStyleBoxTitle}>Choose your editing depth</div>
                    <div className={styles.researchStyleBoxSub}>
                      Pick the plan that matches your deadline and stress level.
                    </div>
                    <div className={styles.researchStylePlanGrid}>
                      {PLANS.map((plan) => (
                        <button
                          key={plan.key}
                          type="button"
                          className={`${styles.researchStylePlanCard} ${
                            selectedPlan === plan.key ? styles.researchStylePlanSelected : ""
                          }`}
                          onClick={() => selectPlan(plan.key)}
                        >
                          <div className={styles.researchStylePlanTop}>
                            <div className={styles.researchStylePlanName}>{plan.key}</div>
                            <div className={styles.researchStylePlanTag}>{plan.tag}</div>
                          </div>
                          <div className={styles.researchStylePlanLine}>{plan.line}</div>
                          <ul className={styles.researchStylePlanBul}>
                            {plan.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                          <div className={styles.researchStylePlanHint}>Click to select → pre-fills your quote</div>
                        </button>
                      ))}
                    </div>
                    <div className={styles.researchStyleBoxSub} style={{ marginTop: 10 }}>
                      Selected: <strong>{selectedPlan}</strong>
                    </div>
                  </div>

                  <div className={styles.researchStyleBox}>
                    <div className={styles.researchStyleBoxTitle}>Your details (for the quote)</div>
                    <div className={styles.researchStyleBoxSub}>
                      We’ll revert with pricing + turnaround in <strong>1-2 hours</strong>.
                    </div>

                    <div className={styles.researchStyleFormGrid}>
                      <label className={styles.researchStyleField} htmlFor="docType">
                        <span>Research style</span>
                        <input
                          className={styles.researchStyleInput}
                          id="docType"
                          readOnly
                          value={currentStyle.title}
                        />
                      </label>
                      <label className={styles.researchStyleField} htmlFor="planInput">
                        <span>Selected plan</span>
                        <input
                          className={styles.researchStyleInput}
                          id="planInput"
                          readOnly
                          value={selectedPlan}
                        />
                      </label>

                      <label className={styles.researchStyleField}>
                        <span>Full name</span>
                        <input
                          className={styles.researchStyleInput}
                          value={formInputs.name}
                          onChange={(event) =>
                            setFormInputs((prev) => ({ ...prev, name: event.target.value }))
                          }
                          placeholder="Your name"
                          autoComplete="name"
                        />
                      </label>
                      <label className={styles.researchStyleField}>
                        <span>Mobile</span>
                        <input
                          className={styles.researchStyleInput}
                          value={formInputs.mobile}
                          onChange={(event) =>
                            setFormInputs((prev) => ({ ...prev, mobile: event.target.value }))
                          }
                          placeholder="+91 XXXXX XXXXX"
                          autoComplete="tel"
                        />
                      </label>
                      <label className={styles.researchStyleField}>
                        <span>Email</span>
                        <input
                          className={styles.researchStyleInput}
                          value={formInputs.email}
                          onChange={(event) =>
                            setFormInputs((prev) => ({ ...prev, email: event.target.value }))
                          }
                          placeholder="you@example.com"
                          autoComplete="email"
                        />
                      </label>
                      <label className={styles.researchStyleField}>
                        <span>Upload file (optional)</span>
                        <input
                          className={styles.researchStyleInput}
                          type="file"
                          onChange={() => {}}
                        />
                      </label>
                      <label className={styles.researchStyleField}>
                        <span>Word count (if no file)</span>
                        <input
                          className={styles.researchStyleInput}
                          value={formInputs.wordCount}
                          onChange={(event) =>
                            setFormInputs((prev) => ({ ...prev, wordCount: event.target.value }))
                          }
                          placeholder="e.g., 3,500"
                        />
                      </label>
                      <label className={styles.researchStyleField}>
                        <span>Deadline</span>
                        <select
                          className={styles.researchStyleInput}
                          value={formInputs.deadline}
                          onChange={(event) =>
                            setFormInputs((prev) => ({ ...prev, deadline: event.target.value }))
                          }
                        >
                          <option value="Standard">Standard</option>
                          <option value="Rush (48 hrs)">Rush (48 hrs)</option>
                          <option value="Urgent (24-72 hrs)">Urgent (24-72 hrs)</option>
                        </select>
                      </label>
                      <label className={styles.researchStyleField}>
                        <span>Field (optional)</span>
                        <select
                          className={styles.researchStyleInput}
                          value={formInputs.field}
                          onChange={(event) =>
                            setFormInputs((prev) => ({ ...prev, field: event.target.value }))
                          }
                        >
                          <option value="">Select (optional)</option>
                          <option>Life sciences / Medicine</option>
                          <option>Engineering / Technology</option>
                          <option>Social sciences</option>
                          <option>Humanities</option>
                          <option>Business / Management</option>
                          <option>Education</option>
                          <option>Law / Policy</option>
                          <option>Other</option>
                        </select>
                      </label>
                    </div>

                    <div className={styles.researchStyleChecks}>
                      <div className={styles.researchStyleBoxSub}>What should we improve?</div>
                      <div className={styles.researchStyleChecksGrid}>{improvementList}</div>
                    </div>

                    <div className={styles.researchStylePrivacy}>
                      <strong>How your data is secured:</strong> used only for your quote and service
                      delivery • restricted access • not shared.
                    </div>

                    <label className={styles.researchStyleConsent}>
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(event) => setConsent(event.target.checked)}
                      />
                      <span>
                        <strong>I consent to be contacted for a quote.</strong>
                        <span>Consent is required to submit.</span>
                      </span>
                    </label>

                    {error && (
                      <div className={styles.researchStyleError}>
                        Please choose a plan, fill name/mobile/email, select at least one improvement,
                        and give consent.
                      </div>
                    )}

                    <div className={styles.researchStyleModalActions}>
                      <button
                        type="button"
                        className={`${styles.btn} ${styles.btnPrimary}`}
                        onClick={handleSubmit}
                      >
                        Submit for quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.researchStyleModalBody}>
                <div className={styles.researchStyleBox}>
                  <span className={styles.researchStylePill}>
                    <span className={styles.researchStyleDot} aria-hidden="true" />
                    Submitted
                  </span>
                  <div className={styles.researchStyleModalThanks}>Thanks — we’ve got it.</div>
                  <p className={styles.researchStyleModalSub}>
                    We’ll revert with a <strong>quote within 1-2 hours</strong>.
                  </p>
                  <div className={styles.researchStyleBoxSub} style={{ marginTop: 10 }}>
                    <strong>Research style:</strong> {currentStyle.title}
                    <br />
                    <strong>Plan:</strong> {submissionSummary.plan}
                    <br />
                    <strong>Requested:</strong> {submissionSummary.improvements}
                    <br />
                    <strong>Deadline:</strong> {submissionSummary.deadline}
                    {submissionSummary.wordCount && (
                      <>
                        <br />
                        <strong>Word count:</strong> {submissionSummary.wordCount}
                      </>
                    )}
                    <br />
                    <strong>Field:</strong> {submissionSummary.field}
                  </div>
                  <div className={styles.researchStyleBoxSub} style={{ marginTop: 10 }}>
                    You’ll receive: <strong>Track Changes</strong> + <strong>clean copy</strong> + brief editor notes.
                  </div>
                  <div className={styles.researchStyleModalActions}>
                    <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={closeModal}>
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
