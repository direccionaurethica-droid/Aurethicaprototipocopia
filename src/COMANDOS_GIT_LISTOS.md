# 🚀 COMANDOS GIT LISTOS PARA COPIAR/PEGAR

> **IMPORTANTE:** Reemplaza `TU-USUARIO` por tu usuario real de GitHub

---

## 📦 OPCIÓN 1: Setup Manual Rápido (Copiar/Pegar)

Abre tu terminal en la carpeta del proyecto y copia estos comandos **UNO POR UNO**:

### PASO 1: Inicializar Git
```bash
git init
```

### PASO 2: Añadir remote (CAMBIA TU-USUARIO)
```bash
git remote add origin https://github.com/TU-USUARIO/aurethica-app.git
```

### PASO 3: Añadir todos los archivos
```bash
git add .
```

### PASO 4: Crear primer commit
```bash
git commit -m "🎉 Initial commit - Auréthica App con Ventana0 completada

- Sistema de autenticación completo
- Calibración de Gigi (5 preguntas)
- Diseño minimalista editorial
- Paleta de colores premium (negro + dorado + fucsia)
- Ventana0: Intro Gigi + Calibración ✅ COMPLETADA"
```

### PASO 5: Cambiar a rama main
```bash
git branch -M main
```

### PASO 6: Subir a GitHub
```bash
git push -u origin main
```

---

## ⚡ OPCIÓN 2: Todo en un solo bloque

**Para Mac/Linux:**
```bash
git init && \
git remote add origin https://github.com/TU-USUARIO/aurethica-app.git && \
git add . && \
git commit -m "🎉 Initial commit - Auréthica App con Ventana0 completada" && \
git branch -M main && \
git push -u origin main
```

**Para Windows (PowerShell):**
```powershell
git init; git remote add origin https://github.com/TU-USUARIO/aurethica-app.git; git add .; git commit -m "🎉 Initial commit - Auréthica App"; git branch -M main; git push -u origin main
```

---

## 🔄 COMANDOS PARA USO DIARIO

### Ver estado actual
```bash
git status
```

### Ver cambios específicos
```bash
git diff
```

### Añadir archivos modificados
```bash
git add .
```

### Hacer commit con mensaje
```bash
git commit -m "✨ feat: Descripción del cambio"
```

### Subir cambios a GitHub
```bash
git push
```

### Descargar cambios de GitHub
```bash
git pull
```

### Ver historial de commits
```bash
git log --oneline --graph --all
```

---

## 🌿 TRABAJAR CON RAMAS

### Crear nueva rama
```bash
git checkout -b feature/nueva-funcionalidad
```

### Ver todas las ramas
```bash
git branch -a
```

### Cambiar de rama
```bash
git checkout main
```

### Subir rama a GitHub
```bash
git push -u origin feature/nueva-funcionalidad
```

### Mergear rama a main
```bash
git checkout main
git merge feature/nueva-funcionalidad
git push
```

### Eliminar rama local
```bash
git branch -d feature/nueva-funcionalidad
```

### Eliminar rama remota
```bash
git push origin --delete feature/nueva-funcionalidad
```

---

## 🔧 COMANDOS ÚTILES DE MANTENIMIENTO

### Deshacer último commit (mantener cambios)
```bash
git reset --soft HEAD~1
```

### Deshacer último commit (eliminar cambios)
```bash
git reset --hard HEAD~1
```

### Ver remotes configurados
```bash
git remote -v
```

### Cambiar URL del remote
```bash
git remote set-url origin https://github.com/TU-USUARIO/aurethica-app.git
```

### Limpiar archivos no rastreados
```bash
git clean -fd
```

### Ver quién modificó cada línea
```bash
git blame nombre-archivo.tsx
```

---

## 📝 CONVENCIÓN DE COMMITS

Usa estos prefijos para commits claros:

```bash
# Nueva funcionalidad
git commit -m "✨ feat: Añadir componente Ventana1"

# Corrección de bug
git commit -m "🐛 fix: Corregir overflow en mobile"

# Refactorización
git commit -m "♻️ refactor: Optimizar GigiCalibration"

# Estilos
git commit -m "🎨 style: Aplicar espaciado minimalista"

# Documentación
git commit -m "📝 docs: Actualizar README con nuevas funcionalidades"

# Performance
git commit -m "⚡ perf: Mejorar tiempo de carga de imágenes"

# Tests
git commit -m "✅ test: Añadir tests para Ventana0"

# Configuración
git commit -m "🔧 chore: Actualizar dependencias"

# Deploy
git commit -m "🚀 deploy: Configurar Vercel"
```

---

## 🆘 SOLUCIÓN DE PROBLEMAS COMUNES

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/TU-USUARIO/aurethica-app.git
```

### Error: "failed to push some refs"
```bash
# Opción A: Pull primero
git pull origin main --allow-unrelated-histories
git push -u origin main

# Opción B: Force push (¡CUIDADO!)
git push -u origin main --force
```

### Error: Credenciales incorrectas
```bash
# Para GitHub, usa Personal Access Token en lugar de password
# Genera uno en: https://github.com/settings/tokens
```

### Olvidé añadir archivos al commit anterior
```bash
git add archivo-olvidado.tsx
git commit --amend --no-edit
git push --force
```

### Quiero cambiar el mensaje del último commit
```bash
git commit --amend -m "Nuevo mensaje"
git push --force
```

---

## 📊 VERIFICACIÓN DE ESTADO

### Antes de hacer cualquier cosa
```bash
git status
git log --oneline -5
git remote -v
```

### Después de cada cambio importante
```bash
git status
git diff
git log --oneline -1
```

---

## 🎯 WORKFLOW RECOMENDADO DIARIO

```bash
# 1. Al empezar el día
git pull

# 2. Después de trabajar
git status
git add .
git commit -m "✨ feat: Descripción del trabajo realizado"

# 3. Subir cambios
git push

# 4. Verificar
git log --oneline -3
```

---

## 🔗 LINKS RÁPIDOS

**Tu repositorio será:**
```
https://github.com/TU-USUARIO/aurethica-app
```

**Clonar en otra máquina:**
```bash
git clone https://github.com/TU-USUARIO/aurethica-app.git
cd aurethica-app
npm install
npm run dev
```

---

## ✅ CHECKLIST PRE-PUSH

Antes de hacer `git push`, verifica:

- [ ] `git status` - ¿Todos los archivos necesarios están incluidos?
- [ ] `git diff` - ¿Los cambios son correctos?
- [ ] ¿El commit message es descriptivo?
- [ ] ¿Has probado que la app funciona?
- [ ] ¿Has actualizado el README si añadiste funcionalidades?

---

**Última actualización:** Noviembre 2025  
**Proyecto:** Auréthica App  
**Estado:** Listo para GitHub ✅
