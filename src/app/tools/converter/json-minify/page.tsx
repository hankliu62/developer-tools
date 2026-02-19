'use client';

import { Button, Input, message, Space, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const { TextArea } = Input;

export default function JsonMinifyPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [removeNulls, setRemoveNulls] = useState(false);
  const [removeBooleans, setRemoveBooleans] = useState(false);

  const minify = useCallback(() => {
    if (!input.trim()) {
      message.error('请输入JSON内容');
      return;
    }
    try {
      let parsed = JSON.parse(input);

      if (removeNulls) {
        const removeEmpty = (obj: unknown): unknown => {
          if (Array.isArray(obj)) {
            return obj.map(removeEmpty).filter((v) => v !== undefined);
          }
          if (obj && typeof obj === 'object') {
            return Object.fromEntries(
              Object.entries(obj)
                .map(([k, v]) => [k, removeEmpty(v)])
                .filter(([, v]) => v !== undefined)
            );
          }
          return obj;
        };
        parsed = removeEmpty(parsed);
      }

      if (removeBooleans) {
        const removeBools = (obj: unknown): unknown => {
          if (Array.isArray(obj)) {
            return obj.map(removeBools).filter((v) => v !== undefined && typeof v !== 'boolean');
          }
          if (obj && typeof obj === 'object') {
            return Object.fromEntries(
              Object.entries(obj)
                .map(([k, v]) => [k, removeBools(v)])
                .filter(([, v]) => v !== undefined && typeof v !== 'boolean')
            );
          }
          return obj;
        };
        parsed = removeBools(parsed);
      }

      setOutput(JSON.stringify(parsed));
      message.success('JSON压缩成功');
    } catch (_e) {
      message.error('JSON格式不正确');
    }
  }, [input, removeNulls, removeBooleans]);

  const format = useCallback(() => {
    if (!output) return;
    try {
      const parsed = JSON.parse(output);
      setOutput(JSON.stringify(parsed, null, 2));
      message.success('格式化成功');
    } catch {
      message.error('格式化失败');
    }
  }, [output]);

  const handleCopy = useCallback(() => {
    copy(output);
    message.success('复制成功');
  }, [output]);

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📦 JSON 压缩</h1>
        <p className="text-gray-600">压缩JSON，移除空白和可选字段</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-gray-800">📝 JSON 输入</span>
          <Button size="small" onClick={handleClear}>
            清空
          </Button>
        </div>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"key": "value"}'
          className="font-mono text-sm"
          rows={10}
        />
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">⚙️ 压缩选项</span>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <Switch checked={removeNulls} onChange={setRemoveNulls} />
            <span className="text-sm text-gray-600">移除 null 值</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <Switch checked={removeBooleans} onChange={setRemoveBooleans} />
            <span className="text-sm text-gray-600">移除布尔值</span>
          </label>
        </div>
      </div>

      <Space className="w-full mb-4">
        <Button
          type="primary"
          size="large"
          onClick={minify}
          disabled={!input}
          className="flex-1 h-12 text-base font-medium"
        >
          🚀 压缩 JSON
        </Button>
        <Button size="large" onClick={format} disabled={!output}>
          格式化
        </Button>
      </Space>

      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📋 压缩结果</span>
            <Space>
              <Button onClick={handleCopy}>📋 复制</Button>
              <span className="text-xs text-gray-500">大小: {new Blob([output]).size} bytes</span>
            </Space>
          </div>
          <TextArea value={output} readOnly className="font-mono text-sm bg-gray-50" rows={10} />
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• JSON压缩会移除所有空格、缩进和换行</li>
          <li>• 移除null值会同时移除该键值对</li>
          <li>• 适用于API请求body优化</li>
          <li>• 压缩后可用于减少网络传输</li>
        </ul>
      </div>
    </div>
  );
}
