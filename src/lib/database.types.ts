// Tipos da tabela public.inscricoes (supabase/migrations/0001_inscricoes.sql).
export type Database = {
  public: {
    Tables: {
      inscricoes: {
        Row: {
          id: string;
          created_at: string;
          github_username: string;
          nome: string;
          avatar: string;
          periodo: string;
          areas: string[];
          frase: string;
          ideia_projeto: string;
          ideia_texto: string;
          sugestao_nome: string;
          estilo_artistico: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          github_username: string;
          nome: string;
          avatar: string;
          periodo: string;
          areas: string[];
          frase?: string;
          ideia_projeto: string;
          ideia_texto?: string;
          sugestao_nome?: string;
          estilo_artistico: string;
        };
        Update: Partial<Database["public"]["Tables"]["inscricoes"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
