# 🎨 SISTEMA DE AVATAR Y MODO APP - AURÉTHICA
## Flujo Completo: Onboarding → Avatar → Aplicación Principal

**Implementado:** 31 de Octubre, 2025  
**Versión:** 3.0 - Avatar Upload & App Mode

---

## 🎯 CONCEPTO GENERAL

La aplicación Auréthica ahora tiene **dos modos principales**:

1. **Modo Onboarding** - Primera vez del usuario:
   - Hero/Landing
   - Cómo funciona
   - Calibración de Gigi
   - Test de Auréthica
   - Registro
   - **Subida de 10 fotos para avatar** ← NUEVO
   
2. **Modo App** - Usuario registrado:
   - Blog (feed estilo Instagram)
   - Mi Perfil
   - Búsqueda
   - Gigi Helper (aro de mechón fucsia)

---

## 📋 FLUJO COMPLETO

```
┌─────────────────────────────────────────────────────────┐
│             MODO ONBOARDING (Primera Vez)               │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   1. Hero/Landing      │
              │   Bienvenida inicial   │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   2. Cómo Funciona     │
              │   Explicación proceso  │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   3. Botón Gigi        │
              │   Calibración de Gigi  │
              │   (5 preguntas)        │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   4. Test Auréthica    │
              │   (personalizado)      │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   5. Registro          │
              │   Datos de contacto    │
              └────────────┬───────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   6. Avatar Upload     │ ← NUEVO
              │   Subir 10 fotos       │
              │   Generar avatar AI    │
              └────────────┬───────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  MODO APP (Post-Registro)                │
│                                                          │
│   ┌──────────────┬──────────────┬──────────────┐       │
│   │    Blog      │   Mi Perfil  │   Búsqueda   │       │
│   │  (Instagram) │              │              │       │
│   └──────────────┴──────────────┴──────────────┘       │
│                                                          │
│   Navegación: [🔍] [✨] [👤] [💕 Gigi]                 │
└─────────────────────────────────────────────────────────┘
```

---

## 🆕 NUEVOS COMPONENTES

### 1. AvatarUpload.tsx

**Propósito:** Subir 10 fotos para generar avatar con IA

#### Características:

- ✅ **Upload de 10 fotos obligatorio**
- ✅ **Drag & Drop** habilitado
- ✅ **Preview de fotos** en grid 2x5 (mobile) / 5x2 (desktop)
- ✅ **Barra de progreso** visual
- ✅ **Eliminar fotos** individualmente
- ✅ **Placeholder boxes** para fotos faltantes
- ✅ **Consejos de mejores prácticas** incluidos

#### UI/UX:

```typescript
┌─────────────────────────────────────────┐
│  🎨 Crea tu Avatar Digital              │
│                                         │
│  ¡Ya casi terminamos!                   │
│                                         │
│  ████████░░ 8/10 fotos  80%            │
│                                         │
│  ┌────────────────────────────────────┐│
│  │  Arrastra tus fotos aquí           ││
│  │  o haz click para seleccionar      ││
│  └────────────────────────────────────┘│
│                                         │
│  ┌──┐┌──┐┌──┐┌──┐┌──┐                 │
│  │#1││#2││#3││#4││#5│                 │
│  └──┘└──┘└──┘└──┘└──┘                 │
│  ┌──┐┌──┐┌──┐┌ ┐┌ ┐                  │
│  │#6││#7││#8││ ││ │← Falta            │
│  └──┘└──┘└──┘└ ┘└ ┘                  │
│                                         │
│  ✨ Consejos para mejores resultados:  │
│  ✓ Diferentes ángulos (frente, perfil) │
│  ✓ Buena iluminación natural           │
│  ✓ Sin accesorios que cubran el rostro │
│                                         │
│  [ Generar mi Avatar ]                 │
└─────────────────────────────────────────┘
```

#### Props:

```typescript
interface AvatarUploadProps {
  onComplete: (photos: File[]) => void;
}
```

#### Funcionalidades:

- **handleFileSelect**: Maneja archivos desde input
- **handleDrop**: Maneja drag & drop
- **removePhoto**: Elimina foto por índice
- **FileReader**: Genera previews en base64

