"use client";
import ToolPage from "@/components/ToolPage";
import { getMimeType, mimeTypes } from "@/tools/web";

export default function MimeTypesPage() {
  return (
    <ToolPage
      title="MIME 类型"
      description="查询 MIME 类型"
      inputLabel="扩展名"
      inputPlaceholder="请输入文件扩展名，如: json, html, css..."
      onProcess={(input) => {
        const ext = input.trim().toLowerCase();
        const mime = getMimeType(ext);
        
        let result = `扩展名: .${ext}\nMIME 类型: ${mime}\n\n所有支持的类型:\n`;
        result += Object.entries(mimeTypes)
          .map(([key, value]) => `.${key} => ${value}`)
          .join("\n");
        return result;
      }}
    />
  );
}
