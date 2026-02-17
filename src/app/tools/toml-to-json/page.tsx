'use client';
import { Button, Card, Input, message } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';
import toml from 'toml';

export default function TomlToJsonPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [indent, setIndent] = useState(2);

  const handleConvert = useCallback(() => {
    try {
      if (!input.trim()) {
        message.error('请输入 TOML 内容');
        return;
      }
      setLoading(true);
      const parsed = toml.parse(input);
      const json = JSON.stringify(parsed, null, indent);
      setOutput(json);
      message.success('转换成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'TOML 解析失败');
    } finally {
      setLoading(false);
    }
  }, [input, indent]);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📝 TOML → JSON</h1>
        <p className="text-gray-600">将 TOML 转换为 JSON 格式</p>
      </div>

      <Card className="mb-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-medium text-gray-700">输入 TOML</span>
          <div className="flex gap-2">
            <Button size="small" onClick={handleClear}>
              清空
            </Button>
          </div>
        </div>
        <Input.TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入 TOML 内容..."
          className="font-mono text-sm"
          rows={10}
        />
      </Card>

      <Card className="mb-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-medium text-gray-700">缩进</span>
          <div className="flex gap-2">
            {[2, 4, 1].map((n) => (
              <Button
                key={n}
                size="small"
                type={indent === n ? 'primary' : 'default'}
                onClick={() => setIndent(n)}
              >
                {n} 空格
              </Button>
            ))}
          </div>
        </div>
        <Button type="primary" block onClick={handleConvert} loading={loading}>
          转换为 JSON
        </Button>
      </Card>

      {output && (
        <Card className="mb-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-medium text-gray-700">输出 JSON</span>
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
          <li>• TOML (Tom's Obvious Minimal Language) 是一种轻量级配置文件格式</li>
          <li>• 常用于 Python 项目的配置文件 (pyproject.toml)</li>
          <li>• 支持多种数据类型：字符串、整数、浮点数、布尔值、数组、表</li>
        </ul>
      </Card>
    </div>
  );
}