---

### 2. UserProfile.tsx

**Propósito:** Mostrar perfil del usuario y su avatar generado

#### Características:

- ✅ **Avatar circular** con ring dorado
- ✅ **Badge de Gigi** (tono personalizado)
- ✅ **Datos personales** (nombre, email, fecha registro)
- ✅ **Perfil de belleza** (estilo, colorimetría, preferencias)
- ✅ **Avatar digital** (preview + estado)
- ✅ **Botón editar** (opcional)

#### Secciones:

1. **Header con Avatar**
   - Avatar grande (128x128px)
   - Nombre y datos de contacto
   - Badge de tono Gigi
   - Botón editar

2. **Perfil de Belleza**
   - Estilo personal
   - Colorimetría
   - Preferencias (tags)

3. **Avatar Digital**
   - Preview del avatar generado
   - Estado de generación
   - Próximamente: probar estilos

#### Props:

```typescript
interface UserData {
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  avatarUrl?: string;
  gigiTone: string;
  beautyProfile: {
    estilo: string;
    colorimetria: string;
    preferencias: string[];
  };
}

interface UserProfileProps {
  userData: UserData;
  onEdit?: () => void;
}
```

---

### 3. NavigationBarApp.tsx

**Propósito:** Navegación para el modo app (post-registro)

#### Características Desktop:

```
┌──────────────────────────────────────────────┐
│  [A] Auréthica  [🔍Buscar][✨Blog][👤Perfil]  💕│
└──────────────────────────────────────────────┘
```

- Logo a la izquierda
- Navegación central con botones activos
- Aro de mechón de Gigi a la derecha

#### Características Mobile:

```
┌──────────────────────────────────────────┐
│                                          │
│              [CONTENIDO]                 │
│                                          │
└──────────────────────────────────────────┘
┌──────────────────────────────────────────┐
│  [🔍]     [✨]     [👤]     [💕]        │
│ Buscar   Blog   Perfil   Gigi          │
└──────────────────────────────────────────┘
```

- Barra inferior fija
- 4 botones: Búsqueda, Blog, Perfil, Gigi
- Indicador visual de sección activa

#### Ícono Especial: Aro de Mechón de Gigi

**SVG Animado:**
```svg
<svg>
  <!-- Aro exterior (fucsia claro) -->
  <circle r="45" stroke="#FF2D95" opacity="0.3" />
  
  <!-- Mechón central animado -->
  <path d="M 50 20 Q 45 35, 50 50 Q 55 35, 50 20">
    <animateTransform rotate="0 to 10 to -10 to 0" />
  </path>
  
  <!-- Mechones laterales -->
  <path d="M 35 30 Q 30 45, 35 60" />
  <path d="M 65 30 Q 70 45, 65 60" />
  
  <!-- Aro interior con brillo pulsante -->
  <circle r="35" stroke="#FF2D95">
    <animate opacity="0.5 to 1 to 0.5" />
  </circle>
  
  <!-- Corazón pequeño -->
  <path fill="#FF2D95" d="M 50 65 C..." />
</svg>
```

**Animaciones:**
- Mechón oscila suavemente (-10° a +10°)
- Brillo pulsante del aro interior
- Notificación opcional (dot rojo)

#### Props:

```typescript
interface NavigationBarAppProps {
  currentView: 'blog' | 'profile' | 'search';
  onViewChange: (view: 'blog' | 'profile' | 'search') => void;
}
```

---

### 4. SearchView.tsx

**Propósito:** Búsqueda de contenido en la app

#### Características:

- ✅ **Barra de búsqueda** con placeholder descriptivo
- ✅ **Tendencias** (5 temas más buscados)
- ✅ **Búsquedas recientes** (eliminables)
- ✅ **Consejos de búsqueda** (tips)

#### UI:

