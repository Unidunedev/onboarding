import {
  Children,
  isValidElement,
  useState,
  useSyncExternalStore,
  type ReactElement,
  type ReactNode,
} from "react";

/* ---------- Notas: dica, cuidado, curiosidade, analogia ---------- */

const NOTAS = {
  dica: { icone: "💡", titulo: "Dica" },
  cuidado: { icone: "⚠️", titulo: "Cuidado" },
  curiosidade: { icone: "🤓", titulo: "Curiosidade" },
  analogia: { icone: "☕", titulo: "Pensa assim" },
  ia: { icone: "🤖", titulo: "E a IA?" },
} as const;

export function Nota({
  tipo = "dica",
  titulo,
  children,
}: {
  tipo?: keyof typeof NOTAS;
  titulo?: string;
  children: ReactNode;
}) {
  const n = NOTAS[tipo];
  return (
    <aside className={`nota nota-${tipo}`}>
      <p className="nota-titulo">
        <span aria-hidden="true">{n.icone}</span> {titulo ?? n.titulo}
      </p>
      <div className="nota-corpo">{children}</div>
    </aside>
  );
}

/* ---------- Faça você mesmo ---------- */

export function Tarefa({ titulo, children }: { titulo: string; children: ReactNode }) {
  const [feito, setFeito] = useState(false);
  return (
    <section className={`tarefa ${feito ? "tarefa-feita" : ""}`}>
      <p className="tarefa-selo">✍️ Faça você mesmo</p>
      <h3 className="tarefa-titulo">{titulo}</h3>
      <div className="tarefa-corpo">{children}</div>
      <button type="button" className="tarefa-botao" onClick={() => setFeito((f) => !f)}>
        {feito ? "🎉 Mandou bem! (desfazer)" : "Consegui!"}
      </button>
    </section>
  );
}

export function Dica({ children }: { children: ReactNode }) {
  return (
    <details className="revelar">
      <summary>💡 Ver dica</summary>
      <div>{children}</div>
    </details>
  );
}

export function Resposta({ children }: { children: ReactNode }) {
  return (
    <details className="revelar revelar-resposta">
      <summary>👀 Ver uma resposta</summary>
      <div>{children}</div>
    </details>
  );
}

/* ---------- Teste rápido ---------- */

export function Quiz({
  pergunta,
  opcoes,
  correta,
  explicacao,
}: {
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
}) {
  const [escolha, setEscolha] = useState<number | null>(null);
  const acertou = escolha === correta;
  return (
    <section className="quiz">
      <p className="quiz-selo">🧪 Teste rápido</p>
      <p className="quiz-pergunta">{pergunta}</p>
      <div className="quiz-opcoes">
        {opcoes.map((op, i) => {
          const estado =
            escolha === null ? "" : i === correta ? "certa" : i === escolha ? "errada" : "apagada";
          return (
            <button
              type="button"
              key={op}
              className={`quiz-opcao ${estado}`}
              onClick={() => setEscolha(i)}
              aria-pressed={escolha === i}
            >
              <span className="quiz-letra">{String.fromCharCode(65 + i)}</span>
              <code>{op}</code>
            </button>
          );
        })}
      </div>
      {escolha !== null && (
        <p className={`quiz-feedback ${acertou ? "ok" : "nao"}`} role="status">
          <b>{acertou ? "Isso aí! " : "Quase! "}</b>
          {explicacao}
        </p>
      )}
    </section>
  );
}

/* ---------- Memória: caixinhas com endereço ---------- */

type Celula = {
  nome?: string;
  tipo?: string;
  valor: string;
  endereco?: string;
  /** Nome da variável para onde esta aponta (ponteiros) */
  aponta?: string;
  destaque?: boolean;
};

export function Memoria({ celulas, legenda }: { celulas: Celula[]; legenda?: string }) {
  return (
    <figure className="memoria">
      <div className="memoria-trilho">
        {celulas.map((c, i) => (
          <div
            key={i}
            className={`memoria-celula ${c.destaque ? "destaque" : ""} ${c.aponta ? "ponteiro" : ""}`}
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            {c.endereco && <span className="memoria-end">{c.endereco}</span>}
            <span className="memoria-caixa">
              {c.tipo && <span className="memoria-tipo">{c.tipo}</span>}
              <span className="memoria-valor">{c.valor}</span>
            </span>
            {c.nome && <span className="memoria-nome">{c.nome}</span>}
            {c.aponta && <span className="memoria-seta">aponta para {c.aponta} ➜</span>}
          </div>
        ))}
      </div>
      {legenda && <figcaption>{legenda}</figcaption>}
    </figure>
  );
}

/* ---------- Passos: um fluxo da esquerda para a direita ---------- */

export function Passos({ itens }: { itens: { icone: string; titulo: string; texto?: string }[] }) {
  return (
    <ol className="passos" style={{ ["--qtd" as string]: itens.length }}>
      {itens.map((p, i) => (
        <li key={p.titulo} style={{ ["--i" as string]: i }}>
          <span className="passos-icone" aria-hidden="true">
            {p.icone}
          </span>
          <b>{p.titulo}</b>
          {p.texto && <span>{p.texto}</span>}
        </li>
      ))}
    </ol>
  );
}

/* ---------- Abas: o mesmo exemplo em várias linguagens ---------- */

// A aba escolhida vale para a página toda (e fica lembrada no navegador).
const CHAVE_ABA = "unidunedev:estudos:aba";
const ouvintes = new Set<() => void>();
let abaAtual: string | null = null;

function lerAba() {
  if (abaAtual === null) {
    try {
      abaAtual = localStorage.getItem(CHAVE_ABA) ?? "";
    } catch {
      abaAtual = "";
    }
  }
  return abaAtual;
}

function escolherAba(rotulo: string) {
  abaAtual = rotulo;
  try {
    localStorage.setItem(CHAVE_ABA, rotulo);
  } catch {
    // sem armazenamento: vale só nesta visita
  }
  ouvintes.forEach((f) => f());
}

export function Aba({ children }: { rotulo: string; children: ReactNode }) {
  return <>{children}</>;
}

export function Abas({ children }: { children: ReactNode }) {
  const preferida = useSyncExternalStore(
    (f) => {
      ouvintes.add(f);
      return () => ouvintes.delete(f);
    },
    lerAba,
    () => "",
  );
  const abas = Children.toArray(children).filter(
    (c): c is ReactElement<{ rotulo: string; children: ReactNode }> =>
      isValidElement(c) && typeof (c.props as { rotulo?: unknown }).rotulo === "string",
  );
  const ativa = abas.find((a) => a.props.rotulo === preferida) ?? abas[0];
  if (!ativa) return null;
  return (
    <div className="abas">
      <div className="abas-lista" role="tablist">
        {abas.map((a) => (
          <button
            key={a.props.rotulo}
            type="button"
            role="tab"
            aria-selected={a === ativa}
            className={a === ativa ? "ativa" : ""}
            onClick={() => escolherAba(a.props.rotulo)}
          >
            {a.props.rotulo}
          </button>
        ))}
      </div>
      <div className="abas-painel" role="tabpanel">
        {ativa.props.children}
      </div>
    </div>
  );
}
