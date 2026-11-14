import { Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Github, ListOrdered } from "lucide-react";
import { Suspense, lazy, useEffect, type ComponentType } from "react";
import { Bebida } from "../components/bebida";
import { componentesMdx } from "../components/mdx";
import {
  ESTUDOS_REPO_URL,
  buscarAula,
  carregarAula,
  desafiosUrl,
  type Aula,
  type Trilha,
} from "../catalogo";
import { alternarConcluida, idDaAula, useConcluidas } from "../progresso";
import { Migalhas } from "./trilha";

// Um componente "lazy" por aula, criado uma vez só (o React exige que seja estável).
const cache = new Map<string, ComponentType<{ components?: object }>>();
function conteudoDa(trilha: Trilha, aula: Aula) {
  const chave = idDaAula(trilha.id, aula.slug);
  let C = cache.get(chave);
  const carregar = carregarAula(trilha, aula);
  if (!C && carregar) {
    C = lazy(carregar);
    cache.set(chave, C);
  }
  return C;
}

function ListaDeAulas({ trilha, atual }: { trilha: Trilha; atual: string }) {
  const concluidas = useConcluidas();
  return (
    <ol className="aula-lista">
      {trilha.aulas.map((a, i) => {
        const feita = concluidas.includes(idDaAula(trilha.id, a.slug));
        return (
          <li key={a.slug}>
            <Link
              to="/$trilha/$aula"
              params={{ trilha: trilha.id, aula: a.slug }}
              className={`${a.slug === atual ? "atual" : ""} ${feita ? "feita" : ""}`}
            >
              <span className="aula-lista-num">
                {feita ? <Check size={12} /> : String(i + 1).padStart(2, "0")}
              </span>
              {a.titulo}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

export function PaginaAula({ trilha, slug }: { trilha: Trilha | undefined; slug: string }) {
  const concluidas = useConcluidas();
  const achado = trilha ? buscarAula(trilha, slug) : undefined;
  useEffect(() => {
    if (trilha && achado) document.title = `${achado.aula.titulo} · ${trilha.nome} · Estudos`;
  }, [trilha, achado]);
  if (!trilha || !achado) throw notFound();

  const { aula, indice, anterior, proxima } = achado;
  const id = idDaAula(trilha.id, aula.slug);
  const feita = concluidas.includes(id);
  const Conteudo = conteudoDa(trilha, aula);
  const ultima = !proxima;

  return (
    <main className="aula-layout" data-trilha={trilha.id}>
      <aside className="aula-lado">
        <Link to="/$trilha" params={{ trilha: trilha.id }} className="aula-lado-trilha">
          <Bebida trilha={trilha.id} tamanho={48} />
          <span>
            <small>{trilha.bebida}</small>
            <b>{trilha.nome}</b>
          </span>
        </Link>
        <ListaDeAulas trilha={trilha} atual={aula.slug} />
      </aside>

      <article className="aula">
        <header className="aula-topo">
          <Migalhas trilha={trilha} aula={aula.slug} />
          <p className="aula-meta">
            Aula {indice + 1} de {trilha.aulas.length} · ⏱️ {aula.minutos} min
          </p>
          <h1>{aula.titulo}</h1>
          <p className="aula-resumo">{aula.resumo}</p>
          <div className="aula-pontos" aria-hidden="true">
            {trilha.aulas.map((a, i) => (
              <i
                key={a.slug}
                className={`${i === indice ? "atual" : ""} ${concluidas.includes(idDaAula(trilha.id, a.slug)) ? "feita" : ""}`}
              />
            ))}
          </div>
          <details className="aula-lista-movel">
            <summary>
              <ListOrdered size={16} /> Aulas desta trilha
            </summary>
            <ListaDeAulas trilha={trilha} atual={aula.slug} />
          </details>
        </header>

        <div className="prosa">
          {Conteudo ? (
            <Suspense fallback={<p className="carregando">☕ Passando o café...</p>}>
              <Conteudo components={componentesMdx} />
            </Suspense>
          ) : (
            <p>Esta aula ainda está sendo escrita. Que tal ajudar com um PR? 😉</p>
          )}
        </div>

        <footer className="aula-fim">
          <button
            type="button"
            className={`botao ${feita ? "botao-feito" : "botao-trilha"}`}
            onClick={() => alternarConcluida(id)}
            aria-pressed={feita}
          >
            <Check size={16} /> {feita ? "Aula concluída" : "Marcar como concluída"}
          </button>

          {ultima && (
            <div className="aula-praticar">
              <p className="kicker">🎯 FIM DA TRILHA</p>
              <h2>Agora é com você!</h2>
              <p>
                {trilha.grupo === "fundamentos"
                  ? "Quer se aprofundar? O material completo, com checkpoints e desafios sem IA, está no GitHub."
                  : "Os desafios do GitHub têm correção automática: você resolve, abre um Pull Request e o robô confere se a saída está certa."}
              </p>
              <a
                className="botao botao-trilha"
                href={
                  trilha.grupo === "fundamentos"
                    ? `${ESTUDOS_REPO_URL}/tree/main/${trilha.pasta}`
                    : desafiosUrl(trilha)
                }
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} />{" "}
                {trilha.grupo === "fundamentos" ? "Abrir no GitHub" : "Ir para os desafios"}
              </a>
            </div>
          )}

          <nav className="aula-navegacao">
            {anterior ? (
              <Link
                to="/$trilha/$aula"
                params={{ trilha: trilha.id, aula: anterior.slug }}
                className="aula-nav anterior"
              >
                <small>
                  <ArrowLeft size={13} /> Anterior
                </small>
                <b>{anterior.titulo}</b>
              </Link>
            ) : (
              <span />
            )}
            {proxima ? (
              <Link
                to="/$trilha/$aula"
                params={{ trilha: trilha.id, aula: proxima.slug }}
                className="aula-nav proxima"
              >
                <small>
                  Próxima <ArrowRight size={13} />
                </small>
                <b>{proxima.titulo}</b>
              </Link>
            ) : (
              <Link to="/" className="aula-nav proxima">
                <small>
                  Cardápio <ArrowRight size={13} />
                </small>
                <b>Escolher outra trilha</b>
              </Link>
            )}
          </nav>
        </footer>
      </article>
    </main>
  );
}
