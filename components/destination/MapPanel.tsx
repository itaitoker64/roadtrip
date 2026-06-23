"use client";

import dynamic from "next/dynamic";
import { MapStop } from "@/lib/data";
import { STOP_META } from "./stopMeta";
import { Card } from "@/components/ui";

const TripMap = dynamic(() => import("./TripMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[460px] w-full place-items-center rounded-2xl bg-sand-100 text-ink-muted">
      טוען מפה…
    </div>
  ),
});

const usedTypes = (stops: MapStop[]) =>
  Array.from(new Set(stops.map((s) => s.type)));

export function MapPanel({
  stops,
  center,
  zoom,
  accent,
  height = 460,
}: {
  stops: MapStop[];
  center: { lat: number; lng: number };
  zoom: number;
  accent: string;
  height?: number;
}) {
  return (
    <div className="space-y-3">
      <Card className="overflow-hidden p-1.5">
        <TripMap stops={stops} center={center} zoom={zoom} accent={accent} height={height} />
      </Card>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {usedTypes(stops).map((t) => (
          <span key={t} className="inline-flex items-center gap-1.5 text-sm text-ink-soft">
            <span
              className="h-3 w-3 rounded-full"
              style={{ background: STOP_META[t].color }}
            />
            {STOP_META[t].icon} {STOP_META[t].label}
          </span>
        ))}
      </div>
    </div>
  );
}
