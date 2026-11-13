import type { AvatarCategory, Member, Registration } from "@/lib/community";

// Rascunho salvo no navegador: sair para outra página não apaga o que foi preenchido,
// e a tela final (com o JSON) continua disponível até a pessoa fazer o PR.
const DRAFT_KEY = "unidunedev:inscricao";

export type Draft = {
  step: number;
  data: Registration;
  category: AvatarCategory;
  passport: Member | null;
  jsonCopiado?: boolean;
};

export function readDraft(): Partial<Draft> {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Partial<Draft>) : {};
  } catch {
    return {};
  }
}

export function saveDraft(draft: Draft) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Navegador sem storage (aba anônima restrita etc.): segue sem salvar.
  }
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignora
  }
}

export const EVENTO_INICIO = "unidunedev:inicio";

/**
 * Logo do cabeçalho: volta para a tela de boas-vindas sem apagar o que foi preenchido.
 * Quem já terminou a inscrição continua vendo a tela final (com o JSON).
 */
export function voltarAoInicio() {
  const draft = readDraft();
  if (draft.data && !draft.passport) {
    saveDraft({ ...(draft as Draft), step: 0 });
  }
  window.dispatchEvent(new Event(EVENTO_INICIO));
}

/** O "passaporte" de quem já se inscreveu neste navegador, se houver. */
export function readSavedPassport(): Member | null {
  return readDraft().passport ?? null;
}
