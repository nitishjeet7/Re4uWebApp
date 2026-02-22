"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type Stage = {
  key: string;
  label: string;
  tagline: string;
  bestFor: string;
  after: string;
  chips: string[];
  changes: string[];
};

const stageData: { before: string; stages: Stage[] } = {
  before:
    "Communication is one of the most significant aspects of the life of all living organisms, especially human beings. There is always a constant need for people to generate, organize and pass information from one party to the next. Be it business communication or regular social interactions, transfer of information among different sources ensures harmony and understanding of the expectations, as well the appropriate course of action. Today, all communicating entities employ technology for their communicating needs. Technology comes in handy in facilitating smooth communication among individuals or businesses; as it provides alternatives that lead to effective communication. Through smartphones and computers, people can pass messages and receive feedbacks through calls, messages and emails respectively. Such advanced technologies have had significant influences on communication in its entirety. Having picked the focus of the paper, the brief write up will explore the influences of technology on communication, by examining the methods of communication via technology. The methods include blogs, email, cell phone, online chats and video calls. The influence of technology on communication will also be examined. Included in the list of influences are speed and cost, quality, nature of communication and accessibility to others. Further, the write up will point out the appropriate instances when technology should be employed to communicate including when evading barriers, and retaining old contacts among others. Avoiding technology to build interpersonal skills and remain relevant to people who cannot perceive technology-aided communication will round the paper up.",
  stages: [
    {
      key: "developmental",
      label: "Developmental",
      tagline: "Ideas and structure",
      bestFor: "Early drafts - weak narrative - reviewer confusion",
      after:
        "Communication is essential for human life and for everyday social and business interactions. People constantly generate, organize, and exchange information to maintain understanding, align expectations, and decide on appropriate actions. Today, communication is increasingly mediated by technology. Tools such as smartphones and computers enable people to send messages and receive feedback through calls, texts, and emails, often more quickly and at lower cost than traditional modes.\n\nThis paper examines how technology influences communication by reviewing common technology-enabled methods - blogs, email, mobile phones, online chats, and video calls - and by discussing key areas of impact, including speed and cost, communication quality, the nature of interaction, and accessibility. It also outlines situations where technology is particularly useful, such as overcoming barriers and maintaining long-distance contacts, while noting that relying exclusively on technology may limit interpersonal skill development and exclude people who cannot access or use digital channels.",
      chips: ["Rebuilt logic arc", "Clarified scope", "Reduced repetition", "Balanced limitations"],
      changes: [
        "Reordered the paragraph into a clear arc: context -> technology shift -> paper scope -> impacts -> limitations.",
        "Converted a list-like paper roadmap into an academic introduction that reads smoothly.",
        "Clarified the concluding idea: technology helps, but should not replace interpersonal skills or exclude others.",
      ],
    },
    {
      key: "substantive",
      label: "Substantive",
      tagline: "Clarity and flow",
      bestFor: "Dense paragraphs - unclear sentences - weak transitions",
      after:
        "Communication is central to human life. People constantly generate, organize, and share information - whether in business or everyday social interactions - to build understanding, align expectations, and decide on appropriate actions. Today, much of this communication is mediated by technology. Smartphones and computers allow users to exchange messages and receive feedback through calls, texts, and emails, often enabling faster and more efficient interaction.\n\nThis paper explores how technology influences communication by examining common technology-enabled methods such as blogs, email, mobile phones, online chats, and video calls. It also considers the broader effects of these tools, including their impact on speed and cost, communication quality, the nature of interaction, and accessibility. Finally, the paper discusses when technology is most appropriate (for example, to overcome barriers or maintain old contacts) and when reduced reliance may be necessary to support interpersonal skills and include people who cannot access technology-aided communication.",
      chips: ["Split long sentences", "Added signposting", "Reduced wordiness", "Improved coherence"],
      changes: [
        "Split overloaded sentences so each sentence carries one main idea.",
        "Added transitions (Today, It also, Finally) to guide the reader through the paragraph.",
        "Tightened wording while keeping the original meaning intact.",
      ],
    },
    {
      key: "copyediting",
      label: "Copyediting",
      tagline: "Tone and consistency",
      bestFor: "Near-final drafts - inconsistent style - uneven academic tone",
      after:
        "Communication is one of the most significant aspects of human life. People continually generate, organize, and share information in both business and everyday social interactions. This exchange supports understanding, clarifies expectations, and guides appropriate action.\n\nToday, many individuals and organizations use technology to meet communication needs. Smartphones and computers enable people to send messages and receive feedback through calls, text messages, and emails. These technologies have substantially influenced communication. This paper examines that influence by reviewing common technology-enabled methods (blogs, email, mobile phones, online chats, and video calls) and by considering key effects, including speed and cost, communication quality, the nature of communication, and accessibility. The paper also outlines situations in which technology can be beneficial - such as overcoming barriers and maintaining contacts - while acknowledging the importance of interpersonal skills and the limitations faced by people who cannot access technology-aided communication.",
      chips: ["Academic tone", "Consistency fixes", "Word choice", "Parallel structure"],
      changes: [
        "Improved academic tone (e.g., removed informal phrasing such as 'write up').",
        "Corrected usage and consistency (e.g., 'feedbacks' -> 'feedback'; standardized list terms).",
        "Strengthened parallel structure and removed redundancy for a professional, journal-ready feel.",
      ],
    },
    {
      key: "proofreading",
      label: "Proofreading",
      tagline: "Final surface polish",
      bestFor: "Last step - typos, punctuation, spacing",
      after:
        "Communication is one of the most significant aspects of the lives of all living organisms, especially human beings. There is always a constant need for people to generate, organize, and pass information from one party to the next. Be it business communication or regular social interactions, the transfer of information among different sources ensures harmony and understanding of expectations, as well as the appropriate course of action.\n\nToday, communicating entities employ technology for their communication needs. Technology helps facilitate smooth communication among individuals and businesses by providing alternatives that support effective communication. Through smartphones and computers, people can pass messages and receive feedback through calls, messages, and emails, respectively. Such advanced technologies have significantly influenced communication. This paper explores the influence of technology on communication by examining methods of communication via technology, including blogs, email, cell phones, online chats, and video calls. It also examines key influences - speed and cost, quality, nature of communication, and accessibility. Finally, it outlines situations when technology should be used, such as overcoming barriers and retaining old contacts, while noting the importance of interpersonal skills and the need to remain relevant to people who cannot access technology-aided communication.",
      chips: ["Grammar and punctuation", "Spacing cleanup", "Minor smoothing", "No rewriting"],
      changes: [
        "Corrected grammar, punctuation, and spacing inconsistencies.",
        "Made small usage fixes while keeping the original structure and wording largely intact.",
        "Avoided sentence-level restructuring - this stage is meant for final polish only.",
      ],
    },
    {
      key: "formatting",
      label: "Formatting",
      tagline: "Publication-ready",
      bestFor: "Submission compliance - headings - layout",
      after:
        "Introduction (excerpt)\nCommunication is one of the most significant aspects of the lives of all living organisms, especially human beings. There is a constant need to generate, organize, and pass information from one party to the next. Whether in business communication or everyday social interaction, information transfer supports understanding of expectations and appropriate action.\n\nIn contemporary settings, communicating entities increasingly employ technology for communication needs. Smartphones and computers enable people to exchange messages and receive feedback through calls, text messages, and emails. This paper examines the influence of technology on communication by reviewing technology-enabled methods (blogs, email, mobile phones, online chats, and video calls) and considering key impacts, including speed and cost, communication quality, the nature of communication, and accessibility. The paper also outlines appropriate contexts for technology use (e.g., overcoming barriers and maintaining contacts) while acknowledging the importance of interpersonal skills and the limitations faced by people who cannot access technology-aided communication.",
      chips: ["Section label", "Submission styling", "Consistent terminology", "Clean structure"],
      changes: [
        "Added a section label (Introduction) and excerpt marker to match journal structure.",
        "Standardized terminology and list formatting for consistency with submission norms.",
        "Ensured paragraph breaks and readability suitable for publication-ready manuscripts.",
      ],
    },
  ],
};

