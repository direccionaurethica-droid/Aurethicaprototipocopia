# 🏗️ Arquitectura de Páginas - Auréthica Premium

## 📐 Diseño Estilo Zara

La aplicación ha sido completamente reorganizada con una arquitectura de **páginas separadas** y **transiciones premium**, siguiendo los estándares de diseño de marcas de lujo como Zara.

---

## 🗂️ Estructura de Páginas

### `/pages/`
Directorio de páginas individuales, cada una con su propia responsabilidad:

```
pages/
├── LandingPage.tsx          → Página de aterrizaje (Hero)
├── RegistrationPage.tsx     → Registro de usuario
├── GigiIntroPage.tsx        → Introducción y calibración de Gigi
├── TestPage.tsx             → Test de Auréthica
├── AvatarPage.tsx           → Subida de 10 fotos
├── AppModePage.tsx          → Modo aplicación (Blog/Perfil/Búsqueda)
└── index.ts                 → Exportaciones centralizadas
```

---

## 🎬 Flujo de Usuario Premium

### 1. **Landing Page** 
```
Entrada → Hero impactante → CTA "Comenzar"
```
- **Transición:** Fade in suave (600ms)
- **Fondo:** Marfil cálido (#F5F2E9)
- **Acción:** Botón hero lleva a registro

### 2. **Registration Page**
```
Formulario elegante → Validación → Continuar
```
- **Transición:** Slide horizontal derecha (500ms, cubic-bezier)
- **Fondo:** Blanco puro
- **Loading:** "Preparando tu experiencia..." (2s)

### 3. **Gigi Intro Page**
```
Presentación Gigi → Calibración (5 preguntas) → Confirmación
```
- **Transición:** Scale + fade (600ms)
- **Fondo:** Gradiente marfil → blanco
- **Loading:** "Configurando tu asistente Gigi..." (1.5s)

### 4. **Test Page**
```
Test Auréthica → Preguntas de ropa → Resultados
```
- **Transición:** Slide vertical (500ms)
- **Fondo:** Blanco puro
- **Loading:** "Analizando tus respuestas..." (1.5s)

### 5. **Avatar Page**
```
Upload 10 fotos → Preview → Generar avatar
```
- **Transición:** Scale zoom (600ms)
- **Fondo:** Marfil cálido
- **Loading:** "Generando tu avatar personalizado..." (3s)

### 6. **App Mode Page**
```
Blog Feed ↔ Perfil ↔ Búsqueda (Navegación inferior)
```
- **Transición:** Slide horizontal suave (400ms)
- **Navegación:** Bottom navigation bar fija
- **Subvistas:** Cambio con AnimatePresence

---

## 🎨 Sistema de Transiciones

### Curvas de Easing Premium
```typescript
// Cubic bezier personalizado (estilo Zara)
ease: [0.22, 1, 0.36, 1]

// Suave y natural
duration: 0.4s - 0.6s
```

### Tipos de Transición

| Página | Entrada | Salida | Duración |
|--------|---------|--------|----------|
| Landing | `opacity: 0 → 1` | `opacity: 1 → 0` | 600ms |
| Registration | `x: 100 → 0` | `x: 0 → -100` | 500ms |
| Gigi Intro | `scale: 0.98 → 1` | `scale: 1 → 1.02` | 600ms |
| Test | `y: 50 → 0` | `y: 0 → -50` | 500ms |
| Avatar | `scale: 0.95 → 1` | `scale: 1 → 1.05` | 600ms |
| App Mode | `x: -20 → 0` | `x: 0 → 20` | 400ms |

---

## 🧭 Sistema de Enrutamiento

### PageRouter (`/lib/router/PageRouter.tsx`)
Gestor centralizado de navegación entre páginas.

```typescript
type PageRoute = 
  | 'landing'
  | 'registration'
  | 'gigi-intro'
  | 'test'
  | 'avatar'
  | 'app';
```

### Flujo de Navegación
```
landing
  ↓
registration + loading(2s)
  ↓
gigi-intro + loading(1.5s)
  ↓
test + loading(1.5s)
  ↓
avatar + loading(3s)
  ↓
app (permanente)
```

### Navegación hacia Atrás
Cada página tiene un botón "Atrás" cromado que:
- Mantiene el estado previo
- Aplica transición inversa
- No pierde datos del formulario

---

## 📱 Responsive Design

### Breakpoints
```css
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: > 1024px
```

### Adaptaciones por Vista

#### Landing Page
- Mobile: Hero vertical, texto centrado
- Desktop: Hero horizontal, texto izquierda

#### Registration Page
- Mobile: Input stack vertical, botón full width
- Desktop: Input grid 2 columnas, botón centrado

#### Gigi Intro Page
- Mobile: Preguntas stack, 1 columna
- Desktop: Preguntas grid, progreso horizontal

#### Test Page
- Mobile: Opciones stack vertical
- Desktop: Opciones grid 2 columnas

#### Avatar Page
- Mobile: Grid 2x5, upload stack
- Desktop: Grid 5x2, upload horizontal

#### App Mode Page
- Mobile: Bottom nav (3 items), content full width
- Desktop: Side nav opcional, content max-width

---

## 🎯 Componentes Compartidos

### Navegación

#### Durante Onboarding
- **Sin barra superior** en páginas individuales
- **Botón "Atrás"** cromado dentro de cada página
- **Transiciones** gestionadas por PageRouter

#### En App Mode
- **NavigationBarApp** fija en bottom (mobile) o top (desktop)
- **3 vistas:** Blog, Perfil, Búsqueda
- **Transiciones** suaves entre vistas (400ms)

### Loading Screen
- **Overlay** semi-transparente
- **Spinner** cromado con gradiente Gigi
- **Mensaje** personalizado según acción
- **Duración** variable: 1.5s - 3s

---

## 🎨 Paleta por Página

| Página | Background | Acento | CTA |
|--------|-----------|--------|-----|
| Landing | #F5F2E9 (marfil) | #013220 (verde) | Gradiente cromado |
| Registration | #FFFFFF (blanco) | #013220 | #013220 |
| Gigi Intro | Gradiente marfil-blanco | #FF2D95 (fucsia) | Gradiente cromado Gigi |
| Test | #FFFFFF | #013220 | #013220 |
| Avatar | #F5F2E9 | #C9A24F (dorado) | #013220 |
| App Mode | #F5F2E9 | #013220 | Variable |

---

## 📐 Espaciado y Tipografía

### Sistema de Espaciado (base 8px)
```css
--space-2:  0.5rem;   /* 8px */
--space-4:  1rem;     /* 16px */
--space-6:  1.5rem;   /* 24px */
--space-8:  2rem;     /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Tipografía por Página

#### Títulos Principales
```css
Playfair Display
font-size: 2rem - 3.5rem
color: #101418 (ink) o #FF2D95 (Gigi)
```

#### Subtítulos
```css
Montserrat
font-size: 1.125rem - 1.5rem
color: #013220 (verde) o #6E7276 (piedra)
```

#### Cuerpo
```css
Montserrat
font-size: 1rem - 1.125rem
color: #6E7276 (piedra)
line-height: 1.6
```

---

## 🚀 Optimizaciones de Performance

### Code Splitting
Cada página se carga dinámicamente:
```typescript
// Lazy loading automático por página
const LandingPage = lazy(() => import('./pages/LandingPage'));
```

### Prefetch de Datos
```typescript
// Precargar siguiente página en idle
useIdleCallback(() => {
  prefetchNextPage();
});
```

### Transiciones Optimizadas
```typescript
// Hardware acceleration
transform: translate3d(0, 0, 0);
will-change: transform, opacity;
```

---

## 🎭 Estados de UI

### Loading States
1. **Inicial** - Landing page carga
2. **Entre páginas** - Transición suave
3. **Procesamiento** - Loading screen overlay
4. **Completado** - Siguiente página

### Error States
1. **Validación** - Inputs con feedback inmediato
2. **Red** - Mensaje de conexión perdida
3. **General** - Página de error amigable

### Empty States
1. **Blog** - Ilustración + CTA "Explorar"
2. **Búsqueda** - Sugerencias de términos
3. **Perfil** - Completar información

---

## 📊 Métricas de UX

### Tiempo de Navegación
- Landing → Registration: **< 600ms**
- Registration → Gigi: **< 2.5s** (con loading)
- Gigi → Test: **< 2s** (con loading)
- Test → Avatar: **< 2s** (con loading)
- Avatar → App: **< 3.5s** (con loading)

### Performance Budget
- First Contentful Paint: **< 1.5s**
- Time to Interactive: **< 3s**
- Largest Contentful Paint: **< 2.5s**

---

## 🔒 Gestión de Estado

### Local State (por página)
```typescript
// Dentro de cada página
const [formData, setFormData] = useState({});
const [errors, setErrors] = useState({});
```

### Shared State (global)
```typescript
// En App.tsx
const [registrationData, setRegistrationData] = useState(null);
const [gigiCalibration, setGigiCalibration] = useState(null);
const [avatarPhotos, setAvatarPhotos] = useState([]);
```

### Persistencia
```typescript
// Guardar en localStorage en cada paso
localStorage.setItem('aurethica:registration', JSON.stringify(data));
```

---

## 🎯 Próximas Mejoras

### Fase 2
- [ ] Precarga de imágenes entre páginas
- [ ] Skeleton screens en lugar de loading spinner
- [ ] Animaciones de microinteracción en inputs
- [ ] Gestos swipe para navegación móvil

### Fase 3
- [ ] PWA con navegación offline
- [ ] Caché inteligente de páginas visitadas
- [ ] Transiciones compartidas entre elementos
- [ ] Modo oscuro con transición suave

---

## 📚 Comparación: Antes vs Después

### Antes (Single Page Scroll)
```
❌ Todo en App.tsx (339 líneas)
❌ Scroll sections mezcladas
❌ AnimatePresence anidado
❌ Estado complejo distribuido
❌ Difícil mantener
```

### Después (Páginas Separadas)
```
✅ Páginas individuales (< 80 líneas cada una)
✅ Router centralizado
✅ Transiciones premium
✅ Estado claro y organizado
✅ Fácil de mantener y extender
```

---

## 🎨 Inspiración: Zara App

### Elementos Adoptados
1. **Transiciones suaves** entre vistas
2. **Navegación minimalista** sin clutter
3. **Tipografía elegante** con jerarquía clara
4. **Espaciado generoso** para respirar
5. **Loading sutil** sin interrumpir flow
6. **Imágenes premium** con lazy loading
7. **CTA claros** sin ser intrusivos

### Diferenciadores de Auréthica
1. **Gradientes cromados** para Gigi
2. **Paleta cálida** (marfil, verde, dorado, fucsia)
3. **Personalización IA** visible en cada paso
4. **Microinteracciones** con Gigi presente
5. **Tono editorial** vs comercial

---

## ✅ Checklist de Implementación

- [x] Crear directorio `/pages/`
- [x] Separar páginas individuales
- [x] Crear PageRouter
- [x] Reorganizar App.tsx
- [x] Implementar transiciones premium
- [x] Optimizar loading states
- [x] Documentar arquitectura
- [ ] Testing de navegación
- [ ] Optimizar performance
- [ ] Deploy a producción

---

**Última actualización:** 2 de noviembre de 2025  
**Diseñador:** Sistema Premium Auréthica
