# Execute com o Cursor FECHADO
$ErrorActionPreference = "Stop"

$source = "D:\saas-server-ino"
$target = "D:\server-ino"

if (-not (Test-Path $source)) {
  if (Test-Path $target) {
    Write-Host "OK: projeto ja esta em $target"
    exit 0
  }
  Write-Error "Pasta nao encontrada: $source"
}

if (Test-Path $target) {
  Write-Error "Destino ja existe: $target — remova ou escolha outro caminho."
}

Write-Host "Renomeando $source -> $target ..."
Move-Item -Path $source -Destination $target

Write-Host ""
Write-Host "Concluido!"
Write-Host "1. Abra D:\server-ino no Cursor"
Write-Host "2. Renomeie o repo no GitHub para server-ino (se ainda nao fez)"
Write-Host "3. git remote set-url origin https://github.com/HenriquePiazera/server-ino.git"
Write-Host "4. Veja docs/RENAME_TO_SERVER_INO.md"
