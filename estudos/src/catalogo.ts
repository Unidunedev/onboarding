import type { ComponentType } from "react";

// Catálogo do site de estudos: as trilhas, a ordem das aulas e onde fica cada arquivo.
// Para adicionar uma aula: crie o .mdx em estudos/conteudo/<pasta>/ e coloque uma linha aqui.
// O teste catalogo.test.ts confere se cada aula listada tem o seu arquivo (e vice-versa).

export type TrilhaId = "fundamentos" | "logica" | "c" | "python" | "java";

export type Aula = {
  /** Parte final da URL: /c/ponteiros */
  slug: string;
  /** Nome do arquivo em estudos/conteudo/<pasta>/ (sem .mdx) */
  arquivo: string;
  titulo: string;
  resumo: string;
  minutos: number;
};

export type Trilha = {
  id: TrilhaId;
  nome: string;
  /** Pasta no repositório estudos (e em estudos/conteudo/) */
  pasta: string;
  grupo: "fundamentos" | "disciplinas" | "linguagens";
  bebida: string;
  emoji: string;
  frase: string;
  sobre: string;
  aprender: string[];
  /** Links para se aprofundar, mostrados no fim da última aula */
  documentacao?: { titulo: string; url: string; texto: string }[];
  /** Linguagem usada no botão "Testar" dos códigos */
  linguagem?: "c" | "python" | "java";
  aulas: Aula[];
};

export const ESTUDOS_REPO_URL = "https://github.com/unidunedev/estudos";
export const ONBOARDING_URL = "https://onboarding.unidunedev.workers.dev";

export const TESTAR_URL: Record<"c" | "python" | "java", string> = {
  c: "https://www.onlinegdb.com/online_c_compiler",
  python: "https://www.onlinegdb.com/online_python_compiler",
  java: "https://www.onlinegdb.com/online_java_compiler",
};

export const GRUPOS: { id: Trilha["grupo"]; pasta: string; titulo: string; texto: string }[] = [
  {
    id: "fundamentos",
    pasta: "fundamentos/",
    titulo: "Fundamentos",
    texto: "O que acontece por trás de qualquer linguagem.",
  },
  {
    id: "disciplinas",
    pasta: "disciplinas/",
    titulo: "Disciplinas",
    texto: "A base que vale para todas as linguagens.",
  },
  {
    id: "linguagens",
    pasta: "linguagens/",
    titulo: "Linguagens",
    texto: "Mão no código, uma linguagem por vez.",
  },
];

