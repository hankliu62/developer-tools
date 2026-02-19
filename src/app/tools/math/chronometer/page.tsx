'use client';
import { Button, message, Space } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function ChronometerPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const startTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const formatTime = (ms: number): string => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centis.toString().padStart(2, '0')}`;
  };

  const tick = useCallback(() => {
    const now = performance.now();
    setElapsedMs(accumulatedRef.current + (now - startTimeRef.current));
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const handleStart = () => {
    if (!isRunning) {
      startTimeRef.current = performance.now();
      setIsRunning(true);
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const handleStop = () => {
    if (isRunning) {
      cancelAnimationFrame(rafRef.current);
      accumulatedRef.current += performance.now() - startTimeRef.current;
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    cancelAnimationFrame(rafRef.current);
    setIsRunning(false);
    setElapsedMs(0);
    setLaps([]);
    accumulatedRef.current = 0;
  };

  const handleLap = () => {
    setLaps((prev) => [elapsedMs, ...prev]);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleCopyAll = () => {
    const lines = laps.map((lap, i) => `#${laps.length - i}: ${formatTime(lap)}`).join('\n');
    copy(lines);
    message.success('已复制');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">⏱️ 秒表 / 计时器</h1>
        <p className="text-gray-600">高精度秒表，支持分圈计时</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 mb-4 text-center">
        <div className="font-mono text-6xl font-bold text-gray-900 mb-8 tabular-nums">
          {formatTime(elapsedMs)}
        </div>

        <Space size="middle">
          {!isRunning ? (
            <Button type="primary" size="large" onClick={handleStart} className="min-w-[100px]">
              {elapsedMs > 0 ? '▶️ 继续' : '▶️ 开始'}
            </Button>
          ) : (
            <Button danger size="large" onClick={handleStop} className="min-w-[100px]">
              ⏸️ 暂停
            </Button>
          )}
          {isRunning && (
            <Button size="large" onClick={handleLap} className="min-w-[100px]">
              🏁 分圈
            </Button>
          )}
          <Button size="large" onClick={handleReset} className="min-w-[100px]">
            🗑️ 重置
          </Button>
        </Space>
      </div>

      {laps.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-gray-800">🏁 分圈记录（{laps.length} 圈）</span>
            <Button onClick={handleCopyAll}>📋 复制全部</Button>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {laps.map((lap, i) => {
              const prevLap = i < laps.length - 1 ? laps[i + 1] : 0;
              const diff = lap - prevLap;
              return (
                <div
                  key={i}
                  className="bg-gray-50 rounded-lg p-3 flex items-center justify-between"
                >
                  <span className="text-gray-500 font-mono">#{laps.length - i}</span>
                  <span className="font-mono text-lg text-blue-600">{formatTime(lap)}</span>
                  <span className="font-mono text-sm text-green-600">+{formatTime(diff)}</span>
                  <Button
                    size="small"
                    onClick={() => {
                      copy(formatTime(lap));
                      message.success('已复制');
                    }}
                  >
                    复制
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="bg-blue-50 rounded-xl p-5">
        <h3 className="font-semibold text-blue-900 mb-3">💡 使用提示</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• 使用 performance.now() 高精度计时</li>
          <li>• 支持暂停后继续，累计时间不丢失</li>
          <li>• 分圈记录显示总时间和每圈间隔</li>
          <li>• 适用于性能测试、运动计时等场景</li>
        </ul>
      </div>
    </div>
  );
}
