"use client";
import ToolPage from "@/components/ToolPage";
import { convertCase } from "@/tools/converter";

const caseOptions = [
  { label: "大写", value: "upper" },
  { label: "小写", value: "lower" },
  { label: "首字母大写", value: "title" },
  { label: "句首大写", value: "sentence" },
];

export default function CaseConverterPage() {
  return (
    <ToolPage
      title="大小写转换"
      description="文本大小写转换"
      inputLabel="文本"
      inputPlaceholder="请输入要转换的文本..."
      options={caseOptions}
      onProcess={(input, options) => {
        return convertCase(input, options?.type as "upper" | "lower" | "title" | "sentence");
      }}
    />
  );
}
