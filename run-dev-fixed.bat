@echo off
echo.
echo ========================================
echo HelpingHands - Development Server Start
echo ========================================
echo.

REM Set Node memory limit to 4GB
set NODE_OPTIONS=--max-old-space-size=4096

REM Navigate to project root
cd /d "%~dp0"

echo Starting both servers with increased memory...
echo Frontend: http://localhost:5173
echo Backend: http://localhost:5000
echo.

REM Run both servers concurrently
npm run dev

pause
