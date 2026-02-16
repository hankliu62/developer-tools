"use client";
import ToolPage from "@/components/ToolPage";
import { generateHmac } from "@/tools/crypto";

const hmacOptions = [
  { label: "SHA256", value: "SHA256" },
  { label: "SHA1", value: "SHA1" },
  { label: "SHA512", value: "SHA512" },
];

export default function HmacGeneratorPage() {
  return (
    <ToolPage
      title="HMAC 生成器"
      description="生成 HMAC"
      inputLabel="文本|密钥（用 | 分隔）"
      inputPlaceholder="请输入文本和密钥，用 | 分隔..."
      onProcess={(input, options) => {
        const [text, key] = input.split("|");
        if (!text || !key) {
          throw new Error("请输入文本和密钥，用 | 分隔");
        }
        return generateHmac(text.trim(), key.trim(), options?.type || "SHA256");
      }}
    />
  );
}
