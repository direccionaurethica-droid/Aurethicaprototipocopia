# 🚀 EMPIEZA AQUÍ - Auréthica

**¡Bienvenido/a al proyecto Auréthica!** Este archivo te guiará en tus primeros pasos.

---

## ⚡ Inicio Ultra-Rápido (2 minutos)

### 1️⃣ Verifica que todo esté listo

```bash
# Ejecuta el script de verificación
bash verify-github-ready.sh
```

### 2️⃣ Configura GitHub (Si aún no lo hiciste)

**Opción A: Script Automático** ⚡

```bash
# Mac/Linux
bash init-github.sh

# Windows
init-github.bat
```

**Opción B: Manual** 📖

Lee `GITHUB_SETUP.md` para instrucciones paso a paso.

### 3️⃣ Instala dependencias

```bash
npm install
```

### 4️⃣ Inicia el servidor

```bash
npm run dev
```

**¡Listo!** La app estará en `http://localhost:5173` 🎉

---

## 📚 Documentación Clave

### Para Empezar
| Archivo | Qué contiene |
|---------|--------------|
| **[README.md](README.md)** | Documentación general del proyecto |
| **[GITHUB_SETUP.md](GITHUB_SETUP.md)** | Guía completa de setup Git/GitHub |
| **[CHECKLIST_GITHUB.md](CHECKLIST_GITHUB.md)** | Checklist de verificación |
| **[COMANDOS_GIT_RAPIDOS.md](COMANDOS_GIT_RAPIDOS.md)** | Comandos Git del día a día |

### Arquitectura y Diseño
| Archivo | Qué contiene |
|---------|--------------|
| **[ARQUITECTURA.md](ARQUITECTURA.md)** | Estructura general del proyecto |
| **[guidelines/DesignSystem.md](guidelines/DesignSystem.md)** | Sistema de diseño |
| **[guidelines/GigiDesignSystem.md](guidelines/GigiDesignSystem.md)** | Diseño cromático de Gigi |

### Features Principales
| Archivo | Qué contiene |
|---------|--------------|
| **[SISTEMA_GIGI_CONFIRMACION.md](SISTEMA_GIGI_CONFIRMACION.md)** | Sistema de calibración de Gigi |
| **[BLOG_INSTAGRAM_FEED.md](BLOG_INSTAGRAM_FEED.md)** | Blog estilo Instagram |
| **[SISTEMA_PERFILES.md](SISTEMA_PERFILES.md)** | Sistema de roles |

---

## 🎯 Comandos Esenciales

```bash
# Desarrollo
npm run dev          # Iniciar servidor
npm run build        # Build para producción
npm run preview      # Vista previa de build

# Calidad
npm run lint         # Linter
npm run type-check   # Verificar tipos TypeScript
npm run format       # Formatear código

# Git
git status           # Ver cambios
git add .            # Añadir cambios
git commit -m "msg"  # Commit
git push             # Subir a GitHub
```

---

## 🗂️ Estructura del Proyecto

```
aurethica-app/
├── 📱 App.tsx              # Componente principal
├── 📦 package.json         # Dependencias
├── 📝 README.md            # Documentación
│
├── 🧩 components/          # Componentes React
│   ├── ui/                # Componentes base (shadcn)
│   ├── Gigi*.tsx          # Componentes de Gigi
│   ├── Navigation*.tsx    # Navegación
│   └── ...
│
├── 📄 pages/               # Páginas
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── TestPage.tsx
│   └── ...
│
├── 🔧 lib/                 # Utilidades
│   ├── types/             # Tipos TypeScript
│   ├── utils/             # Funciones auxiliares
│   ├── router/            # Sistema de rutas
│   └── constants/         # Constantes
│
├── 🪝 hooks/               # Custom React Hooks
├── 🌐 contexts/            # Context API
├── 🎨 styles/              # Estilos globales
└── 📖 guidelines/          # Guías de diseño
```

---

## 🎨 Paleta de Colores

```css
🤍 Fondo:      #FEFEFE  (Casi blanco)
🟡 Dorado:     #C9A24F  (Color principal)
💗 Fucsia:     #FF2D95  (Gigi)
🟫 Beige:      #F5EFE6  (Acentos cálidos)
⚫ Gris:       #6E7276  (Texto secundario)
```

---

## 👤 Roles de Usuario

