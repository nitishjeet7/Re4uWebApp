"use client";

import { useState } from "react";
import styles from "./AboutPrinciplesSection.module.css";

type PrincipleKey = "clarity" | "integrity" | "humans" | "equity";

type Principle = {
  key: PrincipleKey;
  label: string;
  summary: string;
  bullets: string[];
  rule: string;
};

const PRINCIPLES: Principle[] = [
  {
    key: "clarity",
    label: "Clarity",
    summary: "make the meaning obvious before making it impressive.",
    bullets: [
      "Improve structure, logic, and readability so ideas travel cleanly — from abstract to conclusion.",
      "If a sentence can be misread, rewrite it for clarity.",
      "If a section can be reordered to improve flow, reorder it.",
    ],
    rule: "Simple rule: if it increases comprehension, we do it.",
  },
  {
    key: "integrity",
    label: "Integrity",
    summary: 'protect credibility, even when “getting it done” is tempting.',
    bullets: [
      "Do not cross ethical lines, even under deadline pressure.",
      "If a request weakens trust in the research record, say no — even if it costs us.",
      "Support legitimate improvement, not manipulation.",
    ],
    rule: "Simple rule: if it weakens trust, we don’t do it.",
  },
  {
    key: "humans",
    label: "Humans",
    summary: "reduce anxiety and confusion, not just fix text.",
    bullets: [
      "Design feedback to be usable: clear, actionable, and not overwhelming.",
      "Explain the “why,” so decisions make sense and repeat next time.",
      "Build capability — you leave stronger, not dependent.",
    ],
    rule: "Simple rule: if it builds confidence + skill, we do it.",
  },
  {
    key: "equity",
    label: "Equity",
    summary: "keep standards consistent across backgrounds and geographies.",
    bullets: [
      "Access should not decide outcomes.",
      "Make expectations explicit and guidance standard-based.",
      "Reduce unfair disadvantage from language, mentorship gaps, or institutional resources.",
    ],
    rule: "Simple rule: if it reduces unfair disadvantage, we do it.",
  },
];

function getDotClass(key: PrincipleKey) {
  if (key === "integrity") return styles.dot_integrity;
  if (key === "humans") return styles.dot_humans;
  if (key === "equity") return styles.dot_equity;
  return "";
}

export function AboutPrinciplesSection() {
  const [openKeys, setOpenKeys] = useState<Record<PrincipleKey, boolean>>({
    clarity: true,
    integrity: false,
    humans: false,
    equity: false,
  });

  return (
    <section className={styles.section} aria-label="Our principles">
      <header className={styles.pageHead}>
        <h2 className={styles.title}>Our principles</h2>
        <p className={styles.sub}>
          Click a principle to read how we operate — not as slogans, but as rules. These keep quality consistent
          across every service and every client.
        </p>
      </header>

      <div className={styles.shell} aria-label="Our principles section">
        <div className={styles.sectionHeader}>
          <div className={styles.kicker}>
            <span className={styles.dot} aria-hidden="true" /> Our principles
          </div>

          <div className={styles.leadCard}>
            <h3>What we will not compromise</h3>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.grid} aria-label="Principle cards">
            {PRINCIPLES.map((principle) => {
              const isOpen = openKeys[principle.key];
              const dotClass = getDotClass(principle.key);
              return (
                <article key={principle.key} className={`${styles.card} ${styles.pCard}`}>
                  <div className={styles.pHead}>
                    <div className={styles.pTitle}>
                      <span className={`${styles.dot} ${dotClass}`} aria-hidden="true" />
                      {principle.label}
                    </div>
                  </div>

                  <p className={styles.pSummary}>
                    <b>Default:</b> {principle.summary}
                  </p>

                  <div className={styles.acc}>
                    <button
                      type="button"
                      className={styles.accBtn}
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenKeys((prev) => ({ ...prev, [principle.key]: !prev[principle.key] }))
                      }
                    >
                      <span>Read principle</span>
                      <span className={styles.chev} aria-hidden="true">
                        {isOpen ? "▾" : "▸"}
                      </span>
                    </button>

                    {isOpen ? (
                      <div className={styles.panelAcc}>
                        <ul>
                          {principle.bullets.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                        <div className={styles.rulePill}>
                          <span className={`${styles.dot} ${dotClass}`} aria-hidden="true" />
                          {principle.rule}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
