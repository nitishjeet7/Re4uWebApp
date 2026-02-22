"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./AboutPrinciplesSection.module.css";

type Principle = {
  title: string;
  body: string;
  rule: string;
};

type TabConfig = {
  key: "clarity" | "integrity" | "humans" | "equity";
  label: string;
  idx: number;
};

const PRINCIPLES: Principle[] = [
  {
    title: "Integrity at the core",
    body:
      "We are here to protect credibility, not to play the \"get it done somehow\" game. If a request pushes us across an ethical line, we will say no - even if it costs us.",
    rule: "Simple rule: if it weakens trust in the research record, we do not do it.",
  },
  {
    title: "Equity at scale",
    body:
      "Good guidance should not be a privilege reserved for a few labs or geographies. We design support so it is structured, understandable, and accessible - without lowering standards.",
    rule: "Equity is not a discount. It is better design - so quality reaches more people.",
  },
  {
    title: "Humans accountable",
    body:
      "Tools can help, but responsibility cannot be automated. Every deliverable has a named owner, and decisions are traceable. If judgment is needed, a human signs off.",
    rule: "Assistance is fine. Accountability is non-negotiable.",
  },
  {
    title: "Clarity over performance",
    body:
      "We prefer writing that helps readers understand, not writing that tries to sound smart. Clarity is kindness to reviewers, committees, and the next researcher who reads your work.",
    rule: "If it reads well, it travels well.",
  },
];

