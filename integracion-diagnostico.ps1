#!/usr/bin/env pwsh
# Script de integración para conectar dashboards de diagnóstico 360º

Write-Host "🔗 Integración Dashboard Diagnóstico 360º - Auréthica" -ForegroundColor Cyan
Write-Host "=" * 60

# Verificar que estamos en el directorio correcto
if (-Not (Test-Path "src/lib/router/PageRouter.tsx")) {
    Write-Host "❌ Error: Debes ejecutar este script desde la raíz de Aurethicaprototipocopia" -ForegroundColor Red
    Write-Host "   cd 'C:\Users\Joan Marc\Aurethicaprototipocopia'" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Directorio correcto verificado" -ForegroundColor Green

# Verificar archivos creados
Write-Host "`n📂 Verificando archivos creados..." -ForegroundColor Cyan

$requiredFiles = @(
    "src/lib/api/diagnostico.ts",
    "src/components/diagnostico/SurveyComponent.tsx",
    "src/pages/EmpresaDashboardPage.tsx",
    "src/pages/EstilistaDashboardPage.tsx",
    ".env"
)

$allFilesExist = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file" -ForegroundColor Green
    }
    else {
        Write-Host "  ✗ $file - FALTA" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if (-Not $allFilesExist) {
    Write-Host "`n❌ Faltan archivos necesarios. Revisa INTEGRACION_PROTOTIPO.md" -ForegroundColor Red
    exit 1
}

Write-Host "`n✅ Todos los archivos base están creados" -ForegroundColor Green

# Instrucciones manuales
Write-Host "`n📝 PASOS MANUALES REQUERIDOS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣  Editar src/lib/router/PageRouter.tsx" -ForegroundColor White
Write-Host "   - Agregar imports de EmpresaDashboardPage y EstilistaDashboardPage"
Write-Host "   - Agregar 'empresa-dashboard' y 'estilista-dashboard' al type PageRoute"
Write-Host "   - Agregar casos en el switch para renderizar ambos dashboards"
Write-Host ""
Write-Host "2️⃣  Editar src/pages/index.ts" -ForegroundColor White
Write-Host "   - Exportar las nuevas páginas de dashboard"
Write-Host ""
Write-Host "3️⃣  Editar src/components/SalonRegistration.tsx" -ForegroundColor White
Write-Host "   - Redirigir a 'empresa-dashboard' después del registro"
Write-Host ""
Write-Host "4️⃣  Editar src/components/StylistRegistration.tsx" -ForegroundColor White
Write-Host "   - Redirigir a 'estilista-dashboard' después del registro"
Write-Host ""
Write-Host "📖 Ver detalles completos en: ../aurethica-proyecto/INTEGRACION_PROTOTIPO.md" -ForegroundColor Cyan

# Verificar API de diagnóstico
Write-Host "`n🔌 Verificando API de diagnóstico..." -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -Method GET -TimeoutSec 2 -ErrorAction Stop
    Write-Host "✅ API de diagnóstico está corriendo en http://localhost:3000" -ForegroundColor Green
}
catch {
    Write-Host "⚠️  API de diagnóstico NO está corriendo" -ForegroundColor Yellow
    Write-Host "   Para iniciar la API:" -ForegroundColor White
    Write-Host "   cd '..\aurethica-proyecto'" -ForegroundColor Gray
    Write-Host "   npm run dev" -ForegroundColor Gray
}

Write-Host "`n🚀 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Realizar las ediciones manuales listadas arriba"
Write-Host "2. Iniciar API: cd ..\aurethica-proyecto && npm run dev"
Write-Host "3. Iniciar Prototipo: npm run dev"
Write-Host "4. Probar flujo: Landing → Registro Profesional → Dashboard → Encuesta"
Write-Host ""
Write-Host "=" * 60
Write-Host "✨ ¡Integración casi completa! Solo faltan los pasos manuales." -ForegroundColor Green
