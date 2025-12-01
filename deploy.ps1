# Script de Deploy para GitHub Pages (PowerShell)
# Ejecutar: .\deploy.ps1

Write-Host "🚀 Iniciando proceso de deploy..." -ForegroundColor Green

# Compilar el proyecto
Write-Host "`n📦 Compilando proyecto..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error en la compilación" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Compilación exitosa" -ForegroundColor Green

# Entrar al directorio dist
Set-Location dist

# Inicializar git
Write-Host "`n🔧 Configurando Git..." -ForegroundColor Yellow
git init
git add -A
git commit -m "deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

# Preguntar URL del repositorio
Write-Host "`n📝 Ingresa la URL de tu repositorio:" -ForegroundColor Cyan
Write-Host "Ejemplo: https://github.com/tu-usuario/apinder-vue.git" -ForegroundColor Gray
$repoUrl = Read-Host "URL"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "❌ URL no válida" -ForegroundColor Red
    Set-Location ..
    exit 1
}

# Push a gh-pages
Write-Host "`n🚀 Subiendo a GitHub Pages..." -ForegroundColor Yellow
git push -f $repoUrl main:gh-pages

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al subir a GitHub" -ForegroundColor Red
    Set-Location ..
    exit 1
}

# Volver al directorio raíz
Set-Location ..

Write-Host "`n✅ Deploy completado exitosamente!" -ForegroundColor Green
Write-Host "`n🌐 Tu sitio estará disponible en unos minutos en:" -ForegroundColor Cyan
Write-Host "https://TU-USUARIO.github.io/apinder-vue/" -ForegroundColor White
Write-Host "`n💡 Recuerda activar GitHub Pages en Settings > Pages" -ForegroundColor Yellow

