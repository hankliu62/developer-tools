'use client';
import ToolPage from '@/components/ToolPage';
import { generateBIP39 } from '@/tools/crypto';

export default function BIP39Page() {
  return (
    <ToolPage
      title="BIP39 助记词"
      description="生成 BIP39 标准的加密货币助记词"
      emoji="📖"
      emojiBg="bg-amber-100"
      inputLabel="（无需输入，点击生成即可）"
      inputPlaceholder=""
      layout="single"
      tips={[
        'BIP39 是比特币改进提案第39号定义的助记词标准',
        '生成 12 个单词（128 位熵）的助记词',
        '助记词可用于生成确定性钱包种子',
        '请妥善保管助记词，丢失将无法恢复资产',
      ]}
      onProcess={() => {
        return generateBIP39();
      }}
      processLabel="生成"
    />
  );
}
