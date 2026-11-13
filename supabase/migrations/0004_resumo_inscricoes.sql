-- Resumo público e anônimo das inscrições: só números, nenhum dado pessoal.
-- Usado no formulário para mostrar, ao vivo, quantas pessoas escolheram cada área.
-- "security definer" deixa a função contar as linhas mesmo com o RLS bloqueando a leitura direta.

create or replace function public.resumo_inscricoes()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'total', (select count(*) from public.inscricoes),
    'areas', coalesce(
      (select jsonb_object_agg(area, quantidade)
         from (select unnest(areas) as area, count(*) as quantidade
                 from public.inscricoes
                group by 1) t),
      '{}'::jsonb
    )
  );
$$;

revoke all on function public.resumo_inscricoes() from public;
grant execute on function public.resumo_inscricoes() to anon;
