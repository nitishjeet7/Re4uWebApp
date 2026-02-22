"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

const FAQS = [
  {
    q: "What is editing in research?",
    one: "Editing improves clarity, flow, and correctness—without changing your research meaning.",
    bullets: [
      "<strong>We do:</strong> clarity rewrites, flow fixes, grammar/copyediting, consistency checks.",
      "<strong>You get:</strong> Track Changes + clean copy + brief editor notes.",
      "<strong>We do not:</strong> rewrite findings or add new claims.",
    ],
  },
  {
    q: "Do you edit scientific manuscripts?",
    one: "Yes—and not only STEM. We edit all disciplines and match editors to your field.",
    bullets: [
      "<strong>We do:</strong> research articles, reviews, theses, grants, humanities, and social sciences.",
      "<strong>You get:</strong> an editor who understands discipline conventions and voice.",
      "<strong>We do not:</strong> make journal decisions for acceptance.",
    ],
  },
  {
    q: "Will editing guarantee acceptance?",
    one: "No. Journals decide acceptance; editing removes language friction so reviewers focus on research.",
    bullets: [
      "<strong>We do:</strong> make writing clearer so reviewers read your work, not the wording.",
      "<strong>You get:</strong> fewer avoidable clarity and language objections.",
      "<strong>We do not:</strong> promise acceptance or “guaranteed publication.”",
    ],
  },
  {
    q: "What files do you accept (Word/LaTeX)?",
    one: "We accept Word and support LaTeX workflows—the right format depends on your venue.",
    bullets: [
      "<strong>We do:</strong> Word edits via Track Changes and LaTeX-safe workflows that preserve citations.",
      "<strong>You get:</strong> output fitted to your submission system and instructions.",
      "<strong>We do not:</strong> require one format when your venue requires another.",
    ],
  },
  {
    q: "Can I request UK/US English?",
    one: "Yes. Choose UK or US English—we keep spelling, punctuation, and style consistent.",
    bullets: [
      "<strong>We do:</strong> enforce one variety across the manuscript (no mixed spelling).",
      "<strong>You get:</strong> consistent, journal-ready tone.",
      "<strong>We do not:</strong> “over-fancy” the language or change your voice.",
    ],
  },
  {
    q: "Is there any free research paper editing service?",
    one: "Free tools help with surface errors; full, discipline-aware editing is usually paid.",
    bullets: [
      "<strong>Free helps:</strong> basic grammar/spelling checks and quick cleanup.",
      "<strong>Risk:</strong> tools can miss context or hallucinate near claims/citations.",
      "<strong>Best workflow:</strong> use tools early, bring in a human editor when submission is near.",
    ],
  },
];

const truthChips = [
  "No acceptance guarantees",
  "Meaning preserved",
  "Track Changes + clean copy",
  "Word + LaTeX workflows",
  "UK/US English",
];

const quickScanDefaults = ["Clarity", "Flow", "Language", "Grammar"];

