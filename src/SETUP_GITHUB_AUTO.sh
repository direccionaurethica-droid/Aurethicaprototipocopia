#!/bin/bash

# 🚀 SCRIPT DE SETUP AUTOMÁTICO PARA GITHUB
# Proyecto: Auréthica App
# Uso: bash SETUP_GITHUB_AUTO.sh

echo "═══════════════════════════════════════════════════════"
echo "🎨 AURÉTHICA - Setup Automático para GitHub"
echo "═══════════════════════════════════════════════════════"
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para preguntar al usuario
ask_user() {
    read -p "$1 (s/n): " response
    case "$response" in
        [sS][iI]|[sS]) return 0 ;;
        *) return 1 ;;
    esac
}

# PASO 1: Verificar Git instalado
echo -e "${BLUE}[1/7]${NC} Verificando Git..."
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git no está instalado.${NC}"
    echo "Por favor instala Git: https://git-scm.com/downloads"
    exit 1
fi
echo -e "${GREEN}✅ Git instalado correctamente${NC}"
echo ""

# PASO 2: Configurar Git (si no está configurado)
echo -e "${BLUE}[2/7]${NC} Verificando configuración de Git..."
if [ -z "$(git config --global user.name)" ]; then
    echo -e "${YELLOW}⚠️  Git no está configurado${NC}"
    read -p "Ingresa tu nombre: " git_name
    read -p "Ingresa tu email: " git_email
    git config --global user.name "$git_name"
    git config --global user.email "$git_email"
    echo -e "${GREEN}✅ Git configurado${NC}"
else
    echo -e "${GREEN}✅ Git ya configurado como: $(git config --global user.name)${NC}"
fi
echo ""

# PASO 3: Pedir URL del repositorio
echo -e "${BLUE}[3/7]${NC} Configuración del repositorio..."
echo -e "${YELLOW}Primero crea tu repositorio en GitHub:${NC}"
echo "  1. Ve a: https://github.com/new"
echo "  2. Nombre: aurethica-app (o el que prefieras)"
echo "  3. Visibilidad: Private (recomendado)"
echo "  4. NO marques ninguna opción adicional"
echo "  5. Click en 'Create repository'"
echo ""
read -p "Pega aquí la URL de tu repositorio (ej: https://github.com/usuario/aurethica-app.git): " repo_url

if [ -z "$repo_url" ]; then
    echo -e "${RED}❌ URL del repositorio requerida${NC}"
    exit 1
fi
echo -e "${GREEN}✅ URL guardada: $repo_url${NC}"
echo ""

# PASO 4: Inicializar Git
echo -e "${BLUE}[4/7]${NC} Inicializando repositorio Git..."
if [ -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Ya existe un repositorio Git${NC}"
    if ask_user "¿Deseas reinicializar?"; then
        rm -rf .git
        git init
        echo -e "${GREEN}✅ Repositorio reinicializado${NC}"
    else
        echo -e "${YELLOW}⏭️  Saltando inicialización${NC}"
    fi
else
    git init
    echo -e "${GREEN}✅ Repositorio inicializado${NC}"
fi
echo ""

# PASO 5: Añadir remote
echo -e "${BLUE}[5/7]${NC} Configurando remote de GitHub..."
if git remote | grep -q "origin"; then
    echo -e "${YELLOW}⚠️  Ya existe un remote 'origin'${NC}"
    if ask_user "¿Deseas reemplazarlo?"; then
        git remote remove origin
        git remote add origin "$repo_url"
        echo -e "${GREEN}✅ Remote actualizado${NC}"
    else
        echo -e "${YELLOW}⏭️  Saltando configuración de remote${NC}"
    fi
else
    git remote add origin "$repo_url"
    echo -e "${GREEN}✅ Remote configurado${NC}"
fi
echo ""

# PASO 6: Crear primer commit
echo -e "${BLUE}[6/7]${NC} Creando primer commit..."
echo -e "${YELLOW}Archivos a incluir:${NC}"
git status --short 2>/dev/null || ls -la

echo ""
if ask_user "¿Proceder con el commit?"; then
    git add .
    git commit -m "🎉 Initial commit - Auréthica App con Ventana0 completada

- Sistema de autenticación completo
- Calibración de Gigi (5 preguntas)
- Diseño minimalista editorial
- Paleta de colores premium (negro + dorado + fucsia)
- Ventana0: Intro Gigi + Calibración ✅ COMPLETADA"
    
    echo -e "${GREEN}✅ Commit creado${NC}"
else
    echo -e "${YELLOW}⏭️  Saltando commit${NC}"
    exit 0
fi
echo ""

# PASO 7: Push a GitHub
echo -e "${BLUE}[7/7]${NC} Subiendo a GitHub..."
echo -e "${YELLOW}Se abrirá tu navegador para autenticación si es necesario${NC}"
echo ""

if ask_user "¿Subir ahora a GitHub?"; then
    git branch -M main
    
    # Intentar push
    if git push -u origin main; then
        echo ""
        echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"
        echo -e "${GREEN}✅ ¡ÉXITO! Proyecto subido a GitHub${NC}"
        echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"
        echo ""
        echo -e "${BLUE}Tu repositorio:${NC} $repo_url"
        echo ""
        echo -e "${YELLOW}Próximos pasos:${NC}"
        echo "  1. Visita tu repo en GitHub"
        echo "  2. Comparte el link con ChatGPT para colaborar"
        echo "  3. Continúa desarrollando en Figma Make"
        echo "  4. Usa 'git pull' antes de trabajar"
        echo "  5. Usa 'git push' después de cambios"
        echo ""
    else
        echo ""
        echo -e "${RED}❌ Error al subir a GitHub${NC}"
        echo -e "${YELLOW}Posibles causas:${NC}"
        echo "  - URL del repositorio incorrecta"
        echo "  - Credenciales de GitHub no configuradas"
        echo "  - Repositorio ya tiene contenido"
        echo ""
        echo -e "${YELLOW}Solución:${NC}"
        echo "  Intenta manualmente: git push -u origin main --force"
        exit 1
    fi
else
    echo -e "${YELLOW}⏭️  Push cancelado${NC}"
    echo ""
    echo -e "${BLUE}Para subir más tarde, ejecuta:${NC}"
    echo "  git branch -M main"
    echo "  git push -u origin main"
fi

echo ""
echo -e "${GREEN}🎊 ¡Script completado!${NC}"
