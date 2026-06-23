"use client";

import { useState } from "react";
import { useGate } from "@/lib/store";
import { Card, Button } from "@/components/ui";
import { Lock } from "lucide-react";

/**
 * Light gating: collaborative editing is hidden behind a shared family PIN.
 * Read-only viewing stays open; editing tools render their children only once
 * the PIN is entered (default "2026", configurable via NEXT_PUBLIC_TRIP_PIN).
 */
export function GateGuard({ children }: { children: React.ReactNode }) {
  const { unlocked, unlock } = useGate();
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  if (unlocked) return <>{children}</>;

  return (
    <Card className="mx-auto max-w-md p-8 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent-soft text-accent">
        <Lock size={22} />
      </div>
      <h3 className="mt-3 font-display text-xl font-bold text-ink">
        עריכה משותפת נעולה
      </h3>
      <p className="mt-1 text-sm text-ink-muted">
        הזינו את קוד המשפחה המשותף כדי לערוך אריזה, תקציב, משימות והערות.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!unlock(pin)) setError(true);
        }}
        className="mt-4 flex gap-2"
      >
        <input
          value={pin}
          onChange={(e) => {
            setPin(e.target.value);
            setError(false);
          }}
          inputMode="numeric"
          placeholder="קוד משפחה"
          className="flex-1 rounded-full border border-sand-300 bg-white px-4 py-2 text-center tracking-widest outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
        />
        <Button type="submit" size="md">
          פתחו
        </Button>
      </form>
      {error && (
        <p className="mt-2 text-sm font-medium text-red-600">קוד שגוי, נסו שוב.</p>
      )}
    </Card>
  );
}
