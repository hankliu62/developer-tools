# Image to PDF Converter Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a web-based tool that converts images (single or multiple) to PDF documents with customizable page settings.

**Architecture:** Client-side conversion using pdf-lib library. No server-side processing required - all operations happen in the browser.

**Tech Stack:** 
- Next.js (App Router)
- React 19
- Tailwind CSS
- Ant Design
- pdf-lib for PDF generation
- file-saver for download

---

## Design System

Based on UI/UX Pro Max analysis:

- **Pattern:** Minimal Single Column - Focus on conversion, large typography, lots of whitespace
- **Style:** Flat Design - 2D, minimalist, bold colors, no shadows, clean lines
- **Colors:**
  - Primary: #0D9488 (Teal)
  - Secondary: #14B8A6
  - CTA: #F97316 (Orange)
  - Background: #F0FDFA
  - Text: #134E4A
- **Typography:** Outfit / Work Sans (geometric, modern, clean)
- **Effects:** No gradients/shadows, simple hover (color/opacity shift), fast loading

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Add pdf-lib dependency**

```bash
cd /Users/liuxiaocong/Workspace/github/personal/developer-tools && npm install pdf-lib
```

**Step 2: Verify installation**

Run: `npm list pdf-lib`
Expected: pdf-lib version listed

---

## Task 2: Add Navigation Entry

**Files:**
- Modify: `src/constants/navigation.ts`

**Step 1: Add tool to converter category**

Add this entry under the `converter` category children array (around line 305):

```typescript
{
  name: '图片转 PDF',
  description: '将图片转换为 PDF 文档，支持批量处理和自定义页面设置',
  href: '/tools/converter/image-to-pdf',
  icon: 'i-carbon-document',
  status: 'new',
},
```

---

## Task 3: Create PDF Conversion Utility

**Files:**
- Create: `src/tools/converter/image-to-pdf.ts`

**Step 1: Create the utility function**

