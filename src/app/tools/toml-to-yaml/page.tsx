'use client';
import { Button, Card, Input, message } from 'antd';
import copy from 'copy-to-clipboard';
import yaml from 'js-yaml';
import { useCallback, useState } from 'react';
import toml from 'toml';

export default function TomlToYamlPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConvert = useCallback(() => {
    try {
      if (!input.trim()) {
        message.error('请输入 TOML 内容');
        return;
      }
      setLoading(true);
      const parsed = toml.parse(input);
      const yamlStr = yaml.dump(parsed, { indent: 2, lineWidth: -1 });
      setOutput(yamlStr);
      message.success('转换成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '转换失败');
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📝 TOML → YAML</h1>
        <p className="text-gray-600">将 TOML 转换为 YAML 格式</p>
      </div>

      <Card className="mb-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-medium text-gray-700">输入 TOML</span>
          <Button size="small" onClick={handleClear}>
            清空
          </Button>
        </div>
        <Input.TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入 TOML 内容..."
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
        转换为 YAML
      </Button>

      {output && (
        <Card className="mb-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-medium text-gray-700">输出 YAML</span>
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
          <li>• TOML 和 YAML 都是常用的配置文件格式</li>
          <li>• TOML 使用 = 和 [] 语法，YAML 使用缩进</li>
          <li>• YAML 更适合复杂的数据结构</li>
        </ul>
      </Card>
    </div>
  );
}