export function EditingFaqsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [quickScanForm, setQuickScanForm] = useState({
    name: "",
    mobile: "",
    email: "",
    deadline: "Standard",
    wordCount: "",
    consent: false,
  });
  const [quickScanFocus, setQuickScanFocus] = useState([...quickScanDefaults]);
  const [showError, setShowError] = useState(false);
  const activeItem = useMemo(() => (openIndex !== null ? FAQS[openIndex] : null), [openIndex]);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const toggleFocus = (value: string) => {
    setQuickScanFocus((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const openModal = () => {
    setModalOpen(true);
    setShowError(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleQuickScanSubmit = () => {
    const { name, mobile, email, consent } = quickScanForm;
    const valid = name.trim().length > 1 && mobile.trim().length > 6 && email.includes("@") && consent;
    setShowError(!valid);
    if (!valid) return;
    closeModal();
  };

  return (
    <section className={styles.section} id="faqs-tight">
      <div className={styles.container}>
        <div className={styles.faqsCard}>
          <span className={styles.faqsPill}>
            <span className={styles.faqsDot} aria-hidden="true" />
            FAQs (fast answers)
          </span>
          <h2 className={styles.faqsTitle}>FAQs</h2>
          <p className={styles.faqsSub}>
            You don’t need a long guide. These answers cover the only questions people still ask after reading the page.
          </p>

          <div className={styles.faqsGrid}>
            <article className={styles.faqsPanel}>
              <div className={styles.faqList}>
                {FAQS.map((item, index) => (
                  <div
                    key={item.q}
                    className={`${styles.faqItem} ${openIndex === index ? styles.faqItemOpen : ""}`}
                  >
                    <button
                      type="button"
                      className={styles.faqQuestion}
                      aria-expanded={openIndex === index}
                      aria-controls={`faq-${index}`}
                      id={`faq-btn-${index}`}
                      onClick={() => toggleItem(index)}
                    >
                      <div className={styles.faqQuestionMain}>
                        <span className={styles.faqQuestionDot} aria-hidden="true" />
                        <div className={styles.faqQuestionText}>
                          <span className={styles.faqQuestionTitle}>{item.q}</span>
                          <span className={styles.faqQuestionOne}>{item.one}</span>
                        </div>
                      </div>
                      <span className={styles.faqChevron} aria-hidden="true">
                        ↕
                      </span>
                    </button>
                    <div
                      className={styles.faqAnswer}
                      id={`faq-${index}`}
                      role="region"
                      aria-labelledby={`faq-btn-${index}`}
                      style={{ maxHeight: openIndex === index ? "200px" : "0px" }}
                    >
                      <div className={styles.faqAnswerInner}>
                        <ul>
                          {item.bullets.map((bullet) => (
                            <li key={bullet} dangerouslySetInnerHTML={{ __html: bullet }} />
                          ))}
                        </ul>
                        <button
                          type="button"
                          className={styles.faqMiniLink}
                          onClick={openModal}
                        >
                          Still unsure? Get a quote
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.faqsPanelSticky}>
              <div className={styles.faqsTruthTop}>
                <div>
                  <h3 className={styles.faqsTruthTitle}>Quick truths (no hype)</h3>
                  <p className={styles.faqsTruthSub}>
                    Editing removes language friction so reviewers understand your work faster—your research stays yours.
                  </p>
                </div>
                <span className={styles.faqsPill}>
                  <span className={styles.faqsDot} aria-hidden="true" />
                  Ethics-first
                </span>
              </div>
              <div className={styles.faqsChips}>
                {truthChips.map((chip) => (
                  <span key={chip} className={styles.faqsChip}>
                    <span className={styles.faqsChipDot} aria-hidden="true" />
                    {chip}
                  </span>
                ))}
              </div>
              <div className={styles.faqsCallout}>
                <strong>Close to submission?</strong> Human editing often saves a full round of reviewer comments on language and clarity.
              </div>
              <div className={styles.faqsButtons}>
                <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={openModal}>
                  Get a quote
                </button>
                <button type="button" className={styles.btn} onClick={openModal}>
                  Quick scan recommendation
                </button>
              </div>
              <div className={styles.faqsTrust}>
                <span><i aria-hidden="true" /></span>
                <span><i aria-hidden="true" /></span>
                <span><i aria-hidden="true" /></span>
                <span><i aria-hidden="true" /></span>
              </div>
              <p className={styles.faqsMini}>
                Tip: wire “Get a quote” to your existing quote modal trigger.
              </p>
            </article>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className={styles.faqModalOverlay} role="presentation" onClick={closeModal}>
          <div className={styles.faqModal} role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
            <div className={styles.faqModalHeader}>
              <div>
                <span className={styles.faqsPill}>
                  <span className={styles.faqsDot} aria-hidden="true" />
                  Quick scan recommendation
                </span>
                <p className={styles.faqsMini} style={{ marginTop: 6 }}>
                  Upload your file or share a word count. We’ll recommend the right depth and quote in <strong>1-2 hours</strong>.
                </p>
              </div>
              <button type="button" className={styles.faqModalClose} onClick={closeModal}>
                Close
              </button>
            </div>
            <div className={styles.faqModalBody}>
              <div className={styles.faqModalGrid}>
                <div className={styles.faqModalPanel}>
                  <h4 className={styles.faqsTruthTitle}>What we’ll do</h4>
                  <p className={styles.faqsTruthSub}>
                    A fast, human-led scan to avoid under-editing or overpaying.
                  </p>
                  <div className={styles.faqsChips}>
                    <span className={styles.faqsChip}><span className={styles.faqsChipDot} />Recommend plan depth</span>
                    <span className={styles.faqsChip}><span className={styles.faqsChipDot} />Flag clarity risks</span>
                    <span className={styles.faqsChip}><span className={styles.faqsChipDot} />Turnaround estimate</span>
                    <span className={styles.faqsChip}><span className={styles.faqsChipDot} />Quote within 1-2 hrs</span>
                  </div>
                  <div className={styles.faqsCallout}>
                    <strong>Pre-selected focus:</strong> Clarity, Flow, Language, Grammar. You can change these on the right.
                  </div>
                  <div className={styles.faqsTrust}>
                    <span><i aria-hidden="true" /></span>
                    <span><i aria-hidden="true" /></span>
                    <span><i aria-hidden="true" /></span>
                    <span><i aria-hidden="true" /></span>
                  </div>
                </div>

                <div className={styles.faqModalPanel}>
                  <h4 className={styles.faqsTruthTitle}>Your details</h4>
                  <p className={styles.faqsTruthSub}>We use this only to respond with the recommendation.</p>
                  <div className={styles.faqModalFormGrid}>
                    <label className={styles.faqModalField}>
                      <span>Full name</span>
                      <input
                        className={styles.faqModalInput}
                        value={quickScanForm.name}
                        onChange={(event) =>
                          setQuickScanForm((prev) => ({ ...prev, name: event.target.value }))
                        }
                        placeholder="Your name"
                      />
                    </label>
                    <label className={styles.faqModalField}>
                      <span>Mobile</span>
                      <input
                        className={styles.faqModalInput}
                        value={quickScanForm.mobile}
                        onChange={(event) =>
                          setQuickScanForm((prev) => ({ ...prev, mobile: event.target.value }))
                        }
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </label>
                    <label className={styles.faqModalField} style={{ gridColumn: "1 / -1" }}>
                      <span>Email</span>
                      <input
                        className={styles.faqModalInput}
                        value={quickScanForm.email}
                        onChange={(event) =>
                          setQuickScanForm((prev) => ({ ...prev, email: event.target.value }))
                        }
                        placeholder="you@example.com"
                      />
                    </label>
                    <label className={styles.faqModalField} style={{ gridColumn: "1 / -1" }}>
                      <span>Upload file (optional)</span>
                      <input className={styles.faqModalInput} type="file" onChange={() => {}} />
                    </label>
                    <label className={styles.faqModalField}>
                      <span>Word count (if no file)</span>
                      <input
                        className={styles.faqModalInput}
                        value={quickScanForm.wordCount}
                        onChange={(event) =>
                          setQuickScanForm((prev) => ({ ...prev, wordCount: event.target.value }))
                        }
                        placeholder="e.g., 3,500"
                      />
                    </label>
                    <label className={styles.faqModalField}>
                      <span>Deadline</span>
                      <select
                        className={styles.faqModalInput}
                        value={quickScanForm.deadline}
                        onChange={(event) =>
                          setQuickScanForm((prev) => ({ ...prev, deadline: event.target.value }))
                        }
                      >
                        <option>Standard</option>
                        <option>Rush (48 hrs)</option>
                        <option>Urgent (24-72 hrs)</option>
                      </select>
                    </label>
                  </div>
                  <div className={styles.faqsChecksGrid}>
                    {[...new Set([...quickScanDefaults, ...quickScanFocus])].map((option) => (
                      <label key={option} className={styles.faqsCheck}>
                        <input
                          type="checkbox"
                          checked={quickScanFocus.includes(option)}
                          onChange={() => toggleFocus(option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                  <label className={styles.faqsConsent}>
                    <input
                      type="checkbox"
                      checked={quickScanForm.consent}
                      onChange={(event) =>
                        setQuickScanForm((prev) => ({ ...prev, consent: event.target.checked }))
                      }
                    />
                    I consent to be contacted for this quote.
                  </label>
                  {showError && (
                    <div className={styles.faqsError}>
                      Please fill name/mobile/email and give consent.
                    </div>
                  )}
                  <div className={styles.faqsModalActions}>
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.btnPrimary}`}
                      onClick={handleQuickScanSubmit}
                    >
                      Submit for recommendation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
