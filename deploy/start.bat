@echo off
echo ========================================
echo   热河守艺人 - 启动服务器
echo ========================================
echo.

REM 检查 Node.js 是否安装
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 未找到 Node.js！请先安装: https://nodejs.org
    pause
    exit /b 1
)

REM 安装依赖
echo [1/2] 安装依赖...
cd /d "%~dp0"
npm install --silent

REM 启动服务器
echo [2/2] 启动服务器...
echo.
echo 浏览器打开: http://localhost:3000
echo 按 Ctrl+C 停止服务器
echo.
node server.js

pause
