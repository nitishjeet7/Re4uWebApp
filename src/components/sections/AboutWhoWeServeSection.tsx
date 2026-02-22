"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./AboutWhoWeServeSection.module.css";

type Persona = {
  label: string;
  tag: string;
  title: string;
  body: string;
  rule: string;
  accent: "sky" | "green";
  skin: string;
  hair: string;
};

const PERSONAS: Persona[] = [
  {
    label: "Postgraduate",
    tag: "Learning scholarly communication",
    title: "Postgraduate scholars",
    body:
      "Learning scholarly communication - how to structure an argument, present evidence, and respond to feedback without losing voice.",
    rule: "DEI: we make hidden expectations explicit, and we do not assume insider training.",
    accent: "sky",
    skin: "#C58C5D",
    hair: "rgba(42,46,53,0.18)",
  },
  {
    label: "Early-career",
    tag: "High pressure, limited mentoring",
    title: "Early-career researchers",
    body:
      "Navigating high pressure and limited mentoring while expectations shift across journals, committees, and funders.",
    rule: "DEI: we design for uneven access to senior co-author support and limited time.",
    accent: "green",
    skin: "#8D5A3B",
    hair: "rgba(42,46,53,0.18)",
  },
  {
    label: "Faculty & Groups",
    tag: "Complex publication pipelines",
    title: "Faculty and research groups",
    body:
      "Managing complex publication pipelines across multiple authors, drafts, timelines, and standards.",
    rule: "DEI: clear ownership and review trails reduce invisible labor across roles.",
    accent: "sky",
    skin: "#E2B59B",
    hair: "rgba(42,46,53,0.14)",
  },
  {
    label: "Under-resourced",
    tag: "Strong work, fewer tools",
    title: "Researchers from under-resourced institutions",
    body:
      "Strong work with fewer tools - limited access to paid platforms, editorial networks, or institutional support.",
    rule: "DEI: reduce the tooling gap with structured methods that work with minimal infrastructure.",
    accent: "sky",
    skin: "#B06E47",
    hair: "rgba(42,46,53,0.16)",
  },
  {
    label: "Multilingual",
    tag: "Voice-safe clarity",
    title: "Multilingual scholars",
    body:
      "Refusing to let language decide impact - improving readability while preserving meaning, voice, and identity.",
    rule: "DEI: standard language is a tool, not a measure of intelligence or merit.",
    accent: "green",
    skin: "#6B3F2A",
    hair: "rgba(42,46,53,0.18)",
  },
];

export function AboutWhoWeServeSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const setActiveIndex = useCallback((index: number, shouldScroll = true) => {
    const next = Math.max(0, Math.min(PERSONAS.length - 1, index));
    setActive(next);
    if (shouldScroll) {
      tileRefs.current[next]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let timer: number | null = null;
    const handleScroll = () => {
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const rect = track.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        let bestIdx = 0;
        let best = Infinity;

        tileRefs.current.forEach((tile, idx) => {
          if (!tile) return;
          const r = tile.getBoundingClientRect();
          const c = r.left + r.width / 2;
          const d = Math.abs(c - center);
          if (d < best) {
            best = d;
            bestIdx = idx;
          }
        });

        setActiveIndex(bestIdx, false);
      }, 120);
    };

    track.addEventListener("scroll", handleScroll);
    return () => {
      track.removeEventListener("scroll", handleScroll);
      if (timer) window.clearTimeout(timer);
    };
  }, [setActiveIndex]);

  const activePersona = PERSONAS[active];

  return (
    <section className={styles.section} aria-label="Who we serve">
      <div className={styles.head}>
        <div>
          <h2 className={styles.title}>Who we serve</h2>
          <p className={styles.sub}>
            A "museum wall" carousel: pick a persona, and one shared panel updates. DEI: diverse
            representation, respectful labels, and interaction that works with touch, keyboard, and
            screen readers.
          </p>
        </div>
        <div className={styles.badge}>Carousel - drag / arrows</div>
      </div>

      <div className={styles.wall}>
        <div className={styles.titleRow}>
          <p className={styles.kicker}>Who we serve</p>
          <div className={styles.h3}>Across disciplines - and across access conditions</div>
        </div>

        <div className={styles.carouselWrap}>
          <button
            className={styles.navBtn}
            type="button"
            aria-label="Previous"
            onClick={() => setActiveIndex(active - 1, true)}
          >
            <span className={styles.arrow} aria-hidden="true" />
          </button>

          <div
            className={styles.track}
            ref={trackRef}
            tabIndex={0}
            role="group"
            aria-label="Audience carousel (scrollable)"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                setActiveIndex(active + 1, true);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                setActiveIndex(active - 1, true);
              }
            }}
          >
            {PERSONAS.map((persona, idx) => (
              <button
                key={persona.label}
                ref={(el) => {
                  tileRefs.current[idx] = el;
                }}
                className={`${styles.tile} ${idx === active ? styles.tileActive : ""}`}
                type="button"
                onClick={() => setActiveIndex(idx, true)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveIndex(idx, true);
                  }
                }}
              >
                <div className={styles.portrait} aria-hidden="true">
                  <svg width="92" height="92" viewBox="0 0 64 64" role="img" aria-label="Avatar">
                    <defs>
                      <linearGradient
                        id={`who-serve-${idx}`}
                        x1="0"
                        x2="1"
                        gradientTransform="rotate(0)"
                      >
                        <stop
                          offset="0"
                          stopColor={
                            persona.accent === "green"
                              ? "rgba(63,127,114,0.26)"
                              : "rgba(168,199,230,0.55)"
                          }
                        />
                        <stop offset="1" stopColor="rgba(255,255,255,0.34)" />
                      </linearGradient>
                    </defs>
                    <circle cx="32" cy="32" r="31" fill={`url(#who-serve-${idx})`} />
                    <circle cx="32" cy="28" r="12" fill={persona.skin} />
                    <path d="M14 58c3-12 14-18 18-18s15 6 18 18" fill="#fff" opacity="0.8" />
                    <path
                      d="M18 24c3-8 9-12 14-12s11 4 14 12"
                      fill={persona.hair}
                      opacity="0.18"
                    />
                  </svg>
                </div>
                <div className={styles.label}>{persona.label}</div>
                <div className={styles.tag}>{persona.tag}</div>
              </button>
            ))}
          </div>

          <button
            className={styles.navBtn}
            type="button"
            aria-label="Next"
            onClick={() => setActiveIndex(active + 1, true)}
          >
            <span className={`${styles.arrow} ${styles.arrowRight}`} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.detail} aria-live="polite">
          <p className={styles.dK}>Audience</p>
          <div className={styles.dT}>{activePersona.title}</div>
          <div className={styles.dB}>{activePersona.body}</div>
          <div className={styles.dRule}>{activePersona.rule}</div>
        </div>

        <div className={styles.helper}>
          Tip: drag to scroll - arrows to step - Enter to select - Arrow keys to navigate.
        </div>
      </div>
    </section>
  );
}