```typescript
import { PDFDocument, rgb } from 'pdf-lib';

// Page size presets (in points, 1 point = 1/72 inch)
export const PAGE_SIZES = {
  A4: { width: 595, height: 842 },
  Letter: { width: 612, height: 792 },
  A5: { width: 420, height: 595 },
  Legal: { width: 612, height: 1008 },
  Custom: null, // User defined
} as const;

export type PageSizeName = keyof typeof PAGE_SIZES;

export interface ImageToPdfOptions {
  pageSize: PageSizeName | { width: number; height: number };
  pageOrientation: 'portrait' | 'landscape';
  imageFit: 'fit' | 'fill' | 'original';
  margin: number; // in points
  filename: string;
}

export interface ImageFile {
  file: File;
  dataUrl: string;
  width: number;
  height: number;
}

const DEFAULT_OPTIONS: ImageToPdfOptions = {
  pageSize: 'A4',
  pageOrientation: 'portrait',
  imageFit: 'fit',
  margin: 36, // 0.5 inch margin
  filename: 'image-to-pdf.pdf',
};

/**
 * Get image dimensions from data URL
 */
export async function getImageDimensions(dataUrl: string): Promise<{ width: number; height: number }> {
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
 * Read file as data URL
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
 * Detect if image is landscape based on dimensions
 */
export function isLandscape(width: number, height: number): boolean {
  return width > height;
}

/**
 * Get MIME type from filename
 */
export function getMimeType(filename: string): string {
  const ext = filename.toLowerCase().split('.').pop();
  const mimeTypes: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    bmp: 'image/bmp',
    tiff: 'image/tiff',
    tif: 'image/tiff',
  };
  return mimeTypes[ext || ''] || 'image/jpeg';
}

/**
 * Embed image into PDF based on fit mode
 */
function embedImage(
  pdfDoc: PDFDocument,
  imageData: string,
  mimeType: string
): ReturnType<typeof pdfDoc.embedJpg> {
  if (mimeType === 'image/png' || mimeType === 'image/png') {
    return pdfDoc.embedPng(imageData);
  }
  return pdfDoc.embedJpg(imageData);
}

/**
 * Calculate image dimensions to fit within page
 */
function calculateImageDimensions(
  imageWidth: number,
  imageHeight: number,
  pageWidth: number,
  pageHeight: number,
  margin: number,
  fitMode: 'fit' | 'fill' | 'original',
  orientation: 'portrait' | 'landscape'
): { width: number; height: number; x: number; y: number } {
  const availableWidth = pageWidth - 2 * margin;
  const availableHeight = pageHeight - 2 * margin;

  if (fitMode === 'original') {
    return {
      width: imageWidth,
      height: imageHeight,
      x: (pageWidth - imageWidth) / 2,
      y: (pageHeight - imageHeight) / 2,
    };
  }

  if (fitMode === 'fill') {
    return {
      width: availableWidth,
      height: availableHeight,
      x: margin,
      y: margin,
    };
  }

  // fit mode - maintain aspect ratio
  const scale = Math.min(availableWidth / imageWidth, availableHeight / imageHeight);
  const width = imageWidth * scale;
  const height = imageHeight * scale;

  return {
    width,
    height,
    x: (pageWidth - width) / 2,
    y: (pageHeight - height) / 2,
  };
}

/**
 * Main conversion function
 */
export async function convertImagesToPdf(
  images: ImageFile[],
  options: Partial<ImageToPdfOptions> = {}
): Promise<Uint8Array> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // Create PDF document
  const pdfDoc = await PDFDocument.create();

  // Get page dimensions
  let pageWidth: number;
  let pageHeight: number;

  if (typeof opts.pageSize === 'object') {
    pageWidth = opts.pageSize.width;
    pageHeight = opts.pageSize.height;
  } else if (opts.pageSize === 'Custom') {
    pageWidth = 595;
    pageHeight = 842;
  } else {
    const size = PAGE_SIZES[opts.pageSize];
    pageWidth = size.width;
    pageHeight = size.height;
  }

  // Handle orientation
  if (opts.pageOrientation === 'landscape') {
    [pageWidth, pageHeight] = [pageHeight, pageWidth];
  }

  // Process each image
  for (const image of images) {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    const mimeType = getMimeType(image.file.name);
    const imageEmbedder = await embedImage(pdfDoc, image.dataUrl, mimeType);
    const embeddedImage = await imageEmbedder;

    const dims = calculateImageDimensions(
      image.width,
      image.height,
      pageWidth,
      pageHeight,
      opts.margin,
      opts.imageFit,
      opts.pageOrientation
    );

    page.drawImage(embeddedImage, {
      x: dims.x,
      y: dims.y,
      width: dims.width,
      height: dims.height,
    });
  }

  return pdfDoc.save();
}
```

**Step 2: Verify file creation**

Run: `ls -la src/tools/converter/image-to-pdf.ts`
Expected: File exists

---

## Task 4: Create Image to PDF Page Component

**Files:**
- Create: `src/app/tools/converter/image-to-pdf/page.tsx`

**Step 1: Create the page component**

