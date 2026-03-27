@AGENTS.md

# LegalGen Bolivia

Legal contract generator for Bolivia. Spanish UI, Next.js 14 + Tailwind + TypeScript.

## Quick reference
- `npm run dev` — start dev server
- `npm run build` — production build
- See `files.md`, `commands.md`, `tools.md`, `memory.md` for full docs

## Architecture
- Client-side rendering with Next.js App Router (SSG)
- 15 contract types defined in `src/lib/contracts/types.ts`
- Contract templates (legal text) in `src/lib/contracts/templates.ts`
- PDF/DOCX generation in `src/lib/generators/`
- Free tier tracking in `src/lib/usage.ts` (localStorage)
- Admin code: `LEGALGEN-ADMIN-2026`

## Adding a new contract
1. Add contract definition to `src/lib/contracts/types.ts` (fields, category, legal basis)
2. Add template function to `src/lib/contracts/templates.ts`
3. Add case to the `generateContractText()` switch
4. Build verifies automatically via `generateStaticParams`

## Conventions
- All UI text in Spanish
- Legal references cite Bolivian Civil Code articles
- Party identification includes: nombre, CI, nacionalidad, estado civil, profesión, domicilio
- Currency in Bs. (bolivianos) or $us. (dólares americanos)
- Amounts shown in numbers AND words (numberToWords function)
