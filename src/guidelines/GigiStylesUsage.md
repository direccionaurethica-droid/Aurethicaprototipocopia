# Guía de Uso: Utilidades de Estilos de Gigi

## Importación

```tsx
import { GigiStyles } from '@/lib/utils/gigiStyles';
// o importaciones específicas:
import { GIGI_COLORS, GIGI_CLASSES, getGigiTitleClasses } from '@/lib/utils/gigiStyles';
```

---

## 🎨 Colores

### Usar Colores Predefinidos

```tsx
// En estilos inline
<div style={{ color: GigiStyles.colors.fucsia }}>
  Texto en fucsia
</div>

// Con opacidad
<div style={{ color: GigiStyles.getFucsia(0.5) }}>
  Texto en fucsia al 50%
</div>

// Todos los colores disponibles
const { fucsia, dorado, verde } = GigiStyles.colors;
```

---

## 📝 Títulos

### Títulos con Clases Predefinidas

```tsx
import { Sparkles } from 'lucide-react';
import { GigiStyles } from '@/lib/utils/gigiStyles';

// Título grande con icono
<h1 
  style={{ fontFamily: 'Playfair Display, serif' }}
  className={GigiStyles.getTitleClasses('lg', true)}
>
  <Sparkles className="w-8 h-8" />
  Calibración de Gigi
</h1>

// Título mediano sin icono
<h2 
  style={{ fontFamily: 'Playfair Display, serif' }}
  className={GigiStyles.getTitleClasses('md')}
>
  Tu Gigi Personalizada
</h2>

// Título pequeño
<h3 className={GigiStyles.getTitleClasses('sm', true)}>
  <Sparkles className="w-5 h-5" />
  Configuración
</h3>
```

### Clases Directas

```tsx
<h2 className={GigiStyles.classes.titleLarge}>
  Título Grande
</h2>

<h3 className={GigiStyles.classes.titleMedium}>
  Título Mediano
</h3>

<h4 className={GigiStyles.classes.titleSmall}>
  Título Pequeño
</h4>
```

---

## 🃏 Tarjetas

### Tarjeta Básica de Gigi

```tsx
<div className={GigiStyles.getCardClasses()}>
  <div className="flex items-center gap-3 mb-3">
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF2D95] to-[#C9A24F] flex items-center justify-center">
      <span className="text-xl">💕</span>
    </div>
    <h4 className={GigiStyles.classes.titleSmall}>
      Mensaje de Gigi
    </h4>
  </div>
  <p className="text-[#6E7276] text-sm">
    Contenido del mensaje...
  </p>
</div>
```

### Tarjeta Interactiva

```tsx
<div className={GigiStyles.getCardClasses(true)}>
  {/* Contenido - la tarjeta tendrá hover effects */}
</div>
```

### Clases de Tarjeta Directas

```tsx
// Tarjeta estática
<div className={GigiStyles.classes.card}>
  Contenido
</div>

// Tarjeta con hover
<div className={`${GigiStyles.classes.card} ${GigiStyles.classes.cardHover}`}>
  Contenido
</div>
```

---

## 📊 Indicadores de Progreso

### Barra de Progreso con Puntos

```tsx
<div className="flex justify-center space-x-3">
  {questions.map((question, index) => (
    <div 
      key={question.id}
      className={GigiStyles.getProgressClasses(
        index === currentIndex ? 'active' :
        selections[question.id] ? 'completed' :
        'pending'
      )}
    />
  ))}
</div>
```

### Clases Directas

```tsx
// Punto activo (fucsia con sombra)
<div className={`w-12 h-2 rounded-full ${GigiStyles.classes.progressActive}`} />

// Punto completado (dorado)
<div className={`w-2 h-2 rounded-full ${GigiStyles.classes.progressCompleted}`} />

// Punto pendiente (gris)
<div className={`w-2 h-2 rounded-full ${GigiStyles.classes.progressPending}`} />
```

---

## 🔘 Radio Buttons

### Radio Button con Helper

