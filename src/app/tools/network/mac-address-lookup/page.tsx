'use client';

import { Button, Input, message } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const MAC_VENDORS: Record<string, string> = {
  '00:00:0C': 'Cisco',
  '00:50:56': 'VMware',
  '00:0C:29': 'VMware',
  '08:00:27': 'VirtualBox',
  '00:03:FF': 'Microsoft',
  '00:15:5D': 'Microsoft',
  '00:03:47': 'Dell',
  '00:1A:A0': 'Dell',
  '24:6E:96': 'Dell',
  '00:04:23': 'Intel',
  '00:07:E9': 'Intel',
  '3C:A9:F4': 'Intel',
  '00:0C:6E': 'ASUS',
  '14:DA:E9': 'ASUS',
  'AC:22:0B': 'ASUS',
  '00:02:78': 'Apple',
  '04:0C:CE': 'Apple',
  'A4:83:E7': 'Apple',
  '00:04:5A': 'Linksys',
  '00:1F:33': 'Netgear',
  '00:09:5B': 'Netgear',
  '00:08:02': 'HP',
  '00:14:38': 'HP',
  '00:08:09': 'HP',
  '00:00:01': 'Xerox',
  '00:50:04': 'Nokia',
  '00:80:77': 'Tandberg',
  '00:1E:8C': 'Cisco',
  '00:1B:2A': 'Cisco',
  '00:22:55': 'Cisco',
  '00:1C:10': 'Linksys',
  '00:18:39': 'Linksys',
  '00:21:29': 'Linksys',
  'B8:27:EB': 'Raspberry Pi',
  'DC:A6:32': 'Raspberry Pi',
  'E4:5F:01': 'Raspberry Pi',
  '00:0D:93': 'Apple',
  '00:1A:02': 'Apple',
  '00:1B:63': 'Apple',
  '00:17:F2': 'Apple',
  '00:14:51': 'Apple',
  '00:16:CB': 'Apple',
  '00:25:00': 'Apple',
  '00:26:08': 'Apple',
  '00:26:B0': 'Apple',
  '3C:06:30': 'Apple',
  '60:33:4B': 'Apple',
  '68:A8:6D': 'Apple',
  '00:22:41': 'Apple',
  '00:23:12': 'Apple',
  '00:23:32': 'Apple',
  '00:23:6C': 'Apple',
  '00:23:DF': 'Apple',
  '00:24:36': 'Apple',
  '00:25:4B': 'Apple',
  '00:25:BC': 'Apple',
  '00:26:4A': 'Apple',
  '00:26:BB': 'Apple',
  '00:30:65': 'Apple',
  '00:3E:E1': 'Apple',
  '00:40:D0': 'Apple',
  '00:50:E4': 'Apple',
  '00:56:CD': 'Apple',
  '00:6D:52': 'Apple',
  '00:88:65': 'Apple',
  '00:C6:10': 'Apple',
  '00:C9:70': 'Apple',
  '04:1E:64': 'Apple',
  '04:26:65': 'Apple',
  '04:48:9A': 'Apple',
  '04:52:F3': 'Apple',
  '04:54:53': 'Apple',
  '04:69:F8': 'Apple',
  '04:D3:CF': 'Apple',
  '04:DB:56': 'Apple',
  '04:E5:36': 'Apple',
  '04:F1:3E': 'Apple',
  '04:F7:E4': 'Apple',
  '00:0A:27': 'Apple',
  '00:0A:95': 'Apple',
  '00:0B:E5': 'Apple',
  '00:0E:07': 'Apple',
  '00:0E:C2': 'Apple',
  '00:0F:7F': 'Apple',
  '00:10:FA': 'Apple',
  '00:11:24': 'Apple',
  '00:12:F0': 'Apple',
  '00:13:E8': 'Intel',
  '00:15:00': 'Intel',
  '00:15:17': 'Intel',
  '00:16:6F': 'Intel',
  '00:16:76': 'Intel',
  '00:16:EA': 'Intel',
  '00:16:EB': 'Intel',
  '00:17:35': 'Intel',
  '00:18:DE': 'Intel',
  '00:19:D1': 'Intel',
  '00:19:D2': 'Intel',
  '00:1B:21': 'Intel',
  '00:1B:77': 'Intel',
  '00:1C:BF': 'Intel',
  '00:1C:C0': 'Intel',
  '00:1D:E0': 'Intel',
  '00:1D:E1': 'Intel',
  '00:1E:64': 'Intel',
  '00:1E:65': 'Intel',
  '00:1E:67': 'Intel',
  '00:1F:3B': 'Intel',
  '00:1F:3C': 'Intel',
  '00:20:E0': 'Intel',
  '00:21:5C': 'Intel',
  '00:21:5D': 'Intel',
  '00:22:FA': 'Intel',
  '00:22:FB': 'Intel',
  '00:23:14': 'Intel',
  '00:23:15': 'Intel',
  '00:24:D6': 'Intel',
  '00:24:D7': 'Intel',
  '00:26:C6': 'Intel',
  '00:26:C7': 'Intel',
  '00:27:10': 'Intel',
  '00:02:B3': 'Intel',
  '00:00:E2': 'Intel',
  '00:01:36': 'Intel',
  '00:01:37': 'Intel',
  '00:01:38': 'Intel',
  '00:01:39': 'Intel',
  '00:01:3A': 'Intel',
  '00:01:3B': 'Intel',
  '00:01:3C': 'Intel',
  '00:01:3D': 'Intel',
  '00:01:3E': 'Intel',
  '00:01:3F': 'Intel',
  '00:01:40': 'Intel',
  '00:01:41': 'Intel',
  '00:01:42': 'Intel',
  '00:01:43': 'Intel',
  '00:01:44': 'Intel',
  '00:01:45': 'Intel',
  '00:01:46': 'Intel',
  '00:01:47': 'Intel',
  '00:01:48': 'Intel',
  '00:01:49': 'Intel',
  '00:01:4A': 'Intel',
  '00:01:4B': 'Intel',
  '00:01:4C': 'Intel',
  '00:01:4D': 'Intel',
  '00:01:4E': 'Intel',
  '00:01:4F': 'Intel',
  '00:01:50': 'Intel',
  '00:01:51': 'Intel',
  '00:01:52': 'Intel',
  '00:01:53': 'Intel',
  '00:01:54': 'Intel',
  '00:01:55': 'Intel',
  '00:01:56': 'Intel',
  '00:01:57': 'Intel',
  '00:01:58': 'Intel',
  '00:01:59': 'Intel',
  '00:01:5A': 'Intel',
  '00:01:5B': 'Intel',
  '00:01:5C': 'Intel',
  '00:01:5D': 'Intel',
  '00:01:5E': 'Intel',
  '00:01:5F': 'Intel',
  '00:01:60': 'Intel',
  '00:01:61': 'Intel',
  '00:01:62': 'Intel',
  '00:01:63': 'Intel',
  '00:01:64': 'Intel',
  '00:01:65': 'Intel',
  '00:01:66': 'Intel',
  '00:01:67': 'Intel',
  '00:01:68': 'Intel',
  '00:01:69': 'Intel',
  '00:01:6A': 'Intel',
  '00:01:6B': 'Intel',
  '00:01:6C': 'Intel',
  '00:01:6D': 'Intel',
  '00:01:6E': 'Intel',
  '00:01:6F': 'Intel',
  '00:01:70': 'Intel',
};

