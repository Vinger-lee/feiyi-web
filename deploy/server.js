const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = 3000;

// 代理 Coze Stream API
app.use(
  '/api/coze',
  createProxyMiddleware({
    target: 'https://2qd6fybz9z.coze.site',
    changeOrigin: true,
    pathRewrite: { '^/api/coze': '/stream_run' },
  })
);

// 静态文件服务
app.use(express.static(path.join(__dirname, 'dist')));

// SPA 路由回退
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 热河守艺人已启动: http://localhost:${PORT}`);
  console.log(`📦 代理 /api/coze → https://2qd6fybz9z.coze.site`);
});