const TABS: TabConfig[] = [
  { key: "clarity", label: "Clarity", idx: 3 },
  { key: "integrity", label: "Integrity", idx: 0 },
  { key: "humans", label: "Humans", idx: 2 },
  { key: "equity", label: "Equity", idx: 1 },
];

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function AboutPrinciplesSection() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const wheelRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [popoverStyle, setPopoverStyle] = useState<{ left: number; top: number } | null>(null);
  const [wireViewBox, setWireViewBox] = useState("0 0 100 100");
  const [wirePath, setWirePath] = useState("");
  const [wireDotA, setWireDotA] = useState({ x: 0, y: 0 });
  const [wireDotB, setWireDotB] = useState({ x: 0, y: 0 });

  const activeData = useMemo(
    () => (activeIndex === null ? PRINCIPLES[0] : PRINCIPLES[activeIndex]),
    [activeIndex],
  );

  const positionPopover = useCallback(() => {
    const stage = stageRef.current;
    const wheel = wheelRef.current;
    const pop = popoverRef.current;
    const tab = activeIndex === null ? null : tabRefs.current[activeIndex];
    if (!stage || !wheel || !pop || !tab) return;

    const stageRect = stage.getBoundingClientRect();
    const wheelRect = wheel.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();

    const ax = tabRect.left - stageRect.left + tabRect.width / 2;
    const ay = tabRect.top - stageRect.top + tabRect.height / 2;

    const popW = pop.offsetWidth;
    const popH = pop.offsetHeight;
    const gap = 18;
    const wheelPad = 22;
    const stageW = stageRect.width;

    const wheelLeft = wheelRect.left - stageRect.left;
    const wheelRight = wheelLeft + wheelRect.width;
    const wheelTop = wheelRect.top - stageRect.top;
    const leftSpace = wheelLeft - wheelPad - 12;
    const rightSpace = stageW - wheelRight - wheelPad - 12;
    const isMobile = stageW < 560;

    const tabCenterX = tabRect.left - stageRect.left + tabRect.width / 2;
    const wheelCenterX = wheelLeft + wheelRect.width / 2;
    const wantsRight = tabCenterX > wheelCenterX;

    let side: "left" | "right" | "below" = wantsRight ? "right" : "left";
    if (side === "right" && rightSpace < popW) side = "left";
    if (side === "left" && leftSpace < popW) side = "right";

    let px = 12;
    let py = 12;

    if (!isMobile && ((side === "right" && rightSpace >= popW) || (side === "left" && leftSpace >= popW))) {
      if (side === "right") {
        px = wheelRight + wheelPad;
      } else {
        px = wheelLeft - wheelPad - popW;
      }
      py = ay - popH / 2;
    } else {
      side = "below";
      px = (stageW - popW) / 2;
      py = wheelTop + wheelRect.height + gap;
    }

    px = clamp(px, 12, stageRect.width - popW - 12);
    py = clamp(py, 12, stageRect.height - popH - 12);

    setPopoverStyle({ left: px, top: py });

    const viewBox = `0 0 ${stageRect.width} ${stageRect.height}`;
    setWireViewBox(viewBox);

    let tx = px;
    let ty = py + popH * 0.3;
    if (side === "left") {
      tx = px + popW;
      ty = py + popH * 0.3;
    }
    if (side === "below") {
      tx = px + popW * 0.5;
      ty = py;
    }

    const midX = (ax + tx) / 2;
    setWirePath(`M ${ax} ${ay} L ${midX} ${ay} L ${midX} ${ty} L ${tx} ${ty}`);
    setWireDotA({ x: ax, y: ay });
    setWireDotB({ x: tx, y: ty });
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) {
      setWirePath("");
      setWireDotA({ x: 0, y: 0 });
      setWireDotB({ x: 0, y: 0 });
      return;
    }

    const handleResize = () => {
      window.requestAnimationFrame(positionPopover);
    };

    window.requestAnimationFrame(positionPopover);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex, positionPopover]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section className={styles.section} aria-label="Our principles">
      <svg className={styles.contours} viewBox="0 0 1200 520" aria-hidden="true">
        <g fill="none" stroke="rgba(31,58,95,.10)" strokeWidth="2">
          <path d="M120 360 C240 260, 410 240, 560 260 C720 282, 860 332, 1040 392" />
          <path d="M80 392 C220 292, 400 272, 560 295 C740 320, 900 370, 1120 440" />
          <path d="M150 430 C300 340, 460 320, 620 342 C800 368, 940 412, 1100 480" />
          <path d="M90 330 C220 230, 390 205, 540 226 C730 252, 880 312, 1080 386" />
        </g>
      </svg>

      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Our principles</h2>
          <p className={styles.sub}>
            Click the tablet tabs. On desktop, the card opens beside the tab (not below unless there
            is no side space). On mobile, it opens below.
          </p>
        </div>
        <div className={styles.note}>Tabs - side card</div>
      </div>

      <div className={styles.center}>
        <div className={styles.wheelCard}>
          <div className={styles.stage} ref={stageRef}>
            <svg className={styles.wiring} viewBox={wireViewBox} aria-hidden="true">
              <path
                className={styles.wirePath}
                d={wirePath}
                fill="none"
                stroke="rgba(31,58,95,.22)"
                strokeWidth="2"
                strokeDasharray="4 6"
                strokeLinecap="round"
              />
              <circle
                cx={wireDotA.x}
                cy={wireDotA.y}
                r="3"
                fill="rgba(168,199,230,.95)"
                stroke="rgba(31,58,95,.18)"
                strokeWidth="0.8"
              />
              <circle
                cx={wireDotB.x}
                cy={wireDotB.y}
                r="3"
                fill="rgba(255,255,255,.70)"
                stroke="rgba(31,58,95,.18)"
                strokeWidth="0.8"
              />
            </svg>

            <div className={styles.wheel} ref={wheelRef}>
              <svg viewBox="0 0 420 420" aria-hidden="true">
                <defs>
                  <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="rgba(17,24,39,0.10)" />
                  </filter>
                  <linearGradient id="segSky" x1="0" x2="1">
                    <stop offset="0" stopColor="rgba(255,255,255,0.55)" />
                    <stop offset="1" stopColor="rgba(168,199,230,0.25)" />
                  </linearGradient>
                  <linearGradient id="segSky2" x1="0" x2="1">
                    <stop offset="0" stopColor="rgba(255,255,255,0.52)" />
                    <stop offset="1" stopColor="rgba(168,199,230,0.22)" />
                  </linearGradient>
                  <linearGradient id="segGreen" x1="0" x2="1">
                    <stop offset="0" stopColor="rgba(255,255,255,0.52)" />
                    <stop offset="1" stopColor="rgba(63,127,114,0.22)" />
                  </linearGradient>
                </defs>

                <circle
                  cx="210"
                  cy="210"
                  r="176"
                  fill="none"
                  stroke="rgba(31,58,95,0.12)"
                  strokeWidth="2"
                  strokeDasharray="5 8"
                />

                <g filter="url(#softShadow)">
                  <path
                    d="M210 50 A160 160 0 0 1 370 210 L 330 210 A120 120 0 0 0 210 90 Z"
                    fill="url(#segSky)"
                    stroke="rgba(31,58,95,0.12)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M370 210 A160 160 0 0 1 210 370 L 210 330 A120 120 0 0 0 330 210 Z"
                    fill="url(#segSky2)"
                    stroke="rgba(31,58,95,0.12)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M210 370 A160 160 0 0 1 50 210 L 90 210 A120 120 0 0 0 210 330 Z"
                    fill="url(#segSky)"
                    stroke="rgba(31,58,95,0.12)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M50 210 A160 160 0 0 1 210 50 L 210 90 A120 120 0 0 0 90 210 Z"
                    fill="url(#segGreen)"
                    stroke="rgba(31,58,95,0.12)"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>

              <button
                className={styles.hub}
                type="button"
                onClick={() => setActiveIndex(0)}
                aria-label="Center"
              >
                <div className={styles.hubContent}>
                  <div className={styles.hubTitle}>Our principles</div>
                  <div className={styles.hubH}>What we will not compromise</div>
                  <div className={styles.hubP}>Tap a tab around the wheel.</div>
                  <div className={styles.hubCTA}>
                    Tap a tab <span className={styles.chev} aria-hidden="true" />
                  </div>
                </div>
              </button>

              <div className={styles.tabs}>
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    ref={(el) => {
                      tabRefs.current[tab.idx] = el;
                    }}
                    className={`${styles.tab} ${styles[`tab_${tab.key}`]} ${
                      activeIndex === tab.idx ? styles.tabActive : ""
                    }`}
                    type="button"
                    onClick={() => setActiveIndex(tab.idx)}
                  >
                    <span className={styles.tabDot} aria-hidden="true" /> {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              ref={popoverRef}
              className={`${styles.popover} ${activeIndex !== null ? styles.popoverOpen : ""}`}
              style={popoverStyle ? { left: popoverStyle.left, top: popoverStyle.top } : undefined}
            >
              <div className={styles.pTop}>
                <div className={styles.pBody}>
                  <p className={styles.pK}>Principle</p>
                  <p className={styles.pT}>{activeData.title}</p>
                  <p className={styles.pB}>{activeData.body}</p>
                  <div className={styles.pR}>{activeData.rule}</div>
                </div>
                <button
                  className={styles.closeX}
                  type="button"
                  aria-label="Close"
                  onClick={() => setActiveIndex(null)}
                >
                  <span className={styles.x} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className={styles.helper}>
            One more non-negotiable: we respect the research process. We support your work - we do
            not replace it.
          </div>
        </div>
      </div>
    </section>
  );
}
