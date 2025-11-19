# 🎨 Sistema de Navegación Visual con Iconos y Secciones Colapsables

## ✅ Estado: IMPLEMENTADO Y FUNCIONAL

---

## 🎯 Concepto Principal

**Navegación visual con iconos ilustrativos SVG** donde cada sección está "escondida" detrás de su dibujo y se despliega/colapsa al hacer clic en el icono.

---

## 🖼️ Iconos SVG Ilustrativos Personalizados

### **1. ✨ Inicio (hero-section)**
- **Diseño:** Estrella brillante con gradiente dorado → fucsia
- **Animación:** Pulso de brillo en el centro
- **Significado:** Bienvenida radiante

### **2. ⚙️ Cómo Funciona (how-it-works)**
- **Diseño:** Dos engranajes entrelazados (verde esmeralda + dorado)
- **Animación:** Rotación continua 360°
- **Significado:** Proceso y mecánica del sistema

### **3. 💕 Conoce a Gigi (gigi-intro)**
- **Diseño:** Corazón fucsia con brillo
- **Animación:** Latido del corazón (breathing)
- **Significado:** Conexión emocional con Gigi

### **4. 🎯 Test (aurethica-test)**
- **Diseño:** Lista de verificación con check dorado
- **Animación:** Pulso en círculo fucsia superior
- **Significado:** Evaluación y descubrimiento
- **Especial:** Solo aparece después de calibrar Gigi

### **5. 📖 Blog (blog-section)**
- **Diseño:** Libro abierto con páginas y marcador fucsia
- **Animación:** Marcador flotante
- **Significado:** Inspiración y conocimiento

---

## 🎨 Paleta de Colores en los Iconos

- **Verde esmeralda:** `#013220` (estructura principal)
- **Dorado viejo:** `#C9A24F` (detalles y acentos)
- **Fucsia Gigi:** `#FF2D95` (elementos especiales)
- **Marfil:** `#F5F2E9` (fondos y rellenos)
- **Piedra:** `#6E7276` (elementos secundarios)
- **Blanco:** Para brillos y highlights

---

## 📐 Diseño de la Navegación

### **Desktop - Barra Vertical Izquierda**
```
Posición: Fixed left, centrada verticalmente
Diseño: Panel flotante con blur y sombra
Iconos: 56x56px con espaciado de 16px
```

**Características:**
- ✅ Panel redondeado con `backdrop-blur-md`
- ✅ Iconos en tarjetas de 56x56px con bordes redondeados
- ✅ Indicador de estado (ChevronUp/Down) en esquina inferior derecha
- ✅ Tooltip expandido al hacer hover con label + subtitle
- ✅ Logo "A" de Auréthica en la parte inferior

### **Móvil - Barra Inferior Fija**
```
Posición: Fixed bottom, ancho completo
Diseño: Barra horizontal con blur
Iconos: 48x48px distribuidos equitativamente
```

**Características:**
- ✅ Íconos más pequeños (48x48px)
- ✅ Labels de una palabra debajo de cada icono
- ✅ Indicador de sección activa (punto fucsia arriba)
- ✅ Animación escalonada de entrada

---

## 🔄 Sistema de Secciones Colapsables

### **Estado de las Secciones**
```typescript
const [openSections, setOpenSections] = useState<string[]>(['hero-section']);
```

- **Por defecto:** Solo "Inicio" está abierto
- **Comportamiento exclusivo:** Solo UNA sección puede estar abierta a la vez
- **Al abrir una sección:** La anterior se cierra automáticamente
- **Transiciones:** Suaves con Motion (500ms ease-in-out)

### **Lógica de Toggle Exclusivo**
```typescript
const handleSectionToggle = (sectionId: string, isOpen: boolean) => {
  setOpenSections(prev => {
    if (isOpen) {
      // Solo esta sección abierta - cierra todas las demás
      return [sectionId];
    } else {
      // Si se hace clic en la sección abierta, cerrarla
      return [];
    }
  });
};
```

