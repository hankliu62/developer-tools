'use client';
import ToolPage from '@/components/ToolPage';
import { generateCronDescription, getNextRuns } from '@/tools/cron';

export default function CronParserPage() {
  return (
    <ToolPage
      title="Cron 表达式解析"
      description="解析 Cron 表达式并计算下次执行时间"
      inputLabel="Cron 表达式"
      inputPlaceholder="例如: * * * * *"
      layout="single"
      tips={[
        'Cron 表达式由5个字段组成：分 时 日 月 周',
        '* 表示任意值，? 用于日期和星期互斥',
        '常用示例：0 0 * * * (每天午夜)、0 9 * * 1-5 (工作日上午9点)',
        '支持特殊字符：, (列表)、- (范围)、/ (步进)',
      ]}
      options={[
        { label: '显示5次', value: '5' },
        { label: '显示10次', value: '10' },
        { label: '显示20次', value: '20' },
      ]}
      onProcess={(input, options) => {
        const count = parseInt(options?.type || '5', 10);
        const description = generateCronDescription(input.trim());
        const nextRuns = getNextRuns(input.trim(), count);

        return `描述: ${description}

接下来 ${count} 次执行时间:
${nextRuns.map((d, i) => `${i + 1}. ${d.toLocaleString()}`).join('\n')}`;
      }}
    />
  );
}
