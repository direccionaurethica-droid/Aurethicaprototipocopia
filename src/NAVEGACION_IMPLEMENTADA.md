# 🧭 Sistema de Navegación - Auréthica

## ✅ Estado: IMPLEMENTADO Y FUNCIONAL

---

## 🎯 Características Principales

### **Barra de Navegación Superior Fija**
- **Posición:** Fixed top, siempre visible
- **Diseño:** Minimalista y editorial siguiendo la estética de Auréthica
- **Responsive:** Adaptación completa móvil/desktop

---

## 🎨 Diseño Visual

### **Logo y Marca**
- Logo circular con gradiente verde esmeralda (#013220) a dorado (#C9A24F)
- Ícono Sparkles en el centro
- Tipografía serif para "Auréthica" (Playfair Display)
- Efecto hover con escala y color dorado

### **Navegación Desktop**
- Links horizontales con íconos emoji
- Indicador visual de sección activa (línea degradada fucsia-dorado)
- Efecto hover con barra dorada
- Animación de transición suave con `layoutId`

### **Navegación Móvil**
- Menú hamburger en la esquina superior derecha
- Panel deslizante desde la derecha con animación spring
- Backdrop blur con overlay oscuro
- Items con iconos y animación escalonada de entrada
- Indicador visual de sección activa (borde fucsia izquierdo)

---

## 📱 Secciones de Navegación

### **Items del Menú:**

1. **✨ Inicio** (`hero-section`)
   - Hero/Landing con banner de Auréthica

2. **💡 Cómo Funciona** (`how-it-works`)
   - Explicación del proceso de Auréthica

3. **💕 Conoce a Gigi** (`gigi-intro`)
   - Ventana 0 + Calibración de Gigi

4. **🎯 Test** (`aurethica-test`)
   - **Aparece dinámicamente** solo después de completar la calibración
   - Test personalizado de Auréthica

5. **📖 Blog** (`blog-section`)
   - Sección tipo Instagram con contenido inspiracional

---

## 🔄 Funcionalidades Interactivas

### **Detección de Sección Activa**
- Sistema de detección automática con `IntersectionObserver`
- Actualización del estado basada en `scrollY` y `getBoundingClientRect()`
- Indicador visual que sigue al usuario mientras navega

### **Scroll Suave**
- Navegación con `scrollIntoView({ behavior: 'smooth' })`
- Ajuste automático de `scroll-padding-top` para compensar la altura del navbar
- Desktop: 5rem (80px)
- Móvil: 4rem (64px)

### **Estado del Navbar**
- **Transparente** al inicio (scroll = 0)
- **Opaco con blur y sombra** después de scroll > 20px
- Transición suave de 300ms
- Borde dorado sutil (#C9A24F/20)

---

## 🎬 Animaciones

### **Entrada del Navbar**
```typescript
initial={{ y: -100 }}
animate={{ y: 0 }}
transition={{ type: 'spring', stiffness: 100, damping: 20 }}
```

### **Menú Móvil**
```typescript
// Panel
initial={{ x: '100%' }}
animate={{ x: 0 }}
exit={{ x: '100%' }}
transition={{ type: 'spring', damping: 30, stiffness: 300 }}

// Items (escalonado)
transition={{ delay: index * 0.05 }}
```

### **Indicador de Sección Activa**
```typescript
<motion.div layoutId="activeSection" />
// Transición suave entre secciones con shared layout animation
```

---

## 💎 CTA Button

### **Desktop:**
- Botón "Comenzar Test" a la derecha del navbar
- Gradiente fucsia Gigi (#FF2D95)
- Sombra y efectos hover

### **Móvil:**
- Mismo botón al final del menú deslizante
- Separado por borde superior
- Full width para mejor UX en móvil

---

## 🛠️ Implementación Técnica

### **Componente:** `/components/NavigationBar.tsx`
```typescript
interface NavigationBarProps {
  showTest: boolean; // Controla si se muestra el item "Test"
}
```

### **Estado Local:**
- `isScrolled`: Detecta si el usuario ha scrolleado
- `isMobileMenuOpen`: Controla apertura del menú móvil
- `activeSection`: Identifica la sección actual visible

### **Integración en App.tsx:**
```typescript
<NavigationBar showTest={showTest} />
```

---

## 📐 CSS y Scroll Snap

### **Ajustes en `globals.css`:**
```css
html {
  scroll-snap-type: y mandatory;
  scroll-padding-top: 5rem; /* Desktop */
}

@media (max-width: 768px) {
  html {
    scroll-snap-type: y proximity;
    scroll-padding-top: 4rem; /* Móvil */
  }
}
```

### **Secciones:**
```css
.scroll-section {
  min-height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
```

---

## 🎨 Paleta de Colores Usada

- **Logo degradado:** Verde esmeralda (#013220) → Dorado (#C9A24F)
- **Texto principal:** Verde esmeralda (#013220)
- **Texto secundario:** Piedra (#6E7276)
- **Hover:** Dorado (#C9A24F)
- **CTA:** Fucsia Gigi (#FF2D95)
- **Indicador activo:** Degradado Dorado → Fucsia → Dorado
- **Fondo navbar scrolled:** Blanco/95 con backdrop blur

---

## ✨ Características Especiales

### **1. Detección Automática de Sección**
El navbar detecta automáticamente en qué sección estás y marca el item correspondiente

### **2. Aparición Dinámica del Test**
El item "Test" solo aparece en el menú después de que el usuario complete la calibración de Gigi

### **3. Responsive Total**
- Desktop: Navbar horizontal con todos los items visibles
- Tablet: Mismo diseño desktop
- Móvil: Hamburger menu con panel deslizante

### **4. Accesibilidad**
- Estados hover claros
- Focus states
- Indicadores visuales de sección activa
- Animaciones respetan `prefers-reduced-motion`

### **5. Performance**
- Animaciones GPU-accelerated con `transform`
- Event listeners optimizados
- Cleanup de effects en componentes

---

## 🚀 Mejoras Futuras Sugeridas

- [ ] Añadir tooltips en desktop para items del menú
- [ ] Progreso visual de completación del test
- [ ] Badge de "nuevo" en el item Blog cuando hay contenido nuevo
- [ ] Shortcut keyboard (Escape para cerrar móvil menu)
- [ ] Añadir breadcrumbs en el test para navegación interna

---

## 📝 Notas de Uso

### **Para Desarrolladores:**
1. El componente `NavigationBar` debe recibir `showTest={boolean}`
2. Todas las secciones deben tener un `id` único
3. El spacer (`<div className="h-16 md:h-20" />`) compensa la altura del navbar fijo
4. No modificar los `id`s de las secciones sin actualizar el array `navItems`

### **Para Diseñadores:**
1. Los emojis pueden cambiarse en el array `navItems`
2. Los colores siguen la paleta de Auréthica
3. Las animaciones son configurables vía props de Motion

---

## ✅ Verificación

| Característica | Estado | Archivo |
|---------------|--------|---------|
| Navbar Superior Fijo | ✅ | `/components/NavigationBar.tsx` |
| Menú Desktop | ✅ | `/components/NavigationBar.tsx` |
| Menú Móvil | ✅ | `/components/NavigationBar.tsx` |
| Detección de Sección | ✅ | `/components/NavigationBar.tsx` |
| Scroll Suave | ✅ | `/styles/globals.css` |
| CTA Button | ✅ | `/components/NavigationBar.tsx` |
| Integración en App | ✅ | `/App.tsx` |
| Responsive Design | ✅ | `/components/NavigationBar.tsx` |
| Animaciones | ✅ | `/components/NavigationBar.tsx` |
| Estética Auréthica | ✅ | `/components/NavigationBar.tsx` |

---

## 🎯 Estado Final

**Sistema de navegación completamente funcional, estético y responsive, integrado perfectamente con la identidad visual de Auréthica.**

✨ **Listo para producción**
