"use client";

import { StageShell } from "./stage-shell";

/** Browser windows assemble from geometric layers. */
export function WebsiteStage() {
  return (
    <StageShell label="Website development visualization: browser windows assembling">
      <svg
        viewBox="0 0 320 220"
        className="h-full w-full max-h-[18rem]"
        fill="none"
        aria-hidden
      >
        <style>{`
          @keyframes ef-win-rise {
            from { opacity: 0; transform: translateY(18px) scale(0.96); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes ef-bar-fill {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
          .ef-win { transform-origin: center; animation: ef-win-rise 0.7s cubic-bezier(0.22,1,0.36,1) both; }
          .ef-win-2 { animation-delay: 0.12s; }
          .ef-win-3 { animation-delay: 0.24s; }
          .ef-fill { transform-origin: left center; animation: ef-bar-fill 0.8s 0.35s cubic-bezier(0.22,1,0.36,1) both; }
        `}</style>

        {/* Back window */}
        <g className="ef-win ef-win-3">
          <rect x="48" y="18" width="180" height="118" rx="6" fill="#FFFFFF" stroke="#087FF5" strokeOpacity="0.35" />
          <rect x="48" y="18" width="180" height="22" rx="6" fill="#E9EEF5" />
          <circle cx="62" cy="29" r="3" fill="#087FF5" opacity="0.7" />
          <circle cx="74" cy="29" r="3" fill="#28C7F7" opacity="0.5" />
          <circle cx="86" cy="29" r="3" fill="#526780" opacity="0.35" />
        </g>

        {/* Mid window */}
        <g className="ef-win ef-win-2">
          <rect x="78" y="42" width="196" height="130" rx="6" fill="#FFFFFF" stroke="#28C7F7" strokeOpacity="0.4" />
          <rect x="78" y="42" width="196" height="24" rx="6" fill="#E9EEF5" />
          <circle cx="92" cy="54" r="3" fill="#087FF5" />
          <circle cx="104" cy="54" r="3" fill="#28C7F7" opacity="0.7" />
          <circle cx="116" cy="54" r="3" fill="#526780" opacity="0.4" />
          <rect x="94" y="82" width="88" height="8" rx="2" fill="#087FF5" opacity="0.55" className="ef-fill" />
          <rect x="94" y="98" width="140" height="5" rx="1.5" fill="#526780" opacity="0.25" />
          <rect x="94" y="110" width="120" height="5" rx="1.5" fill="#526780" opacity="0.18" />
          <rect x="94" y="128" width="54" height="28" rx="3" fill="#087FF5" opacity="0.2" stroke="#087FF5" strokeOpacity="0.5" />
          <rect x="156" y="128" width="54" height="28" rx="3" fill="#28C7F7" opacity="0.12" stroke="#28C7F7" strokeOpacity="0.4" />
        </g>

        {/* Front window */}
        <g className="ef-win">
          <rect x="28" y="88" width="168" height="112" rx="6" fill="#E9EEF5" stroke="#087FF5" strokeOpacity="0.65" />
          <rect x="28" y="88" width="168" height="22" rx="6" fill="#FFFFFF" />
          <circle cx="42" cy="99" r="3" fill="#087FF5" />
          <circle cx="54" cy="99" r="3" fill="#28C7F7" />
          <circle cx="66" cy="99" r="3" fill="#526780" opacity="0.45" />
          <rect x="44" y="126" width="72" height="7" rx="2" fill="#10294A" opacity="0.85" className="ef-fill" />
          <rect x="44" y="142" width="112" height="4" rx="1" fill="#526780" opacity="0.35" />
          <rect x="44" y="152" width="96" height="4" rx="1" fill="#526780" opacity="0.22" />
          <rect x="44" y="168" width="48" height="16" rx="3" fill="#087FF5" />
        </g>
      </svg>
    </StageShell>
  );
}
