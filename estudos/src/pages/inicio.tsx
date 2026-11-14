import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Bebida } from "../components/bebida";
import { CenaLofi } from "../components/lofi";
import { GRUPOS, TRILHAS, duracao, minutosDaTrilha, type Trilha } from "../catalogo";
import { idDaAula, useConcluidas } from "../progresso";

function CartaoTrilha({ trilha, concluidas }: { trilha: Trilha; concluidas: string[] }) {
  const feitas = trilha.aulas.filter((a) => concluidas.includes(idDaAula(trilha.id, a.slug)));
  const pct = Math.round((feitas.length / trilha.aulas.length) * 100);
  return (
    <Link
      to="/$trilha"
      params={{ trilha: trilha.id }}
      className="cartao-trilha"
      data-trilha={trilha.id}
    >
      <span className="cartao-bebida">
        <Bebida trilha={trilha.id} tamanho={92} />
      </span>
      <span className="cartao-texto">
        <span className="cartao-kicker">{trilha.bebida}</span>
        <span className="cartao-nome">{trilha.nome}</span>
        <span className="cartao-frase">{trilha.frase}</span>
        <span className="cartao-meta">
          {trilha.aulas.length} aulas · {duracao(minutosDaTrilha(trilha))}
          {feitas.length > 0 && ` · ${feitas.length} feita${feitas.length > 1 ? "s" : ""}`}
        </span>
        <span className="cartao-progresso" aria-hidden="true">
          <i style={{ width: `${pct}%` }} />
        </span>
      </span>
      <ArrowRight className="cartao-seta" size={18} />
    </Link>
  );
}

function GrupoDoCardapio({
  grupo,
  concluidas,
}: {
  grupo: (typeof GRUPOS)[number];
  concluidas: string[];
}) {
  return (
    <div className="cardapio-grupo">
      <p className="cardapio-pasta">
        <span aria-hidden="true">📁</span> {grupo.pasta}
        <small>{grupo.texto}</small>
      </p>
      <div className="cardapio-grade">
        {TRILHAS.filter((t) => t.grupo === grupo.id).map((t) => (
          <CartaoTrilha key={t.id} trilha={t} concluidas={concluidas} />
        ))}
      </div>
    </div>
  );
}

export function Inicio() {
  const concluidas = useConcluidas();
  useEffect(() => {
    document.title = "Estudos · Unidunedev";
  }, []);

  return (
    <main>
      <section className="home-hero">
        <CenaLofi />
        <div className="home-hero-texto">
          <p className="kicker">☕ CAFÉ DE ESTUDOS DA UNIDUNEDEV</p>
          <h1>
            Aprenda do zero, com calma e <em>pegando na mão</em>.
          </h1>
          <p>
            Escolha uma bebida do cardápio. Cada trilha é uma introdução com exemplos para copiar e
            testar. Quando quiser praticar de verdade, os desafios esperam por você no GitHub.
          </p>
          <div className="home-hero-botoes">
            <Link to="/$trilha" params={{ trilha: "fundamentos" }} className="botao botao-claro">
              Começar pelos fundamentos <ArrowRight size={16} />
            </Link>
            <a href="#cardapio" className="botao botao-fantasma">
              Ver o cardápio <ArrowDown size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="cardapio" id="cardapio">
        <div className="secao-topo">
          <p className="kicker">CARDÁPIO</p>
          <h2>O que vai ser hoje?</h2>
          <p>Organizado igualzinho às pastas do repositório estudos no GitHub.</p>
        </div>
        <div className="cardapio-base">
          {GRUPOS.filter((g) => g.id !== "linguagens").map((g) => (
            <GrupoDoCardapio key={g.id} grupo={g} concluidas={concluidas} />
          ))}
        </div>
        <GrupoDoCardapio grupo={GRUPOS[2]!} concluidas={concluidas} />
      </section>

      <section className="como-estudar">
        <div className="secao-topo">
          <p className="kicker">COMO ESTUDAR AQUI</p>
          <h2>Três passos, sem pressa</h2>
        </div>
        <ol className="como-passos">
          <li>
            <span>📖</span>
            <b>Leia com calma</b>
            <p>Aulas curtas, uma ideia por vez. Pode voltar quantas vezes quiser.</p>
          </li>
          <li>
            <span>▶️</span>
            <b>Copie e teste</b>
            <p>
              O botão <em>Testar</em> copia o código e abre o OnlineGDB. É só colar e rodar. Mude o
              código, quebre, conserte: é assim que se aprende.
            </p>
          </li>
          <li>
            <span>🎯</span>
            <b>Pratique no GitHub</b>
            <p>
              No fim de cada trilha tem desafios com correção automática no Pull Request. Git e
              código ao mesmo tempo!
            </p>
          </li>
        </ol>
        <div className="onde-testar">
          <p className="onde-testar-titulo">Onde rodar o código</p>
          <ul>
            <li>
              <a href="https://www.onlinegdb.com" target="_blank" rel="noreferrer">
                OnlineGDB
              </a>{" "}
              é o padrão do site: roda C, Python e Java, aceita entrada do teclado e não pede conta.
            </li>
            <li>
              <a
                href="https://www.programiz.com/c-programming/online-compiler/"
                target="_blank"
                rel="noreferrer"
              >
                Programiz
              </a>{" "}
              é mais simples e vai bem no celular.
            </li>
            <li>
              <b>No seu PC:</b> VS Code com a linguagem instalada. Cada trilha tem o passo a passo
              para Windows e Mac.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
