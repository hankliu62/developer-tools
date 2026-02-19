'use client';
import { Button, message } from 'antd';
import copy from 'copy-to-clipboard';
import { useEffect, useState } from 'react';
import { type DeviceInfo, getDeviceInfo } from '@/tools/web';

export default function DeviceInfoPage() {
  const [info, setInfo] = useState<DeviceInfo | null>(null);

  useEffect(() => {
    setInfo(getDeviceInfo());
  }, []);

  const handleCopy = () => {
    if (info) {
      copy(JSON.stringify(info, null, 2));
      message.success('复制成功');
    }
  };

  if (!info) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-slate-100 rounded-lg mr-2">💻</span>
          设备信息
        </h1>
        <p className="text-gray-600">获取当前设备信息</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-end mb-4">
          <Button onClick={handleCopy}>复制</Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">设备类型</div>
            <div className="font-medium">{info.deviceType}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">浏览器</div>
            <div className="font-medium">{info.browser}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg col-span-2">
            <div className="text-sm text-gray-500 mb-1">User Agent</div>
            <div className="font-mono text-sm break-all">{info.userAgent}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">平台</div>
            <div className="font-medium">{info.platform}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">语言</div>
            <div className="font-medium">{info.language}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">屏幕宽度</div>
            <div className="font-medium">{info.screenWidth}px</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">屏幕高度</div>
            <div className="font-medium">{info.screenHeight}px</div>
          </div>
        </div>
      </div>
    </div>
  );
}
