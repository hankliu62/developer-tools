'use client';
import { Button, Card, Input, message, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { XMLParser } from 'fast-xml-parser';
import { useCallback, useState } from 'react';

export default function XmlToJsonPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ignoreAttributes, setIgnoreAttributes] = useState(false);
  const [parseTagValue, setParseTagValue] = useState(true);

  const handleConvert = useCallback(() => {
    try {
      if (!input.trim()) {
        message.error('请输入 XML 内容');
        return;
      }
      setLoading(true);

      const parser = new XMLParser({
        ignoreAttributes: ignoreAttributes,
        parseTagValue: parseTagValue,
        trimValues: true,
      });

      const parsed = parser.parse(input);
      const json = JSON.stringify(parsed, null, 2);
      setOutput(json);
      message.success('转换成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'XML 解析失败');
    } finally {
      setLoading(false);
    }
  }, [input, ignoreAttributes, parseTagValue]);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📄 XML → JSON</h1>
        <p className="text-gray-600">将 XML 转换为 JSON 格式</p>
      </div>

      <Card className="mb-4">
        <div className="mb-4 flex items-center justify-between">
          <label className="font-medium text-gray-700">输入 XML</label>
          <Button size="small" onClick={handleClear}>
            清空
          </Button>
        </div>
        <Input.TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='<?xml version="1.0"?><root><item>Hello</item></root>'
          className="font-mono text-sm"
          rows={8}
        />
      </Card>

      <Card className="mb-4">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Switch checked={ignoreAttributes} onChange={setIgnoreAttributes} />
            <span className="text-sm text-gray-700">忽略属性</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={parseTagValue} onChange={setParseTagValue} />
            <span className="text-sm text-gray-700">解析标签值</span>
          </div>
        </div>
      </Card>

      <Button
        type="primary"
        block
        size="large"
        onClick={handleConvert}
        loading={loading}
        className="mb-4"
      >
        转换为 JSON
      </Button>

      {output && (
        <Card className="mb-4">
          <div className="mb-3 flex items-center justify-between">
            <label className="font-medium text-gray-700">输出 JSON</label>
            <Button onClick={handleCopy}>复制</Button>
          </div>
          <Input.TextArea
            value={output}
            readOnly
            className="font-mono text-sm bg-gray-50"
            rows={12}
          />
        </Card>
      )}

      <Card>
        <h3 className="font-medium text-gray-700 mb-2">💡 使用提示</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• XML (eXtensible Markup Language) 是一种标记语言</li>
          <li>• 常用于配置文件、API 响应、数据交换</li>
          <li>• "忽略属性" 选项可控制是否解析 XML 属性</li>
        </ul>
      </Card>
    </div>
  );
}
