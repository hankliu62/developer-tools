'use client';

import { Button, Input, Select } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useEffect, useState } from 'react';

const { TextArea } = Input;

const BASE_OPTIONS = [
  { label: '2 (二进制)', value: 2 },
  { label: '8 (八进制)', value: 8 },
  { label: '10 (十进制)', value: 10 },
  { label: '16 (十六进制)', value: 16 },
  { label: '32 (三十二进制)', value: 32 },
  { label: '64 (六十四进制)', value: 64 },
];

const BASE_LABELS: Record<number, string> = {
  2: '二进制',
  8: '八进制',
  10: '十进制',
  16: '十六进制',
  32: '三十二进制',
  64: '六十四进制',
};

function convertToDecimal(value: string, base: number): bigint | null {
  try {
    if (base === 64) {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/';
      let result = BigInt(0);
      for (let i = 0; i < value.length; i++) {
        const idx = chars.indexOf(value[i]);
        if (idx === -1 || idx >= base) return null;
        result = result * BigInt(64) + BigInt(idx);
      }
      return result;
    }
    return BigInt(parseInt(value, base));
  } catch {
    return null;
  }
}

function formatValue(value: bigint, base: number): string {
  if (base === 64) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/';
    if (value === BigInt(0)) return '0';
    let result = '';
    let v = value;
    while (v > BigInt(0)) {
      result = chars[Number(v % BigInt(64))] + result;
      v = v / BigInt(64);
    }
    return result;
  }
  if (base <= 16) {
    return value.toString(base).toUpperCase();
  }
  return value.toString(base);
}

function isValidValue(value: string, base: number): boolean {
  if (!value) return true;
  if (base === 64) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/';
    return value.split('').every((c) => chars.indexOf(c) !== -1 && chars.indexOf(c) < base);
  }
  try {
    parseInt(value, base);
    return true;
  } catch {
    return false;
  }
}

export default function Page() {
  const [inputValue, setInputValue] = useState('');
  const [selectedBase, setSelectedBase] = useState(10);
  const [error, setError] = useState('');

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    setError('');
  }, []);

  const handleBaseChange = useCallback((base: number) => {
    setSelectedBase(base);
    setError('');
  }, []);

  const handleCopy = useCallback((text: string) => {
    copy(text);
  }, []);

  const handleClear = useCallback(() => {
    setInputValue('');
    setError('');
  }, []);

  useEffect(() => {
    if (!inputValue) {
      setError('');
      return;
    }
    if (!isValidValue(inputValue, selectedBase)) {
      setError(`请输入有效的 ${BASE_LABELS[selectedBase]} 数值`);
      return;
    }
    const decimal = convertToDecimal(inputValue, selectedBase);
    if (decimal === null) {
      setError('转换失败，请检查输入');
    } else {
      setError('');
    }
  }, [inputValue, selectedBase]);

  const results =
    inputValue && !error
      ? (() => {
          const decimal = convertToDecimal(inputValue, selectedBase);
          if (decimal === null) return null;
          return BASE_OPTIONS.map((base) => ({
            base: base.value,
            label: base.label,
            value: formatValue(decimal, base.value),
          }));
        })()
      : null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔢 整数进制转换</h1>
        <p className="text-gray-600">支持 2/8/10/16/32/64 进制实时转换</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
          <div className="flex-1 w-full">
            <label htmlFor="base-input" className="block text-sm font-medium text-gray-700 mb-2">
              输入数值
            </label>
            <TextArea
              id="base-input"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="请输入数值..."
              className="font-mono text-lg"
              rows={2}
              allowClear
            />
          </div>
          <div className="w-full sm:w-48 shrink-0">
            <label htmlFor="base-select" className="block text-sm font-medium text-gray-700 mb-2">
              原进制
            </label>
            <Select
              id="base-select"
              value={selectedBase}
              onChange={handleBaseChange}
              options={BASE_OPTIONS}
              style={{ width: '100%' }}
              size="large"
            />
          </div>
        </div>

        {error && inputValue && <div className="text-red-500 text-sm mt-2">{error}</div>}

        {inputValue && !error && results && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-gray-800">转换结果</span>
              <Button size="small" onClick={handleClear}>
                清空
              </Button>
            </div>
            <div className="grid gap-3">
              {results.map((result) => (
                <div
                  key={result.base}
                  className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-lg">
                      {result.base}
                    </span>
                    <span className="text-gray-600 text-sm">{BASE_LABELS[result.base]}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <code className="text-lg font-mono text-gray-900 bg-white px-3 py-1 rounded-lg border border-gray-200">
                      {result.value}
                    </code>
                    <Button
                      size="small"
                      onClick={() => handleCopy(result.value)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      📋
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
        <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
          <span>💡</span> 使用提示
        </h3>
        <ul className="text-sm text-amber-800 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-1">•</span>
            <span>选择原进制后，输入对应进制的数值，支持大写或小写</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-1">•</span>
            <span>转换结果会实时显示在下方，无需点击按钮</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-1">•</span>
            <span>64 进制使用 RFC 4648 标准字符集 (0-9, A-Z, a-z, +, /)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-1">•</span>
            <span>支持超大整数转换，使用 BigInt 精度无限制</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
