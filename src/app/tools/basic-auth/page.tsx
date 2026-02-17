'use client';
import ToolPage from '@/components/ToolPage';
import { generateBasicAuth } from '@/tools/web';

export default function BasicAuthPage() {
  return (
    <ToolPage
      title="Basic Auth 生成"
      description="生成 HTTP Basic Authentication 认证头"
      inputLabel="用户名 | 密码"
      inputPlaceholder="格式：用户名|密码，例如: admin|password"
      layout="single"
      tips={[
        'Basic Auth 是 HTTP 基本的身份验证方式',
        '用户名和密码用竖线(|)分隔，不要有空格',
        '生成的编码可直接放在 Authorization 头中使用',
        '格式：Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=',
      ]}
      options={[
        { label: '标准格式', value: 'standard' },
        { label: '仅编码', value: 'encoded' },
        { label: '含头信息', value: 'header' },
      ]}
      onProcess={(input, options) => {
        const parts = input.split('|').map((p) => p.trim());
        if (parts.length < 2) {
          throw new Error('请按格式输入：用户名|密码');
        }
        const [username, password] = parts;
        const result = generateBasicAuth(username, password);
        const opt = options?.type;

        if (opt === 'encoded') {
          const base64 = Buffer.from(`${username}:${password}`).toString('base64');
          return base64;
        }

        if (opt === 'header') {
          return `Authorization: Basic ${result.split(' ')[1]}`;
        }

        return result;
      }}
    />
  );
}
