'use client';

import { Button, Dropdown, Modal, message, Progress, Select, Slider, Switch } from 'antd';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { useCallback, useEffect, useRef, useState } from 'react';

interface ImageFile {
  id: string;
  file: File;
  originalUrl: string;
  originalSize: number;
  compressedUrl?: string;
  compressedSize?: number;
  compressedBlob?: Blob;
  status: 'pending' | 'compressing' | 'done' | 'error';
  error?: string;
}

interface CompressOptions {
  quality: number;
  format: 'original' | 'jpeg' | 'png' | 'webp' | 'gif' | 'avif';
  scale: number;
  keepMetadata: boolean;
  progressive: boolean;
  pngOptimization: boolean;
  watermark: {
    enabled: boolean;
    text: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
    opacity: number;
    fontSize: number;
    color: string;
  };
}

const FORMAT_OPTIONS = [
  { label: '保持原格式', value: 'original' },
  { label: 'JPEG', value: 'jpeg' },
  { label: 'PNG', value: 'png' },
  { label: 'WebP', value: 'webp' },
  { label: 'GIF', value: 'gif' },
  { label: 'AVIF', value: 'avif' },
];

const SCALE_OPTIONS = [
  { label: '原图', value: 1 },
  { label: '50%', value: 0.5 },
  { label: '75%', value: 0.75 },
  { label: '80%', value: 0.8 },
  { label: '90%', value: 0.9 },
];

const PRESET_OPTIONS = [
  { label: '默认', value: 80, desc: '平衡质量和大小' },
  { label: '高压缩', value: 60, desc: '更小的文件体积' },
  { label: '高质量', value: 90, desc: '更好的图像质量' },
  { label: '网页优化', value: 75, desc: '适合网页加载' },
];

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}

function getMimeType(format: string, originalType: string): string {
  if (format === 'original') {
    return originalType;
  }
  const mimeMap: Record<string, string> = {
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
    avif: 'image/avif',
  };
  return mimeMap[format] || originalType;
}

function getExtension(format: string, originalName: string): string {
  if (format === 'original') {
    return originalName.split('.').pop() || 'jpg';
  }
  const extMap: Record<string, string> = {
    jpeg: 'jpg',
    png: 'png',
    webp: 'webp',
    gif: 'gif',
    avif: 'avif',
  };
  return extMap[format] || 'jpg';
}

async function compressImage(file: File, options: CompressOptions): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('无法创建 canvas 上下文'));
        return;
      }

      const { width, height } = img;
      const newWidth = Math.round(width * options.scale);
      const newHeight = Math.round(height * options.scale);

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const format = options.format === 'original' ? file.type.split('/')[1] : options.format;

      if (format === 'jpeg' || format === 'jpg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, newWidth, newHeight);
      }

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Add watermark if enabled
      if (options.watermark.enabled && options.watermark.text) {
        const fontSize = Math.max(
          12,
          Math.round(newWidth * 0.03 * (options.watermark.fontSize / 24))
        );
        ctx.font = `${fontSize}px Arial, sans-serif`;
        ctx.globalAlpha = options.watermark.opacity;
        ctx.fillStyle = options.watermark.color;

        const text = options.watermark.text;
        const metrics = ctx.measureText(text);
        const textWidth = metrics.width;
        const textHeight = fontSize;

        const padding = Math.max(10, Math.round(newWidth * 0.02));
        let x: number, y: number;

        switch (options.watermark.position) {
          case 'top-left':
            x = padding;
            y = padding + textHeight;
            break;
          case 'top-right':
            x = newWidth - textWidth - padding;
            y = padding + textHeight;
            break;
          case 'bottom-left':
            x = padding;
            y = newHeight - padding;
            break;
          case 'bottom-right':
            x = newWidth - textWidth - padding;
            y = newHeight - padding;
            break;
          default:
            x = (newWidth - textWidth) / 2;
            y = (newHeight + textHeight) / 2;
            break;
        }

        // Add shadow for better visibility
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 2;
        ctx.fillText(text, x, y);
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      const mimeType = getMimeType(format, file.type);
      const quality = options.quality / 100;

      const tryCompress = (q: number, attempt: number): void => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              if (blob.size > file.size && attempt < 3) {
                const lowerQuality = Math.max(0.1, q - 0.2);
                tryCompress(lowerQuality, attempt + 1);
              } else {
                resolve(blob);
              }
            } else {
              if (attempt < 3) {
                tryCompress(q * 0.5, attempt + 1);
              } else {
                resolve(new Blob([file], { type: file.type }));
              }
            }
          },
          mimeType,
          q
        );
      };

      tryCompress(quality, 0);
    };
    img.onerror = () => reject(new Error('图片加载失败'));
    img.src = URL.createObjectURL(file);
  });
}

