'use client';
import { Button, message, Select } from 'antd';
import copy from 'copy-to-clipboard';
import { useState } from 'react';
import { cronPresets, generateCronDescription } from '@/tools/cron';

const minuteOptions = [
  { label: '每分钟 (*)', value: '*' },
  { label: '每 5 分钟 (*/5)', value: '*/5' },
  { label: '每 10 分钟 (*/10)', value: '*/10' },
  { label: '每 15 分钟 (*/15)', value: '*/15' },
  { label: '每 30 分钟 (*/30)', value: '*/30' },
  { label: '0', value: '0' },
  { label: '15', value: '15' },
  { label: '30', value: '30' },
  { label: '45', value: '45' },
];

const secondOptions = [
  { label: '每秒 (*)', value: '*' },
  { label: '每 5 秒 (*/5)', value: '*/5' },
  { label: '每 10 秒 (*/10)', value: '*/10' },
  { label: '每 15 秒 (*/15)', value: '*/15' },
  { label: '每 30 秒 (*/30)', value: '*/30' },
  { label: '0', value: '0' },
  { label: '15', value: '15' },
  { label: '30', value: '30' },
  { label: '45', value: '45' },
];

const hourOptions = [
  { label: '每小时 (*)', value: '*' },
  { label: '每 2 小时 (*/2)', value: '*/2' },
  { label: '每 6 小时 (*/6)', value: '*/6' },
  { label: '每 12 小时 (*/12)', value: '*/12' },
  { label: '0 (午夜)', value: '0' },
  { label: '6 (早上6点)', value: '6' },
  { label: '9 (早上9点)', value: '9' },
  { label: '12 (中午)', value: '12' },
  { label: '18 (下午6点)', value: '18' },
  { label: '23 (晚上11点)', value: '23' },
];

const dayOfMonthOptions = [
  { label: '每天 (*)', value: '*' },
  { label: '1 号', value: '1' },
  { label: '15 号', value: '15' },
  { label: '1-15', value: '1-15' },
  { label: '1,15', value: '1,15' },
  { label: '最后一天 (L)', value: 'L' },
];

const monthOptions = [
  { label: '每月 (*)', value: '*' },
  { label: '1 月', value: '1' },
  { label: '2 月', value: '2' },
  { label: '3 月', value: '3' },
  { label: '4 月', value: '4' },
  { label: '5 月', value: '5' },
  { label: '6 月', value: '6' },
  { label: '7 月', value: '7' },
  { label: '8 月', value: '8' },
  { label: '9 月', value: '9' },
  { label: '10 月', value: '10' },
  { label: '11 月', value: '11' },
  { label: '12 月', value: '12' },
  { label: '1,4,7,10', value: '1,4,7,10' },
  { label: '1,6,12', value: '1,6,12' },
];

const dayOfWeekOptions = [
  { label: '每天 (*)', value: '*' },
  { label: '工作日 (1-5)', value: '1-5' },
  { label: '周末 (0,6)', value: '0,6' },
  { label: '周日 (0)', value: '0' },
  { label: '周一 (1)', value: '1' },
  { label: '周二 (2)', value: '2' },
  { label: '周三 (3)', value: '3' },
  { label: '周四 (4)', value: '4' },
  { label: '周五 (5)', value: '5' },
  { label: '周六 (6)', value: '6' },
  { label: '1-5 (周一至周五)', value: '1-5' },
  { label: '0,6 (周末)', value: '0,6' },
];

