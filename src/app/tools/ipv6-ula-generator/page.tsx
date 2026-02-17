'use client';
import { Button, Input, message, Space, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const randomHex = (len: number): string => {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += chars[Math.floor(Math.random() * 16)];
  }
  return result;
};

export default function IPv6UlaGeneratorPage() {
  const [count, setCount] = useState(1);
  const [includeSubnet, setIncludeSubnet] = useState(true);
  const [results, setResults] = useState<string[]>([]);

  const generate = useCallback(() => {
    try {
      const addresses: string[] = [];
      for (let i = 0; i < count; i++) {
        const globalId = randomHex(10);
        const subnetId = includeSubnet ? randomHex(4) : '0000';
        const prefix = `fd${globalId.slice(0, 2)}:${globalId.slice(2, 6)}:${globalId.slice(6, 10)}`;
        const full = `${prefix}:${subnetId}::/64`;
        addresses.push(full);
      }
      setResults(addresses);
      message.success(`已生成 ${count} 个 ULA 地址`);
    } catch {
      message.error('生成失败');
    }
  }, [count, includeSubnet]);

  const handleCopy = (text: string) => {
    copy(text);
    message.success('已复制');
  };

  const handleCopyAll = () => {
    copy(results.join('\n'));
    message.success('已复制全部');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🌍 IPv6 ULA 生成器</h1>
        <p className="text-gray-600">生成随机的 IPv6 唯一本地地址（Unique Local Address）</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-3">⚙️ 生成选项</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1">生成数量</label>
            <Input
              type="number"
              value={count}
              onChange={(e) =>
                setCount(Math.max(1, Math.min(100, parseInt(e.target.value, 10) || 1)))
              }
              min={1}
              max={100}
              size="large"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">随机子网 ID</label>
            <div className="pt-2">
              <Switch checked={includeSubnet} onChange={setIncludeSubnet} />
              <span className="ml-2 text-gray-600">{includeSubnet ? '随机生成' : '使用 0000'}</span>
            </div>
          </div>
        </div>
      </div>

      <Space className="w-full mb-4">
        <Button type="primary" size="large" onClick={generate}>
          🚀 生成
        </Button>
        <Button size="large" onClick={() => setResults([])}>
          🗑️ 清空
        </Button>
        {results.length > 0 && (
          <Button size="large" onClick={handleCopyAll}>
            📋 复制全部
          </Button>
        )}
      </Space>

      {results.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <span className="font-semibold text-gray-800 block mb-4">📊 生成结果</span>
          <div className="space-y-2">
            {results.map((addr, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                <span className="font-mono text-blue-600">{addr}</span>
                <Button size="small" onClick={() => handleCopy(addr)}>
                  复制
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• ULA 前缀为 fd00::/8，类似 IPv4 的私有地址</li>
          <li>• 40 位 Global ID 随机生成，确保唯一性</li>
          <li>• 16 位 Subnet ID 用于内部子网划分</li>
          <li>• ULA 地址仅用于本地通信，不可路由到公网</li>
          <li>• 适用于内部网络、VPN、实验环境</li>
        </ul>
      </div>
    </div>
  );
}
