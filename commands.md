# LegalGen Bolivia - Comandos

## Desarrollo
```bash
# Iniciar servidor de desarrollo (http://localhost:3000)
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción (después de build)
npm start

# Verificar tipos TypeScript
npx tsc --noEmit

# Linting
npm run lint
```

## Git & GitHub
```bash
# Ver estado
git status

# Commit y push
git add -A
git commit -m "descripción del cambio"
git push

# GitHub CLI (requiere autenticación: gh auth login)
# La ruta de gh puede necesitar: export PATH="$PATH:/c/Program Files/GitHub CLI"
gh repo view victorhugohi/legalgen --web
```

## Dependencias instaladas
```bash
# Producción
npm install jspdf docx file-saver

# Desarrollo
npm install -D @types/file-saver
```

## Agregar nuevas dependencias comunes
```bash
# Base de datos (para futuro)
npm install prisma @prisma/client
npx prisma init --datasource-provider sqlite

# Autenticación (para futuro)
npm install next-auth

# Iconos
npm install lucide-react
```

## Despliegue

### Vercel (recomendado para Next.js)
```bash
npm install -g vercel
vercel
```

### GitHub Pages (estático)
```bash
# Requiere configurar next.config.ts con output: 'export'
npm run build
# Los archivos estáticos estarán en out/
```

## Solución de problemas
```bash
# Limpiar caché de Next.js
rm -rf .next

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Verificar versiones
node --version   # Debe ser v18+
npm --version
```
