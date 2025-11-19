# Arquitectura Front-End de Auréthica

## 📋 Índice
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Capas de la Aplicación](#capas-de-la-aplicación)
- [Sistemas Implementados](#sistemas-implementados)
- [Optimizaciones de Rendimiento](#optimizaciones-de-rendimiento)
- [Próximos Pasos](#próximos-pasos)

---

## 🏗️ Estructura del Proyecto

```
/
├── components/          # Componentes React
│   ├── ui/             # ShadCN components
│   ├── figma/          # Componentes de Figma
│   └── *.tsx           # Componentes principales
│
├── hooks/              # Custom React Hooks
│   ├── useIntersectionObserver.ts
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── useMediaQuery.ts
│   ├── useScrollDirection.ts
│   └── useImagePreload.ts
│
├── lib/                # Lógica de negocio y utilidades
│   ├── types/          # TypeScript interfaces y types
│   ├── constants/      # Constantes de la aplicación
│   ├── utils/          # Funciones utilidad
│   │   ├── performance.ts    # Optimización (debounce, throttle, lazy loading)
│   │   ├── validation.ts     # Validación de formularios
│   │   ├── storage.ts        # LocalStorage API
│   │   └── helpers.ts        # Helpers generales
│   ├── pwa/            # Progressive Web App
│   │   └── serviceWorker.ts
│   └── i18n/           # Internacionalización
│       ├── translations.ts
│       └── useTranslation.ts
│
├── styles/             # Estilos globales
│   └── globals.css
│
└── public/             # Assets estáticos
    └── manifest.json   # PWA manifest
```

---

## 🎯 Capas de la Aplicación

### 1. **Capa de Presentación** (Components)
- Componentes React modulares y reutilizables
- Separación por responsabilidad (UI, Layout, Features)
- Uso de ShadCN para componentes base
- Componentes optimizados con lazy loading

### 2. **Capa de Lógica** (Hooks)
- Custom hooks para lógica reutilizable
- Gestión de estado local
- Interacción con APIs del navegador
- Performance optimizations

### 3. **Capa de Datos** (Lib)
- Tipos TypeScript centralizados
- Constantes y configuración
- Utilidades y helpers
- Gestión de almacenamiento

### 4. **Capa de Infraestructura**
- PWA configuration
- Service Workers
- i18n system
- Performance monitoring

---

## 🚀 Sistemas Implementados

### ✅ Sistema de Tipos TypeScript
**Ubicación:** `/lib/types/index.ts`

- Tipos centralizados para toda la aplicación
- Interfaces para datos de usuario, calibración, blog, etc.
- Type safety completo
- Fácil refactorización

```typescript
import type { CalibrationSelection, UserData, BlogPost } from '@/lib/types';
```

### ✅ Sistema de Constantes
**Ubicación:** `/lib/constants/index.ts`

- Configuración centralizada
- Colores de marca
- Breakpoints responsive
- Reglas de validación
- Eventos de analytics
- Configuración de i18n

```typescript
import { THEME_CONFIG, BREAKPOINTS, VALIDATION_RULES } from '@/lib/constants';
```

### ✅ Utilidades de Performance
**Ubicación:** `/lib/utils/performance.ts`

- `debounce()` - Retrasar ejecución
- `throttle()` - Limitar frecuencia
- `rafThrottle()` - RequestAnimationFrame optimizado
- `preloadImage()` - Precarga de imágenes
- `createLazyLoader()` - Lazy loading con IntersectionObserver
- `SimpleCache` - Cache con expiración
- Detección de preferencias de animación

```typescript
import { debounce, throttle, preloadImage } from '@/lib/utils';
```

### ✅ Utilidades de Validación
**Ubicación:** `/lib/utils/validation.ts`

- Validación de nombre, email, teléfono
- Validación de archivos de imagen
- Sanitización de strings
- Formateo de datos

```typescript
import { validateEmail, validateName, validatePhone } from '@/lib/utils';
```

### ✅ Sistema de Almacenamiento
**Ubicación:** `/lib/utils/storage.ts`

- API tipada para localStorage
- StorageAPI con métodos específicos
- Gestión de datos de usuario
- Persistencia de preferencias

```typescript
import { StorageAPI } from '@/lib/utils';

StorageAPI.saveUserData(userData);
const user = StorageAPI.getUserData();
```

### ✅ Hooks Personalizados
**Ubicación:** `/hooks/`

1. **useIntersectionObserver** - Detectar visibilidad de elementos
2. **useDebounce** - Debounce de valores
3. **useLocalStorage** - Sincronizar estado con localStorage
4. **useMediaQuery** - Responsive breakpoints
5. **useScrollDirection** - Detectar scroll up/down
6. **useImagePreload** - Precargar imágenes

```typescript
import { useIntersectionObserver, useDebounce, useMediaQuery } from '@/hooks';
```

### ✅ Componente de Imagen Optimizada
**Ubicación:** `/components/OptimizedImage.tsx`

- Lazy loading automático
- Placeholder y skeleton loader
- Soporte para srcset responsive
- Manejo de errores
- Priorización de imágenes críticas

```typescript
<OptimizedImage
  src="/image.jpg"
  alt="Descripción"
  priority={false}
  placeholder="/placeholder.jpg"
/>
```

### ✅ Sistema PWA (Progressive Web App)
**Ubicación:** `/lib/pwa/serviceWorker.ts`

- Service Worker registration
- Gestión de cache
- Soporte offline
- Detección de instalación
- Actualizaciones automáticas

```typescript
import { registerServiceWorker, isAppInstalled } from '@/lib/pwa/serviceWorker';
```

**Manifest:** `/public/manifest.json`
- Configuración de iconos
- Colores de tema
- Display standalone
- Orientación portrait

### ✅ Sistema de Internacionalización (i18n)
**Ubicación:** `/lib/i18n/`

- Soporte para ES, CA, EN
- Hook `useTranslation()`
- Provider context
- Detección automática de idioma del navegador
- Persistencia de preferencia

```typescript
import { useTranslation } from '@/lib/i18n/useTranslation';

function MyComponent() {
  const { t, language, setLanguage } = useTranslation();
  return <h1>{t.hero.title}</h1>;
}
```

---

## ⚡ Optimizaciones de Rendimiento

### 1. **Code Splitting**
- Lazy loading de componentes con `React.lazy()`
- Dynamic imports para rutas
- Reducción del bundle inicial

### 2. **Image Optimization**
- Lazy loading con IntersectionObserver
- Formato WebP/AVIF preferido
- Responsive images con srcset
- Placeholders mientras cargan

### 3. **Performance Utilities**
- Debounce para búsquedas
- Throttle para scroll handlers
- RAF para animaciones
- Memoización de funciones costosas

### 4. **Caching**
- LocalStorage para datos persistentes
- Cache con expiración (SimpleCache)
- Service Worker cache para offline

### 5. **Bundle Optimization**
- Tree shaking automático
- Imports específicos (no `import *`)
- Constantes centralizadas
- Código modular

---

## 🎨 Mejores Prácticas Implementadas

### TypeScript
✅ Tipado estricto en toda la aplicación
✅ Interfaces centralizadas
✅ No usar `any` (usar `unknown` si es necesario)
✅ Type guards para validaciones

### React
✅ Hooks personalizados para lógica reutilizable
✅ Componentes pequeños y enfocados
✅ Props tipadas
✅ Memoización cuando es necesario

### Performance
✅ Lazy loading de imágenes
✅ Debounce/Throttle en eventos frecuentes
✅ IntersectionObserver para scroll infinito
✅ RequestAnimationFrame para animaciones

### Accesibilidad
✅ Semantic HTML
✅ ARIA labels preparados
✅ Soporte para keyboard navigation
✅ Preferencias de animación reducida

### SEO & PWA
✅ Manifest configurado
✅ Service Worker preparado
✅ Meta tags dinámicos
✅ Lighthouse-ready

---

## 📱 Responsive Design

### Breakpoints Definidos
```typescript
mobile: 640px    // Smartphones
tablet: 768px    // Tablets
laptop: 1024px   // Laptops
desktop: 1280px  // Desktop
wide: 1536px     // Wide screens
```

### Hooks Responsive
```typescript
const isMobile = useIsMobile();
const isTablet = useIsTablet();
const isDesktop = useIsDesktop();
```

---

## 🔒 Seguridad

### Validación
- Input sanitization
- XSS prevention
- Validación client-side y server-side
- Type checking

### Storage
- Datos sensibles no en localStorage
- Tokens con expiración
- HTTPS only (en producción)

---

## 📊 Analytics & Monitoring

### Eventos Preparados
```typescript
ANALYTICS_EVENTS = {
  ONBOARDING: { ... },
  GIGI: { ... },
  BLOG: { ... },
  USER: { ... },
}
```

### Tracking
- User behavior
- Scroll depth
- Time on page
- Interactions

---

## 🚀 Próximos Pasos

### Nivel 1: Optimizaciones Superficiales
- [ ] Implementar modo oscuro
- [ ] Microinteracciones y animaciones
- [ ] Haptic feedback (mobile)
- [ ] Partículas y efectos visuales

### Nivel 2: Funcionalidad
- [ ] Infinite scroll en blog
- [ ] Carrusel optimizado
- [ ] Sistema de búsqueda avanzado
- [ ] Filtros y categorías

### Nivel 3: Backend Integration
- [ ] API REST/GraphQL
- [ ] Autenticación JWT
- [ ] Upload de imágenes a CDN
- [ ] IA de Gigi (recomendaciones)

### Nivel 4: Producción
- [ ] Tests E2E (Playwright)
- [ ] Tests unitarios (Vitest)
- [ ] CI/CD pipeline
- [ ] Lighthouse optimization
- [ ] Performance monitoring

---

## 📝 Notas de Desarrollo

### Imports Recomendados
```typescript
// Types
import type { UserData, BlogPost } from '@/lib/types';

// Constants
import { THEME_CONFIG, BREAKPOINTS } from '@/lib/constants';

// Utils
import { debounce, validateEmail, StorageAPI } from '@/lib/utils';

// Hooks
import { useDebounce, useMediaQuery, useIntersectionObserver } from '@/hooks';
```

### Estructura de Componentes
```typescript
// 1. Imports
import { useState } from 'react';
import type { ComponentProps } from '@/lib/types';

// 2. Types & Interfaces
interface Props {
  // ...
}

// 3. Component
export function MyComponent({ prop }: Props) {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Handlers
  const handleClick = () => {};
  
  // 6. Effects
  useEffect(() => {}, []);
  
  // 7. Render
  return <div>...</div>;
}
```

---

## 🎯 Convenciones de Código

### Nomenclatura
- **Componentes**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase con `use` prefix (`useDebounce.ts`)
- **Utils**: camelCase (`formatDate()`)
- **Constants**: UPPER_SNAKE_CASE (`THEME_CONFIG`)
- **Types**: PascalCase (`UserData`, `CalibrationSelection`)

### Organización de Archivos
- Un componente por archivo
- Exports nombrados preferidos
- Index files para re-exports
- Colocation de archivos relacionados

---

## 🔧 Configuración del Entorno

### Variables de Entorno (Preparadas)
```env
VITE_API_URL=
VITE_CDN_URL=
VITE_ANALYTICS_ID=
```

### Scripts NPM Recomendados
```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint src --ext ts,tsx",
  "test": "vitest",
  "test:e2e": "playwright test"
}
```

---

**Última actualización:** Noviembre 2025  
**Versión de la arquitectura:** 1.0.0  
**Estado:** Base estructural completa ✅
