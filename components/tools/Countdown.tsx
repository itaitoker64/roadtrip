"use client";

import { useEffect, useState } from "react";
import { TRIP_START } from "@/lib/data";
import { Card } from "@/components/ui";

function diff() {
  const ms = TRIP_START.getTime() - Date.now();
  const clamped = Math.max(0, ms);
  return {
    days: Math.floor(clamped / 86400000),
    hours: Math.floor((clamped / 3600000) % 24),
    minutes: Math.floor((clamped / 60000) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

const UNITS: { key: keyof ReturnType<typeof diff>; label: string }[] = [
  { key: "days", label: "ימים" },
  { key: "hours", label: "שעות" },
  { key: "minutes", label: "דקות" },
  { key: "seconds", label: "שניות" },
];

export function Countdown() {
  const [t, setT] = useState(diff());
  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-l from-sardinia-500 via-sardinia-400 to-corsica-400 p-6 text-center text-white sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide opacity-90">
          הספירה לאחור ליציאה
        </p>
        <p className="mt-1 font-display text-xl font-bold">5 ביולי 2026</p>
        <div className="mt-5 flex justify-center gap-3 sm:gap-5">
          {UNITS.map((u) => (
            <div
              key={u.key}
              className="min-w-[68px] rounded-2xl bg-white/15 px-3 py-3 backdrop-blur sm:min-w-[88px]"
            >
              <div className="font-display text-3xl font-black tabular-nums sm:text-5xl">
                {String(t[u.key]).padStart(2, "0")}
              </div>
              <div className="mt-1 text-xs font-medium opacity-90">{u.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
