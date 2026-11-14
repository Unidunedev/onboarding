import { Link } from "@tanstack/react-router";

export function NaoEncontrada() {
  return (
    <main className="nao-encontrada">
      <p className="kicker">ERRO 404</p>
      <h1>Esse pedido não está no cardápio ☕</h1>
      <p>A página não existe ou mudou de lugar.</p>
      <Link to="/" className="botao botao-trilha">
        Voltar para o cardápio
      </Link>
    </main>
  );
}
