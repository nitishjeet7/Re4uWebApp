"use client";

import { useMemo, useState } from "react";
import styles from "./AboutWhyWeExistSection.module.css";

type PeakInfo = {
  title: string;
  body: string;
  looks: string;
  costs: string;
  weDo: string;
};

type Peak = {
  label: string;
  color: "sky" | "green";
  info: PeakInfo;
};

const PEAKS: Peak[] = [
  {
    label: "Hidden expectations",
    color: "sky",
    info: {
      title: "Hidden expectations",
      body:
        "Rules are often implicit. Good work can be dismissed because expectations were never made visible or teachable.",
      looks: 'unclear structure, mismatched framing, "why does this matter?"',
      costs: "time, confidence, and avoidable rework",
      weDo: "make expectations visible with templates and teach-back",
    },
  },
  {
    label: "Uneven mentoring",
    color: "sky",
    info: {
      title: "Uneven mentoring",
      body:
        "Guidance depends on access to supervisors and networks. The same work receives different outcomes based on who helps shape it.",
      looks: "inconsistent feedback, unclear priorities, last-minute rewrites",
      costs: "slow learning and dependence on gatekeepers",
      weDo: "structure feedback so it transfers across future projects",
    },
  },
  {
    label: "Language disadvantage",
    color: "sky",
    info: {
      title: "Language disadvantage",
      body:
        "Clarity becomes gatekeeping when language support is unequal - even when the underlying thinking is strong.",
      looks: "strong ideas hidden by phrasing and reader friction",
      costs: "misunderstanding, lower confidence, reduced reach",
      weDo: "optimize clarity without changing your research claims",
    },
  },
  {
    label: "Fragmented guidance",
    color: "sky",
    info: {
      title: "Fragmented guidance",
      body:
        "Feedback is piecemeal and inconsistent. Researchers fix symptoms, but rarely gain transferable skill.",
      looks: "patchy edits, conflicting advice, no teach-back",
      costs: "repeat mistakes and slow progress",
      weDo: "build a repeatable approach: structure to clarity to teach-back",
    },
  },
  {
    label: "Speed over standards",
    color: "green",
    info: {
      title: "Speed over standards",
      body:
        "Time pressure rewards fast output. Careful communication is penalized, and low-integrity shortcuts look tempting.",
      looks: "rushed submissions and unclear claims",
      costs: "higher risk and lower trust",
      weDo: "keep boundaries explicit and protect integrity under pressure",
    },
  },
];

function toMini(body: string) {
  const cleaned = body.trim().replace(/\s+/g, " ");
  const stop = cleaned.indexOf(".");
  if (stop >= 0 && stop < 110) return `${cleaned.slice(0, stop + 1)}`;
  if (cleaned.length <= 110) return cleaned;
  return `${cleaned.slice(0, 108)}…`;
}

export function AboutWhyWeExistSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeInfo = useMemo(() => PEAKS[activeIndex].info, [activeIndex]);

  return (
    <section className={styles.section} aria-label="Why we exist">
      <header className={styles.pageHead}>
        <h2 className={styles.title}>Why we exist</h2>
        <p className={styles.sub}>
          The research world runs on ideas — but it moves on communication. Across disciplines, researchers
          face barriers that have nothing to do with the quality of their work:{" "}
          <strong>unclear expectations</strong>, <strong>uneven mentoring</strong>,{" "}
          <strong>language disadvantage</strong>, <strong>fragmented guidance</strong>, and a system that
          often rewards <strong>speed over standards</strong>.
        </p>
      </header>

      <div className={styles.hero} aria-label="Why we exist timeline section">
        <div className={styles.heroInner}>
          <div className={styles.statement}>
            <strong>When communication becomes a privilege, knowledge becomes unequal.</strong>
            <div>We exist to change that — by building capability, not dependence.</div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.timelineShell}>
            <div className={styles.steps} aria-label="Barrier steps">
              <div className={styles.stepsHeader}>
                <h3 className={styles.stepsTitle}>Barriers (tap to explore)</h3>
                <div className={styles.hint}>Tap a step · details update</div>
              </div>

              <div className={styles.stepsList} role="list">
                {PEAKS.map((peak, index) => {
                  const isActive = index === activeIndex;
                  const mini = toMini(peak.info.body);
                  return (
                    <button
                      key={peak.label}
                      type="button"
                      className={`${styles.step} ${isActive ? styles.stepActive : ""}`}
                      onClick={() => setActiveIndex(index)}
                      aria-pressed={isActive}
                    >
                      <span
                        className={`${styles.node} ${
                          isActive ? styles.nodeActive : ""
                        } ${peak.color === "green" ? styles.nodeGreen : ""}`}
                        aria-hidden="true"
                      />
                      <span className={styles.stepText}>
                        <span className={styles.stepTitle}>{peak.label}</span>
                        <span className={styles.stepMini}>{mini}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.panel} aria-live="polite">
              <div className={styles.panelHead}>
                <div>
                  <h3 className={styles.panelTitle}>{activeInfo.title}</h3>
                  <p className={styles.panelBody}>{activeInfo.body}</p>
                </div>
                <div className={styles.badge}>Mobile-friendly · Accessible</div>
              </div>

              <div className={styles.detailGrid}>
                <div className={styles.detailRow}>
                  <strong>Looks like</strong>
                  <p>{activeInfo.looks}</p>
                </div>
                <div className={styles.detailRow}>
                  <strong>Costs</strong>
                  <p>{activeInfo.costs}</p>
                </div>
                <div className={styles.detailRow}>
                  <strong>We do</strong>
                  <p>{activeInfo.weDo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

