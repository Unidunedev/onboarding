import { Check, ArrowRight, Hash, Send, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { avatarUrl } from "@/lib/community";
import forest from "@/assets/enchanted-forest.jpg";

type StyleId = "gamificado" | "floresta" | "clean";

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
] as const;

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
