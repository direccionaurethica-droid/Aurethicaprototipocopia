# 📸 GitHub - Pasos Visuales Ilustrados

Guía paso a paso con instrucciones visuales para conectar Auréthica a GitHub.

---

## 🎬 Método Rápido (Recomendado)

### Para Mac/Linux

```bash
# Dale permisos de ejecución al script
chmod +x init-github.sh

# Ejecuta el script
./init-github.sh
```

### Para Windows

```bash
# Doble click en:
init-github.bat
```

¡El script te guiará paso a paso! 🚀

---

## 📋 Método Manual (Paso a Paso)

### PASO 1: Abrir Terminal

**Mac:**
- Presiona `Cmd + Espacio`
- Escribe "Terminal"
- Presiona Enter

**Windows:**
- Presiona `Win + R`
- Escribe "cmd"
- Presiona Enter

**Linux:**
- Presiona `Ctrl + Alt + T`

---

### PASO 2: Navegar a tu Proyecto

```bash
# Ejemplo en Mac/Linux
cd ~/Documentos/aurethica-app

# Ejemplo en Windows
cd C:\Users\TuNombre\Documentos\aurethica-app
```

💡 **Tip**: Arrastra la carpeta del proyecto a la terminal para autocompletar la ruta

---

### PASO 3: Verificar Git

```bash
git --version
```

**Deberías ver algo como:**
```
git version 2.39.0
```

**Si dice "comando no encontrado":**
- Mac: `brew install git`
- Windows: Descarga de https://git-scm.com/
- Linux: `sudo apt-get install git`

---

### PASO 4: Configurar Git (Primera vez)

```bash
git config --global user.name "Tu Nombre Completo"
git config --global user.email "tu.email@gmail.com"
```

**Verificar:**
```bash
git config --global --list
```

---

### PASO 5: Inicializar Repositorio

```bash
git init
```

**Deberías ver:**
```
Initialized empty Git repository in /ruta/a/aurethica-app/.git/
```

---

### PASO 6: Crear Repositorio en GitHub

#### A. Ve a GitHub.com

1. Abre tu navegador
2. Ve a https://github.com/
3. Inicia sesión (o crea cuenta si no tienes)

#### B. Crear Nuevo Repositorio

1. Click en el botón **"+"** (arriba a la derecha)
2. Selecciona **"New repository"**

#### C. Llenar el Formulario

```
Repository name: aurethica-app
Description: Plataforma premium de belleza con IA personalizada (Gigi)
Visibility: ○ Public  ● Private  (selecciona Private)

⬜ Add a README file (NO marcar)
⬜ Add .gitignore (NO marcar)
⬜ Choose a license (NO marcar)
```

3. Click en **"Create repository"**

#### D. Copiar URL

Verás una pantalla con comandos. **Copia la URL que aparece**, algo como:
```
https://github.com/TU-USUARIO/aurethica-app.git
```

---

### PASO 7: Conectar Local con GitHub

Vuelve a la terminal y ejecuta (reemplaza con TU URL):

```bash
git remote add origin https://github.com/TU-USUARIO/aurethica-app.git
```

**Verificar:**
```bash
git remote -v
```

**Deberías ver:**
```
origin  https://github.com/TU-USUARIO/aurethica-app.git (fetch)
origin  https://github.com/TU-USUARIO/aurethica-app.git (push)
```

---

### PASO 8: Añadir Archivos

```bash
# Ver qué archivos hay
git status

# Añadir TODOS los archivos
git add .
```

**Deberías ver en verde:**
```
Changes to be committed:
  new file:   App.tsx
  new file:   components/...
  new file:   styles/...
  ...
```

---

### PASO 9: Crear Commit

```bash
git commit -m "🎨 Initial commit: Auréthica - Premium Beauty Platform"
```

**Deberías ver:**
```
[main (root-commit) abc123] 🎨 Initial commit: Auréthica
 150 files changed, 25000 insertions(+)
 create mode 100644 App.tsx
 ...
```

---

### PASO 10: Subir a GitHub

#### A. Renombrar rama a 'main'

```bash
git branch -M main
```