```tsx
const [selected, setSelected] = useState(false);

<button onClick={() => setSelected(!selected)}>
  <div className={GigiStyles.getRadioClasses(selected)}>
    {selected && (
      <div className="w-2.5 h-2.5 rounded-full bg-white" />
    )}
  </div>
</button>
```

### Con Motion (Framer Motion)

```tsx
import { motion } from 'motion/react';

<div className={GigiStyles.getRadioClasses(isSelected)}>
  {isSelected && (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="w-2.5 h-2.5 rounded-full bg-white"
    />
  )}
</div>
```

---

## 🎨 Gradientes

### Gradiente Cromado de Gigi

```tsx
// Gradiente normal (fucsia → dorado → verde)
<div style={GigiStyles.getGradientStyle()}>
  Contenido con fondo cromado
</div>

// Gradiente inverso (verde → dorado → fucsia)
<div style={GigiStyles.getGradientStyle('reverse')}>
  Contenido con fondo cromado inverso
</div>

// Acceso directo
<div style={{ background: GigiStyles.gradient.background }}>
  Fondo cromado
</div>
```

---

## 🔆 Efectos de Brillo y Reflejo

### Capa de Brillo Hover

```tsx
<button className="relative overflow-hidden">
  {/* Contenido */}
  
  {/* Capa de brillo que aparece en hover */}
  <div 
    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
    style={GigiStyles.getBrilloHoverStyle()}
  />
</button>
```

### Reflejo Metálico Animado

```tsx
import { motion } from 'motion/react';

<div className="relative overflow-hidden">
  {/* Reflejo metálico animado */}
  <motion.div
    className="absolute inset-0"
    animate={{
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
    }}
    transition={{
      duration: 2.5,
      repeat: Infinity,
      ease: 'linear'
    }}
    style={GigiStyles.getReflejoMetalicoStyle()}
  />
  
  {/* Contenido */}
</div>
```

---

## 🌈 Fondos y Bordes

### Fondos

```tsx
// Fondo sutil (5% opacidad)
<div className={GigiStyles.classes.bgSubtle}>
  Contenido
</div>

// Fondo ligero (10% opacidad)
<div className={GigiStyles.classes.bgLight}>
  Contenido
</div>

// Fondo medio (20% opacidad)
<div className={GigiStyles.classes.bgMedium}>
  Contenido
</div>
```

### Bordes

```tsx
// Borde sutil (20% opacidad)
<div className={`border ${GigiStyles.classes.borderSubtle}`}>
  Contenido
</div>

// Borde ligero (30% opacidad)
<div className={`border ${GigiStyles.classes.borderLight}`}>
  Contenido
</div>

// Borde medio (50% opacidad)
<div className={`border ${GigiStyles.classes.borderMedium}`}>
  Contenido
</div>

// Borde fuerte (100% opacidad)
<div className={`border-2 ${GigiStyles.classes.borderStrong}`}>
  Contenido
</div>
```

---

## ✨ Textos

### Texto con Énfasis

```tsx
<p className="text-[#6E7276]">
  La asistente <span className={GigiStyles.classes.textEmphasis}>Gigi</span> te acompaña 
  en cada paso del proceso.
</p>
```

### Texto Normal Fucsia

```tsx
<p className={GigiStyles.classes.textNormal}>
  Texto en color fucsia de Gigi
</p>
```

---

## 🎯 Focus States

### Aplicar Focus Ring de Gigi

```tsx
<button className={GigiStyles.classes.focusRing}>
  Botón con focus fucsia
</button>

<input className={GigiStyles.classes.focusRing} />
```

---

## 🔧 Combinación de Clases

### Helper para Combinar Clases

```tsx
<div className={GigiStyles.combine(
  GigiStyles.classes.card,
  GigiStyles.classes.cardHover,
  'p-6',
  someCondition && 'shadow-lg'
)}>
  Contenido
</div>
```

---

## 🧩 Ejemplo Completo: Tarjeta de Mensaje de Gigi

