"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, ExternalLink, Monitor, Smartphone } from "lucide-react";
import type { Project } from "@/data/projects";
import { LaptopFrame } from "@/components/work/LaptopFrame";
import { PhoneFrame } from "@/components/work/PhoneFrame";
import { cn } from "@/lib/cn";

type DeviceMode = "desktop" | "mobile";

type ProjectShowcaseProps = {
  projects: Project[];
};

function padIndex(n: number) {
  return String(n).padStart(2, "0");
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [index, setIndex] = useState(0);
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [reducedMotion, setReducedMotion] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const pendingDirectionRef = useRef(1);
  const skipIntroRef = useRef(true);

  const total = projects.length;
  const project = projects[index];
  const counterId = useId();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Fade / slide content in after index changes (scroll reset handled in frames)
  useEffect(() => {
    if (skipIntroRef.current) {
      skipIntroRef.current = false;
      return;
    }

    const stage = stageRef.current;
    const meta = metaRef.current;
    if (!stage || !meta) {
      animatingRef.current = false;
      return;
    }

    if (reducedMotion) {
      gsap.set([stage, meta], { opacity: 1, x: 0 });
      animatingRef.current = false;
      return;
    }

    const direction = pendingDirectionRef.current;
    gsap.fromTo(
      [stage, meta],
      { opacity: 0, x: direction * 28 },
      {
        opacity: 1,
        x: 0,
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => {
          animatingRef.current = false;
        },
      },
    );
  }, [index, reducedMotion]);

  const goTo = useCallback(
    (next: number) => {
      if (animatingRef.current || total === 0) return;
      const wrapped = ((next % total) + total) % total;
      if (wrapped === index) return;

      const stage = stageRef.current;
      const meta = metaRef.current;
      const direction = next >= index ? 1 : -1;
      pendingDirectionRef.current = direction;

      if (reducedMotion || !stage || !meta) {
        setIndex(wrapped);
        return;
      }

      animatingRef.current = true;

      gsap.to([stage, meta], {
        opacity: 0,
        x: direction * -24,
        duration: 0.28,
        ease: "power2.in",
        onComplete: () => {
          setIndex(wrapped);
        },
      });
    },
    [index, reducedMotion, total],
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target || !rootRef.current?.contains(target) || target.closest("[data-lenis-prevent]")) return;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  if (!project) return null;

  const contentKey = `${project.id}-${device}`;

  return (
    <div ref={rootRef} className="mt-14 sm:mt-16 lg:mt-20" data-reveal="work-showcase">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
        {/* Device stage — ~65-75% visual width */}
        <div className="lg:col-span-8">
          <div ref={stageRef} className="relative min-h-[280px] sm:min-h-[340px]">
            {/* Mobile: always phone frame */}
            <div className="lg:hidden">
              <PhoneFrame
                project={project}
                contentKey={contentKey}
                priority={index < 2}
              />
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-sm border border-[#087FF5]/50 bg-[#087FF5]/15 px-5 py-3.5 text-sm font-medium text-[#10294A] transition-colors hover:border-[#28C7F7] hover:bg-[#087FF5]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087FF5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F6F9] motion-safe:duration-300"
                >
                  Open live site
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              ) : null}
            </div>

            {/* Desktop: laptop / phone toggle */}
            <div className="hidden lg:block">
              {device === "desktop" ? (
                <LaptopFrame
                  project={project}
                  contentKey={contentKey}
                  priority={index < 2}
                  className="mx-auto max-w-[920px]"
                />
              ) : (
                <PhoneFrame
                  project={project}
                  contentKey={contentKey}
                  priority={index < 2}
                  className="py-4"
                />
              )}
            </div>
          </div>

          {/* Carousel controls */}
          <div className="mt-8 flex flex-col gap-5 sm:mt-10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous project"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#173E70]/10 text-[#10294A] transition-colors hover:border-[#087FF5]/50 hover:bg-[#087FF5]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087FF5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F6F9] motion-safe:duration-300"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next project"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-[#173E70]/10 text-[#10294A] transition-colors hover:border-[#087FF5]/50 hover:bg-[#087FF5]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087FF5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F6F9] motion-safe:duration-300"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <p
                id={counterId}
                className="font-[family-name:var(--font-space-grotesk)] text-sm tracking-[0.14em] text-[#526780]"
                aria-live="polite"
              >
                <span className="text-[#10294A]">{padIndex(index + 1)}</span>
                <span className="mx-1.5 text-[#173E70]/25" aria-hidden>
                  /
                </span>
                <span>{padIndex(total)}</span>
              </p>

              {/* Device toggle — large screens only */}
              <div
                className="hidden items-center gap-1 rounded-sm border border-[#173E70]/10 p-1 lg:flex"
                role="group"
                aria-label="Preview device"
              >
                <button
                  type="button"
                  aria-pressed={device === "desktop"}
                  onClick={() => setDevice("desktop")}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-xs tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087FF5] motion-safe:duration-300",
                    device === "desktop"
                      ? "bg-[#087FF5]/20 text-[#10294A]"
                      : "text-[#526780] hover:text-[#10294A]",
                  )}
                >
                  <Monitor className="h-3.5 w-3.5" aria-hidden />
                  Desktop
                </button>
                <button
                  type="button"
                  aria-pressed={device === "mobile"}
                  onClick={() => setDevice("mobile")}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-xs tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087FF5] motion-safe:duration-300",
                    device === "mobile"
                      ? "bg-[#087FF5]/20 text-[#10294A]"
                      : "text-[#526780] hover:text-[#10294A]",
                  )}
                >
                  <Smartphone className="h-3.5 w-3.5" aria-hidden />
                  Mobile
                </button>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div
              className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 touch-pan-x"
              role="group"
              aria-label="Featured projects"
            >
              {projects.map((item, i) => {
                const active = i === index;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    aria-label={`Show ${item.name}`}
                    onClick={() => goTo(i)}
                    className={cn(
                      "group relative h-16 w-24 shrink-0 overflow-hidden rounded-sm border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087FF5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F6F9] motion-safe:duration-300 sm:h-[4.5rem] sm:w-28",
                      active
                        ? "border-[#087FF5] ring-1 ring-[#087FF5]/40"
                        : "border-[#173E70]/10 hover:border-[#173E70]/30",
                    )}
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="112px"
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
                    />
                    <span
                      className={cn(
                        "absolute inset-0 bg-[#F4F6F9]/35 transition-opacity",
                        active ? "opacity-0" : "opacity-100 group-hover:opacity-50",
                      )}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Metadata panel */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <div ref={metaRef}>
            <p className="font-[family-name:var(--font-space-grotesk)] text-xs uppercase tracking-[0.2em] text-[#0865C8]">
              {project.industry}
            </p>
            <h3 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl tracking-tight text-[#10294A] sm:text-4xl">
              {project.name}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#526780]">
              {project.description}
            </p>

            <div className="mt-6">
              <p className="font-[family-name:var(--font-space-grotesk)] text-[11px] uppercase tracking-[0.18em] text-[#526780]/70">
                Technology
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {project.technology.map((tech) => (
                  <li
                    key={tech}
                    className="border border-[#173E70]/10 px-2.5 py-1 text-xs tracking-wide text-[#526780]"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 space-y-3 border-t border-[#173E70]/10 pt-6">
              <div>
                <p className="font-[family-name:var(--font-space-grotesk)] text-[11px] uppercase tracking-[0.18em] text-[#526780]/70">
                  Role
                </p>
                <p className="mt-1.5 text-sm text-[#10294A]">{project.role}</p>
              </div>
              <div>
                <p className="font-[family-name:var(--font-space-grotesk)] text-[11px] uppercase tracking-[0.18em] text-[#526780]/70">
                  Contribution
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#526780]">
                  {project.contribution}
                </p>
              </div>
            </div>

            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 hidden items-center gap-2 text-sm font-medium text-[#087FF5] transition-colors hover:text-[#0865C8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087FF5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F6F9] motion-safe:duration-300 lg:inline-flex"
              >
                View live site
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
