"use client";

import { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { useTripState } from "@/lib/store";
import {
  Expense,
  BUDGET_CATEGORIES,
  BUDGET_SEED,
  CATEGORY_COLORS,
} from "@/lib/data/budget";
import { TRAVELERS } from "@/lib/data/travelers";
import { money } from "@/lib/format";
import { Card, Button, Badge } from "@/components/ui";
import { GateGuard } from "./GateGuard";
import { Avatar, SyncBadge } from "./shared";
import { Plus, Trash2 } from "lucide-react";

type Currency = "EUR" | "ILS";

export function Budget() {
  const [expenses, setExpenses] = useTripState<Expense[]>("budget", BUDGET_SEED);
  const [currency, setCurrency] = useTripState<Currency>("budget-currency", "EUR");
  const [label, setLabel] = useState("");
  const [cat, setCat] = useState<string>(BUDGET_CATEGORIES[0]);
  const [planned, setPlanned] = useState("");

  const totals = useMemo(() => {
    const plannedSum = expenses.reduce((a, e) => a + e.planned, 0);
    const actualSum = expenses.reduce((a, e) => a + e.actual, 0);
    const byCat = BUDGET_CATEGORIES.map((c) => {
      const list = expenses.filter((e) => e.category === c);
      return {
        category: c,
        planned: list.reduce((a, e) => a + e.planned, 0),
        actual: list.reduce((a, e) => a + e.actual, 0),
      };
    }).filter((r) => r.planned || r.actual);

    const perPerson: Record<string, number> = {};
    for (const t of TRAVELERS) perPerson[t.id] = 0;
    for (const e of expenses) {
      const base = e.actual || e.planned;
      const share = e.split.length ? base / e.split.length : 0;
      for (const id of e.split) perPerson[id] = (perPerson[id] ?? 0) + share;
    }
    return { plannedSum, actualSum, byCat, perPerson };
  }, [expenses]);

  const pieData = totals.byCat.map((r) => ({
    name: r.category,
    value: r.actual || r.planned,
  }));

  const conv = (n: number) => (currency === "ILS" ? n * 4 : n);

  const add = () => {
    const p = parseFloat(planned);
    if (!label.trim() || isNaN(p)) return;
    setExpenses((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label: label.trim(),
        category: cat,
        planned: p,
        actual: 0,
        split: TRAVELERS.map((t) => t.id),
      },
    ]);
    setLabel("");
    setPlanned("");
  };
  const setField = (id: string, patch: Partial<Expense>) =>
    setExpenses((p) => p.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  const remove = (id: string) => setExpenses((p) => p.filter((e) => e.id !== id));

  return (
    <GateGuard>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-full border border-sand-300 p-0.5">
            {(["EUR", "ILS"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  currency === c ? "bg-accent text-white" : "text-ink-muted"
                }`}
              >
                {c === "EUR" ? "€ יורו" : "₪ שקל"}
              </button>
            ))}
          </div>
          <SyncBadge />
        </div>

        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-4">
            <div className="text-sm text-ink-muted">מתוכנן</div>
            <div className="font-display text-2xl font-black text-ink">
              {money(totals.plannedSum, currency)}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-ink-muted">בפועל</div>
            <div className="font-display text-2xl font-black text-accent">
              {money(totals.actualSum, currency)}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-ink-muted">לאדם (מתוך 5)</div>
            <div className="font-display text-2xl font-black text-ink">
              {money((totals.actualSum || totals.plannedSum) / 5, currency)}
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-4">
            <h3 className="mb-2 font-display text-lg font-bold text-ink">
              פילוח לפי קטגוריה
            </h3>
            <div className="h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {pieData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={CATEGORY_COLORS[entry.name] ?? "#a3784a"}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: number) => money(v, currency)}
                    contentStyle={{ direction: "rtl", borderRadius: 12 }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="mb-2 font-display text-lg font-bold text-ink">
              מתוכנן מול בפועל
            </h3>
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart
                  data={totals.byCat.map((r) => ({
                    name: r.category,
                    מתוכנן: Math.round(conv(r.planned)),
                    בפועל: Math.round(conv(r.actual)),
                  }))}
                  margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} height={50} />
                  <YAxis tick={{ fontSize: 10 }} width={48} />
                  <Tooltip contentStyle={{ direction: "rtl", borderRadius: 12 }} />
                  <Legend />
                  <Bar dataKey="מתוכנן" fill="#d9c39c" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="בפועל" fill="#0f97a6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Per-person */}
        <Card className="p-4">
          <h3 className="mb-3 font-display text-lg font-bold text-ink">חלוקה לאדם</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {TRAVELERS.map((t) => (
              <div key={t.id} className="rounded-xl bg-sand-50 p-3 text-center">
                <Avatar id={t.id} size={32} />
                <div className="mt-1 text-xs font-medium text-ink-muted">{t.name}</div>
                <div className="font-bold text-ink">
                  {money(totals.perPerson[t.id] ?? 0, currency)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Add + list */}
        <Card className="flex flex-wrap items-center gap-2 p-3">
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="הוצאה…"
            className="min-w-[140px] flex-1 rounded-full border border-sand-200 px-4 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="rounded-full border border-sand-200 bg-white px-3 py-2 text-sm outline-none focus:border-accent"
          >
            {BUDGET_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input
            value={planned}
            onChange={(e) => setPlanned(e.target.value)}
            placeholder="€ מתוכנן"
            inputMode="numeric"
            className="w-28 rounded-full border border-sand-200 px-4 py-2 text-sm outline-none focus:border-accent"
          />
          <Button onClick={add} size="sm">
            <Plus size={15} /> הוסיפו
          </Button>
        </Card>

        <Card className="overflow-hidden">
          <div className="divide-y divide-sand-200">
            {expenses.map((e) => (
              <div key={e.id} className="flex flex-wrap items-center gap-3 p-3">
                <div className="min-w-[140px] flex-1">
                  <div className="font-medium text-ink">{e.label}</div>
                  <Badge tone="neutral" className="mt-1">
                    {e.category}
                  </Badge>
                </div>
                <label className="text-xs text-ink-muted">
                  מתוכנן
                  <input
                    value={e.planned}
                    onChange={(ev) =>
                      setField(e.id, { planned: parseFloat(ev.target.value) || 0 })
                    }
                    className="mt-0.5 block w-24 rounded-lg border border-sand-200 px-2 py-1 text-sm text-ink outline-none focus:border-accent"
                  />
                </label>
                <label className="text-xs text-ink-muted">
                  בפועל
                  <input
                    value={e.actual}
                    onChange={(ev) =>
                      setField(e.id, { actual: parseFloat(ev.target.value) || 0 })
                    }
                    className="mt-0.5 block w-24 rounded-lg border border-sand-200 px-2 py-1 text-sm text-accent outline-none focus:border-accent"
                  />
                </label>
                <button
                  onClick={() => remove(e.id)}
                  className="text-ink-muted transition-colors hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </GateGuard>
  );
}
