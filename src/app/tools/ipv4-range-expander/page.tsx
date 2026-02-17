'use client';
import { Button, Input, message, Space } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const ipToNum = (ip: string): number => {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) {
    throw new Error(`无效的 IPv4 地址: ${ip}`);
  }
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
};

const numToIp = (num: number): string => {
  return [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.');
};

const rangeToCidrs = (start: number, end: number): string[] => {
  const cidrs: string[] = [];
  let current = start;
  while (current <= end) {
    let maxBits = 32;
    while (maxBits > 0) {
      const mask = maxBits === 32 ? 0 : ((0xffffffff >>> maxBits) << 0) >>> 0;
      const network = (current & ~(mask >>> 0)) >>> 0;
      const broadcast = (current | mask) >>> 0;
      if (network === current && broadcast <= end) {
        break;
      }
      maxBits++;
    }
    cidrs.push(`${numToIp(current)}/${maxBits}`);
    const hostBits = 32 - maxBits;
    current = (current + (1 << hostBits)) >>> 0;
  }
  return cidrs;
};

export default function IPv4RangeExpanderPage() {
  const [startIp, setStartIp] = useState('192.168.1.1');
  const [endIp, setEndIp] = useState('192.168.1.10');
  const [result, setResult] = useState<{
    addresses: string[];
    count: number;
    cidrs: string[];
  } | null>(null);

  const expand = useCallback(() => {
    try {
      const start = ipToNum(startIp.trim());
      const end = ipToNum(endIp.trim());
      if (start > end) {
        message.error('起始地址必须小于等于结束地址');
        return;
      }
      const count = end - start + 1;
      if (count > 1024) {
        const addresses: string[] = [];
        for (let i = 0; i < 10; i++) addresses.push(numToIp(start + i));
        addresses.push('...');
        for (let i = count - 10; i < count; i++) addresses.push(numToIp(start + i));
        setResult({ addresses, count, cidrs: rangeToCidrs(start, end) });
      } else {
        const addresses: string[] = [];
        for (let i = 0; i < count; i++) {
          addresses.push(numToIp(start + i));
        }
        setResult({ addresses, count, cidrs: rangeToCidrs(start, end) });
      }
      message.success('扩展成功');
    } catch (e: any) {
      message.error(e.message || '扩展失败');
    }
  }, [startIp, endIp]);

  const handleCopy = () => {
    if (result) {
      copy(result.addresses.join('\n'));
      message.success('已复制');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📐 IPv4 范围扩展器</h1>
        <p className="text-gray-600">将 IPv4 地址范围展开为完整地址列表和 CIDR 表示</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-3">📍 地址范围</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500 block mb-1">起始地址</label>
            <Input
              value={startIp}
              onChange={(e) => setStartIp(e.target.value)}
              placeholder="192.168.1.1"
              size="large"
              className="font-mono"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">结束地址</label>
            <Input
              value={endIp}
              onChange={(e) => setEndIp(e.target.value)}
              placeholder="192.168.1.10"
              size="large"
              className="font-mono"
            />
          </div>
        </div>
      </div>

      <Space className="w-full mb-4">
        <Button type="primary" size="large" onClick={expand}>
          🚀 扩展范围
        </Button>
        <Button
          size="large"
          onClick={() => {
            setStartIp('192.168.1.1');
            setEndIp('192.168.1.10');
            setResult(null);
          }}
        >
          🗑️ 重置
        </Button>
      </Space>

      {result && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-gray-800">
              📊 扩展结果（共 {result.count} 个地址）
            </span>
            <Button onClick={handleCopy}>复制全部</Button>
          </div>

          {result.cidrs.length > 0 && (
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-2">CIDR 表示</div>
              <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm text-purple-600 space-y-1">
                {result.cidrs.map((cidr, i) => (
                  <div key={i}>{cidr}</div>
                ))}
              </div>
            </div>
          )}

          <div className="text-sm text-gray-500 mb-2">地址列表</div>
          <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm max-h-96 overflow-y-auto space-y-1">
            {result.addresses.map((addr, i) => (
              <div
                key={i}
                className={addr === '...' ? 'text-gray-400 text-center' : 'text-blue-600'}
              >
                {addr}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 输入起始和结束 IPv4 地址，展开为完整列表</li>
          <li>• 自动计算最优 CIDR 表示</li>
          <li>• 超过 1024 个地址时，仅显示前后各 10 个</li>
          <li>• 适用于防火墙规则、ACL 配置等场景</li>
        </ul>
      </div>
    </div>
  );
}
