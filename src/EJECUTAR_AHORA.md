# ⚡ EJECUTAR AHORA - Guía Ultra-Rápida

## 🎯 **3 COMANDOS PARA CONECTAR CON GITHUB**

---

## Opción 1: Automático (⚡ MÁS RÁPIDO - 2 min)

### Mac / Linux:

```bash
# Dale permisos
chmod +x init-github.sh verify-github-ready.sh

# Ejecuta
./init-github.sh
```

### Windows:

```bash
# Doble click en:
init-github.bat
```

---

## Opción 2: Manual (📖 5 min)

```bash
# 1. Configurar Git (si es primera vez)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# 2. Inicializar repositorio
git init

# 3. Añadir archivos
git add .

# 4. Primer commit
git commit -m "🎨 Initial commit: Auréthica - Premium Beauty Platform

- Sistema completo de calibración de Gigi
- Test de belleza personalizado  
- Blog estilo Instagram
- Sistema de perfiles múltiples
- Diseño minimalista dorado/beige
- PWA con Service Worker"

# 5. Renombrar rama
git branch -M main

# 6. Crear repositorio en GitHub
# Ve a https://github.com/new
# Nombre: aurethica-app
# Private: ✓
# NO crear README, .gitignore ni license

# 7. Conectar con GitHub (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/aurethica-app.git

# 8. Subir código
git push -u origin main
```

---

## 🔐 Autenticación

GitHub te pedirá autenticación. Usa un **Personal Access Token**:

1. Ve a: https://github.com/settings/tokens
2. Click: **"Generate new token (classic)"**
3. Nombre: `Auréthica Development`
4. Scopes: Marca **`repo`** (todos)
5. Generate token
6. **COPIA EL TOKEN**
7. En terminal:
   - Username: `tu-usuario-github`
   - Password: `[pega-el-token]`

---

## ✅ Verificar

```bash
# ¿Todo funcionó?
git remote -v

# Deberías ver:
# origin  https://github.com/TU-USUARIO/aurethica-app.git (fetch)
# origin  https://github.com/TU-USUARIO/aurethica-app.git (push)

# Ve a GitHub:
# https://github.com/TU-USUARIO/aurethica-app
# ¡Deberías ver todos tus archivos!
```

---

## 📚 Más Ayuda

- **Setup completo**: `GITHUB_SETUP.md`
- **Comandos rápidos**: `COMANDOS_GIT_RAPIDOS.md`
- **Tutorial visual**: `GITHUB_PASOS_VISUALES.md`
- **Checklist**: `CHECKLIST_GITHUB.md`
- **Resumen final**: `GITHUB_CONSOLIDADO_FINAL.md`

---

## 🎉 ¡Listo!

Una vez que hayas ejecutado los comandos, tu proyecto estará en GitHub.

**Próximos pasos:**
```bash
# Cada vez que hagas cambios:
git add .
git commit -m "✨ Descripción del cambio"
git push
```

---

<div align="center">

**¡A desarrollar! 🚀**

Auréthica - Donde la belleza encuentra la tecnología

</div>
