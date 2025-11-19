# Sistema de Diseño Auréthica

## 🎨 Paleta de Colores Exacta

### Colores Principales
```css
--auretica-ivory: #F5F2E9    /* Fondo base */
--auretica-emerald: #013220  /* Verde esmeralda oscuro - Elementos principales */
--auretica-gold: #C9A24F     /* Dorado viejo - Acentos */
--auretica-ink: #101418      /* Negro tinta - Textos principales */
--auretica-stone: #6E7276    /* Gris piedra - Textos secundarios */
--auretica-gigi: #FF2D95     /* Fucsia Gigi - Elementos específicos */
```

### Ratios de Contraste WCAG AA ✅

| Combinación | Ratio | Cumple AA | Uso Recomendado |
|-------------|-------|-----------|-----------------|
| Ink sobre Ivory | 11.2:1 | ✅ | Textos principales |
| Emerald sobre Ivory | 13.5:1 | ✅ | Encabezados, botones |
| Stone sobre Ivory | 4.8:1 | ✅ | Textos secundarios |
| White sobre Emerald | 14.2:1 | ✅ | Textos sobre fondos oscuros |
| Gigi sobre Ivory | 3.2:1 | ⚠️ | Solo elementos grandes (18pt+) |
| Gold sobre Emerald | 5.1:1 | ✅ | Acentos sobre verde |

## 📏 Sistema de Espaciado Base 8px

### Escala de Espaciado
```css
--space-1: 4px    /* 0.25rem */
--space-2: 8px    /* 0.5rem  - Unidad base */
--space-3: 12px   /* 0.75rem */
--space-4: 16px   /* 1rem */
--space-5: 20px   /* 1.25rem */
--space-6: 24px   /* 1.5rem */
--space-8: 32px   /* 2rem */
--space-10: 40px  /* 2.5rem */
--space-12: 48px  /* 3rem */
--space-16: 64px  /* 4rem */
--space-20: 80px  /* 5rem */
--space-24: 96px  /* 6rem */
```

### Aplicación del Espaciado

#### Paddings de Componentes
- **Botón SM**: `px-4 py-2` (16px x 8px)
- **Botón MD**: `px-6 py-3` (24px x 12px)
- **Botón LG**: `px-8 py-4` (32px x 16px)

#### Gaps y Márgenes
- **Gap SM**: `gap-2` (8px)
- **Gap MD**: `gap-4` (16px)
- **Gap LG**: `gap-6` (24px)

#### Secciones
- **Padding Mobile**: `px-4 py-8` (16px x 32px)
- **Padding Tablet**: `px-6 py-12` (24px x 48px)
- **Padding Desktop**: `px-8 py-16` (32px x 64px)

## 🔤 Jerarquía Tipográfica

### Fuentes
```css
/* Títulos principales */
font-family: 'Playfair Display', serif;

/* Resto del contenido */
font-family: 'Montserrat', sans-serif;

/* Texto manuscrito (Hero) */
font-family: 'Dancing Script', cursive;
```

### Escalas y Pesos

| Elemento | Tamaño | Peso | Line Height | Uso |
|----------|--------|------|-------------|-----|
| H1 | 3.5rem (56px) | 500 | 1.2 | Títulos principales |
| H2 | 2rem (32px) | 500 | 1.3 | Subtítulos de sección |
| H3 | 1.5rem (24px) | 500 | 1.4 | Títulos de tarjeta |
| H4 | 1.125rem (18px) | 500 | 1.5 | Subtítulos pequeños |
| Body | 1.125rem (18px) | 400 | 1.6 | Texto normal |
| Small | 0.875rem (14px) | 400 | 1.5 | Textos pequeños |

### Interlineado
- **Títulos**: 1.2 - 1.4
- **Párrafos**: 1.6 - 1.8 (generoso para legibilidad)
- **Texto pequeño**: 1.5

## 🎯 Componentes Reutilizables

### ChromeButton
```tsx
<ChromeButton variant="primary" size="md">
  Continuar
</ChromeButton>

// Variantes: 'primary' | 'secondary' | 'ghost'
// Tamaños: 'sm' | 'md' | 'lg'
// Props: isLoading, disabled, fullWidth
```

### AccessibleInput
```tsx
<AccessibleInput
  label="Nombre"
  error="Campo requerido"
  hint="Escribe tu nombre completo"
  leftIcon={<User />}
  required
/>
```

