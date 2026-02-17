'use client';
import ToolPage from '@/components/ToolPage';
import { escapeHtml, unescapeHtml } from '@/tools/web';

export default function HtmlEscapePage() {
  return (
    <ToolPage
      title="HTML 实体转义"
      description="HTML 特殊字符编码与解码"
      inputLabel="HTML 内容"
      inputPlaceholder="请输入要转义或反转义的 HTML 内容..."
      layout="single"
      tips={[
        '编码：将 < > & " \' 等特殊字符转换为 HTML 实体',
        '解码：将 HTML 实体转换回原始字符',
        '自动检测：如果输入包含 & 或 < > 符号则自动解码',
        '常用于：防止 XSS 攻击、代码展示、数据传输',
      ]}
      options={[
        { label: '自动检测', value: 'auto' },
        { label: '仅编码', value: 'encode' },
        { label: '仅解码', value: 'decode' },
      ]}
      onProcess={(input, options) => {
        const opt = options?.type;

        if (opt === 'encode') {
          return escapeHtml(input);
        }

        if (opt === 'decode') {
          return unescapeHtml(input);
        }

        if (opt === 'auto' || !opt) {
          if (input.includes('&') || input.includes('<') || input.includes('>')) {
            return unescapeHtml(input);
          }
          return escapeHtml(input);
        }

        return escapeHtml(input);
      }}
    />
  );
}
