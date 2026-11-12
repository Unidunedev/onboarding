REVOKE ALL ON TABLE public.inscricoes FROM PUBLIC, anon, authenticated;
GRANT INSERT ON TABLE public.inscricoes TO anon;
GRANT ALL ON TABLE public.inscricoes TO service_role;