"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";
import { BookNowModal } from "@/components/sections/BookNowModal";

const payloads = [
  {
    label: "Original",
    text: "Communication is one of the most significant aspects of life. People always need to generate and pass information from one party to another, so that understanding and the right action can happen. Today, almost everyone uses technology for communicating needs. Smartphones and computers help people send messages and get feedback through calls, messages and emails. This paper will explore how technology influences communication by examining methods such as blogs, email, cell phones, online chats and video calls.",
    note: "What changed: nothing yet. This is how many paragraphs start—correct but slightly repetitive and unclear about the paper's purpose.",
  },
  {
    label: "Free tool style",
    text: "Communication is one of the most significant aspects of life. People need to generate and pass information from one party to another so that understanding and appropriate action can occur. Today, many people use technology for communication. Smartphones and computers help people send messages and receive feedback through calls, messages, and emails. This paper explores how technology influences communication by examining methods such as blogs, email, cell phones, online chats, and video calls.",
    note: "Tool outcome: cleaner grammar and punctuation, a bit less repetition. Structure and argument stay mostly the same.",
  },
  {
    label: "Human editor",
    text: "Communication helps people coordinate actions and maintain relationships. The goal is simple: share information clearly enough that others understand expectations and can respond appropriately. Today, technology mediates much of this exchange. Smartphones and computers enable faster, more flexible communication through channels such as email, messaging, online chats, and video calls. This paper examines how these tools shape communication by changing speed, accessibility, tone, and the quality of feedback, while keeping the core purpose of communication the same.",
    note: "Human outcome: clearer purpose, stronger flow, and a more confident academic voice without adding new claims.",
  },
];

export function EditingFreeToolsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = useMemo(() => payloads[activeIndex], [activeIndex]);

  return (
    <section className={styles.section} id="free-tools">
      <div className={styles.container}>
        <div className={styles.freeToolsCard}>
          <span className={styles.freeToolsPill}>
            <span className={styles.freeToolsDot} aria-hidden="true" />
            Objection handler
          </span>
          <h2 className={styles.freeToolsTitle}>Free tools help, but they do not do this</h2>
          <p className={styles.freeToolsSub}>
            If you searched for <strong>research paper editing software</strong> or{" "}
            <strong>research paper editing services free</strong>, starting with tools makes sense.
            Just remember what tools solve and what they cannot guarantee.
          </p>

          <div className={styles.freeToolsRow} aria-label="Tools vs human editors comparison">
            <article className={styles.freeToolsColumn}>
              <header className={styles.freeToolsHead}>
                <h3 className={styles.freeToolsColumnTitle}>Tools can help with</h3>
                <span className={styles.freeToolsTag}>Fast, surface-level</span>
              </header>
              <ul>
                <li>Spelling and basic grammar suggestions</li>
                <li>Punctuation cleanup and minor consistency hints</li>
                <li>Simple rephrasing and generic tone suggestions</li>
                <li>Quick checks while you draft or revise</li>
              </ul>
              <div className={styles.freeToolsNote}>
                <strong>Reality:</strong> tools can flag false positives in academic writing, so human judgment is still needed.
              </div>
            </article>

            <article className={styles.freeToolsColumn}>
              <header className={styles.freeToolsHead}>
                <h3 className={styles.freeToolsColumnTitle}>
                  Human editors do what tools struggle to guarantee
                </h3>
                <span className={styles.freeToolsTag}>Meaning and logic</span>
              </header>
              <ul>
                <li>Meaning-preserving rewrites that improve clarity without changing intent</li>
                <li>Logic flow across sentences and paragraphs, not just sentence polish</li>
                <li>Academic voice and discipline conventions, including what not to change</li>
                <li>Filtering false positives, knowing what matters and what can stay</li>
                <li>Safety around citations and claims, avoiding invented references</li>
              </ul>
              <div className={styles.freeToolsNote}>
                <strong>Best workflow:</strong> start with tools, then switch to a human editor when you are close to submission.
              </div>
            </article>
          </div>

          <div className={styles.freeToolsExample}>
            <div className={styles.freeToolsExampleTop}>
              <div>
                <div className={styles.freeToolsExampleTitle}>Best example: same paragraph, three outcomes</div>
                <p className={styles.freeToolsExampleSub}>
                  This intro paragraph has high stakes for clarity, flow, and reader trust.
                </p>
              </div>
              <span className={styles.freeToolsPill}>
                <span className={styles.freeToolsDot} aria-hidden="true" />
                Meaning preserved
              </span>
            </div>

            <div className={styles.freeToolsTabs} role="tablist">
              {payloads.map((payload, idx) => (
                <button
                  key={payload.label}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === idx}
                  className={`${styles.freeToolsTab} ${activeIndex === idx ? styles.freeToolsTabActive : ""}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  {payload.label}
                </button>
              ))}
            </div>

            <div className={styles.freeToolsBox}>{active.text}</div>
            <div className={styles.freeToolsNote}>(Meaning stays the same) {active.note}</div>
          </div>

          <div className={styles.freeToolsCta}>
            <p className={styles.freeToolsMini}>
              <strong>If you are close to submission, human editing saves rounds of rewrites.</strong> It
              reduces misunderstandings, avoids false positives, and keeps your meaning intact.
            </p>
            <BookNowModal
              source="editing-free-tools"
              triggerLabel="Get a quote"
              triggerClassName={`${styles.btn} ${styles.btnPrimary}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
