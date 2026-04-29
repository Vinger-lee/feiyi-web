# 热河守艺人 🏮

> 承德非物质文化遗产数字化展示与互动平台

## 项目简介

「热河守艺人」是一个将承德（热河）地区非物质文化遗产进行数字化展示的 Web 平台。项目以沉浸式的视觉体验和 AI 智能问答，让传统文化在现代数字空间中焕发新生。

### 主要功能

- 🏠 **首页展示** — 精选非遗项目轮播、数据统计、分类导航
- 🗺️ **3D 地球** — 基于 Three.js 的交互式非遗分布展示
- 💬 **AI 智能对话** — 基于 Coze 平台的智能体问答，随时了解非遗知识
- 📖 **非遗百科** — 详细的非遗项目介绍、历史渊源、工艺特色
- 📂 **分类浏览** — 按传统美术、民间文学、传统技艺等门类浏览
- ❤️ **收藏系统** — 收藏感兴趣的非遗项目
- 📋 **聊天历史** — 保存 AI 对话记录

### 技术栈

| 技术 | 用途 |
|------|------|
| React 19 | UI 框架 |
| TypeScript 6 | 类型安全 |
| Vite 8 | 构建工具 |
| Tailwind CSS 3 | 样式系统 |
| Three.js / R3F | 3D 可视化 |
| Framer Motion | 交互动画 |
| Coze API | AI 智能问答 |

## 快速开始

```bash
# 克隆项目
git clone https://github.com/Vinger-lee/feiyi-web.git
cd feiyi-web

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env，填入你的 Coze Token 和 Bot ID

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 环境变量

项目使用以下环境变量（参见 `.env.example`）：

| 变量 | 说明 |
|------|------|
| `VITE_COZE_TOKEN` | Coze API 访问令牌 |
| `VITE_COZE_BOT_ID` | Coze 智能体 Bot ID |

> ⚠️ 请勿将 `.env` 文件提交到 Git 仓库，它已在 `.gitignore` 中排除。

## 开发命令

```bash
npm run dev      # 启动开发服务器
npm run build    # 构建生产版本
npm run preview  # 预览构建结果
npm run lint     # 代码检查
```

## 项目结构

```
src/
├── App.tsx              # 主应用组件
├── main.tsx             # 入口文件
├── components/          # 通用组件
│   ├── HeritageGlobe.tsx # 3D 地球
│   ├── Layout.tsx       # 页面布局
│   └── ...
├── pages/               # 页面组件
│   ├── ChatPage.tsx     # AI 对话
│   ├── EncyclopediaPage.tsx
│   ├── CategoryPage.tsx
│   ├── FavoritesPage.tsx
│   ├── HistoryPage.tsx
│   └── DetailPage.tsx
├── services/            # API 服务
│   └── cozeStream.ts    # Coze 流式请求
├── data/                # 数据文件
│   └── heritageData.ts  # 非遗数据
├── utils/               # 工具函数
└── types/               # TypeScript 类型
```

## 许可证

MIT License © 2025 [Vinger-lee](https://github.com/Vinger-lee)

---

*守护热河非遗 · 传承承德匠心*
