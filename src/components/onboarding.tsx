import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Coffee,
  Code2,
  Users,
  GitPullRequest,
  Clock,
  ShieldCheck,
  Sparkles,
  Github,
  LoaderCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MemberCard,
  GhostCard,
  MiniAvatars,
  CopyButton,
  CodeBlock,
  GitWelcome,
  HelpTip,
  FileNameWarning,
} from "@/components/community-ui";
import { StylePicker, STYLES } from "@/components/style-picker";
import {
  AREAS,
  AVATAR_CATEGORIES,
  avatarCount,
  PERIODOS,
  IDEIAS,
  avatarUrl,
  profileSchema,
  registrationSchema,
  makePassport,
  loadMembers,
  sortMembers,
  type Registration,
  type Member,
  type AvatarCategory,
} from "@/lib/community";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import { EVENTO_INICIO, clearDraft, readDraft, saveDraft } from "@/lib/draft";
import { COMECE_POR_AQUI_URL, REPO_URL } from "@/config";
import welcome from "@/assets/coffee-welcome.jpg";
const steps = ["Boas-vindas", "Seu perfil", "A ideia", "O estilo", "Revisão"];
const initial: Registration = {
  nome: "",
  github: "",
  avatar: avatarUrl("Robôs", 1),
  periodo: "1º",
  areas: [],
  frase: "",
  ideia_projeto: "Vitrine para compartilhar projetos",
  ideia_texto: "",
  sugestao_nome: "",
  estilo_artistico: "clean",
};

