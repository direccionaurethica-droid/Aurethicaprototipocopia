# 🚀 Guía Completa: Conectar Auréthica con GitHub

Esta guía te ayudará a conectar tu proyecto Auréthica con GitHub paso a paso.

---

## 📋 Pre-requisitos

1. **Git instalado** en tu computadora
   ```bash
   git --version
   ```
   Si no está instalado: https://git-scm.com/downloads

2. **Cuenta de GitHub** creada
   - https://github.com/join

3. **Terminal/Línea de comandos** abierta en la carpeta del proyecto

---

## 🔧 Paso 1: Configurar Git (Primera vez)

Si es la primera vez que usas Git en esta computadora:

```bash
# Configurar tu nombre
git config --global user.name "Tu Nombre"

# Configurar tu email (debe ser el mismo de GitHub)
git config --global user.email "tu.email@ejemplo.com"

# Verificar configuración
git config --list
```

---

## 📦 Paso 2: Inicializar Repositorio Local

En la carpeta raíz del proyecto (donde está el archivo `App.tsx`):

```bash
# Inicializar Git
git init

# Verificar que se creó el repositorio
ls -la
# Deberías ver una carpeta .git
```

---

## 📝 Paso 3: Preparar Archivos para el Commit

```bash
# Ver estado actual
git status

# Añadir todos los archivos
git add .

# O añadir archivos específicos
git add App.tsx
git add components/
git add styles/

# Verificar qué se va a commitear
git status
```

---

## 💾 Paso 4: Crear Primer Commit

```bash
# Commit inicial
git commit -m "🎨 Initial commit: Auréthica - Premium Beauty Platform

- Sistema completo de calibración de Gigi
- Test de belleza personalizado
- Sistema de perfiles (Usuaria/Estilista/Empresa)
- Blog estilo Instagram
- Navegación visual colapsable
- Sistema de diseño minimalista dorado/beige
- PWA ready con Service Worker"

# Ver historial
git log --oneline
```

---

## 🌐 Paso 5: Crear Repositorio en GitHub

### Opción A: Desde GitHub.com (Recomendado)

1. Ve a https://github.com/new
2. Completa el formulario:
   - **Repository name**: `aurethica-app`
   - **Description**: `Plataforma premium de belleza con IA personalizada (Gigi)`
   - **Visibility**: 
     - ✅ **Private** (recomendado si es proyecto comercial)
     - ☑️ Public (si quieres código abierto)
   - ❌ **NO marques** "Add a README file"
   - ❌ **NO marques** "Add .gitignore"
   - ❌ **NO marques** "Choose a license"
3. Click en **"Create repository"**

### Opción B: Desde GitHub CLI (Avanzado)

```bash
# Si tienes GitHub CLI instalado
gh repo create aurethica-app --private --source=. --remote=origin --push
```

---

## 🔗 Paso 6: Conectar Repositorio Local con GitHub

Copia el URL de tu repositorio de GitHub (aparece después de crearlo), por ejemplo:
```
https://github.com/TU-USUARIO/aurethica-app.git
```

Luego ejecuta:

```bash
# Añadir repositorio remoto
git remote add origin https://github.com/TU-USUARIO/aurethica-app.git

# Verificar que se añadió correctamente
git remote -v

# Debería mostrar:
# origin  https://github.com/TU-USUARIO/aurethica-app.git (fetch)
# origin  https://github.com/TU-USUARIO/aurethica-app.git (push)
```

---

## 📤 Paso 7: Subir Código a GitHub

```bash
# Renombrar rama principal a 'main' (estándar actual)
git branch -M main

# Subir código por primera vez
git push -u origin main

# Te pedirá autenticación de GitHub
# Usa tu usuario y contraseña o un Personal Access Token
```

### ⚠️ Autenticación con GitHub

GitHub ya no acepta contraseñas normales. Necesitas un **Personal Access Token**:

1. Ve a https://github.com/settings/tokens
2. Click en **"Generate new token"** → **"Generate new token (classic)"**
3. Configura:
   - **Note**: `Auréthica Development`
   - **Expiration**: `90 days` (o lo que prefieras)
   - **Scopes**: Marca `repo` (todos los permisos de repositorio)
4. Click en **"Generate token"**
5. **¡COPIA EL TOKEN!** (solo se muestra una vez)
6. Usa ese token como contraseña cuando Git te lo pida

---

## 🌳 Paso 8: Configurar Ramas (Opcional pero Recomendado)

