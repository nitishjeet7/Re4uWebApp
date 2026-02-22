"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./AboutInvitationSection.module.css";

type Invite = {
  name: string;
  pulse: [number, number];
  pace: string;
  time: string;
  body: string;
  get: string[];
  ethics: string;
};

const DATA: Invite[] = [
  {
    name: "Learn",
    pulse: [120, 205],
    pace: "Pace: low pressure",
    time: "Typical: 10-30 min",
    body:
      "Start with resources, templates, and workshops - practical standards you can reuse across disciplines and languages.",
    get: [
      "Templates that reduce ambiguity",
      "Workshops that teach principles, not hacks",
      "Examples designed for multilingual clarity",
    ],
    ethics: "No paywalling the basics. No gatekeeping tone. No shame about language or background.",
  },
  {
    name: "Improve",
    pulse: [315, 160],
    pace: "Pace: guided",
    time: "Typical: 2-5 days",
    body:
      "Get structured, human-reviewed guidance that strengthens clarity, flow, and submission readiness - without changing what your research claims.",
    get: [
      "Clarity and structure improvements",
      "Claim-evidence alignment checks",
      "Avoidables reduced, scope transparent",
    ],
    ethics: "No ghostwriting. No claim inflation. No guarantees - only accountable review and honest scope.",
  },
  {
    name: "Collaborate",
    pulse: [230, 85],
    pace: "Pace: partnership",
    time: "Typical: ongoing",
    body:
      "Build communication capability inside labs, groups, and institutions - co-designed with context, culture, and constraints.",
    get: ["Lab-wide standards and rubrics", "Internal review pipelines", "Capacity-building sessions for teams"],
    ethics:
      "No one-size-fits-all norms. We respect local context and protect authorship, accountability, and integrity.",
  },
];

