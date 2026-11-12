import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { loadMembers, sortMembers, AREAS, pageHead, type MemberSort } from "@/lib/community";
import { MemberCard, GhostCard } from "@/components/community-ui";
export const Route = createFileRoute("/mural")({
  head: () =>
    pageHead(
      "Mural da galera",
      "Conheça quem está construindo o próximo projeto da comunidade Unidunedev. Encontre colegas por nome e área de interesse.",
    ),
  component: Mural,
});
const PAGE_SIZE = 24;

function Mural() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("");
  const [sort, setSort] = useState<MemberSort>("recentes");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const reduced = useReducedMotion();
  const all = loadMembers();
  const filtered = sortMembers(all, sort).filter(
    (m) =>
      m.nome.toLocaleLowerCase("pt-BR").includes(query.toLocaleLowerCase("pt-BR")) &&
      (!area || m.areas.includes(area as (typeof AREAS)[number])),
  );
  const shown = filtered.slice(0, visible);
  return (
    <main className="content-page">
      <p className="section-kicker">GENTE DE VERDADE. APRENDIZADO COMPARTILHADO.</p>
      <h1 className="page-title">Mural da galera</h1>
      <p className="section-subtitle">
        Cada card, um primeiro passo. Cada pessoa, uma nova possibilidade.
      </p>
      {all.length > 0 && (
        <p className="mural-count">
          ☕ {all.length} {all.length === 1 ? "pessoa" : "pessoas"} na mesa
        </p>
      )}
      <div className="search-row">
        <label className="flex flex-1 items-center gap-2">
          <Search size={17} />
          <input
            className="text-input"
            aria-label="Buscar por nome"
            placeholder="Encontre alguém pelo nome..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE_SIZE);
            }}
          />
        </label>
        <select
          className="text-input"
          aria-label="Filtrar por área"
          value={area}
          onChange={(e) => {
            setArea(e.target.value);
            setVisible(PAGE_SIZE);
          }}
        >
          <option value="">Todas as áreas</option>
          {AREAS.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
        <select
          className="text-input"
          aria-label="Ordenar mural"
          value={sort}
          onChange={(e) => setSort(e.target.value === "nome" ? "nome" : "recentes")}
        >
          <option value="recentes">Mais recentes</option>
          <option value="nome">Nome (A–Z)</option>
        </select>
      </div>
      {all.length === 0 ? (
        <>
          <p className="empty-mural">O café está pronto. Os primeiros cards estão chegando! ☕</p>
          <div className="member-grid">
            <GhostCard />
            <GhostCard />
            <GhostCard />
          </div>
          <Button asChild className="coffee-cta">
            <Link to="/">
              Quero fazer parte <ArrowRight />
            </Link>
          </Button>
        </>
      ) : filtered.length === 0 ? (
        <p className="empty-mural">
          Nenhum colega encontrado com esse filtro. Que tal tentar outro?
        </p>
      ) : (
        <>
          <div className="member-grid">
            {shown.map((m, i) => (
              <motion.div
                key={m.github}
                initial={reduced ? false : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % PAGE_SIZE) * 0.04 }}
              >
                <MemberCard member={m} />
              </motion.div>
            ))}
          </div>
          {filtered.length > visible && (
            <div className="mural-more">
              <Button variant="outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                Ver mais galera ({filtered.length - visible} restantes)
              </Button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
