#!/usr/bin/env pwsh
# Script para aplicar la integración del dashboard 360º

Write-Host "🔧 Aplicando integración Dashboard 360º" -ForegroundColor Cyan
Write-Host "=" * 60

$ErrorActionPreference = "Continue"

# 1. Verificar que estamos en el directorio correcto
if (-Not (Test-Path "src/pages")) {
    Write-Host "❌ Error: Ejecuta desde C:\Users\Joan Marc\Aurethicaprototipocopia" -ForegroundColor Red
    exit 1
}

Write-Host "`n📝 Paso 1: Actualizando src/pages/index.ts..." -ForegroundColor Yellow

# Leer el archivo actual
$indexPath = "src/pages/index.ts"
if (Test-Path $indexPath) {
    $indexContent = Get-Content $indexPath -Raw
    
    # Verificar si ya están exportadas
    if ($indexContent -notmatch "EmpresaDashboardPage") {
        # Agregar al final
        Add-Content -Path $indexPath -Value "`nexport { EmpresaDashboardPage } from './EmpresaDashboardPage';"
        Write-Host "  ✓ Agregado export de EmpresaDashboardPage" -ForegroundColor Green
    }
    else {
        Write-Host "  ⚠ EmpresaDashboardPage ya exportada" -ForegroundColor Yellow
    }
    
    if ($indexContent -notmatch "EstilistaDashboardPage") {
        Add-Content -Path $indexPath -Value "export { EstilistaDashboardPage } from './EstilistaDashboardPage';"
        Write-Host "  ✓ Agregado export de EstilistaDashboardPage" -ForegroundColor Green
    }
    else {
        Write-Host "  ⚠ EstilistaDashboardPage ya exportada" -ForegroundColor Yellow
    }
}
else {
    Write-Host "  ❌ No se encontró src/pages/index.ts" -ForegroundColor Red
}

Write-Host "`n📝 Paso 2: Instrucciones para PageRouter.tsx..." -ForegroundColor Yellow
Write-Host ""
Write-Host "  EDICIÓN MANUAL REQUERIDA en src/lib/router/PageRouter.tsx:" -ForegroundColor White
Write-Host ""
Write-Host "  1. Agregar imports al inicio:" -ForegroundColor Cyan
Write-Host "     import { EmpresaDashboardPage } from '../pages/EmpresaDashboardPage';"
Write-Host "     import { EstilistaDashboardPage } from '../pages/EstilistaDashboardPage';"
Write-Host ""
Write-Host "  2. En el type PageRoute, agregar:" -ForegroundColor Cyan
Write-Host "     | 'empresa-dashboard'"
Write-Host "     | 'estilista-dashboard'"
Write-Host ""
Write-Host "  3. En el switch, agregar estos casos:" -ForegroundColor Cyan
Write-Host "     case 'empresa-dashboard':"
Write-Host "       return <EmpresaDashboardPage userEmail={currentUser?.email || ''} userName={currentUser?.name} onBack={() => setRoute('app')} />;"
Write-Host ""
Write-Host "     case 'estilista-dashboard':"
Write-Host "       return <EstilistaDashboardPage userEmail={currentUser?.email || ''} userName={currentUser?.name} onBack={() => setRoute('app')} />;"
Write-Host ""

Write-Host "`n📝 Paso 3: Instrucciones para componentes de registro..." -ForegroundColor Yellow
Write-Host ""
Write-Host "  En src/components/SalonRegistration.tsx:" -ForegroundColor White
Write-Host "    - Buscar donde se hace la navegación después de onComplete"
Write-Host "    - Cambiar a: setRoute('empresa-dashboard')"
Write-Host ""
Write-Host "  En src/components/StylistRegistration.tsx:" -ForegroundColor White
Write-Host "    - Buscar donde se hace la navegación después de onComplete"
Write-Host "    - Cambiar a: setRoute('estilista-dashboard')"
Write-Host ""

Write-Host "`n📋 Resumen:" -ForegroundColor Cyan
Write-Host "  ✓ Exports actualizados en pages/index.ts"
Write-Host "  ⏳ PageRouter.tsx requiere edición manual"
Write-Host "  ⏳ SalonRegistration.tsx requiere edición manual"
Write-Host "  ⏳ StylistRegistration.tsx requiere edición manual"
Write-Host ""
Write-Host "📖 Ver DASHBOARD_README.md para detalles completos" -ForegroundColor Cyan
Write-Host ""
Write-Host "=" * 60
