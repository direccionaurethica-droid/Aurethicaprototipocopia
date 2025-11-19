# 🚀 Guía de Deployment - Auréthica

Guía completa para desplegar Auréthica en producción.

---

## 📋 Tabla de Contenidos

- [Pre-requisitos](#pre-requisitos)
- [Vercel (Recomendado)](#vercel-recomendado)
- [Netlify](#netlify)
- [GitHub Pages](#github-pages)
- [Variables de Entorno](#variables-de-entorno)
- [Optimización](#optimización)
- [Troubleshooting](#troubleshooting)

---

## ✅ Pre-requisitos

Antes de desplegar, asegúrate de:

- [ ] Proyecto en GitHub
- [ ] Build funciona localmente (`npm run build`)
- [ ] Sin errores de TypeScript (`npm run type-check`)
- [ ] Variables de entorno configuradas
- [ ] Dominio personalizado (opcional)

---

## 🌐 Vercel (Recomendado)

Vercel es la opción más sencilla para proyectos Vite + React.

### Paso 1: Crear Cuenta

1. Ve a https://vercel.com/
2. Click en **"Sign Up"**
3. Conecta con tu cuenta de GitHub

### Paso 2: Importar Proyecto

1. Click en **"Add New"** → **"Project"**
2. Selecciona tu repositorio `aurethica-app`
3. Vercel detectará automáticamente que es un proyecto Vite

### Paso 3: Configurar Build

Vercel auto-detecta, pero verifica:

```bash
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Paso 4: Variables de Entorno

1. En **"Environment Variables"** añade:
   ```
   VITE_SUPABASE_URL=tu-url
   VITE_SUPABASE_ANON_KEY=tu-key
   VITE_API_KEY=tu-api-key
   ```

2. Configura para todos los entornos:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

### Paso 5: Deploy

1. Click en **"Deploy"**
2. Espera ~2 minutos
3. ¡Listo! Tu app está en `https://aurethica-app.vercel.app`

### Configuración Avanzada

Crea `vercel.json` en la raíz:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Deploy Automático

Cada push a `main` despliega automáticamente:

```bash
git add .
git commit -m "✨ Feat: Nueva funcionalidad"
git push
# Vercel despliega automáticamente
```

---

## 🌈 Netlify

Alternativa popular a Vercel.

### Paso 1: Crear Cuenta

1. Ve a https://netlify.com/
2. Sign up con GitHub

### Paso 2: New Site from Git

1. Click **"Add new site"** → **"Import an existing project"**
2. Conecta GitHub
3. Selecciona `aurethica-app`

### Paso 3: Build Settings

```bash
Build command: npm run build
Publish directory: dist
```

### Paso 4: Deploy

Click en **"Deploy site"**

### Variables de Entorno

1. Site settings → Environment Variables
2. Añade tus variables con prefijo `VITE_`

### Configuración Netlify

Crea `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## 📄 GitHub Pages

Gratis para proyectos públicos.

### Paso 1: Instalar gh-pages

```bash
npm install --save-dev gh-pages
```

### Paso 2: Configurar package.json

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://TU-USUARIO.github.io/aurethica-app"
}
```

### Paso 3: Configurar Vite

Actualiza `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/aurethica-app/', // Nombre de tu repo
  // ... resto de config
});
```

### Paso 4: Deploy

```bash
npm run deploy
```

Tu app estará en: `https://TU-USUARIO.github.io/aurethica-app`

### Configurar Dominio Personalizado

1. Settings → Pages → Custom domain
2. Añade tu dominio
3. Configura DNS:
   ```
   Type: CNAME
   Name: www
   Value: TU-USUARIO.github.io
   ```

---

## 🔐 Variables de Entorno

### Desarrollo

Crea `.env.local`:

```bash
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=dev-key
VITE_API_KEY=dev-api-key
```

### Staging

En tu plataforma de deploy, añade variables para staging:

```bash
VITE_SUPABASE_URL=https://staging.supabase.co
VITE_SUPABASE_ANON_KEY=staging-key
VITE_API_KEY=staging-api-key
```

### Producción

Variables de producción (¡NUNCA las subas a Git!):

```bash
VITE_SUPABASE_URL=https://prod.supabase.co
VITE_SUPABASE_ANON_KEY=prod-key
VITE_API_KEY=prod-api-key
```

### Uso en el Código

```typescript
const apiUrl = import.meta.env.VITE_API_KEY;

// Verifica que existe
if (!apiUrl) {
  throw new Error('VITE_API_KEY no está configurada');
}
```

---

## ⚡ Optimización

### Build Optimization

En `vite.config.ts`:

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react', 'motion'],
          'radix-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            // ... otros
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
```

### Lazy Loading

Para rutas:

```typescript
import { lazy, Suspense } from 'react';

const LandingPage = lazy(() => import('./pages/LandingPage'));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LandingPage />
    </Suspense>
  );
}
```

### Image Optimization

```typescript
// Usar OptimizedImage component
import { OptimizedImage } from './components/OptimizedImage';

<OptimizedImage 
  src="imagen.jpg" 
  alt="Descripción"
  width={800}
  height={600}
/>
```

### PWA Optimization

Ya configurado en `vite.config.ts` con `vite-plugin-pwa`.

---

## 🌍 Dominio Personalizado

### Comprar Dominio

Opciones:
- Namecheap
- Google Domains
- GoDaddy

### Configurar DNS

En tu proveedor de DNS:

#### Para Vercel
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

#### Para Netlify
```
Type: CNAME
Name: @
Value: tu-sitio.netlify.app
```

### SSL/HTTPS

Tanto Vercel como Netlify proveen SSL gratis automáticamente.

---

## 🔍 Monitoreo

### Analytics

#### Google Analytics

1. Crea propiedad en https://analytics.google.com
2. Añade el código en `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### Vercel Analytics

```bash
npm install @vercel/analytics
```

```typescript
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

### Error Tracking

#### Sentry

```bash
npm install @sentry/react
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-dsn",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

---

## 🐛 Troubleshooting

### Build Falla

```bash
# Limpiar y rebuild
rm -rf node_modules dist
npm install
npm run build
```

### 404 en Rutas

Asegúrate de tener configurado el rewrite para SPA:

**Vercel**: `vercel.json` con rewrites  
**Netlify**: `netlify.toml` con redirects  
**GitHub Pages**: Usa hash router

### Variables de Entorno No Funcionan

- ✅ Deben empezar con `VITE_`
- ✅ Reinicia el servidor después de cambiarlas
- ✅ En producción, configúralas en el dashboard de tu plataforma

### Imágenes No Cargan

- Verifica las rutas (usa rutas absolutas `/imagen.jpg`)
- Para imágenes en `/public`, usa directamente `/imagen.jpg`
- Para imágenes importadas, usa `import img from './img.jpg'`

### Build es Muy Grande

- Usa lazy loading
- Optimiza imágenes
- Configura code splitting
- Analiza bundle: `npm run build -- --report`

---

## 📊 Checklist Pre-Deploy

- [ ] Build local exitoso
- [ ] No hay errores en consola
- [ ] Todas las rutas funcionan
- [ ] Imágenes cargan correctamente
- [ ] Variables de entorno configuradas
- [ ] PWA funciona (offline)
- [ ] Responsive en móvil
- [ ] Performance > 90 en Lighthouse
- [ ] SEO optimizado
- [ ] Accesibilidad verificada

---

## 🎯 Ambientes

### Estructura Recomendada

```
production  (main)       → aurethica.com
staging     (staging)    → staging.aurethica.com
development (dev)        → dev.aurethica.com
```

### Workflow

```bash
# Development
git checkout development
git push
# Auto-deploy a dev.aurethica.com

# Staging (antes de producción)
git checkout staging
git merge development
git push
# Auto-deploy a staging.aurethica.com

# Production (solo después de testing en staging)
git checkout main
git merge staging
git push
# Auto-deploy a aurethica.com
```

---

## 🚀 Deploy Completo

### Comando Final

```bash
# 1. Verificar todo
npm run type-check
npm run lint
npm run build
npm run preview

# 2. Commit y push
git add .
git commit -m "🚀 Deploy: Versión 1.0.0"
git push

# 3. Tag de versión
git tag v1.0.0
git push --tags

# 4. Deploy automático (si está configurado)
# O manualmente en tu plataforma
```

---

<div align="center">

**¡Tu app Auréthica está lista para el mundo!** 🌍

🎉 Felicitaciones por el deployment 🎉

</div>
