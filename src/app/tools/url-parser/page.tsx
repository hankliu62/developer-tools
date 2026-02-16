"use client";
import ToolPage from "@/components/ToolPage";
import { parseUrl } from "@/tools/web";

export default function UrlParserPage() {
  return (
    <ToolPage
      title="URL 解析"
      description="解析 URL 各部分"
      inputLabel="URL"
      inputPlaceholder="请输入 URL..."
      onProcess={(input) => {
        const result = parseUrl(input);
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
