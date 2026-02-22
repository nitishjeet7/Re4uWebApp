import styles from "./AboutHero.module.css";

export function AboutHero() {
  return (
    <section className={styles.hero} aria-label="About hero">
      <div className={styles.heroArt} aria-hidden="true">
        <div className={styles.bokeh} />
        <svg className={styles.artWing} viewBox="0 0 820 520" aria-hidden="true">
          <defs>
            <linearGradient id="wg" x1="0" x2="1">
              <stop offset="0" stopColor="#A8C7E6" stopOpacity="0.65" />
              <stop offset="1" stopColor="#3F7F72" stopOpacity="0.4" />
            </linearGradient>
            <filter id="wblur">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
          </defs>

          <path
            d="M120,360 C240,240 360,180 520,170 C650,160 740,220 780,290 C720,250 640,250 560,270 C470,295 380,350 280,420 C210,470 130,460 90,430 C70,415 68,385 120,360 Z"
            fill="rgba(255,255,255,.28)"
            stroke="rgba(31,58,95,.08)"
            strokeWidth="2"
          />

          <g stroke="rgba(31,58,95,.14)" strokeWidth="2" fill="none">
            <path d="M165 395 C260 320, 340 280, 430 265 C540 245, 650 265, 740 315" />
            <path d="M185 420 C280 355, 360 320, 460 305 C565 288, 660 305, 760 350" />
            <path d="M210 445 C310 395, 400 360, 510 348 C620 335, 700 348, 780 382" />
          </g>

          <g filter="url(#wblur)">
            <g>
              <circle cx="165" cy="395" r="10" fill="url(#wg)" stroke="rgba(31,58,95,.10)" />
              <circle cx="260" cy="320" r="8" fill="rgba(255,255,255,.50)" stroke="rgba(31,58,95,.10)" />
              <circle cx="340" cy="280" r="7" fill="rgba(255,255,255,.46)" stroke="rgba(31,58,95,.10)" />
              <circle cx="430" cy="265" r="9" fill="rgba(255,255,255,.50)" stroke="rgba(31,58,95,.10)" />
              <circle cx="540" cy="245" r="7" fill="rgba(255,255,255,.46)" stroke="rgba(31,58,95,.10)" />
              <circle cx="650" cy="265" r="8" fill="rgba(255,255,255,.48)" stroke="rgba(31,58,95,.10)" />
              <circle cx="740" cy="315" r="10" fill="url(#wg)" stroke="rgba(31,58,95,.10)" />
            </g>
            <g>
              <circle cx="185" cy="420" r="8" fill="rgba(255,255,255,.48)" stroke="rgba(31,58,95,.10)" />
              <circle cx="280" cy="355" r="7" fill="rgba(255,255,255,.48)" stroke="rgba(31,58,95,.10)" />
              <circle cx="360" cy="320" r="9" fill="url(#wg)" stroke="rgba(31,58,95,.10)" />
              <circle cx="460" cy="305" r="7" fill="rgba(255,255,255,.50)" stroke="rgba(31,58,95,.10)" />
              <circle cx="565" cy="288" r="7" fill="rgba(255,255,255,.46)" stroke="rgba(31,58,95,.10)" />
              <circle cx="660" cy="305" r="8" fill="rgba(255,255,255,.46)" stroke="rgba(31,58,95,.10)" />
              <circle cx="760" cy="350" r="9" fill="rgba(255,255,255,.50)" stroke="rgba(31,58,95,.10)" />
            </g>
            <g>
              <circle cx="210" cy="445" r="7" fill="rgba(255,255,255,.46)" stroke="rgba(31,58,95,.10)" />
              <circle cx="310" cy="395" r="8" fill="rgba(255,255,255,.46)" stroke="rgba(31,58,95,.10)" />
              <circle cx="400" cy="360" r="7" fill="rgba(255,255,255,.46)" stroke="rgba(31,58,95,.10)" />
              <circle cx="510" cy="348" r="9" fill="url(#wg)" stroke="rgba(31,58,95,.10)" />
              <circle cx="620" cy="335" r="7" fill="rgba(255,255,255,.46)" stroke="rgba(31,58,95,.10)" />
              <circle cx="700" cy="348" r="8" fill="rgba(255,255,255,.46)" stroke="rgba(31,58,95,.10)" />
              <circle cx="780" cy="382" r="7" fill="rgba(255,255,255,.46)" stroke="rgba(31,58,95,.10)" />
            </g>
          </g>
        </svg>

        <svg className={styles.artAtlas} viewBox="0 0 980 420" aria-hidden="true">
          <defs>
            <filter id="ablur">
              <feGaussianBlur stdDeviation="0.8" />
            </filter>
          </defs>
          <g filter="url(#ablur)" fill="none" stroke="rgba(31,58,95,.10)" strokeWidth="2">
            <path d="M80 300 C180 210, 320 180, 470 195 C620 210, 760 270, 900 330" />
            <path d="M60 330 C190 250, 330 225, 480 242 C635 260, 760 310, 920 360" />
            <path d="M90 360 C210 295, 350 275, 500 290 C645 305, 780 345, 940 392" />
            <path d="M40 290 C160 205, 300 160, 450 170 C620 182, 760 240, 920 315" />
          </g>
          <g fill="rgba(255,255,255,.26)" stroke="rgba(31,58,95,.07)" strokeWidth="1">
            <circle cx="220" cy="250" r="10" />
            <circle cx="470" cy="195" r="12" />
            <circle cx="690" cy="290" r="10" />
            <circle cx="820" cy="345" r="12" />
          </g>
        </svg>
      </div>

      <div className={styles.heroInner}>
        <div className={styles.glass} role="region" aria-label="Hero content">
          <h1 className={styles.title}>Where good research finds wings.</h1>

          <div className={styles.divider} />

          <div className={styles.pillars} aria-label="Pillars">
            <span>Equity at scale. Integrity at the core.</span>
            <span>Humans accountable.</span>
          </div>

          <div className={styles.divider} />

          <div className={styles.question}>
            Is your research judged on merit &mdash; or on how it&#39;s communicated?
          </div>

          <p className={styles.desc}>
            ResearchEdit4U exists to reduce communication inequity in research &mdash; without lowering
            standards. We use responsible tools to widen access to high-quality scientific communication, but
            we never outsource judgment to automation. Our work stays human-led, accountable, and ethically
            bounded.
          </p>

          <div className={styles.chips} aria-label="Pillar chips">
            <span className={styles.chip}>Equity at scale</span>
            <span className={styles.chip}>Integrity at the core</span>
            <span className={styles.chip}>Humans accountable</span>
          </div>
        </div>
      </div>
    </section>
  );
}
