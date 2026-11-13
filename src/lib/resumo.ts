import { useEffect, useState } from "react";

import { supabase, supabaseConfigured } from "@/lib/supabase";

export type Resumo = { total: number; areas: Record<string, number> };

/**
 * Quantas pessoas já se inscreveram e quantas escolheram cada área.
 * Atualiza a cada 30 segundos. Se o banco não responder, devolve null e a tela segue normal.
 */
export function useResumoInscricoes(): Resumo | null {
  const [resumo, setResumo] = useState<Resumo | null>(null);

  useEffect(() => {
    if (!supabaseConfigured) return;
    let ativo = true;
    const buscar = async () => {
      const { data, error } = await supabase.rpc("resumo_inscricoes");
      if (ativo && !error && data) setResumo(data as Resumo);
    };
    buscar();
    const timer = setInterval(buscar, 30_000);
    return () => {
      ativo = false;
      clearInterval(timer);
    };
  }, []);

  return resumo;
}