```
┌─────────────────────────────────┐
│ 🔍 Buscar estilos, tutoriales... │
└─────────────────────────────────┘

📈 Tendencias
━━━━━━━━━━━━━━━
1  Balayage natural      2.3k
2  Bob moderno           1.8k
3  Flequillo cortina     1.5k
4  Coloración sin...     1.2k
5  Peinados para...      980

🕐 Búsquedas recientes
━━━━━━━━━━━━━━━━━━━
[cortes de cabello] [✕]
[coloración rubio] [✕]
[cuidado cabello rizado] [✕]

💡 Consejos de búsqueda
━━━━━━━━━━━━━━━━━━━━
• Usa palabras específicas
• Busca por tipo de rostro
• Explora tendencias estacionales
```

---

## 🔄 GESTIÓN DE ESTADO EN APP.TSX

### Estados Globales:

```typescript
// Modo de la aplicación
const [appMode, setAppMode] = useState<'onboarding' | 'app'>('onboarding');

// Paso del onboarding
const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('hero');

// Vista de la app
const [appView, setAppView] = useState<AppView>('blog');

// Datos de calibración Gigi
const [gigiCalibration, setGigiCalibration] = useState<CalibrationSelection | null>(null);

// Datos de registro
const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);

// Fotos del avatar
const [avatarPhotos, setAvatarPhotos] = useState<File[]>([]);
```

### Flujo de Callbacks:

```typescript
handleCalibrationComplete(selections)
  ↓
setGigiCalibration(selections)
  ↓
handleTestComplete()
  ↓
handleRegistrationComplete(data)
  ↓
setRegistrationData(data)
  ↓
handleAvatarUploadComplete(photos)
  ↓
setAvatarPhotos(photos)
  ↓
setAppMode('app')
```

---

## 🎨 PALETA DE COLORES ESPECÍFICA

### Navegación App Mode:

| Elemento | Color | Hex | Uso |
|----------|-------|-----|-----|
| **Búsqueda** | Dorado | #C9A24F | Ícono activo |
| **Blog** | Esmeralda | #013220 | Ícono activo |
| **Perfil** | Piedra | #6E7276 | Ícono activo |
| **Gigi** | Fucsia | #FF2D95 | Siempre fucsia |
| **Fondo barra** | Marfil | #F5F2E9 | Desktop |
| **Fondo botón activo** | Blanco | #FFFFFF | Desktop |
| **Gradiente activo** | Dorado→Fucsia | #C9A24F→#FF2D95 | Mobile |

---

## 📱 RESPONSIVE DESIGN

### Desktop (≥1024px):

```
┌────────────────────────────────────────────────┐
│ [Logo] Auréthica  [Nav Central]  [Gigi 💕]    │ ← Top bar fija
├────────────────────────────────────────────────┤
│                                                │
│                  CONTENIDO                     │
│             (Blog/Perfil/Búsqueda)             │
│                                                │
└────────────────────────────────────────────────┘
```

### Mobile (<1024px):

```
┌────────────────────────────────┐
│                                │
│                                │
│          CONTENIDO             │
│      (Blog/Perfil/Búsqueda)    │
│                                │
│                                │
├────────────────────────────────┤
│ [🔍] [✨] [👤] [💕]           │ ← Bottom bar fija
└────────────────────────────────┘
```

---

## 🎭 ANIMACIONES

### Transición Onboarding → App:

```typescript
<AnimatePresence mode="wait">
  {appView === 'blog' && (
    <motion.div
      key="blog"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
```

**Efecto:**
- Vista saliente se desvanece hacia arriba
- Vista entrante aparece desde abajo
- Duración: 300ms

### Aro de Gigi:

- **Mechón:** Oscila ±10° cada 2s
- **Brillo:** Pulsa entre 50-100% opacidad cada 2s
- **Corazón:** Pulsa entre 80-100% opacidad cada 1.5s
- **Notificación:** Scale 1.0 → 1.2 → 1.0 cada 2s

---

## 💾 DATOS SIMULADOS

### Usuario de Ejemplo:

```typescript
const userData = {
  name: "María García",
  email: "maria@example.com",
  phone: "+34 600 000 000",
  registrationDate: "Octubre 2025",
  avatarUrl: undefined, // Se generará después
  gigiTone: "Equilibrado",
  beautyProfile: {
    estilo: "Natural y sofisticado",
    colorimetria: "Primavera cálida",
    preferencias: ["Balayage", "Cortes modernos", "Colores naturales"]
  }
};
```