export const TRILHAS: Trilha[] = [
  {
    id: "fundamentos",
    nome: "Fundamentos",
    pasta: "fundamentos",
    grupo: "fundamentos",
    bebida: "Café coado",
    emoji: "☕",
    frase: "O básico de todo dia. Sem ele, nada funciona.",
    sobre:
      "Antes de escrever código, vale entender o que o computador faz com ele: memória, processador, compilador, interpretador e as mensagens de erro que vão te acompanhar para sempre.",
    aprender: [
      "Como o computador guarda e executa um programa",
      "A diferença entre linguagens compiladas e interpretadas",
      "Ler mensagens de erro sem pânico",
      "Editor, IDE e terminal: quem é quem",
    ],
    aulas: [
      {
        slug: "como-o-computador-executa",
        arquivo: "01-como-o-computador-executa",
        titulo: "Como o computador executa um programa",
        resumo: "Processador, memória e por que tudo vira número.",
        minutos: 12,
      },
      {
        slug: "linguagens-de-programacao",
        arquivo: "02-linguagens-de-programacao",
        titulo: "Linguagens de programação",
        resumo: "Alto e baixo nível, tipagem e onde cada linguagem aparece.",
        minutos: 12,
      },
      {
        slug: "compilada-ou-interpretada",
        arquivo: "03-compilada-ou-interpretada",
        titulo: "Compilada ou interpretada?",
        resumo: "Tradutor de livro × intérprete ao vivo (e o meio-termo do Java).",
        minutos: 10,
      },
      {
        slug: "sintaxe-semantica-e-erros",
        arquivo: "04-sintaxe-semantica-e-erros",
        titulo: "Sintaxe, semântica e os 3 tipos de erro",
        resumo: "Por que o programa não roda, ou roda e faz besteira.",
        minutos: 12,
      },
      {
        slug: "ambiente-de-programacao",
        arquivo: "05-ambiente-de-programacao",
        titulo: "Seu ambiente de programação",
        resumo: "Editor, IDE, terminal, PATH e IDEs online.",
        minutos: 10,
      },
    ],
  },
  {
    id: "logica",
    nome: "Lógica de programação",
    pasta: "disciplinas/logica",
    grupo: "disciplinas",
    bebida: "Chocolate quente",
    emoji: "🍫",
    frase: "Esquenta o raciocínio antes de qualquer linguagem.",
    sobre:
      "Lógica é pensar o passo a passo antes de digitar. Cada aula mostra a ideia em pseudocódigo e depois em C, Python e Java, para você ver que a lógica é a mesma e só a escrita muda.",
    aprender: [
      "Escrever algoritmos em pseudocódigo",
      "Variáveis, operadores e condicionais",
      "Laços de repetição sem medo",
      "Vetores e funções",
    ],
    aulas: [
      {
        slug: "algoritmo",
        arquivo: "01-algoritmo",
        titulo: "O que é um algoritmo",
        resumo: "Receitas, entrada → processamento → saída e teste de mesa.",
        minutos: 10,
      },
      {
        slug: "variaveis-e-tipos",
        arquivo: "02-variaveis-e-tipos",
        titulo: "Variáveis e tipos",
        resumo: "Caixinhas com etiqueta e o problema dos dois copos.",
        minutos: 12,
      },
      {
        slug: "operadores",
        arquivo: "03-operadores",
        titulo: "Operadores",
        resumo: "Contas, comparações e o famoso resto da divisão.",
        minutos: 10,
      },
      {
        slug: "condicionais",
        arquivo: "04-condicionais",
        titulo: "Condicionais",
        resumo: "Se, senão e como testar os limites.",
        minutos: 12,
      },
      {
        slug: "repeticoes",
        arquivo: "05-repeticoes",
        titulo: "Repetições",
        resumo: "Enquanto, para, contador e acumulador.",
        minutos: 15,
      },
      {
        slug: "vetores",
        arquivo: "06-vetores",
        titulo: "Vetores",
        resumo: "Um armário com gavetas numeradas a partir do zero.",
        minutos: 12,
      },
      {
        slug: "funcoes",
        arquivo: "07-funcoes",
        titulo: "Funções",
        resumo: "Máquinas de suco: entra fruta, sai suco.",
        minutos: 12,
      },
    ],
  },
  {
    id: "c",
    nome: "C",
    pasta: "linguagens/c",
    grupo: "linguagens",
    bebida: "Espresso",
    emoji: "☕",
    frase: "Curto, forte e bem pertinho da máquina.",
    linguagem: "c",
    documentacao: [
      {
        titulo: "cppreference: C",
        url: "https://en.cppreference.com/w/c",
        texto:
          "A referência mais usada de C: cada função, tipo e biblioteca, com exemplos. O C não tem um site oficial (a definição oficial é o padrão ISO, que é pago), então é aqui que os devs consultam no dia a dia.",
      },
      {
        titulo: "Manual do GNU C",
        url: "https://www.gnu.org/software/gnu-c-manual/",
        texto:
          "O manual do projeto GNU, o mesmo do compilador gcc, explicando a linguagem do começo ao fim.",
      },
    ],
    sobre:
      "C é a linguagem que mostra o que as outras escondem: memória, endereços e tipos com tamanho certo. Ela é a base do Linux, do Python e de muitas linguagens. Quem entende C entende o computador.",
    aprender: [
      "Do código ao executável: o que o gcc faz",
      "printf, scanf, if e for na prática",
      "Como as variáveis moram na memória",
      "Ponteiros sem bicho-papão",
      "Structs: o mais perto de uma classe em C",
    ],
    aulas: [
      {
        slug: "do-codigo-ao-executavel",
        arquivo: "01-do-codigo-ao-executavel",
        titulo: "Do código ao executável",
        resumo: "Seu primeiro programa e o caminho até virar .exe.",
        minutos: 12,
      },
      {
        slug: "variaveis-printf-e-scanf",
        arquivo: "02-variaveis-printf-e-scanf",
        titulo: "Variáveis, printf e scanf",
        resumo: "Guardar, mostrar e ler valores do teclado.",
        minutos: 15,
      },
      {
        slug: "tipos-e-memoria",
        arquivo: "03-tipos-e-memoria",
        titulo: "Tipos e memória",
        resumo: "Quantos bytes cabem em cada caixinha (e o que acontece quando não cabem).",
        minutos: 12,
      },
      {
        slug: "decisoes-e-repeticoes",
        arquivo: "04-decisoes-e-repeticoes",
        titulo: "Decisões e repetições",
        resumo: "if, else, switch, while e o for passo a passo.",
        minutos: 15,
      },
      {
        slug: "vetores-e-strings",
        arquivo: "05-vetores-e-strings",
        titulo: "Vetores e strings",
        resumo: "Gavetas lado a lado e o misterioso \\0.",
        minutos: 15,
      },
      {
        slug: "funcoes",
        arquivo: "06-funcoes",
        titulo: "Funções",
        resumo: "Dividir o programa em pedaços e a passagem por cópia.",
        minutos: 12,
      },
      {
        slug: "ponteiros",
        arquivo: "07-ponteiros",
        titulo: "Ponteiros",
        resumo: "Endereços, & e *, sem bicho-papão.",
        minutos: 18,
      },
      {
        slug: "structs",
        arquivo: "08-structs",
        titulo: "Structs",
        resumo: "Agrupando dados: o avô das classes.",
        minutos: 12,
      },
    ],
  },
  {
    id: "python",
    nome: "Python",
    pasta: "linguagens/python",
    grupo: "linguagens",
    bebida: "Chá gelado",
    emoji: "🧋",
    frase: "Leve, refrescante e fácil de começar.",
    linguagem: "python",
    documentacao: [
      {
        titulo: "Documentação oficial do Python",
        url: "https://docs.python.org/pt-br/3/",
        texto: "Tem versão em português! Referência completa da linguagem e da biblioteca padrão.",
      },
      {
        titulo: "Tutorial oficial do Python",
        url: "https://docs.python.org/pt-br/3/tutorial/",
        texto: "O tutorial escrito por quem mantém o Python, também em português.",
      },
    ],
    sobre:
      "Python lê quase como português (em inglês 😅). Sem ponto e vírgula, sem chaves: a indentação organiza o código. É usada em automação, dados, IA, back-end e onde mais você imaginar.",
    aprender: [
      "print, input e f-strings",
      "if, for e while com indentação",
      "Listas, dicionários e strings",
      "Funções, classes e módulos",
    ],
    aulas: [
      {
        slug: "primeiros-passos",
        arquivo: "01-primeiros-passos",
        titulo: "Primeiros passos",
        resumo: "print, input, variáveis e f-strings.",
        minutos: 12,
      },
      {
        slug: "decisoes-e-repeticoes",
        arquivo: "02-decisoes-e-repeticoes",
        titulo: "Decisões e repetições",
        resumo: "if, elif, while, for e range.",
        minutos: 15,
      },
      {
        slug: "listas-e-dicionarios",
        arquivo: "03-listas-e-dicionarios",
        titulo: "Listas e dicionários",
        resumo: "Guardar muitos valores do jeito Python.",
        minutos: 15,
      },
      {
        slug: "strings",
        arquivo: "04-strings",
        titulo: "Strings",
        resumo: "Fatiar, juntar e transformar textos.",
        minutos: 12,
      },
      {
        slug: "funcoes",
        arquivo: "05-funcoes",
        titulo: "Funções",
        resumo: "def, return e parâmetros com valor padrão.",
        minutos: 12,
      },
      {
        slug: "classes-e-objetos",
        arquivo: "06-classes-e-objetos",
        titulo: "Classes e objetos",
        resumo: "Moldes, objetos, self e herança.",
        minutos: 18,
      },
      {
        slug: "modulos-e-bibliotecas",
        arquivo: "07-modulos-e-bibliotecas",
        titulo: "Módulos e bibliotecas",
        resumo: "import, pip e não reinventar a roda.",
        minutos: 10,
      },
    ],
  },
  {
    id: "java",
    nome: "Java",
    pasta: "linguagens/java",
    grupo: "linguagens",
    bebida: "Cappuccino",
    emoji: "☕",
    frase: "Encorpado e organizado. Java é literalmente café.",
    linguagem: "java",
    documentacao: [
      {
        titulo: "Dev.java",
        url: "https://dev.java/learn/",
        texto: "O site oficial de aprendizado do Java, com trilhas do básico ao avançado.",
      },
      {
        titulo: "Documentação da API do Java 21",
        url: "https://docs.oracle.com/en/java/javase/21/docs/api/index.html",
        texto:
          "Todas as classes do Java (String, Scanner, ArrayList...) com cada método explicado.",
      },
    ],
    sobre:
      "Java organiza tudo em classes e roda em qualquer lugar que tenha a JVM. É muito usada em bancos, empresas grandes e no Android. Começa mais formal, mas ensina a organizar programas grandes.",
    aprender: [
      "A estrutura de um programa Java (e por que class Main)",
      "Tipos, Scanner, if e for",
      "Arrays, Strings e métodos",
      "Classes, objetos, herança e ArrayList",
    ],
    aulas: [
      {
        slug: "primeiro-programa",
        arquivo: "01-primeiro-programa",
        titulo: "Primeiro programa",
        resumo: "class, main, println e o caminho até a JVM.",
        minutos: 12,
      },
      {
        slug: "tipos-variaveis-e-scanner",
        arquivo: "02-tipos-variaveis-e-scanner",
        titulo: "Tipos, variáveis e Scanner",
        resumo: "Guardar valores e ler do teclado.",
        minutos: 15,
      },
      {
        slug: "decisoes-e-repeticoes",
        arquivo: "03-decisoes-e-repeticoes",
        titulo: "Decisões e repetições",
        resumo: "if, switch, while e for.",
        minutos: 12,
      },
      {
        slug: "arrays-e-strings",
        arquivo: "04-arrays-e-strings",
        titulo: "Arrays e Strings",
        resumo: "Listas de tamanho fixo e textos imutáveis.",
        minutos: 15,
      },
      {
        slug: "metodos",
        arquivo: "05-metodos",
        titulo: "Métodos",
        resumo: "Funções que moram dentro das classes.",
        minutos: 12,
      },
      {
        slug: "classes-e-objetos",
        arquivo: "06-classes-e-objetos",
        titulo: "Classes e objetos",
        resumo: "Moldes, construtores e encapsulamento.",
        minutos: 18,
      },
      {
        slug: "heranca-e-colecoes",
        arquivo: "07-heranca-e-colecoes",
        titulo: "Herança e coleções",
        resumo: "extends, @Override e ArrayList.",
        minutos: 15,
      },
    ],
  },
];

