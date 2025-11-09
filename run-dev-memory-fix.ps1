# Memory-fix dev script for Windows PowerShell
# This script runs both backend and frontend with increased Node memory
# to prevent esbuild from running out of memory

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "HelpingHands - Development Server (Memory Fix)" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting servers with 4GB memory limit..." -ForegroundColor Yellow
Write-Host ""

# Set environment variable for current and child processes
$env:NODE_OPTIONS = "--max-old-space-size=4096"

# Function to start a process and keep it running
function Start-DevServer {
    param(
        [string]$Name,
        [string]$Directory,
        [string]$Command
    )
    
    Write-Host "Starting $Name..." -ForegroundColor Green
    Start-Process -NoNewWindow -WorkingDirectory $Directory -FilePath "cmd" -ArgumentList "/c $Command"
}

# Start backend
Start-DevServer -Name "Backend Server" -Directory ".\server" -Command "npm start"

# Wait a bit for backend to start
Start-Sleep -Seconds 2

# Start frontend
Start-DevServer -Name "Frontend Server" -Directory ".\client" -Command "npm run dev"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Servers started!" -ForegroundColor Green
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Gray
Write-Host ""

# Wait indefinitely
while ($true) { Start-Sleep -Seconds 1 }
