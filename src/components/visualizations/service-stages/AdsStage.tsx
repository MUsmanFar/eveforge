"use client";

import { StageShell } from "./stage-shell";

/** Campaign signals → conversion funnel. */
export function AdsStage() {
  return (
    <StageShell label="Ads visualization: campaign signals flowing into a conversion funnel">
      <svg
        viewBox="0 0 320 220"
        className="h-full w-full max-h-[18rem]"
        fill="none"
        aria-hidden
      >
        <style>{`
          @keyframes ef-sig {
            0% { opacity: 0; transform: translateY(-6px); }
            40% { opacity: 1; }
            100% { opacity: 0.35; transform: translateY(10px); }
          }
          @keyframes ef-funnel-in {
            from { opacity: 0; transform: scaleY(0.85); }
            to { opacity: 1; transform: scaleY(1); }
          }
          @keyframes ef-glow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          .ef-sig { animation: ef-sig 1.8s ease-in-out infinite; }
          .ef-s2 { animation-delay: 0.3s; }
          .ef-s3 { animation-delay: 0.6s; }
          .ef-s4 { animation-delay: 0.9s; }
          .ef-funnel { transform-origin: top center; animation: ef-funnel-in 0.7s cubic-bezier(0.22,1,0.36,1) both; }
          .ef-conv { animation: ef-glow 1.6s ease-in-out infinite; }
        `}</style>

        {/* Signal sources */}
        <g>
          <circle className="ef-sig" cx="56" cy="40" r="8" fill="#087FF5" opacity="0.7" />
          <circle className="ef-sig ef-s2" cx="100" cy="32" r="6" fill="#28C7F7" opacity="0.6" />
          <circle className="ef-sig ef-s3" cx="144" cy="44" r="7" fill="#087FF5" opacity="0.5" />
          <circle className="ef-sig ef-s4" cx="188" cy="34" r="5" fill="#28C7F7" opacity="0.55" />
          <circle className="ef-sig ef-s2" cx="232" cy="42" r="6" fill="#526780" opacity="0.4" />
          <circle className="ef-sig ef-s3" cx="268" cy="36" r="5" fill="#087FF5" opacity="0.45" />
        </g>

        {/* Convergence lines */}
        <path d="M56 52 L160 88" stroke="#087FF5" strokeOpacity="0.35" strokeWidth="1" />
        <path d="M100 44 L160 88" stroke="#28C7F7" strokeOpacity="0.3" strokeWidth="1" />
        <path d="M144 56 L160 88" stroke="#087FF5" strokeOpacity="0.25" strokeWidth="1" />
        <path d="M188 46 L160 88" stroke="#28C7F7" strokeOpacity="0.3" strokeWidth="1" />
        <path d="M232 54 L160 88" stroke="#526780" strokeOpacity="0.25" strokeWidth="1" />
        <path d="M268 48 L160 88" stroke="#087FF5" strokeOpacity="0.2" strokeWidth="1" />

        {/* Funnel */}
        <g className="ef-funnel">
          <path
            d="M48 96 L272 96 L220 140 L100 140 Z"
            fill="#087FF5"
            fillOpacity="0.12"
            stroke="#087FF5"
            strokeOpacity="0.55"
          />
          <path
            d="M100 148 L220 148 L190 176 L130 176 Z"
            fill="#28C7F7"
            fillOpacity="0.14"
            stroke="#28C7F7"
            strokeOpacity="0.55"
          />
          <path
            d="M130 184 L190 184 L172 206 L148 206 Z"
            fill="#087FF5"
            fillOpacity="0.35"
            stroke="#087FF5"
            strokeOpacity="0.8"
            className="ef-conv"
          />
          <text
            x="160"
            y="118"
            textAnchor="middle"
            fill="#526780"
            fontSize="9"
            fontFamily="system-ui,sans-serif"
            opacity="0.7"
          >
            REACH
          </text>
          <text
            x="160"
            y="166"
            textAnchor="middle"
            fill="#526780"
            fontSize="8"
            fontFamily="system-ui,sans-serif"
            opacity="0.65"
          >
            ENGAGE
          </text>
          <text
            x="160"
            y="198"
            textAnchor="middle"
            fill="#10294A"
            fontSize="8"
            fontFamily="system-ui,sans-serif"
            opacity="0.9"
          >
            CONVERT
          </text>
        </g>
      </svg>
    </StageShell>
  );
}
