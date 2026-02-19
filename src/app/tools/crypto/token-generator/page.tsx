'use client';
import { Button, message } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export default function TokenGeneratorPage() {
  const [output, setOutput] = useState('');
  const [length, setLength] = useState(32);
  const [count, setCount] = useState(1);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeDigits, setIncludeDigits] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [loading, setLoading] = useState(false);

  const generateToken = useCallback(
    (len: number) => {
      let chars = '';
      if (includeUppercase) chars += UPPERCASE;
      if (includeLowercase) chars += LOWERCASE;
      if (includeDigits) chars += DIGITS;
      if (includeSymbols) chars += SYMBOLS;

      if (!chars) {
        chars = LOWERCASE;
      }

      let token = '';
      const array = new Uint32Array(len);
      crypto.getRandomValues(array);
      for (let i = 0; i < len; i++) {
        token += chars[array[i] % chars.length];
      }
      return token;
    },
    [includeUppercase, includeLowercase, includeDigits, includeSymbols]
  );

  const handleGenerate = useCallback(() => {
    try {
      setLoading(true);
      const tokens: string[] = [];
      for (let i = 0; i < count; i++) {
        tokens.push(generateToken(length));
      }
      setOutput(tokens.join('\n'));
      message.success(`成功生成 ${count} 个 Token`);
    } catch (error) {
      message.error(error instanceof Error ? error.message : '生成失败');
    } finally {
      setLoading(false);
    }
  }, [count, length, generateToken]);

  const handleCopy = () => {
    if (output) {
      copy(output);
      message.success('复制成功');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔑 Token 生成器</h1>
        <p className="text-gray-600">生成安全的随机 Token</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">⚙️ 生成选项</span>

        <div className="mb-6">
          <label htmlFor="token-length" className="text-sm text-gray-700 block mb-2">
            Token 长度
          </label>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">{length} 字符</span>
          </div>
          <input
            type="range"
            id="token-length"
            min={8}
            max={128}
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>8</span>
            <span>32</span>
            <span>64</span>
            <span>128</span>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="token-count" className="text-sm text-gray-700 block mb-2">
            生成数量
          </label>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">{count} 个</span>
          </div>
          <input
            type="range"
            id="token-count"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value, 10))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1</span>
            <span>10</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>

        <div>
          <span className="text-sm text-gray-700 block mb-3">包含字符</span>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="include-uppercase"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="include-uppercase" className="text-sm text-gray-700">
                大写字母 (A-Z)
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="include-lowercase"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="include-lowercase" className="text-sm text-gray-700">
                小写字母 (a-z)
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="include-digits"
                checked={includeDigits}
                onChange={(e) => setIncludeDigits(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="include-digits" className="text-sm text-gray-700">
                数字 (0-9)
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="include-symbols"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="include-symbols" className="text-sm text-gray-700">
                符号 (!@#$%^&*)
              </label>
            </div>
          </div>
        </div>
      </div>

      <Button
        type="primary"
        size="large"
        block
        onClick={handleGenerate}
        loading={loading}
        className="h-12 text-base font-medium mb-4"
      >
        🎲 生成 Token
      </Button>

      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📋 生成结果</span>
            <Button onClick={handleCopy}>📋 复制全部</Button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto">
            <pre className="font-mono text-sm text-gray-800 whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 建议 Token 长度至少 32 位以确保安全</li>
          <li>• 包含所有字符类型可提高安全性</li>
          <li>• 生成的 Token 使用加密安全的随机数生成器</li>
          <li>• 适用于 API 密钥、会话 ID、密码重置链接等场景</li>
        </ul>
      </div>
    </div>
  );
}
