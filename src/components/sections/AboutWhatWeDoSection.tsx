"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./AboutWhatWeDoSection.module.css";

type Step = {
  key: number;
  title: string;
  desc: string;
  pill: string;
  trail: string;
};

const STEPS: Step[] = [
  {
    key: 1,
    title: "Clarity and structure",
    desc: "We make the logic visible: framing, transitions, readability, and reader guidance.",
    pill: "Argument - flow",
    trail: "Reader guidance added",
  },
  {
    key: 2,
    title: "Narrative integrity",
    desc: "We keep meaning honest: proportional language, supported claims, clear limits.",
    pill: "Claim <-> evidence",
    trail: "Claim-evidence aligned",
  },
  {
    key: 3,
    title: "Submission readiness",
    desc: "We align with expectations and reduce preventable errors (without promising outcomes).",
    pill: "Avoidables down",
    trail: "Avoidables reduced",
  },
  {
    key: 4,
    title: "Communication confidence",
    desc: "Feedback transfers to your next project: capability, not dependence.",
    pill: "Teach-back",
    trail: "Reusable patterns learned",
  },
];

export function AboutWhatWeDoSection() {
  const ringRef = useRef<SVGCircleElement | null>(null);
  const beamRef = useRef<HTMLDivElement | null>(null);
  const hubRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationRef = useRef<number | null>(null);
  const [activeStep, setActiveStep] = useState(1);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }, []);

  const shootTo = useCallback(
    (stepEl: HTMLDivElement | null) => {
      const beam = beamRef.current;
      const hub = hubRef.current;
      if (!beam || !hub || !stepEl) return;
      if (reducedMotion) return;

      const hubRect = hub.getBoundingClientRect();
      const stepRect = stepEl.getBoundingClientRect();
      const x0 = hubRect.right - 10;
      const y0 = hubRect.top + hubRect.height * 0.5;
      const x1 = stepRect.left + 14;
      const y1 = stepRect.top + stepRect.height * 0.5;
      const dx = x1 - x0;
      const dy = y1 - y0;
      const len = Math.max(140, Math.hypot(dx, dy));

      beam.style.left = `${x0}px`;
      beam.style.top = `${y0 - 5}px`;
      beam.style.width = `${len}px`;
      const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
      beam.style.setProperty("--a", `${ang}deg`);

      beam.classList.remove(styles.beamOn);
      void beam.offsetWidth;
      beam.classList.add(styles.beamOn);
    },
    [reducedMotion],
  );

  const setActive = useCallback(
    (stepKey: number, fireBeam = true) => {
      const next = Math.max(1, Math.min(STEPS.length, stepKey));
      setActiveStep(next);
      if (fireBeam) {
        const stepEl = stepRefs.current[next - 1] ?? null;
        window.requestAnimationFrame(() => shootTo(stepEl));
      }
    },
    [shootTo],
  );

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const radius = 108;
    const circumference = 2 * Math.PI * radius;
    ring.style.strokeDasharray = `${circumference}`;
    ring.style.strokeDashoffset = `${circumference}`;

    if (reducedMotion) {
      ring.style.strokeDashoffset = "0";
      return;
    }

    const duration = 5600;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      ring.style.strokeDashoffset = `${circumference * (1 - t)}`;
      if (t < 1) {
        animationRef.current = window.requestAnimationFrame(tick);
      }
    };

    animationRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [reducedMotion]);

  useEffect(() => {
    const times = reducedMotion ? [0, 0, 0, 0] : [1200, 2600, 4000, 5400];
    const timers = times.map((ms, idx) =>
      window.setTimeout(() => setActive(idx + 1, true), ms),
    );
    window.setTimeout(() => setActive(1, true), 120);
    window.setTimeout(() => shootTo(stepRefs.current[0] ?? null), 240);

    const handleResize = () => shootTo(stepRefs.current[activeStep - 1] ?? null);
    window.addEventListener("resize", handleResize);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("resize", handleResize);
    };
  }, [activeStep, reducedMotion, setActive, shootTo]);

  return (
    <section className={styles.section} aria-label="What we do today">
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
          <h2 className={styles.title}>What we do today</h2>
          <p className={styles.sub}>
            Structured, human-reviewed guidance across papers, theses, proposals, reports, and
            presentations - designed to improve clarity, protect meaning, reduce avoidables, and
            build confidence that carries forward.
          </p>
        </div>
        <div className={styles.badge}>Ring sequence - scanner beam - outcome trail</div>
      </div>

      <div className={styles.card}>
        <div className={styles.layout}>
          <div className={styles.hub} aria-label="Hub">
            <div className={styles.hubInner} ref={hubRef}>
              <div className={styles.hubPulse} aria-hidden="true" />
              <svg className={styles.ringSvg} viewBox="0 0 260 260" aria-hidden="true">
                <circle className={styles.ringBg} cx="130" cy="130" r="108" />
                <circle className={styles.ringProg} ref={ringRef} cx="130" cy="130" r="108" />
              </svg>
              <div>
                <h3>Human-reviewed guidance</h3>
                <p>Clarity, integrity, readiness, confidence - with transparent scope and ethics.</p>
              </div>
            </div>
          </div>

          <div className={styles.steps} aria-label="Four-step structure">
            <div className={styles.stepList}>
              {STEPS.map((step, idx) => (
                <div
                  key={step.key}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className={`${styles.step} ${activeStep === step.key ? styles.stepActive : ""}`}
                  tabIndex={0}
                  role="button"
                  aria-pressed={activeStep === step.key}
                  onClick={() => setActive(step.key, true)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActive(step.key, true);
                    }
                  }}
                >
                  <div className={styles.stepTop}>
                    <div>
                      <div className={styles.stepNo}>{`Step 0${step.key}`}</div>
                      <p className={styles.stepTitle}>{step.title}</p>
                    </div>
                    <span className={styles.pill}>
                      <span className={styles.pip} aria-hidden="true" />
                      {step.pill}
                    </span>
                  </div>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              ))}
            </div>

            <div className={styles.trail} aria-label="Outcome trail">
              {STEPS.map((step, idx) => (
                <span
                  key={step.trail}
                  className={`${styles.tag} ${idx < activeStep ? styles.tagShow : ""}`}
                >
                  <span className={styles.pip2} aria-hidden="true" />
                  {step.trail}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={beamRef} className={styles.beam} aria-hidden="true" />
    </section>
  );
}
