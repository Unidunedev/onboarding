// Cena lofi do topo da página inicial: uma mesa de estudos à noite.
// Tudo é desenhado em SVG (formas simples) e animado só com CSS (classes cs-* em estudos.css).

const LINHAS_DE_CODIGO = [
  { recuo: 0, largura: 64, cor: "#f28fad" },
  { recuo: 12, largura: 92, cor: "#8fc8f0" },
  { recuo: 12, largura: 70, cor: "#ffd27a" },
  { recuo: 24, largura: 84, cor: "#b5d99c" },
  { recuo: 24, largura: 52, cor: "#f4a261" },
  { recuo: 12, largura: 40, cor: "#8fc8f0" },
  { recuo: 0, largura: 18, cor: "#f28fad" },
];

const ESTRELAS = [
  [362, 44],
  [404, 70],
  [452, 38],
  [478, 92],
  [372, 120],
  [540, 120],
];

export function CenaLofi() {
  return (
    <div className="cena-lofi" aria-hidden="true">
      <span className="cena-luz" />
      <div className="cena-mesa" />

      <svg className="cena-svg" viewBox="0 0 600 400">
        <defs>
          <clipPath id="lofi-vidro">
            <rect x="345" y="25" width="210" height="180" rx="6" />
          </clipPath>
          <linearGradient id="lofi-ceu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1b2342" />
            <stop offset="1" stopColor="#2c2f5e" />
          </linearGradient>
          <pattern id="lofi-gotas" width="18" height="40" patternUnits="userSpaceOnUse">
            <line
              x1="6"
              y1="0"
              x2="3"
              y2="13"
              stroke="#bccdff"
              strokeOpacity=".55"
              strokeWidth="1.4"
            />
            <line
              x1="15"
              y1="20"
              x2="12"
              y2="31"
              stroke="#bccdff"
              strokeOpacity=".4"
              strokeWidth="1.2"
            />
          </pattern>
          <radialGradient id="lofi-brilho-tela">
            <stop offset="0" stopColor="#8fbfec" stopOpacity=".45" />
            <stop offset="1" stopColor="#8fbfec" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="lofi-cone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd59a" stopOpacity=".5" />
            <stop offset="1" stopColor="#ffd59a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Post-its na parede */}
        <g className="cs-postit">
          <rect
            x="34"
            y="72"
            width="54"
            height="54"
            rx="3"
            fill="#ffd95a"
            transform="rotate(-6 61 72)"
          />
          <path
            d="M44 92h30M44 102h22M44 112h26"
            stroke="#b38a10"
            strokeWidth="3"
            strokeLinecap="round"
            transform="rotate(-6 61 72)"
          />
        </g>
        <g className="cs-postit cs-postit2">
          <rect
            x="100"
            y="96"
            width="46"
            height="46"
            rx="3"
            fill="#f2a7b8"
            transform="rotate(5 123 96)"
          />
          <text
            x="123"
            y="127"
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="700"
            fontSize="17"
            fill="#8e3b52"
            transform="rotate(5 123 96)"
          >
            {"{ }"}
          </text>
        </g>

        {/* Janela com lua, estrelas e chuva */}
        <rect x="345" y="25" width="210" height="180" rx="6" fill="url(#lofi-ceu)" />
        <g clipPath="url(#lofi-vidro)">
          <circle cx="514" cy="64" r="30" fill="#f5e9c8" opacity=".18" />
          <circle cx="514" cy="64" r="18" fill="#f5e9c8" />
          {ESTRELAS.map(([x, y], i) => (
            <circle
              key={i}
              className="cs-estrela"
              cx={x}
              cy={y}
              r="1.6"
              fill="#fff6dc"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
          ))}
          <rect
            className="cs-chuva"
            x="335"
            y="-20"
            width="240"
            height="260"
            fill="url(#lofi-gotas)"
          />
        </g>
        <rect
          x="340"
          y="20"
          width="220"
          height="190"
          rx="10"
          fill="none"
          stroke="#5a4230"
          strokeWidth="10"
        />
        <path d="M450 22v186M342 115h216" stroke="#5a4230" strokeWidth="7" />

        {/* Luz da tela no ambiente */}
        <ellipse
          className="cs-brilho"
          cx="230"
          cy="330"
          rx="170"
          ry="100"
          fill="url(#lofi-brilho-tela)"
        />

        {/* Luminária */}
        <path
          className="cs-cone"
          d="M548 318 L588 306 L640 400 L470 400 Z"
          fill="url(#lofi-cone)"
        />
        <ellipse cx="566" cy="398" rx="20" ry="4" fill="#3d2a1e" />
        <path
          d="M566 396 L552 344 L580 300"
          fill="none"
          stroke="#5a4230"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M560 296 L594 286 L600 306 L548 320 Z" fill="#e8b47a" />
        <circle cx="575" cy="312" r="4" fill="#fff3c4" />

        {/* Gato */}
        <g className="cs-gato">
          <path
            className="cs-rabo"
            d="M98 396 C132 392 132 356 116 346"
            fill="none"
            stroke="#120d18"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path d="M40 400 C36 362 50 334 70 330 C90 334 104 362 100 400 Z" fill="#120d18" />
          <path d="M50 304 L47 276 L66 294 Z M90 304 L93 276 L74 294 Z" fill="#120d18" />
          <path d="M52 298 L51 284 L60 293 Z M88 298 L89 284 L80 293 Z" fill="#3a2a3e" />
          <circle cx="70" cy="314" r="25" fill="#120d18" />
          <g className="cs-olhos">
            <ellipse cx="61" cy="313" rx="3.6" ry="4.6" fill="#ffd95a" />
            <ellipse cx="79" cy="313" rx="3.6" ry="4.6" fill="#ffd95a" />
          </g>
          <path d="M67 322 l3 3 l3 -3 z" fill="#f2a7b8" />
        </g>

        {/* Notebook */}
        <rect x="140" y="262" width="180" height="118" rx="8" fill="#1c1726" />
        <rect x="148" y="270" width="164" height="100" rx="4" fill="#221d36" />
        {LINHAS_DE_CODIGO.map((l, i) => (
          <rect
            key={i}
            className="cs-linha"
            x={158 + l.recuo}
            y={280 + i * 12}
            width={l.largura}
            height="5"
            rx="2.5"
            fill={l.cor}
            style={{ animationDelay: `${i * 0.7}s` }}
          />
        ))}
        <rect className="cs-cursor" x="180" y="350" width="6" height="9" fill="#f3e6d3" />
        <path
          d="M126 380 H334 L348 396 A4 4 0 0 1 344 400 H116 A4 4 0 0 1 112 396 Z"
          fill="#3a3148"
        />
        <rect x="206" y="384" width="48" height="4" rx="2" fill="#2a2336" />

        {/* Notas musicais (é lofi, né?) */}
        <text className="cs-nota" x="318" y="270" fill="#f2a7b8" fontSize="18">
          ♪
        </text>
        <text className="cs-nota cs-nota2" x="306" y="276" fill="#8fbfec" fontSize="15">
          ♫
        </text>

        {/* Caneca com vapor */}
        <path
          className="beb-vapor"
          d="M364 344c-6-5 6-9 0-15"
          fill="none"
          stroke="#e8b47a"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          className="beb-vapor beb-v2"
          d="M376 344c-6-5 6-9 0-15"
          fill="none"
          stroke="#e8b47a"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          className="beb-vapor beb-v3"
          d="M388 344c-6-5 6-9 0-15"
          fill="none"
          stroke="#e8b47a"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path d="M398 364h4a9 9 0 0 1 0 18h-4" fill="none" stroke="#c8803e" strokeWidth="5" />
        <path d="M356 354h42v30a16 16 0 0 1-16 16h-10a16 16 0 0 1-16-16z" fill="#c8803e" />
        <path
          d="M372 368l-5 6 5 6M382 368l5 6-5 6"
          fill="none"
          stroke="#fff4e4"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Livros com plantinha */}
        <rect x="418" y="382" width="112" height="18" rx="2" fill="#8fbfec" />
        <rect x="524" y="384" width="4" height="14" fill="#f3e6d3" />
        <rect x="428" y="366" width="94" height="16" rx="2" fill="#ffad66" />
        <rect x="516" y="368" width="4" height="12" fill="#f3e6d3" />
        <rect x="422" y="352" width="104" height="14" rx="2" fill="#f2a7b8" />
        <rect x="520" y="354" width="4" height="10" fill="#f3e6d3" />
        <path d="M434 359h40" stroke="#c96f86" strokeWidth="2" strokeLinecap="round" />
        <g className="cs-planta">
          <path d="M470 330 C458 318 456 306 462 298 C470 306 472 318 470 330 Z" fill="#6fbf86" />
          <path d="M472 330 C486 320 492 308 488 298 C478 304 472 316 472 330 Z" fill="#5aa874" />
          <path d="M471 330 C468 314 470 300 476 290 C480 302 478 316 471 330 Z" fill="#7fd196" />
        </g>
        <path d="M458 330 h28 l-3 22 h-22 z" fill="#c8803e" />
        <rect x="456" y="328" width="32" height="5" rx="2" fill="#a9622a" />
      </svg>
    </div>
  );
}
