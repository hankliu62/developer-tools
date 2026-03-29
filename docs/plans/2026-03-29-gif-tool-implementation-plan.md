# GIF 工具实施计划

> **For Claude:** REQUIRED SUB-SKILL: 使用 subagent-driven-development 或 executing-plans 来逐任务实施此计划。

**目标:** 开发一个基于 Web 的 GIF 图像分解与合成工具，支持 GIF 分解、合成、批量下载和压缩功能。

**架构:** 使用 Tab 界面组织三个功能模块（分解/合成/压缩），每个模块独立处理各自的功能。使用浏览器端库处理图像，无需后端服务。

**技术栈:**
- gif.js - GIF 合成
- libgif (omggif) - GIF 分解
- gifsicle-wasm-browser - GIF 压缩
- jszip - 批量打包下载（已安装）
- file-saver - 文件下载（已安装）
- pdf-lib 参考模式 - 工具结构参考

---

## 任务 1: 安装依赖

**文件:**
- Modify: `package.json`

**步骤 1: 添加 GIF 相关依赖**

运行以下命令安装所需依赖:

```bash
cd /Users/liuxiaocong/Workspace/github/personal/developer-tools
pnpm add gif.js omggif
```

注意: gifsicle-wasm-browser 可能需要额外配置，先检查是否可用。如果不可用，可以考虑使用 gif.js 的内置压缩或跳过压缩功能。

**步骤 2: 验证安装**

检查 package.json 中是否新增了 gif.js 和 omggif 依赖。

**步骤 3: 提交**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: add gif.js and omggif dependencies"
```

---

## 任务 2: 添加导航入口

**文件:**
- Modify: `src/constants/navigation.ts:306-312`

**步骤 1: 添加 GIF 工具导航**

在 navigation.ts 中找到"图片转 PDF"工具（约第306行），在其后添加:

```typescript
{
  name: 'GIF 工具',
  description: 'GIF 分解合成工具，支持 GIF 分解、合成、压缩和批量下载',
  href: '/tools/converter/gif-tool',
  icon: 'i-carbon-image',
  status: 'new',
},
```

**步骤 2: 验证更改**

运行 `pnpm lint` 确保代码格式正确。

**步骤 3: 提交**

```bash
git add src/constants/navigation.ts
git commit -m "feat: add GIF tool navigation entry"
```

---

## 任务 3: 创建 GIF 工具核心工具函数

**文件:**
- Create: `src/tools/converter/gif-tool.ts`

**步骤 1: 创建工具函数文件**

创建 `src/tools/converter/gif-tool.ts`，包含以下导出:

```typescript
// GIF 分解相关类型和函数
export interface GifFrame {
  index: number;
  dataUrl: string;
  width: number;
  height: number;
  delay: number; // 延迟时间（毫秒）
  disposal: number;
}

export interface GifDecomposeOptions {
  format: 'png' | 'jpg' | 'webp';
  quality?: number; // 用于 JPG/WebP 转换
}

// 解析 GIF 文件，提取所有帧
export async function decomposeGif(
  file: File,
  options?: GifDecomposeOptions
): Promise<GifFrame[]>

// 合成相关类型和函数
export interface GifSynthesisOptions {
  width?: number;
  height?: number;
  delay: number; // 帧延迟（毫秒）
  quality: number; // 质量 1-30，gif.js 的 workers
  repeat: number; // 循环次数，0 表示无限循环
}

export interface SynthesisImage {
  file: File;
  dataUrl: string;
  width: number;
  height: number;
}

// 合成 GIF
export async function synthesizeGif(
  images: SynthesisImage[],
  options: GifSynthesisOptions
): Promise<Blob>

// 压缩相关
export interface GifCompressOptions {
  quality: number; // 1-100
  width?: number;
  height?: number;
}

// 压缩 GIF（如果 gifsicle 不可用，可以使用 gif.js 重新编码）
export async function compressGif(
  file: File,
  options: GifCompressOptions
): Promise<Blob>

// 辅助函数
export function readFileAsDataUrl(file: File): Promise<string>
export function getImageDimensions(dataUrl: string): Promise<{ width: number; height: number }>
export function convertImageFormat(
  dataUrl: string,
  format: 'png' | 'jpg' | 'webp',
  quality?: number
): Promise<string>
```

**步骤 2: 实现 GIF 分解功能 (omggif)**

```typescript
import { GifReader } from 'omggif';

/**
 * 解析 GIF 文件，提取所有帧
 */
export async function decomposeGif(
  file: File,
  options: GifDecomposeOptions = { format: 'png' }
): Promise<GifFrame[]> {
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  const reader = new GifReader(uint8Array);
  
  const frames: GifFrame[] = [];
  
  for (let i = 0; i < reader.numFrames(); i++) {
    const frameInfo = reader.frameInfo(i);
    const { width, height, x, y } = frameInfo;
    
    // 解码帧数据
    const pixels = new Uint8ClampedArray(width * height * 4);
    reader.decodeAndBlitFrameRGBA(i, pixels);
    
    // 创建 Canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) continue;
    
    const imageData = new ImageData(pixels, width, height);
    ctx.putImageData(imageData, 0, 0);
    
    // 转换为指定格式
    const dataUrl = canvas.toDataURL(
      options.format === 'jpg' ? 'image/jpeg' : 
      options.format === 'webp' ? 'image/webp' : 'image/png',
      options.quality
    );
    
    frames.push({
      index: i,
      dataUrl,
      width,
      height,
      delay: frameInfo.delay * 10, // 转换为毫秒
      disposal: frameInfo.disposal,
    });
  }
  
  return frames;
}
```

**步骤 3: 实现 GIF 合成功能 (gif.js)**

```typescript
import GIF from 'gif.js';

