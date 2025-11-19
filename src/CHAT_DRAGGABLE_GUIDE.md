# 🎯 Guía del Chat Widget Draggable (Movible)

## ✨ Nueva Funcionalidad Implementada

El Chat Widget y el Panel de Desarrollo (DevQuickAccess) ahora son **completamente movibles** y **no tapan la navegación**.

---

## 📍 Cambios de Posición

### Antes
- ❌ Chat: `bottom-6 right-6` (tapaba pestañas)
- ❌ DevPanel: `bottom-6 right-6` (conflicto con chat)

### Ahora
- ✅ Chat: `bottom-6 left-6` (esquina inferior izquierda)
- ✅ DevPanel: `top-6 right-6` (esquina superior derecha)
- ✅ **Ambos son DRAGGABLE** (arrastrables)

---

## 🎮 Cómo Usar

### Chat Widget

#### 1. **Botón Flotante**
```tsx
// Características:
- Posición inicial: bottom-left
- Draggable completo
- Cursor: grab → grabbing
- Constraints (límites de arrastre)
- Icono de "Move" visible al hover
- Animación de pulso
```

**Acciones:**
- 🖱️ **Click**: Abrir chat
- 👆 **Drag**: Mover a cualquier posición
- 👁️ **Hover**: Ver icono de mover

#### 2. **Ventana de Chat**
```tsx
// Características:
- Draggable desde el header
- Icono de "Move" en el header
- Cursor: move en el header
- Constraints de pantalla
- Mantiene posición al minimizar
```

**Acciones:**
- 🖱️ **Drag Header**: Mover ventana
- ✖️ **Click X**: Cerrar
- ⬇️ **Minimizar**: Colapsar

---

## 🎓 Tutorial Integrado

### ChatWidgetTutorial Component

**Ubicación:** `/components/ChatWidgetTutorial.tsx`

**Funcionalidad:**
- ✅ Se muestra solo la primera vez
- ✅ Overlay semi-transparente
- ✅ Instrucciones paso a paso
- ✅ Flecha animada apuntando al botón
- ✅ Se guarda en localStorage cuando se cierra

**Pasos del Tutorial:**
1. **Arrastra el botón** del chat a cualquier parte
2. **Arrastra la ventana** desde el encabezado
3. **Encuentra tu posición ideal**

**LocalStorage Key:**
```javascript
chatWidgetTutorialShown: 'true'
```

---

## 🔧 Implementación Técnica

### ChatWidget.tsx

#### Estado de Posición
```typescript
const [position, setPosition] = useState({ x: 0, y: 0 });
const dragControls = useDragControls();
```

#### Botón Draggable
```tsx
<motion.button
  drag
  dragMomentum={false}
  dragElastic={0.1}
  dragConstraints={{
    top: -window.innerHeight + 200,
    left: -window.innerWidth + 200,
    right: 100,
    bottom: 100,
  }}
  onDragEnd={(event, info) => {
    setPosition({ 
      x: position.x + info.offset.x, 
      y: position.y + info.offset.y 
    });
  }}
  className="cursor-grab active:cursor-grabbing"
>
  {/* Icono de Move visible al hover */}
  <motion.div className="opacity-0 group-hover:opacity-100">
    <Move className="w-3 h-3 text-white" />
  </motion.div>
</motion.button>
```

#### Ventana Draggable
```tsx
<motion.div
  drag
  dragListener={false}
  dragControls={dragControls}
  className="fixed bottom-6 left-6"
>
  {/* Header con drag handle */}
  <div 
    className="cursor-move"
    onPointerDown={(e) => dragControls.start(e)}
  >
    <Move className="w-4 h-4" title="Arrastrar" />
  </div>
</motion.div>
```

---

## 🎨 Características UX

### Feedback Visual

**Cursores:**
- `cursor-grab`: Cuando el elemento es arrastrable
- `cursor-grabbing`: Durante el arrastre
- `cursor-move`: En áreas de arrastre

**Iconos:**
```tsx
// Botón flotante
<Move className="w-3 h-3 text-white opacity-0 group-hover:opacity-100" />

// Header ventana
<Move className="w-4 h-4 text-white/60" />
```

**Animaciones:**
- Smooth drag con `dragMomentum={false}`
- Elastic boundaries con `dragElastic={0.1}`
- Pulse animation continua
- Transiciones spring

---

## 📱 Responsive

### Constraints (Límites)

```typescript
// Botón Flotante
dragConstraints={{
  top: -window.innerHeight + 200,    // No salir arriba
  left: -window.innerWidth + 200,    // No salir izquierda
  right: 100,                        // Margen derecho
  bottom: 100,                       // Margen inferior
}}

// Ventana Chat
dragConstraints={{
  top: -window.innerHeight + 200,
  left: -window.innerWidth + 450,    // Más margen (ventana más ancha)
  right: 50,
  bottom: 50,
}}
```

### Mobile Considerations
- Touch events soportados
- Gestos nativos
- Constraints ajustados a viewport
- Botones grandes para touch

---

## 🛠️ DevQuickAccess

### Cambios Implementados

**Posición:**
```tsx
// Antes: bottom-6 right-6
// Ahora: top-6 right-6
className="fixed top-6 right-6 z-[9996]"
```

**Panel:**
```tsx
// Se despliega hacia abajo
className="absolute top-20 right-0"

// Scroll mejorado
max-h-[calc(100vh-220px)]
```

