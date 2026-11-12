import { createClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";

// Valores públicos: quem protege os dados é o RLS no Supabase (só INSERT é liberado).
const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/** false quando o .env (ou as variáveis do Cloudflare) não foram configurados. */
export const supabaseConfigured = Boolean(url && publishableKey);

if (!supabaseConfigured) {
  // Não derruba o site: só o envio do formulário fica indisponível.
  console.error(
    "[supabase] Faltam VITE_SUPABASE_URL e/ou VITE_SUPABASE_PUBLISHABLE_KEY. Copie .env.example para .env e preencha.",
  );
}

export const supabase = createClient<Database>(
  url || "https://configure-o-env.supabase.co",
  publishableKey || "chave-ausente",
  { auth: { persistSession: false } },
);
