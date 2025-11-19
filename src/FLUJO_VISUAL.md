# 🎨 FLUJO VISUAL - AURÉTHICA v3.1

## 📊 DIAGRAMA DE FLUJO COMPLETO

```
╔════════════════════════════════════════════════════════════════╗
║                    ONBOARDING FLOW v3.1                        ║
╚════════════════════════════════════════════════════════════════╝

    ┌──────────────────────────────────────┐
    │         1. HERO / LANDING            │
    │  ──────────────────────────────────  │
    │                                      │
    │  ✨ Auréthica                        │
    │  Descubre tu belleza auténtica       │
    │                                      │
    │  [Descubre tu estilo] ← CTA         │
    └───────────────┬──────────────────────┘
                    │ onClick → nextSection()
                    ▼
    ┌──────────────────────────────────────┐
    │         2. REGISTRO                  │
    │  ──────────────────────────────────  │
    │                                      │
    │  Únete a Auréthica                   │
    │                                      │
    │  Nombre: [____________] *            │
    │  Email:  [____________] *            │
    │  Tel:    [____________]              │
    │  ☑ Acepto términos *                 │
    │                                      │
    │  [Registrarse]                       │
    └───────────────┬──────────────────────┘
                    │ onComplete(data)
                    │ setOnboardingStep('gigi')
                    ▼
    ┌──────────────────────────────────────┐
    │    3. CALIBRACIÓN DE GIGI            │
    │  ──────────────────────────────────  │
    │                                      │
    │  💕 Hola! Soy Gigi                  │
    │                                      │
    │  Pregunta 1/5: Confianza             │
    │  ○ Neutro  ○ Suave  ○ Equilibrado   │
    │  ○ Firme   ○ Íntimo                  │
    │                                      │
    │  [Continuar]                         │
    └───────────────┬──────────────────────┘
                    │ onCalibrationComplete(selections)
                    │ setOnboardingStep('test')
                    │ setShowTest(true)
                    ▼
    ┌──────────────────────────────────────┐
    │      4. TEST DE AURÉTHICA            │
    │  ──────────────────────────────────  │
    │                                      │
    │  Pregunta 1/15 (personalizada)       │
    │  [Preguntas sobre ROPA originales]   │
    │                                      │
    │  Tono Gigi adaptado: "Equilibrado"   │
    │                                      │
    │  [Siguiente]                         │
    └───────────────┬──────────────────────┘
                    │ onComplete()
                    │ setOnboardingStep('avatar')
                    ▼
    ┌──────────────────────────────────────┐
    │      5. AVATAR UPLOAD                │
    │  ──────────────────────────────────  │
    │                                      │
    │  🎨 Crea tu Avatar Digital          │
    │                                      │
    │  █████████░ 9/10 fotos   90%        │
    │                                      │
    │  [Arrastra fotos aquí]               │
    │                                      │
    │  ┌──┐┌──┐┌──┐┌──┐┌──┐              │
    │  │#1││#2││#3││#4││#5│              │
    │  └──┘└──┘└──┘└──┘└──┘              │
    │                                      │
    │  [Generar mi Avatar]                 │
    └───────────────┬──────────────────────┘
                    │ onComplete(photos)
                    │ setAppMode('app')
                    ▼
╔════════════════════════════════════════════════════════════════╗
║                       APP MODE                                 ║
╚════════════════════════════════════════════════════════════════╝

    Desktop:
    ┌────────────────────────────────────────────────────────┐
    │ [A] Auréthica  [🔍Buscar][✨Blog][👤Perfil]  💕Gigi  │
    ├────────────────────────────────────────────────────────┤
    │                                                        │
    │              CONTENIDO ACTIVO                          │
    │         (Blog / Perfil / Búsqueda)                     │
    │                                                        │
    └────────────────────────────────────────────────────────┘

    Mobile:
    ┌──────────────────────────────┐
    │                              │
    │       CONTENIDO              │
    │                              │
    ├──────────────────────────────┤
    │ [🔍] [✨] [👤] [💕]         │
    └──────────────────────────────┘
```

---

## 🔄 ESTADO Y CALLBACKS

