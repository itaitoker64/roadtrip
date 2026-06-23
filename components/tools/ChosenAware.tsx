"use client";

import { DESTINATIONS } from "@/lib/data";
import { useTripState } from "@/lib/store";
import { Itinerary } from "@/components/destination/Itinerary";
import { MapPanel } from "@/components/destination/MapPanel";
import { Card, Button, Badge } from "@/components/ui";
import { Printer, Star } from "lucide-react";

type Chosen = "corsica" | "sardinia" | null;

function Picker({
  chosen,
  setChosen,
}: {
  chosen: Chosen;
  setChosen: (c: Chosen) => void;
}) {
  return (
    <div className="no-print inline-flex rounded-full border border-sand-300 p-0.5">
      {(["sardinia", "corsica"] as const).map((id) => (
        <button
          key={id}
          onClick={() => setChosen(id)}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
            chosen === id ? "bg-accent text-white" : "text-ink-muted"
          }`}
        >
          {DESTINATIONS[id].name}
        </button>
      ))}
    </div>
  );
}

function NoChoice({ children }: { children: React.ReactNode }) {
  return (
    <Card className="p-6 text-center text-sm text-ink-muted">
      עדיין לא נבחר יעד. {children}
    </Card>
  );
}

export function ItineraryHub() {
  const [chosen, setChosen] = useTripState<Chosen>("chosen-destination", null);
  const active = chosen ?? "sardinia";
  const d = DESTINATIONS[active];

  return (
    <div data-accent={d.accent} className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Picker chosen={chosen} setChosen={setChosen} />
          {chosen && (
            <Badge tone="accent">
              <Star size={12} /> היעד הנבחר
            </Badge>
          )}
        </div>
        <Button onClick={() => window.print()} variant="outline" size="sm" className="no-print">
          <Printer size={15} /> הדפסה
        </Button>
      </div>

      {!chosen && (
        <NoChoice>מציג את סרדיניה כברירת מחדל — בחרו יעד בלשונית ההחלטה.</NoChoice>
      )}

      <div>
        <h2 className="mb-1 font-display text-2xl font-bold text-ink">
          המסלול המלא · {d.name}
        </h2>
        <p className="mb-4 text-sm text-ink-muted">{d.dates} · {d.stay.base}</p>
        <Itinerary d={d} />
      </div>
    </div>
  );
}

export function MasterMap() {
  const [chosen, setChosen] = useTripState<Chosen>("chosen-destination", null);
  const active = chosen ?? "sardinia";
  const d = DESTINATIONS[active];
  const accentHex = d.accent === "sardinia" ? "#0f97a6" : "#2c4e38";

  return (
    <div data-accent={d.accent} className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Picker chosen={chosen} setChosen={setChosen} />
        {chosen && (
          <Badge tone="accent">
            <Star size={12} /> היעד הנבחר
          </Badge>
        )}
      </div>
      <MapPanel
        stops={d.stops}
        center={d.mapCenter}
        zoom={d.mapCenter.zoom}
        accent={accentHex}
        height={560}
      />
    </div>
  );
}
