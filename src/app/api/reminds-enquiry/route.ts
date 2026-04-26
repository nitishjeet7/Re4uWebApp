import { NextRequest, NextResponse } from "next/server";
import { sendSmtpEmail } from "@/lib/smtp";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

function getEnv(name: string) {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : "";
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    let enquiryType = "";
    let email = "";
    let subject = "";
    let text = "";
    let userSubject = "";
    let userText = "";
    const attachments: Array<{
      filename: string;
      contentType?: string;
      contentBase64: string;
    }> = [];

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      enquiryType = String(form.get("enquiryType") ?? "").trim();
      email = String(form.get("email") ?? "").trim();
      const name = String(form.get("name") ?? "").trim();
      const fileEntry = form.get("file");

      if (enquiryType !== "free-check") {
        return NextResponse.json({ error: "Invalid enquiry type." }, { status: 400 });
      }
      if (!EMAIL_REGEX.test(email) || !(fileEntry instanceof File && fileEntry.size > 0)) {
        return NextResponse.json(
          { error: "Please provide valid email and manuscript file." },
          { status: 400 },
        );
      }
      if (fileEntry.size > MAX_UPLOAD_BYTES) {
        return NextResponse.json(
          { error: `File "${fileEntry.name}" exceeds 20MB limit.` },
          { status: 400 },
        );
      }

      const buffer = Buffer.from(await fileEntry.arrayBuffer());
      attachments.push({
        filename: fileEntry.name,
        contentType: fileEntry.type || "application/octet-stream",
        contentBase64: buffer.toString("base64"),
      });

      subject = `ReMinds free check request from ${email}`;
      text = [
        "ReMinds free manuscript check request",
        "",
        `Name: ${name || "-"}`,
        `Email: ${email}`,
        `Uploaded file: ${fileEntry.name}`,
        "",
        "Please provide clarity/structure feedback and next-step suggestions.",
        `Submitted at: ${new Date().toISOString()}`,
      ].join("\n");
      userSubject = "ReMinds free check request received";
      userText = [
        "Thank you for requesting a free manuscript check.",
        "",
        "Our team has received your request and will share feedback in 24-48 hours.",
      ].join("\n");
    } else {
      const body = (await request.json()) as {
        enquiryType?: string;
        email?: string;
        requestType?: string;
      };
      enquiryType = body.enquiryType?.trim() ?? "";
      email = body.email?.trim() ?? "";

      if (!EMAIL_REGEX.test(email)) {
        return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
      }

      if (enquiryType === "subscribe") {
        subject = `ReMinds subscribe request from ${email}`;
        text = [
          "ReMinds subscription request",
          "",
          `Email: ${email}`,
          `Submitted at: ${new Date().toISOString()}`,
        ].join("\n");
        userSubject = "ReMinds subscription confirmed";
        userText = [
          "Thank you for subscribing to ReMinds updates.",
          "",
          "You will receive publishing tips, reviews, and templates.",
        ].join("\n");
      } else if (enquiryType === "resource-request") {
        const requestType = body.requestType?.trim() ?? "";
        if (!requestType) {
          return NextResponse.json(
            { error: "Please select a request type." },
            { status: 400 },
          );
        }
        subject = `ReMinds resource request (${requestType}) from ${email}`;
        text = [
          "ReMinds resource request",
          "",
          `Request type: ${requestType}`,
          `Email: ${email}`,
          `Submitted at: ${new Date().toISOString()}`,
        ].join("\n");
        userSubject = "ReMinds request received";
        userText = [
          `Thank you. We received your request: ${requestType}.`,
          "",
          "Our team will respond within 24-48 hours.",
        ].join("\n");
      } else {
        return NextResponse.json({ error: "Invalid enquiry type." }, { status: 400 });
      }
    }

    const smtpHost = getEnv("BOOKNOW_SMTP_HOST");
    const smtpPortRaw = getEnv("BOOKNOW_SMTP_PORT");
    const smtpSecureRaw = getEnv("BOOKNOW_SMTP_SECURE");
    const smtpUser = getEnv("BOOKNOW_SMTP_USER");
    const smtpPass = getEnv("BOOKNOW_SMTP_PASS");
    const smtpFrom = getEnv("BOOKNOW_SMTP_FROM");
    const remindsRecipients = getEnv("REMINDS_SMTP_TO");
    const fallbackRecipients = getEnv("BOOKNOW_SMTP_TO");
    const smtpToRaw = remindsRecipients || fallbackRecipients || "support@researchedit4u.in";

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
      return NextResponse.json({ error: "Invalid SMTP configuration." }, { status: 500 });
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
      timeoutMs: safeTimeoutMs,
    };

    const sendWithFallback = async (payload: {
      to: string[];
      subject: string;
      text: string;
      replyTo?: string;
      attachments?: Array<{
        filename: string;
        contentType?: string;
        contentBase64: string;
      }>;
    }) => {
      try {
        await sendSmtpEmail({
          ...basePayload,
          ...payload,
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
            ...payload,
            secure: false,
          });
        } else {
          throw error;
        }
      }
    };

    await sendWithFallback({
      to: recipients,
      replyTo: email,
      subject,
      text,
      attachments,
    });

    if (userSubject && userText) {
      await sendWithFallback({
        to: [email],
        subject: userSubject,
        text: userText,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    const hint =
      detail.includes("wrong version number") || detail.includes("ssl3_get_record")
        ? " Check BOOKNOW_SMTP_SECURE and port. Use secure=true with 465, or secure=false with 587/1025."
        : "";
    return NextResponse.json(
      { error: `Unable to process request. ${detail}${hint}` },
      { status: 500 },
    );
  }
}
