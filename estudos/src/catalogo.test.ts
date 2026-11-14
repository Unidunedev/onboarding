import { CAMINHOS_DOS_ARQUIVOS, TRILHAS } from "./catalogo";
import { destacar } from "./destaque";

describe("catálogo do site de estudos", () => {
  const esperados = TRILHAS.flatMap((t) =>
    t.aulas.map((a) => `../conteudo/${t.pasta}/${a.arquivo}.mdx`),
  );

  it("toda aula do catálogo tem o seu arquivo .mdx", () => {
    const faltando = esperados.filter((c) => !CAMINHOS_DOS_ARQUIVOS.includes(c));
    expect(faltando).toEqual([]);
  });

  it("todo arquivo .mdx está no catálogo (senão ninguém acha a aula)", () => {
    const sobrando = CAMINHOS_DOS_ARQUIVOS.filter((c) => !esperados.includes(c));
    expect(sobrando).toEqual([]);
  });

  it("os endereços das aulas não se repetem dentro de uma trilha", () => {
    for (const t of TRILHAS) {
      const slugs = t.aulas.map((a) => a.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });
});

describe("realce de código", () => {
  it("separa comentário, texto, palavra-chave e função", () => {
    const tokens = destacar('printf("oi"); // mostra', "c");
    expect(tokens.find((t) => t.tipo === "funcao")?.texto).toBe("printf");
    expect(tokens.find((t) => t.tipo === "texto")?.texto).toBe('"oi"');
    expect(tokens.find((t) => t.tipo === "comentario")?.texto).toBe("// mostra");
  });

  it("não perde nenhum caractere do código", () => {
    const codigo = "for (int i = 0; i < 10; i++) { x-=1; }";
    expect(
      destacar(codigo, "c")
        .map((t) => t.texto)
        .join(""),
    ).toBe(codigo);
  });
});
