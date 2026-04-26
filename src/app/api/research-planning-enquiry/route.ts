import { NextRequest, NextResponse } from "next/server";
import { sendSmtpEmail } from "@/lib/smtp";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_UPLOAD_BYTES = 20 * 1024 * 1024; // 20MB per file
const MAX_TOTAL_UPLOAD_BYTES = 18 * 1024 * 1024; // 18MB total

function getEnv(name: string) {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : "";
}

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();

    const enquiryType = String(form.get("enquiryType") ?? "upload-brief").trim();
    const source = String(form.get("source") ?? "research-planning").trim();
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();

    if (name.length < 2 || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please provide valid name and email." },
        { status: 400 },
      );
    }

    const files = form
      .getAll("files")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);

    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_TOTAL_UPLOAD_BYTES) {
      return NextResponse.json(
        {
          error:
            "Total upload size is too large for email delivery. Keep combined file size under 18MB.",
        },
        { status: 400 },
      );
    }

    const attachments: Array<{
      filename: string;
      contentType?: string;
      contentBase64: string;
    }> = [];

    for (const file of files) {
      if (file.size > MAX_UPLOAD_BYTES) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds 20MB limit.` },
          { status: 400 },
        );
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        contentBase64: buffer.toString("base64"),
      });
    }

    let subject = "Research Planning enquiry";
    let text = "";

    if (enquiryType === "sample-preview") {
      const phone = String(form.get("phone") ?? "").trim();
      const level = String(form.get("level") ?? "").trim();
      const subjectArea = String(form.get("subject") ?? "").trim();
      const requirement = String(form.get("requirement") ?? "").trim();

      if (!phone || !level || !subjectArea || !requirement) {
        return NextResponse.json(
          { error: "Please complete all required sample preview details." },
          { status: 400 },
        );
      }

      subject = `Research Planning sample preview request from ${name}`;
      text = [
        "New subject-specific sample request",
        "",
        `Source: ${source}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone/WhatsApp: ${phone}`,
        `Level: ${level}`,
        `Subject/domain: ${subjectArea}`,
        "",
        "Requirement:",
        requirement,
        "",
        `Submitted at: ${new Date().toISOString()}`,
      ].join("\n");
    } else {
      const triggerLabel = String(form.get("triggerLabel") ?? "Upload Your Brief").trim();
      const enquiryLabel = String(form.get("enquiryLabel") ?? "").trim();
      const emailSubject = String(form.get("emailSubject") ?? "").trim();
      const countryCode = String(form.get("countryCode") ?? "+91").trim();
      const phone = String(form.get("phone") ?? "").trim();
      const timeline = String(form.get("timeline") ?? "").trim();
      const message = String(form.get("message") ?? "").trim();
      const requirements = form
        .getAll("requirements")
        .map((item) => String(item).trim())
        .filter(Boolean);

      if (!timeline || requirements.length === 0) {
        return NextResponse.json(
          { error: "Please select timeline and at least one service requirement." },
          { status: 400 },
        );
      }

      const phoneDisplay = phone
        ? `${countryCode === "other" ? "" : `${countryCode} `}${phone}`.trim()
        : "-";
      subject =
        emailSubject ||
        `RESEARCHEDIT4U ENQUIRY - ${enquiryLabel || triggerLabel || "Upload Your Brief"}`;
      text = [
        "New upload brief enquiry",
        "",
        `Source: ${source}`,
        `Trigger label: ${triggerLabel || "-"}`,
        `Enquiry label: ${enquiryLabel || "-"}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phoneDisplay}`,
        `Timeline: ${timeline}`,
        "",
        "Service requirements:",
        ...requirements.map((item) => `- ${item}`),
        "",
        "Additional message:",
        message || "-",
        "",
        `Submitted at: ${new Date().toISOString()}`,
      ].join("\n");
    }

    const smtpHost = getEnv("BOOKNOW_SMTP_HOST");
    const smtpPortRaw = getEnv("BOOKNOW_SMTP_PORT");
    const smtpSecureRaw = getEnv("BOOKNOW_SMTP_SECURE");
    const smtpUser = getEnv("BOOKNOW_SMTP_USER");
    const smtpPass = getEnv("BOOKNOW_SMTP_PASS");
    const smtpFrom = getEnv("BOOKNOW_SMTP_FROM");
    const routingRecipients = getEnv("RESEARCH_PLANNING_SMTP_TO");
    const fallbackRecipients = getEnv("BOOKNOW_SMTP_TO");
    const smtpToRaw = routingRecipients || fallbackRecipients || "support@researchedit4u.in";

    if (!smtpHost || !smtpFrom) {
      return NextResponse.json(
        { error: "Email service is not configured on the server." },
        { status: 500 },
      );
    }

    const smtpPort = Number(smtpPortRaw || "465");
    const smtpSecure =
      smtpSecureRaw.length === 0
        ? smtpPort === 465
        : smtpSecureRaw.toLowerCase() === "true";
    const recipients = smtpToRaw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!Number.isFinite(smtpPort) || smtpPort <= 0 || recipients.length === 0) {
      return NextResponse.json(
        { error: "Invalid SMTP configuration." },
        { status: 500 },
      );
    }

    const timeoutRaw = getEnv("BOOKNOW_SMTP_TIMEOUT_MS");
    const timeoutMs = Number(timeoutRaw || "120000");
    const safeTimeoutMs =
      Number.isFinite(timeoutMs) && timeoutMs >= 10000 ? timeoutMs : 120000;

    const basePayload = {
      host: smtpHost,
      port: smtpPort,
      username: smtpUser || undefined,
      password: smtpPass || undefined,
      from: smtpFrom,
      to: recipients,
      replyTo: email,
      subject,
      text,
      attachments,
      timeoutMs: safeTimeoutMs,
    };

    try {
      await sendSmtpEmail({
        ...basePayload,
        secure: smtpSecure,
      });
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      const looksLikeTlsMismatch =
        detail.includes("wrong version number") ||
        detail.includes("ssl3_get_record") ||
        detail.includes("EPROTO");
      if (smtpSecure && looksLikeTlsMismatch) {
        await sendSmtpEmail({
          ...basePayload,
          secure: false,
        });
      } else {
        throw error;
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    const hint =
      detail.includes("wrong version number") || detail.includes("ssl3_get_record")
        ? " Check BOOKNOW_SMTP_SECURE and port. Use secure=true with 465, or secure=false with 587/1025."
        : "";
    return NextResponse.json(
      { error: `Unable to process enquiry. ${detail}${hint}` },
      { status: 500 },
    );
  }
}
