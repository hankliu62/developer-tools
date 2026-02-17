'use client';

import { Button, Input, message, Radio, Select, Slider, Switch, Tabs } from 'antd';
import copy from 'copy-to-clipboard';
import { ReactNode, useCallback, useState } from 'react';

const { TextArea } = Input;

export type LayoutMode = 'vertical' | 'horizontal' | 'split' | 'tabs';

export interface ToolField {
  type: 'select' | 'switch' | 'slider' | 'radio' | 'input' | 'text';
  label: string;
  key: string;
  options?: { label: string; value: string | number }[];
  defaultValue?: string | number | boolean;
  min?: number;
  max?: number;
  step?: number;
  marks?: Record<number, string>;
}

export interface ToolSection {
  type: 'input' | 'output' | 'params' | 'custom';
  key?: string;
  label?: string;
  fields?: ToolField[];
  render?: (props: {
    value: string;
    onChange: (v: string) => void;
    options: Record<string, unknown>;
    onOptionChange: (key: string, value: unknown) => void;
  }) => ReactNode;
}

export interface ToolPageV2Props {
  title: string;
  description?: string;
  icon?: string;
  layout?: LayoutMode;
  sections: ToolSection[];
  onProcess: (params: Record<string, unknown>) => string;
  tips?: string[];
}

