"use client";

import { StageShell } from "./stage-shell";

/** Geometric forms → cohesive identity marks. */
export function BrandingStage() {
  return (
    <StageShell label="Branding visualization: geometric forms resolving into identity marks">
      <svg
        viewBox="0 0 320 220"
        className="h-full w-full max-h-[18rem]"
        fill="none"
        aria-hidden
      >
        <style>{`
          @keyframes ef-scatter {
            from { opacity: 0; transform: translate(var(--dx), var(--dy)) rotate(var(--r)); }
            to { opacity: 1; transform: translate(0,0) rotate(0deg); }
          }
          @keyframes ef-mark-in {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes ef-orbit {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .ef-geo { animation: ef-scatter 0.8s cubic-bezier(0.22,1,0.36,1) both; }
          .ef-mark { transform-origin: center; animation: ef-mark-in 0.7s 0.35s cubic-bezier(0.22,1,0.36,1) both; }
          .ef-ring { transform-origin: 160px 110px; animation: ef-orbit 18s linear infinite; }
        `}</style>

        {/* Scattered primitives that settle */}
        <g className="ef-geo" style={{ ["--dx" as string]: "-20px", ["--dy" as string]: "12px", ["--r" as string]: "-18deg" }}>
          <rect x="36" y="48" width="36" height="36" rx="3" fill="#087FF5" opacity="0.35" stroke="#087FF5" strokeOpacity="0.7" />
        </g>
        <g className="ef-geo" style={{ ["--dx" as string]: "16px", ["--dy" as string]: "-14px", ["--r" as string]: "22deg", animationDelay: "0.08s" }}>
          <circle cx="88" cy="150" r="22" fill="#28C7F7" opacity="0.2" stroke="#28C7F7" strokeOpacity="0.55" />
        </g>
        <g className="ef-geo" style={{ ["--dx" as string]: "10px", ["--dy" as string]: "18px", ["--r" as string]: "12deg", animationDelay: "0.14s" }}>
          <polygon points="260,52 284,92 236,92" fill="#087FF5" opacity="0.25" stroke="#087FF5" strokeOpacity="0.6" />
        </g>
        <g className="ef-geo" style={{ ["--dx" as string]: "-14px", ["--dy" as string]: "-8px", ["--r" as string]: "-8deg", animationDelay: "0.2s" }}>
          <rect x="248" y="148" width="40" height="40" rx="20" fill="none" stroke="#526780" strokeOpacity="0.35" strokeWidth="2" />
        </g>

        {/* Cohesive mark */}
        <g className="ef-mark">
          <circle className="ef-ring" cx="160" cy="110" r="54" stroke="#087FF5" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="160" cy="110" r="40" fill="#FFFFFF" stroke="#28C7F7" strokeOpacity="0.55" strokeWidth="1.5" />
          <path
            d="M140 124 L160 88 L180 124 Z"
            fill="#087FF5"
            fillOpacity="0.85"
          />
          <circle cx="160" cy="112" r="7" fill="#28C7F7" />
          <rect x="148" y="132" width="24" height="4" rx="2" fill="#10294A" opacity="0.7" />
        </g>

        {/* Palette swatches */}
        <g className="ef-mark" style={{ animationDelay: "0.5s" }}>
          <rect x="118" y="178" width="20" height="12" rx="2" fill="#087FF5" />
          <rect x="144" y="178" width="20" height="12" rx="2" fill="#28C7F7" />
          <rect x="170" y="178" width="20" height="12" rx="2" fill="#10294A" opacity="0.9" />
          <rect x="196" y="178" width="20" height="12" rx="2" fill="#526780" opacity="0.55" />
        </g>
      </svg>
    </StageShell>
  );
}
