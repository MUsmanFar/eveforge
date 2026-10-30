"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const STORAGE_KEY = "everforge-preloader-seen";
const MAX_WAIT_MS = 1200;

type PreloaderProps = {
  onComplete?: () => void;
};

function hasSeenPreloader() {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGRectElement>(null);
  const completed = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (hasSeenPreloader() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const skip = window.requestAnimationFrame(() => { setVisible(false); onComplete?.(); });
      return () => window.cancelAnimationFrame(skip);
    }

    if (!visible) {
      onComplete?.();
      return;
    }

    const root = rootRef.current;
    completed.current = false;
    let finishTimer: number | undefined;
    const line = lineRef.current;
    if (line) {
      const length = 360;
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(line, {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: "power2.out",
      });
    }

    const finish = () => {
      if (completed.current) return;
      completed.current = true;

      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore
      }

      const el = rootRef.current;
      if (!el) {
        setVisible(false);
        onComplete?.();
        return;
      }

      gsap.to(el, {
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => {
          setVisible(false);
          onComplete?.();
        },
      });
    };

    const started = performance.now();
    let loadFired = document.readyState === "complete";

    const tryFinish = () => {
      const elapsed = performance.now() - started;
      const remaining = Math.max(0, 280 - elapsed);

      if (loadFired || elapsed >= MAX_WAIT_MS) {
        finishTimer = window.setTimeout(finish, remaining);
      }
    };

    const onLoad = () => {
      loadFired = true;
      tryFinish();
    };

    if (loadFired) {
      tryFinish();
    } else {
      window.addEventListener("load", onLoad);
    }

    const hardCap = window.setTimeout(() => {
      loadFired = true;
      tryFinish();
    }, MAX_WAIT_MS);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(hardCap);
      window.clearTimeout(finishTimer);
      gsap.killTweensOf([root, line].filter(Boolean));
    };
  }, [onComplete, visible]);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="ef-preloader fixed inset-0 z-[100] flex items-center justify-center bg-[#F4F6F9]"
      role="status"
      aria-live="polite"
      aria-label="Loading Everforge"
    >
      <div className="relative flex flex-col items-center">
        <div
          className="absolute inset-0 scale-150 rounded-full bg-[#087FF5]/25 blur-3xl motion-safe:animate-pulse"
          aria-hidden
        />
        <div className="relative">
          <svg
            className="absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)]"
            viewBox="0 0 100 100"
            aria-hidden
          >
            <rect
              ref={lineRef}
              x="4"
              y="4"
              width="92"
              height="92"
              rx="4"
              fill="none"
              stroke="rgba(40,199,247,0.4)"
              strokeWidth="1"
            />
          </svg>
          <Image
            src="/assets/brand/icon-e.png"
            alt=""
            width={72}
            height={72}
            className="relative h-16 w-16 object-contain drop-shadow-[0_0_24px_rgba(8,127,245,0.45)] sm:h-[72px] sm:w-[72px]"
            priority
          />
        </div>
        <p className="relative mt-8 font-[family-name:var(--font-space-grotesk)] text-[10px] uppercase tracking-[0.28em] text-[#526780]">
          Everforge
        </p>
      </div>
    </div>
  );
}
