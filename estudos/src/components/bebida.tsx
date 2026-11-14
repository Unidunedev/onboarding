import type { TrilhaId } from "../catalogo";

/** Vapor subindo: três (ou dois) fiozinhos animados. */
function Vapor({ xs, y, cor }: { xs: number[]; y: number; cor: string }) {
  return (
    <>
      {xs.map((x, i) => (
        <path
          key={x}
          className={`beb-vapor beb-v${i + 1}`}
          d={`M${x} ${y}c-6-5 6-9 0-15`}
          fill="none"
          stroke={cor}
          strokeWidth="5"
          strokeLinecap="round"
        />
      ))}
    </>
  );
}

function Rotulo({ x, y, texto, cor }: { x: number; y: number; texto: string; cor: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontFamily="JetBrains Mono, monospace"
      fontWeight="700"
      fontSize="15"
      fill={cor}
    >
      {texto}
    </text>
  );
}

/** Uma bebida para cada trilha: o "cardápio" do site. */
export function Bebida({ trilha, tamanho = 120 }: { trilha: TrilhaId; tamanho?: number }) {
  return (
    <svg
      className={`bebida bebida-${trilha}`}
      width={tamanho}
      height={tamanho}
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      {trilha === "fundamentos" && (
        <g className="beb-xicara">
          <Vapor xs={[44, 57, 70]} y={42} cor="#e8b47a" />
          <path d="M88 60h5a12 12 0 0 1 0 24h-5" fill="none" stroke="#c8803e" strokeWidth="7" />
          <path d="M22 52h66v30a22 22 0 0 1-22 22H44a22 22 0 0 1-22-22z" fill="#c8803e" />
          <path d="M22 52h66v6H22z" fill="#a9622a" />
          <Rotulo x={55} y={84} texto="01" cor="#fff4e4" />
        </g>
      )}

      {trilha === "logica" && (
        <g className="beb-xicara">
          <Vapor xs={[46, 60, 74]} y={40} cor="#f2c1cb" />
          <path d="M88 60h5a12 12 0 0 1 0 24h-5" fill="none" stroke="#f3e6d3" strokeWidth="7" />
          <path d="M22 52h66v30a22 22 0 0 1-22 22H44a22 22 0 0 1-22-22z" fill="#f3e6d3" />
          <ellipse cx="55" cy="53" rx="33" ry="5" fill="#6b3a2a" />
          <rect className="beb-marsh" x="36" y="44" width="11" height="9" rx="3" fill="#fff" />
          <rect
            className="beb-marsh beb-m2"
            x="52"
            y="42"
            width="11"
            height="9"
            rx="3"
            fill="#f6b8c6"
          />
          <rect
            className="beb-marsh beb-m3"
            x="66"
            y="45"
            width="10"
            height="8"
            rx="3"
            fill="#fff"
          />
          <Rotulo x={55} y={85} texto="if" cor="#6b3a2a" />
        </g>
      )}

      {trilha === "c" && (
        <g className="beb-xicara">
          <Vapor xs={[52, 66]} y={54} cor="#9cc3ea" />
          <ellipse cx="60" cy="100" rx="38" ry="6" fill="#3d2a20" />
          <path d="M80 70h4a9 9 0 0 1 0 18h-4" fill="none" stroke="#f3e6d3" strokeWidth="6" />
          <path d="M34 64h50v14a19 19 0 0 1-19 19H53a19 19 0 0 1-19-19z" fill="#f3e6d3" />
          <ellipse cx="59" cy="65" rx="25" ry="4" fill="#4a2a18" />
          <ellipse cx="59" cy="65" rx="17" ry="2.4" fill="#b8763f" opacity=".8" />
          <Rotulo x={59} y={88} texto="C" cor="#2e5f9a" />
        </g>
      )}

      {trilha === "python" && (
        <g>
          <line
            x1="70"
            y1="16"
            x2="62"
            y2="80"
            stroke="#3776ab"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path d="M36 34h48l-5 66a6 6 0 0 1-6 6H47a6 6 0 0 1-6-6z" fill="#ffffff22" />
          <path d="M38 50h44l-3.8 50a6 6 0 0 1-6 6H47.8a6 6 0 0 1-6-6z" fill="#f7cf45" />
          <circle className="beb-bolha" cx="50" cy="96" r="2.2" fill="#fff8" />
          <circle className="beb-bolha beb-b2" cx="66" cy="98" r="1.8" fill="#fff8" />
          <circle className="beb-bolha beb-b3" cx="58" cy="94" r="1.5" fill="#fff8" />
          <rect className="beb-gelo" x="44" y="54" width="14" height="13" rx="3" fill="#e9f4ff" />
          <rect
            className="beb-gelo beb-g2"
            x="60"
            y="58"
            width="13"
            height="12"
            rx="3"
            fill="#d7ebff"
          />
          <circle cx="82" cy="36" r="11" fill="#ffe066" stroke="#f0b72f" strokeWidth="3" />
          <path d="M82 27v18M73 36h18" stroke="#f0b72f" strokeWidth="1.5" />
          <path
            d="M36 34h48l-5 66a6 6 0 0 1-6 6H47a6 6 0 0 1-6-6z"
            fill="none"
            stroke="#cfe3f5"
            strokeWidth="3"
          />
          <Rotulo x={60} y={92} texto="py" cor="#2b5b84" />
        </g>
      )}

      {trilha === "java" && (
        <g className="beb-xicara">
          <Vapor xs={[46, 60, 74]} y={46} cor="#f0a35e" />
          <ellipse cx="60" cy="100" rx="44" ry="6" fill="#5382a1" />
          <path d="M94 64h4a11 11 0 0 1 0 22h-4" fill="none" stroke="#e76f00" strokeWidth="7" />
          <path d="M24 58h72v12a26 26 0 0 1-26 26H50a26 26 0 0 1-26-26z" fill="#e76f00" />
          <ellipse cx="60" cy="59" rx="36" ry="6" fill="#f7e7d2" />
          <path
            d="M60 63c-5-3-8-5-8-7.5a3.2 3.2 0 0 1 8-1.5 3.2 3.2 0 0 1 8 1.5c0 2.5-3 4.5-8 7.5z"
            fill="#b3713a"
          />
          <Rotulo x={60} y={86} texto="J" cor="#fff4e4" />
        </g>
      )}
    </svg>
  );
}

const ITENS: Record<TrilhaId, string[]> = {
  fundamentos: ["0", "1", "1", "0", "01", "10", "0", "1", "110", "0"],
  logica: ["◇", "▭", "→", "?", "◇", "▭", "↺", "→", "?", "◇"],
  c: ["0x7f", "&x", "*p", "{ }", "\\0", "0x1a", "int", "&", "*", ";"],
  python: ["", "", "", "", "", "", "", "", "", ""],
  java: ["", "", "", "", "", "", "", "", "", ""],
};

/** Detalhes que flutuam no fundo do topo de cada trilha. */
export function Ambiente({ trilha }: { trilha: TrilhaId }) {
  return (
    <div className={`ambiente ambiente-${trilha}`} aria-hidden="true">
      {ITENS[trilha].map((texto, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 23 + 5) % 95}%`,
            animationDelay: `${(i * 1.7) % 9}s`,
            animationDuration: `${11 + ((i * 3) % 7)}s`,
            fontSize: `${12 + ((i * 5) % 10)}px`,
          }}
        >
          {texto}
        </span>
      ))}
    </div>
  );
}
