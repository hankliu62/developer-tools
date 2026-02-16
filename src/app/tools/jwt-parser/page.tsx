"use client";
import ToolPage from "@/components/ToolPage";
import { parseJWT } from "@/tools/web";

export default function JwtParserPage() {
  return (
    <ToolPage
      title="JWT 解析"
      description="解析 JWT Token"
      inputLabel="JWT Token"
      inputPlaceholder="请输入 JWT Token..."
      onProcess={(input) => {
        const result = parseJWT(input.trim());
        return `Header:
${JSON.stringify(result.header, null, 2)}

Payload:
${JSON.stringify(result.payload, null, 2)}

Signature:
${result.signature}`;
      }}
    />
  );
}
