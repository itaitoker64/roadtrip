"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Destination, ItineraryDay } from "@/lib/data";
import { Card, PaceTag, Badge } from "@/components/ui";
import { ChevronDown, Clock, Car, UtensilsCrossed } from "lucide-react";

function DayCard({ day, open, onToggle }: { day: ItineraryDay; open: boolean; onToggle: () => void }) {
  return (
    <Card className="overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 p-4 text-right sm:p-5"
      >
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-white">
          <div className="text-center leading-none">
            <div className="text-[10px] opacity-80">יום</div>
            <div className="text-lg font-bold">{day.day}</div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-bold text-ink">{day.title}</h3>
            <PaceTag pace={day.pace} />
          </div>
          <p className="mt-0.5 truncate text-sm text-ink-muted">
            {day.date} · {day.summary}
          </p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} className="text-ink-muted">
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-sand-200 p-4 sm:p-5">
              <ol className="relative space-y-4 ps-5">
                <span className="absolute bottom-2 end-[5px] top-2 w-px bg-sand-200" />
                {day.activities.map((a, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -end-[5px] top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent ring-4 ring-accent-soft" />
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-accent">
                        <Clock size={13} /> {a.time}
                      </span>
                      <span className="font-semibold text-ink">{a.title}</span>
                      {a.pace && <PaceTag pace={a.pace} />}
                    </div>
                    {a.detail && (
                      <p className="mt-0.5 text-sm text-ink-muted">{a.detail}</p>
                    )}
                    {a.drive && (
                      <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-ink-muted">
                        <Car size={13} /> {a.drive}
                      </span>
                    )}
                  </li>
                ))}
              </ol>

              {(day.meals || day.stayNote) && (
                <div className="mt-4 flex flex-col gap-2 rounded-xl bg-sand-50 p-3 text-sm sm:flex-row sm:items-center sm:gap-4">
                  {day.meals && (
                    <span className="inline-flex items-center gap-1.5 text-ink-soft">
                      <UtensilsCrossed size={15} className="text-accent" /> {day.meals}
                    </span>
                  )}
                  {day.stayNote && <Badge tone="accent">{day.stayNote}</Badge>}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

export function Itinerary({ d }: { d: Destination }) {
  const [open, setOpen] = useState<number | null>(1);
  return (
    <div className="space-y-3">
      {d.itinerary.map((day) => (
        <DayCard
          key={day.day}
          day={day}
          open={open === day.day}
          onToggle={() => setOpen(open === day.day ? null : day.day)}
        />
      ))}
    </div>
  );
}
