import { NextRequest, NextResponse } from "next/server";
import { sendSmtpEmail } from "@/lib/smtp";

export const runtime = "nodejs";

type BookNowPayload = {
  name?: string;
  email?: string;
  message?: string;
};

const MAX_UPLOAD_BYTES = 20 * 1024 * 1024; // 20MB per file
const MAX_TOTAL_UPLOAD_BYTES = 18 * 1024 * 1024; // 18MB total for email-safe delivery

function getEnv(name: string) {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : "";
}

export async function POST(request: NextRequest) {
  try {
    let name = "";
    let email = "";
    let message = "";
    const attachments: Array<{
      filename: string;
      contentType?: string;
      contentBase64: string;
    }> = [];

    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      name = String(form.get("name") ?? "").trim();
      email = String(form.get("email") ?? "").trim();
      message = String(form.get("message") ?? "").trim();

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
    } else {
      const body = (await request.json()) as BookNowPayload;
      name = body.name?.trim() ?? "";
      email = body.email?.trim() ?? "";
      message = body.message?.trim() ?? "";
    }

    if (name.length < 2 || !email || !message) {
      return NextResponse.json(
        { error: "Please provide valid name, email, and message." },
        { status: 400 },
      );
    }

    const smtpHost = getEnv("BOOKNOW_SMTP_HOST");
    const smtpPortRaw = getEnv("BOOKNOW_SMTP_PORT");
    const smtpSecureRaw = getEnv("BOOKNOW_SMTP_SECURE");
    const smtpUser = getEnv("BOOKNOW_SMTP_USER");
    const smtpPass = getEnv("BOOKNOW_SMTP_PASS");
    const smtpFrom = getEnv("BOOKNOW_SMTP_FROM");
    const smtpToRaw = getEnv("BOOKNOW_SMTP_TO");

    if (
      !smtpHost ||
      !smtpFrom ||
      !smtpToRaw
    ) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Set BOOKNOW_SMTP_* variables on the server.",
        },
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

    const subject = `New Book Now enquiry from ${name}`;
    const text = [
      "New enquiry from Book Now modal",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
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

      // Common misconfiguration: secure=true with a non-TLS SMTP port (e.g., 1025/587).
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
      { error: `Unable to send enquiry email. ${detail}${hint}` },
      { status: 500 },
    );
  }
}
