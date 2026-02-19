'use client';
import { Button, Input, message, Radio, Select, Space, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

type Separator = ':' | '-' | '.' | 'none';
type CaseType = 'upper' | 'lower';

const randomByte = (): number => Math.floor(Math.random() * 256);

export default function MacAddressGeneratorPage() {
  const [count, setCount] = useState(1);
  const [separator, setSeparator] = useState<Separator>(':');
  const [caseType, setCaseType] = useState<CaseType>('upper');
  const [prefix, setPrefix] = useState('');
  const [unicast, setUnicast] = useState(true);
  const [results, setResults] = useState<string[]>([]);

  const generate = useCallback(() => {
    try {
      const addresses: string[] = [];
      const prefixBytes: number[] = [];
      if (prefix.trim()) {
        const parts = prefix
          .trim()
          .replace(/[:-]/g, ' ')
          .split(/\s+/)
          .map((p) => parseInt(p, 16));
        if (parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) {
          message.error('前缀格式无效');
          return;
        }
        prefixBytes.push(...parts);
      }

      for (let i = 0; i < count; i++) {
        const bytes: number[] = [...prefixBytes];
        while (bytes.length < 6) {
          bytes.push(randomByte());
        }
        if (unicast) {
          bytes[0] = bytes[0] & 0xfe;
        }
        bytes[0] = bytes[0] & 0xfd;

        let hex = bytes.map((b) => b.toString(16).padStart(2, '0'));
        if (caseType === 'upper') hex = hex.map((h) => h.toUpperCase());

        let formatted: string;
        switch (separator) {
          case ':':
            formatted = hex.join(':');
            break;
          case '-':
            formatted = hex.join('-');
            break;
          case '.':
            formatted = `${hex[0]}${hex[1]}.${hex[2]}${hex[3]}.${hex[4]}${hex[5]}`;
            break;
          case 'none':
            formatted = hex.join('');
            break;
          default:
            formatted = hex.join(':');
        }
        addresses.push(formatted);
      }
      setResults(addresses);
      message.success(`已生成 ${count} 个 MAC 地址`);
    } catch {
      message.error('生成失败');
    }
  }, [count, separator, caseType, prefix, unicast]);

  const handleCopy = (text: string) => {
    copy(text);
    message.success('已复制');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔗 MAC 地址生成器</h1>
        <p className="text-gray-600">生成随机的 MAC 地址，支持自定义格式和前缀</p>
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
            <label className="text-sm text-gray-500 block mb-1">自定义前缀 (可选)</label>
            <Input
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder="例如: 00:1A:2B"
              size="large"
              className="font-mono"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">分隔符</label>
            <Select
              value={separator}
              onChange={setSeparator}
              className="w-full"
              size="large"
              options={[
                { value: ':', label: '冒号 (:)' },
                { value: '-', label: '连字符 (-)' },
                { value: '.', label: '点号 (.)' },
                { value: 'none', label: '无分隔符' },
              ]}
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">大小写</label>
            <Radio.Group value={caseType} onChange={(e) => setCaseType(e.target.value)}>
              <Radio.Button value="upper">大写</Radio.Button>
              <Radio.Button value="lower">小写</Radio.Button>
            </Radio.Group>
          </div>
          <div>
            <label className="text-sm text-gray-500 block mb-1">单播地址</label>
            <div className="pt-1">
              <Switch checked={unicast} onChange={setUnicast} />
              <span className="ml-2 text-gray-600">{unicast ? '仅单播' : '允许多播'}</span>
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
          <Button
            size="large"
            onClick={() => {
              copy(results.join('\n'));
              message.success('已复制全部');
            }}
          >
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
          <li>• MAC 地址共 6 字节（48 位），通常以十六进制表示</li>
          <li>• 第一字节最低位为 0 表示单播，1 表示多播</li>
          <li>• 第一字节次低位为 0 表示全局管理，1 表示本地管理</li>
          <li>• 自定义前缀可模拟特定厂商的 MAC 地址</li>
          <li>• 生成的地址默认为本地管理的单播地址</li>
        </ul>
      </div>
    </div>
  );
}
