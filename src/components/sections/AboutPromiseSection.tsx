"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./AboutPromiseSection.module.css";

type Step = {
  label: string;
  title: string;
  desc: string;
  pos: [number, number];
  segOn: number[];
  tags: number[];
};

const STEPS: Step[] = [
  {
    label: "Step 01",
    title: "Understand intent",
    desc:
      "We start by understanding your purpose, context, audience, and constraints - so edits strengthen meaning instead of changing claims.",
    pos: [120, 520],
    segOn: [1],
    tags: [0],
  },
  {
    label: "Step 02",
    title: "Strengthen structure",
    desc:
      "We make the argument easier to follow: framing, flow, transitions, and reader guidance - without rewriting your research.",
    pos: [360, 460],
    segOn: [1, 2],
    tags: [0, 2],
  },
  {
    label: "Step 03",
    title: "Improve presentation",
    desc:
      "We refine readability and precision: sentence clarity, tone consistency, and terminology - so the work travels across disciplines.",
    pos: [430, 260],
    segOn: [1, 2, 3],
    tags: [0, 1],
  },
  {
    label: "Step 04",
    title: "Reduce risk",
    desc:
      "We reduce avoidable issues: mismatches with expectations, unclear claims, and formatting pitfalls - no shortcuts, just robustness.",
    pos: [720, 200],
    segOn: [1, 2, 3, 4],
    tags: [0, 1, 2],
  },
  {
    label: "Step 05",
    title: "Return learning",
    desc:
      "We leave you with teach-back notes and reusable patterns - so improvement carries into your next project.",
    pos: [860, 90],
    segOn: [1, 2, 3, 4, 5],
    tags: [0, 1, 2, 3],
  },
];

const TAGS = [
  "Reader guidance added",
  "Claim-evidence aligned",
  "Avoidables reduced",
  "Reusable patterns learned",
];

