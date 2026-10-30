"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { ProjectPreview } from "./ProjectPreview";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

type PhoneFrameProps = {
  project: Project;
  priority?: boolean;
  className?: string;
  contentKey: string;
  /** Honest label when only a desktop capture is available. */
  captureNote?: string;
};

export function PhoneFrame({
  project,
  className,
  contentKey,
}: PhoneFrameProps) {
  const screenRef = useRef<HTMLDivElement>(null);
  const [canScrollMore, setCanScrollMore] = useState(true);

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
    <div className={cn("relative mx-auto w-full max-w-[320px]", className)}>
      <div className="relative rounded-[2rem] border border-[#173E70]/15 bg-[#FFFFFF] p-2.5 shadow-[0_28px_70px_rgba(22,54,90,0.16)]">
        {/* Side buttons */}
        <div
          className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l-sm bg-[#b8c9dc]"
          aria-hidden
        />
        <div
          className="absolute -left-[3px] top-36 h-12 w-[3px] rounded-l-sm bg-[#b8c9dc]"
          aria-hidden
        />
        <div
          className="absolute -right-[3px] top-28 h-14 w-[3px] rounded-r-sm bg-[#b8c9dc]"
          aria-hidden
        />

        <div className="relative overflow-hidden rounded-[1.55rem] border border-[#173E70]/10 bg-[#F4F6F9]">
          {/* Dynamic island */}
          <div
            className="pointer-events-none absolute left-1/2 top-2.5 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-[#F4F6F9]"
            aria-hidden
          />

          <div className="relative aspect-[9/19]">
            <div
              ref={screenRef}
              data-lenis-prevent
              className="absolute inset-0 overflow-y-auto overscroll-contain touch-pan-y"
              onWheel={onWheel}
              tabIndex={0}
              role="region"
              aria-label={`${project.name} mobile preview — scroll to explore`}
            >
              <ProjectPreview key={contentKey} project={project} mobile onLoad={updateScrollCue} />
            </div>

            <div
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-14 items-end justify-center bg-gradient-to-t from-[#F4F6F9]/95 via-[#F4F6F9]/5 to-transparent pb-2.5 transition-opacity duration-300",
                canScrollMore && Boolean(project.previewMobile) ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={!canScrollMore}
            >
              <span className="font-[family-name:var(--font-space-grotesk)] text-[9px] uppercase tracking-[0.16em] text-[#526780]/90">
                Scroll to explore
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
