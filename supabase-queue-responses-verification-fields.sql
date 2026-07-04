alter table public.queue_responses
  add column if not exists verification_task_type text,
  add column if not exists verification_condition text,
  add column if not exists verification_selected_queue text,
  add column if not exists verification_crowded_queue text,
  add column if not exists verification_queue_counts jsonb,
  add column if not exists verification_selected_crowded_queue boolean,
  add column if not exists verification_response_time_seconds numeric,
  add column if not exists verification_started_at timestamptz,
  add column if not exists verification_selected_at timestamptz;
