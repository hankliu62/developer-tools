'use client';
import { Button, Input, message, Radio, Space } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

type Format = 'decimal' | 'hex' | 'binary' | 'octal';

const parseDecimal = (ip: string): number[] => {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) {
    throw new Error('无效的十进制 IPv4 地址');
  }
  return parts;
};

const parseHex = (ip: string): number[] => {
  const cleaned = ip.replace(/0x/gi, '');
  const parts = cleaned.split('.').map((p) => parseInt(p, 16));
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) {
    throw new Error('无效的十六进制 IPv4 地址');
  }
  return parts;
};

const parseBinary = (ip: string): number[] => {
  const parts = ip.split('.').map((p) => parseInt(p, 2));
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) {
    throw new Error('无效的二进制 IPv4 地址');
  }
  return parts;
};

const parseOctal = (ip: string): number[] => {
  const parts = ip.split('.').map((p) => parseInt(p, 8));
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) {
    throw new Error('无效的八进制 IPv4 地址');
  }
  return parts;
};

export default function IPv4AddressConverterPage() {
  const [input, setInput] = useState('192.168.1.1');
  const [inputFormat, setInputFormat] = useState<Format>('decimal');
  const [result, setResult] = useState<{
    decimal: string;
    hex: string;
    binary: string;
    octal: string;
    integer: number;
  } | null>(null);

  const convert = useCallback(() => {
    try {
      let parts: number[];
      switch (inputFormat) {
        case 'decimal':
          parts = parseDecimal(input.trim());
          break;
        case 'hex':
          parts = parseHex(input.trim());
          break;
        case 'binary':
          parts = parseBinary(input.trim());
          break;
        case 'octal':
          parts = parseOctal(input.trim());
          break;
        default:
          throw new Error('未知格式');
      }

      const integer = ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;

      setResult({
        decimal: parts.join('.'),
        hex: parts.map((p) => p.toString(16).padStart(2, '0')).join('.'),
        binary: parts.map((p) => p.toString(2).padStart(8, '0')).join('.'),
        octal: parts.map((p) => p.toString(8).padStart(3, '0')).join('.'),
        integer,
      });
      message.success('转换成功');
    } catch (e: any) {
      message.error(e.message || '转换失败');
    }
  }, [input, inputFormat]);

  const handleCopy = (text: string) => {
    copy(text);
    message.success('已复制');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔄 IPv4 地址转换器</h1>
        <p className="text-gray-600">在十进制、十六进制、二进制、八进制之间转换 IPv4 地址</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-3">📥 输入格式</span>
        <Radio.Group
          value={inputFormat}
          onChange={(e) => setInputFormat(e.target.value)}
          className="mb-4"
        >
          <Radio.Button value="decimal">十进制</Radio.Button>
          <Radio.Button value="hex">十六进制</Radio.Button>
          <Radio.Button value="binary">二进制</Radio.Button>
          <Radio.Button value="octal">八进制</Radio.Button>
        </Radio.Group>

        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            inputFormat === 'decimal'
              ? '192.168.1.1'
              : inputFormat === 'hex'
                ? 'c0.a8.01.01'
                : inputFormat === 'binary'
                  ? '11000000.10101000.00000001.00000001'
                  : '300.250.001.001'
          }
          size="large"
          className="font-mono"
          onPressEnter={convert}
        />
      </div>

      <Space className="w-full mb-4">
        <Button type="primary" size="large" onClick={convert}>
          🚀 转换
        </Button>
        <Button
          size="large"
          onClick={() => {
            setInput('192.168.1.1');
            setInputFormat('decimal');
            setResult(null);
          }}
        >
          🗑️ 重置
        </Button>
      </Space>

      {result && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <span className="font-semibold text-gray-800 block mb-4">📊 转换结果</span>
          <div className="space-y-3">
            {[
              { label: '十进制', value: result.decimal, color: 'text-blue-600' },
              { label: '十六进制', value: result.hex, color: 'text-purple-600' },
              { label: '二进制', value: result.binary, color: 'text-green-600' },
              { label: '八进制', value: result.octal, color: 'text-orange-600' },
              { label: '整数值', value: result.integer.toString(), color: 'text-red-600' },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                  <div className={`font-mono text-lg ${item.color}`}>{item.value}</div>
                </div>
                <Button size="small" onClick={() => handleCopy(item.value)}>
                  复制
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 十进制: 每段 0-255，如 192.168.1.1</li>
          <li>• 十六进制: 每段 00-FF，如 c0.a8.01.01</li>
          <li>• 二进制: 每段 8 位，如 11000000.10101000.00000001.00000001</li>
          <li>• 八进制: 每段 000-377，如 300.250.001.001</li>
          <li>• 整数值是将 4 字节拼接为 32 位无符号整数</li>
        </ul>
      </div>
    </div>
  );
}
