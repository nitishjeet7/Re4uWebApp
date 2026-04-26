"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./AboutHowWeWorkSection.module.css";

type WorkStep = {
  num: number;
  title: string;
  mini: string;
  bullets: string[];
  ethics: string;
  chips: string[];
};

const STEPS: WorkStep[] = [
  {
    num: 1,
    title: "Understand intent",
    mini: "Purpose · context · audience",
    bullets: [
      "Clarify what the paper is trying to prove and for whom.",
      "Confirm journal-style expectations (section logic).",
    ],
    ethics: "We don’t change your research claims — we help you express what you already show.",
    chips: ["Scope clarified", "Target reader defined"],
  },
  {
    num: 2,
    title: "Strengthen structure",
    mini: "Argument · flow · signposting",
    bullets: [
      "Make the logic visible: tighter flow and clearer framing.",
      "Reorder sections/paragraphs where needed for comprehension.",
      "Add signposting so each section answers the reader’s next question.",
    ],
    ethics: "We do not change what your research claims — we help you express what you already show.",
    chips: ["Reader guidance added", "Claim-evidence aligned"],
  },
  {
    num: 3,
    title: "Improve presentation",
    mini: "Readability · tone · clarity",
    bullets: [
      "Refine readability so readers spend time on ideas — not decoding sentences.",
      "Standardize tone to match journal expectations (no hype).",
      "Tighten terminology and remove ambiguity.",
    ],
    ethics: "We do not use hype language or overstatement. Precision is part of integrity.",
    chips: ["Reader guidance added", "Claim-evidence aligned", "Avoidables reduced"],
  },
  {
    num: 4,
    title: "Reduce risk",
    mini: "Avoidables · alignment · consistency",
    bullets: [
      "Eliminate common avoidables that trigger desk rejection.",
      "Check consistency across abstract, figures, and conclusions.",
      "Align with formatting and reporting standards where relevant.",
    ],
    ethics: "We don’t game the system. We meet standards transparently.",
    chips: ["Desk-rejection risk reduced", "Consistency improved"],
  },
  {
    num: 5,
    title: "Return learning",
    mini: "Teach-back · patterns · confidence",
    bullets: [
      "Explain key edits so the improvement is repeatable.",
      "Share patterns to strengthen future drafts.",
      "Leave a clear revision map for the next submission cycle.",
    ],
    ethics: "We build capability — you leave stronger, not dependent.",
    chips: ["Patterns learned", "Confidence increased"],
  },
];

export function AboutHowWeWorkSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className={styles.section} aria-label="How we work">
      <header className={styles.pageHead}>
        <h2 className={styles.title}>How we work (today)</h2>
        <p className={styles.sub}>
          A sequential, transparent workflow that improves clarity and reduces avoidable rejection risk —
          without crossing ethical lines.
        </p>
      </header>

      <div className={styles.shell} aria-label="How we work accordion">
        <div className={styles.content}>
          <div className={styles.accWrap}>
            {STEPS.map((step, index) => {
              const isOpen = activeIndex === index;
              const panelId = `how-we-work-panel-${step.num}`;
              return (
                <div key={step.title} className={styles.acc}>
                  <button
                    type="button"
                    className={styles.accBtn}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setActiveIndex((prev) => (prev === index ? null : index))}
                  >
                    <span className={styles.accLeft}>
                      <span className={styles.stepNum}>{step.num}</span>
                      <span className={styles.accText}>
                        <span className={styles.ttl}>{step.title}</span>
                        <span className={styles.mini}>{step.mini}</span>
                      </span>
                    </span>
                    <span className={styles.chev} aria-hidden="true">
                      {isOpen ? "▾" : "▸"}
                    </span>
                  </button>

                  {isOpen ? (
                    <div id={panelId} className={styles.accPanel}>
                      <div className={styles.grid2}>
                        <div className={styles.box}>
                          <b>What we do</b>
                          <ul className={styles.bullets}>
                            {step.bullets.map((line) => (
                              <li key={line}>{line}</li>
                            ))}
                          </ul>
                        </div>

                        <div className={styles.box}>
                          <b>Ethics signal</b>
                          <p>{step.ethics}</p>
                          <div className={styles.rule}>
                            <b>Why it matters:</b> consistency + credibility under pressure.
                          </div>
                          <div className={styles.chips} aria-label="Step outcomes">
                            {step.chips.map((chip) => (
                              <span key={chip} className={styles.chip}>
                                <span className={styles.miniDot} aria-hidden="true" />
                                {chip}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
