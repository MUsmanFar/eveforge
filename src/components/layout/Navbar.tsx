"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Link from "next/link";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const panelId = useId();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section[id]'));
      const current = sections.filter(el => el.getBoundingClientRect().top <= window.innerHeight * .35).at(-1);
      if (current) setActiveSection('#' + current.id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lockScroll = useCallback((locked: boolean) => {
    document.body.style.overflow = locked ? "hidden" : "";
  }, []);

  const closeMenu = useCallback(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) {
      setOpen(false);
      lockScroll(false);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpen(false); lockScroll(false); previouslyFocused.current?.focus(); return;
    }
    const tl = gsap.timeline({
      onComplete: () => {
        setOpen(false);
        lockScroll(false);
        previouslyFocused.current?.focus();
      },
    });

    tl.to(panel, {
      x: "100%",
      duration: 0.35,
      ease: "power3.in",
    }).to(
      overlay,
      { opacity: 0, duration: 0.25, ease: "power2.in" },
      0,
    );
  }, [lockScroll]);

  const openMenu = useCallback(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    setOpen(true);
    lockScroll(true);
  }, [lockScroll]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.set(panel, { x: "100%" });
    gsap.set(overlay, { opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => closeBtnRef.current?.focus(),
    });

    tl.to(overlay, { opacity: 1, duration: reduced ? 0 : 0.3, ease: "power2.out" }).to(
      panel,
      { x: "0%", duration: reduced ? 0 : 0.45, ease: "power3.out" },
      0.05,
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); tl.kill(); };
  }, [open, closeMenu]);

  useEffect(() => {
    return () => {
      lockScroll(false);
    };
  }, [lockScroll]);

  const onPanelKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !panelRef.current) return;

    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] motion-safe:duration-300",
          scrolled
            ? "border-b border-[#173E70]/10 bg-[#F4F6F9]/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-[4.25rem] sm:px-8 lg:px-12"
          aria-label="Primary"
        >
          <BrandLogo className="relative z-10" priority />

          <ul className="hidden items-center gap-1 lg:flex">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={activeSection === item.href ? "location" : undefined}
                  className="rounded-sm px-3 py-2 text-sm text-[#526780] transition-colors hover:text-[#10294A] motion-safe:duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087FF5]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Button
              href="#contact"
              variant="primary"
              className="hidden px-5 py-2.5 text-sm sm:inline-flex"
            >
              Let&apos;s Talk
            </Button>

            <button
              ref={menuBtnRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#173E70]/10 text-[#10294A] transition-colors hover:border-[#087FF5]/50 hover:bg-[#087FF5]/5 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087FF5]"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => (open ? closeMenu() : openMenu())}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {open ? (
        <div data-lenis-prevent className="fixed inset-0 z-[60] lg:hidden" role="presentation">
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-[#F4F6F9]/70 backdrop-blur-sm"
            onClick={closeMenu}
            aria-hidden
          />
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            tabIndex={-1}
            onKeyDown={onPanelKeyDown}
            className="absolute inset-y-0 right-0 flex w-[min(100%,20rem)] flex-col border-l border-[#173E70]/10 bg-[#FFFFFF] shadow-2xl"
          >
            <div className="flex h-16 items-center justify-between border-b border-[#173E70]/10 px-5">
              <span className="font-[family-name:var(--font-space-grotesk)] text-sm tracking-wide text-[#10294A]">
                Menu
              </span>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeMenu}
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-[#10294A] hover:bg-[#087FF5]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087FF5]"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ul className="flex flex-1 flex-col gap-1 px-4 py-6">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                  aria-current={activeSection === item.href ? "location" : undefined}
                    onClick={closeMenu}
                    className="block rounded-sm px-3 py-3.5 text-base text-[#10294A] transition-colors hover:bg-[#087FF5]/5 hover:text-[#0865C8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087FF5]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="border-t border-[#173E70]/10 p-5">
              <Button
                href="#contact"
                variant="primary"
                className="w-full"
                onClick={closeMenu}
              >
                Let&apos;s Talk
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
