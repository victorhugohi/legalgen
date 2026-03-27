# LegalGen Bolivia - Stack Tecnológico

## Frontend
| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Next.js | 16.2.1 | Framework React con App Router, SSG, SSR |
| React | 19.x | Librería UI |
| TypeScript | 5.x | Tipado estático |
| Tailwind CSS | 4.x | Estilos utilitarios (via @tailwindcss/postcss) |

## Generación de documentos
| Librería | Uso |
|----------|-----|
| jsPDF | Generación de PDF en el navegador |
| docx | Generación de archivos .docx (Word) |
| file-saver | Descarga de archivos desde el navegador |

## Almacenamiento (V1)
| Tecnología | Uso |
|-----------|-----|
| localStorage | Tracking de uso semanal, email del usuario, estado admin |

## Infraestructura
| Servicio | Uso |
|----------|-----|
| GitHub | Repositorio: victorhugohi/legalgen |
| Vercel (futuro) | Hosting del frontend |

## Fuentes de ley referenciadas
| Legislación | Artículos |
|------------|-----------|
| Código Civil Boliviano (D.L. 12760, 1975) | Arts. 450-949 (contratos) |
| Código de Comercio (D.L. 14379, 1977) | Arts. 125-440 (sociedades) |
| Ley General del Trabajo (1942) | Contratos laborales |
| CPE Bolivia (2009) | Arts. 46-55 (derechos laborales) |
| Ley 164 de Telecomunicaciones (2011) | Firma digital |
| Ley 708 de Conciliación y Arbitraje (2015) | Cláusulas arbitrales |
| Ley del Notariado Plurinacional (Ley 483, 2014) | Requisitos notariales |

## Contratos implementados (15)

### Inmobiliario
1. **Alquiler/Arrendamiento** — Arts. 685-714 CC — Free
2. **Anticrético** — Arts. 1429-1440 CC — Free (requiere escritura pública)
3. **Compraventa Inmueble** — Arts. 584-618 CC — Free (requiere escritura pública)

### Civil
4. **Compraventa Vehículo** — Arts. 584-618 CC — Free
5. **Préstamo de Dinero** — Arts. 872-902 CC — Free
6. **Comodato** — Arts. 858-871 CC — Premium
7. **Permuta** — Arts. 651-655 CC — Premium
8. **Donación** — Arts. 655-684 CC — Premium
9. **Fianza** — Arts. 916-949 CC — Premium

### Laboral
10. **Contrato de Trabajo** — Ley General del Trabajo — Free
11. **Prestación de Servicios** — Arts. 732-756 CC — Free

### Comercial
12. **Confidencialidad (NDA)** — Arts. 450+ CC — Premium
13. **Sociedad S.R.L.** — Código de Comercio Arts. 195-216 — Premium
14. **Obra/Construcción** — Arts. 732-749 CC — Premium
15. **Poder Notarial** — Arts. 804-840 CC — Premium (requiere escritura pública)

## Roadmap técnico (pendiente)
- [ ] Base de datos SQLite + Prisma (reemplazar localStorage)
- [ ] Autenticación real con NextAuth
- [ ] Verificación de pagos vía WhatsApp (manual V1)
- [ ] Deploy en Vercel
- [ ] Más tipos de contrato (transporte, franquicia, distribución)
- [ ] Revisión legal por abogado boliviano
- [ ] Generación con IA para cláusulas personalizadas
