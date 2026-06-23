"use client";

import { useMemo, useState } from "react";
import { useTripState } from "@/lib/store";
import { PACK_CATEGORIES, PACK_SEED, PackItem } from "@/lib/data/packing";
import { Card, Button, Progress, Badge } from "@/components/ui";
import { GateGuard } from "./GateGuard";
import { Avatar, TravelerPicker, SyncBadge } from "./shared";
import { Plus, Trash2, Check } from "lucide-react";

export function Packing() {
  const [items, setItems] = useTripState<PackItem[]>("packing", PACK_SEED);
  const [label, setLabel] = useState("");
  const [cat, setCat] = useState<string>(PACK_CATEGORIES[1]);

  const done = items.filter((i) => i.checked).length;
  const pct = items.length ? (done / items.length) * 100 : 0;

  const byCat = useMemo(() => {
    const map: Record<string, PackItem[]> = {};
    for (const c of PACK_CATEGORIES) map[c] = [];
    for (const it of items) (map[it.category] ??= []).push(it);
    return map;
  }, [items]);

  const toggle = (id: string) =>
    setItems((p) => p.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
  const assign = (id: string, a: string | null) =>
    setItems((p) => p.map((i) => (i.id === id ? { ...i, assignee: a } : i)));
  const remove = (id: string) => setItems((p) => p.filter((i) => i.id !== id));
  const add = () => {
    if (!label.trim()) return;
    setItems((p) => [
      ...p,
      { id: crypto.randomUUID(), label: label.trim(), category: cat, checked: false, assignee: null },
    ]);
    setLabel("");
  };

  return (
    <GateGuard>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-[220px] flex-1">
            <div className="mb-1 flex items-center justify-between text-sm font-semibold">
              <span>התקדמות אריזה</span>
              <span className="text-accent">
                {done}/{items.length}
              </span>
            </div>
            <Progress value={pct} />
          </div>
          <SyncBadge />
        </div>

        <Card className="flex flex-wrap items-center gap-2 p-3">
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="הוסיפו פריט…"
            className="min-w-[160px] flex-1 rounded-full border border-sand-200 px-4 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="rounded-full border border-sand-200 bg-white px-3 py-2 text-sm outline-none focus:border-accent"
          >
            {PACK_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <Button onClick={add} size="sm">
            <Plus size={15} /> הוסיפו
          </Button>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {PACK_CATEGORIES.filter((c) => byCat[c]?.length).map((c) => (
            <Card key={c} className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-ink">{c}</h3>
                <Badge tone="accent">
                  {byCat[c].filter((i) => i.checked).length}/{byCat[c].length}
                </Badge>
              </div>
              <ul className="space-y-2.5">
                {byCat[c].map((it) => (
                  <li key={it.id} className="rounded-xl bg-sand-50/70 p-2.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggle(it.id)}
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
                          it.checked
                            ? "border-accent bg-accent text-white"
                            : "border-sand-300 bg-white"
                        }`}
                      >
                        {it.checked && <Check size={13} />}
                      </button>
                      <span
                        className={`flex-1 text-sm ${
                          it.checked ? "text-ink-muted line-through" : "text-ink"
                        }`}
                      >
                        {it.label}
                      </span>
                      {it.assignee && <Avatar id={it.assignee} size={22} />}
                      <button
                        onClick={() => remove(it.id)}
                        className="text-ink-muted transition-colors hover:text-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="mt-2 ps-7">
                      <TravelerPicker
                        value={it.assignee}
                        onChange={(a) => assign(it.id, a)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </GateGuard>
  );
}
