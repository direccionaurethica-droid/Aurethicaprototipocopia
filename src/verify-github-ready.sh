#!/bin/bash

# 🔍 Script de Verificación para GitHub - Auréthica
# Verifica que todo esté listo antes de subir a GitHub

echo "🔍 ============================================"
echo "   Auréthica - Verificación GitHub Ready"
echo "=============================================="
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PASS=0
FAIL=0
WARN=0

check_pass() {
    echo -e "${GREEN}✓ $1${NC}"
    ((PASS++))
}

check_fail() {
    echo -e "${RED}✗ $1${NC}"
    ((FAIL++))
}

check_warn() {
    echo -e "${YELLOW}⚠ $1${NC}"
    ((WARN++))
}

echo "${BLUE}[1/10] Verificando Git...${NC}"
if command -v git &> /dev/null; then
    check_pass "Git instalado ($(git --version))"
    
    GIT_USER=$(git config --global user.name)
    GIT_EMAIL=$(git config --global user.email)
    
    if [ -n "$GIT_USER" ] && [ -n "$GIT_EMAIL" ]; then
        check_pass "Git configurado: $GIT_USER <$GIT_EMAIL>"
    else
        check_fail "Git no configurado. Ejecuta: git config --global user.name 'Tu Nombre'"
    fi
else
    check_fail "Git NO instalado"
fi
echo ""

echo "${BLUE}[2/10] Verificando Node.js...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    check_pass "Node.js instalado ($NODE_VERSION)"
    
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        check_pass "npm instalado ($NPM_VERSION)"
    else
        check_fail "npm NO instalado"
    fi
else
    check_fail "Node.js NO instalado"
fi
echo ""

echo "${BLUE}[3/10] Verificando repositorio Git...${NC}"
if [ -d ".git" ]; then
    check_pass "Repositorio Git inicializado"
    
    BRANCH=$(git branch --show-current)
    check_pass "Rama actual: $BRANCH"
    
    if git remote | grep -q "^origin$"; then
        REMOTE_URL=$(git remote get-url origin)
        check_pass "Remote 'origin' configurado: $REMOTE_URL"
    else
        check_warn "Remote 'origin' NO configurado (puedes añadirlo después)"
    fi
else
    check_fail "Repositorio Git NO inicializado. Ejecuta: git init"
fi
echo ""

echo "${BLUE}[4/10] Verificando archivos esenciales...${NC}"

# Archivos críticos
if [ -f "package.json" ]; then
    check_pass "package.json existe"
else
    check_fail "package.json NO existe"
fi

if [ -f "README.md" ]; then
    check_pass "README.md existe"
else
    check_fail "README.md NO existe"
fi

if [ -f ".gitignore" ]; then
    check_pass ".gitignore existe"
else
    check_fail ".gitignore NO existe"
fi

if [ -f "App.tsx" ]; then
    check_pass "App.tsx existe"
else
    check_fail "App.tsx NO existe"
fi
echo ""

echo "${BLUE}[5/10] Verificando variables de entorno...${NC}"
if [ -f ".env.example" ]; then
    check_pass ".env.example existe"
else
    check_warn ".env.example NO existe (recomendado)"
fi

if [ -f ".env" ]; then
    check_warn ".env existe (asegúrate de que esté en .gitignore)"
    
    if grep -q ".env" .gitignore 2>/dev/null; then
        check_pass ".env está en .gitignore"
    else
        check_fail ".env NO está en .gitignore - ¡PELIGRO!"
    fi
else
    check_pass ".env NO existe (correcto, no debe subirse)"
fi
echo ""

echo "${BLUE}[6/10] Verificando estructura de carpetas...${NC}"
FOLDERS=("components" "pages" "lib" "styles" "hooks" "contexts")

for folder in "${FOLDERS[@]}"; do
    if [ -d "$folder" ]; then
        check_pass "Carpeta /$folder existe"
    else
        check_warn "Carpeta /$folder NO existe"
    fi
done
echo ""

echo "${BLUE}[7/10] Verificando dependencias...${NC}"
if [ -d "node_modules" ]; then
    check_pass "node_modules/ existe"
    
    if grep -q "node_modules" .gitignore 2>/dev/null; then
        check_pass "node_modules/ está en .gitignore"
    else
        check_fail "node_modules/ NO está en .gitignore - ¡PELIGRO!"
    fi
else
    check_warn "node_modules/ NO existe. Ejecuta: npm install"
fi
echo ""

echo "${BLUE}[8/10] Verificando builds...${NC}"
if [ -d "dist" ] || [ -d "build" ]; then
    check_pass "Carpeta de build existe"
    
    if grep -q "dist\|build" .gitignore 2>/dev/null; then
        check_pass "Carpeta de build está en .gitignore"
    else
        check_fail "Carpeta de build NO está en .gitignore"
    fi
else
    check_pass "Sin carpeta de build (normal en proyecto nuevo)"
fi
echo ""

echo "${BLUE}[9/10] Verificando documentación...${NC}"
DOCS=("GITHUB_SETUP.md" "COMANDOS_GIT_RAPIDOS.md" "CONTRIBUTING.md" "LICENSE")

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        check_pass "$doc existe"
    else
        check_warn "$doc NO existe (recomendado)"
    fi
done
echo ""

echo "${BLUE}[10/10] Verificando archivos sensibles...${NC}"
SENSITIVE_FILES=(".env" "*.key" "*.pem" "secrets.*")

for pattern in "${SENSITIVE_FILES[@]}"; do
    if ls $pattern 1> /dev/null 2>&1; then
        check_warn "Archivos '$pattern' encontrados - verifica .gitignore"
    fi
done

# Verificar si hay commits
if [ -d ".git" ]; then
    if git rev-parse HEAD > /dev/null 2>&1; then
        COMMIT_COUNT=$(git rev-list --count HEAD)
        check_pass "Hay $COMMIT_COUNT commit(s) en el repositorio"
    else
        check_warn "No hay commits aún"
    fi
fi
echo ""

# Resumen
echo "=============================================="
echo "RESUMEN DE VERIFICACIÓN"
echo "=============================================="
echo -e "${GREEN}Pasó: $PASS${NC}"
echo -e "${YELLOW}Advertencias: $WARN${NC}"
echo -e "${RED}Falló: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    if [ $WARN -eq 0 ]; then
        echo -e "${GREEN}✓ ¡PERFECTO! Todo listo para GitHub${NC}"
        echo ""
        echo "Próximos pasos:"
        echo "  1. git add ."
        echo "  2. git commit -m '🎨 Initial commit: Auréthica'"
        echo "  3. git push -u origin main"
    else
        echo -e "${YELLOW}⚠ Casi listo. Revisa las advertencias arriba${NC}"
        echo ""
        echo "Las advertencias no son críticas, pero se recomienda resolverlas."
    fi
else
    echo -e "${RED}✗ Hay problemas que debes resolver antes de continuar${NC}"
    echo ""
    echo "Revisa los errores marcados con ✗ arriba y corrígelos."
fi

echo ""
echo "Para más ayuda, lee:"
echo "  - GITHUB_SETUP.md"
echo "  - CHECKLIST_GITHUB.md"
echo ""
