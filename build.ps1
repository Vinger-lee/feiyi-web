# 设置工作目录
Set-Location -Path "E:\OneDrive\Desktop\非遗智能体\feiyi-web"

# 卸载 v4，安装 v3
Write-Host "卸载 Tailwind v4..." -ForegroundColor Cyan
npm uninstall tailwindcss

Write-Host "安装 Tailwind CSS v3..." -ForegroundColor Cyan
npm install -D tailwindcss@3.4.17 postcss autoprefixer

# 初始化 Tailwind
Write-Host "初始化 Tailwind..." -ForegroundColor Cyan
npx tailwindcss init -p

# 复制配置
Write-Host "配置 Tailwind..." -ForegroundColor Cyan

# 重新构建
Write-Host "构建中..." -ForegroundColor Cyan
npm run build

# 完成
Write-Host "构建完成！" -ForegroundColor Green
