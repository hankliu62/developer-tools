"use client";
import ToolPage from "@/components/ToolPage";
import { textToUnicode, unicodeToText } from "@/tools/converter";

export default function UnicodePage() {
  return (
    <ToolPage
      title="Unicode 转换"
      description="文本转 Unicode 或 Unicode 转文本"
      inputLabel="文本或 Unicode"
      inputPlaceholder="请输入内容..."
      onProcess={(input) => {
        if (input.includes("\\u")) {
          return unicodeToText(input);
        }
        return textToUnicode(input);
      }}
    />
  );
}
