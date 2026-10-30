import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: `Terms of Use | ${siteConfig.name}`,
  description: `Terms governing use of the ${siteConfig.name} website and contact form.`,
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F4F6F9] text-[#526780]">
      <Container narrow className="py-20 sm:py-28">
        <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-[0.2em] text-[#0865C8]">
          Legal
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-4xl tracking-tight text-[#10294A] sm:text-5xl">
          Terms of Use
        </h1>
        <p className="mt-4 text-sm">Last updated: October 28, 2026</p>

        <div className="mt-12 space-y-10 text-base leading-relaxed">
          <section>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl text-[#10294A]">
              Agreement
            </h2>
            <p className="mt-3">
              By accessing this website or submitting the contact form, you
              agree to these Terms of Use. If you do not agree, please do not
              use the site or form. For questions, email{" "}
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
              Website purpose
            </h2>
            <p className="mt-3">
              This site describes {siteConfig.name}&apos;s services and
              provides a way to inquire about potential projects. Content is
              for general information and does not constitute a binding offer,
              proposal, or professional advice until confirmed in a separate
              written agreement.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl text-[#10294A]">
              Contact form
            </h2>
            <p className="mt-3">
              When you submit the contact form, you confirm that the
              information you provide is accurate to the best of your knowledge
              and that you are authorized to share it. Submitting a form does
              not create a client relationship. We may decline or not respond
              to inquiries that appear automated, abusive, or unrelated to our
              services.
            </p>
            <p className="mt-3">
              Form delivery depends on our email configuration. If the form
              cannot send, please contact us directly at {siteConfig.email}.
              Use of form data is described in our{" "}
              <Link
                href="/privacy"
                className="text-[#0865C8] underline-offset-2 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl text-[#10294A]">
              Intellectual property
            </h2>
            <p className="mt-3">
              Branding, text, layouts, and other materials on this site are
              owned by {siteConfig.name} or used with permission. You may not
              copy, redistribute, or reuse them for commercial purposes without
              prior written consent.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl text-[#10294A]">
              Disclaimer
            </h2>
            <p className="mt-3">
              The site is provided &quot;as is.&quot; We strive for accuracy
              and availability but do not warrant that content is complete,
              current, or uninterrupted. To the fullest extent permitted by
              law, {siteConfig.name} is not liable for indirect or
              consequential damages arising from use of this website.
            </p>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl text-[#10294A]">
              Changes
            </h2>
            <p className="mt-3">
              We may revise these terms periodically. Continued use of the
              site after changes are posted constitutes acceptance of the
              updated terms. The &quot;Last updated&quot; date reflects the
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
