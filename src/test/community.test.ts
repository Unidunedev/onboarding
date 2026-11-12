import { describe, expect, it } from "vitest";
import {
  profileSchema,
  registrationSchema,
  makePassport,
  PERIODOS,
  loadMembers,
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
  it("provides all ten periods and graduated option", () => {
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
});
