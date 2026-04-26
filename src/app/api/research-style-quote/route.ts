import { NextRequest, NextResponse } from "next/server";
import { sendSmtpEmail } from "@/lib/smtp";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_UPLOAD_BYTES = 20 * 1024 * 1024; // 20MB max

function getEnv(name: string) {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : "";
}

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();

    const source = String(form.get("source") ?? "editing-research-style").trim();
    const researchStyle = String(form.get("researchStyle") ?? "").trim();
    const selectedPlan = String(form.get("selectedPlan") ?? "").trim();
    const name = String(form.get("name") ?? "").trim();
    const mobile = String(form.get("mobile") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const deadline = String(form.get("deadline") ?? "").trim();
    const wordCount = String(form.get("wordCount") ?? "").trim();
    const field = String(form.get("field") ?? "").trim();
    const improvements = String(form.get("improvements") ?? "").trim();
    const consent = String(form.get("consent") ?? "no").trim();
    const fileEntry = form.get("file");

    if (
      name.length < 2 ||
      mobile.length < 7 ||
      !EMAIL_REGEX.test(email) ||
      selectedPlan.length < 2 ||
      consent.toLowerCase() !== "yes"
    ) {
      return NextResponse.json(
        { error: "Please provide valid details and consent to continue." },
        { status: 400 },
      );
    }

    const attachments: Array<{
      filename: string;
      contentType?: string;
      contentBase64: string;
    }> = [];

    if (fileEntry instanceof File && fileEntry.size > 0) {
      if (fileEntry.size > MAX_UPLOAD_BYTES) {
        return NextResponse.json(
          { error: "Uploaded file exceeds 20MB limit." },
          { status: 400 },
        );
      }
      const buffer = Buffer.from(await fileEntry.arrayBuffer());
      attachments.push({
        filename: fileEntry.name,
        contentType: fileEntry.type || "application/octet-stream",
        contentBase64: buffer.toString("base64"),
      });
    }

    const smtpHost = getEnv("BOOKNOW_SMTP_HOST");
    const smtpPortRaw = getEnv("BOOKNOW_SMTP_PORT");
    const smtpSecureRaw = getEnv("BOOKNOW_SMTP_SECURE");
    const smtpUser = getEnv("BOOKNOW_SMTP_USER");
    const smtpPass = getEnv("BOOKNOW_SMTP_PASS");
    const smtpFrom = getEnv("BOOKNOW_SMTP_FROM");
    const quoteRecipients = getEnv("RESEARCH_STYLE_QUOTE_SMTP_TO");
    const fallbackRecipients = getEnv("BOOKNOW_SMTP_TO");
    const smtpToRaw = quoteRecipients || fallbackRecipients || "support@researchedit4u.in";

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

    const subject = `Research style quote request from ${name}`;
    const text = [
      "New Editing Research Style quote request",
      "",
      `Source: ${source}`,
      `Research style: ${researchStyle}`,
      `Selected plan: ${selectedPlan}`,
      `Name: ${name}`,
      `Mobile: ${mobile}`,
      `Email: ${email}`,
      `Deadline: ${deadline || "Not specified"}`,
      `Word count: ${wordCount || "Not specified"}`,
      `Field: ${field || "Not specified"}`,
      `Requested improvements: ${improvements || "Not specified"}`,
      `Consent: ${consent}`,
      "",
      `Submitted at: ${new Date().toISOString()}`,
    ].join("\n");

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
      { error: `Unable to submit quote request. ${detail}${hint}` },
      { status: 500 },
    );
  }
}
