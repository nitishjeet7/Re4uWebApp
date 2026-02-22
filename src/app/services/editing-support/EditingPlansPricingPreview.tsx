"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./page.module.css";

type Plan = {
  key: string;
  tag: string;
  tagTone?: "best" | "premium";
  title: string;
  promise: string;
  bestFor: string;
  price: string;
  per: string;
  turnaround: string;
  rush: string;
  points: string[];
  badge: string;
};

type CompareRow = {
  label: string;
  note?: string;
  standard: number | string;
  advanced: number | string;
  scientific: number | string;
};

const plans: Plan[] = [
  {
    key: "standard",
    tag: "Standard",
    title: "Standard English Editing",
    promise: "Make it clean, correct, and professional.",
    bestFor: '"My paper is okay - I just want it polished."',
    price: "INR 1,499",
    per: "per 1,000 words",
    turnaround: "Turnaround: 48-72 hrs",
    rush: "Rush: 24 hrs (add-on)",
    points: ["Grammar + academic tone", "Light consistency (tense, terminology)", "Proofreading pass"],
    badge: "Final polish",
  },
  {
    key: "advanced",
    tag: "Most chosen",
    tagTone: "best",
    title: "Advanced Editing (Clarity + Flow)",
    promise: "Make your writing easier to follow and harder to reject.",
    bestFor: '"I am worried reviewers will not get my point."',
    price: "INR 2,499",
    per: "per 1,000 words",
    turnaround: "Turnaround: 3-5 days",
    rush: "Rush: 48 hrs (add-on)",
    points: [
      "Clarity rewrites (meaning preserved)",
      "Flow + coherence improvements",
      "Wordiness reduction + second-pass QA",
    ],
    badge: "Flow + clarity",
  },
  {
    key: "scientific",
    tag: "Highest confidence",
    tagTone: "premium",
    title: "Scientific/Substantive Editing (Structure + Logic)",
    promise: "Strengthen the story, logic, and argument like a senior editor.",
    bestFor: '"High-stakes submission. I want maximum confidence."',
    price: "INR 3,999",
    per: "per 1,000 words",
    turnaround: "Turnaround: 5-7 days",
    rush: "Rush: 72 hrs (limited)",
    points: [
      "Structure/argument suggestions (section logic)",
      "Substantive clarity + flow rewrites",
      "Copyediting + proofreading + second-pass QA",
    ],
    badge: "Structure + logic",
  },
];

const compareRows: CompareRow[] = [
  { label: "Grammar + academic tone", standard: 2, advanced: 3, scientific: 3 },
  { label: "Clarity rewrites", standard: 1, advanced: 2, scientific: 3 },
  { label: "Flow + coherence", standard: 1, advanced: 2, scientific: 3 },
  { label: "Wordiness reduction", standard: 1, advanced: 2, scientific: 3 },
  { label: "Structure/argument suggestions", standard: "-", advanced: 1, scientific: 3 },
  { label: "Second-pass QA", standard: 1, advanced: 2, scientific: 3 },
  { label: "Recheck window", standard: "3 days", advanced: "7 days", scientific: "14 days" },
  {
    label: "Publication-ready formatting",
    note: "(add-on)",
    standard: "Optional",
    advanced: "Optional",
    scientific: "Recommended",
  },
];

const improvements = [
  "Clarity",
  "Flow",
  "Language",
  "Grammar",
  "Copyediting",
  "Formatting (submission-ready)",
];

const addOn = {
  title: "Publication-ready Formatting (Add-on)",
  description:
    "Ideal for final submission or resubmission: headings, spacing, reference formatting, tables/figures alignment, and a submission-ready layout.",
  price: "INR 999",
  per: "depends on journal template",
};

