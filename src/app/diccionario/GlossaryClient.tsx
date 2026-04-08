"use client";

import { useState, useMemo } from "react";
import {
  GlossaryTerm,
  GlossaryCategory,
  GLOSSARY_CATEGORIES,
} from "@/lib/glossary/types";
import { GLOSSARY_TERMS } from "@/lib/glossary/terms";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GlossaryClient() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<GlossaryCategory | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  const filteredTerms = useMemo(() => {
    let terms = GLOSSARY_TERMS;

    if (search) {
      const q = search.toLowerCase();
      terms = terms.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.simpleDefinition.toLowerCase().includes(q) ||
          t.legalDefinition.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      terms = terms.filter((t) => t.category === selectedCategory);
    }

    if (selectedLetter) {
      terms = terms.filter((t) =>
        t.term.toUpperCase().startsWith(selectedLetter!)
      );
    }

    return terms;
  }, [search, selectedCategory, selectedLetter]);

  const availableLetters = useMemo(() => {
    const letters = new Set(GLOSSARY_TERMS.map((t) => t.term[0].toUpperCase()));
    return letters;
  }, []);

  const handleTermClick = (term: GlossaryTerm) => {
    setSelectedTerm(selectedTerm?.id === term.id ? null : term);
  };

  const handleRelatedClick = (termId: string) => {
    const term = GLOSSARY_TERMS.find((t) => t.id === termId);
    if (term) {
      setSelectedTerm(term);
      setSearch("");
      setSelectedCategory(null);
      setSelectedLetter(null);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedLetter(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Diccionario Jurídico Boliviano
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Términos legales esenciales para estudiantes de Derecho. Definiciones
            claras, ejemplos en contexto y presencia en la legislación boliviana.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                placeholder="Buscar término legal..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedLetter(null);
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 mt-6 text-sm text-gray-300">
            <span>
              <strong className="text-white">{GLOSSARY_TERMS.length}</strong>{" "}
              términos
            </span>
            <span>
              <strong className="text-white">
                {Object.keys(GLOSSARY_CATEGORIES).length}
              </strong>{" "}
              categorías
            </span>
            <span>
              <strong className="text-white">{filteredTerms.length}</strong>{" "}
              resultados
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Filtrar por categoría
          </h2>
          <div className="flex flex-wrap gap-2">
            {(
              Object.entries(GLOSSARY_CATEGORIES) as [
                GlossaryCategory,
                (typeof GLOSSARY_CATEGORIES)[GlossaryCategory],
              ][]
            ).map(([key, cat]) => {
              const count = GLOSSARY_TERMS.filter(
                (t) => t.category === key
              ).length;
              if (count === 0) return null;
              return (
                <button
                  key={key}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === key ? null : key
                    )
                  }
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === key
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-white border border-gray-200 text-gray-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  }`}
                >
                  {cat.icon} {cat.label}
                  <span className="ml-1 text-xs opacity-70">({count})</span>
                </button>
              );
            })}
            {(selectedCategory || selectedLetter || search) && (
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Alphabet */}
        <div className="mb-6 flex flex-wrap gap-1">
          {ALPHABET.map((letter) => {
            const hasTerms = availableLetters.has(letter);
            const isActive = selectedLetter === letter;
            return (
              <button
                key={letter}
                onClick={() => {
                  if (hasTerms) {
                    setSelectedLetter(isActive ? null : letter);
                    setSearch("");
                  }
                }}
                disabled={!hasTerms}
                className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-[var(--color-primary)] text-white"
                    : hasTerms
                      ? "bg-white border border-gray-200 text-gray-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                      : "bg-gray-100 text-gray-300 cursor-not-allowed"
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Terms List */}
        <div className="space-y-3">
          {filteredTerms.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">No se encontraron términos</p>
              <p className="text-sm">
                Intenta con otra búsqueda o cambia los filtros.
              </p>
            </div>
          )}

          {filteredTerms.map((term) => {
            const isExpanded = selectedTerm?.id === term.id;
            const cat = GLOSSARY_CATEGORIES[term.category];

            return (
              <div
                key={term.id}
                className={`bg-white rounded-xl border transition-all ${
                  isExpanded
                    ? "border-[var(--color-primary)] shadow-lg"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                {/* Term Header */}
                <button
                  onClick={() => handleTermClick(term)}
                  className="w-full text-left p-4 sm:p-5 flex items-start gap-4"
                >
                  <span className="text-2xl shrink-0">{cat.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-gray-900">
                        {term.term}
                      </h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {cat.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {term.simpleDefinition}
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 shrink-0 mt-1 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 border-t border-gray-100 pt-4">
                    {/* Legal Definition */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-[var(--color-primary)] mb-1">
                        Definición jurídica
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {term.legalDefinition}
                      </p>
                    </div>

                    {/* Example */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-[var(--color-primary)] mb-1">
                        Ejemplo de uso
                      </h4>
                      <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-lg">
                        <p className="text-sm text-gray-700 italic leading-relaxed">
                          &ldquo;{term.example}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Etymology */}
                    {term.etymology && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-[var(--color-primary)] mb-1">
                          Etimología
                        </h4>
                        <p className="text-sm text-gray-600">
                          {term.etymology}
                        </p>
                      </div>
                    )}

                    {/* Law Presence */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-[var(--color-primary)] mb-2">
                        Presencia en la legislación boliviana
                      </h4>
                      <div className="space-y-2">
                        {term.lawPresence.map((lp) => (
                          <div key={lp.shortName}>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span
                                className="font-medium text-gray-700"
                                title={lp.law}
                              >
                                {lp.shortName}
                              </span>
                              <span className="text-gray-500">
                                {lp.percentage}%
                                {lp.articles && lp.articles.length > 0 && (
                                  <span className="ml-1">
                                    ({lp.articles.length}{" "}
                                    {lp.articles.length === 1
                                      ? "artículo"
                                      : "artículos"}
                                    )
                                  </span>
                                )}
                              </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all duration-500"
                                style={{
                                  width: `${lp.percentage}%`,
                                  backgroundColor:
                                    lp.percentage > 50
                                      ? "var(--color-primary)"
                                      : lp.percentage > 20
                                        ? "var(--color-accent)"
                                        : "#94a3b8",
                                }}
                              />
                            </div>
                            {lp.articles && lp.articles.length > 0 && (
                              <p className="text-[11px] text-gray-400 mt-0.5">
                                Arts. {lp.articles.join(", ")}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Related Terms */}
                    {term.relatedTerms.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-[var(--color-primary)] mb-2">
                          Términos relacionados
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {term.relatedTerms.map((relId) => {
                            const relTerm = GLOSSARY_TERMS.find(
                              (t) => t.id === relId
                            );
                            if (!relTerm) return null;
                            return (
                              <button
                                key={relId}
                                onClick={() => handleRelatedClick(relId)}
                                className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                              >
                                {relTerm.term}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200 text-center">
          <p className="text-xs text-amber-800">
            <strong>Nota:</strong> Este diccionario es una herramienta
            educativa para estudiantes de Derecho. Las definiciones están basadas
            en la legislación boliviana vigente pero no sustituyen la consulta
            directa de las leyes ni el asesoramiento profesional. Los porcentajes
            de presencia son estimaciones basadas en la relevancia del término en
            cada cuerpo normativo.
          </p>
        </div>
      </div>
    </div>
  );
}
