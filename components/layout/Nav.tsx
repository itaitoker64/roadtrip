"use client";

import { motion } from "framer-motion";
import { useTripState } from "@/lib/store";
import { SyncBadge } from "@/components/tools/shared";
import {
  Scale,
  CalendarDays,
  Map,
  Luggage,
  Wallet,
  CheckSquare,
  Plane,
  Users,
  Timer,
  StickyNote,
  Star,
  Compass,
} from "lucide-react";

export type ViewId =
  | "decision"
  | "sardinia"
  | "corsica"
  | "itinerary"
  | "map"
  | "packing"
  | "budget"
  | "tasks"
  | "flights"
  | "travelers"
  | "countdown"
  | "notes";

export const NAV_GROUPS: {
  group: string;
  items: { id: ViewId; label: string; icon: typeof Scale }[];
}[] = [
  {
    group: "יעדים",
    items: [
      { id: "sardinia", label: "סרדיניה", icon: Compass },
      { id: "corsica", label: "קורסיקה", icon: Compass },
    ],
  },
  {
    group: "החלטה ותכנון",
    items: [
      { id: "decision", label: "החלטה", icon: Scale },
      { id: "itinerary", label: "מסלול", icon: CalendarDays },
      { id: "map", label: "מפה", icon: Map },
      { id: "flights", label: "טיסות ולוגיסטיקה", icon: Plane },
    ],
  },
  {
    group: "ניהול משותף",
    items: [
      { id: "packing", label: "אריזה", icon: Luggage },
      { id: "budget", label: "תקציב", icon: Wallet },
      { id: "tasks", label: "משימות", icon: CheckSquare },
      { id: "notes", label: "הערות", icon: StickyNote },
    ],
  },
  {
    group: "המשפחה",
    items: [
      { id: "travelers", label: "הנוסעים", icon: Users },
      { id: "countdown", label: "ספירה לאחור", icon: Timer },
    ],
  },
];

export function Nav({
  active,
  onChange,
}: {
  active: ViewId;
  onChange: (v: ViewId) => void;
}) {
  const [chosen] = useTripState<"corsica" | "sardinia" | null>(
    "chosen-destination",
    null
  );

  return (
    <header className="sticky top-0 z-30 border-b border-sand-200/70 bg-sand-50/85 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-3 py-3">
          <button
            onClick={() => onChange("decision")}
            className="flex items-center gap-2 text-right"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-sardinia-500 to-corsica-500 text-white">
              <Compass size={18} />
            </span>
            <span>
              <span className="block font-display text-lg font-black leading-none text-ink">
                מסע 2026
              </span>
              <span className="block text-[11px] text-ink-muted">
                קורסיקה · סרדיניה
              </span>
            </span>
          </button>
          <SyncBadge />
        </div>

        <nav className="no-scrollbar -mb-px flex gap-1 overflow-x-auto pb-2">
          {NAV_GROUPS.flatMap((g) => g.items).map((item) => {
            const isActive = active === item.id;
            const isChosen = chosen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className={`relative inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-ink-soft hover:bg-sand-100"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative inline-flex items-center gap-1.5">
                  <item.icon size={15} />
                  {item.label}
                  {isChosen && <Star size={12} className="fill-current" />}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
