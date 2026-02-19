'use client';
import { Input, Tag } from 'antd';
import { useState } from 'react';

const { Search } = Input;

const regexPatterns = [
  {
    category: '字符类',
    patterns: [
      { pattern: '.', desc: '任意单个字符（换行符除外）' },
      { pattern: '\\d', desc: '任意数字 [0-9]' },
      { pattern: '\\D', desc: '任意非数字' },
      { pattern: '\\w', desc: '任意字母、数字、下划线 [a-zA-Z0-9_]' },
      { pattern: '\\W', desc: '任意非单词字符' },
      { pattern: '\\s', desc: '任意空白字符（空格、制表符、换行）' },
      { pattern: '\\S', desc: '任意非空白字符' },
      { pattern: '[abc]', desc: '匹配 a、b 或 c 中的任意一个' },
      { pattern: '[^abc]', desc: '匹配除了 a、b、c 之外的任意字符' },
      { pattern: '[a-z]', desc: '匹配 a 到 z 之间的任意字符' },
      { pattern: '[A-Z]', desc: '匹配 A 到 Z 之间的任意字符' },
      { pattern: '[0-9]', desc: '匹配 0 到 9 之间的任意字符' },
    ],
  },
  {
    category: '锚点',
    patterns: [
      { pattern: '^', desc: '匹配字符串开头' },
      { pattern: '$', desc: '匹配字符串结尾' },
      { pattern: '\\b', desc: '匹配单词边界' },
      { pattern: '\\B', desc: '匹配非单词边界' },
      { pattern: '(?=...)', desc: '正向先行断言' },
      { pattern: '(?!...)', desc: '负向先行断言' },
      { pattern: '(?<=...)', desc: '正向后行断言' },
      { pattern: '(?<!...)', desc: '负向后行断言' },
    ],
  },
  {
    category: '量词',
    patterns: [
      { pattern: '*', desc: '0 次或多次' },
      { pattern: '+', desc: '1 次或多次' },
      { pattern: '?', desc: '0 次或 1 次' },
      { pattern: '{n}', desc: '恰好 n 次' },
      { pattern: '{n,}', desc: '至少 n 次' },
      { pattern: '{n,m}', desc: 'n 到 m 次' },
      { pattern: '*?', desc: '0 次或多次（懒惰）' },
      { pattern: '+?', desc: '1 次或多次（懒惰）' },
      { pattern: '??', desc: '0 次或 1 次（懒惰）' },
    ],
  },
  {
    category: '分组与引用',
    patterns: [
      { pattern: '(...)', desc: '捕获组' },
      { pattern: '(?:...)', desc: '非捕获组' },
      { pattern: '(?<name>...)', desc: '命名捕获组' },
      { pattern: '\\1', desc: '引用第 1 个捕获组' },
      { pattern: '\\k<name>', desc: '引用命名捕获组' },
    ],
  },
  {
    category: '转义字符',
    patterns: [
      { pattern: '\\\\', desc: '反斜杠' },
      { pattern: '\\.', desc: '字面句点' },
      { pattern: '\\*', desc: '字面星号' },
      { pattern: '\\+', desc: '字面加号' },
      { pattern: '\\?', desc: '字面问号' },
      { pattern: '\\^', desc: '字面脱字符' },
      { pattern: '\\$', desc: '字面美元符' },
      { pattern: '\\|', desc: '字面竖线' },
      { pattern: '\\[', desc: '字面左方括号' },
      { pattern: '\\{', desc: '字面左花括号' },
      { pattern: '\\(', desc: '字面左圆括号' },
      { pattern: '\\n', desc: '换行符' },
      { pattern: '\\t', desc: '制表符' },
      { pattern: '\\r', desc: '回车符' },
    ],
  },
  {
    category: '标志/修饰符',
    patterns: [
      { pattern: 'g', desc: '全局匹配' },
      { pattern: 'i', desc: '忽略大小写' },
      { pattern: 'm', desc: '多行模式（^ $ 匹配行首行尾）' },
      { pattern: 's', desc: '单行模式（. 匹配换行符）' },
      { pattern: 'u', desc: 'Unicode 模式' },
    ],
  },
  {
    category: '常见模式',
    patterns: [
      { pattern: '^[\\w.-]+@[\\w.-]+\\.\\w+$', desc: '邮箱地址' },
      { pattern: '^https?:\\/\\/[\\w.-]+.*$', desc: 'URL' },
      { pattern: '^1[3-9]\\d{9}$', desc: '中国手机号' },
      { pattern: '^\\d{4}-\\d{2}-\\d{2}$', desc: '日期 YYYY-MM-DD' },
      { pattern: '^\\d{1,3}(\\.\\d{1,3}){3}$', desc: 'IPv4 地址' },
      { pattern: '^[a-fA-F0-9]{32}$', desc: 'MD5 哈希' },
      { pattern: '^[a-fA-F0-9]{40}$', desc: 'SHA1 哈希' },
      { pattern: '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$', desc: '十六进制颜色' },
    ],
  },
];

export default function RegexCheatsheetPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const categories = ['全部', ...regexPatterns.map((c) => c.category)];

  const filteredPatterns = regexPatterns
    .filter((cat) => selectedCategory === '全部' || cat.category === selectedCategory)
    .map((cat) => ({
      ...cat,
      patterns: cat.patterns.filter(
        (p) =>
          search === '' ||
          p.pattern.toLowerCase().includes(search.toLowerCase()) ||
          p.desc.includes(search)
      ),
    }))
    .filter((cat) => cat.patterns.length > 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔤 正则表达式速查</h1>
        <p className="text-gray-600">常用正则表达式模式快速参考</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索模式或描述..."
              size="large"
              allowClear
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Tag
                key={cat}
                color={selectedCategory === cat ? 'blue' : 'default'}
                className="cursor-pointer px-3 py-1"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Tag>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredPatterns.map((cat) => (
          <div
            key={cat.category}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          >
            <h3 className="font-semibold text-gray-800 mb-4">{cat.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cat.patterns.map(({ pattern, desc }) => (
                <div key={pattern} className="flex gap-3 p-2 rounded hover:bg-gray-50">
                  <code className="text-green-600 font-mono text-sm whitespace-nowrap min-w-[140px]">
                    {pattern}
                  </code>
                  <span className="text-gray-600 text-sm">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 快速示例</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="bg-white/50 rounded-lg p-3">
            <code className="text-green-600">{'\\d{3,4}-?\\d{7,8}'}</code>
            <div className="text-blue-800 mt-1">国内电话</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3">
            <code className="text-green-600">^\\s*|\\s*$</code>
            <div className="text-blue-800 mt-1">首尾空白</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3">
            <code className="text-green-600">&lt;[^&gt;]+&gt;</code>
            <div className="text-blue-800 mt-1">HTML 标签</div>
          </div>
          <div className="bg-white/50 rounded-lg p-3">
            <code className="text-green-600">(.)\\1+</code>
            <div className="text-blue-800 mt-1">连续重复字符</div>
          </div>
        </div>
      </div>
    </div>
  );
}