### Función de Cálculo del Tono Gigi:

```typescript
function getGigiTone(calibration: CalibrationSelection | null): string {
  if (!calibration) return "No definido";
  
  const values = Object.values(calibration).filter(Boolean);
  const hasIntimo = values.includes('intimo');
  const hasFirme = values.includes('firme');
  
  if (hasIntimo) return "Íntimo";
  if (hasFirme) return "Firme";
  return "Equilibrado";
}
```

---

## 🔮 PRÓXIMAS FUNCIONALIDADES

### Avatar AI:

```typescript
// Simulado actualmente - Integración futura
interface AvatarGenerationRequest {
  photos: File[];
  userId: string;
}

interface AvatarGenerationResponse {
  avatarUrl: string;
  status: 'processing' | 'completed' | 'failed';
  estimatedTime: number; // en minutos
}
```

**Proceso:**
1. Usuario sube 10 fotos
2. Fotos se envían a backend
3. IA genera avatar 3D (24-48h)
4. Usuario recibe email cuando está listo
5. Avatar aparece en perfil

### Probar Estilos:

```typescript
interface StyleTryOn {
  avatarId: string;
  styleId: string;
  type: 'haircut' | 'color' | 'both';
}

// Usuario puede probar:
// - Diferentes cortes de cabello
// - Diferentes colores
// - Combinaciones de ambos
// - Guardar favoritos
// - Compartir resultados
```

---

## 📊 FLUJO DE DATOS

```
┌─────────────────┐
│   User Input    │
└────────┬──��─────┘
         │
         ▼
┌─────────────────┐
│ Registration    │ → { nombre, email, telefono }
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Avatar Upload   │ → [ File, File, ... ] (10 fotos)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   App Mode      │
│                 │
│  ┌───────────┐  │
│  │ Blog      │  │
│  ├───────────┤  │
│  │ Profile   │  │ → UserData { ... }
│  ├───────────┤  │
│  │ Search    │  │
│  └───────────┘  │
└─────────────────┘
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Componentes Nuevos:

- [x] AvatarUpload.tsx
- [x] UserProfile.tsx
- [x] NavigationBarApp.tsx
- [x] SearchView.tsx

### Actualizaciones:

- [x] App.tsx - Gestión de appMode
- [x] BeautyTest.tsx - onComplete callback
- [x] Registration.tsx - onComplete callback

### Funcionalidades:

- [x] Upload de 10 fotos obligatorio
- [x] Preview de fotos con eliminar
- [x] Barra de progreso
- [x] Navegación con 4 secciones
- [x] Aro de mechón de Gigi (SVG animado)
- [x] Transiciones entre vistas
- [x] Perfil de usuario completo
- [x] Búsqueda con tendencias
- [x] Responsive desktop/mobile

### Pendientes (Futuro):

- [ ] Integración real de generación de avatar IA
- [ ] Backend para guardar fotos
- [ ] Sistema de probar estilos en avatar
- [ ] Búsqueda funcional (filtros, resultados)
- [ ] Chat con Gigi (aro clickeable)

---

## 🎯 BENEFICIOS DE ESTA ARQUITECTURA

### Separación Clara:

✅ **Onboarding** y **App** son modos completamente independientes  
✅ No hay confusión entre "primera vez" y "usuario registrado"  
✅ Navegación específica para cada contexto

### UX Premium:

✅ Proceso guiado paso a paso  
✅ Avatar personalizado para engagement  
✅ Interfaz limpia post-registro  
✅ Gigi siempre accesible

### Escalabilidad:

✅ Fácil agregar nuevas vistas en App Mode  
✅ Fácil extender onboarding con nuevos pasos  
✅ Estado centralizado en App.tsx  
✅ Componentes reutilizables

---

**Versión:** 3.0 - Avatar Upload & App Mode  
**Estado:** ✅ Implementado y Funcional  
**Próxima evolución:** Integración IA para generación de avatares
