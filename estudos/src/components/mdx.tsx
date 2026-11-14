import { isValidElement, type ComponentProps, type ReactNode } from "react";
import { Codigo } from "./codigo";
import { Aba, Abas, Dica, Memoria, Nota, Passos, Quiz, Resposta, Tarefa } from "./blocos";

function textoDe(no: ReactNode): string {
  if (typeof no === "string") return no;
  if (Array.isArray(no)) return no.map(textoDe).join("");
  if (isValidElement<{ children?: ReactNode }>(no)) return textoDe(no.props.children);
  return "";
}

/** Componentes que as aulas .mdx podem usar (e o visual dos elementos do Markdown). */
export const componentesMdx = {
  pre: ({ children }: ComponentProps<"pre">) => {
    const code = isValidElement<{ className?: string; children?: ReactNode }>(children)
      ? children
      : null;
    const linguagem = code?.props.className?.replace("language-", "") ?? "texto";
    return <Codigo codigo={textoDe(code?.props.children ?? children)} linguagem={linguagem} />;
  },
  a: ({ href, children }: ComponentProps<"a">) =>
    href?.startsWith("http") ? (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ) : (
      <a href={href}>{children}</a>
    ),
  table: (props: ComponentProps<"table">) => (
    <div className="tabela">
      <table {...props} />
    </div>
  ),
  Nota,
  Tarefa,
  Dica,
  Resposta,
  Quiz,
  Memoria,
  Passos,
  Abas,
  Aba,
};
