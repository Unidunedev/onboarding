import { Check, ArrowRight, Hash, Send, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { avatarUrl } from "@/lib/community";
import forest from "@/assets/enchanted-forest.jpg";

export const STYLES = [
  {
    id: "gamificado",
    title: "A próxima fase\né nossa.",
    name: "Gamificado",
    description:
      "Cada commit é uma conquista. Cada bug resolvido, um novo nível. Vamos transformar o aprendizado em uma aventura.",
    details: [
      "Estética pixel e espírito arcade",
      "Missões, conquistas e barra de XP",
      "Uma comunidade que evolui junto",
    ],
    className: "game-style",
  },
  {
    id: "floresta",
    title: "Todo começo\né uma descoberta.",
    name: "Fantasia florestal",
    description:
      "Entre em uma floresta de possibilidades. Um universo encantado onde ideias criam raízes e cada caminho revela algo novo.",
    details: [
      "Florestas ancestrais e luz dourada",
      "Camadas de natureza e magia sutil",
      "Uma jornada de aventura e descoberta",
    ],
    className: "forest-style",
  },
  {
    id: "clean",
    title: "Boas ideias.\nSem distrações.",
    name: "Profissional clean",
    description:
      "O essencial em primeiro plano. Um espaço leve, organizado e elegante para deixar nossos projetos brilharem.",
    details: [
      "Tipografia moderna e espaço para respirar",
      "Grid sutil e detalhes bem pensados",
      "Clareza em cada interação",
    ],
    className: "clean-style",
  },
  {
    id: "lofi",
    title: "Seu cantinho.\nSeu ritmo.",
    name: "Lo-fi Café",
    description:
      "Noite, chuva na janela e um café quentinho. Um espaço calmo para quem gosta de programar no seu canto, sem pressa e sem barulho.",
    details: [
      "Luz de abajur e tons de café com lilás",
      "Tipografia arredondada e acolhedora",
      "Animações suaves, como uma playlist lo-fi",
    ],
    className: "lofi-style",
  },
  {
    id: "terminal",
    title: "> acesso\nconcedido_",
    name: "Terminal hacker",
    description:
      "Fundo escuro, neon e tudo com cara de linha de comando. As conversas parecem saídas direto do terminal. É a cara de dev.",
    details: [
      "Verde e ciano neon sobre o preto",
      "Fonte monoespaçada e efeito glitch",
      "Mensagens no formato de comandos",
    ],
    className: "terminal-style",
  },
  {
    id: "brutalismo",
    title: "Sem medo\nde ousar.",
    name: "Neo-brutalismo",
    description:
      "Cores chapadas, bordas grossas e sombras duras. O visual ousado que está em alta nos produtos digitais mais modernos.",
    details: [
      "Amarelo, rosa e azul em blocos sólidos",
      "Bordas pretas grossas e sombras deslocadas",
      "Tipografia enorme e cheia de personalidade",
    ],
    className: "brutal-style",
  },
] as const;

type StyleId = (typeof STYLES)[number]["id"];

type Message = { who: string; avatar: string; tag?: string; text: string; meta?: string };

/** Conteúdo de exemplo da prévia: o mesmo app, contado no "idioma" de cada estilo. */
const PREVIEW: Record<
  StyleId,
  {
    rooms: string[];
    online: string;
    messages: Message[];
    project: { name: string; info: string; stat: string };
    typing: string;
    placeholder: string;
  }
> = {
  gamificado: {
    rooms: ["taverna", "missoes", "boss-bugs", "loot"],
    online: "12 players online",
    messages: [
      {
        who: "ana.dev",
        avatar: avatarUrl("Pixel", 3),
        tag: "LV 3",
        text: "Missão cumprida: primeiro PR aprovado!",
        meta: "+50 XP",
      },
      {
        who: "joao_codes",
        avatar: avatarUrl("Pixel", 7),
        tag: "LV 1",
        text: "Alguém entra na party pra revisar meu código?",
      },
    ],
    project: { name: "quest-tracker", info: "React · TypeScript", stat: "12" },
    typing: "bia.exe está digitando...",
    placeholder: "> digite sua mensagem_",
  },
  floresta: {
    rooms: ["clareira", "sementes", "trilhas", "fogueira"],
    online: "12 viajantes por perto",
    messages: [
      {
        who: "Ana",
        avatar: avatarUrl("Feminino", 4),
        text: "Plantei meu primeiro projeto hoje 🌱",
      },
      {
        who: "João",
        avatar: avatarUrl("Masculino", 2),
        text: "Que lindo! Posso regar com um PR?",
        meta: "✨ 4",
      },
    ],
    project: { name: "diário-de-estudos", info: "HTML · CSS · JavaScript", stat: "8" },
    typing: "Bia está escrevendo...",
    placeholder: "Deixe uma mensagem na clareira...",
  },
  clean: {
    rooms: ["geral", "projetos", "ajuda", "cafezinho"],
    online: "12 online",
    messages: [
      {
        who: "Ana Souza",
        avatar: avatarUrl("Sérios", 5),
        text: "Publiquei meu portfólio. Feedbacks são bem-vindos!",
      },
      {
        who: "João Lima",
        avatar: avatarUrl("Sérios", 9),
        text: "Ficou ótimo. Deixei duas sugestões no PR.",
        meta: "👍 3",
      },
    ],
    project: { name: "portfolio-ana", info: "Next.js · Tailwind", stat: "21" },
    typing: "Bia está digitando...",
    placeholder: "Escreva uma mensagem...",
  },
  lofi: {
    rooms: ["sala-de-estar", "playlist", "estudos", "madrugada"],
    online: "12 pessoas por aqui",
    messages: [
      {
        who: "Ana",
        avatar: avatarUrl("Anime", 4),
        text: "Chuva, café e meu primeiro deploy ☕",
      },
      {
        who: "Caio",
        avatar: avatarUrl("Anime", 9),
        text: "Que vibe boa. Bora codar juntos hoje?",
        meta: "🌙 3",
      },
    ],
    project: { name: "diario-lofi", info: "React · CSS", stat: "9" },
    typing: "Bia está escrevendo devagarinho...",
    placeholder: "Escreva algo com calma...",
  },
  terminal: {
    rooms: ["root", "deploy", "bugs", "logs"],
    online: "12 conectados",
    messages: [
      {
        who: "ana_dev",
        avatar: avatarUrl("Robôs", 3),
        tag: "sudo",
        text: "> git push origin main ✓",
      },
      {
        who: "caio.sh",
        avatar: avatarUrl("Robôs", 7),
        text: "> review --pr 42 --approve",
        meta: "[OK]",
      },
    ],
    project: { name: "cli-unidunedev", info: "Node.js · Bash", stat: "17" },
    typing: "bia@unidunedev:~$ digitando_",
    placeholder: "$ digite um comando...",
  },
  brutalismo: {
    rooms: ["GERAL", "PROJETOS", "MEMES", "VAGAS"],
    online: "12 ONLINE",
    messages: [
      {
        who: "ANA",
        avatar: avatarUrl("Emoji", 4),
        text: "LANCEI MEU PORTFÓLIO!!!",
      },
      {
        who: "CAIO",
        avatar: avatarUrl("Emoji", 8),
        text: "Ficou absurdo. Bora ver.",
        meta: "🔥 12",
      },
    ],
    project: { name: "portfolio-bruto", info: "Next.js · Tailwind", stat: "33" },
    typing: "BIA ESTÁ DIGITANDO...",
    placeholder: "ESCREVA ALGO OUSADO",
  },
};

function ChatPreview({ style, projectName }: { style: StyleId; projectName: string }) {
  const p = PREVIEW[style];
  const name = projectName || "Nosso projeto";

  return (
    <div className="chat-mock" role="img" aria-label={`Prévia do app ${name} neste estilo`}>
      <div className="chat-top">
        <span className="chat-logo" aria-hidden="true">
          {name.charAt(0).toUpperCase()}
        </span>
        <strong className="chat-name">{name}</strong>
        <span className="chat-online">
          <span className="chat-dot" /> {p.online}
        </span>
      </div>
      {style === "gamificado" && (
        <div className="chat-xp" aria-hidden="true">
          <span>LV 2</span>
          <span className="chat-xp-bar">
            <span />
          </span>
          <span>240 / 400 XP</span>
        </div>
      )}
      <div className="chat-body">
        <ul className="chat-rooms" aria-hidden="true">
          {p.rooms.map((room, i) => (
            <li key={room} className={i === 1 ? "active" : undefined}>
              <Hash size={13} /> {room}
            </li>
          ))}
        </ul>
        <div className="chat-messages" aria-hidden="true">
          {p.messages.map((m, i) => (
            <div className="chat-msg" key={m.who} style={{ animationDelay: `${i * 0.5}s` }}>
              <img src={m.avatar} alt="" width={36} height={36} loading="lazy" />
              <div>
                <p className="chat-author">
                  {m.who}
                  {m.tag && <span className="chat-tag">{m.tag}</span>}
                </p>
                <p className="chat-text">{m.text}</p>
                {m.meta && <span className="chat-meta">{m.meta}</span>}
              </div>
            </div>
          ))}
          <div className="chat-project" style={{ animationDelay: "1s" }}>
            <span className="chat-project-icon">{"</>"}</span>
            <div>
              <strong>{p.project.name}</strong>
              <span>{p.project.info}</span>
            </div>
            <span className="chat-project-stat">
              <Star size={13} /> {p.project.stat}
            </span>
          </div>
          <p className="chat-typing">{p.typing}</p>
        </div>
      </div>
      <div className="chat-input" aria-hidden="true">
        <span>{p.placeholder}</span>
        <span className="chat-send">
          <Send size={15} />
        </span>
      </div>
    </div>
  );
}

/** Janela com chuva, abajur, xícara com vapor e um gatinho dormindo. */
function LofiScene() {
  return (
    <div className="lofi-scene" aria-hidden="true">
      <div className="lofi-window">
        <span className="lofi-rain" />
        <span className="lofi-moon" />
      </div>
      <span className="lofi-lamp" />
      <div className="lofi-desk">
        <span className="lofi-mug">
          <span className="lofi-steam" />
          <span className="lofi-steam" />
        </span>
        <span className="lofi-cat">
          <span className="lofi-zzz">z</span>
          <span className="lofi-zzz">z</span>
        </span>
      </div>
    </div>
  );
}

const MATRIX_CHARS = "01アカサタナ{}<>=;$#λ01";
const MATRIX_COLUMNS = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 100) / 18 + 1}%`,
  delay: `${(i * 7) % 11}s`,
  duration: `${7 + ((i * 5) % 6)}s`,
  text: (MATRIX_CHARS.slice(i % 10) + MATRIX_CHARS.slice(0, i % 10)).repeat(2),
}));

/** "Chuva" de caracteres no estilo Matrix + uma linha sendo digitada. */
function MatrixRain() {
  return (
    <div className="matrix" aria-hidden="true">
      {MATRIX_COLUMNS.map((c) => (
        <span
          key={c.left}
          style={{ left: c.left, animationDelay: c.delay, animationDuration: c.duration }}
        >
          {c.text}
        </span>
      ))}
      <p className="terminal-typing">$ npm run unidunedev --modo=hacker</p>
    </div>
  );
}

export function StylePicker({
  value,
  onChange,
  projectName,
}: {
  value: string;
  onChange: (value: StyleId) => void;
  projectName: string;
}) {
  return (
    <div>
      {STYLES.map((s, index) => (
        <section
          key={s.id}
          className={`style-card ${s.className} ${value === s.id ? "selected" : ""}`}
          aria-label={`Estilo ${s.name}`}
        >
          {s.id === "floresta" && (
            <>
              <img
                className="forest-image"
                src={forest}
                alt=""
                width={1920}
                height={1024}
                loading="lazy"
              />
              <div className="fireflies" aria-hidden="true">
                {Array.from({ length: 14 }, (_, i) => (
                  <span key={i} />
                ))}
              </div>
            </>
          )}
          {s.id === "gamificado" && (
            <div className="hud" aria-hidden="true">
              <span>
                PLAYER_01 · READY TO START
                <div className="xp-bar" />
              </span>
              <span>XP 000 / 100</span>
            </div>
          )}
          {s.id === "lofi" && <LofiScene />}
          {s.id === "terminal" && <MatrixRain />}
          {s.id === "brutalismo" && (
            <div className="brutal-shapes" aria-hidden="true">
              <span className="b-square" />
              <span className="b-circle" />
              <span className="b-star">✦</span>
            </div>
          )}
          {value === s.id && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="style-check">
              <Check size={23} />
            </motion.span>
          )}
          <div className="style-content">
            <span className="section-kicker">
              0{index + 1} / {s.name}
            </span>
            <h2>
              {s.title.split("\n").map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>
            <p>{s.description}</p>
            <ul>
              {s.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <Button className="coffee-cta" onClick={() => onChange(s.id)}>
              {value === s.id ? "Estilo escolhido" : "Escolher este estilo"}
              {value === s.id ? <Check /> : <ArrowRight />}
            </Button>
          </div>
          <div className="style-preview">
            <ChatPreview style={s.id} projectName={projectName} />
          </div>
        </section>
      ))}
    </div>
  );
}
