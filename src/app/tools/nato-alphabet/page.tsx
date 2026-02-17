'use client';
import ToolPage from '@/components/ToolPage';
import { textToNato } from '@/tools/converter';

export default function NatoAlphabetPage() {
  return (
    <ToolPage
      title="NATO 字母表"
      description="将文本转换为 NATO  phonetic alphabet（北约音标字母）"
      inputLabel="文本内容"
      inputPlaceholder="请输入要转换的文本..."
      layout="single"
      tips={[
        'NATO 字母表：A-Alpha, B-Bravo, C-Charlie, D-Delta...',
        '常用于无线电通信、军事、航空等领域',
        '每个字母对应一个易读易懂的单词',
        '数字保持不变，不支持特殊字符',
      ]}
      options={[
        { label: '标准格式', value: 'standard' },
        { label: '仅首字母', value: 'short' },
        { label: '大写', value: 'upper' },
        { label: '小写', value: 'lower' },
      ]}
      onProcess={(input, options) => {
        const opt = options?.type;

        if (opt === 'short') {
          return textToNato(input).replace(/[A-Z]+/g, (match) => match[0]);
        }

        if (opt === 'upper') {
          return textToNato(input).toUpperCase();
        }

        if (opt === 'lower') {
          return textToNato(input).toLowerCase();
        }

        return textToNato(input);
      }}
    />
  );
}
