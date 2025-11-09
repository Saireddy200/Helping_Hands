@echo off
REM HelpingHands - Development Server Starter
REM This script starts both backend and frontend with optimized settings

echo.
echo ========================================
echo   HelpingHands Development Server
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Set Node memory limit to prevent esbuild memory errors
set NODE_OPTIONS=--max-old-space-size=4096

echo Setting Node memory limit to 4GB for optimal performance...
echo.

REM Navigate to project root
cd /d "%~dp0"

REM Start both servers
echo Starting development servers...
echo   - Backend:  http://localhost:5000
echo   - Frontend: http://localhost:5173
echo.
echo Press Ctrl+C to stop both servers
echo.

npm run dev

pause
