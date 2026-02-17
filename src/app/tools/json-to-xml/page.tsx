'use client';
import { Button, Card, Input, message, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { XMLBuilder } from 'fast-xml-parser';
import { useCallback, useState } from 'react';

export default function JsonToXmlPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState(true);
  const [ignoreAttributes, setIgnoreAttributes] = useState(false);

  const handleConvert = useCallback(() => {
    try {
      if (!input.trim()) {
        message.error('请输入 JSON 内容');
        return;
      }
      setLoading(true);

      const parsed = JSON.parse(input);

      const builder = new XMLBuilder({
        ignoreAttributes: ignoreAttributes,
        format: format,
        indentBy: '  ',
        suppressEmptyNode: true,
      });

      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n${builder.build(parsed)}`;
      setOutput(xml);
      message.success('转换成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'JSON 解析失败');
    } finally {
      setLoading(false);
    }
  }, [input, ignoreAttributes, format]);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📄 JSON → XML</h1>
        <p className="text-gray-600">将 JSON 转换为 XML 格式</p>
      </div>

      <Card className="mb-4">
        <div className="mb-4 flex items-center justify-between">
          <label className="font-medium text-gray-700">输入 JSON</label>
          <Button size="small" onClick={handleClear}>
            清空
          </Button>
        </div>
        <Input.TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"root": {"item": "Hello"}}'
          className="font-mono text-sm"
          rows={8}
        />
      </Card>

      <Card className="mb-4">
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Switch checked={format} onChange={setFormat} />
            <span className="text-sm text-gray-700">格式化输出</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={ignoreAttributes} onChange={setIgnoreAttributes} />
            <span className="text-sm text-gray-700">忽略属性</span>
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
        转换为 XML
      </Button>

      {output && (
        <Card className="mb-4">
          <div className="mb-3 flex items-center justify-between">
            <label className="font-medium text-gray-700">输出 XML</label>
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
          <li>• JSON 对象将转换为 XML 元素</li>
          <li>• 数组将转换为重复的元素</li>
          <li>• 嵌套对象会创建嵌套的 XML 结构</li>
        </ul>
      </Card>
    </div>
  );
}
