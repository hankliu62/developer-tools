export interface Rule {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
}

export const rules: Rule[] = [
  {
    id: "1",
    title: "Git 提交规范",
    description: "使用 Conventional Commits 格式规范 Git 提交信息",
    content: `# Git 提交规范

## 格式
\`\`\`
<type>(<scope>): <description>

[optional body]

[optional footer]
\`\`\`

## Type 类型
- \`feat\`: 新功能
- \`fix\`: Bug 修复
- \`docs\`: 文档更新
- \`style\`: 代码格式（不影响功能）
- \`refactor\`: 重构（不影响功能）
- \`perf\`: 性能优化
- \`test\`: 测试相关
- \`chore\`: 构建过程或辅助工具变动

## 示例
\`\`\`
feat(auth): add login API
fix(ui): resolve button alignment issue
docs: update README with installation guide
\`\`\`

## 规则
1. 标题不超过 50 字符
2. 使用祈使句
3. 勿在标题后加句号
4. body 说明 what 和 why，不说明 how
5. footer 用于关联 issue`,
    category: "版本控制",
    tags: ["Git", "提交规范", "Conventional Commits"],
  },
  {
    id: "2",
    title: "React 组件规范",
    description: "React 组件开发最佳实践",
    content: `# React 组件规范

## 组件命名
- 使用 PascalCase 命名组件
- 使用 camelCase 命名组件实例
- 组件文件名使用 PascalCase

## Props 规范
- 所有 props 都有类型定义
- 使用 interface 定义 props 类型
- 必填 props 在类型中标注
- 提供合理的默认值

## Hooks 使用
- 自定义 hooks 以 \`use\` 开头
- hooks 放在组件顶部
- 相关 hooks 组合在一起
- 依赖数组要完整

## 状态管理
- 使用 useState 处理本地状态
- 使用 useRef 处理不需要触发渲染的值
- 避免不必要的状态
- 状态位置要合理

## 性能
- 适当使用 useMemo 和 useCallback
- 大列表使用 virtualization
- 图片使用 lazy loading
- 合理使用 React.memo`,
    category: "前端开发",
    tags: ["React", "组件", "最佳实践"],
  },
  {
    id: "3",
    title: "TypeScript 编码规范",
    description: "TypeScript 项目开发规范",
    content: `# TypeScript 编码规范

## 类型定义
- 始终使用显式类型，不使用 any
- 使用 \`interface\` 定义对象类型
- 使用 \`type\` 定义联合类型、别名
- 导出类型而不是实现

## 命名规范
- 变量/函数: camelCase
- 类/接口/类型: PascalCase
- 常量: UPPER_SNAKE_CASE
- 文件: kebab-case

## Null 处理
- 优先使用可选链 (?.)
- 使用空值合并 (??) 处理默认值
- 避免使用 \`!\` 强制非空
- 明确处理所有 null 和 undefined

## 最佳实践
1. 启用 strict 模式
2. 不使用 \`as\` 类型断言
3. 使用类型守卫进行类型收缩
4. 优先使用泛型而不是 any`,
    category: "前端开发",
    tags: ["TypeScript", "类型系统", "最佳实践"],
  },
  {
    id: "4",
    title: "RESTful API 设计规范",
    description: "REST API 设计和命名规范",
    content: `# RESTful API 设计规范

## URL 设计
- 使用名词而非动词
- 使用复数形式
- 使用小写字母
- 使用连字符分隔单词
- 层级不超过三层

## HTTP 方法
- GET: 获取资源
- POST: 创建资源
- PUT: 完整更新资源
- PATCH: 部分更新资源
- DELETE: 删除资源

## 状态码
- 200: 成功
- 201: 创建成功
- 204: 删除成功
- 400: 请求错误
- 401: 未授权
- 403: 禁止访问
- 404: 资源不存在
- 500: 服务器错误

## 版本控制
- URL 中包含版本号: /api/v1/
- 使用语义化版本

## 错误响应
\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "描述信息",
    "details": []
  }
}
\`\`\``,
    category: "后端开发",
    tags: ["REST", "API", "设计规范"],
  },
  {
    id: "5",
    title: "CSS 命名规范",
    description: "BEM 命名方法和 CSS 组织规范",
    content: `# CSS 命名规范

## BEM 命名
\`\`\`
block
block__element
block--modifier
\`\`\`

## 示例
\`\`\`css
/* Block */
.nav { }

/* Element */
.nav__item { }
.nav__link { }

/* Modifier */
.nav__item--active { }
.nav--dark { }
\`\`\`

## 命名规则
- 使用小写字母
- 使用连字符分隔
- 避免使用 ID 选择器
- 保持名称简短但有意义

## CSS 组织
1. Reset/Normalize
2. 工具类
3. 通用组件
4. 特定页面样式
5. 响应式调整`,
    category: "前端开发",
    tags: ["CSS", "BEM", "命名规范"],
  },
  {
    id: "6",
    title: "数据库设计规范",
    description: "数据库表设计和索引规范",
    content: `# 数据库设计规范

## 表设计
- 使用有意义的表名
- 使用下划线命名
- 添加 \`created_at\` 和 \`updated_at\` 字段
- 主键使用自增 ID 或 UUID
- 添加业务相关的索引

## 字段规范
- 字段名使用小写和下划线
- 为每个字段添加注释
- 合理设置字段长度
- 使用合适的数据类型

## 索引
- 为 WHERE 条件字段添加索引
- 复合索引考虑字段顺序
- 避免过多索引
- 定期分析和优化

## 事务
- 保持事务简短
- 避免嵌套事务
- 合理处理死锁
- 使用乐观锁或悲观锁`,
    category: "数据库",
    tags: ["数据库", "索引", "设计规范"],
  },
  {
    id: "7",
    title: "安全开发规范",
    description: "Web 应用安全最佳实践",
    content: `# 安全开发规范

## 常见漏洞防护
1. SQL 注入: 使用参数化查询
2. XSS: 转义输出，使用 CSP
3. CSRF: 使用 token 验证
4. 密码: 使用强哈希算法存储
5. 文件上传: 验证文件类型和大小

## 认证授权
- 使用 HTTPS
- 密码加密存储
- 实现会话管理
- 限制登录尝试
- JWT 使用短期过期

## 数据保护
- 敏感数据加密传输
- 敏感信息不记录日志
- 合理设置 CORS
- 使用安全 headers`,
    category: "安全",
    tags: ["安全", "XSS", "SQL注入"],
  },
  {
    id: "8",
    title: "代码审查检查清单",
    description: "代码审查时需要检查的项目",
    content: `# 代码审查检查清单

## 代码逻辑
- [ ] 逻辑正确性
- [ ] 边界条件处理
- [ ] 错误处理
- [ ] 资源释放

## 性能
- [ ] 避免不必要的循环
- [ ] 合理使用缓存
- [ ] 数据库查询优化
- [ ] 避免内存泄漏

## 安全
- [ ] 输入验证
- [ ] 敏感数据处理
- [ ] 权限检查
- [ ] SQL 注入防护

## 可维护性
- [ ] 代码可读性
- [ ] 命名规范
- [ ] 注释适当
- [ ] 函数长度合理
- [ ] 单一职责

## 测试
- [ ] 单元测试覆盖
- [ ] 边界条件测试
- [ ] 异常情况测试`,
    category: "开发流程",
    tags: ["Code Review", "代码质量"],
  },
  {
    id: "9",
    title: "错误处理规范",
    description: "统一的项目错误处理方式",
    content: `# 错误处理规范

## 错误分类
1. 系统错误: 网络、数据库等
2. 业务错误: 业务逻辑验证
3. 用户错误: 输入验证

## 处理原则
- 区分可恢复和不可恢复错误
- 记录详细错误日志
- 返回有意义的错误信息
- 不暴露敏感信息

## 前端处理
- 统一错误提示
- 友好的错误信息
- 错误重试机制
- 错误上报

## 后端处理
- 使用统一的错误格式
- 合适的 HTTP 状态码
- 错误日志记录
- 异常捕获

## 日志规范
- 记录级别: debug, info, warn, error
- 包含上下文信息
- 脱敏敏感数据`,
    category: "开发流程",
    tags: ["错误处理", "日志", "最佳实践"],
  },
  {
    id: "10",
    title: "测试规范",
    description: "单元测试和集成测试最佳实践",
    content: `# 测试规范

## 测试金字塔
- 单元测试: 70%
- 集成测试: 20%
- E2E 测试: 10%

## 单元测试
### AAA 原则
1. Arrange: 准备测试数据
2. Act: 执行测试操作
3. Assert: 断言结果

### 命名规范
\`\`\`
describe('FunctionName', () => {
  it('should do something specific', () => {});
});
\`\`\`

### 覆盖率要求
- 语句覆盖率: 80%+
- 分支覆盖率: 75%+
- 函数覆盖率: 100%

## 集成测试
- 测试组件交互
- 测试数据流
- Mock 外部依赖

## E2E 测试
- 关键用户路径
- 避免测试过多细节
- 使用真实环境`,
    category: "测试",
    tags: ["测试", "单元测试", "Jest"],
  },
];
