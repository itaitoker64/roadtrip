"use client";

import { motion } from "framer-motion";

/**
 * Cinematic, layered SVG coastal scene used as the destination hero backdrop.
 * (Higgsfield MCP was not available in this environment, so heroes are
 * hand-built vector art — fully responsive and theme-aware.)
 */
export function HeroScene({ variant }: { variant: "sardinia" | "corsica" }) {
  const sardinia = {
    sky: ["#bfeef0", "#7fd9de", "#e7d8b4"],
    sea: ["#0f97a6", "#22b6c2", "#8fe7ea"],
    rock: "#e8dac2",
    rockDark: "#d9c39c",
    hill: "#0c7986",
    hillFar: "#4fd3da",
    sun: "#fff4d6",
  };
  const corsica = {
    sky: ["#cfe0cf", "#a6c7af", "#e7d8b4"],
    sea: ["#2c4e38", "#558060", "#aec7af"],
    rock: "#cdb89a",
    rockDark: "#a3784a",
    hill: "#243f2e",
    hillFar: "#7fa583",
    sun: "#fbf0d6",
  };
  const c = variant === "sardinia" ? sardinia : corsica;

  return (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id={`sky-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.sky[0]} />
          <stop offset="55%" stopColor={c.sky[1]} />
          <stop offset="100%" stopColor={c.sky[2]} />
        </linearGradient>
        <linearGradient id={`sea-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.sea[2]} />
          <stop offset="50%" stopColor={c.sea[1]} />
          <stop offset="100%" stopColor={c.sea[0]} />
        </linearGradient>
        <radialGradient id={`sun-${variant}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c.sun} stopOpacity="0.95" />
          <stop offset="100%" stopColor={c.sun} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* sky */}
      <rect width="1200" height="430" fill={`url(#sky-${variant})`} />

      {/* sun glow */}
      <motion.circle
        cx="930"
        cy="170"
        r="200"
        fill={`url(#sun-${variant})`}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="930" cy="170" r="58" fill={c.sun} opacity="0.9" />

      {/* far mountains / needles */}
      {variant === "corsica" ? (
        <path
          d="M0 300 L120 180 L200 260 L300 140 L380 250 L470 170 L560 280 L660 200 L760 300 L1200 300 L1200 430 L0 430 Z"
          fill={c.hillFar}
          opacity="0.7"
        />
      ) : (
        <path
          d="M0 320 C200 250 360 300 520 270 C700 235 860 300 1060 260 L1200 280 L1200 430 L0 430 Z"
          fill={c.hillFar}
          opacity="0.65"
        />
      )}

      {/* mid hills */}
      <path
        d="M0 360 C160 300 320 360 480 330 C680 295 820 360 1000 330 L1200 350 L1200 430 L0 430 Z"
        fill={c.hill}
        opacity="0.85"
      />

      {/* sea */}
      <rect y="420" width="1200" height="280" fill={`url(#sea-${variant})`} />

      {/* shimmer lines on the sea */}
      {[470, 520, 580, 650].map((y, i) => (
        <motion.rect
          key={y}
          x="0"
          y={y}
          width="1200"
          height="3"
          rx="2"
          fill="#ffffff"
          opacity={0.18 - i * 0.03}
          initial={{ x: -60 }}
          animate={{ x: 60 }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* foreground rock / cliff */}
      <path
        d="M0 700 L0 470 C90 450 160 520 250 540 C150 600 80 640 0 660 Z"
        fill={c.rockDark}
      />
      <path
        d="M1200 700 L1200 440 C1080 450 980 540 900 580 C1010 610 1110 650 1200 660 Z"
        fill={c.rock}
      />
      <path
        d="M1200 700 L1200 500 C1110 510 1040 560 980 600 L1200 640 Z"
        fill={c.rockDark}
        opacity="0.7"
      />
    </svg>
  );
}
