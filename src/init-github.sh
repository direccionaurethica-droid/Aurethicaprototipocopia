#!/bin/bash

# 🚀 Script de Inicialización de GitHub para Auréthica
# Este script automatiza la configuración inicial de Git y GitHub

echo "🎨 ========================================"
echo "   Auréthica - Inicialización GitHub"
echo "=========================================="
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir en color
print_step() {
    echo -e "${BLUE}▶ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Verificar si Git está instalado
print_step "Verificando instalación de Git..."
if ! command -v git &> /dev/null; then
    print_error "Git no está instalado. Por favor instala Git primero:"
    echo "  macOS: brew install git"
    echo "  Ubuntu/Debian: sudo apt-get install git"
    echo "  Windows: https://git-scm.com/download/win"
    exit 1
fi
print_success "Git está instalado ($(git --version))"
echo ""

# Verificar configuración de Git
print_step "Verificando configuración de Git..."
GIT_USER=$(git config --global user.name)
GIT_EMAIL=$(git config --global user.email)

if [ -z "$GIT_USER" ] || [ -z "$GIT_EMAIL" ]; then
    print_warning "Git no está configurado completamente"
    echo ""
    read -p "Ingresa tu nombre: " USER_NAME
    read -p "Ingresa tu email: " USER_EMAIL
    
    git config --global user.name "$USER_NAME"
    git config --global user.email "$USER_EMAIL"
    
    print_success "Configuración guardada"
else
    print_success "Git configurado como: $GIT_USER <$GIT_EMAIL>"
fi
echo ""

# Verificar si ya es un repositorio Git
print_step "Verificando repositorio local..."
if [ -d ".git" ]; then
    print_warning "Este directorio ya es un repositorio Git"
    read -p "¿Deseas reinicializarlo? (s/n): " REINIT
    if [ "$REINIT" = "s" ]; then
        rm -rf .git
        git init
        print_success "Repositorio reinicializado"
    else
        print_success "Usando repositorio existente"
    fi
else
    git init
    print_success "Repositorio Git inicializado"
fi
echo ""

# Solicitar URL del repositorio remoto
print_step "Configuración del repositorio remoto"
echo "Opciones:"
echo "  1. Ya creé el repositorio en GitHub (tengo la URL)"
echo "  2. Aún no he creado el repositorio (lo haré después)"
echo ""
read -p "Selecciona una opción (1/2): " REMOTE_OPTION

if [ "$REMOTE_OPTION" = "1" ]; then
    read -p "Pega la URL de tu repositorio de GitHub: " REPO_URL
    
    # Verificar si ya existe el remote 'origin'
    if git remote | grep -q "^origin$"; then
        print_warning "El remote 'origin' ya existe"
        read -p "¿Deseas reemplazarlo? (s/n): " REPLACE
        if [ "$REPLACE" = "s" ]; then
            git remote remove origin
            git remote add origin "$REPO_URL"
            print_success "Remote 'origin' actualizado"
        fi
    else
        git remote add origin "$REPO_URL"
        print_success "Remote 'origin' añadido"
    fi
elif [ "$REMOTE_OPTION" = "2" ]; then
    print_warning "Salta este paso por ahora"
    echo "Puedes añadir el remote después con:"
    echo "  git remote add origin https://github.com/TU-USUARIO/aurethica-app.git"
fi
echo ""

# Verificar .gitignore
print_step "Verificando .gitignore..."
if [ -f ".gitignore" ]; then
    print_success ".gitignore existe"
else
    print_warning ".gitignore no encontrado"
    echo "Asegúrate de tener un .gitignore antes de hacer commit"
fi
echo ""

# Verificar .env.example
print_step "Verificando .env.example..."
if [ -f ".env.example" ]; then
    print_success ".env.example existe"
    
    if [ ! -f ".env" ]; then
        read -p "¿Deseas crear .env desde .env.example? (s/n): " CREATE_ENV
        if [ "$CREATE_ENV" = "s" ]; then
            cp .env.example .env
            print_success ".env creado (recuerda llenarlo con tus valores reales)"
        fi
    fi
else
    print_warning ".env.example no encontrado"
fi
echo ""

# Añadir archivos
print_step "¿Deseas hacer el commit inicial ahora?"
read -p "(s/n): " DO_COMMIT

if [ "$DO_COMMIT" = "s" ]; then
    echo ""
    print_step "Añadiendo archivos..."
    git add .
    
    # Mostrar resumen
    print_success "Archivos añadidos:"
    git status --short | head -n 10
    echo "..."
    echo ""
    
    # Crear commit
    print_step "Creando commit inicial..."
    git commit -m "🎨 Initial commit: Auréthica - Premium Beauty Platform

- Sistema completo de calibración de Gigi
- Test de belleza personalizado
- Sistema de perfiles (Usuaria/Estilista/Empresa)
- Blog estilo Instagram con feed dinámico
- Navegación visual colapsable
- Sistema de diseño minimalista dorado/beige
- Componentes UI con shadcn/ui
- PWA ready con Service Worker
- Documentación completa"

    print_success "Commit inicial creado"
    echo ""
    
    # Renombrar rama a main
    print_step "Configurando rama principal como 'main'..."
    git branch -M main
    print_success "Rama renombrada a 'main'"
    echo ""
    
    # Push (si hay remote)
    if git remote | grep -q "^origin$"; then
        print_step "¿Deseas subir el código a GitHub ahora?"
        read -p "(s/n): " DO_PUSH
        
        if [ "$DO_PUSH" = "s" ]; then
            echo ""
            print_step "Subiendo código..."
            print_warning "Si es la primera vez, GitHub te pedirá autenticación"
            echo ""
            
            if git push -u origin main; then
                print_success "¡Código subido exitosamente!"
                echo ""
                echo "Tu código está ahora en:"
                git remote get-url origin
            else
                print_error "Error al subir el código"
                echo "Verifica tu autenticación y la URL del repositorio"
            fi
        fi
    else
        print_warning "No hay remote configurado. Puedes hacer push después con:"
        echo "  git push -u origin main"
    fi
fi

echo ""
echo "=========================================="
print_success "Configuración completada! 🎉"
echo "=========================================="
echo ""
echo "Próximos pasos:"
echo "  1. Ve a GitHub y verifica tu repositorio"
echo "  2. Añade colaboradores si es necesario"
echo "  3. Configura .env con tus valores reales"
echo "  4. Lee GITHUB_SETUP.md para más información"
echo "  5. Lee COMANDOS_GIT_RAPIDOS.md para el día a día"
echo ""
echo "Comandos útiles:"
echo "  git status        - Ver estado actual"
echo "  git log --oneline - Ver historial"
echo "  git push          - Subir cambios"
echo "  git pull          - Descargar cambios"
echo ""
print_success "¡Feliz desarrollo! 🚀"
