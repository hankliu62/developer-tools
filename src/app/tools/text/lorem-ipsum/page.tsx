'use client';
import { Button, Checkbox, message, Select, Slider } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

const loremWords = [
  'lorem',
  'ipsum',
  'dolor',
  'sit',
  'amet',
  'consectetur',
  'adipiscing',
  'elit',
  'sed',
  'do',
  'eiusmod',
  'tempor',
  'incididunt',
  'ut',
  'labore',
  'et',
  'dolore',
  'magna',
  'aliqua',
  'enim',
  'ad',
  'minim',
  'veniam',
  'quis',
  'nostrud',
  'exercitation',
  'ullamco',
  'laboris',
  'nisi',
  'aliquip',
  'ex',
  'ea',
  'commodo',
  'consequat',
  'duis',
  'aute',
  'irure',
  'in',
  'reprehenderit',
  'voluptate',
  'velit',
  'esse',
  'cillum',
  'fugiat',
  'nulla',
  'pariatur',
  'excepteur',
  'sint',
  'occaecat',
  'cupidatat',
  'non',
  'proident',
  'sunt',
  'culpa',
  'qui',
  'officia',
  'deserunt',
  'mollit',
  'anim',
  'id',
  'est',
  'laborum',
  'pellentesque',
  'habitant',
  'morbi',
  'tristique',
  'senectus',
  'netus',
  'malesuada',
  'fames',
  'ac',
  'turpis',
  'egestas',
  'proin',
  'sagittis',
  'nisl',
  'rhoncus',
  'mattis',
  'massa',
  'vitae',
  'tortor',
  'condimentum',
  'lacinia',
  'quis',
  'vel',
  'eros',
  'donec',
  'odio',
];

const generateLorem = (
  paragraphs: number,
  wordsPerParagraph: number,
  type: 'words' | 'sentences' | 'paragraphs'
): string => {
  const results: string[] = [];

  for (let p = 0; p < paragraphs; p++) {
    let currentLength = 0;
    let targetLength: number;

    if (type === 'words') {
      targetLength = wordsPerParagraph;
    } else if (type === 'sentences') {
      targetLength = wordsPerParagraph * 15;
    } else {
      targetLength = wordsPerParagraph * 70;
    }

    const paragraph: string[] = [];

    while (currentLength < targetLength) {
      const word = loremWords[Math.floor(Math.random() * loremWords.length)];
      paragraph.push(word);
      currentLength++;
    }

    if (type === 'words') {
      results.push(paragraph.join(' '));
    } else if (type === 'sentences') {
      const sentences: string[] = [];
      let sentence: string[] = [];
      paragraph.forEach((word, i) => {
        sentence.push(word);
        if (sentence.length >= 10 || i === paragraph.length - 1) {
          sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
          sentences.push(`${sentence.join(' ')}.`);
          sentence = [];
        }
      });
      results.push(sentences.join(' '));
    } else {
      const sentences: string[] = [];
      let sentence: string[] = [];
      paragraph.forEach((word, i) => {
        sentence.push(word);
        if (sentence.length >= 15 || i === paragraph.length - 1) {
          sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
          sentences.push(`${sentence.join(' ')}.`);
          sentence = [];
        }
      });
      results.push(sentences.join(' '));
    }
  }

  return results.join('\n\n');
};

export default function LoremIpsumPage() {
  const [output, setOutput] = useState('');
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'words' | 'sentences' | 'paragraphs'>('paragraphs');
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleGenerate = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      let result = generateLorem(
        type === 'words' ? 1 : type === 'sentences' ? 1 : count,
        type === 'words' ? count : type === 'sentences' ? count : 1,
        type
      );

      if (startWithLorem && type !== 'words') {
        result = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.${result.slice(5)}`;
      }

      setOutput(result);
      setLoading(false);
      message.success('生成成功');
    }, 100);
  }, [count, type, startWithLorem]);

  const handleCopy = () => {
    if (output) {
      copy(output);
      message.success('复制成功');
    }
  };

  const handleClear = () => {
    setOutput('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📄 随机文本生成</h1>
        <p className="text-gray-600">生成 Lorem Ipsum 占位文本</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-4">⚙️ 生成选项</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="text-sm text-gray-600 block mb-2">生成类型</span>
            <Select
              value={type}
              onChange={setType}
              style={{ width: '100%' }}
              options={[
                { value: 'words', label: '单词' },
                { value: 'sentences', label: '句子' },
                { value: 'paragraphs', label: '段落' },
              ]}
            />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">数量: {count}</span>
            <Slider
              min={1}
              max={100}
              value={count}
              onChange={setCount}
              marks={{
                1: '1',
                50: '50',
                100: '100',
              }}
            />
          </div>
          <div>
            <span className="text-sm text-gray-600 block mb-2">选项</span>
            <Checkbox
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
            >
              以 "Lorem ipsum" 开头
            </Checkbox>
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
        🚀 生成文本
      </Button>

      {output && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-800">📋 生成的文本</span>
            <div className="space-x-2">
              <Button onClick={handleCopy}>📋 复制</Button>
              <Button onClick={handleClear}>🗑️ 清空</Button>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{output}</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            共 {output.split(/\s+/).filter(Boolean).length} 个单词
          </p>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用场景</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 页面排版设计时作为占位文本</li>
          <li>• 测试文字排版、换行、字体效果</li>
          <li>• 演示文稿和原型设计</li>
          <li>• Lorem Ipsum 是一种虚拟文字，看起来像真实的拉丁文</li>
        </ul>
      </div>
    </div>
  );
}
