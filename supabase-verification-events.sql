create table if not exists public.verification_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  partner_site text,
  partner_page_url text,
  participant_session_id text,

  task_type text default 'human_verification_cover',
  condition text,
  selected_queue text,
  crowded_queue text,
  queue_counts jsonb,
  selected_crowded_queue boolean,
  response_time_seconds numeric,

  started_at timestamptz,
  selected_at timestamptz,
  user_agent text,
  raw_payload jsonb
);

alter table public.verification_events enable row level security;

grant usage on schema public to anon;
grant insert on public.verification_events to anon;

drop policy if exists "anon can insert verification events" on public.verification_events;

create policy "anon can insert verification events"
on public.verification_events
for insert
to anon
with check (true);
