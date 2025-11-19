@echo off
REM ========================================================
REM 🚀 SCRIPT DE SETUP AUTOMÁTICO PARA GITHUB (WINDOWS)
REM Proyecto: Auréthica App
REM Uso: Doble click en este archivo
REM ========================================================

chcp 65001 >nul
color 0B

echo ═══════════════════════════════════════════════════════
echo 🎨 AURÉTHICA - Setup Automático para GitHub
echo ═══════════════════════════════════════════════════════
echo.

REM PASO 1: Verificar Git instalado
echo [1/7] Verificando Git...
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo ❌ Git no está instalado.
    echo Por favor instala Git: https://git-scm.com/downloads
    pause
    exit /b 1
)
echo ✅ Git instalado correctamente
echo.

REM PASO 2: Verificar configuración de Git
echo [2/7] Verificando configuración de Git...
git config --global user.name >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Git no está configurado
    set /p git_name="Ingresa tu nombre: "
    set /p git_email="Ingresa tu email: "
    git config --global user.name "%git_name%"
    git config --global user.email "%git_email%"
    echo ✅ Git configurado
) else (
    for /f "delims=" %%i in ('git config --global user.name') do set git_current=%%i
    echo ✅ Git ya configurado como: !git_current!
)
echo.

REM PASO 3: Pedir URL del repositorio
echo [3/7] Configuración del repositorio...
echo.
color 0E
echo Primero crea tu repositorio en GitHub:
echo   1. Ve a: https://github.com/new
echo   2. Nombre: aurethica-app (o el que prefieras)
echo   3. Visibilidad: Private (recomendado)
echo   4. NO marques ninguna opción adicional
echo   5. Click en 'Create repository'
echo.
color 0B
set /p repo_url="Pega aquí la URL de tu repositorio: "

if "%repo_url%"=="" (
    color 0C
    echo ❌ URL del repositorio requerida
    pause
    exit /b 1
)
echo ✅ URL guardada: %repo_url%
echo.

REM PASO 4: Inicializar Git
echo [4/7] Inicializando repositorio Git...
if exist ".git" (
    echo ⚠️  Ya existe un repositorio Git
    set /p reinit="¿Deseas reinicializar? (s/n): "
    if /i "%reinit%"=="s" (
        rmdir /s /q .git
        git init
        echo ✅ Repositorio reinicializado
    ) else (
        echo ⏭️  Saltando inicialización
    )
) else (
    git init
    echo ✅ Repositorio inicializado
)
echo.

REM PASO 5: Añadir remote
echo [5/7] Configurando remote de GitHub...
git remote | findstr "origin" >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ⚠️  Ya existe un remote 'origin'
    set /p replace_remote="¿Deseas reemplazarlo? (s/n): "
    if /i "%replace_remote%"=="s" (
        git remote remove origin
        git remote add origin "%repo_url%"
        echo ✅ Remote actualizado
    ) else (
        echo ⏭️  Saltando configuración de remote
    )
) else (
    git remote add origin "%repo_url%"
    echo ✅ Remote configurado
)
echo.

REM PASO 6: Crear primer commit
echo [6/7] Creando primer commit...
echo Archivos a incluir:
git status --short 2>nul

echo.
set /p do_commit="¿Proceder con el commit? (s/n): "
if /i "%do_commit%"=="s" (
    git add .
    git commit -m "🎉 Initial commit - Auréthica App con Ventana0 completada" -m "- Sistema de autenticación completo" -m "- Calibración de Gigi (5 preguntas)" -m "- Diseño minimalista editorial" -m "- Paleta de colores premium (negro + dorado + fucsia)" -m "- Ventana0: Intro Gigi + Calibración ✅ COMPLETADA"
    echo ✅ Commit creado
) else (
    echo ⏭️  Saltando commit
    pause
    exit /b 0
)
echo.

REM PASO 7: Push a GitHub
echo [7/7] Subiendo a GitHub...
echo Se abrirá tu navegador para autenticación si es necesario
echo.

set /p do_push="¿Subir ahora a GitHub? (s/n): "
if /i "%do_push%"=="s" (
    git branch -M main
    
    git push -u origin main
    if %ERRORLEVEL% EQU 0 (
        echo.
        color 0A
        echo ═══════════════════════════════════════════════════════
        echo ✅ ¡ÉXITO! Proyecto subido a GitHub
        echo ═══════════════════════════════════════════════════════
        echo.
        color 0B
        echo Tu repositorio: %repo_url%
        echo.
        color 0E
        echo Próximos pasos:
        echo   1. Visita tu repo en GitHub
        echo   2. Comparte el link con ChatGPT para colaborar
        echo   3. Continúa desarrollando en Figma Make
        echo   4. Usa 'git pull' antes de trabajar
        echo   5. Usa 'git push' después de cambios
        echo.
    ) else (
        color 0C
        echo.
        echo ❌ Error al subir a GitHub
        echo.
        color 0E
        echo Posibles causas:
        echo   - URL del repositorio incorrecta
        echo   - Credenciales de GitHub no configuradas
        echo   - Repositorio ya tiene contenido
        echo.
        echo Solución:
        echo   Intenta manualmente: git push -u origin main --force
        echo.
        pause
        exit /b 1
    )
) else (
    echo ⏭️  Push cancelado
    echo.
    color 0E
    echo Para subir más tarde, ejecuta:
    echo   git branch -M main
    echo   git push -u origin main
)

echo.
color 0A
echo 🎊 ¡Script completado!
echo.
color 07
pause
