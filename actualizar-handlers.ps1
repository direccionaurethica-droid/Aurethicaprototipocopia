#!/usr/bin/env pwsh
# Script para actualizar handlers de registro profesional

$appPath = "C:\Users\Joan Marc\Aurethicaprototipocopia\src\App.tsx"

Write-Host "🔧 Actualizando App.tsx para redirigir a dashboards..." -ForegroundColor Cyan

# Leer el contenido del archivo
$content = Get-Content $appPath -Raw

# Reemplazar handleSalonRegistrationComplete
$oldSalonHandler = @"
  const handleSalonRegistrationComplete = (data: any) => {
    console.log('Salon registration:', data);
    showLoading('Procesando registro de salón...', 2000, () => {
      // En producción, aquí se enviaría al backend
      alert(``✓ Salón registrado: `${data.businessName}\nEmail de verificación enviado a: `${data.email}``);
      setCurrentPage('login');
    });
  };
"@

$newSalonHandler = @"
  const handleSalonRegistrationComplete = (data: any) => {
    console.log('Salon registration:', data);
    // Guardar datos del salón en registrationData
    setRegistrationData({
      ...data,
      email: data.email,
      userRole: 'empresa',
    } as any);
    showLoading('✓ Registro completado. Bienvenido a Auréthica...', 1500, () => {
      // Redirigir directamente al dashboard empresarial
      setCurrentPage('empresa-dashboard');
    });
  };
"@

# Reemplazar handleStylistRegistrationComplete
$oldStylistHandler = @"
  const handleStylistRegistrationComplete = (data: any) => {
    console.log('Stylist registration:', data);
    showLoading('Procesando registro de estilista...', 2000, () => {
      // En producción, aquí se enviaría al backend
      alert(``✓ Estilista registrado: `${data.firstName} `${data.lastName}\nEmail de verificación enviado a: `${data.email}``);
      setCurrentPage('login');
    });
  };
"@

$newStylistHandler = @"
  const handleStylistRegistrationComplete = (data: any) => {
    console.log('Stylist registration:', data);
    // Guardar datos del estilista en registrationData
    setRegistrationData({
      ...data,
      email: data.email,
      nombre: data.firstName,
      apellido: data.lastName,
      userRole: 'estilista',
    } as any);
    showLoading('✓ Registro completado. Bienvenido a Auréthica...', 1500, () => {
      // Redirigir directamente al dashboard de estilista
      setCurrentPage('estilista-dashboard');
    });
  };
"@

# Aplicar reemplazos
$content = $content -replace [regex]::Escape($oldSalonHandler), $newSalonHandler
$content = $content -replace [regex]::Escape($oldStylistHandler), $newStylistHandler

# Guardar el archivo
Set-Content -Path $appPath -Value $content -NoNewline

Write-Host "✅ App.tsx actualizado correctamente" -ForegroundColor Green
Write-Host "   - handleSalonRegistrationComplete → 'empresa-dashboard'" -ForegroundColor White
Write-Host "   - handleStylistRegistrationComplete → 'estilista-dashboard'" -ForegroundColor White
