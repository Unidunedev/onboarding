import { Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Github, Laptop, Target } from "lucide-react";
import { useEffect } from "react";
import { Ambiente, Bebida } from "../components/bebida";
import {
  ESTUDOS_REPO_URL,
  GRUPOS,
  desafiosUrl,
  duracao,
  minutosDaTrilha,
  type Trilha,
} from "../catalogo";
import { idDaAula, useConcluidas } from "../progresso";

export function Migalhas({ trilha, aula }: { trilha: Trilha; aula?: string }) {
  const grupo = GRUPOS.find((g) => g.id === trilha.grupo);
  return (
    <p className="migalhas">
      <Link to="/">estudos</Link>
      <span>/</span>
      {grupo && grupo.id !== trilha.id && (
        <>
          <span>{grupo.pasta.replace("/", "")}</span>
          <span>/</span>
        </>
      )}
      {aula ? (
        <>
          <Link to="/$trilha" params={{ trilha: trilha.id }}>
            {trilha.pasta.split("/").pop()}
          </Link>
          <span>/</span>
          <span className="migalhas-atual">{aula}</span>
        </>
      ) : (
        <span className="migalhas-atual">{trilha.pasta.split("/").pop()}</span>
      )}
    </p>
  );
}

export function PaginaTrilha({ trilha }: { trilha: Trilha | undefined }) {
  const concluidas = useConcluidas();
  useEffect(() => {
    if (trilha) document.title = `${trilha.nome} · Estudos Unidunedev`;
  }, [trilha]);
  if (!trilha) throw notFound();

  const proxima =
    trilha.aulas.find((a) => !concluidas.includes(idDaAula(trilha.id, a.slug))) ?? trilha.aulas[0]!;
  const comecou = trilha.aulas.some((a) => concluidas.includes(idDaAula(trilha.id, a.slug)));

  return (
    <main data-trilha={trilha.id}>
      <section className="trilha-hero">
        <Ambiente trilha={trilha.id} />
        <div className="trilha-hero-texto">
          <Migalhas trilha={trilha} />
          <p className="kicker">
            {trilha.emoji} {trilha.bebida.toUpperCase()}
          </p>
          <h1>{trilha.nome}</h1>
          <p className="trilha-frase">{trilha.frase}</p>
          <p className="trilha-sobre">{trilha.sobre}</p>
          <div className="home-hero-botoes">
            <Link
              to="/$trilha/$aula"
              params={{ trilha: trilha.id, aula: proxima.slug }}
              className="botao botao-trilha"
            >
              {comecou ? "Continuar" : "Começar a primeira aula"} <ArrowRight size={16} />
            </Link>
            <span className="trilha-meta">
              {trilha.aulas.length} aulas · {duracao(minutosDaTrilha(trilha))}
            </span>
          </div>
        </div>
        <div className="trilha-hero-bebida">
          <Bebida trilha={trilha.id} tamanho={220} />
        </div>
      </section>

      <section className="trilha-corpo">
        <div className="comanda">
          <p className="comanda-topo">
            <span>COMANDA</span>
            <span>
              #{trilha.id.toUpperCase()} · {trilha.aulas.length} itens
            </span>
          </p>
          <ol>
            {trilha.aulas.map((a, i) => {
              const feita = concluidas.includes(idDaAula(trilha.id, a.slug));
              return (
                <li key={a.slug}>
                  <Link
                    to="/$trilha/$aula"
                    params={{ trilha: trilha.id, aula: a.slug }}
                    className={feita ? "feita" : ""}
                  >
                    <span className="comanda-num">
                      {feita ? <Check size={14} /> : String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="comanda-texto">
                      <b>{a.titulo}</b>
                      <small>{a.resumo}</small>
                    </span>
                    <span className="comanda-min">{a.minutos} min</span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>

        <aside className="trilha-lado">
          <div className="lado-cartao">
            <h2>O que você vai aprender</h2>
            <ul className="lista-check">
              {trilha.aprender.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          {trilha.linguagem && (
            <div className="lado-cartao">
              <h2>
                <Laptop size={18} /> Rodar no seu PC
              </h2>
              <p>Quer instalar e rodar sem internet? Tem o passo a passo no repositório:</p>
              <p className="lado-links">
                <a
                  href={`${ESTUDOS_REPO_URL}/blob/main/${trilha.pasta}/instalacao/windows.md`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Windows
                </a>
                <a
                  href={`${ESTUDOS_REPO_URL}/blob/main/${trilha.pasta}/instalacao/mac.md`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Mac
                </a>
              </p>
            </div>
          )}
          <div className="lado-cartao">
            <h2>
              {trilha.grupo === "fundamentos" ? <Github size={18} /> : <Target size={18} />}{" "}
              {trilha.grupo === "fundamentos" ? "Versão completa" : "Hora de praticar"}
            </h2>
            <p>
              {trilha.grupo === "fundamentos"
                ? "O material completo, com checkpoints e desafios sem IA, está no GitHub."
                : "Depois das aulas, resolva os desafios no GitHub. A correção é automática no seu Pull Request."}
            </p>
            <a
              className="botao botao-contorno"
              href={
                trilha.grupo === "fundamentos"
                  ? `${ESTUDOS_REPO_URL}/tree/main/${trilha.pasta}`
                  : desafiosUrl(trilha)
              }
              target="_blank"
              rel="noreferrer"
            >
              <Github size={16} />{" "}
              {trilha.grupo === "fundamentos" ? "Abrir no GitHub" : "Ver desafios"}
            </a>
          </div>
        </aside>
      </section>
    </main>
  );
}
