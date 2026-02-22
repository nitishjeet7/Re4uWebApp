"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

const QUESTIONS = [
  {
    tag: "Abstract",
    text: "Does the abstract reflect the actual results without overpromising?",
    tip: "Reviewers lose trust when conclusions claim more than the data supports.",
  },
  {
    tag: "Consistency",
    text: "Are tense and voice steady within each section (no sudden shifts)?",
    tip: "Keep a steady tone so the reviewer can follow the narrative without confusion.",
  },
  {
    tag: "Clarity",
    text: "Does each paragraph carry one clear point and a strong topic sentence?",
    tip: "Reviewers skim—clear topic sentences let them follow the logic.",
  },
  {
    tag: "Flow",
    text: "Do transitions explain why each idea matters instead of just what happens next?",
    tip: "Add a signpost (e.g., 'Therefore', 'However') around shifts.",
  },
  {
    tag: "Terms",
    text: "Are key terms and abbreviations used consistently across the manuscript?",
    tip: "Define abbreviations once and use the same label everywhere.",
  },
  {
    tag: "Formatting",
    text: "Are figure/table callouts aligned, numbered correctly, and captioned?",
    tip: "Double-check every Fig./Table reference against your captions.",
  },
  {
    tag: "Evidence",
    text: "Are claims supported by data without overstating the contribution?",
    tip: "Keep conclusions proportional to results and avoid speculative verbs.",
  },
  {
    tag: "Conclusion",
    text: "Is the conclusion specific with a clear takeaway (not just 'more research')?",
    tip: "Close with a takeaway + implication—'more research' can be a second sentence.",
  },
];

const WEIGHTS = [2, 1, 1, 2, 1, 1, 2, 2];
const HIGH_IMPACT = [0, 3, 6, 7]; // abstract, flow, evidence, conclusion

const PLAN_STATES = {
  standard: {
    title: "Standard English Editing",
    desc: "Final polish for grammar, academic tone, and consistency when the story is already clear.",
    pills: ["Grammar + tone", "Consistency pass", "Proofreading"],
  },
  advanced: {
    title: "Advanced Editing (Clarity + Flow)",
    desc: "Improve clarity, transitions, and coherence while preserving meaning.",
    pills: ["Clarity rewrites", "Flow + transitions", "Wordiness reduction + QA"],
  },
  scientific: {
    title: "Scientific/Substantive Editing (Structure + Logic)",
    desc: "High-stakes support: restructure arguments, tighten logic, and deliver senior-editor guidance.",
    pills: ["Structure/argument suggestions", "Substantive clarity + flow", "Copyedit + proofread + QA"],
  },
};