export function buscarTrilha(id: string): Trilha | undefined {
  return TRILHAS.find((t) => t.id === id);
}

export function buscarAula(trilha: Trilha, slug: string) {
  const indice = trilha.aulas.findIndex((a) => a.slug === slug);
  if (indice < 0) return undefined;
  return {
    aula: trilha.aulas[indice]!,
    indice,
    anterior: trilha.aulas[indice - 1],
    proxima: trilha.aulas[indice + 1],
  };
}

export function minutosDaTrilha(trilha: Trilha) {
  return trilha.aulas.reduce((total, a) => total + a.minutos, 0);
}

export function duracao(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h}h${m ? String(m).padStart(2, "0") : ""}` : `${m} min`;
}

export function desafiosUrl(trilha: Trilha) {
  return `${ESTUDOS_REPO_URL}/tree/main/${trilha.pasta}/desafios`;
}

/** Os arquivos .mdx são carregados só quando a aula é aberta (cada um vira um pedacinho do build). */
const ARQUIVOS = import.meta.glob<{ default: ComponentType<{ components?: object }> }>(
  "../conteudo/**/*.mdx",
);

export function carregarAula(trilha: Trilha, aula: Aula) {
  const caminho = `../conteudo/${trilha.pasta}/${aula.arquivo}.mdx`;
  return ARQUIVOS[caminho];
}

export const CAMINHOS_DOS_ARQUIVOS = Object.keys(ARQUIVOS);
