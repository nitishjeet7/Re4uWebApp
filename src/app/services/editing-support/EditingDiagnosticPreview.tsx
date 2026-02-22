"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

type SelectedOptions = {
  clarity: boolean;
  flow: boolean;
  language: boolean;
  grammar: boolean;
  copyediting: boolean;
};

type Score = {
  overall: number;
  clarity: number;
  flow: number;
  language: number;
  grammar: number;
  copyediting: number;
};

type ActionItem = {
  priority: "High" | "Medium" | "Low" | "Safe";
  title: string;
  why: string;
  next: string;
};

type DiagnosticState = {
  current: Score;
  potential: Score;
  actions: ActionItem[];
};

const diagnosticOptions = ["Clarity", "Flow", "Language", "Grammar", "Copyediting"];
const diagnosticBadges = [
  "Confidential",
  "Secure workflow",
  "Track Changes",
  "Fast quote",
  "Human editors",
];

const demoText =
  "Staphylococcus aureus is a commensal organism in the nasal passages, skin, and mucous membranes of humans and animals. At the same time, it is also the leading cause of bacteremia, infective endocarditis, and osteoarticular, skin, soft tissue, pleuropulmonary, and device-related infections. S. aureus is also one of the major organisms responsible for nosocomial infections in humans and it can cause infections after surgery or from implanted medical devices (Balasubramanian et al., 2017).";

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const wordTokens = (text: string) => text.trim().match(/\b[\w']+\b/g) ?? [];

const splitSentences = (text: string) =>
  text
    .replace(/\s+/g, " ")
    .trim()
    .match(/[^.!?]+[.!?]+|[^.!?]+$/g)
    ?.map((sentence) => sentence.trim())
    .filter(Boolean) ?? [];

const syllables = (word: string) => {
  const cleaned = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!cleaned) return 0;
  if (cleaned.length <= 3) return 1;
  const trimmed = cleaned.replace(/(?:e$)/, "");
  const groups = trimmed.match(/[aeiouy]{1,2}/g);
  return groups ? groups.length : 1;
};

const flesch = (text: string) => {
  const words = wordTokens(text);
  const sentences = splitSentences(text);
  if (!words.length || !sentences.length) return 0;
  const syllableCount = words.reduce((acc, word) => acc + syllables(word), 0);
  const asl = words.length / sentences.length;
  const asw = syllableCount / words.length;
  return 206.835 - 1.015 * asl - 84.6 * asw;
};

const detectStyle = (text: string) => {
  const hasCitation = /\([^)]+,\s*\d{4}\)/.test(text) || /et al\.,\s*\d{4}/i.test(text);
  const hasSpecies = /\b[A-Z]\.\s*[a-z]+\b/.test(text) || /\b[A-Z][a-z]+\s+[a-z]+\b/.test(text);
  const hasMethods =
    /(we|our)\s+(measured|evaluated|assessed|conducted|analysed|analyzed|performed)/i.test(
      text,
    );
  return hasCitation || hasSpecies || hasMethods ? "Academic / Scientific style" : "Academic style";
};

const computeScores = (text: string): Score => {
  const clean = text.trim();
  const words = wordTokens(clean);
  const sentences = splitSentences(clean);
  const fre = flesch(clean);
  const avgSent = sentences.length ? words.length / sentences.length : words.length;

  let clarity = clamp((fre + 10) / 1.2, 0, 100);
  if (avgSent > 28) clarity -= (avgSent - 28) * 1.2;
  clarity = clamp(clarity, 0, 100);

  let grammar = 92;
  if (/\s{2,}/.test(clean)) grammar -= 8;
  if (/[!?.,]{2,}/.test(clean)) grammar -= 6;
  if (clean && !/[.!?]$/.test(clean)) grammar -= 6;
  grammar = clamp(grammar, 0, 100);

  const lower = words.map((word) => word.toLowerCase());
  const ttr = words.length ? new Set(lower).size / words.length : 0;
  let language = clamp(55 + ttr * 70, 0, 100);
  const wordy = [
    "in order to",
    "due to the fact that",
    "it is important to note that",
    "at this point in time",
    "in the event that",
  ];
  const wordyHits = wordy.reduce(
    (acc, phrase) => acc + (clean.toLowerCase().split(phrase).length - 1),
    0,
  );
  language -= wordyHits * 6;
  language = clamp(language, 0, 100);

  let flow = 55;
  const transitions = [
    "however",
    "therefore",
    "moreover",
    "in addition",
    "thus",
    "consequently",
    "for example",
    "in contrast",
    "overall",
  ];
  const transitionHits = transitions.reduce(
    (acc, transition) => acc + (clean.toLowerCase().split(transition).length - 1),
    0,
  );
  if (sentences.length) flow += clamp((transitionHits / sentences.length) * 90, 0, 35);
  if (clean.length > 320 && clean.split(/\n\n+/).filter(Boolean).length === 1) flow -= 8;
  flow = clamp(flow, 0, 100);

  let copyediting = 88;
  if (/\b(\w+)\s+\1\b/i.test(clean)) copyediting -= 8;
  if (/\s,/.test(clean) || /\s\./.test(clean)) copyediting -= 6;
  if (/\s{2,}/.test(clean)) copyediting -= 6;
  copyediting = clamp(copyediting, 0, 100);

  const overall = Math.round(
    clarity * 0.24 + language * 0.18 + flow * 0.18 + grammar * 0.22 + copyediting * 0.18,
  );

  return {
    overall,
    clarity: Math.round(clarity),
    flow: Math.round(flow),
    language: Math.round(language),
    grammar: Math.round(grammar),
    copyediting: Math.round(copyediting),
  };
};

