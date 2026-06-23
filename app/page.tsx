"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Nav, ViewId } from "@/components/layout/Nav";
import { DestinationView } from "@/components/destination/DestinationView";
import { DESTINATIONS } from "@/lib/data";
import { Decision } from "@/components/tools/Decision";
import { Flights } from "@/components/tools/Flights";
import { Packing } from "@/components/tools/Packing";
import { Budget } from "@/components/tools/Budget";
import { Tasks } from "@/components/tools/Tasks";
import { Notes } from "@/components/tools/Notes";
import { Travelers } from "@/components/tools/Travelers";
import { Countdown } from "@/components/tools/Countdown";
import { ItineraryHub, MasterMap } from "@/components/tools/ChosenAware";

const TITLES: Record<ViewId, { kicker: string; title: string }> = {
  decision: { kicker: "עוזר החלטה", title: "קורסיקה או סרדיניה?" },
  sardinia: { kicker: "יעד", title: "סרדיניה" },
  corsica: { kicker: "יעד", title: "קורסיקה" },
  itinerary: { kicker: "מרכז המסלול", title: "המסלול המלא" },
  map: { kicker: "מפה ראשית", title: "כל העצירות" },
  packing: { kicker: "כלי משותף", title: "צ׳ק-ליסט אריזה" },
  budget: { kicker: "כלי משותף", title: "מעקב תקציב" },
  tasks: { kicker: "כלי משותף", title: "משימות ההכנה" },
  flights: { kicker: "לוגיסטיקה", title: "טיסות והעברות" },
  travelers: { kicker: "הנוסעים", title: "חמשת המטיילים" },
  countdown: { kicker: "הספירה לאחור", title: "עוד מעט יוצאים" },
  notes: { kicker: "כלי משותף", title: "לוח הערות" },
};

function ViewBody({ view }: { view: ViewId }) {
  switch (view) {
    case "sardinia":
      return <DestinationView d={DESTINATIONS.sardinia} />;
    case "corsica":
      return <DestinationView d={DESTINATIONS.corsica} />;
    case "decision":
      return <Decision />;
    case "itinerary":
      return <ItineraryHub />;
    case "map":
      return <MasterMap />;
    case "packing":
      return <Packing />;
    case "budget":
      return <Budget />;
    case "tasks":
      return <Tasks />;
    case "flights":
      return <Flights />;
    case "travelers":
      return <Travelers />;
    case "countdown":
      return <Countdown />;
    case "notes":
      return <Notes />;
  }
}

export default function Home() {
  const [view, setView] = useState<ViewId>("decision");
  const isDestination = view === "sardinia" || view === "corsica";
  const accent = isDestination ? view : "neutral";
  const t = TITLES[view];

  return (
    <div data-accent={accent} className="min-h-screen">
      <Nav active={view} onChange={setView} />

        <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
          {!isDestination && (
            <div className="mb-7">
              <div className="text-sm font-semibold text-accent">{t.kicker}</div>
              <h1 className="font-display display text-4xl font-black text-ink sm:text-5xl">
                {t.title}
              </h1>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <ViewBody view={view} />
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="mt-10 border-t border-sand-200 py-8 text-center text-sm text-ink-muted">
          <p className="font-display text-base font-bold text-ink">מסע 2026 · 5–11 ביולי</p>
          <p className="mt-1">איתי · טליה · גיא · עמית · ענת</p>
        </footer>
      </div>
  );
}
