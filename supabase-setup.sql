-- Executar no Supabase SQL Editor antes do deploy
-- Dashboard: https://supabase.com/dashboard → projeto → SQL Editor

create table if not exists leads_temperamento (
  id                   uuid default gen_random_uuid() primary key,
  created_at           timestamptz default now(),
  nome                 text not null,
  email                text not null,
  temperamento_natural text not null,
  temperamento_adaptado text not null,
  alinhado             boolean default false,
  score_san_natural    integer default 0,
  score_col_natural    integer default 0,
  score_fle_natural    integer default 0,
  score_mel_natural    integer default 0,
  score_san_adaptado   integer default 0,
  score_col_adaptado   integer default 0,
  score_fle_adaptado   integer default 0,
  score_mel_adaptado   integer default 0
);

-- Habilitar RLS
alter table leads_temperamento enable row level security;

-- Apenas service_role pode inserir (a API usa service_role key)
create policy "service_role insert" on leads_temperamento
  for insert with check (true);

-- Index por email para evitar duplicatas e facilitar busca
create index if not exists idx_leads_temp_email on leads_temperamento(email);
create index if not exists idx_leads_temp_nat on leads_temperamento(temperamento_natural);
create index if not exists idx_leads_temp_ada on leads_temperamento(temperamento_adaptado);
