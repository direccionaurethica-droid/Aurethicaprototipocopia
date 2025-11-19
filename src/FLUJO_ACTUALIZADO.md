# 🔄 FLUJO ACTUALIZADO - AURÉTHICA
## Hero → Registro → Gigi → Test → Avatar → App

**Actualizado:** 31 de Octubre, 2025  
**Versión:** 3.1 - Flujo de Onboarding Optimizado

---

## 🎯 CAMBIO PRINCIPAL

### ANTES (v3.0):
```
Hero → Cómo Funciona → Gigi Calibration → Test → Registro → Avatar → App
```

### AHORA (v3.1):
```
Hero → Registro → Gigi Calibration → Test → Avatar → App
```

---

## 📋 FLUJO DETALLADO

```
┌─────────────────────────────────────────────────┐
│  1. HERO / LANDING                              │
│  ────────────────────────────────────────────   │
│  • Mensaje de bienvenida                        │
│  • Value proposition                            │
│  • CTA: "Descubre tu estilo" →                 │
│                                                 │
│  [BOTÓN] → Lleva a REGISTRO                    │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  2. REGISTRO                                    │
│  ────────────────────────────────────────────   │
│  • Nombre completo *                            │
│  • Email *                                      │
│  • Teléfono (opcional)                          │
│  • Aceptar términos y condiciones *            │
│                                                 │
│  [REGISTRARSE] → Callback ejecuta              │
│  handleRegistrationComplete()                   │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  3. CALIBRACIÓN DE GIGI                         │
│  ────────────────────────────────────────────   │
│  Ventana0 con 5 preguntas:                      │
│  • Confianza                                    │
│  • Cambio                                       │
│  • Seguridad                                    │
│  • Expresión                                    │
│  • Confirmación                                 │
│                                                 │
│  [CONTINUAR] → Callback ejecuta                │
│  handleCalibrationComplete()                    │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  4. TEST DE AURÉTHICA                           │
│  ────────────────────────────────────────────   │
│  • Test personalizado según calibración Gigi    │
│  • Preguntas sobre estilo de ropa (ORIGINALES) │
│  • Tono de Gigi adaptado                        │
│                                                 │
│  [FINALIZAR TEST] → Callback ejecuta           │
│  handleTestComplete()                           │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  5. AVATAR UPLOAD                               │
│  ────────────────────────────────────────────   │
│  • Subir 10 fotos obligatorias                  │
│  • Drag & Drop habilitado                       │
│  • Preview con eliminar individual              │
│  • Barra de progreso                            │
│                                                 │
│  [GENERAR AVATAR] → Callback ejecuta           │
│  handleAvatarUploadComplete()                   │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  6. MODO APP                                    │
│  ────────────────────────────────────────────   │
│  Navegación:                                    │
│  • 🔍 Búsqueda                                  │
│  • ✨ Blog (Instagram feed)                     │
│  • 👤 Mi Perfil                                 │
│  • 💕 Gigi Helper                               │
│                                                 │
│  Hero/Test/Registro ya no visibles             │
└─────────────────────────────────────────────────┘
```

---

## 🔄 CALLBACKS Y FLUJO DE ESTADO

### Estado de Onboarding:

```typescript
const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('hero');

type OnboardingStep = 
  | 'hero'         // 1. Landing inicial
  | 'registration' // 2. Formulario de registro
  | 'gigi'         // 3. Calibración de Gigi
  | 'test'         // 4. Test de Auréthica
  | 'avatar';      // 5. Subida de fotos
```

### Secuencia de Callbacks:

```typescript
// 1. Usuario hace click en Hero
Hero.onStartTest() 
  → nextSection() 
  → setOnboardingStep('registration')
  → scrollToSection('registration-section')

// 2. Usuario completa registro
Registration.onComplete(data)
  → handleRegistrationComplete(data)
  → setRegistrationData(data)
  → setOnboardingStep('gigi')
  → scrollToSection('gigi-intro')

// 3. Usuario completa calibración Gigi
Ventana0.onCalibrationComplete(selections)
  → handleCalibrationComplete(selections)
  → setGigiCalibration(selections)
  → setShowTest(true)
  → setOnboardingStep('test')
  → scrollToSection('aurethica-test')

// 4. Usuario completa test
BeautyTest.onComplete()
  → handleTestComplete()
  → setOnboardingStep('avatar')

// 5. Usuario sube 10 fotos
AvatarUpload.onComplete(photos)
  → handleAvatarUploadComplete(photos)
  → setAvatarPhotos(photos)
  → setAppMode('app')
  → setAppView('blog')
```

