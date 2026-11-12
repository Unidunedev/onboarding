-- Tabela de inscrições do formulário de onboarding.
-- Rode no SQL Editor do Supabase. Só INSERT é liberado para visitantes (anon):
-- ninguém consegue ler, editar ou apagar inscrições pelo site.

create table public.inscricoes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  github_username text not null unique
    check (github_username ~ '^[a-z0-9]([a-z0-9-]{0,37}[a-z0-9])?$'),
  nome text not null check (char_length(nome) between 1 and 80),
  avatar text not null check (char_length(avatar) <= 500),
  periodo text not null
    check (periodo in ('1º','2º','3º','4º','5º','6º','7º','8º','9º','10º','Já formado')),
  areas text[] not null
    check (cardinality(areas) between 1 and 9
      and areas <@ array['Front-end','Back-end','Mobile','UI/UX Design','QA/Testes',
                         'Banco de Dados','DevOps','PO/Produto','Ainda não sei']::text[]),
  frase text not null default '' check (char_length(frase) <= 80),
  ideia_projeto text not null
    check (ideia_projeto in ('Rede social para antissociais','Vitrine para compartilhar projetos','Outra ideia')),
  ideia_texto text not null default '' check (char_length(ideia_texto) <= 600),
  sugestao_nome text not null default '' check (char_length(sugestao_nome) <= 80),
  estilo_artistico text not null
    check (estilo_artistico in ('gamificado','floresta','clean'))
);

alter table public.inscricoes enable row level security;

revoke all on table public.inscricoes from public, anon, authenticated;
grant insert on table public.inscricoes to anon;
grant all on table public.inscricoes to service_role;

create policy "Inscrição pública, apenas insert"
  on public.inscricoes for insert to anon with check (true);
