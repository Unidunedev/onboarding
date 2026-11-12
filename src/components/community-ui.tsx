import { Link } from "@tanstack/react-router";
import { Github, Users, ArrowUpRight, Heart, Copy, Check } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { REPO_URL, COMECE_POR_AQUI_URL } from "@/config";
import { type Member, avatarUrl } from "@/lib/community";

export function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Unidunedev, início">
        <Logo size={44} />
      </Link>
      <nav className="navigation">
        <Link to="/mural">
          <Users size={14} /> Mural da galera
        </Link>
        <Link to="/desafio-pr" search={{ nivel: "1" }}>
          Desafio do 1º PR <ArrowUpRight size={13} />
        </Link>
        <a className="nav-github" href={REPO_URL} target="_blank" rel="noreferrer">
          <Github size={16} /> GitHub
        </a>
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <span>Feito com café, código e vontade de aprender.</span>
      <span>
        Uma comunidade. Muitos primeiros commits. <Heart size={12} />
      </span>
      <small className="footer-credits">
        Avatares Feminino e Masculino: IconScout e Avataaars. Demais por{" "}
        <a href="https://www.dicebear.com" target="_blank" rel="noreferrer">
          DiceBear
        </a>
        : Bottts e Avataaars (Pablo Stanley); Miniavs (Webpixels) e Fun Emoji (Davis Uche) sob CC BY
        4.0; Lorelei (Lisa Wischofsky), Notionists (Zoish) e Pixel Art em domínio público.
      </small>
    </footer>
  );
}

/** Aviso fixo: o nome do arquivo do membro precisa ser igual ao username. */
export function FileNameWarning({ username }: { username?: string }) {
  const user = username || "seu-username";
  return (
    <p className="filename-warning" role="note">
      <strong>⚠️ Atenção ao nome do arquivo:</strong> ele precisa ser{" "}
      <strong>exatamente o seu username do GitHub, em minúsculas</strong>, igual ao campo{" "}
      <code>"github"</code> do JSON. Exemplo: <code>"github": "{user}"</code> →{" "}
      <code>membros/{user}.json</code>. Se forem diferentes, o check do PR fica vermelho.
    </p>
  );
}

/** Ícone "?" que mostra uma explicação ao passar o mouse ou focar com o teclado. */
export function HelpTip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="help-tip">
      <button type="button" className="help-tip-trigger" aria-label={label}>
        ?
      </button>
      <span className="help-tip-bubble" role="tooltip">
        {children}
      </span>
    </span>
  );
}

export function MemberCard({ member, highlight = false }: { member: Member; highlight?: boolean }) {
  return (
    <article className={`member-card ${highlight ? "highlight-member" : ""}`}>
      {highlight && <span className="member-badge">Você aqui em breve ✨</span>}
      <img
        className="member-avatar"
        src={member.avatar}
        alt={`Avatar de ${member.nome}`}
        loading="lazy"
        width={76}
        height={76}
      />
      <h3>{member.nome || "Seu nome aqui"}</h3>
      <p className="member-username">@{member.github || "seu-username"}</p>
      <p className="member-period">
        {member.periodo === "Prefiro não informar"
          ? "☕ Na comunidade"
          : member.periodo === "Já formado"
            ? "🎓 Já formado"
            : `🎓 ${member.periodo} período`}
      </p>
      <div className="chip-wrap">
        {member.areas.map((area) => (
          <span className="member-tag" key={area}>
            {area}
          </span>
        ))}
      </div>
      <p className="member-phrase">{member.frase || "Um café e um commit de cada vez ☕"}</p>
    </article>
  );
}
export function GhostCard() {
  return (
    <article className="ghost-card">
      <span className="ghost-avatar">☕</span>
      <p>
        Esse lugar pode ser
        <br />
        de um colega 👀
      </p>
    </article>
  );
}
export function CopyButton({ text, code = false }: { text: string; code?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={code ? "copy-code" : ""}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setError(false);
          setTimeout(() => setCopied(false), 2200);
        } catch {
          setError(true);
        }
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}{" "}
      {error ? "Selecione e copie" : copied ? "Copiado! ☕" : "Copiar"}
    </Button>
  );
}
export function CodeBlock({ text, json = false }: { text: string; json?: boolean }) {
  return (
    <div className="code-block">
      <CopyButton text={text} code />
      <pre>
        {json
          ? text.split("\n").map((line, i) => {
              const parts = line.match(/^(\s*)("[^"]+")(:.*)$/);
              return (
                <span key={i}>
                  {parts ? (
                    <>
                      {parts[1]}
                      <span className="code-key">{parts[2]}</span>
                      {parts[3]}
                    </>
                  ) : (
                    line
                  )}
                  {"\n"}
                </span>
              );
            })
          : text}
      </pre>
    </div>
  );
}
export function GitWelcome() {
  return (
    <aside className="welcome-git">
      <h3>🌱 Nunca usou Git ou GitHub?</h3>
      <p>
        Relaxa, todo mundo começou do zero 💜 Preparamos o ComecePorAqui: um guia passo a passo para
        criar sua conta, instalar o Git e configurar tudo no Windows e no Mac.
      </p>
      <Button asChild variant="outline">
        <a href={COMECE_POR_AQUI_URL} target="_blank" rel="noreferrer">
          Ir para o ComecePorAqui <ArrowUpRight />
        </a>
      </Button>
      <p className="small-note">
        Use a IA para tirar dúvidas, não para fazer por você. O aprendizado é seu! 🧠
      </p>
    </aside>
  );
}
export function MiniAvatars() {
  return (
    <span className="mini-avatars">
      {[1, 2, 3, 4].map((i) => (
        <img key={i} src={avatarUrl("Sérios", i)} alt="" width={29} height={29} />
      ))}
    </span>
  );
}