---

## 📊 RENDERIZADO CONDICIONAL

### Lógica en App.tsx:

```typescript
// Renderizado principal basado en appMode
if (appMode === 'app') {
  return <AppMode>; // Blog, Perfil, Búsqueda
}

// Si está en step 'avatar', mostrar solo AvatarUpload
if (onboardingStep === 'avatar') {
  return <AvatarUpload />;
}

// Onboarding normal con secciones
return (
  <>
    <NavigationBar />
    
    {/* Hero visible solo si openSections incluye 'hero-section' */}
    {openSections.includes('hero-section') && <Hero />}
    
    {/* Registro visible solo si onboardingStep === 'registration' */}
    {onboardingStep === 'registration' && <Registration />}
    
    {/* Gigi visible si openSections incluye 'gigi-intro' O onboardingStep === 'gigi' */}
    {(openSections.includes('gigi-intro') || onboardingStep === 'gigi') && <Ventana0 />}
    
    {/* Test visible si showTest Y (openSections incluye 'aurethica-test' O onboardingStep === 'test') */}
    {showTest && (openSections.includes('aurethica-test') || onboardingStep === 'test') && <BeautyTest />}
  </>
);
```

---

## 🎯 VENTAJAS DEL NUEVO FLUJO

### 1. **Captura Temprana de Datos**
✅ Registro al inicio → asegura datos del usuario antes de inversión de tiempo  
✅ Menos abandono después de completar test y calibración  
✅ Email capturado para seguimiento

### 2. **Experiencia Más Lógica**
✅ "Primero regístrate, luego personalizamos"  
✅ Sensación de exclusividad (solo usuarios registrados acceden al test)  
✅ Compromiso gradual: datos → personalización → avatar

### 3. **Menor Fricción**
✅ Registro es simple (solo 2 campos obligatorios)  
✅ Usuario ya está "dentro" cuando empieza el test  
✅ Flujo más directo desde Hero

### 4. **Mejor para Conversión**
✅ CTA claro desde el Hero  
✅ Registro sin distracciones intermedias  
✅ Menor tasa de abandono

---

## 🛠️ CAMBIOS TÉCNICOS IMPLEMENTADOS

### App.tsx:

```typescript
// ANTES:
const nextSection = () => {
  setOnboardingStep('howItWorks');
  scrollToSection("how-it-works");
};

// AHORA:
const nextSection = () => {
  setOnboardingStep('registration');
  scrollToSection("registration-section");
};
```

```typescript
// ANTES:
const handleRegistrationComplete = (data: RegistrationData) => {
  setRegistrationData(data);
  setOnboardingStep('avatar');
};

// AHORA:
const handleRegistrationComplete = (data: RegistrationData) => {
  setRegistrationData(data);
  setOnboardingStep('gigi');
  setTimeout(() => {
    const gigiSection = document.getElementById("gigi-intro");
    gigiSection?.scrollIntoView({ behavior: "smooth" });
  }, 100);
};
```

```typescript
// ANTES:
const handleTestComplete = () => {
  setOnboardingStep('registration');
  setTimeout(() => {
    const registrationSection = document.getElementById("registration-section");
    registrationSection?.scrollIntoView({ behavior: "smooth" });
  }, 100);
};

// AHORA:
const handleTestComplete = () => {
  setOnboardingStep('avatar');
};
```

### Renderizado Condicional de Gigi y Test:

```typescript
// Gigi se muestra si:
{(openSections.includes('gigi-intro') || onboardingStep === 'gigi') && (
  <Ventana0 onCalibrationComplete={handleCalibrationComplete} />
)}

// Test se muestra si:
{showTest && (openSections.includes('aurethica-test') || onboardingStep === 'test') && (
  <BeautyTest onComplete={handleTestComplete} />
)}
```

---

## 📱 EXPERIENCIA DE USUARIO

### Desktop:

