'use client';
import { Button, Checkbox, InputNumber, message } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const COMMON_PORTS = [
  20, 21, 22, 23, 25, 53, 80, 110, 119, 123, 135, 139, 143, 161, 194, 443, 445, 465, 514, 515, 587,
  993, 995, 1433, 1521, 3306, 3389, 5432, 5900, 6379, 8080, 8443, 27017,
];

const REGISTERED_PORTS = Array.from({ length: 1024 }, (_, i) => i + 1);

export default function RandomPortGeneratorPage() {
  const [count, setCount] = useState(1);
  const [portRange, setPortRange] = useState<[number, number]>([1, 65535]);
  const [excludeCommon, setExcludeCommon] = useState(true);
  const [excludeRegistered, setExcludeRegistered] = useState(false);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const generateRandomPort = useCallback(
    (min: number, max: number, excludeList: number[]): number => {
      let attempts = 0;
      let port: number;
      do {
        port = Math.floor(Math.random() * (max - min + 1)) + min;
        attempts++;
        if (attempts > 1000) break;
      } while (excludeList.includes(port));
      return port;
    },
    []
  );

  const handleGenerate = useCallback(() => {
    try {
      setLoading(true);
      const excludeList: number[] = [];

      if (excludeCommon) {
        excludeList.push(...COMMON_PORTS);
      }
      if (excludeRegistered) {
        excludeList.push(...REGISTERED_PORTS);
      }

      const ports: number[] = [];
      for (let i = 0; i < count; i++) {
        const port = generateRandomPort(portRange[0], portRange[1], excludeList);
        if (!ports.includes(port)) {
          ports.push(port);
        }
      }

      ports.sort((a, b) => a - b);
      setOutput(ports.join('\n'));
      message.success(`成功生成 ${ports.length} 个端口`);
    } catch (error) {
      message.error(error instanceof Error ? error.message : '生成失败');
    } finally {
      setLoading(false);
    }
  }, [count, portRange, excludeCommon, excludeRegistered, generateRandomPort]);

  const handleCopy = () => {
    if (output) {
      copy(output);
      message.success('复制成功');
    }
  };

  const handleCopyAsJson = () => {
    if (output) {
      const ports = output.split('\n').map(Number);
      copy(JSON.stringify(ports));
      message.success('JSON 格式复制成功');
    }
  };

  const handleCopyAsArray = () => {
    if (output) {
      const ports = output.split('\n').map(Number);
      copy(`[${ports.join(', ')}]`);
      message.success('数组格式复制成功');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔢 随机端口生成</h1>
        <p className="text-gray-600">生成随机可用端口号</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <label className="font-semibold text-gray-800 block mb-4">⚙️ 生成选项</label>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">生成数量</span>
            <span className="text-sm text-gray-500">{count} 个</span>
          </div>
          <InputNumber
            min={1}
            max={100}
            value={count}
            onChange={(value) => setCount(value || 1)}
            className="w-full"
            size="large"
          />
        </div>

        <div className="mb-6">
          <span className="text-sm text-gray-700 block mb-2">端口范围</span>
          <div className="flex gap-4">
            <InputNumber
              min={1}
              max={65535}
              value={portRange[0]}
              onChange={(value) => setPortRange([value || 1, portRange[1]])}
              className="flex-1"
              size="large"
              placeholder="最小"
            />
            <span className="flex items-center text-gray-500">-</span>
            <InputNumber
              min={1}
              max={65535}
              value={portRange[1]}
              onChange={(value) => setPortRange([portRange[0], value || 65535])}
              className="flex-1"
              size="large"
              placeholder="最大"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Checkbox checked={excludeCommon} onChange={(e) => setExcludeCommon(e.target.checked)}>
            <span className="text-sm text-gray-700">
              排除常用端口 (20, 21, 22, 80, 443 等 {COMMON_PORTS.length} 个)
            </span>
          </Checkbox>
          <Checkbox
            checked={excludeRegistered}
            onChange={(e) => setExcludeRegistered(e.target.checked)}
          >
            <span className="text-sm text-gray-700">排除注册端口 (0-1023)</span>
          </Checkbox>
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
        🎲 生成端口
      </Button>

      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="font-semibold text-gray-800">📋 生成结果</label>
            <div className="flex gap-2">
              <Button size="small" onClick={handleCopy}>
                复制
              </Button>
              <Button size="small" onClick={handleCopyAsJson}>
                JSON
              </Button>
              <Button size="small" onClick={handleCopyAsArray}>
                数组
              </Button>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
            <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 端口知识</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 端口范围：1-65535</li>
          <li>• 0-1023：系统端口（需要管理员权限）</li>
          <li>• 1024-49151：注册端口（分配给特定服务）</li>
          <li>• 49152-65535：动态/私有端口（可自由使用）</li>
        </ul>
      </div>
    </div>
  );
}
