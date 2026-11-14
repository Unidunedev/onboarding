import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github, Heart } from "lucide-react";
import { Logo } from "@/components/logo";
import { ESTUDOS_REPO_URL, ONBOARDING_URL } from "../catalogo";

export function Cabecalho() {
  return (
    <header className="cabecalho">
      <Link to="/" className="cabecalho-marca" aria-label="Estudos Unidunedev, início">
        <Logo size={36} />
        <span className="cabecalho-selo">estudos</span>
      </Link>
      <nav className="cabecalho-nav">
        <Link to="/" activeOptions={{ exact: true }} className="nav-inicio">
          Cardápio
        </Link>
        <a href={ESTUDOS_REPO_URL} target="_blank" rel="noreferrer">
          <Github size={15} /> <span>Desafios</span>
        </a>
        <a href={ONBOARDING_URL} target="_blank" rel="noreferrer" className="nav-comunidade">
          Comunidade <ArrowUpRight size={13} />
        </a>
      </nav>
    </header>
  );
}

export function Rodape() {
  return (
    <footer className="rodape">
      <span>Feito com café, código e vontade de aprender.</span>
      <span>
        Achou um erro ou quer escrever uma aula? Abra um PR no{" "}
        <a href="https://github.com/unidunedev/onboarding" target="_blank" rel="noreferrer">
          repositório
        </a>{" "}
        <Heart size={12} />
      </span>
    </footer>
  );
}
