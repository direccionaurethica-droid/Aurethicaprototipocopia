@echo off
REM Script de Inicialización de GitHub para Auréthica (Windows)

title Aurethica - Inicializacion GitHub

echo ==========================================
echo    Aurethica - Inicializacion GitHub
echo ==========================================
echo.

REM Verificar si Git está instalado
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git no esta instalado
    echo Por favor instala Git desde: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo [OK] Git esta instalado
echo.

REM Verificar configuración de Git
for /f "tokens=*" %%a in ('git config --global user.name') do set GIT_USER=%%a
for /f "tokens=*" %%b in ('git config --global user.email') do set GIT_EMAIL=%%b

if "%GIT_USER%"=="" (
    echo [ADVERTENCIA] Git no esta configurado
    echo.
    set /p USER_NAME="Ingresa tu nombre: "
    set /p USER_EMAIL="Ingresa tu email: "
    
    git config --global user.name "%USER_NAME%"
    git config --global user.email "%USER_EMAIL%"
    
    echo [OK] Configuracion guardada
) else (
    echo [OK] Git configurado como: %GIT_USER% ^<%GIT_EMAIL%^>
)
echo.

REM Verificar si ya es un repositorio Git
if exist ".git" (
    echo [ADVERTENCIA] Este directorio ya es un repositorio Git
    set /p REINIT="Deseas reinicializarlo? (s/n): "
    if /i "%REINIT%"=="s" (
        rmdir /s /q .git
        git init
        echo [OK] Repositorio reinicializado
    ) else (
        echo [OK] Usando repositorio existente
    )
) else (
    git init
    echo [OK] Repositorio Git inicializado
)
echo.

REM Solicitar URL del repositorio remoto
echo Configuracion del repositorio remoto
echo Opciones:
echo   1. Ya cree el repositorio en GitHub (tengo la URL)
echo   2. Aun no he creado el repositorio (lo hare despues)
echo.
set /p REMOTE_OPTION="Selecciona una opcion (1/2): "

if "%REMOTE_OPTION%"=="1" (
    set /p REPO_URL="Pega la URL de tu repositorio de GitHub: "
    
    REM Verificar si ya existe el remote 'origin'
    git remote | findstr "^origin$" >nul 2>&1
    if not errorlevel 1 (
        echo [ADVERTENCIA] El remote 'origin' ya existe
        set /p REPLACE="Deseas reemplazarlo? (s/n): "
        if /i "!REPLACE!"=="s" (
            git remote remove origin
            git remote add origin "!REPO_URL!"
            echo [OK] Remote 'origin' actualizado
        )
    ) else (
        git remote add origin "!REPO_URL!"
        echo [OK] Remote 'origin' añadido
    )
) else if "%REMOTE_OPTION%"=="2" (
    echo [ADVERTENCIA] Salta este paso por ahora
    echo Puedes añadir el remote despues con:
    echo   git remote add origin https://github.com/TU-USUARIO/aurethica-app.git
)
echo.

REM Verificar .gitignore
if exist ".gitignore" (
    echo [OK] .gitignore existe
) else (
    echo [ADVERTENCIA] .gitignore no encontrado
    echo Asegurate de tener un .gitignore antes de hacer commit
)
echo.

REM Verificar .env.example
if exist ".env.example" (
    echo [OK] .env.example existe
    
    if not exist ".env" (
        set /p CREATE_ENV="Deseas crear .env desde .env.example? (s/n): "
        if /i "!CREATE_ENV!"=="s" (
            copy .env.example .env >nul
            echo [OK] .env creado (recuerda llenarlo con tus valores reales)
        )
    )
) else (
    echo [ADVERTENCIA] .env.example no encontrado
)
echo.

REM Añadir archivos
set /p DO_COMMIT="Deseas hacer el commit inicial ahora? (s/n): "

if /i "%DO_COMMIT%"=="s" (
    echo.
    echo Añadiendo archivos...
    git add .
    
    echo [OK] Archivos añadidos
    echo.
    
    REM Crear commit
    echo Creando commit inicial...
    git commit -m "🎨 Initial commit: Aurethica - Premium Beauty Platform" -m "- Sistema completo de calibracion de Gigi" -m "- Test de belleza personalizado" -m "- Sistema de perfiles (Usuaria/Estilista/Empresa)" -m "- Blog estilo Instagram" -m "- Navegacion visual colapsable" -m "- Sistema de diseño minimalista dorado/beige"
    
    echo [OK] Commit inicial creado
    echo.
    
    REM Renombrar rama a main
    echo Configurando rama principal como 'main'...
    git branch -M main
    echo [OK] Rama renombrada a 'main'
    echo.
    
    REM Push (si hay remote)
    git remote | findstr "^origin$" >nul 2>&1
    if not errorlevel 1 (
        set /p DO_PUSH="Deseas subir el codigo a GitHub ahora? (s/n): "
        
        if /i "!DO_PUSH!"=="s" (
            echo.
            echo Subiendo codigo...
            echo [ADVERTENCIA] Si es la primera vez, GitHub te pedira autenticacion
            echo.
            
            git push -u origin main
            if not errorlevel 1 (
                echo [OK] Codigo subido exitosamente!
                echo.
                echo Tu codigo esta ahora en:
                git remote get-url origin
            ) else (
                echo [ERROR] Error al subir el codigo
                echo Verifica tu autenticacion y la URL del repositorio
            )
        )
    ) else (
        echo [ADVERTENCIA] No hay remote configurado. Puedes hacer push despues con:
        echo   git push -u origin main
    )
)

echo.
echo ==========================================
echo [OK] Configuracion completada! 🎉
echo ==========================================
echo.
echo Proximos pasos:
echo   1. Ve a GitHub y verifica tu repositorio
echo   2. Añade colaboradores si es necesario
echo   3. Configura .env con tus valores reales
echo   4. Lee GITHUB_SETUP.md para mas informacion
echo   5. Lee COMANDOS_GIT_RAPIDOS.md para el dia a dia
echo.
echo Comandos utiles:
echo   git status        - Ver estado actual
echo   git log --oneline - Ver historial
echo   git push          - Subir cambios
echo   git pull          - Descargar cambios
echo.
echo [OK] Feliz desarrollo! 🚀
echo.
pause
