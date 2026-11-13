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

/** O "passaporte" de quem já se inscreveu neste navegador, se houver. */
export function readSavedPassport(): Member | null {
  return readDraft().passport ?? null;
}
