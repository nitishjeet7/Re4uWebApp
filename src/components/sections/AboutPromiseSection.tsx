"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AboutPromiseSection.module.css";

type PromiseStep = {
  n: number;
  title: string;
  mini: string;
  bullets: string[];
};

const STEPS: PromiseStep[] = [
  {
    n: 1,
    title: "Set expectations",
    mini: "Define target + scope",
    bullets: [
      "Clarify purpose, audience, and submission standard.",
      "Define what “good” looks like for this manuscript.",
      "Agree on scope: what we change vs what we never touch.",
    ],
  },
  {
    n: 2,
    title: "Strengthen structure",
    mini: "Flow + signposting",
    bullets: [
      "Make the logic visible: framing + sequencing.",
      "Improve signposting so readers don’t get lost.",
      "Align claims to what is shown (tables/figures).",
    ],
  },
  {
    n: 3,
    title: "Improve clarity",
    mini: "Readability + tone",
    bullets: [
      "Remove ambiguity and sentence-level friction.",
      "Standardize tone to match journal expectations.",
      "Make terminology consistent across sections.",
    ],
  },
  {
    n: 4,
    title: "Reduce risk",
    mini: "Avoidables + consistency",
    bullets: [
      "Catch avoidables and formatting/reporting gaps.",
      "Check consistency across abstract/results/conclusions.",
      "Remove common desk-rejection triggers.",
    ],
  },
  {
    n: 5,
    title: "Return learning",
    mini: "Teach-back + patterns",
    bullets: [
      "Share patterns so future drafts improve faster.",
      "Explain key edits with teach-back notes.",
      "Leave a clear revision map for the next cycle.",
    ],
  },
];

function getNearestIndex(trackEl: HTMLDivElement) {
  const cards = Array.from(trackEl.querySelectorAll<HTMLElement>("[data-deck-card]"));
  if (cards.length === 0) return 0;
  const left = trackEl.getBoundingClientRect().left;

  let bestIndex = 0;
  let bestDist = Number.POSITIVE_INFINITY;
  cards.forEach((card, idx) => {
    const dist = Math.abs(card.getBoundingClientRect().left - left);
    if (dist < bestDist) {
      bestDist = dist;
      bestIndex = idx;
    }
  });
  return bestIndex;
}

export function AboutPromiseSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia?.("(min-width: 940px)");
    if (!media) return;

    const sync = () => setIsDesktop(media.matches);
    sync();

    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = window.requestAnimationFrame(() => {
        setActiveIndex(getNearestIndex(el));
      });
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      el.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const goto = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const next = Math.max(0, Math.min(STEPS.length - 1, index));
    const target = el.querySelector<HTMLElement>(`[data-deck-card][data-index="${next}"]`);
    target?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActiveIndex(next);
  };

  return (
    <section className={styles.section} aria-label="Our promise">
      <header className={styles.pageHead}>
        <h2 className={styles.title}>Our promise</h2>
        <p className={styles.sub}>Five clear checkpoints, with outcomes kept explicit at every step.</p>
      </header>

      <div className={styles.shell} aria-label="Promise deck">
        <div className={styles.sectionHeader}>
          <div className={styles.kicker}>
            <span className={styles.dot} aria-hidden="true" /> Promise Deck
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.deckShell}>
            <div className={styles.deckHint}>Swipe ↔</div>

            <div
              ref={trackRef}
              className={styles.deckTrack}
              aria-label="Promise steps deck"
              tabIndex={0}
              role="group"
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  goto(activeIndex + 1);
                }
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  goto(activeIndex - 1);
                }
              }}
            >
              {STEPS.map((step, idx) => (
                <div
                  key={step.title}
                  data-deck-card
                  data-index={idx}
                  role="group"
                  aria-label={`Step ${step.n}: ${step.title}`}
                  tabIndex={0}
                  className={`${styles.deckCard} ${
                    isDesktop && focusIndex === idx ? styles.deckCardFocus : ""
                  }`}
                  onClick={() => {
                    if (isDesktop) setFocusIndex(idx);
                  }}
                  onKeyDown={(event) => {
                    if (!isDesktop) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setFocusIndex(idx);
                    }
                  }}
                >
                  <div className={styles.deckTop}>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div className={styles.stepNum}>{step.n}</div>
                      <div>
                        <h3>
                          Step {String(step.n).padStart(2, "0")} · {step.title}
                        </h3>
                        <div className={styles.miniMeta}>{step.mini}</div>
                      </div>
                    </div>
                    <div className={styles.kicker}>
                      <span className={styles.dot} aria-hidden="true" /> checkpoint
                    </div>
                  </div>

                  <ul className={styles.bullets}>
                    {step.bullets.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>

                  <div className={styles.chips} aria-label="Step assurances">
                    <span className={styles.chip}>
                      <span className={styles.miniDot} aria-hidden="true" />
                      Outcome visible
                    </span>
                    <span className={styles.chip}>
                      <span className={styles.miniDot} aria-hidden="true" />
                      Human reviewed
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.navRow} aria-label="Deck navigation">
              <button
                type="button"
                className={styles.navBtn}
                aria-label="Previous step"
                disabled={activeIndex === 0}
                onClick={() => goto(activeIndex - 1)}
              >
                <span className={styles.arrow} aria-hidden="true" />
              </button>

              <div className={styles.dots} aria-label="Deck progress dots">
                {STEPS.map((step, idx) => (
                  <button
                    key={step.title}
                    type="button"
                    className={`${styles.dotBtn} ${idx === activeIndex ? styles.dotBtnActive : ""}`}
                    aria-label={`Go to step ${step.n}`}
                    onClick={() => goto(idx)}
                  />
                ))}
              </div>

              <button
                type="button"
                className={styles.navBtn}
                aria-label="Next step"
                disabled={activeIndex === STEPS.length - 1}
                onClick={() => goto(activeIndex + 1)}
              >
                <span className={`${styles.arrow} ${styles.arrowRight}`} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
