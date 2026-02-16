"use client";
import ToolPage from "@/components/ToolPage";
import { generateULID } from "@/tools/crypto";

export default function ULIDGeneratorPage() {
  return (
    <ToolPage
      title="ULID 生成器"
      description="生成 ULID"
      inputLabel="生成数量"
      inputPlaceholder="请输入要生成的数量（默认 1）"
      defaultInput="1"
      onProcess={(input) => {
        const count = parseInt(input) || 1;
        const ulids: string[] = [];
        for (let i = 0; i < count; i++) {
          ulids.push(generateULID());
        }
        return ulids.join("\n");
      }}
    />
  );
}
