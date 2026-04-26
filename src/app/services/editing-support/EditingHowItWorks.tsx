"use client";

import styles from "./page.module.css";

const youSteps = [
  {
    id: 1,
    title: "Upload & choose plan + deadline",
    detail: "Send your manuscript and pick the depth that matches your stress level and timeline.",
  },
  {
    id: 2,
    title: "Complete secure payment",
    detail: "You see pricing before you pay—no surprises or hidden fees.",
  },
  {
    id: 3,
    title: "Review Track Changes",
    detail: "Scan edits, comments, and clarity improvements at your own pace.",
  },
  {
    id: 4,
    title: "Accept/reject + finalize",
    detail: "Decide what stays, what goes, and submit with confidence.",
  },
];

const weSteps = [
  {
    id: 1,
    title: "Confirm scope + match editor",
    detail: "We pair your paper with an editor who understands your discipline and tone.",
  },
  {
    id: 2,
    title: "Start editing immediately",
    detail: "Once confirmed, we begin—no unnecessary emails or delays.",
  },
  {
    id: 3,
    title: "Provide comments + clean copy",
    detail: "You receive Track Changes, editor notes, and a submission-ready clean version.",
  },
  {
    id: 4,
    title: "Support during recheck window",
    detail: "If supervisors request changes, we help within the agreed recheck period.",
  },
];

export function EditingHowItWorks({ titleClassName }: { titleClassName?: string }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.howItWorksCard}>
          <span className={styles.howItWorksPill}>
            <span className={styles.howItWorksDot} aria-hidden="true" />
            Reduces anxiety
          </span>
          <h2 className={`${styles.sectionTitle} ${titleClassName ?? ""}`}>
            How it works (no back-and-forth, no confusion)
          </h2>
          <p className={styles.sectionSub}>Two clear lanes so you always know who does what.</p>

          <div className={styles.howItWorksGrid} role="table" aria-label="You versus We steps">
            <article className={styles.howItWorksColumn} role="rowgroup" aria-label="You do">
              <header className={styles.howItWorksHeader}>
                <div className={styles.howItWorksHeaderTitle}>
                  <span className={styles.howItWorksAvatar} aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M20 21a8 8 0 1 0-16 0" />
                      <path d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
                    </svg>
                  </span>
                  You do
                </div>
                <span className={styles.howItWorksBadge}>Fast + simple</span>
              </header>
              <div className={styles.howItWorksRows}>
                {youSteps.map((step) => (
                  <div key={`you-${step.id}`} className={styles.howItWorksRow} role="row">
                    <span className={styles.howItWorksStepNum}>{step.id}</span>
                    <div>
                      <div className={styles.howItWorksRowTitle}>{step.title}</div>
                      <p className={styles.howItWorksRowDesc}>{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.howItWorksColumn} role="rowgroup" aria-label="We do">
              <header className={styles.howItWorksHeader}>
                <div className={styles.howItWorksHeaderTitle}>
                  <span className={styles.howItWorksAvatar} aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 3l8 4v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z" />
                      <path d="M9 12l2 2 4-5" />
                    </svg>
                  </span>
                  We do
                </div>
                <span className={styles.howItWorksBadge}>Human editors</span>
              </header>
              <div className={styles.howItWorksRows}>
                {weSteps.map((step) => (
                  <div key={`we-${step.id}`} className={styles.howItWorksRow} role="row">
                    <span className={styles.howItWorksStepNum}>{step.id}</span>
                    <div>
                      <div className={styles.howItWorksRowTitle}>{step.title}</div>
                      <p className={styles.howItWorksRowDesc}>{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className={styles.howItWorksLinkRow}>
            <div className={styles.howItWorksReassure} role="note" aria-label="Reassurance">
              <span className={styles.howItWorksShield} aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3l8 4v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z" />
                  <path d="M9 12l2 2 4-5" />
                </svg>
              </span>
              <div>
                <div>
                  <strong>You stay in control.</strong> Every change is visible.
                </div>
                <p className={styles.howItWorksRowDesc} style={{ marginTop: "4px" }}>
                  Nothing is hidden. You approve the final wording.
                </p>
              </div>
            </div>

            <div className={styles.howItWorksKw}>
              It is like having a <strong>research paper editor online</strong>—but with human judgment.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
