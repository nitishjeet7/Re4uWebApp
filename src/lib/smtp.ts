import net from "node:net";
import tls from "node:tls";

type SendSmtpEmailInput = {
  host: string;
  port: number;
  secure: boolean;
  username?: string;
  password?: string;
  starttls?: boolean;
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  text: string;
  timeoutMs?: number;
  attachments?: Array<{
    filename: string;
    contentType?: string;
    contentBase64: string;
  }>;
};

type AnySocket = net.Socket | tls.TLSSocket;

function parseCode(response: string) {
  const match = response.match(/^(\d{3})/m);
  if (!match) return null;
  return Number(match[1]);
}

function extractResponse(buffer: string) {
  const lineBreakIndex = buffer.lastIndexOf("\r\n");
  if (lineBreakIndex < 0) return null;
  const lines = buffer.slice(0, lineBreakIndex).split("\r\n");
  const last = lines[lines.length - 1];
  if (!/^\d{3}\s/.test(last)) return null;
  return {
    response: `${buffer.slice(0, lineBreakIndex)}\r\n`,
    rest: buffer.slice(lineBreakIndex + 2),
  };
}

function toBase64Lines(value: string) {
  return value.replace(/(.{76})/g, "$1\r\n");
}

function sanitizeHeaderValue(value: string) {
  return value.replace(/[\r\n"]/g, "_");
}

function escapeSmtpData(value: string) {
  return value
    .replace(/\r?\n/g, "\r\n")
    .split("\r\n")
    .map((line) => (line.startsWith(".") ? `.${line}` : line))
    .join("\r\n");
}

function buildMessage(params: {
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  text: string;
  attachments?: Array<{
    filename: string;
    contentType?: string;
    contentBase64: string;
  }>;
}) {
  const attachments = params.attachments ?? [];
  const normalizedBody = escapeSmtpData(params.text);

  if (attachments.length === 0) {
    const headers = [
      `From: ${params.from}`,
      `To: ${params.to.join(", ")}`,
      params.replyTo ? `Reply-To: ${params.replyTo}` : "",
      `Subject: ${params.subject}`,
      "MIME-Version: 1.0",
      'Content-Type: text/plain; charset="UTF-8"',
      "Content-Transfer-Encoding: 8bit",
      "",
    ]
      .filter(Boolean)
      .join("\r\n");

    return `${headers}\r\n${normalizedBody}\r\n`;
  }

  const boundary = `re4u-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const headers = [
    `From: ${params.from}`,
    `To: ${params.to.join(", ")}`,
    params.replyTo ? `Reply-To: ${params.replyTo}` : "",
    `Subject: ${params.subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    "",
  ]
    .filter(Boolean)
    .join("\r\n");

  const parts: string[] = [];
  parts.push(`--${boundary}`);
  parts.push('Content-Type: text/plain; charset="UTF-8"');
  parts.push("Content-Transfer-Encoding: 8bit");
  parts.push("");
  parts.push(normalizedBody);

  for (const attachment of attachments) {
    parts.push(`--${boundary}`);
    parts.push(
      `Content-Type: ${attachment.contentType || "application/octet-stream"}; name="${sanitizeHeaderValue(attachment.filename)}"`,
    );
    parts.push(
      `Content-Disposition: attachment; filename="${sanitizeHeaderValue(attachment.filename)}"`,
    );
    parts.push("Content-Transfer-Encoding: base64");
    parts.push("");
    parts.push(toBase64Lines(attachment.contentBase64));
  }

  parts.push(`--${boundary}--`);
  parts.push("");

  return `${headers}\r\n${parts.join("\r\n")}`;
}

async function connectSmtp(
  host: string,
  port: number,
  secure: boolean,
  timeoutMs = 12000,
): Promise<SmtpSession> {
  const socket = secure
    ? tls.connect({ host, port, servername: host })
    : net.createConnection({ host, port });
  const readyEvent = secure ? "secureConnect" : "connect";

  await new Promise<void>((resolve, reject) => {
    const onReady = () => {
      socket.off("error", onError);
      resolve();
    };
    const onError = (error: Error) => {
      socket.off(readyEvent, onReady);
      reject(error);
    };
    socket.once(readyEvent, onReady);
    socket.once("error", onError);
  });

  const session = new SmtpSession(socket, timeoutMs);
  const greeting = await session.readResponse();
  assertCode(greeting, [220]);
  return session;
}

function assertCode(response: string, expected: number[]) {
  const code = parseCode(response);
  if (code && expected.includes(code)) return;
  throw new Error(`SMTP error: ${response.trim()}`);
}

class SmtpSession {
  private socket: AnySocket;
  private readonly timeoutMs: number;
  private buffer = "";
  private closed = false;
  private pending:
    | {
        resolve: (response: string) => void;
        reject: (error: Error) => void;
      }
    | null = null;

  constructor(socket: AnySocket, timeoutMs: number) {
    this.socket = socket;
    this.timeoutMs = timeoutMs;
    this.bindSocket(this.socket);
  }

  private bindSocket(socket: AnySocket) {
    socket.setEncoding("utf8");
    socket.setTimeout(this.timeoutMs);
    socket.on("data", this.onData);
    socket.on("error", this.onError);
    socket.on("timeout", this.onTimeout);
    socket.on("close", this.onClose);
  }

  private unbindSocket(socket: AnySocket) {
    socket.off("data", this.onData);
    socket.off("error", this.onError);
    socket.off("timeout", this.onTimeout);
    socket.off("close", this.onClose);
  }

  private onData = (chunk: string) => {
    this.buffer += chunk;
    this.flushResponse();
  };

  private onError = (error: Error) => {
    if (this.pending) {
      const current = this.pending;
      this.pending = null;
      current.reject(error);
    }
  };

  private onTimeout = () => {
    this.socket.destroy(new Error("SMTP connection timed out"));
  };

  private onClose = () => {
    this.closed = true;
    if (this.pending) {
      const current = this.pending;
      this.pending = null;
      current.reject(new Error("SMTP connection closed"));
    }
  };

  private flushResponse() {
    if (!this.pending) return;
    const parsed = extractResponse(this.buffer);
    if (!parsed) return;
    this.buffer = parsed.rest;
    const current = this.pending;
    this.pending = null;
    current.resolve(parsed.response);
  }

  async readResponse() {
    if (this.closed) throw new Error("SMTP connection is closed");
    if (this.pending) throw new Error("SMTP response already pending");
    return await new Promise<string>((resolve, reject) => {
      this.pending = { resolve, reject };
      this.flushResponse();
    });
  }

  async send(command: string) {
    this.socket.write(`${command}\r\n`);
    return await this.readResponse();
  }

  async upgradeToTls(host: string) {
    const current = this.socket;
    this.unbindSocket(current);
    const upgraded = tls.connect({
      socket: current as net.Socket,
      servername: host,
    });
    await new Promise<void>((resolve, reject) => {
      upgraded.once("secureConnect", () => resolve());
      upgraded.once("error", (error) => reject(error));
    });
    this.socket = upgraded;
    this.bindSocket(this.socket);
  }

  close() {
    if (this.closed) return;
    this.closed = true;
    this.unbindSocket(this.socket);
    this.socket.end();
  }
}

function supportsStarttls(ehloResponse: string) {
  return /(^|\r\n)250[-\s]STARTTLS(\r\n|$)/i.test(ehloResponse);
}

export async function sendSmtpEmail(input: SendSmtpEmailInput) {
  const timeoutMs =
    typeof input.timeoutMs === "number" && input.timeoutMs >= 10000
      ? input.timeoutMs
      : 120000;
  const connection = await connectSmtp(
    input.host,
    input.port,
    input.secure,
    timeoutMs,
  );
  try {
    const allowStarttls = input.starttls ?? true;
    let response = await connection.send(`EHLO ${input.host}`);
    assertCode(response, [250]);

    if (!input.secure && allowStarttls && supportsStarttls(response)) {
      response = await connection.send("STARTTLS");
      assertCode(response, [220]);
      await connection.upgradeToTls(input.host);
      response = await connection.send(`EHLO ${input.host}`);
      assertCode(response, [250]);
    }

    const shouldAuth = Boolean(input.username && input.password);
    if (shouldAuth) {
      response = await connection.send("AUTH LOGIN");
      assertCode(response, [334]);

      response = await connection.send(
        Buffer.from(input.username ?? "").toString("base64"),
      );
      assertCode(response, [334]);

      response = await connection.send(
        Buffer.from(input.password ?? "").toString("base64"),
      );
      assertCode(response, [235]);
    }

    response = await connection.send(`MAIL FROM:<${input.from}>`);
    assertCode(response, [250]);

    for (const recipient of input.to) {
      response = await connection.send(`RCPT TO:<${recipient}>`);
      assertCode(response, [250, 251]);
    }

    response = await connection.send("DATA");
    assertCode(response, [354]);

    const message = buildMessage({
      from: input.from,
      to: input.to,
      replyTo: input.replyTo,
      subject: input.subject,
      text: input.text,
      attachments: input.attachments,
    });

    response = await connection.send(`${message}\r\n.`);
    assertCode(response, [250]);

    await connection.send("QUIT");
  } finally {
    connection.close();
  }
}
