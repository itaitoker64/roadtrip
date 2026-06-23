"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getSupabase, isSupabaseConfigured, TABLE } from "./supabase";

/**
 * Shared trip state. Every collaborative feature stores its data under a string
 * key in a single `trip_state` table (key text PK, value jsonb). When Supabase
 * env vars are present we read/write/subscribe to that table for live multi-user
 * sync; otherwise we fall back to localStorage so the app works standalone.
 */

const LS_PREFIX = "roadtrip2026:";

function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(LS_PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_PREFIX + key, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
}

type Listener = (value: unknown) => void;

// In-tab broadcast so multiple components sharing a key stay in sync without Supabase.
const listeners = new Map<string, Set<Listener>>();

function subscribeLocal(key: string, fn: Listener) {
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key)!.add(fn);
  return () => listeners.get(key)?.delete(fn);
}

function emitLocal(key: string, value: unknown) {
  listeners.get(key)?.forEach((fn) => fn(value));
}

export function useTripState<T>(
  key: string,
  initial: T
): [T, (next: T | ((prev: T) => T)) => void, { synced: boolean }] {
  const [value, setValue] = useState<T>(initial);
  const valueRef = useRef<T>(initial);
  valueRef.current = value;

  // Hydrate from localStorage on mount (avoids SSR mismatch).
  useEffect(() => {
    setValue(readLocal<T>(key, initial));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Cross-component local sync + Supabase realtime.
  useEffect(() => {
    const unsubLocal = subscribeLocal(key, (v) => setValue(v as T));

    const supabase = getSupabase();
    if (!supabase) return unsubLocal;

    let active = true;
    supabase
      .from(TABLE)
      .select("value")
      .eq("key", key)
      .maybeSingle()
      .then(({ data }) => {
        if (active && data && data.value != null) {
          setValue(data.value as T);
          writeLocal(key, data.value);
        }
      });

    const channel = supabase
      .channel(`trip_state:${key}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: TABLE, filter: `key=eq.${key}` },
        (payload) => {
          const next = (payload.new as { value?: T })?.value;
          if (next != null) {
            setValue(next);
            writeLocal(key, next);
          }
        }
      )
      .subscribe();

    return () => {
      active = false;
      unsubLocal();
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved =
        typeof next === "function"
          ? (next as (prev: T) => T)(valueRef.current)
          : next;
      setValue(resolved);
      writeLocal(key, resolved);
      emitLocal(key, resolved);

      const supabase = getSupabase();
      if (supabase) {
        supabase
          .from(TABLE)
          .upsert({ key, value: resolved, updated_at: new Date().toISOString() })
          .then(({ error }) => {
            if (error) console.warn("trip_state upsert failed", error.message);
          });
      }
    },
    [key]
  );

  return [value, update, { synced: isSupabaseConfigured }];
}

/* ---------------- PIN gate ---------------- */

interface GateCtx {
  unlocked: boolean;
  unlock: (pin: string) => boolean;
}
const GateContext = createContext<GateCtx>({ unlocked: false, unlock: () => false });

const PIN = process.env.NEXT_PUBLIC_TRIP_PIN || "2026";

export function GateProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (readLocal<boolean>("gate-unlocked", false)) setUnlocked(true);
  }, []);

  const unlock = useCallback((pin: string) => {
    if (pin.trim() === PIN) {
      setUnlocked(true);
      writeLocal("gate-unlocked", true);
      return true;
    }
    return false;
  }, []);

  return (
    <GateContext.Provider value={{ unlocked, unlock }}>
      {children}
    </GateContext.Provider>
  );
}

export const useGate = () => useContext(GateContext);
