import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { EditingDiagnosticPreview } from "./EditingDiagnosticPreview";
import { EditingStagesPreview } from "./EditingStagesPreview";
import { EditingPlansPricingPreview } from "./EditingPlansPricingPreview";
import { EditingHowItWorks } from "./EditingHowItWorks";
import { EditingSelfCheck } from "./EditingSelfCheck";
import { EditingResearchStyle } from "./EditingResearchStyle";
import { EditingProofSection } from "./EditingProofSection";
import { EditingFreeToolsSection } from "./EditingFreeToolsSection";
import { EditingFaqsSection } from "./EditingFaqsSection";
import { BookNowModal } from "@/components/sections/BookNowModal";

const heroBullets = [
  "Meaning-safe editing with no idea distortion.",
  "Track Changes, clean copy, and editor notes in every delivery.",
  "Discipline-aware language support for papers, theses, and proposals.",
];

export const metadata: Metadata = {
  title: "Editing Support | Researchedit4u",
  description:
    "Editing support with clear quality checks, staged depth options, transparent plans, workflow, and FAQs.",
};

export default function EditingSupportPage() {
  return (
    <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroCard}>
              <div className={styles.heroInner}>
                <div className={styles.heroTop}>
                  <div className={styles.heroContent}>
                    <p className={styles.kicker}>
                      <span className={styles.dot} aria-hidden="true" />
                      Editing Support by ResearchEdit4U
                    </p>
                    <h1 className={styles.heroTitle}>
                      Research Editing Support for Clear, Submission-Ready Writing
                    </h1>
                    <p className={`${styles.heroSub} ${styles.oneLineSub}`}>
                      Improve clarity, flow, and academic tone without changing your meaning.
                    </p>
                    <ul className={styles.heroBullets}>
                      {heroBullets.map((item) => (
                        <li key={item} className={styles.heroBullet}>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className={styles.heroActions}>
                      <BookNowModal
                        source="editing-support-hero"
                        triggerLabel="Upload Draft for Quote"
                        triggerClassName={`${styles.btn} ${styles.btnPrimary}`}
                      />
                      <a href="#stages" className={styles.btn}>
                        View Editing Levels
                      </a>
                    </div>
                    <div className={styles.pillRow}>
                      <span className={styles.pill}>Track Changes</span>
                      <span className={styles.pill}>Clean Copy</span>
                      <span className={styles.pill}>Editor Notes</span>
                      <span className={styles.pill}>Confidential</span>
                    </div>
                  </div>

                  <aside className={styles.heroVisual} aria-label="Editing support preview">
                    <div className={styles.heroMediaWrap}>
                      <Image
                        src="/images/services/editing-support-hero.jpg"
                        alt="Editing support sample visual"
                        width={920}
                        height={420}
                        className={styles.heroMedia}
                      />
                    </div>
                  </aside>
                </div>

                <div className={styles.exampleWrap}>
                  <div className={styles.exampleHead}>
                    <strong>Before-and-after snapshot</strong>
                    <span>Focus: clarity and flow</span>
                  </div>
                  <div className={styles.exampleGrid}>
                    <article className={styles.exampleCard}>
                      <h3>Before</h3>
                      <p>
                        Dense research writing can hide the core message, especially when long
                        sentences stack multiple claims without clear links.
                      </p>
                    </article>
                    <article className={styles.exampleCard}>
                      <h3>After</h3>
                      <p>
                        Clear phrasing improves comprehension. We shorten dense lines, add logical
                        transitions, and make each claim easier to follow.
                      </p>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <EditingDiagnosticPreview />

        <EditingStagesPreview />

        <EditingPlansPricingPreview />

        <EditingHowItWorks />

        <EditingSelfCheck />

        <EditingResearchStyle />

        <EditingProofSection />

        <EditingFreeToolsSection />

        <EditingFaqsSection />

        <section className={styles.finalCta} id="final-cta">
          <div className={styles.container}>
            <div className={styles.finalCard}>
              <h2 className={styles.finalTitle}>Ready to submit a clearer, stronger manuscript?</h2>
              <p className={styles.finalText}>
                Share your draft for a fast quote and the right editing level. You get transparent
                pricing, clear timelines, and practical outputs.
              </p>
              <div className={styles.heroActions}>
                <Link href="/contact" className={`${styles.btn} ${styles.btnPrimary}`}>
                  Start with a Quote
                </Link>
                <Link href="/" className={styles.btn}>
                  Explore All Services
                </Link>
              </div>
            </div>
          </div>
        </section>
    </main>
  );
}
