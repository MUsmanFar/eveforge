"use client";

import { StageShell } from "./stage-shell";

/** Chat bubbles → form → database → email. */
export function AiStage() {
  return (
    <StageShell label="AI chatbots visualization: chat to form to database to email flow">
      <svg
        viewBox="0 0 320 220"
        className="h-full w-full max-h-[18rem]"
        fill="none"
        aria-hidden
      >
        <style>{`
          @keyframes ef-bubble {
            from { opacity: 0; transform: translateY(8px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes ef-flow-dash {
            to { stroke-dashoffset: -24; }
          }
          @keyframes ef-node-glow {
            0%, 100% { filter: drop-shadow(0 0 0 transparent); }
            50% { filter: drop-shadow(0 0 6px rgba(40,199,247,0.45)); }
          }
          .ef-bub { animation: ef-bubble 0.5s cubic-bezier(0.22,1,0.36,1) both; }
          .ef-bb2 { animation-delay: 0.12s; }
          .ef-bb3 { animation-delay: 0.24s; }
          .ef-pipe { stroke-dasharray: 5 5; animation: ef-flow-dash 1s linear infinite; }
          .ef-node { animation: ef-node-glow 2.2s ease-in-out infinite; }
        `}</style>

        {/* Chat column */}
        <g className="ef-bub">
          <rect x="20" y="40" width="72" height="28" rx="10" fill="#087FF5" opacity="0.75" />
          <rect x="30" y="50" width="40" height="4" rx="1" fill="#10294A" opacity="0.7" />
        </g>
        <g className="ef-bub ef-bb2">
          <rect x="44" y="80" width="64" height="28" rx="10" fill="#E9EEF5" stroke="#28C7F7" strokeOpacity="0.5" />
          <rect x="54" y="90" width="36" height="4" rx="1" fill="#526780" opacity="0.55" />
        </g>
        <g className="ef-bub ef-bb3">
          <rect x="20" y="120" width="72" height="28" rx="10" fill="#087FF5" opacity="0.55" />
          <rect x="30" y="130" width="44" height="4" rx="1" fill="#10294A" opacity="0.65" />
        </g>

        {/* Pipe: chat → form */}
        <path className="ef-pipe" d="M100 96 H124" stroke="#087FF5" strokeOpacity="0.65" strokeWidth="1.5" />

        {/* Form */}
        <g className="ef-bub ef-bb2 ef-node">
          <rect x="128" y="56" width="72" height="88" rx="6" fill="#FFFFFF" stroke="#28C7F7" strokeOpacity="0.55" />
          <rect x="138" y="68" width="40" height="5" rx="1" fill="#526780" opacity="0.4" />
          <rect x="138" y="82" width="52" height="10" rx="2" fill="#E9EEF5" stroke="#526780" strokeOpacity="0.25" />
          <rect x="138" y="100" width="52" height="10" rx="2" fill="#E9EEF5" stroke="#526780" strokeOpacity="0.25" />
          <rect x="138" y="118" width="36" height="12" rx="3" fill="#087FF5" />
        </g>

        {/* Pipe: form → db */}
        <path className="ef-pipe" d="M200 100 H224" stroke="#28C7F7" strokeOpacity="0.6" strokeWidth="1.5" />

        {/* Database */}
        <g className="ef-bub ef-bb3 ef-node" style={{ animationDelay: "0.35s" }}>
          <ellipse cx="252" cy="72" rx="28" ry="10" fill="#087FF5" fillOpacity="0.25" stroke="#087FF5" strokeOpacity="0.7" />
          <path d="M224 72 V118" stroke="#087FF5" strokeOpacity="0.55" />
          <path d="M280 72 V118" stroke="#087FF5" strokeOpacity="0.55" />
          <ellipse cx="252" cy="118" rx="28" ry="10" fill="#FFFFFF" stroke="#087FF5" strokeOpacity="0.7" />
          <path d="M224 90 H280" stroke="#28C7F7" strokeOpacity="0.25" />
          <path d="M224 104 H280" stroke="#28C7F7" strokeOpacity="0.2" />
        </g>

        {/* Pipe: db → email */}
        <path className="ef-pipe" d="M252 132 V150" stroke="#087FF5" strokeOpacity="0.55" strokeWidth="1.5" />

        {/* Email */}
        <g className="ef-bub ef-bb3 ef-node" style={{ animationDelay: "0.45s" }}>
          <rect x="220" y="154" width="64" height="40" rx="5" fill="#E9EEF5" stroke="#28C7F7" strokeOpacity="0.65" />
          <path d="M228 164 L252 176 L276 164" stroke="#28C7F7" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M228 186 L240 174" stroke="#526780" strokeOpacity="0.35" />
          <path d="M276 186 L264 174" stroke="#526780" strokeOpacity="0.35" />
        </g>
      </svg>
    </StageShell>
  );
}
