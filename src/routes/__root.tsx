import {
  HeadContent,
  Link,
  Outlet,
  createRootRoute,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";

import { Footer, Header } from "@/components/community-ui";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
});

function RootComponent() {
  return (
    <>
      {/* Atualiza <title> e <meta> com o head() de cada rota */}
      <HeadContent />
      <div className="shell">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

function NotFound() {
  return (
    <main className="content-page" style={{ textAlign: "center" }}>
      <p className="section-kicker">ERRO 404</p>
      <h1 className="page-title">Essa página derramou o café ☕</h1>
      <p className="section-subtitle">O endereço não existe ou mudou de lugar.</p>
      <p style={{ marginTop: 24 }}>
        <Link to="/">Voltar para o início</Link>
      </p>
    </main>
  );
}

function ErrorPage({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  console.error(error);

  return (
    <main className="content-page" style={{ textAlign: "center" }}>
      <p className="section-kicker">ALGO DEU ERRADO</p>
      <h1 className="page-title">Essa página não carregou</h1>
      <p className="section-subtitle">Tente de novo ou volte para o início.</p>
      <p style={{ marginTop: 24, display: "flex", gap: 16, justifyContent: "center" }}>
        <button
          type="button"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Tentar de novo
        </button>
        <Link to="/">Voltar para o início</Link>
      </p>
    </main>
  );
}
