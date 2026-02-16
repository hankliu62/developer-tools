"use client";
import ToolPage from "@/components/ToolPage";
import { generateToken, hashText, generateUUID, generateULID, encryptText, decryptText, generateHmac, analyzePasswordStrength, generateBIP39 } from "@/tools/crypto";

export default function TokenGeneratorPage() {
  return (
    <ToolPage
      title="Token 生成器"
      description="生成随机 Token"
      inputLabel="长度"
      inputPlaceholder="请输入 Token 长度（默认 32）"
      defaultInput="32"
      onProcess={(input) => {
        const length = parseInt(input) || 32;
        return generateToken(length);
      }}
    />
  );
}
