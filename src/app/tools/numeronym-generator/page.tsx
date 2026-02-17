'use client';

import { Button, Input, message, Select } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

export default function NumeronymGeneratorPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [style, setStyle] = useState<'standard' | 'vowel' | 'consonant'>('standard');

  const generate = useCallback(() => {
    if (!input.trim()) {
      message.error('请输入文字');
      return;
    }

    const chars = input.trim();
    if (chars.length < 3) {
      message.error('请输入至少3个字符');
      return;
    }

    let result = '';
    if (style === 'standard') {
      const first = chars[0];
      const middle = chars.length - 2;
      const last = chars[chars.length - 1];
      result = `${first}${middle}${last}`;
    } else if (style === 'vowel') {
      const vowels = 'aeiouAEIOU';
      const vowelCount = chars.split('').filter((c) => vowels.includes(c)).length;
      const first = chars[0];
      const last = chars[chars.length - 1];
      result = `${first}${vowelCount}${last}`;
    } else {
      const consonants = chars.split('').filter((c) => !'aeiouAEIOU'.includes(c)).length;
      const first = chars[0];
      const last = chars.length > 1 ? chars[chars.length - 1] : '';
      result = `${first}${consonants}${last}`;
    }

    setOutput(result);
    message.success('数字昵称生成成功');
  }, [input, style]);

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

  const examples = [
    { input: 'international', output: 'i18l' },
    { input: 'javascript', output: 'j8t' },
    { input: 'developer', output: 'd7r' },
    { input: 'product', output: 'p4t' },
    { input: 'community', output: 'c8y' },
  ];

  const handleExample = (ex: { input: string; output: string }) => {
    setInput(ex.input);
    setOutput(ex.output);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔢 数字昵称生成</h1>
        <p className="text-gray-600">生成类似 i18n 的数字昵称</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">📝 输入文字</span>
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例如: international"
            size="large"
            className="text-lg"
            onPressEnter={generate}
          />
          <Button type="primary" size="large" onClick={generate}>
            生成
          </Button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">⚙️ 生成风格</span>
        <Select
          value={style}
          onChange={setStyle}
          style={{ width: '100%' }}
          options={[
            { label: '标准风格 (首字母 + 中间字符数 + 尾字母)', value: 'standard' },
            { label: '元音风格 (首字母 + 元音数 + 尾字母)', value: 'vowel' },
            { label: '辅音风格 (首字母 + 辅音数 + 尾字母)', value: 'consonant' },
          ]}
          size="large"
        />
      </div>

      <Button block onClick={handleClear} className="mb-4">
        清空
      </Button>

      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <span className="font-semibold text-gray-800 block mb-4">📋 生成结果</span>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <span className="text-4xl font-bold text-blue-600">{output}</span>
          </div>
          <div className="mt-4 flex justify-center">
            <Button type="primary" onClick={handleCopy}>
              复制结果
            </Button>
          </div>
        </div>
      )}

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">💡 示例</span>
        <div className="space-y-2">
          {examples.map((ex, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-gray-600">{ex.input}</span>
              <Button type="link" onClick={() => handleExample(ex)}>
                → {ex.output}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 数字昵称常用于技术术语的简写</li>
          <li>• 经典案例: i18n (internationalization)、l10n (localization)</li>
          <li>• 风格选择影响中间数字的含义</li>
          <li>• 适用于品牌名、产品名等创意场景</li>
        </ul>
      </div>
    </div>
  );
}
