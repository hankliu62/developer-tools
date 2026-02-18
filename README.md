# Developer Tools

一站式开发者工具箱，涵盖加密解密、格式转换、网络工具、文本处理等 80+ 款实用工具。

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 功能特性

- **80+ 在线工具**：涵盖 10 个常用分类
- **完全免费**：无需注册即可使用
- **响应式设计**：支持桌面端和移动端
- **快速搜索**：顶部搜索框快速定位工具
- **AI 集成**：支持提示词优化、翻译等功能

## 工具分类

| 分类 | 工具数量 | 示例工具 |
|------|---------|----------|
| 加密解密 | 13 | Token 生成器、UUID、哈希、Bcrypt、RSA |
| 转换工具 | 19 | 日期转换、进制转换、Base64、JSON/YAML/XML 互转 |
| Web 开发 | 15 | URL 编码解码、JWT 解析、OTP 验证码、MIME 类型 |
| Cron 工具 | 2 | Cron 表达式生成器、Cron 解析器 |
| 网络工具 | 8 | IPv4 地址转换、子网计算器、MAC 地址查询 |
| 数学计算 | 4 | 数学表达式计算器、ETA 计算器、百分比计算器 |
| 文本工具 | 9 | 文本统计、Emoji 选择器、文本对比、ASCII 艺术生成 |
| 开发工具 | 12 | SQL/XML/YAML 格式化、JSON 对比、正则测试、Git 速查表 |
| 验证工具 | 1 | IBAN 验证 |
| AI 工具 | 4 | AI 提示词优化、提示词库、Skills 库、Rules 库 |

## 技术栈

- **框架**：Next.js 16 (App Router)
- **UI 库**：Ant Design 6
- **样式**：Tailwind CSS
- **语言**：TypeScript
- **代码规范**：Biome
- **部署**：Vercel / GitHub Pages

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
pnpm build
```

### 代码检查

```bash
# 代码检查
pnpm lint

# 自动修复
pnpm lint:fix

# 代码格式化
pnpm format
```

## 部署

### Vercel 部署（推荐）

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

### GitHub Pages 部署

项目已配置 GitHub Actions 自动部署到 GitHub Pages：

1. Fork 本仓库
2. 进入 Settings → Pages
3. 设置 Source 为 GitHub Actions

详细部署步骤请参考 [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   ├── ai-prompt-optimizer/
│   │   └── translate/
│   ├── tools/             # 工具页面
│   ├── prompts/           # AI 提示词库
│   ├── skills/            # AI Skills 库
│   ├── rules/             # AI Rules 库
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── AppLayout.tsx      # 应用布局
│   ├── Hero.tsx           # 首页横幅
│   └── ...
├── constants/              # 常量定义
│   └── navigation.ts      # 导航配置
└── lib/                   # 工具函数
    └── route.ts           # 路由工具
```

## 添加新工具

1. 在 `src/constants/navigation.ts` 中添加工具配置
2. 在 `src/app/tools/` 下创建工具页面
3. 运行 `pnpm build` 确保无错误

## 浏览器支持

- Chrome >= 90
- Firefox >= 90
- Safari >= 15
- Edge >= 90

## 线上地址
- [前端开发者工具-vercel](https://developer-tools-tan.vercel.app/)
- [前端开发者工具-github](https://hankliu62.github.io/developer-tools/)

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！