```tsx
import { Sparkles } from 'lucide-react';
import { GigiStyles } from '@/lib/utils/gigiStyles';

function GigiMessageCard({ message }: { message: string }) {
  return (
    <div className={GigiStyles.getCardClasses(true)}>
      <div className="flex items-center gap-3 mb-3">
        {/* Avatar circular con gradiente */}
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={GigiStyles.getGradientStyle()}
        >
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        
        {/* Título */}
        <h4 
          style={{ fontFamily: 'Playfair Display, serif' }}
          className={GigiStyles.getTitleClasses('sm')}
        >
          Mensaje de Gigi
        </h4>
      </div>
      
      {/* Mensaje */}
      <p className="text-[#6E7276] text-sm leading-relaxed">
        {message}
      </p>
    </div>
  );
}
```

---

## 🚀 Ejemplo Completo: Indicador de Progreso

```tsx
import { GigiStyles } from '@/lib/utils/gigiStyles';

function GigiProgressIndicator({ 
  currentIndex, 
  totalQuestions,
  selections 
}: {
  currentIndex: number;
  totalQuestions: number;
  selections: Record<string, any>;
}) {
  return (
    <div className="flex justify-center space-x-3">
      {Array.from({ length: totalQuestions }).map((_, index) => {
        const state = 
          index === currentIndex ? 'active' :
          selections[index] !== null ? 'completed' :
          'pending';
        
        return (
          <div 
            key={index}
            className={GigiStyles.getProgressClasses(state)}
          />
        );
      })}
    </div>
  );
}
```

---

## 🎨 Ejemplo Completo: Botón Cromado Personalizado

```tsx
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { GigiStyles } from '@/lib/utils/gigiStyles';

function GigiCustomButton({ children, onClick }: { 
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden px-6 py-3 rounded-2xl transition-all duration-500 hover:scale-105 active:scale-95 text-white"
      style={GigiStyles.getGradientStyle()}
    >
      {/* Capa de brillo hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={GigiStyles.getBrilloHoverStyle()}
      />
      
      {/* Reflejo metálico animado */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={GigiStyles.getReflejoMetalicoStyle()}
      />
      
      {/* Contenido */}
      <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
        <Sparkles className="w-5 h-5" />
        {children}
      </span>
    </button>
  );
}
```

---

## 📚 Referencia Rápida

| Función | Uso |
|---------|-----|
| `GigiStyles.colors.fucsia` | Color fucsia #FF2D95 |
| `GigiStyles.getFucsia(0.5)` | Fucsia con 50% opacidad |
| `GigiStyles.getTitleClasses('lg', true)` | Clases para título grande con icono |
| `GigiStyles.getCardClasses(true)` | Clases para tarjeta interactiva |
| `GigiStyles.getProgressClasses('active')` | Clases para indicador activo |
| `GigiStyles.getRadioClasses(true)` | Clases para radio seleccionado |
| `GigiStyles.getGradientStyle()` | Estilo inline para gradiente cromado |
| `GigiStyles.combine(...classes)` | Combinar clases con condicionales |

---

## ✅ Checklist de Uso

Cuando crees un nuevo componente relacionado con Gigi:

- [ ] Importar `GigiStyles` desde `/lib/utils/gigiStyles`
- [ ] Usar `getTitleClasses()` para títulos
- [ ] Usar `getCardClasses()` para tarjetas
- [ ] Usar `getProgressClasses()` para indicadores
- [ ] Usar `getRadioClasses()` para radio buttons
- [ ] Usar `getGradientStyle()` para botones cromados
- [ ] Aplicar `focusRing` para estados de focus
- [ ] Verificar consistencia con `GigiStyleShowcase`

---

## 🎓 Tips

1. **Consistencia**: Siempre usa las utilidades en lugar de valores hardcodeados
2. **Opacidad**: Usa `getFucsia(opacity)` para variaciones sutiles
3. **Combinación**: Usa `combine()` para unir clases condicionales
4. **Referencia**: Consulta `GigiColorReference` para recordatorio rápido
5. **Demostración**: Mira `GigiStyleShowcase` para ver todos los estilos en acción

---

**Última actualización:** 2 de noviembre de 2025
