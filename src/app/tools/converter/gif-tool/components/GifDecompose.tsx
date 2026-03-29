'use client';

import {
  AppstoreOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EyeOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import { Button, Card, Modal, message, Select, Spin } from 'antd';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { useCallback, useState } from 'react';
import { decomposeGif, GifFrame, getImageDimensions } from '@/tools/converter/gif-tool';

const FORMAT_OPTIONS = [
  { label: 'PNG', value: 'png' },
  { label: 'JPG', value: 'jpg' },
  { label: 'WebP', value: 'webp' },
];

export default function GifDecompose() {
  const [frames, setFrames] = useState<GifFrame[]>([]);
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState<'png' | 'jpg' | 'webp'>('png');
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [gifInfo, setGifInfo] = useState<{
    width: number;
    height: number;
    frameCount: number;
  } | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!file.name.toLowerCase().endsWith('.gif')) {
        message.warning('请上传 GIF 文件');
        return false;
      }

      setUploading(true);
      try {
        setLoading(true);
        const result = await decomposeGif(file, { format });

        // 获取 GIF 尺寸
        const firstFrameDataUrl = result[0]?.dataUrl;
        if (firstFrameDataUrl) {
          const dimensions = await getImageDimensions(firstFrameDataUrl);
          setGifInfo({
            width: dimensions.width,
            height: dimensions.height,
            frameCount: result.length,
          });
        }

        setFrames(result);
        message.success(`成功分解 ${result.length} 帧`);
      } catch (error) {
        message.error(error instanceof Error ? error.message : 'GIF 解析失败');
      } finally {
        setLoading(false);
        setUploading(false);
      }

      return false;
    },
    [format]
  );

  const handleFormatChange = useCallback((newFormat: 'png' | 'jpg' | 'webp') => {
    setFormat(newFormat);
  }, []);

  const handleClearAll = useCallback(() => {
    setFrames([]);
    setGifInfo(null);
  }, []);

  const handleDownloadFrame = useCallback(
    (frame: GifFrame) => {
      const ext = format === 'jpg' ? 'jpg' : format === 'webp' ? 'webp' : 'png';

      // 转换为 blob 并下载
      fetch(frame.dataUrl)
        .then((res) => res.blob())
        .then((blob) => {
          saveAs(blob, `frame_${frame.index + 1}.${ext}`);
          message.success('下载成功');
        });
    },
    [format]
  );

  const handleDownloadAll = useCallback(async () => {
    if (frames.length === 0) return;

    try {
      setLoading(true);
      const zip = new JSZip();
      const ext = format === 'jpg' ? 'jpg' : format === 'webp' ? 'webp' : 'png';

      // 转换所有帧并添加到 zip
      const convertPromises = frames.map(async (frame) => {
        const response = await fetch(frame.dataUrl);
        const blob = await response.blob();
        zip.file(`frame_${frame.index + 1}.${ext}`, blob);
      });

      await Promise.all(convertPromises);

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'gif_frames.zip');
      message.success('打包下载成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '打包下载失败');
    } finally {
      setLoading(false);
    }
  }, [frames, format]);

  return (
    <div className="space-y-6">
      {/* 上传区域 */}
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
                <p className="text-lg font-medium text-gray-700 mb-1">点击或拖拽 GIF 文件到此处</p>
                <p className="text-gray-500 text-sm">支持上传 GIF 格式图片</p>
                <Button type="primary" className="mt-4 bg-teal-500 hover:bg-teal-600">
                  选择 GIF 文件
                </Button>
              </div>
            </Spin>
          </label>
        </div>
      </Card>

      {/* 设置区域 */}
      {frames.length > 0 && (
        <Card
          title={
            <div className="flex items-center gap-2">
              <AppstoreOutlined className="text-teal-500" />
              <span>帧设置</span>
            </div>
          }
          extra={
            <div className="flex gap-2">
              <Button
                onClick={handleDownloadAll}
                loading={loading}
                disabled={frames.length === 0}
                className="!bg-teal-500 !border-teal-500 !text-white hover:!bg-teal-600"
              >
                <DownloadOutlined /> 批量下载 ({frames.length} 帧)
              </Button>
              <Button danger icon={<DeleteOutlined />} onClick={handleClearAll}>
                清空
              </Button>
            </div>
          }
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">输出格式:</span>
              <Select
                value={format}
                onChange={handleFormatChange}
                options={FORMAT_OPTIONS}
                className="w-28 [&_.ant-select-selector]:border-teal-300"
              />
            </div>
            {gifInfo && (
              <div className="text-sm text-gray-500">
                原始尺寸: {gifInfo.width}×{gifInfo.height} | 帧数: {gifInfo.frameCount}
              </div>
            )}
          </div>

          {/* 帧列表 */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-80 overflow-y-auto">
            {frames.map((frame) => (
              <div
                key={frame.index}
                className="relative group cursor-pointer hover:ring-2 hover:ring-teal-400 rounded-lg overflow-hidden transition-all"
                onClick={() => setPreviewIndex(frame.index)}
              >
                <img
                  src={frame.dataUrl}
                  alt={`Frame ${frame.index + 1}`}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                  <Button
                    type="primary"
                    size="small"
                    icon={<EyeOutlined />}
                    className="bg-teal-500 border-teal-500"
                  >
                    预览
                  </Button>
                  <Button
                    size="small"
                    icon={<DownloadOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadFrame(frame);
                    }}
                    className="text-teal-500 hover:text-teal-300"
                  >
                    下载
                  </Button>
                </div>
                <span className="absolute bottom-1 right-1 bg-teal-500 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                  {frame.index + 1}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 预览弹窗 */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <EyeOutlined className="text-teal-500" />
            <span>帧预览 - 第 {previewIndex !== null ? previewIndex + 1 : 0} 帧</span>
          </div>
        }
        open={previewIndex !== null}
        onCancel={() => setPreviewIndex(null)}
        footer={[
          <Button
            key="download"
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => {
              if (previewIndex !== null) {
                handleDownloadFrame(frames[previewIndex]);
              }
            }}
            className="bg-teal-500 border-teal-500"
          >
            下载此帧
          </Button>,
          <Button key="close" onClick={() => setPreviewIndex(null)}>
            关闭
          </Button>,
        ]}
        width={600}
        centered
      >
        {previewIndex !== null && frames[previewIndex] && (
          <img
            src={frames[previewIndex].dataUrl}
            alt={`Frame ${previewIndex + 1}`}
            style={{ maxWidth: '100%', maxHeight: '60vh' }}
          />
        )}
      </Modal>
    </div>
  );
}
