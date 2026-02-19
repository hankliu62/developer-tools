'use client';
import ToolPage from '@/components/ToolPage';
import { fromRoman, toRoman } from '@/tools/converter';

export default function RomanConverterPage() {
  return (
    <ToolPage
      title="罗马数字转换"
      description="阿拉伯数字与罗马数字相互转换"
      emoji="🔢"
      emojiBg="bg-amber-100"
      inputLabel="数字或罗马数字"
      inputPlaceholder="请输入数字（如 1999）或罗马数字（如 MCMXCIX）"
      layout="single"
      tips={[
        '罗马数字使用字母 I(1), V(5), X(10), L(50), C(100), D(500), M(1000)',
        '支持范围：1 到 3999（传统罗马数字限制）',
        '规则：相同字母重复不超过3次，右减左加原则',
        '自动检测输入类型进行转换',
      ]}
      options={[
        { label: '自动检测', value: 'auto' },
        { label: '仅数字转罗马', value: 'encode' },
        { label: '仅罗马转数字', value: 'decode' },
        { label: '大写罗马', value: 'upper' },
      ]}
      onProcess={(input, options) => {
        const trimmed = input.trim();
        const opt = options?.type;

        if (opt === 'encode') {
          if (!/^\d+$/.test(trimmed)) {
            throw new Error('请输入有效的数字');
          }
          const num = parseInt(trimmed, 10);
          if (num < 1 || num > 3999) {
            throw new Error('数字必须在 1 到 3999 之间');
          }
          return toRoman(num);
        }

        if (opt === 'decode') {
          return fromRoman(trimmed.toUpperCase()).toString();
        }

        if (opt === 'upper') {
          if (/^\d+$/.test(trimmed)) {
            const num = parseInt(trimmed, 10);
            if (num < 1 || num > 3999) {
              throw new Error('数字必须在 1 到 3999 之间');
            }
            return toRoman(num);
          } else {
            return trimmed.toUpperCase();
          }
        }

        if (opt === 'auto' || !opt) {
          if (/^\d+$/.test(trimmed)) {
            const num = parseInt(trimmed, 10);
            if (num < 1 || num > 3999) {
              throw new Error('数字必须在 1 到 3999 之间');
            }
            return toRoman(num);
          } else {
            return fromRoman(trimmed).toString();
          }
        }

        return toRoman(parseInt(trimmed, 10));
      }}
    />
  );
}
