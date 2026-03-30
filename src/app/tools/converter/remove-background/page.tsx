'use client';

import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  PhotoIcon,
  PlusIcon,
  ScissorsIcon,
  SparklesIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Button, Checkbox, Modal, message, Popconfirm, Radio, Slider, Spin } from 'antd';
import { saveAs } from 'file-saver';
import { useCallback, useEffect, useRef, useState } from 'react';
import { API_BASE_URL } from '@/config/api';

interface StoredImage {
  id: string;
  name: string;
  originalData: string; // base64
  resultData: string | null; // base64
  originalSize: number;
  status: 'idle' | 'processing' | 'done' | 'error';
  error?: string;
  timestamp: number;
}

interface ProcessedImage {
  id: string;
  file: File;
  originalUrl: string;
  resultUrl: string | null;
  status: 'idle' | 'processing' | 'done' | 'error';
  error?: string;
  timestamp: number;
}

type BrushMode = 'erase' | 'restore';
type BackgroundMode = 'transparent' | 'solid' | 'blur' | 'image';

type ToolTab = 'matting' | 'background' | 'effects';

interface ToolParams {
  matting: {
    mode: 'auto' | 'person' | 'product';
    alphaMatting: boolean;
    foregroundThreshold: number;
    backgroundThreshold: number;
  };
  background: {
    type: BackgroundMode;
    color: string;
    blur: number;
  };
  effects: {
    brightness: number;
    contrast: number;
    saturation: number;
    blur: number;
  };
}

const defaultParams: ToolParams = {
  matting: {
    mode: 'auto',
    alphaMatting: true,
    foregroundThreshold: 240,
    backgroundThreshold: 10,
  },
  background: {
    type: 'transparent',
    color: '#ffffff',
    blur: 0,
  },
  effects: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
  },
};

const colorOptions = [
  { value: '#ffffff', label: '白色' },
  { value: '#000000', label: '黑色' },
  { value: '#ff0000', label: '红色' },
  { value: '#00ff00', label: '绿色' },
  { value: '#0000ff', label: '蓝色' },
  { value: '#ffff00', label: '黄色' },
  { value: '#ff00ff', label: '紫色' },
  { value: '#00ffff', label: '青色' },
];

// IndexedDB Storage Functions
const DB_NAME = 'remove-bg-images';
const STORE_NAME = 'images';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

async function getAllImages(): Promise<StoredImage[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  } catch (error) {
    console.error('Failed to get images:', error);
    return [];
  }
}

async function saveImage(image: StoredImage): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(image);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch (error) {
    console.error('Failed to save image:', error);
  }
}

async function deleteImage(id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  } catch (error) {
    console.error('Failed to delete image:', error);
  }
}

// Helper to convert File to Base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Helper to convert Base64 to Blob
function base64ToBlob(base64: string): Promise<Blob> {
  return fetch(base64).then((response) => response.blob());
}

