"use client";

import { useState } from "react";
import styles from "./AboutMissionSection.module.css";

export function AboutMissionSection() {
  const [flipped, setFlipped] = useState({ mission: false, vision: false });

  const missionClassName = `${styles.card} ${flipped.mission ? styles.cardFlipped : ""}`;
  const visionClassName = `${styles.card} ${flipped.vision ? styles.cardFlipped : ""}`;

  return (
    <section className={styles.wrap} aria-label="Mission and vision">
      <div className={styles.section}>
        <svg className={styles.contours} viewBox="0 0 1200 520" aria-hidden="true">
          <g fill="none" stroke="rgba(31,58,95,.10)" strokeWidth="2">
            <path d="M120 360 C240 260, 410 240, 560 260 C720 282, 860 332, 1040 392" />
            <path d="M80 392 C220 292, 400 272, 560 295 C740 320, 900 370, 1120 440" />
            <path d="M150 430 C300 340, 460 320, 620 342 C800 368, 940 412, 1100 480" />
            <path d="M90 330 C220 230, 390 205, 540 226 C730 252, 880 312, 1080 386" />
          </g>
          <g fill="rgba(255,255,255,.22)" stroke="rgba(31,58,95,.07)" strokeWidth="1">
            <circle cx="280" cy="300" r="10" />
            <circle cx="560" cy="260" r="12" />
            <circle cx="840" cy="332" r="10" />
            <circle cx="980" cy="420" r="12" />
          </g>
        </svg>

        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Mission and vision</h2>
            <p className={styles.subtitle}>
              Core text stays visible. The right panel flips for depth - no overlays.
            </p>
          </div>
          <div className={styles.hint}>Click "Flip" to reveal more.</div>
        </div>

        <svg className={styles.thread} viewBox="0 0 600 120" aria-hidden="true">
          <defs>
            <linearGradient id="aboutMissionThread" x1="0" x2="1">
              <stop offset="0" stopColor="#A8C7E6" stopOpacity="0.75" />
              <stop offset="1" stopColor="#3F7F72" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M40 70 C160 20, 240 20, 300 60 C360 100, 440 100, 560 50"
            fill="none"
            stroke="rgba(31,58,95,.12)"
            strokeWidth="3"
          />
          <path
            d="M40 70 C160 20, 240 20, 300 60 C360 100, 440 100, 560 50"
            fill="none"
            stroke="url(#aboutMissionThread)"
            strokeWidth="2"
            opacity="0.9"
          />
          <circle cx="150" cy="34" r="8" fill="rgba(255,255,255,.60)" stroke="rgba(31,58,95,.14)" />
          <circle cx="300" cy="60" r="10" fill="rgba(168,199,230,.28)" stroke="rgba(31,58,95,.14)" />
          <circle cx="450" cy="90" r="8" fill="rgba(63,127,114,.22)" stroke="rgba(63,127,114,.38)" />
        </svg>

        <div className={styles.grid}>
          <article className={missionClassName} id="about-mission">
            <div className={styles.left}>
              <div className={styles.label}>
                <span className={styles.dot} aria-hidden="true" />
                OUR MISSION
              </div>
              <p className={styles.text}>
                To make high-quality research communication learnable, accessible, and repeatable -
                so strong work is judged on merit, not on privilege, polish, or insider knowledge.
              </p>
              <div className={styles.pillrow}>
                <span className={styles.pill}>Equity at scale</span>
                <span className={styles.pill}>Integrity at the core</span>
                <span className={styles.pill}>Humans accountable</span>
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.flip}>
                <div className={styles.flipInner}>
                  <div className={`${styles.face} ${styles.front}`}>
                    <div>
                      <div className={styles.minihead}>In 10 seconds</div>
                      <p className={styles.mini}>
                        Communication should be a skill anyone can learn - not a privilege.
                      </p>
                    </div>
                    <div className={styles.handle}>
                      <span>Flip for "in practice"</span>
                      <button
                        className={styles.flipbtn}
                        type="button"
                        onClick={() =>
                          setFlipped((prev) => ({ ...prev, mission: !prev.mission }))
                        }
                        aria-pressed={flipped.mission}
                      >
                        Flip <span className={styles.chev} aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className={`${styles.face} ${styles.back}`}>
                    <div>
                      <div className={styles.minihead}>In practice</div>
                      <div className={styles.mini}>
                        <ul>
                          <li>Teach clarity through structure and templates.</li>
                          <li>Give feedback that transfers to future work.</li>
                          <li>Keep boundaries explicit and accountable.</li>
                        </ul>
                      </div>
                    </div>
                    <div className={styles.handle}>
                      <span>Back to summary</span>
                      <button
                        className={styles.flipbtn}
                        type="button"
                        onClick={() =>
                          setFlipped((prev) => ({ ...prev, mission: !prev.mission }))
                        }
                        aria-pressed={flipped.mission}
                      >
                        Flip <span className={styles.chev} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className={visionClassName} id="about-vision">
            <div className={styles.left}>
              <div className={styles.label}>
                <span className={`${styles.dot} ${styles.dotGreen}`} aria-hidden="true" />
                OUR VISION
              </div>
              <p className={styles.text}>
                A research ecosystem where communication is treated as a core research skill - not
                a gatekeeping obstacle - and where researchers everywhere can publish, present, and
                lead with clarity and integrity.
              </p>
              <div className={styles.pillrow}>
                <span className={styles.pill}>Skill</span>
                <span className={styles.pill}>Standards</span>
                <span className={styles.pill}>Reach</span>
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.flip}>
                <div className={styles.flipInner}>
                  <div className={`${styles.face} ${styles.front}`}>
                    <div>
                      <div className={styles.minihead}>In 10 seconds</div>
                      <p className={styles.mini}>
                        Communication becomes core capability - across disciplines and geographies.
                      </p>
                    </div>
                    <div className={styles.handle}>
                      <span>Flip for "we are building"</span>
                      <button
                        className={styles.flipbtn}
                        type="button"
                        onClick={() =>
                          setFlipped((prev) => ({ ...prev, vision: !prev.vision }))
                        }
                        aria-pressed={flipped.vision}
                      >
                        Flip <span className={styles.chev} aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className={`${styles.face} ${styles.back}`}>
                    <div>
                      <div className={styles.minihead}>We are building toward</div>
                      <div className={styles.mini}>
                        <ul>
                          <li>Communication literacy that scales.</li>
                          <li>Ethical pathways that reduce risk.</li>
                          <li>Researchers empowered to mentor others.</li>
                        </ul>
                      </div>
                    </div>
                    <div className={styles.handle}>
                      <span>Back to summary</span>
                      <button
                        className={styles.flipbtn}
                        type="button"
                        onClick={() =>
                          setFlipped((prev) => ({ ...prev, vision: !prev.vision }))
                        }
                        aria-pressed={flipped.vision}
                      >
                        Flip <span className={styles.chev} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
