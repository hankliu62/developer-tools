"use client";
import ToolPage from "@/components/ToolPage";
import { slugify } from "@/tools/web";

export default function SlugifyPage() {
  return (
    <ToolPage
      title="Slug 转换"
      description="将文本转换为 URL Slug"
      inputLabel="文本"
      inputPlaceholder="请输入要转换的文本..."
      onProcess={(input) => {
        return slugify(input);
      }}
    />
  );
}
