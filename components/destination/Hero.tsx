"use client";

import { motion } from "framer-motion";
import { Destination } from "@/lib/data";
import { HeroScene } from "@/components/layout/HeroScene";
import { Badge, PhotoBg } from "@/components/ui";
import { CalendarDays, MapPin, Plane } from "lucide-react";

export function Hero({ d }: { d: Destination }) {
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-lift">
      <div className="relative h-[460px] sm:h-[540px]">
        <HeroScene variant={d.accent} />
        {/* real location photo on top of the vector scene (falls back to scene) */}
        <PhotoBg filename={d.heroImage} alt={d.name} width={1600} />
        {/* legibility gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-white"
          >
            <Badge className="bg-white/20 text-white backdrop-blur">
              <Plane size={13} /> {d.flight.direct ? "טיסה ישירה" : "קונקשן אחד"}
            </Badge>
            <h1 className="mt-4 font-display display text-5xl font-black drop-shadow sm:text-7xl">
              {d.name}
            </h1>
            <p className="mt-2 text-lg font-medium text-white/90 sm:text-xl">
              {d.tagline}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              {d.pitch}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
                <CalendarDays size={15} /> {d.dates}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
                <MapPin size={15} /> {d.stay.base}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
