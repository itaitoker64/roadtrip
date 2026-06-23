"use client";

import { useState } from "react";
import { useTripState } from "@/lib/store";
import { Task, TaskStatus, TASK_SEED, STATUS_LABEL, STATUS_ORDER } from "@/lib/data/tasks";
import { Card, Button, Badge } from "@/components/ui";
import { GateGuard } from "./GateGuard";
import { Avatar, TravelerPicker, SyncBadge } from "./shared";
import { Plus, Trash2, CalendarClock } from "lucide-react";

const STATUS_TONE: Record<TaskStatus, "neutral" | "accent" | "calm"> = {
  todo: "neutral",
  doing: "accent",
  done: "calm",
};

export function Tasks() {
  const [tasks, setTasks] = useTripState<Task[]>("tasks", TASK_SEED);
  const [title, setTitle] = useState("");

  const cycle = (id: string) =>
    setTasks((p) =>
      p.map((t) =>
        t.id === id
          ? {
              ...t,
              status:
                STATUS_ORDER[(STATUS_ORDER.indexOf(t.status) + 1) % STATUS_ORDER.length],
            }
          : t
      )
    );
  const setField = (id: string, patch: Partial<Task>) =>
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  const remove = (id: string) => setTasks((p) => p.filter((t) => t.id !== id));
  const add = () => {
    if (!title.trim()) return;
    setTasks((p) => [
      ...p,
      { id: crypto.randomUUID(), title: title.trim(), status: "todo", assignee: null, due: null },
    ]);
    setTitle("");
  };

  return (
    <GateGuard>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-ink-muted">
            משימות ההכנה לטיול — לחצו על הסטטוס כדי לקדם משימה.
          </p>
          <SyncBadge />
        </div>

        <Card className="flex flex-wrap items-center gap-2 p-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="הוסיפו משימה…"
            className="min-w-[180px] flex-1 rounded-full border border-sand-200 px-4 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <Button onClick={add} size="sm">
            <Plus size={15} /> הוסיפו
          </Button>
        </Card>

        <div className="grid gap-4 lg:grid-cols-3">
          {STATUS_ORDER.map((st) => {
            const list = tasks.filter((t) => t.status === st);
            return (
              <div key={st}>
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="font-display text-lg font-bold text-ink">
                    {STATUS_LABEL[st]}
                  </h3>
                  <Badge tone={STATUS_TONE[st]}>{list.length}</Badge>
                </div>
                <div className="space-y-3">
                  {list.map((t) => (
                    <Card key={t.id} className="p-3.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-ink">{t.title}</p>
                        <button
                          onClick={() => remove(t.id)}
                          className="text-ink-muted transition-colors hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <button onClick={() => cycle(t.id)}>
                          <Badge tone={STATUS_TONE[t.status]}>
                            ↻ {STATUS_LABEL[t.status]}
                          </Badge>
                        </button>
                        {t.due && (
                          <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
                            <CalendarClock size={13} />
                            {new Date(t.due).toLocaleDateString("he-IL", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        )}
                        {t.assignee && <Avatar id={t.assignee} size={22} />}
                      </div>
                      <div className="mt-2.5 flex flex-wrap items-center gap-2">
                        <TravelerPicker
                          value={t.assignee}
                          onChange={(a) => setField(t.id, { assignee: a })}
                        />
                        <input
                          type="date"
                          value={t.due ?? ""}
                          onChange={(e) => setField(t.id, { due: e.target.value || null })}
                          className="rounded-full border border-sand-200 px-2.5 py-1 text-xs outline-none focus:border-accent"
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </GateGuard>
  );
}
