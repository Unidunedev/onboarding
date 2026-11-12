import { createClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";

// Valores públicos: quem protege os dados é o RLS no Supabase (só INSERT é liberado).
const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
  throw new Error(
    "Faltam VITE_SUPABASE_URL e/ou VITE_SUPABASE_PUBLISHABLE_KEY. Copie .env.example para .env e preencha.",
  );
}

export const supabase = createClient<Database>(url, publishableKey, {
  auth: { persistSession: false },
});
