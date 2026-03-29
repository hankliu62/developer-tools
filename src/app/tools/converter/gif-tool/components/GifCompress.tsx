'use client';

import {
  CompressOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EyeOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import { Button, Card, Input, Modal, message, Slider, Spin, Switch } from 'antd';
import { saveAs } from 'file-saver';
import { useCallback, useState } from 'react';
import { compressGif, getImageDimensions, readFileAsDataUrl } from '@/tools/converter/gif-tool';

interface GifFile {
  file: File;
  dataUrl: string;
  width: number;
  height: number;
  size: number;
}

export default function GifCompress() {
  const [originalGif, setOriginalGif] = useState<GifFile | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(80);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [keepOriginalSize, setKeepOriginalSize] = useState(true);
  const [filename, setFilename] = useState('compressed.gif');
  const [previewMode, setPreviewMode] = useState<'original' | 'compressed'>('original');
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.gif')) {
      message.warning('请上传 GIF 文件');
      return false;
    }

    setUploading(true);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      const dimensions = await getImageDimensions(dataUrl);

      setOriginalGif({
        file,
        dataUrl,
        width: dimensions.width,
        height: dimensions.height,
        size: file.size,
      });

      setWidth(dimensions.width);
      setHeight(dimensions.height);
      setCompressedBlob(null);
      setCompressedUrl(null);

      message.success(`${file.name} 上传成功`);
    } catch {
      message.error(`${file.name} 上传失败`);
    } finally {
      setUploading(false);
    }

    return false;
  }, []);

  const handleClearAll = useCallback(() => {
    setOriginalGif(null);
    if (compressedUrl) {
      URL.revokeObjectURL(compressedUrl);
    }
    setCompressedUrl(null);
    setCompressedBlob(null);
  }, [compressedUrl]);

  const handleCompress = useCallback(async () => {
    if (!originalGif) {
      message.warning('请先上传 GIF 文件');
      return;
    }

    try {
      setLoading(true);

      const blob = await compressGif(originalGif.file, {
        quality,
        width: keepOriginalSize ? undefined : width,
        height: keepOriginalSize ? undefined : height,
      });

      // 清理之前的 URL
      if (compressedUrl) {
        URL.revokeObjectURL(compressedUrl);
      }

      const url = URL.createObjectURL(blob);
      setCompressedUrl(url);
      setCompressedBlob(blob);
      setShowPreview(true);

      message.success('GIF 压缩成功！');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'GIF 压缩失败');
    } finally {
      setLoading(false);
    }
  }, [originalGif, quality, width, height, keepOriginalSize, compressedUrl]);

  const handleDownload = useCallback(() => {
    if (!compressedUrl) return;
    fetch(compressedUrl)
      .then((res) => res.blob())
      .then((blob) => {
        saveAs(blob, filename);
        message.success('下载成功');
      });
  }, [compressedUrl, filename]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // 计算压缩率
  const compressionRatio =
    compressedBlob && originalGif
      ? ((1 - compressedBlob.size / originalGif.size) * 100).toFixed(1)
      : null;

  return (
    <div className="space-y-6">
      {/* 上传区域 */}
      {!originalGif && (
        <Card className="border-2 border-dashed border-teal-200 hover:border-teal-400 transition-colors">
          <div className="text-center py-8">
            <label className="cursor-pointer inline-block">
              <input
                type="file"
                accept=".gif"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileUpload(file);
                  }
                }}
              />
              <Spin spinning={uploading}>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center mb-4">
                    <FileImageOutlined className="text-4xl text-teal-500" />
                  </div>
                  <p className="text-lg font-medium text-gray-700 mb-1">
                    点击或拖拽 GIF 文件到此处
                  </p>
                  <p className="text-gray-500 text-sm">支持上传 GIF 格式图片</p>
                  <Button type="primary" className="mt-4 bg-teal-500 hover:bg-teal-600">
                    选择 GIF 文件
                  </Button>
                </div>
              </Spin>
            </label>
          </div>
        </Card>
      )}

      {/* GIF 信息 */}
      {originalGif && (
        <Card
          title={
            <div className="flex items-center gap-2">
              <FileImageOutlined className="text-teal-500" />
              <span>已上传: {originalGif.file.name}</span>
            </div>
          }
          extra={
            <Button type="text" danger icon={<DeleteOutlined />} onClick={handleClearAll}>
              更换文件
            </Button>
          }
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* 预览图 */}
            <div className="flex-shrink-0">
              <img
                src={originalGif.dataUrl}
                alt="Original GIF"
                className="max-w-xs max-h-48 rounded-lg border border-gray-200"
              />
            </div>

            {/* 信息 */}
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">文件大小:</span>
                  <span className="ml-2 font-medium">{formatFileSize(originalGif.size)}</span>
                </div>
                <div>
                  <span className="text-gray-500">尺寸:</span>
                  <span className="ml-2 font-medium">
                    {originalGif.width}×{originalGif.height}
                  </span>
                </div>
              </div>

              {compressedBlob && (
                <div className="p-3 bg-teal-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-teal-700 font-medium">压缩后:</span>
                    <span className="text-teal-700">
                      {formatFileSize(compressedBlob.size)} (-{compressionRatio}%)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* 压缩设置 */}
      {originalGif && (
        <Card
          title={
            <div className="flex items-center gap-2">
              <CompressOutlined className="text-teal-500" />
              <span>压缩设置</span>
            </div>
          }
        >
          <div className="space-y-6">
            {/* 质量滑块 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">压缩质量</label>
                <span className="text-teal-600 font-medium">{quality}%</span>
              </div>
              <Slider
                min={10}
                max={100}
                value={quality}
                onChange={setQuality}
                className="[&_.ant-slider-track]:bg-teal-500"
                tooltip={{ formatter: (value) => `${value}%` }}
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>小 (10%)</span>
                <span className="text-teal-600 font-medium">推荐 60-80%</span>
                <span>大 (100%)</span>
              </div>
            </div>

            {/* 尺寸设置 */}
            <div className="p-4 bg-gray-50 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">保持原始尺寸</label>
                <Switch
                  checked={keepOriginalSize}
                  onChange={setKeepOriginalSize}
                  className="[&_.ant-switch-checked]:bg-teal-500"
                />
              </div>

              {!keepOriginalSize && (
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">宽度 (px)</label>
                    <Input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value))}
                      min={1}
                      max={2000}
                      className="[&_.ant-input]:border-teal-300"
                    />
                  </div>
                  <span className="text-gray-400 pb-2">×</span>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">高度 (px)</label>
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      min={1}
                      max={2000}
                      className="[&_.ant-input]:border-teal-300"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 文件名 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">输出文件名</label>
              <Input
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                addonAfter=".gif"
                className="max-w-xs [&_.ant-input]:border-teal-300 [&_.ant-input-group-addon]:bg-teal-50 [&_.ant-input-group-addon]:text-teal-600"
              />
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-4">
              <Button
                type="primary"
                size="large"
                icon={<CompressOutlined />}
                onClick={handleCompress}
                loading={loading}
                className="min-w-40 !bg-teal-500 !text-white hover:!bg-teal-600"
              >
                {loading ? '压缩中...' : '开始压缩'}
              </Button>
              <Button
                size="large"
                icon={<DownloadOutlined />}
                onClick={handleDownload}
                disabled={!compressedUrl}
              >
                下载压缩文件
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* 预览弹窗 */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <EyeOutlined className="text-teal-500" />
            <span>对比预览</span>
          </div>
        }
        open={showPreview}
        onCancel={() => setShowPreview(false)}
        footer={[
          <Button
            key="download"
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
            className="!bg-teal-500 !border-teal-500 !text-white hover:!bg-teal-600"
          >
            下载压缩文件
          </Button>,
          <Button key="close" onClick={() => setShowPreview(false)}>
            关闭
          </Button>,
        ]}
        width={800}
        style={{ top: 20 }}
        centered
      >
        <div className="flex flex-col items-center">
          {/* 信息展示 */}
          <div className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">当前预览:</span>
              <span
                className={`font-medium ${previewMode === 'original' ? 'text-teal-600' : 'text-orange-500'}`}
              >
                {previewMode === 'original' ? '原图' : '压缩后'}
              </span>
              <span className="text-gray-400 text-sm">
                (
                {previewMode === 'original'
                  ? formatFileSize(originalGif?.size || 0)
                  : formatFileSize(compressedBlob?.size || 0)}
                )
              </span>
            </div>
            {previewMode === 'compressed' && compressedBlob && (
              <span className="text-sm text-orange-500 font-medium">
                节省 {Math.round((1 - compressedBlob.size / (originalGif?.size || 1)) * 100)}%
              </span>
            )}
          </div>

          {/* 图片展示区域 - 居中显示 */}
          <div className="flex items-center justify-center w-full min-h-[300px] max-h-[60vh] p-4 bg-gray-900">
            <img
              src={previewMode === 'original' ? originalGif?.dataUrl : compressedUrl || ''}
              alt={previewMode === 'original' ? 'Original GIF' : 'Compressed GIF'}
              className="max-w-full max-h-[50vh] object-contain"
            />
          </div>

          {/* 预览切换 */}
          {compressedUrl && (
            <div className="flex items-center gap-2 py-3 bg-gray-50 border-t">
              <Button
                type={previewMode === 'original' ? 'primary' : 'default'}
                size="small"
                onClick={() => setPreviewMode('original')}
                className={previewMode === 'original' ? '!bg-teal-500 !border-teal-500' : ''}
              >
                原图
              </Button>
              <Button
                type={previewMode === 'compressed' ? 'primary' : 'default'}
                size="small"
                onClick={() => setPreviewMode('compressed')}
                className={previewMode === 'compressed' ? '!bg-orange-500 !border-orange-500' : ''}
              >
                压缩后
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