export function AboutInvitationSection() {
  const timerRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }, []);
  const [playing, setPlaying] = useState(() => !reducedMotion);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = window.setInterval(() => {
      setActive((prev) => (prev + 1) % DATA.length);
    }, 2600);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [playing]);

  const pick = (index: number) => {
    setActive((index + DATA.length) % DATA.length);
    if (playing) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        setActive((prev) => (prev + 1) % DATA.length);
      }, 2600);
    }
  };

  const item = DATA[active];
  const pulseTranslate = `translate(${item.pulse[0] - 120}px, ${item.pulse[1] - 205}px)`;

  return (
    <section className={styles.section} aria-label="Invitation">
      <div className={styles.frame}>
        <div className={styles.top}>
          <div className={styles.kicker}>
            <span className={styles.dot} aria-hidden="true" /> A simple invitation
          </div>
          <h2 className={styles.title}>You are welcome for tea or coffee - choose your entry.</h2>
          <p className={styles.lead}>
            If you believe research quality deserves research-quality communication - you are already part of
            what we are building. Engage in three ways: <b>Learn</b>, <b>Improve</b>, <b>Collaborate</b>.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.scene} aria-label="Cup with steam bubbles">
            <div className={styles.sceneHeader}>
              <div className={styles.badge}>Cup + steam bubbles (clear choices)</div>
              <div className={styles.ctrls}>
                <button
                  className={styles.btn}
                  type="button"
                  onClick={() => setPlaying((prev) => !prev)}
                >
                  {playing ? "Pause" : "Play"}
                </button>
                <button className={styles.btn} type="button" onClick={() => pick(active - 1)}>
                  Back
                </button>
                <button className={styles.btn} type="button" onClick={() => pick(active + 1)}>
                  Next
                </button>
              </div>
            </div>

            <svg viewBox="0 0 560 460" width="100%" height="100%" aria-hidden="true">
              <g opacity="0.96">
                <path
                  d="M170 330 h220 a24 24 0 0 1 24 24 v14 a18 18 0 0 1-18 18 H188 a18 18 0 0 1-18-18 v-14 a24 24 0 0 1 24-24z"
                  fill="rgba(255,255,255,.04)"
                  stroke="rgba(255,255,255,.12)"
                  strokeWidth="2"
                />
                <path
                  d="M414 345 h44 a30 30 0 0 1 0 60 h-44"
                  fill="none"
                  stroke="rgba(255,255,255,.14)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M140 408c85-18 240-18 325 0"
                  fill="none"
                  stroke="rgba(255,255,255,.10)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path d="M205 356 h160" stroke="rgba(63,127,114,.34)" strokeWidth="3" strokeLinecap="round" />
              </g>

              <path
                className={styles.steamLine2}
                d="M280 330 C260 302, 260 284, 278 260 C300 230, 290 212, 270 196 C245 176, 252 150, 280 134"
              />
              <path
                className={styles.steamLine}
                d="M280 330 C300 302, 300 284, 282 260 C260 230, 270 212, 290 196 C315 176, 308 150, 280 134"
              />
              <path
                className={styles.steamLine}
                d="M280 330 C280 304, 300 285, 308 260 C316 236, 300 220, 280 204"
                opacity="0.35"
              />

              {[0, 1, 2].map((idx) => (
                <g
                  key={`bubble-${idx}`}
                  className={`${styles.bubble} ${
                    active === idx ? styles.bubbleOn : styles.bubbleOff
                  }`}
                  role="button"
                  tabIndex={0}
                  onClick={() => pick(idx)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      pick(idx);
                    }
                  }}
                >
                  {idx === 0 ? (
                    <>
                      <ellipse
                        cx="190"
                        cy="210"
                        rx="88"
                        ry="44"
                        fill="rgba(255,255,255,.06)"
                        stroke="rgba(255,255,255,.14)"
                        strokeWidth="2"
                      />
                      <circle cx="130" cy="202" r="6" fill="rgba(168,199,230,.55)" />
                      <text
                        x="190"
                        y="205"
                        textAnchor="middle"
                        fontFamily="Inter, system-ui, sans-serif"
                        fontSize="16"
                        fontWeight="950"
                        fill="rgba(234,240,255,.92)"
                      >
                        Learn
                      </text>
                      <text
                        x="190"
                        y="225"
                        textAnchor="middle"
                        fontFamily="Inter, system-ui, sans-serif"
                        fontSize="11.8"
                        fill="rgba(234,240,255,.66)"
                      >
                        resources - templates - workshops
                      </text>
                      <path
                        d="M120 205 C140 188, 160 182, 180 180"
                        fill="none"
                        stroke="rgba(168,199,230,.22)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </>
                  ) : null}
                  {idx === 1 ? (
                    <>
                      <ellipse
                        cx="380"
                        cy="170"
                        rx="98"
                        ry="48"
                        fill="rgba(255,255,255,.06)"
                        stroke="rgba(255,255,255,.14)"
                        strokeWidth="2"
                      />
                      <circle cx="315" cy="160" r="6" fill="rgba(63,127,114,.56)" />
                      <text
                        x="380"
                        y="166"
                        textAnchor="middle"
                        fontFamily="Inter, system-ui, sans-serif"
                        fontSize="16"
                        fontWeight="950"
                        fill="rgba(234,240,255,.92)"
                      >
                        Improve
                      </text>
                      <text
                        x="380"
                        y="187"
                        textAnchor="middle"
                        fontFamily="Inter, system-ui, sans-serif"
                        fontSize="11.8"
                        fill="rgba(234,240,255,.66)"
                      >
                        structured feedback - optimisation
                      </text>
                      <path
                        d="M290 170 C312 152, 335 145, 360 144"
                        fill="none"
                        stroke="rgba(63,127,114,.24)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </>
                  ) : null}
                  {idx === 2 ? (
                    <>
                      <ellipse
                        cx="300"
                        cy="95"
                        rx="110"
                        ry="50"
                        fill="rgba(255,255,255,.06)"
                        stroke="rgba(255,255,255,.14)"
                        strokeWidth="2"
                      />
                      <circle cx="230" cy="85" r="6" fill="rgba(233,227,213,.55)" />
                      <text
                        x="300"
                        y="92"
                        textAnchor="middle"
                        fontFamily="Inter, system-ui, sans-serif"
                        fontSize="16"
                        fontWeight="950"
                        fill="rgba(234,240,255,.92)"
                      >
                        Collaborate
                      </text>
                      <text
                        x="300"
                        y="113"
                        textAnchor="middle"
                        fontFamily="Inter, system-ui, sans-serif"
                        fontSize="11.8"
                        fill="rgba(234,240,255,.66)"
                      >
                        labs - groups - institutions
                      </text>
                      <path
                        d="M210 92 C238 76, 266 70, 294 70"
                        fill="none"
                        stroke="rgba(233,227,213,.22)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </>
                  ) : null}
                </g>
              ))}

              <g className={styles.pulse} style={{ transform: pulseTranslate }}>
                <circle cx="120" cy="205" r="14" fill="rgba(63,127,114,.28)" />
                <circle cx="120" cy="205" r="6" fill="rgba(234,240,255,.92)" />
              </g>
            </svg>

            <div className={styles.hint}>
              <b>How to use:</b> tap a bubble to choose your entry. We keep the tone welcoming, and
              the ethics explicit.
            </div>
          </div>

          <div className={styles.details} aria-label="Details panel">
            <h3 className={styles.detailsTitle}>{item.name}</h3>
            <p className={styles.detailsBody}>{item.body}</p>

            <div className={styles.metaRow}>
              <div className={styles.pillMini}>
                <span className={styles.dot} aria-hidden="true" />
                {item.pace}
              </div>
              <div className={styles.pillMini}>
                <span className={styles.dot} aria-hidden="true" />
                {item.time}
              </div>
            </div>

            <div className={styles.cols}>
              <div className={styles.box}>
                <h4>What you get</h4>
                <ul>
                  {item.get.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.box}>
                <h4>Ethics boundary</h4>
                <p>{item.ethics}</p>
                <p className={styles.boxNote}>
                  <b>Culture and language:</b> we avoid gatekeeping tone, support multilingual clarity,
                  and respect different disciplinary conventions.
                </p>
              </div>
            </div>

            <div className={styles.tabs} role="tablist" aria-label="Select engagement mode">
              {DATA.map((entry, idx) => (
                <button
                  key={entry.name}
                  className={`${styles.tab} ${idx === active ? styles.tabActive : ""}`}
                  type="button"
                  role="tab"
                  onClick={() => pick(idx)}
                >
                  <div className={styles.tabTitle}>{entry.name}</div>
                  <div className={styles.tabSub}>
                    {idx === 0
                      ? "Start at your pace. Build shared standards."
                      : idx === 1
                        ? "Human-reviewed feedback. Clear ownership."
                        : "Capacity-building with context respected."}
                  </div>
                </button>
              ))}
            </div>

            <div className={styles.footerLine}>
              Where good research finds wings - not through shortcuts, but through{" "}
              <span>clarity</span>, <span>skill</span>, and <span>integrity</span>.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