```typescript
STATE FLOW:
═══════════

onboardingStep: 'hero'
    ↓ [CTA Click]
    
onboardingStep: 'registration'
    ↓ [Form Submit]
    + registrationData = { nombre, email, telefono }
    
onboardingStep: 'gigi'
    ↓ [Calibration Complete]
    + gigiCalibration = { confianza, cambio, seguridad, expresion, confirmacion }
    + showTest = true
    
onboardingStep: 'test'
    ↓ [Test Complete]
    
onboardingStep: 'avatar'
    ↓ [10 Photos Upload]
    + avatarPhotos = [File, File, ...]
    
appMode: 'app'
appView: 'blog'  ← Inicio en blog por defecto
```

---

## 📱 JOURNEY MAP

```
USER JOURNEY:
═════════════

Tiempo: 0s
┌─────────────────────────────┐
│ Aterriza en Hero            │
│ Lee propuesta de valor      │
│ Decide participar           │
└─────────────────────────────┘
         ↓ Click CTA
Tiempo: 10s
┌─────────────────────────────┐
│ Ve formulario de registro   │
│ Completa datos (2 min)      │
│ Acepta términos             │
│ Click "Registrarse"         │
└─────────────────────────────┘
         ↓ Success animation
Tiempo: 2m 15s
┌─────────────────────────────┐
│ Conoce a Gigi               │
│ Completa calibración (3min) │
│ 5 preguntas simples         │
└─────────────────────────────┘
         ↓ Personalización lista
Tiempo: 5m 15s
┌─────────────────────────────┐
│ Test personalizado          │
│ 15 preguntas sobre ropa     │
│ Tono Gigi adaptado (8 min)  │
└─────────────────────────────┘
         ↓ Resultados procesados
Tiempo: 13m 15s
┌─────────────────────────────┐
│ Subir 10 fotos (5 min)      │
│ Preview y ajustes           │
│ Generar avatar              │
└─────────────────────────────┘
         ↓ Avatar en proceso
Tiempo: 18m 15s
┌─────────────────────────────┐
│ MODO APP ACTIVADO           │
│ Explora blog                │
│ Ve su perfil                │
│ Usa búsqueda                │
│ Interactúa con Gigi         │
└─────────────────────────────┘
```

---

## 🎯 PUNTOS DE DECISIÓN

```
DECISION POINTS:
════════════════

Hero
  ├─ [Interesado] → Click CTA → Registro
  └─ [No interesado] → Bounce

Registro
  ├─ [Convencido] → Llena form → Gigi
  └─ [Dudoso] → Abandona (email capturado si empezó)

Calibración Gigi
  ├─ [Comprometido] → Completa → Test
  └─ [Pierde interés] → Abandona (puede retomar)

Test Auréthica
  ├─ [Involucrado] → Completa → Avatar
  └─ [Cansado] → Pausa (puede retomar)

Avatar Upload
  ├─ [Entusiasmado] → Sube fotos → App
  └─ [No tiene fotos] → Puede saltar (futuro)

Modo App
  └─ Usuario registrado permanentemente
```

---

## 🎨 PANTALLAS SIDE BY SIDE

```
╔═══════════════╦═══════════════╦═══════════════╗
║     HERO      ║   REGISTRO    ║     GIGI      ║
╠═══════════════╬═══════════════╬═══════════════╣
║               ║               ║               ║
║   ✨ Logo     ║  👤 Únete    ║  💕 Hola!    ║
║               ║               ║               ║
║  Descubre tu  ║  Nombre: □    ║  ¿Cómo       ║
║  belleza      ║  Email:  □    ║  prefieres   ║
║  auténtica    ║  Tel:    □    ║  que te      ║
║               ║  ☑ Términos   ║  hable?      ║
║  [Descubre]   ║  [Registro]   ║  [○○○○○]    ║
║               ║               ║               ║
╚═══════════════╩═══════════════╩═══════════════╝
        ↓               ↓               ↓
╔═══════════════╦═══════════════╦═══════════════╗
║     TEST      ║    AVATAR     ║   APP MODE    ║
╠═══════════════╬═══════════════╬═══════════════╣
║               ║               ║               ║
║  Pregunta     ║  🎨 10 fotos ║  [Nav Bar]    ║
║  1/15         ║               ║               ║
║  [Opciones]   ║  ┌──┐┌──┐   ║  ┌──────────┐ ║
║               ║  │#1││#2│   ║  │ BLOG     │ ║
║  [Siguiente]  ║  └──┘└──┘   ║  │ Instagram│ ║
║               ║  ██████ 60%   ║  │ Feed     │ ║
║               ║  [Generar]    ║  └──────────┘ ║
║               ║               ║               ║
╚═══════════════╩═══════════════╩═══════════════╝
```