**Ejemplo de flujo:**
1. Usuario está en "Inicio" (abierto por defecto)
2. Click en "Blog" → "Inicio" se cierra, "Blog" se abre
3. Click en "Cómo Funciona" → "Blog" se cierra, "Cómo Funciona" se abre
4. Click en "Cómo Funciona" nuevamente → "Cómo Funciona" se cierra (todas cerradas)

### **Animaciones de Colapso/Expansión**
```typescript
initial={{ height: 0, opacity: 0 }}
animate={{ height: 'auto', opacity: 1 }}
exit={{ height: 0, opacity: 0 }}
transition={{ duration: 0.5, ease: 'easeInOut' }}
```

---

## 🎬 Interacciones

### **1. Click en Icono**
- Alterna el estado abierto/cerrado de la sección
- Animación de escala y rotación del icono (1.1x, 5°)
- Cambio de color de fondo:
  - **Cerrado:** Marfil (#F5F2E9)
  - **Abierto:** Gradiente fucsia → dorado

### **2. Hover en Icono (Desktop)**
- Escala del icono a 1.1x con rotación 5°
- Tooltip aparece a la derecha con:
  - Label principal
  - Subtitle descriptivo
  - Flecha indicadora
- Opacidad del icono aumenta

### **3. Estado Visual del Icono**
- **Indicador circular:** ChevronUp (abierto) / ChevronDown (cerrado)
- **Color del indicador:** Verde esmeralda (abierto) / Piedra (cerrado)
- **Fondo del botón:** Gradiente (abierto) / Marfil (cerrado)

---

## ✨ Características Especiales

### **1. Animación de Entrada Escalonada**
```typescript
transition={{ delay: 0.7 + index * 0.1 }} // Desktop
transition={{ delay: 0.6 + index * 0.08 }} // Móvil
```

### **2. Tooltip con Flecha**
Solo en desktop, aparece al hacer hover:
- Label y subtitle
- Flecha CSS apuntando al icono
- Animación de fade-in desde la izquierda

### **3. Logo Auréthica**
En desktop, debajo de los iconos:
- Círculo con gradiente verde → dorado
- Letra "A" serif blanca
- Fade-in retrasado (delay: 1.5s)

### **4. Indicador Activo Móvil**
```typescript
<motion.div layoutId="activeMobileSection" />
```
Punto fucsia que se mueve suavemente entre secciones activas

---

## 🛠️ Implementación Técnica

### **Componente Principal**
```
/components/NavigationBar.tsx
```

### **Props Interface**
```typescript
interface NavigationBarProps {
  showTest: boolean;              // Controla visibilidad del Test
  onSectionToggle: (sectionId: string, isOpen: boolean) => void;
  openSections: string[];         // Array de secciones abiertas
}
```

### **Estructura de navItems**
```typescript
{
  id: 'section-id',
  label: 'Título Principal',
  subtitle: 'Descripción Corta',
  icon: SectionIcons.iconName  // Componente SVG
}
```

### **Iconos SVG**
Todos los iconos están definidos como componentes funcionales en `SectionIcons`:
```typescript
const SectionIcons = {
  hero: () => <svg>...</svg>,
  howItWorks: () => <svg>...</svg>,
  gigi: () => <svg>...</svg>,
  test: () => <svg>...</svg>,
  blog: () => <svg>...</svg>
};
```

---

## 📱 Responsive Breakpoints

### **Desktop (lg+)**
- Barra vertical izquierda visible
- Tooltips habilitados
- Logo Auréthica visible
- Barra móvil oculta

### **Móvil (<lg)**
- Barra vertical oculta
- Barra inferior visible
- Labels de una palabra
- Indicador de punto activo

---

## 🎨 Estilos CSS Relevantes

### **Panel Desktop**
```css
.bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#C9A24F]/20 p-3
```

### **Botón de Icono**
```css
/* Cerrado */
.bg-[#F5F2E9] hover:bg-gradient-to-br hover:from-[#F5F2E9] hover:to-white

/* Abierto */
.bg-gradient-to-br from-[#FF2D95] to-[#C9A24F] shadow-lg
```

### **Tooltip**
```css
.bg-white rounded-xl shadow-xl border border-[#C9A24F]/20 px-4 py-3
```

---

## 🔄 Flujo de Usuario

1. **Usuario llega a la app** → Solo "Inicio" está visible
2. **Click en "Cómo Funciona"** → "Inicio" se cierra, "Cómo Funciona" se abre
3. **Click en "Blog"** → "Cómo Funciona" se cierra, "Blog" se abre
4. **Scroll automático** → Va a la sección recién abierta
5. **Hover en icono** → Tooltip muestra información
6. **Click en sección abierta** → Sección se colapsa (todas cerradas)
7. **Comportamiento exclusivo** → Solo UNA sección visible a la vez

---

## 🎯 Ventajas del Sistema

✅ **Navegación visual intuitiva** - Iconos claramente identificables
✅ **Control total del usuario** - Abrir/cerrar secciones a voluntad
✅ **Animaciones suaves** - Transiciones de 500ms ease-in-out
✅ **Feedback visual claro** - Estados abierto/cerrado evidentes
✅ **Responsive perfecto** - Adaptación desktop/móvil
✅ **Estética Auréthica** - Paleta de colores coherente
✅ **Iconos animados** - Vida y dinamismo en cada ilustración
✅ **Espacialmente eficiente** - Solo muestra contenido necesario

---

## 🎨 Paleta Visual Completa

| Elemento | Color | Uso |
|----------|-------|-----|
| Panel fondo | `white/95` | Fondo del navbar |
| Borde panel | `#C9A24F/20` | Borde sutil dorado |
| Icono cerrado | `#F5F2E9` | Fondo marfil |
| Icono abierto | Gradiente `#FF2D95` → `#C9A24F` | Fucsia a dorado |
| Indicador cerrado | `#6E7276` | Gris piedra |
| Indicador abierto | `#013220` | Verde esmeralda |
| Tooltip fondo | `white` | Blanco puro |
| Tooltip borde | `#C9A24F/20` | Dorado sutil |
| Labels activos | `#013220` | Verde esmeralda |
| Labels inactivos | `#6E7276` | Gris piedra |

---

## 📝 Notas de Desarrollo

### **Animaciones SVG**
Todas las animaciones SVG usan elementos `<animate>` y `<animateTransform>`:
- **Repetición:** `repeatCount="indefinite"`
- **Duración:** Entre 1.5s y 4s
- **Tipo:** Opacity, transform (rotate, translate)

### **Performance**
- Animaciones GPU-accelerated con `transform`
- `AnimatePresence` con `mode="wait"` evita glitches
- Event listeners optimizados

### **Accesibilidad**
- Estados hover claros
- Indicadores visuales de estado
- Transiciones respetan motion preferences (pendiente)

---

## 🚀 Mejoras Futuras Sugeridas

- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Respeto a `prefers-reduced-motion`
- [ ] Drag & drop para reordenar iconos
- [ ] Temas de color personalizables
- [ ] Shortcuts de teclado (números 1-5)
- [ ] Guardar estado en localStorage
- [ ] Transición más elaborada entre secciones

---

## ✅ Verificación Final

| Característica | Estado | Notas |
|---------------|--------|-------|
| Iconos SVG personalizados | ✅ | 5 iconos únicos animados |
| Navegación Desktop | ✅ | Barra vertical izquierda |
| Navegación Móvil | ✅ | Barra inferior fija |
| Sistema de colapso | ✅ | AnimatePresence + Motion |
| Tooltips hover | ✅ | Solo desktop |
| Indicadores de estado | ✅ | ChevronUp/Down |
| Animaciones entrada | ✅ | Escalonadas |
| Responsive completo | ✅ | lg breakpoint |
| Estética Auréthica | ✅ | Paleta coherente |
| Iconos animados | ✅ | SVG con animate |

---

## 🎯 Estado Final

**Sistema de navegación visual completamente rediseñado con iconos ilustrativos personalizados y secciones colapsables con transiciones suaves.**

**Las secciones se "esconden" detrás de sus iconos y se revelan al hacer clic, creando una experiencia interactiva y controlada por el usuario.**

✨ **Listo para producción**