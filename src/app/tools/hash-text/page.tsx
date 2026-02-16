"use client";
import ToolPage from "@/components/ToolPage";
import { hashText } from "@/tools/crypto";

const hashOptions = [
  { label: "MD5", value: "MD5" },
  { label: "SHA1", value: "SHA1" },
  { label: "SHA256", value: "SHA256" },
  { label: "SHA512", value: "SHA512" },
  { label: "SHA3", value: "SHA3" },
];

export default function HashTextPage() {
  return (
    <ToolPage
      title="文本哈希"
      description="生成文本的哈希值"
      inputLabel="文本"
      inputPlaceholder="请输入要哈希的文本..."
      options={hashOptions}
      onProcess={(input, options) => {
        return hashText(input, options?.type || "SHA256");
      }}
    />
  );
}
