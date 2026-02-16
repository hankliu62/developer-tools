"use client";
import ToolPage from "@/components/ToolPage";
import { convertDateTime } from "@/tools/converter";

const formatOptions = [
  { label: "YYYY-MM-DD HH:mm:ss", value: "YYYY-MM-DD HH:mm:ss" },
  { label: "YYYY-MM-DD", value: "YYYY-MM-DD" },
  { label: "HH:mm:ss", value: "HH:mm:ss" },
  { label: "Unix Timestamp", value: "X" },
  { label: "ISO 8601", value: "ISO" },
];

export default function DateConverterPage() {
  return (
    <ToolPage
      title="日期时间转换"
      description="日期时间格式转换"
      inputLabel="日期时间|输入格式|输出格式（用 | 分隔）"
      inputPlaceholder="例如: 2024-01-01|YYYY-MM-DD|YYYY-MM-DD HH:mm:ss"
      onProcess={(input) => {
        const parts = input.split("|").map((p) => p.trim());
        if (parts.length < 3) {
          throw new Error("请按格式输入：日期时间|输入格式|输出格式");
        }
        const [dateStr, inputFormat, outputFormat] = parts;
        return convertDateTime(dateStr, inputFormat, outputFormat);
      }}
    />
  );
}
