# מסע 2026 · Road Trip 2026 — Corsica vs Sardinia

A polished, mobile-first, **Hebrew RTL** trip-planning web app for a 5-person
family road trip (5–11 July 2026), comparing two candidate destinations —
**Corsica** and **Sardinia** — plus a full suite of shared planning tools that
sync live across the whole family.

## ✨ Features

### Two full destination plans (Corsica + Sardinia)
- Cinematic hero, "why here", **day-by-day 6-night itinerary** (expandable cards,
  active/calm tags, drive times, meals)
- Interactive **Leaflet map** (OpenStreetMap, no API key) with color-coded pins
  and daily route lines
- Highlights gallery, stay & base, car & logistics, July weather, cost estimate

### Shared planning tools
- **Decision helper** — side-by-side comparison + "mark chosen destination" that
  highlights across the app
- **Itinerary hub** & **Master map** — follow the chosen destination, printable
- **Packing checklist** — categorized, assignable, progress bar
- **Budget tracker** — planned vs actual, per-person split, ₪/€ toggle, recharts
  pie + bars
- **Tasks** — seeded to-dos with status, assignee, due dates
- **Flights & logistics**, **Travelers**, live **Countdown**, shared **Notes**

All collaborative tools persist **live across users via Supabase Realtime**, with
a graceful **localStorage fallback** so the app works with zero configuration.

## 🧱 Tech stack
Next.js 14 (App Router) · TypeScript · Tailwind CSS · framer-motion ·
react-leaflet · recharts · Supabase (Postgres + Realtime).

## 🚀 Local development
```bash
npm install
cp .env.example .env.local   # optional — see below
npm run dev                  # http://localhost:3000
```
The app runs fully without any keys (data is stored in the browser). Add Supabase
keys to enable live multi-user sync.

## 🔗 Supabase (live shared persistence)
1. Create a project at <https://supabase.com>.
2. In the **SQL editor**, run [`supabase/schema.sql`](./supabase/schema.sql).
3. Copy your keys into `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   NEXT_PUBLIC_TRIP_PIN=2026
   ```
Editing tools are lightly gated behind the shared `NEXT_PUBLIC_TRIP_PIN`.

## ▲ Deploy to Vercel (Git auto-deploy)
1. Push this repo to GitHub (done).
2. In Vercel: **Add New → Project → Import** `itaitoker64/roadtrip`. Vercel
   auto-detects Next.js — no build config needed. This wires up **auto-deploy on
   every push**.
3. In **Project → Settings → Environment Variables**, add the three vars above.
4. Deploy. (CLI alternative: `npm i -g vercel && vercel link && vercel --prod`.)

## 🎨 Design system
Editorial Mediterranean: Frank Ruhl Libre (display) + Heebo (body), a neutral
coastal sand base, with per-destination accents — **Sardinia** turquoise + sand,
**Corsica** deep mountain green + stone. Heroes are hand-built layered SVG scenes.
