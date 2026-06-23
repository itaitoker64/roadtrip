"use client";

import { TRAVELERS } from "@/lib/data/travelers";
import { Card, Reveal } from "@/components/ui";

export function Travelers() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {TRAVELERS.map((t, i) => (
        <Reveal key={t.id} delay={i * 0.06}>
          <Card hover className="flex flex-col items-center p-5 text-center">
            <span
              className={`grid h-16 w-16 place-items-center rounded-full text-3xl text-white ${t.color}`}
            >
              {t.emoji}
            </span>
            <h3 className="mt-3 font-display text-lg font-bold text-ink">{t.name}</h3>
            <p className="mt-0.5 text-xs text-ink-muted">{t.role}</p>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
