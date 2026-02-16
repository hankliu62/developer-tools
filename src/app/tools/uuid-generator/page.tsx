"use client";
import ToolPage from "@/components/ToolPage";
import { generateUUID } from "@/tools/crypto";

export default function UUIDGeneratorPage() {
  return (
    <ToolPage
      title="UUID 生成器"
      description="生成 UUID"
      inputLabel="生成数量"
      inputPlaceholder="请输入要生成的数量（默认 1）"
      defaultInput="1"
      onProcess={(input) => {
        const count = parseInt(input) || 1;
        const uuids: string[] = [];
        for (let i = 0; i < count; i++) {
          uuids.push(generateUUID());
        }
        return uuids.join("\n");
      }}
    />
  );
}
