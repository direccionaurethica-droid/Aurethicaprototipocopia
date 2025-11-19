# 🤝 Contribuir a Auréthica

¡Gracias por tu interés en contribuir a Auréthica! Este documento te guiará en el proceso.

---

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo Puedo Contribuir?](#cómo-puedo-contribuir)
- [Guía de Estilo](#guía-de-estilo)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Configuración del Entorno](#configuración-del-entorno)

---

## 📜 Código de Conducta

### Nuestro Compromiso

Nos comprometemos a mantener un ambiente acogedor, inclusivo y libre de acoso para todos.

### Comportamientos Esperados

✅ Usar lenguaje acogedor e inclusivo  
✅ Respetar diferentes puntos de vista  
✅ Aceptar críticas constructivas  
✅ Enfocarse en lo mejor para la comunidad  
✅ Mostrar empatía hacia otros miembros  

### Comportamientos Inaceptables

❌ Uso de lenguaje o imágenes sexualizadas  
❌ Trolling, insultos o comentarios despectivos  
❌ Acoso público o privado  
❌ Publicar información privada de otros  
❌ Conducta inapropiada en un entorno profesional  

---

## 🚀 ¿Cómo Puedo Contribuir?

### 🐛 Reportar Bugs

Si encuentras un bug, por favor:

1. **Verifica** que no esté ya reportado en [Issues](https://github.com/TU-USUARIO/aurethica-app/issues)
2. **Abre un nuevo issue** con:
   - Título descriptivo
   - Pasos para reproducir el bug
   - Comportamiento esperado vs actual
   - Screenshots si aplica
   - Información del navegador/sistema

**Template de Bug Report:**

```markdown
**Describe el bug**
Una descripción clara del problema.

**Para Reproducir**
Pasos para reproducir:
1. Ve a '...'
2. Click en '....'
3. Scroll hasta '....'
4. Ver error

**Comportamiento Esperado**
Lo que debería suceder.

**Screenshots**
Si aplica, añade screenshots.

**Entorno:**
 - OS: [e.g. iOS, Windows]
 - Navegador [e.g. chrome, safari]
 - Versión [e.g. 22]
```

### 💡 Sugerir Mejoras

Para sugerir nuevas features:

1. **Abre un issue** con el tag `enhancement`
2. **Describe** claramente la feature
3. **Explica** por qué sería útil
4. **Proporciona** ejemplos de uso

**Template de Feature Request:**

```markdown
**¿Tu feature está relacionada con un problema?**
Una descripción clara del problema.

**Describe la solución que te gustaría**
Lo que quieres que suceda.

**Describe alternativas que hayas considerado**
Otras soluciones o features consideradas.

**Contexto adicional**
Screenshots, mockups, etc.
```

### 🔧 Contribuir con Código

#### 1. Fork el Repositorio

```bash
# Fork en GitHub.com, luego:
git clone https://github.com/TU-USUARIO/aurethica-app.git
cd aurethica-app
```

#### 2. Crear Rama

```bash
# Nombres de ramas:
# feature/nombre-feature  - Para nuevas funcionalidades
# fix/nombre-bug         - Para correcciones
# docs/descripcion       - Para documentación
# refactor/descripcion   - Para refactorización

git checkout -b feature/nueva-funcionalidad
```

#### 3. Hacer Cambios

```bash
# Hacer tus cambios...

# Ver qué cambió
git status
git diff

# Añadir cambios
git add .

# Commit
git commit -m "✨ Feat: Añadir nueva funcionalidad X"
```

#### 4. Push y Pull Request

```bash
# Subir rama
git push origin feature/nueva-funcionalidad

# Luego en GitHub, crear Pull Request
```

---

## 🎨 Guía de Estilo

### TypeScript

```typescript
// ✅ BIEN: Interfaces con PascalCase
interface UserData {
  name: string;
  email: string;
}

// ✅ BIEN: Componentes funcionales con tipos
export function Component({ prop1, prop2 }: ComponentProps) {
  return <div>...</div>;
}

// ✅ BIEN: Hooks personalizados
function useCustomHook() {
  // ...
}

// ❌ MAL: any
const data: any = fetchData(); // Evitar 'any'

// ✅ BIEN: Tipos específicos
const data: UserData = fetchData();
```

### React

```typescript
// ✅ BIEN: Componentes funcionales
export function MyComponent({ title }: Props) {
  const [state, setState] = useState<string>('');
  
  useEffect(() => {
    // ...
  }, []);
  
  return <div>{title}</div>;
}

// ❌ MAL: Class components (evitar)
class MyComponent extends React.Component { }

// ✅ BIEN: Destructuring props
export function Button({ label, onClick, disabled }: ButtonProps) { }

// ❌ MAL: Props directamente
export function Button(props: ButtonProps) { }
```

### CSS/Tailwind

```tsx
// ✅ BIEN: Clases de Tailwind organizadas
<div className="
  flex items-center justify-between
  px-4 py-2
  bg-white rounded-lg shadow-md
  hover:shadow-lg transition-shadow
">

// ❌ MAL: Todo en una línea
<div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">

// ✅ BIEN: Usar variables CSS de Auréthica
className="text-[#C9A24F]" // Dorado de Auréthica
className="bg-[#FEFEFE]"   // Fondo casi blanco

// ❌ MAL: No usar font-size directamente
className="text-2xl"       // Evitar (solo si el usuario lo pide)
```

### Nombres

```typescript
// Variables y funciones: camelCase
const userName = 'Juan';
function fetchUserData() { }

// Componentes y tipos: PascalCase
interface UserProfile { }
function UserCard() { }

// Constantes: UPPER_SNAKE_CASE
const API_URL = 'https://api.example.com';
const MAX_RETRIES = 3;

// Archivos:
// - Componentes: PascalCase.tsx (UserProfile.tsx)
// - Utilidades: camelCase.ts (helpers.ts)
// - Tipos: camelCase.ts (index.ts)
```

### Commits

Usar emojis y prefijos:

```bash
# Features
git commit -m "✨ Feat: Añadir sistema de notificaciones"

# Bug fixes
git commit -m "🐛 Fix: Corregir error en formulario de registro"

# Estilos/Diseño
git commit -m "🎨 Style: Actualizar paleta de colores dorados"

# Refactoring
git commit -m "♻️ Refactor: Simplificar lógica de navegación"

# Documentación
git commit -m "📝 Docs: Actualizar README con nuevas instrucciones"

# Performance
git commit -m "⚡️ Perf: Optimizar carga de imágenes"

# Tests
git commit -m "🧪 Test: Añadir tests para componente Gigi"

# Configuración
git commit -m "🔧 Config: Actualizar configuración de Vite"

# Seguridad
git commit -m "🔒 Security: Añadir validación de inputs"

# Deploy
git commit -m "🚀 Deploy: Preparar versión 1.0.0"
```

---

## 🔄 Proceso de Pull Request

### Checklist Antes de Crear PR

- [ ] El código compila sin errores (`npm run build`)
- [ ] No hay errores de TypeScript (`npm run type-check`)
- [ ] El linter pasa (`npm run lint`)
- [ ] Los cambios funcionan en desarrollo (`npm run dev`)
- [ ] Se actualizó la documentación si es necesario
- [ ] Se añadieron comentarios JSDoc si es necesario
- [ ] Los commits siguen la convención de emojis
- [ ] La rama está actualizada con `main`

### Crear Pull Request

1. **Título descriptivo**
   ```
   ✨ Feat: Añadir sistema de notificaciones push
   ```

2. **Descripción completa**
   ```markdown
   ## Descripción
   Implementación de sistema de notificaciones push para alertas en tiempo real.

   ## Tipo de cambio
   - [x] Nueva funcionalidad (feature)
   - [ ] Bug fix
   - [ ] Breaking change
   - [ ] Documentación

   ## ¿Cómo se ha probado?
   - [x] Pruebas manuales en desarrollo
   - [x] Pruebas en diferentes navegadores
   - [ ] Tests automáticos

   ## Screenshots
   [Añadir screenshots si aplica]

   ## Checklist
   - [x] Mi código sigue las guías de estilo
   - [x] He revisado mi propio código
   - [x] He comentado código complejo
   - [x] He actualizado la documentación
   - [x] Mis cambios no generan warnings
   ```

3. **Asignar reviewers**
   - Asigna a un miembro del equipo para revisión

4. **Labels**
   - `enhancement` para features
   - `bug` para fixes
   - `documentation` para docs
   - `wip` si aún está en progreso

### Durante la Revisión

- Responde a comentarios de forma constructiva
- Realiza cambios solicitados
- Marca conversaciones como resueltas
- Agradece los comentarios

### Después de Aprobar

- Asegúrate de que el CI pase (si está configurado)
- El maintainer hará el merge
- Puedes borrar tu rama después del merge

---

## 🛠️ Configuración del Entorno

### Requisitos

- Node.js 18+
- npm 9+
- Git
- Editor: VS Code (recomendado)

### Setup Inicial

```bash
# 1. Clonar
git clone https://github.com/TU-USUARIO/aurethica-app.git
cd aurethica-app

# 2. Instalar dependencias
npm install

# 3. Configurar entorno
cp .env.example .env
# Editar .env con tus valores

# 4. Iniciar desarrollo
npm run dev
```

### Extensiones VS Code Recomendadas

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "styled-components.vscode-styled-components",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### Scripts Útiles

```bash
# Desarrollo
npm run dev            # Servidor de desarrollo

# Build
npm run build          # Construir para producción
npm run preview        # Vista previa de build

# Calidad de código
npm run lint           # Ejecutar linter
npm run type-check     # Verificar tipos TypeScript
npm run format         # Formatear código con Prettier

# Git
npm run git:init       # Setup inicial de Git
```

---

## 🏗️ Estructura del Proyecto

```
aurethica-app/
├── components/          # Componentes React
│   ├── ui/             # Componentes base (shadcn)
│   ├── Gigi*.tsx       # Componentes de IA
│   └── ...
├── pages/              # Páginas principales
├── contexts/           # Context API
├── hooks/              # Custom hooks
├── lib/                # Utilidades
│   ├── types/         # Tipos TypeScript
│   ├── utils/         # Funciones auxiliares
│   └── router/        # Sistema de rutas
├── styles/             # Estilos globales
└── guidelines/         # Documentación de diseño
```

---

## 📝 Documentación

Al añadir nuevas funcionalidades, actualiza:

1. **README.md** - Si cambia setup o features principales
2. **Documentos en `/`** - Si afecta arquitectura
3. **Guidelines** - Si añades patrones de diseño
4. **Comentarios JSDoc** - Para funciones públicas

### Ejemplo JSDoc

```typescript
/**
 * Calcula el tono de Gigi basado en las respuestas de calibración
 * 
 * @param answers - Array de respuestas del usuario (1-5)
 * @param weights - Pesos para cada pregunta (opcional)
 * @returns El tono calculado: 'confianza' | 'cambio' | 'seguridad' | etc.
 * 
 * @example
 * ```typescript
 * const tono = calculateGigiTone([5, 4, 5, 3, 4]);
 * console.log(tono); // 'confianza'
 * ```
 */
function calculateGigiTone(
  answers: number[],
  weights?: number[]
): GigiTone {
  // ...
}
```

---

## 🐞 Debugging

### Herramientas

- **React DevTools** - Inspeccionar componentes
- **Console.log** - Debug básico
- **Breakpoints** - En navegador o VS Code
- **React Error Boundary** - Capturar errores

### Tips

```typescript
// ✅ BIEN: Console.log descriptivo
console.log('🎨 Tono Gigi calculado:', gigiTone);

// ❌ MAL: Console.log genérico
console.log(gigiTone);

// ✅ BIEN: Usar debugger en desarrollo
if (import.meta.env.DEV) {
  debugger;
}
```

---

## 🎯 Áreas Prioritarias

### Alto Impacto

1. **Sistema de Gigi** - IA y calibración
2. **Test de Belleza** - Preguntas y resultados
3. **Blog Feed** - Experiencia Instagram
4. **Perfiles** - Usuaria/Estilista/Empresa

### Mejoras Bienvenidas

- 🌐 Internacionalización (i18n)
- ♿ Accesibilidad (a11y)
- ⚡ Performance
- 📱 PWA features
- 🧪 Tests automáticos
- 📊 Analytics

---

## 📞 Contacto

¿Preguntas? Contacta:

- **Email**: dev@aurethica.com
- **GitHub Issues**: [Crear Issue](https://github.com/TU-USUARIO/aurethica-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/TU-USUARIO/aurethica-app/discussions)

---

## 🙏 Reconocimientos

Todos los contribuidores son listados en:
- [Contributors](https://github.com/TU-USUARIO/aurethica-app/graphs/contributors)
- [CHANGELOG.md](CHANGELOG.md)

---

<div align="center">

**¡Gracias por contribuir a Auréthica!** 💛

*Donde la belleza encuentra la tecnología*

[⬆ Volver arriba](#-contribuir-a-auréthica)

</div>