#### B. Subir código

```bash
git push -u origin main
```

#### C. Autenticación

**Primera vez**, GitHub te pedirá credenciales:

**Opción 1: Personal Access Token (Recomendado)**

1. Ve a https://github.com/settings/tokens
2. Click en **"Generate new token"** → **"Generate new token (classic)"**
3. Configura:
   ```
   Note: Auréthica Development
   Expiration: 90 days
   Scopes: ✓ repo (marcar todo)
   ```
4. Click en **"Generate token"**
5. **COPIA EL TOKEN** (solo se muestra una vez)
6. En la terminal:
   ```
   Username: tu-usuario-github
   Password: [pega-el-token-aquí]
   ```

**Opción 2: GitHub CLI (Avanzado)**

```bash
# Instalar GitHub CLI
brew install gh  # Mac
choco install gh # Windows

# Autenticarse
gh auth login
```

---

### PASO 11: Verificar en GitHub

1. Ve a https://github.com/TU-USUARIO/aurethica-app
2. ¡Deberías ver todos tus archivos! 🎉

---

## 🔄 Flujo de Trabajo Diario

### Cada vez que hagas cambios:

```bash
# 1. Ver qué cambió
git status

# 2. Añadir cambios
git add .

# 3. Commit con mensaje descriptivo
git commit -m "✨ Feat: Añadir nueva funcionalidad X"

# 4. Subir a GitHub
git push
```

### Cada vez que empieces a trabajar:

```bash
# Descargar últimos cambios (si trabajas en equipo)
git pull
```

---

## 🌳 Trabajar con Ramas

### Crear rama nueva

```bash
# Crear y cambiar a nueva rama
git checkout -b feature/gigi-voice

# Hacer cambios...
git add .
git commit -m "✨ Feat: Añadir voz a Gigi"

# Subir nueva rama
git push -u origin feature/gigi-voice
```

### Fusionar rama

```bash
# Ir a rama main
git checkout main

# Fusionar
git merge feature/gigi-voice

# Subir
git push
```

---

## 📊 Comandos Útiles Visuales

### Ver historial gráfico

```bash
git log --oneline --graph --all --decorate
```

**Salida:**
```
* abc123 (HEAD -> main, origin/main) ✨ Feat: Nueva función
* def456 🐛 Fix: Corregir bug
* ghi789 🎨 Style: Actualizar diseño
```

### Ver diferencias

```bash
# Ver qué líneas cambiaron
git diff

# Ver diferencias de un archivo específico
git diff App.tsx
```

### Ver quién cambió qué

```bash
git blame App.tsx
```

---

## 🆘 Solucionar Problemas

### "No tienes permisos"

**Solución:**
```bash
# Cambiar URL a SSH (después de configurar SSH key)
git remote set-url origin git@github.com:TU-USUARIO/aurethica-app.git
```

### "Archivos demasiado grandes"

**Solución:**
```bash
# Instalar Git LFS
brew install git-lfs  # Mac
git lfs install

# Rastrear archivos grandes
git lfs track "*.png"
git lfs track "*.mp4"

# Commit
git add .gitattributes
git commit -m "🔧 Config: Git LFS"
git push
```

### "Hay conflictos"

**Solución:**
```bash
# 1. Hacer pull para ver conflictos
git pull

# 2. Abrir archivos con conflictos
# Busca estas marcas:
# <<<<<<< HEAD
# Tu código
# =======
# Código de otro
# >>>>>>> branch

# 3. Editar y resolver manualmente

# 4. Marcar como resuelto
git add archivo-resuelto.tsx

# 5. Completar merge
git commit -m "🔀 Merge: Resolver conflictos"
git push
```

---

## 📱 GitHub en Móvil

### Descargar App

- **iOS**: https://apps.apple.com/app/github/id1477376905
- **Android**: https://play.google.com/store/apps/details?id=com.github.android

### Funciones en la App

- ✅ Ver código
- ✅ Revisar Pull Requests
- ✅ Aprobar cambios
- ✅ Comentar
- ✅ Fusionar ramas
- ✅ Notificaciones en tiempo real

---

