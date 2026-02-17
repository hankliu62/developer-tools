'use client';

import { Button, Input, message, Select, Space, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const { TextArea } = Input;

export default function JsonToCsvPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [flatten, setFlatten] = useState(true);

  const convert = useCallback(() => {
    if (!input.trim()) {
      message.error('请输入JSON内容');
      return;
    }
    try {
      let data = JSON.parse(input);

      if (!Array.isArray(data)) {
        data = [data];
      }

      if (data.length === 0) {
        setOutput('');
        message.success('转换成功');
        return;
      }

      const flattenObject = (obj: unknown, prefix = ''): Record<string, unknown> => {
        if (!flatten) return obj as Record<string, unknown>;

        const result: Record<string, unknown> = {};

        const process = (item: unknown, p: string) => {
          if (item === null || item === undefined) {
            result[p] = '';
            return;
          }

          if (Array.isArray(item)) {
            result[p] = JSON.stringify(item);
            return;
          }

          if (typeof item === 'object') {
            Object.entries(item).forEach(([k, v]) => {
              const newKey = p ? `${p}.${k}` : k;
              process(v, newKey);
            });
            return;
          }

          result[p] = item;
        };

        process(obj, prefix);
        return result;
      };

      const flattened = data.map((d: unknown) => flattenObject(d));
      const headers = new Set<string>();
      flattened.forEach((row: Record<string, unknown>) => {
        Object.keys(row).forEach((k) => {
          headers.add(k);
        });
      });

      const headerArray = Array.from(headers);
      const rows: string[][] = [];

      if (includeHeaders) {
        rows.push(headerArray.map((h) => `"${h}"`));
      }

      flattened.forEach((row: Record<string, unknown>) => {
        const csvRow = headerArray.map((h) => {
          const val = row[h];
          if (val === null || val === undefined) return '';
          const str = String(val);
          if (str.includes(delimiter) || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        });
        rows.push(csvRow);
      });

      setOutput(rows.map((r) => r.join(delimiter)).join('\n'));
      message.success('JSON转CSV成功');
    } catch (_e) {
      message.error('JSON格式不正确');
    }
  }, [input, delimiter, includeHeaders, flatten]);

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 JSON 转 CSV</h1>
        <p className="text-gray-600">将JSON数组转换为CSV格式</p>
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
          placeholder='[{"name": "张三", "age": 30}, {"name": "李四", "age": 25}]'
          className="font-mono text-sm"
          rows={10}
        />
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">⚙️ 转换选项</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">分隔符</label>
            <Select
              value={delimiter}
              onChange={setDelimiter}
              style={{ width: '100%' }}
              options={[
                { label: '逗号 (,)', value: ',' },
                { label: '分号 (;)', value: ';' },
                { label: '制表符 (Tab)', value: '\t' },
                { label: '竖线 (|)', value: '|' },
              ]}
              size="large"
            />
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <Switch checked={includeHeaders} onChange={setIncludeHeaders} />
              <span className="text-sm text-gray-600">包含表头</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <Switch checked={flatten} onChange={setFlatten} />
              <span className="text-sm text-gray-600">扁平化嵌套对象</span>
            </label>
          </div>
        </div>
      </div>

      <Button
        type="primary"
        size="large"
        block
        onClick={convert}
        disabled={!input}
        className="h-12 text-base font-medium mb-4"
      >
        🚀 转换为 CSV
      </Button>

      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📋 CSV 输出</span>
            <Space>
              <Button onClick={handleCopy}>📋 复制</Button>
              <span className="text-xs text-gray-500">行数: {output.split('\n').length}</span>
            </Space>
          </div>
          <TextArea value={output} readOnly className="font-mono text-sm bg-gray-50" rows={12} />
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 支持JSON数组和单个对象</li>
          <li>• 扁平化会将嵌套对象转换为点号路径 (如 user.name)</li>
          <li>• 输出可用Excel或其他电子表格软件打开</li>
          <li>• 特殊字符会自动转义</li>
        </ul>
      </div>
    </div>
  );
}
