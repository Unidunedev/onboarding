-- Adiciona a opção "Prefiro não informar" no período da faculdade.
alter table public.inscricoes drop constraint if exists inscricoes_periodo_check;

alter table public.inscricoes add constraint inscricoes_periodo_check
  check (periodo in ('1º','2º','3º','4º','5º','6º','7º','8º','9º','10º','Já formado','Prefiro não informar'));