**Tooltip:**
- Ahora apunta hacia arriba
- Flecha invertida
- Mejor posicionamiento

---

## 🎯 Z-Index Hierarchy

```css
/* Jerarquía de capas */
NavigationBarApp:    z-50
DevQuickAccess:      z-[9996]
ChatWidget (botón):  z-[9997]
ChatWidget (ventana): z-[9998]
Tutorial Overlay:    z-[9999]
Tutorial Content:    z-[10000]
Modales:            z-[9999]
```

---

## 💡 Mejores Prácticas

### Para Usuarios

1. **Primera vez:**
   - Lee el tutorial completo
   - Experimenta moviendo el botón
   - Encuentra tu posición favorita

2. **Uso diario:**
   - Mueve el chat si tapa contenido
   - Usa el header para reposicionar ventana
   - El DevPanel está arriba-derecha (solo desarrollo)

### Para Desarrolladores

1. **Agregar más widgets draggables:**
```tsx
import { motion, useDragControls } from 'motion/react';

const [position, setPosition] = useState({ x: 0, y: 0 });
const dragControls = useDragControls();

<motion.div
  drag
  dragControls={dragControls}
  onDragEnd={(e, info) => {
    setPosition({
      x: position.x + info.offset.x,
      y: position.y + info.offset.y
    });
  }}
/>
```

2. **Guardar posición:**
```typescript
// Guardar en localStorage
useEffect(() => {
  const saved = localStorage.getItem('chatPosition');
  if (saved) {
    setPosition(JSON.parse(saved));
  }
}, []);

// Actualizar al mover
const handleDragEnd = (e, info) => {
  const newPos = {
    x: position.x + info.offset.x,
    y: position.y + info.offset.y
  };
  setPosition(newPos);
  localStorage.setItem('chatPosition', JSON.stringify(newPos));
};
```

---

## 🐛 Troubleshooting

### Problema: El widget desaparece fuera de la pantalla

**Solución:**
```typescript
// Reset position
const resetPosition = () => {
  setPosition({ x: 0, y: 0 });
  localStorage.removeItem('chatPosition');
};
```

### Problema: El drag no funciona en mobile

**Solución:**
```tsx
// Asegurar touch events
<motion.div
  drag
  dragMomentum={false}
  dragElastic={0.1}
  onPanStart={(e) => e.stopPropagation()}
/>
```

### Problema: Conflicto con scroll

**Solución:**
```tsx
// Usar dragListener={false} y dragControls
const dragControls = useDragControls();

<motion.div
  drag
  dragListener={false}
  dragControls={dragControls}
>
  <div onPointerDown={(e) => dragControls.start(e)}>
    {/* Solo esta área inicia el drag */}
  </div>
</motion.div>
```

---

## 📊 Testing

### Checklist de Pruebas

- [ ] Botón se mueve en todas direcciones
- [ ] No sale de la pantalla (constraints)
- [ ] Cursor cambia correctamente
- [ ] Icono de Move visible al hover
- [ ] Ventana se mueve desde header
- [ ] Tutorial aparece la primera vez
- [ ] Tutorial no reaparece después de cerrar
- [ ] DevPanel no tapa navegación
- [ ] Chat no tapa navegación
- [ ] Funciona en mobile (touch)
- [ ] Funciona en tablet
- [ ] Funciona en desktop
- [ ] Z-index correcto en todos los casos

---

## 🚀 Próximas Mejoras

### Funcionalidades Planeadas

1. **Guardar Posición del Usuario**
   - Persistir en localStorage
   - Recordar entre sesiones
   - Reset a default

2. **Snap to Corners**
   - Magnetismo a esquinas
   - Mejor UX en mobile
   - Animación suave

3. **Posiciones Predefinidas**
   - 4 esquinas
   - Centros laterales
   - Selector rápido

4. **Minimizar a Botón**
   - Reducir ventana a botón flotante
   - Mantener posición
   - Animación fluida

---

## 📝 Changelog

### v2.1.0 - Chat Draggable
**2024-11-02**

**Added:**
- ✅ Chat Widget draggable (botón y ventana)
- ✅ DevQuickAccess movido a top-right
- ✅ Tutorial interactivo primera vez
- ✅ Icono Move en elementos draggables
- ✅ Constraints de pantalla
- ✅ Cursores apropiados
- ✅ Z-index hierarchy documentado

**Fixed:**
- ✅ Chat ya no tapa navegación inferior
- ✅ DevPanel ya no tapa navegación
- ✅ Conflictos de posicionamiento

**Improved:**
- ✅ UX más intuitiva
- ✅ Feedback visual mejorado
- ✅ Tutorial contextual
- ✅ Documentación completa

---

## 🎓 Recursos Adicionales

### Motion (Framer Motion) Docs
- [Drag Controls](https://www.framer.com/motion/use-drag-controls/)
- [Drag Constraints](https://www.framer.com/motion/gestures/#drag)
- [Pan Gestures](https://www.framer.com/motion/gestures/#pan)

### Ejemplos de Código
Ver implementación completa en:
- `/components/ChatWidget.tsx`
- `/components/ChatWidgetTutorial.tsx`
- `/components/DevQuickAccess.tsx`

---

**Autor:** Auréthica Team  
**Última actualización:** 2 Noviembre 2024  
**Versión:** 2.1.0
