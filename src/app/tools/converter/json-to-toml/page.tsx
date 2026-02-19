'use client';
import { Button, Card, Input, message } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

function stringifyToml(obj: unknown, prefix = ''): string {
  if (obj === null || obj === undefined) return '';
  if (typeof obj === 'string') return `"${obj}"`;
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    const items = obj.map((item) => stringifyToml(item)).join(', ');
    return `[${items}]`;
  }
  if (typeof obj === 'object') {
    const lines: string[] = [];
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (value === null || value === undefined) continue;
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        lines.push(`[${prefix}${key}]`);
        lines.push(stringifyToml(value, `${prefix}${key}.`));
      } else if (Array.isArray(value)) {
        lines.push(`${prefix}${key} = ${stringifyToml(value)}`);
      } else {
        lines.push(`${prefix}${key} = ${stringifyToml(value)}`);
      }
    }
    return lines.join('\n');
  }
  return String(obj);
}

export default function JsonToTomlPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConvert = useCallback(() => {
    try {
      if (!input.trim()) {
        message.error('请输入 JSON 内容');
        return;
      }
      setLoading(true);
      const parsed = JSON.parse(input);
      const tomlStr = stringifyToml(parsed);
      setOutput(tomlStr);
      message.success('转换成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'JSON 解析失败');
    } finally {
      setLoading(false);
    }
  }, [input]);

  const handleCopy = () => {
    if (output) {
      copy(output);
      message.success('复制成功');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📄 JSON → TOML</h1>
        <p className="text-gray-600">将 JSON 转换为 TOML 格式</p>
      </div>

      <Card className="mb-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-medium text-gray-700">输入 JSON</span>
          <Button size="small" onClick={handleClear}>
            清空
          </Button>
        </div>
        <Input.TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name": "example", "version": "1.0.0", "features": ["feature1", "feature2"]}'
          className="font-mono text-sm"
          rows={10}
        />
      </Card>

      <Button
        type="primary"
        block
        size="large"
        onClick={handleConvert}
        loading={loading}
        className="mb-4"
      >
        转换为 TOML
      </Button>

      {output && (
        <Card className="mb-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-medium text-gray-700">输出 TOML</span>
            <Button onClick={handleCopy}>复制</Button>
          </div>
          <Input.TextArea
            value={output}
            readOnly
            className="font-mono text-sm bg-gray-50"
            rows={15}
          />
        </Card>
      )}

      <Card>
        <h3 className="font-medium text-gray-700 mb-2">💡 使用提示</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• JSON 对象将转换为 TOML 表</li>
          <li>• 数组将转换为 TOML 数组</li>
          <li>• 嵌套对象会创建嵌套的 TOML 表</li>
        </ul>
      </Card>
    </div>
  );
}
