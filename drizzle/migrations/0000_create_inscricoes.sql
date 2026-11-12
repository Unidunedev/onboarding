CREATE TABLE public.inscricoes (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), created_at timestamptz NOT NULL DEFAULT now(),
 github_username text NOT NULL UNIQUE CHECK (github_username ~ '^[a-z0-9]([a-z0-9-]{0,37}[a-z0-9])?$'),
 nome text NOT NULL CHECK (char_length(nome) BETWEEN 1 AND 80), avatar text NOT NULL CHECK (char_length(avatar) <= 500),
 periodo text NOT NULL CHECK (periodo IN ('1º','2º','3º','4º','5º','6º','7º','8º','9º','10º','Já formado')),
 areas text[] NOT NULL CHECK (cardinality(areas) BETWEEN 1 AND 9 AND areas <@ ARRAY['Front-end','Back-end','Mobile','UI/UX Design','QA/Testes','Banco de Dados','DevOps','PO/Produto','Ainda não sei']::text[]),
 frase text NOT NULL DEFAULT '' CHECK (char_length(frase) <= 80), ideia_projeto text NOT NULL CHECK (ideia_projeto IN ('Rede social para antissociais','Vitrine para compartilhar projetos','Outra ideia')),
 ideia_texto text NOT NULL DEFAULT '' CHECK (char_length(ideia_texto) <= 600), sugestao_nome text NOT NULL DEFAULT '' CHECK (char_length(sugestao_nome) <= 80),
 estilo_artistico text NOT NULL CHECK (estilo_artistico IN ('gamificado','floresta','clean'))
);
GRANT INSERT ON public.inscricoes TO anon;
GRANT ALL ON public.inscricoes TO service_role;
ALTER TABLE public.inscricoes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public registration insert only" ON public.inscricoes FOR INSERT TO anon WITH CHECK (true);