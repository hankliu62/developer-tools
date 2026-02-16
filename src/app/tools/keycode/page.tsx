"use client";
import ToolPage from "@/components/ToolPage";
import { getKeyCodeInfo } from "@/tools/web";

export default function KeycodePage() {
  return (
    <ToolPage
      title="键码信息"
      description="查询键码信息"
      inputLabel="按键名称"
      inputPlaceholder="请输入按键名称，如: Enter, Escape, A..."
      onProcess={(input) => {
        const info = getKeyCodeInfo(input.trim());
        return `Key: ${info.key}
Code: ${info.code}
keyCode: ${info.keyCode}
which: ${info.which}
Category: ${info.category}`;
      }}
    />
  );
}
