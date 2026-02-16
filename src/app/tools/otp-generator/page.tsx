"use client";
import ToolPage from "@/components/ToolPage";
import { generateTOTP } from "@/tools/web";

export default function OtpGeneratorPage() {
  return (
    <ToolPage
      title="OTP 验证码"
      description="生成 TOTP/HOTP 验证码"
      inputLabel="密钥"
      inputPlaceholder="请输入 Base32 编码的密钥..."
      onProcess={(input) => {
        if (!input) {
          throw new Error("请输入密钥");
        }
        return generateTOTP(input.trim());
      }}
    />
  );
}