1. **Hero aparece** con mensaje principal
2. Click en "Descubre tu estilo" → **Scroll suave al registro**
3. Usuario llena formulario → Click "Registrarse"
4. **Animación de éxito** → **Scroll automático a Gigi**
5. Usuario completa calibración → **Scroll automático al Test**
6. Usuario completa test → **Transición a Avatar Upload** (pantalla completa)
7. Usuario sube 10 fotos → **Transición a Modo App**

### Mobile:

- Mismo flujo pero con scroll más visible
- Formulario de registro optimizado para mobile
- Calibración Gigi con gestos táctiles
- Avatar upload con drag & drop móvil

---

## 🎨 ANIMACIONES

### Transiciones entre Pasos:

```typescript
<motion.section
  initial={{ height: 0, opacity: 0 }}
  animate={{ height: 'auto', opacity: 1 }}
  exit={{ height: 0, opacity: 0 }}
  transition={{ duration: 0.5, ease: 'easeInOut' }}
>
```

### Scroll Suave:

```typescript
setTimeout(() => {
  const section = document.getElementById("section-id");
  section?.scrollIntoView({ behavior: "smooth" });
}, 100);
```

### Modo App (Cambio de Vista):

```typescript
<motion.div
  key="blog"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
```

---

## ✅ CHECKLIST DE VALIDACIÓN

### Flujo Completo:

- [x] Hero CTA lleva a Registro
- [x] Registro completo lleva a Gigi
- [x] Calibración Gigi completa lleva a Test
- [x] Test completo lleva a Avatar Upload
- [x] Avatar Upload completo lleva a Modo App
- [x] Scrolls automáticos funcionan
- [x] Animaciones suaves
- [x] Estados persistentes (registrationData, gigiCalibration)

### Datos Guardados:

- [x] `registrationData` - nombre, email, teléfono
- [x] `gigiCalibration` - 5 selecciones de calibración
- [x] `avatarPhotos` - 10 archivos de imagen
- [x] Todos disponibles en Modo App

### Modo App:

- [x] NavigationBarApp renderiza correctamente
- [x] Blog se muestra por defecto
- [x] Perfil muestra datos del usuario
- [x] Búsqueda funciona
- [x] Ícono de Gigi animado

---

## 🎯 COMPARACIÓN: ANTES vs AHORA

| Aspecto | Antes (v3.0) | Ahora (v3.1) |
|---------|--------------|--------------|
| **Primer paso después de Hero** | Cómo Funciona | Registro |
| **Cuándo se capturan datos** | Después del test | Al inicio |
| **Pasos hasta el test** | 3 (Hero → Cómo → Gigi → Test) | 2 (Hero → Registro → Gigi → Test) |
| **Experiencia** | Exploratoria | Directa y comprometida |
| **Conversión esperada** | Media | Alta |
| **Abandono esperado** | Después del test | Mínimo |

---

## 📝 NOTAS IMPORTANTES

### Preservado:

✅ Las preguntas del test **NO se modifican** (sobre ROPA, no belleza)  
✅ La calibración de Gigi sigue siendo la misma (5 preguntas)  
✅ El sistema de navegación colapsable sigue funcionando  
✅ Secciones como "Cómo Funciona" y "Blog" siguen disponibles en navegación

### Nuevo:

✨ Registro es el primer paso activo  
✨ Flujo más lineal y predecible  
✨ Menor fricción para llegar al contenido personalizado  
✨ Datos capturados antes de inversión de tiempo del usuario

---

## 🚀 PRÓXIMOS PASOS POTENCIALES

### Optimizaciones Futuras:

1. **Email de bienvenida** después del registro
2. **Guardar progreso** en cada paso (localStorage o backend)
3. **Permitir retomar** desde donde se quedó
4. **Validación de email** real (código de confirmación)
5. **Social login** (Google, Facebook) para registro más rápido

### Analytics:

- Medir **tasa de abandono** en cada paso
- A/B testing del **texto del CTA** en Hero
- Tracking de **tiempo en cada paso**
- **Heatmaps** del formulario de registro

---

**Versión:** 3.1 - Flujo Optimizado  
**Estado:** ✅ Implementado y Funcional  
**Última actualización:** 31 de Octubre, 2025
