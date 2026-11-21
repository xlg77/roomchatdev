create table if not exists public.roomchat_usage_sessions (
  session_id uuid primary key,
  total_seconds bigint not null default 0 check (total_seconds >= 0),
  last_seen_at timestamptz not null default now()
);
alter table public.roomchat_usage_sessions enable row level security;
revoke all on public.roomchat_usage_sessions from anon, authenticated;
grant usage on schema public to anon, authenticated;

create or replace function public.roomchat_record_usage(p_session_id uuid, p_seconds integer)
returns void language plpgsql security definer set search_path = public as $$
declare v_seconds integer;
begin
  if p_session_id is null then raise exception 'session id required'; end if;
  v_seconds := greatest(0, least(coalesce(p_seconds, 0), 45));
  if v_seconds = 0 then return; end if;
  insert into public.roomchat_usage_sessions(session_id,total_seconds,last_seen_at)
  values (p_session_id,v_seconds,now())
  on conflict (session_id) do update
    set total_seconds = public.roomchat_usage_sessions.total_seconds + excluded.total_seconds,
        last_seen_at = now();
end; $$;

create or replace function public.roomchat_total_usage_seconds()
returns bigint language sql stable security definer set search_path = public as $$
  select coalesce(sum(total_seconds),0)::bigint from public.roomchat_usage_sessions;
$$;
revoke all on function public.roomchat_record_usage(uuid,integer) from public;
revoke all on function public.roomchat_total_usage_seconds() from public;
grant execute on function public.roomchat_record_usage(uuid,integer) to anon,authenticated;
grant execute on function public.roomchat_total_usage_seconds() to anon,authenticated;
