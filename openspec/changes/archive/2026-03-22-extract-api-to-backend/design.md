## Context

**当前状态：**
- 13 个 API 路由位于 Next.js 项目的 `src/app/api/` 目录下
- 使用 Next.js App Router 的 `route.ts` 文件格式
- 环境变量以 `NEXT_PUBLIC_` 前缀开头（用于客户端）

**约束：**
- 目标部署平台：Vercel（Serverless Functions）
- 技术栈：Node.js + TypeScript
- 需要保持原有 API 路由结构不变

## Goals / Non-Goals

**Goals:**
- 创建独立的 `devtools-backend` 项目
- 迁移全部 13 个 API 到新项目
- 部署到 Vercel，使用 Vercel Serverless Functions
- 简化环境变量命名（去掉 `NEXT_PUBLIC_` 前缀）
- 保持原有 API 响应格式不变

**Non-Goals:**
- 不修改 API 的业务逻辑
- 不添加新的 API 接口
- 不实现数据库或持久化存储

## Decisions

### 1. 技术栈选择

**决策：** 使用 `@vercel/node` 直接实现，不引入 Koa2

**理由：**
- Vercel 原生支持 `@vercel/node`，部署简单稳定
- 写法与原来 Next.js API 类似，迁移成本低
- 不需要额外的适配层，避免兼容问题

### 2. 项目结构

**决策：** 扁平化目录结构，每个 API 一个文件

```
devtools-backend/
├── api/
│   ├── story/
│   │   ├── index.ts      # /api/story
│   │   ├── types.ts     # /api/story/types
│   │   └── details.ts   # /api/story/details
│   ├── ai/
│   │   ├── story-summary.ts
│   │   └── ...
│   └── tools/
│       ├── calendar.ts
│       └── ...
├── package.json
└── tsconfig.json
```

**理由：**
- Vercel 的 API 路由以 `api/` 目录为根
- 每个文件对应一个路由，结构清晰

### 3. 环境变量

**决策：** 简化命名，去掉 `NEXT_PUBLIC_` 前缀

| 原变量 | 新变量 |
|--------|--------|
| `NEXT_PUBLIC_MXNZP_APP_ID` | `MXNZP_APP_ID` |
| `NEXT_PUBLIC_MXNZP_APP_SECRET` | `MXNZP_APP_SECRET` |

**理由：**
- 服务端 API 不需要 `NEXT_PUBLIC_` 前缀
- Vercel 环境变量在服务端可用

## Risks / Trade-offs

| 风险 | 影响 | 缓解 |
|------|------|------|
| 前端需修改 API 地址 | 需要同步修改前端代码 | 提供清晰的迁移指南 |
| Vercel 冷启动 | 首次请求可能较慢 | Vercel 会自动优化 |
| 环境变量配置 | 需要在 Vercel 后台配置 | 创建 `.env.example` 供参考 |

## Migration Plan

1. **创建项目**：初始化 `devtools-backend` 项目
2. **迁移 API**：逐个迁移 13 个 API
3. **本地测试**：使用 `vercel dev` 本地测试
4. **部署上线**：推送到 GitHub，Vercel 自动部署
5. **前端适配**：修改前端 API 调用地址
6. **验证功能**：确保所有功能正常

## Open Questions

- 是否需要为每个 API 添加健康检查？
- 是否需要添加请求日志？
- 是否需要添加 API 版本管理？