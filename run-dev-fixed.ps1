# HelpingHands - Development Server with Memory Fix
# Run this with: powershell -ExecutionPolicy Bypass -File run-dev-fixed.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "HelpingHands - Development Server Start" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set Node memory limit to 4GB
$env:NODE_OPTIONS = "--max-old-space-size=4096"

# Navigate to project root
Set-Location $PSScriptRoot

Write-Host "Starting both servers with increased memory..." -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host "Backend: http://localhost:5000" -ForegroundColor Yellow
Write-Host ""

# Run both servers
npm run dev

# Keep window open on exit
Read-Host "Press Enter to exit"
