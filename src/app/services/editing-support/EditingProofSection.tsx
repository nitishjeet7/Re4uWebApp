"use client";

import styles from "./page.module.css";
import { BookNowModal } from "@/components/sections/BookNowModal";

const beforeText =
  "Communication is essential in everyday life and business. People constantly need to generate, organize, and pass information so that others understand expectations and take the right actions. Today, many interactions rely on technology. Smartphones and computers allow people to send messages and receive feedback through calls, texts, and emails. This paper discusses how technology influences communication by looking at common digital methods.";

const afterText =
  "Communication helps people coordinate actions and maintain relationships in daily life and work. The goal is straightforward: share information clearly enough that others can respond appropriately. Today, technology mediates much of this exchange. Smartphones and computers enable faster, more flexible communication through calls, messaging, email, and video. This paper examines how these digital methods shape speed, accessibility, tone, and the quality of feedback—without changing what people mean.";

const trackChanges = [
  {
    label: "Original",
    text: "Technology comes in handy in facilitating smooth communication among individuals or businesses; as it provides alternatives that lead to effective communication.",
    type: "del",
  },
  {
    label: "Edited",
    text: "Technology enables faster, more flexible communication among individuals and organizations by providing multiple channels suited to different needs.",
    type: "ins",
  },
];

const changeRows = [
  {
    area: "Clarity",
    desc:
      "Moved the main point earlier and removed filler phrases so readers sense the purpose faster.",
    example:
      "“Communication is essential…” → “Communication helps people coordinate actions…”",
  },
  {
    area: "Flow",
    desc:
      "Re-ordered ideas into a natural progression so each sentence bridges to the next point.",
    example:
      "“Today, many interactions rely on technology…” → “Today, technology mediates much of this exchange…”",
  },
  {
    area: "Language",
    desc: "Swapped vague wording for precise academic phrasing that stays natural, not fancy.",
    example: "“take the right actions” → “respond appropriately”",
  },
  {
    area: "Grammar",
    desc: "Fixed awkward constructions and parallel structures for a cleaner rhythm.",
    example: "“calls, texts, and emails” → “calls, messaging, email, and video”",
  },
  {
    area: "Meaning safety",
    desc: "No new claims introduced; the message stays identical while delivery improves.",
    example: "“This paper discusses…” → “This paper examines…”",
  },
];

export function EditingProofSection() {
  return (
    <section className={styles.section} id="proofing">
      <div className={styles.container}>
        <div className={styles.proofCard}>
          <span className={styles.proofPill}>
            <span className={styles.proofDot} aria-hidden="true" />
            Proof · transparent edits
          </span>
          <h2 className={styles.proofTitle}>See the difference (before/after)</h2>
          <p className={styles.proofSub}>
            This is what “editing” looks like on an introductory paragraph—same idea, cleaner delivery.
          </p>

          <div className={styles.proofEmo}>
            <strong>The goal isn’t fancy English.</strong> It’s clean, confident meaning so your work
            gets noticed, not your wording.
          </div>

          <div className={styles.proofGrid} aria-label="Before and after">
            <article className={styles.proofPanel}>
              <header className={styles.proofHead}>
                <div>
                  <div className={styles.proofPanelTitle}>Before (your draft)</div>
                  <div className={styles.proofPanelHint}>Correct but easy to misread or feel repetitive.</div>
                </div>
                <span className={styles.proofTag}>Typical first draft</span>
              </header>
              <p className={styles.proofText}>{beforeText}</p>
            </article>
            <article className={styles.proofPanel}>
              <header className={styles.proofHead}>
                <div>
                  <div className={styles.proofPanelTitle}>After (edited)</div>
                  <div className={styles.proofPanelHint}>Clearer, smoother—same meaning and intent.</div>
                </div>
                <span className={styles.proofTag}>Edited for clarity</span>
              </header>
              <p className={styles.proofText}>{afterText}</p>
            </article>
          </div>

          <div className={styles.proofChange} aria-label="Track changes excerpt">
            <div className={styles.proofChangeTop}>
              <h3 className={styles.proofChangeTitle}>Track Changes-style snapshot</h3>
              <span className={styles.proofPill}>
                <span className={styles.proofDot} aria-hidden="true" />
                You stay in control
              </span>
            </div>
            <div className={styles.proofTrackBox}>
              {trackChanges.map((row) => (
                <div key={row.label} className={styles.proofTrackLine}>
                  <strong>{row.label}:</strong>{" "}
                  <span className={row.type === "del" ? styles.proofDel : styles.proofIns}>
                    {row.text}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.proofLegend}>
              <span className={styles.proofBadge}>
                <span className={`${styles.proofDot} ${styles.proofRed}`} />
                Deleted
              </span>
              <span className={styles.proofBadge}>
                <span className={`${styles.proofDot} ${styles.proofBlue}`} />
                Added
              </span>
              <span className={styles.proofBadge}>Meaning preserved</span>
            </div>
          </div>

          <div className={styles.proofWhy} aria-label="What changed and why">
            <div className={styles.proofTable}>
              <div className={styles.proofRowHead}>
                <span>Area</span>
                <span>What we changed & why</span>
              </div>
              {changeRows.map((row) => (
                <div key={row.area} className={styles.proofRow}>
                  <strong className={styles.proofKey}>{row.area}</strong>
                  <div className={styles.proofValue}>
                    {row.desc}
                    <div className={styles.proofExample}>
                      <strong>Example:</strong> {row.example}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.proofWhyCard}>
              <h3 className={styles.proofWhyTitle}>Why this matters to reviewers</h3>
              <ul className={styles.proofWhyList}>
                <li>Reviewers decide quickly whether a paper feels “easy to follow”—this reduces friction.</li>
                <li>Clear introductions build trust: “this author knows what they’re doing.”</li>
                <li>Better flow means fewer misunderstandings and fewer avoidable reviewer comments.</li>
              </ul>
              <div className={styles.proofEmoMini}>
                If your intro feels “almost there,” this is the polishing that quietly shifts perception.
              </div>
            </div>
          </div>

          <div className={styles.proofCta}>
            <p className={styles.proofMini}>
              <strong>Want this level of clarity across the whole manuscript?</strong> Upload your file for a quote.
              We recommend the right depth after a quick scan—so you don’t overpay or under-edit.
            </p>
            <BookNowModal
              source="editing-proof-section"
              triggerLabel="Get a quote"
              triggerClassName={`${styles.btn} ${styles.btnPrimary}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