export default function RemoveBackgroundPage() {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [currentParams, setCurrentParams] = useState<ToolParams>(defaultParams);
  const [activeTool, setActiveTool] = useState<ToolTab>('matting');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Brush state
  const [brushMode, setBrushMode] = useState<BrushMode>('erase');
  const [brushSize, setBrushSize] = useState(30);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  // Canvas refs
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bgFileInputRef = useRef<HTMLInputElement>(null);

  const selectedImage = images.find((img) => img.id === selectedImageId);
  const isProcessed = selectedImage?.status === 'done';

  // Load images from IndexedDB on mount
  useEffect(() => {
    const loadImages = async () => {
      try {
        const storedImages = await getAllImages();
        const loadedImages: ProcessedImage[] = [];

        for (const stored of storedImages) {
          // Convert base64 to blob and create URL
          const originalBlob = await base64ToBlob(stored.originalData);
          const originalFile = new File([originalBlob], stored.name, { type: originalBlob.type });
          const originalUrl = URL.createObjectURL(originalFile);

          let resultUrl: string | null = null;
          if (stored.resultData) {
            const resultBlob = await base64ToBlob(stored.resultData);
            resultUrl = URL.createObjectURL(resultBlob);
          }

          loadedImages.push({
            id: stored.id,
            file: originalFile,
            originalUrl,
            resultUrl,
            status: stored.status,
            error: stored.error,
            timestamp: stored.timestamp,
          });
        }

        // Sort by timestamp descending
        loadedImages.sort((a, b) => b.timestamp - a.timestamp);
        setImages(loadedImages);

        // Select first image if available
        if (loadedImages.length > 0) {
          setSelectedImageId(loadedImages[0].id);
        }
      } catch (error) {
        console.error('Failed to load images:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadImages();
  }, []);

  // Load API key from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('remove_bg_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  // Save image to IndexedDB whenever it changes
  const saveToStorage = useCallback(async (image: ProcessedImage) => {
    const originalData = await fileToBase64(image.file);
    let resultData: string | null = null;

    if (image.resultUrl && image.status === 'done') {
      // Fetch the blob from the URL and convert to base64
      const response = await fetch(image.resultUrl);
      const blob = await response.blob();
      resultData = await fileToBase64(new File([blob], image.file.name));
    }

    const storedImage: StoredImage = {
      id: image.id,
      name: image.file.name,
      originalData,
      resultData,
      originalSize: image.file.size,
      status: image.status,
      error: image.error,
      timestamp: image.timestamp,
    };

    await saveImage(storedImage);
  }, []);

  // Handle file selection
  const handleFileSelect = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];

      for (const file of files) {
        if (!validTypes.includes(file.type)) {
          message.warning(`${file.name}: 仅支持 JPEG、PNG、WebP 格式`);
          continue;
        }

        if (file.size > 12 * 1024 * 1024) {
          message.warning(`${file.name}: 图片大小不能超过 12MB`);
          continue;
        }

        const url = URL.createObjectURL(file);
        const newImage: ProcessedImage = {
          id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          file,
          originalUrl: url,
          resultUrl: null,
          status: 'idle',
          timestamp: Date.now(),
        };

        setImages((prev) => {
          const updated = [newImage, ...prev];
          // Save to IndexedDB
          saveToStorage(newImage);
          return updated;
        });

        if (!selectedImageId) {
          setSelectedImageId(newImage.id);
        }
      }
    },
    [selectedImageId, saveToStorage]
  );

  // Handle drag and drop
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

  // Handle paste
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            const dt = new DataTransfer();
            dt.items.add(file);
            handleFileSelect(dt.files);
            break;
          }
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [handleFileSelect]);

  // Process image with remove.bg API
  const handleProcess = useCallback(async () => {
    if (!selectedImage) {
      message.warning('请先选择图片');
      return;
    }

    if (!apiKey) {
      setShowApiKeyModal(true);
      return;
    }

    setLoading(true);
    setImages((prev) =>
      prev.map((img) => (img.id === selectedImageId ? { ...img, status: 'processing' } : img))
    );

    try {
      const formData = new FormData();
      formData.append('image_file', selectedImage.file);
      formData.append('api_key', apiKey);

      const response = await fetch(`${API_BASE_URL}/api/ai?action=remove-background`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '处理失败');
      }

      const resultUrl = data.image;

      setImages((prev) =>
        prev.map((img) =>
          img.id === selectedImageId ? { ...img, resultUrl, status: 'done' as const } : img
        )
      );

      // Save to IndexedDB after processing
      const updatedImage = images.find((img) => img.id === selectedImageId);
      if (updatedImage) {
        await saveToStorage({ ...updatedImage, resultUrl, status: 'done' });
      }

      message.success('抠图成功！');
    } catch (error) {
      setImages((prev) =>
        prev.map((img) =>
          img.id === selectedImageId
            ? {
                ...img,
                status: 'error' as const,
                error: error instanceof Error ? error.message : '处理失败',
              }
            : img
        )
      );
      message.error(error instanceof Error ? error.message : '处理失败，请重试');
    } finally {
      setLoading(false);
    }
  }, [selectedImage, selectedImageId, apiKey, images, saveToStorage]);

  // Save API key
  const handleSaveApiKey = useCallback(() => {
    if (!apiKey.trim()) {
      message.warning('请输入 API Key');
      return;
    }
    localStorage.setItem('remove_bg_api_key', apiKey);
    setShowApiKeyModal(false);
    message.success('API Key 已保存');
    handleProcess();
  }, [apiKey, handleProcess]);

  // Download result
  const handleDownload = useCallback(() => {
    if (!resultCanvasRef.current) return;

    resultCanvasRef.current.toBlob((blob) => {
      if (blob) {
        saveAs(blob, 'removed-bg.png');
        message.success('下载成功');
      }
    }, 'image/png');
  }, []);

  // Delete image
  const handleDeleteImage = useCallback(
    async (id: string) => {
      // Delete from IndexedDB
      await deleteImage(id);

      // Clean up URLs
      setImages((prev) => {
        const img = prev.find((i) => i.id === id);
        if (img) {
          URL.revokeObjectURL(img.originalUrl);
          if (img.resultUrl) {
            URL.revokeObjectURL(img.resultUrl);
          }
        }
        return prev.filter((i) => i.id !== id);
      });

      if (selectedImageId === id) {
        setSelectedImageId(null);
      }
    },
    [selectedImageId]
  );

  // Select image
  const handleSelectImage = useCallback((id: string) => {
    setSelectedImageId(id);
    setCurrentParams(defaultParams);
    setBrushMode('erase');
    setBrushSize(30);
  }, []);

  // Handle background image upload
  const handleBgImageSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    setCurrentParams((prev) => ({
      ...prev,
      background: { ...prev.background, type: 'image', color: url },
    }));
  }, []);

  // Update param
  const updateParam = useCallback((category: keyof ToolParams, key: string, value: unknown) => {
    setCurrentParams((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  }, []);

  // Canvas drawing for brush tool
  const handleCanvasMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isProcessed) return;
      setIsDrawing(true);

      const canvas = resultCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const radius = brushSize;
      const centerX = Math.floor(x * (canvas.width / rect.width));
      const centerY = Math.floor(y * (canvas.height / rect.height));
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let py = centerY - radius; py < centerY + radius; py++) {
        for (let px = centerX - radius; px < centerX + radius; px++) {
          if (px < 0 || px >= canvas.width || py < 0 || py >= canvas.height) continue;
          const distance = Math.sqrt((px - centerX) ** 2 + (py - centerY) ** 2);
          if (distance > radius) continue;
          const idx = (py * canvas.width + px) * 4;
          if (brushMode === 'erase') {
            data[idx + 3] = 0;
          } else if (originalCanvasRef.current) {
            const origCtx = originalCanvasRef.current.getContext('2d');
            if (origCtx) {
              const origData = origCtx.getImageData(px, py, 1, 1).data;
              data[idx] = origData[0];
              data[idx + 1] = origData[1];
              data[idx + 2] = origData[2];
              data[idx + 3] = origData[3];
            }
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
    },
    [isProcessed, brushMode, brushSize]
  );

  const handleCanvasMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing || !isProcessed) return;

      const canvas = resultCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const radius = brushSize;
      const centerX = Math.floor(x * (canvas.width / rect.width));
      const centerY = Math.floor(y * (canvas.height / rect.height));
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let py = centerY - radius; py < centerY + radius; py++) {
        for (let px = centerX - radius; px < centerX + radius; px++) {
          if (px < 0 || px >= canvas.width || py < 0 || py >= canvas.height) continue;
          const distance = Math.sqrt((px - centerX) ** 2 + (py - centerY) ** 2);
          if (distance > radius) continue;
          const idx = (py * canvas.width + px) * 4;
          if (brushMode === 'erase') {
            data[idx + 3] = 0;
          } else if (originalCanvasRef.current) {
            const origCtx = originalCanvasRef.current.getContext('2d');
            if (origCtx) {
              const origData = origCtx.getImageData(px, py, 1, 1).data;
              data[idx] = origData[0];
              data[idx + 1] = origData[1];
              data[idx + 2] = origData[2];
              data[idx + 3] = origData[3];
            }
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);
    },
    [isDrawing, isProcessed, brushMode, brushSize]
  );

  const handleCanvasMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  // Draw image to canvas when result is ready
  useEffect(() => {
    if (!selectedImage?.resultUrl || !resultCanvasRef.current || !originalCanvasRef.current) return;

    const resultCanvas = resultCanvasRef.current;
    const origCanvas = originalCanvasRef.current;
    const resultCtx = resultCanvas.getContext('2d');
    const origCtx = origCanvas.getContext('2d');

    if (!resultCtx || !origCtx) return;

    const img = new Image();
    img.onload = () => {
      const maxWidth = 800;
      const maxHeight = 500;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }

      resultCanvas.width = width;
      resultCanvas.height = height;
      origCanvas.width = width;
      origCanvas.height = height;

      origCtx.drawImage(img, 0, 0, width, height);
      resultCtx.drawImage(img, 0, 0, width, height);
    };
    img.src = selectedImage.resultUrl;
  }, [selectedImage?.resultUrl]);

  // Get background style for preview
  const getBackgroundStyle = () => {
    if (!isProcessed) return { backgroundColor: '#f3f4f6' };

    if (currentParams.background.type === 'solid') {
      return { backgroundColor: currentParams.background.color };
    }

    if (currentParams.background.type === 'image' && currentParams.background.color) {
      return {
        backgroundImage: `url(${currentParams.background.color})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }

    if (currentParams.background.type === 'blur') {
      return {
        backdropFilter: `blur(${currentParams.background.blur}px)`,
        backgroundColor: '#f3f4f6',
      };
    }

    // Transparent - checkerboard
    return {
      backgroundImage:
        'linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)',
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
    };
  };

  // Render Matting Panel
  const renderMattingPanel = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">抠图模式</label>
        <Radio.Group
          value={currentParams.matting.mode}
          onChange={(e) => updateParam('matting', 'mode', e.target.value)}
          className="w-full"
        >
          <div className="space-y-2">
            <Radio value="auto" className="w-full">
              <span className="ml-2 text-gray-700">自动识别</span>
            </Radio>
            <Radio value="person" className="w-full">
              <span className="ml-2 text-gray-700">人物主体</span>
            </Radio>
            <Radio value="product" className="w-full">
              <span className="ml-2 text-gray-700">商品主体</span>
            </Radio>
          </div>
        </Radio.Group>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-700">Alpha 抠图</label>
        <Checkbox
          checked={currentParams.matting.alphaMatting}
          onChange={(e) => updateParam('matting', 'alphaMatting', e.target.checked)}
        />
      </div>

      {currentParams.matting.alphaMatting && (
        <>
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              前景阈值: {currentParams.matting.foregroundThreshold}
            </label>
            <Slider
              value={currentParams.matting.foregroundThreshold}
              onChange={(v) => updateParam('matting', 'foregroundThreshold', v)}
              min={0}
              max={255}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              背景阈值: {currentParams.matting.backgroundThreshold}
            </label>
            <Slider
              value={currentParams.matting.backgroundThreshold}
              onChange={(v) => updateParam('matting', 'backgroundThreshold', v)}
              min={0}
              max={255}
            />
          </div>
        </>
      )}

      {isProcessed && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">魔力笔刷</h4>
          <Radio.Group
            value={brushMode}
            onChange={(e) => setBrushMode(e.target.value)}
            className="w-full"
          >
            <div className="space-y-2">
              <Radio value="erase" className="w-full">
                <span className="ml-2 text-gray-700">擦除</span>
              </Radio>
              <Radio value="restore" className="w-full">
                <span className="ml-2 text-gray-700">恢复</span>
              </Radio>
            </div>
          </Radio.Group>
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">笔刷大小</span>
              <span className="text-sm text-gray-900 font-medium">{brushSize}px</span>
            </div>
            <Slider value={brushSize} onChange={setBrushSize} min={10} max={100} />
          </div>
        </div>
      )}
    </div>
  );

  // Render Background Panel
  const renderBackgroundPanel = () => (
    <div className="space-y-4">
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-2类型
        "
        >
          背景
        </label>
        <Radio.Group
          value={currentParams.background.type}
          onChange={(e) => updateParam('background', 'type', e.target.value)}
          className="w-full"
        >
          <div className="space-y-2">
            <Radio value="transparent" className="w-full">
              <span className="ml-2 text-gray-700">透明背景</span>
            </Radio>
            <Radio value="solid" className="w-full">
              <span className="ml-2 text-gray-700">纯色背景</span>
            </Radio>
            <Radio value="blur" className="w-full">
              <span className="ml-2 text-gray-700">模糊背景</span>
            </Radio>
            <Radio value="image" className="w-full">
              <span className="ml-2 text-gray-700">背景图</span>
            </Radio>
          </div>
        </Radio.Group>
      </div>

      {currentParams.background.type === 'solid' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">背景颜色</label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => (
              <button
                type="button"
                key={color.value}
                onClick={() => updateParam('background', 'color', color.value)}
                className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                  currentParams.background.color === color.value
                    ? 'border-teal-500 scale-110'
                    : 'border-gray-200'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.label}
              />
            ))}
          </div>
        </div>
      )}

      {currentParams.background.type === 'blur' && (
        <div>
          <label className="block text-sm text-gray-700 mb-2">
            模糊程度: {currentParams.background.blur}px
          </label>
          <Slider
            value={currentParams.background.blur}
            onChange={(v) => updateParam('background', 'blur', v)}
            min={0}
            max={20}
          />
        </div>
      )}

      {currentParams.background.type === 'image' && (
        <div className="space-y-2">
          <input
            ref={bgFileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleBgImageSelect(e.target.files)}
          />
          <button
            type="button"
            onClick={() => bgFileInputRef.current?.click()}
            className="w-full px-4 py-2 text-center border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            上传背景图
          </button>
          {currentParams.background.color?.startsWith('blob:') && (
            <button
              type="button"
              onClick={() => updateParam('background', 'color', '')}
              className="w-full px-4 py-2 text-center border border-red-200 rounded-lg text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
            >
              清除背景图
            </button>
          )}
        </div>
      )}
    </div>
  );

  // Render Effects Panel
  const renderEffectsPanel = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-700 mb-2">
          亮度: {currentParams.effects.brightness}%
        </label>
        <Slider
          value={currentParams.effects.brightness}
          onChange={(v) => updateParam('effects', 'brightness', v)}
          min={0}
          max={200}
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">
          对比度: {currentParams.effects.contrast}%
        </label>
        <Slider
          value={currentParams.effects.contrast}
          onChange={(v) => updateParam('effects', 'contrast', v)}
          min={0}
          max={200}
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">
          饱和度: {currentParams.effects.saturation}%
        </label>
        <Slider
          value={currentParams.effects.saturation}
          onChange={(v) => updateParam('effects', 'saturation', v)}
          min={0}
          max={200}
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-2">
          模糊: {currentParams.effects.blur}px
        </label>
        <Slider
          value={currentParams.effects.blur}
          onChange={(v) => updateParam('effects', 'blur', v)}
          min={0}
          max={20}
        />
      </div>
    </div>
  );

  if (!isLoaded) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-gray-50">
      {/* Hidden canvases */}
      <canvas ref={originalCanvasRef} className="hidden" />

      {/* Header */}
      <header className="h-14 bg-white border-b border-gray-200 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
            <ScissorsIcon className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-gray-900">在线抠图</span>
          {selectedImage && (
            <span className="text-sm text-gray-500 truncate max-w-xs">
              {selectedImage.file.name}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowApiKeyModal(true)}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            {apiKey ? 'API Key 已设置' : '设置 API Key'}
          </button>

          {selectedImage && (
            <>
              <Button
                icon={<ArrowPathIcon className="w-4 h-4" />}
                onClick={() => setCurrentParams(defaultParams)}
              >
                重置
              </Button>
              <Button
                type="primary"
                icon={<SparklesIcon className="w-4 h-4" />}
                onClick={handleProcess}
                loading={loading}
                disabled={!selectedImage || selectedImage.status === 'processing'}
              >
                处理
              </Button>
              <Button
                type="primary"
                icon={<ArrowDownTrayIcon className="w-4 h-4" />}
                onClick={handleDownload}
                disabled={!isProcessed}
              >
                下载
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Preview Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Preview */}
          <div className="flex-1 p-4 overflow-auto">
            {!selectedImage ? (
              /* Upload Area */
              <div
                className="h-full border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 transition-all"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files)}
                />

                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-50 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PhotoIcon className="w-10 h-10 text-teal-500" />
                  </div>
                  <p className="text-lg text-gray-900 font-medium mb-2">
                    拖拽图片到此处，或点击选择
                  </p>
                  <p className="text-gray-500">支持 JPEG、PNG、WebP，最大 12MB，也可 Ctrl+V 粘贴</p>
                  {images.length > 0 && (
                    <p className="text-teal-600 text-sm mt-2">
                      已保存 {images.length} 张图片，点击选择
                    </p>
                  )}
                </div>
              </div>
            ) : (
              /* Result Preview */
              <div
                className="h-full rounded-xl overflow-hidden shadow-lg"
                style={getBackgroundStyle() as React.CSSProperties}
              >
                <div className="min-h-[400px] flex items-center justify-center p-4">
                  <div className="relative max-w-full max-h-full">
                    {isProcessed ? (
                      <canvas
                        ref={resultCanvasRef}
                        className="max-w-full max-h-[500px] object-contain cursor-crosshair"
                        onMouseDown={handleCanvasMouseDown}
                        onMouseMove={handleCanvasMouseMove}
                        onMouseUp={handleCanvasMouseUp}
                        onMouseLeave={handleCanvasMouseUp}
                      />
                    ) : (
                      <img
                        src={selectedImage.originalUrl}
                        alt="Preview"
                        className="max-w-full max-h-[500px] object-contain rounded-lg"
                      />
                    )}

                    {selectedImage.status === 'processing' && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                        <div className="text-center">
                          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                          <p className="text-white font-medium">AI 正在抠图中...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* View toggle */}
                {isProcessed && (
                  <div className="absolute top-6 left-6 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowOriginal(!showOriginal)}
                      className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium text-gray-700 hover:bg-white transition-colors shadow-lg cursor-pointer"
                    >
                      {showOriginal ? '查看结果' : '查看原图'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Image List */}
          <div className="h-20 bg-white border-t border-gray-200 px-4 flex items-center gap-3 shrink-0 overflow-x-auto">
            {/* Add Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0 w-14 h-14 rounded-lg border-2 border-dashed border-gray-300 hover:border-teal-500 hover:bg-teal-50 flex items-center justify-center transition-colors cursor-pointer"
            >
              <PlusIcon className="w-5 h-5 text-gray-400 hover:text-teal-500" />
            </button>

            {/* Image List */}
            {images.map((img) => (
              <div
                key={img.id}
                onClick={() => handleSelectImage(img.id)}
                className={`relative shrink-0 w-14 h-14 rounded-lg overflow-hidden cursor-pointer transition-all ${
                  selectedImageId === img.id
                    ? 'ring-2 ring-teal-500 ring-offset-2'
                    : 'hover:ring-2 hover:ring-gray-300'
                }`}
              >
                <img
                  src={img.resultUrl || img.originalUrl}
                  alt={img.file.name}
                  className="w-full h-full object-cover"
                />
                {img.status === 'processing' && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Spin size="small" />
                  </div>
                )}
                {img.status === 'done' && (
                  <div className="absolute bottom-0 left-0 right-0 bg-teal-500 text-white text-xs text-center py-0.5">
                    已处理
                  </div>
                )}
                <Popconfirm
                  title="删除这张图片？"
                  onConfirm={(e) => {
                    e?.stopPropagation();
                    handleDeleteImage(img.id);
                  }}
                  okText="删除"
                  cancelText="取消"
                >
                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </Popconfirm>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Tool Panel */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col shrink-0">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">工具参数</h2>
          </div>
          <div className="flex-1 overflow-auto p-4">
            {/* Tool Tabs */}
            <div className="flex border-b border-gray-200 mb-4">
              <button
                type="button"
                onClick={() => setActiveTool('matting')}
                className={`flex-1 pb-2 text-sm font-medium transition-colors cursor-pointer ${
                  activeTool === 'matting'
                    ? 'text-teal-600 border-b-2 border-teal-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <ScissorsIcon className="w-4 h-4" />
                  抠图
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTool('background')}
                className={`flex-1 pb-2 text-sm font-medium transition-colors cursor-pointer ${
                  activeTool === 'background'
                    ? 'text-teal-600 border-b-2 border-teal-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <PhotoIcon className="w-4 h-4" />
                  背景
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTool('effects')}
                className={`flex-1 pb-2 text-sm font-medium transition-colors cursor-pointer ${
                  activeTool === 'effects'
                    ? 'text-teal-600 border-b-2 border-teal-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <SparklesIcon className="w-4 h-4" />
                  效果
                </span>
              </button>
            </div>

            {/* Tab Content */}
            {activeTool === 'matting' && renderMattingPanel()}
            {activeTool === 'background' && renderBackgroundPanel()}
            {activeTool === 'effects' && renderEffectsPanel()}
          </div>
        </div>
      </div>

      {/* API Key Modal */}
      <Modal
        title="设置 API Key"
        open={showApiKeyModal}
        onCancel={() => setShowApiKeyModal(false)}
        footer={null}
        centered
        width={400}
      >
        <p className="text-gray-600 mb-6">使用 remove.bg API 进行抠图。每月有 50 次免费额度。</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
            <input
              type="password"
              placeholder="输入 remove.bg API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <button
            type="button"
            onClick={handleSaveApiKey}
            disabled={!apiKey}
            className={`w-full py-3 px-6 rounded-xl font-medium transition-all cursor-pointer ${
              apiKey
                ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            保存并继续
          </button>
          <p className="text-xs text-gray-400 text-center">
            获取 API Key：
            <a
              href="https://www.remove.bg/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 hover:underline ml-1"
            >
              remove.bg 仪表盘 →
            </a>
          </p>
        </div>
      </Modal>
    </div>
  );
}
