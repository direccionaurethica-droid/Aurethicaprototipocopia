# 🔐 Flujo de Autenticación - Auréthica

## 📐 Diseño Implementado

Se ha implementado un **sistema completo de autenticación** con flujos separados para nuevos usuarios y usuarios existentes, manteniendo el diseño premium estilo Zara.

---

## 🎨 Cambios en Hero/Landing

### ❌ ANTES: Un solo botón
```
"Desliza para unirte" → Scroll a registro
```

### ✅ AHORA: Dos botones premium
```
1. "Crear cuenta" (principal) → Registration
2. "Ya tengo cuenta" (secundario) → Login
```

### Diseño Visual

**Botón Principal (Crear cuenta):**
- Gradiente verde esmeralda (#013220 → #0a4a30)
- Icono dorado con UserPlus
- Texto: "Crear cuenta" + "Descubre tu perfil de belleza"
- Sombra intensa y hover scale
- Flecha animada →

**Botón Secundario (Ya tengo cuenta):**
- Glassmorphism (backdrop-blur + border dorado)
- Icono dorado con LogIn
- Texto: "Ya tengo cuenta"
- Estilo más sutil pero elegante

---

## 🚀 Flujo Completo

### 📋 Flujo A: Nuevo Usuario (Registro)

```
Landing
  ↓ Click "Crear cuenta"
Registration Page
  • Formulario completo
  • Validación en tiempo real
  ↓ Submit
Loading: "Preparando tu experiencia..." (2s)
  ↓
Gigi Intro Page
  • Calibración (5 preguntas)
  ↓ Completar calibración
Loading: "Configurando Gigi..." (1.5s)
  ↓
Test Page
  • Test de Auréthica (preguntas de ropa)
  ↓ Completar test
Loading: "Analizando respuestas..." (1.5s)
  ↓
Avatar Page
  • Subida de 10 fotos
  ↓ Completar upload
Loading: "Generando avatar..." (3s)
  ↓
App Mode (permanente)
```

### 🔐 Flujo B: Usuario Existente (Login)

```
Landing
  ↓ Click "Ya tengo cuenta"
Login Page
  • Email + Contraseña
  • Botón "¿Olvidaste tu contraseña?"
  • Usuario de prueba visible
  ↓ Submit credenciales
Loading: "Verificando credenciales..." (1.5s)
  ↓ Autenticación exitosa
Loading: "¡Bienvenido de nuevo!" (1s)
  ↓
Profile Choice Page ⭐ NUEVA
  ┌─────────────────────────────────────┐
  │ "¡Hola de nuevo, [Nombre]!"         │
  │                                     │
  │ Opción 1: Continuar con mi perfil   │
  │   → Ir directo a App Mode           │
  │   [Badge: Recomendado]              │
  │                                     │
  │ Opción 2: Crear perfil nuevo        │
  │   → Empezar calibración desde cero  │
  │   [Badge: Comenzar de nuevo]        │
  └─────────────────────────────────────┘
  ↓
  ├─ SI ELIGE OPCIÓN 1 (Perfil existente)
  │    ↓ Loading: "Cargando tu perfil..." (1.5s)
  │    ↓
  │    App Mode ✅ (SALTA TODO EL TEST)
  │
  └─ SI ELIGE OPCIÓN 2 (Perfil nuevo)
       ↓ Loading: "Preparando calibración..." (1.5s)
       ↓
       Gigi Intro Page
       ↓
       Test Page
       ↓
       Avatar Page
       ↓
       App Mode
```

---

## 🎯 Nueva Página: Profile Choice

### Diseño Premium

**Header:**
- Avatar circular con gradiente verde-dorado
- Título: "¡Hola de nuevo, [Nombre]!"
- Subtítulo: "Nos alegra verte. ¿Qué te gustaría hacer hoy?"

**Opción 1: Continuar con mi perfil**
- Card verde esmeralda con gradiente
- Icono: UserCircle dorado
- Badge: "Recomendado" con Sparkles
- Hover: Scale 1.03 + shadow intensa
- Flecha animada →

**Opción 2: Crear perfil nuevo**
- Card blanco con border dorado
- Icono: RefreshCw fucsia
- Badge: "Comenzar de nuevo"
- Hover: Scale 1.03 + border más intenso
- Flecha animada →

### Transiciones
```tsx
// Entrada
initial: { opacity: 0, scale: 0.95 }
animate: { opacity: 1, scale: 1 }
duration: 600ms, cubic-bezier(0.22, 1, 0.36, 1)

// Salida
exit: { opacity: 0, scale: 1.05 }
```

---

## 🗂️ Archivos Nuevos

### 1. `/pages/LoginPage.tsx`

**Componentes:**
- Formulario de login premium
- Input con iconos (Mail, Lock)
- Toggle show/hide password (Eye/EyeOff)
- Botón "¿Olvidaste tu contraseña?"
- Link a registro
- Info de usuario de prueba

**Validación:**
- Email formato válido
- Contraseña mínimo 6 caracteres
- Feedback en tiempo real

**Diseño:**
```css
Background: white
Inputs: Border #6E7276/20, focus #013220
Botón: Gradiente verde esmeralda
Estado loading: Spinner + texto
```

### 2. `/pages/ProfileChoicePage.tsx`

**Componentes:**
- Header con avatar circular
- 2 cards de opción (grid md:2 cols)
- Badges con iconos
- Animaciones hover premium
- Info adicional en footer

**Props:**
```tsx
interface ProfileChoicePageProps {
  userName: string;
  onUseExisting: () => void;
  onCreateNew: () => void;
}
```

### 3. `/lib/mock/mockUsers.ts`

**Estructura:**
```tsx
interface MockUser {
  email: string;
  password: string;
  registrationData: RegistrationData;
  gigiCalibration: CalibrationSelection;
  beautyProfile: {
    estilo: string;
    colorimetria: string;
    preferencias: string[];
  };
  hasAvatar: boolean;
  registrationDate: string;
}
```

**Usuarios de Prueba:**

1. **Ana Martínez** (Natural y sofisticado)
   - Email: `ana.martinez@example.com`
   - Password: `123456`
   - Estilo: Natural, Primavera cálida
   - Calibración: Confianza balanceada

2. **Lucía Fernández** (Audaz y creativo)
   - Email: `lucia.fernandez@example.com`
   - Password: `123456`
   - Estilo: Audaz, Invierno profundo
   - Calibración: Expresiva y atrevida

3. **Sofía García** (Clásico y elegante)
   - Email: `sofia.garcia@example.com`
   - Password: `123456`
   - Estilo: Clásico, Otoño cálido
   - Calibración: Conservadora y segura

**Funciones:**
```tsx
authenticateUser(email, password): MockUser | null
getUserByEmail(email): MockUser | null
emailExists(email): boolean
```

---

## 🔄 Actualizaciones en Archivos Existentes

### `/components/Hero.tsx`

**Cambios:**
```tsx
// ANTES
interface HeroProps {
  onStartTest?: () => void;
}

// DESPUÉS
interface HeroProps {
  onStartTest?: () => void;
  onRegistration?: () => void;
  onLogin?: () => void;  // ⭐ NUEVO
}
```

**Estructura:**
- Eliminado: Botón único "Desliza para unirte"
- Añadido: Dos botones en flex-col gap-4
- Mantenido: Banner de fondo, overlay

### `/pages/LandingPage.tsx`

**Cambios:**
```tsx
// ANTES
interface LandingPageProps {
  onGetStarted: () => void;
}

// DESPUÉS
interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;  // ⭐ NUEVO
}
```

### `/lib/router/PageRouter.tsx`

**Cambios:**
```tsx
// ANTES
export type PageRoute = 
  | 'landing'
  | 'registration'
  | 'gigi-intro'
  | 'test'
  | 'avatar'
  | 'app';

// DESPUÉS
export type PageRoute = 
  | 'landing'
  | 'registration'
  | 'login'              // ⭐ NUEVO
  | 'profile-choice'     // ⭐ NUEVO
  | 'gigi-intro'
  | 'test'
  | 'avatar'
  | 'app';
```

**Props nuevos:**
```tsx
onLoginSubmit: (email: string, password: string) => void;
onProfileChoiceUseExisting: () => void;
onProfileChoiceCreateNew: () => void;
```

### `/App.tsx`

**Estado nuevo:**
```tsx
const [authenticatedUser, setAuthenticatedUser] = useState<MockUser | null>(null);
const [isReturningUser, setIsReturningUser] = useState(false);
```

**Handlers nuevos:**
```tsx
handleLoginSubmit(email, password)
handleProfileChoiceUseExisting()
handleProfileChoiceCreateNew()
```

**Lógica de autenticación:**
```tsx
const user = authenticateUser(email, password);

if (user) {
  setAuthenticatedUser(user);
  setRegistrationData(user.registrationData);
  setGigiCalibration(user.gigiCalibration);
  setIsReturningUser(true);
  → profile-choice
} else {
  alert('Credenciales incorrectas');
}
```

---

## 🎨 Paleta de Colores por Página

| Página | Background | Elementos principales | CTA |
|--------|------------|----------------------|-----|
| Landing | Marfil #F5F2E9 (banner) | Verde #013220 + Dorado #C9A24F | Gradiente verde |
| Login | Blanco #FFFFFF | Verde #013220 | Gradiente verde |
| Profile Choice | Gradiente marfil-blanco | Verde #013220 + Fucsia #FF2D95 | Card verde + Card blanco |

---

## 📱 Responsive

### Mobile (< 768px)
```css
Landing:
  - Botones full width
  - Stack vertical con gap-4
  - Padding: 24px

Login:
  - Formulario full width
  - Inputs stack vertical
  - Botón full width

Profile Choice:
  - Cards stack vertical
  - Spacing reducido
  - Avatar 80px
```

### Desktop (> 768px)
```css
Landing:
  - Botones max-w-md
  - Centrados horizontalmente
  
Login:
  - Formulario max-w-md
  - Centrado en pantalla

Profile Choice:
  - Grid 2 columnas
  - Max-w-2xl
  - Avatar 96px
```

---

## ✅ Checklist de Testing

### Flujo de Registro
- [ ] Landing → Click "Crear cuenta"
- [ ] Formulario de registro completo
- [ ] Validación de campos
- [ ] Loading screen 2s
- [ ] Navegación a Gigi Intro
- [ ] Completar calibración
- [ ] Completar test
- [ ] Subir avatar
- [ ] Llegar a App Mode

### Flujo de Login
- [ ] Landing → Click "Ya tengo cuenta"
- [ ] Formulario de login
- [ ] Validación de credenciales
- [ ] Loading screen 1.5s
- [ ] Ver Profile Choice con nombre correcto

### Flujo de Perfil Existente
- [ ] Profile Choice → Click "Continuar con mi perfil"
- [ ] Loading screen 1.5s
- [ ] Llegar directo a App Mode (sin pasar por test)
- [ ] Ver datos correctos en perfil

### Flujo de Perfil Nuevo
- [ ] Profile Choice → Click "Crear perfil nuevo"
- [ ] Loading screen 1.5s
- [ ] Empezar Gigi calibración
- [ ] Completar todo el flujo
- [ ] Llegar a App Mode con nuevo perfil

### Usuarios de Prueba
- [ ] Login con Ana Martínez
- [ ] Login con Lucía Fernández
- [ ] Login con Sofía García
- [ ] Verificar perfiles diferentes
- [ ] Verificar estilos de belleza diferentes

---

## 🎯 Ventajas del Nuevo Sistema

### Para Usuarios Nuevos
✅ Dos opciones claras desde el inicio  
✅ Proceso de registro completo sin confusión  
✅ Flujo guiado paso a paso

### Para Usuarios Existentes
✅ Login rápido y sencillo  
✅ Recuperación de perfil completo  
✅ Opción de rehacer perfil si lo desean  
✅ **Saltar test** si ya tienen perfil guardado

### Para el Negocio
✅ Retención de usuarios  
✅ Datos persistentes entre sesiones  
✅ Menos fricción para usuarios recurrentes  
✅ Sistema escalable para backend real

---

## 🚀 Próximos Pasos

### Fase 2 - Persistencia
- [ ] Integrar con localStorage para recordar sesión
- [ ] Implementar "Recordarme" en login
- [ ] Auto-login si hay sesión activa

### Fase 3 - Backend Real
- [ ] Conectar con API de autenticación
- [ ] JWT tokens
- [ ] Refresh tokens
- [ ] Password reset flow

### Fase 4 - Social Login
- [ ] Login con Google
- [ ] Login con Apple
- [ ] Login con Facebook

---

## 📊 Métricas de UX

| Acción | Tiempo | Estado |
|--------|--------|--------|
| Landing → Login | < 500ms | ✅ |
| Login submit → Profile Choice | 2.5s | ✅ |
| Profile Choice → App (existente) | 1.5s | ✅ |
| Profile Choice → Gigi (nuevo) | 1.5s | ✅ |
| Total (usuario existente) | ~4s | ✅ Excelente |
| Total (usuario nuevo) | ~12s | ✅ Aceptable |

---

## 📚 Documentación Relacionada

- **ARQUITECTURA_PAGINAS.md** - Arquitectura general de páginas
- **MAQUETACION_PREMIUM_COMPLETA.md** - Sistema de diseño
- **FLUJO_ACTUALIZADO.md** - Flujo de usuario original
- **README.md** - Documentación principal

---

**Última actualización:** 2 de noviembre de 2025  
**Diseñador:** Sistema Premium Auréthica  
**Estado:** ✅ Implementación completa
