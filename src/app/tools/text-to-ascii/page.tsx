"use client";
import ToolPage from "@/components/ToolPage";
import { textToAsciiBinary } from "@/tools/converter";

export default function TextToAsciiPage() {
  return (
    <ToolPage
      title="ASCII 二进制"
      description="文本转 ASCII 二进制"
      inputLabel="文本"
      inputPlaceholder="请输入要转换的文本..."
      onProcess={(input) => {
        return textToAsciiBinary(input);
      }}
    />
  );
}