export function AboutPromiseSection() {
  const timerRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }, []);
  const [playing, setPlaying] = useState(() => !reducedMotion);

  const stop = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    stop();
    if (!playing) return;
    timerRef.current = window.setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length);
    }, 2600);
  }, [playing, stop]);

  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  const setStep = (index: number) => {
    setActive((index + STEPS.length) % STEPS.length);
    if (playing) start();
  };

  const step = STEPS[active];
  const progress = `${((active + 1) / STEPS.length) * 100}%`;
  const pulseTranslate = `translate(${step.pos[0] - 120}px, ${step.pos[1] - 520}px)`;

  return (
    <section className={styles.section} aria-label="Our promise">
      <div className={styles.head}>
        <div>
          <h2 className={styles.title}>Our promise</h2>
          <p className={styles.sub}>
            A single signal route with five checkpoints. A soft scanning pulse travels node-to-node;
            segments wake up and outcomes appear.
          </p>
        </div>
        <div className={styles.chip}>
          <span className={styles.dot} aria-hidden="true" /> Sequential - clean - transparent
        </div>
      </div>

      <div className={styles.frame}>
        <div className={styles.grid}>
          <div className={styles.viz}>
            <svg viewBox="0 0 980 650" width="100%" height="100%" role="img" aria-label="Signal path">
              <defs>
                <filter id="promiseShadow" x="-40%" y="-40%" width="180%" height="180%">
                  <feDropShadow dx="0" dy="22" stdDeviation="18" floodColor="rgba(0,0,0,.65)" />
                </filter>
              </defs>

              <g opacity="0.32">
                <path
                  d="M60 120 C220 70, 400 80, 560 134 C740 196, 860 294, 950 380"
                  className={styles.route}
                />
                <path
                  d="M40 200 C240 130, 420 140, 580 208 C780 292, 890 410, 960 520"
                  className={styles.route}
                  opacity="0.7"
                />
              </g>

              <path
                d="M120 520 L260 520 Q340 520 360 460 L430 260 Q450 200 520 200 L720 200 Q800 200 820 140 L860 90"
                className={styles.route}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {[1, 2, 3, 4, 5].map((seg) => (
                <path
                  key={`seg-${seg}`}
                  id={`seg${seg}`}
                  d={
                    seg === 1
                      ? "M120 520 L260 520"
                      : seg === 2
                        ? "M260 520 Q340 520 360 460"
                        : seg === 3
                          ? "M360 460 L430 260"
                          : seg === 4
                            ? "M430 260 Q450 200 520 200 L720 200"
                            : "M720 200 Q800 200 820 140 L860 90"
                  }
                  className={`${styles.routeWake} ${step.segOn.includes(seg) ? styles.routeWakeOn : ""}`}
                  strokeLinecap="round"
                />
              ))}

              {[1, 2, 3, 4, 5].map((node) => (
                <g
                  key={`node-${node}`}
                  className={`${styles.node} ${node <= active + 1 ? styles.nodeOn : ""}`}
                  filter="url(#promiseShadow)"
                >
                  <circle
                    cx={node === 1 ? 120 : node === 2 ? 360 : node === 3 ? 430 : node === 4 ? 720 : 860}
                    cy={node === 1 ? 520 : node === 2 ? 460 : node === 3 ? 260 : node === 4 ? 200 : 90}
                    r="28"
                    fill="rgba(255,255,255,.06)"
                    stroke="rgba(255,255,255,.16)"
                    strokeWidth="2"
                  />
                  <circle
                    cx={node === 1 ? 120 : node === 2 ? 360 : node === 3 ? 430 : node === 4 ? 720 : 860}
                    cy={node === 1 ? 520 : node === 2 ? 460 : node === 3 ? 260 : node === 4 ? 200 : 90}
                    r="12"
                      fill={
                        node === 1
                          ? "rgba(168,199,230,.55)"
                        : node === 2
                          ? "rgba(63,127,114,.42)"
                          : node === 3
                            ? "rgba(90,138,201,.42)"
                            : node === 4
                              ? "rgba(233,227,213,.45)"
                              : "rgba(63,127,114,.52)"
                      }
                    />
                  <text
                    x={node === 1 ? 120 : node === 2 ? 360 : node === 3 ? 430 : node === 4 ? 720 : 860}
                    y={node === 1 ? 526 : node === 2 ? 466 : node === 3 ? 266 : node === 4 ? 206 : 96}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="900"
                    fill="rgba(234,240,255,.92)"
                  >
                    {node}
                  </text>
                </g>
              ))}

              {[
                { id: 1, x: 62, y: 546, w: 260, h: 86, title: "Understand intent", desc: "Purpose, audience, constraints.", color: "var(--c1)" },
                { id: 2, x: 390, y: 500, w: 305, h: 92, title: "Strengthen structure", desc: "Flow, framing, guidance.", color: "var(--c2)" },
                { id: 3, x: 96, y: 188, w: 300, h: 92, title: "Improve presentation", desc: "Readability, precision.", color: "var(--c3)" },
                { id: 4, x: 746, y: 230, w: 220, h: 92, title: "Reduce risk", desc: "Avoidables, mismatches.", color: "var(--c4)" },
                { id: 5, x: 610, y: 28, w: 230, h: 92, title: "Return learning", desc: "Teach-back and patterns.", color: "var(--c5)" },
              ].map((lab) => (
                <g key={`lab-${lab.id}`} className={`${styles.label} ${active + 1 === lab.id ? styles.labelOn : ""}`}>
                  <rect
                    x={lab.x}
                    y={lab.y}
                    width={lab.w}
                    height={lab.h}
                    rx="16"
                    fill="rgba(255,255,255,.05)"
                    stroke="rgba(255,255,255,.10)"
                  />
                  <text x={lab.x + 20} y={lab.y + 32} fontSize="15" fontWeight="900" fill={lab.color}>
                    {lab.title}
                  </text>
                  <text x={lab.x + 20} y={lab.y + 57} fontSize="12.8" fill="rgba(234,240,255,.65)">
                    {lab.desc}
                  </text>
                </g>
              ))}

              <g className={styles.pulse} style={{ transform: pulseTranslate }}>
                <circle cx="120" cy="520" r="18" fill="rgba(63,127,114,.32)" />
                <circle cx="120" cy="520" r="8" fill="rgba(234,240,255,.88)" />
              </g>
            </svg>
          </div>

          <aside className={styles.panel}>
            <div className={styles.controls}>
              <div className={styles.btnRow}>
                <button
                  className={styles.btn}
                  type="button"
                  onClick={() => {
                    setPlaying((prev) => !prev);
                  }}
                >
                  {playing ? "Pause" : "Play"}
                </button>
                <button className={styles.btn} type="button" onClick={() => setStep(active - 1)}>
                  Back
                </button>
                <button className={styles.btn} type="button" onClick={() => setStep(active + 1)}>
                  Next
                </button>
              </div>
              <div className={styles.mini}>
                <span>Progress</span>
                <span className={styles.bar}>
                  <span className={styles.fill} style={{ width: progress }} />
                </span>
                <span>{`${active + 1}/${STEPS.length}`}</span>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.kicker}>{step.label}</div>
              <div className={styles.h}>{step.title}</div>
              <div className={styles.p}>{step.desc}</div>

              <div className={styles.trail}>
                {TAGS.map((tag, idx) => (
                  <span
                    key={tag}
                    className={`${styles.tag} ${step.tags.includes(idx) ? styles.tagOn : ""}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.jump}>
                {STEPS.map((item, idx) => (
                  <button
                    key={item.label}
                    type="button"
                    className={idx === active ? styles.jumpActive : undefined}
                    onClick={() => setStep(idx)}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className={`${styles.card} ${styles.cardAccent}`}>
              <div className={styles.kicker}>Ethics and scope</div>
              <div className={styles.p} style={{ marginTop: 10 }}>
                No guarantees. No shortcuts. Human review with clear ownership - and honest guidance
                about what is possible.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