export function EditingSelfCheck() {
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(QUESTIONS.length).fill(null));

  const answeredCount = answers.filter((value) => value !== null).length;

  const riskPercent = useMemo(() => {
    let noScore = 0;
    let maxScore = 0;
    for (let i = 0; i < answers.length; i += 1) {
      if (answers[i] === null) continue;
      maxScore += WEIGHTS[i];
      if (answers[i] === false) noScore += WEIGHTS[i];
    }
    if (!maxScore) return 0;
    return Math.round((noScore / maxScore) * 100);
  }, [answers]);

  const riskLabel = useMemo(() => {
    if (riskPercent >= 55) return "High";
    if (riskPercent >= 28) return "Medium";
    if (riskPercent > 0) return "Low";
    return "—";
  }, [riskPercent]);

  const planState = useMemo(() => {
    const noHighImpact = HIGH_IMPACT.reduce(
      (count, idx) => count + (answers[idx] === false ? 1 : 0),
      0,
    );

    if (riskPercent >= 55 || noHighImpact >= 2) return PLAN_STATES.scientific;
    if ((riskPercent >= 28 || noHighImpact === 1) && answeredCount >= 4) return PLAN_STATES.advanced;
    if (riskPercent < 28 && answeredCount >= 6 && noHighImpact === 0) return PLAN_STATES.standard;
    return PLAN_STATES.advanced;
  }, [riskPercent, answeredCount, answers]);

  const handleAnswer = (index: number, value: boolean) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const riskNote = answeredCount
    ? `Based on ${answeredCount}/8 answers`
    : "Answer the checks to see your result.";

  return (
    <section className={styles.section} id="self-check">
      <div className={styles.container}>
        <div className={styles.selfCheckCard}>
          <span className={styles.selfCheckPill}>
            <span className={styles.selfCheckDot} aria-hidden="true" />
            60-second self-check
          </span>
          <h2 className={styles.sectionTitle}>
            Before you submit: eight yes/no checks
          </h2>
          <p className={styles.sectionSub}>
            Answer honestly. We recommend the best-fit plan (Standard, Advanced, Scientific/Substantive).
          </p>

          <div className={styles.selfCheckLayout}>
            <article className={styles.selfCheckPanel} aria-label="Question checklist">
              <header className={styles.selfCheckHeader}>
                <div>
                  <strong>8 checks</strong>
                  <div className={styles.selfCheckSmall}>Clear, calm guidance—not guilt.</div>
                </div>
                <span className={styles.selfCheckPill}>
                  <span className={styles.selfCheckDot} aria-hidden="true" />
                  {answeredCount}/8 answered
                </span>
              </header>
              <div className={styles.selfCheckList}>
                {QUESTIONS.map((question, index) => (
                  <div className={styles.selfCheckRow} key={question.tag}>
                    <div className={styles.selfCheckText}>
                      <div className={styles.selfCheckTag}>{question.tag}</div>
                      <div className={styles.selfCheckTitle}>{question.text}</div>
                      <p className={styles.selfCheckTip}>{question.tip}</p>
                    </div>
                    <div className={styles.selfCheckToggle}>
                      <div className={styles.selfCheckSegment} role="group" aria-label="Answer">
                        <button
                          type="button"
                          className={
                            answers[index] === true
                              ? styles.selfCheckSegmentActive
                              : undefined
                          }
                          onClick={() => handleAnswer(index, true)}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          className={
                            answers[index] === false
                              ? styles.selfCheckSegmentActive
                              : undefined
                          }
                          onClick={() => handleAnswer(index, false)}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.selfCheckPanel} aria-label="Recommendation">
              <header className={styles.selfCheckHeader}>
                <div>
                  <strong>Your recommendation</strong>
                  <div className={styles.selfCheckSmall}>Powered by your answers</div>
                </div>
                <span className={styles.selfCheckBadge}>
                  <span className={styles.selfCheckDot} aria-hidden="true" />
                  Risk: {riskLabel}
                </span>
              </header>

              <div className={styles.selfCheckRisk}>
                <div>
                  <div className={styles.selfCheckSmall}><strong>Submission risk meter</strong></div>
                  <div className={styles.selfCheckMeter}>
                    <div
                      className={styles.selfCheckFill}
                      style={{ width: `${riskPercent}%` }}
                    />
                  </div>
                  <div className={styles.selfCheckSmall}>{riskNote}</div>
                </div>

                <div className={styles.selfCheckResultCard}>
                  <div className={styles.selfCheckResultTitle}>{planState.title}</div>
                  <div className={styles.selfCheckResultDesc}>{planState.desc}</div>
                  <div className={styles.selfCheckRecPills}>
                    {planState.pills.map((pill) => (
                      <span key={pill} className={styles.pill}>
                        <span className={styles.pillDot} aria-hidden="true" />
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.selfCheckCta}>
                  <div className={styles.selfCheckSmall}>
                    Want a full manuscript review? Upload your file for a quote in 1-2 hours.
                  </div>
                  <button type="button" className={`${styles.btn} ${styles.btnPrimary}`}>
                    Upload your file
                  </button>
                </div>

                <div className={styles.selfCheckDisclaimer}>
                  <strong>Disclaimer:</strong> This is a representative recommendation. For discipline-aware, meaning-safe editing, upload your manuscript.
                </div>

                <div className={styles.selfCheckKw}>
                  It is like having a <strong>research paper editor online</strong>—but with human judgment.
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
