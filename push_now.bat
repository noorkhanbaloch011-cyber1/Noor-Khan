@echo off
cd /d "%~dp0"
echo ==========================================
echo   Glowerive Theme - Git Push Utility
echo ==========================================
echo.
"e:\git\cmd\git.exe" add .
"e:\git\cmd\git.exe" commit -m "update theme"
"e:\git\cmd\git.exe" push origin main
echo.
echo ==========================================
echo   Push Complete!
echo ==========================================
pause
