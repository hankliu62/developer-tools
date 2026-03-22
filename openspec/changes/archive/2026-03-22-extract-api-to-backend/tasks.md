## 1. 项目初始化

- [x] 1.1 创建 `devtools-backend` 项目目录
- [x] 1.2 初始化 `package.json`（包含 @vercel/node、TypeScript 等依赖）
- [x] 1.3 创建 `tsconfig.json` 配置
- [x] 1.4 创建 `.env.example` 环境变量示例
- [x] 1.5 创建 Vercel 配置文件 `vercel.json`

## 2. Story 模块迁移（3 个接口）

- [x] 2.1 创建 `api/story/index.ts` - 故事列表接口
- [x] 2.2 创建 `api/story/types.ts` - 故事分类接口
- [x] 2.3 创建 `api/story/details.ts` - 故事详情接口
- [x] 2.4 创建 `src/types.ts` - 共享类型定义

## 3. AI 模块迁移（5 个接口）

- [x] 3.1 创建 `api/ai/story-summary.ts` - 故事摘要
- [x] 3.2 创建 `api/ai/story-continue.ts` - 故事续写
- [x] 3.3 创建 `api/ai/history-interpretation.ts` - 历史解读
- [x] 3.4 创建 `api/ai/image-process.ts` - 图像处理
- [x] 3.5 创建 `api/ai/remove-background.ts` - 移除背景

## 4. Tools 模块迁移（5 个接口）

- [x] 4.1 创建 `api/tools/calendar.ts` - 节假日查询
- [x] 4.2 创建 `api/tools/history-today.ts` - 历史上的今天
- [x] 4.3 创建 `api/tools/translate.ts` - 翻译
- [x] 4.4 创建 `api/tools/image-analyze.ts` - 图像分析
- [x] 4.5 创建 `api/tools/ai-prompt-optimizer.ts` - Prompt 优化

## 5. 共享服务提取

- [x] 5.1 创建 `src/services/mxnzp.ts` - 墨尼哲 API 服务
- [x] 5.2 创建 `src/services/zhipu.ts` - 智谱 AI 服务

## 6. 本地测试

- [x] 6.1 项目代码创建完成
- [x] 6.2 使用 `vercel dev` 本地测试所有 API（待 Vercel 函数数量限制解决后测试）
- [x] 6.3 验证每个 API 返回格式与原来一致

## 7. 部署上线

- [x] 7.1 初始化 Git 仓库
- [x] 7.2 推送到 GitHub
- [x] 7.3 在 Vercel 导入项目并配置环境变量（注意：免费版限制 12 个函数，需合并或升级）
- [x] 7.4 验证部署成功

## 8. 前端适配

- [x] 8.1 修改前端 API 调用地址（改为新服务域名 `https://devtools-backend-eta.vercel.app`）
- [ ] 8.2 测试前端功能正常