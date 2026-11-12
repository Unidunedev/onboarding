<p align="center">
  <img src="public/favicon.svg" width="88" alt="" />
</p>

<h1 align="center">Unidunedev · Onboarding</h1>

<p align="center">
  Café, código e comunidade. O ponto de partida de quem chega na Unidunedev ☕
</p>

---

## O que é isto?

Este é o site de boas-vindas da **Unidunedev**, uma comunidade de devs estudantes que aprendem construindo projetos reais, em equipe.

Aqui você:

1. **Se apresenta** num formulário rápido (nome, avatar, período, áreas de interesse)
2. **Vota** na ideia e no estilo visual do nosso projeto em equipe
3. **Ganha seu "passaporte"**, um arquivo JSON com o seu perfil
4. **Faz seu primeiro Pull Request** colocando esse JSON no repositório, e seu card aparece no **Mural da galera** 🏆

> Nunca usou Git ou GitHub? Comece pelo [ComecePorAqui](https://github.com/unidunedev/ComecePorAqui). Lá tem o passo a passo para Windows e Mac.

## 🏆 Desafio do 1º PR

1. Faça um **fork** deste repositório
2. Crie o arquivo `membros/SEU-USUARIO-DO-GITHUB.json` com o JSON que o site gerou para você
3. Abra um **Pull Request**
4. Um check automático confere se o JSON está certo. Se ficar vermelho, clique em **Details** para ver o que ajustar
5. Quando alguém da liderança aprovar e fizer o merge, seu card aparece no mural em poucos minutos ✨

Veja o arquivo de exemplo em [`membros/_exemplo.json`](membros/_exemplo.json). Arquivos que começam com `_` não aparecem no mural.

## 🧰 Tecnologias

| Parte | Tecnologia | Para quê |
| --- | --- | --- |
| Interface | [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org) | Componentes e tipagem |
| Build | [Vite](https://vite.dev) | Servidor de desenvolvimento e build |
| Rotas | [TanStack Router](https://tanstack.com/router) | Páginas a partir dos arquivos em `src/routes/` |
| Estilo | [Tailwind CSS](https://tailwindcss.com) + CSS próprio | Visual "dev + café" |
| Animações | [Framer Motion](https://motion.dev) | Transições do formulário |
| Validação | [Zod](https://zod.dev) | Regras dos dados (formulário, mural e check do PR) |
| Banco | [Supabase](https://supabase.com) | Guarda as inscrições do formulário |
| Hospedagem | [Cloudflare Pages](https://pages.cloudflare.com) | Publica o site a cada merge na `main` |

## 🗺️ Como o projeto se organiza

```
onboarding/
├── membros/                  ← um JSON por pessoa (é aqui que entra o seu!)
├── public/                   ← arquivos servidos como estão (favicon, logos)
├── scripts/
│   └── validar-membros.mjs   ← o "fiscal" dos JSONs, roda em todo PR
├── src/
│   ├── routes/               ← cada arquivo é uma página
│   │   ├── __root.tsx        ← moldura de todas as páginas (cabeçalho e rodapé)
│   │   ├── index.tsx         ← /            formulário de onboarding
│   │   ├── mural.tsx         ← /mural       mural da galera
│   │   └── desafio-pr.tsx    ← /desafio-pr  tutorial do primeiro PR
│   ├── components/           ← pedaços de interface reutilizáveis
│   ├── lib/
│   │   ├── community.ts      ← regras dos dados (áreas, períodos, validação)
│   │   └── supabase.ts       ← conexão com o banco
│   ├── config.ts             ← links do projeto
│   └── styles.css            ← todo o visual
└── supabase/migrations/      ← SQL que cria a tabela no banco
```

### Como as partes conversam

```
Você preenche o formulário
        │
        ├──► Supabase (tabela inscricoes)     só INSERT: ninguém lê os dados pelo site
        │
        └──► o site gera seu JSON
                  │
                  ▼
        Você abre um PR com membros/voce.json
                  │
                  ├──► GitHub Actions valida o JSON (✅ ou ❌)
                  │
                  ▼
        Merge na main ──► Cloudflare Pages faz o build ──► seu card aparece no /mural
```

O mural **não lê o banco**: ele lê os arquivos da pasta `membros/` no momento do build. Assim só aparece o que foi revisado e aprovado num PR.

## 💻 Rodando na sua máquina

Pré-requisitos: [Node.js 22+](https://nodejs.org) e [Git](https://git-scm.com).

```bash
git clone https://github.com/unidunedev/onboarding.git
cd onboarding
npm install
cp .env.example .env      # no Windows (PowerShell): copy .env.example .env
npm run dev
```

Abra o endereço que aparecer no terminal (geralmente http://localhost:5173).

> O formulário só salva se o `.env` tiver os dados do Supabase. Para mexer só no visual, pode deixar os valores de exemplo.

### Comandos úteis

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Sobe o site localmente com recarregamento automático |
| `npm test` | Roda os testes |
| `npm run lint` | Procura problemas no código |
| `npm run format` | Formata o código com Prettier |
| `npm run validar-membros` | Confere os JSONs da pasta `membros/` |
| `npm run build` | Gera a versão de produção em `dist/` |

## 🤖 Sobre o uso de IA neste projeto

Sim, usamos IA para acelerar a criação desta base, e não temos vergonha disso.
Mas cada parte foi revisada, entendida e ajustada por pessoas.

É exatamente isso que queremos ensinar aqui: a IA é uma ferramenta para ir mais rápido, não um substituto para o seu aprendizado. Use-a para tirar dúvidas, entender erros e explorar ideias, mas escreva, quebre e conserte o código você mesmo.

---

<p align="center">Feito com café, código e vontade de aprender 💜</p>