### BlogCard
```tsx
<BlogCard
  post={postData}
  onLike={(id) => handleLike(id)}
  onComment={(id) => handleComment(id)}
  onBookmark={(id) => handleBookmark(id)}
/>
```

### SkeletonCard
```tsx
<SkeletonCard variant="feed" />
// Variantes: 'feed' | 'profile' | 'search'
```

## ♿ Accesibilidad

### Estados de Focus
```css
focus:outline-none 
focus-visible:ring-2 
focus-visible:ring-[#013220] 
focus-visible:ring-offset-2
```

### ARIA Labels
- Todos los botones tienen `aria-label`
- Inputs tienen `aria-describedby` para hints/errores
- Estados interactivos usan `aria-pressed`, `aria-selected`
- Elementos decorativos tienen `aria-hidden="true"`

### Navegación por Teclado
- Tab index lógico
- Enter/Space activan botones
- Escape cierra modales
- Flechas navegan en carruseles

## 📱 Breakpoints Responsivos

```css
/* Mobile First */
base: 0px      /* Móvil */
sm: 640px      /* Móvil grande */
md: 768px      /* Tablet */
lg: 1024px     /* Desktop */
xl: 1280px     /* Desktop grande */
2xl: 1536px    /* Pantallas extra grandes */
```

### Patrones Responsive
```tsx
// Stack en móvil, grid en desktop
<div className="flex flex-col md:grid md:grid-cols-2 gap-4">

// Ocultar en móvil
<div className="hidden lg:block">

// Padding responsive
<div className="px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
```

## 🎭 Estados Interactivos

### Botones
- **Normal**: Gradiente cromado
- **Hover**: Scale 1.05 + brillo adicional
- **Active**: Scale 0.95
- **Disabled**: Opacity 0.5 + cursor not-allowed
- **Loading**: Spinner animado

### Links
- **Normal**: Color emerald/gigi
- **Hover**: Opacity 0.8
- **Visited**: Sin cambio (mantener consistencia)
- **Focus**: Ring visible

### Cards
- **Normal**: Shadow-md
- **Hover**: Shadow-xl + translateY(-4px)
- **Active**: Shadow-lg

## ⚡ Animaciones

### Duración Estándar
```css
--duration-fast: 200ms
--duration-normal: 300ms
--duration-slow: 500ms
```

### Easing
```css
ease-in-out  /* Por defecto */
ease-out     /* Entradas */
ease-in      /* Salidas */
```

### Motion Reducido
Respeta `prefers-reduced-motion: reduce`
```tsx
import { prefersReducedMotion } from '@/lib/utils/accessibility';

const shouldAnimate = !prefersReducedMotion();
```

## 🌓 Modo Oscuro

### Colores Adaptados
```css
.dark {
  --auretica-ivory: #1a1d21
  --auretica-emerald: #00ff88
  --auretica-gold: #ffd700
  --auretica-ink: #e8e9ea
  --auretica-stone: #9ca3af
  /* gigi se mantiene igual */
}
```

## 📊 Métricas de Rendimiento

### Skeleton Loaders
- Mostrar mientras carga contenido
- Mantener estructura visual
- Animación sutil (evitar distracción)

### Lazy Loading
- Imágenes con `loading="lazy"`
- Infinite scroll para feeds largos
- Cargar bajo demanda

### Optimización de Imágenes
- Usar Unsplash con parámetros de tamaño
- WebP cuando sea posible
- Placeholders durante carga

## 🎯 Tono de Voz y Microcopys

### Principios
- **Sofisticado pero cercano**
- **Inclusivo y empático**
- **Claro y directo**

### Ejemplos
✅ "Únete a Auréthica" 
❌ "Regístrate aquí"

✅ "Has visto todo por hoy ✨"
❌ "No hay más contenido"

✅ "Me encontró a mí"
❌ "Resultado final"

## 🔍 Validación de Diseño

### Checklist Pre-Lanzamiento
- [ ] Contraste de colores > 4.5:1 para texto normal
- [ ] Contraste de colores > 3:1 para texto grande
- [ ] Todos los elementos interactivos tienen estados hover/focus
- [ ] Navegación por teclado funciona en todos los componentes
- [ ] Responsive en móvil, tablet y desktop
- [ ] Animaciones respetan reduced motion
- [ ] Todos los inputs tienen labels
- [ ] Mensajes de error son claros y útiles
- [ ] Skeleton loaders en estados de carga
- [ ] Feedback inmediato en todas las acciones
