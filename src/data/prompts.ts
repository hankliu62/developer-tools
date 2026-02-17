export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
}

export const prompts: Prompt[] = [
  {
    id: '1',
    title: '代码审查助手',
    description: '帮助你进行代码审查，提供改进建议',
    content: `请作为资深代码审查专家，审查以下代码并提供详细的改进建议：

\`\`\`
{{code}}
\`\`\`

请从以下方面进行审查：
1. 代码逻辑正确性
2. 性能优化
3. 安全性
4. 可读性和可维护性
5. 最佳实践

请提供具体的改进建议和优化方案。`,
    category: '开发',
    tags: ['代码审查', '代码质量', '最佳实践'],
  },
  {
    id: '2',
    title: '技术文档生成器',
    description: '自动生成技术文档',
    content: `请为以下代码生成详细的技术文档：

\`\`\`
{{code}}
\`\`\`

请包含以下内容：
1. 功能概述
2. API 说明
3. 参数说明
4. 返回值说明
5. 使用示例
6. 注意事项`,
    category: '文档',
    tags: ['文档', 'API', '技术文档'],
  },
  {
    id: '3',
    title: '单元测试生成器',
    description: '为代码生成单元测试',
    content: `请为以下代码生成单元测试：

\`\`\`
{{code}}
\`\`\`

请使用 Jest 框架，生成完整的测试用例，包括：
1. 正常输入测试
2. 边界条件测试
3. 异常情况测试
4. 覆盖率要求 80% 以上`,
    category: '测试',
    tags: ['测试', '单元测试', 'Jest'],
  },
  {
    id: '4',
    title: 'SQL 查询优化器',
    description: '优化 SQL 查询语句',
    content: `请分析并优化以下 SQL 查询：

\`\`\`
{{sql}}
\`\`\`

请提供：
1. 性能分析
2. 优化建议
3. 优化后的 SQL
4. 索引建议`,
    category: '数据库',
    tags: ['SQL', '优化', '数据库'],
  },
  {
    id: '5',
    title: 'API 设计助手',
    description: '帮助设计 RESTful API',
    content: `请为以下功能设计 RESTful API：

功能描述：{{description}}

请提供：
1. API 端点设计
2. HTTP 方法选择
3. 请求参数定义
4. 响应格式定义
5. 错误处理方案`,
    category: '设计',
    tags: ['API', 'RESTful', '设计'],
  },
  {
    id: '6',
    title: '正则表达式生成器',
    description: '根据描述生成正则表达式',
    content: `请根据以下描述生成正则表达式：

描述：{{description}}

请提供：
1. 完整的正则表达式
2. 解释每个部分的含义
3. 使用示例
4. 注意事项`,
    category: '工具',
    tags: ['正则', 'Regex', '工具'],
  },
  {
    id: '7',
    title: 'README 生成器',
    description: '生成项目 README 文档',
    content: `请为以下项目生成 README 文档：

项目名称：{{name}}
项目描述：{{description}}
技术栈：{{tech_stack}}

请包含：
1. 项目介绍
2. 功能特性
3. 技术栈
4. 快速开始
5. 使用说明
6. API 文档（如适用）
7. 贡献指南
8. 许可证`,
    category: '文档',
    tags: ['README', '文档', '项目'],
  },
  {
    id: '8',
    title: '错误消息优化器',
    description: '优化错误提示消息',
    content: `请优化以下错误消息，使其更友好、更具可操作性：

原始消息：{{error_message}}

请提供：
1. 用户友好的错误消息
2. 可能的解决方案
3. 相关文档链接（如适用）`,
    category: '用户体验',
    tags: ['错误处理', '用户体验', 'UI'],
  },
  {
    id: '9',
    title: 'Git 提交信息生成器',
    description: '生成规范的 Git 提交信息',
    content: `请根据以下更改生成 Git 提交信息：

更改内容：
{{changes}}

请使用 Conventional Commits 格式：
<type>(<scope>): <description>

[optional body]

[optional footer]`,
    category: '开发',
    tags: ['Git', '提交规范', '版本控制'],
  },
  {
    id: '10',
    title: '数据模型设计器',
    description: '帮助设计数据库表结构',
    content: `请为以下功能设计数据库表结构：

功能需求：{{requirements}}

请提供：
1. 表结构设计
2. 字段说明
3. 索引设计
4. ER 图（文本形式）
5. 注意事项`,
    category: '数据库',
    tags: ['数据库', 'ER图', '设计'],
  },
];
