export interface LawPresence {
  law: string;
  shortName: string;
  percentage: number;
  articles?: string[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  category: GlossaryCategory;
  simpleDefinition: string;
  legalDefinition: string;
  example: string;
  lawPresence: LawPresence[];
  relatedTerms: string[]; // IDs of related terms
  etymology?: string;
}

export type GlossaryCategory =
  | "obligaciones"
  | "contratos"
  | "derechos_reales"
  | "sucesiones"
  | "familia"
  | "procesal"
  | "comercial"
  | "laboral"
  | "penal"
  | "constitucional";

export const GLOSSARY_CATEGORIES: Record<
  GlossaryCategory,
  { label: string; icon: string; description: string }
> = {
  obligaciones: {
    label: "Obligaciones",
    icon: "⚖️",
    description: "Vínculos jurídicos entre acreedor y deudor",
  },
  contratos: {
    label: "Contratos",
    icon: "📝",
    description: "Acuerdos de voluntad con efectos jurídicos",
  },
  derechos_reales: {
    label: "Derechos Reales",
    icon: "🏠",
    description: "Derechos sobre bienes muebles e inmuebles",
  },
  sucesiones: {
    label: "Sucesiones",
    icon: "📜",
    description: "Herencia y transmisión de patrimonio",
  },
  familia: {
    label: "Familia",
    icon: "👨‍👩‍👧",
    description: "Relaciones familiares y matrimonio",
  },
  procesal: {
    label: "Procesal",
    icon: "🏛️",
    description: "Procedimientos y acciones judiciales",
  },
  comercial: {
    label: "Comercial",
    icon: "🏢",
    description: "Actividades mercantiles y societarias",
  },
  laboral: {
    label: "Laboral",
    icon: "💼",
    description: "Relaciones de trabajo y seguridad social",
  },
  penal: {
    label: "Penal",
    icon: "⚠️",
    description: "Delitos y sanciones penales",
  },
  constitucional: {
    label: "Constitucional",
    icon: "🇧🇴",
    description: "Derechos fundamentales y organización del Estado",
  },
};

export const BOLIVIAN_LAWS = [
  { shortName: "CC", fullName: "Código Civil (D.L. 12760)" },
  { shortName: "CCom", fullName: "Código de Comercio (D.L. 14379)" },
  { shortName: "CP", fullName: "Código Penal" },
  { shortName: "LGT", fullName: "Ley General del Trabajo" },
  { shortName: "CPE", fullName: "Constitución Política del Estado (2009)" },
  { shortName: "CPC", fullName: "Código Procesal Civil (Ley 439)" },
  { shortName: "CF", fullName: "Código de las Familias (Ley 603)" },
  { shortName: "LSF", fullName: "Ley de Servicios Financieros (Ley 393)" },
  { shortName: "CPP", fullName: "Código de Procedimiento Penal (Ley 1970)" },
  { shortName: "LAC", fullName: "Ley de Arbitraje y Conciliación (Ley 708)" },
];
