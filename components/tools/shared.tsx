"use client";

import { TRAVELERS, travelerById } from "@/lib/data/travelers";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Cloud, CloudOff } from "lucide-react";
import { cn } from "@/components/ui";

export function SyncBadge() {
  return isSupabaseConfigured ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
      <Cloud size={13} /> מסונכרן בזמן אמת
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-sand-100 px-2.5 py-1 text-xs font-semibold text-ink-muted">
      <CloudOff size={13} /> נשמר מקומית
    </span>
  );
}

export function Avatar({ id, size = 28 }: { id: string; size?: number }) {
  const t = travelerById(id);
  if (!t) return null;
  return (
    <span
      className={cn(
        "inline-grid place-items-center rounded-full text-white",
        t.color
      )}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
      title={t.name}
    >
      {t.emoji}
    </span>
  );
}

export function TravelerPicker({
  value,
  onChange,
  allowNone = true,
}: {
  value: string | null;
  onChange: (id: string | null) => void;
  allowNone?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {allowNone && (
        <button
          onClick={() => onChange(null)}
          className={cn(
            "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
            value == null
              ? "border-accent bg-accent-soft text-accent"
              : "border-sand-300 text-ink-muted hover:bg-sand-50"
          )}
        >
          ללא שיוך
        </button>
      )}
      {TRAVELERS.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
            value === t.id
              ? "border-accent bg-accent-soft text-accent"
              : "border-sand-300 text-ink-muted hover:bg-sand-50"
          )}
        >
          <span>{t.emoji}</span> {t.name}
        </button>
      ))}
    </div>
  );
}
