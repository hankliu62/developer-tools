export interface Rule {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  dateAdded?: string;
  stars?: number;
}

export const rules: Rule[] = [
  {
    id: '1',
    title: 'Git 提交规范',
    description: '使用 Conventional Commits 格式规范 Git 提交信息',
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
    category: '版本控制',
    tags: ['Git', '提交规范', 'Conventional Commits'],
    dateAdded: '2024-01-01',
    stars: 15000,
  },
  {
    id: '2',
    title: 'React 组件规范',
    description: 'React 组件开发最佳实践',
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
    category: '前端开发',
    tags: ['React', '组件', '最佳实践'],
    dateAdded: '2024-01-05',
    stars: 12500,
  },
  {
    id: '3',
    title: 'TypeScript 编码规范',
    description: 'TypeScript 项目开发规范',
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
    category: '前端开发',
    tags: ['TypeScript', '类型系统', '最佳实践'],
    dateAdded: '2024-01-10',
    stars: 11800,
  },
  {
    id: '4',
    title: 'RESTful API 设计规范',
    description: 'REST API 设计和命名规范',
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
    category: '后端开发',
    tags: ['REST', 'API', '设计规范'],
    dateAdded: '2024-01-15',
    stars: 13200,
  },
  {
    id: '5',
    title: 'CSS 命名规范',
    description: 'BEM 命名方法和 CSS 组织规范',
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
    category: '前端开发',
    tags: ['CSS', 'BEM', '命名规范'],
    dateAdded: '2024-01-20',
    stars: 9500,
  },
  {
    id: '6',
    title: '数据库设计规范',
    description: '数据库表设计和索引规范',
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
    category: '数据库',
    tags: ['数据库', '索引', '设计规范'],
    dateAdded: '2024-01-25',
    stars: 8800,
  },
  {
    id: '7',
    title: '安全开发规范',
    description: 'Web 应用安全最佳实践',
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
    category: '安全',
    tags: ['安全', 'XSS', 'SQL注入'],
    dateAdded: '2024-01-30',
    stars: 10200,
  },
  {
    id: '8',
    title: '代码审查检查清单',
    description: '代码审查时需要检查的项目',
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
    category: '开发流程',
    tags: ['Code Review', '代码质量'],
    dateAdded: '2024-02-01',
    stars: 7900,
  },
  {
    id: '9',
    title: '错误处理规范',
    description: '统一的项目错误处理方式',
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
    category: '开发流程',
    tags: ['错误处理', '日志', '最佳实践'],
    dateAdded: '2024-02-05',
    stars: 7200,
  },
  {
    id: '10',
    title: '测试规范',
    description: '单元测试和集成测试最佳实践',
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
    category: '测试',
    tags: ['测试', '单元测试', 'Jest'],
    dateAdded: '2024-03-15',
    stars: 8500,
  },
  {
    id: '11',
    title: 'TypeScript 最佳实践',
    description: 'TypeScript 编码规范和最佳实践指南',
    content: `# TypeScript 最佳实践

## 类型定义

### 使用类型推断
\`\`\`typescript
// 好的做法 - 让 TypeScript 推断类型
const name = "Alice";
const numbers = [1, 2, 3];

// 不好的做法 - 不必要的类型注解
const name: string = "Alice";
\`\`\`

### 接口 vs 类型
\`\`\`typescript
// 接口 - 用于对象结构
interface User {
  id: number;
  name: string;
}

// 类型 - 用于联合类型、交叉类型
type Status = "pending" | "active" | "done";
type Admin = User & { role: "admin" };
\`\`\`

## 严格模式

### 启用所有严格检查
\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
\`\`\`

### 空值检查
\`\`\`typescript
// 使用可选链
const name = user?.profile?.name;

// 使用空值合并
const value = data ?? "default";

// 使用类型守卫
if (user) {
  console.log(user.name);
}
\`\`\`

## 泛型

### 约束泛型
\`\`\`typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): void {
  console.log(arg.length);
}
\`\`\`

### 常用泛型模式
\`\`\`typescript
// Promise 类型
async function fetchUser(): Promise<User> {}

// 数组类型
const users: User[] = [];

// 映射类型
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
\`\`\`

## 最佳实践

1. 避免使用 \`any\`，使用 \`unknown\` 代替
2. 优先使用接口定义对象类型
3. 使用类型别名定义联合类型
4. 启用 strict 模式
5. 使用可选链和空值合并运算符
6. 避免类型断言（as）`,
    category: '开发',
    tags: ['TypeScript', '类型', '最佳实践'],
    dateAdded: '2024-03-16',
    stars: 12000,
  },
  {
    id: '12',
    title: 'React Hooks 最佳实践',
    description: 'React Hooks 的正确使用方式和最佳实践',
    content: `# React Hooks 最佳实践

## Hooks 规则

### 只在顶层调用
\`\`\`typescript
// 好的做法 - 在顶层调用
useEffect(() => {
  // ...
}, []);

if (condition) {
  const [value, setValue] = useState(0);
}

// 不好的做法 - 在条件语句中调用
if (condition) {
  const [value, setValue] = useState(0);
}
\`\`\`

### 只在 React 函数中调用
- 在函数组件中
- 在自定义 Hook 中
- 不能在普通函数中调用

## useState 最佳实践

### 多个状态分开管理
\`\`\`typescript
// 好的做法 - 分开管理相关状态
const [name, setName] = useState("");
const [email, setEmail] = useState("");

// 不好的做法 - 合并不相关状态
const [user, setUser] = useState({ name: "", email: "" });
\`\`\`

### 使用函数更新状态
\`\`\`typescript
setCount(prev => prev + 1);
\`\`\`

## useEffect 最佳实践

### 依赖数组
\`\`\`typescript
// 每次渲染都执行
useEffect(() => {});

// 只执行一次（相当于 componentDidMount）
useEffect(() => {}, []);

// 依赖变化时执行
useEffect(() => {}, [dependency]);
\`\`\`

### 清理副作用
\`\`\`typescript
useEffect(() => {
  const subscription = subscribe(id);
  return () => {
    subscription.unsubscribe();
  };
}, [id]);
\`\`\`

### 避免副作用依赖频繁变化的值
\`\`\`typescript
// 使用 ref 存储不需要触发渲染的值
const countRef = useRef(0);
\`\`\`

## useMemo 和 useCallback

### useMemo - 缓存计算结果
\`\`\`typescript
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);
\`\`\`

### useCallback - 缓存函数
\`\`\`typescript
const handleClick = useCallback((id: string) => {
  setSelected(id);
}, []);
\`\`\`

## 自定义 Hook

### 提取逻辑
\`\`\`typescript
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
}
\`\`\`

## 最佳实践

1. 保持 Hooks 调用顺序一致
2. 合理使用依赖数组
3. 使用 useMemo 缓存昂贵计算
4. 使用 useCallback 稳定回调函数
5. 提取重复逻辑到自定义 Hook`,
    category: '前端',
    tags: ['React', 'Hooks', '最佳实践'],
    dateAdded: '2024-03-17',
    stars: 9800,
  },
  {
    id: '13',
    title: 'API 设计规范',
    description: 'RESTful API 设计和命名规范',
    content: `# API 设计规范

## RESTful 原则

### 资源命名
\`\`\`
# 复数形式
GET /users
GET /users/:id
POST /users
PUT /users/:id
DELETE /users/:id

# 嵌套资源
GET /users/:id/posts
GET /users/:id/posts/:postId/comments
\`\`\`

### HTTP 方法
- GET: 获取资源
- POST: 创建资源
- PUT: 完整更新资源
- PATCH: 部分更新资源
- DELETE: 删除资源

## 响应格式

### 成功响应
\`\`\`json
{
  "data": { "id": 1, "name": "Alice" },
  "meta": { "page": 1, "total": 100 }
}
\`\`\`

### 错误响应
\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      { "field": "email", "message": "Invalid format" }
    ]
  }
}
\`\`\`

## 状态码

### 2xx 成功
- 200 OK
- 201 Created
- 204 No Content

### 4xx 客户端错误
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 422 Unprocessable Entity

### 5xx 服务端错误
- 500 Internal Server Error
- 503 Service Unavailable

## 分页

### URL 参数
\`\`\`
GET /users?page=1&limit=20
\`\`\`

### 响应
\`\`\`json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
\`\`\`

## 版本控制

### URL 版本
\`\`\`
GET /api/v1/users
GET /api/v2/users
\`\`\`

## 最佳实践

1. 使用名词而非动词命名资源
2. 保持 URL 简洁
3. 使用复数形式
4. 正确使用 HTTP 方法
5. 保持响应格式一致
6. 使用适当的状态码
7. 实现分页
8. 版本化 API`,
    category: '后端',
    tags: ['API', 'REST', '设计规范'],
    dateAdded: '2024-03-18',
    stars: 7600,
  },
  {
    id: '14',
    title: '代码审查最佳实践',
    description: '高效代码审查的指南和 checklist',
    content: `# 代码审查最佳实践

## 审查原则

### 作为审查者
1. 关注代码正确性而非风格
2. 提供建设性反馈
3. 解释原因而非只说"不好"
4. 认可好的代码

### 作为提交者
1. 保持提交小而专注
2. 编写清晰的提交信息
3. 响应反馈及时
4. 不要把审查当作个人攻击

## 审查清单

### 代码正确性
- [ ] 代码是否正确实现了功能？
- [ ] 是否有明显的 bug？
- [ ] 边界情况是否处理？

### 代码质量
- [ ] 代码是否可读？
- [ ] 是否有重复代码？
- [ ] 是否有不必要的复杂性？
- [ ] 命名是否清晰？

### 错误处理
- [ ] 错误是否被正确处理？
- [ ] 是否有适当的日志？
- [ ] 敏感信息是否泄露？

### 安全性
- [ ] 是否有安全漏洞？
- [ ] 输入是否验证？
- [ ] 敏感数据是否保护？

### 测试
- [ ] 是否有足够的测试？
- [ ] 测试是否覆盖边界情况？

### 性能
- [ ] 是否有性能问题？
- [ ] 是否有不必要的计算？

## 反馈技巧

### 好的反馈
\`\`\`
👍 简洁的实现

💡 可以使用 xxx 方法简化代码

❌ 这里有 bug：xxx 会导致 yyy

❓ 为什么选择这个方案？
\`\`\`

### 避免的反馈
- "这不符合我的风格" - 除非有明确规范
- "可以用更酷的方式" - 简洁优先
- 过于挑剔格式问题 - 让 linter 处理

## 最佳实践

1. 审查及时，不要积压
2. 保持评论建设性
3. 关注重要问题
4. 批准小型改进
5. 使用自动化工具处理格式`,
    category: '开发流程',
    tags: ['Code Review', '代码审查', '最佳实践'],
    dateAdded: '2024-03-19',
    stars: 6500,
  },
  {
    id: '15',
    title: 'Docker 最佳实践',
    description: 'Docker 镜像构建和容器化最佳实践',
    content: `# Docker 最佳实践

## 镜像构建

### 使用多阶段构建
\`\`\`dockerfile
# 构建阶段
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 运行阶段
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
CMD ["node", "dist/index.js"]
\`\`\`

### 减少镜像层数
\`\`\`dockerfile
# 好的做法 - 合并相关命令
RUN npm ci && \
    npm cache clean --force

# 不好的做法 - 分离命令
RUN npm ci
RUN npm cache clean --force
\`\`\`

### 使用 .dockerignore
\`\`\`
node_modules
.git
*.md
.env*
dist
coverage
\`\`\`

## 镜像优化

### 选择合适的基础镜像
\`\`\`dockerfile
# 使用 alpine 版本减小镜像
FROM node:18-alpine

# 使用特定版本避免缓存问题
FROM node:18.17.0-alpine3.18
\`\`\`

### 优化层缓存
\`\`\`dockerfile
# 先复制依赖文件
COPY package*.json ./
RUN npm ci

# 再复制源代码
COPY . .
\`\`\`

## 容器运行

### 以非 root 用户运行
\`\`\`dockerfile
RUN addgroup -g 1001 appgroup && \\
    adduser -u 1001 -G appgroup -s /bin/sh -D appuser
USER appuser
\`\`\`

### 健康检查
\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1
\`\`\`

## 安全最佳实践

1. 定期更新基础镜像
2. 不在镜像中存储敏感信息
3. 使用最小权限用户
4. 扫描镜像漏洞
5. 不要在镜像中运行 SSH

## 最佳实践

1. 使用多阶段构建
2. 减少镜像层数
3. 合理使用 .dockerignore
4. 使用 alpine 基础镜像
5. 以非 root 用户运行
6. 添加健康检查
7. 扫描安全漏洞`,
    category: 'DevOps',
    tags: ['Docker', '容器', '最佳实践'],
    dateAdded: '2024-03-20',
    stars: 8200,
  },
  {
    id: '16',
    title: '数据库设计规范',
    description: '数据库表设计和索引优化指南',
    content: `# 数据库设计规范

## 表设计原则

### 命名规范
\`\`\`sql
-- 表名使用复数、下划线分隔
CREATE TABLE users ();
CREATE TABLE order_items ();

-- 列名使用下划线分隔
user_id
created_at
updated_at
\`\`\`

### 主键设计
\`\`\`sql
-- 优先使用自增 ID
id BIGINT PRIMARY KEY AUTO_INCREMENT;

-- 或使用 UUID
id CHAR(36) PRIMARY KEY DEFAULT (UUID());
\`\`\`

### 时间戳
\`\`\`sql
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
\`\`\`

## 索引设计

### 创建索引
\`\`\`sql
-- 单列索引
CREATE INDEX idx_user_email ON users(email);

-- 复合索引
CREATE INDEX idx_order_user_date ON orders(user_id, created_at);

-- 唯一索引
CREATE UNIQUE INDEX idx_user_email ON users(email);
\`\`\`

### 索引原则
1. 为 WHERE、JOIN、ORDER BY 字段创建索引
2. 避免过多索引（影响写入性能）
3. 遵循最左前缀原则
4. 考虑选择性高的字段

## 规范化

### 范式级别
- 第一范式：原子性，每列不可再分
- 第二范式：消除部分依赖
- 第三范式：消除传递依赖

### 反规范化场景
- 读取频繁写入少
- 需要计算的性能优化
- 避免多表 JOIN

## 查询优化

### 避免全表扫描
\`\`\`sql
-- 不好
SELECT * FROM users WHERE LOWER(name) = 'john';

-- 好
SELECT * FROM users WHERE name = 'John';
-- 确保有索引
\`\`\`

### 使用 EXPLAIN 分析
\`\`\`sql
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';
\`\`\`

## 最佳实践

1. 使用有意义的表名和列名
2. 总是添加 created_at 和 updated_at
3. 为常用查询创建适当索引
4. 避免 SELECT *
5. 使用参数化查询防 SQL 注入
6. 定期清理无用数据
7. 做好数据备份`,
    category: '后端',
    tags: ['数据库', 'SQL', '设计规范'],
    dateAdded: '2024-03-21',
    stars: 7100,
  },
  {
    id: '17',
    title: 'CSS 命名规范',
    description: 'BEM 命名规范和 CSS 组织方式',
    content: `# CSS 命名规范

## BEM 命名

### 块（Block）
\`\`\`css
.block { }
\`\`\`

### 元素（Element）
\`\`\`css
.block__element { }
\`\`\`

### 修饰符（Modifier）
\`\`\`css
.block--modifier { }
.block__element--modifier { }
\`\`\`

### 示例
\`\`\`html
<button class="btn btn--primary btn--large">
  <span class="btn__text">Click me</span>
</button>
\`\`\`

\`\`\`css
.btn {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.btn--primary {
  background: blue;
  color: white;
}

.btn--large {
  padding: 15px 30px;
  font-size: 18px;
}

.btn__text {
  font-weight: bold;
}
\`\`\`

## 其他命名方式

### 连字符命名
\`\`\`css
.my-component { }
.my-component-inner { }
.my-component-inner-box { }
\`\`\`

### 驼峰命名
\`\`\`css
.myComponent { }
.myComponentInner { }
\`\`\`

## CSS 组织

### 按组件组织
\`\`\`css
/* button.css */
.btn { }
.btn--primary { }

/* card.css */
.card { }
.card__header { }
.card__body { }
\`\`\`

### 使用 CSS Modules
\`\`\`typescript
import styles from './Button.module.css';

<button className={styles.btn}>Click</button>
\`\`\`

## 最佳实践

1. 使用 BEM 或一致的命名规范
2. 避免使用 ID 选择器
3. 使用类选择器而非元素选择器
4. 保持选择器简短
5. 使用 CSS Modules 或 scoped CSS
6. 避免 !important
7. 使用 CSS 变量管理主题`,
    category: '前端',
    tags: ['CSS', 'BEM', '命名规范'],
    dateAdded: '2024-03-22',
    stars: 5800,
  },
  {
    id: '18',
    title: '错误处理最佳实践',
    description: '前端和后端错误处理策略',
    content: `# 错误处理最佳实践

## 原则

### 错误分类
1. **可预期错误** - 网络失败、验证失败
2. **编程错误** - Bug、空指针
3. **业务错误** - 权限不足、余额不足

### 处理策略
- 可预期错误：友好提示用户
- 编程错误：上报监控系统
- 业务错误：提示用户解决方案

## 前端错误处理

### Try-Catch
\`\`\`typescript
try {
  const result = await riskyOperation();
} catch (error) {
  if (error instanceof NetworkError) {
    showToast("网络连接失败");
  } else if (error instanceof ValidationError) {
    showValidationErrors(error.fields);
  } else {
    reportError(error);
    showToast("操作失败，请重试");
  }
}
\`\`\`

### 边界错误处理
\`\`\`typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    reportError(error, errorInfo);
  }
  
  render() {
    return this.props.children;
  }
}
\`\`\`

## 后端错误处理

### 统一错误响应
\`\`\`typescript
class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string
  ) {
    super(message);
  }
}

// 使用
throw new ApiError(400, 'VALIDATION_ERROR', 'Invalid input');
\`\`\`

### 中间件处理
\`\`\`typescript
app.use((err, req, res, next) => {
  logger.error(err);
  
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message
      }
    });
  }
  
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: '服务器错误'
    }
  });
});
\`\`\`

## 日志记录

### 结构化日志
\`\`\`typescript
logger.info('User action', {
  userId: user.id,
  action: 'create_order',
  orderId: order.id,
  duration: endTime - startTime
});
\`\`\`

## 最佳实践

1. 不要吞掉错误
2. 提供有意义的错误信息
3. 区分错误类型处理
4. 记录错误日志
5. 上报关键错误到监控系统
6. 给用户友好的错误提示`,
    category: '开发',
    tags: ['错误处理', '异常', '最佳实践'],
    dateAdded: '2024-03-23',
    stars: 6300,
  },
  {
    id: '19',
    title: '性能优化指南',
    description: '前端性能优化技巧和指标',
    content: `# 性能优化指南

## 核心 Web 指标

### LCP (最大内容绘制)
- 目标: < 2.5s
- 优化: 优化服务器响应、减少 CSS 阻塞

### FID (首次输入延迟)
- 目标: < 100ms
- 优化: 减少 JS 执行时间、代码分割

### CLS (累积布局偏移)
- 目标: < 0.1
- 优化: 设置图片尺寸、避免动态插入内容

## 图片优化

### 格式选择
\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="描述">
</picture>
\`\`\`

### 响应式图片
\`\`\`html
<img 
  srcset="img-400.jpg 400w, img-800.jpg 800w"
  sizes="(max-width: 600px) 400px, 800px"
  src="img-800.jpg"
  loading="lazy"
  alt="描述"
>
\`\`\`

## 代码优化

### 代码分割
\`\`\`typescript
// 动态导入
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

// 路由级别分割
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
\`\`\`

### Tree Shaking
\`\`\`javascript
// 好 - 使用 ES 模块
import { cloneDeep } from 'lodash';

// 不好 - 导入整个库
import _ from 'lodash';
\`\`\`

## 缓存策略

### 静态资源
\`\`\`
Cache-Control: public, max-age=31536000, immutable
\`\`\`

### API 响应
\`\`\`
Cache-Control: no-cache
\`\`\`

## React 优化

### React.memo
\`\`\`typescript
const Button = React.memo(({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
});
\`\`\`

### useMemo / useCallback
\`\`\`typescript
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

const handleClick = useCallback((id) => {
  setSelected(id);
}, []);
\`\`\`

## 最佳实践

1. 监控核心 Web 指标
2. 优化图片格式和大小
3. 使用代码分割
4. 实现缓存策略
5. 使用 React.memo 避免不必要渲染
6. 延迟加载非关键资源`,
    category: '性能',
    tags: ['性能优化', 'Web Vitals', '最佳实践'],
    dateAdded: '2024-03-24',
    stars: 8900,
  },
  {
    id: '20',
    title: 'Git 工作流',
    description: 'Git 分支管理策略和工作流',
    content: `# Git 工作流

## 分支策略

### Git Flow
- main: 生产环境代码
- develop: 开发主分支
- feature/*: 功能分支
- release/*: 发布分支
- hotfix/*: 紧急修复分支

### 简化工作流
- main: 主分支
- develop: 开发分支
- feature/*: 功能分支

## 分支命名

### 功能分支
\`\`\`
feature/user-authentication
feature/add-shopping-cart
\`\`\`

### 修复分支
\`\`\`
bugfix/login-issue
hotfix/security-patch
\`\`\`

### 发布分支
\`\`\`
release/v1.0.0
\`\`\`

## 提交规范

### 提交信息格式
\`\`\`
feat(auth): add OAuth login support
fix(ui): resolve button alignment issue
docs: update API documentation
refactor(payment): simplify transaction logic
test: add unit tests for user service
\`\`\`

### 提交粒度
- 每个提交只做一件事
- 提交信息描述 what 和 why
- 保持提交小而专注

## 常用命令

### 创建分支
\`\`\`bash
git checkout -b feature/new-feature
\`\`\`

### 合并分支
\`\`\`bash
git checkout main
git merge feature/new-feature
\`\`\`

### 变基（Rebase）
\`\`\`bash
git checkout feature/new-feature
git rebase main
\`\`\`

## 最佳实践

1. 使用功能分支工作流
2. 保持 main 分支可部署
3. 定期从 main 变基
4. 使用有意义的提交信息
5. 小而频繁的提交
6. 删除已合并的分支`,
    category: '版本控制',
    tags: ['Git', '分支策略', '工作流'],
    dateAdded: '2024-03-25',
    stars: 7400,
  },
  {
    id: '21',
    title: 'Clean Code 最佳实践',
    description: '编写清晰、可维护代码的原则和技巧',
    content: `# Clean Code 最佳实践

## 命名规范

### 变量命名
\`\`\`typescript
// 好的命名
const activeUsers = [];
const maxRetryCount = 3;

// 避免
const data = [];
const temp = 3;
\`\`\`

### 函数命名
\`\`\`typescript
// 好的命名
function calculateTotalPrice() {}
function validateUserInput() {}

// 避免
function calc() {}
function check() {}
\`\`\`

### 类命名
\`\`\`typescript
class UserService {}
class PaymentProcessor {}
class OrderRepository {}
\`\`\`

## 函数原则

### 单一职责
\`\`\`typescript
// 好的做法 - 一个函数做一件事
function validateEmail(email: string): boolean {}
function sendEmail(to: string, subject: string) {}

// 避免 - 多个职责
function validateAndSendEmail(email: string) {}
\`\`\`

### 参数数量
- 最少越好，最好 0-2 个
- 超过 3 个考虑封装对象

### 函数体长度
- 保持在 20 行以内
- 超过考虑拆分

## 代码结构

### 导入顺序
\`\`\`typescript
// 1. React/框架
import React from 'react';

// 2. 第三方库
import { useState, useEffect } from 'react';
import axios from 'axios';

// 3. 内部模块
import { UserService } from '@/services';
import { UserCard } from '@/components';

// 4. 类型
import type { User } from '@/types';

// 5. 样式
import styles from './index.module.css';
\`\`\`

### 常量提取
\`\`\`typescript
// 好的做法
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const API_BASE_URL = 'https://api.example.com';

// 避免
if (file.size > 10485760) {}
\`\`\`

## 注释规范

### 好的注释
- 解释为什么，而不是做什么
- 解释复杂的业务逻辑
- TODO 和 FIXME 标记

### 避免的注释
- 解释显而易见的代码
- 过时的注释
- 注释掉的代码

## 错误处理

\`\`\`typescript
// 好的做法
try {
  await processData();
} catch (error) {
  logger.error('处理数据失败', { error });
  throw new AppError('处理失败');
}

// 避免
try {
  await processData();
} catch (error) {
  console.log(error);
}
\`\`\`

## 最佳实践

1. 保持函数短小单一
2. 使用有意义的命名
3. 减少嵌套层级
4. 提前返回避免嵌套
5. 使用解释性变量
6. 移除重复代码
7. 保持代码格式一致`,
    category: '开发',
    tags: ['Clean Code', '代码质量', '最佳实践'],
    dateAdded: '2024-03-26',
    stars: 11200,
  },
  {
    id: '22',
    title: '设计模式',
    description: '常见设计模式及 TypeScript 实现',
    content: `# 设计模式

## 创建型模式

### 单例模式
\`\`\`typescript
class Singleton {
  private static instance: Singleton;
  
  private constructor() {}
  
  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}
\`\`\`

### 工厂模式
\`\`\`typescript
interface Product {
  operation(): string;
}

class ConcreteProductA implements Product {
  operation() { return 'Product A'; }
}

class ConcreteProductB implements Product {
  operation() { return 'Product B'; }
}

class Factory {
  createProduct(type: 'A' | 'B'): Product {
    switch (type) {
      case 'A': return new ConcreteProductA();
      case 'B': return new ConcreteProductB();
    }
  }
}
\`\`\`

## 结构型模式

### 装饰器模式
\`\`\`typescript
class Coffee {
  cost() { return 5; }
}

class MilkDecorator {
  constructor(private coffee: Coffee) {}
  cost() { return this.coffee.cost() + 1; }
}

class SugarDecorator {
  constructor(private coffee: Coffee) {}
  cost() { return this.coffee.cost() + 0.5; }
}
\`\`\`

### 代理模式
\`\`\`typescript
interface Image {
  display(): void;
}

class RealImage implements Image {
  constructor(private filename: string) {
    this.loadFromDisk();
  }
  display() { console.log('Displaying', this.filename); }
  private loadFromDisk() { /* 加载图片 */ }
}

class ProxyImage implements Image {
  private realImage: RealImage | null = null;
  constructor(private filename: string) {}
  display() {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}
\`\`\`

## 行为型模式

### 观察者模式
\`\`\`typescript
class EventEmitter {
  private listeners: Map<string, Function[]> = new Map();
  
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }
  
  emit(event: string, data: any) {
    this.listeners.get(event)?.forEach(cb => cb(data));
  }
}
\`\`\`

### 策略模式
\`\`\`typescript
interface PaymentStrategy {
  pay(amount: number): Promise<void>;
}

class CreditCardPayment implements PaymentStrategy {
  pay(amount: number) { /* 信用卡支付 */ }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number) { /* PayPal 支付 */ }
}

class ShoppingCart {
  constructor(private strategy: PaymentStrategy) {}
  
  async checkout(amount: number) {
    await this.strategy.pay(amount);
  }
}
\`\`\`

## 最佳实践

1. 理解问题本质再选择模式
2. 避免过度设计
3. 优先使用简单方案
4. 考虑可测试性
5. 记住模式背后的原则`,
    category: '架构',
    tags: ['设计模式', '架构', '最佳实践'],
    dateAdded: '2024-03-27',
    stars: 9500,
  },
  {
    id: '23',
    title: 'Redis 最佳实践',
    description: 'Redis 使用场景和性能优化指南',
    content: `# Redis 最佳实践

## 数据结构选择

### String
- 缓存简单值
- 计数器
- 限流

### Hash
- 存储对象
- 购物车数据

### List
- 消息队列
- 最新列表

### Set
- 标签系统
- 好友关系
- 去重

### Sorted Set
- 排行榜
- 延迟队列

## 键命名规范
\`\`\`
# 格式: 项目:模块:业务:具体值
user:profile:12345
order:list:user:12345
cache:product:info:67890
\`\`\`

## 过期策略

### 设置过期时间
\`\`\`typescript
// 设置 1 小时过期
await redis.expire('key', 3600);

// 设置具体时间点过期
await redis.expireat('key', timestamp);
\`\`\`

### 避免大量键同时过期
- 添加随机偏移量
- 使用 Range 逐步过期

## 性能优化

### Pipeline 批量操作
\`\`\`typescript
// 好的做法
const pipeline = redis.pipeline();
for (const key of keys) {
  pipeline.get(key);
}
const results = await pipeline.exec();

// 避免
for (const key of keys) {
  await redis.get(key);
}
\`\`\`

### Lua 脚本
\`\`\`typescript
const luaScript = \`
  local current = redis.call('GET', KEYS[1])
  if current == false or tonumber(current) < tonumber(ARGV[1]) then
    redis.call('SET', KEYS[1], ARGV[1])
    return 1
  end
  return 0
\`;
await redis.eval(luaScript, 1, 'counter', '100');
\`\`\`

## 内存优化

### 压缩数据
\`\`\`typescript
// 对于大字符串使用压缩
const compressed = zlib.deflateSync(data);
await redis.set('key', compressed);
\`\`\`

### 合理选择数据结构
- 少量数据用 String 存储对象 JSON
- 大量相关数据用 Hash

## 缓存策略

### Cache-Aside
\`\`\`typescript
async function getUser(id) {
  const cacheKey = \`user:\${id}\`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  const user = await db.user.findById(id);
  await redis.setex(cacheKey, 3600, JSON.stringify(user));
  return user;
}
\`\`\`

## 最佳实践

1. 键使用有意义的命名
2. 设置合理的过期时间
3. 使用 Pipeline 批量操作
4. 避免大 Value
5. 做好熔断降级
6. 监控内存使用`,
    category: '后端',
    tags: ['Redis', '缓存', '最佳实践'],
    dateAdded: '2024-03-28',
    stars: 7800,
  },
  {
    id: '24',
    title: 'GraphQL 设计规范',
    description: 'GraphQL API 设计和最佳实践',
    content: `# GraphQL 设计规范

## Schema 设计

### 命名规范
\`\`\`graphql
# 类型使用 PascalCase
type User { ... }

# 字段使用 camelCase
type User {
  firstName: String!
  lastName: String!
}

# Query/Mutation 使用 PascalCase
type Query {
  user(id: ID!): User
  users: [User!]!
}
\`\`\`

### 字段设计
\`\`\`graphql
# 好的设计
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
  createdAt: DateTime!
}

# 避免过度嵌套
type Post {
  author: User!  # 而非 author: AuthorDetail
}
\`\`\`

## 查询设计

### 使用 Fragment
\`\`\`graphql
fragment UserFields on User {
  id
  name
  email
}

query {
  user(id: "1") {
    ...UserFields
  }
}
\`\`\`

### 避免 N+1 问题
\`\`\`typescript
// DataLoader 批量加载
const userLoader = new DataLoader(async (ids) => {
  const users = await db.users.findByIds(ids);
  return ids.map(id => users.find(u => u.id === id));
});
\`\`\`

## Mutation 设计

### 命名规范
\`\`\`graphql
# 使用动词前缀
createUser(input: CreateUserInput!): User!
updateUser(id: ID!, input: UpdateUserInput!): User!
deleteUser(id: ID!): Boolean!

# 批量操作
createUsers(input: [CreateUserInput!]!): [User!]!
\`\`\`

### Input 类型
\`\`\`graphql
input CreateUserInput {
  name: String!
  email: String!
  profile: CreateProfileInput
}
\`\`\`

## 错误处理

\`\`\`graphql
type Error {
  code: String!
  message: String!
  field: String
}

type CreateUserPayload {
  user: User
  errors: [Error!]!
}
\`\`\`

## 分页设计

### Connection 模式
\`\`\`graphql
type UserConnection {
  edges: [UserEdge!]!
  pageInfo: PageInfo!
}

type UserEdge {
  cursor: String!
  node: User!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}
\`\`\`

## 最佳实践

1. 遵循命名规范
2. 使用非空约束
3. 避免深度嵌套查询
4. 实现 DataLoader 解决 N+1
5. 合理使用分页
6. 做好错误处理
7. 版本化 API`,
    category: '后端',
    tags: ['GraphQL', 'API', '最佳实践'],
    dateAdded: '2024-03-29',
    stars: 8200,
  },
  {
    id: '25',
    title: 'CI/CD 最佳实践',
    description: '持续集成和持续部署流程指南',
    content: `# CI/CD 最佳实践

## CI 流程

### 提交阶段检查
\`\`\`yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install dependencies
        run: npm ci
        
      - name: Lint
        run: npm run lint
        
      - name: Type check
        run: npm run typecheck
        
      - name: Test
        run: npm run test -- --coverage
        
      - name: Build
        run: npm run build
\`\`\`

### 分支保护规则
1. 需要 PR 才能合并
2. 需要通过 CI 检查
3. 需要代码审查
4. 需要状态检查通过

## CD 流程

### 部署流程
\`\`\`yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build and Deploy
        run: |
          npm ci
          npm run build
          npm run deploy:production
\`\`\`

## 环境管理

### 环境配置
\`\`\`
development -> staging -> production
\`\`\`

### 秘钥管理
- 使用 Secrets Manager
- 不要提交到代码仓库
- 运行时注入环境变量

## 部署策略

### 蓝绿部署
- 维护两套环境
- 切换流量完成部署
- 快速回滚

### 滚动更新
- 逐步替换实例
- 无 downtime
- 逐步验证

### 金丝雀发布
- 先部署到小部分用户
- 监控指标
- 逐步扩大范围

## 最佳实践

1. 保持 CI 流程快速
2. 自动化所有检查
3. 小而频繁的提交
4. 使用特性开关
5. 做好回滚方案
6. 监控部署过程
7. 记录部署日志`,
    category: 'DevOps',
    tags: ['CI/CD', 'DevOps', '最佳实践'],
    dateAdded: '2024-03-30',
    stars: 8600,
  },
  {
    id: '26',
    title: '日志规范',
    description: '日志记录最佳实践和规范',
    content: `# 日志规范

## 日志级别

### DEBUG
- 详细信息
- 开发调试使用
- 生产环境关闭
\`\`\`typescript
logger.debug('Processing request', { requestId, payload });
\`\`\`

### INFO
- 正常业务流程
- 重要事件记录
\`\`\`typescript
logger.info('User logged in', { userId, ip });
logger.info('Order created', { orderId, amount });
\`\`\`

### WARN
- 潜在问题
- 需要关注但非错误
\`\`\`typescript
logger.warn('Rate limit approaching', { userId, count });
logger.warn('Deprecated API called', { endpoint });
\`\`\`

### ERROR
- 错误和异常
- 需要立即处理
\`\`\`typescript
logger.error('Payment failed', { orderId, error: error.message });
\`\`\`

## 日志内容

### 结构化日志
\`\`\`typescript
// 好的做法
logger.info('Order processed', {
  orderId: '12345',
  userId: 'user_001',
  amount: 99.99,
  currency: 'USD',
  processingTime: 1250,
  status: 'success'
});
\`\`\`

### 避免的内容
- 敏感信息（密码、Token）
- 大量重复数据
- 无关业务信息

## 上下文信息

\`\`\`typescript
// 添加请求上下文
const logger = child({
  requestId: uuid(),
  userId: user?.id,
  ip: request.ip,
  userAgent: request.headers['user-agent']
});
\`\`\`

## 日志位置

### 服务端
\`\`\`typescript
// API 请求日志
logger.info('API Request', {
  method: req.method,
  path: req.path,
  query: req.query,
  duration: Date.now() - startTime
});
\`\`\`

### 业务日志
\`\`\`typescript
// 业务事件
logger.info('Business Event', {
  event: 'user.registered',
  userId: user.id,
  source: 'web'
});
\`\`\`

## 最佳实践

1. 统一日志格式
2. 使用合适的日志级别
3. 记录结构化数据
4. 添加上下文信息
5. 避免敏感信息
6. 合理控制日志量
7. 做好日志轮转
8. 集中日志收集`,
    category: '后端',
    tags: ['日志', '监控', '最佳实践'],
    dateAdded: '2024-03-31',
    stars: 6800,
  },
  {
    id: '27',
    title: '响应式设计',
    description: '移动优先的响应式设计指南',
    content: `# 响应式设计

## 断点选择
\`\`\`css
/* 移动优先 */
.container {
  width: 100%;
  padding: 0 16px;
}

/* 小屏幕 */
@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

/* 中屏幕 */
@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

/* 大屏幕 */
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

/* 超大屏幕 */
@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
\`\`\`

## 移动优先原则

### 基础样式（移动端）
\`\`\`css
/* 默认样式针对移动端 */
.sidebar {
  display: none;
  width: 250px;
}

.main-content {
  width: 100%;
}
\`\`\`

### 平板及以上
\`\`\`css
@media (min-width: 768px) {
  .sidebar {
    display: block;
  }
  .main-content {
    width: calc(100% - 250px);
  }
}
\`\`\`

## 弹性图片
\`\`\`css
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* 响应式图片 */
<picture>
  <source media="(min-width: 1024px)" srcset="large.jpg">
  <source media="(min-width: 768px)" srcset="medium.jpg">
  <img src="small.jpg" alt="描述">
</picture>
\`\`\`

## 触摸优化

### 触摸目标
\`\`\`css
/* 最小 44x44 像素 */
button,
a,
.clickable {
  min-height: 44px;
  min-width: 44px;
  padding: 12px;
}
\`\`\`

### 禁用缩放
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
\`\`\`

## 布局模式

### Flexbox
\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
\`\`\`

### Grid
\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
\`\`\`

## 最佳实践

1. 移动优先设计
2. 使用相对单位（rem, em, %）
3. 弹性图片和视频
4. 触摸目标足够大
5. 测试真实设备
6. 考虑横屏模式
7. 性能优化
8. 渐进增强`,
    category: '前端',
    tags: ['响应式', 'CSS', '移动端'],
    dateAdded: '2024-04-01',
    stars: 7200,
  },
  {
    id: '28',
    title: '消息队列最佳实践',
    description: '消息队列使用场景和设计指南',
    content: `# 消息队列最佳实践

## 使用场景

### 异步处理
- 邮件发送
- 短信通知
- 推送消息

### 系统解耦
- 服务间通信
- 事件驱动架构
- 分布式事务

### 流量削峰
- 订单处理
- 抢票系统
- 秒杀活动

## 队列设计

### 命名规范
\`\`\`
# 格式: 项目.模块.操作
order.created
payment.processed
user.registered
notification.email
\`\`\`

### 消息结构
\`\`\`typescript
interface Message<T> {
  id: string;
  type: string;
  payload: T;
  timestamp: number;
  retryCount: number;
  headers: Record<string, string>;
}
\`\`\`

## 消费者设计

### 幂等性处理
\`\`\`typescript
async function processMessage(message) {
  // 检查是否已处理
  const processed = await redis.exists(\`processed:\${message.id}\`);
  if (processed) {
    logger.info('Message already processed', { id: message.id });
    return;
  }
  
  // 处理业务
  await doBusiness(message);
  
  // 标记已处理
  await redis.setex(\`processed:\${message.id}\`, 86400, '1');
}
\`\`\`

### 重试机制
\`\`\`typescript
async function handleMessage(message) {
  try {
    await processMessage(message);
  } catch (error) {
    if (message.retryCount < 3) {
      // 延迟重试
      await delay(message.retryCount * 1000);
      await message.requeue({ retryCount: message.retryCount + 1 });
    } else {
      // 发送到死信队列
      await message.sendToDlq();
    }
  }
}
\`\`\`

## 最佳实践

1. 消息持久化
2. 消费者幂等
3. 合理设置重试
4. 死信队列处理
5. 监控队列积压
6. 消息顺序性处理
7. 避免消息过大
8. 做好容量规划`,
    category: '后端',
    tags: ['消息队列', '异步', '最佳实践'],
    dateAdded: '2024-04-02',
    stars: 7500,
  },
  {
    id: '29',
    title: '监控与告警',
    description: '系统监控和告警策略设计',
    content: `# 监控与告警

## 监控指标

### 基础设施监控
- CPU 使用率
- 内存使用
- 磁盘 I/O
- 网络流量

### 应用监控
- 请求延迟
- 错误率
- 吞吐量
- 并发数

### 业务监控
- 订单量
- 转化率
- 活跃用户
- 收入

## 指标采集

### Prometheus 指标
\`\`\`typescript
import { Counter, Histogram } from 'prom-client';

const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'path', 'status']
});

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'path'],
  buckets: [0.1, 0.5, 1, 2, 5]
});
\`\`\`

## 告警策略

### 告警级别
- P1: 紧急 - 服务不可用
- P2: 高 - 功能受损
- P3: 中 - 性能下降
- P4: 低 - 需要关注

### 告警规则
\`\`\`yaml
groups:
  - name: service
    rules:
      - alert: HighErrorRate
        expr: sum(rate(http_requests_total{status=~"5.."}[5m])) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "高错误率告警"
          
      - alert: HighLatency
        expr: histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m]))) > 2
        for: 5m
        labels:
          severity: warning
\`\`\`

## 可观测性

### 日志聚合
- 结构化日志
- 统一格式
- 集中存储

### 链路追踪
\`\`\`typescript
import { trace, SpanStatusCode } from '@opentelemetry/api';

function handleRequest(req, res) {
  const span = trace.getTracer('service').startSpan('handleRequest');
  try {
    await processRequest(req);
    span.setStatus({ code: SpanStatusCode.OK });
  } catch (error) {
    span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
    throw error;
  } finally {
    span.end();
  }
}
\`\`\`

## 最佳实践

1. 全面监控覆盖
2. 合理的告警阈值
3. 避免告警风暴
4. 告警分级处理
5. 值班轮换
6. 告警收敛
7. 持续优化
8. 应急响应流程`,
    category: 'DevOps',
    tags: ['监控', '告警', '可观测性'],
    dateAdded: '2024-04-03',
    stars: 6900,
  },
  {
    id: '30',
    title: '微服务架构',
    description: '微服务设计和拆分原则',
    content: `# 微服务架构

## 服务拆分

### 拆分原则
- 单一职责
- 业务边界清晰
- 独立部署
- 独立数据库

### 拆分粒度
- 不是越小越好
- 考虑团队规模
- 考虑业务复杂度

## 服务通信

### 同步通信 - REST
\`\`\`typescript
// 服务 A 调用服务 B
async function getUserWithOrders(userId: string) {
  const user = await fetch(\`http://user-service/users/\${userId}\`)
    .then(res => res.json());
  
  const orders = await fetch(\`http://order-service/orders?userId=\${userId}\`)
    .then(res => res.json());
    
  return { user, orders };
}
\`\`\`

### 异步通信 - 消息队列
\`\`\`typescript
// 发布事件
await eventBus.publish('order.created', {
  orderId: '123',
  userId: '456',
  amount: 99.99,
  timestamp: Date.now()
});

// 订阅事件
eventBus.subscribe('order.created', async (event) => {
  await notificationService.sendEmail(event.userId, 'Order created');
  await analyticsService.track('order_created', event);
});
\`\`\`

## 服务发现

### 健康检查
\`\`\`yaml
# K8s 健康检查
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
\`\`\`

## 分布式事务

### Saga 模式
\`\`\`typescript
async function placeOrder(order) {
  // 1. 创建订单
  await orderService.create(order);
  
  // 2. 预留库存 (补偿: 释放库存)
  try {
    await inventoryService.reserve(order.items);
  } catch {
    await orderService.cancel(order.id);
    throw new Error('库存不足');
  }
  
  // 3. 扣款 (补偿: 退款)
  try {
    await paymentService.charge(order.userId, order.amount);
  } catch {
    await inventoryService.release(order.items);
    await orderService.cancel(order.id);
    throw new Error('支付失败');
  }
  
  // 4. 完成订单
  await orderService.complete(order.id);
}
\`\`\`

## 最佳实践

1. 合理拆分服务
2. 服务独立部署
3. 使用 API 网关
4. 服务健康检查
5. 分布式追踪
6. 熔断降级
7. 配置中心
8. 监控告警`,
    category: '架构',
    tags: ['微服务', '分布式', '架构'],
    dateAdded: '2024-04-04',
    stars: 9200,
  },
  {
    id: '31',
    title: '时间管理法则',
    description: '提高效率和专注力的时间管理方法',
    content: `# 时间管理法则

## 重要 vs 紧急

### 艾森豪威尔矩阵
- **重要且紧急**：立即处理
- **重要不紧急**：计划处理
- **紧急不重要**：委托他人
- **不紧急不重要**：尽量避免

### 时间分配
- 每天 2-3 小时处理最重要的事
- 留出缓冲时间应对意外
- 避免过度计划

## 专注力管理

### 番茄工作法
- 25 分钟专注工作
- 5 分钟休息
- 每 4 个番茄钟长休息 15-30 分钟

### 单任务原则
- 一次只做一件事
- 减少任务切换
- 深度工作 > 碎片工作

## 能量管理

### 生理节律
- 上午：处理复杂任务
- 下午：处理常规任务
- 晚间：复盘和计划

### 休息质量
- 每小时起身活动
- 每天 7-8 小时睡眠
- 定期运动保持精力

## 最佳实践

1. 每天早晨吃掉最大的青蛙（最难的事）
2. 重要的事要留出整块时间
3. 定期复盘时间使用情况
4. 学会说"不"保护时间
5. 善用工具提高效率`,
    category: '个人成长',
    tags: ['时间管理', '效率', '自我提升'],
    dateAdded: '2024-04-05',
    stars: 15000,
  },
  {
    id: '32',
    title: '健康生活指南',
    description: '保持身心健康的日常习惯',
    content: `# 健康生活指南

## 睡眠质量

### 睡眠时长
- 成年人 7-9 小时
- 保持规律作息
- 周末不要大幅补觉

### 睡眠环境
- 黑暗、安静、凉爽
- 睡前 1 小时远离电子设备
- 固定时间就寝和起床

## 饮食习惯

### 均衡营养
- 蛋白质：每餐适量
- 碳水：选择复杂碳水
- 脂肪：优质脂肪为主
- 蔬菜：占餐盘一半

### 饮水习惯
- 每天 1.5-2L 水
- 运动前后补充水分
- 少喝含糖饮料

## 运动习惯

### 每周运动
- 150 分钟中等强度
- 或 75 分钟高强度
- 包含力量训练

### 日常活动
- 站立式办公
- 走楼梯代替电梯
- 站立或走动休息

## 心理健康

### 压力管理
- 定期冥想或深呼吸
- 培养兴趣爱好
- 保持社交联系

### 情绪调节
- 接纳负面情绪
- 及时表达和释放
- 寻求专业帮助

## 最佳实践

1. 定期体检
2. 保持体重在健康范围
3. 戒烟限酒
4. 保护视力
5. 定期运动`,
    category: '健康',
    tags: ['健康', '养生', '生活方式'],
    dateAdded: '2024-04-06',
    stars: 12800,
  },
  {
    id: '33',
    title: '财务自由之路',
    description: '个人理财和财富积累原则',
    content: `# 财务自由之路

## 预算管理

### 50/30/20 法则
- 50% 必要支出（房租、食物、交通）
- 30% 可选支出（娱乐、购物）
- 20% 储蓄和投资

### 追踪支出
- 记录每一笔支出
- 每月分析消费习惯
- 识别并削减不必要开支

## 储蓄策略

### 紧急基金
- 3-6 个月生活费用
- 存放在流动性好的账户
- 不用于投资或消费

### 自动储蓄
- 工资到账自动转账
- 先存后花
- 定期检查储蓄进度

## 投资原则

### 分散风险
- 资产配置多元化
- 不把鸡蛋放一个篮子
- 定期平衡配置

### 长期投资
- 坚持定投
- 忽略短期波动
- 复利效应

### 投资自己
- 提升技能增加收入
- 保持竞争力
- 投资健康

## 债务管理

### 债务优先级
- 高息债务优先偿还
- 避免新增消费债务
- 善用低息贷款

### 信用卡使用
- 全额还款避免利息
- 警惕过度消费
- 善用免息期

## 最佳实践

1. 尽早开始理财
2. 保持理性消费
3. 持续学习投资知识
4. 定期检视财务状况
5. 规划退休储蓄`,
    category: '理财',
    tags: ['理财', '财务', '投资'],
    dateAdded: '2024-04-07',
    stars: 14500,
  },
  {
    id: '34',
    title: '人际关系法则',
    description: '建立和维护健康的人际关系',
    content: `# 人际关系法则

## 沟通原则

### 倾听优先
- 真正听懂对方意思
- 不打断他人说话
- 复述确认理解

### 表达技巧
- 使用"我"开头的句子
- 具体而非抽象
- 避免指责和攻击

### 非语言沟通
- 保持眼神接触
- 注意肢体语言
- 适当微笑和点头

## 边界设定

### 个人边界
- 明确自己的底线
- 学会拒绝
- 尊重他人边界

### 亲密关系
- 保持独立人格
- 尊重私人空间
- 给予信任和支持

## 关系维护

### 亲情
- 定期联系家人
- 主动表达关心
- 珍惜相处时光

### 友情
- 主动维护友谊
- 真诚相待
- 适度保持联系

### 爱情
- 相互尊重理解
- 保持独立空间
- 共同成长

## 社交礼仪

### 基本礼节
- 守时守信
- 尊重他人隐私
- 感谢他人帮助

### 线上礼仪
- 尊重他人时间
- 避免群发打扰
- 保护他人隐私

## 最佳实践

1. 真诚待人
2. 换位思考
3. 学会原谅
4. 适度付出
5. 定期检视关系`,
    category: '人际关系',
    tags: ['社交', '沟通', '人脉'],
    dateAdded: '2024-04-08',
    stars: 11200,
  },
  {
    id: '35',
    title: '学习成长法则',
    description: '持续学习和个人成长的方法',
    content: `# 学习成长法则

## 学习方法

### 主动学习
- 带着问题学习
- 实践出真知
- 教是最好的学

### 刻意练习
- 专注薄弱环节
- 及时反馈改进
- 持续突破舒适区

### 知识体系
- 建立知识网络
- 定期复盘总结
- 输出倒逼输入

## 阅读习惯

### 选书原则
- 经典优先
- 主题阅读
- 适合自己的难度

### 阅读方法
- 速读把握框架
- 精读核心内容
- 做笔记和思考

### 阅读量
- 每周 1-2 本
- 保持阅读习惯
- 多元化阅读

## 技能提升

### 核心技能
- 写作能力
- 表达能力
- 思考能力
- 学习能力

### 跨界能力
- 了解其他领域
- 培养创造力
- 保持好奇心

## 习惯养成

### 微习惯
- 从小开始
- 保持连续
- 逐步增量

### 习惯回路
- 触发：明确提示
- 行为：具体动作
- 奖励：正向反馈

## 最佳实践

1. 设定明确目标
2. 保持好奇心
3. 拥抱失败
4. 定期自省
5. 终身学习`,
    category: '个人成长',
    tags: ['学习', '成长', '习惯'],
    dateAdded: '2024-04-09',
    stars: 13500,
  },
  {
    id: '36',
    title: '情绪管理指南',
    description: '认识和管理情绪的方法',
    content: `# 情绪管理指南

## 情绪认知

### 情绪类型
- 基本情绪：喜、怒、哀、惧
- 复合情绪：焦虑、愧疚、羡慕
- 识别自身情绪模式

### 情绪来源
- 触发事件
- 认知解读
- 身体状态
- 过往经历

## 情绪表达

### 健康表达
- 识别并命名情绪
- 适度表达情绪
- 不压抑不爆发

### 表达方式
- 语言表达
- 写作表达
- 艺术表达
- 运动释放

## 情绪调节

### 即时调节
- 深呼吸 4-7-8 法
- 暂停离开现场
- 冷水洗脸或握拳

### 长期调节
- 规律运动
- 正念冥想
- 充足睡眠

### 认知调整
- 换角度看问题
- 区分事实和想象
- 接受不可改变

## 心理弹性

### 挫折应对
- 允许情绪出现
- 寻找支持系统
- 从中学习成长

### 压力管理
- 识别压力源
- 分解压力任务
- 寻求帮助

## 最佳实践

1. 情绪日记
2. 定期运动
3. 保持社交
4. 充足睡眠
5. 培养爱好`,
    category: '心理健康',
    tags: ['情绪', '心理健康', '自我调节'],
    dateAdded: '2024-04-10',
    stars: 11800,
  },
  {
    id: '37',
    title: '职业发展指南',
    description: '职业规划和职场成长策略',
    content: `# 职业发展指南

## 职业规划

### 自我认知
- 了解自己的优势
- 明确职业兴趣
- 设定长期目标

### 职业路径
- 制定 3-5 年规划
- 每年设定目标
- 定期评估调整

## 职场技能

### 核心能力
- 专业能力
- 沟通能力
- 解决问题的能力
- 学习能力

### 软技能
- 时间管理
- 情绪管理
- 人际交往
- 演讲展示

## 工作习惯

### 高效工作
- 重要优先
- 深度工作
- 定期复盘

### 向上管理
- 了解老板目标
- 主动汇报进展
- 寻求反馈指导

### 跨部门协作
- 清晰表达需求
- 理解他人立场
- 双赢思维

## 职业发展

### 晋升策略
- 超预期完成工作
- 主动承担项目
- 建立影响力

### 职业转型
- 提前准备
- 积累新技能
- 善用网络资源

## 最佳实践

1. 持续学习
2. 建立个人品牌
3. 拓展人脉
4. 保持好奇心
5. 平衡工作生活`,
    category: '职业发展',
    tags: ['职业', '职场', '成长'],
    dateAdded: '2024-04-11',
    stars: 12800,
  },
  {
    id: '38',
    title: '决策方法论',
    description: '科学决策的框架和原则',
    content: `# 决策方法论

## 决策流程

### 问题定义
- 明确决策目标
- 界定决策范围
- 识别关键因素

### 信息收集
- 收集必要信息
- 辨别信息真伪
- 避免信息过载

### 方案生成
- 头脑风暴多个方案
- 考虑创新选项
- 不急于否定

## 决策框架

### 利益相关者分析
- 谁受影响
- 关注什么
- 如何满足

### 成本收益分析
- 量化可计算成本
- 评估无形收益
- 考虑机会成本

### 决策矩阵
| 方案 | 优点 | 缺点 | 风险 | 成本 |

## 常见陷阱

### 认知偏差
- 确认偏误
- 过度自信
- 损失厌恶
- 锚定效应

### 决策疲劳
- 重要决策早做
- 减少日常决策
- 适当休息

## 决策执行

### 行动计划
- 明确具体步骤
- 设定时间节点
- 分配责任

### 风险预案
- 识别潜在风险
- 准备应对方案
- 及时调整

## 最佳实践

1. 二阶思考
2. 设定决策时限
3. 记录决策过程
4. 定期复盘决策
5. 接受不完美`,
    category: '思维方法',
    tags: ['决策', '思考', '方法论'],
    dateAdded: '2024-04-12',
    stars: 10500,
  },
  {
    id: '39',
    title: '极简生活指南',
    description: '简化生活的方法和原则',
    content: `# 极简生活指南

## 物质极简

### 物品原则
- 需要再买
- 一进一出
- 定期清理

### 整理方法
- 分类存放
- 标签标记
- 归位还原

### 购物原则
- 质量优先
- 拒绝冲动
- 考虑真实需求

## 信息极简

### 信息摄入
- 限定信息源
- 固定获取时间
- 避免信息焦虑

### 数字整理
- 定期清理文件
- 整理相册
- 清理订阅

### 社交媒体
- 减少无效社交
- 设定使用时间
- 关注优质内容

## 精力极简

### 事务简化
- 减少选择
- 建立例程
- 委托他人

### 关系简化
- 珍惜重要的人
- 减少无效社交
- 学会说不

### 目标简化
- 每年 1-3 个目标
- 专注重要的事
- 接受不完美

## 极简财务

### 支出简化
- 区分需要和想要
- 记录支出
- 减少浪费

### 投资简化
- 长期投资
- 指数基金
- 少即是多

## 最佳实践

1. 每日一扔
2. 30 天不买新东西
3. 数字断舍离
4. 定期回顾
5. 关注当下`,
    category: '生活方式',
    tags: ['极简', '断舍离', '生活'],
    dateAdded: '2024-04-13',
    stars: 9800,
  },
  {
    id: '40',
    title: '写作表达法则',
    description: '提升写作和表达能力',
    content: `# 写作表达法则

## 写作原则

### 清晰简洁
- 观点明确
- 语言简练
- 逻辑连贯

### 读者导向
- 考虑读者是谁
- 满足读者需求
- 使用读者语言

### 结构化
- 结论先行
- 层级清晰
- 适当分段

## 写作技巧

### 开头方法
- 引用数据
- 讲述故事
- 提出问题
- 亮出观点

### 中间展开
- 分类说明
- 举例说明
- 对比说明
- 原因分析

### 结尾总结
- 重申观点
- 行动建议
- 展望未来

## 表达能力

### 语言组织
- 先想后说
- 简明扼要
- 善用例子

### 肢体语言
- 眼神交流
- 手势配合
- 表情自然

### 演示技巧
- 视觉辅助
- 节奏控制
- 互动参与

## 写作习惯

### 日常练习
- 每日写作
- 记录灵感
- 定期复盘

### 素材积累
- 读书笔记
- 案例收集
- 观点整理

### 修改完善
- 冷却后再改
- 请他人点评
- 多次修改

## 最佳实践

1. 每天写 500 字
2. 建立素材库
3. 模仿优秀作品
4. 接受反馈
5. 持续输出`,
    category: '个人成长',
    tags: ['写作', '表达', '沟通'],
    dateAdded: '2024-04-14',
    stars: 9200,
  },
];
