'use client';
import { Button, message, Slider } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';
import { generateULID } from '@/tools/crypto';

export default function ULIDGeneratorPage() {
  const [output, setOutput] = useState('');
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [uppercase, setUppercase] = useState(false);

  const handleGenerate = useCallback(() => {
    try {
      setLoading(true);
      const ulids: string[] = [];
      for (let i = 0; i < count; i++) {
        let ulid = generateULID();
        if (uppercase) {
          ulid = ulid.toUpperCase();
        }
        ulids.push(ulid);
      }
      setOutput(ulids.join('\n'));
      message.success(`成功生成 ${count} 个 ULID`);
    } catch (error) {
      message.error(error instanceof Error ? error.message : '生成失败');
    } finally {
      setLoading(false);
    }
  }, [count, uppercase]);

  const handleCopy = () => {
    if (output) {
      copy(output);
      message.success('复制成功');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🆔 ULID 生成器</h1>
        <p className="text-gray-600">生成通用唯一标识符 (ULID)</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">⚙️ 生成选项</span>

        <div className="mb-6">
          <label htmlFor="count" className="text-sm text-gray-700 block mb-2">
            生成数量
          </label>
          <Slider
            id="count"
            min={1}
            max={100}
            value={count}
            onChange={setCount}
            marks={{ 1: '1', 10: '10', 50: '50', 100: '100' }}
          />
          <span className="text-sm text-gray-500 mt-1 block">{count} 个</span>
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
        </div>
      </div>

      <Button
        type="primary"
        size="large"
        block
        onClick={handleGenerate}
        loading={loading}
        className="h-12 text-base font-medium mb-4"
      >
        🎲 生成 ULID
      </Button>

      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📋 生成结果</span>
            <Button onClick={handleCopy}>📋 复制全部</Button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto">
            <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 ULID 简介</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 生成的 ULID 基于时间戳 + 随机数</li>
          <li>
            • 标准格式：{' '}
            <code className="bg-blue-100 px-1 rounded">01ARZ3NDEKTSV4RRFFQ69G5FAV</code>
          </li>
          <li>• 26 个字符，Crockford Base32 编码</li>
          <li>• 具备时间排序性，适合数据库主键</li>
        </ul>
      </div>
    </div>
  );
}
