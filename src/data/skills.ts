export interface Skill {
  id: string;
  name: string;
  nameZh?: string;
  description: string;
  descriptionZh?: string;
  content: string;
  contentZh?: string;
  category: string;
  categoryZh?: string;
  source: string;
  installCommand?: string;
  stars?: number;
  dateAdded?: string;
}

export const skills: Skill[] = [
  {
    id: '1',
    name: 'frontend-design',
    description:
      'Create distinctive, production-grade frontend interfaces with high design quality',
    descriptionZh: '创建独特、生产的 Web 前端界面',
    content: `# Frontend Design Skill

You are an expert frontend designer specializing in creating distinctive, production-grade user interfaces.

## Capabilities
- Build React components, HTML/CSS layouts, landing pages, dashboards
- Create visually appealing, unique designs that avoid generic AI aesthetics
- Implement responsive designs with proper mobile-first approach
- Use modern CSS techniques (Flexbox, Grid, CSS Variables)

## Design Principles
1. Prioritize usability and accessibility
2. Use consistent spacing and typography
3. Implement proper color contrast
4. Add subtle animations for better UX
5. Keep designs clean and uncluttered

## Output Requirements
- Clean, well-organized code
- Proper semantic HTML
- CSS-in-JS or scoped styles
- TypeScript when appropriate
- Responsive on all screen sizes`,
    contentZh: `# 前端设计技能

您是一位专业的 Web 前端设计师，擅长创建独特的、面向生产的用户界面。

## 能力
- 构建 React 组件、HTML/CSS 布局、着陆页、仪表板
- 创建美观、独特的设计，避免通用 AI 美学
- 使用正确的移动优先方法实现响应式设计
- 使用现代 CSS 技术（Flexbox、Grid、CSS 变量）

## 设计原则
1. 优先考虑可用性和可访问性
2. 使用一致的间距和排版
3. 实现适当的颜色对比度
4. 添加微妙的动画以改善用户体验
5. 保持设计简洁明了

## 输出要求
- 简洁、组织良好的代码
- 适当的语义 HTML
- CSS-in-JS 或作用域样式
- 适当使用 TypeScript
- 响应式设计适配所有屏幕尺寸`,
    category: 'Development',
    categoryZh: '开发',
    source: 'anthropics/skills',
    installCommand: 'npx skills add anthropics/skills/frontend-design',
    stars: 74800,
    dateAdded: '2024-01-15',
  },
  {
    id: '2',
    name: 'vercel-react-best-practices',
    description: 'React best practices for Vercel deployments',
    descriptionZh: 'Vercel 部署的 React 最佳实践',
    content: `# Vercel React Best Practices

Follow these practices when building React apps for Vercel:

## Performance
- Use Next.js App Router
- Implement proper code splitting
- Optimize images with next/image
- Use dynamic imports for heavy components

## Data Fetching
- Use Server Components for data fetching
- Implement proper caching strategies
- Use optimistic updates where appropriate

## State Management
- Prefer React Server Components over client state
- Use useState for simple local state
- Consider Zustand or Jotai for global state

## Deployment
- Ensure proper environment variables
- Configure proper headers
- Optimize for Edge runtime when possible`,
    contentZh: `# Vercel React 最佳实践

在 Vercel 上构建 React 应用时，请遵循以下实践：

## 性能
- 使用 Next.js App Router
- 实现适当的代码分割
- 使用 next/image 优化图片
- 对重型组件使用动态导入

## 数据获取
- 使用 Server Components 获取数据
- 实现适当的缓存策略
- 在适当的地方使用乐观更新

## 状态管理
- 优先使用 React Server Components 而不是客户端状态
- 使用 useState 处理简单的本地状态
- 考虑使用 Zustand 或 Jotai 进行全局状态管理

## 部署
- 确保正确的环境变量配置
- 配置适当的 HTTP 头
- 尽可能优化 Edge 运行时`,
    category: 'Development',
    categoryZh: '开发',
    source: 'vercel-labs/agent-skills',
    installCommand: 'npx skills add vercel-labs/agent-skills/vercel-react-best-practices',
    stars: 139500,
    dateAdded: '2024-01-10',
  },
  {
    id: '3',
    name: 'ui-ux-pro-max',
    description: 'UI/UX design intelligence with 50+ styles, 97 color palettes, 57 font pairings',
    descriptionZh: 'UI/UX 设计智能，包含 50+ 样式、97 个配色方案、57 种字体搭配',
    content: `# UI/UX Pro Max - Design Intelligence

Comprehensive design guide for web and mobile applications. Contains 50+ styles, 97 color palettes, 57 font pairings, 99 UX guidelines, and 25 chart types across 9 technology stacks.

## Rule Categories by Priority

| Priority | Category | Impact |
|----------|----------|--------|
| 1 | Accessibility | CRITICAL |
| 2 | Touch & Interaction | CRITICAL |
| 3 | Performance | HIGH |
| 4 | Layout & Responsive | HIGH |
| 5 | Typography & Color | MEDIUM |
| 6 | Animation | MEDIUM |
| 7 | Style Selection | MEDIUM |
| 8 | Charts & Data | LOW |

## Quick Reference

### 1. Accessibility (CRITICAL)
- \`color-contrast\` - Minimum 4.5:1 ratio for normal text
- \`focus-states\` - Visible focus rings on interactive elements
- \`alt-text\` - Descriptive alt text for meaningful images

### 2. Touch & Interaction (CRITICAL)
- \`touch-target-size\` - Minimum 44x44px touch targets
- \`hover-vs-tap\` - Use click/tap for primary interactions
- \`loading-buttons\` - Disable button during async operations`,
    contentZh: `# UI/UX Pro Max - 设计智能

Web 和移动应用程序的综合设计指南。包含 50+ 样式、97 个配色方案、57 种字体搭配、99 条 UX 指南，以及 9 种技术栈的 25 种图表类型。

## 优先级分类

| 优先级 | 类别 | 影响 |
|--------|------|------|
| 1 | 可访问性 | 关键 |
| 2 | 触摸与交互 | 关键 |
| 3 | 性能 | 高 |
| 4 | 布局与响应式 | 高 |
| 5 | 排版与颜色 | 中 |
| 6 | 动画 | 中 |
| 7 | 样式选择 | 中 |
| 8 | 图表与数据 | 低 |

## 快速参考

### 1. 可访问性（关键）
- \`color-contrast\` - 普通文本最小 4.5:1 对比度
- \`focus-states\` - 交互元素上的可见焦点环
- \`alt-text\` - 有意义图片的描述性替代文本

### 2. 触摸与交互（关键）
- \`touch-target-size\` - 最小 44x44px 触摸目标
- \`hover-vs-tap\` - 主要交互使用点击/轻触
- \`loading-buttons\` - 异步操作期间禁用按钮`,
    category: 'Design',
    categoryZh: '设计',
    source: 'nextlevelbuilder/ui-ux-pro-max-skill',
    installCommand: 'npx skills add nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max',
    stars: 28400,
    dateAdded: '2024-02-01',
  },
  {
    id: '4',
    name: 'vercel-react-native-skills',
    description: 'React Native and Expo best practices for building performant mobile apps',
    descriptionZh: '构建高性能移动应用的 React Native 和 Expo 最佳实践',
    content: `# React Native and Expo Best Practices

Use these guidelines when building React Native apps:

## Performance
- Use FlashList instead of FlatList for long lists
- Implement proper memoization with React.memo
- Use useCallback and useMemo appropriately
- Optimize bundle size with proper imports

## Navigation
- Use React Navigation with proper configuration
- Implement proper deep linking
- Handle navigation state properly
- Use proper screen options

## Native Modules
- Use Expo when possible
- Follow native module best practices
- Handle native bridge properly
- Test on both iOS and Android`,
    contentZh: `# React Native 和 Expo 最佳实践

构建 React Native 应用时，请遵循以下指南：

## 性能
- 长列表使用 FlashList 代替 FlatList
- 使用 React.memo 实现适当的记忆化
- 适当使用 useCallback 和 useMemo
- 通过正确的导入优化包大小

## 导航
- 使用 React Navigation 并正确配置
- 实现适当的深度链接
- 正确处理导航状态
- 使用适当的屏幕选项

## 原生模块
- 尽可能使用 Expo
- 遵循原生模块最佳实践
- 正确处理原生桥接
- 在 iOS 和 Android 上测试`,
    category: 'Mobile',
    categoryZh: '移动开发',
    source: 'vercel-labs/agent-skills',
    installCommand: 'npx skills add vercel-labs/agent-skills/vercel-react-native-skills',
    stars: 31400,
    dateAdded: '2024-01-20',
  },
  {
    id: '5',
    name: 'find-skills',
    description: 'Discover and install agent skills for various tasks',
    descriptionZh: '发现并安装各种任务的 AI Agent 技能',
    content: `# Find Skills

This skill helps you discover and install agent skills when you need functionality that might exist as an installable skill.

## Usage
When the user asks about:
- "how do I do X"
- "find a skill for X"
- "is there a skill that can..."
- Or expresses interest in extending capabilities

## Process
1. Search for relevant skills based on the user's need
2. Provide the skill name and description
3. Show installation command
4. Explain what the skill does`,
    contentZh: `# 查找技能

当您需要可能已作为可安装技能存在的功能时，此技能可帮助您发现并安装 AI Agent 技能。

## 使用方法
当用户询问以下内容时：
- "如何做 X"
- "找到做 X 的技能"
- "有可以做...的技能吗"
- 或表示有兴趣扩展功能

## 流程
1. 根据用户需求搜索相关技能
2. 提供技能名称和描述
3. 显示安装命令
4. 解释该技能的用途`,
    category: 'Tools',
    categoryZh: '工具',
    source: 'vercel-labs/skills',
    installCommand: 'npx skills add vercel-labs/skills/find-skills',
    stars: 246300,
    dateAdded: '2024-01-05',
  },
  {
    id: '6',
    name: 'next-best-practices',
    description: 'Best practices for building Next.js applications',
    descriptionZh: '构建 Next.js 应用程序的最佳实践',
    content: `# Next.js Best Practices

Follow these practices when building Next.js applications:

## App Router
- Use Server Components by default
- Use 'use client' directive sparingly
- Implement proper layout hierarchy
- Use parallel routes when appropriate

## Data Fetching
- Use fetch with proper caching
- Implement revalidation strategies
- Use Server Actions for mutations
- Handle loading and error states`,
    contentZh: `# Next.js 最佳实践

构建 Next.js 应用程序时，请遵循以下实践：

## App Router
- 默认使用 Server Components
- 谨慎使用 'use client' 指令
- 实现适当的布局层次结构
- 适当使用并行路由

## 数据获取
- 使用 fetch 并适当缓存
- 实现重新验证策略
- 使用 Server Actions 进行变更
- 处理加载和错误状态`,
    category: 'Development',
    categoryZh: '开发',
    source: 'vercel-labs/next-skills',
    installCommand: 'npx skills add vercel-labs/next-skills/next-best-practices',
    stars: 13500,
    dateAdded: '2024-02-10',
  },
  {
    id: '7',
    name: 'supabase-postgres-best-practices',
    description: 'PostgreSQL best practices for Supabase projects',
    descriptionZh: 'Supabase 项目的 PostgreSQL 最佳实践',
    content: `# Supabase PostgreSQL Best Practices

Follow these practices when working with Supabase:

## Database Design
- Use proper data types
- Implement proper indexing
- Use ROW LEVEL SECURITY
- Design for scale

## Functions & Triggers
- Use SQL functions for complex logic
- Implement proper triggers
- Handle errors properly
- Use migrations properly`,
    contentZh: `# Supabase PostgreSQL 最佳实践

使用 Supabase 时，请遵循以下实践：

## 数据库设计
- 使用适当的数据类型
- 实现适当的索引
- 使用行级安全策略
- 为扩展而设计

## 函数和触发器
- 使用 SQL 函数处理复杂逻辑
- 实现适当的触发器
- 正确处理错误
- 正确使用迁移`,
    category: 'Backend',
    categoryZh: '后端',
    source: 'supabase/agent-skills',
    installCommand: 'npx skills add supabase/agent-skills/supabase-postgres-best-practices',
    stars: 19100,
    dateAdded: '2024-02-15',
  },
  {
    id: '8',
    name: 'ai-sdk',
    description: 'Vercel AI SDK for building AI applications',
    descriptionZh: '用于构建 AI 应用的 Vercel AI SDK',
    content: `# Vercel AI SDK

Use Vercel AI SDK for building AI-powered applications:

## Core Concepts
- Use useChat for streaming responses
- Use useCompletion for simple completions
- Implement proper message handling
- Handle loading and error states

## Providers
- OpenAI
- Anthropic
- Google Generative AI
- Cohere`,
    contentZh: `# Vercel AI SDK

使用 Vercel AI SDK 构建 AI 驱动的应用：

## 核心概念
- 使用 useChat 处理流式响应
- 使用 useCompletion 处理简单补全
- 实现适当的消息处理
- 处理加载和错误状态

## 提供商
- OpenAI
- Anthropic
- Google Generative AI
- Cohere`,
    category: 'AI',
    categoryZh: 'AI',
    source: 'vercel/ai',
    installCommand: 'npx skills add vercel/ai/ai-sdk',
    stars: 5200,
    dateAdded: '2024-03-01',
  },
  {
    id: '9',
    name: 'browser-use',
    description: 'Automate browser tasks using Playwright or Puppeteer',
    descriptionZh: '使用 Playwright 或 Puppeteer 自动化浏览器任务',
    content: `# Browser Automation Skill

Automate browser tasks using Playwright or Puppeteer:

## Use Cases
- Web scraping
- Form filling
- Screenshot capture
- Testing web applications
- Automation workflows

## Best Practices
- Use Playwright for modern features
- Handle waits properly
- Clean up resources
- Respect robots.txt`,
    contentZh: `# 浏览器自动化技能

使用 Playwright 或 Puppeteer 自动化浏览器任务：

## 使用场景
- 网页抓取
- 表单填写
- 截图捕获
- 测试 Web 应用程序
- 自动化工作流

## 最佳实践
- 使用 Playwright 获取现代功能
- 正确处理等待
- 清理资源
- 遵守 robots.txt`,
    category: 'Automation',
    categoryZh: '自动化',
    source: 'browser-use',
    installCommand: 'npx skills add browser-use/browser-use/browser-use',
    stars: 32000,
    dateAdded: '2024-02-20',
  },
  {
    id: '10',
    name: 'mcp-builder',
    description: 'Build Model Context Protocol servers and tools',
    descriptionZh: '构建 Model Context Protocol 服务器和工具',
    content: `# MCP Builder

Build MCP (Model Context Protocol) servers:

## What is MCP?
A protocol for connecting AI assistants to tools and data sources.

## Building a Server
1. Define the server class
2. Implement tools
3. Implement resources
4. Add prompts
5. Handle transport`,
    contentZh: `# MCP 构建器

构建 MCP（Model Context Protocol）服务器：

## 什么是 MCP？
用于将 AI 助手连接到工具和数据源的协议。

## 构建服务器
1. 定义服务器类
2. 实现工具
3. 实现资源
4. 添加提示
5. 处理传输`,
    category: 'Development',
    categoryZh: '开发',
    source: 'anthropics/skills',
    installCommand: 'npx skills add anthropics/skills/mcp-builder',
    stars: 9800,
    dateAdded: '2024-03-10',
  },
  {
    id: '11',
    name: 'vue-best-practices',
    description: 'Vue.js best practices including Composition API and Pinia',
    descriptionZh: 'Vue.js 最佳实践，包含 Composition API 和 Pinia',
    content: `# Vue Best Practices

Follow these practices when building Vue applications:

## Composition API
- Use script setup
- Use composables for logic
- Follow composition best practices
- Handle reactivity properly

## State Management
- Use Pinia for state
- Structure stores properly
- Use plugins when needed`,
    contentZh: `# Vue 最佳实践

构建 Vue 应用程序时，请遵循以下实践：

## Composition API
- 使用 script setup
- 使用 composables 处理逻辑
- 遵循组合最佳实践
- 正确处理响应性

## 状态管理
- 使用 Pinia 进行状态管理
- 正确构建 stores
- 必要时使用插件`,
    category: 'Development',
    categoryZh: '开发',
    source: 'hyf0/vue-skills',
    installCommand: 'npx skills add hyf0/vue-skills/vue-best-practices',
    stars: 6300,
    dateAdded: '2024-03-15',
  },
  {
    id: '12',
    name: 'vite',
    description: 'Vite build tool best practices and configuration',
    descriptionZh: 'Vite 构建工具最佳实践和配置',
    content: `# Vite Best Practices

Follow these practices when using Vite:

## Configuration
- Optimize vite.config
- Handle environment variables
- Configure proper plugins
- Set up proper aliases

## Performance
- Use proper chunking
- Optimize dependencies
- Enable caching
- Use proper build options`,
    contentZh: `# Vite 最佳实践

使用 Vite 时，请遵循以下实践：

## 配置
- 优化 vite.config
- 处理环境变量
- 配置适当的插件
- 设置适当的别名

## 性能
- 使用适当的代码分割
- 优化依赖项
- 启用缓存
- 使用适当的构建选项`,
    category: 'Development',
    categoryZh: '开发',
    source: 'antfu/skills',
    installCommand: 'npx skills add antfu/skills/vite',
    stars: 5600,
    dateAdded: '2024-03-20',
  },
  {
    id: '13',
    name: 'turborepo',
    description: 'Turborepo monorepo best practices',
    descriptionZh: 'Turborepo monorepo 最佳实践',
    content: `# Turborepo Best Practices

Set up and use Turborepo:

## Structure
- Use proper workspace layout
- Define proper pipelines
- Handle caching
- Configure remote caching

## Scripts
- Define build scripts
- Handle dependencies
- Use proper filtering`,
    contentZh: `# Turborepo 最佳实践

设置和使用 Turborepo：

## 结构
- 使用适当的工作区布局
- 定义适当的管道
- 处理缓存
- 配置远程缓存

## 脚本
- 定义构建脚本
- 处理依赖项
- 使用适当的过滤`,
    category: 'DevOps',
    categoryZh: 'DevOps',
    source: 'vercel/turborepo',
    installCommand: 'npx skills add vercel/turborepo/turborepo',
    stars: 5100,
    dateAdded: '2024-03-25',
  },
  {
    id: '14',
    name: 'systematic-debugging',
    description: 'Systematic approach to debugging software issues',
    descriptionZh: '系统化调试软件问题的方法',
    content: `# Systematic Debugging

A structured approach to debugging:

## Step 1: Understand the Problem
- Reproduce the issue
- Gather error messages
- Check logs
- Understand the expected behavior

## Step 2: Isolate the Problem
- Simplify the reproduction case
- Use binary search
- Disable unrelated code`,
    contentZh: `# 系统化调试

结构化的调试方法：

## 步骤 1：理解问题
- 重现问题
- 收集错误信息
- 检查日志
- 理解预期行为

## 步骤 2：隔离问题
- 简化复现案例
- 使用二分查找
- 禁用无关代码`,
    category: 'Development',
    categoryZh: '开发',
    source: 'obra/superpowers',
    installCommand: 'npx skills add obra/superpowers/systematic-debugging',
    stars: 12000,
    dateAdded: '2024-04-01',
  },
  {
    id: '15',
    name: 'test-driven-development',
    description: 'TDD methodology and best practices',
    descriptionZh: 'TDD 方法论和最佳实践',
    content: `# Test Driven Development

Follow TDD methodology:

## The Cycle
1. Write a failing test
2. Write minimal code to pass
3. Refactor

## Benefits
- Better design
- Living documentation
- Faster debugging
- Confidence in changes`,
    contentZh: `# 测试驱动开发

遵循 TDD 方法论：

## 循环
1. 编写失败的测试
2. 编写最少代码使其通过
3. 重构

## 好处
- 更好的设计
- 实时文档
- 更快调试
- 对变更更有信心`,
    category: 'Development',
    categoryZh: '开发',
    source: 'obra/superpowers',
    installCommand: 'npx skills add obra/superpowers/test-driven-development',
    stars: 9800,
    dateAdded: '2024-04-05',
  },
  {
    id: '16',
    name: 'web-design-guidelines',
    description: 'Review UI code for Vercel Web Interface Guidelines compliance',
    descriptionZh: '审查 UI 代码是否符合 Vercel Web 界面指南',
    content: `# Web Interface Guidelines

Review these files for compliance: $ARGUMENTS

Read files, check against rules below. Output concise but comprehensive—sacrifice grammar for brevity. High signal-to-noise.

## Rules

### Accessibility

- Icon-only buttons need \`aria-label\`
- Form controls need \`<label>\` or \`aria-label\`
- Interactive elements need keyboard handlers (\`onKeyDown\`/\`onKeyUp\`)
- \`<button>\` for actions, \`<a>\`/\`<Link>\` for navigation (not \`<div onClick>\`)
- Images need \`alt\` (or \`alt=""\` if decorative)
- Decorative icons need \`aria-hidden="true"\`
- Async updates (toasts, validation) need \`aria-live="polite"\`
- Use semantic HTML (\`<button>\`, \`<a>\`, \`<label>\`, \`<table>\`) before ARIA
- Headings hierarchical \`<h1>\`–\`<h6>\`; include skip link for main content
- \`scroll-margin-top\` on heading anchors

### Focus States

- Interactive elements need visible focus: \`focus-visible:ring-*\` or equivalent
- Never \`outline-none\` / \`outline: none\` without focus replacement
- Use \`:focus-visible\` over \`:focus\` (avoid focus ring on click)
- Group focus with \`:focus-within\` for compound controls

### Forms

- Inputs need \`autocomplete\` and meaningful \`name\`
- Use correct \`type\` (\`email\`, \`tel\`, \`url\`, \`number\`) and \`inputmode\`
- Never block paste (\`onPaste\` + \`preventDefault\`)
- Labels clickable (\`htmlFor\` or wrapping control)
- Disable spellcheck on emails, codes, usernames (\`spellCheck={false}\`)
- Checkboxes/radios: label + control share single hit target (no dead zones)
- Submit button stays enabled until request starts; spinner during request
- Errors inline next to fields; focus first error on submit
- Placeholders end with \`…\` and show example pattern
- \`autocomplete="off"\` on non-auth fields to avoid password manager triggers
- Warn before navigation with unsaved changes (\`beforeunload\` or router guard)

### Animation

- Honor \`prefers-reduced-motion\` (provide reduced variant or disable)
- Animate \`transform\`/\`opacity\` only (compositor-friendly)
- Never \`transition: all\`—list properties explicitly
- Set correct \`transform-origin\`
- SVG: transforms on \`<g>\` wrapper with \`transform-box: fill-box; transform-origin: center\`
- Animations interruptible—respond to user input mid-animation

### Typography

- \`…\` not \`...\`
- Curly quotes \`"\` \`"\` not straight \`"\`
- Non-breaking spaces: \`10&nbsp;MB\`, \`⌘&nbsp;K\`, brand names
- Loading states end with \`…\`: \`"Loading…"\`, \`"Saving…"\`
- \`font-variant-numeric: tabular-nums\` for number columns/comparisons
- Use \`text-wrap: balance\` or \`text-pretty\` on headings (prevents widows)

### Content Handling

- Text containers handle long content: \`truncate\`, \`line-clamp-*\`, or \`break-words\`
- Flex children need \`min-w-0\` to allow text truncation
- Handle empty states—don't render broken UI for empty strings/arrays
- User-generated content: anticipate short, average, and very long inputs

### Images

- \`<img>\` needs explicit \`width\` and \`height\` (prevents CLS)
- Below-fold images: \`loading="lazy"\`
- Above-fold critical images: \`priority\` or \`fetchpriority="high"\`

### Performance

- Large lists (>50 items): virtualize (\`virtua\`, \`content-visibility: auto\`)
- No layout reads in render (\`getBoundingClientRect\`, \`offsetHeight\`, \`offsetWidth\`, \`scrollTop\`)
- Batch DOM reads/writes; avoid interleaving
- Prefer uncontrolled inputs; controlled inputs must be cheap per keystroke
- Add \`<link rel="preconnect">\` for CDN/asset domains
- Critical fonts: \`<link rel="preload" as="font">\` with \`font-display: swap\`

### Navigation & State

- URL reflects state—filters, tabs, pagination, expanded panels in query params
- Links use \`<a>\`/\`<Link>\` (Cmd/Ctrl+click, middle-click support)
- Deep-link all stateful UI (if uses \`useState\`, consider URL sync via nuqs or similar)
- Destructive actions need confirmation modal or undo window—never immediate

### Touch & Interaction

- \`touch-action: manipulation\` (prevents double-tap zoom delay)
- \`-webkit-tap-highlight-color\` set intentionally
- \`overscroll-behavior: contain\` in modals/drawers/sheets
- During drag: disable text selection, \`inert\` on dragged elements
- \`autoFocus\` sparingly—desktop only, single primary input; avoid on mobile

### Safe Areas & Layout

- Full-bleed layouts need \`env(safe-area-inset-*)\` for notches
- Avoid unwanted scrollbars: \`overflow-x-hidden\` on containers, fix content overflow
- Flex/grid over JS measurement for layout

### Dark Mode & Theming

- \`color-scheme: dark\` on \`<html>\` for dark themes (fixes scrollbar, inputs)
- \`<meta name="theme-color">\` matches page background
- Native \`<select>\`: explicit \`background-color\` and \`color\` (Windows dark mode)

### Locale & i18n

- Dates/times: use \`Intl.DateTimeFormat\` not hardcoded formats
- Numbers/currency: use \`Intl.NumberFormat\` not hardcoded formats
- Detect language via \`Accept-Language\` / \`navigator.languages\`, not IP

### Hydration Safety

- Inputs with \`value\` need \`onChange\` (or use \`defaultValue\` for uncontrolled)
- Date/time rendering: guard against hydration mismatch (server vs client)
- \`suppressHydrationWarning\` only where truly needed

### Hover & Interactive States

- Buttons/links need \`hover:\` state (visual feedback)
- Interactive states increase contrast: hover/active/focus more prominent than rest

### Content & Copy

- Active voice: "Install the CLI" not "The CLI will be installed"
- Title Case for headings/buttons (Chicago style)
- Numerals for counts: "8 deployments" not "eight"
- Specific button labels: "Save API Key" not "Continue"
- Error messages include fix/next step, not just problem
- Second person; avoid first person
- \`&\` over "and" where space-constrained

### Anti-patterns (flag these)

- \`user-scalable=no\` or \`maximum-scale=1\` disabling zoom
- \`onPaste\` with \`preventDefault\`
- \`transition: all\`
- \`outline-none\` without focus-visible replacement
- Inline \`onClick\` navigation without \`<a>\`
- \`<div>\` or \`<span>\` with click handlers (should be \`<button>\`)
- Images without dimensions
- Large arrays \`.map()\` without virtualization
- Form inputs without labels
- Icon buttons without \`aria-label\`
- Hardcoded date/number formats (use \`Intl.*\`)

## Output Format

Group by file. Use \`file:line\` format (VS Code clickable). Terse findings.`,
    contentZh: `# Web 界面指南

审查这些文件是否符合指南：$ARGUMENTS

读取文件，根据以下规则检查。输出简洁但全面——牺牲语法以换取简洁。高信噪比。

## 规则

### 可访问性

- 图标按钮需要 \`aria-label\`
- 表单控件需要 \`<label>\` 或 \`aria-label\`
- 交互元素需要键盘处理程序（\`onKeyDown\`/\`onKeyUp\`）
- \`<button>\` 用于操作，\`<a>\`/\`<Link>\` 用于导航（不是 \`<div onClick>\`）
- 图片需要 \`alt\`（如果是装饰性的则为 \`alt=""\`）
- 装饰性图标需要 \`aria-hidden="true"\`
- 异步更新（toast、验证）需要 \`aria-live="polite"\`
- 先使用语义 HTML（\`<button>\`, \`<a>\`, \`<label>\`, \`<table>\`）再使用 ARIA
- 标题层级 \`<h1>\`–\`<h6>\`；包含主要内容的跳转链接
- 标题锚点需要 \`scroll-margin-top\`

### 焦点状态

- 交互元素需要可见焦点：\`focus-visible:ring-*\` 或等效
- 永远不要在没有焦点替换的情况下使用 \`outline-none\` / \`outline: none\`
- 使用 \`:focus-visible\` 而不是 \`:focus\`（避免点击时的焦点环）
- 使用 \`:focus-within\` 分组焦点以处理复合控件

### 表单

- 输入需要 \`autocomplete\` 和有意义的 \`name\`
- 使用正确的 \`type\`（\`email\`, \`tel\`, \`url\`, \`number\`）和 \`inputmode\`
- 永远不要阻止粘贴（\`onPaste\` + \`preventDefault\`）
- 标签可点击（\`htmlFor\` 或包裹控件）
- 在邮件、代码、用户名上禁用拼写检查（\`spellCheck={false}\`）
- 复选框/单选框：标签+控件共享单一点击目标（无死区）
- 提交按钮在请求开始前保持启用；请求期间显示加载符
- 错误内联显示在字段旁边；提交时聚焦第一个错误
- 占位符以 \`…\` 结尾并显示示例模式
- 非认证字段使用 \`autocomplete="off"\` 以避免密码管理器触发
- 在有未保存更改时警告导航（\`beforeunload\` 或路由守卫）

### 动画

- 尊重 \`prefers-reduced-motion\`（提供减少变体或禁用）
- 只动画 \`transform\`/\`opacity\`（对合成器友好）
- 永远不要 \`transition: all\`—明确列出属性
- 设置正确的 \`transform-origin\`
- SVG：在 \`<g>\` 包装器上使用变换，添加 \`transform-box: fill-box; transform-origin: center\`
- 动画可中断——在动画过程中响应用户输入

### 排版

- \`…\` 而不是 \`...\`
- 卷曲引号 \`"\` \`"\` 而不是直引号 \`"\`
- 不间断空格：\`10&nbsp;MB\`, \`⌘&nbsp;K\`, 品牌名称
- 加载状态以 \`…\` 结尾：\`"Loading…"\`, \`"Saving…"\`
- \`font-variant-numeric: tabular-nums\` 用于数字列/比较
- 在标题上使用 \`text-wrap: balance\` 或 \`text-pretty\`（防止孤儿）

### 内容处理

- 文本容器处理长内容：\`truncate\`, \`line-clamp-*\`, 或 \`break-words\`
- Flex 子元素需要 \`min-w-0\` 以允许文本截断
- 处理空状态——不要为空字符串/数组渲染破损的 UI
- 用户生成的内容：考虑短、平均和非常长的输入

### 图片

- \`<img>\` 需要明确的 \`width\` 和 \`height\`（防止 CLS）
- 折叠以下的图片：\`loading="lazy"\`
- 折叠以上的关键图片：\`priority\` 或 \`fetchpriority="high"\`

### 性能

- 大列表（>50 项）：虚拟化（\`virtua\`, \`content-visibility: auto\`）
- 渲染中不要有布局读取（\`getBoundingClientRect\`, \`offsetHeight\`, \`offsetWidth\`, \`scrollTop\`）
- 批量 DOM 读取/写入；避免交错
- 优先使用非受控输入；受控输入每次按键必须廉价
- 为 CDN/资源域添加 \`<link rel="preconnect">\`
- 关键字体：\`<link rel="preload" as="font">\` 配合 \`font-display: swap\`

### 导航与状态

- URL 反映状态——过滤器、标签、分页、展开面板在查询参数中
- 链接使用 \`<a>\`/\`<Link>\`（支持 Cmd/Ctrl+点击、中键点击）
- 深度链接所有有状态 UI（如果使用 \`useState\`，考虑通过 nuqs 等进行 URL 同步）
- 破坏性操作需要确认模态框或撤销窗口——绝不立即执行

### 触摸与交互

- \`touch-action: manipulation\`（防止双击缩放延迟）
- 有意设置 \`-webkit-tap-highlight-color\`
- 模态框/抽屉/面板中使用 \`overscroll-behavior: contain\`
- 拖动期间：禁用文本选择，对拖动元素使用 \`inert\`
- 谨慎使用 \`autoFocus\`——仅限桌面端，单一主要输入；移动端避免

### 安全区域与布局

- 全面布局需要 \`env(safe-area-inset-*)\` 以处理刘海
- 避免不需要的滚动条：在容器上使用 \`overflow-x-hidden\`，修复内容溢出
- 使用 Flex/Grid 而不是 JS 测量进行布局

### 深色模式与主题

- \`<html>\` 上使用 \`color-scheme: dark\` 用于深色主题（修复滚动条、输入）
- \`<meta name="theme-color">\` 匹配页面背景
- 原生 \`<select>\`：明确设置 \`background-color\` 和 \`color\`（Windows 深色模式）

### 本地化与 i18n

- 日期/时间：使用 \`Intl.DateTimeFormat\` 而不是硬编码格式
- 数字/货币：使用 \`Intl.NumberFormat\` 而不是硬编码格式
- 通过 \`Accept-Language\` / \`navigator.languages\` 检测语言，而不是 IP

### 水合安全

- 带 \`value\` 的输入需要 \`onChange\`（或使用非受控的 \`defaultValue\`）
- 日期/时间渲染：防止服务端与客户端水合不匹配
- 只在真正需要的地方使用 \`suppressHydrationWarning\`

### 悬停与交互状态

- 按钮/链接需要 \`hover:\` 状态（视觉反馈）
- 交互状态增加对比度：悬停/激活/焦点比其余更突出

### 内容与文案

- 主动语态："Install the CLI" 而不是 "The CLI will be installed"
- 标题大小写用于标题/按钮（芝加哥风格）
- 数字用于计数："8 deployments" 而不是 "eight"
- 具体的按钮标签："Save API Key" 而不是 "Continue"
- 错误消息包含修复/下一步，而不仅仅是问题
- 第二人称；避免第一人称
- 空间受限时使用 \`&\` 而不是 "and"

### 反模式（标记这些）

- \`user-scalable=no\` 或 \`maximum-scale=1\` 禁用缩放
- \`onPaste\` 配合 \`preventDefault\`
- \`transition: all\`
- \`outline-none\` 没有 focus-visible 替换
- 内联 \`onClick\` 导航没有 \`<a>\`
- 带点击处理程序的 \`<div>\` 或 \`<span>\`（应该是 \`<button>\`）
- 没有尺寸的图片
- 大数组 \`.map()\` 没有虚拟化
- 没有标签的表单输入
- 没有 \`aria-label\` 的图标按钮
- 硬编码日期/数字格式（使用 \`Intl.*\`）

## 输出格式

按文件分组。使用 \`file:line\` 格式（VS Code 可点击）。简洁的发现。`,
    category: 'Development',
    categoryZh: '开发',
    source: 'vercel-labs/agent-skills',
    installCommand: 'npx skills add vercel-labs/agent-skills/web-design-guidelines',
    stars: 106900,
    dateAdded: '2024-01-16',
  },
  {
    id: '17',
    name: 'remotion-best-practices',
    description: 'Best practices for building videos with Remotion',
    descriptionZh: '使用 Remotion 制作视频的最佳实践',
    content: `# Remotion Best Practices

Use this skill whenever dealing with Remotion code to obtain domain-specific knowledge.

## Captions

When dealing with captions or subtitles, load the ./rules/subtitles.md file for more information.

## Using FFmpeg

For some video operations, such as trimming videos or detecting silence, FFmpeg should be used. Load the ./rules/ffmpeg.md file for more information.

## Audio Visualization

When needing to visualize audio (spectrum bars, waveforms, bass-reactive effects), load the ./rules/audio-visualization.md file for more information.

## How to Use

Read individual rule files for detailed explanations and code examples:

### 3D
- rules/3d.md - 3D content in Remotion using Three.js and React Three Fiber

### Animations
- rules/animations.md - Fundamental animation skills for Remotion

### Assets
- rules/assets.md - Importing images, videos, audio, and fonts into Remotion

### Audio
- rules/audio.md - Using audio and sound in Remotion - importing, trimming, volume, speed, pitch

### Calculate Metadata
- rules/calculate-metadata.md - Dynamically set composition duration, dimensions, and props

### Charts
- rules/charts.md - Chart and data visualization patterns for Remotion (bar, pie, line, stock charts)

### Compositions
- rules/compositions.md - Defining compositions, stills, folders, default props and dynamic metadata

### Fonts
- rules/fonts.md - Loading Google Fonts and local fonts in Remotion

### Gifs
- rules/gifs.md - Displaying GIFs synchronized with Remotion's timeline

### Images
- rules/images.md - Embedding images in Remotion using the Img component

### Lottie
- rules/lottie.md - Embedding Lottie animations in Remotion

### Sequencing
- rules/sequencing.md - Sequencing patterns for Remotion - delay, trim, limit duration of items

### Tailwind
- rules/tailwind.md - Using TailwindCSS in Remotion

### Text Animations
- rules/text-animations.md - Typography and text animation patterns for Remotion

### Timing
- rules/timing.md - Interpolation curves in Remotion - linear, easing, spring animations

### Transitions
- rules/transitions.md - Scene transition patterns for Remotion

### Videos
- rules/videos.md - Embedding videos in Remotion - trimming, volume, speed, looping, pitch

### Parameters
- rules/parameters.md - Make a video parametrizable by adding a Zod schema

### Voiceover
- rules/voiceover.md - Adding AI-generated voiceover to Remotion compositions using ElevenLabs TTS`,
    contentZh: `# Remotion 最佳实践

在处理 Remotion 代码时使用此技能获取特定领域知识。

## 字幕

处理字幕时，加载 ./rules/subtitles.md 文件获取更多信息。

## 使用 FFmpeg

对于某些视频操作，如修剪视频或检测静默，应使用 FFmpeg。加载 ./rules/ffmpeg.md 文件获取更多信息。

## 音频可视化

需要可视化音频时（频谱条、波形、低音反应效果），加载 ./rules/audio-visualization.md 文件获取更多信息。

## 使用方法

阅读各个规则文件获取详细解释和代码示例：

### 3D
- rules/3d.md - 使用 Three.js 和 React Three Fiber 在 Remotion 中制作 3D 内容

### 动画
- rules/animations.md - Remotion 基础动画技能

### 资源
- rules/assets.md - 将图片、视频、音频和字体导入 Remotion

### 音频
- rules/audio.md - 在 Remotion 中使用音频 - 导入、修剪、音量、速度、音调

### 计算元数据
- rules/calculate-metadata.md - 动态设置合成持续时间、尺寸和属性

### 图表
- rules/charts.md - Remotion 图表和数据可视化模式（柱状图、饼图、折线图、股票图表）

### 合成
- rules/compositions.md - 定义合成、静态图像、文件夹、默认属性和动态元数据

### 字体
- rules/fonts.md - 在 Remotion 中加载 Google 字体和本地字体

### GIF
- rules/gifs.md - 显示与 Remotion 时间轴同步的 GIF

### 图片
- rules/images.md - 使用 Img 组件在 Remotion 中嵌入图片

### Lottie
- rules/lottie.md - 在 Remotion 中嵌入 Lottie 动画

### 序列
- rules/sequencing.md - Remotion 序列模式 - 延迟、修剪、限制项目持续时间

### Tailwind
- rules/tailwind.md - 在 Remotion 中使用 TailwindCSS

### 文字动画
- rules/text-animations.md - Remotion 排版和文字动画模式

### 时间
- rules/timing.md - Remotion 插值曲线 - 线性、缓动、弹簧动画

### 转场
- rules/transitions.md - Remotion 场景转场模式

### 视频
- rules/videos.md - 在 Remotion 中嵌入视频 - 修剪、音量、速度、循环、音调

### 参数
- rules/parameters.md - 通过添加 Zod 模式使视频可参数化

### 配音
- rules/voiceover.md - 使用 ElevenLabs TTS 为 Remotion 合成添加 AI 生成的配音`,
    category: 'Development',
    categoryZh: '开发',
    source: 'remotion-dev/skills',
    installCommand: 'npx skills add remotion-dev/skills/remotion-best-practices',
    stars: 96100,
    dateAdded: '2024-01-19',
  },
  {
    id: '18',
    name: 'skill-creator',
    description: 'Create new agent skills with proper structure',
    descriptionZh: '创建具有正确结构的新 AI Agent 技能',
    content: `# Skill Creator

You are an expert at creating AI agent skills. Use this skill when users want to create or modify skills.

## When to Use

- User wants to create a new skill
- User wants to modify an existing skill
- User needs help structuring a skill

## Structure

A skill consists of:
1. **SKILL.md** - Main skill definition
2. **README.md** - Documentation (optional)
3. **src/** - Source code (optional)

## SKILL.md Format

\`\`\`markdown
# Skill Name

Brief description of what this skill does.

## When to Use

When the user wants to...

## How It Works

Step-by-step explanation of the skill's functionality.

## Examples

### Example 1
\\\`\\\`\\\`code
example here
\\\`\\\`\\\`
\`\`\`

## Anti-patterns

Things to avoid:
- Don't do X
- Don't do Y
\`\`\`

## Tips

- Tip 1
- Tip 2
\`\`\`

## Variables

| Variable | Description | Example |
|----------|-------------|---------|
| $ARGUMENTS | User provided arguments | file.ts |
\`\`\`

## Output

Output format and expectations.
\`\`\`

## Best Practices

1. Keep skills focused on single responsibility
2. Use clear, concise language
3. Provide concrete examples
4. Include anti-patterns
5. Test skills with real use cases`,
    contentZh: `# 技能创建器

您是创建 AI Agent 技能的专家。当用户想要创建或修改技能时使用此技能。

## 使用时机

- 用户想要创建新技能
- 用户想要修改现有技能
- 用户需要帮助构建技能

## 结构

技能包括：
1. **SKILL.md** - 主要技能定义
2. **README.md** - 文档（可选）
3. **src/** - 源代码（可选）

## SKILL.md 格式

\`\`\`markdown
# 技能名称

简要描述此技能的用途。

## 使用时机

当用户想要...

## 工作原理

技能功能的逐步解释。

## 示例

### 示例 1
\\\`\\\`\\\`code
示例代码
\\\`\\\`\\\`
\`\`\`

## 反模式

要避免的事情：
- 不要做 X
- 不要做 Y
\`\`\`

## 技巧

- 技巧 1
- 技巧 2
\`\`\`

## 变量

| 变量 | 描述 | 示例 |
|----------|-------------|---------|
| $ARGUMENTS | 用户提供的参数 | file.ts |
\`\`\`

## 输出

输出格式和期望。
\`\`\`

## 最佳实践

1. 保持技能专注于单一职责
2. 使用清晰、简洁的语言
3. 提供具体示例
4. 包含反模式
5. 用实际用例测试技能`,
    category: 'Development',
    categoryZh: '开发',
    source: 'anthropics/skills',
    installCommand: 'npx skills add anthropics/skills/skill-creator',
    stars: 37300,
    dateAdded: '2024-01-20',
  },
  {
    id: '19',
    name: 'better-auth-best-practices',
    description: 'Best practices for implementing authentication with Better Auth',
    descriptionZh: '使用 Better Auth 实现身份验证的最佳实践',
    content: `# Better Auth Best Practices

Follow these practices when implementing authentication with Better Auth.

## Installation

\`\`\`bash
npm install better-auth
\`\`\`

## Configuration

\`\`\`typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
  database: {
    type: "sqlite", // or "postgres"
    connectionString: process.env.DATABASE_URL
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }
  }
})
\`\`\`

## Security Best Practices

1. **Use environment variables** for all secrets
2. **Enable email verification** for production
3. **Use secure session cookies** with httpOnly, secure, sameSite
4. **Implement CSRF protection**
5. **Rate limit** authentication endpoints

## Session Management

\`\`\`typescript
// Server-side session check
import { getSession } from "better-auth/server"

export async function getUser(request: Request) {
  const session = await getSession(request.headers.get("cookie"))
  return session?.user
}
\`\`\`

## Protected Routes

\`\`\`typescript
import { auth } from "./auth"
import { redirect } from "next/navigation"

export async function requireAuth() {
  const session = await auth.api.getSession({
    headers: request.headers
  })
  
  if (!session) {
    redirect("/sign-in")
  }
  return session.user
}
\`\`\`

## Database Schema

Better Auth manages the database schema automatically. Supported databases:
- SQLite
- PostgreSQL
- MySQL
- MongoDB

## Client Usage

\`\`\`typescript
import { createAuthClient } from "better-auth/react"

const authClient = createAuthClient()

// Sign in
await authClient.signIn.email({
  email: "user@example.com",
  password: "password"
})

// Get current user
const session = await authClient.getSession()
\`\`\`

## Webhooks

\`\`\`typescript
import { auth } from "./auth"

auth.api.onAfterSignIn(async ({ user, session }) => {
  // Run after sign in
  console.log("User signed in:", user.email)
})
\`\`\`

## Multi-factor Authentication

\`\`\`typescript
export const auth = betterAuth({
  // Enable MFA
  advanced: {
    enableMultiFactorSession: true
  }
})
\`\`\``,
    contentZh: `# Better Auth 最佳实践

使用 Better Auth 实现身份验证时遵循以下实践。

## 安装

\`\`\`bash
npm install better-auth
\`\`\`

## 配置

\`\`\`typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
  database: {
    type: "sqlite", // 或 "postgres"
    connectionString: process.env.DATABASE_URL
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }
  }
})
\`\`\`

## 安全最佳实践

1. **对所有密钥使用环境变量**
2. **在生产环境中启用邮箱验证**
3. **使用安全的会话 cookie**，设置 httpOnly、secure、sameSite
4. **实施 CSRF 保护**
5. **对认证端点进行速率限制**

## 会话管理

\`\`\`typescript
// 服务端会话检查
import { getSession } from "better-auth/server"

export async function getUser(request: Request) {
  const session = await getSession(request.headers.get("cookie"))
  return session?.user
}
\`\`\`

## 受保护路由

\`\`\`typescript
import { auth } from "./auth"
import { redirect } from "next/navigation"

export async function requireAuth() {
  const session = await auth.api.getSession({
    headers: request.headers
  })
  
  if (!session) {
    redirect("/sign-in")
  }
  return session.user
}
\`\`\`

## 数据库模式

Better Auth 自动管理数据库模式。支持的数据库：
- SQLite
- PostgreSQL
- MySQL
- MongoDB

## 客户端使用

\`\`\`typescript
import { createAuthClient } from "better-auth/react"

const authClient = createAuthClient()

// 登录
await authClient.signIn.email({
  email: "user@example.com",
  password: "password"
})

// 获取当前用户
const session = await authClient.getSession()
\`\`\`

## Webhooks

\`\`\`typescript
import { auth } from "./auth"

auth.api.onAfterSignIn(async ({ user, session }) => {
  // 登录后运行
  console.log("User signed in:", user.email)
})
\`\`\`

## 多因素认证

\`\`\`typescript
export const auth = betterAuth({
  // 启用 MFA
  advanced: {
    enableMultiFactorSession: true
  }
})
\`\`\``,
    category: 'Development',
    categoryZh: '开发',
    source: 'better-auth/skills',
    installCommand: 'npx skills add better-auth/skills/better-auth-best-practices',
    stars: 12500,
    dateAdded: '2024-02-10',
  },
  {
    id: '20',
    name: 'audit-website',
    description: 'Audit websites for SEO, technical, content, performance and security issues',
    descriptionZh: '审计网站的 SEO、技术、内容、性能和安全问题',
    content: `# Website Audit Skill

Audit websites for SEO, technical, content, performance and security issues using the squirrelscan cli.

squirrelscan provides a cli tool squirrel - available for macos, windows and linux. It carries out extensive website auditing by emulating a browser, search crawler, and analyzing the website's structure and content against over 230+ rules.

It will provide you a list of issues as well as suggestions on how to fix them.

## Prerequisites

This skill requires the squirrel CLI installed and in PATH.

**Install:** squirrelscan.com/download

**Verify:**
\`\`\`bash
squirrel --version
\`\`\`

## Setup

Run \`squirrel init\` to create a \`squirrel.toml\` config in the current directory.

## Usage

### Basic Workflow

\`\`\`bash
# Run audit
squirrel audit https://example.com --format llm

# Export report
squirrel report <audit-id> --format llm
\`\`\`

### Coverage Modes

- \`quick\`: 25 pages - CI checks, fast health check
- \`surface\`: 100 pages - General audits (default)
- \`full\`: 500 pages - Deep analysis

### Score Targets

| Starting Score | Target Score | Expected Work |
|----------------|--------------|---------------|
| < 50 (Grade F) | 75+ (Grade C) | Major fixes |
| 50-70 (Grade D) | 85+ (Grade B) | Moderate fixes |
| 70-85 (Grade C) | 90+ (Grade A) | Polish |
| > 85 (Grade B+) | 95+ | Fine-tuning |

## Issue Categories

- SEO issues: Meta tags, titles, descriptions, canonical URLs
- Technical problems: Broken links, redirect chains, page speed
- Performance: Page load time, resource usage, caching
- Content quality: Heading structure, image alt text
- Security: Leaked secrets, HTTPS usage, security headers
- Accessibility: Alt text, color contrast, keyboard navigation

## When to Use

- Analyze a website's health
- Debug technical SEO issues
- Check for broken links
- Validate meta tags and structured data
- Generate site audit reports
- Compare site health before/after changes

## Process

1. Run the audit and present the report
2. Propose fixes and ask user to confirm
3. Apply fixes using subagents for parallel execution
4. Re-audit to verify improvements
5. Show before/after comparison`,
    contentZh: `# 网站审计技能

使用 squirrelscan cli 审计网站的 SEO、技术、内容、性能和安全问题。

squirrelscan 提供了一个 cli 工具 squirrel，适用于 macos、windows 和 linux。它通过模拟浏览器、搜索爬虫，并针对 230 多条规则分析网站的结构和内容，进行广泛的网站审计。

它将为您提供问题列表以及如何修复的建议。

## 前提条件

此技能需要安装 squirrel CLI 并在 PATH 中。

**安装：** squirrelscan.com/download

**验证：**
\`\`\`bash
squirrel --version
\`\`\`

## 设置

运行 \`squirrel init\` 在当前目录创建 \`squirrel.toml\` 配置。

## 使用方法

### 基本工作流程

\`\`\`bash
# 运行审计
squirrel audit https://example.com --format llm

# 导出报告
squirrel report <audit-id> --format llm
\`\`\`

### 覆盖模式

- \`quick\`：25 页 - CI 检查，快速健康检查
- \`surface\`：100 页 - 一般审计（默认）
- \`full\`：500 页 - 深度分析

### 分数目标

| 起始分数 | 目标分数 | 预期工作 |
|----------|----------|----------|
| < 50 (F级) | 75+ (C级) | 主要修复 |
| 50-70 (D级) | 85+ (B级) | 中等修复 |
| 70-85 (C级) | 90+ (A级) | 完善 |
| > 85 (B+级) | 95+ | 微调 |

## 问题类别

- SEO 问题：元标签、标题、描述、规范 URL
- 技术问题：断链、重定向链、页面速度
- 性能：页面加载时间、资源使用、缓存
- 内容质量：标题结构、图片 alt 文本
- 安全：泄露密钥、HTTPS 使用、安全头
- 可访问性：alt 文本、颜色对比度、键盘导航

## 使用时机

- 分析网站健康状况
- 调试技术 SEO 问题
- 检查断链
- 验证元标签和结构化数据
- 生成站点审计报告
- 比较更改前后的站点健康状况

## 流程

1. 运行审计并展示报告
2. 提出修复方案并请用户确认
3. 使用子代理并行执行修复
4. 重新审计以验证改进
5. 展示修复前后对比`,
    category: 'Development',
    categoryZh: '开发',
    source: 'squirrelscan/skills',
    installCommand: 'npx skills add squirrelscan/skills/audit-website',
    stars: 21800,
    dateAdded: '2024-01-22',
  },
  {
    id: '21',
    name: 'seo-audit',
    description:
      'Expert in search engine optimization, identify SEO issues and provide recommendations',
    descriptionZh: '搜索引擎优化专家，识别 SEO 问题并提供可操作建议',
    content: `# SEO Audit

You are an expert in search engine optimization. Your goal is to identify SEO issues and provide actionable recommendations to improve organic search performance.

## Audit Framework

### Priority Order

1. **Crawlability & Indexation** - Can Google find and index it?
2. **Technical Foundations** - Is the site fast and functional?
3. **On-Page Optimization** - Is content optimized?
4. **Content Quality** - Does it deserve to rank?
5. **Authority & Links** - Does it have credibility?

## Technical SEO Audit

### Crawlability

- **Robots.txt**: Check for unintentional blocks, verify important pages allowed
- **XML Sitemap**: Exists, accessible, submitted to Search Console
- **Site Architecture**: Important pages within 3 clicks of homepage

### Indexation

- **Index Status**: site:domain.com check
- **Issues**: Noindex tags, canonical problems, redirect chains, soft 404s

### Site Speed & Core Web Vitals

- **LCP**: < 2.5s
- **INP**: < 200ms  
- **CLS**: < 0.1

### Mobile-Friendliness

- Responsive design, tap target sizes, viewport configured

## On-Page SEO Audit

### Title Tags

- Unique titles for each page
- Primary keyword near beginning
- 50-60 characters visible in SERP

### Meta Descriptions

- Unique descriptions per page
- 150-160 characters
- Includes primary keyword

### Heading Structure

- One H1 per page
- H1 contains primary keyword
- Logical hierarchy

### Content Optimization

- Keyword in first 100 words
- Related keywords naturally used
- Sufficient depth for topic

## Output Format

### Audit Report Structure

**Executive Summary**
- Overall health assessment
- Top 3-5 priority issues

**Technical SEO Findings**
For each issue:
- **Issue**: What's wrong
- **Impact**: SEO impact (High/Medium/Low)
- **Evidence**: How you found it
- **Fix**: Specific recommendation

**Prioritized Action Plan**
1. Critical fixes (blocking indexation/ranking)
2. High-impact improvements
3. Quick wins
4. Long-term recommendations`,
    contentZh: `# SEO 审计

您是搜索引擎优化专家。您的目标是识别 SEO 问题并提供可操作的建议，以提高自然搜索性能。

## 审计框架

### 优先级顺序

1. **可抓取性和索引** - Google 能否找到并索引？
2. **技术基础** - 网站是否快速且功能正常？
3. **页面优化** - 内容是否已优化？
4. **内容质量** - 值得排名吗？
5. **权威性和链接** - 是否有可信度？

## 技术 SEO 审计

### 可抓取性

- **Robots.txt**：检查无意的阻止，验证重要页面是否允许
- **XML Sitemap**：存在、可访问、已提交到 Search Console
- **网站架构**：重要页面在主页 3 次点击内

### 索引

- **索引状态**：site:domain.com 检查
- **问题**：noindex 标签、规范问题、重定向链、软 404

### 网站速度和核心 Web 指标

- **LCP**：< 2.5 秒
- **INP**：< 200 毫秒
- **CLS**：< 0.1

### 移动友好性

- 响应式设计、点击目标尺寸、视口配置

## 页面 SEO 审计

### 标题标签

- 每个页面唯一的标题
- 主要关键词靠近开头
- SERP 中可见 50-60 个字符

### 元描述

- 每个页面唯一的描述
- 150-160 个字符
- 包含主要关键词

### 标题结构

- 每个页面一个 H1
- H1 包含主要关键词
- 逻辑层级

### 内容优化

- 关键词在前 100 个字内
- 自然使用相关关键词
- 对主题有足够的深度

## 输出格式

### 审计报告结构

**执行摘要**
- 整体健康评估
- 前 3-5 个优先问题

**技术 SEO 发现**
每个问题：
- **问题**：出了什么问题
- **影响**：SEO 影响（高/中/低）
- **证据**：如何发现的
- **修复**：具体建议

**优先级行动计划**
1. 关键修复（阻止索引/排名）
2. 高影响改进
3. 快速见效
4. 长期建议`,
    category: 'Marketing',
    categoryZh: '营销',
    source: 'coreyhaines31/marketingskills',
    installCommand: 'npx skills add coreyhaines31/marketingskills/seo-audit',
    stars: 20800,
    dateAdded: '2024-01-16',
  },
  {
    id: '22',
    name: 'brainstorming',
    description:
      'Help turn ideas into fully formed designs and specs through collaborative dialogue',
    descriptionZh: '通过协作对话帮助将想法转化为完整的设计和规范',
    content: `# Brainstorming Ideas Into Designs

## Overview

Help turn ideas into fully formed designs and specs through natural collaborative dialogue.

Start by understanding the current project context, then ask questions one at a time to refine the idea. Once you understand what you're building, present the design and get user approval.

## Anti-Pattern

**"This Is Too Simple To Need A Design"**

Every project goes through this process. A todo list, a single-function utility, a config change — all of them. "Simple" projects are where unexamined assumptions cause the most wasted work. The design can be short, but you MUST present it and get approval.

## Checklist

1. **Explore project context** — check files, docs, recent commits
2. **Ask clarifying questions** — one at a time, understand purpose/constraints/success criteria
3. **Propose 2-3 approaches** — with trade-offs and your recommendation
4. **Present design** — in sections scaled to complexity, get user approval after each section
5. **Write design doc** — save to \`docs/plans/YYYY-MM-DD-<topic>-design.md\`
6. **Transition to implementation** — invoke writing-plans skill

## Process Flow

**Understanding the idea:**
- Check current project state first (files, docs, recent commits)
- Ask questions one at a time to refine the idea
- Focus on understanding: purpose, constraints, success criteria

**Exploring approaches:**
- Propose 2-3 different approaches with trade-offs
- Present options with your recommendation and reasoning

**Presenting the design:**
- Present the design once you understand what you're building
- Scale each section to its complexity
- Cover: architecture, components, data flow, error handling, testing

## Key Principles

- **One question at a time** - Don't overwhelm
- **Multiple choice preferred** - Easier to answer
- **YAGNI ruthlessly** - Remove unnecessary features
- **Explore alternatives** - Always propose 2-3 approaches
- **Incremental validation** - Get approval before moving on
- **Be flexible** - Go back when something doesn't make sense`,
    contentZh: `# 将想法转化为设计

## 概述

通过自然的协作对话帮助将想法转化为完整的设计和规范。

首先了解当前项目背景，然后一次提出一个问题来完善想法。一旦您理解了要构建的内容，请展示设计并获得用户批准。

## 反模式

**"这太简单了，不需要设计"**

每个项目都会经历这个过程。待办事项列表、单功能实用程序、配置更改——所有这些。"简单"项目是未经验证的假设导致最多浪费工作的地方。设计可以很短，但您必须展示它并获得批准。

## 检查清单

1. **探索项目背景** — 检查文件、文档、最近提交
2. **提出澄清问题** — 一次一个，了解目的/约束/成功标准
3. **提出 2-3 种方法** — 包含权衡和您的建议
4. **展示设计** — 按复杂性分节展示，每节后获得用户批准
5. **编写设计文档** — 保存到 \`docs/plans/YYYY-MM-DD-<topic>-design.md\`
6. **过渡到实施** — 调用 writing-plans 技能

## 流程

**理解想法：**
- 首先检查当前项目状态（文件、文档、最近提交）
- 一次提出一个问题来完善想法
- 专注于理解：目的、约束、成功标准

**探索方法：**
- 提出 2-3 种不同的方法及权衡
- 展示选项并说明您的建议和理由

**展示设计：**
- 一旦理解要构建的内容就展示设计
- 根据复杂性调整每节
- 涵盖：架构、组件、数据流、错误处理、测试

## 关键原则

- **一次一个问题** - 不要让人不知所措
- **多项选择更好** - 更容易回答
- **严格遵循 YAGNI** - 删除不必要的功能
- **探索替代方案** - 始终提出 2-3 种方法
- **增量验证** - 在继续之前获得批准
- **保持灵活** - 当事情不合理时返回`,
    category: 'Product',
    categoryZh: '产品',
    source: 'obra/superpowers',
    installCommand: 'npx skills add obra/superpowers/brainstorming',
    stars: 22100,
    dateAdded: '2024-01-16',
  },
  {
    id: '23',
    name: 'writing-plans',
    description: 'Create detailed implementation plans from design documents',
    descriptionZh: '从设计文档创建详细实施计划',
    content: `# Writing Plans

Create detailed implementation plans from design documents.

## When to Use

- After brainstorming creates a design
- Before starting implementation
- When breaking down complex features

## Process

### 1. Analyze Design Document

- Read the design doc thoroughly
- Identify all components and features
- Note any unclear requirements

### 2. Break Into Tasks

- Identify independent tasks that can run in parallel
- Break complex features into smaller chunks
- Order tasks by dependency

### 3. Create Task Structure

For each task include:
- **Description**: What this task accomplishes
- **Files**: Files to modify/create
- **Dependencies**: What must be done first
- **Testing**: How to verify the implementation

### 4. Estimate Complexity

- Simple: < 1 hour
- Medium: 1-4 hours
- Complex: > 4 hours (break down further)

## Output Format

\`\`\`markdown
## Task: <task name>

**Complexity**: <Simple|Medium|Complex>
**Estimate**: <time>

### Files
- \`src/file.ts\` - Description

### Implementation
1. Step 1
2. Step 2

### Testing
- Verify by checking...
\`\`\`

## Guidelines

- Keep tasks small and manageable
- Focus on one concern per task
- Include error handling in plans
- Consider edge cases
- Add verification steps`,
    contentZh: `# 编写计划

从设计文档创建详细的实施计划。

## 使用时机

- 头脑风暴创建设计之后
- 开始实施之前
- 分解复杂功能时

## 流程

### 1. 分析设计文档

- 彻底阅读设计文档
- 识别所有组件和功能
- 记下任何不清楚的需求

### 2. 分解为任务

- 识别可以并行运行的独立任务
- 将复杂功能分解为更小的块
- 按依赖关系排序任务

### 3. 创建任务结构

每个任务包括：
- **描述**：此任务完成什么
- **文件**：要修改/创建的文件
- **依赖**：什么必须先完成
- **测试**：如何验证实现

### 4. 评估复杂性

- 简单：< 1 小时
- 中等：1-4 小时
- 复杂：> 4 小时（进一步分解）

## 输出格式

\`\`\`markdown
## 任务：<任务名称>

**复杂性**：<简单|中等|复杂>
**估计**：<时间>

### 文件
- \`src/file.ts\` - 描述

### 实施
1. 步骤 1
2. 步骤 2

### 测试
- 通过检查...验证
\`\`\`

## 指南

- 保持任务小且可管理
- 每个任务关注一个关注点
- 在计划中包括错误处理
- 考虑边缘情况
- 添加验证步骤`,
    category: 'Product',
    categoryZh: '产品',
    source: 'obra/superpowers',
    installCommand: 'npx skills add obra/superpowers/writing-plans',
    stars: 10700,
    dateAdded: '2024-01-18',
  },
  {
    id: '24',
    name: 'copywriting',
    description: 'Expert at writing marketing copy that converts',
    descriptionZh: '撰写转化率高的营销文案专家',
    content: `# Copywriting

Expert at writing marketing copy that converts.

## Core Principles

### AIDA Model
- **Attention**: Hook with a compelling headline
- **Interest**: Keep them reading with relevant details
- **Desire**: Show benefits, not features
- **Action**: Clear call to action

### Voice & Tone

- Active voice: "Install the CLI" not "The CLI will be installed"
- Second person: "You" and "your"
- Conversational but professional
- Short sentences, scannable format

### Headlines

- Specific, not generic: "Save 3 hours/day" not "Save time"
- Numbers work: "7 ways" beats "Ways to"
- Power words: Secret, proven, exclusive, instant

### Benefits Over Features

- **Feature**: "256-bit encryption"
- **Benefit**: "Your data is military-grade secure"

### CTAs

- Specific: "Start free trial" not "Submit"
- Action-oriented verbs: Get, start, download, join
- Create urgency when appropriate

## Types of Copy

### Landing Pages
- Hero headline
- Subheadline expanding on value prop
- 3 key benefits
- Social proof
- CTA

### Product Descriptions
- One-line hook
- Benefits list
- Usage scenarios
- Objection handling

### Emails
- Personal greeting
- Hook in first line
- Clear purpose
- Single CTA

### Ads
- Tight headline
- Relevant to audience
- Clear CTA
- Match landing page promise

## Tips

- Write first, edit later
- Read aloud to catch awkwardness
- A/B test CTAs
- Match user's vocabulary`,
    contentZh: `# 文案撰写

撰写转化率高的营销文案专家。

## 核心原则

### AIDA 模型
- **注意**：用引人注目的标题吸引注意
- **兴趣**：用相关细节保持阅读
- **欲望**：展示好处，而不是功能
- **行动**：明确的行动号召

### 声音和语气

- 主动语态："Install the CLI"而不是"The CLI will be installed"
- 第二人称："You"和"your"
- 对话式但专业
- 短句、可扫描格式

### 标题

- 具体而非笼统："Save 3 hours/day"而不是"Save time"
- 数字有效："7 ways"比"Ways to"好
- 有力词汇：Secret、proven、exclusive、instant

### 好处优于功能

- **功能**："256-bit encryption"
- **好处**："Your data is military-grade secure"

### CTA

- 具体："Start free trial"而不是"Submit"
- 动作导向动词：Get、start、download、join
- 适当创造紧迫感

## 文案类型

### 落地页
- 英雄标题
- 阐述价值主张的副标题
- 3 个关键好处
- 社会证明
- CTA

### 产品描述
- 一句话钩子
- 好处列表
- 使用场景
- 解决异议

### 邮件
- 个人问候
- 第一行钩子
- 明确目的
- 单一 CTA

### 广告
- 紧凑标题
- 与受众相关
- 明确 CTA
- 与落地页承诺一致

## 技巧

- 先写后改
- 大声朗读以发现awkwardness
- A/B 测试 CTA
- 匹配用户词汇`,
    category: 'Marketing',
    categoryZh: '营销',
    source: 'coreyhaines31/marketingskills',
    installCommand: 'npx skills add coreyhaines31/marketingskills/copywriting',
    stars: 15300,
    dateAdded: '2024-01-17',
  },
  {
    id: '25',
    name: 'webapp-testing',
    description: 'Best practices for testing web applications',
    descriptionZh: '测试 Web 应用程序的最佳实践',
    content: `# Webapp Testing

Best practices for testing web applications.

## Testing Pyramid

- **Unit Tests**: 70% - Fast, isolated, many
- **Integration Tests**: 20% - Test component interactions
- **E2E Tests**: 10% - Critical user flows

## Unit Tests

### What to Test
- Utility functions
- Complex logic
- Edge cases
- Error handling

### What NOT to Test
- Implementation details
- Third-party code
- Simple getters/setters

### Example
\`\`\`typescript
describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1000, 'USD')).toBe('$1,000.00')
  })
})
\`\`\`

## Component Testing

### React Testing Library
\`\`\`typescript
test('button click handler', () => {
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Click</Button>)
  fireEvent.click(screen.getByText('Click'))
  expect(onClick).toHaveBeenCalled()
})
\`\`\`

### Best Practices
- Test behavior, not implementation
- Use semantic queries (getByRole, getByText)
- Test accessibility

## Integration Tests

### API Testing
\`\`\`typescript
test('GET /users returns users', async () => {
  const res = await request(app).get('/users')
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(3)
})
\`\`\`

## E2E Testing

### Playwright
\`\`\`typescript
test('user can sign in', async ({ page }) => {
  await page.goto('/sign-in')
  await page.fill('[name=email]', 'test@example.com')
  await page.fill('[name=password]', 'password')
  await page.click('button[type=submit]')
  await expect(page).toHaveURL('/dashboard')
})
\`\`\`

### What to Test
- Critical user journeys
- Authentication flows
- Payment flows
- Key conversions

## Mocking

### MSW (Mock Service Worker)
\`\`\`typescript
import { http, HttpResponse } from 'msw'
const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({ name: 'John' })
  })
]
\`\`\`

## Coverage

- Aim for 70-80% coverage
- Focus on critical paths
- Coverage is a tool, not a goal`,
    contentZh: `# Web 应用测试

测试 Web 应用程序的最佳实践。

## 测试金字塔

- **单元测试**：70% - 快速、隔离、很多
- **集成测试**：20% - 测试组件交互
- **端到端测试**：10% - 关键用户流程

## 单元测试

### 测试什么
- 实用函数
- 复杂逻辑
- 边缘情况
- 错误处理

### 什么不测试
- 实现细节
- 第三方代码
- 简单的 getter/setter

### 示例
\`\`\`typescript
describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1000, 'USD')).toBe('$1,000.00')
  })
})
\`\`\`

## 组件测试

### React Testing Library
\`\`\`typescript
test('button click handler', () => {
  const onClick = vi.fn()
  render(<Button onClick={onClick}>Click</Button>)
  fireEvent.click(screen.getByText('Click'))
  expect(onClick).toHaveBeenCalled()
})
\`\`\`

### 最佳实践
- 测试行为，而非实现
- 使用语义查询（getByRole、getByText）
- 测试可访问性

## 集成测试

### API 测试
\`\`\`typescript
test('GET /users returns users', async () => {
  const res = await request(app).get('/users')
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(3)
})
\`\`\`

## 端到端测试

### Playwright
\`\`\`typescript
test('user can sign in', async ({ page }) => {
  await page.goto('/sign-in')
  await page.fill('[name=email]', 'test@example.com')
  await page.fill('[name=password]', 'password')
  await page.click('button[type=submit]')
  await expect(page).toHaveURL('/dashboard')
})
\`\`\`

### 测试什么
- 关键用户旅程
- 认证流程
- 支付流程
- 关键转化

## 模拟

### MSW (Mock Service Worker)
\`\`\`typescript
import { http, HttpResponse } from 'msw'
const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({ name: 'John' })
  })
]
\`\`\`

## 覆盖率

- 目标是 70-80% 覆盖率
- 专注于关键路径
- 覆盖率是工具，不是目标`,
    category: 'Development',
    categoryZh: '开发',
    source: 'anthropics/skills',
    installCommand: 'npx skills add anthropics/skills/webapp-testing',
    stars: 11100,
    dateAdded: '2024-01-25',
  },
  {
    id: '26',
    name: 'building-native-ui',
    description: 'Best practices for building native mobile UIs with Expo',
    descriptionZh: '使用 Expo 构建原生移动 UI 的最佳实践',
    content: `# Building Native UI

Best practices for building native mobile UIs with Expo.

## Core Principles

### Platform-Specific Design
- iOS and Android have different design languages
- Respect platform conventions
- Use platform-specific components

### Performance
- List virtualization with FlashList
- Memoization with React.memo
- Lazy loading for heavy assets
- Optimize bundle size

### Navigation
- React Navigation for routing
- Deep linking configuration
- Proper navigation state
- Type-safe navigation

## Components

### Lists
\`\`\`typescript
import { FlashList } from '@shopify/flash-list'

<FlashList
  data={items}
  renderItem={({ item }) => <Item item={item} />}
  estimatedItemSize={100}
/>
\`\`\`

### Forms
- Use controlled components
- Validate on blur and submit
- Show inline errors
- Handle keyboard avoiding

### Modals
- Use native modals when possible
- Handle safe areas
- Proper dismiss handling

## Native Modules

### When to Use
- Performance-critical features
- Platform-specific APIs
- Native UI components

### Best Practices
- Test on both platforms
- Handle platform differences
- Provide fallbacks

## Gestures

### React Native Gesture Handler
\`\`\`typescript
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

const panGesture = Gesture.Pan()
  .onUpdate((e) => {
    translateX.value = e.translationX
  })
\`\`\`

## Animations

### Reanimated
\`\`\`typescript
import { useSharedValue, useAnimatedStyle } from 'react-native-reanimated'

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ translateX: translateX.value }]
}))
\`\`\`

## Accessibility

- Semantic labels
- Proper contrast ratios
- Support screen readers
- Test with VoiceOver/TalkBack`,
    contentZh: `# 构建原生 UI

使用 Expo 构建原生移动 UI 的最佳实践。

## 核心原则

### 平台特定设计
- iOS 和 Android 有不同的设计语言
- 尊重平台约定
- 使用平台特定组件

### 性能
- 使用 FlashList 进行列表虚拟化
- 使用 React.memo 进行记忆化
- 延迟加载重资源
- 优化包大小

### 导航
- 使用 React Navigation 进行路由
- 深度链接配置
- 正确的导航状态
- 类型安全的导航

## 组件

### 列表
\`\`\`typescript
import { FlashList } from '@shopify/flash-list'

<FlashList
  data={items}
  renderItem={({ item }) => <Item item={item} />}
  estimatedItemSize={100}
/>
\`\`\`

### 表单
- 使用受控组件
- 在 blur 和提交时验证
- 显示内联错误
- 处理键盘避免

### 模态框
- 尽可能使用原生模态框
- 处理安全区域
- 正确的关闭处理

## 原生模块

### 何时使用
- 性能关键功能
- 平台特定 API
- 原生 UI 组件

### 最佳实践
- 在两个平台上测试
- 处理平台差异
- 提供后备方案

## 手势

### React Native Gesture Handler
\`\`\`typescript
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

const panGesture = Gesture.Pan()
  .onUpdate((e) => {
    translateX.value = e.translationX
  })
\`\`\`

## 动画

### Reanimated
\`\`\`typescript
import { useSharedValue, useAnimatedStyle } from 'react-native-reanimated'

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ translateX: translateX.value }]
}))
\`\`\`

## 可访问性

- 语义标签
- 正确的对比度
- 支持屏幕阅读器
- 使用 VoiceOver/TalkBack 测试`,
    category: 'Mobile',
    categoryZh: '移动开发',
    source: 'expo/skills',
    installCommand: 'npx skills add expo/skills/building-native-ui',
    stars: 10600,
    dateAdded: '2024-01-28',
  },
  {
    id: '27',
    name: 'programmatic-seo',
    description: 'Build SEO pages at scale using programmatic approaches',
    descriptionZh: '使用程序化方法大规模构建 SEO 页面',
    content: `# Programmatic SEO

Build SEO pages at scale using programmatic approaches.

## Concept

Programmatic SEO = Templates + Data = Thousands of landing pages

Instead of creating pages manually, create templates that generate pages from data.

## When to Use

- Large number of similar pages needed
- Location-based pages (cities, states)
- Product category pages
- Comparison pages
- Resource directories

## Components

### Template Design
\`\`\`typescript
// /pages/[city]/[service].tsx
export async function getStaticPaths() {
  const cities = await getCities()
  const services = await getServices()
  
  const paths = cities.flatMap(city =>
    services.map(service => ({
      params: { city: city.slug, service: service.slug }
    }))
  )
  
  return { paths, fallback: 'blocking' }
}
\`\`\`

### Data Sources
- Databases
- APIs
- Static JSON/CSV
- CMS

### URL Structure
- \`/guides/{topic}\`
- \`/tools/{tool-name}\`
- \`/{location}/{service}\`

### Content Variation
- Headlines: "{City} {Service}"
- Meta descriptions: "Best {service} in {city}"
- Intro paragraphs: Local context
- Images: Location-specific

## Best Practices

1. **Unique content per page** - Not just title swaps
2. **Real data sources** - Keep pages updated
3. **Proper internal linking** - Connect related pages
4. **Monitor performance** - Track rankings per page
5. **Avoid thin content** - Add valuable content

## Metrics to Track

- Pages indexed
- Organic traffic per page
- Rankings for target keywords
- Conversion rates
- Bounce rates

## Tools

- Next.js ISR/SSG
- Prerender.io
- BrightEdge
- Conductor`,
    contentZh: `# 程序化 SEO

使用程序化方法大规模构建 SEO 页面。

## 概念

程序化 SEO = 模板 + 数据 = 数千个落地页

不手动创建页面，而是创建从数据生成页面的模板。

## 使用时机

- 需要大量相似页面
- 基于位置的页面（城市、州）
- 产品类别页面
- 比较页面
- 资源目录

## 组件

### 模板设计
\`\`\`typescript
// /pages/[city]/[service].tsx
export async function getStaticPaths() {
  const cities = await getCities()
  const services = await getServices()
  
  const paths = cities.flatMap(city =>
    services.map(service => ({
      params: { city: city.slug, service: service.slug }
    }))
  )
  
  return { paths, fallback: 'blocking' }
}
\`\`\`

### 数据源
- 数据库
- API
- 静态 JSON/CSV
- CMS

### URL 结构
- \`/guides/{topic}\`
- \`/tools/{tool-name}\`
- \`/{location}/{service}\`

### 内容变化
- 标题："{City} {Service}"
- 元描述："Best {service} in {city}"
- 介绍段落：本地上下文
- 图片：位置特定

## 最佳实践

1. **每页唯一内容** - 不只是标题交换
2. **真实数据源** - 保持页面更新
3. **正确的内部链接** - 连接相关页面
4. **监控性能** - 跟踪每页排名
5. **避免薄弱内容** - 添加有价值的内容

## 跟踪的指标

- 索引页面数
- 每页自然流量
- 目标关键词排名
- 转化率
- 跳出率

## 工具

- Next.js ISR/SSG
- Prerender.io
- BrightEdge
- Conductor`,
    category: 'Marketing',
    categoryZh: '营销',
    source: 'coreyhaines31/marketingskills',
    installCommand: 'npx skills add coreyhaines31/marketingskills/programmatic-seo',
    stars: 10000,
    dateAdded: '2024-01-20',
  },
  {
    id: '28',
    name: 'content-strategy',
    description: 'Plan and execute content strategy for growth',
    descriptionZh: '规划和执行增长内容策略',
    content: `# Content Strategy

Plan and execute content strategy for growth.

## Framework

### 1. Define Goals
- Traffic growth
- Lead generation
- Brand awareness
- Customer education

### 2. Know Your Audience
- Demographics
- Pain points
- Questions they ask
- Content preferences

### 3. Content Types

| Type | Purpose | Format |
|------|---------|--------|
| Blog posts | SEO, education | 1500+ words |
| Guides | In-depth help | 3000+ words |
| Case studies | Credibility | Story + metrics |
| Videos | Engagement | 2-10 minutes |
| Podcasts | Thought leadership | 20-60 minutes |

### 4. Distribution

- Organic search
- Social media
- Email
- Paid promotion

## Content Pillars

Create 3-5 content pillars representing main topics:

1. **Pillar**: Broad topic area
2. **Cluster content**: Supporting articles
3. **Internal links**: Connect pillar to clusters

## SEO Integration

### Keyword Research
- Target keywords per piece
- Long-tail opportunities
- Search intent alignment

### On-Page SEO
- Proper headings
- Meta optimized
- Internal linking

## Content Calendar

- Plan 3-6 months ahead
- Mix of content types
- Account for seasonality
- Include promotion schedule

## Measurement

### KPIs
- Organic traffic
- Time on page
- Conversion rate
- Shares/backlinks

### Tools
- Google Analytics
- Search Console
- Ahrefs/Semrush
- Buffer`,
    contentZh: `# 内容策略

规划和执行增长内容策略。

## 框架

### 1. 定义目标
- 流量增长
- 潜在客户生成
- 品牌知名度
- 客户教育

### 2. 了解受众
- 人口统计
- 痛点
- 提出的问题
- 内容偏好

### 3. 内容类型

| 类型 | 目的 | 格式 |
|------|------|------|
| 博客文章 | SEO、教育 | 1500+ 字 |
| 指南 | 深入帮助 | 3000+ 字 |
| 案例研究 | 可信度 | 故事+指标 |
| 视频 | 参与度 | 2-10 分钟 |
| 播客 | 思想领导力 | 20-60 分钟 |

### 4. 分发

- 自然搜索
- 社交媒体
- 邮件
- 付费推广

## 内容支柱

创建 3-5 个代表主要主题的内容支柱：

1. **支柱**：广泛的主题领域
2. **集群内容**：支持文章
3. **内部链接**：将支柱连接到集群

## SEO 集成

### 关键词研究
- 每个内容的目标关键词
- 长尾机会
- 搜索意图一致性

### 页面 SEO
- 正确的标题
- 元优化
- 内部链接

## 内容日历

- 提前 3-6 个月计划
- 混合内容类型
- 考虑季节性
- 包含推广计划

## 衡量

### KPI
- 自然流量
- 页面停留时间
- 转化率
- 分享/反向链接

### 工具
- Google Analytics
- Search Console
- Ahrefs/Semrush
- Buffer`,
    category: 'Marketing',
    categoryZh: '营销',
    source: 'coreyhaines31/marketingskills',
    installCommand: 'npx skills add coreyhaines31/marketingskills/content-strategy',
    stars: 9900,
    dateAdded: '2024-01-21',
  },
  {
    id: '29',
    name: 'product-marketing-context',
    description: 'Understand product context for marketing decisions',
    descriptionZh: '了解产品背景以做出营销决策',
    content: `# Product Marketing Context

Understand product context for marketing decisions.

## Product Context

### What You Building
- Product type: SaaS, e-commerce, tool, content
- Core value proposition
- Key features

### Target Audience
- Who is the customer?
- What's their role?
- What problems do they have?

### Market Position
- Competitive landscape
- Unique differentiators
- Pricing model

## Information Sources

### Required Context
- Product website
- Documentation
- Existing marketing materials
- Competitor analysis

### Questions to Answer
1. What does the product do?
2. Who is it for?
3. Why is it better?
4. How much does it cost?
5. What's the key message?

## For AI Tasks

When working on marketing tasks:
- Read product context first
- Reference specific features
- Match brand voice
- Consider audience

## Template

\`\`\`markdown
# Product: [Name]

## Overview
[1-2 sentence description]

## Target Audience
- Role: [Who]
- Pain points: [What problems]

## Value Proposition
[Core benefit in one sentence]

## Key Features
1. Feature 1
2. Feature 2
3. Feature 3

## Competitive Advantage
[What makes it different]

## Pricing
[Free/Paid/Tiered]

## Brand Voice
[Tone and style]
\`\`\``,
    contentZh: `# 产品营销背景

了解产品背景以做出营销决策。

## 产品背景

### 构建什么
- 产品类型：SaaS、电子商务、工具、内容
- 核心价值主张
- 关键功能

### 目标受众
- 客户是谁？
- 他们是什么角色？
- 他们有什么问题？

### 市场定位
- 竞争格局
- 独特差异点
- 定价模式

## 信息来源

### 必需背景
- 产品网站
- 文档
- 现有营销材料
- 竞争分析

### 需要回答的问题
1. 产品做什么？
2. 为谁做的？
3. 为什么更好？
4. 多少钱？
5. 关键信息是什么？

## AI 任务

处理营销任务时：
- 首先阅读产品背景
- 参考具体功能
- 匹配品牌声音
- 考虑受众

## 模板

\`\`\`markdown
# 产品：[名称]

## 概述
[1-2 句描述]

## 目标受众
- 角色：[谁]
- 痛点：[什么问题]

## 价值主张
[一句话的核心利益]

## 关键功能
1. 功能 1
2. 功能 2
3. 功能 3

## 竞争优势
[有什么不同]

## 定价
[免费/付费/分层]

## 品牌声音
[语气和风格]
\`\`\``,
    category: 'Marketing',
    categoryZh: '营销',
    source: 'coreyhaines31/marketingskills',
    installCommand: 'npx skills add coreyhaines31/marketingskills/product-marketing-context',
    stars: 9500,
    dateAdded: '2024-01-22',
  },
  {
    id: '30',
    name: 'marketing-psychology',
    description: 'Apply psychological principles to marketing',
    descriptionZh: '应用心理学原理于营销',
    content: `# Marketing Psychology

Apply psychological principles to marketing.

## Core Principles

### Social Proof
People look to others for guidance.

- Testimonials
- User counts
- "Used by X companies"
- Reviews/ratings

### Scarcity
Limited availability increases desire.

- Limited time offers
- Exclusive access
- "Only X left"
- Countdown timers

### Authority
People trust experts.

- Expert endorsements
- Industry awards
- "As seen in"
- Credentials

### Consistency
People want to stay consistent with past actions.

- Commitments
- Progress tracking
- Public declarations
- Account creation

### Liking
People buy from those they like.

- Similarity
- Compliments
- Cooperation
- Attractive images

### Reciprocity
People feel obligated to give back.

- Free trials
- Valuable content
- Samples
- Thank-you emails

## Cognitive Biases

### Anchoring
First impression sets the reference point.

- Original price before discount
- Premium tier before standard
- Industry statistics

### Loss Aversion
Losses feel worse than equivalent gains.

- "Don't lose your progress"
- Risk reversal
- Money-back guarantees

### Decoy Effect
Adding a third option changes choices.

- Good / Better / Best
- Personal / Team / Enterprise

## Copy Triggers

### FOMO
Fear of missing out

- "Join X others"
- "Registration closing soon"
- "Trending now"

### Curiosity
Open loops

- "The secret to..."
- "What happened next..."
- Case study hooks

### Benefits
What's in it for me?

- Lead with outcomes
- Use "you" language
- Specific numbers`,
    contentZh: `# 营销心理学

应用心理学原理于营销。

## 核心原则

### 社会认同
人们寻找他人的指导。

- 推荐语
- 用户数
- "被 X 家公司使用"
- 评论/评分

### 稀缺性
有限的可获得性增加欲望。

- 限时优惠
- 独家访问
- "仅剩 X 个"
- 倒计时

### 权威性
人们信任专家。

- 专家代言
- 行业奖项
- "如所见"
- 资质

### 一致性
人们希望与过去的行动保持一致。

- 承诺
- 进度跟踪
- 公开声明
- 账户创建

### 喜欢
人们从他们喜欢的人那里购买。

- 相似性
- 赞美
- 合作
- 有吸引力的图片

### 互惠
人们觉得有义务回报。

- 免费试用
- 有价值的内容
- 样品
- 感谢邮件

## 认知偏见

### 锚定
第一印象设定参考点。

- 折扣前的原价
- 标准版之前的高级版
- 行业统计

### 损失厌恶
损失比同等收益感觉更糟糕。

- "不要失去你的进度"
- 风险逆转
- 退款保证

### 引诱效应
添加第三个选项会改变选择。

- 个人/团队/企业

## 文案触发器

### FOMO
错失恐惧

- "加入其他人"
- "注册即将结束"
- "正在流行"

### 好奇心
打开闭环

- "...的秘密"
- "接下来发生了什么"
- 案例研究钩子

### 利益
这对我有什么好处？

- 以结果为导向
- 使用"你"的语言
- 具体数字`,
    category: 'Marketing',
    categoryZh: '营销',
    source: 'coreyhaines31/marketingskills',
    installCommand: 'npx skills add coreyhaines31/marketingskills/marketing-psychology',
    stars: 11600,
    dateAdded: '2024-01-23',
  },
  {
    id: '31',
    name: 'marketing-ideas',
    description: 'Generate and evaluate marketing ideas',
    descriptionZh: '生成和评估营销创意',
    content: `# Marketing Ideas

Generate and evaluate marketing ideas.

## Idea Generation

### Brainstorming Framework

1. **Quantity first** - Generate many ideas
2. **No judgment** - All ideas welcome
3. **Build on others** - Combine and enhance
4. **Go wild** - No idea too crazy

### Channels

- Content marketing
- Social media
- Email
- Paid ads
- Partnerships
- Events
- PR
- SEO

### Campaign Types

- Product launch
- Brand awareness
- Lead generation
- Retention
- Referral
- Seasonal

## Evaluation Criteria

### Potential Impact
- Reach
- Engagement
- Conversion potential

### Feasibility
- Budget
- Time
- Resources
- Technical requirements

### Brand Fit
- Consistent with brand voice
- Appeals to target audience
- Enhances brand

### Measurability
- Clear KPIs
- Attribution possible
- Data available

## Idea Template

\`\`\`markdown
## Idea: [Name]

**Type**: [Channel/Campaign]
**Target**: [Audience]

### Concept
[Description]

### Why It Works
[Psychological rationale]

### Resources Needed
- Time:
- Budget:
- Team:

### Success Metrics
- Primary:
- Secondary:

### Risks
[Potential issues]
\`\`\`

## Process

1. **Brief** - Understand goals and constraints
2. **Generate** - Produce many ideas
3. **Evaluate** - Score against criteria
4. **Select** - Choose best options
5. **Plan** - Detail execution
6. **Execute** - Implement
7. **Review** - Measure results`,
    contentZh: `# 营销创意

生成和评估营销创意。

## 创意生成

### 头脑风暴框架

1. **先求量** - 产生很多想法
2. **不评判** - 欢迎所有想法
3. **建立在他人基础上** - 结合和改进
4. **疯狂一点** - 没有任何想法太疯狂

### 渠道

- 内容营销
- 社交媒体
- 邮件
- 付费广告
- 合作伙伴
- 活动
- 公关
- SEO

### 活动类型

- 产品发布
- 品牌知名度
- 潜在客户生成
- 留存
- 推荐
- 季节性

## 评估标准

### 潜在影响
- 覆盖范围
- 参与度
- 转化潜力

### 可行性
- 预算
- 时间
- 资源
- 技术要求

### 品牌契合度
- 与品牌声音一致
- 吸引目标受众
- 增强品牌

### 可衡量性
- 明确的 KPI
- 可归因
- 数据可用

## 创意模板

\`\`\`markdown
## 创意：[名称]

**类型**：[渠道/活动]
**目标**：[受众]

### 概念
[描述]

### 为什么有效
[心理原理]

### 所需资源
- 时间：
- 预算：
- 团队：

### 成功指标
- 主要：
- 次要：

### 风险
[潜在问题]
\`\`\`

## 流程

1. **简报** - 了解目标和约束
2. **生成** - 产生很多想法
3. **评估** - 根据标准打分
4. **选择** - 选择最佳选项
5. **计划** - 详细执行
6. **执行** - 实施
7. **回顾** - 衡量结果`,
    category: 'Marketing',
    categoryZh: '营销',
    source: 'coreyhaines31/marketingskills',
    installCommand: 'npx skills add coreyhaines31/marketingskills/marketing-ideas',
    stars: 9000,
    dateAdded: '2024-01-24',
  },
  {
    id: '32',
    name: 'executing-plans',
    description: 'Execute implementation plans with precision',
    descriptionZh: '精确执行实施计划',
    content: `# Executing Plans

Execute implementation plans with precision.

## Before Starting

### Understand the Plan
- Read through all tasks
- Identify dependencies
- Clarify any ambiguities

### Prepare Environment
- Clone repositories
- Install dependencies
- Set up config

### Set Up Tracking
- Create task list
- Note blockers
- Set milestones

## During Execution

### One Task at a Time
- Focus on current task
- Complete before moving on
- Document progress

### Communication
- Update regularly
- Flag blockers early
- Ask questions

### Quality
- Write tests
- Follow code standards
- Review your own work

## After Each Task

### Verify
- Run tests
- Check functionality
- Test edge cases

### Document
- Update status
- Note what was done
- Record issues

### Commit
- Small, focused commits
- Clear messages
- Push regularly

## Common Issues

### Blockers
- Ask for help early
- Break into smaller tasks
- Move to parallel tasks

### Scope Creep
- Stick to original plan
- Note additions separately
- Get approval for changes

### Technical Debt
- Fix as you go
- Don't leave TODO comments
- Refactor when needed

## Completion

### Final Verification
- All tests pass
- No console errors
- Works as expected

### Documentation
- Update README if needed
- Document tricky parts
- Note any manual steps

### Handoff
- Explain what was done
- Note any follow-ups
- Share relevant context`,
    contentZh: `# 执行计划

精确执行实施计划。

## 开始之前

### 理解计划
- 通读所有任务
- 识别依赖关系
- 澄清任何歧义

### 准备环境
- 克隆仓库
- 安装依赖
- 设置配置

### 设置跟踪
- 创建任务列表
- 记录阻碍
- 设置里程碑

## 执行期间

### 一次一个任务
- 专注于当前任务
- 完成后再继续
- 记录进度

### 沟通
- 定期更新
- 尽早标记阻碍
- 提出问题

### 质量
- 编写测试
- 遵循代码标准
- 检查自己的工作

## 每个任务后

### 验证
- 运行测试
- 检查功能
- 测试边缘情况

### 文档
- 更新状态
- 记录完成的内容
- 记录问题

### 提交
- 小而专注的提交
- 清晰的消息
- 定期推送

## 常见问题

### 阻碍
- 及早寻求帮助
- 分解为更小的任务
- 转向并行任务

### 范围蔓延
- 坚持原始计划
- 单独记录添加
- 获得变更批准

### 技术债务
- 边做边修复
- 不留下 TODO 注释
- 必要时重构

## 完成

### 最终验证
- 所有测试通过
- 无控制台错误
- 按预期工作

### 文档
- 如需要更新 README
- 记录棘手部分
- 记录任何手动步骤

### 交接
- 解释做了什么
- 备注任何后续
- 分享相关背景`,
    category: 'Product',
    categoryZh: '产品',
    source: 'obra/superpowers',
    installCommand: 'npx skills add obra/superpowers/executing-plans',
    stars: 9100,
    dateAdded: '2024-01-25',
  },
  {
    id: '33',
    name: 'canvas-design',
    description: 'Design interactive canvas experiences',
    descriptionZh: '设计交互式画布体验',
    content: `# Canvas Design

Design interactive canvas experiences.

## When to Use

- Interactive graphics
- Data visualization
- Games
- Image editors
- Drawing applications

## Technologies

### HTML5 Canvas
- 2D drawing API
- Pixel manipulation
- Performance intensive

### WebGL
- 3D graphics
- GPU acceleration
- Complex rendering

### Libraries
- Three.js (3D)
- PixiJS (2D)
- Konva.js
- Fabric.js

## Core Concepts

### Rendering Loop
\`\`\`javascript
function animate() {
  ctx.clearRect(0, 0, width, height)
  update()
  draw()
  requestAnimationFrame(animate)
}
\`\`\`

### Coordinate System
- Origin (0,0) at top-left
- X increases right
- Y increases down
- Transforms for rotation/scaling

### Objects
- Store state in objects
- Update position each frame
- Draw in render loop

## Best Practices

### Performance
- Use requestAnimationFrame
- Minimize draw calls
- Use layers/caching
- Handle resize

### Interactivity
- Event listeners for input
- Hit detection
- Smooth animations

### Accessibility
- Provide alternatives
- Keyboard navigation
- Screen reader support

## Common Patterns

### Double Buffering
- Draw to offscreen canvas
- Swap to visible canvas

### Object Pooling
- Reuse objects
- Reduce garbage collection

### Spatial Partitioning
- Quadtree for collision
- Optimize hit detection`,
    contentZh: `# 画布设计

设计交互式画布体验。

## 使用时机

- 交互式图形
- 数据可视化
- 游戏
- 图像编辑器
- 绘图应用程序

## 技术

### HTML5 Canvas
- 2D 绘制 API
- 像素操作
- 性能密集

### WebGL
- 3D 图形
- GPU 加速
- 复杂渲染

### 库
- Three.js (3D)
- PixiJS (2D)
- Konva.js
- Fabric.js

## 核心概念

### 渲染循环
\`\`\`javascript
function animate() {
  ctx.clearRect(0, 0, width, height)
  update()
  draw()
  requestAnimationFrame(animate)
}
\`\`\`

### 坐标系统
- 原点 (0,0) 在左上角
- X 向右增加
- Y 向下增加
- 变换用于旋转/缩放

### 对象
- 在对象中存储状态
- 每帧更新位置
- 在渲染循环中绘制

## 最佳实践

### 性能
- 使用 requestAnimationFrame
- 最小化绘制调用
- 使用图层/缓存
- 处理调整大小

### 交互性
- 输入的事件监听器
- 命中检测
- 流畅动画

### 可访问性
- 提供替代方案
- 键盘导航
- 屏幕阅读器支持

## 常见模式

### 双缓冲
- 绘制到离屏画布
- 交换到可见画布

### 对象池
- 重用对象
- 减少垃圾回收

### 空间分区
- 四叉树用于碰撞
- 优化命中检测`,
    category: 'Development',
    categoryZh: '开发',
    source: 'anthropics/skills',
    installCommand: 'npx skills add anthropics/skills/canvas-design',
    stars: 8500,
    dateAdded: '2024-01-26',
  },
  {
    id: '34',
    name: 'copy-editing',
    description: 'Edit and improve written content',
    descriptionZh: '编辑和改进书面内容',
    content: `# Copy Editing

Edit and improve written content.

## Core Principles

### Clarity
- Remove jargon
- Simplify complex sentences
- Use active voice
- One idea per sentence

### Conciseness
- Cut unnecessary words
- Remove redundancies
- Use strong verbs
- Avoid filler words

### Consistency
- Maintain tone
- Check terminology
- Verify facts
- Format uniformly

## Common Issues

### Wordiness
- "In order to" → "To"
- "Due to the fact that" → "Because"
- "At this point in time" → "Now"

### Passive Voice
- Find and replace with active
- Identify the actor
- Make it the subject

### Redundancy
- "past history" → "history"
- "future plans" → "plans"
- "free gift" → "gift"

## Grammar Checks

### Subject-Verb Agreement
- Singular subject → singular verb
- Collective nouns (team, group) → context-dependent

### Tense Consistency
- Maintain consistent tense
- Past for completed actions
- Present for ongoing

### Punctuation
- Commas with clauses
- Colons for lists
- Apostrophes for possession

## Style Guidelines

### Capitalization
- Headlines: Title Case
- Body: Sentence case
- Proper nouns: as defined

### Numbers
- Spell out one through nine
- Use numerals 10+
- Dates: "January 1, 2024"

### Lists
- Parallel structure
- Consistent punctuation
- Clear hierarchy

## Process

1. **Read through** - Get the sense
2. **Structure** - Organization flow
3. **Sentence** - Grammar and clarity
4. **Word** - Word choice
5. **Final** - Proofread`,
    contentZh: `# 文案编辑

编辑和改进书面内容。

## 核心原则

### 清晰
- 删除术语
- 简化复杂句子
- 使用主动语态
- 每句一个想法

### 简洁
- 删除不必要的词
- 消除冗余
- 使用强动词
- 避免填充词

### 一致
- 保持语气
- 检查术语
- 核实事实
- 统一格式

## 常见问题

### 冗长
- "In order to" → "To"
- "Due to the fact that" → "Because"
- "At this point in time" → "Now"

### 被动语态
- 查找并替换为主动
- 识别执行者
- 使其成为主语

### 冗余
- "past history" → "history"
- "future plans" → "plans"
- "free gift" → "gift"

## 语法检查

### 主谓一致
- 单数主语 → 单数动词
- 集合名词（team, group）→ 取决于上下文

### 时态一致性
- 保持一致的时态
- 过去用于已完成的动作
- 现在用于正在进行

### 标点
- 从句用逗号
- 列表用冒号
- 所有格用撇号

## 风格指南

### 大写
- 标题：首字母大写
- 正文：句子大小写
- 专有名词：按定义

### 数字
- 一到九拼写
- 10 以上使用数字
- 日期："2024年1月1日"

### 列表
- 平行结构
- 一致的标点
- 明确的层次

## 流程

1. **通读** - 了解大意
2. **结构** - 组织流程
3. **句子** - 语法和清晰度
4. **用词** - 词汇选择
5. **最终** - 校对`,
    category: 'Marketing',
    categoryZh: '营销',
    source: 'coreyhaines31/marketingskills',
    installCommand: 'npx skills add coreyhaines31/marketingskills/copy-editing',
    stars: 8600,
    dateAdded: '2024-01-27',
  },
  {
    id: '35',
    name: 'social-content',
    description: 'Create content for social media platforms',
    descriptionZh: '为社交媒体平台创建内容',
    content: `# Social Content

Create content for social media platforms.

## Platform Characteristics

### Twitter/X
- Short (280 chars)
- Threads for longer
- Hashtags sparingly
- Engagement focused

### LinkedIn
- Professional tone
- Longer form OK
- Industry insights
- Personal branding

### Instagram
- Visual-first
- Captions important
- Hashtags work
- Stories/Reels

### TikTok
- Short video
- Trends
- Authentic
- Music/sound

## Content Types

### Posts
- Single idea
- Clear message
- Call to action
- Relevant hashtags

### Threads
- Hook in first tweet
- Logical flow
- Summary at end
- Engage throughout

### Visual
- High quality images
- Infographics
- Carousels
- Video content

## Best Practices

### Writing
- Lead with value
- Use line breaks
- Ask questions
- Be conversational

### Timing
- Post when audience active
- Test different times
- Consistency matters

### Engagement
- Respond to comments
- Engage with others
- Share others' content

### Analytics
- Track performance
- A/B test
- Adjust strategy

## Templates

### Announcement
"[Exciting news/Update]! After [time/work], we're launching [thing]. [Value proposition]. [Link/CTA]"

### Question
"Curious about [topic]: [question]? Reply with your thoughts 👇"

### Thread Hook
"[1/x] [Bold statement about topic]"

## Hashtag Strategy

### Research
- Trending relevant
- Industry standard
- Branded tags

### Usage
- 2-5 per post
- Mix popular and niche
- Avoid oversaturation`,
    contentZh: `# 社交内容

为社交媒体平台创建内容。

## 平台特点

### Twitter/X
- 短（280 字符）
- 线程更长
- 少用标签
- 专注于参与

### LinkedIn
- 专业语气
- 较长形式也可以
- 行业见解
- 个人品牌

### Instagram
- 视觉优先
- 标题很重要
- 标签有效
- Stories/Reels

### TikTok
- 短视频
- 趋势
- 真实
- 音乐/声音

## 内容类型

### 帖子
- 单一想法
- 清晰的信息
- 行动号召
- 相关标签

### 线程
- 第一条推文钩子
- 逻辑流程
- 结尾总结
- 贯穿参与

### 视觉
- 高质量图片
- 信息图表
- 轮播
- 视频内容

## 最佳实践

### 写作
- 以价值开头
- 使用换行
- 提问
- 对话式

### 时机
- 受众活跃时发布
- 测试不同时间
- 一致性很重要

### 参与
- 回复评论
- 与他人互动
- 分享他人内容

### 分析
- 跟踪表现
- A/B 测试
- 调整策略

## 模板

### 公告
"[令人兴奋的消息/更新]！经过 [时间/工作]，我们正在推出 [东西]。[价值主张]。[链接/CTA]"

### 问题
"对 [主题] 有疑问：[问题]？在下面回复你的想法 👇"

### 线程钩子
"[1/x] [关于主题的大胆声明]"

## 标签策略

### 研究
- 相关趋势
- 行业标准
- 品牌标签

### 使用
- 每帖 2-5 个
- 混合流行和小众
- 避免过度饱和`,
    category: 'Marketing',
    categoryZh: '营销',
    source: 'coreyhaines31/marketingskills',
    installCommand: 'npx skills add coreyhaines31/marketingskills/social-content',
    stars: 8600,
    dateAdded: '2024-01-28',
  },
  {
    id: 'nextjs-github-actions',
    name: 'nextjs-github-actions',
    description: 'Set up CI/CD for Next.js with GitHub Actions',
    descriptionZh: '使用 GitHub Actions 为 Next.js 设置 CI/CD',
    content: `# Next.js + GitHub Actions CI/CD

Set up automated CI/CD pipelines for Next.js applications using GitHub Actions.

## Workflow Structure

\`\`\`yaml
name: CI/CD

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
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Lint
        run: pnpm lint
      
      - name: Type check
        run: pnpm typecheck
      
      - name: Build
        run: pnpm build
      
      - name: Test
        run: pnpm test --coverage
\`\`\`

## Key Points

1. Use pnpm for faster installs
2. Cache node_modules and pnpm store
3. Run lint before typecheck for faster feedback
4. Build to verify no compilation errors
5. Run tests with coverage

## Deployment

For Vercel deployment:
- Use Vercel Git Integration
- No additional action needed

For GitHub Pages:
- Use actions/upload-pages-artifact
- Configure gh-pages branch deployment`,
    contentZh: `# Next.js + GitHub Actions CI/CD

使用 GitHub Actions 为 Next.js 应用程序设置自动化 CI/CD 流水线。

## 工作流结构

\`\`\`yaml
name: CI/CD

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
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Lint
        run: pnpm lint
      
      - name: Type check
        run: pnpm typecheck
      
      - name: Build
        run: pnpm build
      
      - name: Test
        run: pnpm test --coverage
\`\`\`

## 关键点

1. 使用 pnpm 更快安装
2. 缓存 node_modules 和 pnpm store
3. 先运行 lint 再运行 typecheck 获取更快反馈
4. Build 验证无编译错误
5. 运行带覆盖率的测试

## 部署

Vercel 部署：
- 使用 Vercel Git 集成
- 无需额外操作

GitHub Pages 部署：
- 使用 actions/upload-pages-artifact
- 配置 gh-pages 分支部署`,
    category: 'DevOps',
    categoryZh: 'DevOps',
    source: 'nextjs-github',
    stars: 24500,
    dateAdded: '2024-05-01',
  },
  {
    id: 'nextjs-github-oauth',
    name: 'nextjs-github-oauth',
    description: 'Implement GitHub OAuth login in Next.js App Router',
    descriptionZh: '在 Next.js App Router 中实现 GitHub OAuth 登录',
    content: `# Next.js GitHub OAuth Login

Implement GitHub OAuth authentication in Next.js using NextAuth.js.

## Setup

1. Create GitHub OAuth App:
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Set callback URL: \`https://yourapp.com/api/auth/callback/github\`

2. Install NextAuth:
\`\`\`bash
pnpm add next-auth
\`\`\`

3. Configure auth:
\`\`\`typescript
// auth.ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
})
\`\`\`

## API Route

\`\`\`typescript
// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"
export const { GET, POST } = handlers
\`\`\`

## Protected Routes

\`\`\`typescript
// middleware.ts
import { auth } from "@/auth"

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    return Response.redirect(new URL("/login", req.url))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
\`\`\`

## Get Session

\`\`\`typescript
import { auth } from "@/auth"

export default async function Page() {
  const session = await auth()
  return <div>{session?.user?.name}</div>
}
\`\`\`

## Environment Variables

\`\`\`env
AUTH_SECRET=your-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
\`\`\``,
    contentZh: `# Next.js GitHub OAuth 登录

使用 NextAuth.js 在 Next.js 中实现 GitHub OAuth 认证。

## 设置

1. 创建 GitHub OAuth 应用：
   - 进入 GitHub Settings > Developer settings > OAuth Apps
   - 设置回调 URL：\`https://yourapp.com/api/auth/callback/github\`

2. 安装 NextAuth：
\`\`\`bash
pnpm add next-auth
\`\`\`

3. 配置认证：
\`\`\`typescript
// auth.ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
})
\`\`\`

## API 路由

\`\`\`typescript
// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"
export const { GET, POST } = handlers
\`\`\`

## 保护路由

\`\`\`typescript
// middleware.ts
import { auth } from "@/auth"

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    return Response.redirect(new URL("/login", req.url))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
\`\`\`

## 获取会话

\`\`\`typescript
import { auth } from "@/auth"

export default async function Page() {
  const session = await auth()
  return <div>{session?.user?.name}</div>
}
\`\`\`

## 环境变量

\`\`\`env
AUTH_SECRET=your-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
\`\`\``,
    category: 'Development',
    categoryZh: '开发',
    source: 'nextjs-github',
    installCommand: 'pnpm add next-auth',
    stars: 32100,
    dateAdded: '2024-05-02',
  },
  {
    id: 'github-api-integration',
    name: 'github-api-integration',
    description: 'Integrate GitHub REST API in Next.js applications',
    descriptionZh: '在 Next.js 应用中集成 GitHub REST API',
    content: `# GitHub API Integration

Integrate GitHub REST API in Next.js for fetching repositories, issues, and more.

## Octokit Setup

\`\`\`bash
pnpm add octokit
\`\`\`

## Basic Usage

\`\`\`typescript
import { Octokit } from "octokit"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

// Get user info
const { data: user } = await octokit.rest.users.get({
  username: "vercel",
})

// Get repositories
const { data: repos } = await octokit.rest.repos.listForUser({
  username: "vercel",
  sort: "updated",
})

// Get issues
const { data: issues } = await octokit.rest.issues.listForRepo({
  owner: "vercel",
  repo: "next.js",
  state: "open",
})
\`\`\`

## Server-Side Fetching

\`\`\`typescript
// app/github/page.tsx
import { Octokit } from "octokit"

async function getRepos() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  })
  
  const { data } = await octokit.rest.repos.listForUser({
    username: "vercel",
    per_page: 10,
  })
  
  return data
}

export default async function Page() {
  const repos = await getRepos()
  
  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.id}>{repo.name}</li>
      ))}
    </ul>
  )
}
\`\`\`

## GraphQL API

\`\`\`typescript
const { data } = await octokit.graphql(\`
  query($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      stargazerCount
      description
      issues(states: OPEN) {
        totalCount
      }
    }
  }
\`, {
  owner: "vercel",
  name: "next.js",
})
\`\`\`

## Rate Limiting

- Authenticated: 5000 requests/hour
- Unauthenticated: 60 requests/hour

Use caching for better performance:
\`\`\`typescript
export const dynamic = 'force-dynamic'

// or use Next.js caching
const repos = await fetch('https://api.github.com/users/vercel/repos', {
  next: { revalidate: 3600 },
}).then(res => res.json())
\`\`\``,
    contentZh: `# GitHub API 集成

在 Next.js 中集成 GitHub REST API 用于获取仓库、issues 等。

## Octokit 设置

\`\`\`bash
pnpm add octokit
\`\`\`

## 基本用法

\`\`\`typescript
import { Octokit } from "octokit"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

// 获取用户信息
const { data: user } = await octokit.rest.users.get({
  username: "vercel",
})

// 获取仓库列表
const { data: repos } = await octokit.rest.repos.listForUser({
  username: "vercel",
  sort: "updated",
})

// 获取 issues
const { data: issues } = await octokit.rest.issues.listForRepo({
  owner: "vercel",
  repo: "next.js",
  state: "open",
})
\`\`\`

## 服务端获取

\`\`\`typescript
// app/github/page.tsx
import { Octokit } from "octokit"

async function getRepos() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  })
  
  const { data } = await octokit.rest.repos.listForUser({
    username: "vercel",
    per_page: 10,
  })
  
  return data
}

export default async function Page() {
  const repos = await getRepos()
  
  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.id}>{repo.name}</li>
      ))}
    </ul>
  )
}
\`\`\`

## GraphQL API

\`\`\`typescript
const { data } = await octokit.graphql(\`
  query($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      stargazerCount
      description
      issues(states: OPEN) {
        totalCount
      }
    }
  }
\`, {
  owner: "vercel",
  name: "next.js",
})
\`\`\`

## 速率限制

- 已认证：5000 请求/小时
- 未认证：60 请求/小时

使用缓存提高性能：
\`\`\`typescript
export const dynamic = 'force-dynamic'

// 或使用 Next.js 缓存
const repos = await fetch('https://api.github.com/users/vercel/repos', {
  next: { revalidate: 3600 },
}).then(res => res.json())
\`\`\``,
    category: 'Development',
    categoryZh: '开发',
    source: 'nextjs-github',
    stars: 18700,
    dateAdded: '2024-05-03',
  },
  {
    id: 'nextjs-github-pages',
    name: 'nextjs-github-pages',
    description: 'Deploy Next.js to GitHub Pages with GitHub Actions',
    descriptionZh: '使用 GitHub Actions 将 Next.js 部署到 GitHub Pages',
    content: `# Next.js GitHub Pages Deployment

Deploy Next.js static exports to GitHub Pages using GitHub Actions.

## Configuration

1. Set \`output: 'export'\` in next.config.js:
\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
\`\`\`

2. Update package.json:
\`\`\`json
{
  "scripts": {
    "build": "next build"
  },
  "homepage": "https://username.github.io/repo"
}
\`\`\`

## GitHub Actions Workflow

\`\`\`yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build
        run: pnpm build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
\`\`\`

## Enable GitHub Pages

1. Go to Repository Settings > Pages
2. Select "Deploy from a branch"
3. Choose "gh-pages" branch and "/(root)" folder
4. Set custom domain if needed

## Notes

- Use \`unoptimized: true\` for images (required for static export)
- Each push to main triggers deployment
- Deployment takes ~1-2 minutes`,
    contentZh: `# Next.js GitHub Pages 部署

使用 GitHub Actions 将 Next.js 静态导出部署到 GitHub Pages。

## 配置

1. 在 next.config.js 中设置 \`output: 'export'\`：
\`\`\`javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
\`\`\`

2. 更新 package.json：
\`\`\`json
{
  "scripts": {
    "build": "next build"
  },
  "homepage": "https://username.github.io/repo"
}
\`\`\`

## GitHub Actions 工作流

\`\`\`yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Build
        run: pnpm build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
\`\`\`

## 启用 GitHub Pages

1. 进入 Repository Settings > Pages
2. 选择 "Deploy from a branch"
3. 选择 "gh-pages" 分支和 "/(root)" 文件夹
4. 如需要可设置自定义域名

## 注意事项

- 图片使用 \`unoptimized: true\`（静态导出必需）
- 每次推送到 main 触发部署
- 部署需要约 1-2 分钟`,
    category: 'DevOps',
    categoryZh: 'DevOps',
    source: 'nextjs-github',
    stars: 15600,
    dateAdded: '2024-05-04',
  },
  {
    id: 'github-issues-management',
    name: 'github-issues-management',
    description: 'Manage GitHub Issues programmatically with GitHub API',
    descriptionZh: '使用 GitHub API 程序化管理 GitHub Issues',
    content: `# GitHub Issues Management

Programmatically manage GitHub Issues using GitHub API.

## Create Issue

\`\`\`typescript
import { Octokit } from "octokit"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const { data: issue } = await octokit.rest.issues.create({
  owner: "username",
  repo: "repository",
  title: "Bug: Login not working",
  body: "## Description\\nLogin button does nothing\\n\\n## Steps\\n1. Go to login page\\n2. Click login button\\n\\n## Expected\\nRedirect to dashboard",
  labels: ["bug", "priority: high"],
})
\`\`\`

## Add Comment

\`\`\`typescript
await octokit.rest.issues.createComment({
  owner: "username",
  repo: "repository",
  issue_number: 1,
  body: "Thanks for reporting! Looking into this now.",
})
\`\`\`

## Close/Open Issue

\`\`\`typescript
// Close
await octokit.rest.issues.update({
  owner: "username",
  repo: "repository",
  issue_number: 1,
  state: "closed",
})

// Reopen
await octokit.rest.issues.update({
  owner: "username",
  repo: "repository",
  issue_number: 1,
  state: "open",
})
\`\`\`

## Add/Remove Labels

\`\`\`typescript
// Add labels
await octokit.rest.issues.addLabels({
  owner: "username",
  repo: "repository",
  issue_number: 1,
  labels: ["enhancement", "needs-review"],
})

// Remove label
await octokit.rest.issues.removeLabel({
  owner: "username",
  repo: "repository",
  issue_number: 1,
  name: "enhancement",
})
\`\`\`

## Assign Users

\`\`\`typescript
await octokit.rest.issues.addAssignees({
  owner: "username",
  repo: "repository",
  issue_number: 1,
  assignees: ["username1", "username2"],
})
\`\`\`

## List Issues

\`\`\`typescript
const { data: issues } = await octokit.rest.issues.listForRepo({
  owner: "username",
  repo: "repository",
  state: "open",
  labels: "bug",
  sort: "created",
  direction: "desc",
})
\`\`\`

## Best Practices

1. Use issue templates
2. Label issues consistently
3. Assign to team members
4. Use milestones for releases
5. Close resolved issues promptly`,
    contentZh: `# GitHub Issues 管理

使用 GitHub API 程序化管理 GitHub Issues。

## 创建 Issue

\`\`\`typescript
import { Octokit } from "octokit"

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const { data: issue } = await octokit.rest.issues.create({
  owner: "username",
  repo: "repository",
  title: "Bug: Login not working",
  body: "## Description\\nLogin button does nothing\\n\\n## Steps\\n1. Go to login page\\n2. Click login button\\n\\n## Expected\\nRedirect to dashboard",
  labels: ["bug", "priority: high"],
})
\`\`\`

## 添加评论

\`\`\`typescript
await octokit.rest.issues.createComment({
  owner: "username",
  repo: "repository",
  issue_number: 1,
  body: "Thanks for reporting! Looking into this now.",
})
\`\`\`

## 关闭/打开 Issue

\`\`\`typescript
// 关闭
await octokit.rest.issues.update({
  owner: "username",
  repo: "repository",
  issue_number: 1,
  state: "closed",
})

// 重新打开
await octokit.rest.issues.update({
  owner: "username",
  repo: "repository",
  issue_number: 1,
  state: "open",
})
\`\`\`

## 添加/移除标签

\`\`\`typescript
// 添加标签
await octokit.rest.issues.addLabels({
  owner: "username",
  repo: "repository",
  issue_number: 1,
  labels: ["enhancement", "needs-review"],
})

// 移除标签
await octokit.rest.issues.removeLabel({
  owner: "username",
  repo: "repository",
  issue_number: 1,
  name: "enhancement",
})
\`\`\`

## 分配用户

\`\`\`typescript
await octokit.rest.issues.addAssignees({
  owner: "username",
  repo: "repository",
  issue_number: 1,
  assignees: ["username1", "username2"],
})
\`\`\`

## 列出 Issues

\`\`\`typescript
const { data: issues } = await octokit.rest.issues.listForRepo({
  owner: "username",
  repo: "repository",
  state: "open",
  labels: "bug",
  sort: "created",
  direction: "desc",
})
\`\`\`

## 最佳实践

1. 使用 issue 模板
2. 一致地使用标签
3. 分配给团队成员
4. 使用 milestones 管理发布
5. 及时关闭已解决的问题`,
    category: 'DevOps',
    categoryZh: 'DevOps',
    source: 'nextjs-github',
    stars: 12300,
    dateAdded: '2024-05-05',
  },
];
