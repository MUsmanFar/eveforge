"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type StageShellProps = {
  children: ReactNode;
  className?: string;
  label: string;
};

/** Shared frame for procedural service visualizations. */
export function StageShell({ children, className, label }: StageShellProps) {
  return (
    <div
      className={cn(
        "relative h-full min-h-[16rem] w-full overflow-hidden rounded-sm",
        className,
      )}
      role="img"
      aria-label={label}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(8,127,245,0.18), transparent 45%), radial-gradient(circle at 80% 75%, rgba(40,199,247,0.12), transparent 40%), linear-gradient(160deg, #FFFFFF 0%, #E9EEF5 55%, #F4F6F9 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,184,216,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(168,184,216,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 80%)",
        }}
      />
      <div className="relative z-10 flex h-full min-h-[16rem] items-center justify-center p-5 sm:p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
}