## 🎓 Recursos Interactivos

### Tutoriales Paso a Paso

1. **Git Branching Visual**
   - https://learngitbranching.js.org/
   - Aprende Git visualmente con un juego

2. **GitHub Skills**
   - https://skills.github.com/
   - Cursos interactivos oficiales

3. **Visualizing Git**
   - https://git-school.github.io/visualizing-git/
   - Visualiza comandos en tiempo real

---

## 📋 Checklist de Verificación

Antes de considerar que todo está OK, verifica:

- [ ] Git está instalado (`git --version`)
- [ ] Git está configurado (`git config --list`)
- [ ] Repositorio local inicializado (existe carpeta `.git`)
- [ ] `.gitignore` existe y está configurado
- [ ] Remote 'origin' añadido (`git remote -v`)
- [ ] Primer commit creado (`git log`)
- [ ] Código subido a GitHub (ve tu repo en GitHub.com)
- [ ] `.env.example` creado (sin valores sensibles)
- [ ] `.env` en `.gitignore` (no debe subirse)
- [ ] README.md actualizado

---

## 🎨 Interfaz de GitHub.com

### Navegación Principal

```
Tu Repositorio:
├── <> Code           - Ver código
├── ⚠️ Issues         - Reportar bugs
├── 🔀 Pull requests  - Revisar cambios
├── 📊 Actions        - CI/CD (opcional)
├── 📈 Insights       - Estadísticas
└── ⚙️ Settings       - Configuración
```

### Tabs Importantes

#### 1. Code Tab
- Ver estructura de archivos
- Leer código
- Ver commits

#### 2. Commits Tab
- Historial de cambios
- Ver quién cambió qué
- Ver diferencias

#### 3. Branches Tab
- Ver todas las ramas
- Crear nueva rama
- Eliminar ramas viejas

#### 4. Settings → Collaborators
- Añadir personas al proyecto
- Gestionar permisos

---

## 💡 Tips Pro

### 1. Aliases Git

Añade a tu `~/.gitconfig`:

```ini
[alias]
    st = status
    co = checkout
    br = branch
    cm = commit -m
    lg = log --oneline --graph --all
```

Ahora puedes usar:
```bash
git st    # en lugar de git status
git co main  # en lugar de git checkout main
```

### 2. Git GUI (Interfaz Gráfica)

Si prefieres visual:
- **GitHub Desktop**: https://desktop.github.com/
- **GitKraken**: https://www.gitkraken.com/
- **SourceTree**: https://www.sourcetreeapp.com/

### 3. VS Code Integrado

Si usas VS Code:
- Panel de "Source Control" (Ctrl+Shift+G)
- Ver cambios visuales
- Commit directo desde el editor
- Resolver conflictos visualmente

---

## 🎯 Siguientes Pasos

Una vez que tengas todo en GitHub:

1. **Añadir colaboradores**
   - Settings → Collaborators → Add people

2. **Proteger rama main**
   - Settings → Branches → Add rule
   - Require pull request reviews

3. **Configurar GitHub Pages** (si quieres publicar)
   - Settings → Pages
   - Source: Deploy from branch → main

4. **Añadir GitHub Actions** (CI/CD)
   - Automatizar tests
   - Deploy automático

5. **Documentar con Wiki**
   - Wiki tab
   - Documentación extendida

---

## 📞 ¿Necesitas Ayuda?

### Si algo no funciona:

1. **Lee el error con calma** - Git es descriptivo
2. **Busca en Google** - "git error [tu-error]"
3. **Pregunta en Stack Overflow** - Tag `git`
4. **Consulta documentación** - `git help [comando]`

### Comandos de ayuda:

```bash
# Ayuda de un comando específico
git help commit
git help push

# Ayuda rápida
git commit --help
```

---

<div align="center">

## 🎉 ¡Éxito!

**Tu proyecto Auréthica está ahora en GitHub**

```
     ⭐
    /|\
   / | \
  🌟 🌟 🌟
```

**¡Feliz desarrollo!** 🚀

[⬆ Volver arriba](#-github---pasos-visuales-ilustrados)

</div>