```bash
# Crear rama de desarrollo
git checkout -b development

# Crear rama de staging
git checkout -b staging

# Volver a main
git checkout main

# Ver todas las ramas
git branch -a
```

### Flujo de Trabajo Recomendado

```
main (producción) ← staging (pre-producción) ← development (desarrollo) ← feature/nueva-funcionalidad
```

---

## 📊 Comandos Git Esenciales para el Día a Día

### Ver Estado

```bash
# Ver archivos modificados
git status

# Ver diferencias
git diff

# Ver historial
git log --oneline --graph --all
```

### Hacer Cambios

```bash
# Añadir archivos modificados
git add .

# Commit con mensaje descriptivo
git commit -m "✨ Feat: Añadir nuevo componente X"

# Subir cambios
git push
```

### Trabajar con Ramas

```bash
# Crear nueva rama y cambiarse a ella
git checkout -b feature/nueva-funcionalidad

# Cambiar de rama
git checkout development

# Fusionar rama (estando en la rama destino)
git merge feature/nueva-funcionalidad

# Eliminar rama local
git branch -d feature/nueva-funcionalidad
```

### Deshacer Cambios

```bash
# Descartar cambios en archivo específico
git checkout -- archivo.tsx

# Descartar todos los cambios no commiteados
git reset --hard

# Volver al commit anterior (sin borrar cambios)
git reset --soft HEAD~1

# Ver qué cambió en último commit
git show
```

### Actualizar desde GitHub

```bash
# Descargar cambios sin fusionar
git fetch

# Descargar y fusionar cambios
git pull

# Ver ramas remotas
git branch -r
```

---

## 🏷️ Convenciones de Commits (Emojis)

Usa estos prefijos para que los commits sean más legibles:

```bash
git commit -m "✨ Feat: Nueva funcionalidad"
git commit -m "🐛 Fix: Corrección de bug"
git commit -m "🎨 Style: Cambios de diseño/estilos"
git commit -m "♻️ Refactor: Refactorización de código"
git commit -m "📝 Docs: Actualización de documentación"
git commit -m "🚀 Deploy: Preparación para despliegue"
git commit -m "🔧 Config: Cambios de configuración"
git commit -m "⚡️ Perf: Mejoras de rendimiento"
git commit -m "🧪 Test: Añadir o actualizar tests"
git commit -m "🔒 Security: Mejoras de seguridad"
```

---

## 📦 Paso 9: Configurar GitHub Pages (Opcional)

Si quieres publicar tu app en GitHub Pages:

```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Añadir a package.json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Desplegar
npm run deploy
```

Tu app estará disponible en:
```
https://TU-USUARIO.github.io/aurethica-app/
```

---

## 🔐 Paso 10: Proteger Información Sensible

### Variables de Entorno

Crea un archivo `.env` en la raíz (ya está en `.gitignore`):

```bash
# .env
VITE_SUPABASE_URL=tu-url-aqui
VITE_SUPABASE_ANON_KEY=tu-key-aqui
VITE_API_KEY=tu-api-key
```

Usa variables de entorno en tu código:

```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
```

### Archivo .env.example

Crea `.env.example` para que otros desarrolladores sepan qué variables necesitan:

```bash
# .env.example
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_API_KEY=
```

**Este sí se sube a GitHub**, pero sin valores reales.

---

## 👥 Paso 11: Colaborar con Otros

### Añadir Colaboradores

1. Ve a tu repositorio en GitHub
2. Settings → Collaborators
3. Click en "Add people"
4. Ingresa el usuario de GitHub
5. Ellos recibirán una invitación por email

### Clonar el Repositorio (Para colaboradores)

```bash
# Clonar repositorio
git clone https://github.com/TU-USUARIO/aurethica-app.git

# Entrar a la carpeta
cd aurethica-app

# Instalar dependencias
npm install

# Copiar .env.example a .env y llenar valores
cp .env.example .env

# Iniciar desarrollo
npm run dev
```

---

## 🎯 Flujo de Trabajo Completo (Ejemplo)

