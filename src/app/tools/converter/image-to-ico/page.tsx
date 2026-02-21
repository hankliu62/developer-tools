'use client';

import { Button, Input, Modal, message, Progress, Tag } from 'antd';
import { saveAs } from 'file-saver';
import { useCallback, useEffect, useRef, useState } from 'react';

const ICO_SIZES = [16, 24, 32, 48, 64, 128, 256];
const PNG_SIZES = [16, 32, 48, 64, 128, 192, 512];

const STORAGE_KEY = 'image2ico_api_key';

const API_KEY_LINKS = [{ label: '智谱 GLM', url: 'https://open.bigmodel.cn' }];

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function convertToIco(
  imageUrl: string,
  sizes: number[],
  onProgress?: (progress: number) => void
): Promise<{ size: number; blob: Blob }[]> {
  const img = new Image();
  img.crossOrigin = 'anonymous';

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('图片加载失败'));
    img.src = imageUrl;
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('无法创建 canvas');

  const results: { size: number; blob: Blob }[] = [];
  const total = sizes.length;

  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];
    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);

    const dataUrl = canvas.toDataURL('image/png');
    const blob = await (await fetch(dataUrl)).blob();
    results.push({ size, blob });
    onProgress?.(Math.round(((i + 1) / total) * 100));
  }

  return results;
}

async function convertToPng(
  imageUrl: string,
  sizes: number[],
  onProgress?: (progress: number) => void
): Promise<{ size: number; blob: Blob }[]> {
  const img = new Image();
  img.crossOrigin = 'anonymous';

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('图片加载失败'));
    img.src = imageUrl;
  });

  const results: { size: number; blob: Blob }[] = [];
  const total = sizes.length;

  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i];
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('无法创建 canvas');
    ctx.drawImage(img, 0, 0, size, size);
    const blob = await new Promise<Blob>((resolve) => canvas.toBlob(resolve as any, 'image/png'));
    results.push({ size, blob });
    onProgress?.(Math.round(((i + 1) / total) * 100));
  }

  return results;
}

function SizeTag({
  size,
  selected,
  onClick,
}: {
  size: number;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <Tag
      onClick={onClick}
      className={`cursor-pointer px-3 py-1 text-sm rounded-full transition-all duration-200 ${
        selected
          ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white border-0 shadow-md hover:shadow-lg'
          : 'bg-gray-100 text-gray-600 border-0 hover:bg-gray-200'
      }`}
    >
      {size}×{size}
    </Tag>
  );
}

