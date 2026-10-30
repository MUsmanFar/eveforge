"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { ProjectPreview } from "./ProjectPreview";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

type LaptopFrameProps = {
  project: Project;
  priority?: boolean;
  className?: string;
  contentKey: string;
};

export function LaptopFrame({
  project,
  className,
  contentKey,
}: LaptopFrameProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [canScrollMore, setCanScrollMore] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const chromeLabel =
    project.url?.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? project.name;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    el.scrollTop = 0;
    setCanScrollMore(true);
  }, [contentKey]);

  const updateScrollCue = useCallback(() => {
    const el = screenRef.current;
    if (!el) return;
    const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
    setCanScrollMore(remaining > 12);
  }, []);

  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    updateScrollCue();
    el.addEventListener("scroll", updateScrollCue, { passive: true });
    const ro = new ResizeObserver(updateScrollCue);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollCue);
      ro.disconnect();
    };
  }, [contentKey, updateScrollCue]);

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const shell = shellRef.current;
    if (!shell) return;
    const rect = shell.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    shell.style.transform = `perspective(1200px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`;
  };

  const onPointerLeave = () => {
    const shell = shellRef.current;
    if (!shell) return;
    shell.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
  };

  const onWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    const el = screenRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const maxScroll = scrollHeight - clientHeight;
    const delta = event.deltaY;

    if (maxScroll <= 0) return;

    const atTop = scrollTop <= 0;
    const atBottom = scrollTop >= maxScroll - 1;
    const scrollingDown = delta > 0;
    const scrollingUp = delta < 0;

    if ((scrollingDown && !atBottom) || (scrollingUp && !atTop)) {
      event.stopPropagation();
    }
  };

  return (
    <div
      className={cn("relative w-full select-none", className)}
      style={{ perspective: "1200px" }}
    >
      <div
        ref={shellRef}
        className="origin-center transition-transform duration-200 ease-out motion-reduce:transition-none"
        style={{ transformStyle: "preserve-3d" }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        {/* Lid / bezel */}
        <div className="relative rounded-[1.1rem] border border-[#173E70]/15 bg-[#FFFFFF] p-[0.55rem] shadow-[0_28px_80px_rgba(22,54,90,0.16)] sm:rounded-[1.25rem] sm:p-2.5">
          <div className="relative overflow-hidden rounded-[0.7rem] border border-[#173E70]/10 bg-[#F4F6F9] sm:rounded-[0.85rem]">
            {/* Browser chrome */}
            <div className="flex h-8 items-center gap-1.5 border-b border-[#173E70]/10 bg-[#E9EEF5]/95 px-3 sm:h-9">
              <span className="h-2 w-2 rounded-full bg-white/25" aria-hidden />
              <span className="h-2 w-2 rounded-full bg-white/25" aria-hidden />
              <span className="h-2 w-2 rounded-full bg-white/25" aria-hidden />
              <span className="ml-2 truncate font-[family-name:var(--font-space-grotesk)] text-[10px] tracking-wide text-[#526780]/85 sm:text-[11px]">
                {chromeLabel}
              </span>
            </div>

            {/* Scrollable screen */}
            <div className="relative aspect-[16/10] bg-[#F4F6F9]">
              <div
                ref={screenRef}
                data-lenis-prevent
                className="absolute inset-0 overflow-y-auto overscroll-contain touch-pan-y"
                onWheel={onWheel}
                tabIndex={0}
                role="region"
                aria-label={`${project.name} desktop preview — scroll to explore`}
              >
                <ProjectPreview key={contentKey} project={project} onLoad={updateScrollCue} />
              </div>

              {/* Scroll cue — pinned to viewport, not content */}
              <div
                className={cn(
                  "pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-16 items-end justify-center bg-gradient-to-t from-[#F4F6F9]/95 via-[#F4F6F9]/55 to-transparent pb-3 transition-opacity duration-300",
                  canScrollMore && Boolean(project.previewDesktop) ? "opacity-100" : "opacity-0",
                )}
                aria-hidden={!canScrollMore}
              >
                <span className="font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-[0.18em] text-[#526780]/90">
                  Scroll to explore
                </span>
              </div>
            </div>
          </div>

          {/* Camera notch accent */}
          <div
            className="pointer-events-none absolute left-1/2 top-1.5 h-1 w-1 -translate-x-1/2 rounded-full bg-white/20 sm:top-2"
            aria-hidden
          />
        </div>

        {/* Hinge */}
        <div
          className="mx-auto h-2 w-[102%] -translate-x-[1%] rounded-b-sm bg-gradient-to-b from-[#b8c9dc] to-[#FFFFFF] shadow-[0_2px_0_rgba(24,70,120,0.06)]"
          aria-hidden
        />

        {/* Base / keyboard deck */}
        <div className="relative mx-auto -mt-px w-[112%] -translate-x-[5.35%]" aria-hidden>
          <div className="h-3 rounded-b-[1.4rem] bg-gradient-to-b from-[#b8c9dc] via-[#FFFFFF] to-[#F4F6F9] shadow-[0_18px_40px_rgba(22,54,90,0.12)]">
            <div className="mx-auto h-1 w-24 translate-y-1 rounded-full bg-[#087FF5]/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
