'use client';

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EyeOutlined,
  FileImageOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { Button, Card, Input, Modal, message, Slider, Spin } from 'antd';
import { saveAs } from 'file-saver';
import { useCallback, useState } from 'react';
import {
  getImageDimensions,
  readFileAsDataUrl,
  SynthesisImage,
  synthesizeGif,
} from '@/tools/converter/gif-tool';

export default function GifSynthesize() {
  const [images, setImages] = useState<SynthesisImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [delay, setDelay] = useState(200);
  const [quality, setQuality] = useState(10);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [filename, setFilename] = useState('output.gif');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      const dimensions = await getImageDimensions(dataUrl);

      const imageFile: SynthesisImage = {
        file,
        dataUrl,
        width: dimensions.width,
        height: dimensions.height,
      };

      setImages((prev) => {
        // 如果是第一张图片，设置默认尺寸
        if (prev.length === 0) {
          setWidth(dimensions.width);
          setHeight(dimensions.height);
        }
        return [...prev, imageFile];
      });
      message.success(`${file.name} 上传成功`);
    } catch {
      message.error(`${file.name} 上传失败`);
    } finally {
      setUploading(false);
    }
  }, []);

  const handleRemoveImage = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleClearAll = useCallback(() => {
    setImages([]);
    setWidth(undefined);
    setHeight(undefined);
    setPreviewUrl(null);
  }, []);

  const handleMoveImage = useCallback((index: number, direction: 'up' | 'down') => {
    setImages((prev) => {
      const newImages = [...prev];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= newImages.length) return prev;
      [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
      return newImages;
    });
  }, []);

  const handleSynthesize = useCallback(async () => {
    if (images.length === 0) {
      message.warning('请先上传图片');
      return;
    }

    try {
      setLoading(true);

      const blob = await synthesizeGif(images, {
        width: width || undefined,
        height: height || undefined,
        delay,
        quality,
        repeat: 0,
      });

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);

      message.success('GIF 生成成功！');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'GIF 生成失败');
    } finally {
      setLoading(false);
    }
  }, [images, width, height, delay, quality, previewUrl]);

  const handleDownload = useCallback(() => {
    if (!previewUrl) return;
    fetch(previewUrl)
      .then((res) => res.blob())
      .then((blob) => {
        saveAs(blob, filename);
        message.success('下载成功');
      });
  }, [previewUrl, filename]);

  return (
    <div className="space-y-6">
      {/* 上传区域 */}
      <Card className="border-2 border-dashed border-teal-200 hover:border-teal-400 transition-colors">
        <div className="text-center py-8">
          <input
            id="gif-upload-input"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                Array.from(files).forEach(handleFileUpload);
              }
              e.target.value = '';
            }}
          />
          <Spin spinning={uploading}>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center mb-4">
                <FileImageOutlined className="text-4xl text-teal-500" />
              </div>
              <p className="text-lg font-medium text-gray-700 mb-1">点击或拖拽图片到此处上传</p>
              <p className="text-gray-500 text-sm mb-4">支持 JPG、PNG、WebP 等常见图片格式</p>
              <Button
                type="primary"
                className="!bg-teal-500 !text-white hover:!bg-teal-600"
                onClick={() => document.getElementById('gif-upload-input')?.click()}
              >
                选择图片
              </Button>
            </div>
          </Spin>
        </div>
      </Card>

      {/* 已上传图片列表 */}
      {images.length > 0 && (
        <Card
          title={
            <div className="flex items-center gap-2">
              <FileImageOutlined className="text-teal-500" />
              <span>已上传 {images.length} 张图片</span>
            </div>
          }
          extra={
            <Button type="text" danger icon={<DeleteOutlined />} onClick={handleClearAll}>
              清空全部
            </Button>
          }
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-64 overflow-y-auto p-1">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-teal-400 transition-all"
              >
                <img src={img.dataUrl} alt={img.file.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <DeleteOutlined
                    className="text-2xl text-white cursor-pointer hover:text-red-400 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(index);
                    }}
                  />
                  <div className="flex gap-3">
                    <ArrowUpOutlined
                      className={`text-xl cursor-pointer transition-colors ${
                        index === 0
                          ? 'text-gray-500 cursor-not-allowed'
                          : 'text-white hover:text-teal-300'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (index !== 0) handleMoveImage(index, 'up');
                      }}
                    />
                    <ArrowDownOutlined
                      className={`text-xl cursor-pointer transition-colors ${
                        index === images.length - 1
                          ? 'text-gray-500 cursor-not-allowed'
                          : 'text-white hover:text-teal-300'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (index !== images.length - 1) handleMoveImage(index, 'down');
                      }}
                    />
                  </div>
                </div>
                <span className="absolute bottom-1 right-1 bg-teal-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                  {index + 1}
                </span>
                <span className="absolute top-1 left-1 bg-black/60 text-white text-xs px-1 rounded">
                  {img.width}×{img.height}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <span>
              首图尺寸: {images[0]?.width}×{images[0]?.height}
            </span>
          </div>
        </Card>
      )}

      {/* 设置区域 */}
      <Card
        title={
          <div className="flex items-center gap-2">
            <PlayCircleOutlined className="text-teal-500" />
            <span>GIF 生成设置</span>
          </div>
        }
        className="bg-gradient-to-br from-teal-50 to-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 帧延迟设置 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">帧延迟</label>
              <span className="text-teal-600 font-medium">{delay}ms</span>
            </div>
            <Slider
              min={50}
              max={2000}
              step={50}
              value={delay}
              onChange={setDelay}
              className="[&_.ant-slider-track]:bg-teal-500 [&_.ant-slider-handle]:border-teal-500 [&_.ant-slider-handle]::after:bg-teal-500"
              tooltip={{ formatter: (value) => `${value}ms` }}
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>快 (50ms)</span>
              <span>1s</span>
              <span>慢 (2000ms)</span>
            </div>
            <p className="text-xs text-gray-500 pt-2 border-t border-gray-100">
              每帧显示时长，影响 GIF 播放速度
            </p>
          </div>

          {/* 质量设置 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">压缩质量</label>
              <span className="text-teal-600 font-medium">
                {quality <= 5 ? '最高' : quality <= 15 ? '适中' : '最低'}
              </span>
            </div>
            <Slider
              min={1}
              max={30}
              value={quality}
              onChange={setQuality}
              className="[&_.ant-slider-track]:bg-teal-500"
              tooltip={{ formatter: (value) => `质量 ${value}` }}
              reverse
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>最佳 (1)</span>
              <span>中等</span>
              <span>最小 (30)</span>
            </div>
            <p className="text-xs text-gray-500 pt-2 border-t border-gray-100">
              数值越小文件越大，画质越好
            </p>
          </div>

          {/* 尺寸设置 - 使用与卡片一致的青色主题 */}
          <div className="md:col-span-2 p-4 rounded-lg border border-teal-100 bg-teal-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">输出尺寸</label>
              {images.length > 0 && (
                <span className="text-xs text-teal-600 bg-teal-100 px-2 py-0.5 rounded">
                  首图: {images[0]?.width}×{images[0]?.height}
                </span>
              )}
            </div>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-xs text-teal-700 mb-1">宽度 (px)</label>
                <Input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value ? Number(e.target.value) : undefined)}
                  min={1}
                  max={2000}
                  placeholder={images[0] ? `${images[0].width}` : '自动'}
                  className="[&_.ant-input]:border-teal-300 [&_.ant-input]:focus:border-teal-500 [&_.ant-input]:bg-white"
                />
              </div>
              <span className="text-teal-400 pb-2">×</span>
              <div className="flex-1">
                <label className="block text-xs text-teal-700 mb-1">高度 (px)</label>
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : undefined)}
                  min={1}
                  max={2000}
                  placeholder={images[0] ? `${images[0].height}` : '自动'}
                  className="[&_.ant-input]:border-teal-300 [&_.ant-input]:focus:border-teal-500 [&_.ant-input]:bg-white"
                />
              </div>
            </div>
            <p className="text-xs text-teal-600/70">留空或输入 0 则使用原图尺寸</p>
          </div>

          {/* 文件名设置 */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">输出文件名</label>
            <Input
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              addonAfter=".gif"
              className="max-w-xs [&_.ant-input]:border-teal-300 [&_.ant-input]:focus:border-teal-500 [&_.ant-input-group-addon]:bg-teal-50 [&_.ant-input-group-addon]:text-teal-600"
            />
          </div>
        </div>
      </Card>

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button
          type="primary"
          size="large"
          icon={<PlayCircleOutlined />}
          onClick={handleSynthesize}
          loading={loading}
          disabled={images.length === 0}
          className="min-w-48 h-12 !bg-teal-500 !text-white hover:!bg-teal-600 shadow-lg shadow-teal-200"
        >
          {loading ? '生成中...' : '生成 GIF'}
        </Button>
        <Button
          size="large"
          icon={<DownloadOutlined />}
          onClick={handleDownload}
          disabled={!previewUrl}
          className="min-w-32 h-12 !bg-teal-500 !text-white hover:!bg-teal-600"
        >
          下载 GIF
        </Button>
      </div>

      {/* 预览弹窗 */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <EyeOutlined className="text-teal-500" />
            <span>GIF 预览 - {filename}</span>
          </div>
        }
        open={!!previewUrl}
        onCancel={() => setPreviewUrl(null)}
        footer={[
          <Button
            key="download"
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
            className="!bg-teal-500 !border-teal-500 !text-white hover:!bg-teal-600"
          >
            下载 GIF
          </Button>,
          <Button key="close" onClick={() => setPreviewUrl(null)}>
            关闭
          </Button>,
        ]}
        width={800}
        style={{ top: 20 }}
        styles={{ body: { padding: 0, textAlign: 'center', background: '#000' } }}
        centered
      >
        {previewUrl && (
          <img src={previewUrl} alt="GIF Preview" style={{ maxWidth: '100%', maxHeight: '70vh' }} />
        )}
      </Modal>
    </div>
  );
}
