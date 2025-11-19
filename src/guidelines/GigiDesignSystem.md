# Sistema de Diseño Cromático de Gigi

## Filosofía Visual
Gigi, la asistente personalizada de IA de Auréthica, tiene una identidad visual distintiva basada en **acabados cromados** que combinan fucsia, verde esmeralda y dorado. Este tratamiento cromático diferencia a Gigi del resto de la plataforma mientras mantiene la armonía con la paleta general.

---

## Paleta Cromática de Gigi

### Color Principal: Fucsia Gigi
```css
--auretica-gigi: #FF2D95
```

**Uso:**
- Títulos y encabezados relacionados con Gigi
- Iconos de la IA
- Indicadores de progreso en calibración
- Elementos interactivos (selecciones, radio buttons, etc.)
- Textos de énfasis de Gigi

### Gradiente Cromado Gigi
```css
/* Gradiente: Fucsia a Dorado */
background: linear-gradient(135deg, #FF2D95 0%, #C9A24F 100%);

/* Texto sobre el gradiente */
color: #013220; /* Verde Auréthica */
```

**Componentes:**
1. **Inicio**: Fucsia Gigi (#FF2D95) - Representa la IA
2. **Centro**: Dorado viejo (#C9A24F) - Transición armónica
3. **Final**: Verde esmeralda (#013220) - Conexión con Auréthica

**Uso:**
- Botones de acción de Gigi
- Botones "Atrás" en navegación de calibración
- Elementos call-to-action relacionados con la asistente

### Efectos Cromados

#### Sombras con Glow Fucsia
```css
box-shadow: 
  0 4px 20px rgba(255, 45, 149, 0.4),
  0 0 40px rgba(255, 45, 149, 0.25),
  inset 0 1px 0 rgba(255, 255, 255, 0.4);
```

#### Capa de Brillo Hover
```css
background: linear-gradient(
  135deg,
  rgba(255, 255, 255, 0.5) 0%,
  transparent 50%,
  rgba(255, 45, 149, 0.4) 100%
);
```

#### Reflejo Metálico Animado
```css
background: linear-gradient(
  90deg,
  transparent 0%,
  rgba(255, 255, 255, 0.6) 50%,
  transparent 100%
);
backgroundSize: 200% 100%;
animation: 2.5s linear infinite;
```

---

## Componentes Implementados

### 1. ChromeButton - Variante Gigi
```tsx
<ChromeButton variant="gigi">
  Contenido del botón
</ChromeButton>
```

**Características:**
- Gradiente cromado fucsia → dorado → verde
- Reflejo metálico animado (2.5s)
- Glow fucsia intensificado
- Hover con brillo superior

### 2. GigiCalibration
**Elementos con tratamiento Gigi:**
- ✅ Títulos de preguntas (Playfair Display + fucsia)
- ✅ Contador de preguntas (con icono Sparkles fucsia)
- ✅ Indicador de progreso (barra activa fucsia)
- ✅ Botón "Atrás" (gradiente cromado)
- ✅ Opciones seleccionadas (borde y fondo fucsia)
- ✅ Resumen final (tarjeta con borde fucsia)
- ✅ Indicador "Última pregunta" (borde cromado)

### 3. BeautyTest  
**Elementos con tratamiento Gigi:**
- ✅ Mensaje de bienvenida (borde fucsia)
- ✅ Botón "Atrás" (gradiente cromado)
- ✅ Sección "Tu Gigi Personalizada" (fondo degradado fucsia)
- ✅ Avatar circular de Gigi (gradiente fucsia → dorado)

---

## Reglas de Uso

### ✅ USAR Fucsia/Cromado para:
1. Títulos de secciones donde Gigi es protagonista
2. Iconos que representan a la IA (Sparkles, corazones, avatares)
3. Botones de acción principales en contextos de Gigi
4. Indicadores de progreso en calibración
5. Elementos seleccionados/activos en interfaz de Gigi
6. Mensajes y burbujas de diálogo de Gigi
7. Badges y etiquetas que identifican a Gigi

### ❌ NO USAR Fucsia/Cromado para:
1. Elementos del test de Auréthica (usar verde esmeralda)
2. Navegación general de la app (usar paleta base)
3. Contenido del blog (usar dorado como acento)
4. Backgrounds principales (usar marfil #F5F2E9)
5. Textos de contenido largo (usar gris piedra #6E7276)

---

## Armonía con Paleta General

### Fondo Neutro
```css
background: #F5F2E9 (Marfil cálido)
```
El fucsia de Gigi destaca sobre el fondo neutral sin saturar.

### Texto Oscuro
```css
color: #101418 (Tinta Auréthica)
color: #6E7276 (Piedra)
```
Se mantiene para legibilidad, solo los títulos de Gigi usan fucsia.

### Acentos Dorados
```css
accent: #C9A24F (Dorado viejo)
```
Forma parte del gradiente cromado, creando coherencia.

### Verde Esmeralda
```css
primary: #013220
```
Punto final del gradiente, conecta Gigi con Auréthica.

---

## Ejemplos de Implementación

### Título de Sección Gigi
```tsx
<h3 
  style={{ fontFamily: 'Playfair Display, serif' }}
  className="text-[#FF2D95] text-xl md:text-2xl flex items-center gap-2"
>
  <Sparkles className="w-6 h-6" />
  Calibración de Gigi
</h3>
```

### Indicador de Progreso
```tsx
<div className={`
  h-2 rounded-full
  ${isActive 
    ? 'w-12 bg-[#FF2D95] shadow-md shadow-[#FF2D95]/30' 
    : 'w-2 bg-[#6E7276]/20'
  }
`} />
```

### Tarjeta con Borde Gigi
```tsx
<div className="
  p-6 
  bg-gradient-to-r from-[#FF2D95]/5 via-white to-[#C9A24F]/5 
  rounded-2xl 
  border border-[#FF2D95]/20
">
  {/* Contenido */}
</div>
```

### Radio Button Seleccionado
```tsx
<div className={`
  w-6 h-6 rounded-full border-2
  ${isSelected 
    ? 'border-[#FF2D95] bg-[#FF2D95]' 
    : 'border-[#6E7276]/40 hover:border-[#FF2D95]/60'
  }
`}>
  {isSelected && (
    <div className="w-2.5 h-2.5 rounded-full bg-white" />
  )}
</div>
```

---

## Accesibilidad

### Contraste de Color
- ✅ Fucsia #FF2D95 sobre blanco: **Ratio 3.95:1** (AA para UI grande)
- ✅ Fucsia #FF2D95 sobre marfil #F5F2E9: **Ratio 3.72:1** (AA para UI grande)
- ⚠️ No usar fucsia para texto de cuerpo pequeño

### Uso Semántico
- El fucsia siempre indica "Gigi/IA"
- Mantener consistencia: no usar fucsia fuera de contextos de Gigi
- Los usuarios aprenden: "fucsia = asistente IA"

### Focus States
```tsx
className="
  focus:outline-none
  focus:ring-2
  focus:ring-[#FF2D95]
  focus:ring-offset-2
"
```

---

## Animaciones de Gigi

### Breathing
```css
@keyframes gigi-breathing-calibration {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
.gigi-breathing {
  animation: gigi-breathing-calibration 3s ease-in-out infinite;
}
```

### Sparkle Icon Pulse
```tsx
<motion.div
  animate={{ 
    scale: [1, 1.2, 1],
    opacity: [1, 0.8, 1]
  }}
  transition={{ 
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
  <Sparkles className="text-[#FF2D95]" />
</motion.div>
```

---

## Checklist de Implementación

Al añadir un nuevo elemento relacionado con Gigi:

- [ ] ¿Es un título/encabezado? → Usar fucsia (#FF2D95)
- [ ] ¿Es un icono de IA? → Usar Sparkles + fucsia
- [ ] ¿Es un botón de acción? → Usar ChromeButton variant="gigi"
- [ ] ¿Es un indicador activo? → Usar fucsia con sombra
- [ ] ¿Es un contenedor/tarjeta? → Usar borde fucsia/20 + fondo gradiente sutil
- [ ] ¿Es texto de cuerpo? → Mantener gris (#6E7276), solo énfasis en fucsia
- [ ] ¿Necesita animación? → Aplicar breathing o pulse suave

---

## Última actualización
2 de noviembre de 2025
