import { z } from "zod";

export const AREAS = [
  "Front-end",
  "Back-end",
  "Mobile",
  "UI/UX Design",
  "QA/Testes",
  "Banco de Dados",
  "DevOps",
  "PO/Produto",
  "Ainda não sei",
] as const;
export const PERIODOS = [
  "1º",
  "2º",
  "3º",
  "4º",
  "5º",
  "6º",
  "7º",
  "8º",
  "9º",
  "10º",
  "Já formado",
  "Prefiro não informar",
] as const;
export const IDEIAS = [
  "Rede social para antissociais",
  "Vitrine para compartilhar projetos",
  "Outra ideia",
] as const;
// Avatar: link https:// (DiceBear, GitHub...) ou um dos arquivos de public/avatares/
const LOCAL_AVATAR = /^\/avatares\/[a-z]+\/\d{2}\.svg$/;
export function isValidAvatar(value: string) {
  if (LOCAL_AVATAR.test(value)) return true;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export const profileSchema = z.object({
  nome: z.string().trim().min(1, "Como podemos te chamar?").max(80),
  github: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]([a-z0-9-]{0,37}[a-z0-9])?$/, "Use um username válido do GitHub, sem @."),
  avatar: z
    .string()
    .max(500)
    .refine(isValidAvatar, "Escolha um avatar da lista ou use um link https://."),
  periodo: z.enum(PERIODOS),
  areas: z.array(z.enum(AREAS)).min(1, "Escolha pelo menos uma área.").max(9),
  frase: z.string().max(80, "Sua frase pode ter até 80 caracteres."),
});
export const registrationSchema = profileSchema
  .extend({
    ideia_projeto: z.enum(IDEIAS),
    ideia_texto: z.string().max(600),
    sugestao_nome: z.string().max(80),
    estilo_artistico: z.enum(["gamificado", "floresta", "clean"]),
  })
  .superRefine((v, ctx) => {
    if (v.ideia_projeto === "Outra ideia" && !v.ideia_texto.trim())
      ctx.addIssue({
        code: "custom",
        path: ["ideia_texto"],
        message: "Conta um pouquinho sobre sua ideia.",
      });
  });
export type Registration = z.infer<typeof registrationSchema>;
export type Member = z.infer<typeof profileSchema> & { entrouEm: string };
export function makePassport(data: Registration, date: string): Member {
  const { github, nome, avatar, periodo, areas, frase } = data;
  return { github, nome, avatar, periodo, areas, frase, entrouEm: date };
}
export type MemberSort = "recentes" | "nome";

/** Ordena o mural: mais recentes primeiro (desempate por nome) ou A–Z. */
export function sortMembers(members: Member[], mode: MemberSort): Member[] {
  const byName = (a: Member, b: Member) => a.nome.localeCompare(b.nome, "pt-BR");
  return [...members].sort((a, b) =>
    mode === "nome" ? byName(a, b) : b.entrouEm.localeCompare(a.entrouEm) || byName(a, b),
  );
}

export function loadMembers(): Member[] {
  const files = import.meta.glob("../../membros/*.json", { eager: true, import: "default" });
  return Object.entries(files)
    .filter(([path]) => !path.split("/").at(-1)?.startsWith("_"))
    .flatMap(([path, value]) => {
      const parsed = profileSchema.extend({ entrouEm: z.string() }).safeParse(value);
      if (!parsed.success && import.meta.env.DEV) {
        // Só em desenvolvimento: explica por que um card não apareceu no mural
        console.warn(`[mural] ${path} ignorado:`, parsed.error.flatten().fieldErrors);
      }
      return parsed.success ? [parsed.data] : [];
    });
}
export const AVATAR_CATEGORIES = [
  "Robôs",
  "Feminino",
  "Masculino",
  "Anime",
  "Fofinhos",
  "Sérios",
  "Pixel",
  "Emoji",
] as const;
export type AvatarCategory = (typeof AVATAR_CATEGORIES)[number];

// Avatares em arquivo: public/avatares/<pasta>/01.svg, 02.svg...
// Ao adicionar um arquivo novo na pasta, aumente o "count".
const LOCAL_AVATARS: Partial<Record<AvatarCategory, { folder: string; count: number }>> = {
  Feminino: { folder: "feminino", count: 22 },
  Masculino: { folder: "masculino", count: 22 },
};

const PASTEL = "d1d4f9,c0aede,b6e3f4,ffd5dc,ffdfbf,e8f0d8";
const ANIME_HAIR = [13, 14, 15, 16, 18, 19, 23, 29, 31, 32, 33, 40, 41, 42, 45]
  .map((n) => `variant${String(n).padStart(2, "0")}`)
  .join(",");

// Avatares gerados pelo DiceBear (https://www.dicebear.com). Créditos no rodapé do site.
const DICEBEAR_STYLES: Partial<Record<AvatarCategory, { style: string; params: string }>> = {
  Robôs: { style: "bottts-neutral", params: `backgroundColor=${PASTEL}` },
  Anime: {
    style: "lorelei",
    params: [
      `hair=${ANIME_HAIR}`,
      "mouth=happy01,happy02,happy03,happy04,happy05,happy06",
      "beardProbability=0",
      "earringsProbability=70",
      "glassesProbability=10",
      "hairColor=3b2219,6a3b2a,b5651d,2c1b4a,e0a36b,8a2c3c",
      "skinColor=ffe0cc,f2c9a8,d9a07a,a86b4a",
      "backgroundColor=ffd5dc,f8d9ff,ffe4ec,fde2e4",
    ].join("&"),
  },
  Fofinhos: { style: "miniavs", params: `backgroundColor=${PASTEL}` },
  Sérios: { style: "notionists", params: "backgroundColor=f3e8dc" },
  Pixel: { style: "pixel-art", params: "backgroundColor=e8f0d8,f3e8dc,dfe7f2" },
  Emoji: { style: "fun-emoji", params: "" },
};

/** Quantos avatares a categoria mostra na grade. */
export function avatarCount(category: AvatarCategory) {
  return LOCAL_AVATARS[category]?.count ?? 12;
}

export function avatarUrl(category: AvatarCategory, seed: number) {
  const local = LOCAL_AVATARS[category];
  if (local) {
    const n = ((seed - 1) % local.count) + 1;
    return `/avatares/${local.folder}/${String(n).padStart(2, "0")}.svg`;
  }
  const { style, params } = DICEBEAR_STYLES[category]!;
  const query = `seed=${encodeURIComponent(category + seed)}${params ? `&${params}` : ""}`;
  return `https://api.dicebear.com/9.x/${style}/svg?${query}`;
}

export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} · Unidunedev` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} · Unidunedev` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
