import type { ReactNode } from "react";

/** CSS view timelines enhance server-rendered content without mutating it before hydration. */
export function RevealProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
