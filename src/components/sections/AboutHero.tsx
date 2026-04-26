import styles from "./AboutHero.module.css";
import type { CSSProperties } from "react";

export function AboutHero() {
  const heroStyle = {
    "--about-hero-bg": "url('/images/about-us-image.png')",
  } as CSSProperties;

  return (
    <section className={styles.hero} aria-label="About hero" style={heroStyle}>
      <div className={styles.heroInner}>
        <div className={styles.content} role="region" aria-label="Hero content">
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
