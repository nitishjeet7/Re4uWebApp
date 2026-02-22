import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import { PublicPageFrame } from "@/components/layout/PublicPageFrame";
import { EditingDiagnosticPreview } from "./EditingDiagnosticPreview";
import { EditingStagesPreview } from "./EditingStagesPreview";
import { EditingPlansPricingPreview } from "./EditingPlansPricingPreview";
import { EditingHowItWorks } from "./EditingHowItWorks";
import { EditingSelfCheck } from "./EditingSelfCheck";
import { EditingResearchStyle } from "./EditingResearchStyle";
import { EditingProofSection } from "./EditingProofSection";
import { EditingFreeToolsSection } from "./EditingFreeToolsSection";
import { EditingFaqsSection } from "./EditingFaqsSection";

const heroBullets = [
  "Meaning-safe editing with zero idea distortion.",
  "Track Changes, clean copy, and editor notes in every delivery.",
  "Discipline-aware language support for papers, theses, and proposals.",
];

export const metadata: Metadata = {
  title: "Editing Support | Researchedit4u",
  description:
    "Professional editing support page with quick preview, staged editing depth, plans, workflow, and FAQs.",
};

export default function EditingSupportPage() {
  return (
    <PublicPageFrame>
      <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={`${styles.heroCard} ${styles.heroCenter}`}>
            <div className={styles.heroInner}>
              <p className={styles.kicker}>
                <span className={styles.dot} aria-hidden="true" />
                Editing support by Researchedit4u
              </p>
              <h1 className={styles.heroTitle}>
                Editing support for research writing that must be clear and publishable
              </h1>
              <p className={styles.heroSub}>
                We refine grammar, flow, and argument readability while protecting
                your original meaning.
              </p>
              <ul className={styles.heroBullets}>
                {heroBullets.map((item) => (
                  <li key={item} className={styles.heroBullet}>
                    {item}
                  </li>
                ))}
              </ul>
              <div className={styles.heroActions}>
                <Link href="/contact" className={`${styles.btn} ${styles.btnPrimary}`}>
                  Upload draft for quote
                </Link>
                <a href="#stages" className={styles.btn}>
                  See editing depth
                </a>
              </div>
              <div className={styles.pillRow}>
                <span className={styles.pill}>Track Changes</span>
                <span className={styles.pill}>Clean Copy</span>
                <span className={styles.pill}>Editor Notes</span>
                <span className={styles.pill}>Confidential</span>
              </div>

              <div className={styles.exampleWrap}>
                <div className={styles.exampleHead}>
                  <strong>Before and after snapshot</strong>
                  <span>Focus: clarity and flow</span>
                </div>
                <div className={styles.exampleGrid}>
                  <article className={styles.exampleCard}>
                    <h3>Before</h3>
                    <p>
                      Because research writing gets dense, readers might lose track
                      of the main point, especially when long sentences carry many
                      claims without clear links.
                    </p>
                  </article>
                  <article className={styles.exampleCard}>
                    <h3>After</h3>
                    <p>
                      Dense language can hide your contribution. We shorten long
                      lines, add logical links, and make each claim easier to
                      follow in sequence.
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EditingDiagnosticPreview titleClassName="" />

      <EditingStagesPreview titleClassName="" />

      <EditingPlansPricingPreview titleClassName="" />

      <EditingHowItWorks titleClassName="" />

      <EditingSelfCheck />

      <EditingResearchStyle />

      <EditingProofSection />

      <EditingFreeToolsSection />

      <EditingFaqsSection />

      <section className={styles.finalCta} id="final-cta">
        <div className={styles.container}>
          <div className={styles.finalCard}>
            <h2 className={styles.finalTitle}>
              Ready to submit a clearer, stronger manuscript?
            </h2>
            <p className={styles.finalText}>
              Send your draft for a fast quote and a right-fit editing depth.
              You get transparent pricing, clear timelines, and practical output.
            </p>
            <div className={styles.heroActions}>
              <Link href="/contact" className={`${styles.btn} ${styles.btnPrimary}`}>
                Start with a quote
              </Link>
              <Link href="/services" className={styles.btn}>
                Explore all services
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </PublicPageFrame>
  );
}
