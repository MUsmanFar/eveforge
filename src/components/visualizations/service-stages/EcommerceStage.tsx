"use client";

import { StageShell } from "./stage-shell";

/** Product tiles → cart → checkout workflow lines. */
export function EcommerceStage() {
  return (
    <StageShell label="E-commerce visualization: products flowing to cart and checkout">
      <svg
        viewBox="0 0 320 220"
        className="h-full w-full max-h-[18rem]"
        fill="none"
        aria-hidden
      >
        <style>{`
          @keyframes ef-tile-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes ef-dash {
            to { stroke-dashoffset: -40; }
          }
          @keyframes ef-pulse {
            0%, 100% { opacity: 0.45; }
            50% { opacity: 1; }
          }
          .ef-tile { animation: ef-tile-in 0.55s cubic-bezier(0.22,1,0.36,1) both; }
          .ef-t2 { animation-delay: 0.08s; }
          .ef-t3 { animation-delay: 0.16s; }
          .ef-flow { stroke-dasharray: 6 6; animation: ef-dash 1.2s linear infinite; }
          .ef-node { animation: ef-pulse 2s ease-in-out infinite; }
        `}</style>

        {/* Product tiles */}
        <g className="ef-tile">
          <rect x="24" y="36" width="52" height="64" rx="5" fill="#FFFFFF" stroke="#087FF5" strokeOpacity="0.55" />
          <rect x="34" y="46" width="32" height="24" rx="2" fill="#087FF5" opacity="0.35" />
          <rect x="34" y="78" width="22" height="4" rx="1" fill="#526780" opacity="0.4" />
          <rect x="34" y="86" width="14" height="3" rx="1" fill="#28C7F7" opacity="0.5" />
        </g>
        <g className="ef-tile ef-t2">
          <rect x="86" y="36" width="52" height="64" rx="5" fill="#FFFFFF" stroke="#28C7F7" strokeOpacity="0.45" />
          <rect x="96" y="46" width="32" height="24" rx="2" fill="#28C7F7" opacity="0.25" />
          <rect x="96" y="78" width="22" height="4" rx="1" fill="#526780" opacity="0.4" />
          <rect x="96" y="86" width="14" height="3" rx="1" fill="#087FF5" opacity="0.5" />
        </g>
        <g className="ef-tile ef-t3">
          <rect x="148" y="36" width="52" height="64" rx="5" fill="#FFFFFF" stroke="#526780" strokeOpacity="0.3" />
          <rect x="158" y="46" width="32" height="24" rx="2" fill="#526780" opacity="0.15" />
          <rect x="158" y="78" width="22" height="4" rx="1" fill="#526780" opacity="0.35" />
          <rect x="158" y="86" width="14" height="3" rx="1" fill="#28C7F7" opacity="0.4" />
        </g>

        {/* Flow lines */}
        <path
          d="M50 108 L50 132 L160 132 L160 148"
          className="ef-flow"
          stroke="#087FF5"
          strokeOpacity="0.7"
          strokeWidth="1.5"
        />
        <path
          d="M112 108 L112 124 L160 124"
          className="ef-flow"
          stroke="#28C7F7"
          strokeOpacity="0.55"
          strokeWidth="1.5"
        />
        <path
          d="M174 108 L174 118 L160 118"
          className="ef-flow"
          stroke="#526780"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />

        {/* Cart */}
        <g>
          <rect x="132" y="148" width="56" height="40" rx="5" fill="#E9EEF5" stroke="#087FF5" strokeOpacity="0.7" />
          <path d="M144 160 h8 l4 16 h20" stroke="#28C7F7" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="156" cy="180" r="2.5" fill="#087FF5" className="ef-node" />
          <circle cx="170" cy="180" r="2.5" fill="#28C7F7" className="ef-node" />
        </g>

        {/* Checkout */}
        <g>
          <rect x="220" y="148" width="76" height="40" rx="5" fill="#FFFFFF" stroke="#28C7F7" strokeOpacity="0.65" />
          <rect x="232" y="160" width="36" height="5" rx="1.5" fill="#10294A" opacity="0.7" />
          <rect x="232" y="172" width="52" height="8" rx="2" fill="#087FF5" />
          <path
            d="M188 168 H220"
            className="ef-flow"
            stroke="#087FF5"
            strokeOpacity="0.8"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </StageShell>
  );
}
