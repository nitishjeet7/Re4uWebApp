"use client";

import styles from "./page.module.css";
import { WHATSAPP_URL } from "@/lib/contact";

function openWhatsAppPrefilled(message: string) {
  const href = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
  const opened = window.open(href, "_blank", "noopener,noreferrer");
  if (!opened) {
    window.location.href = href;
  }
}

export function HeroQuoteWhatsAppForm() {
  return (
    <form
      className={`${styles.quickForm} ${styles.heroQuoteForm}`}
      onSubmit={(event) => {
        event.preventDefault();

        const formEl = event.currentTarget;
        if (!formEl.checkValidity()) {
          formEl.reportValidity();
          return;
        }

        const data = new FormData(formEl);
        const fullName = String(data.get("name") ?? "").trim();
        const whatsapp = String(data.get("whatsapp") ?? "").trim();
        const level = String(data.get("level") ?? "").trim();
        const deadline = String(data.get("deadline") ?? "").trim();

        const message = [
          "Research Planning quote request",
          "",
          `Name: ${fullName}`,
          `WhatsApp: ${whatsapp}`,
          `Academic level: ${level}`,
          `Deadline: ${deadline}`,
          "",
          "Please share the quote and next steps.",
        ].join("\n");

        openWhatsAppPrefilled(message);
      }}
    >
      <p className={styles.formTitle}>Get a quote in 30 minutes (WhatsApp or Email)</p>
      <div className={styles.formGrid}>
        <input className={styles.input} placeholder="Full Name" required name="name" />
        <input className={styles.input} placeholder="WhatsApp Number" required name="whatsapp" />
        <select className={styles.input} name="level" defaultValue="" required>
          <option value="" disabled>
            Academic Level
          </option>
          <option>UG</option>
          <option>PG</option>
          <option>PhD</option>
          <option>Postdoc</option>
          <option>Grant</option>
        </select>
        <input className={styles.input} type="date" required name="deadline" />
      </div>
      <div className={styles.formActions}>
        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
          Get Quote and Next Steps
        </button>
      </div>
      <p className={styles.formNote}>
        Transparent quote before work starts | Confidential | Integrity-first
      </p>
    </form>
  );
}