export default function ImageCompressorPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<CompressOptions>({
    quality: 75,
    format: 'webp',
    scale: 1,
    keepMetadata: false,
    progressive: false,
    pngOptimization: true,
    watermark: {
      enabled: false,
      text: '',
      position: 'bottom-right',
      opacity: 0.5,
      fontSize: 16,
      color: '#ffffff',
    },
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [compareMode, setCompareMode] = useState<'side' | 'slider'>('side');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiModel, setApiModel] = useState<'glm-4-flash' | 'gemini-1.5-flash'>('glm-4-flash');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{ type: string; recommendation: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('image_compressor_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
    const savedModel = localStorage.getItem('image_compressor_api_model');
    if (savedModel) {
      setApiModel(savedModel as 'glm-4-flash' | 'gemini-1.5-flash');
    }
  }, []);

  const currentImage = images[currentIndex];

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const validTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'image/bmp',
        'image/tiff',
      ];
      const maxSize = 20 * 1024 * 1024;
      const maxCount = 50;

      const newImages: ImageFile[] = [];
      let addedCount = 0;

      for (let i = 0; i < files.length && addedCount < maxCount; i++) {
        const file = files[i];
        if (!validTypes.includes(file.type)) {
          message.warning(`${file.name} 格式不支持`);
          continue;
        }
        if (file.size > maxSize) {
          message.warning(`${file.name} 超过 20MB 限制`);
          continue;
        }

        newImages.push({
          id: `${Date.now()}-${i}`,
          file,
          originalUrl: URL.createObjectURL(file),
          originalSize: file.size,
          status: 'pending',
        });
        addedCount++;
      }

      if (newImages.length > 0) {
        setImages((prev) => [...prev, ...newImages]);
        if (images.length === 0) {
          setCurrentIndex(0);
        }
      }
    },
    [images.length]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleCompress = useCallback(async () => {
    if (images.length === 0) return;

    const pendingImages = images.filter(
      (img) => img.status === 'pending' || img.status === 'error'
    );
    if (pendingImages.length === 0) {
      message.info('所有图片已压缩');
      return;
    }

    setIsCompressing(true);
    setProgress(0);

    const updatedImages = [...images];
    let completed = 0;

    for (let i = 0; i < updatedImages.length; i++) {
      const img = updatedImages[i];
      if (img.status === 'compressing' || img.status === 'done') continue;

      updatedImages[i] = { ...img, status: 'compressing' };
      setImages([...updatedImages]);

      try {
        const compressedBlob = await compressImage(img.file, options);
        const compressedUrl = URL.createObjectURL(compressedBlob);

        updatedImages[i] = {
          ...img,
          status: 'done',
          compressedUrl,
          compressedSize: compressedBlob.size,
          compressedBlob,
        };
      } catch (error) {
        updatedImages[i] = {
          ...img,
          status: 'error',
          error: error instanceof Error ? error.message : '压缩失败',
        };
        message.error(`${img.file.name} 压缩失败`);
      }

      completed++;
      setProgress(Math.round((completed / pendingImages.length) * 100));
    }

    setImages([...updatedImages]);
    setIsCompressing(false);
    message.success('压缩完成');
  }, [images, options]);

  const handleCompressCurrent = useCallback(async () => {
    if (!currentImage || currentImage.status === 'done') return;

    setIsCompressing(true);

    const updatedImages = [...images];
    updatedImages[currentIndex] = { ...currentImage, status: 'compressing' };
    setImages([...updatedImages]);

    try {
      const compressedBlob = await compressImage(currentImage.file, options);
      const compressedUrl = URL.createObjectURL(compressedBlob);

      updatedImages[currentIndex] = {
        ...currentImage,
        status: 'done',
        compressedUrl,
        compressedSize: compressedBlob.size,
        compressedBlob,
      };
      message.success('压缩完成');
    } catch (error) {
      updatedImages[currentIndex] = {
        ...currentImage,
        status: 'error',
        error: error instanceof Error ? error.message : '压缩失败',
      };
      message.error('压缩失败');
    }

    setImages([...updatedImages]);
    setIsCompressing(false);
  }, [currentImage, currentIndex, images, options]);

  const handleDownload = useCallback(() => {
    if (!currentImage?.compressedBlob) return;

    const ext = getExtension(
      options.format === 'original' ? currentImage.file.type.split('/')[1] : options.format,
      currentImage.file.name
    );
    const baseName = currentImage.file.name.replace(/\.[^/.]+$/, '');
    saveAs(currentImage.compressedBlob, `${baseName}_compressed.${ext}`);
  }, [currentImage, options.format]);

  const handleDownloadAll = useCallback(async () => {
    const compressedImages = images.filter(
      (img): img is ImageFile & { compressedBlob: Blob } => !!img.compressedBlob
    );
    if (compressedImages.length === 0) return;

    if (compressedImages.length === 1) {
      handleDownload();
      return;
    }

    const zip = new JSZip();
    compressedImages.forEach((img) => {
      const ext = getExtension(
        options.format === 'original' ? img.file.type.split('/')[1] : options.format,
        img.file.name
      );
      const baseName = img.file.name.replace(/\.[^/.]+$/, '');
      zip.file(`${baseName}_compressed.${ext}`, img.compressedBlob);
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'compressed_images.zip');
  }, [images, options.format, handleDownload]);

  const handleRemove = useCallback(
    (id: string) => {
      setImages((prev) => {
        const newImages = prev.filter((img) => img.id !== id);
        if (currentIndex >= newImages.length) {
          setCurrentIndex(Math.max(0, newImages.length - 1));
        }
        return newImages;
      });
    },
    [currentIndex]
  );

  const handleClearAll = useCallback(() => {
    images.forEach((img) => {
      URL.revokeObjectURL(img.originalUrl);
      if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
    });
    setImages([]);
    setCurrentIndex(0);
  }, [images]);

  const handleSliderMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePresetChange = (value: number) => {
    setOptions({ ...options, quality: value });
  };

  const compressionRate = currentImage?.compressedSize
    ? Math.round((1 - currentImage.compressedSize / currentImage.originalSize) * 100)
    : 0;

  const compressionRateDisplay =
    compressionRate > 0 ? `-${compressionRate}%` : `+${Math.abs(compressionRate)}%`;

  const totalOriginal = images.reduce((sum, img) => sum + img.originalSize, 0);
  const totalCompressed = images.reduce(
    (sum, img) => sum + (img.compressedSize || img.originalSize),
    0
  );
  const totalSaved =
    totalOriginal > 0 ? Math.round((1 - totalCompressed / totalOriginal) * 100) : 0;

  const pendingCount = images.filter(
    (img) => img.status === 'pending' || img.status === 'error'
  ).length;
  const compressedCount = images.filter((img) => img.compressedBlob).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg
                aria-label="图片压缩"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">图片压缩</h1>
          </div>
          <div className="flex items-center gap-2">
            {images.length > 0 && (
              <Button onClick={handleClearAll} className="text-gray-600">
                清空全部
              </Button>
            )}
            <Button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 text-gray-700"
            >
              <svg
                aria-label="设置"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              AI 设置
            </Button>
          </div>
        </div>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
            images.length === 0
              ? 'border-indigo-300 bg-white hover:border-indigo-500'
              : 'border-gray-300 bg-white hover:border-indigo-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
              <svg
                aria-label="上传"
                className="w-7 h-7 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-900 font-medium">
                {images.length === 0 ? '拖拽图片到此处或点击上传' : '继续添加图片'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                支持 JPEG/PNG/WebP/GIF/BMP/TIFF，单个最大 20MB，最多 50 张
              </p>
            </div>
          </div>
        </div>

        {images.length > 0 && (
          <>
            {/* Options */}
            <div className="bg-white rounded-xl p-5 mt-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">压缩选项</h3>
                <Button
                  type="link"
                  onClick={() => setShowMoreOptions(!showMoreOptions)}
                  className="text-indigo-600"
                >
                  {showMoreOptions ? '收起更多选项' : '展开更多选项'}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">压缩预设</label>
                  <Select
                    value={options.quality}
                    onChange={handlePresetChange}
                    options={PRESET_OPTIONS.map((opt) => ({
                      label: (
                        <div>
                          <div>{opt.label}</div>
                          <div className="text-xs text-gray-400">{opt.desc}</div>
                        </div>
                      ),
                      value: opt.value,
                    }))}
                    className="w-full"
                    placeholder="选择预设"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    质量: {options.quality}%
                  </label>
                  <Slider
                    value={options.quality}
                    onChange={(value) => setOptions({ ...options, quality: value })}
                    min={10}
                    max={100}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">输出格式</label>
                  <Select
                    value={options.format}
                    onChange={(value) => setOptions({ ...options, format: value })}
                    options={FORMAT_OPTIONS}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">缩放比例</label>
                  <Select
                    value={options.scale}
                    onChange={(value) => setOptions({ ...options, scale: value })}
                    options={SCALE_OPTIONS}
                    className="w-full"
                  />
                </div>
              </div>

              {showMoreOptions && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">保留元数据</span>
                    <Switch
                      checked={options.keepMetadata}
                      onChange={(checked) => setOptions({ ...options, keepMetadata: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">渐进式 JPEG</span>
                    <Switch
                      checked={options.progressive}
                      onChange={(checked) => setOptions({ ...options, progressive: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">PNG 优化</span>
                    <Switch
                      checked={options.pngOptimization}
                      onChange={(checked) => setOptions({ ...options, pngOptimization: checked })}
                    />
                  </div>
                </div>
              )}

              {/* Watermark Options */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">水印设置</span>
                  <Switch
                    checked={options.watermark.enabled}
                    onChange={(checked) =>
                      setOptions({
                        ...options,
                        watermark: { ...options.watermark, enabled: checked },
                      })
                    }
                  />
                </div>
                {options.watermark.enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">水印文字</label>
                      <input
                        type="text"
                        value={options.watermark.text}
                        onChange={(e) =>
                          setOptions({
                            ...options,
                            watermark: { ...options.watermark, text: e.target.value },
                          })
                        }
                        placeholder="输入水印文字"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">位置</label>
                      <Select
                        value={options.watermark.position}
                        onChange={(value) =>
                          setOptions({
                            ...options,
                            watermark: { ...options.watermark, position: value },
                          })
                        }
                        options={[
                          { label: '左上', value: 'top-left' },
                          { label: '右上', value: 'top-right' },
                          { label: '左下', value: 'bottom-left' },
                          { label: '右下', value: 'bottom-right' },
                          { label: '居中', value: 'center' },
                        ]}
                        className="w-full"
                        size="small"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        透明度: {Math.round(options.watermark.opacity * 100)}%
                      </label>
                      <Slider
                        value={options.watermark.opacity}
                        onChange={(value) =>
                          setOptions({
                            ...options,
                            watermark: { ...options.watermark, opacity: value },
                          })
                        }
                        min={0.1}
                        max={1}
                        step={0.1}
                        className="pt-2"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        字体大小: {options.watermark.fontSize}px
                      </label>
                      <Slider
                        value={options.watermark.fontSize}
                        onChange={(value) =>
                          setOptions({
                            ...options,
                            watermark: { ...options.watermark, fontSize: value },
                          })
                        }
                        min={12}
                        max={48}
                        step={2}
                        className="pt-2"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-6">
                {pendingCount > 0 ? (
                  <>
                    <Button
                      type="primary"
                      size="large"
                      onClick={handleCompress}
                      loading={isCompressing}
                      className="!bg-indigo-600 !border-indigo-600 hover:!bg-indigo-700"
                    >
                      {isCompressing ? `压缩中 ${progress}%` : `压缩全部 (${pendingCount}张)`}
                    </Button>
                    <Button
                      size="large"
                      onClick={handleCompressCurrent}
                      disabled={!currentImage || currentImage.status === 'done' || isCompressing}
                    >
                      压缩当前
                    </Button>
                  </>
                ) : (
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                      setImages((prev) => prev.map((img) => ({ ...img, status: 'pending' })));
                    }}
                    className="!bg-indigo-600 !border-indigo-600"
                  >
                    重新压缩全部
                  </Button>
                )}
                <Button
                  size="large"
                  onClick={() => setShowAIModal(true)}
                  className="text-indigo-600 border-indigo-600"
                >
                  AI 智能压缩
                </Button>
              </div>

              {isCompressing && (
                <Progress percent={progress} className="mt-4" strokeColor="#4f46e5" />
              )}
            </div>

            {/* Compare Preview */}
            {currentImage && currentImage.status === 'done' && (
              <div className="bg-white rounded-xl p-5 mt-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">压缩对比</h3>
                  <div className="flex gap-2">
                    <Button
                      type={compareMode === 'side' ? 'primary' : 'default'}
                      onClick={() => setCompareMode('side')}
                      size="small"
                      className={compareMode === 'side' ? '!bg-indigo-600' : ''}
                    >
                      左右对比
                    </Button>
                    <Button
                      type={compareMode === 'slider' ? 'primary' : 'default'}
                      onClick={() => setCompareMode('slider')}
                      size="small"
                      className={compareMode === 'slider' ? '!bg-indigo-600' : ''}
                    >
                      滑块对比
                    </Button>
                  </div>
                </div>

                {compareMode === 'side' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        原图 ({formatFileSize(currentImage.originalSize)})
                      </div>
                      <img
                        src={currentImage.originalUrl}
                        alt="Original"
                        className="w-full h-64 object-contain bg-gray-100 rounded-lg"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute top-2 left-2 bg-green-600/80 text-white text-xs px-2 py-1 rounded">
                        压缩后 (
                        {currentImage.compressedSize
                          ? formatFileSize(currentImage.compressedSize)
                          : '0 B'}
                        )
                      </div>
                      <img
                        src={currentImage.compressedUrl}
                        alt="Compressed"
                        className="w-full h-64 object-contain bg-gray-100 rounded-lg"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    ref={sliderRef}
                    className="relative h-64 cursor-ew-resize select-none"
                    onMouseMove={handleSliderMove}
                    onMouseLeave={() => setSliderPosition(50)}
                  >
                    <img
                      src={currentImage.originalUrl}
                      alt="Original"
                      className="absolute inset-0 w-full h-full object-contain bg-gray-100 rounded-lg"
                    />
                    <div
                      className="absolute inset-0 overflow-hidden rounded-lg"
                      style={{ width: `${sliderPosition}%` }}
                    >
                      <img
                        src={currentImage.compressedUrl}
                        alt="Compressed"
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    </div>
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-lg"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <svg
                          aria-label="拖动对比"
                          className="w-4 h-4 text-indigo-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      原图
                    </div>
                    <div className="absolute bottom-2 right-2 bg-green-600/80 text-white text-xs px-2 py-1 rounded">
                      压缩后
                    </div>
                  </div>
                )}

                {/* Info */}
                <div className="flex items-center justify-between mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs text-gray-500">原始大小</p>
                      <p className="font-medium text-gray-900">
                        {formatFileSize(currentImage.originalSize)}
                      </p>
                    </div>
                    <svg
                      aria-label="箭头"
                      className="w-5 h-5 text-indigo-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">压缩后</p>
                      <p className="font-medium text-green-600">
                        {currentImage.compressedSize
                          ? formatFileSize(currentImage.compressedSize)
                          : '0 B'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">压缩率</p>
                    <p
                      className={`text-xl font-bold ${compressionRate > 0 ? 'text-green-600' : 'text-red-500'}`}
                    >
                      {compressionRateDisplay}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <Button
                    type="primary"
                    onClick={handleDownload}
                    className="!bg-green-600 !border-green-600 hover:!bg-green-700"
                  >
                    下载当前
                  </Button>
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'jpeg',
                          label: '另存为 JPEG',
                          onClick: () => {
                            const c = { ...options, format: 'jpeg' as const };
                            setOptions(c);
                            setTimeout(handleDownload, 0);
                          },
                        },
                        {
                          key: 'png',
                          label: '另存为 PNG',
                          onClick: () => {
                            const c = { ...options, format: 'png' as const };
                            setOptions(c);
                            setTimeout(handleDownload, 0);
                          },
                        },
                        {
                          key: 'webp',
                          label: '另存为 WebP',
                          onClick: () => {
                            const c = { ...options, format: 'webp' as const };
                            setOptions(c);
                            setTimeout(handleDownload, 0);
                          },
                        },
                      ],
                    }}
                  >
                    <Button>另存为</Button>
                  </Dropdown>
                  {compressedCount > 1 && (
                    <Button onClick={handleDownloadAll}>批量下载 ({compressedCount})</Button>
                  )}
                </div>
              </div>
            )}

            {/* Image List */}
            <div className="bg-white rounded-xl p-5 mt-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">图片列表 ({images.length})</h3>
                <div className="text-sm text-gray-500">
                  总计: {formatFileSize(totalOriginal)} → {formatFileSize(totalCompressed)} (节省{' '}
                  {totalSaved}%)
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 max-h-64 overflow-y-auto">
                {images.map((img, index) => (
                  <div
                    key={img.id}
                    className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentIndex
                        ? 'border-indigo-500'
                        : 'border-transparent hover:border-indigo-300'
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <img
                      src={img.compressedUrl || img.originalUrl}
                      alt={img.file.name}
                      className="w-full h-16 object-cover"
                    />
                    {img.status === 'compressing' && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                    {img.status === 'error' && (
                      <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center">
                        <svg
                          aria-label="错误"
                          className="w-5 h-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    )}
                    <button
                      type="button"
                      className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(img.id);
                      }}
                    >
                      <svg
                        aria-label="删除"
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    {img.compressedSize && (
                      <div
                        className={`absolute bottom-0 left-0 right-0 text-white text-xs text-center py-0.5 ${(1 - img.compressedSize / img.originalSize) > 0 ? 'bg-green-600' : 'bg-red-500'}`}
                      >
                        {1 - img.compressedSize / img.originalSize > 0
                          ? `-${Math.round((1 - img.compressedSize / img.originalSize) * 100)}%`
                          : `+${Math.round((img.compressedSize / img.originalSize - 1) * 100)}%`}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {images.length > 1 && (
                <div className="flex items-center justify-center gap-4 mt-4">
                  <Button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex(currentIndex - 1)}
                  >
                    上一张
                  </Button>
                  <span className="text-gray-500">
                    {currentIndex + 1} / {images.length}
                  </span>
                  <Button
                    disabled={currentIndex === images.length - 1}
                    onClick={() => setCurrentIndex(currentIndex + 1)}
                  >
                    下一张
                  </Button>
                </div>
              )}
            </div>
          </>
        )}

        {/* AI Settings Modal */}
        <Modal
          title="AI 智能压缩设置"
          open={showSettings}
          onCancel={() => setShowSettings(false)}
          footer={null}
          centered
        >
          <p className="text-gray-500 mb-4">
            AI 智能压缩功能需要配置 API Key。我们不会保存您的 API Key，仅在本次会话中使用。
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">API Key</label>
              <input
                type="password"
                placeholder="输入智谱 GLM 或 Google Gemini API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">选择模型</label>
              <Select
                value={apiModel}
                onChange={(value) => setApiModel(value)}
                options={[
                  { label: '智谱 GLM-4-Flash', value: 'glm-4-flash' },
                  { label: 'Google Gemini 1.5 Flash', value: 'gemini-1.5-flash' },
                ]}
                className="w-full"
              />
            </div>
            <Button
              type="primary"
              onClick={() => {
                localStorage.setItem('image_compressor_api_key', apiKey);
                localStorage.setItem('image_compressor_api_model', apiModel);
                message.success('API Key 已保存');
                setShowSettings(false);
              }}
              disabled={!apiKey}
              className="!bg-indigo-600 w-full"
            >
              保存
            </Button>
            <p className="text-xs text-gray-400">
              获取 API Key：
              <a
                href="https://open.bigmodel.cn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 ml-1"
              >
                智谱 GLM
              </a>
              {' | '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600"
              >
                Google Gemini
              </a>
            </p>
          </div>
        </Modal>

        {/* AI Analysis Modal */}
        <Modal
          title="AI 智能压缩"
          open={showAIModal}
          onCancel={() => {
            setShowAIModal(false);
            setAiResult(null);
          }}
          footer={null}
          centered
        >
          {!apiKey ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  aria-label="AI智能"
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <p className="text-gray-700 mb-2">AI 将自动识别图片类型并推荐最佳压缩参数</p>
              <p className="text-sm text-gray-500 mb-4">请先在设置中配置 API Key</p>
              <Button
                type="primary"
                onClick={() => {
                  setShowAIModal(false);
                  setShowSettings(true);
                }}
                className="!bg-indigo-600"
              >
                去设置
              </Button>
            </div>
          ) : !currentImage ? (
            <div className="text-center py-8">
              <p className="text-gray-500">请先上传图片</p>
            </div>
          ) : aiLoading ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-gray-700">AI 正在分析图片...</p>
            </div>
          ) : aiResult ? (
            <div className="py-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    aria-label="成功"
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">识别结果: {aiResult.type}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">{aiResult.recommendation}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="primary"
                  onClick={() => {
                    setShowAIModal(false);
                    setAiResult(null);
                    handleCompress();
                  }}
                  className="!bg-green-600 flex-1"
                >
                  使用推荐参数压缩
                </Button>
                <Button
                  onClick={() => {
                    setShowAIModal(false);
                    setAiResult(null);
                  }}
                >
                  关闭
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mb-4">
                <img
                  src={currentImage.originalUrl}
                  alt="分析图片"
                  className="max-h-40 mx-auto rounded-lg"
                />
              </div>
              <p className="text-gray-700 mb-4">点击下方按钮开始 AI 分析</p>
              <Button
                type="primary"
                onClick={async () => {
                  setAiLoading(true);
                  try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const img = new Image();
                    img.src = currentImage.originalUrl;
                    await new Promise<void>((resolve) => {
                      img.onload = () => {
                        const maxSize = 512;
                        let w = img.width,
                          h = img.height;
                        if (w > h) {
                          if (w > maxSize) {
                            h = (h * maxSize) / w;
                            w = maxSize;
                          }
                        } else {
                          if (h > maxSize) {
                            w = (w * maxSize) / h;
                            h = maxSize;
                          }
                        }
                        canvas.width = w;
                        canvas.height = h;
                        ctx?.drawImage(img, 0, 0, w, h);
                        resolve();
                      };
                    });
                    const base64 = canvas.toDataURL('image/jpeg', 0.8);
                    const res = await fetch('/api/image-analyze', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ apiKey, model: apiModel, imageBase64: base64 }),
                    });
                    const data = await res.json();
                    if (data.error) message.error(data.error);
                    else setAiResult(data);
                  } catch (error) {
                    message.error('AI 分析失败');
                    console.error(error);
                  } finally {
                    setAiLoading(false);
                  }
                }}
                className="!bg-indigo-600"
              >
                开始 AI 分析
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
