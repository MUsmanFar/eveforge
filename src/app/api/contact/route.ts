import { services } from "@/data/services";
import { Resend } from "resend";
import { NextResponse } from "next/server";

type ContactPayload = {
  fullName?: unknown;
  email?: unknown;
  company?: unknown;
  service?: unknown;
  budget?: unknown;
  message?: unknown;
  website?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL);
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
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
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
  const budget = asTrimmedString(body.budget);
  const message = asTrimmedString(body.message);

  if (fullName.length > 120 || email.length > 254 || company.length > 160 || message.length > 5000) {
    return NextResponse.json({ ok: false, error: "One or more fields exceed the allowed length." }, { status: 400 });
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

  if (!services.some((item) => item.title === service) && service !== "Not sure / Multiple") {
    return NextResponse.json(
      { ok: false, error: "Please select a service." },
      { status: 400 },
    );
  }

  if (!message || message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please include a short message (at least 10 characters)." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL || "everforge9@gmail.com";

  if (!apiKey || !fromEmail) {
    return NextResponse.json(
      {
        ok: false,
        unconfigured: true,
        error:
          "Contact form email delivery is not configured. Please email everforge9@gmail.com directly.",
      },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Everforge inquiry — ${service} — ${fullName}`,
      text: [
        `New contact form submission`,
        ``,
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Company: ${company || "—"}`,
        `Service: ${service}`,
        `Budget: ${budget || "—"}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
    });

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          error:
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

// Optional GET helps confirm the route exists during setup
export async function GET() {
  return NextResponse.json({
    ok: true,
    configured: isConfigured(),
  });
}
