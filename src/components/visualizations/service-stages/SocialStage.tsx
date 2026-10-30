"use client";

import { StageShell } from "./stage-shell";

/** Content tiles → calendar. */
export function SocialStage() {
  return (
    <StageShell label="Social media visualization: content tiles arranging into a calendar">
      <svg
        viewBox="0 0 320 220"
        className="h-full w-full max-h-[18rem]"
        fill="none"
        aria-hidden
      >
        <style>{`
          @keyframes ef-post-in {
            from { opacity: 0; transform: translateX(-12px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes ef-cal-in {
            from { opacity: 0; transform: translateX(16px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes ef-dot-hop {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          .ef-post { animation: ef-post-in 0.55s cubic-bezier(0.22,1,0.36,1) both; }
          .ef-p2 { animation-delay: 0.1s; }
          .ef-p3 { animation-delay: 0.2s; }
          .ef-cal { animation: ef-cal-in 0.65s 0.15s cubic-bezier(0.22,1,0.36,1) both; }
          .ef-day { animation: ef-dot-hop 1.8s ease-in-out infinite; }
        `}</style>

        {/* Content posts */}
        <g className="ef-post">
          <rect x="20" y="36" width="88" height="72" rx="6" fill="#FFFFFF" stroke="#087FF5" strokeOpacity="0.55" />
          <rect x="30" y="46" width="68" height="36" rx="3" fill="#087FF5" opacity="0.3" />
          <rect x="30" y="90" width="40" height="4" rx="1" fill="#526780" opacity="0.4" />
          <circle cx="36" cy="52" r="5" fill="#28C7F7" opacity="0.6" />
        </g>
        <g className="ef-post ef-p2">
          <rect x="20" y="118" width="88" height="56" rx="6" fill="#FFFFFF" stroke="#28C7F7" strokeOpacity="0.4" />
          <rect x="30" y="128" width="48" height="4" rx="1" fill="#10294A" opacity="0.55" />
          <rect x="30" y="140" width="68" height="3" rx="1" fill="#526780" opacity="0.3" />
          <rect x="30" y="150" width="52" height="3" rx="1" fill="#526780" opacity="0.2" />
        </g>
        <g className="ef-post ef-p3">
          <rect x="20" y="182" width="40" height="10" rx="3" fill="#087FF5" opacity="0.35" stroke="#087FF5" strokeOpacity="0.6" />
          <rect x="68" y="182" width="40" height="10" rx="3" fill="#28C7F7" opacity="0.2" stroke="#28C7F7" strokeOpacity="0.45" />
        </g>

        {/* Arrow hint */}
        <path
          d="M120 110 H140"
          stroke="#526780"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeLinecap="round"
          markerEnd="url(#ef-arrow)"
        />
        <defs>
          <marker id="ef-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#526780" fillOpacity="0.45" />
          </marker>
        </defs>

        {/* Calendar */}
        <g className="ef-cal">
          <rect x="152" y="36" width="148" height="150" rx="8" fill="#E9EEF5" stroke="#087FF5" strokeOpacity="0.45" />
          <rect x="152" y="36" width="148" height="28" rx="8" fill="#FFFFFF" />
          <rect x="168" y="46" width="48" height="8" rx="2" fill="#28C7F7" opacity="0.7" />
          <rect x="260" y="46" width="24" height="8" rx="2" fill="#526780" opacity="0.25" />

          {/* Grid days */}
          {[0, 1, 2, 3, 4].map((row) =>
            [0, 1, 2, 3, 4, 5, 6].map((col) => {
              const filled = (row + col) % 3 === 0 || (row === 2 && col === 3);
              const cyan = (row + col) % 5 === 0;
              return (
                <rect
                  key={`${row}-${col}`}
                  x={164 + col * 18}
                  y={78 + row * 20}
                  width="12"
                  height="12"
                  rx="2"
                  fill={filled ? (cyan ? "#28C7F7" : "#087FF5") : "transparent"}
                  fillOpacity={filled ? (cyan ? 0.45 : 0.55) : 0}
                  stroke="#526780"
                  strokeOpacity={filled ? 0 : 0.2}
                  className={filled && row === 2 && col === 3 ? "ef-day" : undefined}
                />
              );
            }),
          )}
        </g>
      </svg>
    </StageShell>
  );
}
