"use client";
import ToolPage from "@/components/ToolPage";
import { convertColor } from "@/tools/converter";

const formatOptions = [
  { label: "HEX", value: "hex" },
  { label: "RGB", value: "rgb" },
  { label: "HSL", value: "hsl" },
];

export default function ColorConverterPage() {
  return (
    <ToolPage
      title="颜色转换"
      description="颜色格式转换 (HEX, RGB, HSL)"
      inputLabel="颜色|目标格式（用 | 分隔）"
      inputPlaceholder="例如: #FF0000|rgb 或 rgb(255,0,0)|hex"
      onProcess={(input, options) => {
        const parts = input.split("|").map((p) => p.trim());
        if (parts.length < 2) {
          throw new Error("请按格式输入：颜色|目标格式");
        }
        const [color, targetFormat] = parts;
        return convertColor(color, targetFormat as "hex" | "rgb" | "hsl");
      }}
    />
  );
}
