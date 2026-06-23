"use client";

import { Destination } from "@/lib/data";
import { Hero } from "./Hero";
import { Itinerary } from "./Itinerary";
import { MapPanel } from "./MapPanel";
import { Gallery } from "./Gallery";
import { Card, Reveal, Section, Badge, Button } from "@/components/ui";
import { money, sum } from "@/lib/format";
import {
  Home,
  Car,
  Sun,
  Plane,
  Wallet,
  Waves,
  Mountain,
  Sparkles,
  ExternalLink,
} from "lucide-react";

const WHY_ICONS = [Waves, Mountain, Sparkles];

export function DestinationView({ d }: { d: Destination }) {
  const accentHex = d.accent === "sardinia" ? "#0f97a6" : "#2c4e38";
  const total = sum(d.costs.map((c) => c.amount));

  return (
    <div data-accent={d.accent} className="space-y-14">
      <Reveal>
        <Hero d={d} />
      </Reveal>

      {/* Why here */}
      <Section kicker="למה דווקא כאן" title="שלוש סיבות שקשה להתווכח איתן">
        <div className="grid gap-4 md:grid-cols-3">
          {d.why.map((w, i) => {
            const Icon = WHY_ICONS[i % WHY_ICONS.length];
            return (
              <Reveal key={i} delay={i * 0.08}>
                <Card hover className="h-full p-5">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-ink">
                    {w.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {w.text}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Itinerary */}
      <Section kicker="מסלול יום-יום · 6 לילות" title="התוכנית המלאה, יום אחרי יום">
        <p className="mb-5 -mt-3 max-w-2xl text-sm text-ink-muted">
          כל יום מסומן באקטיבי או רגוע — כדי שגם הצעירים יקבלו אקשן וגם ההורים
          ייהנו בנחת. לחצו על יום כדי לפתוח את הפירוט.
        </p>
        <Itinerary d={d} />
      </Section>

      {/* Map */}
      <Section kicker="מפה אינטראקטיבית" title="כל העצירות על המפה">
        <MapPanel
          stops={d.stops}
          center={d.mapCenter}
          zoom={d.mapCenter.zoom}
          accent={accentHex}
        />
      </Section>

      {/* Gallery */}
      <Section kicker="גלריית שיא" title="הנקודות שאסור לפספס">
        <Gallery highlights={d.highlights} />
      </Section>

      {/* Stay / Car / Weather */}
      <Section kicker="לוגיסטיקה" title="איפה ישנים, איך נוסעים, מה מזג האוויר">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Home, title: "לינה ובסיס", body: (
              <>
                <p className="font-semibold text-ink">{d.stay.base}</p>
                <p className="mt-1 text-sm text-ink-muted">{d.stay.style}</p>
                <p className="mt-2 text-sm text-ink-muted">{d.stay.note}</p>
              </>
            )},
            { icon: Car, title: "רכב ולוגיסטיקה", body: <p className="text-sm text-ink-muted">{d.car}</p> },
            { icon: Sun, title: "מזג אוויר ביולי", body: <p className="text-sm text-ink-muted">{d.weather}</p> },
          ].map((c, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <Card className="h-full p-5">
                <div className="mb-2 inline-flex items-center gap-2 text-accent">
                  <c.icon size={20} />
                  <h3 className="font-display text-lg font-bold text-ink">{c.title}</h3>
                </div>
                {c.body}
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Flight + Cost */}
      <Section kicker="טיסות ועלות" title="כמה זה עולה ואיך מגיעים">
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full p-5">
              <div className="mb-3 inline-flex items-center gap-2 text-accent">
                <Plane size={20} />
                <h3 className="font-display text-lg font-bold text-ink">טיסה</h3>
                <Badge tone={d.flight.direct ? "calm" : "neutral"}>
                  {d.flight.direct ? "ישיר" : "קונקשן אחד"}
                </Badge>
              </div>
              <p className="font-semibold text-ink">{d.flight.route}</p>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-muted">חברות</dt>
                  <dd className="text-ink-soft">{d.flight.airlines}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-muted">משך</dt>
                  <dd className="text-ink-soft">{d.flight.duration}</dd>
                </div>
              </dl>
              <p className="mt-3 rounded-xl bg-sand-50 p-3 text-sm text-ink-muted">
                {d.flight.note}
              </p>
              <Button href={d.flight.bookingUrl} variant="soft" className="mt-3" size="sm">
                פתחו ב-Google Flights <ExternalLink size={14} />
              </Button>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="h-full p-5">
              <div className="mb-3 inline-flex items-center gap-2 text-accent">
                <Wallet size={20} />
                <h3 className="font-display text-lg font-bold text-ink">
                  הערכת עלות לכל הקבוצה
                </h3>
              </div>
              <ul className="divide-y divide-sand-200">
                {d.costs.map((c) => (
                  <li key={c.label} className="flex items-center justify-between gap-3 py-2">
                    <div>
                      <span className="text-sm font-medium text-ink">{c.label}</span>
                      {c.note && (
                        <span className="block text-xs text-ink-muted">{c.note}</span>
                      )}
                    </div>
                    <span className="shrink-0 font-semibold text-ink">
                      {money(c.amount, "EUR")}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between rounded-xl bg-accent-soft p-3">
                <span className="font-bold text-accent">סה״כ משוער</span>
                <div className="text-end">
                  <div className="text-lg font-black text-accent">
                    {money(total, "EUR")}
                  </div>
                  <div className="text-xs text-ink-muted">
                    ≈ {money(total / 5, "EUR")} לאדם
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
