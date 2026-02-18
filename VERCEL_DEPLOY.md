# Vercel 部署完全指南：从零上线你的 Next.js 项目

## 什么是 Vercel？

Vercel 是一个面向前端的云平台，专注于为 React、Next.js、Vue、Svelte 等现代前端框架提供一站式部署服务。由 Next.js 的创建者_LEI（Guillermo Rauch）于 2015 年创立，Vercel 致力于让开发者能够快速将代码从 Git 仓库部署到全球可访问的 CDN。

### Vercel 的核心优势

1. **零配置部署** - 只需连接 Git 仓库，Vercel 自动检测项目类型并配置构建流程
2. **全球 CDN** - 静态资源自动分发到全球边缘节点，访问速度极快
3. **Serverless Functions** - 支持 API 路由，无需自建后端即可实现动态功能
4. **免费额度** - 个人项目免费使用，每月 100GB 流量、100GB 存储
5. **CI/CD 集成** - 每次 git push 自动触发部署，支持预览部署

## 准备工作

在开始部署之前，确保你已具备以下条件：

- 一个 GitHub/GitLab/Bitbucket 仓库
- Node.js 18+ 环境
- Vercel 账户（推荐使用 GitHub 账号登录）

## 部署步骤

### 步骤一：安装 Vercel CLI

```bash
npm install -g vercel
# 或
pnpm add -g vercel
```

### 步骤二：登录 Vercel

```bash
vercel login
```

执行命令后，浏览器会打开授权页面，使用你的 GitHub 账号完成授权即可。

### 步骤三：进入项目目录

```bash
cd your-project-directory
```

### 步骤四：执行部署命令

```bash
vercel
```

首次部署时，Vercel 会交互式地询问几个问题：

```
? Set up and deploy? [Y/n]  # 输入 Y
? Which scope? [your-username]  # 选择你的账户
? Link to existing project? [y/N]  # 输入 N，创建新项目
? What's your project's name?  # 输入项目名称
? In which directory is your code located? ./  # 代码所在目录
```

回答完问题后，Vercel 会开始构建并部署。部署完成后会返回一个预览 URL。

### 步骤五：生产环境部署

测试预览版本没有问题后，使用以下命令进行生产环境部署：

```bash
vercel --prod
```

部署完成后，你会获得一个类似 `https://your-project.vercel.app` 的永久域名。

### 步骤六：配置自定义域名（可选）

如果你有自己的域名，可以在 Vercel Dashboard 中进行配置：

1. 打开 Vercel 控制台，进入你的项目
2. 依次点击 Settings → Domains
3. 输入你的自定义域名并按照提示配置 DNS 记录

## Next.js 项目特殊配置

### 解决 API 路由 405 错误

如果你在使用 Next.js 的 API 路由时遇到 405 Method Not Allowed 错误，很可能是 `next.config.js` 中配置了 `output: "export"`。

这个配置用于 GitHub Pages 等静态托管，但在 Vercel 上不需要。修改配置如下：

```javascript
// next.config.js / next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 不要在这里设置 output: "export"
  reactStrictMode: true,
  transpilePackages: ["antd", "@ant-design/icons"],
  images: {
    unoptimized: true,
  },
};

// 仅在 GitHub Actions 时启用静态导出
const isGithubActions = process.env.GITHUB_ACTIONS || false;

if (isGithubActions) {
  nextConfig.output = "export";
  // ... 其他 GitHub Pages 配置
}

export default nextConfig;
```

这样在 Vercel 部署时会启用 Serverless Functions 支持 API 路由，而在 GitHub Actions 构建时仍然可以生成静态页面。

## 常见问题

### Q: 部署失败怎么办？

查看 Vercel 控制台的 Build Logs，通常会显示具体的错误信息。常见问题包括：

- 依赖安装失败：检查 `package.json` 是否正确
- 构建命令错误：确认 `package.json` 中的 scripts
- 环境变量缺失：在 Vercel 控制台的 Environment Variables 中添加

### Q: 如何查看 API 日志？

在 Vercel 控制台中，进入 Functions 页面，可以查看 API 路由的调用日志和性能数据。

### Q: 如何回滚到之前的版本？

在 Vercel 控制台的 Deployments 页面，可以找到历史部署记录，点击任意一条即可回滚。

## 总结

Vercel 为前端开发者提供了极简的部署体验，特别是对于 Next.js 项目而言，从代码提交到生产上线只需几分钟。希望本教程能帮助你快速上手 Vercel，将你的项目部署到全球可访问的云端。

如果你有任何问题，欢迎在评论区留言交流！

---

**参考链接：**

- Vercel 官网：https://vercel.com
- Next.js 文档：https://nextjs.org
- Vercel 文档：https://vercel.com/docs
