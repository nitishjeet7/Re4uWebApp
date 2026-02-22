"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./AboutHowWeWorkSection.module.css";

type Step = {
  n: number;
  title: string;
  body: string;
  ethics: string;
  hint: string;
  tagCount: number;
};

const STEPS: Step[] = [
  {
    n: 1,
    title: "Understand intent",
    body:
      "We start by clarifying the purpose, audience, and constraints - so every improvement supports what the work is actually trying to do.",
    ethics: "We do not invent results, add unsupported claims, or polish away limitations.",
    hint: "Purpose - context - audience",
    tagCount: 1,
  },
  {
    n: 2,
    title: "Strengthen structure",
    body:
      "We make the logic visible: clearer framing, tighter flow, better signposting - so your argument is easy to follow.",
    ethics: "We do not change what your research claims - we help you express what you already show.",
    hint: "Argument - flow - signposting",
    tagCount: 2,
  },
  {
    n: 3,
    title: "Improve presentation",
    body:
      "We refine readability, tone, and clarity so readers spend time on ideas - not decoding sentences.",
    ethics: "We do not use hype language or overstatement. Precision is part of integrity.",
    hint: "Readability - tone - clarity",
    tagCount: 3,
  },
  {
    n: 4,
    title: "Reduce risk",
    body:
      "We reduce avoidable errors and align with expectations: consistency, formatting traps, common reviewer pain points.",
    ethics:
      "We do not sell guarantees. We reduce preventable friction - outcomes still depend on peer review and fit.",
    hint: "Avoidables - alignment - consistency",
    tagCount: 4,
  },
  {
    n: 5,
    title: "Return learning",
    body:
      "We return teach-back: what changed, why it changed, and the pattern you can reuse - so improvement carries into your next project.",
    ethics: "We do not create dependence. The goal is capability-building.",
    hint: "Teach-back - patterns - confidence",
    tagCount: 5,
  },
];

const TAGS = [
  "Reader guidance added",
  "Claim-evidence aligned",
  "Avoidables reduced",
  "Reusable patterns learned",
  "Confidence carries forward",
];

export function AboutHowWeWorkSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [wakeKey, setWakeKey] = useState(0);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }, []);

  const step = STEPS[activeIndex];

  const stopTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    stopTimer();
    if (!playing) return;
    const delay = reducedMotion ? 4000 : 2800;
    timerRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STEPS.length);
    }, delay);
  };

  useEffect(() => {
    if (reducedMotion) return;
    setWakeKey((prev) => prev + 1);
  }, [activeIndex, reducedMotion]);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [playing, reducedMotion]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible) {
          startTimer();
        } else {
          stopTimer();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [playing, reducedMotion]);

  const jumpTo = (index: number) => {
    setActiveIndex(index);
    if (playing) startTimer();
  };

  const next = () => jumpTo((activeIndex + 1) % STEPS.length);
  const prev = () => jumpTo((activeIndex - 1 + STEPS.length) % STEPS.length);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="How we work">
      <svg className={styles.contours} viewBox="0 0 1200 520" aria-hidden="true">
        <g fill="none" stroke="rgba(31,58,95,.10)" strokeWidth="2">
          <path d="M120 360 C240 260, 410 240, 560 260 C720 282, 860 332, 1040 392" />
          <path d="M80 392 C220 292, 400 272, 560 295 C740 320, 900 370, 1120 440" />
          <path d="M150 430 C300 340, 460 320, 620 342 C800 368, 940 412, 1100 480" />
          <path d="M90 330 C220 230, 390 205, 540 226 C730 252, 880 312, 1080 386" />
        </g>
      </svg>

      <div className={styles.head}>
        <div>
          <h2 className={styles.title}>How we work (today)</h2>
          <p className={styles.sub}>
            A calm, guided process: one step lights up at a time - so the flow is understandable,
            repeatable, and human-reviewed.
          </p>
        </div>
        <div className={styles.badge}>Sequential - Click to jump - Mobile-friendly</div>
      </div>

      <div className={styles.card}>
        <div className={styles.stage}>
          <div className={styles.stairArea}>
            <div className={styles.stairCanvas}>
              <svg
                className={styles.stairGuide}
                viewBox="0 0 620 520"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  key={`path-${wakeKey}`}
                  className={`${styles.pathDots} ${!reducedMotion ? styles.pathWake : ""}`}
                  d="M80 410 C150 380, 190 330, 230 300 C280 260, 320 220, 360 180 C400 140, 450 110, 520 90"
                />
              </svg>

              <div className={`${styles.stairs} ${styles.s12} ${step.n >= 2 ? styles.stairsOn : ""}`} />
              <div className={`${styles.stairs} ${styles.s23} ${step.n >= 3 ? styles.stairsOn : ""}`} />
              <div className={`${styles.stairs} ${styles.s34} ${step.n >= 4 ? styles.stairsOn : ""}`} />
              <div className={`${styles.stairs} ${styles.s45} ${step.n >= 5 ? styles.stairsOn : ""}`} />

              {STEPS.map((item, idx) => (
                <div
                  key={item.title}
                  className={`${styles.platform} ${styles[`p${item.n}`]} ${
                    step.n === item.n ? styles.platformActive : styles.platformMuted
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Step ${item.n}: ${item.title}`}
                  onClick={() => jumpTo(idx)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      jumpTo(idx);
                    }
                  }}
                >
                  <div className={styles.cap}>
                    <div className={styles.stepNum}>{item.n}</div>
                    <div className={styles.stepTitle}>{item.title}</div>
                  </div>
                  <div className={styles.stepHint}>{item.hint}</div>
                </div>
              ))}
            </div>
          </div>

          <aside className={styles.panel} aria-label="Step details and controls">
            <div className={styles.panelTop}>
              <div className={styles.panelKicker}>{`STEP ${String(step.n).padStart(2, "0")}`}</div>
              <div className={styles.panelTitle}>{step.title}</div>
              <div className={styles.panelBody}>{step.body}</div>
              <div className={styles.ethics}>
                <b>Ethics signal:</b> {step.ethics}
              </div>
            </div>

            <div className={styles.controls} aria-label="Playback controls">
              <div className={styles.btnRow}>
                <button className={`${styles.btn} ${styles.secondary}`} type="button" onClick={prev}>
                  Back
                </button>
                <button
                  className={`${styles.btn} ${styles.primary}`}
                  type="button"
                  onClick={() => {
                    setPlaying((prevState) => !prevState);
                  }}
                >
                  {playing ? "Pause" : "Play"}
                </button>
                <button className={`${styles.btn} ${styles.secondary}`} type="button" onClick={next}>
                  Next
                </button>
              </div>
              <div className={styles.dots} aria-label="Progress dots">
                {STEPS.map((item) => (
                  <span
                    key={`dot-${item.n}`}
                    className={`${styles.d} ${step.n === item.n ? styles.dOn : ""}`}
                  />
                ))}
              </div>
            </div>

            <div className={styles.trail} aria-label="Outcome trail">
              {TAGS.map((tag, idx) => (
                <span key={tag} className={`${styles.tag} ${idx < step.tagCount ? styles.tagShow : ""}`}>
                  <span className={styles.pip2} aria-hidden="true" />
                  {tag}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
