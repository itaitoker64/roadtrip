"use client";

/**
 * The shared tools are fully open — no PIN/login. This stays as a thin wrapper
 * so feature components keep a single, stable layout seam.
 */
export function GateGuard({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
