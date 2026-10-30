import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `How ${siteConfig.name} collects and uses information submitted through our contact form.`,
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F4F6F9] text-[#526780]">
      <Container narrow className="py-20 sm:py-28">
        <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-[0.2em] text-[#0865C8]">
          Legal
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-4xl tracking-tight text-[#10294A] sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm">Last updated: October 28, 2026</p>

        <div className="mt-12 space-y-10 text-base leading-relaxed">
          <section>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl text-[#10294A]">
              Who we are
            </h2>
            <p className="mt-3">
              {siteConfig.name} (&quot;we&quot;, &quot;us&quot;) operates this
              website. For privacy questions, contact us at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[#0865C8] underline-offset-2 hover:underline"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl text-[#10294A]">
              Information we collect
            </h2>
            <p className="mt-3">
              When you use our contact form, we collect the details you choose
              to submit, which may include your name, business email address,
              company name, service interest, optional budget range, and
              message. We do not ask for payment card details through this
              form.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl text-[#10294A]">
              How we use form data
            </h2>
            <p className="mt-3">We use contact form submissions solely to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Respond to your inquiry and discuss potential work</li>
              <li>Understand project needs and prepare relevant follow-up</li>
              <li>Maintain basic records of business correspondence</li>
            </ul>
            <p className="mt-3">
              We do not sell your personal information. We do not use contact
              form data for unrelated marketing lists without your consent.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl text-[#10294A]">
              Email delivery
            </h2>
            <p className="mt-3">
              Form messages may be delivered to our inbox using a third-party
              email provider (such as Resend). That provider processes the
              message content only to transmit it to us. Delivery depends on
              our server configuration; if email delivery is unavailable, you
              may contact us directly at {siteConfig.email}.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl text-[#10294A]">
              Retention
            </h2>
            <p className="mt-3">
              We retain inquiry emails for as long as needed to manage the
              conversation and for reasonable business record-keeping, then
              delete or archive them according to our internal practices.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl text-[#10294A]">
              Your choices
            </h2>
            <p className="mt-3">
              You may request access to, correction of, or deletion of personal
              information you have sent us by emailing {siteConfig.email}. We
              will respond within a reasonable timeframe.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl text-[#10294A]">
              Updates
            </h2>
            <p className="mt-3">
              We may update this policy from time to time. The &quot;Last
              updated&quot; date at the top of this page will reflect the
              latest revision.
            </p>
          </section>
        </div>

        <p className="mt-16 text-sm">
          <Link
            href="/"
            className="text-[#0865C8] underline-offset-2 hover:underline"
          >
            ← Back to home
          </Link>
        </p>
      </Container>
    </main>
  );
}