---

## 💾 DATA PERSISTENCE

```
DATA COLLECTED THROUGH FLOW:
════════════════════════════

Step 1: Hero
  No data collected
  
Step 2: Registro
  ✓ registrationData: {
      nombre: string,
      email: string,
      telefono: string
    }
  
Step 3: Calibración Gigi
  ✓ gigiCalibration: {
      confianza: CalibrationOption,
      cambio: CalibrationOption,
      seguridad: CalibrationOption,
      expresion: CalibrationOption,
      confirmacion: CalibrationOption
    }
  
Step 4: Test Auréthica
  ✓ testResults: {
      answers: Answer[],
      beautyProfile: Profile
    }
  
Step 5: Avatar Upload
  ✓ avatarPhotos: File[] (10 items)
  
Mode: App
  All data available in:
  - UserProfile component
  - Blog personalization
  - Search recommendations
```

---

## 🎭 ANIMACIONES Y TRANSICIONES

```
ANIMATION TIMELINE:
═══════════════════

Hero → Registro
  └─ Smooth scroll (500ms)
  └─ Section collapse (500ms easeInOut)
  └─ Section expand (500ms easeInOut)

Registro → Gigi
  └─ Success animation (300ms scale+confetti)
  └─ Smooth scroll (500ms)
  └─ Section expand (500ms easeInOut)

Gigi → Test
  └─ Progress save (instant)
  └─ Smooth scroll (500ms)
  └─ Section expand (500ms easeInOut)

Test → Avatar
  └─ Results save (instant)
  └─ Full screen transition (500ms fade)

Avatar → App
  └─ Processing spinner (1s)
  └─ Mode change (instant)
  └─ App fade in (300ms)
```

---

## 🔍 PUNTOS DE VALIDACIÓN

```
VALIDATION CHECKPOINTS:
══════════════════════

✅ Registro:
   - Nombre no vacío
   - Email formato válido
   - Términos aceptados
   
✅ Calibración Gigi:
   - 5 preguntas respondidas
   - Al menos una selección por pregunta
   
✅ Test Auréthica:
   - 15 preguntas completadas
   - Una opción seleccionada por pregunta
   
✅ Avatar Upload:
   - Exactamente 10 fotos
   - Todas en formato imagen válido
   - Tamaño total < 50MB
```

---

## 📊 CONVERSIÓN ESPERADA

```
CONVERSION FUNNEL:
══════════════════

100% │ ████████████████████  Hero Landing
     │
 80% │ ████████████████      Registro Iniciado
     │
 65% │ █████████████         Registro Completado
     │                       ↑ EMAIL CAPTURADO
     │
 60% │ ████████████          Calibración Gigi Iniciada
     │
 55% │ ███████████           Calibración Completada
     │
 50% │ ██████████            Test Iniciado
     │
 45% │ █████████             Test Completado
     │
 40% │ ████████              Avatar Iniciado
     │
 35% │ ███████               10 Fotos Subidas
     │
 35% │ ███████               App Mode Activado
     │                       ↑ USUARIO COMPLETO
```

---

## 🎯 KPIs POR PASO

```
METRICS TO TRACK:
═════════════════

Hero
  - Visitors
  - CTA Click Rate
  - Time on page
  
Registro
  - Form start rate
  - Form completion rate
  - Email capture rate
  - Bounce rate
  
Calibración Gigi
  - Start rate
  - Completion rate
  - Average time
  - Drop-off points
  
Test Auréthica
  - Start rate
  - Completion rate
  - Average time per question
  - Most skipped questions
  
Avatar Upload
  - Upload start rate
  - Average photos uploaded
  - Upload success rate
  - Technical errors
  
App Mode
  - Activation rate
  - First action taken
  - Return rate (D1, D7, D30)
  - Features used
```

---

**Flujo optimizado para máxima conversión y experiencia de usuario premium** ✨
