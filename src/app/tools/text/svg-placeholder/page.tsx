'use client';

import { Button, Input, message, Select, Slider, Space } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

export default function SvgPlaceholderPage() {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [bgColor, setBgColor] = useState('#e0e0e0');
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#999999');
  const [fontSize, setFontSize] = useState(24);
  const [format, setFormat] = useState<'svg' | 'data-url'>('svg');
  const [output, setOutput] = useState('');

  const generate = useCallback(() => {
    const displayText = text || `${width} × ${height}`;
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dy=".3em">${displayText}</text>
</svg>`;

    let result = svg;
    if (format === 'data-url') {
      result = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
    }

    setOutput(result);
    message.success('SVG占位图生成成功');
  }, [width, height, bgColor, text, textColor, fontSize, format]);

  const handleDownload = useCallback(() => {
    if (!output || format !== 'svg') return;
    const blob = new Blob([output], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'placeholder.svg';
    link.click();
    URL.revokeObjectURL(url);
    message.success('下载成功');
  }, [output, format]);

  const handleCopy = useCallback(() => {
    copy(output);
    message.success('复制成功');
  }, [output]);

  const handleClear = () => {
    setOutput('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🖼️ SVG 占位图生成</h1>
        <p className="text-gray-600">生成SVG格式的占位图</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">⚙️ 尺寸设置</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="text-sm text-gray-600 block mb-2">宽度: {width}px</span>
            <Slider
              min={50}
              max={1200}
              step={10}
              value={width}
              onChange={setWidth}
              marks={{ 50: '50', 600: '600', 1200: '1200' }}
            />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">高度: {height}px</span>
            <Slider
              min={50}
              max={1200}
              step={10}
              value={height}
              onChange={setHeight}
              marks={{ 50: '50', 600: '600', 1200: '1200' }}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">🎨 样式设置</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">背景颜色</label>
            <Input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-10"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">文字颜色</label>
            <Input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-full h-10"
            />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">字号: {fontSize}px</span>
            <Slider
              min={12}
              max={72}
              step={2}
              value={fontSize}
              onChange={setFontSize}
              marks={{ 12: '12', 40: '40', 72: '72' }}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">输出格式</label>
            <Select
              value={format}
              onChange={setFormat}
              style={{ width: '100%' }}
              options={[
                { label: 'SVG代码', value: 'svg' },
                { label: 'Data URL', value: 'data-url' },
              ]}
              size="large"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">📝 自定义文字 (可选)</span>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`留空将显示默认尺寸文字 "${width} × ${height}"`}
          size="large"
        />
      </div>

      <Space className="w-full mb-4">
        <Button
          type="primary"
          size="large"
          onClick={generate}
          className="flex-1 h-12 text-base font-medium"
        >
          🚀 生成占位图
        </Button>
        <Button size="large" onClick={handleClear}>
          清空
        </Button>
      </Space>

      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-gray-800">👁️ 预览</span>
            <Space>
              <Button onClick={handleCopy}>📋 复制</Button>
              {format === 'svg' && <Button onClick={handleDownload}>💾 下载</Button>}
            </Space>
          </div>
          <div className="flex justify-center p-4 bg-gray-100 rounded-lg">
            {format === 'svg' ? (
              <div dangerouslySetInnerHTML={{ __html: output }} />
            ) : (
              <img src={output} alt="Placeholder" />
            )}
          </div>
          {format === 'svg' && (
            <div className="mt-4 p-3 bg-gray-50 rounded font-mono text-xs overflow-x-auto">
              {output}
            </div>
          )}
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• SVG占位图是矢量图形，缩放不失真</li>
          <li>• Data URL格式可直接作为img标签的src使用</li>
          <li>• 适用于网页开发中的图片占位</li>
          <li>• 适合作为加载图片的临时替代</li>
        </ul>
      </div>
    </div>
  );
}