function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <>
      <section className="hero">
        <img
          className="hero-image"
          src={welcome}
          alt="Xícara de café, laptop e livros em uma mesa acolhedora"
          width={1920}
          height={1024}
          fetchPriority="high"
        />
        <div className="hero-code" aria-hidden="true">
          const futuro = {"{"}
          <br />
          &nbsp; café: true,
          <br />
          &nbsp; aprender: juntos
          <br />
          {"}"};<span className="terminal-cursor">▍</span>
        </div>
        <div className="hero-content">
          <span className="eyebrow">
            <span className="status-dot" /> COMUNIDADE UNIVERSITÁRIA · DEVS INICIANTES
          </span>
          <h1>
            Seu primeiro commit.
            <br />
            Seu próximo <em>café.</em>
          </h1>
          <p className="hero-description">
            Um projeto real. Uma galera para aprender junto.
            <br />
            Aqui, ninguém precisa saber tudo — só ter vontade
            <br className="hidden sm:block" /> de começar.
          </p>
          <div className="hero-actions">
            <Button className="coffee-cta" onClick={onStart}>
              Começar <Coffee size={16} />
              <ArrowRight size={16} />
            </Button>
          </div>
          <p className="small-note">
            <Clock size={12} /> Uns 5 minutinhos. O café ainda vai estar quente.
          </p>
        </div>
      </section>
      <section className="intro-band">
        <p className="section-kicker">MENOS PRESSÃO. MAIS CONEXÃO.</p>
        <h2 className="section-heading">Aqui, a gente aprende fazendo. Juntos.</h2>
        <p className="section-subtitle">
          Sem competição, sem pré-requisitos impossíveis. Só um passo de cada vez.
        </p>
        <div className="journey-grid">
          {[
            {
              icon: Users,
              title: "Encontre sua galera",
              text: "Gente começando, assim como você. Troque ideias, tire dúvidas e cresça em equipe.",
            },
            {
              icon: Code2,
              title: "Construa algo de verdade",
              text: "Ajude a escolher a ideia e o estilo de um projeto real. Sua voz faz parte do código.",
            },
            {
              icon: GitPullRequest,
              title: "Faça seu primeiro PR",
              text: "Do “nunca usei Git” ao primeiro pull request. A gente te acompanha no caminho.",
            },
          ].map((item, i) => (
            <article className="journey-item" key={item.title}>
              <span className="journey-icon">
                <item.icon size={19} />
              </span>
              <span className="step-number">0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <p className="community-note">
          <MiniAvatars />
          <span>
            Tem um lugar na mesa esperando por você. <span aria-hidden="true">☕</span>
          </span>
        </p>
      </section>
    </>
  );
}

export function Onboarding() {
  const [draft] = useState(readDraft);
  const [step, setStep] = useState(() => Math.min(Math.max(draft.step ?? 0, 0), 4));
  const [data, setData] = useState<Registration>(() => ({ ...initial, ...draft.data }));
  const [category, setCategory] = useState<AvatarCategory>(() =>
    draft.category && AVATAR_CATEGORIES.includes(draft.category) ? draft.category : "Robôs",
  );
  const [error, setError] = useState("");
  const [duplicate, setDuplicate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [passport, setPassport] = useState<Member | null>(draft.passport ?? null);
  const [jsonCopiado, setJsonCopiado] = useState(draft.jsonCopiado ?? false);
  useEffect(() => {
    saveDraft({ step, data, category, passport, jsonCopiado });
  }, [step, data, category, passport, jsonCopiado]);
  const restart = () => {
    clearDraft();
    setPassport(null);
    setJsonCopiado(false);
    setData(initial);
    setCategory("Robôs");
    setStep(0);
    window.scrollTo({ top: 0 });
  };
  const reduced = useReducedMotion();
  const update = <K extends keyof Registration>(key: K, value: Registration[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));
  const go = (next: number) => {
    setError("");
    setDuplicate(false);
    setStep(next);
    window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
  };
  // Clique no logo enquanto já está nesta página: volta para as boas-vindas.
  useEffect(() => {
    const irParaInicio = () => {
      setError("");
      setDuplicate(false);
      setStep(0);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener(EVENTO_INICIO, irParaInicio);
    return () => window.removeEventListener(EVENTO_INICIO, irParaInicio);
  }, []);
  const next = () => {
    if (step === 1) {
      const parsed = profileSchema.safeParse(data);
      if (!parsed.success) {
        setError(parsed.error.issues[0]?.message ?? "Confira seu perfil.");
        return;
      }
      setData((prev) => ({ ...prev, ...parsed.data }));
    }
    if (step === 2 && data.ideia_projeto === "Outra ideia" && !data.ideia_texto.trim()) {
      setError("Conta um pouquinho sobre sua ideia.");
      return;
    }
    go(step + 1);
  };
  const submit = async () => {
    const parsed = registrationSchema.safeParse(data);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Confira suas escolhas.");
      return;
    }
    if (!supabaseConfigured) {
      setError("O site está sem a configuração do banco. Avise a liderança 🙏");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const { github, ...rest } = parsed.data;
      const result = await supabase.from("inscricoes").insert({ ...rest, github_username: github });
      if (result.error) {
        if (result.error.code === "23505") {
          setDuplicate(true);
          setError("Você já se inscreveu! Quer ir direto pro Desafio do PR?");
        } else
          setError("Não conseguimos guardar sua inscrição agora. Tente novamente em um instante.");
        return;
      }
      setPassport(makePassport(parsed.data, new Date().toISOString().slice(0, 10)));
      go(5);
    } catch {
      setError("A conexão deu uma pausa para o café. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };
  const preview: Member = { ...data, entrouEm: "" };
  if (passport)
    return (
      <Final
        passport={passport}
        jsonCopiado={jsonCopiado}
        onJsonCopiado={() => setJsonCopiado(true)}
        onRestart={restart}
      />
    );
  return (
    <>
      <div className="stepper" aria-label="Etapas da inscrição">
        {steps.map((name, i) => (
          <div className="flex items-center" key={name}>
            <div
              className={`step-node ${i === step ? "active" : i < step ? "done" : ""}`}
              aria-current={i === step ? "step" : undefined}
            >
              <span className="step-circle">
                {i < step ? <Check size={12} /> : i === 0 ? <Coffee size={13} /> : i + 1}
              </span>
              <span>{name}</span>
            </div>
            {i < 4 && <span className="step-line" />}
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {step === 0 ? (
            <Welcome onStart={() => go(1)} />
          ) : step === 3 ? (
            <section className="styles-page">
              <p className="section-kicker">ETAPA 04 · A PERSONALIDADE DO NOSSO PROJETO</p>
              <h1 className="form-heading">Qual universo vamos construir?</h1>
              <p className="form-subtitle">
                Três caminhos, muitas possibilidades. Veja como{" "}
                {data.sugestao_nome.trim() ? (
                  <strong>{data.sugestao_nome.trim()}</strong>
                ) : (
                  "o nosso projeto"
                )}{" "}
                ficaria em cada um e escolha o que faz seus olhos brilharem.
              </p>
              <StylePicker
                projectName={data.sugestao_nome.trim()}
                value={data.estilo_artistico}
                onChange={(v) => update("estilo_artistico", v)}
              />
              <div className="form-controls">
                <Button variant="ghost" onClick={() => go(2)}>
                  <ArrowLeft /> Voltar
                </Button>
                <Button className="coffee-cta" onClick={next}>
                  Revisar minhas escolhas <ArrowRight />
                </Button>
              </div>
            </section>
          ) : (
            <div className="form-layout">
              <section>
                {step === 1 ? (
                  <>
                    <p className="section-kicker">ETAPA 02 · PRAZER EM TE CONHECER</p>
                    <h1 className="form-heading">Primeiro, quem é você?</h1>
                    <p className="form-subtitle">
                      Puxe uma cadeira. Vamos montar seu cantinho no mural da galera.
                    </p>
                    <div className="field-row">
                      <label className="field">
                        Nome ou apelido
                        <input
                          className="text-input"
                          placeholder="Como a galera vai te chamar?"
                          value={data.nome}
                          maxLength={80}
                          onChange={(e) => update("nome", e.target.value)}
                        />
                      </label>
                      <div className="field">
                        <span className="field-label">
                          <label htmlFor="github-username">Username do GitHub</label>
                          <HelpTip label="O que é o username do GitHub?">
                            É o seu nome de usuário no GitHub, aquele que aparece em{" "}
                            <code>github.com/seu-usuario</code>. Ainda não tem conta ou não sabe
                            usar?{" "}
                            <a href={COMECE_POR_AQUI_URL} target="_blank" rel="noreferrer">
                              Comece pelo ComecePorAqui →
                            </a>
                          </HelpTip>
                        </span>
                        <div className="input-avatar">
                          <input
                            id="github-username"
                            className="text-input"
                            placeholder="seu-username"
                            value={data.github}
                            maxLength={39}
                            autoComplete="username"
                            onChange={(e) => update("github", e.target.value.toLowerCase())}
                          />
                          {/^[a-z0-9][a-z0-9-]*$/.test(data.github) && (
                            <img
                              src={`https://github.com/${encodeURIComponent(data.github)}.png`}
                              alt="Seu avatar do GitHub"
                              width={44}
                              height={44}
                              onError={(e) => {
                                e.currentTarget.src = data.avatar;
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <span>
                        Escolha seu avatar{" "}
                        <span className="font-normal text-muted-foreground">
                          · seu jeito, seu personagem
                        </span>
                      </span>
                      <div className="avatar-tabs" role="tablist" aria-label="Categorias de avatar">
                        {AVATAR_CATEGORIES.map((c) => (
                          <Button
                            role="tab"
                            aria-selected={category === c}
                            variant="ghost"
                            key={c}
                            className={`avatar-tab ${category === c ? "selected" : ""}`}
                            onClick={() => setCategory(c)}
                          >
                            {c}
                          </Button>
                        ))}
                      </div>
                      <div className="avatar-grid">
                        {Array.from({ length: avatarCount(category) }, (_, i) =>
                          avatarUrl(category, i + 1),
                        ).map((url, i) => (
                          <Button
                            key={url}
                            variant="ghost"
                            className={`avatar-option ${data.avatar === url ? "selected" : ""}`}
                            aria-label={`Escolher avatar ${category} ${i + 1}`}
                            aria-pressed={data.avatar === url}
                            onClick={() => update("avatar", url)}
                          >
                            <img src={url} alt="" width={70} height={70} loading="lazy" />
                          </Button>
                        ))}
                      </div>
                    </div>
                    <label className="field">
                      Período da faculdade
                      <select
                        className="text-input"
                        value={data.periodo}
                        onChange={(e) => {
                          const p = PERIODOS.find((p) => p === e.target.value);
                          if (p) update("periodo", p);
                        }}
                      >
                        {PERIODOS.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </label>
                    <div className="field">
                      <span>O que desperta sua curiosidade?</span>
                      <span className="field-hint">
                        Pode escolher mais de uma. E pode não saber ainda.
                      </span>
                      <div className="chip-wrap">
                        {AREAS.map((a) => (
                          <Button
                            key={a}
                            className="chip"
                            variant={data.areas.includes(a) ? "default" : "outline"}
                            aria-pressed={data.areas.includes(a)}
                            onClick={() =>
                              update(
                                "areas",
                                data.areas.includes(a)
                                  ? data.areas.filter((v) => v !== a)
                                  : [...data.areas, a],
                              )
                            }
                          >
                            {data.areas.includes(a) && <Check size={12} />} {a}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <label className="field">
                      Uma frase que é a sua cara
                      <input
                        className="text-input"
                        value={data.frase}
                        onChange={(e) => update("frase", e.target.value)}
                        maxLength={80}
                        placeholder="Café, código e bug resolvido às 3h da manhã ☕"
                      />
                      <span className="field-hint">
                        <span>Opcional. Vale um pensamento, uma piada, um café.</span>
                        <span>{data.frase.length}/80</span>
                      </span>
                    </label>
                  </>
                ) : step === 2 ? (
                  <>
                    <p className="section-kicker">ETAPA 03 · IDEIAS NO PAPEL</p>
                    <h1 className="form-heading">O que vamos criar juntos?</h1>
                    <p className="form-subtitle">
                      Sua ideia também conta. Escolha um ponto de partida para nosso projeto.
                    </p>
                    {IDEIAS.map((idea, i) => (
                      <Button
                        variant="ghost"
                        key={idea}
                        className={`choice-card ${data.ideia_projeto === idea ? "selected" : ""}`}
                        aria-pressed={data.ideia_projeto === idea}
                        onClick={() => update("ideia_projeto", idea)}
                      >
                        <span className="choice-emoji">{["🫣", "💻", "💡"][i]}</span>
                        <span>
                          {idea}
                          <small>
                            {
                              [
                                "Um lugar para conectar quem prefere o teclado.",
                                "Um espaço para mostrar o que a galera constrói.",
                                "Tem algo diferente passando aí pela sua cabeça?",
                              ][i]
                            }
                          </small>
                        </span>
                        {data.ideia_projeto === idea && <Check className="ml-auto" />}
                      </Button>
                    ))}
                    <label className="field">
                      {data.ideia_projeto === "Outra ideia"
                        ? "Conta sua ideia pra gente"
                        : "Quer acrescentar algo? (opcional)"}
                      <textarea
                        className="text-input"
                        value={data.ideia_texto}
                        maxLength={600}
                        onChange={(e) => update("ideia_texto", e.target.value)}
                        placeholder="E se nosso projeto tivesse..."
                      />
                    </label>
                    <label className="field">
                      Um nome para o projeto (opcional)
                      <input
                        className="text-input"
                        value={data.sugestao_nome}
                        maxLength={80}
                        onChange={(e) => update("sugestao_nome", e.target.value)}
                        placeholder="Todo grande projeto começa com um nome... ou não."
                      />
                      <span className="field-hint">
                        Se escolher um nome, você vai vê-lo nas prévias do próximo passo ✨
                      </span>
                    </label>
                  </>
                ) : (
                  <>
                    <p className="section-kicker">ETAPA 05 · TUDO PRONTO?</p>
                    <h1 className="form-heading">Só falta o seu primeiro gole.</h1>
                    <p className="form-subtitle">
                      Confira suas escolhas antes de entrar para a galera.
                    </p>
                    <dl className="review-list">
                      {[
                        ["Nome", data.nome],
                        ["GitHub", `@${data.github}`],
                        ["Período", data.periodo],
                        ["Áreas", data.areas.join(", ")],
                        ["Frase", data.frase || "—"],
                        ["Ideia do projeto", data.ideia_projeto],
                        ["Sua sugestão", data.ideia_texto || "—"],
                        ["Nome do projeto", data.sugestao_nome || "—"],
                        ["Estilo", STYLES.find((s) => s.id === data.estilo_artistico)?.name ?? ""],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="pr-alert pr-alert-soft" role="note">
                      <ShieldCheck size={18} />
                      <span>
                        <strong>Importante:</strong> a inscrição guarda suas escolhas, mas o seu
                        card <strong>só aparece no mural depois de um Pull Request</strong>{" "}
                        aprovado. Na próxima tela a gente te mostra o passo a passo.
                      </span>
                    </p>
                  </>
                )}
                {error && (
                  <p className="error-text" role="alert">
                    {error}
                  </p>
                )}
                {duplicate && (
                  <Button asChild variant="link">
                    <Link to="/desafio-pr" search={{ nivel: "1" }}>
                      Ir para o Desafio do PR <ArrowRight />
                    </Link>
                  </Button>
                )}
                <div className="form-controls">
                  <Button variant="ghost" disabled={saving} onClick={() => go(step - 1)}>
                    <ArrowLeft /> Voltar
                  </Button>
                  <Button
                    className="coffee-cta"
                    disabled={saving}
                    onClick={step === 4 ? submit : next}
                  >
                    {saving ? (
                      <LoaderCircle className="animate-spin" />
                    ) : step === 4 ? (
                      <Coffee />
                    ) : null}
                    {saving ? "Guardando..." : step === 4 ? "Fazer minha inscrição" : "Continuar"}
                    {!saving && <ArrowRight />}
                  </Button>
                </div>
              </section>
              <aside className="profile-preview">
                <p className="preview-label">SEU CANTINHO NO MURAL</p>
                <MemberCard member={preview} />
                <p className="preview-note">
                  Cada pessoa traz um ingrediente.
                  <br />O seu faz falta por aqui.
                </p>
                <div
                  className="cup-progress"
                  role="progressbar"
                  aria-label="Progresso da inscrição"
                  aria-valuenow={step * 20}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className={`cup-fill cup-fill-${step}`} />
                </div>
                <p className="small-note">Sua xícara está enchendo.</p>
              </aside>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function Final({
  passport,
  jsonCopiado,
  onJsonCopiado,
  onRestart,
}: {
  passport: Member;
  jsonCopiado: boolean;
  onJsonCopiado: () => void;
  onRestart: () => void;
}) {
  const members = sortMembers(
    loadMembers().filter((m) => m.github !== passport.github),
    "recentes",
  );
  const json = JSON.stringify(passport, null, 2);
  const etapas = [
    { titulo: "Inscrição feita", feito: true },
    { titulo: "Copiar seu JSON", feito: jsonCopiado },
    { titulo: "Abrir o Pull Request", feito: false },
    { titulo: "PR aprovado → card no mural 🎉", feito: false },
  ];
  const atual = etapas.findIndex((e) => !e.feito);
  return (
    <main className="content-page">
      <section className="celebration">
        <span className="celebration-icon" aria-hidden="true">
          ☕✨
        </span>
        <p className="section-kicker mt-5">INSCRIÇÃO FEITA</p>
        <h1 className="page-title">Falta só 1 passo para você aparecer no mural!</h1>
      </section>

      <section className="final-preview">
        <p className="section-subtitle">
          Assim você vai aparecer no <strong>Mural da Galera</strong> depois que o seu PR for
          aprovado:
        </p>
        <div className="member-grid">
          <MemberCard member={passport} highlight />
          {members.slice(0, 2).map((m) => (
            <MemberCard member={m} key={m.github} />
          ))}
          {Array.from({ length: Math.max(0, 2 - members.length) }, (_, i) => (
            <GhostCard key={i} />
          ))}
        </div>
        {/* Abre em nova aba para ninguém sair daqui antes de copiar o JSON */}
        <Button asChild variant="outline">
          <a href="/mural" target="_blank" rel="noopener">
            Ver mural completo (nova aba) <Users />
          </a>
        </Button>
      </section>

      <div className="pr-alert" role="alert">
        <span className="pr-alert-icon" aria-hidden="true">
          ⚠️
        </span>
        <span>
          <strong>Seu card ainda NÃO está no mural.</strong> Ele só aparece depois que você abrir um{" "}
          <strong>Pull Request</strong> com o seu JSON e alguém da liderança aprovar.{" "}
          <strong>Sem PR, sem card!</strong> 😉
        </span>
      </div>

      <ol className="pr-tracker" aria-label="Seu progresso até o mural">
        {etapas.map((e, i) => (
          <li
            key={e.titulo}
            className={e.feito ? "feito" : i === atual ? "atual" : ""}
            aria-current={i === atual ? "step" : undefined}
          >
            <span className="pr-tracker-num">{e.feito ? <Check size={14} /> : i + 1}</span>
            {e.titulo}
          </li>
        ))}
      </ol>

      <section className="final-section">
        <p className="section-kicker">PASSO 2 · COPIE SEU PASSAPORTE</p>
        <h2 className="section-heading">Seu JSON para o mural 🎫</h2>
        <p className="section-subtitle">
          Clique em <strong>Copiar</strong>. Você vai colar esse texto num arquivo no GitHub.
        </p>
        <CodeBlock text={json} json onCopy={onJsonCopiado} />
        <div className="filename-row">
          <span>Nome do arquivo:</span>
          <code>membros/{passport.github}.json</code>
          <CopyButton text={`membros/${passport.github}.json`} />
        </div>
        <FileNameWarning username={passport.github} />
      </section>

      <section className="final-section">
        <p className="section-kicker">PASSO 3 · ABRA O PULL REQUEST</p>
        <h2 className="section-heading">🏆 Desafio do 1º PR</h2>
        <p className="section-subtitle">
          É aqui que o seu card vira realidade. Escolha seu caminho:
        </p>
        <div className="journey-levels">
          {[
            {
              name: "🌱 Nível 1 — Explorador",
              steps: [
                "Faça um fork do repositório",
                "Add file → cole seu JSON",
                "Commit → abra um Pull Request",
              ],
              nivel: "1",
            },
            {
              name: "⚔️ Nível 2 — Aventureiro",
              steps: [
                "Clone seu fork e crie uma branch",
                "Crie o JSON e faça um commit",
                "Push → abra um Pull Request",
              ],
              nivel: "2",
            },
            {
              name: "🛡️ Nível 3 — Guardião",
              steps: [
                "Abra o PR de um colega",
                "Confira o JSON e as mudanças",
                "Deixe sua revisão e aprove",
              ],
              nivel: "3",
            },
          ].map((l) => (
            <article className="journey-level" key={l.nivel}>
              <h3>{l.name}</h3>
              <ol>
                {l.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <Button asChild variant="link" className="px-0">
                <Link to="/desafio-pr" search={{ nivel: l.nivel }}>
                  Ver tutorial completo <ArrowRight />
                </Link>
              </Button>
            </article>
          ))}
        </div>
        <Button asChild className="coffee-cta">
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            <Github /> Abrir o repositório e fazer meu PR 🚀
          </a>
        </Button>
        <GitWelcome />
      </section>

      <p className="restart-note">
        Esta tela fica salva neste navegador: pode voltar aqui quando quiser para copiar o JSON.{" "}
        <button type="button" className="link-button" onClick={onRestart}>
          Fazer outra inscrição
        </button>
      </p>
    </main>
  );
}
