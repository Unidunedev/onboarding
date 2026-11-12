import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  AVATAR_CATEGORIES,
  avatarCount,
  avatarUrl,
  profileSchema,
  registrationSchema,
  makePassport,
  PERIODOS,
  loadMembers,
  sortMembers,
} from "@/lib/community";
const profile = {
  nome: "Ana",
  github: "ana-dev",
  avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=ana",
  periodo: "1º",
  areas: ["Front-end"],
  frase: "Café e código",
};
describe("Community rules", () => {
  it("accepts exactly 80 characters and rejects 81 in profile phrase", () => {
    expect(profileSchema.safeParse({ ...profile, frase: "a".repeat(80) }).success).toBe(true);
    expect(profileSchema.safeParse({ ...profile, frase: "a".repeat(81) }).success).toBe(false);
  });
  it("provides all ten periods, graduated and opt-out options", () => {
    expect(PERIODOS).toEqual([
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
    ]);
    expect(profileSchema.safeParse({ ...profile, periodo: "11º" }).success).toBe(false);
  });
  it("requires at least one interest and supports multiple interests", () => {
    expect(profileSchema.safeParse({ ...profile, areas: [] }).success).toBe(false);
    expect(profileSchema.safeParse({ ...profile, areas: ["Front-end", "Back-end"] }).success).toBe(
      true,
    );
  });
  it("normalizes GitHub usernames and rejects invalid filenames", () => {
    expect(profileSchema.parse({ ...profile, github: "Ana-Dev" }).github).toBe("ana-dev");
    expect(profileSchema.safeParse({ ...profile, github: "../ana" }).success).toBe(false);
  });
  it("requires a description for another idea", () => {
    expect(
      registrationSchema.safeParse({
        ...profile,
        ideia_projeto: "Outra ideia",
        ideia_texto: "",
        sugestao_nome: "",
        estilo_artistico: "clean",
      }).success,
    ).toBe(false);
  });
  it("generates only the seven requested public passport fields", () => {
    const data = registrationSchema.parse({
      ...profile,
      ideia_projeto: "Vitrine para compartilhar projetos",
      ideia_texto: "",
      sugestao_nome: "",
      estilo_artistico: "clean",
    });
    expect(makePassport(data, "2026-11-12")).toEqual({ ...profile, entrouEm: "2026-11-12" });
  });
  it("does not include underscore example files in member list", () => {
    expect(loadMembers().some((m) => m.github === "seu-username")).toBe(false);
  });
  it("builds distinct avatar URLs per category", () => {
    const urls = AVATAR_CATEGORIES.map((c) => avatarUrl(c, 1));
    expect(new Set(urls).size).toBe(AVATAR_CATEGORIES.length);
    expect(avatarUrl("Feminino", 1)).toBe("/avatares/feminino/01.svg");
    expect(avatarUrl("Masculino", 22)).toBe("/avatares/masculino/22.svg");
    for (const c of ["Feminino", "Masculino"] as const) {
      for (let i = 1; i <= avatarCount(c); i++) {
        expect(existsSync(`public${avatarUrl(c, i)}`)).toBe(true);
      }
    }
    urls.forEach((u) => expect(profileSchema.shape.avatar.safeParse(u).success).toBe(true));
  });
  it("sorts members by most recent first, or by name", () => {
    const base = {
      avatar: "https://x.dev/a.png",
      periodo: "1º" as const,
      areas: ["Mobile" as const],
      frase: "",
    };
    const list = [
      { ...base, github: "bia", nome: "Bia", entrouEm: "2026-11-10" },
      { ...base, github: "ana", nome: "Ana", entrouEm: "2026-11-12" },
      { ...base, github: "caio", nome: "Caio", entrouEm: "2026-11-12" },
    ];
    expect(sortMembers(list, "recentes").map((m) => m.github)).toEqual(["ana", "caio", "bia"]);
    expect(sortMembers(list, "nome").map((m) => m.github)).toEqual(["ana", "bia", "caio"]);
  });
});