```tsx
'use client';

import { useCallback, useState } from 'react';
import { Button, Card, Input, Select, Slider, Upload, message } from 'antd';
import { DownloadOutlined, DeleteOutlined, FileImageOutlined, SwapOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import {
  convertImagesToPdf,
  getImageDimensions,
  isLandscape,
  readFileAsDataUrl,
  ImageFile,
  PAGE_SIZES,
  PageSizeName,
} from '@/tools/converter/image-to-pdf';

const { Dragger } = Upload;

const PAGE_SIZE_OPTIONS = [
  { label: 'A4 (210×297mm)', value: 'A4' },
  { label: 'Letter (8.5×11")', value: 'Letter' },
  { label: 'A5 (148×210mm)', value: 'A5' },
  { label: 'Legal (8.5×14")', value: 'Legal' },
  { label: '自定义', value: 'Custom' },
];

const IMAGE_FIT_OPTIONS = [
  { label: '适应页面', value: 'fit' },
  { label: '填充页面', value: 'fill' },
  { label: '保持原尺寸', value: 'original' },
];

const ORIENTATION_OPTIONS = [
  { label: '竖向', value: 'portrait' },
  { label: '横向', value: 'landscape' },
];

export default function ImageToPdfPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState<PageSizeName>('A4');
  const [customWidth, setCustomWidth] = useState(595);
  const [customHeight, setCustomHeight] = useState(842);
  const [pageOrientation, setPageOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [imageFit, setImageFit] = useState<'fit' | 'fill' | 'original'>('fit');
  const [margin, setMargin] = useState(36);
  const [filename, setFilename] = useState('image-to-pdf.pdf');

  // Auto-detect orientation from first image
  const detectOrientation = useCallback((imgs: ImageFile[]) => {
    if (imgs.length > 0) {
      const first = imgs[0];
      return isLandscape(first.width, first.height) ? 'landscape' : 'portrait';
    }
    return 'portrait';
  }, []);

  const handleFileUpload = useCallback(async (file: File) => {
    try {
      const dataUrl = await readFileAsDataUrl(file);
      const dimensions = await getImageDimensions(dataUrl);

      const imageFile: ImageFile = {
        file,
        dataUrl,
        width: dimensions.width,
        height: dimensions.height,
      };

      setImages((prev) => {
        const newImages = [...prev, imageFile];
        // Auto-detect orientation from first image only if it's the first upload
        if (prev.length === 0) {
          const detectedOrientation = detectOrientation(newImages);
          setPageOrientation(detectedOrientation);
        }
        return newImages;
      });

      message.success(`${file.name} 上传成功`);
    } catch {
      message.error(`${file.name} 上传失败`);
    }

    // Prevent default upload behavior
    return false;
  }, [detectOrientation]);

  const handleRemoveImage = useCallback((index: number) => {
    setImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      // Re-detect orientation if first image changed
      if (index === 0 && newImages.length > 0) {
        const detectedOrientation = detectOrientation(newImages);
        setPageOrientation(detectedOrientation);
      }
      return newImages;
    });
  }, [detectOrientation]);

  const handleClearAll = useCallback(() => {
    setImages([]);
    setPageOrientation('portrait');
  }, []);

  const handleConvert = useCallback(async () => {
    if (images.length === 0) {
      message.warning('请先上传图片');
      return;
    }

    try {
      setLoading(true);

      const pageSizeConfig = pageSize === 'Custom'
        ? { width: customWidth, height: customHeight }
        : pageSize;

      const pdfBytes = await convertImagesToPdf(images, {
        pageSize: pageSizeConfig,
        pageOrientation,
        imageFit,
        margin,
        filename,
      });

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, filename);

      message.success('PDF 生成成功！');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'PDF 生成失败');
    } finally {
      setLoading(false);
    }
  }, [images, pageSize, customWidth, customHeight, pageOrientation, imageFit, margin, filename]);

  const uploadProps = {
    multiple: true,
    accept: 'image/*',
    showUploadList: false,
    beforeUpload: handleFileUpload,
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-teal-100 rounded-lg mr-2">
            <FileImageOutlined className="text-teal-600" />
          </span>
          图片转 PDF
        </h1>
        <p className="text-gray-600">
          将图片转换为 PDF 文档，支持批量处理和自定义页面设置
        </p>
      </div>

      {/* Upload Area */}
      <Card className="mb-6">
        <Dragger {...uploadProps} className="mb-4">
          <p className="ant-upload-drag-icon">
            <FileImageOutlined className="text-4xl text-teal-500" />
          </p>
          <p className="ant-upload-text">点击或拖拽图片到此处上传</p>
          <p className="ant-upload-hint">支持 JPG、PNG、WebP、GIF、BMP 等常见图片格式，可批量上传多张图片</p>
        </Dragger>

        {/* Image Preview List */}
        {images.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-700">
                已上传 {images.length} 张图片
              </span>
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={handleClearAll}
              >
                清空全部
              </Button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-48 overflow-y-auto">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative group aspect-square bg-gray-100 rounded overflow-hidden"
                >
                  <img
                    src={img.dataUrl}
                    alt={img.file.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      type="text"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(index);
                      }}
                    />
                  </div>
                  {index === 0 && (
                    <span className="absolute top-1 left-1 bg-teal-500 text-white text-xs px-1 rounded">
                      封面
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Settings */}
      <Card className="mb-6">
        <h3 className="font-medium text-gray-700 mb-4">页面设置</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Page Size */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">页面尺寸</label>
            <Select
              value={pageSize}
              onChange={(value) => {
                setPageSize(value);
                if (value !== 'Custom') {
                  const size = PAGE_SIZES[value];
                  setCustomWidth(size.width);
                  setCustomHeight(size.height);
                }
              }}
              options={PAGE_SIZE_OPTIONS}
              className="w-full"
            />
          </div>

          {/* Custom Size */}
          {pageSize === 'Custom' && (
            <div className="flex gap-2">
              <div>
                <label className="block text-sm text-gray-600 mb-1">宽度 (pt)</label>
                <Input
                  type="number"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(Number(e.target.value))}
                  min={100}
                  max={2000}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">高度 (pt)</label>
                <Input
                  type="number"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(Number(e.target.value))}
                  min={100}
                  max={2000}
                />
              </div>
            </div>
          )}

          {/* Orientation */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">页面方向</label>
            <Select
              value={pageOrientation}
              onChange={setPageOrientation}
              options={ORIENTATION_OPTIONS}
              className="w-full"
              suffixIcon={<SwapOutlined />}
            />
          </div>

          {/* Image Fit */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">图片适应方式</label>
            <Select
              value={imageFit}
              onChange={setImageFit}
              options={IMAGE_FIT_OPTIONS}
              className="w-full"
            />
          </div>

          {/* Margin */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">
              页边距: {margin} pt ({Math.round(margin / 72 * 254)} mm)
            </label>
            <Slider
              min={0}
              max={100}
              value={margin}
              onChange={setMargin}
              marks={{
                0: '0',
                36: '36 (0.5")',
                72: '72 (1")',
              }}
            />
          </div>

          {/* Filename */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">输出文件名</label>
            <Input
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              suffix=".pdf"
              className="w-full"
            />
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          type="primary"
          size="large"
          icon={<DownloadOutlined />}
          onClick={handleConvert}
          loading={loading}
          disabled={images.length === 0}
          className="min-w-40"
        >
          {loading ? '生成中...' : '生成 PDF'}
        </Button>
        <Button
          size="large"
          icon={<DeleteOutlined />}
          onClick={handleClearAll}
          disabled={images.length === 0}
        >
          清空
        </Button>
      </div>
    </div>
  );
}
```

