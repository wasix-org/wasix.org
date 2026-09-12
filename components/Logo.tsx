import type { SVGProps } from "react";
import mark from "../assets/brand/wasix-mark.json";

export function WasixMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox={mark.viewBox}
      fill="none"
      strokeWidth={mark.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={mark.loop} stroke="currentColor" />
      <path
        d={mark.crossing}
        stroke={`var(--wasix-mark-accent, ${mark.accent})`}
        strokeLinecap="butt"
      />
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="wasix-brand" aria-label="WASIX home">
      <WasixMark />
      <span>
        wasix<span className="brand-period">.</span>
      </span>
    </span>
  );
}