export default function ToolPageV2({
  title,
  description,
  icon = '🔧',
  layout = 'vertical',
  sections,
  onProcess,
  tips,
}: ToolPageV2Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState('');
  const [options, setOptions] = useState<Record<string, unknown>>(() => {
    const defaults: Record<string, unknown> = {};
    sections.forEach((section) => {
      if (section.fields) {
        section.fields.forEach((field) => {
          if (field.defaultValue !== undefined) {
            defaults[field.key] = field.defaultValue;
          }
        });
      }
    });
    return defaults;
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('input');

  const handleProcess = useCallback(() => {
    try {
      setLoading(true);
      const allParams = { ...values, ...options };
      const result = onProcess(allParams);
      setOutput(result);
      message.success('处理成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '处理失败');
    } finally {
      setLoading(false);
    }
  }, [values, options, onProcess]);

  const handleCopy = useCallback(() => {
    if (output) {
      copy(output);
      message.success('复制成功');
    }
  }, [output]);

  const handleClear = useCallback(() => {
    setValues({});
    setOutput('');
  }, []);

  const updateValue = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const updateOption = (key: string, value: unknown) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const renderField = (field: ToolField) => {
    const value = options[field.key];

    switch (field.type) {
      case 'select':
        return (
          <Select
            value={String(value || field.defaultValue || '')}
            onChange={(v) => updateOption(field.key, v)}
            options={field.options}
            style={{ width: '100%' }}
            size="large"
          />
        );
      case 'switch':
        return (
          <Switch
            checked={Boolean(value ?? field.defaultValue)}
            onChange={(v) => updateOption(field.key, v)}
          />
        );
      case 'slider':
        return (
          <div className="px-2">
            <Slider
              value={Number(value ?? field.defaultValue ?? 5)}
              min={field.min ?? 1}
              max={field.max ?? 10}
              step={field.step ?? 1}
              marks={field.marks}
              onChange={(v) => updateOption(field.key, v)}
            />
          </div>
        );
      case 'radio':
        return (
          <Radio.Group
            value={value ?? field.defaultValue}
            onChange={(e) => updateOption(field.key, e.target.value)}
            options={field.options as { label: string; value: string | number }[]}
          />
        );
      case 'input':
        return (
          <Input
            value={String(value ?? '')}
            onChange={(e) => updateOption(field.key, e.target.value)}
            placeholder={field.label}
            size="large"
          />
        );
      default:
        return null;
    }
  };

  const renderSection = (section: ToolSection, _isOutput = false) => {
    if (section.render) {
      return section.render({
        value: values[section.key || 'input'] || '',
        onChange: (v) => updateValue(section.key || 'input', v),
        options,
        onOptionChange: updateOption,
      });
    }

    if (section.type === 'output') {
      return (
        <div className="relative">
          <TextArea
            value={output}
            readOnly
            className="font-mono text-sm bg-gray-50"
            rows={12}
            placeholder="输出结果..."
          />
          {output && (
            <Button onClick={handleCopy} className="absolute top-2 right-2" size="small">
              📋 复制
            </Button>
          )}
        </div>
      );
    }

    return (
      <TextArea
        value={values[section.key || 'input'] || ''}
        onChange={(e) => updateValue(section.key || 'input', e.target.value)}
        placeholder={section.label || '请输入...'}
        className="font-mono text-sm"
        rows={section.type === 'params' ? 4 : 10}
      />
    );
  };

  const getSectionTitle = (section: ToolSection) => {
    if (section.label) return section.label;
    switch (section.type) {
      case 'input':
        return '📝 输入';
      case 'output':
        return '📋 输出';
      case 'params':
        return '⚙️ 参数';
      default:
        return '';
    }
  };

  if (layout === 'vertical') {
    const inputSection = sections.find((s) => s.type === 'input');
    const paramsSection = sections.find((s) => s.type === 'params');
    const outputSection = sections.find((s) => s.type === 'output');

    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {icon} {title}
          </h1>
          {description && <p className="text-gray-600">{description}</p>}
        </div>

        {inputSection && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
            <div className="flex items-center justify-between mb-3">
              <label className="font-semibold text-gray-800">{getSectionTitle(inputSection)}</label>
              <Button size="small" onClick={handleClear}>
                清空
              </Button>
            </div>
            {renderSection(inputSection)}
          </div>
        )}

        {paramsSection?.fields && (
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
            <label className="font-semibold text-gray-800 block mb-4">
              {getSectionTitle(paramsSection)}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paramsSection.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm text-gray-600 mb-2">{field.label}</label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          type="primary"
          size="large"
          block
          onClick={handleProcess}
          loading={loading}
          className="h-12 text-base font-medium mb-4"
        >
          🚀 执行
        </Button>

        {outputSection && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <label className="font-semibold text-gray-800">
                {getSectionTitle(outputSection)}
              </label>
              {output && <Button onClick={handleCopy}>📋 复制结果</Button>}
            </div>
            {renderSection(outputSection, true)}
          </div>
        )}

        {tips && tips.length > 0 && (
          <div className="mt-6 bg-blue-50 rounded-xl p-5">
            <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              {tips.map((tip, i) => (
                <li key={i}>• {tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  if (layout === 'horizontal') {
    const inputSection = sections.find((s) => s.type === 'input');
    const outputSection = sections.find((s) => s.type === 'output');
    const paramsSection = sections.find((s) => s.type === 'params');

    return (
      <div className="max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {icon} {title}
          </h1>
          {description && <p className="text-gray-600 mt-1">{description}</p>}
        </div>

        {paramsSection?.fields && (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
            <div className="flex flex-wrap gap-4 items-center">
              {paramsSection.fields.map((field) => (
                <div key={field.key} className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">{field.label}</label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {inputSection && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium text-gray-700">{getSectionTitle(inputSection)}</label>
                <Button size="small" onClick={handleClear}>
                  清空
                </Button>
              </div>
              {renderSection(inputSection)}
              <div className="mt-3">
                <Button
                  type="primary"
                  onClick={handleProcess}
                  loading={loading}
                  disabled={!values[inputSection.key || 'input']}
                >
                  执行
                </Button>
              </div>
            </div>
          )}

          {outputSection && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium text-gray-700">
                  {getSectionTitle(outputSection)}
                </label>
                <Button onClick={handleCopy} disabled={!output} size="small">
                  复制
                </Button>
              </div>
              {renderSection(outputSection, true)}
            </div>
          )}
        </div>

        {tips && tips.length > 0 && (
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">💡 提示</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              {tips.map((tip, i) => (
                <li key={i}>• {tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  if (layout === 'tabs') {
    const items = sections.map((section) => ({
      key: section.key || section.type,
      label: getSectionTitle(section),
      children: (
        <div className="py-4">
          {section.type === 'output' ? (
            renderSection(section, true)
          ) : (
            <>
              {renderSection(section)}
              <div className="mt-4">
                <Button type="primary" onClick={handleProcess} loading={loading}>
                  执行
                </Button>
              </div>
            </>
          )}
        </div>
      ),
    }));

    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            {icon} {title}
          </h1>
          {description && <p className="text-gray-600 mt-1">{description}</p>}
        </div>

        <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />

        {tips && tips.length > 0 && (
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">💡 提示</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              {tips.map((tip, i) => (
                <li key={i}>• {tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {icon} {title}
        </h1>
        {description && <p className="text-gray-600 mt-1">{description}</p>}
      </div>

      {sections.map((section, index) => (
        <div
          key={section.key || index}
          className="bg-white rounded-lg border border-gray-200 p-4 mb-4"
        >
          <label className="font-medium text-gray-700 block mb-3">{getSectionTitle(section)}</label>
          {renderSection(section)}
        </div>
      ))}

      <Button type="primary" onClick={handleProcess} loading={loading}>
        执行
      </Button>
    </div>
  );
}
