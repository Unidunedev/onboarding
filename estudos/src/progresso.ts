// Progresso das aulas (✓ concluída). Fica só no navegador de quem estuda:
// é uma conveniência, então qualquer erro de armazenamento é ignorado.
import { useSyncExternalStore } from "react";

const CHAVE = "unidunedev:estudos:concluidas";
const ouvintes = new Set<() => void>();
let cache: string[] | null = null;

function ler(): string[] {
  if (cache) return cache;
  try {
    const bruto = localStorage.getItem(CHAVE);
    const lista: unknown = bruto ? JSON.parse(bruto) : [];
    cache = Array.isArray(lista) ? lista.filter((x): x is string => typeof x === "string") : [];
  } catch {
    cache = [];
  }
  return cache;
}

function gravar(lista: string[]) {
  cache = lista;
  try {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
  } catch {
    // Navegador sem armazenamento (aba anônima, por exemplo): segue só nesta visita.
  }
  ouvintes.forEach((f) => f());
}

export function alternarConcluida(id: string) {
  const lista = ler();
  gravar(lista.includes(id) ? lista.filter((x) => x !== id) : [...lista, id]);
}

export function marcarConcluida(id: string) {
  const lista = ler();
  if (!lista.includes(id)) gravar([...lista, id]);
}

export function useConcluidas(): string[] {
  return useSyncExternalStore(
    (f) => {
      ouvintes.add(f);
      return () => ouvintes.delete(f);
    },
    ler,
    () => [],
  );
}

export const idDaAula = (trilha: string, slug: string) => `${trilha}/${slug}`;
