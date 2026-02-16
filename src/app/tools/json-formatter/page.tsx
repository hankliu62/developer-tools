"use client";
import ToolPage from "@/components/ToolPage";
import { formatJson } from "@/tools/web";

export default function JsonFormatterPage() {
  return (
    <ToolPage
      title="JSON 格式化"
      description="JSON 格式化和高亮"
      inputLabel="JSON"
      inputPlaceholder="请输入 JSON 内容..."
      onProcess={(input) => {
        return formatJson(input);
      }}
    />
  );
}
