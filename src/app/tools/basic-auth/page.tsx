"use client";
import ToolPage from "@/components/ToolPage";
import { generateBasicAuth } from "@/tools/web";

export default function BasicAuthPage() {
  return (
    <ToolPage
      title="Basic Auth 生成"
      description="生成 Basic Auth 头"
      inputLabel="用户名|密码（用 | 分隔）"
      inputPlaceholder="例如: admin|password"
      onProcess={(input) => {
        const parts = input.split("|").map((p) => p.trim());
        if (parts.length < 2) {
          throw new Error("请按格式输入：用户名|密码");
        }
        const [username, password] = parts;
        return generateBasicAuth(username, password);
      }}
    />
  );
}
