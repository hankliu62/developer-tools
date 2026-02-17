'use client';
import { Button, Input, message, Radio, Slider, Space } from 'antd';
import { useCallback, useState } from 'react';

export default function QrCodeGeneratorPage() {
  const [content, setContent] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(200);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [darkColor, setDarkColor] = useState('#000000');
  const [lightColor, setLightColor] = useState('#ffffff');

  const generateQRCode = useCallback(() => {
    if (!content) {
      message.error('请输入内容');
      return;
    }
    setLoading(true);
    const encodedContent = encodeURIComponent(content);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedContent}&ecc=${errorLevel}&color=${darkColor.replace('#', '')}&bgcolor=${lightColor.replace('#', '')}`;
    setQrCodeUrl(url);
    setLoading(false);
    message.success('二维码生成成功');
  }, [content, size, errorLevel, darkColor, lightColor]);

  const handleDownload = useCallback(() => {
    if (!qrCodeUrl) return;
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode.png';
    link.click();
    message.success('下载成功');
  }, [qrCodeUrl]);

  const _handleClear = () => {
    setContent('');
    setQrCodeUrl('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📱 二维码生成</h1>
        <p className="text-gray-600">生成自定义样式的二维码</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">📝 输入内容</span>
        <Input.TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="输入网址、文本、电话号码等..."
          className="font-mono text-lg"
          rows={3}
        />
        <p className="text-xs text-gray-500 mt-2">支持文本、URL、电话、邮箱等多种格式</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">⚙️ 二维码选项</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="text-sm text-gray-600 block mb-2">
              尺寸: {size}x{size} 像素
            </span>
            <Slider
              min={100}
              max={500}
              step={10}
              value={size}
              onChange={setSize}
              marks={{ 100: '100', 300: '300', 500: '500' }}
            />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">容错级别</span>
            <Radio.Group
              value={errorLevel}
              onChange={(e) => setErrorLevel(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="L">L (7%)</Radio.Button>
              <Radio.Button value="M">M (15%)</Radio.Button>
              <Radio.Button value="Q">Q (25%)</Radio.Button>
              <Radio.Button value="H">H (30%)</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">前景色</span>
            <Input
              type="color"
              value={darkColor}
              onChange={(e) => setDarkColor(e.target.value)}
              className="w-full h-10"
            />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">背景色</span>
            <Input
              type="color"
              value={lightColor}
              onChange={(e) => setLightColor(e.target.value)}
              className="w-full h-10"
            />
          </div>
        </div>
      </div>

      <Button
        type="primary"
        size="large"
        block
        onClick={generateQRCode}
        loading={loading}
        disabled={!content}
        className="h-12 text-base font-medium mb-4"
      >
        🚀 生成二维码
      </Button>

      {qrCodeUrl && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-gray-800">🖼️ 二维码预览</span>
            <Space>
              <Button onClick={handleDownload}>💾 下载 PNG</Button>
            </Space>
          </div>
          <div className="flex justify-center p-4 bg-white">
            <img src={qrCodeUrl} alt="QR Code" className="max-w-full" />
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 尺寸越大，二维码越清晰，但扫描难度也可能增加</li>
          <li>• 容错级别越高，二维码即使部分损坏也能正常扫描</li>
          <li>• H 级别适合需要高可靠性的场景，如打印在商品上</li>
          <li>• 前景色和背景色对比度越高，扫描越容易</li>
        </ul>
      </div>
    </div>
  );
}