```bash
# 1. Asegurarte de estar en development
git checkout development

# 2. Actualizar tu rama local
git pull origin development

# 3. Crear rama para nueva funcionalidad
git checkout -b feature/gigi-voice-assistant

# 4. Hacer cambios en el código...
# ... programar ...
# ... guardar archivos ...

# 5. Ver qué cambió
git status
git diff

# 6. Añadir cambios
git add components/GigiVoiceAssistant.tsx
git add styles/voice-assistant.css

# 7. Commit
git commit -m "✨ Feat: Añadir asistente de voz para Gigi

- Componente GigiVoiceAssistant con reconocimiento de voz
- Integración con Web Speech API
- Estilos cromados dorados
- Animaciones de ondas de sonido"

# 8. Subir rama a GitHub
git push -u origin feature/gigi-voice-assistant

# 9. En GitHub: Crear Pull Request
# - Ve a tu repositorio en GitHub
# - Verás un botón "Compare & pull request"
# - Añade descripción y click en "Create pull request"

# 10. Después de aprobar el PR, fusionar en development
git checkout development
git merge feature/gigi-voice-assistant

# 11. Subir development actualizado
git push origin development

# 12. Limpiar rama local
git branch -d feature/gigi-voice-assistant
```

---

## 🆘 Solución de Problemas Comunes

### Error: "fatal: not a git repository"

```bash
# Estás en la carpeta incorrecta
# Ve a la raíz del proyecto
cd /ruta/a/tu/proyecto
git init
```

### Error: "remote origin already exists"

```bash
# Eliminar origin existente
git remote remove origin

# Añadir de nuevo
git remote add origin URL-DE-TU-REPO
```

### Error: "Updates were rejected"

```bash
# Alguien subió cambios antes que tú
# Descargar cambios primero
git pull origin main

# Si hay conflictos, resuélvelos y luego:
git add .
git commit -m "🔀 Merge: Resolver conflictos"
git push origin main
```

### Error: "Permission denied (publickey)"

```bash
# Configurar SSH key (alternativa a HTTPS)
# 1. Generar SSH key
ssh-keygen -t ed25519 -C "tu.email@ejemplo.com"

# 2. Copiar la key pública
cat ~/.ssh/id_ed25519.pub

# 3. Añadir en GitHub:
# Settings → SSH and GPG keys → New SSH key
# Pegar la key y guardar

# 4. Cambiar URL remota a SSH
git remote set-url origin git@github.com:TU-USUARIO/aurethica-app.git
```

### Archivos muy grandes

```bash
# Si tienes imágenes u archivos grandes (>50MB)
# Usa Git LFS (Large File Storage)

# Instalar Git LFS
git lfs install

# Rastrear archivos grandes
git lfs track "*.png"
git lfs track "*.jpg"
git lfs track "*.mp4"

# Commit del archivo .gitattributes
git add .gitattributes
git commit -m "🔧 Config: Configurar Git LFS"
```

---

## 📱 GitHub en Móvil

Descarga la app de GitHub para iOS/Android:
- Revisar Pull Requests
- Ver código
- Fusionar ramas
- Recibir notificaciones

---

## 🎓 Recursos Adicionales

### Documentación Oficial
- Git: https://git-scm.com/doc
- GitHub: https://docs.github.com/

### Tutoriales Interactivos
- Learn Git Branching: https://learngitbranching.js.org/
- GitHub Skills: https://skills.github.com/

### Cheat Sheets
- Git Commands: https://education.github.com/git-cheat-sheet-education.pdf
- GitHub Flow: https://githubflow.github.io/

---

## ✅ Checklist Final

- [ ] Git instalado y configurado
- [ ] Repositorio inicializado localmente
- [ ] Primer commit creado
- [ ] Repositorio creado en GitHub
- [ ] Repositorio local conectado con GitHub
- [ ] Código subido a GitHub
- [ ] `.gitignore` configurado correctamente
- [ ] `.env.example` creado (si usas variables de entorno)
- [ ] README.md actualizado
- [ ] Colaboradores añadidos (si aplica)
- [ ] Ramas de trabajo configuradas

---

## 🎉 ¡Listo!

Tu proyecto Auréthica ahora está en GitHub. Puedes:

- ✅ Ver tu código en https://github.com/TU-USUARIO/aurethica-app
- ✅ Compartir el link con colaboradores
- ✅ Trabajar en equipo con Pull Requests
- ✅ Mantener historial de cambios
- ✅ Hacer rollback si algo sale mal
- ✅ Configurar CI/CD (GitHub Actions)
- ✅ Publicar tu app (GitHub Pages, Vercel, Netlify, etc.)

---

**¿Necesitas ayuda?**
- GitHub Community: https://github.community/
- Stack Overflow: https://stackoverflow.com/questions/tagged/git
- Documentación Auréthica: Ver archivos `*.md` en el proyecto

**Creado para Auréthica** 🌟  
Plataforma Premium de Belleza con IA Personalizada
