# HelpingHands - Development Server Starter (PowerShell)
# This script starts both backend and frontend with optimized settings

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  HelpingHands Development Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $null = node --version
}
catch {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Set Node memory limit to prevent esbuild memory errors
$env:NODE_OPTIONS = "--max-old-space-size=4096"

Write-Host "✓ Setting Node memory limit to 4GB for optimal performance..." -ForegroundColor Green
Write-Host ""

# Navigate to project root
Set-Location -Path $PSScriptRoot

Write-Host "Starting development servers..." -ForegroundColor Yellow
Write-Host "  ✓ Backend:  http://localhost:5000" -ForegroundColor Green
Write-Host "  ✓ Frontend: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow
Write-Host ""

npm run dev
