"use client";

import { DESTINATIONS } from "@/lib/data";
import { sum } from "@/lib/format";
import { money } from "@/lib/format";
import { useTripState } from "@/lib/store";
import { Card, Button, Badge, Reveal } from "@/components/ui";
import { Check, Plane, Waves, Mountain, Sparkles, Wallet, Star } from "lucide-react";

type Chosen = "corsica" | "sardinia" | null;

interface Row {
  icon: typeof Plane;
  label: string;
  corsica: string;
  sardinia: string;
  winner: "corsica" | "sardinia" | "tie";
}

export function Decision() {
  const [chosen, setChosen] = useTripState<Chosen>("chosen-destination", null);

  const cor = DESTINATIONS.corsica;
  const sar = DESTINATIONS.sardinia;
  const corCost = sum(cor.costs.map((c) => c.amount));
  const sarCost = sum(sar.costs.map((c) => c.amount));

  const rows: Row[] = [
    {
      icon: Mountain,
      label: "קניונינג",
      corsica: "בוואלה — מהטובים באירופה, מגלשות וקפיצות",
      sardinia: "סופרמונטה — מצוין, קצת פחות מפותח",
      winner: "corsica",
    },
    {
      icon: Waves,
      label: "חופים",
      corsica: "פלומבאג׳ה, רונדינרה — גרניט ורוד מהמם",
      sardinia: "קאלה גולוריצה ומריולו — טורקיז בלתי נתפס",
      winner: "sardinia",
    },
    {
      icon: Sparkles,
      label: "טבע דרמטי",
      corsica: "מחטי בוואלה, יערות והרים אלפיניים",
      sardinia: "קניון Gorropu וקירות של 400 מ׳",
      winner: "tie",
    },
    {
      icon: Plane,
      label: "נוחות טיסה",
      corsica: "קונקשן אחד, ~8.5 שעות דלת-לדלת",
      sardinia: "טיסה ישירה, ~3.5 שעות",
      winner: "sardinia",
    },
    {
      icon: Wallet,
      label: "עלות משוערת",
      corsica: money(corCost, "EUR") + " לקבוצה",
      sardinia: money(sarCost, "EUR") + " לקבוצה",
      winner: sarCost < corCost ? "sardinia" : "corsica",
    },
  ];

  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-sm text-ink-muted">
        השוואה ראש-בראש בין שני היעדים. בסוף — סמנו את היעד הנבחר, וההדגשה תופיע
        בכל האפליקציה (מרכז המסלול והמפה יתעדכנו אליו).
      </p>

      {/* Choose buttons */}
      <div className="grid gap-4 sm:grid-cols-2">
        {[sar, cor].map((d) => {
          const isChosen = chosen === d.id;
          return (
            <Reveal key={d.id}>
              <Card
                data-accent={d.accent}
                hover
                className={`relative p-5 ${
                  isChosen ? "ring-2 ring-accent" : ""
                }`}
              >
                {isChosen && (
                  <Badge tone="accent" className="absolute end-4 top-4">
                    <Star size={12} /> נבחר
                  </Badge>
                )}
                <h3 className="font-display text-2xl font-bold text-ink">{d.name}</h3>
                <p className="mt-1 text-sm text-ink-muted">{d.tagline}</p>
                <Button
                  onClick={() => setChosen(isChosen ? null : d.id)}
                  variant={isChosen ? "solid" : "outline"}
                  className="mt-4 w-full"
                  size="md"
                >
                  {isChosen ? (
                    <>
                      <Check size={16} /> זה היעד שלנו
                    </>
                  ) : (
                    "סמנו יעד נבחר"
                  )}
                </Button>
              </Card>
            </Reveal>
          );
        })}
      </div>

      {/* Comparison table */}
      <Card className="overflow-hidden">
        <div className="grid grid-cols-3 border-b border-sand-200 bg-sand-50 text-sm font-bold text-ink">
          <div className="p-3" />
          <div className="p-3 text-center">🐚 סרדיניה</div>
          <div className="p-3 text-center">🌲 קורסיקה</div>
        </div>
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-3 border-b border-sand-100 last:border-0">
            <div className="flex items-center gap-2 bg-sand-50/50 p-3 text-sm font-semibold text-ink">
              <r.icon size={16} className="text-ink-muted" />
              {r.label}
            </div>
            <div
              className={`p-3 text-xs sm:text-sm ${
                r.winner === "sardinia" ? "bg-sardinia-50 font-medium text-ink" : "text-ink-muted"
              }`}
            >
              {r.sardinia}
              {r.winner === "sardinia" && <span className="ms-1">✓</span>}
            </div>
            <div
              className={`p-3 text-xs sm:text-sm ${
                r.winner === "corsica" ? "bg-corsica-50 font-medium text-ink" : "text-ink-muted"
              }`}
            >
              {r.corsica}
              {r.winner === "corsica" && <span className="ms-1">✓</span>}
            </div>
          </div>
        ))}
      </Card>

      {/* Verdict */}
      <Card className="border-r-4 border-r-accent p-5" >
        <h3 className="font-display text-lg font-bold text-ink">השורה התחתונה</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          <strong>סרדיניה</strong> מנצחת בנוחות (טיסה ישירה), בעלות מעט נמוכה יותר
          ובחופים הטורקיז המטורפים — בחירה רגועה ובטוחה למשפחה עם טווח גילאים רחב.{" "}
          <strong>קורסיקה</strong> מנצחת בקניונינג ובטבע ההררי הדרמטי — אם האקשן
          והנופים האלפיניים הם השיקול המרכזי, היא מנצחת בענק. ההמלצה: אם רוצים
          בעיקר ים, נחת וקלות לוגיסטית — סרדיניה. אם רוצים הרפתקה הררית ואקשן
          קניונינג — קורסיקה.
        </p>
      </Card>
    </div>
  );
}
