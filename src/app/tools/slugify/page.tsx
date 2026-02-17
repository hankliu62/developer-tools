'use client';

import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Input, Select, Space, Switch } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useMemo, useState } from 'react';

const { TextArea } = Input;

const separatorOptions = [
  { label: '连字符 (-)', value: '-' },
  { label: '下划线 (_)', value: '_' },
  { label: '点 (.)', value: '.' },
  { label: '空格 ( )', value: ' ' },
];

function slugify(
  text: string,
  options: {
    separator: string;
    lowercase: boolean;
    removeSpecialChars: boolean;
  }
): string {
  const { separator, lowercase, removeSpecialChars } = options;
  let result = text.trim();

  if (removeSpecialChars) {
    result = result.replace(/[^\w\s-]/g, '');
  }

  result = result.replace(/[\s_-]+/g, separator);

  if (lowercase) {
    result = result.toLowerCase();
  }

  result = result.replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');

  return result;
}

export default function SlugifyPage() {
  const [input, setInput] = useState('');
  const [separator, setSeparator] = useState('-');
  const [lowercase, setLowercase] = useState(true);
  const [removeSpecialChars, setRemoveSpecialChars] = useState(true);

  const output = useMemo(() => {
    if (!input.trim()) return '';
    return slugify(input, { separator, lowercase, removeSpecialChars });
  }, [input, separator, lowercase, removeSpecialChars]);

  const handleCopy = useCallback(() => {
    if (output) {
      copy(output);
    }
  }, [output]);

  const handleClear = useCallback(() => {
    setInput('');
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Slug 转换</h1>
        <p className="text-gray-600 mt-1">将文本转换为 URL 友好的 Slug 格式</p>
      </div>

      <Card className="mb-6" styles={{ body: { padding: 0 } }}>
        <div className="p-4 border-b border-gray-100">
          <label htmlFor="slug-input" className="font-medium text-gray-700 flex items-center gap-2">
            <span className="w-1 h-4 bg-emerald-500 rounded-full" />
            输入文本
          </label>
        </div>
        <TextArea
          id="slug-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="请输入要转换的文本..."
          className="font-mono text-sm border-0 rounded-none focus:shadow-none"
          rows={6}
        />
      </Card>

      <Card className="mb-6" styles={{ body: { padding: 0 } }}>
        <div className="p-4 border-b border-gray-100">
          <span className="font-medium text-gray-700 flex items-center gap-2">
            <span className="w-1 h-4 bg-blue-500 rounded-full" />
            转换选项
          </span>
        </div>
        <div className="p-4">
          <Space orientation="vertical" className="w-full" size="middle">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">分隔符</span>
              <Select
                value={separator}
                onChange={setSeparator}
                options={separatorOptions}
                style={{ width: 160 }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">转小写</span>
              <Switch checked={lowercase} onChange={setLowercase} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">去除特殊字符</span>
              <Switch checked={removeSpecialChars} onChange={setRemoveSpecialChars} />
            </div>
          </Space>
        </div>
      </Card>

      {output && (
        <Card className="mb-6" styles={{ body: { padding: 0 } }}>
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <label
              htmlFor="slug-output"
              className="font-medium text-gray-700 flex items-center gap-2"
            >
              <span className="w-1 h-4 bg-purple-500 rounded-full" />
              转换结果
            </label>
            <Space>
              <Button onClick={handleCopy} size="small">
                复制
              </Button>
              <Button onClick={handleClear} size="small">
                清空
              </Button>
            </Space>
          </div>
          <TextArea
            id="slug-output"
            value={output}
            readOnly
            className="font-mono text-sm bg-gray-50 border-0 rounded-none focus:shadow-none"
            rows={3}
          />
        </Card>
      )}

      <Card className="mt-6 bg-amber-50 border-amber-200" styles={{ body: { padding: 16 } }}>
        <div className="flex items-start gap-3">
          <InfoCircleOutlined className="text-amber-600 text-lg mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium mb-1">使用说明</p>
            <ul className="list-disc list-inside space-y-1 text-amber-700">
              <li>Slug 是 URL 友好的文本格式，常用于文章别名、URL 路径等</li>
              <li>分隔符用于替换文本中的空格和下划线</li>
              <li>去除特殊字符会移除非字母数字字符（保留空白和连字符）</li>
              <li>实时预览：修改选项后会立即看到转换结果</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
