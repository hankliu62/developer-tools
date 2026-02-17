'use client';
import ToolPage from '@/components/ToolPage';
import { textToUnicode, unicodeToText } from '@/tools/converter';

export default function UnicodePage() {
  return (
    <ToolPage
      title="Unicode 转换"
      description="文本与 Unicode 编码相互转换"
      inputLabel="文本或 Unicode"
      inputPlaceholder="请输入文本或 Unicode 编码（如 \\u4e2d\\u6587）..."
      layout="single"
      tips={[
        'Unicode 编码格式：\\uXXXX（4位十六进制）或 \\u{XXXX}（可变长度）',
        '文本转 Unicode：将每个字符转换为 \\uXXXX 格式',
        'Unicode 转文本：将编码还原为原始字符',
        '支持中文、日文、 emoji 等 Unicode 字符',
      ]}
      options={[
        { label: '自动检测', value: 'auto' },
        { label: '仅转 Unicode', value: 'encode' },
        { label: '仅转文本', value: 'decode' },
        { label: 'HTML 实体', value: 'html' },
      ]}
      onProcess={(input, options) => {
        const opt = options?.type;

        if (opt === 'encode') {
          return textToUnicode(input);
        }

        if (opt === 'decode') {
          return unicodeToText(input);
        }

        if (opt === 'html') {
          return textToUnicode(input).replace(/\\u/g, '&#x').replace(/$/g, ';');
        }

        if (opt === 'auto' || !opt) {
          if (input.includes('\\u')) {
            return unicodeToText(input);
          }
          return textToUnicode(input);
        }

        return textToUnicode(input);
      }}
    />
  );
}