La app soporta 3 tipos de perfil:

1. **👩 Usuaria (Clienta)**
   - Test de belleza personalizado
   - Blog/feed estilo Instagram
   - Perfil con recomendaciones

2. **✂️ Estilista**
   - Agenda personal
   - Estadísticas de clientas
   - Gestión de citas

3. **🏢 Empresa/Salón**
   - Panel de gestión completo
   - Múltiples estilistas
   - Estadísticas del negocio

---

## 🤖 Gigi - La Asistente IA

Gigi es la estrella de Auréthica:

- **Calibración**: 5 preguntas definen su tono
- **Tonos**: Confianza, Cambio, Seguridad, Expresión, Confirmación
- **Personalización**: Adapta respuestas a tu perfil
- **Diseño**: Gradientes cromados dorado/fucsia/dorado

---

## 🚦 Flujo de la App

```
1. Landing/Hero
   ↓
2. Registro/Login
   ↓
3. Elección de Perfil (Usuaria/Estilista/Empresa)
   ↓
4. Calibración de Gigi (5 preguntas)
   ↓
5. Test de Belleza (48 preguntas sobre ropa)
   ↓
6. Subida de Avatar (10 fotos - mock)
   ↓
7. Modo App (Blog + Perfil + Búsqueda)
```

---

## 🔥 Quick Wins

### Ver la App
```bash
npm run dev
# Abre http://localhost:5173
```

### Hacer un Cambio
```bash
# 1. Edita un archivo (ej: components/Hero.tsx)
# 2. Guarda
# 3. El navegador se recarga automáticamente
```

### Tu Primer Commit
```bash
git add .
git commit -m "✨ Feat: Mi primer cambio"
git push
```

---

## 🆘 ¿Necesitas Ayuda?

### Problemas Comunes

**"npm install falla"**
```bash
# Limpia cache
rm -rf node_modules package-lock.json
npm install
```

**"Puerto 5173 en uso"**
```bash
# Cambia el puerto en vite.config.ts
# O mata el proceso existente
```

**"Git no reconoce mi usuario"**
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### Recursos

- 📖 [Documentación completa](README.md)
- 🐛 [Reportar bug](https://github.com/TU-USUARIO/aurethica-app/issues)
- 💬 [Hacer pregunta](https://github.com/TU-USUARIO/aurethica-app/discussions)

---

## 🎯 Próximos Pasos

1. ✅ **Lee el README.md** para visión general
2. ✅ **Explora los componentes** en `/components`
3. ✅ **Revisa el sistema de diseño** en `/guidelines`
4. ✅ **Haz tu primer cambio** y súbelo a GitHub
5. ✅ **Lee CONTRIBUTING.md** si vas a contribuir

---

## 📊 Estado del Proyecto

### ✅ Completado
- Sistema de calibración de Gigi
- Test de belleza (48 preguntas)
- Blog estilo Instagram
- Sistema de perfiles múltiples
- Navegación visual colapsable
- Diseño minimalista dorado/beige
- PWA con Service Worker

### 🚧 En Progreso
- Integración con backend real
- Sistema de autenticación
- Subida real de avatares

---

## 💡 Tips Pro

### Desarrollo Eficiente
- Usa `npm run dev` y deja el servidor corriendo
- Los cambios se reflejan automáticamente
- Abre DevTools (`F12`) para debug

### Git
- Haz commits frecuentes y descriptivos
- Usa las convenciones de emojis (ver COMANDOS_GIT_RAPIDOS.md)
- Haz pull antes de push si trabajas en equipo

### VS Code
- Instala las extensiones recomendadas (ver .vscode/extensions.json)
- Usa `Cmd/Ctrl + P` para buscar archivos rápido
- `Cmd/Ctrl + Shift + F` para buscar en todo el proyecto

---

<div align="center">

## 🎉 ¡Ya Estás List@!

**Todo lo que necesitas está aquí.**  
**Si tienes dudas, revisa la documentación o abre un issue.**

```
        ⭐
       ⭐⭐⭐
      ⭐⭐⭐⭐⭐
     ⭐⭐⭐⭐⭐⭐⭐
```

**¡Feliz desarrollo!** 🚀

[⬆ Volver arriba](#-empieza-aquí---auréthica)

</div>

---

**Última actualización**: 2025  
**Versión**: 1.0.0  
**Equipo**: Auréthica
