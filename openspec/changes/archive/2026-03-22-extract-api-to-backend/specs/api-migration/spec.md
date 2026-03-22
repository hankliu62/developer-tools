## ADDED Requirements

### Requirement: API 迁移到独立服务

将现有 Next.js 项目中的 13 个 API 路由提取为独立的 Vercel Serverless Functions 服务。

#### Scenario: 项目结构符合 Vercel 规范
- **WHEN** 部署到 Vercel
- **THEN** 每个 `api/*.ts` 文件对应一个 Serverless Function，可通过 `/api/*` 访问

#### Scenario: 保持原有路由结构
- **WHEN** 访问 `/api/story`
- **THEN** 返回与原来相同的响应格式（包含 code、msg、data 字段）

#### Scenario: 保持原有路由结构
- **WHEN** 访问 `/api/story/types`
- **THEN** 返回与原来相同的响应格式

#### Scenario: 保持原有路由结构
- **WHEN** 访问 `/api/story/details?story_id=xxx`
- **THEN** 返回与原来相同的响应格式

#### Scenario: 保持原有路由结构
- **WHEN** 访问 `/api/ai/story-summary`（POST）
- **THEN** 返回与原来相同的响应格式（包含 summary）

#### Scenario: 保持原有路由结构
- **WHEN** 访问 `/api/ai/story-continue`（POST）
- **THEN** 返回与原来相同的响应格式（包含续写内容）

#### Scenario: 保持原有路由结构
- **WHEN** 访问 `/api/ai/history-interpretation`（POST）
- **THEN** 返回与原来相同的响应格式（包含 summary、expansion、fun_fact）

#### Scenario: 保持原有路由结构
- **WHEN** 访问 `/api/ai/image-process`（POST）
- **THEN** 返回与原来相同的响应格式（包含 feature、坐标或结果）

#### Scenario: 保持原有路由结构
- **WHEN** 访问 `/api/ai/remove-background`（POST）
- **THEN** 返回与原来相同的响应格式（包含 success、image）

#### Scenario: 保持原有路由结构
- **WHEN** 访问 `/api/calendar?date=202603`
- **THEN** 返回与原来相同的响应格式

#### Scenario: 保持原有路由结构
- **WHEN** 访问 `/api/history-today?type=1`
- **THEN** 返回与原来相同的响应格式

#### Scenario: 保持原有路由结构
- **WHEN** 访问 `/api/translate`（POST）
- **THEN** 返回与原来相同的响应格式（包含 translatedText）

#### Scenario: 保持原有路由结构
- **WHEN** 访问 `/api/image-analyze`（POST）
- **THEN** 返回与原来相同的响应格式（包含 type、recommendation）

#### Scenario: 保持原有路由结构
- **WHEN** 访问 `/api/ai-prompt-optimizer`（POST）
- **THEN** 返回与原来相同的响应格式（包含 candidates）

### Requirement: 环境变量正确配置

服务端正确读取环境变量用于第三方 API 调用。

#### Scenario: 墨尼哲 API 环境变量
- **WHEN** 调用需要 app_id 和 app_secret 的 API
- **THEN** 正确读取 `MXNZP_APP_ID` 和 `MXNZP_APP_SECRET` 环境变量

### Requirement: 代理配置支持

如果配置了代理，服务端请求支持通过代理访问。

#### Scenario: 代理环境变量存在
- **WHEN** 环境变量 `PROXY` 已配置
- **THEN** 发起外部请求时使用代理

#### Scenario: 代理环境变量不存在
- **WHEN** 环境变量 `PROXY` 未配置
- **THEN** 直接发起请求，不使用代理