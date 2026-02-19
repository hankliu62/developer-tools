'use client';
import { Input, message } from 'antd';
import copy from 'copy-to-clipboard';
import { useMemo, useState } from 'react';

const { TextArea } = Input;

export default function TextStatisticsPage() {
  const [text, setText] = useState('');
  const [_countSpaces, _setCountSpaces] = useState(true);

  const stats = useMemo(() => {
    if (!text) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        lines: 0,
        paragraphs: 0,
        sentences: 0,
        bytes: 0,
        chineseChars: 0,
        englishWords: 0,
        numbers: 0,
        punctuation: 0,
        readingTime: '0 秒',
        longestLine: 0,
        avgLineLength: 0,
      };
    }

    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
    const lines = text.split('\n').length;
    const paragraphs =
      text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || (text.trim() ? 1 : 0);
    const sentences = (text.match(/[.!?。！？]+/g) || []).length || (text.trim() ? 1 : 0);
    const bytes = new Blob([text]).size;
    const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length;
    const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
    const numbers = (text.match(/\d+/g) || []).length;
    const punctuation = (text.match(/[^\w\s\u4e00-\u9fff]/g) || []).length;

    const totalWords = chineseChars + englishWords;
    const readingMinutes = totalWords / 300;
    let readingTime: string;
    if (readingMinutes < 1) {
      readingTime = `${Math.max(1, Math.ceil(readingMinutes * 60))} 秒`;
    } else {
      readingTime = `${Math.ceil(readingMinutes)} 分钟`;
    }

    const lineArray = text.split('\n');
    const longestLine = Math.max(...lineArray.map((l) => l.length));
    const avgLineLength = Math.round(characters / lines);

    return {
      characters,
      charactersNoSpaces,
      words,
      lines,
      paragraphs,
      sentences,
      bytes,
      chineseChars,
      englishWords,
      numbers,
      punctuation,
      readingTime,
      longestLine,
      avgLineLength,
    };
  }, [text]);

  const statItems = [
    { label: '字符数（含空格）', value: stats.characters.toLocaleString(), color: 'text-blue-600' },
    {
      label: '字符数（不含空格）',
      value: stats.charactersNoSpaces.toLocaleString(),
      color: 'text-blue-600',
    },
    { label: '单词数', value: stats.words.toLocaleString(), color: 'text-green-600' },
    { label: '行数', value: stats.lines.toLocaleString(), color: 'text-purple-600' },
    { label: '段落数', value: stats.paragraphs.toLocaleString(), color: 'text-orange-600' },
    { label: '句子数', value: stats.sentences.toLocaleString(), color: 'text-red-600' },
    { label: '字节数', value: `${stats.bytes.toLocaleString()} B`, color: 'text-gray-600' },
    { label: '中文字符', value: stats.chineseChars.toLocaleString(), color: 'text-pink-600' },
    { label: '英文单词', value: stats.englishWords.toLocaleString(), color: 'text-indigo-600' },
    { label: '数字', value: stats.numbers.toLocaleString(), color: 'text-teal-600' },
    { label: '标点符号', value: stats.punctuation.toLocaleString(), color: 'text-yellow-600' },
    { label: '预计阅读时间', value: stats.readingTime, color: 'text-cyan-600' },
    { label: '最长行长度', value: stats.longestLine.toLocaleString(), color: 'text-gray-600' },
    { label: '平均行长度', value: stats.avgLineLength.toLocaleString(), color: 'text-gray-600' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📝 文本统计</h1>
        <p className="text-gray-600">统计字数、字符数、行数、段落数等文本信息</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-3">📄 输入文本</span>
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在此输入或粘贴文本..."
          rows={10}
          className="text-base"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
        <span className="font-semibold text-gray-800 block mb-4">📊 统计结果</span>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {statItems.map((item) => (
            <div
              key={item.label}
              className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => {
                copy(item.value);
                message.success('已复制');
              }}
            >
              <div className="text-xs text-gray-500 mb-1">{item.label}</div>
              <div className={`font-mono text-lg font-bold ${item.color}`}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 实时统计，输入即计算，无需点击按钮</li>
          <li>• 支持中英文混合文本统计</li>
          <li>• 阅读时间按每分钟 300 字/词估算</li>
          <li>• 点击任意统计项即可复制数值</li>
          <li>• 字节数按 UTF-8 编码计算</li>
        </ul>
      </div>
    </div>
  );
}
