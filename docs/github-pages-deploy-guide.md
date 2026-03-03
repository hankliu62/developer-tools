# Next.js 项目部署到 GitHub Pages 完整指南

本教程将详细介绍如何将基于 Next.js 的静态项目通过 GitHub Actions 自动部署到 GitHub Pages。我们以 Developer Tools 项目为例，这是一个包含 80+ 款实用开发者工具的在线工具箱。

---

## 准备工作

### 1. 创建 GitHub 仓库

首先，登录 GitHub 账号，点击右上角的「+」号，选择「New repository」创建一个新仓库。

<img width="3024" height="1898" alt="Image" src="https://github.com/user-attachments/assets/f3199a9c-578c-421f-8e09-2fed6ab2b0ba" />


填写仓库信息：
- **Repository name**：填写仓库名称（如 `developer-tools`）
- **Description**：可选，填写项目描述
- **选择 Public**：公开仓库
- **勾选 Add a README file**：添加 README 文件
- **点击 Create repository**：创建仓库

<img width="3024" height="1898" alt="Image" src="https://github.com/user-attachments/assets/a00b05a7-54c2-4f04-a1f7-33f89fc0d546" />

### 2. 推送本地代码到仓库

如果本地已有项目代码，执行以下命令将代码推送到 GitHub：

```bash
# 初始化 git（如果尚未初始化）
git init

# 添加远程仓库地址
git remote add origin https://github.com/你的用户名/developer-tools.git

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit"

# 推送到远程仓库
git push -u origin master
```

## 配置 GitHub Actions 工作流

### 1. 创建工作流目录和文件

在项目根目录下创建 `.github/workflows` 目录：

```bash
mkdir -p .github/workflows
```

### 2. 创建部署配置文件

创建 `gh-pages.yml` 文件，复制以下内容：

```yaml
name: github pages
on:
  push:
    branches: [master]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 获取源码
        uses: actions/checkout@v4
      - name: Node环境版本
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - uses: pnpm/action-setup@v4
        name: 安装pnpm
        with:
          version: 9
          run_install: false
      - name: pnpm缓存
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV
      - uses: actions/cache@v4
        name: 缓存依赖
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-
      - name: 安装依赖
        run: pnpm install
      - name: 打包
        run: pnpm run build && touch ./out/.nojekyll
      - name: 部署
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages
          folder: out
          clean: true
```

### 3. 工作流配置说明

| 配置项 | 说明 |
|--------|------|
| `on.push.branches` | 触发条件：push 到 master 分支时执行 |
| `runs-on` | 运行环境：Ubuntu 最新版 |
| `node-version` | Node.js 版本：20 |
| `pnpm.version` | pnpm 版本：9 |
| `actions/cache` | 依赖缓存，加速后续构建 |
| `pnpm run build` | 执行构建命令 |
| `touch ./out/.nojekyll` | 防止 GitHub Pages 忽略下划线开头的文件 |
| `JamesIves/github-pages-deploy-action` | 部署到 gh-pages 分支 |

### 4. 提交工作流配置

```bash
# 添加工作流文件
git add .github/workflows/gh-pages.yml

# 提交
git commit -m "feat: 添加 GitHub Pages 部署工作流"

# 推送到远程
git push origin master
```

## 配置 GitHub Pages

### 1. 进入仓库设置

点击仓库顶部的「Settings」选项卡进入仓库设置。

<img width="3024" height="1898" alt="Image" src="https://github.com/user-attachments/assets/fb6050cb-ee5a-409a-902d-4ef156212960" />

### 2. 配置 Actions Workflow permissions（关键步骤）

在部署之前，我们需要先配置 Actions 的权限，允许工作流能够创建和批准 pull request。

#### 步骤一：进入 Actions 通用设置

在 Settings 左侧菜单中，找到并点击「Actions」选项，然后点击「General」子选项。

