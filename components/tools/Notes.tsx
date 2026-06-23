"use client";

import { useState } from "react";
import { useTripState } from "@/lib/store";
import { Card, Button, EmptyState } from "@/components/ui";
import { GateGuard } from "./GateGuard";
import { Avatar, TravelerPicker, SyncBadge } from "./shared";
import { Trash2, StickyNote } from "lucide-react";

interface Note {
  id: string;
  text: string;
  author: string | null;
  ts: number;
}

export function Notes() {
  const [notes, setNotes] = useTripState<Note[]>("notes", []);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState<string | null>("me");

  const add = () => {
    if (!text.trim()) return;
    setNotes((prev) => [
      { id: crypto.randomUUID(), text: text.trim(), author, ts: Date.now() },
      ...prev,
    ]);
    setText("");
  };

  return (
    <GateGuard>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-ink-muted">
            לוח הערות משותף — רעיונות, תזכורות וכל מה שעולה לראש.
          </p>
          <SyncBadge />
        </div>

        <Card className="p-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="כתבו הערה לכל המשפחה…"
            rows={3}
            className="w-full resize-none rounded-xl border border-sand-200 bg-white p-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <TravelerPicker value={author} onChange={setAuthor} allowNone={false} />
            <Button onClick={add} size="sm">
              הוסיפו הערה
            </Button>
          </div>
        </Card>

        {notes.length === 0 ? (
          <EmptyState>
            <StickyNote className="mx-auto mb-2 text-ink-muted" /> עוד אין הערות —
            כתבו את הראשונה.
          </EmptyState>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {notes.map((n) => (
              <Card key={n.id} className="flex flex-col gap-2 p-4">
                <p className="whitespace-pre-wrap text-sm text-ink">{n.text}</p>
                <div className="mt-auto flex items-center justify-between pt-2 text-xs text-ink-muted">
                  <span className="inline-flex items-center gap-1.5">
                    {n.author && <Avatar id={n.author} size={22} />}
                    {new Date(n.ts).toLocaleDateString("he-IL", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                  <button
                    onClick={() => setNotes((p) => p.filter((x) => x.id !== n.id))}
                    className="text-ink-muted transition-colors hover:text-red-600"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </GateGuard>
  );
}
