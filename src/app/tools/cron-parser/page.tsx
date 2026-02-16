"use client";
import ToolPage from "@/components/ToolPage";
import { generateCronDescription, getNextRuns } from "@/tools/cron";

export default function CronParserPage() {
  return (
    <ToolPage
      title="Cron 表达式解析"
      description="解析 Cron 表达式"
      inputLabel="Cron 表达式"
      inputPlaceholder="例如: * * * * *"
      onProcess={(input) => {
        const description = generateCronDescription(input.trim());
        const nextRuns = getNextRuns(input.trim(), 5);
        
        return `描述: ${description}

接下来 5 次执行时间:
${nextRuns.map((d, i) => `${i + 1}. ${d.toLocaleString()}`).join("\n")}`;
      }}
    />
  );
}
