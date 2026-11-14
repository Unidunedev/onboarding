import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Globe, Terminal, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock, FileNameWarning, GitWelcome } from "@/components/community-ui";
import { pageHead } from "@/lib/community";
import { REPO_URL } from "@/config";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
const searchSchema = z.object({
  nivel: z.preprocess(
    (value) => (value === undefined ? "1" : String(value)),
    z.enum(["1", "2", "3"]).catch("1"),
  ),
});
export const Route = createFileRoute("/desafio-pr")({
  validateSearch: zodValidator(searchSchema),
  head: () =>
    pageHead(
      "Desafio do primeiro PR",
      "Um guia acolhedor para criar seu primeiro pull request pelo navegador ou terminal e revisar o PR de um colega.",
    ),
  component: Tutorial,
});
const browserSteps = [
  {
    title: "Faça uma cópia só sua",
    text: "Abra o repositório e clique em Fork, no canto superior direito. Escolha sua conta e confirme em Create fork. Agora você tem sua própria cópia do projeto.",
  },
  {
    title: "Crie seu passaporte no mural",
    text: "No seu fork, clique em Add file → Create new file. Digite membros/SEU-USERNAME.json como nome do arquivo. Cole o JSON que você recebeu ao terminar a inscrição. Use seu username real, sem @.",
  },
  {
    title: "Guarde sua primeira mudança",
    text: "Clique em Commit changes. Escreva uma mensagem como “feat: adiciona meu perfil ao mural” e confirme. Commit é um registro da sua mudança — sua primeira conquista!",
  },
  {
    title: "Envie um convite para sua mudança",
    text: "Clique em Contribute → Open pull request. Confira que o destino é o repositório original, branch main. Conte quem você é na descrição e clique em Create pull request.",
  },
  {
    title: "Converse com a galera",
    text: "Acompanhe os comentários do seu PR. Se alguém sugerir um ajuste, edite o arquivo no seu fork e faça outro commit. O PR se atualiza sozinho. Quando for aprovado e integrado, seu card entra no mural!",
  },
];
const terminalSteps = [
  {
    title: "Faça um fork e clone o seu repositório",
    text: "Clique em Fork no GitHub. No seu fork, copie o endereço pelo botão Code. Substitua a URL abaixo pela URL do SEU fork.",
    code: "git clone https://github.com/SEU-USERNAME/comece-por-aqui.git\ncd comece-por-aqui",
  },
  {
    title: "Crie uma branch para sua mudança",
    text: "Uma branch é um espaço separado para trabalhar sem mexer direto na main.",
    code: "git switch -c feat/meu-perfil",
  },
  {
    title: "Adicione seu passaporte",
    text: "Abra o projeto no editor. Dentro da pasta membros, crie SEU-USERNAME.json e cole o JSON gerado na inscrição. Salve o arquivo e confira as mudanças.",
    code: "git status\ngit diff",
  },
  {
    title: "Faça o commit e envie sua branch",
    text: "Troque SEU-USERNAME pelo seu username. Envie a branch para seu fork.",
    code: 'git add membros/SEU-USERNAME.json\ngit commit -m "feat: adiciona meu perfil ao mural"\ngit push -u origin feat/meu-perfil',
  },
  {
    title: "Abra seu primeiro Pull Request",
    text: "No GitHub do seu fork, clique em Compare & pull request. Destino: repositório original, branch main. Descreva sua contribuição e clique em Create pull request. Acompanhe as revisões: você já faz parte da jornada!",
  },
];
const guardianSteps = [
  {
    title: "Encontre o PR de um colega",
    text: "Abra a aba Pull requests no repositório original. Escolha um PR de perfil ainda aberto. Não revise seu próprio PR — esse nível é sobre ajudar outra pessoa.",
  },
  {
    title: "Confira o passaporte",
    text: "Na aba Files changed, verifique se só o arquivo membros/username.json foi adicionado, se o nome bate com o GitHub e se os campos github, nome, avatar, periodo, areas, frase e entrouEm estão presentes. Veja se o JSON é válido e não contém informação privada.",
  },
  {
    title: "Faça uma revisão acolhedora",
    text: "Use comentários para sugerir melhorias e explicar o porquê. Clique em Review changes, escolha Comment e envie sua revisão. Se houver algo a corrigir, aponte com gentileza. (Você até consegue marcar Approve, mas é a aprovação da liderança que libera o merge.)",
  },
  {
    title: "A aprovação final é da liderança",
    text: "Quem aprova e integra o PR é a liderança da Unidunedev. Sua revisão ajuda o colega a corrigir antes e deixa a aprovação muito mais rápida. É assim que funciona nas empresas: todo mundo revisa, e quem tem permissão faz o merge.",
  },
];
function Tutorial() {
  const { nivel } = Route.useSearch();
  const navigate = Route.useNavigate();
  const list = nivel === "2" ? terminalSteps : nivel === "3" ? guardianSteps : browserSteps;
  return (
    <main className="content-page">
      <p className="section-kicker">UMA JORNADA. SEU PRIMEIRO PULL REQUEST.</p>
      <h1 className="page-title">Pequeno PR, grande começo.</h1>
      <p className="section-subtitle">
        Seu card no mural começa aqui. Sem pressa: um passo, um commit, um café.
      </p>
      <FileNameWarning />
      <div className="tutorial-tabs" role="tablist" aria-label="Caminho do desafio">
        {[
          { id: "1", label: "Pelo navegador (Nível 1)", icon: Globe },
          { id: "2", label: "Pelo terminal (Nível 2)", icon: Terminal },
          { id: "3", label: "Revisar um PR (Nível 3)", icon: ShieldCheck },
        ].map((tab) => (
          <Button
            role="tab"
            key={tab.id}
            aria-selected={nivel === tab.id}
            variant={nivel === tab.id ? "default" : "outline"}
            onClick={() => {
              if (tab.id === "1" || tab.id === "2" || tab.id === "3")
                navigate({ search: { nivel: tab.id } });
            }}
          >
            <tab.icon />
            {tab.label}
          </Button>
        ))}
      </div>
      <section
        role="tabpanel"
        aria-label={
          nivel === "1" ? "Pelo navegador" : nivel === "2" ? "Pelo terminal" : "Revisar um PR"
        }
      >
        {list.map((s, i) => (
          <article className="tutorial-step" key={s.title}>
            <span className="tutorial-number">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            {"code" in s && typeof s.code === "string" && <CodeBlock text={s.code} />}
          </article>
        ))}
      </section>
      <section className="final-section">
        <h2 className="section-heading">Deu um bug no caminho?</h2>
        <p className="section-subtitle">
          <strong>Permission denied?</strong> Confira se está enviando para o seu fork, não para o
          original. No terminal, use a autenticação do GitHub ou uma chave SSH — a senha da conta
          não funciona no Git.
        </p>
        <p className="section-subtitle">
          <strong>JSON inválido?</strong> Confira vírgulas, aspas duplas e colchetes. Não deixe uma
          vírgula depois do último campo.
        </p>
        <p className="section-subtitle">
          <strong>Seu card não apareceu?</strong> Ele aparece depois do merge e da nova publicação,
          não apenas depois de abrir ou aprovar o PR.
        </p>
        <div className="mt-6">
          <Button asChild className="coffee-cta">
            <a href={REPO_URL} target="_blank" rel="noreferrer">
              Abrir o repositório <ArrowUpRight />
            </a>
          </Button>
        </div>
        <GitWelcome />
      </section>
    </main>
  );
}
