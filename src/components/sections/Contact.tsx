"use client";

import { useMemo, useState, type FormEvent } from "react";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";


import { cn } from "@/lib/cn";

type FormStatus = "idle" | "submitting" | "success" | "error";

type ContactProps = {
  /** Force the unconfigured messaging (useful for demos). */
  emailConfigured?: boolean;
};

const fieldClass =
  "w-full rounded-sm border border-[#173E70]/10 bg-[#E9EEF5]/80 px-4 py-3 text-sm text-[#10294A] placeholder:text-[#526780]/60 outline-none transition-colors motion-safe:duration-300 focus:border-[#087FF5] focus:ring-1 focus:ring-[#087FF5]";

const labelClass =
  "mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-[#526780]";

export function Contact({ emailConfigured }: ContactProps) {
  const socialConfigured = Boolean(
    siteConfig.social.facebook || siteConfig.social.instagram,
  );

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [unconfiguredHint, setUnconfiguredHint] = useState(
    emailConfigured === false,
  );

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Project inquiry — Everforge");
    const body = encodeURIComponent(
      "Hi Everforge,\n\nI'd like to discuss a project.\n\nName:\nCompany:\nService needed:\nMessage:\n",
    );
    return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get("fullName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      service: String(formData.get("service") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(), // honeypot
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        unconfigured?: boolean;
      };

      if (!response.ok) {
        if (data.unconfigured || emailConfigured === false) {
          setUnconfiguredHint(true);
        }
        setStatus("error");
        setErrorMessage(
          data.error ||
            "Something went wrong. Please email us directly and we will respond shortly.",
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "Unable to reach the server. Please try again or email us directly.",
      );
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[#F4F6F9] py-24 sm:py-32 lg:py-40"
    >
      
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5" data-reveal="contact-intro">
            <SectionEyebrow index="06" label="Let's connect" />
            <h2
              id="contact-heading"
              className="mt-6 font-[family-name:var(--font-space-grotesk)] text-4xl leading-[1.1] tracking-tight text-[#10294A] sm:text-5xl"
            >
              Have an Idea?
              <br />
              Let&apos;s Make It Matter.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[#526780]">
              Tell us what you&apos;re building, improving, or imagining. We&apos;d
              love to explore what comes next.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={mailtoHref} variant="primary">
                Email Us
              </Button>
              {socialConfigured ? (
                <>
                  {siteConfig.social.instagram ? (
                    <Button
                      href={siteConfig.social.instagram}
                      variant="secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DM Us
                    </Button>
                  ) : siteConfig.social.facebook ? (
                    <Button
                      href={siteConfig.social.facebook}
                      variant="secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DM Us
                    </Button>
                  ) : null}
                </>
              ) : null}
            </div>

            <p className="mt-8 text-sm text-[#526780]">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[#0865C8] underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
            </p>

            <div className="contact-next"><span>WHAT HAPPENS NEXT</span><ol><li><b>01</b> We read your brief.</li><li><b>02</b> We talk through the possibilities.</li><li><b>03</b> You get a clear way forward.</li></ol></div>
            {unconfiguredHint || emailConfigured === false ? (
              <p
                role="status"
                className="mt-6 max-w-sm border border-[#087FF5]/30 bg-[#087FF5]/10 px-4 py-3 text-sm leading-relaxed text-[#526780]"
              >
                Form delivery is not fully configured yet. Use{" "}
                <strong className="font-medium text-[#10294A]">Email Us</strong>{" "}
                or write to {siteConfig.email} and we will respond promptly.
              </p>
            ) : null}
          </div>

          <div className="lg:col-span-7" data-reveal="contact-form">
            <form
              onSubmit={handleSubmit}
              className="ef-panel relative rounded-sm p-6 sm:p-8 lg:p-10"
            >
              <div className="form-intro"><span>Tell us a little about your idea</span><p>We’ll take it from here.</p></div>
              {/* Honeypot — hidden from users */}
              <div
                className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="fullName" className={labelClass}>
                    Full name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    minLength={2}
                    maxLength={120}
                    autoComplete="name"
                    className={fieldClass}
                    placeholder="Alex Morgan"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="email" className={labelClass}>
                    Business email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    className={fieldClass}
                    placeholder="alex@company.com"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="company" className={labelClass}>
                    Company{" "}
                    <span className="normal-case tracking-normal text-[#526780]/60">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    maxLength={160}
                    autoComplete="organization"
                    className={fieldClass}
                    placeholder="Acme Co."
                  />
                </div>

                <fieldset className="service-picker sm:col-span-2">
                  <legend>What can we help you with? <span>*</span></legend>
                  <div className="service-options">
                    {[...services.map(service => service.title), "Not sure / Multiple"].map(title => <label key={title} className="service-choice"><input type="radio" name="service" value={title} required/><span>{title}<b aria-hidden="true">↗</b></span></label>)}
                  </div>
                </fieldset>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className={labelClass}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={5}
                    className={cn(fieldClass, "resize-y min-h-[8rem]")}
                    placeholder="Tell us about your goals, timeline, and anything we should know."
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto"
                >
                  {status === "submitting" ? "Sending…" : "Send message"}
                </Button>

                <p className="text-xs leading-relaxed text-[#526780]/80">
                  By submitting, you agree to our{" "}
                  <a
                    href="/privacy"
                    className="text-[#0865C8] underline-offset-2 hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              {status === "success" ? (
                <p
                  role="status"
                  className="mt-6 text-sm text-[#0865C8]"
                >
                  Message received. We will reply to your email shortly.
                </p>
              ) : null}

              {status === "error" && errorMessage ? (
                <p role="alert" className="mt-6 text-sm text-red-300">
                  {errorMessage}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
