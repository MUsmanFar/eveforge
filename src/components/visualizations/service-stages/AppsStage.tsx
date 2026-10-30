"use client";

import { StageShell } from "./stage-shell";

/** Animated dashboard blocks. */
export function AppsStage() {
  return (
    <StageShell label="Custom web applications visualization: animated dashboard blocks">
      <svg
        viewBox="0 0 320 220"
        className="h-full w-full max-h-[18rem]"
        fill="none"
        aria-hidden
      >
        <style>{`
          @keyframes ef-block-in {
            from { opacity: 0; transform: scale(0.92); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes ef-bar-grow {
            from { transform: scaleY(0); }
            to { transform: scaleY(1); }
          }
          @keyframes ef-line-draw {
            from { stroke-dashoffset: 80; }
            to { stroke-dashoffset: 0; }
          }
          .ef-blk { transform-origin: center; animation: ef-block-in 0.6s cubic-bezier(0.22,1,0.36,1) both; }
          .ef-b2 { animation-delay: 0.1s; }
          .ef-b3 { animation-delay: 0.18s; }
          .ef-b4 { animation-delay: 0.26s; }
          .ef-bar { transform-origin: bottom; animation: ef-bar-grow 0.7s 0.35s cubic-bezier(0.22,1,0.36,1) both; }
          .ef-spark { stroke-dasharray: 80; animation: ef-line-draw 1s 0.4s ease both; }
        `}</style>

        {/* Sidebar */}
        <g className="ef-blk">
          <rect x="24" y="28" width="44" height="164" rx="6" fill="#FFFFFF" stroke="#087FF5" strokeOpacity="0.4" />
          <rect x="34" y="44" width="24" height="6" rx="2" fill="#087FF5" opacity="0.8" />
          <rect x="34" y="60" width="18" height="4" rx="1" fill="#526780" opacity="0.35" />
          <rect x="34" y="72" width="20" height="4" rx="1" fill="#526780" opacity="0.25" />
          <rect x="34" y="84" width="16" height="4" rx="1" fill="#526780" opacity="0.2" />
          <rect x="34" y="160" width="24" height="16" rx="3" fill="#28C7F7" opacity="0.25" stroke="#28C7F7" strokeOpacity="0.5" />
        </g>

        {/* Chart panel */}
        <g className="ef-blk ef-b2">
          <rect x="80" y="28" width="140" height="96" rx="6" fill="#E9EEF5" stroke="#28C7F7" strokeOpacity="0.35" />
          <path
            className="ef-spark"
            d="M96 100 L118 78 L138 88 L160 58 L182 70 L200 48"
            stroke="#087FF5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="200" cy="48" r="3.5" fill="#28C7F7" />
        </g>

        {/* Stat cards */}
        <g className="ef-blk ef-b3">
          <rect x="232" y="28" width="64" height="44" rx="5" fill="#FFFFFF" stroke="#087FF5" strokeOpacity="0.5" />
          <rect x="242" y="40" width="28" height="5" rx="1" fill="#526780" opacity="0.35" />
          <rect x="242" y="52" width="36" height="8" rx="2" fill="#10294A" opacity="0.85" />
        </g>
        <g className="ef-blk ef-b4">
          <rect x="232" y="80" width="64" height="44" rx="5" fill="#FFFFFF" stroke="#28C7F7" strokeOpacity="0.4" />
          <rect x="242" y="92" width="28" height="5" rx="1" fill="#526780" opacity="0.35" />
          <rect x="242" y="104" width="28" height="8" rx="2" fill="#28C7F7" opacity="0.7" />
        </g>

        {/* Bar chart */}
        <g className="ef-blk ef-b3">
          <rect x="80" y="136" width="216" height="56" rx="6" fill="#FFFFFF" stroke="#526780" strokeOpacity="0.2" />
          <rect className="ef-bar" x="100" y="160" width="14" height="22" rx="2" fill="#087FF5" opacity="0.7" />
          <rect className="ef-bar" x="128" y="150" width="14" height="32" rx="2" fill="#28C7F7" opacity="0.55" style={{ animationDelay: "0.42s" }} />
          <rect className="ef-bar" x="156" y="156" width="14" height="26" rx="2" fill="#087FF5" opacity="0.5" style={{ animationDelay: "0.48s" }} />
          <rect className="ef-bar" x="184" y="144" width="14" height="38" rx="2" fill="#28C7F7" opacity="0.7" style={{ animationDelay: "0.54s" }} />
          <rect className="ef-bar" x="212" y="152" width="14" height="30" rx="2" fill="#087FF5" opacity="0.6" style={{ animationDelay: "0.6s" }} />
          <rect className="ef-bar" x="240" y="148" width="14" height="34" rx="2" fill="#28C7F7" opacity="0.45" style={{ animationDelay: "0.66s" }} />
        </g>
      </svg>
    </StageShell>
  );
}
