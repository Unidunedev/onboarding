-- Adiciona os estilos Lo-fi Café, Terminal hacker e Neo-brutalismo.
alter table public.inscricoes drop constraint if exists inscricoes_estilo_artistico_check;

alter table public.inscricoes add constraint inscricoes_estilo_artistico_check
  check (estilo_artistico in ('gamificado','floresta','clean','lofi','terminal','brutalismo'));
