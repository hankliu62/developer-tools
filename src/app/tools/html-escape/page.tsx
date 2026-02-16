"use client";
import ToolPage from "@/components/ToolPage";
import { escapeHtml, unescapeHtml } from "@/tools/web";

export default function HtmlEscapePage() {
  return (
    <ToolPage
      title="HTML 实体转义"
      description="HTML 实体编码和解码"
      inputLabel="HTML"
      inputPlaceholder="请输入 HTML 内容..."
      onProcess={(input) => {
        if (input.includes("&") || input.includes("<") || input.includes(">")) {
          return unescapeHtml(input);
        }
        return escapeHtml(input);
      }}
    />
  );
}
