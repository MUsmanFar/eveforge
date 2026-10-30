import { services } from "@/data/services";
import { NextResponse } from "next/server";

type ContactPayload = {
  fullName?: unknown;
  email?: unknown;
  company?: unknown;
  service?: unknown;
  message?: unknown;
  website?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Web3Forms access key — overridable via WEB3FORMS_ACCESS_KEY. */
const WEB3FORMS_ACCESS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY ||
  "9d3cc1e7-4dc2-4c8c-9c7f-2b461b06750f";

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isConfigured() {
  return Boolean(WEB3FORMS_ACCESS_KEY);
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot — silently succeed for bots
  const honeypot = asTrimmedString(body.website);
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const fullName = asTrimmedString(body.fullName);
  const email = asTrimmedString(body.email);
  const company = asTrimmedString(body.company);
  const service = asTrimmedString(body.service);
  const message = asTrimmedString(body.message);

  if (
    fullName.length > 120 ||
    email.length > 254 ||
    company.length > 160 ||
    message.length > 5000
  ) {
    return NextResponse.json(
      { ok: false, error: "One or more fields exceed the allowed length." },
      { status: 400 },
    );
  }

  if (!fullName || fullName.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please provide your full name." },
      { status: 400 },
    );
  }

  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid business email." },
      { status: 400 },
    );
  }

  if (
    !services.some((item) => item.title === service) &&
    service !== "Not sure / Multiple"
  ) {
    return NextResponse.json(
      { ok: false, error: "Please select a service." },
      { status: 400 },
    );
  }

  if (!message || message.length < 10) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Please include a short message (at least 10 characters).",
      },
      { status: 400 },
    );
  }

  if (!WEB3FORMS_ACCESS_KEY) {
    return NextResponse.json(
      {
        ok: false,
        unconfigured: true,
        error:
          "Contact form is not configured. Please email everforge9@gmail.com directly.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Everforge inquiry — ${service} — ${fullName}`,
        from_name: "Everforge Website",
        name: fullName,
        email,
        company: company || "—",
        service,
        message,
        replyto: email,
      }),
    });

    const data = (await response.json()) as {
      success?: boolean;
      message?: string;
    };

    if (!response.ok || !data.success) {
      return NextResponse.json(
        {
          ok: false,
          error:
            data.message ||
            "We could not send your message right now. Please email everforge9@gmail.com.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not send your message right now. Please email everforge9@gmail.com.",
      },
      { status: 502 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    configured: isConfigured(),
    provider: "web3forms",
  });
}
