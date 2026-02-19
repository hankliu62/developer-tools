'use client';

import { Button, Input, message, Radio, Space } from 'antd';
import { useCallback, useState } from 'react';

export default function WifiQrCodePage() {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [hidden, setHidden] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const generateQRCode = useCallback(() => {
    if (!ssid) {
      message.error('请输入WiFi名称(SSID)');
      return;
    }
    let wifiString = `WIFI:T:${encryption};S:${ssid.replace(/[;:,]/g, '\\$&')};`;
    if (password && encryption !== 'nopass') {
      wifiString += `P:${password.replace(/[;:,]/g, '\\$&')};`;
    }
    if (hidden) {
      wifiString += 'H:true;';
    }
    wifiString += ';';

    const encodedContent = encodeURIComponent(wifiString);
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedContent}`;
    setQrCodeUrl(url);
    message.success('WiFi二维码生成成功');
  }, [ssid, password, encryption, hidden]);

  const handleDownload = useCallback(() => {
    if (!qrCodeUrl) return;
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'wifi-qrcode.png';
    link.click();
    message.success('下载成功');
  }, [qrCodeUrl]);

  const _handleClear = () => {
    setSsid('');
    setPassword('');
    setQrCodeUrl('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📶 WiFi 二维码生成</h1>
        <p className="text-gray-600">生成WiFi连接二维码，扫码即连</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">📝 WiFi 信息</span>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">WiFi名称 (SSID)</label>
            <Input
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
              placeholder="输入WiFi名称..."
              size="large"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">密码 (可选)</label>
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="输入WiFi密码..."
              size="large"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">⚙️ 加密选项</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="text-sm text-gray-600 block mb-2">加密类型</span>
            <Radio.Group
              value={encryption}
              onChange={(e) => setEncryption(e.target.value)}
              buttonStyle="solid"
            >
              <Radio.Button value="WPA">WPA/WPA2</Radio.Button>
              <Radio.Button value="WEP">WEP</Radio.Button>
              <Radio.Button value="nopass">无密码</Radio.Button>
            </Radio.Group>
          </div>
          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hidden}
                onChange={(e) => setHidden(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-600">隐藏网络</span>
            </label>
          </div>
        </div>
      </div>

      <Button
        type="primary"
        size="large"
        block
        onClick={generateQRCode}
        disabled={!ssid}
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
            <img src={qrCodeUrl} alt="WiFi QR Code" className="max-w-full" />
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 使用手机相机扫描二维码即可快速连接WiFi</li>
          <li>• iOS系统相机直接支持扫码连接</li>
          <li>• Android系统建议使用系统相机或WiFi设置中的扫码功能</li>
          <li>• 隐藏网络需要手动输入SSID，建议谨慎使用</li>
        </ul>
      </div>
    </div>
  );
}
