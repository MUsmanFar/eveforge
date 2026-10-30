"use client";

import type { ReactNode } from "react";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { RevealProvider } from "@/components/providers/RevealProvider";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <SmoothScroll>
      <Preloader />
      <Navbar />
      <RevealProvider>{children}</RevealProvider>
    </SmoothScroll>
  );
}
