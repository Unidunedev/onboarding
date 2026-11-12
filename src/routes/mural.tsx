import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { loadMembers, AREAS, pageHead } from "@/lib/community";
import { MemberCard, GhostCard } from "@/components/community-ui";
export const Route = createFileRoute("/mural")({
  head: () =>
    pageHead(
      "Mural da galera",
      "Conheça quem está construindo o próximo projeto da comunidade Unidunedev. Encontre colegas por nome e área de interesse.",
    ),
  component: Mural,
});
function Mural() {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("");
  const reduced = useReducedMotion();
  const all = loadMembers();
  const filtered = all.filter(
    (m) =>
      m.nome.toLocaleLowerCase("pt-BR").includes(query.toLocaleLowerCase("pt-BR")) &&
      (!area || m.areas.includes(area as (typeof AREAS)[number])),
  );
  return (
    <main className="content-page">
      <p className="section-kicker">GENTE DE VERDADE. APRENDIZADO COMPARTILHADO.</p>
      <h1 className="page-title">Mural da galera</h1>
      <p className="section-subtitle">
        Cada card, um primeiro passo. Cada pessoa, uma nova possibilidade.
      </p>
      <div className="search-row">
        <label className="flex flex-1 items-center gap-2">
          <Search size={17} />
          <input
            className="text-input"
            aria-label="Buscar por nome"
            placeholder="Encontre alguém pelo nome..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <select
          className="text-input"
          aria-label="Filtrar por área"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        >
          <option value="">Todas as áreas</option>
          {AREAS.map((a) => (
            <option key={a}>{a}</option>
          ))}
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
        <div className="member-grid">
          {filtered.map((m, i) => (
            <motion.div
              key={m.github}
              initial={reduced ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <MemberCard member={m} />
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
