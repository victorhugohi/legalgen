# LegalGen Bolivia - Estructura de Archivos

## Raíz del proyecto
```
d:\hello\legalgen\
├── package.json          # Dependencias y scripts npm
├── next.config.ts        # Configuración de Next.js
├── tsconfig.json         # Configuración TypeScript
├── postcss.config.mjs    # PostCSS para Tailwind
├── eslint.config.mjs     # Configuración ESLint
├── CLAUDE.md             # Instrucciones para Claude Code
├── AGENTS.md             # Guía de agentes para Next.js
├── files.md              # Este archivo
├── commands.md           # Comandos útiles
├── tools.md              # Stack tecnológico
├── memory.md             # Contexto del proyecto para continuar
├── research/             # Investigación (no se sube a git)
│   ├── market-research.md
│   ├── legal-framework.md
│   └── contract-types.md
└── src/                  # Código fuente
```

## Código fuente (`src/`)

### App (Next.js App Router)
```
src/app/
├── layout.tsx            # Layout principal (header, footer, metadata en español)
├── page.tsx              # Landing page (hero, cómo funciona, contratos, precios)
├── globals.css           # Estilos globales + utilidades Tailwind (btn-primary, input-field, card)
├── favicon.ico
└── generar/
    └── [tipo]/
        └── page.tsx      # Página dinámica de generación de contrato (SSG con generateStaticParams)
```

### Componentes
```
src/components/
├── Header.tsx            # Barra de navegación sticky con menú móvil hamburguesa
├── Footer.tsx            # Pie de página con aviso legal
├── ContractCard.tsx      # Tarjeta de contrato para la landing (link a /generar/[tipo])
└── ContractForm.tsx      # Formulario dinámico + vista previa + descarga PDF/DOCX + sistema de uso
```

### Librería / Lógica de negocio
```
src/lib/
├── usage.ts              # Sistema de free tier (localStorage, 3+3/semana, admin bypass)
├── contracts/
│   ├── types.ts          # Definición de 15 tipos de contrato, campos, categorías, departamentos
│   └── templates.ts      # Generadores de texto legal para cada contrato (funciones puras)
└── generators/
    ├── pdf.ts            # Generación de PDF con jsPDF (header, footer, watermark)
    └── docx.ts           # Generación de Word con docx.js (headers, footers, estilos)
```

## Archivos clave para modificar

| Tarea | Archivo(s) |
|-------|-----------|
| Agregar nuevo contrato | `types.ts` (campos) + `templates.ts` (texto legal) |
| Cambiar diseño/UI | `globals.css` + componentes en `src/components/` |
| Modificar landing page | `src/app/page.tsx` |
| Cambiar límites free tier | `src/lib/usage.ts` (constantes al inicio) |
| Cambiar código admin | `src/lib/usage.ts` → `ADMIN_CODE` |
| Modificar generación PDF | `src/lib/generators/pdf.ts` |
| Modificar generación Word | `src/lib/generators/docx.ts` |
| Agregar nueva página/ruta | `src/app/nueva-ruta/page.tsx` |
