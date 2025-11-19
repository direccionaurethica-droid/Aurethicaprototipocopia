# 🚀 GUÍA DE EXPORTACIÓN A GITHUB
## Trabajo en Equipo: Claude (Figma Make) + ChatGPT + GitHub

---

## 📋 ÍNDICE
1. [Resumen del Proyecto](#resumen)
2. [Estructura de Archivos Esenciales](#estructura)
3. [Paso a Paso: Subir a GitHub](#paso-a-paso)
4. [Workflow de Equipo](#workflow)
5. [Comandos Git Rápidos](#comandos-git)
6. [Mejores Prácticas](#mejores-practicas)

---

## 🎯 RESUMEN DEL PROYECTO <a name="resumen"></a>

**Nombre:** Auréthica App  
**Descripción:** Plataforma premium de belleza con asistente IA personalizada (Gigi)  
**Stack:** React 18 + TypeScript + Vite + Tailwind CSS v4  
**Estado:** Ventana0 (Intro Gigi + Calibración) completada y auditada ✅

### Características Principales:
- ✅ Sistema de autenticación completo
- ✅ Calibración de Gigi (5 preguntas)
- ✅ Test de belleza personalizado
- ✅ Avatar upload con preview
- ✅ Blog estilo Instagram
- ✅ Perfiles diferenciados (Cliente, Estilista, Salón)
- ✅ Sistema de navegación premium
- ✅ Diseño minimalista editorial (estilo Zara)

### Paleta de Colores:
- **Fondo:** Negro puro (#000000, #0a0a0a)
- **Principal:** Dorado metálico (#D4AF37, #C9A24F)
- **Acento:** Fucsia Gigi (#FF2D95)
- **Tipografía:** Playfair Display (títulos) + Montserrat (cuerpo)

---

## 📁 ESTRUCTURA DE ARCHIVOS ESENCIALES <a name="estructura"></a>

### ⚡ ARCHIVOS CRÍTICOS (Copiar SIEMPRE)

#### 1. Configuración Base
```
/package.json              ← Dependencias y scripts
/tsconfig.json            ← Configuración TypeScript
/vite.config.ts           ← Configuración Vite + PWA
```

#### 2. Código Fuente Principal
```
/App.tsx                  ← Componente principal (ENTRY POINT)

/components/              ← Todos los componentes React
  ├── Ventana0.tsx        ← ✅ COMPLETADO (Intro Gigi + Calibración)
  ├── GigiCalibration.tsx
  ├── BeautyTest.tsx
  ├── AvatarUpload.tsx
  ├── Login.tsx
  ├── Registration.tsx
  ├── NavigationBar.tsx
  ├── NavigationBarApp.tsx
  ├── ChromeButton.tsx
  ├── MetallicButton.tsx
  ├── MetallicText.tsx
  ├── BlogSection.tsx
  ├── UserProfile.tsx
  ├── SearchView.tsx
  ├── (... todos los demás .tsx)
  └── ui/                 ← Componentes UI base (Radix + shadcn)

/pages/                   ← Páginas de la aplicación
  ├── LandingPage.tsx
  ├── GigiIntroPage.tsx
  ├── RegistrationPage.tsx
  ├── TestPage.tsx
  ├── AvatarPage.tsx
  ├── AppModePage.tsx
  └── (... todos los demás)

/contexts/                ← Context Providers
  ├── AppContext.tsx
  ├── JourneyContext.tsx
  ├── BlogContext.tsx
  ├── ThemeContext.tsx
  └── SearchContext.tsx

/hooks/                   ← Custom React Hooks
  ├── useLocalStorage.ts
  ├── useMediaQuery.ts
  ├── useDebounce.ts
  └── (... todos los demás)

/lib/                     ← Utilidades y lógica
  ├── router/
  ├── types/
  ├── utils/
  ├── constants/
  ├── i18n/
  ├── mock/
  └── pwa/

/styles/                  ← Estilos globales
  ├── globals.css         ← Estilos Tailwind + Custom
  └── metallic.ts         ← Efectos metálicos/cromados
```

#### 3. Archivos de Configuración
```
/.gitignore              ← Archivos a ignorar en Git
/README.md               ← Documentación principal del proyecto
```

---

### 📚 ARCHIVOS DE DOCUMENTACIÓN (Opcionales)

Estos archivos .md son útiles pero no críticos para que la app funcione:

```
/ARQUITECTURA.md
/AUDITORIA_AURETHICA.md
/CHANGELOG.md
/GITHUB_SETUP.md
/guidelines/
  ├── DesignSystem.md
  └── GigiDesignSystem.md
```

**Recomendación:** Sube al menos `README.md` y `ARQUITECTURA.md` para documentación.

---

## 🔧 PASO A PASO: SUBIR A GITHUB <a name="paso-a-paso"></a>

### PASO 1: Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. Configura:
   - **Nombre:** `aurethica-app` (o el que prefieras)
   - **Descripción:** "Plataforma premium de belleza con asistente IA Gigi"
   - **Visibilidad:** Private (recomendado) o Public
   - ❌ NO marques "Add README" (ya tienes uno)
   - ❌ NO añadas .gitignore (ya tienes uno)
   - ❌ NO añadas license aún
3. Click en "Create repository"

---

### PASO 2: Preparar Carpeta Local

Crea una carpeta en tu computadora:

```bash
# Windows
mkdir C:\Projects\aurethica-app
cd C:\Projects\aurethica-app

# Mac/Linux
mkdir ~/Projects/aurethica-app
cd ~/Projects/aurethica-app
```

---

### PASO 3: Copiar Archivos desde Figma Make

**Método A - Manual (Recomendado para empezar):**

1. En Figma Make, copia cada archivo uno por uno:
   - Click en el archivo
   - Selecciona todo el contenido (Ctrl+A / Cmd+A)
   - Copia (Ctrl+C / Cmd+C)
   - Pega en un nuevo archivo en tu editor local (VSCode, etc.)
   
2. Mantén la misma estructura de carpetas:
   ```
   aurethica-app/
   ├── components/
   │   ├── Ventana0.tsx
   │   ├── ui/
   │   └── ...
   ├── pages/
   ├── contexts/
   ├── hooks/
   ├── lib/
   ├── styles/
   ├── App.tsx
   ├── package.json
   └── ...
   ```

**Lista de Archivos Mínimos para Empezar:**

```
✅ PRIORIDAD MÁXIMA (copia primero):
1. package.json
2. tsconfig.json
3. vite.config.ts
4. App.tsx
5. /styles/globals.css
6. /styles/metallic.ts
7. /components/Ventana0.tsx        ← ¡RECIÉN COMPLETADO!
8. /components/GigiCalibration.tsx
9. /contexts/AppContext.tsx
10. README.md
```

---

### PASO 4: Inicializar Git y Subir

Abre tu terminal en la carpeta del proyecto:

```bash
# 1. Inicializar repositorio Git
git init

# 2. Añadir remote de GitHub (cambia TU-USUARIO por tu usuario real)
git remote add origin https://github.com/TU-USUARIO/aurethica-app.git

# 3. Crear .gitignore (si no lo copiaste)
echo "node_modules
dist
.env
.DS_Store
*.log" > .gitignore

# 4. Añadir todos los archivos
git add .

# 5. Hacer primer commit
git commit -m "🎉 Initial commit - Auréthica App con Ventana0 completada"

# 6. Cambiar a rama main
git branch -M main

# 7. Subir a GitHub
git push -u origin main
```

**✅ ¡Listo! Tu proyecto ya está en GitHub.**

---

### PASO 5: Verificar en GitHub

1. Ve a tu repositorio: `https://github.com/TU-USUARIO/aurethica-app`
2. Deberías ver todos tus archivos
3. El README.md se mostrará automáticamente en la página principal

---

## 🤝 WORKFLOW DE EQUIPO <a name="workflow"></a>

### Estrategia de Trabajo en Equipo

```
┌─────────────────────────────────────────────────────────────┐
│                     WORKFLOW AURETHICA                       │
└─────────────────────────────────────────────────────────────┘

1️⃣ CLAUDE (Figma Make) - Prototipado & Diseño UI/UX
   ├─ Crear componentes visuales rápidamente
   ├─ Probar diseños en tiempo real
   ├─ Refinar estilos y animaciones
   └─ Exportar código limpio
          ↓
          
2️⃣ GITHUB - Centro de Verdad (Source of Truth)
   ├─ Almacenar todo el código
   ├─ Control de versiones
   ├─ Historial de cambios
   └─ Colaboración
          ↓
          
3️⃣ CHATGPT - Lógica Backend & Code Review
   ├─ Implementar lógica compleja
   ├─ Optimización de código
   ├─ Testing y debugging
   ├─ Documentación
   └─ Integración con APIs/Supabase
```

---

### Ciclo de Trabajo Recomendado

#### ESCENARIO A: Diseño de nuevo componente

1. **Claude (Figma Make):**
   - Diseñas el componente visualmente
   - Pruebas interacciones
   - Refinas estilos
   
2. **Tú:**
   - Copias el código del componente
   - Lo pegas en tu proyecto local
   
3. **Git:**
   ```bash
   git add components/NuevoComponente.tsx
   git commit -m "✨ feat: Añadir NuevoComponente"
   git push
   ```
   
4. **ChatGPT (opcional):**
   - Le pides que revise el código
   - Optimizaciones de performance
   - Sugerencias de mejora

---

#### ESCENARIO B: Implementar lógica compleja

1. **ChatGPT:**
   - Le explicas la funcionalidad necesaria
   - Te ayuda con la implementación
   - Te da el código optimizado
   
2. **Tú:**
   - Implementas en tu proyecto local
   - Pruebas que funciona
   
3. **Git:**
   ```bash
   git add .
   git commit -m "🔧 feat: Implementar lógica de [funcionalidad]"
   git push
   ```
   
4. **Claude (opcional):**
   - Importas el código a Figma Make
   - Verificas que se vea bien visualmente
   - Haces ajustes de UI si es necesario

---

#### ESCENARIO C: Refactorización (como la actual)

1. **Claude (Figma Make):**
   - "Actúa como equipo de diseño de Zara"
   - Refactorización quirúrgica
   - Limpieza de código
   
2. **Tú:**
   - Copias archivos refactorizados
   - Reemplazas en local
   
3. **Git:**
   ```bash
   git add .
   git commit -m "♻️ refactor: Aplicar diseño minimalista estilo Zara a Ventana0"
   git push
   ```

---

### Comandos de Sincronización

```bash
# Ver estado actual
git status

# Ver cambios específicos
git diff

# Añadir archivos específicos
git add components/Ventana0.tsx

# Añadir todos los cambios
git add .

# Hacer commit con mensaje descriptivo
git commit -m "🎨 style: Mejorar espaciado en Ventana0"

# Subir cambios a GitHub
git push

# Descargar cambios de GitHub
git pull

# Ver historial de commits
git log --oneline
```

---

### Emojis para Commits (Convención)

```
✨ feat:       Nueva funcionalidad
🐛 fix:        Corrección de bugs
📝 docs:       Documentación
🎨 style:      Cambios de estilo/formato
♻️  refactor:  Refactorización de código
⚡ perf:       Mejoras de performance
✅ test:       Añadir tests
🔧 chore:      Tareas de mantenimiento
🚀 deploy:     Deployment
🎉 init:       Commit inicial
```

---

## 🎯 MEJORES PRÁCTICAS <a name="mejores-practicas"></a>

### 1. Commits Frecuentes y Descriptivos

❌ **MAL:**
```bash
git commit -m "cambios"
git commit -m "fix"
git commit -m "update"
```

✅ **BIEN:**
```bash
git commit -m "✨ feat: Añadir sistema de calibración de Gigi"
git commit -m "🐛 fix: Corregir overflow en Ventana0 en mobile"
git commit -m "♻️ refactor: Aplicar minimalismo a ChromeButton"
```

---

### 2. Ramas para Funcionalidades Nuevas

```bash
# Crear rama para nueva funcionalidad
git checkout -b feature/ventana1-test-aurethica

# Trabajar en la rama
git add .
git commit -m "✨ feat: Implementar Ventana1 - Test Auréthica"

# Subir la rama
git push -u origin feature/ventana1-test-aurethica

# Cuando esté lista, hacer merge a main
git checkout main
git merge feature/ventana1-test-aurethica
git push
```

---

### 3. Mantener Sincronización

**Antes de empezar a trabajar cada día:**
```bash
git pull
```

**Después de trabajar:**
```bash
git add .
git commit -m "📝 docs: Actualizar README con nueva funcionalidad"
git push
```

---

### 4. Documentar en README.md

Mantén actualizado el README.md con:
- ✅ Estado de cada pantalla/componente
- ✅ Instrucciones de instalación
- ✅ Cómo ejecutar el proyecto
- ✅ Próximos pasos

---

### 5. Issues y Milestones en GitHub

Usa GitHub Issues para trackear:
- 🐛 Bugs encontrados
- ✨ Nuevas funcionalidades
- 📋 Tareas pendientes

Ejemplo de Issue:
```
Título: Implementar Ventana2 - Avatar Upload
Labels: enhancement, high-priority
Asignado a: tú

Descripción:
- [ ] Diseñar interfaz en Figma Make
- [ ] Implementar componente AvatarUpload
- [ ] Añadir validación de archivos
- [ ] Integrar con contexto global
- [ ] Testing en mobile
```

---

## 🚦 SIGUIENTE PASO INMEDIATO

### AHORA MISMO:

1. **Crea tu repositorio en GitHub** (5 minutos)
   - https://github.com/new
   - Nombre: `aurethica-app`
   
2. **Copia estos archivos PRIMERO** (10 minutos):
   ```
   ✅ package.json
   ✅ tsconfig.json
   ✅ vite.config.ts
   ✅ App.tsx
   ✅ styles/globals.css
   ✅ components/Ventana0.tsx  ← ¡Tu trabajo reciente!
   ```

3. **Sube el primer commit** (5 minutos):
   ```bash
   git init
   git remote add origin https://github.com/TU-USUARIO/aurethica-app.git
   git add .
   git commit -m "🎉 Initial commit - Auréthica con Ventana0"
   git branch -M main
   git push -u origin main
   ```

4. **Comparte el link del repo**:
   - Ahora puedes darle el link a ChatGPT
   - ChatGPT puede ver tu código en GitHub
   - Podéis trabajar juntos en mejoras

---

## 📞 FLUJO DE COMUNICACIÓN

### Con Claude (aquí en Figma Make):
```
"Necesito diseñar el componente X"
"Refactoriza Y con estilo Zara"
"Hazme una vista de Z con este layout"
```

### Con ChatGPT (después de subir a GitHub):
```
"Revisa este código en GitHub: [link]"
"Implementa la lógica de autenticación"
"Optimiza el performance de [componente]"
"Ayúdame a configurar Supabase"
```

---

## ✅ CHECKLIST DE EXPORTACIÓN

```
Antes de considerar que está "en GitHub":

□ Repositorio creado en GitHub
□ package.json copiado
□ tsconfig.json copiado
□ vite.config.ts copiado
□ App.tsx copiado
□ Carpeta /components completa
□ Carpeta /pages completa
□ Carpeta /contexts completa
□ Carpeta /hooks completa
□ Carpeta /lib completa
□ Carpeta /styles completa
□ README.md actualizado
□ .gitignore configurado
□ Primer commit realizado
□ Push exitoso a GitHub
□ Repositorio visible en GitHub.com
```

---

## 🎊 ¡FELICIDADES!

Una vez completado esto, tendrás:
- ✅ Código en GitHub (backup seguro)
- ✅ Control de versiones profesional
- ✅ Base para colaborar con ChatGPT
- ✅ Historial de todos tus cambios
- ✅ Plataforma para deploy futuro

---

## 📚 RECURSOS ÚTILES

- **Git Basics:** https://git-scm.com/book/en/v2
- **GitHub Guides:** https://guides.github.com/
- **Markdown Guide:** https://www.markdownguide.org/
- **Conventional Commits:** https://www.conventionalcommits.org/

---

**Creado para:** Proyecto Auréthica  
**Fecha:** Noviembre 2025  
**Última actualización:** Post-auditoría Ventana0  
**Estado:** Ventana0 ✅ Completada | Ventana1+ 🚧 En desarrollo

---

¿Dudas? Pregúntame aquí en Figma Make o usa ChatGPT con el link de tu repo de GitHub.