export default function MacAddressLookupPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ mac: string; vendor: string } | null>(null);

  const lookup = useCallback(() => {
    const mac = input.trim().toUpperCase().replace(/[:-]/g, ':').slice(0, 17);
    if (!mac || mac.length < 8) {
      message.error('请输入有效的MAC地址');
      return;
    }
    const prefix = mac.slice(0, 8);
    const vendor = MAC_VENDORS[prefix] || '未知厂商';
    setResult({ mac, vendor });
    message.success('查询成功');
  }, [input]);

  const handleCopy = () => {
    if (result) {
      copy(result.vendor);
      message.success('复制成功');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  const _isValidMac = (mac: string) => {
    return /^[0-9A-F]{2}[:-][0-9A-F]{2}[:-][0-9A-F]{2}/i.test(mac);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔍 MAC地址查询</h1>
        <p className="text-gray-600">查询网卡MAC地址对应的厂商信息</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">📝 输入MAC地址</span>
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例如: 00:1A:2B:3C:4D:5E 或 00-1A-2B-3C-4D-5E"
            size="large"
            className="text-lg font-mono"
            onPressEnter={lookup}
          />
          <Button type="primary" size="large" onClick={lookup}>
            查询
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          支持多种格式: XX:XX:XX:XX:XX:XX 或 XX-XX-XX-XX-XX-XX
        </p>
      </div>

      <Button block onClick={handleClear} className="mb-4">
        清空
      </Button>

      {result && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <span className="font-semibold text-gray-800 block mb-4">📋 查询结果</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">MAC地址</div>
              <div className="text-xl font-mono font-bold text-blue-600">{result.mac}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">厂商</div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-green-600">{result.vendor}</span>
                <Button onClick={handleCopy}>复制</Button>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <span className="text-sm text-yellow-800">前缀: {result.mac.slice(0, 8)}</span>
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• MAC地址是网卡的唯一标识符</li>
          <li>• 前6位(24位)为OUI，代表厂商标识</li>
          <li>• 本工具可查询主流厂商的MAC前缀</li>
          <li>• 未知厂商可能是较新或小众的厂商</li>
        </ul>
      </div>
    </div>
  );
}
