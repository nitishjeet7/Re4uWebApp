"use client";

import { useState } from "react";
import styles from "./page.module.css";

export function SampleRequestWhatsAppForm() {
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  return (
    <form
      className={styles.sampleForm}
      onSubmit={async (event) => {
        event.preventDefault();
        setStatus(null);
        const formEl = event.currentTarget;
        if (!formEl.checkValidity()) {
          formEl.reportValidity();
          return;
        }

        const data = new FormData(formEl);
        const fullName = String(data.get("name") ?? "").trim();
        const email = String(data.get("email") ?? "").trim();
        const phone = String(data.get("phone") ?? "").trim();
        const level = String(data.get("level") ?? "").trim();
        const subject = String(data.get("subject") ?? "").trim();
        const requirement = String(data.get("requirement") ?? "").trim();
        const file = data.get("formatfile");
        const fileName =
          file && typeof file === "object" && "name" in file
            ? String((file as File).name ?? "")
            : "";

        setSubmitting(true);
        try {
          const payload = new FormData();
          payload.append("enquiryType", "sample-preview");
          payload.append("source", "research-planning-sample-preview");
          payload.append("name", fullName);
          payload.append("email", email);
          payload.append("phone", phone);
          payload.append("level", level);
          payload.append("subject", subject);
          payload.append("requirement", requirement);
          if (fileName && file instanceof File) {
            payload.append("files", file);
          }

          const response = await fetch("/api/research-planning-enquiry", {
            method: "POST",
            body: payload,
          });
          const data = (await response.json().catch(() => null)) as { error?: string } | null;
          if (!response.ok) {
            throw new Error(data?.error || "Unable to send sample request.");
          }

          setStatus("Request sent. We will email your sample preview shortly.");
          formEl.reset();
          setSelectedFileName("");
        } catch (submitErr) {
          const messageText =
            submitErr instanceof Error && submitErr.message
              ? submitErr.message
              : "Unable to send sample request.";
          setStatus(messageText);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <div className={styles.field}>
        <label htmlFor="srName">Full name *</label>
        <input
          id="srName"
          name="name"
          type="text"
          required
          placeholder="Your name"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="srEmail">Email *</label>
        <input
          id="srEmail"
          name="email"
          type="email"
          required
          placeholder="name@email.com"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="srPhone">Phone or WhatsApp *</label>
        <input
          id="srPhone"
          name="phone"
          type="tel"
          required
          placeholder="+91..."
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="srLevel">Level *</label>
        <select id="srLevel" name="level" defaultValue="" required>
          <option value="" disabled>
            Select
          </option>
          <option>PhD / Registration</option>
          <option>Thesis / Dissertation</option>
          <option>Grant / Funding</option>
          <option>Other</option>
        </select>
      </div>
      <div className={`${styles.field} ${styles.fieldFull}`}>
        <label htmlFor="srSubject">Subject or domain *</label>
        <input
          id="srSubject"
          name="subject"
          type="text"
          required
          placeholder="e.g., Psychology, Civil Engineering, Management"
        />
      </div>
      <div className={`${styles.field} ${styles.fieldFull}`}>
        <label htmlFor="srReq">Requirement *</label>
        <textarea
          id="srReq"
          name="requirement"
          rows={4}
          required
          placeholder="What do you want to review in the sample? (gap, RQs, methodology, timeline, format)"
        />
      </div>
      <div className={`${styles.field} ${styles.fieldFull}`}>
        <label htmlFor="srFile">Upload institute or funder format (optional)</label>
        <input
          id="srFile"
          name="formatfile"
          type="file"
          accept=".pdf,.doc,.docx,.rtf,.txt"
          onChange={(event) => {
            const file = event.currentTarget.files?.[0];
            setSelectedFileName(file?.name ?? "");
          }}
        />
        <p className={styles.mutedLine}>
          If you upload your template, we can align the sample structure more
          closely to your format.
        </p>
        {selectedFileName ? (
          <p className={styles.mutedLine}>Selected file: {selectedFileName}</p>
        ) : null}
      </div>
      <div className={`${styles.field} ${styles.fieldFull}`}>
        <button
          className={`${styles.btn} ${styles.btnPrimary} ${styles.sampleSubmitBtn}`}
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Sending..." : "Send me a sample preview"}
        </button>
        <p className={styles.mutedLine}>
          By submitting, you agree we may contact you to share the preview.
        </p>
        {status ? <p className={styles.mutedLine}>{status}</p> : null}
      </div>
    </form>
  );
}
