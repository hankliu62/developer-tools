"use client";
import ToolPage from "@/components/ToolPage";
import { textToNato } from "@/tools/converter";

export default function NatoAlphabetPage() {
  return (
    <ToolPage
      title="NATO 字母表"
      description="文本转 NATO 字母表"
      inputLabel="文本"
      inputPlaceholder="请输入要转换的文本..."
      onProcess={(input) => {
        return textToNato(input);
      }}
    />
  );
}