const issueFinder = (text: string, selected: SelectedOptions): ActionItem[] => {
  const clean = text.trim();
  if (!clean) return [];
  const words = wordTokens(clean);
  const sentences = splitSentences(clean);
  const avgSent = sentences.length ? words.length / sentences.length : words.length;

  const issues: ActionItem[] = [];

  if (selected.clarity && avgSent > 28) {
    issues.push({
      priority: "High",
      title: "Sentence is too long (multi-clause)",
      why: "Reviewers may miss the central claim in dense sentences.",
      next: "Split into two focused sentences with one idea each.",
    });
  } else if (selected.clarity && avgSent > 22) {
    issues.push({
      priority: "Medium",
      title: "Sentences are long",
      why: "Shorter sentences reduce cognitive load and improve precision.",
      next: "Split the densest sentence or move secondary detail to the next sentence.",
    });
  }

  if (selected.flow && sentences.length >= 2) {
    issues.push({
      priority: "Medium",
      title: "Weak signposting between ideas",
      why: "Without transitions, the logic feels like a jump.",
      next: "Add one transition at the idea shift to guide the reader.",
    });
  }

  if (selected.language) {
    const wordy = [
      "in order to",
      "due to the fact that",
      "it is important to note that",
      "at this point in time",
      "in the event that",
    ];
    if (wordy.some((phrase) => clean.toLowerCase().includes(phrase))) {
      issues.push({
        priority: "Low",
        title: "Wordy phrase detected",
        why: "Wordy phrasing slows reading and hides the point.",
        next: "Replace filler phrases with direct wording (e.g., 'in order to' -> 'to').",
      });
    }
  }

  if (selected.copyediting && /\s{2,}/.test(clean)) {
    issues.push({
      priority: "Low",
      title: "Extra spacing found",
      why: "Looks unpolished and can trigger reviewer friction.",
      next: "Remove extra spaces and normalize spacing.",
    });
  }

  if (!issues.length) {
    issues.push({
      priority: "Safe",
      title: "No major issues detected yet",
      why: "Short excerpts can hide deeper structure and tone issues.",
      next: "Request a full diagnostic to validate the full manuscript.",
    });
  }

  return issues.slice(0, 4);
};

const computePotential = (
  current: Score,
  actions: ActionItem[],
  selected: SelectedOptions,
): Score => {
  const weights: Record<ActionItem["priority"], number> = {
    High: 8,
    Medium: 5,
    Low: 3,
    Safe: 0,
  };
  let uplift = actions.reduce((acc, item) => acc + (weights[item.priority] ?? 0), 0);
  uplift = clamp(uplift, 10, 26);

  let potentialOverall = Math.round(current.overall + uplift);
  potentialOverall = Math.max(potentialOverall, 85);
  potentialOverall = Math.max(potentialOverall, current.overall + 6);
  potentialOverall = clamp(potentialOverall, 85, 95);

  const delta = potentialOverall - current.overall;
  const per = {
    clarity: selected.clarity ? clamp(Math.round(delta * 0.3), 4, 12) : 0,
    flow: selected.flow ? clamp(Math.round(delta * 0.25), 3, 11) : 0,
    language: selected.language ? clamp(Math.round(delta * 0.2), 3, 10) : 0,
    grammar: selected.grammar ? clamp(Math.round(delta * 0.15), 2, 8) : 0,
    copyediting: selected.copyediting ? clamp(Math.round(delta * 0.1), 2, 8) : 0,
  };

  return {
    overall: potentialOverall,
    clarity: clamp(current.clarity + per.clarity, 0, 97),
    flow: clamp(current.flow + per.flow, 0, 97),
    language: clamp(current.language + per.language, 0, 97),
    grammar: clamp(current.grammar + per.grammar, 0, 97),
    copyediting: clamp(current.copyediting + per.copyediting, 0, 97),
  };
};

