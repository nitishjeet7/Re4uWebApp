import { NextRequest, NextResponse } from "next/server";
import { sendSmtpEmail } from "@/lib/smtp";

export const runtime = "nodejs";

type QuotePayload = {
  source?: string;
  selectedPlan?: string;
  name?: string;
  mobile?: string;
  email?: string;
  requested?: string;
  consent?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getEnv(name: string) {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : "";
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as QuotePayload;

    const source = body.source?.trim() || "editing-plans-pricing";
    const selectedPlan = body.selectedPlan?.trim() || "";
    const name = body.name?.trim() || "";
    const mobile = body.mobile?.trim() || "";
    const email = body.email?.trim() || "";
    const requested = body.requested?.trim() || "";
    const consent = body.consent?.trim() || "no";

    if (
      selectedPlan.length < 2 ||
      name.length < 2 ||
      mobile.length < 7 ||
      !EMAIL_REGEX.test(email) ||
      requested.length < 2 ||
      consent.toLowerCase() !== "yes"
    ) {
      return NextResponse.json(
        { error: "Please provide valid details and consent to continue." },
        { status: 400 },
      );
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

    const subject = `Editing plan quote request from ${name}`;
    const text = [
      "New Editing Plans quote request",
      "",
      `Source: ${source}`,
      `Selected plan: ${selectedPlan}`,
      `Name: ${name}`,
      `Mobile: ${mobile}`,
      `Email: ${email}`,
      `Requested improvements: ${requested}`,
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
