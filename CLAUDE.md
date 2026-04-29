# feiyi-web — 热河守艺人

## 项目定位
承德/热河非遗展示 + Coze AI 对话的纯前端 SPA。

## 技术栈
- React 19 + Vite 8 + TypeScript 6 + Tailwind CSS 3
- Three.js + @react-three/fiber + @react-three/drei (3D 星球)
- Framer Motion (动画)
- react-markdown (聊天 Markdown 渲染)
- Coze Stream API (智能对话)

## 关键约束
1. 不要修改 `src/data/heritageData.ts` 和 `src/types/index.ts`
2. 图片资源在 `public/images/heritage/`，不要改动
3. 首屏性能优先 — Three.js 组件必须懒加载
4. Intel UHD 630 GPU，Canvas dpr 不超过 [1, 1]

## 核心架构
```
src/
├── components/      # 可复用 UI 组件（HeritageGlobe, HeroComponents, Icons, TiltCard 等）
├── pages/           # 页面级组件（ChatPage, EncyclopediaPage, CategoryPage 等）
├── services/        # API 调用（cozeStream.ts, storage.ts, cozeApi.ts）
├── hooks/           # 自定义 hooks（useScrollDirection）
├── data/            # 非遗数据（不可修改）
├── types/           # 类型定义（不可修改）
└── utils/           # 工具函数（heritage.ts）
```

## 命令
- `npm run dev` — 开发服务器（:5173, 带 Coze API 代理）
- `npm run build` — 生产构建（tsc + vite build）
- `npm run lint` — ESLint 检查

## 构建规范
- 每次修改后必须 `npm run build` 验证
- 确保 dist/ 不包含 .env 文件
- ChatPage 通过 Vite proxy `/api/coze` 调用 Coze API，生产环境需要代理服务器

## 性能基线
- 首屏 JS < 300 kB (gzip)
- 粒子星空 ≤ 200 粒子
- 3D 星球 ≤ 12 卡片
- 不允许 backdrop-filter 在滚动容器内
