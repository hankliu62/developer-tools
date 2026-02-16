"use client";
import ToolPage from "@/components/ToolPage";
import { generateBIP39 } from "@/tools/crypto";

export default function BIP39Page() {
  return (
    <ToolPage
      title="BIP39 助记词"
      description="生成 BIP39 助记词"
      inputLabel="点击处理生成"
      inputPlaceholder=""
      onProcess={() => {
        return generateBIP39();
      }}
      processLabel="生成"
    />
  );
}
