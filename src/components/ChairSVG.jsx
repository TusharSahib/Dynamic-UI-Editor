import React from "react";
import { autoTextColor, parseColorToRGB } from "../utils/color.js";

/** small helpers for color mixing */
function toHex([r, g, b]) {
  const h = (n) => n.toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}
function mix(a, b, t) {
  const A = parseColorToRGB(a), B = parseColorToRGB(b);
  return toHex([
    Math.round(A[0] + (B[0] - A[0]) * t),
    Math.round(A[1] + (B[1] - A[1]) * t),
    Math.round(A[2] + (B[2] - A[2]) * t),
  ]);
}
const white = "#ffffff", black = "#000000";

/**
 * ChairSVG
 * A stylized but realistic lounge chair (3/4 view).
 * Props allow full recoloring of parts + material texture.
 */
export default function ChairSVG({
  width = "100%",
  height = 320,
  bodyColor = "#a99988",
  cushionColor = "#7d5d76",
  armColor = "#5c4a3b",
  pipingColor = "#ffffff",
  legsFinish = "steel", // 'steel' | 'black' | 'gold'
  material = "leather", // 'leather' | 'fabric'
  className,
  style
}) {
  // derived colors
  const bodyDark = mix(bodyColor, black, 0.35);
  const bodyLight = mix(bodyColor, white, 0.35);
  const cushionDeep = mix(cushionColor, black, 0.3);
  const cushionLight = mix(cushionColor, white, 0.25);
  const armDeep = mix(armColor, black, 0.35);
  const armLight = mix(armColor, white, 0.25);

  const legGrad =
    legsFinish === "gold"
      ? { a: "#f6d76c", b: "#a8780e", highlight: "#fff2b3" }
      : legsFinish === "black"
      ? { a: "#111827", b: "#374151", highlight: "#9ca3af" }
      : { a: "#c9ced6", b: "#7b8794", highlight: "#e5e7eb" }; // steel

  const pipStroke = pipingColor || autoTextColor(cushionColor);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 720 420"
      role="img"
      aria-label="Realistic lounge chair"
      className={className}
      style={style}
    >
      <defs>
        {/* soft drop shadow */}
        <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
          <feOffset dy="6" result="off" />
          <feColorMatrix
            in="off"
            type="matrix"
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 .28 0"
            result="shadow"
          />
          <feComposite in="shadow" in2="SourceGraphic" operator="over" />
        </filter>

        {/* subtle grain texture for leather / fabric */}
        <filter id="grainLeather" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="6" result="turb" />
          <feColorMatrix
            in="turb"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 .05 0"
          />
        </filter>
        <filter id="grainFabric" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="4" seed="3" result="turb" />
          <feColorMatrix
            in="turb"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 .08 0"
          />
        </filter>

        {/* metal / gold gradient */}
        <linearGradient id="legGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={legGrad.highlight} />
          <stop offset="22%" stopColor={legGrad.a} />
          <stop offset="78%" stopColor={legGrad.b} />
          <stop offset="100%" stopColor={legGrad.a} />
        </linearGradient>

        {/* body gradients */}
        <linearGradient id="bodyGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={bodyLight} />
          <stop offset="100%" stopColor={bodyDark} />
        </linearGradient>

        {/* cushion gradients */}
        <linearGradient id="cushGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={cushionLight} />
          <stop offset="100%" stopColor={cushionDeep} />
        </linearGradient>

        {/* arm gradients */}
        <linearGradient id="armGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={armLight} />
          <stop offset="100%" stopColor={armDeep} />
        </linearGradient>
      </defs>

      {/* floor shadow */}
      <ellipse cx="360" cy="360" rx="240" ry="38" fill="rgba(0,0,0,.18)" />

      {/* backrest shell */}
      <g filter="url(#softShadow)">
        <path
          d="M170 120c0-36 36-64 80-64h220c44 0 80 28 80 64v92c0 22-10 42-28 54l-42 28a48 48 0 0 1-26 8H266a48 48 0 0 1-26-8l-42-28c-18-12-28-32-28-54V120z"
          fill="url(#bodyGrad)"
        />
        {/* rim highlight */}
        <path
          d="M180 132c0-28 30-50 66-50h228c36 0 66 22 66 50v78c0 18-8 34-22 44l-38 26a38 38 0 0 1-20 6H260a38 38 0 0 1-20-6l-38-26c-14-10-22-26-22-44v-78z"
          fill="none"
          stroke={white}
          opacity=".2"
          strokeWidth="3"
        />
      </g>

      {/* backrest cushion */}
      <g filter="url(#softShadow)">
        <rect x="210" y="120" rx="26" ry="26" width="300" height="150" fill="url(#cushGrad)" />
        {/* stitching/piping */}
        <rect x="212" y="122" rx="24" ry="24" width="296" height="146" fill="none" stroke={pipStroke} strokeOpacity=".7" strokeWidth="2"/>
        {/* leather/fabric texture */}
        <rect
          x="210" y="120" rx="26" ry="26" width="300" height="150"
          fill="transparent"
          filter={`url(#${material === "fabric" ? "grainFabric" : "grainLeather"})`}
        />
      </g>

      {/* side arms (curved) */}
      <g filter="url(#softShadow)">
        <path
          d="M160 206c8-18 28-30 52-30h26c6 0 10 4 10 10v90c0 6-4 10-10 10h-14c-32 0-56-26-56-58 0-8 2-16 6-22z"
          fill="url(#armGrad)"
        />
        <path
          d="M560 206c-8-18-28-30-52-30h-26c-6 0-10 4-10 10v90c0 6 4 10 10 10h14c32 0 56-26 56-58 0-8-2-16-6-22z"
          fill="url(#armGrad)"
        />
        <path
          d="M162 210c6-14 22-24 44-24h26"
          stroke={white}
          strokeOpacity=".25"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M558 210c-6-14-22-24-44-24h-26"
          stroke={white}
          strokeOpacity=".25"
          strokeWidth="3"
          fill="none"
        />
      </g>

      {/* seat base / body bridge */}
      <g filter="url(#softShadow)">
        <path
          d="M230 260h260c14 0 26 12 26 26v16c0 14-12 26-26 26H230c-14 0-26-12-26-26v-16c0-14 12-26 26-26z"
          fill="url(#bodyGrad)"
        />
        <path
          d="M236 266h248c10 0 18 8 18 18v10c0 10-8 18-18 18H236c-10 0-18-8-18-18v-10c0-10 8-18 18-18z"
          fill="none"
          stroke={white}
          strokeOpacity=".2"
          strokeWidth="2"
        />
      </g>

      {/* seat cushion */}
      <g filter="url(#softShadow)">
        <rect x="230" y="242" rx="22" ry="22" width="260" height="60" fill="url(#cushGrad)" />
        <rect x="232" y="244" rx="20" ry="20" width="256" height="56" fill="none" stroke={pipStroke} strokeOpacity=".7" strokeWidth="2" />
        <rect
          x="230" y="242" rx="22" ry="22" width="260" height="60"
          fill="transparent"
          filter={`url(#${material === "fabric" ? "grainFabric" : "grainLeather"})`}
        />
      </g>

      {/* legs (front pair) */}
      <g filter="url(#softShadow)">
        <path d="M276 310c0-6 4-10 10-10h10c6 0 10 4 10 10v54c0 6-4 10-10 10h-10c-6 0-10-4-10-10z" fill="url(#legGrad)" />
        <path d="M424 310c0-6 4-10 10-10h10c6 0 10 4 10 10v54c0 6-4 10-10 10h-10c-6 0-10-4-10-10z" fill="url(#legGrad)" />
      </g>

      {/* legs (rear pair, slightly shorter & darker for depth) */}
      <g opacity=".7" filter="url(#softShadow)">
        <path d="M240 312c0-6 4-10 10-10h8c6 0 10 4 10 10v48c0 6-4 10-10 10h-8c-6 0-10-4-10-10z" fill="url(#legGrad)" />
        <path d="M458 312c0-6 4-10 10-10h8c6 0 10 4 10 10v48c0 6-4 10-10 10h-8c-6 0-10-4-10-10z" fill="url(#legGrad)" />
      </g>
    </svg>
  );
}
