'use client';

import {
  DeleteOutlined,
  DownloadOutlined,
  EyeOutlined,
  FileImageOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { Button, Card, Input, Modal, message, Select, Slider, Upload } from 'antd';
import { saveAs } from 'file-saver';
import { useCallback, useState } from 'react';
import {
  convertImagesToPdf,
  getImageDimensions,
  ImageFile,
  isLandscape,
  PAGE_SIZES,
  PageSizeName,
  readFileAsDataUrl,
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
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  // Auto-detect orientation from first image
  const detectOrientation = useCallback((imgs: ImageFile[]) => {
    if (imgs.length > 0) {
      const first = imgs[0];
      return isLandscape(first.width, first.height) ? 'landscape' : 'portrait';
    }
    return 'portrait';
  }, []);

  const handleFileUpload = useCallback(
    async (file: File) => {
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
    },
    [detectOrientation]
  );

  const handleRemoveImage = useCallback(
    (index: number) => {
      setImages((prev) => {
        const newImages = prev.filter((_, i) => i !== index);
        // Re-detect orientation if first image changed
        if (index === 0 && newImages.length > 0) {
          const detectedOrientation = detectOrientation(newImages);
          setPageOrientation(detectedOrientation);
        }
        return newImages;
      });
    },
    [detectOrientation]
  );

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

      const pageSizeConfig =
        pageSize === 'Custom' ? { width: customWidth, height: customHeight } : pageSize;

      const pdfBytes = await convertImagesToPdf(images, {
        pageSize: pageSizeConfig,
        pageOrientation,
        imageFit,
        margin,
        filename,
      });

      // Convert Uint8Array to ArrayBuffer for Blob compatibility
      const pdfArray = new Uint8Array(pdfBytes);
      const blob = new Blob([pdfArray], { type: 'application/pdf' });

      // Create blob URL for preview
      const blobUrl = URL.createObjectURL(blob);
      // Revoke previous URL if exists
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl);
      }
      setPdfBlobUrl(blobUrl);

      // Auto-open preview
      setPreviewVisible(true);
      message.success('PDF 生成成功！');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'PDF 生成失败');
    } finally {
      setLoading(false);
    }
  }, [
    images,
    pageSize,
    customWidth,
    customHeight,
    pageOrientation,
    imageFit,
    margin,
    filename,
    pdfBlobUrl,
  ]);

  const handleDownload = useCallback(() => {
    if (!pdfBlobUrl) return;
    fetch(pdfBlobUrl)
      .then((res) => res.blob())
      .then((blob) => {
        saveAs(blob, filename);
        message.success('下载成功');
      });
  }, [pdfBlobUrl, filename]);

  const handleClosePreview = useCallback(() => {
    setPreviewVisible(false);
  }, []);

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
        <p className="text-gray-600">将图片转换为 PDF 文档，支持批量处理和自定义页面设置</p>
      </div>

      {/* Upload Area */}
      <Card className="mb-6">
        <Dragger {...uploadProps} className="mb-4">
          <p className="ant-upload-drag-icon">
            <FileImageOutlined className="text-4xl text-teal-500" />
          </p>
          <p className="ant-upload-text">点击或拖拽图片到此处上传</p>
          <p className="ant-upload-hint">
            支持 JPG、PNG、WebP、GIF、BMP 等常见图片格式，可批量上传多张图片
          </p>
        </Dragger>

        {/* Image Preview List */}
        {images.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-700">已上传 {images.length} 张图片</span>
              <Button type="text" danger icon={<DeleteOutlined />} onClick={handleClearAll}>
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
              页边距: {margin} pt ({Math.round((margin / 72) * 254)} mm)
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
          icon={<EyeOutlined />}
          onClick={handleConvert}
          loading={loading}
          disabled={images.length === 0}
          className="min-w-40"
        >
          {loading ? '生成中...' : '预览 PDF'}
        </Button>
        <Button
          size="large"
          icon={<DownloadOutlined />}
          onClick={handleDownload}
          disabled={!pdfBlobUrl}
        >
          下载
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

      {/* PDF Preview Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <EyeOutlined className="text-teal-500" />
            <span>PDF 预览 - {filename}</span>
          </div>
        }
        open={previewVisible}
        onCancel={handleClosePreview}
        footer={[
          <Button
            key="download"
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
          >
            下载 PDF
          </Button>,
          <Button key="close" onClick={handleClosePreview}>
            关闭
          </Button>,
        ]}
        width={900}
        style={{ top: 20 }}
        bodyStyle={{ height: '70vh', padding: 0 }}
        centered
      >
        {pdfBlobUrl && (
          <iframe
            src={pdfBlobUrl}
            title="PDF Preview"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        )}
      </Modal>
    </div>
  );
}