const copyToClipboard = async (text: string) => {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  if (typeof document !== "undefined") {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "true");
    helper.style.position = "absolute";
    helper.style.left = "-9999px";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    document.body.removeChild(helper);
  }
};

export function EditingStagesPreview({ titleClassName }: { titleClassName?: string }) {
  const [selectedKey, setSelectedKey] = useState(stageData.stages[0].key);
  const [copied, setCopied] = useState<"before" | "after" | null>(null);

  const stage = useMemo(
    () => stageData.stages.find((item) => item.key === selectedKey) ?? stageData.stages[0],
    [selectedKey],
  );

  const handleCopy = async (target: "before" | "after") => {
    const text = target === "before" ? stageData.before : stage.after;
    try {
      await copyToClipboard(text);
      setCopied(target);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section className={styles.section} id="stages">
      <div className={styles.container}>
        <div className={styles.stagePreviewCard}>
          <div className={styles.stagePreviewHeader}>
            <p className={styles.kicker}>
              <span className={styles.dot} aria-hidden="true" />
              Developmental to formatting
            </p>
            <h2 className={`${styles.sectionTitle} ${titleClassName ?? ""}`}>
              From developmental to publication-ready - on the same paragraph
            </h2>
            <p className={styles.sectionSub}>
              Click a stage to see how the same passage changes at different depths of editing
              without changing meaning.
            </p>
          </div>

          <div className={styles.stagePreviewTabs}>
            {stageData.stages.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`${styles.stagePreviewTab} ${
                  item.key === stage.key ? styles.stagePreviewTabActive : ""
                }`}
                onClick={() => setSelectedKey(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className={styles.stagePreviewMeta}>
            <div>
              <div className={styles.stagePreviewTitle}>{stage.label} editing</div>
              <div className={styles.stagePreviewTagline}>{stage.tagline}</div>
            </div>
            <span className={styles.stagePreviewPill}>Best for: {stage.bestFor}</span>
          </div>

          <div className={styles.stagePreviewChips}>
            {stage.chips.map((chip) => (
              <span key={chip} className={styles.stagePreviewChip}>
                {chip}
              </span>
            ))}
          </div>

          <div className={styles.stagePreviewCols}>
            <div className={styles.stagePreviewPane}>
              <div className={styles.stagePreviewPaneHead}>
                <b>Before (original)</b>
                <button
                  type="button"
                  className={styles.stagePreviewCopy}
                  onClick={() => handleCopy("before")}
                >
                  {copied === "before" ? "Copied" : "Copy"}
                </button>
              </div>
              <textarea
                className={styles.stagePreviewTextarea}
                value={stageData.before}
                readOnly
              />
            </div>

            <div className={styles.stagePreviewPane}>
              <div className={styles.stagePreviewPaneHead}>
                <b>After (selected stage)</b>
                <button
                  type="button"
                  className={styles.stagePreviewCopy}
                  onClick={() => handleCopy("after")}
                >
                  {copied === "after" ? "Copied" : "Copy"}
                </button>
              </div>
              <textarea className={styles.stagePreviewTextarea} value={stage.after} readOnly />
            </div>
          </div>

          <div className={styles.stagePreviewWhy}>
            <h3>What changed and why</h3>
            <ul>
              {stage.changes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.stagePreviewDisclaimer}>
            <strong>Disclaimer:</strong> This preview is representative and conservative. It
            highlights common clarity, flow, and grammar risks from short excerpts. A human editor
            provides deeper, discipline-aware insight and meaning-safe rewriting across sections and
            citations. Editing improves language and presentation - journals decide acceptance.
          </div>
        </div>
      </div>
    </section>
  );
}
