# 🌟 Auréthica

> Plataforma premium de belleza con asistente IA personalizada

Auréthica es una aplicación web innovadora que combina tecnología de vanguardia con un diseño minimalista y elegante para ofrecer una experiencia personalizada en el mundo de la belleza.

![Version](https://img.shields.io/badge/version-1.0.0-C9A24F)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)
![License](https://img.shields.io/badge/license-Private-red)

---

## 🚀 INICIO RÁPIDO

### ⚡ Instalación y Setup en 2 Minutos

```bash
# 1. Clonar repositorio
git clone https://github.com/TU-USUARIO/aurethica-app.git
cd aurethica-app

# 2. Instalar dependencias
npm install

# 3. Iniciar desarrollo
npm run dev
```

**La app estará en:** `http://localhost:5173`

### 🎯 Setup Automatizado de GitHub

Si acabas de descargar el código desde Figma Make, usa el script automático:

**Windows:**
```bash
# Doble click en:
SETUP_GITHUB_AUTO.bat
```

**Mac/Linux:**
```bash
bash SETUP_GITHUB_AUTO.sh
```

**Manual:**
Ver [COMANDOS_GIT_LISTOS.md](COMANDOS_GIT_LISTOS.md) para comandos copy/paste

---

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo (puerto 5173)
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linter ESLint
npm run type-check   # Verificación de TypeScript
npm run format       # Formatear código con Prettier

# Git (Setup inicial)
npm run git:init     # Configurar Git automáticamente
```

---

## 🏗️ Arquitectura

```
aurethica-app/
├── components/          # Componentes React
│   ├── ui/             # Componentes de shadcn/ui
│   ├── figma/          # Componentes importados de Figma
│   ├── Gigi*.tsx       # Componentes de la IA
│   ├── Navigation*.tsx # Navegación
│   └── ...
├── pages/              # Páginas principales
├── contexts/           # Context API de React
├── hooks/              # Custom React Hooks
├── lib/                # Utilidades y helpers
│   ├── utils/         # Funciones auxiliares
│   ├── types/         # Definiciones TypeScript
│   └── router/        # Sistema de enrutamiento
├── styles/             # Estilos globales
└── guidelines/         # Documentación de diseño
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores Premium (Actualizada)

```css
/* Paleta Premium Minimalista */
--black-pure: #000000          /* Fondo principal */
--black-soft: #0a0a0a          /* Fondo secundario */
--gold-metallic: #D4AF37       /* Dorado metálico principal */
--gold-old: #C9A24F            /* Dorado viejo (acentos) */
--gigi-fuchsia: #FF2D95        /* Fucsia Gigi */
--white-pure: #FFFFFF          /* Texto principal */
--gray-warm: #666666           /* Texto secundario */
```

### Tipografía

- **Títulos**: Playfair Display (serif elegante)
- **Cuerpo**: Montserrat (sans-serif limpia)
- **Sin clases de Tailwind para font-size/weight** (controlado en globals.css)

### Efectos Cromados Premium

Gradiente metálico exclusivo para Gigi y elementos premium:
- Acabado brillante metalizado
- Transiciones suaves dorado → plata
- Brillo dinámico con hover
- Usado en: ChromeButton, MetallicButton, MetallicText

---

## 🔧 Tecnologías

### Core
- **React 18.3** - Framework de UI
- **TypeScript 5.6** - Tipado estático
- **Vite 6.0** - Build tool ultrarrápido

### UI/UX
- **Tailwind CSS 4.0** - Estilos utility-first
- **shadcn/ui** - Componentes accesibles
- **Lucide React** - Iconos
- **Motion (Framer Motion)** - Animaciones

### Estado y Contexto
- **React Context API** - Gestión de estado
- **Custom Hooks** - Lógica reutilizable

### Otros
- **react-hook-form** - Formularios
- **recharts** - Gráficos
- **sonner** - Notificaciones

---

## 📱 PWA (Progressive Web App)

Auréthica es una PWA completa que puede instalarse como app nativa:

- ✅ Service Worker para caché offline
- ✅ Manifest.json configurado
- ✅ Instalable en iOS y Android
- ✅ Optimización de recursos con Vite PWA Plugin

---

## 🔐 Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
# Supabase (si usas autenticación)
VITE_SUPABASE_URL=tu-url-aqui
VITE_SUPABASE_ANON_KEY=tu-key-aqui

# APIs Externas
VITE_API_KEY=tu-api-key

# Configuración
VITE_APP_NAME=Auréthica
VITE_APP_URL=http://localhost:5173
```

---

## 📖 Documentación

### 🚀 Para Empezar
- [EXPORT_TO_GITHUB.md](EXPORT_TO_GITHUB.md) - **Guía completa de exportación y trabajo en equipo**
- [COMANDOS_GIT_LISTOS.md](COMANDOS_GIT_LISTOS.md) - Comandos Git copy/paste
- [GITHUB_SETUP.md](GITHUB_SETUP.md) - Setup detallado de GitHub

### Guías de Desarrollo
- [Sistema de Diseño](guidelines/DesignSystem.md) - Guía de estilos
- [Sistema Cromático de Gigi](guidelines/GigiDesignSystem.md) - Diseño de la IA

### Arquitectura
- [Arquitectura General](ARQUITECTURA.md) - Estructura del proyecto
- [Flujo de Páginas](ARQUITECTURA_PAGINAS.md) - Navegación
- [Vistas Profesionales](ARQUITECTURA_VISTAS_PROFESIONALES.md) - Perfiles

### Features
- [Sistema de Calibración](SISTEMA_GIGI_CONFIRMACION.md) - Cómo funciona Gigi
- [Blog Instagram](BLOG_INSTAGRAM_FEED.md) - Feed social
- [Sistema de Perfiles](SISTEMA_PERFILES.md) - Roles de usuario

---

## 🤝 Trabajo en Equipo

### Workflow: Claude + ChatGPT + GitHub

Este proyecto está diseñado para trabajo colaborativo entre diferentes herramientas:

1. **Claude (Figma Make)** - Prototipado rápido, diseño UI/UX, refactorización
2. **GitHub** - Centro de verdad, control de versiones
3. **ChatGPT** - Lógica backend, optimización, testing

**Lee la guía completa:** [EXPORT_TO_GITHUB.md](EXPORT_TO_GITHUB.md)

### Convenciones de Commits

```bash
✨ feat:      Nueva funcionalidad
🐛 fix:       Corrección de bugs
📝 docs:      Documentación
🎨 style:     Cambios de estilo/formato
♻️ refactor:  Refactorización de código
⚡ perf:      Mejoras de performance
✅ test:      Añadir tests
🔧 chore:     Tareas de mantenimiento
🚀 deploy:    Deployment
🎉 init:      Commit inicial
```

---

## 📊 Estado del Proyecto

### ✅ Completado (Última Actualización: Nov 2025)

#### Ventanas/Páginas Principales
- [x] **Ventana0** - Intro Gigi + Calibración ✅ **COMPLETADA Y AUDITADA**
  - Diseño minimalista estilo Zara
  - Logo Gigi circular en parte superior
  - Fondo negro puro
  - Código optimizado y limpio
- [x] Sistema de calibración de Gigi (5 preguntas)
- [x] Test de belleza (48 preguntas originales)
- [x] Sistema de perfiles múltiples
- [x] Blog estilo Instagram
- [x] Navegación visual colapsable

#### Diseño y Estética
- [x] Refactorización quirúrgica estilo Zara (minimalismo elegante)
- [x] Paleta premium: Negro puro + Dorado metálico + Fucsia Gigi
- [x] Sistema de diseño consistente con espaciado matemático
- [x] Efectos cromados brillantes en botones
- [x] Ícono circular de cabello para Gigi
- [x] Gradientes cromados dorado/fucsia/dorado
- [x] PWA con Service Worker
- [x] Responsive completo

### 🚧 En Desarrollo

- [ ] Ventana1+ (siguientes pantallas del flujo)
- [ ] Integración con Supabase
- [ ] Sistema de autenticación real
- [ ] Subida real de avatar (actualmente mock)
- [ ] Chat en vivo con estilistas
- [ ] Sistema de citas con calendario real

### 🔮 Futuro

- [ ] Integración con IA (GPT-4, Claude)
- [ ] Reconocimiento de voz para Gigi
- [ ] Realidad aumentada (prueba virtual de looks)
- [ ] Marketplace de productos
- [ ] Sistema de pagos

---

## 📊 Roadmap

### Q1 2025
- Backend con Supabase
- Autenticación OAuth
- Gestión real de usuarios

### Q2 2025
- Sistema de citas funcional
- Chat en tiempo real
- Notificaciones push

### Q3 2025
- Integración con IA avanzada
- Análisis de imágenes
- Recomendaciones automáticas

---

## 📄 Licencia

Este proyecto es **privado y propietario**. Todos los derechos reservados.

No está permitido:
- ❌ Uso comercial sin autorización
- ❌ Distribución del código
- ❌ Modificación y redistribución

Para licencias comerciales, contacta a: [contacto@aurethica.com]

---

## 👥 Equipo

- **Diseño Elite** - Sistema de diseño y UX
- **Desarrollo** - Implementación técnica
- **Gigi** - Asistente IA personalizada 🤖

---

## 📞 Contacto

- **Website**: [aurethica.com]
- **Email**: contacto@aurethica.com
- **GitHub**: [@TU-USUARIO/aurethica-app]

---

## 🙏 Agradecimientos

- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI accesibles
- [Lucide](https://lucide.dev/) - Sistema de iconos
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- [Figma](https://figma.com/) - Herramienta de diseño
- [Motion (Framer Motion)](https://motion.dev/) - Librería de animaciones
- [Vite](https://vitejs.dev/) - Build tool ultrarrápido

---

<div align="center">

**Hecho con 💛 por el equipo Auréthica**

*Donde la belleza encuentra la tecnología*

**Estado Actual:** Ventana0 ✅ Completada | Flujo completo 🚧 En desarrollo

[⬆ Volver arriba](#-auréthica)

</div>