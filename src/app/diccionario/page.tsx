import { Metadata } from "next";
import GlossaryClient from "./GlossaryClient";

export const metadata: Metadata = {
  title: "Diccionario Jurídico Boliviano - LegalGen Bolivia",
  description:
    "Diccionario de términos legales bolivianos para estudiantes de Derecho. Definiciones, ejemplos, artículos de ley y frecuencia de uso en la legislación boliviana.",
  keywords:
    "diccionario jurídico Bolivia, términos legales, glosario derecho boliviano, estudiantes de derecho, Código Civil Bolivia",
};

export default function DiccionarioPage() {
  return <GlossaryClient />;
}
