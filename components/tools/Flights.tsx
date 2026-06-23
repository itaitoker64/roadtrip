"use client";

import { DESTINATION_LIST } from "@/lib/data";
import { Card, Button, Badge, Reveal } from "@/components/ui";
import { Plane, Car, MapPin, ExternalLink, Route } from "lucide-react";

const DRIVE_REF = [
  { dest: "סרדיניה", legs: ["קליארי → קאלה גונונה: ~3 ש׳", "בסיס → קאלה גולוריצה: ~1:15 ש׳", "בסיס → Gorropu: ~40 דק׳"] },
  { dest: "קורסיקה", legs: ["פיגארי → פורטו-וקיו: ~30 דק׳", "בסיס → בוואלה (קניונינג): ~1:15 ש׳", "בסיס → בוניפסיו: ~40 דק׳"] },
];

export function Flights() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        {DESTINATION_LIST.map((d, i) => (
          <Reveal key={d.id} delay={i * 0.08}>
            <Card data-accent={d.accent} className="h-full p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Plane size={20} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-ink">{d.name}</h3>
                  <Badge tone={d.flight.direct ? "calm" : "neutral"}>
                    {d.flight.direct ? "טיסה ישירה" : "קונקשן אחד"}
                  </Badge>
                </div>
              </div>
              <p className="font-semibold text-ink">{d.flight.route}</p>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-muted">חברות</dt>
                  <dd className="text-end text-ink-soft">{d.flight.airlines}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-muted">משך</dt>
                  <dd className="text-ink-soft">{d.flight.duration}</dd>
                </div>
              </dl>
              <p className="mt-3 rounded-xl bg-sand-50 p-3 text-sm text-ink-muted">
                {d.flight.note}
              </p>
              <div className="mt-3 flex items-start gap-2 text-sm text-ink-soft">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  העברת שדה→בסיס: איסוף ואן בשדה ונסיעה ישירה ל{d.stay.base}.
                </span>
              </div>
              <div className="mt-2 flex items-start gap-2 text-sm text-ink-soft">
                <Car size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>{d.car}</span>
              </div>
              <Button href={d.flight.bookingUrl} variant="soft" className="mt-4" size="sm">
                חיפוש והזמנת טיסות <ExternalLink size={14} />
              </Button>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <Card className="p-5">
          <div className="mb-3 inline-flex items-center gap-2 text-ink">
            <Route size={20} className="text-accent" />
            <h3 className="font-display text-lg font-bold">מרחקי נסיעה לעיון</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {DRIVE_REF.map((r) => (
              <div key={r.dest} className="rounded-xl bg-sand-50 p-4">
                <h4 className="mb-2 font-semibold text-ink">{r.dest}</h4>
                <ul className="space-y-1 text-sm text-ink-muted">
                  {r.legs.map((l) => (
                    <li key={l} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
