"use client";

import ToolPage from "@/components/ToolPage";

export default function Page() {
  return (
    <ToolPage
      title="整数进制转换"
      description="进制转换 (2/8/10/16)"
      inputLabel="数值|原进制|目标进制（用 | 分隔）"
      inputPlaceholder="例如: FF|16|10"
      onProcess={(input) => {
        const parts = input.split("|").map((p) => p.trim());
        if (parts.length < 3) {
          throw new Error("请按格式输入：数值|原进制|目标进制");
        }
        const [value, fromBase, toBase] = parts;
        const decimal = parseInt(value, parseInt(fromBase));
        if (isNaN(decimal)) {
          throw new Error("无效的数值");
        }
        return decimal.toString(parseInt(toBase)).toUpperCase();
      }}
    />
  );
}