export default function CronGeneratorPage() {
  const [second, setSecond] = useState('0');
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dayOfMonth, setDayOfMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('*');
  const [description, setDescription] = useState('');
  const [output, setOutput] = useState('');

  const handleGenerate = () => {
    try {
      const expression = `${second} ${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
      const desc = generateCronDescription(expression);
      setDescription(desc);
      setOutput(expression);
    } catch (error) {
      message.error(error instanceof Error ? error.message : '生成失败');
    }
  };

  const handlePreset = (value: string) => {
    const parts = value.split(' ');
    if (parts.length >= 6) {
      setSecond(parts[0]);
      setMinute(parts[1]);
      setHour(parts[2]);
      setDayOfMonth(parts[3]);
      setMonth(parts[4]);
      setDayOfWeek(parts[5]);
    } else if (parts.length === 5) {
      setSecond('0');
      setMinute(parts[0]);
      setHour(parts[1]);
      setDayOfMonth(parts[2]);
      setMonth(parts[3]);
      setDayOfWeek(parts[4]);
    }
    try {
      const desc = generateCronDescription(value);
      setDescription(desc);
      setOutput(value);
    } catch {
      // ignore
    }
  };

  const handleCopy = () => {
    if (output) {
      copy(output);
      message.success('复制成功');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cron 表达式生成</h1>
        <p className="text-gray-600 mt-1">可视化生成 Cron 表达式</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <label className="font-medium text-gray-700 block mb-3">预设</label>
          <Select
            placeholder="选择预设"
            style={{ width: '100%' }}
            onChange={handlePreset}
            options={cronPresets.map((p) => ({ label: p.name, value: p.expression }))}
          />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-5">
            <div>
              <label className="font-medium text-gray-700 block mb-2">秒 (Second)</label>
              <Select
                value={second}
                onChange={setSecond}
                style={{ width: '100%' }}
                options={secondOptions}
              />
            </div>

            <div>
              <label className="font-medium text-gray-700 block mb-2">分钟 (Minute)</label>
              <Select
                value={minute}
                onChange={setMinute}
                style={{ width: '100%' }}
                options={minuteOptions}
              />
            </div>

            <div>
              <label className="font-medium text-gray-700 block mb-2">小时 (Hour)</label>
              <Select
                value={hour}
                onChange={setHour}
                style={{ width: '100%' }}
                options={hourOptions}
              />
            </div>

            <div>
              <label className="font-medium text-gray-700 block mb-2">日期 (Day of Month)</label>
              <Select
                value={dayOfMonth}
                onChange={setDayOfMonth}
                style={{ width: '100%' }}
                options={dayOfMonthOptions}
              />
            </div>

            <div>
              <label className="font-medium text-gray-700 block mb-2">月份 (Month)</label>
              <Select
                value={month}
                onChange={setMonth}
                style={{ width: '100%' }}
                options={monthOptions}
              />
            </div>

            <div>
              <label className="font-medium text-gray-700 block mb-2">星期 (Day of Week)</label>
              <Select
                value={dayOfWeek}
                onChange={setDayOfWeek}
                style={{ width: '100%' }}
                options={dayOfWeekOptions}
              />
            </div>
          </div>

          <Button type="primary" onClick={handleGenerate} className="mt-6" block>
            生成 Cron 表达式
          </Button>
        </div>

        {output && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Cron 表达式</div>
                <div className="font-mono text-xl">{output}</div>
              </div>
              <Button onClick={handleCopy}>复制</Button>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">描述</div>
              <div className="text-lg text-gray-800">{description}</div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 rounded-lg border border-blue-200 p-5">
          <h3 className="font-semibold text-blue-800 mb-3">使用提示</h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>
              • <strong>Cron 格式：</strong>秒 分 时 日 月 周
            </li>
            <li>
              • <strong>*</strong> 表示任意值
            </li>
            <li>
              • <strong>*/n</strong> 表示每 n 个单位执行一次
            </li>
            <li>
              • <strong>n-m</strong> 表示从 n 到 m 的范围
            </li>
            <li>
              • <strong>n,m</strong> 表示多个特定值
            </li>
            <li>
              • <strong>星期：</strong>0=周日, 1=周一, ..., 6=周六
            </li>
            <li>
              • <strong>月份：</strong>1-12 对应 1-12 月
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
