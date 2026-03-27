"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[var(--color-primary)] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[var(--color-accent)] rounded-lg flex items-center justify-center font-bold text-[var(--color-primary-dark)] text-lg">
              LG
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">LegalGen</h1>
              <p className="text-xs text-gray-300 leading-tight">Bolivia</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/#contratos"
              className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
            >
              Contratos
            </Link>
            <Link
              href="/#precios"
              className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
            >
              Precios
            </Link>
            <Link
              href="/#como-funciona"
              className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
            >
              ¿Cómo funciona?
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Abrir menú"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-white/20 pt-3 flex flex-col gap-3">
            <Link
              href="/"
              className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/#contratos"
              className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Contratos
            </Link>
            <Link
              href="/#precios"
              className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Precios
            </Link>
            <Link
              href="/#como-funciona"
              className="text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              ¿Cómo funciona?
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
