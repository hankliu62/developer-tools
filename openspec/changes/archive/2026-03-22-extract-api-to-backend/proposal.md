## Why

当前 Next.js 项目中的 API 路由 (`src/app/api/`) 与前端代码混在一起，不利于独立维护和扩展。将这些 API 提取到独立的后端服务，可以：

1. **独立部署**：API 服务可以单独部署到 Vercel，不依赖前端项目
2. **多端复用**：未来其他前端应用也可以调用这些 API
3. **技术一致性**：使用 Node.js + TypeScript，与前端技术栈一致

## What Changes

1. 创建独立的 `devtools-backend` 项目（Node.js + TypeScript + Vercel）
2. 迁移全部 13 个 API 到新项目，保持原有路由结构
3. 环境变量命名简化（去掉 `NEXT_PUBLIC_` 前缀）
4. 前端调用改为新服务的域名 URL

### 迁移的 API 列表

| 路由 | 类型 | 说明 |
|------|------|------|
| `/api/story` | GET | 故事列表（代理） |
| `/api/story/types` | GET | 故事分类（代理） |
| `/api/story/details` | GET | 故事详情（代理） |
| `/api/ai/story-summary` | POST | 故事摘要（AI） |
| `/api/ai/story-continue` | POST | 故事续写（AI） |
| `/api/ai/history-interpretation` | POST | 历史解读（AI） |
| `/api/ai/image-process` | POST | 图像处理（AI） |
| `/api/ai/remove-background` | POST | 移除背景（AI） |
| `/api/calendar` | GET | 节假日查询 |
| `/api/history-today` | GET | 历史上的今天 |
| `/api/translate` | POST | 翻译 |
| `/api/image-analyze` | POST | 图像分析 |
| `/api/ai-prompt-optimizer` | POST | Prompt 优化 |

## Capabilities

### New Capabilities

- **api-migration**: 将 Next.js API 路由提取为独立服务
  - 项目结构设计
  - 13 个 API 迁移
  - Vercel 部署配置
  - 环境变量配置

### Modified Capabilities

- 无（现有功能保持不变，仅迁移位置）

## Impact

- **新增项目**：`/Users/liuxiaocong/Workspace/github/personal/devtools-backend/`
- **影响前端**：需要修改 API 调用地址（从 `/api/xxx` 改为 `https://devtools-backend.vercel.app/api/xxx`）
- **环境变量**：需要在新项目中配置 `MXNZP_APP_ID`、`MXNZP_APP_SECRET` 等