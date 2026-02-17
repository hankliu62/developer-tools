'use client';
import { Button, DatePicker, Input, InputNumber, message, Select, Space } from 'antd';
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

type Mode = 'completion' | 'duration';

const formatDuration = (ms: number): string => {
  if (ms < 0) return '已完成';
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}天 ${hours % 24}小时 ${minutes % 60}分钟`;
  if (hours > 0) return `${hours}小时 ${minutes % 60}分钟 ${seconds % 60}秒`;
  if (minutes > 0) return `${minutes}分钟 ${seconds % 60}秒`;
  return `${seconds}秒`;
};

export default function EtaCalculatorPage() {
  const [mode, setMode] = useState<Mode>('completion');
  const [startTime, setStartTime] = useState<dayjs.Dayjs | null>(dayjs());
  const [progress, setProgress] = useState(35);
  const [elapsed, setElapsed] = useState('');
  const [totalItems, setTotalItems] = useState(100);
  const [completedItems, setCompletedItems] = useState(35);
  const [result, setResult] = useState<{
    eta: string;
    remaining: string;
    speed: string;
    finishTime: string;
  } | null>(null);

  const calculate = useCallback(() => {
    try {
      if (mode === 'completion') {
        if (!startTime) {
          message.error('请选择开始时间');
          return;
        }
        if (completedItems <= 0 || totalItems <= 0) {
          message.error('数量必须大于 0');
          return;
        }
        const elapsedMs = dayjs().diff(startTime);
        const progressRatio = completedItems / totalItems;
        if (progressRatio >= 1) {
          setResult({
            eta: '已完成',
            remaining: '0',
            speed: `${(completedItems / (elapsedMs / 1000)).toFixed(2)} 项/秒`,
            finishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          });
        } else {
          const totalEstimate = elapsedMs / progressRatio;
          const remainingMs = totalEstimate - elapsedMs;
          const finishTime = dayjs().add(remainingMs, 'millisecond');
          setResult({
            eta: formatDuration(remainingMs),
            remaining: `${totalItems - completedItems} 项`,
            speed: `${(completedItems / (elapsedMs / 1000)).toFixed(2)} 项/秒`,
            finishTime: finishTime.format('YYYY-MM-DD HH:mm:ss'),
          });
        }
      } else {
        const parts = elapsed.trim().split(':').map(Number);
        let elapsedMs: number;
        if (parts.length === 3) {
          elapsedMs = (parts[0] * 3600 + parts[1] * 60 + parts[2]) * 1000;
        } else if (parts.length === 2) {
          elapsedMs = (parts[0] * 60 + parts[1]) * 1000;
        } else {
          elapsedMs = parts[0] * 1000;
        }

        if (Number.isNaN(elapsedMs) || elapsedMs <= 0) {
          message.error('请输入有效的已用时间');
          return;
        }

        const progressRatio = progress / 100;
        if (progressRatio >= 1) {
          setResult({
            eta: '已完成',
            remaining: '0%',
            speed: `${(progress / (elapsedMs / 1000)).toFixed(2)}%/秒`,
            finishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          });
        } else {
          const totalEstimate = elapsedMs / progressRatio;
          const remainingMs = totalEstimate - elapsedMs;
          const finishTime = dayjs().add(remainingMs, 'millisecond');
          setResult({
            eta: formatDuration(remainingMs),
            remaining: `${(100 - progress).toFixed(1)}%`,
            speed: `${(progress / (elapsedMs / 1000)).toFixed(2)}%/秒`,
            finishTime: finishTime.format('YYYY-MM-DD HH:mm:ss'),
          });
        }
      }
      message.success('计算成功');
    } catch {
      message.error('计算失败');
    }
  }, [mode, startTime, progress, elapsed, totalItems, completedItems]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">⏱️ ETA 预计时间计算器</h1>
        <p className="text-gray-600">根据当前进度预估任务完成时间</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-4">
        <span className="font-semibold text-gray-800 block mb-3">⚙️ 计算模式</span>
        <Select
          value={mode}
          onChange={setMode}
          className="w-full mb-4"
          size="large"
          options={[
            { value: 'completion', label: '按完成数量计算' },
            { value: 'duration', label: '按已用时间和进度计算' },
          ]}
        />

        {mode === 'completion' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-500 block mb-1">开始时间</label>
              <DatePicker
                showTime
                value={startTime}
                onChange={setStartTime}
                className="w-full"
                size="large"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-1">总数量</label>
              <InputNumber
                value={totalItems}
                onChange={(v) => setTotalItems(v || 1)}
                min={1}
                className="w-full"
                size="large"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-1">已完成数量</label>
              <InputNumber
                value={completedItems}
                onChange={(v) => setCompletedItems(v || 0)}
                min={0}
                className="w-full"
                size="large"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500 block mb-1">已用时间 (HH:MM:SS)</label>
              <Input
                value={elapsed}
                onChange={(e) => setElapsed(e.target.value)}
                placeholder="例如: 1:30:00 或 90:00"
                size="large"
                className="font-mono"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 block mb-1">当前进度 (%)</label>
              <InputNumber
                value={progress}
                onChange={(v) => setProgress(v || 0)}
                min={0}
                max={100}
                className="w-full"
                size="large"
                suffix="%"
              />
            </div>
          </div>
        )}
      </div>

      <Space className="w-full mb-4">
        <Button type="primary" size="large" onClick={calculate}>
          🚀 计算 ETA
        </Button>
        <Button size="large" onClick={() => setResult(null)}>
          🗑️ 重置
        </Button>
      </Space>

      {result && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <span className="font-semibold text-gray-800 block mb-4">📊 预估结果</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: '预计剩余时间', value: result.eta, color: 'text-blue-600' },
              { label: '剩余量', value: result.remaining, color: 'text-orange-600' },
              { label: '处理速度', value: result.speed, color: 'text-green-600' },
              { label: '预计完成时间', value: result.finishTime, color: 'text-purple-600' },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                <div className={`font-mono text-lg font-bold ${item.color}`}>{item.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-right">
            <Button
              onClick={() => {
                copy(`ETA: ${result.eta}\n完成时间: ${result.finishTime}\n速度: ${result.speed}`);
                message.success('已复制');
              }}
            >
              📋 复制结果
            </Button>
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 「按完成数量」模式：设置开始时间、总数和已完成数</li>
          <li>• 「按已用时间」模式：输入已用时间和完成百分比</li>
          <li>• ETA 基于当前速度线性推算，实际可能有偏差</li>
          <li>• 适用于文件下载、数据处理、批量任务等场景</li>
        </ul>
      </div>
    </div>
  );
}
