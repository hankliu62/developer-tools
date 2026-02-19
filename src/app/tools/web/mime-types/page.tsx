'use client';
import ToolPage from '@/components/ToolPage';
import { getMimeType, mimeTypes } from '@/tools/web';

export default function MimeTypesPage() {
  return (
    <ToolPage
      title="MIME 类型"
      description="查询文件扩展名对应的 MIME 类型"
      emoji="📄"
      emojiBg="bg-gray-100"
      inputLabel="扩展名"
      inputPlaceholder="请输入文件扩展名，如: json, html, css..."
      layout="single"
      tips={[
        '输入文件扩展名（不带点），查询对应的 MIME 类型',
        '常用类型：json(application/json), html(text/html), css(text/css)',
        '图片：png(image/png), jpg(image/jpeg), gif(image/gif), svg(image/svg+xml)',
        '视频：mp4(video/mp4), webm(video/webm), ogg(video/ogg)',
      ]}
      options={[
        { label: '查询单个', value: 'single' },
        { label: '显示所有', value: 'all' },
        { label: '仅文本类', value: 'text' },
        { label: '仅图片类', value: 'image' },
      ]}
      onProcess={(input, options) => {
        const opt = options?.type;
        const ext = input.trim().toLowerCase();

        if (opt === 'all') {
          return `所有支持的 MIME 类型 (共 ${Object.keys(mimeTypes).length} 种):
${Object.entries(mimeTypes)
  .map(([key, value]) => `.${key} => ${value}`)
  .join('\n')}`;
        }

        if (opt === 'text') {
          const textTypes = Object.entries(mimeTypes)
            .filter(([_, v]) => v.startsWith('text/'))
            .map(([k, v]) => `.${k} => ${v}`)
            .join('\n');
          return `文本类 MIME 类型:\n${textTypes}`;
        }

        if (opt === 'image') {
          const imageTypes = Object.entries(mimeTypes)
            .filter(([_, v]) => v.startsWith('image/'))
            .map(([k, v]) => `.${k} => ${v}`)
            .join('\n');
          return `图片类 MIME 类型:\n${imageTypes}`;
        }

        const mime = getMimeType(ext);
        return `扩展名: .${ext}\nMIME 类型: ${mime}`;
      }}
    />
  );
}
