/**
 * GIF Tool - 核心工具函数
 * 支持 GIF 分解、合成和压缩功能
 */

import GIF from 'gif.js';

// ============================================
// 类型定义
// ============================================

// GIF 分解相关类型
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

// GIF 合成相关类型
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

// GIF 压缩相关类型
export interface GifCompressOptions {
  quality: number; // 1-100
  width?: number;
  height?: number;
}

// ============================================
// 辅助函数
// ============================================

/**
 * 将 File 读取为 Data URL
 */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * 获取图片尺寸
 */
export function getImageDimensions(dataUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
}

/**
 * 转换图片格式
 */
export function convertImageFormat(
  dataUrl: string,
  format: 'png' | 'jpg' | 'webp',
  quality = 0.92
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      ctx.drawImage(img, 0, 0);
      const mimeType =
        format === 'jpg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
      const qualityValue = format === 'png' ? undefined : quality;
      const convertedDataUrl = canvas.toDataURL(mimeType, qualityValue);
      resolve(convertedDataUrl);
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
}

// ============================================
// GIF 分解功能
// ============================================

/**
 * 动态导入 omggif（因为它是 CommonJS 模块）
 */
async function getGifReader(): Promise<typeof import('omggif')> {
  const module = await import('omggif');
  return module;
}

/**
 * 解析 GIF 文件，提取所有帧
 */
export async function decomposeGif(
  file: File,
  options: GifDecomposeOptions = { format: 'png' }
): Promise<GifFrame[]> {
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  const omggif = await getGifReader();
  const reader = new omggif.GifReader(uint8Array);

  const frames: GifFrame[] = [];
  const numFrames = reader.numFrames();

  for (let i = 0; i < numFrames; i++) {
    const frameInfo = reader.frameInfo(i);
    const { width, height } = frameInfo;

    // 解码帧数据到 RGBA 像素数组
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
    const mimeType =
      options.format === 'jpg'
        ? 'image/jpeg'
        : options.format === 'webp'
          ? 'image/webp'
          : 'image/png';
    const qualityValue = options.format === 'png' ? undefined : (options.quality ?? 0.92);
    const dataUrl = canvas.toDataURL(mimeType, qualityValue);

    frames.push({
      index: i,
      dataUrl,
      width,
      height,
      delay: frameInfo.delay * 10, // 转换为毫秒（GIF delay 是百分之一秒）
      disposal: frameInfo.disposal,
    });
  }

  return frames;
}

// ============================================
// GIF 合成功能
// ============================================

/**
 * 合成 GIF
 */
export async function synthesizeGif(
  images: SynthesisImage[],
  options: GifSynthesisOptions
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // 计算最终尺寸
    let finalWidth: number;
    let finalHeight: number;

    if (options.width && options.height) {
      finalWidth = options.width;
      finalHeight = options.height;
    } else if (images.length > 0) {
      // 使用第一张图片的尺寸
      finalWidth = images[0].width;
      finalHeight = images[0].height;
    } else {
      reject(new Error('No images provided'));
      return;
    }

    const gif = new GIF({
      workers: 2,
      quality: options.quality,
      width: finalWidth,
      height: finalHeight,
      workerScript: '/gif.worker.js',
      repeat: options.repeat,
    });

    // 加载所有图片并添加到 GIF
    let loadedCount = 0;

    images.forEach((img) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = finalWidth;
        canvas.height = finalHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // 绘制图片到画布（居中或拉伸）
          if (options.width && options.height) {
            // 拉伸或适应
            ctx.drawImage(image, 0, 0, finalWidth, finalHeight);
          } else {
            // 保持原尺寸
            ctx.drawImage(image, 0, 0);
          }
          gif.addFrame(ctx, { delay: options.delay });
        }
        loadedCount++;
        if (loadedCount === images.length) {
          gif.on('finished', (blob: Blob) => resolve(blob));
          gif.render();
        }
      };
      image.onerror = () => {
        reject(new Error(`Failed to load image: ${img.file.name}`));
      };
      image.src = img.dataUrl;
    });
  });
}

// ============================================
// GIF 压缩功能
// ============================================

/**
 * 压缩 GIF
 * 使用 gif.js 重新编码来实现压缩效果
 */
export async function compressGif(file: File, options: GifCompressOptions): Promise<Blob> {
  // 先分解 GIF
  const frames = await decomposeGif(file, { format: 'png' });

  if (frames.length === 0) {
    throw new Error('No frames found in GIF');
  }

  // 使用分解的帧重新合成 GIF，实现压缩
  // 将 quality 转换为 gif.js 的质量参数（1-30，越低越好）
  // 1-100 -> 1-30: quality = Math.ceil((100 - options.quality) / 100 * 30) + 1
  const gifQuality = Math.max(1, Math.min(30, Math.ceil(((100 - options.quality) / 100) * 30) + 1));

  // 处理尺寸
  let targetWidth: number | undefined;
  let targetHeight: number | undefined;

  if (options.width && options.height) {
    targetWidth = options.width;
    targetHeight = options.height;
  } else if (options.width) {
    // 等比缩放
    const aspectRatio = frames[0].height / frames[0].width;
    targetWidth = options.width;
    targetHeight = Math.round(options.width * aspectRatio);
  } else if (options.height) {
    // 等比缩放
    const aspectRatio = frames[0].width / frames[0].height;
    targetHeight = options.height;
    targetWidth = Math.round(options.height * aspectRatio);
  }

  // 转换帧为可用于合成的格式
  const synthesisImages: SynthesisImage[] = await Promise.all(
    frames.map(async (frame, index) => {
      let finalDataUrl = frame.dataUrl;

      // 如果需要调整尺寸
      if (targetWidth && targetHeight) {
        finalDataUrl = await resizeImage(frame.dataUrl, targetWidth, targetHeight);
      }

      return {
        file: new File([], `frame_${index}.png`),
        dataUrl: finalDataUrl,
        width: targetWidth ?? frame.width,
        height: targetHeight ?? frame.height,
      };
    })
  );

  // 重新合成 GIF
  return synthesizeGif(synthesisImages, {
    width: targetWidth,
    height: targetHeight,
    delay: frames[0].delay, // 使用原始延迟
    quality: gifQuality,
    repeat: 0, // 无限循环
  });
}

/**
 * 调整图片尺寸
 */
async function resizeImage(dataUrl: string, width: number, height: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
}
