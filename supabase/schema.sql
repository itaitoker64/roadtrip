-- Road Trip 2026 — shared state table.
-- Run this in the Supabase SQL editor after creating your project.

create table if not exists public.trip_state (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Open access (no auth/PIN). Open policies for the anon key so all 5 family
-- members can collaborate freely without per-user auth.
alter table public.trip_state enable row level security;

drop policy if exists "trip_state read"  on public.trip_state;
drop policy if exists "trip_state write" on public.trip_state;

create policy "trip_state read"  on public.trip_state for select using (true);
create policy "trip_state write" on public.trip_state for insert with check (true);
create policy "trip_state update" on public.trip_state for update using (true) with check (true);

-- Enable Realtime on the table (Database → Replication, or):
alter publication supabase_realtime add table public.trip_state;
