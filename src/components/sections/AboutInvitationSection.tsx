"use client";

import { useState } from "react";
import styles from "./AboutInvitationSection.module.css";

type EntryKey = "learn" | "improve" | "collab";

type Entry = {
  key: EntryKey;
  label: string;
  icon: string;
  place: string;
  one: string;
  sub: string;
  pace: string;
  type: string;
  gets: string[];
  ethics: string;
};

const ENTRIES: Entry[] = [
  {
    key: "learn",
    label: "Learn",
    icon: "☕",
    place: "Counter",
    one: "Pick up standards + starter tools.",
    sub: "Resources, templates, workshops.",
    pace: "Pace: flexible",
    type: "Typical: self-serve",
    gets: ["Starter guides + checklists", "Templates you can reuse", "Workshops to build fundamentals"],
    ethics: "We teach and share standards. We do not promise outcomes; we build capability.",
  },
  {
    key: "improve",
    label: "Improve",
    icon: "🫖",
    place: "Barista station",
    one: "Human-reviewed feedback, made usable.",
    sub: "Clear ownership. Structured improvement.",
    pace: "Pace: focused",
    type: "Typical: per-manuscript",
    gets: ["Structured feedback cycles", "Clarity + structure upgrades", "Avoidables reduced (standards-based)"],
    ethics: "We improve communication, not the underlying results. No hype, no manipulation.",
  },
  {
    key: "collab",
    label: "Collaborate",
    icon: "🍵",
    place: "Community table",
    one: "Build capability inside teams.",
    sub: "Labs, groups, institutions — co-designed with context.",
    pace: "Pace: partnership",
    type: "Typical: ongoing",
    gets: ["Lab-wide rubrics + standards", "Internal review pipelines", "Capacity-building sessions for teams"],
    ethics:
      "No one-size-fits-all norms. We respect local context, protect authorship, accountability, and integrity.",
  },
];

export function AboutInvitationSection() {
  const [openByKey, setOpenByKey] = useState<Record<EntryKey, boolean>>({
    learn: true,
    improve: false,
    collab: false,
  });

  return (
    <section className={styles.section} aria-label="Invitation">
      <header className={styles.pageHead}>
        <h2 className={styles.title}>A simple invitation</h2>
        <p className={styles.sub}>
          You are welcome for tea or coffee — choose your entry: <strong>Learn</strong>,{" "}
          <strong>Improve</strong>, or <strong>Collaborate</strong>. Each path stays welcoming and keeps
          ethics explicit.
        </p>
      </header>

      <div className={styles.shell} aria-label="Cafe path story section">
        <div className={styles.sectionHeader}>
          <div className={styles.kicker}>
            <span className={styles.dot} aria-hidden="true" /> You are welcome for tea or coffee
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.introCard}>
            <div className={styles.introText}>
              Choose your entry: <b>Learn</b>, <b>Improve</b>, or <b>Collaborate</b>. Each path stays welcoming,
              and keeps the ethics explicit.
            </div>
          </div>

          <div className={styles.pathWrap} aria-label="Cafe path cards">
            {ENTRIES.map((entry) => {
              const isOpen = openByKey[entry.key];
              const panelId = `about-invitation-${entry.key}-panel`;
              const toggle = () =>
                setOpenByKey((prev) => ({ ...prev, [entry.key]: !prev[entry.key] }));

              return (
                <div key={entry.key} className={styles.stage}>
                  <div
                    className={styles.stageBtn}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={toggle}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        toggle();
                      }
                    }}
                  >
                    <div className={styles.stageTop}>
                      <div>
                        <div className={styles.kicker}>
                          <span className={styles.dot} aria-hidden="true" /> {entry.place}
                        </div>
                        <h3 className={styles.stageH}>{entry.label}</h3>
                        <div className={styles.one}>{entry.one}</div>
                      </div>
                      <div className={styles.icon} aria-hidden="true">
                        {entry.icon}
                      </div>
                    </div>

                    <p className={styles.subline}>{entry.sub}</p>

                    <div className={styles.chips} aria-label="Entry metadata">
                      <span className={styles.chip}>
                        <span className={styles.miniDot} aria-hidden="true" />
                        {entry.pace}
                      </span>
                      <span className={styles.chip}>
                        <span className={styles.miniDot} aria-hidden="true" />
                        {entry.type}
                      </span>
                    </div>

                    {isOpen ? (
                      <div id={panelId} className={styles.panel}>
                        <div className={styles.panelTitle}>What you get</div>
                        <ul className={styles.bullets}>
                          {entry.gets.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <div className={styles.ruleCard}>
                          <b>Ethics boundary:</b> {entry.ethics}
                        </div>
                      </div>
                    ) : null}

                    <div className={styles.tapHint}>
                      <span className={styles.chev}>Tap to expand {isOpen ? "▾" : "▸"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
