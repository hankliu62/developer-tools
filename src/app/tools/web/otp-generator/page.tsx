'use client';
import ToolPage from '@/components/ToolPage';
import { generateTOTP } from '@/tools/web';

export default function OtpGeneratorPage() {
  return (
    <ToolPage
      title="OTP 验证码"
      description="基于时间的一次性密码 (TOTP) 生成器"
      emoji="⏰"
      emojiBg="bg-amber-100"
      inputLabel="密钥 (Base32)"
      inputPlaceholder="请输入 Base32 编码的密钥，如 JBSWY3DPEHPK3PXP..."
      layout="single"
      tips={[
        '密钥必须使用 Base32 编码（字母 A-Z 和数字 2-7）',
        'Google Authenticator、Microsoft Authenticator 等支持此格式',
        '默认算法：SHA1，6位数字，30秒有效期',
        '密钥示例：JBSWY3DPEHPK3PXP（对应 Hello）',
      ]}
      options={[
        { label: '6位密码', value: '6' },
        { label: '8位密码', value: '8' },
        { label: '30秒周期', value: '30' },
        { label: '60秒周期', value: '60' },
      ]}
      onProcess={(input, options) => {
        if (!input) {
          throw new Error('请输入密钥');
        }
        const digits = options?.type === '8' ? 8 : 6;
        return generateTOTP(input.trim(), digits);
      }}
    />
  );
}
