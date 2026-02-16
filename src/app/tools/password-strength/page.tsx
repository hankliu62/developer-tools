"use client";
import ToolPage from "@/components/ToolPage";
import { analyzePasswordStrength } from "@/tools/crypto";

export default function PasswordStrengthPage() {
  return (
    <ToolPage
      title="密码强度分析"
      description="分析密码强度并提供改进建议"
      inputLabel="密码"
      inputPlaceholder="请输入要分析的密码..."
      onProcess={(input) => {
        const result = analyzePasswordStrength(input);
        return `密码强度等级: ${result.level}
密码得分: ${result.score}/6

改进建议:
${result.suggestions.map((s, i) => `${i + 1}. ${s}`).join("\n")}`;
      }}
    />
  );
}
