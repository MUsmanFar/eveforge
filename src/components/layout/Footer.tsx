"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Container } from "@/components/ui/Container";

const COPYRIGHT_YEAR = 2026;

export function Footer() {
  const year = COPYRIGHT_YEAR;
  const hasFacebook = Boolean(siteConfig.social.facebook);
  const hasInstagram = Boolean(siteConfig.social.instagram);
  const hasSocial = hasFacebook || hasInstagram;

  return (
    <footer className="relative border-t border-[#173E70]/10 bg-[#FFFFFF] text-[#526780]">
      <Container className="py-16 sm:py-20"><div className="footer-invitation"><span>Your next chapter starts here.</span><a href="#contact">Let’s make it matter. <span>↗</span></a></div>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <BrandLogo />
            <p className="mt-5 max-w-xs font-[family-name:var(--font-space-grotesk)] text-lg tracking-tight text-[#10294A]">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs font-medium uppercase tracking-[0.2em] text-[#10294A]">
              Services
            </p>
            <ul className="mt-5 space-y-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`#services`}
                    className="text-sm transition-colors hover:text-[#10294A] motion-safe:duration-300"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs font-medium uppercase tracking-[0.2em] text-[#10294A]">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[#0865C8] transition-colors hover:text-[#10294A] motion-safe:duration-300"
                >
                  {siteConfig.email}
                </a>
              </li>
              {hasSocial ? (
                <li className="flex flex-wrap gap-4 pt-1">
                  {hasInstagram ? (
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#10294A] motion-safe:transition-colors motion-safe:duration-300"
                    >
                      Instagram
                    </a>
                  ) : null}
                  {hasFacebook ? (
                    <a
                      href={siteConfig.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#10294A] motion-safe:transition-colors motion-safe:duration-300"
                    >
                      Facebook
                    </a>
                  ) : null}
                </li>
              ) : null}
            </ul>
          </div>

          <div className="flex flex-col justify-between gap-6 lg:col-span-2 lg:items-end">
            <a
              href="#home"
              className="inline-flex items-center gap-2 self-start text-sm text-[#10294A] transition-colors hover:text-[#0865C8] motion-safe:duration-300 lg:self-end"
            >
              Back to top
              <ArrowUp className="h-4 w-4" aria-hidden />
            </a>
            <nav
              aria-label="Legal"
              className="flex flex-wrap gap-4 text-sm lg:justify-end"
            >
              <Link
                href="/privacy"
                className="hover:text-[#10294A] motion-safe:transition-colors motion-safe:duration-300"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-[#10294A] motion-safe:transition-colors motion-safe:duration-300"
              >
                Terms
              </Link>
            </nav>
          </div>
        </div>

        <div className="footer-wordmark" aria-hidden="true">everforge<span>®</span></div>
        <div className="mt-14 flex flex-col gap-3 border-t border-[#173E70]/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-[#526780]/70">{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
