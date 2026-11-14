# Site de estudos ☕

O site [estudos.unidunedev.workers.dev](https://estudos.unidunedev.workers.dev): introduções "pegando na mão" de fundamentos, lógica, C, Python e Java. Os desafios com correção automática ficam no repositório [estudos](https://github.com/unidunedev/estudos).

Ele mora aqui no repositório do onboarding para reaproveitar a logo e o visual, mas é um app separado.

## Rodando

```bash
npm install
npm run dev:estudos     # abre o site em modo de desenvolvimento
npm run build:estudos   # gera a pasta dist-estudos/
```

## Organização

```
estudos/
├── conteudo/               # as aulas (.mdx), nas mesmas pastas do repositório estudos
│   ├── fundamentos/
│   ├── disciplinas/logica/
│   └── linguagens/{c,python,java}/
└── src/
    ├── catalogo.ts         # trilhas, ordem das aulas, títulos e tempos
    ├── components/         # código com Copiar/Testar, Faça você mesmo, Quiz, Memória...
    └── pages/              # início (cardápio), trilha e aula
```

## Escrevendo ou corrigindo uma aula

1. Edite (ou crie) o `.mdx` em `estudos/conteudo/<pasta>/`. É Markdown normal, com alguns componentes:
   - blocos de código com a linguagem: ` ```c `, ` ```python `, ` ```java `, ` ```pseudo `, ` ```saida ` (saída do terminal) e ` ```terminal `. Programas completos ganham o botão **Testar** (abre o OnlineGDB). Em Java, use `public class Main`.
   - `<Nota tipo="dica|cuidado|curiosidade|analogia|ia">...</Nota>`
   - `<Tarefa titulo="...">` com `<Dica>` e `<Resposta>` dentro
   - `<Quiz pergunta="..." opcoes={["a", "b"]} correta={0} explicacao="..." />`
   - `<Memoria celulas={[{ nome: "x", tipo: "int", valor: "5", endereco: "0x10" }]} />`
   - `<Passos itens={[{ icone: "📝", titulo: "Código", texto: "..." }]} />`
   - `<Abas>` com `<Aba rotulo="C">...</Aba>` para o mesmo exemplo em várias linguagens
2. Aula nova? Adicione uma linha em `src/catalogo.ts`. O teste `catalogo.test.ts` avisa se faltar algo.
3. Cuidado no texto fora de código: `{`, `}` e `<` têm significado especial no MDX. Coloque entre crases.
4. Abra o PR. A Cloudflare gera uma prévia do site para revisar antes do merge.

## Deploy (Cloudflare)

É um segundo Worker ligado a este mesmo repositório:

- **Build command:** `npm run build:estudos`
- **Deploy command:** `npx wrangler deploy -c wrangler.estudos.jsonc`
- Nome do Worker: `estudos` → endereço `estudos.unidunedev.workers.dev`
