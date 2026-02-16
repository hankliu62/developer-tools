"use client";
import ToolPage from "@/components/ToolPage";
import { encodeUrl, decodeUrl } from "@/tools/web";

export default function UrlEncoderPage() {
  return (
    <ToolPage
      title="URL 编码解码"
      description="URL 编码和解码"
      inputLabel="URL"
      inputPlaceholder="请输入 URL..."
      onProcess={(input) => {
        if (input.includes("%")) {
          return decodeUrl(input);
        }
        return encodeUrl(input);
      }}
    />
  );
}