export function EditingDiagnosticPreview({ titleClassName }: { titleClassName?: string }) {
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<SelectedOptions>({
    clarity: true,
    flow: true,
    language: true,
    grammar: true,
    copyediting: true,
  });
  const [diagnostic, setDiagnostic] = useState<DiagnosticState | null>(null);
  const [message, setMessage] = useState("Preview only - full diagnostics on request.");
  const [error, setError] = useState("");

  const words = useMemo(() => wordTokens(text), [text]);
  const wordCount = words.length;
  const progress = Math.min(100, Math.round((wordCount / 200) * 100));
  const detected = text.trim() ? detectStyle(text) : "—";

  const handleChange = (value: string) => {
    const tokens = wordTokens(value);
    if (tokens.length > 200) {
      setText(`${tokens.slice(0, 200).join(" ")}...`);
      setMessage("Trimmed to 200 words for preview.");
    } else {
      setText(value);
      setMessage("Preview only - full diagnostics on request.");
    }
    setDiagnostic(null);
    setError("");
  };

  const handleToggle = (key: keyof SelectedOptions) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
    setDiagnostic(null);
  };

  const handleCheck = () => {
    if (!text.trim()) {
      setError("Please paste text to continue.");
      setDiagnostic(null);
      return;
    }
    const current = computeScores(text);
    const actions = issueFinder(text, selected);
    const potential = computePotential(current, actions, selected);
    setDiagnostic({ current, potential, actions });
    setMessage("Diagnostics generated. Review the action table and scoreboard.");
    setError("");
  };

  const handleDemo = () => {
    handleChange(demoText);
    setMessage("Demo loaded. Click Check to generate diagnostics.");
  };

  const actionRows = diagnostic?.actions ?? [];

  return (
    <section className={styles.section} id="diagnostic">
      <div className={styles.container}>
        <div className={styles.diagnosticCard}>
          <div className={styles.diagnosticHeader}>
            <p className={styles.kicker}>
              <span className={styles.dot} aria-hidden="true" />
              Editing diagnostic preview
            </p>
            <h2 className={`${styles.sectionTitle} ${titleClassName ?? ""}`}>
              Know what to fix and what a human editor will improve.
            </h2>
            <p className={styles.sectionSub}>
              Paste up to 200 words. We score the excerpt, generate a precise action table, and
              show a realistic human-editor potential range.
            </p>
          </div>

          <div className={styles.diagnosticGrid}>
            <div className={styles.diagnosticLeft}>
              <div className={styles.diagnosticPanel}>
                <div className={styles.diagnosticTopRow}>
                  <strong>Paste up to 200 words</strong>
                  <span className={styles.diagnosticPill}>
                    <strong>{wordCount}</strong>/200
                  </span>
                </div>
                <textarea
                  className={styles.diagnosticTextarea}
                  placeholder="Paste your academic paragraph here (any discipline)."
                  value={text}
                  onChange={(event) => handleChange(event.target.value)}
                />
                <div className={styles.diagnosticOptions}>
                  {diagnosticOptions.map((item) => {
                    const key = item.toLowerCase() as keyof SelectedOptions;
                    return (
                      <label key={item} className={styles.diagnosticOption}>
                        <input
                          type="checkbox"
                          checked={selected[key]}
                          onChange={() => handleToggle(key)}
                        />
                        {item}
                      </label>
                    );
                  })}
                  <span className={styles.diagnosticPill}>
                    <strong>Detected:</strong> {detected}
                  </span>
                </div>
                <div className={styles.diagnosticFooter}>
                  <div className={styles.diagnosticProgress}>
                    <div className={styles.diagnosticBar}>
                      <div
                        className={styles.diagnosticFill}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span
                      className={`${styles.diagnosticHint} ${
                        error ? styles.diagnosticHintError : ""
                      }`}
                    >
                      {error || message}
                    </span>
                  </div>
                  <div className={styles.diagnosticActions}>
                    <button
                      className={`${styles.btn} ${styles.btnPrimary}`}
                      type="button"
                      onClick={handleCheck}
                      disabled={wordCount === 0}
                    >
                      Check
                    </button>
                    <button className={styles.btn} type="button" onClick={handleDemo}>
                      Load demo
                    </button>
                  </div>
                </div>
                <div className={styles.diagnosticNote}>
                  <strong>Disclaimer:</strong> This preview is representative and conservative from
                  short excerpts. Human editors provide deeper, discipline-aware insight when
                  reviewing your paper.
                </div>
              </div>

              <div className={styles.diagnosticPanel}>
                <div className={styles.diagnosticTableHeader}>
                  <div>
                    <strong>Action Table</strong>
                    <p className={styles.diagnosticHelp}>
                      Clear, specific actions - not vague tips. Expand any row in the full report
                      to see a safe rewrite hint.
                    </p>
                  </div>
                  <Link href="/contact" className={`${styles.btn} ${styles.btnPrimary}`}>
                    Get a quote
                  </Link>
                </div>
                <div className={styles.diagnosticTableWrap}>
                  <table className={styles.diagnosticTable}>
                    <thead>
                      <tr>
                        <th>Priority</th>
                        <th>What we noticed</th>
                        <th>Why it matters</th>
                        <th>What to do next</th>
                      </tr>
                    </thead>
                    <tbody>
                      {actionRows.length === 0 ? (
                        <tr>
                          <td colSpan={4} className={styles.diagnosticEmptyRow}>
                            Paste text and click Check to generate your action table.
                          </td>
                        </tr>
                      ) : (
                        actionRows.map((row) => (
                          <tr key={row.title}>
                            <td>
                              <span
                                className={`${styles.diagnosticTag} ${
                                  row.priority === "High"
                                    ? styles.diagnosticTagHigh
                                    : row.priority === "Medium"
                                      ? styles.diagnosticTagMed
                                      : row.priority === "Low"
                                        ? styles.diagnosticTagLow
                                        : styles.diagnosticTagSafe
                                }`}
                              >
                                {row.priority}
                              </span>
                            </td>
                            <td>
                              <strong>{row.title}</strong>
                            </td>
                            <td>{row.why}</td>
                            <td>{row.next}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <aside className={styles.diagnosticRight}>
              <div className={styles.diagnosticPanel}>
                <div className={styles.diagnosticScoreHeader}>
                  <h3>Scoreboard</h3>
                  <p className={styles.diagnosticHelp}>
                    Scores appear after the check. Potential is always shown at or above 85 for
                    human editing impact.
                  </p>
                </div>
                {diagnostic ? (
                  <>
                    <div className={styles.diagnosticScoreStack}>
                      <div className={styles.diagnosticScoreCard}>
                        <div>
                          <div className={styles.scoreLabel}>Current</div>
                          <div className={styles.scoreSub}>Observed on this excerpt</div>
                        </div>
                        <div className={styles.scoreValue}>{diagnostic.current.overall}</div>
                      </div>
                      <div className={styles.diagnosticScoreCard}>
                        <div>
                          <div className={styles.scoreLabel}>Potential (Human editor)</div>
                          <div className={styles.scoreSub}>
                            Meaning-safe rewriting and structure upgrades
                          </div>
                        </div>
                        <div className={styles.scoreValue}>{diagnostic.potential.overall}</div>
                      </div>
                    </div>

                    <div className={styles.diagnosticTableWrap}>
                      <table className={styles.diagnosticTable}>
                        <thead>
                          <tr>
                            <th>Metric</th>
                            <th>Current</th>
                            <th>Potential</th>
                            <th>Change</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { label: "Clarity", key: "clarity" },
                            { label: "Flow", key: "flow" },
                            { label: "Language", key: "language" },
                            { label: "Grammar", key: "grammar" },
                            { label: "Copyediting", key: "copyediting" },
                            { label: "Overall", key: "overall" },
                          ].map(({ label, key }) => {
                            const current = diagnostic.current[key as keyof Score];
                            const potential = diagnostic.potential[key as keyof Score];
                            return (
                              <tr key={label}>
                                <td>{label}</td>
                                <td>{current}</td>
                                <td>{potential}</td>
                                <td>+{Math.max(0, potential - current)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className={styles.diagnosticBadges}>
                      {diagnosticBadges.map((badge) => (
                        <span key={badge} className={styles.diagnosticBadge}>
                          {badge}
                        </span>
                      ))}
                    </div>

                    <div className={styles.diagnosticCta}>
                      <Link href="/contact" className={`${styles.btn} ${styles.btnPrimary}`}>
                        Get a quote
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className={styles.diagnosticEmpty}>
                    Paste text and click Check to show the score breakdown.
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