/**
 * 合成 GIF
 */
export async function synthesizeGif(
  images: SynthesisImage[],
  options: GifSynthesisOptions
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const gif = new GIF({
      workers: 2,
      quality: options.quality,
      width: options.width,
      height: options.height,
      workerScript: '/gif.worker.js', // 需要复制到 public 目录
    });
    
    // 加载所有图片并添加到 GIF
    let loadedCount = 0;
    
    images.forEach((img) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = options.width || image.width;
        canvas.height = options.height || image.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          gif.addFrame(ctx, { delay: options.delay });
        }
        loadedCount++;
        if (loadedCount === images.length) {
          gif.on('finished', (blob: Blob) => resolve(blob));
          gif.render();
        }
      };
      image.onerror = () => reject(new Error(`Failed to load image: ${img.file.name}`));
      image.src = img.dataUrl;
    });
  });
}
```

**步骤 4: 复制 gif.js worker 到 public 目录**

创建 `public/gif.worker.js` 文件，从 node_modules/gif.js/dist/gif.worker.js 复制内容。

**步骤 5: 提交**

```bash
git add src/tools/converter/gif-tool.ts public/gif.worker.js
git commit -m "feat: add GIF tool core functions"
```

---

## 任务 4: 创建 GIF 工具页面组件

**文件:**
- Create: `src/app/tools/converter/gif-tool/page.tsx`

**步骤 1: 创建页面结构**

创建页面组件，包含以下结构:

```tsx
'use client';

import { useState, useCallback } from 'react';
import { Card, Tabs, message } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';

// 子组件
import GifDecompose from './components/GifDecompose';
import GifSynthesize from './components/GifSynthesize';
import GifCompress from './components/GifCompress';

export default function GifToolPage() {
  const [activeTab, setActiveTab] = useState('decompose');

  const tabItems = [
    {
      key: 'decompose',
      label: 'GIF 分解',
      children: <GifDecompose />,
    },
    {
      key: 'synthesize',
      label: 'GIF 合成',
      children: <GifSynthesize />,
    },
    {
      key: 'compress',
      label: 'GIF 压缩',
      children: <GifCompress />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mr-2">
            <FileImageOutlined className="text-purple-600" />
          </span>
          GIF 工具
        </h1>
        <p className="text-gray-600">GIF 分解、合成、压缩一站式解决方案</p>
      </div>

      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          size="large"
        />
      </Card>
    </div>
  );
}
```

**步骤 2: 创建分解组件**

创建 `src/app/tools/converter/gif-tool/components/GifDecompose.tsx`:

- 上传区域：支持拖拽上传 GIF 文件
- 帧预览：显示所有提取的帧，带序号
- 格式选择：PNG / JPG / WebP
- 批量下载：将所有帧打包为 ZIP
- 单帧下载：支持点击单帧下载

**步骤 3: 创建合成组件**

创建 `src/app/tools/converter/gif-tool/components/GifSynthesize.tsx`:

- 上传区域：支持拖拽上传多张图片
- 图片排序：拖拽调整顺序
- 帧延迟设置：滑块 50ms - 2000ms
- 尺寸设置：支持自定义或保持原尺寸
- 质量设置：1-30（gif.js 质量参数）
- 预览和下载

**步骤 4: 创建压缩组件**

创建 `src/app/tools/converter/gif-tool/components/GifCompress.tsx`:

- 上传区域：支持拖拽上传 GIF
- 质量滑块：1-100
- 尺寸调整：可选
- 预览：压缩前后对比
- 下载压缩后的 GIF

**步骤 5: 提交**

```bash
git add src/app/tools/converter/gif-tool/
git commit -m "feat: add GIF tool page components"
```

---

## 任务 5: 测试验证

**步骤 1: 启动开发服务器**

```bash
pnpm dev
```

**步骤 2: 测试分解功能**

1. 访问 http://localhost:3000/tools/converter/gif-tool
2. 上传一个 GIF 文件
3. 验证帧被正确提取和显示
4. 测试批量下载 ZIP
5. 测试单帧下载

**步骤 3: 测试合成功能**

1. 切换到"合成"标签
2. 上传多张图片
3. 调整延迟和尺寸设置
4. 点击生成 GIF
5. 验证生成的 GIF 可以正常播放
6. 测试下载

**步骤 4: 测试压缩功能**

1. 切换到"压缩"标签
2. 上传一个大小的 GIF
3. 调整质量设置
4. 验证压缩效果
5. 测试下载

**步骤 5: 修复问题**

如有问题，返回相关任务修复。

**步骤 6: 提交**

```bash
git add . && git commit -m "fix: resolve GIF tool issues"
```

---

## 任务 6: 代码审查

**步骤 1: 运行 linter**

```bash
pnpm lint
```

**步骤 2: 检查类型**

```bash
pnpm build
```

**步骤 3: 提交**

```bash
git commit -m "chore: pass lint and build checks"
```

---

## 任务 7: 最终提交

**步骤 1: 确保所有更改已提交**

```bash
git status
git log --oneline -5
```

**步骤 2: 创建 PR（如果需要）**

---

## 执行选项

**计划完成并保存到 `docs/plans/2026-03-29-gif-tool-implementation-plan.md`。两个执行选项:**

1. **Subagent-Driven (当前会话)** - 我为每个任务分配新的子代理，在任务之间审查，快速迭代

2. **Parallel Session (单独会话)** - 在新会话中使用 executing-plans，带检查点的批量执行

**选择哪种方式?**
