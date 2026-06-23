"use client";

import { Highlight, StopType } from "@/lib/data";
import { Reveal } from "@/components/ui";

const TILE: Record<string, { from: string; to: string; icon: string }> = {
  beach: { from: "#8fe7ea", to: "#0f97a6", icon: "🏖️" },
  canyon: { from: "#7fa583", to: "#243f2e", icon: "🪂" },
  viewpoint: { from: "#e8dac2", to: "#a3784a", icon: "🔭" },
  base: { from: "#d9c39c", to: "#6f4e37", icon: "🏠" },
  restaurant: { from: "#fca573", to: "#c2410c", icon: "🍽️" },
  airport: { from: "#94a3b8", to: "#475569", icon: "✈️" },
};

function Tile({ kind }: { kind: StopType }) {
  const t = TILE[kind] ?? TILE.viewpoint;
  return (
    <div
      className="relative h-36 w-full overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})` }}
    >
      <div className="absolute inset-0 opacity-30 mix-blend-overlay [background:radial-gradient(circle_at_30%_20%,white,transparent_45%)]" />
      <span className="absolute bottom-2 start-3 text-4xl drop-shadow">{t.icon}</span>
      {/* subtle wave */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 400 40" preserveAspectRatio="none">
        <path d="M0 25 Q100 5 200 25 T400 25 V40 H0 Z" fill="white" opacity="0.18" />
      </svg>
    </div>
  );
}

export function Gallery({ highlights }: { highlights: Highlight[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {highlights.map((h, i) => (
        <Reveal key={h.id} delay={i * 0.05}>
          <div className="group overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
            <Tile kind={h.kind} />
            <div className="p-4">
              <h4 className="font-display text-lg font-bold text-ink">{h.title}</h4>
              <p className="mt-1 text-sm text-ink-muted">{h.blurb}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
