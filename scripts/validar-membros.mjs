// Valida os arquivos da pasta membros/ antes do merge.
// Roda no GitHub Actions a cada Pull Request e localmente com: npm run validar-membros
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";

const AREAS = [
  "Front-end",
  "Back-end",
  "Mobile",
  "UI/UX Design",
  "QA/Testes",
  "Banco de Dados",
  "DevOps",
  "PO/Produto",
  "Ainda não sei",
];
const PERIODOS = ["1º", "2º", "3º", "4º", "5º", "6º", "7º", "8º", "9º", "10º", "Já formado"];

const membro = z
  .object({
    github: z
      .string()
      .regex(
        /^[a-z0-9]([a-z0-9-]{0,37}[a-z0-9])?$/,
        "use seu username do GitHub em minúsculas, sem @",
      ),
    nome: z
      .string()
      .trim()
      .min(1, "o nome não pode ficar vazio")
      .max(80, "o nome pode ter até 80 caracteres"),
    avatar: z.string().url("o avatar precisa ser um link (https://...)").max(500),
    periodo: z.enum(PERIODOS, {
      errorMap: () => ({ message: `use um destes: ${PERIODOS.join(", ")}` }),
    }),
    areas: z
      .array(z.enum(AREAS, { errorMap: () => ({ message: `áreas válidas: ${AREAS.join(", ")}` }) }))
      .min(1, "escolha pelo menos uma área"),
    frase: z.string().max(80, "a frase pode ter até 80 caracteres"),
    entrouEm: z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/, "use o formato AAAA-MM-DD"),
  })
  .strict();

const pasta = "membros";
let erros = 0;

for (const arquivo of readdirSync(pasta)
  .filter((f) => f.endsWith(".json"))
  .sort()) {
  const caminho = join(pasta, arquivo);
  const texto = readFileSync(caminho, "utf8");
  let dados;

  try {
    dados = JSON.parse(texto);
  } catch (e) {
    const pos = Number(/position (\d+)/.exec(e.message)?.[1]);
    const linha = Number.isNaN(pos) ? "?" : texto.slice(0, pos).split("\n").length;
    console.error(
      `❌ ${caminho}: o JSON está quebrado perto da linha ${linha}. Confira vírgulas, aspas e chaves 😉`,
    );
    erros++;
    continue;
  }

  const resultado = membro.safeParse(dados);
  if (!resultado.success) {
    for (const issue of resultado.error.issues) {
      const campo = issue.path.join(".") || "(arquivo)";
      const msg =
        issue.code === "unrecognized_keys"
          ? `campo não esperado: ${issue.keys.join(", ")}`
          : issue.message;
      console.error(`❌ ${caminho} → "${campo}": ${msg}`);
    }
    erros++;
    continue;
  }

  if (!arquivo.startsWith("_") && arquivo !== `${dados.github}.json`) {
    console.error(
      `❌ ${caminho}: o nome do arquivo precisa ser igual ao seu username → membros/${dados.github}.json`,
    );
    erros++;
    continue;
  }

  console.log(`✅ ${caminho}`);
}

if (erros > 0) {
  console.error(
    `\n${erros} arquivo(s) com problema. Corrija e faça um novo commit no mesmo PR, que o check roda de novo 💪`,
  );
  process.exit(1);
}
console.log("\nTudo certo! ☕");
