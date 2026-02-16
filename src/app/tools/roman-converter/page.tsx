"use client";
import ToolPage from "@/components/ToolPage";
import { toRoman, fromRoman } from "@/tools/converter";

export default function RomanConverterPage() {
  return (
    <ToolPage
      title="罗马数字转换"
      description="阿拉伯数字与罗马数字互转"
      inputLabel="数字或罗马数字"
      inputPlaceholder="请输入数字（如 1999）或罗马数字（如 MCMXCIX）"
      onProcess={(input) => {
        const trimmed = input.trim();
        if (/^\d+$/.test(trimmed)) {
          const num = parseInt(trimmed);
          if (num < 1 || num > 3999) {
            throw new Error("数字必须在 1 到 3999 之间");
          }
          return toRoman(num);
        } else {
          return fromRoman(trimmed).toString();
        }
      }}
    />
  );
}
