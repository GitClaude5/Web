-- Consultas del formulario web. Minimización de datos: no es un expediente jurídico.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  phone text not null check (char_length(phone) between 9 and 25),
  email text check (email is null or char_length(email) <= 120),
  subject text not null,
  message text not null check (char_length(message) between 10 and 1200),
  contact_preference text,
  consent_timestamp timestamptz not null,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- La web (rol anon) solo puede INSERTAR. Nunca leer, modificar ni borrar.
create policy "anon_insert_leads" on public.leads
  for insert to anon
  with check (true);
