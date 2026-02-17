'use client';
import { Button, Input, message, Select, Space } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const { TextArea } = Input;

const parseInput = (text: string, format: string) => {
  switch (format) {
    case 'json':
      return JSON.parse(text);
    case 'csv':
      return text.split(',').map((s) => s.trim());
    case 'tsv':
      return text.split('\t').map((s) => s.trim());
    case 'array':
      return text
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
    default:
      return text;
  }
};

const formatOutput = (data: unknown, format: string) => {
  switch (format) {
    case 'json':
      return JSON.stringify(data, null, 2);
    case 'csv':
      return Array.isArray(data) ? data.join(', ') : '';
    case 'tsv':
      return Array.isArray(data) ? data.join('\t') : '';
    case 'array':
      return Array.isArray(data) ? data.join('\n') : '';
    default:
      return String(data);
  }
};

export default function ListConverterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [inputFormat, setInputFormat] = useState<'json' | 'csv' | 'tsv' | 'array'>('array');
  const [outputFormat, setOutputFormat] = useState<'json' | 'csv' | 'tsv' | 'array'>('json');
  const [loading, setLoading] = useState(false);

  const handleConvert = useCallback(() => {
    try {
      if (!input) {
        message.error('请输入内容');
        return;
      }
      setLoading(true);
      const parsed = parseInput(input, inputFormat);
      const result = formatOutput(parsed, outputFormat);
      setOutput(result);
      message.success('转换成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '转换失败');
    } finally {
      setLoading(false);
    }
  }, [input, inputFormat, outputFormat]);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📋 列表转换工具</h1>
        <p className="text-gray-600">数组、CSV、TSV、JSON 格式互转</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📝 输入格式</span>
            <Select
              value={inputFormat}
              onChange={setInputFormat}
              options={[
                { value: 'array', label: '数组 (换行分隔)' },
                { value: 'json', label: 'JSON' },
                { value: 'csv', label: 'CSV' },
                { value: 'tsv', label: 'TSV' },
              ]}
              style={{ width: 150 }}
            />
          </div>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="请输入列表数据..."
            className="font-mono text-sm"
            rows={6}
          />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📝 输出格式</span>
            <Select
              value={outputFormat}
              onChange={setOutputFormat}
              options={[
                { value: 'json', label: 'JSON' },
                { value: 'array', label: '数组 (换行分隔)' },
                { value: 'csv', label: 'CSV' },
                { value: 'tsv', label: 'TSV' },
              ]}
              style={{ width: 150 }}
            />
          </div>
          <TextArea
            value={output}
            readOnly
            placeholder="转换结果..."
            className="font-mono text-sm"
            rows={6}
          />
        </div>
      </div>

      <Space className="w-full mb-4">
        <Button
          type="primary"
          size="large"
          onClick={handleConvert}
          loading={loading}
          className="flex-1"
        >
          🚀 开始转换
        </Button>
        <Button size="large" onClick={handleCopy} disabled={!output}>
          📋 复制
        </Button>
        <Button size="large" onClick={handleClear}>
          🗑️ 清空
        </Button>
      </Space>

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 支持 JSON 数组、CSV（逗号分隔）、TSV（制表符分隔）、数组（换行分隔）之间的转换</li>
          <li>• 输入格式和输出格式可以相同也可以不同</li>
          <li>• JSON 格式输入必须是有效的数组格式，如 [1,2,3] 或 ["a","b","c"]</li>
        </ul>
      </div>
    </div>
  );
}
