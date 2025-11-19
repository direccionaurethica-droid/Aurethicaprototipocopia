# ⚡ Comandos Git Rápidos - Auréthica

Guía ultra-rápida para usar Git en el día a día.

---

## 🚀 Iniciar Proyecto

```bash
# Una sola vez
git init
git remote add origin https://github.com/TU-USUARIO/aurethica-app.git
git add .
git commit -m "🎨 Initial commit"
git branch -M main
git push -u origin main
```

---

## 📅 Flujo Diario

```bash
# 1. Empezar el día - Actualizar
git pull

# 2. Hacer cambios en el código
# ... programar ...

# 3. Ver qué cambió
git status

# 4. Guardar cambios
git add .
git commit -m "✨ Descripción de lo que hiciste"
git push
```

---

## 🌳 Trabajar con Ramas

```bash
# Crear rama nueva y cambiar a ella
git checkout -b feature/nueva-funcionalidad

# Cambiar de rama
git checkout main
git checkout development

# Ver todas las ramas
git branch -a

# Fusionar rama (desde la rama destino)
git checkout main
git merge feature/nueva-funcionalidad

# Borrar rama
git branch -d feature/nueva-funcionalidad
```

---

## 💾 Commits

```bash
# Commit simple
git commit -m "Mensaje"

# Commit con descripción larga
git commit -m "Título corto" -m "Descripción detallada de los cambios realizados"

# Modificar último commit
git commit --amend -m "Nuevo mensaje"

# Ver historial
git log --oneline --graph
```

---

## 🔄 Actualizar y Sincronizar

```bash
# Descargar cambios (sin fusionar)
git fetch

# Descargar y fusionar
git pull

# Subir cambios
git push

# Subir nueva rama
git push -u origin nombre-de-rama
```

---

## 🆘 Deshacer Cambios

```bash
# Descartar cambios de un archivo
git checkout -- archivo.tsx

# Descartar TODOS los cambios no guardados
git reset --hard

# Volver al commit anterior (mantiene cambios)
git reset --soft HEAD~1

# Ver diferencias
git diff
git diff archivo.tsx
```

---

## 🏷️ Tags (Versiones)

```bash
# Crear tag
git tag v1.0.0

# Crear tag con mensaje
git tag -a v1.0.0 -m "Versión 1.0.0 - Lanzamiento oficial"

# Subir tags
git push --tags

# Ver tags
git tag

# Borrar tag
git tag -d v1.0.0
```

---

## 🔍 Buscar y Explorar

```bash
# Buscar en archivos
git grep "texto a buscar"

# Ver quién modificó cada línea
git blame archivo.tsx

# Ver cambios de un commit específico
git show abc123

# Ver archivos modificados en un commit
git show --name-only abc123
```

---

## 🧹 Limpiar

```bash
# Limpiar archivos no rastreados
git clean -fd

# Ver qué se limpiaría (sin hacerlo)
git clean -n

# Limpiar ramas remotas eliminadas
git remote prune origin
```

---

## ⚙️ Configuración

```bash
# Ver configuración
git config --list

# Configurar usuario
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Configurar editor
git config --global core.editor "code --wait"

# Aliases útiles
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
```

---

## 🔀 Resolución de Conflictos

```bash
# Cuando hay conflicto al hacer pull/merge
# 1. Git marcará los archivos en conflicto
git status

# 2. Abrir archivos y buscar:
# <<<<<<< HEAD
# Tu código
# =======
# Código de la otra rama
# >>>>>>> nombre-de-rama

# 3. Editar y resolver manualmente

# 4. Marcar como resuelto
git add archivo-resuelto.tsx

# 5. Completar merge
git commit -m "🔀 Merge: Resolver conflictos"
```

---

## 📊 Información del Repositorio

```bash
# Ver remotes
git remote -v

# Ver ramas remotas
git branch -r

# Ver todas las ramas
git branch -a

# Ver último commit de cada rama
git branch -v

# Estadísticas del repo
git log --stat

# Ver cambios por autor
git shortlog

# Contar commits
git rev-list --count HEAD
```

---

## 🎯 Comandos Específicos de Auréthica

```bash
# Actualizar documentación
git add *.md
git commit -m "📝 Docs: Actualizar documentación"

# Actualizar estilos
git add styles/
git commit -m "🎨 Style: Actualizar sistema de diseño"

# Actualizar componentes
git add components/
git commit -m "✨ Feat: Añadir componente GigiX"

# Fix de bug
git commit -m "🐛 Fix: Corregir error en calibración"

# Mejora de rendimiento
git commit -m "⚡️ Perf: Optimizar carga de imágenes"
```

---

## 🚨 Emergencias

```bash
# ¡Perdí todo! Recuperar archivo borrado
git checkout HEAD -- archivo-perdido.tsx

# ¡Commit equivocado! Deshacer último commit
git reset --soft HEAD~1

# ¡Push equivocado! Revertir en remoto (CUIDADO)
git revert abc123
git push

# ¡Todo está roto! Volver a estado anterior
git reset --hard abc123
```

---

## 📱 GitHub CLI (Opcional)

Si instalas GitHub CLI (`gh`):

```bash
# Ver PRs
gh pr list

# Crear PR
gh pr create

# Ver issues
gh issue list

# Clonar repo
gh repo clone TU-USUARIO/aurethica-app

# Ver estado de GitHub Actions
gh run list
```

---

## 🎨 Emojis para Commits

| Emoji | Código | Uso |
|-------|--------|-----|
| ✨ | `:sparkles:` | Nueva funcionalidad |
| 🐛 | `:bug:` | Bug fix |
| 🎨 | `:art:` | Diseño/estilos |
| ♻️ | `:recycle:` | Refactor |
| 📝 | `:memo:` | Documentación |
| 🚀 | `:rocket:` | Deploy |
| 🔧 | `:wrench:` | Configuración |
| ⚡️ | `:zap:` | Performance |
| 🔒 | `:lock:` | Seguridad |
| 🌐 | `:globe_with_meridians:` | i18n |
| ♿️ | `:wheelchair:` | Accesibilidad |

---

**¡Guarda este archivo para referencia rápida!** 🌟
