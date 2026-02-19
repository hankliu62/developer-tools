'use client';

import { Button, message } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

type CaseType =
  | 'upper'
  | 'lower'
  | 'title'
  | 'sentence'
  | 'camel'
  | 'kebab'
  | 'snake'
  | 'pascal'
  | 'constant'
  | 'dot';

interface CaseOption {
  label: string;
  value: CaseType;
  icon: string;
}

const caseOptions: CaseOption[] = [
  { label: '大写', value: 'upper', icon: 'AA' },
  { label: '小写', value: 'lower', icon: 'aa' },
  { label: '首字母大写', value: 'title', icon: 'Aa' },
  { label: '句首大写', value: 'sentence', icon: 'A.' },
  { label: '驼峰', value: 'camel', icon: 'Ab' },
  { label: '帕斯卡', value: 'pascal', icon: 'Ab' },
  { label: '短横线', value: 'kebab', icon: 'a-b' },
  { label: '下划线', value: 'snake', icon: 'a_b' },
  { label: '常量', value: 'constant', icon: 'A_B' },
  { label: '点分隔', value: 'dot', icon: 'a.b' },
];

const tips = [
  '点击任意转换按钮即可查看对应格式的转换结果',
  '支持一次性查看所有转换格式，方便对比',
  '点击结果卡片可一键复制对应格式的内容',
  '驼峰和帕斯卡命名常用于编程中的变量和类名',
];

function convertCase(text: string, caseType: CaseType): string {
  if (!text) return '';

  switch (caseType) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return text.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    case 'sentence':
      return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    case 'camel':
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^./, (chr) => chr.toLowerCase());
    case 'pascal':
      return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^./, (chr) => chr.toUpperCase());
    case 'kebab':
      return text
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
    case 'snake':
      return text
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/[\s-]+/g, '_')
        .toLowerCase();
    case 'constant':
      return text
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/[\s-]+/g, '_')
        .toUpperCase();
    case 'dot':
      return text
        .replace(/([a-z])([A-Z])/g, '$1.$2')
        .replace(/[\s_-]+/g, '.')
        .toLowerCase();
    default:
      return text;
  }
}

function getAllConversions(text: string): Record<CaseType, string> {
  return {
    upper: convertCase(text, 'upper'),
    lower: convertCase(text, 'lower'),
    title: convertCase(text, 'title'),
    sentence: convertCase(text, 'sentence'),
    camel: convertCase(text, 'camel'),
    pascal: convertCase(text, 'pascal'),
    kebab: convertCase(text, 'kebab'),
    snake: convertCase(text, 'snake'),
    constant: convertCase(text, 'constant'),
    dot: convertCase(text, 'dot'),
  };
}

export default function CaseConverterPage() {
  const [input, setInput] = useState('');
  const [conversions, setConversions] = useState<Record<CaseType, string>>({
    upper: '',
    lower: '',
    title: '',
    sentence: '',
    camel: '',
    pascal: '',
    kebab: '',
    snake: '',
    constant: '',
    dot: '',
  });

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    if (value) {
      setConversions(getAllConversions(value));
    } else {
      setConversions({
        upper: '',
        lower: '',
        title: '',
        sentence: '',
        camel: '',
        pascal: '',
        kebab: '',
        snake: '',
        constant: '',
        dot: '',
      });
    }
  }, []);

  const handleCopy = useCallback((text: string) => {
    if (text) {
      copy(text);
      message.success('复制成功');
    }
  }, []);

  const handleClear = useCallback(() => {
    setInput('');
    setConversions({
      upper: '',
      lower: '',
      title: '',
      sentence: '',
      camel: '',
      pascal: '',
      kebab: '',
      snake: '',
      constant: '',
      dot: '',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <span className="inline-flex items-center justify-center w-10 h-10 bg-violet-100 rounded-lg mr-2">
              🔤
            </span>
            大小写转换
          </h1>
          <p className="text-gray-600">文本大小写转换工具，支持多种命名格式</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden mb-6">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                输入文本
              </span>
              <Button
                size="small"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600"
              >
                清空
              </Button>
            </div>
            <textarea
              id="input-text"
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="请输入要转换的文本..."
              className="w-full h-32 p-4 text-lg font-mono bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-indigo-500 focus:ring-0 transition-colors resize-none"
              aria-label="输入文本"
            />
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                转换结果
              </span>
              <span className="text-sm text-gray-400">
                {input ? '已生成所有格式' : '输入文本后显示结果'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {caseOptions.map((option) => (
                <div
                  key={option.value}
                  className={`group relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    input
                      ? 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'
                      : 'bg-slate-50 border-slate-100 opacity-50'
                  }`}
                  onClick={() => handleCopy(conversions[option.value])}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg font-mono font-bold text-gray-600 group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:text-white transition-all">
                        {option.icon}
                      </span>
                      <div>
                        <div className="font-medium text-gray-800">{option.label}</div>
                        <div className="text-sm text-gray-500 font-mono truncate max-w-[140px]">
                          {conversions[option.value] || '-'}
                        </div>
                      </div>
                    </div>
                    {input && (
                      <span className="opacity-0 group-hover:opacity-100 text-indigo-500 text-sm font-medium transition-opacity">
                        复制
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-amber-600">💡</span>
            </div>
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">使用提示</h3>
              <ul className="text-sm text-amber-800 space-y-1">
                {tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
