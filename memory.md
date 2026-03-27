# LegalGen Bolivia - Contexto del Proyecto

## Qué es
Generador de contratos legales para Bolivia. Webapp en español donde el usuario llena un formulario y obtiene un contrato en PDF o Word basado en la legislación boliviana vigente.

## Estado actual (v1 - MVP)
- 15 tipos de contrato implementados con templates legales completos
- UI responsive en español con Tailwind CSS
- Generación PDF (jsPDF) y Word (docx)
- Free tier: 3 básicos + 3 con marca de agua por semana (localStorage)
- Admin bypass con código: `LEGALGEN-ADMIN-2026`
- Repo: https://github.com/victorhugohi/legalgen
- No hay deploy aún — solo local con `npm run dev`

## Decisiones tomadas
- **No hay backend/BD real en V1** — todo es client-side con localStorage
- **No se aplica paywall en V1** — foco en calidad de documentos
- **Pagos manuales** — depósito bancario + WhatsApp (futuro)
- **Sin auth real** — solo email como identificador
- **Campos legales completos** — nombre, CI, nacionalidad, estado civil, profesión, domicilio (Art. 452 CC)
- **Mobile-first** — la mayoría de bolivianos acceden desde smartphone

## Investigación completada
Los archivos en `research/` contienen:
- `market-research.md` — No hay competidores en Bolivia, anticrético es diferenciador
- `legal-framework.md` — Código Civil, requisitos de notarización, formato CI
- `contract-types.md` — 15 tipos con base legal, requisitos de formalidad

## Próximos pasos sugeridos
1. **Deploy** — Vercel o GitHub Pages para testing en móviles
2. **Testing legal** — Revisar contratos con abogado boliviano
3. **Base de datos** — Migrar de localStorage a SQLite/Prisma
4. **Autenticación** — NextAuth con email magic link
5. **Más contratos** — Transporte, franquicia, distribución, testamento
6. **WhatsApp flow** — Verificación manual de recibos de pago
7. **IA** — Cláusulas personalizadas con Claude API

## Credenciales y accesos
- GitHub: victorhugohi (autenticado vía gh CLI)
- Admin code: `LEGALGEN-ADMIN-2026` (cambiar en `src/lib/usage.ts` → ADMIN_CODE)
- Admin emails: admin@legalgen.bo, victor@legalgen.bo (cambiar en mismo archivo)