export function EditingPlansPricingPreview({ titleClassName }: { titleClassName?: string }) {
  const compareRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(plans[1].title);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [selectedChecks, setSelectedChecks] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const openModal = (planName: string) => {
    setSelectedPlan(planName);
    setName("");
    setMobile("");
    setEmail("");
    setConsent(false);
    setSelectedChecks([]);
    setModalOpen(true);
    setSubmitted(false);
    setError(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleScrollCompare = () => {
    compareRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleToggleCheck = (value: string) => {
    setSelectedChecks((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
    setError(false);
  };

  const handleSubmit = () => {
    const ok =
      name.trim().length > 1 &&
      mobile.trim().length > 6 &&
      email.trim().includes("@") &&
      consent &&
      selectedChecks.length >= 1;
    setError(!ok);
    if (!ok) return;
    setSubmitted(true);
  };

  const requestedList = useMemo(() => selectedChecks.join(", "), [selectedChecks]);

  return (
    <section className={styles.section} id="plans">
      <div className={styles.container}>
        <div className={styles.pricingCard}>
          <div className={styles.pricingHeader}>
            <div>
              <span className={styles.pricingPill}>
                <span className={styles.pricingDot} aria-hidden="true" />
                Core commercial block
              </span>
              <h2 className={`${styles.sectionTitle} ${titleClassName ?? ""}`}>
                Choose your Research Paper Editing Plan
              </h2>
              <p className={styles.sectionSub}>
                We recommend the right depth after a quick scan - so you do not overpay or
                under-edit.
              </p>
              <div className={styles.pricingNote}>
                Prices below are starting estimates. Final quote depends on word count, subject
                density, deadline, and journal requirements.
              </div>
            </div>
            <div className={styles.pricingPills}>
              <span className={styles.pricingPill}>
                <span className={styles.pricingDot} aria-hidden="true" />
                Reply in 1-2 hours
              </span>
              <span className={styles.pricingPill}>
                <span className={styles.pricingDot} aria-hidden="true" />
                Confidential workflow
              </span>
            </div>
          </div>

          <div className={styles.pricingCtaRow}>
            <button type="button" className={styles.btn} onClick={handleScrollCompare}>
              Compare plans
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => openModal(plans[1].title)}
            >
              Get exact quote
            </button>
          </div>

          <div className={styles.pricingGrid}>
            {plans.map((plan) => (
              <article key={plan.key} className={styles.pricingPlan}>
                <span
                  className={`${styles.pricingTag} ${
                    plan.tagTone === "best"
                      ? styles.pricingTagBest
                      : plan.tagTone === "premium"
                        ? styles.pricingTagPremium
                        : ""
                  }`}
                >
                  <span className={styles.pricingDot} aria-hidden="true" />
                  {plan.tag}
                </span>
                <div className={styles.pricingPlanTitle}>{plan.title}</div>
                <div className={styles.pricingPromise}>{plan.promise}</div>
                <div className={styles.pricingBestFor}>
                  <strong>Best for:</strong> {plan.bestFor}
                </div>
                <div className={styles.pricingPriceBox}>
                  <div>
                    <div className={styles.pricingSmall}>Starts from</div>
                    <div className={styles.pricingPrice}>{plan.price}</div>
                    <div className={styles.pricingSmall}>{plan.per}</div>
                  </div>
                  <span className={styles.pricingBadge}>{plan.badge}</span>
                  <div className={styles.pricingMetaRow}>
                    <span className={styles.pricingMeta}>{plan.turnaround}</span>
                    <span className={styles.pricingMeta}>{plan.rush}</span>
                  </div>
                </div>
                <ul className={styles.pricingList}>
                  {plan.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className={styles.pricingActions}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={() => openModal(plan.title)}
                  >
                    Get exact quote
                  </button>
                  <button type="button" className={styles.pricingLink} onClick={handleScrollCompare}>
                    See comparison
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div ref={compareRef} className={styles.pricingCompare}>
            <div className={styles.pricingCompareHeader}>
              <div>
                <h3>Compare by depth (what you actually care about)</h3>
                <p className={styles.pricingSmall}>High-decision rows only - no clutter.</p>
              </div>
              <span className={styles.pricingPill}>
                <span className={styles.pricingDot} aria-hidden="true" />
                Depth indicator
              </span>
            </div>
            <div className={styles.pricingTableWrap}>
              <table className={styles.pricingTable}>
                <thead>
                  <tr>
                    <th>What you get</th>
                    <th>Standard</th>
                    <th>Advanced</th>
                    <th>Scientific/Substantive</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row.label}>
                      <td>
                        <span className={styles.pricingTick}>{row.label}</span>{" "}
                        {row.note && <span className={styles.pricingSmall}>{row.note}</span>}
                      </td>
                      {[row.standard, row.advanced, row.scientific].map((cell, index) => (
                        <td key={`${row.label}-${index}`} className={styles.pricingCenter}>
                          {typeof cell === "number" ? (
                            <span
                              className={styles.pricingTier}
                              data-level={cell}
                              aria-label={`Depth ${cell}`}
                            >
                              <span />
                              <span />
                              <span />
                            </span>
                          ) : (
                            <span>{cell}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.pricingQuoteLine}>
              "Pick the depth based on your stress level and deadline - not on guilt."
            </div>

            <div className={styles.pricingAddOn}>
              <div>
                <h4>{addOn.title}</h4>
                <p className={styles.pricingSmall}>{addOn.description}</p>
              </div>
              <div className={styles.pricingAddOnMeta}>
                <div className={styles.pricingSmall}>Starts from</div>
                <div className={styles.pricingPrice}>{addOn.price}</div>
                <div className={styles.pricingSmall}>{addOn.per}</div>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={() => openModal("Formatting Add-on + Editing")}
                >
                  Get quote (with formatting)
                </button>
              </div>
            </div>

            <div className={styles.pricingNote}>
              Not sure? Pick <strong>Advanced</strong>. We will confirm the best-fit plan after a
              quick scan of your manuscript.
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className={styles.pricingOverlay} role="presentation" onClick={closeModal}>
          <div
            className={styles.pricingModal}
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.pricingModalHeader}>
              <div>
                <span className={styles.pricingPill}>
                  <span className={styles.pricingDot} aria-hidden="true" />
                  Get an exact quote
                </span>
                <p className={styles.pricingSmall}>
                  We will revert with pricing and turnaround within <strong>1-2 hours</strong>.
                </p>
              </div>
              <button type="button" className={styles.pricingClose} onClick={closeModal}>
                Close
              </button>
            </div>

            {!submitted ? (
              <div className={styles.pricingModalBody}>
                <div className={styles.pricingFormGrid}>
                  <label className={styles.pricingField}>
                    <span>Full name</span>
                    <input
                      className={styles.pricingInput}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </label>
                  <label className={styles.pricingField}>
                    <span>Mobile</span>
                    <input
                      className={styles.pricingInput}
                      value={mobile}
                      onChange={(event) => setMobile(event.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      autoComplete="tel"
                    />
                  </label>
                  <label className={styles.pricingField}>
                    <span>Email</span>
                    <input
                      className={styles.pricingInput}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </label>
                  <label className={styles.pricingField}>
                    <span>Selected plan</span>
                    <input className={styles.pricingInput} value={selectedPlan} readOnly />
                  </label>
                </div>

                <div className={styles.pricingChecks}>
                  <div className={styles.pricingCheckTitle}>What should we improve?</div>
                  <div className={styles.pricingCheckGrid}>
                    {improvements.map((item) => (
                      <label key={item} className={styles.pricingCheck}>
                        <input
                          type="checkbox"
                          checked={selectedChecks.includes(item)}
                          onChange={() => handleToggleCheck(item)}
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.pricingPrivacy}>
                  <strong>How your data is secured:</strong>
                  <ul>
                    <li>Used only to prepare a quote and deliver the service you request.</li>
                    <li>Secure transmission (HTTPS) and restricted access storage.</li>
                    <li>We do not sell or share your manuscript for marketing.</li>
                  </ul>
                </div>

                <label className={styles.pricingConsent}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                  />
                  <span>
                    <strong>I consent to be contacted for a quote.</strong>
                    <span>Consent is required to submit.</span>
                  </span>
                </label>

                {error && (
                  <div className={styles.pricingError}>
                    Please fill name/mobile/email, select at least one improvement, and give
                    consent.
                  </div>
                )}

                <div className={styles.pricingModalActions}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={handleSubmit}
                  >
                    Submit for quote
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.pricingModalBody}>
                <div className={styles.pricingSubmitted}>
                  <span className={styles.pricingPill}>
                    <span className={styles.pricingDot} aria-hidden="true" />
                    Submitted
                  </span>
                  <h3>Thanks - we have got it.</h3>
                  <p>
                    We will revert back to you with a <strong>quote within 1-2 hours</strong>.
                  </p>
                  <div className={styles.pricingSmall}>
                    <strong>Plan:</strong> {selectedPlan}
                    <br />
                    <strong>Requested:</strong> {requestedList || "—"}
                  </div>
                  <div className={styles.pricingModalActions}>
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.btnPrimary}`}
                      onClick={closeModal}
                    >
                      Done
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