---

## Task 5: Verify and Test

**Step 1: Start development server**

Run: `npm run dev`

**Step 2: Navigate to the page**

Open: http://localhost:3000/tools/converter/image-to-pdf

**Step 3: Test functionality**

- [ ] Upload single image - should create single page PDF
- [ ] Upload multiple images - should create multi-page PDF
- [ ] Change page size - should reflect in output
- [ ] Change orientation - should reflect in output
- [ ] Change image fit - should adjust image scaling
- [ ] Adjust margin - should affect image positioning
- [ ] Custom filename - should use custom name for download
- [ ] Download button - should download PDF file

**Step 4: Check for errors**

- [ ] No console errors on page load
- [ ] No console errors on upload
- [ ] No console errors on download
- [ ] Lint passes: `npm run lint`

---

## Task 6: Commit Changes

**Step 1: Stage and commit**

```bash
git add package.json src/tools/converter/image-to-pdf.ts src/app/tools/converter/image-to-pdf/page.tsx src/constants/navigation.ts
git commit -m "feat: add image to PDF converter tool

- Add pdf-lib dependency for client-side PDF generation
- Implement image-to-pdf utility with customizable options
- Create converter page with drag-drop upload
- Support single and multiple image conversion
- Add page size, orientation, fit mode, and margin options
- Auto-detect orientation from first image"
```

---

## Summary

This implementation plan creates a complete image-to-PDF converter with:

1. **Core Functionality:**
   - Single and batch image conversion
   - Support for common image formats (JPG, PNG, WebP, GIF, BMP)
   - Client-side processing (no server required)

2. **Customization Options:**
   - Page sizes (A4, Letter, A5, Legal, Custom)
   - Page orientation (portrait/landscape)
   - Image fit modes (fit, fill, original)
   - Adjustable margins
   - Custom output filename

3. **UI Features:**
   - Drag-and-drop upload area
   - Image preview with remove option
   - Auto-detection of page orientation from first image
   - Clean, modern design following project patterns
