'use client';

import { Button, Input, message, Select } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const { TextArea } = Input;

interface ToolPageProps {
  title: string;
  description: string;
  emoji?: string;
  emojiBg?: string;
  inputLabel?: string;
  outputLabel?: string;
  defaultInput?: string;
  inputPlaceholder?: string;
  options?: { label: string; value: string }[];
  onProcess: (input: string, options?: Record<string, string>) => string;
  processLabel?: string;
  layout?: 'single' | 'double';
  tips?: string[];
}

export default function ToolPage({
  title,
  description,
  emoji,
  emojiBg = 'bg-blue-100',
  inputLabel = '输入',
  outputLabel = '输出',
  defaultInput = '',
  inputPlaceholder = '请输入内容...',
  options = [],
  onProcess,
  processLabel = '处理',
  layout = 'double',
  tips = [],
}: ToolPageProps) {
  const [input, setInput] = useState(defaultInput);
  const [output, setOutput] = useState('');
  const [selectedOption, setSelectedOption] = useState(options[0]?.value || '');
  const [loading, setLoading] = useState(false);

  const handleProcess = useCallback(() => {
    try {
      setLoading(true);
      const optionsMap = selectedOption ? { type: selectedOption } : undefined;
      const result = onProcess(input, optionsMap);
      setOutput(result);
      message.success('处理成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '处理失败');
    } finally {
      setLoading(false);
    }
  }, [input, selectedOption, onProcess]);

  const handleCopy = useCallback(() => {
    if (output) {
      copy(output);
      message.success('复制成功');
    }
  }, [output]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {emoji && (
            <span
              className={`inline-flex items-center justify-center w-10 h-10 ${emojiBg} rounded-lg mr-2`}
            >
              {emoji}
            </span>
          )}
          {title}
        </h1>
        <p className="text-gray-600">{description}</p>
      </div>

      {tips.length > 0 && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">使用提示</h3>
          <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {layout === 'single' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="font-medium text-gray-700">{inputLabel}</label>
            </div>
            <TextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={inputPlaceholder}
              className="font-mono text-sm"
              rows={4}
            />
          </div>

          {options.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <label className="font-medium text-gray-700 block mb-3">参数选项</label>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                  <Button
                    key={option.value}
                    type={selectedOption === option.value ? 'primary' : 'default'}
                    onClick={() => setSelectedOption(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              type="primary"
              onClick={handleProcess}
              loading={loading}
              disabled={!input && processLabel !== '生成'}
            >
              {processLabel}
            </Button>
            <Button onClick={handleClear}>清空</Button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="font-medium text-gray-700">{outputLabel}</label>
              <Button onClick={handleCopy} disabled={!output} size="small">
                复制
              </Button>
            </div>
            <TextArea
              value={output}
              readOnly
              className="font-mono text-sm bg-gray-50"
              rows={8}
              placeholder="输出结果..."
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="font-medium text-gray-700">{inputLabel}</label>
              {options.length > 0 && (
                <Select
                  value={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  style={{ width: 150 }}
                  size="small"
                />
              )}
            </div>
            <TextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={inputPlaceholder}
              className="font-mono text-sm"
              rows={12}
            />
            <div className="flex gap-2 mt-3">
              <Button type="primary" onClick={handleProcess} loading={loading} disabled={!input}>
                {processLabel}
              </Button>
              <Button onClick={handleClear}>清空</Button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="font-medium text-gray-700">{outputLabel}</label>
              <Button onClick={handleCopy} disabled={!output} size="small">
                复制
              </Button>
            </div>
            <TextArea
              value={output}
              readOnly
              className="font-mono text-sm bg-gray-50"
              rows={12}
              placeholder="输出结果..."
            />
          </div>
        </div>
      )}
    </div>
  );
}
