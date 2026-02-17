'use client';
import { Button, message, Slider } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';
import { generateUUID } from '@/tools/crypto';

export default function UUIDGeneratorPage() {
  const [output, setOutput] = useState('');
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [withHyphen, setWithHyphen] = useState(true);

  const handleGenerate = useCallback(() => {
    try {
      setLoading(true);
      const uuids: string[] = [];
      for (let i = 0; i < count; i++) {
        let uuid = generateUUID();
        if (!withHyphen) {
          uuid = uuid.replace(/-/g, '');
        }
        if (uppercase) {
          uuid = uuid.toUpperCase();
        }
        uuids.push(uuid);
      }
      setOutput(uuids.join('\n'));
      message.success(`成功生成 ${count} 个 UUID`);
    } catch (error) {
      message.error(error instanceof Error ? error.message : '生成失败');
    } finally {
      setLoading(false);
    }
  }, [count, uppercase, withHyphen]);

  const handleCopy = () => {
    if (output) {
      copy(output);
      message.success('复制成功');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🆔 UUID 生成器</h1>
        <p className="text-gray-600">生成符合 RFC 4122 标准的 UUID</p>
      </div>

      {/* Options */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <label className="font-semibold text-gray-800 block mb-4">⚙️ 生成选项</label>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">生成数量</span>
            <span className="text-sm text-gray-500">{count} 个</span>
          </div>
          <Slider
            min={1}
            max={100}
            value={count}
            onChange={setCount}
            marks={{ 1: '1', 10: '10', 50: '50', 100: '100' }}
          />
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="uppercase"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="uppercase" className="text-sm text-gray-700">
              大写
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="hyphen"
              checked={withHyphen}
              onChange={(e) => setWithHyphen(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="hyphen" className="text-sm text-gray-700">
              带连字符
            </label>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <Button
        type="primary"
        size="large"
        block
        onClick={handleGenerate}
        loading={loading}
        className="h-12 text-base font-medium mb-4"
      >
        🎲 生成 UUID
      </Button>

      {/* Output */}
      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="font-semibold text-gray-800">📋 生成结果</label>
            <Button onClick={handleCopy}>📋 复制全部</Button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto">
            <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 UUID 版本</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 生成的 UUID 基于随机数 (v4)</li>
          <li>• 标准格式：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</li>
          <li>• 常用于数据库主键、分布式系统 ID 等</li>
        </ul>
      </div>
    </div>
  );
}