function FormatCard({
  format,
  selected,
  onClick,
  description,
}: {
  format: string;
  selected: boolean;
  onClick: () => void;
  description: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 hover:shadow-md ${
        selected
          ? 'border-teal-500 bg-gradient-to-br from-teal-50 to-emerald-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-teal-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className={`font-semibold text-lg ${selected ? 'text-teal-700' : 'text-gray-700'}`}>
          {format.toUpperCase()}
        </span>
        {selected && (
          <span className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
            <svg
              aria-hidden="true"
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}

export default function ImageToIcoPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{ format: string; size: number; blob: Blob }[]>([]);
  const [formats, setFormats] = useState<('ico' | 'png')[]>(['ico']);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([16, 32, 48, 256]);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [aiProcessing, setAiProcessing] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem(STORAGE_KEY);
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      message.error('请选择图片文件');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      message.error('图片大小不能超过 10MB');
      return;
    }
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setImageFile(file);
    setOriginalSize(file.size);
    setResults([]);
    setProcessedImageUrl(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileSelect(file);
      }
    },
    [handleFileSelect]
  );

  const handlePaste = useCallback(
    (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (const item of Array.from(items)) {
          if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            if (file) {
              handleFileSelect(file);
            }
            break;
          }
        }
      }
    },
    [handleFileSelect]
  );

  const handleUrlSubmit = useCallback(async () => {
    if (!urlInput) {
      message.error('请输入图片地址');
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(urlInput);
      const blob = await response.blob();
      if (!blob.type.startsWith('image/')) {
        message.error('请输入有效的图片地址');
        return;
      }
      const file = new File([blob], 'image', { type: blob.type });
      handleFileSelect(file);
      setShowUrlInput(false);
      setUrlInput('');
    } catch {
      message.error('图片加载失败，请检查地址是否正确');
    } finally {
      setLoading(false);
    }
  }, [urlInput, handleFileSelect]);

  const handleConvert = useCallback(async () => {
    if (!imageUrl) {
      message.error('请先上传图片');
      return;
    }
    if (formats.length === 0) {
      message.error('请选择至少一种输出格式');
      return;
    }
    if (selectedSizes.length === 0) {
      message.error('请选择至少一种尺寸');
      return;
    }

    setLoading(true);
    setProgress(0);
    setResults([]);

    try {
      const newResults: { format: string; size: number; blob: Blob }[] = [];
      const sizesToConvert = selectedSizes.sort((a, b) => a - b);

      if (formats.includes('ico')) {
        const icoResults = await convertToIco(processedImageUrl || imageUrl, sizesToConvert, (p) =>
          setProgress(p)
        );
        for (const { size, blob } of icoResults) {
          newResults.push({ format: 'ico', size, blob });
        }
      }

      if (formats.includes('png')) {
        const pngResults = await convertToPng(processedImageUrl || imageUrl, sizesToConvert, (p) =>
          setProgress(p)
        );
        for (const { size, blob } of pngResults) {
          newResults.push({ format: 'png', size, blob });
        }
      }

      setResults(newResults);
      message.success('转换成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '转换失败');
    } finally {
      setLoading(false);
    }
  }, [imageUrl, processedImageUrl, formats, selectedSizes]);

  const handleDownload = useCallback(
    (result: { format: string; size: number; blob: Blob }, index: number) => {
      const ext = result.format === 'ico' ? 'ico' : 'png';
      const name = `${imageFile?.name?.split('.')[0] || 'image'}_${selectedSizes[index] || 'icon'}.${ext}`;
      saveAs(result.blob, name);
      message.success('下载成功');
    },
    [imageFile, selectedSizes]
  );

  const handleAIFeature = useCallback(
    async (feature: 'crop' | 'remove-bg' | 'enhance') => {
      if (!apiKey) {
        setShowApiKeyModal(true);
        return;
      }

      if (!imageFile) {
        message.error('请先上传图片');
        return;
      }

      setAiProcessing(feature);

      try {
        const base64 = await fileToBase64(imageFile);
        const prompts: Record<string, string> = {
          crop: '请分析这张图片，识别出主体内容区域，返回最适合作为图标的正方形裁剪区域坐标。返回 JSON 格式：{"x": 0, "y": 0, "width": 100, "height": 100}',
          'remove-bg': '请将这张图片的背景去除，只保留主体内容，返回透明背景的图片。',
          enhance: '请提升这张图片的清晰度和质量，进行超分辨率重建，使其更适合作为图标使用。',
        };

        const response = await fetch('/api/ai/image-process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            apiKey,
            imageBase64: base64,
            prompt: prompts[feature],
            feature,
          }),
        });

        const data = await response.json();

        if (data.code === 1 && data.data?.image) {
          const newImageUrl = `data:image/png;base64,${data.data.image}`;
          setProcessedImageUrl(newImageUrl);
          message.success('处理成功');
        } else {
          message.error(data.msg || 'AI 处理失败');
        }
      } catch {
        message.error('AI 处理请求失败');
      } finally {
        setAiProcessing(null);
      }
    },
    [apiKey, imageFile]
  );

  const handleSaveApiKey = useCallback(() => {
    if (!apiKey) {
      message.error('请输入 API Key');
      return;
    }
    localStorage.setItem(STORAGE_KEY, apiKey);
    message.success('API Key 已保存');
    setShowApiKeyModal(false);
  }, [apiKey]);

  const handleClear = useCallback(() => {
    if (imageUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl);
    }
    setImageUrl(null);
    setImageFile(null);
    setOriginalSize(0);
    setResults([]);
    setProcessedImageUrl(null);
  }, [imageUrl]);

  const toggleFormat = (format: 'ico' | 'png') => {
    if (formats.includes(format)) {
      if (formats.length > 1) {
        setFormats(formats.filter((f) => f !== format));
      }
    } else {
      setFormats([...formats, format]);
    }
  };

  const toggleSize = (size: number) => {
    if (selectedSizes.includes(size)) {
      if (selectedSizes.length > 1) {
        setSelectedSizes(selectedSizes.filter((s) => s !== size));
      }
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      handlePaste(e);
    };
    document.addEventListener('paste', handleGlobalPaste);
    return () => document.removeEventListener('paste', handleGlobalPaste);
  }, [handlePaste]);

  const displayImageUrl = processedImageUrl || imageUrl;
  const availableSizes = formats.includes('ico') ? ICO_SIZES : PNG_SIZES;

  return (
    <div className="max-w-4xl mx-auto">
      <style jsx global>{`
        .upload-zone {
          border: 2px dashed #e5e7eb;
          border-radius: 20px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .upload-zone:hover,
        .upload-zone.drag-over {
          border-color: #14b8a6;
          background: linear-gradient(135deg, #f0fdfa 0%, #ecfeff 100%);
          transform: scale(1.01);
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(229, 231, 235, 0.5);
          border-radius: 20px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        }
        .result-card {
          background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%);
          border-radius: 20px;
          border: 1px solid #5eead4;
        }
        .ai-btn {
          transition: all 0.2s ease;
        }
        .ai-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px -5px rgba(20, 184, 166, 0.4);
        }
        .primary-btn {
          background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
          transition: all 0.3s ease;
        }
        .primary-btn:hover {
          background: linear-gradient(135deg, #0f766e 0%, #115e59 100%);
          box-shadow: 0 10px 40px -10px rgba(13, 148, 136, 0.5);
          transform: translateY(-1px);
        }
        .primary-btn:disabled {
          background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
          transform: none;
          box-shadow: none;
        }
      `}</style>

      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl mb-4 shadow-lg shadow-teal-500/30">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-white"
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
          图片转 ICO
        </h1>
        <p className="text-gray-500">上传图片转换为 ICO/PNG Favicon 格式</p>
      </div>

      <div
        ref={dropZoneRef}
        className={`upload-zone bg-white p-10 mb-6 text-center cursor-pointer ${!imageUrl ? '' : 'py-6'}`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add('drag-over');
        }}
        onDragLeave={(e) => {
          e.currentTarget.classList.remove('drag-over');
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
        />

        {imageUrl ? (
          <div className="relative inline-block group">
            <div className="relative">
              <img
                src={displayImageUrl || ''}
                alt="预览图"
                className="max-h-56 max-w-full object-contain rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition-all duration-300" />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-lg hover:bg-red-600 cursor-pointer shadow-lg transition-transform hover:scale-110"
            >
              ×
            </button>
            {originalSize > 0 && (
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gray-900/80 text-white text-xs px-3 py-1 rounded-full">
                {formatFileSize(originalSize)}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 mb-3 text-lg">
              拖拽图片到这里，或<span className="text-teal-600 font-medium">点击选择文件</span>
            </p>
            <p className="text-gray-400 text-sm mb-6">支持 PNG/JPG/WebP/GIF/BMP/SVG，最大 10MB</p>
            <div className="flex justify-center gap-4">
              <Button
                type="default"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUrlInput(true);
                }}
                className="cursor-pointer border-teal-200 text-teal-600 hover:border-teal-400 hover:text-teal-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 mr-1 inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                输入 URL
              </Button>
              <span className="text-gray-300 self-center">|</span>
              <span className="text-gray-400 text-sm self-center">Ctrl+V 粘贴</span>
            </div>
          </>
        )}
      </div>

      {showUrlInput && (
        <div className="glass-card p-4 mb-6">
          <div className="flex gap-3">
            <Input
              placeholder="输入图片地址..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onPressEnter={handleUrlSubmit}
              className="flex-1 h-10"
              size="large"
            />
            <Button
              type="primary"
              onClick={handleUrlSubmit}
              loading={loading}
              className="h-10 px-6 cursor-pointer primary-btn"
            >
              加载
            </Button>
            <Button
              onClick={() => {
                setShowUrlInput(false);
                setUrlInput('');
              }}
              className="h-10 cursor-pointer"
            >
              取消
            </Button>
          </div>
        </div>
      )}

      {imageUrl && (
        <div className="glass-card p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                AI 增强
              </h3>
              <p className="text-xs text-gray-500">点击按钮处理图片，处理后用于转换</p>
            </div>
            <Button
              type="text"
              onClick={() => setShowApiKeyModal(true)}
              className="text-xs text-teal-600 cursor-pointer hover:text-teal-700"
            >
              {apiKey ? (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  已配置
                </span>
              ) : (
                '设置 API Key'
              )}
            </Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => handleAIFeature('crop')}
              loading={aiProcessing === 'crop'}
              disabled={!!aiProcessing}
              className="ai-btn cursor-pointer bg-white border border-gray-200 text-gray-700 hover:border-teal-300 hover:text-teal-600 hover:shadow-md"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              AI 裁剪
            </Button>
            <Button
              onClick={() => handleAIFeature('remove-bg')}
              loading={aiProcessing === 'remove-bg'}
              disabled={!!aiProcessing}
              className="ai-btn cursor-pointer bg-white border border-gray-200 text-gray-700 hover:border-teal-300 hover:text-teal-600 hover:shadow-md"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              AI 去背景
            </Button>
            <Button
              onClick={() => handleAIFeature('enhance')}
              loading={aiProcessing === 'enhance'}
              disabled={!!aiProcessing}
              className="ai-btn cursor-pointer bg-white border border-gray-200 text-gray-700 hover:border-teal-300 hover:text-teal-600 hover:shadow-md"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 mr-1.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              AI 增强
            </Button>
          </div>
          {processedImageUrl && (
            <div className="mt-4 p-3 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-100">
              <p className="text-sm text-teal-700 flex items-center gap-2">
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
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
                已应用 AI 处理
              </p>
            </div>
          )}
        </div>
      )}

      <div className="glass-card p-6 mb-6">
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-teal-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            输出格式
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <FormatCard
              format="ico"
              selected={formats.includes('ico')}
              onClick={() => toggleFormat('ico')}
              description="多尺寸图标格式，支持 16-256px"
            />
            <FormatCard
              format="png"
              selected={formats.includes('png')}
              onClick={() => toggleFormat('png')}
              description="单尺寸图片，常用 32/64px"
            />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-teal-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
            输出尺寸
            <span className="text-xs font-normal text-gray-400 ml-2">
              (已选 {selectedSizes.length} 个)
            </span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <SizeTag
                key={size}
                size={size}
                selected={selectedSizes.includes(size)}
                onClick={() => toggleSize(size)}
              />
            ))}
          </div>
        </div>
      </div>

      <Button
        type="primary"
        size="large"
        block
        onClick={handleConvert}
        loading={loading}
        disabled={!imageUrl || formats.length === 0 || selectedSizes.length === 0}
        className="h-14 text-base font-medium mb-6 primary-btn cursor-pointer"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              aria-hidden="true"
              className="animate-spin w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            转换中 {progress}%
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
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
            开始转换
          </span>
        )}
      </Button>

      {loading && (
        <div className="mb-6">
          <Progress
            percent={progress}
            status="active"
            strokeColor={{ from: '#0d9488', to: '#10b981' }}
            trailColor="#e5e7eb"
          />
        </div>
      )}

      {results.length > 0 && (
        <div className="result-card p-6">
          <h3 className="font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-teal-500"
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
            转换结果
            <span className="text-xs font-normal text-gray-500 ml-2">
              共 {results.length} 个文件
            </span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {results.map((result, index) => (
              <div
                key={`${result.format}-${index}`}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                  <img
                    src={displayImageUrl || ''}
                    alt="预览"
                    className="max-w-full max-h-full object-contain rounded-lg"
                    style={{ width: '56px', height: '56px' }}
                  />
                </div>
                <p className="font-semibold text-gray-700 mb-1">
                  {result.format.toUpperCase()} - {result.size}×{result.size}
                </p>
                <p className="text-xs text-gray-400 mb-3">{formatFileSize(result.blob.size)}</p>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => handleDownload(result, index)}
                  className="cursor-pointer bg-gradient-to-r from-teal-500 to-emerald-500 border-0 text-xs h-8"
                >
                  <svg
                    aria-hidden="true"
                    className="w-3 h-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  下载
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        title={
          <div className="flex items-center gap-2">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-teal-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            智谱 AI API Key 配置
          </div>
        }
        open={showApiKeyModal}
        onCancel={() => setShowApiKeyModal(false)}
        footer={null}
        centered
        width={420}
      >
        <div className="py-4">
          <p className="text-gray-500 mb-5">
            AI 增强功能需要配置 API Key。我们不会保存您的 API Key，仅在本地浏览器中使用。
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
              <Input.Password
                placeholder="输入智谱 GLM API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="h-11"
                size="large"
              />
            </div>
            <Button
              type="primary"
              onClick={handleSaveApiKey}
              disabled={!apiKey}
              block
              className="h-11 text-base cursor-pointer primary-btn"
            >
              保存配置
            </Button>
            <p className="text-xs text-gray-400 text-center">
              获取 API Key：
              {API_KEY_LINKS.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 ml-1"
                >
                  {link.label}
                </a>
              ))}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
