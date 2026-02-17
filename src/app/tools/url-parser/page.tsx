'use client';
import ToolPage from '@/components/ToolPage';
import { parseUrl } from '@/tools/web';

export default function UrlParserPage() {
  return (
    <ToolPage
      title="URL 解析"
      description="解析 URL 的各个组成部分"
      inputLabel="URL 地址"
      inputPlaceholder="请输入完整的 URL，如 https://example.com:8080/path?query=1#hash"
      layout="single"
      tips={[
        '支持 HTTP、HTTPS、FTP 等多种协议',
        '可解析完整的 URL 包括协议、主机、端口、路径、查询参数和锚点',
        '查询参数会自动解析为键值对形式',
        '本地开发常用：http://localhost:3000',
      ]}
      options={[
        { label: '完整信息', value: 'full' },
        { label: '仅 origin', value: 'origin' },
        { label: '仅路径', value: 'pathname' },
        { label: '仅查询参数', value: 'search' },
      ]}
      onProcess={(input, options) => {
        const result = parseUrl(input);
        const opt = options?.type;

        if (opt === 'origin') {
          return result.origin;
        }

        if (opt === 'pathname') {
          return result.pathname;
        }

        if (opt === 'search') {
          return result.search || '(无查询参数)';
        }

        return `href: ${result.href}
protocol: ${result.protocol}
host: ${result.host}
hostname: ${result.hostname}
port: ${result.port}
pathname: ${result.pathname}
search: ${result.search}
hash: ${result.hash}
origin: ${result.origin}`;
      }}
    />
  );
}