![Actions 设置入口](https://github-images-1252851710.cos.ap-guangzhou.myqcloud.com/img/202402211000004.png)

#### 步骤二：设置 Workflow permissions

在「Workflow permissions」部分：

1. 找到「Workflow permissions」设置项
2. 选择 **「Read and write permissions」** 选项
3. 勾选「Allow GitHub Actions to create and approve pull requests」

![Workflow permissions 设置](https://github-images-1252851710.cos.ap-guangzhou.myqcloud.com/img/202402211000005.png)

> **重要提示**：如果不设置这个选项，GitHub Actions 将无法将构建好的静态文件推送到 gh-pages 分支，部署会失败。JamesIves/github-pages-deploy-action 需要 Write 权限才能创建和更新 gh-pages 分支。

#### 步骤三：点击保存

设置完成后，点击「Save」按钮保存配置。

![保存设置](https://github-images-1252851710.cos.ap-guangzhou.myqcloud.com/img/202402211000006.png)

### 3. 配置 Pages Source

#### 步骤一：进入 Pages 设置

在 Settings 左侧菜单中，点击「Pages」选项。

![Pages 设置入口](https://github-images-1252851710.cos.ap-guangzhou.myqcloud.com/img/202402211000007.png)

#### 步骤二：选择 Deploy from a branch

在「Build and deployment」部分，找到「Source」下拉菜单：

1. 默认选项是「Deploy from a branch」
2. 确认选择的是 **「Deploy from a branch」**（如果是第一次配置，默认就是这个选项）
3. 下方会显示分支选择，默认选择「gh-pages」和「/(root)」即可

![选择 Deploy from a branch](https://github-images-1252851710.cos.ap-guangzhou.myqcloud.com/img/202402211000008.png)

> **重要提示**：我们使用「Deploy from a branch」方式，GitHub 会从 gh-pages 分支读取静态文件进行部署。第一次部署时，gh-pages 分支还不存在，需要先运行 GitHub Actions 创建这个分支。

### 4. 触发第一次部署

完成上述配置后，我们需要手动触发一次部署：

#### 步骤一：进入 Actions 页面

点击仓库顶部的「Actions」选项卡。

![进入 Actions 页面](https://github-images-1252851710.cos.ap-guangzhou.myqcloud.com/img/202402211000009.png)

#### 步骤二：查看工作流

在左侧菜单中，找到「github pages」工作流（就是我们创建的 gh-pages.yml），点击进入。

![找到工作流](https://github-images-1252851710.cos.ap-guangzhou.myqcloud.com/img/202402211000010.png)

#### 步骤三：手动触发工作流

由于工作流的触发条件是 push 到 master 分支，而我们是第一次推送配置文件，可能已经触发了。如果还没有看到运行中的工作流，可以手动执行一次 push 来触发：

```bash
# 再次推送，触发工作流
git push origin master
```

或者在 Actions 页面点击「Run workflow」→「Run workflow」手动触发。

![手动触发工作流](https://github-images-1252851710.cos.ap-guangzhou.myqcloud.com/img/202402211000011.png)

#### 步骤四：等待部署完成

点击正在运行的 workflow，查看详细日志。等待所有步骤执行完成，特别是最后的「部署」步骤。

![查看部署日志](https://github-images-1252851710.cos.ap-guangzhou.myqcloud.com/img/202402211000012.png)

### 5. 获取部署地址

部署成功后，回到「Pages」设置页面，你会看到绿色的勾号和访问地址：

![部署成功提示](https://github-images-1252851710.cos.ap-guangzhou.myqcloud.com/img/202402211000013.png)

访问显示的 URL 即可看到部署的网站。

## 验证部署

### 1. 检查 Actions 状态

在仓库首页，点击「Actions」选项卡，确认「All workflows」中显示绿色的勾号表示部署成功。

![Actions 页面状态](https://github-images-1252851710.cos.ap-guangzhou.myqcloud.com/img/202402211000014.png)

### 2. 检查 gh-pages 分支

点击仓库的「Code」选项卡，确认存在一个名为 `gh-pages` 的分支，该分支包含构建输出的静态文件。

![gh-pages 分支](https://github-images-1252851710.cos.ap-guangzhou.myqcloud.com/img/202402211000015.png)

### 3. 访问网站

在浏览器中访问 `https://你的用户名.github.io/仓库名称/`，确认网站正常显示。

## 自动部署验证

以后每次 push 代码到 master 分支，GitHub Actions 会自动：

1. 拉取最新代码
2. 安装依赖（使用缓存加速）
3. 构建项目
4. 推送到 gh-pages 分支
5. GitHub Pages 自动从 gh-pages 分支部署

你可以在 Actions 页面查看每次部署的日志和状态。

## 常见问题

### Q1: 部署失败怎么办？

查看 Actions 页面的错误日志，常见问题包括：
- 权限问题：检查是否已设置 Workflow permissions 为 Read and write
- 依赖安装失败：检查 pnpm-lock.yaml 是否提交
- 构建失败：检查 package.json 的 build 脚本
- 路径问题：检查 out 目录是否正确

### Q2: 没有看到 gh-pages 分支？

确保 Workflow permissions 已经设置为「Read and write」，否则工作流无法创建 gh-pages 分支。

### Q3: 如何自定义域名？

在 Pages 设置中可以添加自定义域名：
1. 在「Custom domain」输入框中填写你的域名
2. 按照提示配置 DNS 记录
3. 勾选「Enforce HTTPS」

### Q4: 构建速度慢怎么办？

本工作流已配置 pnpm 依赖缓存：
- 首次构建需要安装所有依赖
- 后续构建会命中缓存，速度显著提升

### Q5: 每次 push 后部署很慢？

可以优化工作流触发条件，只在特定文件更改时才触发部署：

```yaml
on:
  push:
    branches: [master]
    paths:
      - 'src/**'
      - 'package.json'
      - 'pnpm-lock.yaml'
```

## 总结

通过以上步骤，你已经成功将 Next.js 项目部署到 GitHub Pages。整个过程只需要：

1. 创建 GitHub 仓库
2. 配置 GitHub Actions 工作流（.github/workflows/gh-pages.yml）
3. 在仓库设置中配置 Actions Workflow permissions 为 Read and write
4. 在 Pages 设置中选择「Deploy from a branch」
5. 手动触发第一次部署

以后每次推送代码，网站会自动更新，无需手动部署。项目的在线地址格式为：

```
https://你的用户名.github.io/仓库名称/
```

例如，本项目的 GitHub Pages 地址为：https://hankliu62.github.io/developer-tools/
