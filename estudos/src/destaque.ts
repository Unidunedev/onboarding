// Realce de sintaxe bem simples (sem bibliotecas): comentários, textos, números,
// palavras-chave, tipos e chamadas de função. Suficiente para as aulas e bem leve.

export type Token = { tipo: string; texto: string };

const PALAVRAS: Record<string, { chaves: string[]; tipos: string[] }> = {
  c: {
    chaves:
      "if else for while do switch case default break continue return sizeof struct typedef const static void unsigned signed".split(
        " ",
      ),
    tipos: "int float double char long short bool FILE size_t NULL".split(" "),
  },
  python: {
    chaves:
      "if elif else for while in not and or def return class import from as try except finally with lambda pass break continue is None True False self".split(
        " ",
      ),
    tipos: "int float str bool list dict tuple set print input len range".split(" "),
  },
  java: {
    chaves:
      "public private protected static final class interface extends implements new return if else for while do switch case default break continue this super import package try catch finally throw throws null true false void abstract".split(
        " ",
      ),
    tipos:
      "int double float char boolean long String Scanner System ArrayList List Map HashMap Integer Math".split(
        " ",
      ),
  },
  pseudo: {
    chaves:
      "algoritmo inicio fim se então senão fim-se enquanto faça fim-enquanto para de até passo fim-para escreva leia função retorne fim-função e ou não var".split(
        " ",
      ),
    tipos: "inteiro real texto caractere logico lógico".split(" "),
  },
};

function montarRegex(linguagem: string) {
  const comentario = linguagem === "python" ? "#.*" : "\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\/";
  const partes = [
    `(?<comentario>${comentario})`,
    linguagem === "c" ? "(?<preproc>#\\s*\\w+(?:\\s*<[^>\\n]*>)?)" : null,
    linguagem === "python"
      ? '(?<texto>[fF]?"""[\\s\\S]*?"""|[fF]?"(?:\\\\.|[^"\\\\\\n])*"|[fF]?\'(?:\\\\.|[^\'\\\\\\n])*\')'
      : "(?<texto>\"(?:\\\\.|[^\"\\\\\\n])*\"|'(?:\\\\.|[^'\\\\\\n])*')",
    "(?<numero>\\b\\d+(?:\\.\\d+)?[fFlL]?\\b)",
    linguagem === "java" || linguagem === "python" ? "(?<anotacao>@\\w+)" : null,
    "(?<palavra>[A-Za-zÀ-ú_][\\wÀ-ú-]*)",
  ].filter(Boolean);
  return new RegExp(partes.join("|"), "g");
}

export function destacar(codigo: string, linguagem: string): Token[] {
  const conf = PALAVRAS[linguagem];
  if (!conf) return [{ tipo: "", texto: codigo }];
  const regex = montarRegex(linguagem);
  const tokens: Token[] = [];
  let fim = 0;
  for (const m of codigo.matchAll(regex)) {
    const inicio = m.index ?? 0;
    if (inicio > fim) tokens.push({ tipo: "", texto: codigo.slice(fim, inicio) });
    const g = m.groups ?? {};
    let tipo = "";
    let texto = m[0];
    if (g["comentario"]) tipo = "comentario";
    else if (g["preproc"]) tipo = "preproc";
    else if (g["texto"]) tipo = "texto";
    else if (g["numero"]) tipo = "numero";
    else if (g["anotacao"]) tipo = "anotacao";
    else if (g["palavra"]) {
      // Em pseudocódigo palavras com hífen (fim-se) existem; nas outras, o hífen é operador.
      if (linguagem !== "pseudo" && texto.includes("-")) {
        texto = texto.split("-")[0]!;
      }
      const depois = codigo.slice(inicio + texto.length);
      if (conf.chaves.includes(texto)) tipo = "chave";
      else if (conf.tipos.includes(texto)) tipo = "tipo";
      else if (/^\s*\(/.test(depois)) tipo = "funcao";
    }
    tokens.push({ tipo, texto });
    fim = inicio + texto.length;
    if (texto.length !== m[0].length) regex.lastIndex = fim;
  }
  if (fim < codigo.length) tokens.push({ tipo: "", texto: codigo.slice(fim) });
  return tokens;
}
