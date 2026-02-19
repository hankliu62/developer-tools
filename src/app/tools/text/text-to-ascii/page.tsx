'use client';
import ToolPage from '@/components/ToolPage';
import { textToAsciiBinary } from '@/tools/converter';

export default function TextToAsciiPage() {
  return (
    <ToolPage
      title="ASCII 二进制"
      description="文本转 ASCII 二进制编码"
      emoji="💻"
      emojiBg="bg-gray-100"
      inputLabel="文本内容"
      inputPlaceholder="请输入要转换的文本..."
      layout="single"
      tips={[
        '将每个字符转换为 8 位二进制表示',
        '例如：字符 A 的 ASCII 值是 65，二进制是 01000001',
        '支持所有可打印 ASCII 字符（32-126）',
        '常用于字符编码学习、调试、隐藏信息等场景',
      ]}
      options={[
        { label: '8位二进制', value: '8' },
        { label: '无空格', value: 'nospace' },
        { label: '带空格', value: 'space' },
        { label: '十进制', value: 'decimal' },
      ]}
      onProcess={(input, options) => {
        const opt = options?.type;

        if (opt === 'nospace') {
          return textToAsciiBinary(input).replace(/\\s/g, '');
        }

        if (opt === 'decimal') {
          return Array.from(input)
            .map((char) => char.charCodeAt(0))
            .join(' ');
        }

        if (opt === 'space') {
          return Array.from(input)
            .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
            .join(' ');
        }

        return textToAsciiBinary(input);
      }}
    />
  );
}
