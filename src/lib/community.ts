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
] as const;
export const IDEIAS = [
  "Rede social para antissociais",
  "Vitrine para compartilhar projetos",
  "Outra ideia",
] as const;
export const profileSchema = z.object({
  nome: z.string().trim().min(1, "Como podemos te chamar?").max(80),
  github: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]([a-z0-9-]{0,37}[a-z0-9])?$/, "Use um username válido do GitHub, sem @."),
  avatar: z.string().url().max(500),
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
export function loadMembers(): Member[] {
  const files = import.meta.glob("../../membros/*.json", { eager: true, import: "default" });
  return Object.entries(files)
    .filter(([path]) => !path.split("/").at(-1)?.startsWith("_"))
    .flatMap(([, value]) => {
      const parsed = profileSchema.extend({ entrouEm: z.string() }).safeParse(value);
      return parsed.success ? [parsed.data] : [];
    });
}
export function avatarUrl(category: string, seed: number) {
  const styles: Record<string, string> = {
    Feminino: "adventurer",
    Masculino: "adventurer",
    Sérios: "notionists",
    Dark: "bottts-neutral",
  };
  return `https://api.dicebear.com/9.x/${styles[category] ?? "adventurer"}/svg?seed=${encodeURIComponent(category + seed)}&backgroundColor=f3e8dc`;
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
