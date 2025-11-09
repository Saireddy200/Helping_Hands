@echo off
REM Memory-fix dev script for Windows
REM This script runs both backend and frontend with increased Node memory
REM to prevent esbuild from running out of memory

echo.
echo ============================================
echo HelpingHands - Development Server (Memory Fix)
echo ============================================
echo.
echo Starting servers with 4GB memory limit...
echo.

REM Set environment variables
set NODE_OPTIONS=--max-old-space-size=4096

REM Start both servers concurrently
start "HelpingHands Server" cmd /k "cd server && npm start"
timeout /t 2 /nobreak
start "HelpingHands Client" cmd /k "cd client && npm run dev"

echo.
echo ============================================
echo Servers started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo ============================================
echo.
