"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/* Reveal-on-scroll wrapper */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Card({
  children,
  className,
  hover = false,
  "data-accent": dataAccent,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  "data-accent"?: string;
}) {
  return (
    <div
      data-accent={dataAccent}
      className={cn(
        "rounded-2xl border border-sand-200/80 bg-white/85 backdrop-blur shadow-soft",
        hover && "transition-all hover:-translate-y-1 hover:shadow-lift",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  title,
  kicker,
  children,
  className,
}: {
  id?: string;
  title?: string;
  kicker?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      {(title || kicker) && (
        <Reveal className="mb-6">
          {kicker && (
            <div className="mb-1 text-sm font-semibold tracking-wide text-accent">
              {kicker}
            </div>
          )}
          {title && (
            <h2 className="font-display display text-3xl font-bold text-ink sm:text-4xl">
              {title}
            </h2>
          )}
        </Reveal>
      )}
      {children}
    </section>
  );
}

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: ReactNode;
  className?: string;
  tone?: "neutral" | "accent" | "active" | "calm";
}) {
  const tones: Record<string, string> = {
    neutral: "bg-sand-100 text-ink-soft",
    accent: "bg-accent-soft text-accent",
    active: "bg-orange-100 text-orange-700",
    calm: "bg-emerald-100 text-emerald-700",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function PaceTag({ pace }: { pace: "active" | "calm" }) {
  return pace === "active" ? (
    <Badge tone="active">⚡ אקטיבי</Badge>
  ) : (
    <Badge tone="calm">🌿 רגוע</Badge>
  );
}

export function Button({
  children,
  onClick,
  variant = "solid",
  className,
  type = "button",
  size = "md",
  href,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "solid" | "soft" | "ghost" | "outline";
  className?: string;
  type?: "button" | "submit";
  size?: "sm" | "md" | "lg";
  href?: string;
}) {
  const variants: Record<string, string> = {
    solid: "bg-accent text-white hover:opacity-90 shadow-soft",
    soft: "bg-accent-soft text-accent hover:brightness-95",
    ghost: "text-ink-soft hover:bg-sand-100",
    outline: "border border-sand-300 text-ink hover:bg-sand-50",
  };
  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all active:scale-[.98]",
    variants[variant],
    sizes[size],
    className
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function Progress({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-sand-200">
      <motion.div
        className="h-full rounded-full bg-accent"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}

export function IconWrap({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent",
        className
      )}
    >
      {children}
    </div>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-sand-300 bg-sand-50/60 p-8 text-center text-sm text-ink-muted">
      {children}
    </div>
  );
}
